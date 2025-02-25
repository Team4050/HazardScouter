import { createTheme } from "@mantine/core";

export const navbarHeight = 60;

export const theme = createTheme({
  primaryColor: "green",
  black: "#171717",
  white: "#fafafa",
  fontFamily: "'Jersey 10'",
  fontSizes: {
    xs: "22px",
    sm: "26px",
    md: "30px",
    lg: "34px",
    xl: "38px",
  },
  lineHeights: {
    xs: "1",
    sm: "1.05",
    md: "1.1",
    lg: "1.15",
    xl: "1.2",
  },
  headings: { fontFamily: "'Jersey 20'", fontWeight: "400" },
  colors: {
    green: [
      "#e5feee",
      "#d2f9e0",
      "#a8f1c0",
      "#7aea9f",
      "#53e383",
      "#3bdf70",
      "#2bdd66",
      "#1ac455",
      "#0caf49",
      "#00963c",
    ],
  },
  components: {
    Table: {
      styles: {
        th: {
          fontWeight: "normal",
        },
        table: {
          fontSize: "24px",
          textTransform: "capitalize",
        },
      },
    },
    Button: {
      styles: {
        root: {
          fontWeight: "normal",
        },
      },
    },
  },
});
