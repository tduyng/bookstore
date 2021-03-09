import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { SERVER_LINKS } from 'src/app/constants/links.constant';

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
  const fetchResponse = await fetch(url, {
    mode: 'cors',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const response = checkStatus(fetchResponse);
  return parseJSON(response);
}

export interface IAuthToken {
  accessToken: string;
  refreshToken: string;
}
export async function requestWithAuth(url: string, options?: RequestInit) {
  const authCookies = Cookies.get('SESSION_AUTH') || '';
  const authToken = JSON.parse(authCookies) as IAuthToken;

  if (!authToken) return null;
  const accessToken = jwt_decode(authToken.accessToken);
  const refreshToken = jwt_decode(authToken.refreshToken);
  if (!accessToken && !refreshToken) return null;
  if (!accessToken && refreshToken) {
    // Call refresh token
    await request(SERVER_LINKS.refreshToken, { method: 'POST' });
  }
  return await request(url, options);
}
