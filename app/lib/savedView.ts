import {SavedAnime} from "@lib/saved";

export type SavedSort = "recent" | "az" | "year";

/** Recent = most recently saved first. */
export const sortSaved = (items: SavedAnime[], sort: SavedSort) => {
  const list = items.slice();
  if (sort === "az") return list.sort((a, b) => a.title.localeCompare(b.title));
  if (sort === "year")
    return list.sort((a, b) => Number(b.year ?? 0) - Number(a.year ?? 0));
  return list.sort((a, b) => b.savedAt - a.savedAt);
};

export const savedMeta = (entry: SavedAnime) => {
  const eps =
    entry.episodes !== null
      ? `${entry.episodes} ${entry.episodes === 1 ? "ep" : "eps"}`
      : entry.status === "Ongoing"
      ? "Ongoing"
      : null;
  return [entry.year, entry.type, eps].filter(Boolean).join(" · ") || "Saved";
};
