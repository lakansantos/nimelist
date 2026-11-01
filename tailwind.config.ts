import type {Config} from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Shared Nimelist brand tokens (Reel and Simple modes).
        ink: "#07080B",
        ground: "#0E1014",
        rail: "#13161C",
        panel: "#161920",
        raised: "#1F2330",
        line: "#242833",
        "line-strong": "#2B3040",
        fg: "#F2F3F5",
        "fg-soft": "#E8EAEE",
        muted: "#8C93A3",
        "muted-strong": "#B3B9C6",
        amber: "#F5B544",
        "amber-ink": "#1A1205",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        jp: ['"Noto Sans JP"', '"Hiragino Sans"', '"Yu Gothic"', "sans-serif"],
      },
      height: {
        "screen-s": "100svh",
      },
    },
  },
  plugins: [],
};
export default config;
