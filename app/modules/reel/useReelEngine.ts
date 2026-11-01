"use client";

import {RefObject, useCallback, useEffect, useRef, useState} from "react";

export type Segment =
  | {kind: "intro"}
  | {kind: "scene"; index: number}
  | {kind: "rec"};

export const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
/** Quantise progress to `n` steps: the frame-by-frame look. */
export const stepped = (x: number, n: number) => Math.floor(clamp01(x) * n) / n;

export const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return reduced;
};

type Options = {
  /** Scroll units: 1 (opening) + scenes + 2 (Top rated pan). */
  units: number;
  sceneCount: number;
  rootRef: RefObject<HTMLElement>;
  /** Called every animation frame with progress u in [0, units]. Writes to the DOM directly. */
  onFrame: (u: number) => void;
};

const segmentFor = (u: number, sceneCount: number): Segment => {
  if (u < 1) return {kind: "intro"};
  if (u >= 1 + sceneCount) return {kind: "rec"};
  return {kind: "scene", index: Math.min(sceneCount - 1, Math.floor(u - 1))};
};

const sameSegment = (a: Segment, b: Segment) =>
  a.kind === b.kind &&
  (a.kind !== "scene" || (b.kind === "scene" && a.index === b.index));

/**
 * Drives the Reel from window scroll. Per-frame values go straight to the DOM
 * through `onFrame` (no React render per frame); React state only changes when
 * the active segment changes, a handful of times per scroll.
 */
export const useReelEngine = ({
  units,
  sceneCount,
  rootRef,
  onFrame,
}: Options) => {
  const [segment, setSegment] = useState<Segment>({kind: "intro"});
  const segmentRef = useRef<Segment>(segment);
  const onFrameRef = useRef(onFrame);
  onFrameRef.current = onFrame;

  /*
   * Scroll length of the reel. The root is (units + 1) × 100svh tall, so one
   * unit is root height / (units + 1). Using that instead of innerHeight keeps
   * progress stable when a phone's address bar shows or hides mid-scroll.
   */
  const scrollable = useCallback(() => {
    const root = rootRef.current;
    if (!root) return 1;
    return Math.max(1, (root.offsetHeight / (units + 1)) * units);
  }, [rootRef, units]);

  const progress = useCallback(() => {
    const root = rootRef.current;
    const top = root ? root.getBoundingClientRect().top + window.scrollY : 0;
    return clamp01((window.scrollY - top) / scrollable()) * units;
  }, [rootRef, scrollable, units]);

  useEffect(() => {
    let frame = 0;
    const tick = () => {
      frame = 0;
      const u = progress();
      onFrameRef.current(u);
      const next = segmentFor(u, sceneCount);
      if (!sameSegment(next, segmentRef.current)) {
        segmentRef.current = next;
        setSegment(next);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", schedule, {passive: true});
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [progress, sceneCount]);

  /** Scroll so progress equals `u`. */
  const goTo = useCallback(
    (u: number, smooth = true) => {
      const root = rootRef.current;
      const top = root ? root.getBoundingClientRect().top + window.scrollY : 0;
      window.scrollTo({
        top: top + (u / units) * scrollable(),
        behavior: smooth ? "smooth" : "auto",
      });
    },
    [rootRef, scrollable, units]
  );

  return {segment, goTo, progress};
};
