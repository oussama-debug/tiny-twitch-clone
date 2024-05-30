"use client";

import Badge from "@/components/badge";
import { StreamType } from "@/utils/mock/types";
import Image from "next/image";

type LandingStreamsProps = {
  streams: StreamType[];
};

type LandingStreamProps = {
  stream: StreamType;
};

export function LandingStream({ stream }: LandingStreamProps) {
  return (
    <li className="w-[321px] hover:bg-zinc-50 cursor-pointer flex flex-col justify-start">
      <div className="w-[321px] h-[181px] relative">
        <Image src={stream.thumbnail} fill alt={`${stream.name} stream`} />
      </div>
      <div className="w-full flex py-2 flex-row justify-start items-start">
        <Image
          width={30}
          src={`${stream.avatar}`}
          height={30}
          className="rounded-full"
          alt={`${stream.name} profile`}
        />
        <div className="flex -mt-2 px-2 py-1.5 text-balance flex-col justify-start items-start">
          <span className="font-medium text-sm w-[100px] truncate">
            @{stream.name}
          </span>
          <p className="text-slate-500 mb-2 text-[.8rem]">{stream.game}</p>
          <div className="w-full flex flex-row flex-wrap text-balance">
            {stream.tags.map((t) => (
              <Badge>{t}</Badge>
            ))}
          </div>
        </div>
      </div>
    </li>
  );
}

export default function LandingStreams({ streams }: LandingStreamsProps) {
  return (
    <ul className="grid grid-cols-1 lg:gap-x-6 gap-y-10 lg:gap-y-0 gap-x-0 w-full lg:grid-cols-4">
      {streams.map((stream: StreamType) => (
        <LandingStream
          key={`stream_showcase_close_${stream?.id}`}
          stream={stream}
        />
      ))}
    </ul>
  );
}
