import {useEffect, useRef, useState} from "react";

import {Anime} from "@app-types/anime";
import {BASE_API_KITSU_URL} from "@constants/configs";

const PAGE_LIMIT = 10;
const DEBOUNCE_DELAY = 500;

const useSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // -----------------------------
  // Fetch anime
  // -----------------------------
  const fetchAnime = async (searchText: string, newOffset = 0) => {
    if (!searchText) return;

    setLoading(true);

    try {
      const res = await fetch(
        `${BASE_API_KITSU_URL}/anime?filter[text]=${encodeURIComponent(
          searchText
        )}&page[limit]=${PAGE_LIMIT}&page[offset]=${newOffset}`
      );

      const data = await res.json();

      setResults((prev) =>
        newOffset === 0 ? data.data : [...prev, ...data.data]
      );

      setHasMore(data.data.length === PAGE_LIMIT);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Debounced search
  // -----------------------------
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!query.trim()) {
      setResults([]);
      setOffset(0);
      setHasMore(true);
      setIsOpen(false);
      return;
    }

    debounceRef.current = setTimeout(() => {
      setOffset(0);
      setIsOpen(true);
      fetchAnime(query, 0);
    }, DEBOUNCE_DELAY);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  // -----------------------------
  // Infinite scroll observer
  // -----------------------------
  useEffect(() => {
    if (!observerRef.current || loading || !hasMore || !isOpen) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const nextOffset = offset + PAGE_LIMIT;
        setOffset(nextOffset);
        fetchAnime(query, nextOffset);
      }
    });

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [loading, hasMore, offset, query, isOpen]);

  // -----------------------------
  // Close on outside click
  // -----------------------------
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setOffset(0);
    setHasMore(true);
    setIsOpen(false);
  };

  return {
    wrapperRef,
    observerRef,
    clearSearch,
    results,
    query,
    isOpen,
    hasMore,
    loading,
    setQuery,
    setIsOpen,
  };
};

export default useSearch;
