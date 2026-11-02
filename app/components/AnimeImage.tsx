"use client";

import cx from "classnames";
import Image, {ImageProps} from "next/image";
import {useEffect, useRef, useState} from "react";

/*
 * "Image unavailable" artwork, drawn as SVG so it can replace the src of the
 * same <img> element. Swapping only the src keeps the element, its classes and
 * its data-* hooks, which the Reel engine caches on mount.
 */
const svg = (body: string, w: number, h: number) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice"><rect width="${w}" height="${h}" fill="#1F2330"/>${body}</svg>`
  )}`;

const icon = (x: number, y: number, s: number) =>
  `<g transform="translate(${x} ${y}) scale(${
    s / 24
  })" fill="none" stroke="#8C93A3" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M21 16l-5-5-7 7"/><path d="M3 3l18 18"/></g>`;

const UNAVAILABLE = {
  /** Posters and covers: icon plus the words. */
  label: svg(
    `${icon(
      82,
      112,
      36
    )}<text x="100" y="178" text-anchor="middle" font-family="system-ui,-apple-system,'Segoe UI',sans-serif" font-size="13" font-weight="600" letter-spacing="0.4" fill="#8C93A3">Image unavailable</text>`,
    200,
    300
  ),
  /** Small thumbnails, where text would be unreadable: icon only. */
  icon: svg(icon(14, 14, 20), 48, 48),
};

type Status = "loading" | "loaded" | "failed";

type Props = Omit<ImageProps, "src" | "onLoad" | "onError"> & {
  src: string | null | undefined;
  /**
   * What to show when there is no image or it fails to load:
   * "label" (default) icon + "Image unavailable", "icon" for small thumbs,
   * "hide" for decorative backdrops (the box behind stays as it is).
   */
  fallback?: "label" | "icon" | "hide";
};

/**
 * next/image with honest states: a shimmer skeleton while loading, and the
 * unavailable placeholder only when there is no URL or the load really failed.
 */
const AnimeImage = ({
  src,
  fallback = "label",
  className,
  alt,
  ...rest
}: Props) => {
  const ref = useRef<HTMLImageElement>(null);
  const [status, setStatus] = useState<Status>(src ? "loading" : "failed");

  useEffect(() => {
    if (!src) {
      setStatus("failed");
      return;
    }
    // The image may have finished (or failed) before React hydrated, in which
    // case onLoad/onError never fire.
    const img = ref.current;
    if (img?.complete) setStatus(img.naturalWidth > 0 ? "loaded" : "failed");
    else setStatus("loading");
  }, [src]);

  const failed = status === "failed";
  const placeholder = fallback === "hide" ? null : UNAVAILABLE[fallback];

  return (
    <Image
      {...rest}
      ref={ref}
      src={failed && placeholder ? placeholder : src || UNAVAILABLE.icon}
      alt={alt}
      unoptimized
      onLoad={() => !failed && setStatus("loaded")}
      onError={() => setStatus("failed")}
      className={cx(
        className,
        status === "loading" && "img-skeleton",
        failed && fallback === "hide" && "invisible"
      )}
    />
  );
};

export default AnimeImage;
