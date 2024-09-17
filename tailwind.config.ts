import pluginMantine from "@devoss/tailwind-plugin-mantine";
import type { Config } from "tailwindcss";
import { theme } from "./src/styles/theme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {},
  plugins: [pluginMantine(theme)],
} satisfies Config;
