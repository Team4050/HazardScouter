import { Button, Link } from "@nextui-org/react";

export default function Index(): JSX.Element {
  return (
    <div className="w-full h-full flex justify-center">
      <Button as={Link} color="primary" className="my-auto" href="/scouting">
        Begin
      </Button>
    </div>
  );
}
