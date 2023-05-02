import { AmplifyClass, injectSessionProvider } from "../src"

describe('Session tests', () => {
    test('session is returned', async () => {
        const amplify = new AmplifyClass({ config: {
            Auth: {
                userPoolId: 'userpool',
                userPoolWebClientId: 'webclientid'
            }
        }});
        
        injectSessionProvider(amplify);

        const creds = await amplify.getSession();

        expect(creds).toEqual({
            accessKey: 'accessKey',
            secretKey: 'secretKey',
            sessionToken: 'token'
        });
    })
})