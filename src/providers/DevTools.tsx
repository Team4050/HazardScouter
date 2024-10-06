import { useMediaQuery } from "@mantine/hooks";
import { lazy } from "react";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );

export default function Provider(): JSX.Element {
  const mobile = useMediaQuery("(max-width: 768px)");

  return (
    <>{mobile ? null : <TanStackRouterDevtools position="bottom-left" />}</>
  );
}
