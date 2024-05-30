"use client";

import type { VariantProps } from "class-variance-authority";
import { cva, cx } from "class-variance-authority";

const badge = cva(
  [
    "font-inter",
    "flex",
    "flex-row",
    "justify-center",
    "items-center",
    "space-x-2",
  ],
  {
    variants: {
      size: {
        small: ["text-sm", "font-medium", "px-4", "py-1.5"],
      },
      variant: {
        primary: [
          "bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded",
        ],
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "small",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof badge> {}

export default function Badge({
  size,
  variant,
  className,
  ...props
}: BadgeProps) {
  return (
    <span className={cx(badge({ size, variant }), className)} {...props}></span>
  );
}
