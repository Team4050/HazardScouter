import { Button, Link } from "@nextui-org/react";
import { createFileRoute } from "@tanstack/react-router";

import logo from "../images/crescendo.png";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home(): JSX.Element {
  return (
    <div className="flex flex-col mx-auto max-w-xl gap-8">
      <img src={logo} alt="Crescendo" />

      <Button as={Link} color="primary" className="my-auto" href="/scouting">
        Begin
      </Button>
    </div>
  );
}
