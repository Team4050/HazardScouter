import Pager from "../components/Pager";

export default function Scouting(): JSX.Element {
  return (
    <div className="max-w-2xl mx-auto">
      <Pager
        pages={[
          {
            title: "Pre-Match",
            component: <PreMatch />,
          },
          {
            title: "Auto",
            component: <Auto />,
          },
          {
            title: "Teleop",
            component: <Teleop />,
          },
          {
            title: "Endgame",
            component: <Endgame />,
          },
          {
            title: "Post-Match",
            component: <PostMatch />,
          },
        ]}
      />
    </div>
  );
}

function PreMatch(): JSX.Element {
  return <div>Pre-Match</div>;
}

function Auto(): JSX.Element {
  return <div>Auto</div>;
}

function Teleop(): JSX.Element {
  return <div>Teleop</div>;
}

function Endgame(): JSX.Element {
  return <div>Endgame</div>;
}

function PostMatch(): JSX.Element {
  return <div>Post-Match</div>;
}
