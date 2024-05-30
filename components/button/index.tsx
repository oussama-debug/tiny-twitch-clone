"use client";

import type { VariantProps } from "class-variance-authority";
import { cva, cx } from "class-variance-authority";
import Link from "next/link";

const button = cva(
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
          "rounded-md",
          "bg-gradient-to-b",
          "from-purple-500",
          "to-purple-600",
          "text-white",
          "focus:ring-2",
          "focus:ring-purple-400",
          "border-purple-700",
          "border",
          "transition",
          "duration-200",
        ],
        empty: [
          "rounded-md",
          "bg-gradient-to-b",
          "from-white",
          "to-slate-50",
          "text-black",
          "focus:ring-2",
          "px-4",
          "focus:ring-slate-100",
          "border-slate-200",
          "border",
          "transition",
          "duration-200",
          "shadow-input",
        ],
        link: ["font-medium", "px-0"],
      },
      loading: {
        true: ["opacity-20"],
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "small",
    },
  }
);

type ButtonElement = "button" | "link";

export interface MealwayButtonProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof button> {
  as?: ButtonElement;
  href?: string;
  disabled?: boolean;
  type?: "button" | "submit";
}

export default function Button({
  size,
  variant,
  loading,
  className,
  href,
  disabled = false,
  type = "button",
  ...props
}: MealwayButtonProps) {
  const { as: Component = href ? Link : "button" } = props;

  return (
    <Component
      type={type}
      disabled={!!loading || !!disabled}
      className={cx(
        button({ size, variant, loading }),
        className,
        disabled && "opacity-50"
      )}
      href={href || ""}
      {...props}
    >
      {!!loading && (
        <svg
          className="text-gray-300 animate-spin"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
        >
          <path
            d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-purple-700"
          ></path>
        </svg>
      )}
      {!loading && props.children}
    </Component>
  );
}
