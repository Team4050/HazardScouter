import { IconCheck, IconRefresh, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { usePWAUpdater } from "../hooks/usePWAUpdater";

export function PWAUpdatePrompt() {
  const { needRefresh, offlineReady, updateServiceWorker, isRegistered } =
    usePWAUpdater();
  const [showOfflineReady, setShowOfflineReady] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (offlineReady && mounted) {
      setShowOfflineReady(true);
      const timer = setTimeout(() => {
        if (mounted) setShowOfflineReady(false);
      }, 4500);
      return () => {
        mounted = false;
        clearTimeout(timer);
      };
    }
  }, [offlineReady]);

  // Reset updating state when needRefresh changes
  useEffect(() => {
    if (!needRefresh) {
      setUpdating(false);
    }
  }, [needRefresh]);

  if (!isRegistered || (!needRefresh && !showOfflineReady)) return null;

  const handleUpdate = async () => {
    try {
      setUpdating(true);
      await updateServiceWorker(true);
    } catch (error) {
      console.error("Failed to update:", error);
      setUpdating(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {showOfflineReady && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex items-center gap-4">
          <IconCheck className="w-5 h-5 text-green-500" />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            App ready for offline use
          </span>
          <button
            onClick={() => setShowOfflineReady(false)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <IconX className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      )}

      {needRefresh && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex items-center gap-4">
          <span className="text-sm text-gray-700 dark:text-gray-300">
            A new version is available
          </span>
          <button
            onClick={handleUpdate}
            disabled={updating}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IconRefresh
              className={`w-4 h-4 ${updating ? "animate-spin" : ""}`}
            />
            {updating ? "Updating..." : "Update"}
          </button>
        </div>
      )}
    </div>
  );
}
