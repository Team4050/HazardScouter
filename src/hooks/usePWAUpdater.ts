import { useRegisterSW } from "virtual:pwa-register/react";
import { useCallback, useRef } from "react";

export function usePWAUpdater() {
  const registrationRef = useRef<ServiceWorkerRegistration | undefined>(
    undefined,
  );

  useRegisterSW({
    onRegistered(registration) {
      console.log("SW registered:", registration);
      registrationRef.current = registration;

      if (registration) {
        registration.update().catch(console.error);
      }
    },
    onRegisterError(error) {
      console.error("SW registration error:", error);
    },
  });

  const forceUpdate = useCallback(async () => {
    const registration = registrationRef.current;
    if (registration) {
      await registration.update();
    }
    window.location.reload();
  }, []);

  return { forceUpdate };
}
