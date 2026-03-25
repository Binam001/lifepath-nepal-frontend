"use client";

import { useMutation } from "@tanstack/react-query";
import { submitContact, type ContactPayload } from "@/lib/api";

export function useContactMutation() {
  return useMutation({
    mutationFn: ({
      payload,
      recaptchaToken,
    }: {
      payload: ContactPayload;
      recaptchaToken: string;
    }) => submitContact(payload, recaptchaToken),
  });
}
