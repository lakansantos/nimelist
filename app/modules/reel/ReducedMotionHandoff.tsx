"use client";

import {useEffect} from "react";
import {MODE_COOKIE, MODE_COOKIE_MAX_AGE} from "@lib/mode";

/**
 * The server can't see prefers-reduced-motion on a first visit, so the Reel
 * renders (fully still, see useReelEngine). If the visitor has reduced motion
 * on and never picked a mode, remember Simple for their next page load.
 */
const ReducedMotionHandoff = () => {
  useEffect(() => {
    const chosen = document.cookie
      .split("; ")
      .some((c) => c.startsWith(`${MODE_COOKIE}=`));
    if (chosen) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.cookie = `${MODE_COOKIE}=simple; path=/; max-age=${MODE_COOKIE_MAX_AGE}; samesite=lax`;
    }
  }, []);
  return null;
};

export default ReducedMotionHandoff;
