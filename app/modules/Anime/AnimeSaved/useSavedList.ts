"use client";

import {useEffect, useState} from "react";
import {SavedAnime} from "@app-types/savedAnime";

const STORAGE_KEY = "saved_anime";

const useSavedList = () => {
  const [saved, setSaved] = useState<SavedAnime[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    try {
      setSaved(JSON.parse(stored));
    } catch {
      setSaved([]);
    }
  }, []);

  const remove = (id: string) => {
    const updated = saved.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setSaved(updated);
  };

  return {saved, remove};
};

export default useSavedList;
