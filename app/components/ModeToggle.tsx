"use client";

import cx from "classnames";
import {usePathname} from "next/navigation";
import {Mode, switchModeHref} from "@lib/mode";

/** Strip the internal /reel or /simple prefix if the router exposes it. */
export const usePublicPath = () => {
  const pathname = usePathname() || "/";
  const stripped = pathname.replace(/^\/(reel|simple)(?=\/|$)/, "");
  return stripped || "/";
};

type Props = {
  current: Mode;
  /** Visual style: the Reel's floating pill or Simple's sidebar segment. */
  look: "reel" | "simple" | "simple-compact";
  className?: string;
};

/**
 * Reel | Simple switch. Plain links (full page load) so the server renders the
 * other mode straight away; middleware stores the choice in a cookie.
 */
const ModeToggle = ({current, look, className}: Props) => {
  const path = usePublicPath();

  const item = (mode: Mode, label: string) => {
    const active = mode === current;
    const common = cx(
      "flex items-center justify-center font-semibold",
      look === "simple"
        ? "min-h-[36px] rounded-[7px] text-[13px]"
        : "min-h-[36px] rounded-full px-3.5 text-sm",
      look === "simple-compact" && "!min-h-[34px] px-3 text-[13px]"
    );
    if (active) {
      return (
        <span
          aria-current="true"
          className={cx(common, "bg-amber text-amber-ink")}
        >
          {label}
        </span>
      );
    }
    return (
      <a
        href={switchModeHref(mode, path)}
        className={cx(common, "text-muted-strong hover:text-fg")}
      >
        {label}
      </a>
    );
  };

  return (
    <div
      role="group"
      aria-label="View mode"
      className={cx(
        look === "simple"
          ? "grid grid-cols-2 rounded-[10px] border border-line bg-ground p-1"
          : "inline-flex rounded-full border p-1",
        look === "reel" && "border-white/25 bg-ink/40",
        look === "simple-compact" && "border-line bg-panel !p-[3px]",
        className
      )}
    >
      {item("reel", "Reel")}
      {item("simple", "Simple")}
    </div>
  );
};

export default ModeToggle;
