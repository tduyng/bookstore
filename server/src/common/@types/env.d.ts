declare namespace NodeJS {
	interface ProcessEnv {
		readonly NODE_ENV: 'development' | 'production' | 'test';
		readonly PORT: string;
		readonly SERVER_URL: string;
		readonly CLIENT_URL: string;
		readonly MONGODB_URI: string;
	}
}
