import type { Breadcrumb } from "@sentry/core";
import {
  captureConsoleIntegration,
  ErrorBoundary,
  feedbackIntegration,
  getFeedback,
  init,
  addBreadcrumb as sentryAddBreadcrumb,
  captureException as sentryCaptureException,
  setContext as sentrySetContext,
  setTags as sentrySetTags,
  setUser,
  tanstackRouterBrowserTracingIntegration,
} from "@sentry/react";
export { ErrorBoundary };

export const sentryEnabled =
  process.env.NODE_ENV === "production" && navigator.onLine;

// biome-ignore lint/suspicious/noExplicitAny: Sentry's tanstackRouterBrowserTracingIntegration uses `any` for the router param to avoid type mismatches across TanStack Router versions
export function initSentry(router?: any): void {
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
      ...(router ? [tanstackRouterBrowserTracingIntegration(router)] : []),
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

export function addBreadcrumb(breadcrumb: Breadcrumb): void {
  if (!sentryEnabled) {
    return;
  }
  sentryAddBreadcrumb(breadcrumb);
}

export function setTags(tags: Record<string, string | number>): void {
  if (!sentryEnabled) {
    return;
  }
  sentrySetTags(tags);
}

export function setContext(
  name: string,
  context: Record<string, unknown> | null,
): void {
  if (!sentryEnabled) {
    return;
  }
  sentrySetContext(name, context);
}

export function captureException(
  error: unknown,
  context?: Record<string, unknown>,
): void {
  if (!sentryEnabled) {
    return;
  }
  sentryCaptureException(error, context ? { extra: context } : undefined);
}
