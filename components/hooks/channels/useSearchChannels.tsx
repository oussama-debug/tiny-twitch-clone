"use client";

import { type Channel } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export function useSearchChannels(name: string) {
  return useQuery<{ data: Channel[] }>({
    queryKey: ["searchChannel"],
    throwOnError: true,
    queryFn: async () => {
      const result = await fetch(`/api/v1/channel/search?name=${name}`);
      const response = await result.json();
      return response;
    },
  });
}
