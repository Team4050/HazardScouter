import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/scouting")({
  component: Page,
});

function Page() {
  return (
    <div className="max-w-screen-lg mx-auto m-5 mt-0">
      <Outlet />
    </div>
  );
}
