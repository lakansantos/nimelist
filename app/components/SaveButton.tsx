"use client";

import cx from "classnames";
import {AnimeItem} from "@lib/anime";
import {useSaved} from "@lib/saved";

type Variant =
  | "simple-icon"
  | "simple-pill"
  | "reel-icon"
  | "reel-pill"
  | "block";

const BASE =
  "inline-flex items-center justify-center gap-2 font-semibold transition-colors";

const STYLES: Record<Variant, {base: string; on: string; off: string}> = {
  "simple-icon": {
    base: "h-10 w-10 rounded-lg border",
    on: "border-amber bg-amber text-amber-ink",
    off: "border-line-strong text-fg-soft hover:border-muted",
  },
  "simple-pill": {
    base: "min-h-[44px] rounded-[10px] border px-4",
    on: "border-amber bg-amber text-amber-ink",
    off: "border-line-strong text-fg-soft hover:border-muted",
  },
  "reel-icon": {
    base: "h-11 w-11 rounded-full",
    on: "bg-amber text-amber-ink",
    off: "bg-ink/60 text-fg hover:bg-ink/80",
  },
  "reel-pill": {
    base: "min-h-[48px] rounded-full border px-6",
    on: "border-fg bg-fg text-ink",
    off: "border-white/30 bg-ink/40 text-fg hover:border-white/60",
  },
  block: {
    base: "min-h-[52px] w-full rounded-xl px-5",
    on: "bg-amber text-amber-ink",
    off: "bg-fg text-ink",
  },
};

const BookmarkIcon = ({filled}: {filled: boolean}) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

type Props = {
  item: AnimeItem;
  variant: Variant;
  /** Text labels for pill/block variants. Icon variants use aria-label only. */
  labels?: {save: string; saved: string};
  className?: string;
};

const SaveButton = ({item, variant, labels, className}: Props) => {
  const {isSaved, toggle} = useSaved();
  const saved = isSaved(item.id);
  const style = STYLES[variant];
  const isIcon = variant.endsWith("icon");
  const text = saved ? labels?.saved ?? "Saved" : labels?.save ?? "Save";

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(item);
      }}
      aria-pressed={saved}
      aria-label={
        isIcon
          ? saved
            ? `Remove ${item.title} from saved`
            : `Save ${item.title}`
          : undefined
      }
      className={cx(BASE, style.base, saved ? style.on : style.off, className)}
    >
      <BookmarkIcon filled={saved} />
      {!isIcon && text}
    </button>
  );
};

export default SaveButton;
