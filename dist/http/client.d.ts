declare class GPHttpClient {
    protected token: any;
    protected cookie: any;
    protected timeout: number;
    protected authCookieName: string;
    /**
     * @param options.timeout
     * @param options.token - the bearer token or a function to retrieve it
     */
    constructor(options?: {
        [key: string]: any;
    });
    setTimeout(timeout: number): void;
    /**
     * @param arg - specify the bearer token or a function to retrieve it
     */
    setAuthToken(arg: string | Function): void;
    getToken(): string;
    setCookie(cookie: any): void;
    getCookie(): any;
    createRequestOpts(options: {
        [key: string]: any;
    }): any;
    execute(opts: any): Promise<any>;
}
export default GPHttpClient;
