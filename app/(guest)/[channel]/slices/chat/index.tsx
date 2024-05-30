"use client";
import { createRef, useEffect, useState } from "react";
import ChatBox from "../chat-box/index";
import { pusherClient } from "@/library/pusher";
import _ from "lodash";
import moment from "moment";

type ChannelChatProps = {
  userId: string;
  channelId: string;
  channelUsername: string;
};

type ChannelChatMessage = {
  message: string;
  user: {
    id: string;
    name: string;
  };
  createdAt: number;
};

export function ChannelMessage(message: ChannelChatMessage) {
  return (
    <div className="w-full py-1 flex flex-col px-2 hover:bg-zinc-50 cursor-pointer">
      <h2 className="font-ibm font-medium text-[.8rem] text-black">
        @{message.user.name}
      </h2>
      <p className="text-[.8rem] text-slate-600">{message.message}</p>
    </div>
  );
}

export default function ChannelChat({
  userId,
  channelUsername,
  channelId,
}: ChannelChatProps) {
  const ref = createRef<HTMLUListElement>();
  const [messages, setMessages] = useState<ChannelChatMessage[]>([]);

  useEffect(() => {
    let messageSubscription = pusherClient.subscribe(channelId);
    messageSubscription.bind("new_message", (payload: ChannelChatMessage) => {
      setMessages((m) => [..._.uniq(m, "createdAt"), payload]);
      if (ref.current) {
        ref.current.scroll({
          top: ref.current.scrollHeight,
          behavior: "smooth",
        });
      }
    });
    return () => {
      //messageSubscription.unsubscribe();
    };
  }, [pusherClient]);

  if (channelId)
    return (
      <section className="w-full max-w-[320px] border-l border-slate-100 flex-1 h-full flex flex-col justify-start items-start bg-zinc-50/20">
        <ul
          className="h-[calc(100dvh-130px)] overflow-y-scroll overflow-x-hidden flex-col flex w-full"
          ref={ref}
        >
          {_.uniq(messages, "createdAt").map((msg: ChannelChatMessage) => (
            <ChannelMessage key={`${msg.createdAt}_key`} {...msg} />
          ))}
        </ul>
        <ChatBox
          channel={channelId}
          userId={userId}
          channelId={channelUsername}
        />
      </section>
    );
  return null;
}
