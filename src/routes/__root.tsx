import { Layout } from "@/components/Layout";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

export const Route = createRootRoute({
  component: Page,
});

function Page(): ReactNode {
  return <Layout content={<Outlet />} />;
}
