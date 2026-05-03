import { NextRequest } from "next/server";
import { proxyToBackend } from "../_backend";

export async function POST(request: NextRequest) {
  const body = await request.arrayBuffer();
  return proxyToBackend(request, "/event/create", "POST", body);
}
