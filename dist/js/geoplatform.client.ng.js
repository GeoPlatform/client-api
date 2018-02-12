"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["angular", "q"], function (jQuery, Q) {
            return root.NGHttpClient = factory(angular, Q);
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.NGHttpClient = factory(require("angular"), require('q'));
    } else {
        GeoPlatform.NGHttpClient = factory(angular, Q);
    }
})(undefined || window, function (angular, Q) {
    var NGHttpClient = function () {
        function NGHttpClient(options) {
            _classCallCheck(this, NGHttpClient);

            if (typeof angular === 'undefined') throw new Error("Angular not defined");

            options = options || {};
            this.setTimeout(options.timeout || 10000);
            if (options.$http) this.$http = options.$http;
        }

        _createClass(NGHttpClient, [{
            key: "setTimeout",
            value: function setTimeout(timeout) {
                this.timeout = timeout;
            }
        }, {
            key: "setAuth",
            value: function setAuth(tokenFn) {
                this.tokenFn = tokenFn;
            }
        }, {
            key: "createRequestOpts",
            value: function createRequestOpts(options) {

                var opts = {
                    method: options.method,
                    url: options.url,
                    timeout: options.timeout || this.timeout
                };

                if (options.json === true) opts.dataType = 'json';

                if (options.params) {
                    opts.params = options.params;
                }

                if (options.data) {
                    opts.data = options.data;
                }

                //copy over user-supplied options
                if (options.options) {
                    for (var o in options.options) {
                        if (options.options.hasOwnProperty(o)) {
                            opts[o] = options.options[o];
                        }
                    }
                }

                return opts;
            }
        }, {
            key: "execute",
            value: function execute(opts) {
                var _this = this;

                var $http = this.$http || angular.injector(['ng']).get('$http');
                return Q.resolve($http).then(function ($http) {

                    if (_this.tokenFn) {
                        var jwt = _this.tokenFn();
                        if (jwt) {
                            opts.headers = {
                                Authorization: 'Bearer ' + jwt
                            };
                            opts.useXDomain = true;
                        }
                    }

                    if (typeof $http === 'undefined') throw new Error("Angular $http not resolved");

                    // console.log(opts);
                    return $http(opts);
                }).then(function (response) {
                    return response.data;
                });
            }
        }]);

        return NGHttpClient;
    }();

    return NGHttpClient;
});