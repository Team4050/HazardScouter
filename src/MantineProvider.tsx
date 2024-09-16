import { MantineProvider, createTheme } from "@mantine/core";

const theme = createTheme({
  primaryColor: "green",
  black: "#171717",
  white: "#fafafa",
  fontFamily: "Inter, sans-serif",
  headings: { fontFamily: "Orbitron, sans-serif" },
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
});

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      {children}
    </MantineProvider>
  );
}
