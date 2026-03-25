import { NextRequest } from "next/server";
import { proxyToBackend } from "../_backend";

export async function POST(request: NextRequest) {
  const payload = await request.json().catch(() => ({}));
  const firstName = String(payload.firstName ?? "").trim();
  const lastName = String(payload.lastName ?? "").trim();
  const fullName = [firstName, lastName].filter(Boolean).join(" ");

  return proxyToBackend(
    request,
    "/contact/create",
    "POST",
    JSON.stringify({
      fullname: fullName,
      email: payload.email ?? "",
      phoneNo: payload.phone ?? "",
      address: payload.address ?? "",
      message: payload.message ?? "",
      purpose: payload.purpose ?? "General_Enquiry",
    }),
  );
}
