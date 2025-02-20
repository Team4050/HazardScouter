import { useCallback, useEffect, useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";

interface PWAUpdateStatus {
  needRefresh: boolean; // Indicates if a new version is available
  offlineReady: boolean; // Indicates if the app is ready for offline use
  updateServiceWorker: (reloadPage?: boolean) => Promise<void>; // Updates to the latest version
  forceUpdate: () => Promise<void>; // Forces an immediate check and update
  isRegistered: boolean; // Indicates if service worker is registered
}

export function usePWAUpdater(): PWAUpdateStatus {
  const [offlineReady, setOfflineReady] = useState(false);
  const [needRefresh, setNeedRefresh] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  // Cleanup function for offline ready state
  useEffect(() => {
    return () => {
      setOfflineReady(false);
    };
  }, []);

  const {
    updateServiceWorker,
    offlineReady: swOfflineReady,
    needRefresh: swNeedRefresh,
  } = useRegisterSW({
    onRegistered(registration) {
      setIsRegistered(true);
      console.log("SW registered:", registration);

      // Check for updates immediately after registration
      if (registration) {
        registration.update().catch(console.error);
      }
    },
    onRegisterError(error) {
      setIsRegistered(false);
      console.error("SW registration error:", error);
    },
    onOfflineReady() {
      setOfflineReady(true);
    },
    onNeedRefresh() {
      setNeedRefresh(true);
    },
  });

  /**
   * Forces an immediate check for updates and applies them
   * Useful for admin-triggered updates or emergency fixes
   */
  const forceUpdate = useCallback(async () => {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        await registration.update();
        await updateServiceWorker(true);
      }
    } catch (error) {
      console.error("Force update failed:", error);
      throw error; // Re-throw to allow handling by caller
    }
  }, [updateServiceWorker]);

  return {
    offlineReady:
      offlineReady ||
      (Array.isArray(swOfflineReady) ? swOfflineReady[0] : swOfflineReady),
    needRefresh:
      needRefresh ||
      (Array.isArray(swNeedRefresh) ? swNeedRefresh[0] : swNeedRefresh),
    updateServiceWorker,
    forceUpdate,
    isRegistered,
  };
}
