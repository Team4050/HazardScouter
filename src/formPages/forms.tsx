import Auto from "../formPages/autonomous";
import Endgame from "../formPages/endGame";
import PostMatch from "../formPages/postMatch";
import PreMatch from "../formPages/preMatch";
import Teleop from "../formPages/teleop";

export type FormProps = {
  onChanged: (isValid: boolean) => void;
};

export type ScoutingFormPage = {
  slug: string;
  title: string;
  component?: (props: FormProps) => JSX.Element;
};

export const scoutingFormPages: ScoutingFormPage[] = [
  {
    slug: "pre-match",
    title: "Pre-Match",
    component: PreMatch,
  },
  {
    slug: "auto",
    title: "Auto",
    component: Auto,
  },
  {
    slug: "teleop",
    title: "Teleop",
    component: Teleop,
  },
  {
    slug: "endgame",
    title: "Endgame",
    component: Endgame,
  },
  {
    slug: "post-match",
    title: "Post-Match",
    component: PostMatch,
  },
];
