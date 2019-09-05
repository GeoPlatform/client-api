
import * as angular from "angular";
import { GPHttpClient } from "@geoplatform/client";



class NGHttpClient extends GPHttpClient {

    private $http : any;
    private $q : any;

    /**
     * @param options.timeout
     * @param options.token - the bearer token or a function to retrieve it
     * @param options.$http - angular $http service instance
     */
    constructor(options ?: { [key:string] : any }) {
        super(options);
        if(typeof(angular) === 'undefined' || angular === null) {
            throw new Error("AngularJS could not be found globally");
        }
        if(options && options.$http)
            this.$http = options.$http;
        if(options && options.$q)
            this.$q = options.$q;
    }

    createRequestOpts(options : { [key:string] : any }) : any {

        let opts : { [key:string] : any } = {
            method: options.method,
            url: options.url,
            timeout: options.timeout || this.timeout
        };

        if(options.json === true || 'json' === options.responseType)
            opts.dataType = 'json';
        else if('text' === options.responseType)
            opts.dataType = 'text';

        if(options.params) {
            opts.params = options.params;
        }

        if(options.data) {
            opts.data = options.data;
        }

        //set headers requested by user config
        opts.headers = {};
        if(options.headers) {
            Object.assign(opts.headers, options.headers);
        }

        //set authorization token if one was provided
        if(this.token) {
            let token = this.token();
            if(token) {
                opts.headers.Authorization = 'Bearer ' + token;
                opts.useXDomain = true;
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

        let $injector = angular.injector(['ng']);
        let $q = this.$q || $injector.get('$q');
        let $http = this.$http || $injector.get('$http');

        let deferred = $q.defer();
        $http(opts)
        .then( response => {
            deferred.resolve(response.data);
        })
        .catch(response => {    //http response
            let err = null, arg = response.data;
            if(typeof(arg) === 'object' && arg.message) {
                //wrapping json error object
                err = new Error(arg.message);
                err.status = arg.statusCode || 500;
            } else if(typeof(arg) === 'string') {
                //just containing string message
                err = new Error(arg);
            } else {
                err = new Error("An error occurred issuing the request");
            }
            deferred.reject(err);
        });
        return deferred.promise.then((data)=>data) as Promise<any>;

        // return Promise.resolve( $http )
        // .then($http => {
        //     if(typeof($http) === 'undefined')
        //         throw new Error("Angular $http not resolved");
        //
        //     // console.log(opts);
        //     return $http(opts);
        // })
        // .then(response=> () => {
        //     return $timeout(()=>{return response.data;});
        // })
        // .catch(response=> { throw new Error(response.data); });
    }

}

export default NGHttpClient;
