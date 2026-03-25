type ApiResult = {
  success: boolean;
  status: number;
  message?: string;
  errors?: Record<string, string[]>;
};

export type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  message: string;
  purpose?: string;
};

async function parseApiResponse(res: Response): Promise<ApiResult> {
  const text = await res.text();

  try {
    const data = JSON.parse(text) as Omit<ApiResult, "success" | "status"> & {
      status?: number;
    };

    return {
      success: res.ok,
      status: res.status,
      ...data,
    };
  } catch {
    console.error("Non-JSON response from server:", text);

    return {
      success: res.ok,
      status: res.status,
      message: `Server error (${res.status}): ${text.slice(0, 200)}`,
    };
  }
}

export const submitEssay = async (formData: FormData) => {
  const res = await fetch("/backend/api/submissions", {
    method: "POST",
    body: formData,
  });

  return parseApiResponse(res);
};

export const submitEventRegistration = async (formData: FormData) => {
  const res = await fetch("/backend/event/create", {
    method: "POST",
    body: formData,
  });

  return parseApiResponse(res);
};

export const submitContact = async (
  payload: ContactPayload,
  recaptchaToken: string,
) => {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(recaptchaToken ? { "X-Recaptcha-Token": recaptchaToken } : {}),
    },
    body: JSON.stringify(payload),
  });

  return parseApiResponse(res);
};
