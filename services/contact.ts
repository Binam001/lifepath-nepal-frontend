import axios from "axios";
import { api } from "@/config/axios.config";
import { CONTACT_CREATE_ENDPOINT } from "@/lib/config/api";
import type {
  CreateContactInquiryInput,
  CreateContactInquiryResponse,
} from "@/types/contact";

const normalizeCreateContactResponse = (
  data: Partial<CreateContactInquiryResponse> | undefined,
  status: number,
): CreateContactInquiryResponse => ({
  success:
    typeof data?.success === "boolean" ? data.success : status >= 200 && status < 300,
  status: typeof data?.status === "number" ? data.status : status,
  message: data?.message,
  errors: data?.errors,
  data: data?.data,
});

export const createContactInquiry = async (
  input: CreateContactInquiryInput,
): Promise<CreateContactInquiryResponse> => {
  try {
    const response = await api.post<CreateContactInquiryResponse>(
      CONTACT_CREATE_ENDPOINT,
      input.payload,
      {
        headers: {
          ...(input.recaptchaToken
            ? { "X-Recaptcha-Token": input.recaptchaToken }
            : {}),
        },
      },
    );

    return normalizeCreateContactResponse(response.data, response.status);
  } catch (error) {
    if (axios.isAxiosError<CreateContactInquiryResponse>(error)) {
      if (error.response) {
        return normalizeCreateContactResponse(
          error.response.data,
          error.response.status,
        );
      }

      return {
        success: false,
        status: 500,
        message: "Failed to submit contact inquiry.",
      };
    }

    return {
      success: false,
      status: 500,
      message: "Failed to submit contact inquiry.",
    };
  }
};
