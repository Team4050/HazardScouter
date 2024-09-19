import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/scanning")({
  component: () => <div>Hello /scanning/!</div>,
});
