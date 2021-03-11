import { SERVER_LINKS } from 'src/app/constants/links.constant';

export class ResponseError extends Error {
  public response: Response;
  public status: number;
  constructor(response: Response) {
    super(response.statusText);
    this.response = response;
    this.status = response.status;
  }
}

export async function request(url: string, options?: RequestInit) {
  const moreOptions: RequestInit = {
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  };
  const res = await fetch(url, moreOptions);
  return res.json();
}

export interface IAuthToken {
  accessToken: string;
  refreshToken: string;
}
export async function requestWithAuth(url: string, options?: RequestInit) {
  const user = await request(`${SERVER_LINKS.authMe}`);
  if (!user) {
    await request(SERVER_LINKS.authRefresh, { method: 'POST' });
  }
  return await request(url, options);
}
