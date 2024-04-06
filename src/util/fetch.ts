const baseUrl = import.meta.env.VITE_API_BASE_URL

export async function apiFetch<T>(path: string, request?: RequestInit): Promise<T | undefined> {
  const response = await fetch(baseUrl + path, request)

  if (!response.ok) {
    const message = await parseError(response)
    throw new Error(message)
  }

  if (isJsonContent(response)) {
    return await response.json()
  }
}

async function parseError(response: Response): Promise<string> {
  const defaultMessage = 'An error occurred'
  if (isJsonContent(response)) {
    const json = await response.json()
    return json.message || defaultMessage
  }
  return defaultMessage
}

function isJsonContent(response: Response): boolean {
  const contentType = response.headers.get('content-type')
  return !!contentType && contentType.indexOf('application/json') !== -1
}
