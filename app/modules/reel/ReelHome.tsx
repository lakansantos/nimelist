"use client";

import cx from "classnames";
import Image from "next/image";
import Link from "next/link";
import {
  KeyboardEvent as ReactKeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {LogoMark} from "@components/Logo";
import ModeToggle from "@components/ModeToggle";
import SaveButton from "@components/SaveButton";
import {ArrowDownIcon, MenuIcon, SearchIcon} from "@components/icons";
import {AnimeItem, episodesLabel} from "@lib/anime";
import {switchModeHref} from "@lib/mode";
import {useSaved} from "@lib/saved";
import {
  clamp01,
  stepped,
  usePrefersReducedMotion,
  useReelEngine,
} from "./useReelEngine";

const FRAMES_PER_UNIT = 48;
const pad = (n: number, length = 2) => String(n).padStart(length, "0");

type Props = {scenes: AnimeItem[]; top: AnimeItem[]};

type SceneNodes = {
  bg: HTMLElement[];
  rank: HTMLElement | null;
  title: HTMLElement | null;
  meta: HTMLElement[];
  poster: HTMLElement | null;
  ja: HTMLElement | null;
  cel: HTMLElement | null;
  wipeA: HTMLElement | null;
  wipeB: HTMLElement | null;
};

type Nodes = {
  letters: HTMLElement[];
  fan: HTMLElement[];
  arrow: HTMLElement | null;
  scenes: SceneNodes[];
  recRow: HTMLElement | null;
  recItems: HTMLElement[];
  recEnd: HTMLElement | null;
  segs: HTMLElement[];
  frame: HTMLElement | null;
};

const collect = (root: HTMLElement, sceneCount: number): Nodes => {
  const all = (sel: string, scope: ParentNode = root) =>
    Array.from(scope.querySelectorAll<HTMLElement>(sel));
  const one = (sel: string, scope: ParentNode = root) =>
    scope.querySelector<HTMLElement>(sel);
  return {
    letters: all("[data-letter]"),
    fan: all("[data-fan]"),
    arrow: one("[data-arrow]"),
    scenes: Array.from({length: sceneCount}, (_, i) => {
      const scope = one(`[data-scene="${i}"]`) ?? root;
      return {
        bg: all("[data-part=bg]", scope),
        rank: one("[data-part=rank]", scope),
        title: one("[data-part=title]", scope),
        meta: all("[data-part=meta]", scope),
        poster: one("[data-part=poster]", scope),
        ja: one("[data-part=ja]", scope),
        cel: one("[data-part=cel]", scope),
        wipeA: one("[data-part=wipeA]", scope),
        wipeB: one("[data-part=wipeB]", scope),
      };
    }),
    recRow: one("[data-rec-row]"),
    recItems: all("[data-rec]"),
    recEnd: one("[data-rec-end]"),
    segs: all("[data-seg]"),
    frame: one("[data-frame]"),
  };
};

const ReelHome = ({scenes, top}: Props) => {
  const sceneCount = scenes.length;
  const units = 1 + sceneCount + 2;
  const rootRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<Nodes | null>(null);
  const desktopRef = useRef(true);
  const reduced = usePrefersReducedMotion();
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const {items: saved} = useSaved();

  const onFrame = useCallback(
    (u: number) => {
      const root = rootRef.current;
      if (!root) return;
      if (!nodesRef.current) nodesRef.current = collect(root, sceneCount);
      const n = nodesRef.current;
      const rm = reducedRef.current;
      const step = (x: number, count: number) => (rm ? 1 : stepped(x, count));

      // Opening: letters and the poster fan leave frame by frame.
      const t = clamp01(u);
      n.letters.forEach((el, i) => {
        const s = rm ? 0 : stepped(t * 1.5 - i * 0.06, 6);
        el.style.transform = `translateY(${(-s * 130).toFixed(0)}%) rotate(${(
          -s * 10
        ).toFixed(0)}deg)`;
      });
      n.fan.forEach((el, i) => {
        // Finer steps for big moving pictures so they don't stutter. The fan
        // drops out of the bottom so it never crosses the text or header.
        const s = rm ? 0 : stepped(t * 1.6 - i * 0.1, 16);
        const spread = desktopRef.current ? 56 : 46;
        el.style.transform = `translate(${(i - 2) * spread}px, ${(
          s * 120
        ).toFixed(0)}svh) rotate(${-14 + i * 7}deg)`;
      });
      if (n.arrow)
        n.arrow.style.transform =
          rm || Math.floor(u * FRAMES_PER_UNIT) % 2 === 0
            ? "none"
            : "translateY(4px)";

      // Active scene: 12 frames per scene.
      if (u >= 1 && u < 1 + sceneCount) {
        const index = Math.min(sceneCount - 1, Math.floor(u - 1));
        const local = u - 1 - index;
        const q = rm ? 0 : stepped(local, 12);
        const s = n.scenes[index];
        const desktop = desktopRef.current;
        s.bg.forEach((el) => {
          el.style.transform = desktop
            ? `scale(${(1.16 - q * 0.16).toFixed(3)}) translateX(${(
                q * -2.5
              ).toFixed(2)}%)`
            : `scale(${(1.22 - q * 0.22).toFixed(3)}) translateY(${(
                q * -3
              ).toFixed(2)}%)`;
        });
        const rankReveal = (1 - step(local / 0.3, 6)) * 100;
        if (s.rank)
          s.rank.style.clipPath = desktop
            ? `inset(${rankReveal}% 0 0 0)`
            : `inset(0 ${rankReveal}% 0 0)`;
        if (s.title)
          s.title.style.transform = `translateY(${(
            (1 - step((local - 0.08) / 0.3, 6)) *
            110
          ).toFixed(1)}%)`;
        s.meta.forEach(
          (el) => (el.style.opacity = rm || local > 0.3 ? "1" : "0")
        );
        if (s.poster)
          s.poster.style.transform = `translateY(-50%) rotate(${(
            -9 +
            q * 12
          ).toFixed(1)}deg) translateY(${(30 - q * 50).toFixed(0)}px)`;
        if (s.ja)
          s.ja.style.clipPath = `inset(0 0 ${(
            (1 - step((local - 0.1) / 0.35, 8)) *
            100
          ).toFixed(1)}% 0)`;
        if (s.cel)
          s.cel.textContent = `CEL ${pad(index + 1)} · ${pad(
            Math.min(12, Math.floor(q * 12) + 1)
          )}/12`;
        const wipe = (start: number, length: number, count: number) =>
          rm ? 1.3 : stepped((local - start) / length, count) * 1.3;
        if (s.wipeB)
          s.wipeB.style.transform = desktop
            ? `translateX(${wipe(0, 0.06, 3) * 100}%) skewX(-12deg)`
            : `translateY(${-wipe(0, 0.06, 3) * 100}%) skewY(-10deg)`;
        if (s.wipeA)
          s.wipeA.style.transform = desktop
            ? `translateX(${wipe(0.03, 0.09, 5) * 100}%) skewX(-12deg)`
            : `translateY(${-wipe(0.03, 0.09, 5) * 100}%) skewY(-10deg)`;
      }

      // Top rated: vertical scroll pans the row sideways.
      const r = clamp01((u - 1 - sceneCount) / 2);
      if (n.recRow)
        n.recRow.style.transform = `translateX(calc((100vw - 100%) * ${(rm
          ? r
          : stepped(r, 48)
        ).toFixed(3)}))`;
      n.recItems.forEach((el, i) => {
        el.style.transform = rm
          ? "none"
          : `rotate(${((i % 2 ? 1 : -1) * (3 - stepped(r, 6) * 3)).toFixed(
              1
            )}deg)`;
      });
      if (n.recEnd) n.recEnd.style.opacity = r > 0.9 ? "1" : "0";

      // HUD.
      n.segs.forEach(
        (el, i) => (el.style.width = `${(clamp01(u - i) * 100).toFixed(1)}%`)
      );
      if (n.frame)
        n.frame.textContent = pad(
          Math.min(units * FRAMES_PER_UNIT, Math.floor(u * FRAMES_PER_UNIT)),
          4
        );
    },
    [sceneCount, units]
  );

  const {segment, goTo, progress} = useReelEngine({
    units,
    sceneCount,
    rootRef,
    onFrame,
  });

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => {
      desktopRef.current = media.matches;
      onFrame(progress());
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [onFrame, progress]);

  useEffect(() => {
    onFrame(progress());
  }, [reduced, onFrame, progress]);

  const anchors = [0, ...scenes.map((_, i) => 1.45 + i), 1 + sceneCount, units];

  // Keyboard: arrows / Page keys / Home / End move between scenes.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (menuOpen || e.altKey || e.ctrlKey || e.metaKey) return;
      const target = e.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      const u = progress();
      let next: number | undefined;
      if (e.key === "ArrowDown" || e.key === "PageDown")
        next = anchors.find((a) => a > u + 0.05);
      else if (e.key === "ArrowUp" || e.key === "PageUp")
        next = [...anchors].reverse().find((a) => a < u - 0.05);
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = units;
      if (next !== undefined) {
        e.preventDefault();
        goTo(next, !reduced);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const isIntro = segment.kind === "intro";
  const isRec = segment.kind === "rec";
  const activeScene = segment.kind === "scene" ? segment.index : -1;
  const sceneLabel = isIntro
    ? "OPENING"
    : isRec
    ? "TOP RATED"
    : `SCENE ${pad(activeScene + 1)} / ${pad(sceneCount)} — ${scenes[
        activeScene
      ]?.title.toUpperCase()}`;

  const strip = [
    {
      key: "opening",
      title: "Opening",
      at: 0,
      active: isIntro,
      thumb: null as string | null,
    },
    ...scenes.map((s, i) => ({
      key: s.id,
      title: s.title,
      at: 1.45 + i,
      active: activeScene === i,
      thumb: s.poster?.tiny ?? null,
    })),
    {
      key: "top",
      title: "Top rated",
      at: 1 + sceneCount,
      active: isRec,
      thumb: top[0]?.poster?.tiny ?? null,
    },
  ];

  const closeMenu = () => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  };
  const menuJump = (u: number) => {
    setMenuOpen(false);
    goTo(u, !reduced);
  };

  return (
    <div
      ref={rootRef}
      className="relative"
      style={{height: `${(units + 1) * 100}svh`}}
    >
      <h1 className="sr-only">Nimelist: trending anime this week</h1>
      <nav aria-label="Trending anime" className="sr-only">
        <ol>
          {scenes.map((s) => (
            <li key={s.id}>
              <Link href={`/${s.id}`}>{s.title}</Link>
            </li>
          ))}
        </ol>
      </nav>

      <div className="sticky top-0 h-screen-s overflow-hidden">
        {/* Opening */}
        <section
          aria-label="Opening"
          aria-hidden={!isIntro}
          className={cx(
            "absolute inset-0 flex flex-col justify-start gap-4 px-5 pb-[150px] pt-[84px] md:justify-center md:gap-7 md:px-[clamp(20px,5vw,72px)] md:pb-0 md:pt-0",
            !isIntro && "invisible"
          )}
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#9AA1B2] md:text-[13px]">
            A scroll-driven reel of what&apos;s trending
          </span>
          <p
            aria-hidden
            className="flex flex-wrap font-display text-[min(128px,14svh,34vw)] font-extrabold leading-[0.82] tracking-[-0.06em] md:text-[clamp(72px,16vw,250px)] md:leading-[0.85] md:tracking-[-0.05em]"
          >
            {/* Each line clips its own letters, so they leave upward without
                crossing the tagline or header. */}
            {["nime", "list"].map((word, w) => (
              <span
                key={word}
                className="-my-[0.06em] flex overflow-hidden py-[0.06em] max-md:basis-full"
              >
                {word.split("").map((ch, i) => (
                  <span
                    key={i}
                    data-letter
                    className={cx(
                      "inline-block will-change-transform",
                      w === 0 && i === 0 && "text-amber"
                    )}
                  >
                    {ch}
                  </span>
                ))}
              </span>
            ))}
          </p>
          <div className="flex flex-wrap items-center gap-2.5 text-[15px] text-[#D5D9E2] md:gap-3.5 md:text-base">
            <span
              data-arrow
              className="grid h-11 w-11 place-items-center rounded-full border border-[#3A4152]"
            >
              <ArrowDownIcon />
            </span>
            <span>
              <span className="md:hidden">Swipe up to roll</span>
              <span className="hidden md:inline">Scroll to roll the reel</span>
            </span>
            <button
              type="button"
              onClick={() => goTo(1 + sceneCount, !reduced)}
              className="min-h-[44px] rounded-full border border-[#3A4152] px-4 font-semibold text-fg hover:border-fg"
            >
              Skip the reel
            </button>
            <Link
              href="/browse"
              className="hidden min-h-[44px] items-center px-2 font-semibold hover:text-amber md:inline-flex"
            >
              Browse all anime →
            </Link>
            <a
              href={switchModeHref("simple", "/")}
              className="inline-flex min-h-[44px] items-center px-1 font-semibold text-muted-strong hover:text-amber"
            >
              Prefer it calm? Simple mode
            </a>
          </div>
          {/* Phones: the fan gets its own space below the text, so it never covers it. */}
          <div
            aria-hidden
            className="pointer-events-none relative min-h-0 flex-1 max-md:[@media(max-height:640px)]:hidden md:absolute md:bottom-[max(18svh,190px)] md:right-[14vw] md:h-0 md:w-0 md:flex-none"
          >
            <div className="absolute left-1/2 top-1/2 h-0 w-0 md:static">
              {scenes.map((s, i) =>
                s.poster ? (
                  <Image
                    key={s.id}
                    data-fan
                    src={s.poster.small}
                    alt=""
                    width={284}
                    height={402}
                    priority={i < 2}
                    className="absolute -left-[min(60px,7svh)] -top-[min(90px,10.5svh)] aspect-[2/3] will-change-transform w-[min(120px,14svh)] max-w-none border-4 border-fg object-cover md:-left-[100px] md:-top-[150px] md:w-[200px] md:border-[5px]"
                  />
                ) : null
              )}
            </div>
          </div>
        </section>

        {/* Scenes: all in the HTML, one visible at a time. */}
        {scenes.map((s, i) => {
          const active = activeScene === i;
          const cover = s.cover?.large;
          const poster = s.poster?.large;
          return (
            <section
              key={s.id}
              data-scene={i}
              aria-label={s.title}
              aria-hidden={!active}
              className={cx("absolute inset-0", !active && "invisible")}
            >
              {poster && (
                <Image
                  data-part="bg"
                  src={poster}
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-cover will-change-transform md:hidden"
                />
              )}
              {(cover || poster) && (
                <Image
                  data-part="bg"
                  src={(cover || poster) as string}
                  alt=""
                  fill
                  sizes="100vw"
                  className={cx(
                    "hidden object-cover will-change-transform md:block",
                    cover
                      ? "brightness-[0.62]"
                      : "blur-[40px] brightness-50 saturate-[1.3]"
                  )}
                  style={{objectPosition: s.coverPosition}}
                />
              )}
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,8,11,0.55)_0%,rgba(7,8,11,0)_22%,rgba(7,8,11,0.2)_45%,rgba(7,8,11,0.95)_78%)] md:bg-[linear-gradient(90deg,rgba(7,8,11,0.88)_0%,rgba(7,8,11,0.5)_50%,rgba(7,8,11,0.15)_100%)]"
              />
              {s.titleJa && (
                <span
                  data-part="ja"
                  lang="ja"
                  aria-hidden
                  className="absolute right-3.5 top-24 max-h-[34svh] overflow-hidden whitespace-nowrap font-jp text-[min(34px,4.4svh)] font-black leading-none md:max-h-none md:overflow-visible text-fg/85 [text-shadow:0_2px_12px_rgba(0,0,0,0.5)] [writing-mode:vertical-rl] md:right-[clamp(96px,9vw,140px)] md:top-[12svh] md:text-[clamp(40px,6vw,92px)] md:text-fg/[0.14] md:[text-shadow:none]"
                >
                  {s.titleJa}
                </span>
              )}
              <div
                data-part="rank"
                aria-hidden
                className="absolute left-[18px] top-[84px] font-display text-[min(150px,15svh)] font-extrabold leading-[0.8] tracking-[-0.06em] text-transparent [-webkit-text-stroke:2px_#F5B544] md:left-[clamp(20px,5vw,72px)] md:top-[11svh] md:text-[clamp(120px,20vw,320px)] md:tracking-[-0.05em]"
              >
                {pad(i + 1)}
              </div>
              <div className="absolute bottom-[140px] left-5 right-[60px] flex flex-col gap-3 md:bottom-[15svh] md:left-[clamp(20px,5vw,72px)] md:right-auto md:max-w-[min(640px,86vw)] md:gap-[18px]">
                <span
                  data-part="meta"
                  className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#D5D9E2] md:text-[13px] md:tracking-[0.04em]"
                >
                  {[s.year, s.type, episodesLabel(s), s.ageRating]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
                <div className="overflow-hidden">
                  <h2
                    data-part="title"
                    className="font-display text-[46px] font-extrabold leading-[0.92] tracking-[-0.04em] md:text-[clamp(44px,6.4vw,100px)]"
                  >
                    {s.title}
                  </h2>
                </div>
                {s.synopsis && (
                  <p
                    data-part="meta"
                    className="line-clamp-2 text-[15px] leading-normal text-[#D5D9E2] md:line-clamp-3 md:text-[17px]"
                  >
                    {s.synopsis}
                  </p>
                )}
                <div data-part="meta" className="flex gap-2.5 md:gap-3">
                  <Link
                    href={`/${s.id}`}
                    className="inline-flex min-h-[48px] flex-1 items-center justify-center rounded-full bg-amber px-[22px] font-semibold text-amber-ink md:flex-none"
                  >
                    More info
                  </Link>
                  <SaveButton
                    item={s}
                    variant="reel-icon"
                    className="!h-12 !w-12 border border-white/30 md:hidden"
                  />
                  <SaveButton
                    item={s}
                    variant="reel-pill"
                    className="hidden md:inline-flex"
                  />
                </div>
              </div>
              {poster && (
                <div
                  data-part="poster"
                  className="absolute right-[clamp(120px,14vw,240px)] top-1/2 hidden w-[clamp(200px,20vw,300px)] md:block"
                >
                  <Image
                    src={s.poster?.medium ?? poster}
                    alt=""
                    width={390}
                    height={554}
                    className="aspect-[2/3] w-full border-[6px] border-fg object-cover shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
                  />
                  <span
                    data-part="cel"
                    className="mt-2.5 block font-mono text-xs tracking-[0.08em] text-[#D5D9E2]"
                  >
                    CEL {pad(i + 1)} · 01/12
                  </span>
                </div>
              )}
              <div
                data-part="wipeA"
                aria-hidden
                className="absolute -inset-y-[20%] inset-x-0 bg-amber md:inset-y-0 md:-left-[20%] md:w-[140%]"
              />
              <div
                data-part="wipeB"
                aria-hidden
                className="absolute -inset-y-[20%] inset-x-0 bg-ink md:inset-y-0 md:-left-[20%] md:w-[140%]"
              />
            </section>
          );
        })}

        {/* Top rated */}
        <section
          aria-labelledby="reel-top"
          aria-hidden={!isRec}
          className={cx(
            "absolute inset-0 flex flex-col justify-start gap-4 pb-[140px] pt-[84px] md:justify-center md:gap-9 md:pb-0 md:pt-0",
            !isRec && "invisible"
          )}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-4 px-5 md:px-[clamp(20px,5vw,72px)]">
            <h2
              id="reel-top"
              className="font-display text-[clamp(40px,6svh,72px)] font-extrabold leading-[0.85] tracking-[-0.05em] md:text-[clamp(56px,9vw,140px)]"
            >
              Top rated
            </h2>
            <div data-rec-end className="flex flex-wrap gap-x-5 opacity-0">
              <Link
                href="/browse?list=top"
                className="inline-flex min-h-[44px] items-center font-semibold hover:text-amber"
              >
                End of the reel — browse all anime →
              </Link>
              <a
                href={switchModeHref("simple", "/")}
                className="hidden min-h-[44px] items-center font-semibold text-muted-strong hover:text-amber md:inline-flex"
              >
                or switch to Simple mode
              </a>
            </div>
          </div>
          <ul
            data-rec-row
            className="flex w-max gap-4 px-5 will-change-transform md:gap-7 md:px-[clamp(20px,5vw,72px)]"
          >
            {top.map((item) => (
              <li
                key={item.id}
                data-rec
                className="w-[min(200px,22svh)] shrink-0 md:w-[clamp(170px,17vw,250px)]"
              >
                <Link
                  href={`/${item.id}`}
                  className="group flex flex-col gap-2.5 md:gap-3"
                >
                  {item.poster ? (
                    <Image
                      src={item.poster.small}
                      alt=""
                      width={284}
                      height={402}
                      className="aspect-[2/3] w-full rounded-xl object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden
                      className="aspect-[2/3] w-full rounded-xl bg-raised"
                    />
                  )}
                  <span className="truncate text-sm font-semibold group-hover:text-amber md:text-[15px]">
                    {item.title}
                  </span>
                  <span className="font-mono text-[11px] uppercase text-[#9AA1B2] md:text-xs">
                    {[item.year, item.type].filter(Boolean).join(" · ")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Header */}
        <header className="absolute inset-x-0 top-0 flex items-center justify-between gap-4 px-4 py-3.5 md:px-[clamp(20px,5vw,72px)] md:py-5">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goTo(0, !reduced);
            }}
            aria-label="nimelist, back to the start of the reel"
            className="flex min-h-[44px] min-w-[44px] items-center gap-2.5 font-display text-[22px] font-extrabold tracking-[-0.03em] text-fg"
          >
            <LogoMark size={30} className="text-fg" />
            <span className="hidden md:inline">nimelist</span>
          </a>
          <span
            aria-live="polite"
            className="font-mono text-[11px] tracking-[0.12em] text-[#D5D9E2] md:text-xs"
          >
            <span className="md:hidden">
              {isIntro
                ? "OPENING"
                : isRec
                ? "TOP RATED"
                : `SCENE ${pad(activeScene + 1)}/${pad(sceneCount)}`}
            </span>
            <span className="hidden md:inline">{sceneLabel}</span>
          </span>
          <div className="flex gap-2.5">
            <ModeToggle
              current="reel"
              look="reel"
              className="hidden md:inline-flex"
            />
            <Link
              href="/search"
              aria-label="Search anime"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-ink/40 hover:border-white/60"
            >
              <SearchIcon />
            </Link>
            <Link
              href="/saved"
              className="hidden min-h-[44px] items-center gap-2 rounded-full border border-white/25 bg-ink/40 px-4 font-semibold hover:border-white/60 md:inline-flex"
            >
              Saved
              <span className="min-w-[20px] rounded-full bg-amber px-1.5 text-center text-xs text-amber-ink">
                {pad(saved.length)}
              </span>
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-haspopup="dialog"
              className="hidden min-h-[44px] items-center gap-2.5 rounded-full bg-fg px-[18px] font-semibold text-ink md:inline-flex"
            >
              Menu <MenuIcon />
            </button>
          </div>
        </header>

        {/* Film strip: right edge on desktop, bottom on phones. */}
        <nav
          aria-label="Scenes"
          className="absolute right-[clamp(20px,3vw,40px)] top-1/2 hidden -translate-y-1/2 flex-col gap-2 rounded-[10px] bg-ink/55 px-2.5 py-3 md:flex"
        >
          {strip.map((s) => (
            <StripButton
              key={s.key}
              title={s.title}
              active={s.active}
              thumb={s.thumb}
              onJump={() => goTo(s.at, !reduced)}
              size="desktop"
            />
          ))}
        </nav>

        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2.5 px-3 pb-[max(18px,env(safe-area-inset-bottom))] md:flex-row md:items-center md:gap-5 md:px-[clamp(20px,5vw,72px)] md:pb-[18px]">
          <div className="flex items-center justify-between px-1.5 font-mono text-[10px] tracking-[0.08em] text-[#B4BAC7] md:order-1 md:px-0 md:text-xs md:text-[#D5D9E2]">
            <span className="whitespace-nowrap">
              FRAME <span data-frame>0000</span> /{" "}
              {pad(units * FRAMES_PER_UNIT, 4)}
            </span>
            <span className="md:hidden">12 FPS</span>
          </div>
          <div aria-hidden className="hidden flex-1 gap-1 md:order-2 md:flex">
            {Array.from({length: units}, (_, i) => (
              <span
                key={i}
                className="relative h-[3px] flex-1 overflow-hidden bg-[#2A3040]"
              >
                <span
                  data-seg
                  className="absolute inset-y-0 left-0 w-0 bg-amber"
                />
              </span>
            ))}
          </div>
          <span className="hidden whitespace-nowrap font-mono text-xs tracking-[0.08em] text-[#D5D9E2] md:order-3 md:inline">
            ↑ ↓ SCENES · 12 FPS
          </span>
          <div className="flex items-stretch gap-2 md:hidden">
            <nav
              aria-label="Scenes"
              className="no-scrollbar flex flex-1 gap-1.5 overflow-x-auto rounded-2xl bg-[rgba(20,23,31,0.82)] p-2"
            >
              {strip.map((s) => (
                <StripButton
                  key={s.key}
                  title={s.title}
                  active={s.active}
                  thumb={s.thumb}
                  onJump={() => goTo(s.at, !reduced)}
                  size="mobile"
                />
              ))}
            </nav>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-haspopup="dialog"
              aria-label={`Menu, ${saved.length} saved`}
              className="relative flex w-[66px] shrink-0 flex-col items-center justify-center gap-1 rounded-2xl bg-fg text-[11px] font-semibold text-ink"
            >
              <span className="absolute right-1.5 top-1.5 min-w-[18px] rounded-full bg-amber px-1 text-center text-[10px] text-amber-ink">
                {pad(saved.length)}
              </span>
              <MenuIcon size={20} />
              Menu
            </button>
          </div>
        </div>

        {menuOpen && (
          <ReelMenu
            onClose={closeMenu}
            savedCount={saved.length}
            current={isIntro ? 0 : isRec ? 2 : 1}
            jump={menuJump}
            sceneCount={sceneCount}
          />
        )}
      </div>
    </div>
  );
};

