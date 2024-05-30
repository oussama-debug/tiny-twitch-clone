"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function makeNotification() {
  return useMutation({
    mutationKey: ["makeNotification"],
    mutationFn: async (channelId: string) => {
      const result = await axios.post(`/api/v1/channel/notify`, {
        channelId: channelId,
      });
      return result.data;
    },
  });
}
