// Fail fast on missing required config instead of letting Prisma/JWT
// throw confusing errors deep in a request. Deliberately no validation
// library (Joi/zod) — the check is a handful of "is this set" lines,
// a dependency would be YAGNI here.
const REQUIRED_VARS = ['DATABASE_URL', 'JWT_SECRET'] as const;

export function validateEnv(config: Record<string, unknown>) {
  const missing = REQUIRED_VARS.filter((key) => !config[key]);
  if (missing.length) {
    throw new Error(
      `Missing required environment variable(s): ${missing.join(', ')}. ` +
        `Copy .env.example to apps/api/.env and fill them in.`,
    );
  }
  return config;
}
