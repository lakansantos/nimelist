type LogoMarkProps = {
  size?: number;
  className?: string;
};

/** The Bookmark N mark: the right leg of the N ends in a bookmark notch. */
export const LogoMark = ({size = 28, className}: LogoMarkProps) => (
  <svg
    viewBox="0 0 100 100"
    width={size}
    height={size}
    aria-hidden="true"
    className={className}
  >
    <rect x="18" y="14" width="18" height="72" fill="currentColor" />
    <polygon points="18,14 36,14 64,56 64,84" fill="currentColor" />
    <path d="M64 14H82V86L73 78L64 86Z" fill="#F5B544" />
  </svg>
);
