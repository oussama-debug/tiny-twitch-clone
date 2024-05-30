"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function makeFollow() {
  return useMutation({
    mutationKey: ["makeFollow"],
    mutationFn: async (channelId: string) => {
      const result = await axios.post(`/api/v1/channel/follow`, {
        channelId: channelId,
      });
      return result.data;
    },
  });
}
