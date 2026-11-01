"use client";

import cx from "classnames";
import Image from "next/image";
import Link from "next/link";
import {useState} from "react";
import {CloseIcon} from "@components/icons";
import {SavedAnime, useSaved} from "@lib/saved";
import {SavedSort, savedMeta, sortSaved} from "@lib/savedView";
import {revealStyle, useStepReveal} from "./ReelChrome";

const ReelSaved = () => {
  const {items, remove, restore} = useSaved();
  const [sort, setSort] = useState<SavedSort>("recent");
  const [last, setLast] = useState<SavedAnime | null>(null);
  const list = sortSaved(items, sort);
  const tick = useStepReveal(`${sort}-${items.length > 0}`, 30);
  const count = String(items.length).padStart(2, "0");

  const pill = (value: SavedSort, label: string) => (
    <button
      type="button"
      onClick={() => setSort(value)}
      aria-pressed={sort === value}
      className={cx(
        "min-h-[40px] rounded-full px-4 text-sm font-semibold",
        sort === value ? "bg-fg text-ink" : "text-[#B4BAC7] hover:text-fg"
      )}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col gap-6 md:gap-9">
      <div className="flex flex-wrap items-end justify-between gap-4 md:gap-5">
        <h1 className="flex items-start gap-3 font-display text-[80px] font-extrabold leading-[0.85] tracking-[-0.05em] md:gap-[18px] md:text-[clamp(64px,10vw,150px)]">
          Saved
          <span className="text-[36px] text-transparent [-webkit-text-stroke:1.5px_#F5B544] md:text-[0.45em] md:[-webkit-text-stroke:2px_#F5B544]">
            {count}
          </span>
        </h1>
        {items.length > 0 && (
          <div
            role="group"
            aria-label="Sort"
            className="flex gap-1 rounded-full bg-[#12151C] p-1"
          >
            {pill("recent", "Recently saved")}
            {pill("az", "A–Z")}
          </div>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-start gap-3.5 md:gap-[18px] md:py-10">
          <span className="font-display text-[52px] font-extrabold leading-[0.9] tracking-[-0.05em] text-[#2A3040] md:text-[clamp(56px,8vw,110px)]">
            Empty reel.
          </span>
          <p className="max-w-[520px] text-[15px] leading-relaxed text-[#D5D9E2] md:text-lg">
            Tap Save on any scene, poster or details page and it lands here.
            Your list stays on this device.
          </p>
          <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
            <Link
              href="/"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-amber px-6 font-semibold text-amber-ink"
            >
              Roll the reel
            </Link>
            <Link
              href="/browse"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-[#2A3040] px-6 font-semibold hover:border-fg"
            >
              Browse all anime
            </Link>
          </div>
        </div>
      ) : (
        <div className="no-scrollbar -mx-5 overflow-x-auto rounded-md bg-[#0E1016] py-[22px] [background-image:radial-gradient(circle,#07080B_4px,transparent_4.5px),radial-gradient(circle,#07080B_4px,transparent_4.5px)] [background-position:0_0,0_100%] [background-repeat:repeat-x,repeat-x] [background-size:22px_22px,22px_22px] md:mx-0">
          <ul className="flex w-max gap-4 px-5 md:gap-[22px] md:px-6">
            {list.map((entry, i) => (
              <li
                key={entry.id}
                className="flex w-[180px] flex-col gap-3 md:w-60"
                style={revealStyle(tick, i, "x")}
              >
                <span className="font-mono text-[11px] tracking-[0.1em] text-[#9AA1B2]">
                  FRAME {String(i + 1).padStart(2, "0")}
                </span>
                <Link
                  href={`/${entry.id}`}
                  className="group flex flex-col gap-2.5"
                >
                  {entry.poster || entry.cover ? (
                    <Image
                      src={(entry.poster || entry.cover) as string}
                      alt=""
                      width={284}
                      height={402}
                      className="aspect-[2/3] w-full rounded bg-[#1B2130] object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden
                      className="block aspect-[2/3] w-full rounded bg-[#1B2130]"
                    />
                  )}
                  <span className="line-clamp-2 min-h-[2.75em] font-semibold leading-snug group-hover:text-amber">
                    {entry.title}
                  </span>
                </Link>
                <span className="font-mono text-xs uppercase text-[#9AA1B2]">
                  {savedMeta(entry)}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    remove(entry.id);
                    setLast(entry);
                  }}
                  aria-label={`Remove ${entry.title} from saved`}
                  className="mt-auto inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#2A3040] font-medium hover:border-fg"
                >
                  <CloseIcon />
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {last && !items.some((s) => s.id === last.id) && (
        <div
          role="status"
          className="fixed inset-x-4 bottom-24 z-50 flex items-center justify-between gap-4 rounded-full bg-fg py-2.5 pl-5 pr-2.5 text-ink shadow-2xl md:inset-x-auto md:bottom-7 md:left-1/2 md:-translate-x-1/2"
        >
          <span className="truncate font-medium">Removed {last.title}</span>
          <button
            type="button"
            onClick={() => {
              restore(last);
              setLast(null);
            }}
            className="min-h-[40px] shrink-0 rounded-full bg-ink px-4 font-semibold text-amber"
          >
            Undo
          </button>
        </div>
      )}
    </div>
  );
};

export default ReelSaved;
