import dotenv from 'dotenv';

export const envConfig = (): EnvConfig => {
	const mode = process.env.NODE_ENV;
	switch (mode) {
		case 'development':
			dotenv.config();
			break;
		case 'test':
			dotenv.config({ path: '.env.test' });
			break;
		case 'production':
			dotenv.config({ path: '.env.production' });
			break;
		default:
			break;
	}

	const port = parseInt(process.env.PORT) || 5025;

	return {
		mode,
		port,
		serverUrl: process.env.SERVER_URL || `http://localhost:5025`,
		clientUrl: process.env.CLIENT_URL || `http://localhost:3000`,
		mongodbUri: process.env.MONGODB_URI,
		jwt: {
			jwtSecret: process.env.JWT_SECRET,
			jwtExpiredTime: parseInt(process.env.JWT_EXPIRED_TIME),
			jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
			jwtRefreshExpiredTime: parseInt(process.env.JWT_REFRESH_EXPIRED_TIME),
		},
		email: {
			emailSender: process.env.EMAIL_AUTH_USER,
		},
	};
};

export interface EnvConfig {
	mode: string;
	port: number;
	serverUrl: string;
	clientUrl: string;
	mongodbUri: string;
	jwt: {
		jwtSecret: string;
		jwtExpiredTime: number;
		jwtRefreshSecret: string;
		jwtRefreshExpiredTime: number;
	};
	email: {
		emailSender: string;
	};
}
