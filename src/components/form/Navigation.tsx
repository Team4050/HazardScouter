import { useLocation, useNavigate } from "@tanstack/react-router";
import {
  ArrowBigLeftIcon,
  ArrowBigRightIcon,
  SaveIcon,
  XIcon,
} from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { phaseOrder, phaseRoutes } from "@/data/match";
import { useAppState } from "@/hooks/useAppState";
import { cn } from "@/util";

function useKeyboardVisible() {
  const [visible, setVisible] = useState(false);
  const initialHeight = useRef(0);

  useEffect(() => {
    const vv = visualViewport;
    if (!vv) {
      return;
    }

    initialHeight.current = vv.height;

    const checkKeyboard = () => {
      setVisible(vv.height < initialHeight.current * 0.75);
    };

    const onFocusOut = () => {
      // When focus leaves an input, wait a tick for focusin to fire on the
      // next element (if the user is switching between inputs). Then check
      // if anything input-like still has focus — if not, the keyboard is gone.
      setTimeout(() => {
        const el = document.activeElement;
        const stillEditing =
          el instanceof HTMLInputElement ||
          el instanceof HTMLTextAreaElement ||
          el instanceof HTMLSelectElement;
        if (!stillEditing) {
          setVisible(false);
        }
      }, 50);
    };

    vv.addEventListener("resize", checkKeyboard);
    document.addEventListener("focusout", onFocusOut);
    return () => {
      vv.removeEventListener("resize", checkKeyboard);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  return visible;
}

export const NAV_HEIGHT = 64; // px – used for bottom spacer on mobile

export function FormNavigation({ matchId }: { matchId: string }): ReactNode {
  const navigate = useNavigate();
  const location = useLocation();
  const { isPhaseValid } = useAppState();
  const keyboardVisible = useKeyboardVisible();

  const currentRouteIndex = phaseRoutes.findIndex((route) =>
    location.pathname.includes(route),
  );

  const firstPage = currentRouteIndex === 0;
  const lastPage = currentRouteIndex === phaseRoutes.length - 1;
  const pageIsValid = isPhaseValid(phaseOrder[currentRouteIndex]);

  const handleNext = () => {
    if (lastPage) {
      navigate({ to: "/scouting" });
    } else {
      navigate({
        to: `/scouting/$matchId/collect/${phaseRoutes[currentRouteIndex + 1]}`,
        params: { matchId },
      });
    }
  };

  const handlePrevious = () => {
    if (firstPage) {
      navigate({ to: "/scouting" });
    } else {
      navigate({
        to: `/scouting/$matchId/collect/${phaseRoutes[currentRouteIndex - 1]}`,
        params: { matchId },
      });
    }
  };

  return (
    <>
      {/* Desktop: normal flow below content */}
      <div className="hidden md:flex h-18 mx-1 w-full gap-4 *:h-full *:min-w-40">
        <Button
          onClick={handlePrevious}
          variant={firstPage ? "destructive" : "default"}
          className="size-14 p-4 *:size-full!"
        >
          {firstPage ? <XIcon /> : <ArrowBigLeftIcon />}
        </Button>
        <Button
          onClick={handleNext}
          disabled={!pageIsValid}
          className="size-14 p-4 *:size-full! ml-auto"
        >
          {lastPage ? <SaveIcon /> : <ArrowBigRightIcon />}
        </Button>
      </div>

      {/* Mobile: floating at bottom, hidden when keyboard is open */}
      <div
        className={cn(
          "md:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-between px-4 pb-4 pt-2 transition-transform duration-200",
          keyboardVisible ? "translate-y-full" : "translate-y-0",
        )}
      >
        <Button
          onClick={handlePrevious}
          variant={firstPage ? "destructive" : "default"}
          className="size-14 p-4 *:size-full!"
        >
          {firstPage ? <XIcon /> : <ArrowBigLeftIcon />}
        </Button>
        <Button
          onClick={handleNext}
          disabled={!pageIsValid}
          className="size-14 p-4 *:size-full!"
        >
          {lastPage ? <SaveIcon /> : <ArrowBigRightIcon />}
        </Button>
      </div>
    </>
  );
}
