import { Database, Maximize2, Smartphone } from "lucide-react";
import type { ReactNode } from "react";
import { useMediaQuery } from "usehooks-ts";
import { resetCollections } from "@/data/db";

export default function DevTools(): ReactNode {
  const isMobile = useMediaQuery("(max-width: 480px)");
  return (
    <div className="sticky bottom-2 w-full z-50">
      <div className="w-fit text-xs lg:text-md lg:w-125 mx-auto flex rounded-full bg-gray-800 p-2 justify-center items-center font-mono text-[14px] text-white shadow-2xl space-x-1.5 divide-x-2 divide-solid divide-y-0 last-child:pl-2 middle-child:pl-2 gap-x-1">
        <div className="flex items-center">
          <Maximize2 className="mr-1" />
          <span className="block sm:hidden">xs</span>
          <span className="hidden sm:block md:hidden">sm</span>
          <span className="hidden md:block lg:hidden">md</span>
          <span className="hidden lg:block xl:hidden">lg</span>
          <span className="hidden xl:block 2xl:hidden">xl</span>
          <span className="hidden 2xl:block">2xl</span>
        </div>
        <div className="flex items-center">
          <Smartphone className="mr-1" /> {isMobile ? "Probably" : "No"}
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
        <div>
          <button
            type="button"
            className="cursor-pointer flex items-center"
            onClick={() => window.open("/debug", "_blank")}
          >
            <Database className="mr-1 h-3.5 w-3.5" /> DB
          </button>
        </div>
      </div>
    </div>
  );
}
