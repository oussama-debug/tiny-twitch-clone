"use client";

import type { VariantProps } from "class-variance-authority";
import { cva, cx } from "class-variance-authority";
import { HTMLInputTypeAttribute } from "react";
import { PiWarningCircle } from "react-icons/pi";
import { MdErrorOutline } from "react-icons/md";
import { UseFormRegisterReturn } from "react-hook-form";

const input = cva(
  [
    "border",
    "w-full",
    "text-black",
    "border-slate-200",
    "bg-slate-50",
    "text-sm",
    "shadow-input",
  ],
  {
    variants: {
      variant: {
        primary: [
          "rounded-md",
          "px-3 py-2",
          "ring-slate-50",
          "placeholder:text-neutral-400",
          "focus-visible:outline-none",
          "focus-visible:ring-[1px]",
          "focus-visible:ring-purple-500",
        ],
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

export type MYInputProps = React.HTMLProps<HTMLInputElement> &
  React.HTMLProps<HTMLTextAreaElement> &
  VariantProps<typeof input> & {
    type?: HTMLInputTypeAttribute;
    inputWrapperClassName?: string;
    labelText?: string;
    tooltipText?: string;
    placeholderText?: string;
    rows?: number;
    as?: React.ElementType;
    errorText?: string | null;
    loading?: boolean;
    register?: UseFormRegisterReturn<any>;
  };

export default function Input({
  variant,
  className,
  inputWrapperClassName,
  onChange,
  type,
  labelText,
  placeholderText,
  tooltipText,
  errorText,
  loading = false,
  rows,
  register,
  as: Comp = "input",
  ...props
}: MYInputProps) {
  return (
    <div
      className={cx(
        "flex flex-col space-y-1 justify-start items-start",
        inputWrapperClassName
      )}
    >
      {labelText && (
        <span className="text-sm font-medium font-sans text-zinc-500">
          {labelText}
        </span>
      )}
      <Comp
        type={type}
        autoComplete={"none"}
        onChange={onChange}
        disabled={loading}
        className={cx(
          "disabled:cursor-not-allowed disabled:opacity-50",
          input({ variant }),
          className
        )}
        {...register}
        placeholder={placeholderText}
        rows={rows}
        {...props}
      />
      {errorText && (
        <div className="w-full space-x-1 flex flex-row text-zinc-500 justify-start items-center">
          <div className="w-[18px] py-1">
            <MdErrorOutline size={18} className="text-red-500" />
          </div>
          <span className="text-[.8rem] font-normal text-red-500">
            {errorText}
          </span>
        </div>
      )}
      {tooltipText && (
        <div className="w-full space-x-1 flex flex-row text-zinc-500 justify-start items-center">
          <div className="w-[18px] py-1">
            <PiWarningCircle size={18} />
          </div>
          <span className="text-[.8rem] font-normal">{tooltipText}</span>
        </div>
      )}
    </div>
  );
}
