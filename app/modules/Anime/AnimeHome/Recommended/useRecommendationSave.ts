"use client";

import {useState, useEffect} from "react";

export type RecommendedSavedAnime = {
  id: number | string;
  title: string;
  image: string;
};

const STORAGE_KEY = "saved_recommendations";

const useRecommendationSave = (item?: RecommendedSavedAnime) => {
  const [saved, setSaved] = useState<RecommendedSavedAnime[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  // Load saved items from localStorage once
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return;
      const parsed: RecommendedSavedAnime[] = JSON.parse(stored);
      setSaved(parsed);
    } catch (error) {
      console.error("Failed to parse saved recommendations:", error);
    }
  }, []); // empty dependency → runs once

  useEffect(() => {
    if (!item) return;
    setIsSaved(saved.some((a) => a.id === item.id));
  }, [item, saved]);

  const onSave = () => {
    if (!item) return;
    let updated: RecommendedSavedAnime[] = [...saved];

    if (saved.some((a) => a.id === item.id)) {
      // Remove
      updated = updated.filter((a) => a.id !== item.id);
      setIsSaved(false);
    } else {
      // Add
      updated.push(item);
      setIsSaved(true);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setSaved(updated);
  };

  const remove = (id: number | string) => {
    const updated = saved.filter((a) => a.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setSaved(updated);
    if (item?.id === id) setIsSaved(false);
  };

  return {saved, isSaved, onSave, remove};
};

export default useRecommendationSave;
