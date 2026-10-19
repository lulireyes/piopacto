import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans transition-colors duration-180 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "rounded-md bg-terracotta-strong text-cream text-btn px-[26px] py-4 hover:bg-terracotta-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
        secondary:
          "rounded-md bg-transparent text-ink font-medium text-[17px] leading-none px-6 py-[15px] border border-[rgba(30,26,22,0.35)] hover:bg-[rgba(30,26,22,0.04)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
        next:
          "rounded-md bg-ink text-paper text-base font-semibold px-[22px] py-[13px] hover:bg-ink/90 disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
        destructive:
          "rounded-md bg-terracotta-hover text-cream text-btn px-[26px] py-4 hover:opacity-90",
        outline:
          "rounded-md bg-transparent text-ink font-medium text-[17px] leading-none px-6 py-[15px] border border-[rgba(30,26,22,0.35)] hover:bg-[rgba(30,26,22,0.04)]",
        ghost: "rounded-md hover:bg-[rgba(30,26,22,0.04)] text-ink",
        link: "text-link underline-offset-4 hover:text-link-hover hover:underline font-medium",
      },
      size: {
        default: "",
        sm: "text-sm px-4 py-2",
        lg: "",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
