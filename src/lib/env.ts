import { z } from 'zod';

/**
 * Admin environment, validated at module load.
 *
 * VITE_* values are baked into the bundle at build time, so a wrong value ships in the
 * image and cannot be fixed by restarting the container. Validating here turns that into
 * an immediate, readable failure instead of a confusing runtime error.
 *
 * The empty string is tolerated because Docker passes an unset build argument through as
 * "" rather than undefined.
 */
const envSchema = z.object({
  VITE_API_URL: z
    .string()
    .url()
    .default('http://localhost:6002/api/v1'),
  VITE_APP_ENV: z
    .enum(['development', 'staging', 'production'])
    .default('development'),
});

const parsed = envSchema.safeParse({
  VITE_API_URL: import.meta.env.VITE_API_URL || undefined,
  VITE_APP_ENV: import.meta.env.VITE_APP_ENV || undefined,
});

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((issue) => `  ${issue.path.join('.')}: ${issue.message}`)
    .join('\n');
  throw new Error(`Invalid admin environment configuration:\n${issues}`);
}

export const env = parsed.data;
