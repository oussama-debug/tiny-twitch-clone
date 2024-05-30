"use client";

import { ReactNode } from "react";
import { VariantProps, cva, cx } from "class-variance-authority";
import Button from "../button";
import clsx from "clsx";

const modal = cva([], {
  variants: {
    variant: {
      primary: ["rounded-md"],
    },
    size: {
      medium: ["max-w-[400px]"],
      small: ["max-w-[320px]"],
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "medium",
  },
});

type ModalProps = {
  children?: ReactNode;
  show: boolean;
  onClose?: () => void;
  title?: string;
  onSubmit?: (s?: any) => Promise<void> | void;
} & VariantProps<typeof modal>;

export default function Modal({
  children,
  variant,
  title,
  show,
  size,
}: ModalProps) {
  if (show === true)
    return (
      <div className="absolute z-20 bg-black/30 w-screen h-screen overflow-hidden top-0 left-0 right-0 flex flex-col justify-center items-center">
        <div
          className={clsx(
            "w-full bg-white shadow-input rounded-[5px] px-5 pt-5 pb-5 flex flex-col justify-start items-start",
            modal({ variant, size })
          )}
        >
          <div className="w-full flex flex-row justify-between items-center">
            <span>{title ? title : ""}</span>
            <div className="flex flex-row justify-start items-center">
              <div className="flex justify-start items-center space-x-2"></div>
            </div>
          </div>
          {children}
        </div>
      </div>
    );
  return null;
}
