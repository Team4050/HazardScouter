import { IconArrowsDiagonal, IconDeviceMobile } from "@tabler/icons-react";
import type { ReactNode } from "react";
import { resetCollections } from "@/data/db";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function DevTools(): ReactNode {
  const isMobile = useIsMobile();
  return (
    <div className="sticky bottom-2 w-full z-50">
      <div className="w-fit text-xs lg:text-md lg:w-[500px] mx-auto flex rounded-full bg-gray-800 p-2 justify-center items-center font-mono text-[14px] text-white shadow-2xl space-x-1.5 divide-x-2 divide-solid divide-y-0 last-child:pl-2 middle-child:pl-2 gap-x-1">
        <div className="flex items-center">
          <IconArrowsDiagonal className="mr-1" />
          <span className="block sm:hidden">xs</span>
          <span className="hidden sm:block md:hidden">sm</span>
          <span className="hidden md:block lg:hidden">md</span>
          <span className="hidden lg:block xl:hidden">lg</span>
          <span className="hidden xl:block 2xl:hidden">xl</span>
          <span className="hidden 2xl:block">2xl</span>
        </div>
        <div className="flex items-center">
          <IconDeviceMobile className="mr-1" /> {isMobile ? "Probably" : "No"}
        </div>
        <div>
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => resetCollections()}
          >
            Reset Collections
          </button>
        </div>
      </div>
    </div>
  );
}
