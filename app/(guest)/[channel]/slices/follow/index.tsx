"use client";

import Button from "@/components/button";
import makeFollow from "@/components/hooks/channels/makeFollow";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type FollowButtonProps = {
  channelId: string;
  followed: boolean;
};

export default function FollowButton({
  channelId,
  followed,
}: FollowButtonProps) {
  const client = useQueryClient();
  const { mutateAsync: followAsync, isPending } = makeFollow();

  const follow = async () => {
    try {
      await followAsync(channelId);
      await client.invalidateQueries();
    } catch (e) {
      toast.error(
        `An error happening while trying to follow. Please try again later`
      );
    }
  };

  return (
    <Button
      className="h-7"
      onClick={() => follow()}
      loading={isPending}
      disabled={followed}
    >
      <span>{followed ? "Followed" : "Follow"}</span>
    </Button>
  );
}
