import { Slider as SliderPrimitive } from "@base-ui/react";
import type { ComponentProps } from "react";

import { cn } from "@/util";

type SliderProps = ComponentProps<typeof SliderPrimitive.Root> & {
  showSteps?: boolean;
};

function Slider({
  className,
  showSteps,
  min = 0,
  max = 100,
  step = 1,
  ...props
}: SliderProps) {
  const steps: number[] = [];
  if (showSteps) {
    for (let i = min; i <= max; i += step) {
      steps.push(i);
    }
  }

  return (
    <div className="relative w-full px-3.5">
      <SliderPrimitive.Root
        min={min}
        max={max}
        step={step}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className,
        )}
        {...props}
      >
        <SliderPrimitive.Control className="flex w-full items-center">
          <SliderPrimitive.Track className="relative h-2.5 w-full grow overflow-hidden rounded-none bg-primary/20">
            <SliderPrimitive.Indicator className="absolute h-full bg-primary" />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb
            className={cn(
              "block h-7 w-7",
              "rounded-none border-4 border-green-500 bg-green-500 shadow-md",
              "transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "disabled:pointer-events-none disabled:opacity-50",
            )}
          />
        </SliderPrimitive.Control>
      </SliderPrimitive.Root>
      {showSteps && steps.length > 0 && (
        <div className="relative mt-2 h-5 w-full">
          {steps.map((value) => {
            const fraction = (value - min) / (max - min);
            return (
              <span
                key={value}
                className="absolute text-sm font-medium text-muted-foreground -translate-x-1/2"
                style={{
                  left: `${fraction * 100}%`,
                }}
              >
                {value}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

export { Slider };
