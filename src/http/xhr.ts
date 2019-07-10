
import axios from 'axios';
import GPError from '../shared/error';
import GPHttpClient from './client';


class XHRHttpClient extends GPHttpClient {

    /**
     * @param options.timeout
     * @param options.token - the bearer token or a function to retrieve it
     */
    constructor(options ?: { [key:string] : any }) {
        super(options);
    }


    createRequestOpts(options : { [key:string] : any }) : any {

        let opts : { [key:string] : any } = {
            method: options.method,
            url: options.url,
            timeout: options.timeout || this.timeout
        };

        if(options.json === true)
            opts.responseType = 'json';

        if(options.params) {
            opts.params = options.params;
        }

        if(options.data) {
            opts.data = options.data;
            opts.contentType = 'application/json';
        }

        //set authorization header if one was provided
        if(this.token) {
            let token = this.token();
            if(token) {
                opts.headers = opts.headers || {};
                opts.headers.Authorization = 'Bearer ' + token;
                opts.withCredentials = true;
            }
        }

        //copy over user-supplied options
        if(options.options) {
            for(let o in options.options) {
                if(options.options.hasOwnProperty(o)) {
                    opts[o] = options.options[o];
                }
            }
        }

        return opts;
    }


    execute(opts : any) : Promise<any> {

        if(typeof(axios) === 'undefined') {
            throw new Error("Axios not found, check that you have included " +
                "it as a dependency of the application or use a different " +
                "HttpClient implementation")
        }

        let promise = axios(opts)
        .then( response => { return response.data; })
        .catch( error => {
            let err : GPError = new GPError(error.message);
            if (error.response) {
                err = new GPError(error.response.data);
            }
            throw err;
        });
        return promise;
    }

}

export default XHRHttpClient;
