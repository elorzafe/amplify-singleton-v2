import { Credentials, HTTP_METHODS, ResourceConfig, SessionProvider } from "./types";

export class AmplifyClass {
    readonly config: ResourceConfig;
    private sessionProvider: SessionProvider | undefined;

    constructor({ config }: { config: ResourceConfig }) {
        this.config = config;
    }
    setSessionProvider(sessionProvider: SessionProvider) {
        this.sessionProvider = sessionProvider;
    }

    async getSession(): Promise<Credentials> {
        if (this.sessionProvider) {
            return await this.sessionProvider();
        }
        throw Error('No session provider')
    }
}

export function injectSessionProvider(amplify: AmplifyClass) {
    amplify.setSessionProvider(async function (): Promise<Credentials> {
        const authConfig = amplify.config.Auth;

        console.log({ authConfig });

        return {
            accessKey: 'accessKey',
            secretKey: 'secretKey',
            sessionToken: 'token'
        }
    })
}

export function httpRequest(amplify: AmplifyClass, method: HTTP_METHODS) {
    return async function ({
        apiName,
        path,
        options,
    }: { path: string, apiName: string, options?: { headers?: Record<string, string>, authMode?: 'AWS_IAM' | 'NONE' } }) {
        const apiConfig = amplify.config.API;
        if (options?.authMode === 'AWS_IAM') {
            const creds = await amplify.getSession();
            console.log({ apiConfig, apiName, path, options, creds });

            return { result: 'SUCCESS'};
        } else {
            console.log({ apiConfig, apiName, path, options });
            return { result: 'SUCCESS'};
        }
    }
}