import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/collection/$year/$formPage")({
  component: Page,
});

function Page(): JSX.Element {
  const { year, formPage } = Route.useParams();

  return (
    <div>
      <h1>
        Collect {year} {formPage}
      </h1>
    </div>
  );
}
