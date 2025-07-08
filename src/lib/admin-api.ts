const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'

export async function authenticatedFetch(url: string, options: RequestInit = {}) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${ADMIN_PASSWORD}`,
    ...options.headers,
  }

  return fetch(url, {
    ...options,
    headers,
  })
}
