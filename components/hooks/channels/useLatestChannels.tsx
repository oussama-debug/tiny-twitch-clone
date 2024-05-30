"use client";

import { type Channel } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export function useLatestChannels() {
  return useQuery<{ data: Channel[] }>({
    queryKey: ["latestChannel"],
    throwOnError: true,
    queryFn: async () => {
      const result = await fetch(`/api/v1/channel/latest`);
      const response = await result.json();
      return response;
    },
  });
}
