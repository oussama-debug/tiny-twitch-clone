"use client";

import useUser from "@/components/hooks/user/useUser";
import { pusherClient } from "@/library/pusher";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "sonner";

export default function NotificationProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { data: user } = useUser();

  useEffect(() => {
    if (user && user.data && pusherClient) {
      pusherClient.subscribe(`presence-online`);
      let followings = user.data.following?.map((f) => f);
      let channelsTosubscribe = followings?.map((f) => f.following);

      for (let channel of channelsTosubscribe! as any) {
        let notifcation = pusherClient.subscribe(channel.id);
        notifcation.bind("new_stream", (payload: { channelName: string }) => {
          let name = payload.channelName;
          let isNotifOff = localStorage.getItem("notif");
          if (isNotifOff !== "off") {
            toast.message(
              <div className="text-sm text-slate-600">
                You can watch your favorite star stream {name}&nbsp;
                <Link href={`/${name}`} className="text-blue-500">
                  here
                </Link>
              </div>,
              { duration: 5000, position: "top-right", closeButton: true }
            );
          }
        });

        return () => {
          notifcation.unsubscribe();
        };
      }
    }
  }, [user, pusherClient]);

  return <>{children}</>;
}
