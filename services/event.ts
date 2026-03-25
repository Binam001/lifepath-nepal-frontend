import axios from "axios";
import { api } from "@/config/axios.config";
import { EVENT_REGISTRATION_ENDPOINT } from "@/lib/config/api";
import type {
  CreateEventRegistrationInput,
  EventRegistrationResponse,
} from "@/types/event";

const normalizeEventRegistrationResponse = (
  data: Partial<EventRegistrationResponse> | undefined,
  status: number,
): EventRegistrationResponse => ({
  success: typeof data?.success === "boolean" ? data.success : status >= 200 && status < 300,
  status: typeof data?.status === "number" ? data.status : status,
  message: data?.message,
  errors: data?.errors,
  data: data?.data,
});

const buildEventRegistrationFormData = (
  payload: CreateEventRegistrationInput["payload"],
) => {
  const formData = new FormData();

  formData.append("fullName", payload.fullName);
  formData.append("email", payload.email);
  formData.append("number", payload.number);
  formData.append("address", payload.address);
  formData.append("college", payload.college);
  formData.append("parentsNumber", payload.parentsNumber);
  formData.append("screenshotFile", payload.screenshotFile);

  return formData;
};

export const createEventRegistration = async (
  input: CreateEventRegistrationInput,
): Promise<EventRegistrationResponse> => {
  try {
    const response = await api.post<EventRegistrationResponse>(
      EVENT_REGISTRATION_ENDPOINT,
      buildEventRegistrationFormData(input.payload),
      {
        headers: {
          ...(input.recaptchaToken
            ? { "X-Recaptcha-Token": input.recaptchaToken }
            : {}),
        },
      },
    );

    return normalizeEventRegistrationResponse(response.data, response.status);
  } catch (error) {
    if (axios.isAxiosError<EventRegistrationResponse>(error)) {
      if (error.response) {
        return normalizeEventRegistrationResponse(
          error.response.data,
          error.response.status,
        );
      }

      return {
        success: false,
        status: 500,
        message: "Failed to submit event registration.",
      };
    }

    return {
      success: false,
      status: 500,
      message: "Failed to submit event registration.",
    };
  }
};
