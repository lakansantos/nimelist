export type Mode = "reel" | "simple";

/** Cookie holding the visitor's explicit choice. Absent = never chosen. */
export const MODE_COOKIE = "nimelist-mode";
export const DEFAULT_MODE: Mode = "reel";
export const MODE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const isMode = (value: string | undefined): value is Mode =>
  value === "reel" || value === "simple";

/** Public page paths that exist in both modes. */
export const isModePath = (pathname: string) =>
  pathname === "/" ||
  pathname === "/browse" ||
  pathname === "/search" ||
  pathname === "/saved" ||
  /^\/\d+$/.test(pathname);

/**
 * Link that switches to `mode` and lands on the same page there.
 * Middleware sets the cookie and redirects to the clean path.
 */
export const switchModeHref = (mode: Mode, pathname: string, search = "") =>
  `/${mode}${pathname === "/" ? "" : pathname}${search}`;
