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
        define(["Q", "angular", "GeoPlatform", "ItemService"], function (Q, angular, GeoPlatform, ItemService) {
            return root.NGItemService = factory(Q, angular, GeoPlatform, ItemService);
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.NGItemService = factory(require('Q'), require('angular'), require('GeoPlatform'), require('ItemService'));
    } else {
        GeoPlatform.NGItemService = factory(Q, angular, GeoPlatform, GeoPlatform.ItemService);
    }
})(undefined || window, function (Q, angular, GeoPlatform, ItemService) {

    var METHODS = ["GET", "POST", "PUT", "DELETE", "PATCH"];

    /**
     * NGItemService
     * service for working with the GeoPlatform API to
     * retrieve and manipulate items.
     *
     * Ex Searching Items
     *      let params = { q: 'test' };
     *      itemService.search(params).then(response=>{
     *          console.log(response.results.length + " of " + response.totalResults);
     *      }).catch(e=>{...});
     *
     * Ex Fetch Item:
     *      itemService.get(itemId).then(item=>{...}).catch(e=>{...});
     *
     * Ex Saving Item:
     *      itemService.save(item).then(item=>{...}).catch(e=>{...});
     *
     * Ex Deleting Item:
     *      itemService.remove(itemId).then(()=>{...}).catch(e=>{...});
     *
     * Ex Patching Item:
     *      itemService.patch(itemId,patch).then(item=>{...}).catch(e=>{...});
     *
     *
     *
     * Example of adding custom request options:
     *
     *      let options = {
     *          headers: { 'X-My-Header': 'myHeaderValue' },
     *          withCredentials: true
     *      };
     *      itemService.get(itemId, options).then(item=> {...}).catch(e=>{...});
     *
     */

    var NGItemService = function (_ItemService) {
        _inherits(NGItemService, _ItemService);

        function NGItemService() {
            _classCallCheck(this, NGItemService);

            var _this = _possibleConstructorReturn(this, (NGItemService.__proto__ || Object.getPrototypeOf(NGItemService)).call(this, GeoPlatform.ualUrl));

            if (typeof angular === 'undefined') throw new Error("Angular not defined");
            return _this;
        }

        /**
         * @param {string} id - identifier of item to fetch
         * @param {Object} options - optional set of request options to apply to xhr request
         * @return {Promise} resolving Item object or an error
         */


        _createClass(NGItemService, [{
            key: "get",
            value: function get(id, options) {
                var _this2 = this;

                return Q.resolve(angular.injector(['ng']).get('$http')).then(function ($http) {
                    if (typeof $http === 'undefined') throw new Error("Angular $http not resolved");

                    var opts = _this2.buildRequest('GET', _this2.baseUrl + '/' + id, null, options);
                    return $http(opts).then(function (response) {
                        return response.data;
                    });
                }).catch(function (e) {
                    var m = "NGItemService.get() - Error fetching item: " + e.message;
                    var err = new Error(m);
                    return Q.reject(err);
                });
            }

            /**
             * @param {Object} itemObj - item to create or update
             * @param {Object} options - optional set of request options to apply to xhr request
             * @return {Promise} resolving Item object or an error
             */

        }, {
            key: "save",
            value: function save(itemObj, options) {
                var _this3 = this;

                return Q.resolve(angular.injector(['ng']).get('$http')).then(function ($http) {
                    if (typeof $http === 'undefined') throw new Error("Angular $http not resolved");

                    var method = "POST",
                        url = _this3.baseUrl;
                    if (itemObj.id) {
                        method = "PUT";
                        url += '/' + itemObj.id;
                    }

                    var opts = _this3.buildRequest(method, url, itemObj, options);
                    return $http(opts).then(function (response) {
                        return response.data;
                    });
                }).catch(function (e) {
                    var m = "NGItemService.save() - Error saving item: " + e.message;
                    var err = new Error(m);
                    return Q.reject(err);
                });
            }

            /**
             * @param {string} id - identifier of item to delete
             * @param {Object} options - optional set of request options to apply to xhr request
             * @return {Promise} resolving true if successful or an error
             */

        }, {
            key: "remove",
            value: function remove(id, options) {
                var _this4 = this;

                return Q.resolve(angular.injector(['ng']).get('$http')).then(function ($http) {
                    if (typeof $http === 'undefined') throw new Error("Angular $http not resolved");

                    var opts = _this4.buildRequest('DELETE', _this4.baseUrl + '/' + id, null, options);
                    return $http(opts);
                }).catch(function (e) {
                    var m = "NGItemService.remove() - Error deleting item: " + e.message;
                    var err = new Error(m);
                    return Q.reject(err);
                });
            }

            /**
             * @param {string} id - identifier of item to patch
             * @param {Object} patch - HTTP-PATCH compliant set of properties to patch
             * @param {Object} options - optional set of request options to apply to xhr request
             * @return {Promise} resolving Item object or an error
             */

        }, {
            key: "patch",
            value: function patch(id, _patch, options) {
                var _this5 = this;

                return Q.resolve(angular.injector(['ng']).get('$http')).then(function ($http) {
                    if (typeof $http === 'undefined') throw new Error("Angular $http not resolved");

                    var opts = _this5.buildRequest('PATCH', _this5.baseUrl + '/' + id, _patch, options);
                    return $http(opts).then(function (response) {
                        return response.data;
                    });
                }).catch(function (e) {
                    var m = "NGItemService.patch() - Error patching item: " + e.message;
                    var err = new Error(m);
                    return Q.reject(err);
                });
            }

            /**
             * @param {Object} arg - either JS object of query parameters or GeoPlatform.Query instance
             * @param {Object} options - optional set of request options to apply to xhr request
             * @return {Promise} resolving search results
             */

        }, {
            key: "search",
            value: function search(arg, options) {
                var _this6 = this;

                return Q.resolve(angular.injector(['ng']).get('$http')).then(function ($http) {
                    if (typeof $http === 'undefined') throw new Error("Angular $http not resolved");

                    var params = arg;
                    if (arg && typeof arg.getQuery !== 'undefined') {
                        //if passed a Query object,
                        // convert to parameters object
                        params = arg.getQuery();
                    }

                    var opts = _this6.buildRequest('GET', _this6.baseUrl, params, options);
                    return $http(opts).then(function (response) {
                        return response.data;
                    });
                }).catch(function (e) {
                    var m = "NGItemService.search() - Error searching items: " + e.message;
                    var err = new Error(m);
                    return Q.reject(err);
                });
            }

            /**
             * @param {string} method - one of "GET", "POST", "PUT", "DELETE", "PATCH"
             * @param {string} url - destination of xhr request
             * @param {Object} data - object to be sent with request
             * @param {Object} options - optional object defining request options
             * @return {Object} request options for xhr
             */

        }, {
            key: "buildRequest",
            value: function buildRequest(method, url, data, options) {

                if (METHODS.indexOf(method) < 0) throw new Error("Unsupported HTTP method " + method);

                if (!url) throw new Error("Must specify a URL for HTTP requests");

                //define default options
                var opts = {
                    method: method,
                    url: url,
                    timeout: this.timeout
                };
                if (data) {
                    opts.data = data;
                    if ("POST" === method || "PUT" === method || "PATCH" === method) {
                        opts.processData = false;
                        opts.contentType = 'application/json';
                    }
                }

                //copy over user-supplied options
                if (options && (typeof options === "undefined" ? "undefined" : _typeof(options)) === 'object') {
                    for (var o in options) {
                        if (options.hasOwnProperty(o)) {
                            opts[o] = options[o];
                        }
                    }
                }

                return opts;
            }
        }]);

        return NGItemService;
    }(ItemService);

    return NGItemService;
});

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["q", "angular", "GeoPlatform", "NGItemService"], function (Q, angular, GeoPlatform, NGItemService) {
            return root.NGMapService = factory(Q, angular, GeoPlatform, NGItemService);
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.NGMapService = factory(require('q'), require("angular"), require('GeoPlatform'), require('NGItemService'));
    } else {
        GeoPlatform.NGMapService = factory(Q, angular, GeoPlatform, GeoPlatform.NGItemService);
    }
})(undefined || window, function (Q, angular, GeoPlatform, NGItemService) {

    'use strict';

    /**
     * GeoPlatform Map service
     * service for working with the GeoPlatform API to
     * retrieve and manipulate map objects.
     *
     * @see GeoPlatform.NGItemService
     */

    var NGMapService = function (_NGItemService) {
        _inherits(NGMapService, _NGItemService);

        function NGMapService() {
            _classCallCheck(this, NGMapService);

            return _possibleConstructorReturn(this, (NGMapService.__proto__ || Object.getPrototypeOf(NGMapService)).call(this));
        }

        _createClass(NGMapService, [{
            key: "setUrl",
            value: function setUrl(baseUrl) {
                this.baseUrl = baseUrl + '/api/maps';
            }
        }]);

        return NGMapService;
    }(NGItemService);

    return NGMapService;
});

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["q", "angular", "GeoPlatform", "NGItemService"], function (Q, angular, GeoPlatform, NGItemService) {
            return root.NGLayerService = factory(Q, angular, GeoPlatform, NGItemService);
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.NGLayerService = factory(require('q'), require("angular"), require('GeoPlatform'), require('NGItemService'));
    } else {
        GeoPlatform.NGLayerService = factory(Q, angular, GeoPlatform, GeoPlatform.NGItemService);
    }
})(undefined || window, function (Q, angular, GeoPlatform, NGItemService) {

    'use strict';

    /**
    * GeoPlatform Map service
    * service for working with the GeoPlatform API to
    * retrieve and manipulate map objects.
    *
    * @see GeoPlatform.NGItemService
    */

    var NGLayerService = function (_NGItemService2) {
        _inherits(NGLayerService, _NGItemService2);

        function NGLayerService() {
            _classCallCheck(this, NGLayerService);

            return _possibleConstructorReturn(this, (NGLayerService.__proto__ || Object.getPrototypeOf(NGLayerService)).call(this));
        }

        _createClass(NGLayerService, [{
            key: "setUrl",
            value: function setUrl(baseUrl) {
                this.baseUrl = baseUrl + '/api/layers';
            }

            /**
             * @param {Object} options - optional set of request options to apply to xhr request
             * @return {Promise} resolving style JSON object
             */

        }, {
            key: "style",
            value: function style(options) {
                var _this9 = this;

                return Q.resolve(angular.injector(['ng']).get('$http')).then(function ($http) {
                    if (typeof $http === 'undefined') throw new Error("Angular $http not resolved");

                    var url = _this9.baseUrl + '/' + id + '/style';
                    var opts = _this9.buildRequest('GET', url, null, options);
                    return $http(opts);
                }).catch(function (e) {
                    var m = "GeoPlatform.NGLayerService.style() - Error getting layer style: " + e.message;
                    var err = new Error(m);
                    return Q.reject(err);
                });
            }

            /**
             * @param {Object} req identifying extent, x, y
             * @param {Object} options - optional set of request options to apply to xhr request
             * @return {Promise} resolving feature JSON object
             */

        }, {
            key: "describe",
            value: function describe(req, options) {
                var _this10 = this;

                return Q.resolve(angular.injector(['ng']).get('$http')).then(function ($http) {

                    if (typeof $http === 'undefined') throw new Error("Angular $http not resolved");

                    if (!req) {
                        throw new Error("Must provide describe request parameters");
                    }

                    var keys = ['bbox', 'height', 'width', 'x', 'y'];
                    var missing = keys.find(function (key) {
                        return !req[key];
                    });
                    if (missing) {
                        throw new Error("Must specify " + missing + " in describe parameters");
                    }

                    var params = {
                        srs: 'EPSG:4326',
                        bbox: req.bbox,
                        height: req.height,
                        width: req.width,
                        info_format: 'text/xml',
                        x: req.x,
                        y: req.y,
                        i: req.x, //WMS 1.3.0
                        j: req.y //WMS 1.3.0
                    };

                    var url = _this10.baseUrl + '/' + id + '/describe';
                    var opts = _this10.buildRequest("GET", url, params, options);
                    return $http(opts);
                }).catch(function (e) {
                    var m = "GeoPlatform.NGLayerService.get() - Error describing layer feature: " + e.message;
                    var err = new Error(m);
                    return Q.reject(err);
                });
            }
        }]);

        return NGLayerService;
    }(NGItemService);

    return NGLayerService;
});

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["q", "angular", "GeoPlatform", "NGItemService"], function (Q, angular, GeoPlatform, NGItemService) {
            return root.NGServiceService = factory(Q, angular, GeoPlatform, NGItemService);
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.NGServiceService = factory(require('q'), require("angular"), require('GeoPlatform'), require('NGItemService'));
    } else {
        GeoPlatform.NGServiceService = factory(Q, angular, GeoPlatform, GeoPlatform.NGItemService);
    }
})(undefined || window, function (Q, angular, GeoPlatform, NGItemService) {

    'use strict';

    /**
     * GeoPlatform Service service
     * service for working with the GeoPlatform API to
     * retrieve and manipulate service objects.
     *
     * @see GeoPlatform.NGItemService
     */

    var NGServiceService = function (_NGItemService3) {
        _inherits(NGServiceService, _NGItemService3);

        function NGServiceService() {
            _classCallCheck(this, NGServiceService);

            return _possibleConstructorReturn(this, (NGServiceService.__proto__ || Object.getPrototypeOf(NGServiceService)).call(this));
        }

        _createClass(NGServiceService, [{
            key: "setUrl",
            value: function setUrl(baseUrl) {
                this.baseUrl = baseUrl + '/api/services';
            }

            /**
             * Fetch metadata from the specified GeoPlatform Service's
             * web-accessible implementation using either GetCapabilities
             * or ESRI documentInfo.
             * @param {Object} service - GeoPlatform Service object
             * @param {Object} options - optional set of request options to apply to xhr request
             * @return {Promise} resolving service metadata
             */

        }, {
            key: "about",
            value: function about(service, options) {
                var _this12 = this;

                if (!service) {
                    var err = new Error("Must provide service to get metadata about");
                    return Q.reject(err);
                }

                return Q.resolve(angular.injector(['ng']).get('$http')).then(function ($http) {
                    if (typeof $http === 'undefined') throw new Error("Angular $http not resolved");

                    var opts = _this12.buildRequest('POST', _this12.baseUrl + '/about', service, options);
                    return $http(opts);
                }).catch(function (e) {
                    var m = "NGServiceService.get() - Error describing service: " + e.message;
                    var err = new Error(m);
                    return Q.reject(err);
                });
            }
        }]);

        return NGServiceService;
    }(NGItemService);

    return NGServiceService;
});

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["ItemTypes", "NGItemService", "NGLayerService", "NGMapService", "NGServiceService"], function (ItemTypes, NGItemService, NGLayerService, NGMapService, NGServiceService) {
            return root.NGServiceFactory = factory(ItemTypes, NGItemService, NGLayerService, NGMapService, NGServiceService);
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.NGServiceFactory = factory(require('../../shared/types'), require('./item'), require('./layer'), require('./map'), require('./service'));
    } else {
        GeoPlatform.NGServiceFactory = factory(GeoPlatform.ItemTypes, GeoPlatform.NGItemService, GeoPlatform.NGLayerService, GeoPlatform.NGMapService, GeoPlatform.NGServiceService);
    }
})(undefined || window, function (NGItemService, NGLayerService, NGMapService, NGServiceService) {

    /**
     * @param {any} arg - string type or object with type property
     * @param {string} baseUrl - base endpoint of GeoPlatform API
     * @return {ItemService}
     */
    var ServiceFactory = function ServiceFactory(arg, baseUrl) {
        var type = typeof arg === 'string' ? arg : arg && arg.type ? arg.type : null;
        if (!type) throw new Error("Must provide a type or object with a type specified");
        if (!baseUrl) throw new Error("Must provide a base url");
        switch (type) {
            case Types.LAYER:
                return new NGLayerService(baseUrl);
            case Types.SERVICE:
                return new NGServiceService(baseUrl);
            case Types.MAP:
                return new NGMapService(baseUrl);
            // case Types.GALLERY: return new NGGalleryService(baseUrl);
            // case Types.DATASET: return new NGDatasetService(baseUrl);
            default:
                return new NGItemService(baseUrl);
        }
    };

    return ServiceFactory;
});