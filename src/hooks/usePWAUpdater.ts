import { useRegisterSW } from "virtual:pwa-register/react";
import { useEffect } from "react";

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

  // Reload when a new service worker takes control, so the page
  // picks up fresh assets instead of referencing stale hashed filenames.
  useEffect(() => {
    if (!navigator.serviceWorker) {
      return;
    }

    // Skip the first controllerchange (initial SW install, no stale page)
    let hadController = !!navigator.serviceWorker.controller;
    const onControllerChange = () => {
      if (!hadController) {
        hadController = true;
        return;
      }
      window.location.reload();
    };

    navigator.serviceWorker.addEventListener(
      "controllerchange",
      onControllerChange,
    );
    return () => {
      navigator.serviceWorker.removeEventListener(
        "controllerchange",
        onControllerChange,
      );
    };
  }, []);
}