type StripProps = {
  title: string;
  active: boolean;
  thumb: string | null;
  onJump: () => void;
  size: "desktop" | "mobile";
};

const StripButton = ({title, active, thumb, onJump, size}: StripProps) => (
  <button
    type="button"
    onClick={onJump}
    aria-label={`Jump to ${title}`}
    aria-current={active ? "step" : undefined}
    className={cx(
      "relative grid shrink-0 place-items-center overflow-hidden border-2 bg-[#1B2130]",
      size === "desktop" ? "h-[58px] w-11 rounded" : "h-[50px] w-9 rounded-md",
      active
        ? "border-amber opacity-100"
        : "border-transparent opacity-50 hover:opacity-80"
    )}
  >
    {thumb ? (
      <Image src={thumb} alt="" fill sizes="44px" className="object-cover" />
    ) : (
      <LogoMark size={size === "desktop" ? 26 : 22} className="text-fg" />
    )}
  </button>
);

type MenuProps = {
  onClose: () => void;
  savedCount: number;
  current: 0 | 1 | 2;
  jump: (u: number) => void;
  sceneCount: number;
};

const ReelMenu = ({
  onClose,
  savedCount,
  current,
  jump,
  sceneCount,
}: MenuProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const visible = Array.from(
      dialogRef.current?.querySelectorAll<HTMLElement>("[data-autofocus]") ?? []
    ).find((el) => el.offsetParent !== null);
    visible?.focus();
  }, []);

  const onKeyDown = (e: ReactKeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
      return;
    }
    if (e.key !== "Tab" || !dialogRef.current) return;
    const focusable = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>("a[href], button")
    ).filter((el) => el.offsetParent !== null);
    const firstEl = focusable[0];
    const lastEl = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === firstEl) {
      e.preventDefault();
      lastEl.focus();
    } else if (!e.shiftKey && document.activeElement === lastEl) {
      e.preventDefault();
      firstEl.focus();
    }
  };

  const here = "● YOU ARE HERE";
  const items: {
    label: string;
    /** Shorter label for phones. */
    short?: string;
    note: string;
    href?: string;
    u?: number;
    current?: boolean;
  }[] = [
    {
      label: "Opening",
      note: current === 0 ? here : "",
      u: 0,
      current: current === 0,
    },
    {
      label: "Trending scenes",
      short: "Trending",
      note: current === 1 ? here : `${pad(sceneCount)} SCENES`,
      u: 1.45,
      current: current === 1,
    },
    {
      label: "Top rated",
      note: current === 2 ? here : "",
      u: 1 + sceneCount,
      current: current === 2,
    },
    {label: "Browse all", note: "FILTERS", href: "/browse"},
    {label: "Search", note: "", href: "/search"},
    {label: "Saved", note: pad(savedCount), href: "/saved"},
  ];

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      onKeyDown={onKeyDown}
      className="absolute inset-0 z-50 flex flex-col justify-between gap-3 bg-amber px-5 pb-6 pt-[18px] text-amber-ink md:px-[clamp(20px,5vw,72px)] md:pb-7 md:pt-5"
    >
      <div className="flex items-center justify-between">
        <span className="font-display text-[22px] font-extrabold tracking-[-0.03em]">
          nimelist
        </span>
        <button
          type="button"
          data-autofocus
          onClick={onClose}
          className="hidden min-h-[44px] rounded-full bg-amber-ink px-[18px] font-semibold text-amber md:inline-flex md:items-center"
        >
          Close · Esc
        </button>
      </div>
      <ul className="no-scrollbar flex min-h-0 flex-col overflow-y-auto">
        {items.map((m, i) => (
          <li
            key={m.label}
            className="flex items-baseline gap-3 border-t-2 border-amber-ink py-0.5 md:gap-5 md:py-1"
          >
            <span className="w-6 font-mono text-[11px] md:w-7 md:text-sm">
              {pad(i + 1)}
            </span>
            {m.href ? (
              <Link
                href={m.href}
                className="flex-1 font-display text-[clamp(26px,4.8svh,44px)] font-extrabold leading-[1.15] tracking-[-0.04em] hover:text-white md:text-[clamp(40px,6.5vw,92px)] md:leading-none"
              >
                {m.label}
              </Link>
            ) : (
              <a
                href="#"
                aria-current={m.current ? "location" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  jump(m.u ?? 0);
                }}
                className="flex-1 font-display text-[clamp(26px,4.8svh,44px)] font-extrabold leading-[1.15] tracking-[-0.04em] hover:text-white md:text-[clamp(40px,6.5vw,92px)] md:leading-none"
              >
                <span className="md:hidden">{m.short ?? m.label}</span>
                <span className="hidden md:inline">{m.label}</span>
              </a>
            )}
            <span className="font-mono text-[10px] md:text-[13px]">
              <span className="md:hidden">{m.current ? "●" : ""}</span>
              <span className="hidden md:inline">{m.note}</span>
            </span>
          </li>
        ))}
        <li className="flex items-baseline gap-3 border-t-2 border-amber-ink py-0.5 md:gap-5 md:py-1">
          <span className="w-6 font-mono text-[11px] md:w-7 md:text-sm">
            07
          </span>
          <a
            href={switchModeHref("simple", "/")}
            className="flex-1 font-display text-[clamp(26px,4.8svh,44px)] font-extrabold leading-[1.15] tracking-[-0.04em] hover:text-white md:text-[clamp(40px,6.5vw,92px)] md:leading-none"
          >
            Simple mode
          </a>
          <span className="hidden font-mono text-[13px] md:inline">
            CALM VIEW
          </span>
        </li>
      </ul>
      <div className="flex items-center justify-between gap-4">
        <span className="hidden font-mono text-xs md:inline">
          Anime data from Kitsu
        </span>
        <button
          type="button"
          data-autofocus
          onClick={onClose}
          className="min-h-[56px] flex-1 rounded-2xl bg-amber-ink font-semibold text-amber md:hidden"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ReelHome;
