"use client";

import makeMessage from "@/components/hooks/channels/makeMessage";
import Input from "@/components/input";
import { useUser } from "@clerk/nextjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

type ChatBoxProps = {
  channelId: string;
  userId: string;
  channel: string;
};

export default function ChatBox({ channel, userId }: ChatBoxProps) {
  const [text, setText] = useState("");
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { isSignedIn } = useUser();
  const { mutateAsync: message } = makeMessage();

  const onFocus = () => {
    if (!isSignedIn) {
      const newParams = new URLSearchParams(params.toString());
      newParams.append("showLogin", "true");
      router.replace(`${pathname}?${newParams}`);
    }
  };

  const onChangeText = (e: FormEvent<HTMLTextAreaElement>) => {
    setText(e.currentTarget.value);
  };

  const onSend = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      await message({ channelId: channel, userId: userId, message: text });
      setText("");
    }
  };

  return (
    <div className="w-full py-4 px-4">
      <Input
        as={"textarea"}
        inputWrapperClassName="w-full"
        className="resize-none"
        onFocus={onFocus}
        value={text}
        onChange={(e) => onChangeText(e as FormEvent<HTMLTextAreaElement>)}
        onKeyDown={(e) => onSend(e as React.KeyboardEvent<HTMLTextAreaElement>)}
        placeholder="Type your message here"
        rows={1}
      />
    </div>
  );
}
