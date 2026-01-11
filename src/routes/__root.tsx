import { createRootRoute, Outlet } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Layout } from "@/components/Layout";

export const Route = createRootRoute({
  component: Page,
});

function Page(): ReactNode {
  return <Layout content={<Outlet />} />;
}
