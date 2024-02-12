import { Button, Link } from "@nextui-org/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useMetaStore } from "../store/useDataStore";

export default function Home(): JSX.Element {
  const { scanOnly } = useMetaStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (scanOnly) {
      navigate("/scanning");
    }
  }, [scanOnly, navigate]);

  return (
    <div className="size-full flex justify-center">
      <Button as={Link} color="primary" className="my-auto" href="/scouting">
        Begin
      </Button>
    </div>
  );
}
