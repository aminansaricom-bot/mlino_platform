const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem('mlino_token');
}

export function setToken(token: string) {
  window.localStorage.setItem('mlino_token', token);
}

export function clearToken() {
  window.localStorage.removeItem('mlino_token');
}

export async function api<T = unknown>(
  path: string,
  options: { method?: string; body?: unknown } = {},
): Promise<T> {
  const token = getToken();
  const res = await fetch(`${API_URL}${path}`, {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const data: unknown = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message =
      data && typeof data === 'object' && 'message' in data && typeof (data as { message: unknown }).message === 'string'
        ? (data as { message: string }).message
        : undefined;
    throw new Error(message || `Request failed (${res.status})`);
  }
  return data as T;
}
