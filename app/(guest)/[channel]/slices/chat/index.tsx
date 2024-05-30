"use client";
import ChatBox from "../chat-box/index";

export default function ChannelChat() {
  return (
    <section className="w-full max-w-[320px] border-l border-slate-100 flex-1 h-full flex flex-col justify-start items-start bg-zinc-50/20">
      <div className="flex-1 flex-col flex w-full"></div>
      <ChatBox />
    </section>
  );
}
