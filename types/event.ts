import type { ApiResponse } from "@/types/api";

export type EventRegistrationRequest = {
  fullName: string;
  email: string;
  number: string;
  address: string;
  college: string;
  parentsNumber: string;
  screenshotFile: File;
  pdfFile?: File | null;
};

export type CreateEventRegistrationInput = {
  payload: EventRegistrationRequest;
  recaptchaToken: string;
};

export type EventRegistrationResponse = ApiResponse;
