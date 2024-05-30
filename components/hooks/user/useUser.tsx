"use client";

import { type User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export default function useUser() {
  return useQuery<{ data: User }>({
    queryKey: ["user"],
    throwOnError: true,
    queryFn: async () => {
      const result = await fetch(`/api/v1/user`);
      const response = await result.json();
      return response;
    },
  });
}
