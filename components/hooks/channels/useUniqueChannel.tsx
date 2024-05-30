"use client";

import type { Follow, User, Channel } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export default function useUniqueChannel(username: string) {
  return useQuery<{
    data: Channel & { followers: (Follow & { follower: User })[] };
  }>({
    queryKey: ["uniqueChannel"],
    throwOnError: true,
    queryFn: async () => {
      const result = await fetch(`/api/v1/channel/${username}`);
      const response = await result.json();
      return response;
    },
  });
}
