"use client";

import { SetupFormInputValue } from "@/app/streamer/setup/form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function makeSetupComplete() {
  return useMutation({
    mutationKey: ["makeSetupComplete"],
    mutationFn: async (v: SetupFormInputValue) => {
      const result = await axios.post(`/api/v1/user/setup`, {
        ...v,
      });
      return result.data;
    },
  });
}
