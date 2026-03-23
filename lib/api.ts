// lib/api.ts
export const submitEssay = async (formData: FormData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/submissions`, {
    method: "POST",
    body: formData,
  });

  const text = await res.text();

  try {
    return JSON.parse(text);
  } catch {
    console.error("Non-JSON response from server:", text);
    return { success: false, message: `Server error (${res.status}): ${text.slice(0, 200)}` };
  }
};
