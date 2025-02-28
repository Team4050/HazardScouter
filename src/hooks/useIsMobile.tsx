import { useMediaQuery } from "@mantine/hooks";

export function useIsScoutingTablet(): boolean | undefined {
  // This feels pointless... but DRY tho
  return useMediaQuery("(max-width: 768px)");
}

export function useIsMobile(): boolean | undefined {
  return useMediaQuery("(max-width: 480px)");
}
