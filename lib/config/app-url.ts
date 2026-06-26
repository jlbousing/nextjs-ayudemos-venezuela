import { headers } from "next/headers";

function normalizeAppUrl(url: string) {
  const trimmed = url.replace(/\/$/, "");

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

export async function getAppUrl() {
  const fromEnv =
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : undefined);

  if (fromEnv) {
    return normalizeAppUrl(fromEnv);
  }

  const headersList = await headers();
  const host =
    headersList.get("x-forwarded-host") ?? headersList.get("host");
  const proto = headersList.get("x-forwarded-proto") ?? "http";

  if (host) {
    return normalizeAppUrl(`${proto}://${host}`);
  }

  return "http://localhost:3000";
}
