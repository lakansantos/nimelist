"use client";

import {useEffect, useRef, useState} from "react";
import {Anime} from "@app-types/anime";
import {BASE_API_KITSU_URL} from "@constants/configs";
import {AnimeItem, toAnimeItem} from "@lib/anime";

const DEBOUNCE_MS = 350;
const LIMIT = 20;

type State = {
  results: AnimeItem[];
  loading: boolean;
  error: boolean;
};

/**
 * Debounced Kitsu text search (matches English and Japanese titles).
 * Keeps the query in the URL (?q=) so results can be shared and survive reload.
 */
export const useKitsuSearch = (initialQuery: string) => {
  const [query, setQuery] = useState(initialQuery);
  const [state, setState] = useState<State>({
    results: [],
    loading: false,
    error: false,
  });
  const requestId = useRef(0);

  useEffect(() => {
    const url = new URL(window.location.href);
    const trimmed = query.trim();
    if (trimmed) url.searchParams.set("q", trimmed);
    else url.searchParams.delete("q");
    window.history.replaceState(window.history.state, "", url);

    if (!trimmed) {
      setState({results: [], loading: false, error: false});
      return;
    }

    const id = ++requestId.current;
    setState((s) => ({...s, loading: true, error: false}));
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(
          `${BASE_API_KITSU_URL}/anime?filter[text]=${encodeURIComponent(
            trimmed
          )}&page[limit]=${LIMIT}`
        );
        if (!response.ok) throw new Error(String(response.status));
        const json = (await response.json()) as {data: Anime[]};
        if (id !== requestId.current) return;
        setState({
          results: (json.data ?? [])
            .filter((a) => a?.attributes && !a.attributes.nsfw)
            .map(toAnimeItem),
          loading: false,
          error: false,
        });
      } catch {
        if (id !== requestId.current) return;
        setState({results: [], loading: false, error: true});
      }
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [query]);

  return {query, setQuery, ...state, hasQuery: query.trim().length > 0};
};
