import pluginMantine from "@devoss/tailwind-plugin-mantine";
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import { theme } from "./src/styles/theme";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: "var(--mantine-font-family-headings)",
      },
    },
  },
  plugins: [
    pluginMantine(theme),
    plugin(({ addVariant }) => {
      addVariant("middle-child", "&>:not(:first-child):not(:last-child)");
      addVariant("first-child", "&>:first-child");
      addVariant("last-child", "&>:last-child");
    }),
  ],
};

export default config;
