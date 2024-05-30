"use client";

import useUniqueChannel from "@/components/hooks/channels/useUniqueChannel";
import FollowButton from "../follow";
import { useEffect, useState } from "react";

type ChannelStreamProps = {
  isMine: boolean;
  username: string;
  userId?: string;
};

export default function ChannelStream({
  isMine,
  username,
  userId,
}: ChannelStreamProps) {
  const [channelUsername, setChannelUsername] = useState(username);
  const { data: channel, refetch } = useUniqueChannel(channelUsername);

  useEffect(() => {
    setChannelUsername(username);
    refetch();
  }, [username]);

  return (
    <div className="flex-1 h-full flex flex-col justify-start items-start px-2 py-2">
      <div className="w-full flex flex-row px-5 justify-between items-center">
        <h1 className="text-sm font-medium">@{username}</h1>
        {!isMine && channel && (
          <div className="flex justify-start items-center space-x-2">
            <FollowButton
              channelId={channel?.data.id}
              followed={
                channel?.data.followers.filter((f) => f.followerId === userId)
                  .length &&
                channel?.data.followers.filter((f) => f.followerId === userId)
                  .length > 0
                  ? true
                  : false
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
