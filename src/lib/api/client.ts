import { env } from '../env';

/**
 * The single HTTP client for the admin.
 *
 * The admin has no server of its own, deliberately: every mutation goes through the API so
 * business logic cannot fragment across two backends. See
 * shockmegenie-docs/docs/adr/0003-admin-as-vite-spa.md.
 *
 * Token refresh is handled here, once. Do not reimplement 401 handling in a component or a
 * query hook.
 */

export interface ApiError {
  code: string;
  message: string | string[];
}

interface ApiEnvelope<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

export class ApiRequestError extends Error {
  // Declared as fields rather than constructor parameter properties: the Vite template
  // enables erasableSyntaxOnly, which rejects the shorthand.
  readonly status: number;
  readonly code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = 'ApiRequestError';
    this.status = status;
    this.code = code;
  }
}

let accessToken: string | null = null;
let refreshInFlight: Promise<boolean> | null = null;

export function setAccessToken(token: string | null): void {
  accessToken = token;
}

/**
 * Refreshes the access token at most once concurrently. Without the shared promise, a page
 * issuing six parallel requests on an expired token fires six refreshes and five of them
 * race to overwrite the result.
 */
async function refreshAccessToken(): Promise<boolean> {
  refreshInFlight ??= (async () => {
    try {
      const response = await fetch(`${env.VITE_API_URL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        accessToken = null;
        return false;
      }

      const body = (await response.json()) as ApiEnvelope<{ accessToken: string }>;
      accessToken = body.data?.accessToken ?? null;
      return accessToken !== null;
    } finally {
      refreshInFlight = null;
    }
  })();

  return refreshInFlight;
}

export async function apiFetch<T>(
  path: string,
  init: RequestInit = {},
  isRetry = false,
): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set('Accept', 'application/json');

  if (init.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  const response = await fetch(`${env.VITE_API_URL}${path}`, {
    ...init,
    headers,
    credentials: 'include',
  });

  if (response.status === 401 && !isRetry) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      return apiFetch<T>(path, init, true);
    }
  }

  const body = (await response.json().catch(() => null)) as ApiEnvelope<T> | null;

  if (!response.ok || !body?.success) {
    const error = body?.error;
    throw new ApiRequestError(
      response.status,
      error?.code ?? 'UNKNOWN',
      Array.isArray(error?.message)
        ? error.message.join(', ')
        : (error?.message ?? response.statusText),
    );
  }

  return body.data as T;
}
