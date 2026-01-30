import type { ReactNode } from "react";
import { cn } from "@/util";

export type TimelineItemProps = {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  isComplete?: boolean;
  isLast?: boolean;
  nextComplete?: boolean;
};

export function TimelineItem({
  title,
  children,
  icon,
  isComplete = false,
  isLast = false,
  nextComplete = false,
}: TimelineItemProps): ReactNode {
  return (
    <div className={cn("relative pb-6", isLast && "pb-0")}>
      {!isLast && (
        <div
          className={cn(
            "absolute -left-2 w-0.5 top-6 bottom-0",
            isComplete && nextComplete ? "bg-primary" : "bg-border",
          )}
        />
      )}

      <div
        className={cn(
          "absolute -left-5 size-6 rounded-sm flex items-center justify-center p-0.5",
          isComplete
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground",
        )}
      >
        {icon || <div className="size-2 rounded-full bg-current" />}
      </div>

      <div className="ml-4">
        <h3
          className={cn(
            "text-2xl font-medium mb-2",
            !isComplete && "opacity-50",
          )}
        >
          {title}
        </h3>
        {children}
      </div>
    </div>
  );
}

export function Timeline({ children }: { children: ReactNode }): ReactNode {
  return <div className="relative pl-8">{children}</div>;
}
