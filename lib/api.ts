type ApiResult = {
  success: boolean;
  status: number;
  message?: string;
  errors?: Record<string, string[]>;
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
