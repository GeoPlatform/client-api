import { resolve, reject } from 'q';
import * as angular from 'angular';
import { injector } from 'angular';
import { GPHttpClient } from '@geoplatform/client';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NGHttpClient extends GPHttpClient {
    /**
     * @param {?=} options
     */
    constructor(options) {
        super(options);
        if (typeof (angular) === 'undefined' || angular === null) {
            throw new Error("AngularJS could not be found globally");
        }
        if (options && options["$http"])
            this.$http = options["$http"];
    }
    /**
     * @param {?} options
     * @return {?}
     */
    createRequestOpts(options) {
        /** @type {?} */
        let opts = {
            method: options["method"],
            url: options["url"],
            timeout: options["timeout"] || this.timeout
        };
        if (options["json"] === true || 'json' === options["responseType"])
            opts["dataType"] = 'json';
        else if ('text' === options["responseType"])
            opts["dataType"] = 'text';
        if (options["params"]) {
            opts["params"] = options["params"];
        }
        if (options["data"]) {
            opts["data"] = options["data"];
        }
        //set authorization token if one was provided
        if (this.token) {
            /** @type {?} */
            let token = this.token();
            if (token) {
                opts["headers"] = opts["headers"] || {};
                opts["headers"].Authorization = 'Bearer ' + token;
                opts["useXDomain"] = true;
            }
        }
        //copy over user-supplied options
        if (options["options"]) {
            for (let o in options["options"]) {
                if (options["options"].hasOwnProperty(o)) {
                    opts[o] = options["options"][o];
                }
            }
        }
        return opts;
    }
    /**
     * @param {?} opts
     * @return {?}
     */
    execute(opts) {
        /** @type {?} */
        let $http = this.$http || injector(['ng']).get('$http');
        return resolve($http)
            .then($http => {
            if (typeof ($http) === 'undefined')
                throw new Error("Angular $http not resolved");
            // console.log(opts);
            return $http(opts);
        })
            .then(response => response.data)
            .catch(response => reject(response.data));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { NGHttpClient };

//# sourceMappingURL=geoplatform-client-angularjs.js.map