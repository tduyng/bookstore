export class ResponseError extends Error {
  public response: Response;
  constructor(response: Response) {
    super(response.statusText);
    this.response = response;
  }
}

function parseJSON(res: Response) {
  if (res.status === 204 || res.status === 205) {
    return null;
  }
  return res.json();
}

function checkStatus(res: Response) {
  if (res.status >= 200 && res.status < 300) {
    return res;
  }
  const error = new ResponseError(res);
  error.response = res;
  throw error;
}

export async function request(url: string, options?: RequestInit) {
  let fetchResponse: Response;
  if (!options) {
    fetchResponse = await fetch(url);
  } else {
    fetchResponse = await fetch(url, {
      mode: 'cors',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
  }
  const response = checkStatus(fetchResponse);
  return parseJSON(response);
}
