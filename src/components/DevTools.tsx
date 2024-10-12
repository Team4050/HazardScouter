import { resetCollections } from "@/data/db";
import { useAppState } from "@/data/state";

export function DevTools() {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="sticky bottom-2 w-full z-50">
      <div className="w-fit mx-4 text-xs md:text-md md:w-[500px] md:mx-auto flex rounded-full bg-gray-800 px-4 py-2 justify-center items-center font-mono text-[14px] text-white shadow-2xl space-x-1.5 divide-x-2 divide-solid divide-y-0 last-child:pl-1 middle-child:pl-1">
        <div className="flex">
          <div className="mr-1">Screen:</div>{" "}
          <span className="block sm:hidden">xs</span>
          <span className="hidden sm:block md:hidden">sm</span>
          <span className="hidden md:block lg:hidden">md</span>
          <span className="hidden lg:block xl:hidden">lg</span>
          <span className="hidden xl:block 2xl:hidden">xl</span>
          <span className="hidden 2xl:block">2xl</span>
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
