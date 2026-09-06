import { useEffect, useState } from 'react';
import { env } from './lib/env';

interface Readiness {
  healthy: boolean;
  checks: Record<string, { status: string; latencyMs?: number }>;
}

/**
 * Placeholder shell. It exists to prove the admin can reach the API through the configured
 * base URL, which is the one thing worth verifying before any real screen is built.
 */
export default function App() {
  const [readiness, setReadiness] = useState<Readiness | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${env.VITE_API_URL}/health/ready`)
      .then((response) => response.json())
      .then((body) => setReadiness(body.data ?? body))
      .catch((cause: Error) => setError(cause.message));
  }, []);

  return (
    <main className="mx-auto flex min-h-full max-w-2xl flex-col gap-6 p-10">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">
          ShockMeGenie Admin
        </h1>
        <p className="text-[color:var(--color-content-muted)]">
          Staff dashboard. Environment: {env.VITE_APP_ENV}
        </p>
      </header>

      <section className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface-muted)] p-5">
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-[color:var(--color-content-muted)]">
          API connectivity
        </h2>

        {error && <p className="text-[color:var(--color-danger)]">{error}</p>}
        {!error && !readiness && <p>Checking…</p>}

        {readiness && (
          <ul className="space-y-1">
            {Object.entries(readiness.checks).map(([name, check]) => (
              <li key={name} className="flex justify-between gap-4">
                <span>{name}</span>
                <span
                  className={
                    check.status === 'up'
                      ? 'text-[color:var(--color-success)]'
                      : 'text-[color:var(--color-danger)]'
                  }
                >
                  {check.status}
                  {check.latencyMs !== undefined && ` (${check.latencyMs}ms)`}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
