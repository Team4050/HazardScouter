import { resetCollections } from "@/data/db";
import { useAppState } from "@/data/state";
import { useMediaQuery } from "@mantine/hooks";
import type { ReactNode } from "react";

export default function DevTools(): ReactNode {
  const isTablet = useMediaQuery("(max-width: 768px)");
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="sticky bottom-2 w-full z-50">
      <div className="w-fit mx-1 text-xs md:text-md md:w-[500px] md:mx-auto flex rounded-full bg-gray-800 p-2 justify-center items-center font-mono text-[14px] text-white shadow-2xl space-x-1.5 divide-x-2 divide-solid divide-y-0 last-child:pl-2 middle-child:pl-2 gap-x-1">
        <div className="flex">
          <div className="mr-1">Screen:</div>{" "}
          <span className="block sm:hidden">xs</span>
          <span className="hidden sm:block md:hidden">sm</span>
          <span className="hidden md:block lg:hidden">md</span>
          <span className="hidden lg:block xl:hidden">lg</span>
          <span className="hidden xl:block 2xl:hidden">xl</span>
          <span className="hidden 2xl:block">2xl</span>
        </div>
        <div className="flex">
          <div>Mobile:</div>
          <span>{isTablet ? "Probably" : "No"}</span>
        </div>
        <div>
          <button className="cursor-pointer" onClick={() => resetCollections()}>
            Reset Collections
          </button>
        </div>
        <div>
          <button
            className="cursor-pointer"
            onClick={() => useAppState.setState(useAppState.getInitialState())}
          >
            Reset App State
          </button>
        </div>
      </div>
    </div>
  );
}
