import { useCallback, useRef } from "react";

export function useSecretTap(onActivated: () => void, onClick?: () => void) {
  const tapsRef = useRef<number[]>([]);
  const lastClickTimeRef = useRef<number>(0);

  const handleTap = useCallback(() => {
    const now = Date.now();
    const recentTaps = [
      ...tapsRef.current.filter((tap) => now - tap < 2000),
      now,
    ];
    tapsRef.current = recentTaps;

    if (recentTaps.length >= 4) {
      tapsRef.current = [];
      onActivated();
    } else {
      if (now - lastClickTimeRef.current >= 300) {
        onClick?.();
        lastClickTimeRef.current = now;
      }
    }
  }, [onActivated, onClick]);

  return handleTap;
}
