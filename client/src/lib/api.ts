export const API_URL = import.meta.env.VITE_API_URL;

export async function api(path: string, init?: RequestInit) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    ...init,
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}
