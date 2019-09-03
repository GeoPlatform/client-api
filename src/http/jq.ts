
import * as jQuery from "jquery";
import GPError from '../shared/error';
import GPHttpClient from './client';


class JQueryHttpClient extends GPHttpClient {

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
            opts.dataType = 'json';

        if(options.params) {
            opts.data = options.params;
            opts.processData = true;
        }

        if(options.data) {
            opts.data = options.data;
            opts.processData = options.processData || false;
            opts.contentType = 'application/json';
        }

        //set headers requested by user config
        opts.headers = {};
        if(options.headers) {
            Object.assign(opts.headers, options.headers);
        }

        //set authorization header if one was provided
        if(this.token) {
            let token = this.token();
            if(token) {
                opts.headers.Authorization = 'Bearer ' + token;
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

        if(typeof(jQuery) === 'undefined') {
            throw new Error("jQuery is not available. Ensure it is included in your application");
        }
        return new Promise<any>( (resolve, reject) => {

            opts.success = function(data : any) { resolve(data); };

            opts.error = function(
                xhr : any,
                // @ts-ignore
                status : any,
                message : string) {
                let err : GPError = new GPError(message);
                if(xhr.responseText) {
                    try {
                        let json = JSON.parse(xhr.responseText);
                        if(json) {
                            err = new GPError(json.message);
                            err.error = json.error; //label
                            err.status = json.status; //code
                        }
                    } catch(e) {
                        console.log("JQHttpClient.execute() - Failed to parse JSON from error message: " + e.message);
                    }
                }
                reject(err);
            };
            jQuery.ajax(opts);
        });
    }

}

export default JQueryHttpClient;
