import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/collection/$year")({
  component: Page,
});

function Page(): JSX.Element {
  const { year } = Route.useParams();

  return (
    <div>
      <h1>Collect {year}</h1>
    </div>
  );
}
