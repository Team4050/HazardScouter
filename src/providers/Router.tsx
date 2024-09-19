import { AppLogo } from "@/components/Logo";
import { routeTree } from "@/routeTree.gen";
import { Center, Title } from "@mantine/core";
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
    <Center className="size-full flex flex-col">
      <Title className="text-6xl">Not Found</Title>
      <AppLogo />
    </Center>
  );
}
