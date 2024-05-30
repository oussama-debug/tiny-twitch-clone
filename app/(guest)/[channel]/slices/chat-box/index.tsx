"use client";

import Input from "@/components/input";

export default function ChatBox() {
  return (
    <div className="w-full py-4 px-4">
      <Input
        as={"textarea"}
        inputWrapperClassName="w-full"
        className="resize-none"
        disabled
        placeholder="Type your message here"
        rows={1}
      />
    </div>
  );
}
