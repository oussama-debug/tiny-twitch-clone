import { getUserProfileByClerkUserId } from "@/library/queries/user/get-user";
import ChannelChat from "./slices/chat";
import ChannelStream from "./slices/stream";
import { notFound } from "next/navigation";

export default async function ChannelPage({
  params,
}: {
  params: { channel: string };
}) {
  if (!params.channel) notFound();

  const channel = decodeURIComponent(params.channel);
  const currentUser = await getUserProfileByClerkUserId();
  const isMine =
    decodeURIComponent(params.channel) === `@${currentUser?.channel?.username}`;

  return (
    <div className="flex-1 flex-row flex">
      <div className="flex-1">
        {channel && currentUser && (
          <ChannelStream
            userId={currentUser?.id}
            isMine={isMine}
            username={channel.replace("@", "")!}
          />
        )}
      </div>
      <ChannelChat />
    </div>
  );
}
