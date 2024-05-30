"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type MakeMessageProps = {
  message: string;
  userId: string;
  channelId: string;
};

export default function makeMessage() {
  return useMutation({
    mutationKey: ["makeMessage"],
    mutationFn: async (data: MakeMessageProps) => {
      const result = await axios.post(`/api/v1/channel/message`, {
        ...data,
      });
      return result.data;
    },
  });
}
