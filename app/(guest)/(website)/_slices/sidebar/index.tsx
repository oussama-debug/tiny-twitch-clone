"use client";

import Button from "@/components/button";
import { useLatestChannels } from "@/components/hooks/channels/useLatestChannels";
import moment from "moment";
import Link from "next/link";
import { LuChevronFirst } from "react-icons/lu";

type LandingSidebarProps = {
  children?: React.ReactNode;
};

type LandingSidebarItemProps = {
  avatar: string;
  text: string;
  activity: string;
  isActive: boolean;
};
export function LandingSidebarItem({
  avatar,
  text,
  activity,
}: LandingSidebarItemProps) {
  return (
    <Link
      className="w-full flex py-1 space-x-2 hover:bg-zinc-100 hover:cursor-pointer flex-row justify-start px-4 items-center"
      href={`/@${avatar}`}
    >
      <div className="w-[40px] h-[40px] border-[2px] flex flex-row justify-center items-center border-white rounded-full bg-purple-500">
        <span>{avatar.slice(0, 2)}</span>
      </div>

      <div className="flex flex-col">
        <span className="max-w-[150px] text-sm font-medium font-geist text-gray-800 truncate">
          @{text}
        </span>
        <p className="max-w-[200px] text-slate-500 font-inter font-normal truncate text-[.8rem]">
          {activity}
        </p>
      </div>
    </Link>
  );
}

export default function LandingSidebar({}: LandingSidebarProps) {
  const { data: channels, isSuccess } = useLatestChannels();

  return (
    <aside className="w-full lg:max-w-[320px] flex-1 min-h-full flex flex-col bg-zinc-50 border-r py-3 border-slate-100">
      <nav className="flex pb-2 flex-row justify-between px-2 py-1 items-center w-full">
        <h1 className="font-geist uppercase text-[.82rem] font-medium">
          Recent channels
        </h1>
        <Button type="button" variant={"link"} className="-mr-4">
          <LuChevronFirst size={19} />
        </Button>
      </nav>
      <div className="flex-1 space-y-1">
        {isSuccess &&
          channels.data &&
          channels.data.map((d) => (
            <LandingSidebarItem
              text={d.name}
              avatar={d.name}
              activity={`Joined ${moment(d.createdAt).fromNow()}`}
              isActive={true}
              key={`${d.id}_slug_item`}
            />
          ))}
      </div>
    </aside>
  );
}
