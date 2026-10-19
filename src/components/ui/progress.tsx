import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value = 0, ...props }, ref) => {
  const pct = Math.min(100, Math.max(0, value ?? 0));

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn("relative h-1 w-full overflow-hidden rounded-[2px] bg-track", className)}
      {...props}
      value={value}
    >
      <ProgressPrimitive.Indicator
        className="h-full bg-terracotta-strong transition-[width] duration-180"
        style={{ width: `${pct}%` }}
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
