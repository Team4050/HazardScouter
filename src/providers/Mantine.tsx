import { theme } from "@/styles/theme";
import { MantineProvider } from "@mantine/core";
import type { ReactNode } from "react";

export default function Provider({
  children,
}: { children: ReactNode }): JSX.Element {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      {children}
    </MantineProvider>
  );
}
