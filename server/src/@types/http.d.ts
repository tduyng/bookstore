declare namespace Express {
	interface Request {
		session?: {
			authToken?: {
				accessToken: string;
				refreshToken: string;
			};
			cart?: string; // stringify of array
			destroy: () => void;
			res: Response;
		};
	}
	// interface Session {
	// 	authToken?: {
	// 		accessToken: string;
	// 		refreshToken: string;
	// 	};
	// }
}
