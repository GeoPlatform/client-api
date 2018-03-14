"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["angular", "q", 'HttpClientBase'], function (jQuery, Q, HttpClientBase) {
            return root.NGHttpClient = factory(angular, Q, HttpClientBase);
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.NGHttpClient = factory(require("angular"), require('q'), require('./client'));
    } else {
        GeoPlatform.NGHttpClient = factory(angular, Q, HttpClientBase);
    }
})(undefined || window, function (angular, Q, HttpClientBase) {
    var NGHttpClient = function (_HttpClientBase) {
        _inherits(NGHttpClient, _HttpClientBase);

        /**
         * @param {integer} options.timeout
         * @param {string} options.token - the bearer token or a function to retrieve it
         * @param {Object} options.$http - angular $http service instance
         */
        function NGHttpClient(options) {
            _classCallCheck(this, NGHttpClient);

            var _this = _possibleConstructorReturn(this, (NGHttpClient.__proto__ || Object.getPrototypeOf(NGHttpClient)).call(this, options));

            if (typeof angular === 'undefined') throw new Error("Angular not defined");
            if (options.$http) _this.$http = options.$http;
            return _this;
        }

        _createClass(NGHttpClient, [{
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

                //set authorization token if one was provided
                if (this.token) {
                    var token = this.token();
                    if (token) {
                        opts.headers = opts.headers || {};
                        opts.headers.Authorization = 'Bearer ' + token;
                        opts.useXDomain = true;
                    }
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
                var $http = this.$http || angular.injector(['ng']).get('$http');
                return Q.resolve($http).then(function ($http) {
                    if (typeof $http === 'undefined') throw new Error("Angular $http not resolved");

                    // console.log(opts);
                    return $http(opts);
                }).then(function (response) {
                    return response.data;
                }).catch(function (response) {
                    return Q.reject(response.data);
                });
            }
        }]);

        return NGHttpClient;
    }(HttpClientBase);

    return NGHttpClient;
});