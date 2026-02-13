import { useMediaQuery } from "usehooks-ts";

export function useIsMobile() {
  return !useMediaQuery("(min-width: 600px)");
}
