import { useMediaQuery } from "usehooks-ts";

export function useIsScoutingTablet(): boolean {
  return useMediaQuery("(max-width: 768px)");
}

export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 480px)");
}
