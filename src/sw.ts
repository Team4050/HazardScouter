import { registerSW } from "virtual:pwa-register";

registerSW({
  onNeedRefresh: () => console.log("Need refresh"),
  onOfflineReady: () => console.log("Offline ready"),
  onRegisteredSW: (registration) => console.log("Registered SW", registration),
  onRegisterError: (error) => console.error("Register error", error),
});
