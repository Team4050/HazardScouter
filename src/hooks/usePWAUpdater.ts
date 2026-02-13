import { useRegisterSW } from "virtual:pwa-register/react";

export function usePWAUpdater() {
  useRegisterSW({
    onRegistered(registration) {
      console.log("SW registered:", registration);

      if (registration) {
        registration.update().catch(console.error);
      }
    },
    onRegisterError(error) {
      console.error("SW registration error:", error);
    },
  });
}
