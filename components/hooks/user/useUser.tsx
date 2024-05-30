"use client";

import type { User, Channel, Follow } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export default function useUser() {
  return useQuery<{
    data: User & {
      channel?: Channel;
      following?: (Follow & { following: Channel[] })[];
    };
  }>({
    queryKey: ["user"],
    throwOnError: true,
    queryFn: async () => {
      const result = await fetch(`/api/v1/user`);
      const response = await result.json();
      return response;
    },
  });
}
