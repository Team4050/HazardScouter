import type { ReactNode } from "react";
import { RecoilRoot } from "recoil";

export default function Provider({
  children,
}: { children: ReactNode }): JSX.Element {
  return <RecoilRoot>{children}</RecoilRoot>;
}
