import { AmplifyClass, httpRequest, injectSessionProvider } from "../src"

describe('api tests', () => {
    test('invoke api get without auth mode', async () => {
        const amplify = new AmplifyClass({
            config: {
                API: {
                    myApi: {
                        endpoint: "https://www.google.com"
                    }
                }
            }
        });

        const httpGet = httpRequest(amplify, 'GET');

        await httpGet({apiName: 'myApi', path: '/items'});
    })

    test('api using AWS_IAM', async () => {
        const amplify = new AmplifyClass({
            config: {
                Auth: {
                    userPoolId: 'userpool',
                    userPoolWebClientId: 'webclientid'
                },
                API: {
                    myApi: {
                        endpoint: "https://www.google.com"
                    }
                }
            }
        });
        const httpGet = httpRequest(amplify, 'GET');

        injectSessionProvider(amplify);

        const result = await httpGet( {
            apiName: 'myApi',
            path: '/items',
            options: {
                authMode: 'AWS_IAM'
            }
        })

        expect(result).toEqual({ result: 'SUCCESS'});
    })

    test('api using AWS_IAM with no session provider', async () => {
        expect.assertions(1);
        const amplify = new AmplifyClass({
            config: {
                Auth: {
                    userPoolId: 'userpool',
                    userPoolWebClientId: 'webclientid'
                },
                API: {
                    myApi: {
                        endpoint: "https://www.google.com"
                    }
                }
            }
        });
        const httpGet = httpRequest(amplify, 'GET');

        try {
            const result = await httpGet( {
                apiName: 'myApi',
                path: '/items',
                options: {
                    authMode: 'AWS_IAM'
                }
            })
        } catch (err) {
            expect(err).toEqual(Error('No session provider'))
        }
    })
})