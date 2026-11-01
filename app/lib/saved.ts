"use client";

import {useCallback, useSyncExternalStore} from "react";
import {AnimeItem} from "@lib/anime";

const STORAGE_KEY = "saved_anime";

/** What we keep per saved anime, enough to render every saved view offline. */
export type SavedAnime = {
  id: string;
  title: string;
  year: string | null;
  type: string | null;
  episodes: number | null;
  status: string | null;
  poster: string | null;
  cover: string | null;
  savedAt: number;
};

/** Shape written by the old site: {id, title, year: startDate, image: coverImage}. */
type LegacySaved = {
  id?: string;
  title?: string;
  year?: string | number;
  image?: {original?: string; large?: string} | null;
};

const isLegacy = (x: unknown): x is LegacySaved =>
  typeof x === "object" && x !== null && "image" in x && !("savedAt" in x);

const migrate = (raw: unknown[]): SavedAnime[] =>
  raw
    .map((entry, index): SavedAnime | null => {
      if (isLegacy(entry)) {
        if (!entry.id) return null;
        return {
          id: String(entry.id),
          title: entry.title || "Untitled",
          year: entry.year ? String(entry.year).slice(0, 4) : null,
          type: null,
          episodes: null,
          status: null,
          poster: null,
          cover: entry.image?.large || entry.image?.original || null,
          savedAt: index,
        };
      }
      const e = entry as SavedAnime;
      return e && e.id ? e : null;
    })
    .filter((e): e is SavedAnime => e !== null);

const EMPTY: SavedAnime[] = [];
let cache: SavedAnime[] | null = null;
const listeners = new Set<() => void>();

const read = (): SavedAnime[] => {
  if (cache) return cache;
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    cache = Array.isArray(parsed) ? migrate(parsed) : [];
  } catch {
    cache = [];
  }
  return cache;
};

const write = (next: SavedAnime[]) => {
  cache = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage full or blocked: keep the in-memory list for this visit.
  }
  listeners.forEach((l) => l());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      cache = null;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
};

export const toSaved = (item: AnimeItem): SavedAnime => ({
  id: item.id,
  title: item.title,
  year: item.year,
  type: item.type,
  episodes: item.episodes,
  status: item.status,
  poster: item.poster?.small ?? null,
  cover: item.cover?.large ?? null,
  savedAt: Date.now(),
});

/** One saved list shared by every component, kept in sync across tabs. */
export const useSaved = () => {
  const items = useSyncExternalStore(subscribe, read, () => EMPTY);

  const isSaved = useCallback(
    (id: string) => items.some((s) => s.id === id),
    [items]
  );

  const toggle = useCallback((item: AnimeItem) => {
    const current = read();
    write(
      current.some((s) => s.id === item.id)
        ? current.filter((s) => s.id !== item.id)
        : [...current, toSaved(item)]
    );
  }, []);

  const remove = useCallback((id: string) => {
    write(read().filter((s) => s.id !== id));
  }, []);

  const restore = useCallback((entry: SavedAnime) => {
    const current = read();
    if (!current.some((s) => s.id === entry.id)) write([...current, entry]);
  }, []);

  return {items, isSaved, toggle, remove, restore};
};
