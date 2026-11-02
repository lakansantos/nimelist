"use client";

import Link from "next/link";
import {useState} from "react";
import {CloseIcon} from "@components/icons";
import {SavedAnime, useSaved} from "@lib/saved";
import {sortSaved, SavedSort, savedMeta} from "@lib/savedView";
import AnimeImage from "@components/AnimeImage";

const SimpleSaved = () => {
  const {items, remove, restore} = useSaved();
  const [sort, setSort] = useState<SavedSort>("recent");
  const [last, setLast] = useState<SavedAnime | null>(null);
  const list = sortSaved(items, sort);
  const count = String(items.length).padStart(2, "0");

  const onRemove = (entry: SavedAnime) => {
    remove(entry.id);
    setLast(entry);
  };

  return (
    <div className="flex flex-col gap-4 md:gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3.5">
        <h1 className="font-display text-2xl font-extrabold tracking-[-0.03em] md:text-[32px]">
          Saved{" "}
          <span className="font-mono text-sm font-normal text-muted md:text-lg">
            {count}
          </span>
        </h1>
        {items.length > 0 && (
          <label className="inline-flex items-center gap-2.5 text-sm text-muted-strong max-md:w-full max-md:justify-between">
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SavedSort)}
              className="min-h-[40px] rounded-lg border border-line-strong bg-panel px-3 text-fg-soft"
            >
              <option value="recent">Recently saved</option>
              <option value="az">Title A–Z</option>
              <option value="year">Newest first</option>
            </select>
          </label>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-start gap-2.5 rounded-[14px] border border-dashed border-line-strong p-7 md:p-10">
          <span className="text-[17px] font-semibold">Nothing saved yet</span>
          <span className="text-muted-strong">
            Use the bookmark on any title to keep it here. Your list stays in
            this browser.
          </span>
          <Link
            href="/browse"
            className="mt-1.5 inline-flex min-h-[44px] items-center rounded-[10px] bg-amber px-[18px] font-semibold text-amber-ink"
          >
            Browse anime
          </Link>
        </div>
      ) : (
        <ul className="overflow-hidden rounded-[14px] border border-line bg-panel">
          {list.map((entry) => (
            <li
              key={entry.id}
              className="flex items-center gap-3 border-t border-line py-2 pl-3 pr-2 first:border-t-0 md:px-4"
            >
              <Link
                href={`/${entry.id}`}
                className="flex min-w-0 flex-1 items-center gap-3.5 hover:text-amber"
              >
                <AnimeImage
                  fallback="icon"
                  src={entry.poster || entry.cover}
                  alt=""
                  width={80}
                  height={114}
                  className="h-[57px] w-10 shrink-0 rounded-md bg-raised object-cover"
                />
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="truncate text-sm font-medium md:text-[15px]">
                    {entry.title}
                  </span>
                  <span
                    className={
                      entry.status === "Ongoing"
                        ? "font-mono text-[11px] text-amber md:text-xs"
                        : "font-mono text-[11px] text-muted md:text-xs"
                    }
                  >
                    {savedMeta(entry)}
                  </span>
                </span>
              </Link>
              <button
                type="button"
                onClick={() => onRemove(entry)}
                aria-label={`Remove ${entry.title} from saved`}
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-lg text-sm text-muted hover:text-fg md:border md:border-line-strong md:px-3"
              >
                <CloseIcon />
                <span className="hidden md:inline">Remove</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {last && !items.some((s) => s.id === last.id) && (
        <div
          role="status"
          className="fixed inset-x-3 bottom-[92px] z-50 flex items-center justify-between gap-3.5 rounded-xl bg-fg-soft py-2 pl-4 pr-2 text-ground shadow-2xl md:inset-x-auto md:bottom-7 md:right-7"
        >
          <span className="truncate font-medium">Removed {last.title}</span>
          <button
            type="button"
            onClick={() => {
              restore(last);
              setLast(null);
            }}
            className="min-h-[38px] shrink-0 rounded-lg bg-ground px-3.5 font-semibold text-amber"
          >
            Undo
          </button>
        </div>
      )}
    </div>
  );
};

export default SimpleSaved;
