import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import type { ReactNode } from "react";
import { theme } from "@/styles/theme";

export default function Provider({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <ModalsProvider>{children}</ModalsProvider>
    </MantineProvider>
  );
}
