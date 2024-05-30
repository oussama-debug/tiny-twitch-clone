"use client";

import Button from "@/components/button";
import makeSetupComplete from "@/components/hooks/user/makeSetup";
import Input from "@/components/input";
import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiAtSign } from "react-icons/fi";
import { toast } from "sonner";
import { TbCircleCheck } from "react-icons/tb";

export type SetupFormInputValue = { username: string; services: string[] };

export enum SetupTags {
  GTAV = "GTAV",
  FINANCE = "FINANCE",
  OTHER = "OTHER",
  CODING = "CODING",
  FUNNY = "FUNNY",
  ANIME = "ANIME",
  SHOOTER = "SHOOTER",
  FPS = "FPS",
}

export const SetupTagsDetails = [
  { code: SetupTags.GTAV, value: "GTA V" },
  { code: SetupTags.FINANCE, value: "Finance" },
  { code: SetupTags.CODING, value: "Coding" },
  { code: SetupTags.FPS, value: "FPS" },
  { code: SetupTags.SHOOTER, value: "Shooter" },
  { code: SetupTags.ANIME, value: "Anime" },
  { code: SetupTags.FUNNY, value: "Funny" },
  { code: SetupTags.OTHER, value: "Other" },
];

type SetupTagsItem = {
  code: string;
  isIncluded: boolean;
  onSelect: (v: SetupTags) => void;
};

function SetupTagsFormItem({ code, isIncluded, onSelect }: SetupTagsItem) {
  const service = SetupTagsDetails.filter((v) => v.code === code)[0];
  return (
    <li
      className={clsx(
        "w-full py-1.5 font-geist text-sm flex space-x-1 flex-row justify-start font-normal items-center hover:cursor-pointer rounded",
        isIncluded ? "text-purple-500" : "text-slate-600"
      )}
      onClick={() => onSelect(service.code)}
    >
      {isIncluded && <TbCircleCheck size={20} className="text-purple-500" />}
      <span>{service.value}</span>
    </li>
  );
}

export default function SetupForm() {
  const [loading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm<SetupFormInputValue>();
  const [services, setServices] = useState<SetupTags[]>([]);
  const { mutateAsync, isPending } = makeSetupComplete();

  const onSetup = async (v: SetupFormInputValue) => {
    try {
      setIsLoading(true);
      if (services.length <= 0) {
        setIsLoading(false);
        toast.error(`Choose at least one tag for your channel`);
        return;
      }
      const result = await mutateAsync({ username: v.username, services });
      if (result.code && result.code === 200) {
        window.location.href = "/";
      }
    } catch {
      setIsLoading(false);
      toast.error(
        `Something went wrong while setting up your channel. Please try another username later.`
      );
    }
  };

  return (
    <div className="w-full max-w-[260px] space-y-2 flex flex-col justify-start items-start">
      <div className="w-full flex flex-col">
        <h1 className="font-geist text-sm font-medium">
          Choose your profile username
        </h1>
        <p className="text-[.85rem] text-slate-600">
          A unique username for your profile for other viewers to find you.
        </p>
      </div>
      <div className="w-full flex flex-row justify-start items-center relative">
        <FiAtSign className="absolute top-3 left-3 text-purple-800" />
        <Input
          register={register("username")}
          inputWrapperClassName="w-full"
          className="pl-10"
          placeholder="eg. acmeinc"
        />
      </div>
      <div className="w-full max-w-[320px] flex flex-col justify-start items-start">
        <ul className="grid w-full gap-y-1 grid-cols-2 gap-x-2">
          {Object.values(SetupTags).map((v) => (
            <SetupTagsFormItem
              code={v}
              key={`${v}`}
              isIncluded={services.filter((s) => s === SetupTags[v]).length > 0}
              onSelect={(v) => {
                if (services.length < 6) {
                  const _included = services.filter((s) => s === SetupTags[v]);
                  if (_included.length > 0) {
                    setServices((s) => [
                      ...services.filter((s) => s !== SetupTags[v]),
                    ]);
                  } else {
                    setServices((s) => [...s, SetupTags[v]]);
                  }
                }
              }}
            />
          ))}
        </ul>
      </div>
      <Button
        type="button"
        disabled={loading || isPending || services.length <= 0}
        loading={loading || isPending}
        className="w-full h-7"
        onClick={handleSubmit(onSetup)}
      >
        <span>Start streaming</span>
      </Button>
    </div>
  );
}
