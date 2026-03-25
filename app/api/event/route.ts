import { NextRequest } from "next/server";
import { proxyToBackend } from "../_backend";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  return proxyToBackend(request, "/event/create", "POST", formData);
}
