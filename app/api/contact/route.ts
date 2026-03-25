import { NextRequest } from "next/server";
import { proxyJson } from "../_backend";

export async function POST(request: NextRequest) {
  return proxyJson(request, "/contact/create", "POST");
}
