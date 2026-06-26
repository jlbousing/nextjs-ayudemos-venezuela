import { headers } from "next/headers";

function normalizeAppUrl(url: string) {
  const trimmed = url.replace(/\/$/, "");

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

function isLocalhost(url: string) {
  try {
    const { hostname } = new URL(normalizeAppUrl(url));

    return hostname === "localhost" || hostname === "127.0.0.1";
  } catch {
    return false;
  }
}

function isProductionRuntime() {
  return (
    process.env.NODE_ENV === "production" ||
    process.env.NETLIFY === "true" ||
    Boolean(process.env.VERCEL)
  );
}

function getProductionCandidates() {
  const candidates: string[] = [];

  if (process.env.URL) {
    candidates.push(process.env.URL);
  }

  if (process.env.DEPLOY_PRIME_URL) {
    candidates.push(process.env.DEPLOY_PRIME_URL);
  }

  if (process.env.VERCEL_URL) {
    candidates.push(`https://${process.env.VERCEL_URL}`);
  }

  return candidates;
}

export async function getAppUrl() {
  const production = isProductionRuntime();

  if (production) {
    for (const candidate of getProductionCandidates()) {
      const normalized = normalizeAppUrl(candidate);

      if (!isLocalhost(normalized)) {
        return normalized;
      }
    }
  }

  if (process.env.NEXT_PUBLIC_APP_URL) {
    const normalized = normalizeAppUrl(process.env.NEXT_PUBLIC_APP_URL);

    if (!production || !isLocalhost(normalized)) {
      return normalized;
    }
  }

  const headersList = await headers();
  const host =
    headersList.get("x-forwarded-host") ?? headersList.get("host");
  const proto = headersList.get("x-forwarded-proto") ?? "https";

  if (host) {
    const fromHeaders = normalizeAppUrl(`${proto}://${host}`);

    if (!production || !isLocalhost(fromHeaders)) {
      return fromHeaders;
    }
  }

  if (!production && process.env.URL) {
    return normalizeAppUrl(process.env.URL);
  }

  return "http://localhost:3000";
}

export async function buildAuthCallbackUrl(next = "/iniciativas") {
  const appUrl = await getAppUrl();

  return `${appUrl}/auth/callback?next=${encodeURIComponent(next)}`;
}
