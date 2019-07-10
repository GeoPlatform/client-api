
import Config from '../shared/config';
import GPHttpClient from '../http/client';

class UtilsService {

    private baseUrl : string;
    private client : GPHttpClient;
    private timeout : number = 30000;
    private logger : any;
    private httpMethods : string[] = ["GET", "POST", "PUT", "DELETE", "PATCH"];


    constructor(url : string, httpClient : GPHttpClient) {
        this.client = httpClient;
        this.baseUrl = url;
        this.timeout = Config.timeout || 30000;
    }

    setUrl(baseUrl : string) {
        this.baseUrl = baseUrl;
    }

    /**
     * @param logger - log service
     */
    setLogger(logger : any) {
        this.logger = logger;
    }

    /**
     * @param e - error to log (if logger specified)
     */
    logError(e : string|Error) {
        if(this.logger && this.logger.error) {
            this.logger.error(e);
        }
    }

    /**
     * @param msg - message to log as debug
     */
    logDebug(msg : string) {
        if(this.logger && this.logger.debug) {
            this.logger.debug(msg);
        }
    }


    /**
     * @param property - optional capa property to specifically request
     * @param query - optional query parameters to include with request
     * @param options - optional config to send with http request
     * @return Promise resolving capabilities object
     */
    capabilities (property : string|null, query : any, options ?: any) : Promise<any> {

        let url = this.baseUrl + '/api/capabilities';
        if(property)
            url += '/' + property;

        return Promise.resolve( url )
        .then( (url) => {
            let opts = this.buildRequest({
                method:"GET", url:url, params:query||{}, options:options
            });
            return this.execute(opts);
        })
        .catch(e => {
            let err = new Error(`Error getting capabilities: ${e.message}`);
            Object.assign(err, e);
            this.logError('UtilsService.capabilities() - ' + err.message);
            throw err;
        });
    }

    /**
     * @param file
     * @param format
     * @param options
     * @return Promise
     */
    parseFile (file : any, format : string, options ?: any) : Promise<any> {

        var url = this.baseUrl + '/api/utils/parse';

        return Promise.resolve( url )
        .then( url => {

            let opts = this.buildRequest({
                method:"POST",  url:url,
                data: { format: format },
                file: file,
                formData: true,   //NodeJS (RequestJS)
                options: options
            });
            return this.execute(opts);
        })
        .then( response => response )
        .catch(e => {
            let err = new Error(`Error parsing file: ${e.message}`);
            Object.assign(err, e);
            this.logError('UtilsService.parseFile() - ' + err.message);
            throw err;
        });
    }


    /**
     * Geolocate the specified argument to a set of candidate locations.
     * @param value - text string to geolocate (name or lat,lng)
     * @param options - optional config to send with http request
     * @return Promise resolving an array of geocoded results
     */
    locate(value : any, options ?: any) : Promise<any> {

        var url = this.baseUrl + '/api/utils/gazetteer';
        return Promise.resolve(url)
        .then( url => {
            let opts = this.buildRequest({
                method: 'GET',
                url: url,
                params: { location: value },
                options: options
            });
            return this.execute(opts);
        })
        .then(response => response)
        .catch(e => {
            let err = new Error(`Error resolving location: ${e.message}`);
            Object.assign(err, e);
            this.logError('UtilsService.locate() - ' + err.message);
            throw err;
        });
    }






    /* ----------------------------------------------------------- */

    /**
     * @param method - one of "GET", "POST", "PUT", "DELETE", "PATCH"
     * @param url - destination of xhr request
     * @param params - object to be sent with request as query parameters
     * @param data - object to be sent with request as body
     * @param options - optional object defining request options
     * @return request options for xhr
     */
    buildRequest (options : {[key:string]:any}) : {[key:string]:any} {

        if(this.httpMethods.indexOf(options.method)<0)
            throw new Error(`Unsupported HTTP method ${options.method}`);

        if(!options.url)
            throw new Error(`Must specify a URL for HTTP requests`);

        options.timeout = this.timeout || Config.timeout || 30000;

        return this.createRequestOpts(options);
    }

    createRequestOpts(options : {[key:string]:any}) : {[key:string]:any} {
        return this.client.createRequestOpts(options);
    }

    execute(opts : {[key:string]:any}) : Promise<any> {
        return this.client.execute(opts)
        .catch(( e : Error ) => {
            if(e === null || typeof(e) === 'undefined') {
                e = new Error("UtilsService.execute() - Request failed but didn't return an " +
                "error. This is most likely because the request timed out");
            }
            return Promise.reject(e);
        });
    }

}

export default UtilsService;
