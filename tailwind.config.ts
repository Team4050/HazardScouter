import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: "var(--mantine-font-family-headings)",
        mono: "var(--mantine-font-family-monospace)",
        sans: "var(--mantine-font-family)",
      },
      fontWeight: {
        heading: "var(--mantine-heading-font-weight)",
      },
      fontSize: {
        "mtn-xs": "var(--mantine-font-size-xs)",
        "mtn-sm": "var(--mantine-font-size-sm)",
        "mtn-md": "var(--mantine-font-size-md)",
        "mtn-lg": "var(--mantine-font-size-lg)",
        "mtn-xl": "var(--mantine-font-size-xl)",
      },
      colors: {
        primary: "var(--mantine-primary-color-filled)",
      },
      screens: {
        sm: "600px",
        md: "1000px",
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("middle-child", "&>:not(:first-child):not(:last-child)");
      addVariant("first-child", "&>:first-child");
      addVariant("last-child", "&>:last-child");
    }),
  ],
};

export default config;
