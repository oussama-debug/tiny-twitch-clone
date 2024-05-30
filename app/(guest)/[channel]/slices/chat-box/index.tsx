"use client";

import Input from "@/components/input";
import { useUser } from "@clerk/nextjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ChatBox() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { isSignedIn } = useUser();

  const onFocus = () => {
    if (!isSignedIn) {
      const newParams = new URLSearchParams(params.toString());
      newParams.append("showLogin", "true");
      router.replace(`${pathname}?${newParams}`);
    }
  };

  return (
    <div className="w-full py-4 px-4">
      <Input
        as={"textarea"}
        inputWrapperClassName="w-full"
        className="resize-none"
        onFocus={onFocus}
        placeholder="Type your message here"
        rows={1}
      />
    </div>
  );
}
