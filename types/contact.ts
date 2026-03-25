import type { ApiResponse } from "@/types/api";

export type Contact = {
  fullname: string;
  email: string;
  phoneNo: string;
  address: string;
  message: string;
  isView: boolean;
};

export type CreateContactInquiryRequest = Omit<Contact, "isView">;

export type CreateContactInquiryInput = {
  payload: CreateContactInquiryRequest;
  recaptchaToken: string;
};

export type CreateContactInquiryResponse = ApiResponse;
