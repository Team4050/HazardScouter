import { routeTree } from "@/routeTree.gen";
import { Title } from "@mantine/core";
import { RouterProvider, createRouter } from "@tanstack/react-router";

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFound,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function Provider(): JSX.Element {
  return <RouterProvider router={router} />;
}

function NotFound(): JSX.Element {
  return (
    <div className="w-full h-[calc(100vh-var(--app-shell-header-offset))] flex flex-col items-center justify-center absolute">
      <img src="/boom.gif" className="absolute size-full z-10" />
      <Title className="text-6xl">Not Found</Title>
    </div>
  );
}
