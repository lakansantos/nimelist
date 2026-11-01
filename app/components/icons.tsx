type IconProps = {size?: number; className?: string; filled?: boolean};

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export const HomeIcon = ({size = 18, className}: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M3 10.5L12 3l9 7.5V21h-6v-6H9v6H3z" />
  </svg>
);

export const GridIcon = ({size = 18, className}: IconProps) => (
  <svg {...base(size)} className={className}>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

export const SearchIcon = ({size = 18, className}: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </svg>
);

export const BookmarkIcon = ({size = 18, className, filled}: IconProps) => (
  <svg
    {...base(size)}
    fill={filled ? "currentColor" : "none"}
    className={className}
  >
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

export const FilmIcon = ({size = 18, className}: IconProps) => (
  <svg {...base(size)} className={className}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4" />
  </svg>
);

export const CloseIcon = ({size = 16, className}: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

export const PlayIcon = ({size = 14, className}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
    className={className}
  >
    <path d="M7 4l13 8-13 8z" />
  </svg>
);

export const ArrowDownIcon = ({size = 18, className}: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M12 5v14M5 12l7 7 7-7" />
  </svg>
);

export const MenuIcon = ({size = 18, className}: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M4 9h16M4 15h10" />
  </svg>
);

export const ListIcon = ({size = 18, className}: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);
