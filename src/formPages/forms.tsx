import Auto from "@app/formPages/autonomous";
import Endgame from "@app/formPages/endGame";
import PostMatch from "@app/formPages/postMatch";
import PreMatch from "@app/formPages/preMatch";
import Teleop from "@app/formPages/teleop";

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
