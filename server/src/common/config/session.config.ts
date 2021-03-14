import session from 'express-session';
import { EnvConfig, envConfig } from './env.config';
export const SESSION_AUTH_KEY = 'SESSION_AUTH';

const tryToFixCookieOnHerokuProduction = (env: EnvConfig, __prod__: boolean) => ({
	httpOnly: true,
	secure: false,
	maxAge: env.jwt.jwtRefreshExpiredTime, // 30 days --> need >= max of alive time of refresh token
	sameSite: true, // csrf
	domain: __prod__ ? '.bookzeta.netlify.app' : undefined,
});

export function sessionConfig(): session.SessionOptions {
	const env = envConfig();
	const __prod__ = env.mode === 'production';
	// In-memory storage
	return {
		name: SESSION_AUTH_KEY,
		secret: env.sessionSecret,
		resave: false,
		saveUninitialized: false,
		cookie: __prod__ ? undefined : tryToFixCookieOnHerokuProduction(env, __prod__),
	};
}
