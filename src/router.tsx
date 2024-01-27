import { createBrowserRouter } from "react-router-dom";
import { RootLayout, ScoutingLayout } from "./layouts";
import PreMatch from "./pages/scouting/prematch";
import Auto from "./pages/scouting/auto";
import Teleop from "./pages/scouting/teleop";
import EndGame from "./pages/scouting/endGame";
import PostMatch from "./pages/scouting/postmatch";
import Scanning from "./pages/scanning/scanning";
import Index from "./pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/scanning",
        element: <Scanning />,
      },
      {
        path: "/scouting",
        element: <ScoutingLayout />,
        children: [
          {
            path: "/scouting/",
            element: <PreMatch />,
          },
          {
            path: "/scouting/auto",
            element: <Auto />,
          },
          {
            path: "/scouting/teleop",
            element: <Teleop />,
          },
          {
            path: "/scouting/endgame",
            element: <EndGame />,
          },
          {
            path: "/scouting/postmatch",
            element: <PostMatch />,
          },
        ],
      },
    ],
  },
]);
