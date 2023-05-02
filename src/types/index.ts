export type ResourceConfig = {
	API?: {};
	Analytics?: {};
	Auth?: {
		userPoolId?: string;
		identityPoolId?: string;
		userPoolWebClientId?: string;
	};
	DataStore?: {};
	Interactions?: {};
	Notifications?: {};
	Predictions?: {};
	Storage?: {};
};

export type HTTP_METHODS = 'GET' | 'PUT' | 'POST' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

export type Credentials = {
    accessKey: string,
    secretKey: string,
    sessionToken?: string,
}
export type SessionProvider = () => Promise<Credentials>