import { createRouter, RouterProvider } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { routeTree } from "@/routeTree.gen";

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFound,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function Provider(): ReactNode {
  return <RouterProvider router={router} />;
}

function NotFound(): ReactNode {
  return (
    <div className="h-62.5 aspect-video flex flex-col items-center justify-center mx-auto">
      <img src="/boom.gif" className="absolute size-full z-10" alt="" />
      <h1 className="text-6xl">Not Found</h1>
    </div>
  );
}
