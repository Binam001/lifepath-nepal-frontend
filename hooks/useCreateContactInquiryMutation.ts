"use client";

import { useMutation } from "@tanstack/react-query";
import { createContactInquiry } from "@/services/contact";

export function useCreateContactInquiryMutation() {
  return useMutation({
    mutationFn: createContactInquiry,
  });
}
