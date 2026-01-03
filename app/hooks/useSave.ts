"use client";

import {Anime} from "@app-types/anime";
import {useEffect, useState} from "react";

export type SavedAnime = {
  id?: Anime["id"];
  title?: Anime["attributes"]["canonicalTitle"];
  year?: Anime["attributes"]["startDate"];
  image?: Anime["attributes"]["coverImage"];
};

const STORAGE_KEY = "saved_anime";

const useSave = (item?: SavedAnime) => {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!item?.id) {
      setIsSaved(false);
      return;
    }

    if (typeof window === "undefined") return;

    const saved: SavedAnime[] = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );

    setIsSaved(saved.some((anime) => anime.id === item.id));
  }, [item?.id]);

  const onSave = () => {
    if (!item?.id) return;
    if (typeof window === "undefined") return;

    const saved: SavedAnime[] = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );

    let updated: SavedAnime[];

    if (saved.some((anime) => anime.id === item.id)) {
      updated = saved.filter((anime) => anime.id !== item.id);
      setIsSaved(false);
    } else {
      updated = [...saved, item];
      setIsSaved(true);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return {
    isSaved,
    onSave,
  };
};

export default useSave;
