import { UserFromRequest } from 'src/common/types';

declare global {
	namespace Express {
		interface Request {
			user?: UserFromRequest;
		}
		interface Session {
			user?: any;
		}
	}
}

declare module 'express-session' {
	interface SessionData {
		user?: any;
	}
}
