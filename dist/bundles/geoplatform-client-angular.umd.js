/*
This software has been approved for release by the U.S. Department of the Interior. Although the software has been subjected to rigorous review, the DOI reserves the right to update the software as needed pursuant to further analysis and review. No warranty, expressed or implied, is made by the DOI or the U.S. Government as to the functionality of the software and related material nor shall the fact of release constitute any such warranty. Furthermore, the software is released on condition that neither the DOI nor the U.S. Government shall be held liable for any damages resulting from its authorized or unauthorized use.
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common/http'), require('rxjs/add/operator/map'), require('@geoplatform/client')) :
    typeof define === 'function' && define.amd ? define('@geoplatform/client/angular', ['exports', '@angular/common/http', 'rxjs/add/operator/map', '@geoplatform/client'], factory) :
    (factory((global.geoplatform = global.geoplatform || {}, global.geoplatform.client = global.geoplatform.client || {}, global.geoplatform.client.angular = {}),global.ng.common.http,global.rxjs['add/operator/map'],global.geoplatform.client));
}(this, (function (exports,http,map,client) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NG2HttpClient = /** @class */ (function (_super) {
        __extends(NG2HttpClient, _super);
        function NG2HttpClient(http$$1, options) {
            var _this = _super.call(this, options) || this;
            _this.http = http$$1;
            return _this;
        }
        /**
         * @param {?} zone
         * @return {?}
         */
        NG2HttpClient.prototype.setZone = /**
         * @param {?} zone
         * @return {?}
         */
            function (zone) {
                this.zone = zone;
            };
        /**
         *
         */
        /**
         *
         * @param {?} options
         * @return {?}
         */
        NG2HttpClient.prototype.createRequestOpts = /**
         *
         * @param {?} options
         * @return {?}
         */
            function (options) {
                /** @type {?} */
                var opts = {};
                if (options["options"] && options["options"].responseType) {
                    opts.responseType = options["options"].responseType;
                }
                else
                    opts.responseType = 'json'; //default response type
                if (options["params"]) {
                    opts.params = new http.HttpParams({ fromObject: options["params"] });
                }
                if (options["data"]) {
                    opts.body = options["data"];
                }
                opts.headers = new http.HttpHeaders();
                /** @type {?} */
                var token = this.getToken();
                if (token) {
                    opts.headers.set('Authorization', 'Bearer ' + token);
                }
                if (opts.body) {
                    return new http.HttpRequest(options["method"], options["url"], opts.body, opts);
                }
                else {
                    return new http.HttpRequest(options["method"], options["url"], opts);
                }
            };
        /**
         * @param request - Angular HttpRequest object
         * @return resolving the response or an error
         */
        /**
         * @param {?} request - Angular HttpRequest object
         * @return {?} resolving the response or an error
         */
        NG2HttpClient.prototype.execute = /**
         * @param {?} request - Angular HttpRequest object
         * @return {?} resolving the response or an error
         */
            function (request) {
                var _this = this;
                /** @type {?} */
                var value = null;
                return new Promise(function (resolve, reject) {
                    _this.http.request(request)
                        .map(function (event) {
                        if (event instanceof http.HttpResponse) {
                            return ( /** @type {?} */(event)).body;
                        }
                        return {};
                    })
                        .subscribe(function (v) { value = v; }, function (err) { reject(err); }, function () {
                        if (_this.zone) {
                            _this.zone.run(function () {
                                resolve(value);
                            });
                        }
                        else {
                            resolve(value);
                        }
                    });
                });
                /*
                        .toPromise()
                        .then( (result) => Promise.resolve(result))
                        .catch( (err : any) => {
                            // console.log("NG2HttpClient.catch() - " + JSON.stringify(err));
                            if (err instanceof HttpErrorResponse) {
                                let msg = "An error occurred communicating with the GeoPlatform API";
                                if(err.error && err.error.error && err.error.error.message) {
                                    msg = err.error.error.message;
                                } else if (err.error && err.error.message) {
                                    msg = err.error.message;
                                } else if(err.message) {
                                    msg = err.message;
                                }
                                throw new Error(msg);
                            }
                            return {};
                        });
                        */
            };
        return NG2HttpClient;
    }(client.GPHttpClient));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.NG2HttpClient = NG2HttpClient;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=geoplatform-client-angular.umd.js.map