import { jsonResponse } from "@/lib/api/response";

export async function GET() {
  return jsonResponse({ status: "ok" });
}
