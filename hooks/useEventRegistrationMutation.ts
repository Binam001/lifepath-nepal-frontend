"use client";

import { useMutation } from "@tanstack/react-query";
import { createEventRegistration } from "@/services/event";

export function useEventRegistrationMutation() {
  return useMutation({
    mutationFn: createEventRegistration,
  });
}
