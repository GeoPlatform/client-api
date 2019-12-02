import NodeHttpClient from '../../http/node';
declare const ServiceProxy: {
    /**
     * @param {Router} router - ExpressJS router instance
     * @param {array[object]} routes - list of routes to map to the router
     * @param {object} options - additional configuration needed
     */
    bindRoutes: (router: any, routes: any[], options?: any) => void;
    /**
     *
     */
    bindAdditionalRoutes: (router: any, options?: any) => void;
    /**
    * @param {HttpRequest} req - incoming http request being proxied
    * @param {boolean} needsAuth - flag indicating if the request must provide an authentication token
    * @param {object} options - additional configuration options
    * @return {HttpClient} client to use to make requests to GeoPlatform API endpoint
    */
    getClient: (req: any, needsAuth: boolean, options?: any) => NodeHttpClient;
    /**
     * @param {HttpRequest} req - incoming http request being proxied
     * @param {boolean} needsAuth - flag indicating if request requires authorization token
     * @param {object} options - additional configuration options
     */
    getService: (req: any, needsAuth: boolean, options?: any) => any;
    getAuthCookie: (req: any) => string;
    parseCookies: (str: string) => {};
};
export default ServiceProxy;
