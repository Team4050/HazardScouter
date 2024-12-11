import { theme } from "@/styles/theme";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import type { ReactNode } from "react";

export default function Provider({
  children,
}: { children: ReactNode }): ReactNode {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <ModalsProvider>{children}</ModalsProvider>
    </MantineProvider>
  );
}
