import { getUserProfileByClerkUserId } from "@/library/queries/user/get-user";
import ChannelChat from "./slices/chat";
import ChannelStream from "./slices/stream";
import { notFound } from "next/navigation";
import { getUniqueChannelByUsername } from "@/library/queries/channel/get-unique";

export default async function ChannelPage({
  params,
}: {
  params: { channel: string };
}) {
  if (!params.channel) notFound();

  const channel = decodeURIComponent(params.channel);
  const currentUser = await getUserProfileByClerkUserId();
  const fullChannel = await getUniqueChannelByUsername(
    channel.replace("@", "")
  );
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
      {currentUser && fullChannel && (
        <ChannelChat
          userId={currentUser.id!}
          channelId={fullChannel!.id}
          channelUsername={channel}
        />
      )}
    </div>
  );
}
