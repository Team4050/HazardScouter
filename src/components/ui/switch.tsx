import { Switch as SwitchPrimitive } from "@base-ui/react";
import type { ComponentProps } from "react";

import { cn } from "@/util";

function Switch({
  className,
  ...props
}: ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        "peer @container inline-flex w-11 aspect-2/1 shrink-0 items-center",
        "cursor-pointer rounded-none border-2 border-transparent shadow-sm",
        "transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-checked:bg-primary data-unchecked:bg-input",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block aspect-square h-full",
          "rounded-none bg-background shadow-lg ring-0",
          "transition-transform",
          "data-checked:translate-x-[calc(100cqw-100%)] data-unchecked:translate-x-0",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
