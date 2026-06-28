const fs = require("fs");

const REQUIRED_KEYS = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
];

const KEYS = [
  ...REQUIRED_KEYS,
  "SUPABASE_SERVICE_ROLE_KEY",
  "RESEND_API_KEY",
  "EMAIL_FROM",
  "APP_URL",
  "NEXT_PUBLIC_APP_URL",
];

const lines = [];
const missingRequired = [];

for (const key of KEYS) {
  const value = process.env[key];

  if (value) {
    lines.push(`${key}=${value}`);
  } else if (REQUIRED_KEYS.includes(key)) {
    missingRequired.push(key);
  }
}

if (missingRequired.length > 0) {
  console.error(
    "ERROR: Missing required Amplify environment variables:",
    missingRequired.join(", "),
  );
  console.error(
    "Add them in Amplify → Hosting → Environment variables, then redeploy.",
  );
  process.exit(1);
}

if (lines.length === 0) {
  console.warn(
    "WARNING: No environment variables were written to .env.production.",
  );
  console.warn(
    "Add them in Amplify → Hosting → Environment variables before building.",
  );
} else {
  fs.writeFileSync(".env.production", `${lines.join("\n")}\n`);
  console.log(
    "Wrote .env.production:",
    lines.map((line) => line.split("=")[0]).join(", "),
  );
}
