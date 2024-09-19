import { CollectionForm } from "@/collection/form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/collection")({
  component: () => <CollectionForm />,
});
