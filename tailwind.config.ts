import { nextui } from "@nextui-org/react";
import type { ColorScale as NUIColorScale } from "@nextui-org/react";
import type { Config } from "tailwindcss";

export type ColorScale = Exclude<NUIColorScale, string>;

// New stuff
const colorBases: { [key: string]: string } = {
  white: "#FAFAFA",
  black: "#171717",
};

const colorScales = {
  yellow: {
    DEFAULT: "#FACC15",
    foreground: "#171717",
    100: "#FEF9D0",
    200: "#FEF1A1",
    300: "#FDE772",
    400: "#FBDC4E",
    500: "#FACC15",
    600: "#D7AA0F",
    700: "#B38A0A",
    800: "#906C06",
    900: "#775704",
  },
  green: {
    DEFAULT: "#16A34A",
    foreground: "#FAFAFA",
    100: "#D0FACF",
    200: "#A0F5A6",
    300: "#6DE381",
    400: "#46C769",
    500: "#16A34A",
    600: "#108C4A",
    700: "#0B7547",
    800: "#075E41",
    900: "#044E3C",
  },
  blue: {
    DEFAULT: "#3B82F6",
    foreground: "#FAFAFA",
    100: "#D7ECFE",
    200: "#B0D7FE",
    300: "#89BDFC",
    400: "#6BA6F9",
    500: "#3B82F6",
    600: "#2B64D3",
    700: "#1D4AB1",
    800: "#12338E",
    900: "#0B2376",
  },
  orange: {
    DEFAULT: "#F97316",
    foreground: "#FAFAFA",
    100: "#FEEED0",
    200: "#FED7A1",
    300: "#FDBB72",
    400: "#FB9F4F",
    500: "#F97316",
    600: "#D65510",
    700: "#B33C0B",
    800: "#902707",
    900: "#771804",
  },
  red: {
    DEFAULT: "#FF3C35",
    foreground: "#FAFAFA",
    100: "#FFE5D6",
    200: "#FFC5AE",
    300: "#FF9E85",
    400: "#FF7967",
    500: "#FF3C35",
    600: "#DB262F",
    700: "#B71A2F",
    800: "#93102D",
    900: "#7A0A2C",
  },
  gray: {
    DEFAULT: "#4B5563",
    foreground: "#FAFAFA",
    100: "#EBF2F7",
    200: "#D8E4EF",
    300: "#B1C1D0",
    400: "#8491A1",
    500: "#4B5563",
    600: "#364255",
    700: "#253047",
    800: "#172139",
    900: "#0E162F",
  },
} satisfies { [key: string]: ColorScale };

export default {
  content: [
    "./src/**/*.{html,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter"],
        tech: ["Orbitron"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      defaultTheme: "dark",
      defaultExtendTheme: "dark",
      themes: {
        green: {
          extend: "dark",
          layout: {},
          colors: {
            background: colorBases.black,
            foreground: colorBases.white,
            focus: colorScales.blue["500"],
            divider: colorScales.gray["500"],

            primary: colorScales.green,
            secondary: colorScales.yellow,
            success: colorScales.blue,
            warning: colorScales.orange,
            danger: colorScales.red,
          },
        },
        orange: {
          extend: "dark",
          layout: {},
          colors: {
            background: colorBases.black,
            foreground: colorBases.white,
            focus: colorScales.blue["500"],
            divider: colorScales.gray["500"],

            primary: colorScales.orange,
            secondary: colorScales.blue,
            success: colorScales.green,
            warning: colorScales.yellow,
            danger: colorScales.red,
          },
        },
      },
    }),
  ],
} satisfies Config;
