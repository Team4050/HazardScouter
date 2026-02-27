import {
  captureConsoleIntegration,
  feedbackIntegration,
  getFeedback,
  init,
  setUser,
} from "@sentry/react";

export const sentryEnabled =
  process.env.NODE_ENV === "production" && navigator.onLine;

export function initSentry(): void {
  if (!sentryEnabled) {
    return;
  }
  init({
    dsn: "https://055ca8caf4488f3cc1647425883ed0ad@o4508903100186624.ingest.us.sentry.io/4508903134789637",
    release: __COMMIT_HASH__,
    tracesSampleRate: 1.0,
    integrations: [
      captureConsoleIntegration({ levels: ["error", "warn"] }),
      feedbackIntegration({
        colorScheme: "dark",
        showEmail: false,
        showName: true,
        autoInject: false,
      }),
    ],
  });
}

export function setSentryUser(user: { username: string }): void {
  if (!sentryEnabled) {
    return;
  }
  setUser(user);
}

export function getSentryFeedback(): ReturnType<typeof getFeedback> {
  if (!sentryEnabled) {
    return undefined;
  }
  return getFeedback();
}
