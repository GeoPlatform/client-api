/* This software has been approved for release by the U.S. Department of the Interior. Although the software has been subjected to rigorous review, the DOI reserves the right to update the software as needed pursuant to further analysis and review. No warranty, expressed or implied, is made by the DOI or the U.S. Government as to the functionality of the software and related material nor shall the fact of release constitute any such warranty. Furthermore, the software is released on condition that neither the DOI nor the U.S. Government shall be held liable for any damages resulting from its authorized or unauthorized use. */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('q')) :
  typeof define === 'function' && define.amd ? define(['exports', 'q'], factory) :
  (factory((global.GeoPlatformClient = {}),global.Q));
}(this, (function (exports,Q) { 'use strict';

  Q = Q && Q.hasOwnProperty('default') ? Q['default'] : Q;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  var JQueryHttpClient = function () {

      /**
       * @param {integer} options.timeout
       * @param {string} options.token - the bearer token or a function to retrieve it
       */
      function JQueryHttpClient(options) {
          classCallCheck(this, JQueryHttpClient);

          options = options || {};
          this.setTimeout(options.timeout || 10000);
          this.setAuthToken(options.token);
      }

      createClass(JQueryHttpClient, [{
          key: 'setTimeout',
          value: function setTimeout(timeout) {
              this.timeout = timeout;
          }

          /**
           * @param {string|Function} arg - specify the bearer token or a function to retrieve it
           */

      }, {
          key: 'setAuthToken',
          value: function setAuthToken(arg) {
              if (arg && typeof arg === 'string') this.token = function () {
                  return arg;
              };else if (arg && typeof arg === 'function') this.token = arg;
              //else do nothing
          }
      }, {
          key: 'createRequestOpts',
          value: function createRequestOpts(options) {

              var opts = {
                  method: options.method,
                  url: options.url,
                  timeout: options.timeout || this.timeout
              };

              if (options.json === true) opts.dataType = 'json';

              if (options.params) {
                  opts.data = options.params;
                  opts.processData = true;
              }

              if (options.data) {
                  opts.data = options.data;
                  opts.processData = options.processData || false;
                  opts.contentType = 'application/json';
              }

              //set authorization header if one was provided
              if (this.token) {
                  var token = this.token();
                  if (token) {
                      opts.headers = opts.headers || {};
                      opts.headers.Authorization = 'Bearer ' + token;
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
          key: 'execute',
          value: function execute(opts) {

              if (typeof jQuery === 'undefined') {
                  throw new Error("jQuery is not available. Ensure it is included in your application");
              }
              var d = Q.defer();
              opts.success = function (data) {
                  d.resolve(data);
              };
              opts.error = function (xhr, status, message) {
                  d.reject(new Error(message));
              };
              jQuery.ajax(opts);
              return d.promise;
          }
      }]);
      return JQueryHttpClient;
  }();

  var NGHttpClient = function () {

      /**
       * @param {integer} options.timeout
       * @param {string} options.token - the bearer token or a function to retrieve it
       * @param {Object} options.$http - angular $http service instance
       */
      function NGHttpClient(options) {
          classCallCheck(this, NGHttpClient);

          if (typeof angular === 'undefined') throw new Error("Angular not defined");

          options = options || {};
          this.setTimeout(options.timeout || 10000);
          this.setAuthToken(options.token);

          if (options.$http) this.$http = options.$http;
      }

      createClass(NGHttpClient, [{
          key: 'setTimeout',
          value: function setTimeout(timeout) {
              this.timeout = timeout;
          }

          /**
           * @param {string|Function} arg - specify the bearer token or a function to retrieve it
           */

      }, {
          key: 'setAuthToken',
          value: function setAuthToken(arg) {
              if (arg && typeof arg === 'string') this.token = function () {
                  return arg;
              };else if (arg && typeof arg === 'function') this.token = arg;
              //else do nothing
          }
      }, {
          key: 'createRequestOpts',
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
          key: 'execute',
          value: function execute(opts) {

              if (typeof angular === 'undefined') throw new Error("Angular is not defined, ensure you have included it as a dependency in your application");

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
  }();

  var NodeHttpClient = function () {

      /**
       * @param {integer} options.timeout
       * @param {string} options.token - the bearer token or a function to retrieve it
       */
      function NodeHttpClient(options) {
          classCallCheck(this, NodeHttpClient);

          options = options || {};
          this.setTimeout(options.timeout || 10000);
          this.setAuthToken(options.token);
      }

      createClass(NodeHttpClient, [{
          key: 'setTimeout',
          value: function setTimeout(timeout) {
              this.timeout = timeout;
          }

          /**
           * @param {string|Function} arg - specify the bearer token or a function to retrieve it
           */

      }, {
          key: 'setAuthToken',
          value: function setAuthToken(arg) {
              if (arg && typeof arg === 'string') this.token = function () {
                  return arg;
              };else if (arg && typeof arg === 'function') this.token = arg;
              //else do nothing
          }
      }, {
          key: 'createRequestOpts',
          value: function createRequestOpts(options) {

              var opts = {
                  method: options.method,
                  url: options.url,
                  json: false !== options.json,
                  timeout: options.timeout || this.timeout
              };

              if (options.params) {
                  opts.qs = options.params;
              }

              if (options.file) {
                  var fs = require('fs');
                  if (!fs) throw new Error("Module 'fs' not available");
                  opts.formData = {
                      file: {
                          value: fs.createReadStream(options.file.path),
                          options: {
                              filename: options.file.originalFilename
                          }
                      }
                  };
                  Object.assign(opts.formData, options.data || {});
              } else if (options.data) {
                  if (options.formData) {
                      opts.formData = options.data;
                  } else {
                      opts.body = options.data;
                  }
              }

              //set authorization header if one was provided
              if (this.token) {
                  var token = this.token();
                  if (token) {
                      opts.auth = { 'bearer': token };
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

              // console.log(JSON.stringify(opts));

              return opts;
          }

          /**
           *
           */

      }, {
          key: 'execute',
          value: function execute(options) {
              var _this = this;

              var deferred = Q.defer();

              var request = require('request');
              if (!request) {
                  throw new Error("Module 'request' not available");
              }
              // require('request-debug')(request);

              request(options, function (error, response, body) {
                  _this.checkAndHandleError(error, response).then(function () {
                      if (options.json === false) deferred.resolve(response);else deferred.resolve(body);
                  }).catch(function (e) {
                      return deferred.reject(e);
                  });
              });
              return deferred.promise;
          }

          /**
           *
           */

      }, {
          key: 'checkAndHandleError',
          value: function checkAndHandleError(error, response) {

              var props = {
                  message: null,
                  error: null, //error type
                  status: 200
              };

              if (error) {
                  // Logger.debug("Error generated by request library: " + error.code);

                  if (error.code === 'ETIMEDOUT' || error.code === 'ESOCKETTIMEDOUT') {

                      props.status = 500;
                      props.error = "Connection Timeout";
                      props.message = "The response from the service took too long to read";

                      if (error.connect === true) {
                          props.message = "Unable to establish a connection to the service";
                      }
                  } else {
                      return Q.reject(error);
                  }
              } else if (response.statusCode < 200 || response.statusCode > 204) {

                  // Logger.debug('Error returned by remote endpoint (' + response.statusCode + ')');
                  // Logger.debug(JSON.stringify(response));

                  props.status = response.statusCode;

                  if (response.body && _typeof(response.body) === 'object') {
                      props = response.body;
                      props.status = props.status || response.statusCode;
                      props.message = props.message || "An error occurred communicating with service";

                      if (response.statusCode === 409) {
                          var sidx = response.body.message.indexOf(" ");
                          var eidx = response.body.message.indexOf(' already exists');
                          if (sidx >= 0 && eidx > sidx) {
                              props.item = response.body.message.substring(sidx + 1, eidx);
                          }
                      }
                  } else {

                      switch (response.statusCode) {
                          case 404:
                              props.error = "Not Found";
                              props.message = response.request.uri.pathname + " cannot be found";
                              break;
                          case 401:
                              props.error = "Unauthenticated";
                              props.message = "You are not authenticated";
                              break;
                          case 403:
                              props.error = "Unauthorized";
                              props.message = "You are not authorized to access " + response.request.uri.pathname;
                              break;
                          case 409:
                              props.error = "Conflict";
                              props.message = "Item already exists";

                              // pattern received is: { ..., message: 'Resource <identifier> already exists', ... }
                              try {
                                  var json = JSON.parse(response.body);
                                  var _sidx = json.message.indexOf(" ");
                                  var _eidx = json.message.indexOf(' already exists');
                                  if (_sidx >= 0 && _eidx > _sidx) {
                                      props.item = json.message.substring(_sidx + 1, _eidx);
                                  }
                              } catch (e) {
                                  message += '.  Unable to extract existing identifier from service response';
                              }
                              break;

                          default:

                              try {
                                  var _json = JSON.parse(response.body);
                                  props = _json;
                                  props.status = response.statusCode;
                                  // Logger.debug("PARSED ERROR: " + JSON.stringify(props));
                              } catch (e) {
                                  props.error = "Server Error";
                                  props.message = response.body;
                                  // Logger.debug("DEFAULTED ERROR: " + JSON.stringify(props));
                              }
                      }
                  }
              }

              if (props.status < 200 || props.status > 204) {

                  props.error = props.error || "Server Error";
                  props.status = props.status || response.statusCode;
                  props.message = props.message || "An error occurred communicating with service";

                  var err = new Error(props.message);
                  Object.assign(err, props);

                  // Logger.debug("UTILS.checkAndHandleError : " + err);
                  // Logger.debug("UTILS.checkAndHandleError : " + JSON.stringify(err));
                  // Logger.debug("UTILS.checkAndHandleError : " + err.message);
                  return Q.reject(err);
              }

              return Q.resolve();
          }
      }]);
      return NodeHttpClient;
  }();

  var ItemTypes = {
      DATASET: "dcat:Dataset",
      SERVICE: "regp:Service",
      LAYER: "Layer",
      MAP: "Map",
      GALLERY: "Gallery",
      ORGANIZATION: "org:Organization",
      COMMUNITY: 'Community',
      CONCEPT: "skos:Concept",
      CONCEPT_SCHEME: "skos:ConceptScheme",
      STANDARD: 'dct:Standard'
  };

  /**
   * ItemService
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
   */

  var ItemService = function () {
      function ItemService(url, httpClient) {
          classCallCheck(this, ItemService);

          this.setUrl(url);
          this.client = httpClient;
          this.timeout = 10000;
          this.httpMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
      }

      createClass(ItemService, [{
          key: "setUrl",
          value: function setUrl(baseUrl) {
              this.apiBase = baseUrl;
              this.baseUrl = baseUrl + '/api/items';
          }

          /**
           * @param {string} id - identifier of item to fetch
           * @param {Object} options - optional set of request options to apply to xhr request
           * @return {Promise} resolving Item object or an error
           */

      }, {
          key: "get",
          value: function get$$1(id, options) {
              var _this = this;

              return Q.resolve(id).then(function (id) {
                  var opts = _this.buildRequest({
                      method: "GET", url: _this.baseUrl + '/' + id, options: options
                  });
                  return _this.execute(opts);
              }).catch(function (e) {
                  var err = new Error("ItemService.get() - Error fetching item " + id + ": " + e.message);
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
              var _this2 = this;

              return Q.resolve(itemObj).then(function (item) {

                  var method = 'POST',
                      url = _this2.baseUrl;
                  if (item.id) {
                      method = "PUT";
                      url += '/' + item.id;
                  }

                  var opts = _this2.buildRequest({ method: method, url: url, data: item, options: options });
                  return _this2.execute(opts);
              }).catch(function (e) {
                  var err = new Error("ItemService.save() - Error saving item: " + e.message);
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
              var _this3 = this;

              return Q.resolve(this.baseUrl + '/' + id).then(function (url) {
                  var opts = _this3.buildRequest({
                      method: "DELETE", url: url, options: options
                  });
                  return _this3.execute(opts);
              }).then(function (response) {
                  return true;
              }).catch(function (e) {
                  var err = new Error("ItemService.remove() - Error deleting item " + id + ": " + e.message);
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
              var _this4 = this;

              return Q.resolve(this.baseUrl + '/' + id).then(function (url) {
                  var opts = _this4.buildRequest({
                      method: "PATCH", url: url, data: _patch, options: options
                  });
                  return _this4.execute(opts);
              }).catch(function (e) {
                  var err = new Error("ItemService.patch() - Error patching item " + id + ": " + e.message);
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
              var _this5 = this;

              return Q.resolve(arg).then(function (params) {

                  if (params && typeof params.getQuery !== 'undefined') {
                      //if passed a GeoPlatform.Query object,
                      // convert to parameters object
                      params = params.getQuery();
                  }
                  var opts = _this5.buildRequest({
                      method: "GET", url: _this5.baseUrl, params: params, options: options
                  });
                  return _this5.execute(opts);
              }).catch(function (e) {
                  var err = new Error("ItemService.search() - Error searching items: " + e.message);
                  return Q.reject(err);
              });
          }

          /**
           *
           * @param {string} arg - URL to metadata document or File to upload
           * @param {string} format - metadata format of specified document
           * @return {Promise} resolving GeoPlatform Item
           */

      }, {
          key: "import",
          value: function _import(arg, format, options) {
              var _this6 = this;

              return Q.resolve(true).then(function () {
                  if (arg === null || arg === undefined) {
                      throw new Error("Must provide a valid URL or File");
                  }
                  var isFile = typeof arg !== 'string';
                  var ro = {
                      method: "POST",
                      url: _this6.apiBase + '/api/import',
                      processData: true, //for jQuery
                      formData: true, //for Node (RequestJS)
                      options: options
                  };
                  if (isFile) {
                      ro.file = arg;
                      ro.data = { format: format };
                  } else {
                      ro.formData = false; //must be false for data to not be multi-part formdata
                      ro.data = { url: arg, format: format };
                  }
                  var opts = _this6.buildRequest(ro);
                  return _this6.execute(opts);
              }).catch(function (e) {
                  var err = new Error("ItemService.import() - Error importing item: " + e.message);
                  if (e.status === 409 || ~e.message.indexOf('Item already exists')) err.status = 409;
                  if (e.item) err.item = e.item;
                  return Q.reject(err);
              });
          }

          /**
           * @param {string} id - identifier of the item to export
           * @param {format} format - string mime type to export
           * @return {Promise} resolving HTTP response object for enabling attachment downloading
           */

      }, {
          key: "export",
          value: function _export(id, format, options) {
              var _this7 = this;

              return Q.resolve(true).then(function () {
                  var url = _this7.baseUrl + '/' + id + '/export';
                  var opts = _this7.buildRequest({
                      method: "GET", url: url,
                      params: { format: format },
                      json: false,
                      options: options
                  });
                  return _this7.execute(opts);
              }).catch(function (e) {
                  var err = new Error("ItemService.export() - Error exporting item: " + e.message);
                  return Q.reject(err);
              });
          }

          /**
           * @param {Object} object - GP object definition to generate a URI for
           * @param {Object} options - optional request options
           * @return {Promise} resolving string URI
           */

      }, {
          key: "getUri",
          value: function getUri(object, options) {
              var _this8 = this;

              return Q.resolve(object).then(function (obj) {
                  if (!obj || !obj.type) throw new Error("Must provide an object with a type property");
                  var url = _this8.apiBase + '/api/utils/uri';
                  var opts = _this8.buildRequest({
                      method: "POST", url: url, data: obj, options: options
                  });
                  return _this8.execute(opts);
              }).catch(function (e) {
                  var err = new Error("ItemService.getUri() - Error getting URI for item: " + e.message);
                  return Q.reject(err);
              });
          }

          /* ----------------------------------------------------------- */

          /**
           * @param {string} method - one of "GET", "POST", "PUT", "DELETE", "PATCH"
           * @param {string} url - destination of xhr request
           * @param {Object} params - object to be sent with request as query parameters
           * @param {Object} data - object to be sent with request as body
           * @param {Object} options - optional object defining request options
           * @return {Object} request options for xhr
           */

      }, {
          key: "buildRequest",
          value: function buildRequest(options) {

              if (this.httpMethods.indexOf(options.method) < 0) throw new Error("Unsupported HTTP method " + options.method);

              if (!options.url) throw new Error("Must specify a URL for HTTP requests");

              options.timeout = this.timeout;

              var opts = this.createRequestOpts(options);

              return opts;
          }
      }, {
          key: "createRequestOpts",
          value: function createRequestOpts(options) {
              return this.client.createRequestOpts(options);
          }
      }, {
          key: "execute",
          value: function execute(opts) {
              return this.client.execute(opts);
          }
      }]);
      return ItemService;
  }();

  /**
   * GeoPlatform Map service
   * service for working with the GeoPlatform API to
   * retrieve and manipulate map objects.
   *
   * @see GeoPlatform.ItemService
   */

  var DatasetService = function (_ItemService) {
      inherits(DatasetService, _ItemService);

      function DatasetService(url, httpClient) {
          classCallCheck(this, DatasetService);
          return possibleConstructorReturn(this, (DatasetService.__proto__ || Object.getPrototypeOf(DatasetService)).call(this, url, httpClient));
      }

      createClass(DatasetService, [{
          key: 'setUrl',
          value: function setUrl(baseUrl) {
              get(DatasetService.prototype.__proto__ || Object.getPrototypeOf(DatasetService.prototype), 'setUrl', this).call(this, baseUrl);
              this.baseUrl = baseUrl + '/api/datasets';
          }
      }]);
      return DatasetService;
  }(ItemService);

  /**
   * GeoPlatform Map service
   * service for working with the GeoPlatform API to
   * retrieve and manipulate map objects.
   *
   * @see GeoPlatform.ItemService
   */

  var MapService = function (_ItemService) {
      inherits(MapService, _ItemService);

      function MapService(url, httpClient) {
          classCallCheck(this, MapService);
          return possibleConstructorReturn(this, (MapService.__proto__ || Object.getPrototypeOf(MapService)).call(this, url, httpClient));
      }

      createClass(MapService, [{
          key: 'setUrl',
          value: function setUrl(baseUrl) {
              get(MapService.prototype.__proto__ || Object.getPrototypeOf(MapService.prototype), 'setUrl', this).call(this, baseUrl);
              this.baseUrl = baseUrl + '/api/maps';
          }
      }]);
      return MapService;
  }(ItemService);

  /**
   * GeoPlatform Map service
   * service for working with the GeoPlatform API to
   * retrieve and manipulate map objects.
   *
   * @see GeoPlatform.ItemService
   */

  var LayerService = function (_ItemService) {
      inherits(LayerService, _ItemService);

      function LayerService(url, httpClient) {
          classCallCheck(this, LayerService);
          return possibleConstructorReturn(this, (LayerService.__proto__ || Object.getPrototypeOf(LayerService)).call(this, url, httpClient));
      }

      createClass(LayerService, [{
          key: 'setUrl',
          value: function setUrl(baseUrl) {
              get(LayerService.prototype.__proto__ || Object.getPrototypeOf(LayerService.prototype), 'setUrl', this).call(this, baseUrl);
              this.baseUrl = baseUrl + '/api/layers';
          }

          /**
           * @param {Object} options - optional set of request options to apply to xhr request
           * @return {Promise} resolving style JSON object
           */

      }, {
          key: 'style',
          value: function style(options) {
              var _this2 = this;

              return Q.resolve(true).then(function () {

                  var url = _this2.baseUrl + '/' + id + '/style';
                  var opts = _this2.buildRequest({
                      method: "GET", url: url, options: options
                  });
                  return _this2.execute(opts);
              }).catch(function (e) {
                  var err = new Error('LayerService.style() - Error fetching style: ' + e.message);
                  return Q.reject(err);
              });
          }

          /**
           * @param {string} id - GeoPlatform Layer identifier
           * @param {Object} req identifying extent, x, y
           * @param {Object} options - optional set of request options to apply to xhr request
           * @return {Promise} resolving feature JSON object
           */

      }, {
          key: 'describe',
          value: function describe(id, req, options) {
              var _this3 = this;

              return Q.resolve(req).then(function (req) {

                  if (!req) {
                      throw new Error("Must provide describe parameters to use");
                  }

                  var keys = ['bbox', 'height', 'width', 'x', 'y'];
                  var missing = keys.find(function (key) {
                      return !req[key];
                  });
                  if (missing) {
                      throw new Error('Must specify ' + missing + ' in describe req');
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

                  var url = _this3.baseUrl + '/' + id + '/describe';
                  var opts = _this3.buildRequest({
                      method: "GET", url: url, params: params, options: options
                  });
                  return _this3.execute(opts);
              }).catch(function (e) {
                  var err = new Error('LayerService.describe() -\n                Error describing layer feature: ' + e.message);
                  return Q.reject(err);
              });
          }

          /**
           * @param {string} id - GeoPlatform Layer identifier
           * @param {Object} params describing layer request to validate
           * @param {Object} options - optional set of request options to apply to xhr request
           * @return {Promise} resolving empty if successful or a message if failed
           */

      }, {
          key: 'validate',
          value: function validate(id, params, options) {
              var _this4 = this;

              return Q.resolve(params).then(function (params) {

                  if (!params) {
                      throw new Error("Must provide parameters to use in layer validation");
                  }

                  var url = _this4.baseUrl + '/' + id + '/validate';
                  var opts = _this4.buildRequest({
                      method: "GET", url: url, params: params, options: options
                  });
                  return _this4.execute(opts);
              }).catch(function (e) {
                  var err = new Error('LayerService.describe() -\n                Error describing layer feature: ' + e.message);
                  return Q.reject(err);
              });
          }
      }]);
      return LayerService;
  }(ItemService);

  /**
   * GeoPlatform Service service
   * service for working with the GeoPlatform API to
   * retrieve and manipulate service objects.
   *
   * @see ItemService
   */

  var ServiceService = function (_ItemService) {
      inherits(ServiceService, _ItemService);

      function ServiceService(url, httpClient) {
          classCallCheck(this, ServiceService);
          return possibleConstructorReturn(this, (ServiceService.__proto__ || Object.getPrototypeOf(ServiceService)).call(this, url, httpClient));
      }

      createClass(ServiceService, [{
          key: 'setUrl',
          value: function setUrl(baseUrl) {
              get(ServiceService.prototype.__proto__ || Object.getPrototypeOf(ServiceService.prototype), 'setUrl', this).call(this, baseUrl);
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
          key: 'about',
          value: function about(service, options) {
              var _this2 = this;

              return Q.resolve(service).then(function (svc) {
                  if (!svc) throw new Error("Must provide service to get metadata about");
                  var opts = _this2.buildRequest({
                      method: 'POST', url: _this2.baseUrl + '/about', data: svc, options: options
                  });
                  return _this2.execute(opts);
              }).catch(function (e) {
                  var err = new Error('ServiceService.about() -\n                Error describing service: ' + e.message);
                  return Q.reject(err);
              });
          }

          /**
           * @param {Object} options - optional set of request options to apply to request
           * @return {Promise} resolving service types
           */

      }, {
          key: 'types',
          value: function types(options) {
              var _this3 = this;

              var query = new Query().types(ItemTypes.STANDARD).resourceTypes('ServiceType').pageSize(50).getQuery();

              return Q.resolve(query).then(function (params) {
                  var url = _this3.apiBase + '/api/items';
                  var opts = _this3.buildRequest({
                      method: 'GET', url: url, params: params, options: options
                  });
                  return _this3.execute(opts);
              }).then(function (response) {
                  return response.results;
              }).catch(function (e) {
                  var err = new Error('ServiceService.types() -\n                Error fetching service types: ' + e.message);
                  return Q.reject(err);
              });
          }

          /**
           * @param {Object} service - GP Service definition
           * @param {Object} options - optional set of request options to apply to request
           * @return {Promise} resolving imported service
           */

      }, {
          key: 'import',
          value: function _import(service, options) {
              var _this4 = this;

              return Q.resolve(service).then(function (svc) {
                  var url = _this4.baseUrl + '/import';
                  var opts = _this4.buildRequest({
                      method: 'POST', url: url, data: svc, options: options
                  });
                  return _this4.execute(opts);
              }).catch(function (e) {
                  var err = new Error('ServiceService.import() -\n                Error importing service: ' + e.message);
                  return Q.reject(err);
              });
          }

          /**
           * @param {string} id - identifier of GP service to harvest layers for
           * @param {Object} options - optional set of request options to apply to request
           * @return {Promise} resolving service layers
           */

      }, {
          key: 'harvest',
          value: function harvest(id, options) {
              var _this5 = this;

              return Q.resolve(id).then(function (id) {
                  var url = _this5.baseUrl + '/' + id + '/harvest';
                  var opts = _this5.buildRequest({
                      method: 'GET', url: url, options: options
                  });
                  return _this5.execute(opts);
              }).catch(function (e) {
                  var err = new Error('ServiceService.harvest() -\n                Error harvesting layers from service: ' + e.message);
                  return Q.reject(err);
              });
          }

          /**
           * @param {string} id - identifier of GP service to live test
           * @param {Object} options - optional set of request options to apply to request
           * @return {Promise} resolving service statistics
           */

      }, {
          key: 'liveTest',
          value: function liveTest(id, options) {
              var _this6 = this;

              return Q.resolve(id).then(function (id) {
                  var url = _this6.baseUrl + '/' + id + '/test';
                  var opts = _this6.buildRequest({
                      method: 'GET', url: url, options: options
                  });
                  return _this6.execute(opts);
              }).catch(function (e) {
                  var err = new Error('ServiceService.liveTest() -\n                Error testing service: ' + e.message);
                  return Q.reject(err);
              });
          }

          /**
           * @param {string} id - identifier of GP service to fetch statistics about
           * @param {Object} options - optional set of request options to apply to request
           * @return {Promise} resolving service statistics
           */

      }, {
          key: 'statistics',
          value: function statistics(id, options) {
              var _this7 = this;

              return Q.resolve(id).then(function (id) {
                  var url = _this7.baseUrl + '/' + id + '/statistics';
                  var opts = _this7.buildRequest({
                      method: 'GET', url: url, options: options
                  });
                  return _this7.execute(opts);
              }).catch(function (e) {
                  var err = new Error('ServiceService.statistics() -\n                Error getting service statistics: ' + e.message);
                  return Q.reject(err);
              });
          }
      }]);
      return ServiceService;
  }(ItemService);

  /**
   * GeoPlatform Map service
   * service for working with the GeoPlatform API to
   * retrieve and manipulate map objects.
   *
   * @see GeoPlatform.ItemService
   */

  var GalleryService = function (_ItemService) {
      inherits(GalleryService, _ItemService);

      function GalleryService(url, httpClient) {
          classCallCheck(this, GalleryService);
          return possibleConstructorReturn(this, (GalleryService.__proto__ || Object.getPrototypeOf(GalleryService)).call(this, url, httpClient));
      }

      createClass(GalleryService, [{
          key: 'setUrl',
          value: function setUrl(baseUrl) {
              get(GalleryService.prototype.__proto__ || Object.getPrototypeOf(GalleryService.prototype), 'setUrl', this).call(this, baseUrl);
              this.baseUrl = baseUrl + '/api/galleries';
          }
      }, {
          key: 'addItem',
          value: function addItem(galleryId, itemObj, options) {
              var _this2 = this;

              return Q.resolve(true).then(function () {
                  var url = _this2.baseUrl + '/' + galleryId + '/items';
                  var opts = _this2.buildRequest({
                      method: 'POST', url: url, data: itemObj, options: options
                  });
                  return _this2.execute(opts);
              }).catch(function (e) {
                  var err = new Error("GalleryService.addItem() - Error adding item: " + e.message);
                  return Q.reject(err);
              });
          }
      }, {
          key: 'removeItem',
          value: function removeItem(galleryId, itemId, options) {
              var _this3 = this;

              return Q.resolve(this.baseUrl + '/' + galleryId + '/items/' + itemId).then(function (url) {
                  var opts = _this3.buildRequest({
                      method: 'DELETE', url: url, options: options
                  });
                  return _this3.execute(opts);
              }).then(function (response) {
                  return true;
              }).catch(function (e) {
                  var err = new Error("GalleryService.addItem() - Error adding item: " + e.message);
                  return Q.reject(err);
              });
          }
      }]);
      return GalleryService;
  }(ItemService);

  var UtilsService = function () {
      function UtilsService(url, httpClient) {
          classCallCheck(this, UtilsService);

          this.setUrl(url);
          this.client = httpClient;
          this.timeout = 10000;
          this.httpMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
      }

      createClass(UtilsService, [{
          key: "setUrl",
          value: function setUrl(baseUrl) {
              this.baseUrl = baseUrl;
          }

          /**
           * @param {string} property - optional capa property to specifically request
           * @param {Object} query - optional query parameters to include with request
           * @param {Object} options - optional config to send with http request
           * @return {Promise} resolving capabilities object
           */

      }, {
          key: "capabilities",
          value: function capabilities(property, query, options) {
              var _this = this;

              var url = this.baseUrl + '/api/capabilities';
              if (property) url += '/' + property;

              return Q.resolve(url).then(function (url) {
                  var opts = _this.buildRequest({
                      method: "GET", url: url, params: query || {}, options: options
                  });
                  return _this.execute(opts);
              }).catch(function (e) {
                  var err = new Error("UtilsService.capabilities() - Error getting capabilities: " + e.message);
                  return Q.reject(err);
              });
          }

          /**
           * @param {File} file
           * @param {string} format
           * @param {Object} options
           * @return {Promise}
           */

      }, {
          key: "parseFile",
          value: function parseFile(file, format, options) {
              var _this2 = this;

              var url = this.baseUrl + '/api/utils/parse';

              return Q.resolve(url).then(function (url) {

                  var opts = _this2.buildRequest({
                      method: "POST", url: url,
                      data: { format: format },
                      file: file,
                      formData: true, //NodeJS (RequestJS)
                      options: options
                  });
                  return _this2.execute(opts);
              }).then(function (response) {
                  return response;
              }).catch(function (e) {
                  var err = new Error("UtilsService.parseFile() - Error parsing file: " + e.message);
                  return Q.reject(err);
              });
          }

          /* ----------------------------------------------------------- */

          /**
           * @param {string} method - one of "GET", "POST", "PUT", "DELETE", "PATCH"
           * @param {string} url - destination of xhr request
           * @param {Object} params - object to be sent with request as query parameters
           * @param {Object} data - object to be sent with request as body
           * @param {Object} options - optional object defining request options
           * @return {Object} request options for xhr
           */

      }, {
          key: "buildRequest",
          value: function buildRequest(options) {

              if (this.httpMethods.indexOf(options.method) < 0) throw new Error("Unsupported HTTP method " + options.method);

              if (!options.url) throw new Error("Must specify a URL for HTTP requests");

              options.timeout = this.timeout;

              return this.createRequestOpts(options);
          }
      }, {
          key: "createRequestOpts",
          value: function createRequestOpts(options) {
              return this.client.createRequestOpts(options);
          }
      }, {
          key: "execute",
          value: function execute(opts) {
              return this.client.execute(opts);
          }
      }]);
      return UtilsService;
  }();

  var AgolQuery = function () {
      function AgolQuery() {
          classCallCheck(this, AgolQuery);

          this._query = {
              page: 0,
              size: 10
          };
      }

      createClass(AgolQuery, [{
          key: 'getQuery',
          value: function getQuery() {
              var result = {};
              for (var prop in this._query) {
                  var value = this._query[prop];
                  if (value !== null && typeof value.push !== 'undefined') {
                      value = value.join(',');
                  }
                  result[prop] = value;
              }
              return result;
          }

          // ---------------------------------------

      }, {
          key: 'q',
          value: function q(value) {
              this.setQ(value);return this;
          }
      }, {
          key: 'setQ',
          value: function setQ(value) {
              this._query.q = value;
          }
      }, {
          key: 'getQ',
          value: function getQ() {
              return this._query.q;
          }

          // ---------------------------------------

      }, {
          key: 'types',
          value: function types(value) {
              this.setTypes(value);return this;
          }
      }, {
          key: 'setTypes',
          value: function setTypes(value) {
              if (value && typeof value.push !== 'undefined') value = value.join(',');
              this._query.types = value;
          }
      }, {
          key: 'getTypes',
          value: function getTypes() {
              return this._query.types;
          }

          // ---------------------------------------

      }, {
          key: 'groups',
          value: function groups(value) {
              this.setGroups(value);return this;
          }
      }, {
          key: 'setGroups',
          value: function setGroups(value) {
              if (value && typeof value.push !== 'undefined') value = value.join(',');
              this._query.groups = value;
          }
      }, {
          key: 'getGroups',
          value: function getGroups() {
              return this._query.groups;
          }

          // ---------------------------------------

      }, {
          key: 'orgs',
          value: function orgs(value) {
              this.setOrgs(value);return this;
          }
      }, {
          key: 'setOrgs',
          value: function setOrgs(value) {
              if (value && typeof value.push !== 'undefined') value = value.join(',');
              this._query.orgs = value;
          }
      }, {
          key: 'getOrgs',
          value: function getOrgs() {
              return this._query.orgs;
          }

          // ---------------------------------------

      }, {
          key: 'extent',
          value: function extent(value) {
              this.setExtent(value);return this;
          }
      }, {
          key: 'setExtent',
          value: function setExtent(value) {
              this._query.bbox = value;
          }
      }, {
          key: 'getExtent',
          value: function getExtent() {
              return this._query.bbox;
          }

          // ---------------------------------------

          /**
           * @param {string} sort - form of <field>,<dir> or just field name
           * @param {string} order - optional, either 'asc' or 'desc'
           */

      }, {
          key: 'sort',
          value: function sort(_sort, order) {
              this.setSort(_sort, order);return this;
          }
          /**
           * @param {string} sort - form of <field>,<dir> or just field name
           * @param {string} order - optional, either 'asc' or 'desc'
           */

      }, {
          key: 'setSort',
          value: function setSort(sort, order) {
              order = order && (order !== 'asc' || order !== 'desc') ? 'desc' : order;
              if (sort && sort.indexOf(',') < 0) sort = sort + ',' + order;
              this._query.sort = sort;
          }
      }, {
          key: 'getSort',
          value: function getSort() {
              return this._query.sort;
          }
      }, {
          key: 'getSortField',
          value: function getSortField() {
              return this._query.sort.split(',')[0];
          }
      }, {
          key: 'getSortOrder',
          value: function getSortOrder() {
              return this._query.sort.split(',')[1] === 'asc';
          }

          // -----------------------------------------------------------


          /**
           * @param {int} page - page of results to fetch
           */

      }, {
          key: 'page',
          value: function page(_page) {
              this.setPage(_page);
              return this;
          }
      }, {
          key: 'setPage',
          value: function setPage(page) {
              if (isNaN(page) || page * 1 < 0) return;
              this._query.page = page * 1;
          }
      }, {
          key: 'getPage',
          value: function getPage() {
              return this._query.page;
          }
      }, {
          key: 'nextPage',
          value: function nextPage() {
              this.setPage(this._query.page + 1);
          }
      }, {
          key: 'previousPage',
          value: function previousPage() {
              this.setPage(this._query.page - 1);
          }

          // -----------------------------------------------------------


          /**
           * @param {int} size - page size to request
           */

      }, {
          key: 'pageSize',
          value: function pageSize(size) {
              this.setPageSize(size);
              return this;
          }
      }, {
          key: 'setPageSize',
          value: function setPageSize(size) {
              if (isNaN(size) || size * 1 < 0) return;
              this._query.size = size * 1;
          }
      }, {
          key: 'getPageSize',
          value: function getPageSize() {
              return this._query.size;
          }
      }]);
      return AgolQuery;
  }();

  var AgolService = function () {
      function AgolService(url, httpClient) {
          classCallCheck(this, AgolService);

          this.setUrl(url);
          this.client = httpClient;
          this.timeout = 10000;
          this.httpMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
      }

      createClass(AgolService, [{
          key: 'setUrl',
          value: function setUrl(baseUrl) {
              this.baseUrl = baseUrl + '/api/agol/';
          }

          // -----------------------------------------------------------------------
          // AGOL ORGS METHODS


          /**
           * @param {string} id - identifier of AGOL organization to fetch
           * @param {Object} options - optional set of request options to apply to xhr request
           * @return {Promise} resolving Item object or an error
           */

      }, {
          key: 'getOrg',
          value: function getOrg(id, options) {
              var _this = this;

              return Q.resolve(id).then(function (id) {
                  var opts = _this.buildRequest({
                      method: "GET", url: _this.baseUrl + '/orgs/' + id, options: options
                  });
                  return _this.execute(opts);
              }).catch(function (e) {
                  var err = new Error('AgolService.getOrg() - Error fetching org ' + id + ': ' + e.message);
                  return Q.reject(err);
              });
          }

          /**
           * @param {Object} arg - either JS object of query parameters or Query instance
           * @param {Object} options - optional set of request options to apply to xhr request
           * @return {Promise} resolving search results
           */

      }, {
          key: 'searchOrgs',
          value: function searchOrgs(arg, options) {
              var _this2 = this;

              return Q.resolve(arg).then(function (params) {

                  if (params && typeof params.getQuery !== 'undefined') {
                      //if passed a GeoPlatform.Query object,
                      // convert to parameters object
                      params = params.getQuery();
                  }
                  var opts = _this2.buildRequest({
                      method: "GET", url: _this2.baseUrl + '/orgs', params: params, options: options
                  });
                  return _this2.execute(opts);
              }).catch(function (e) {
                  var err = new Error('AgolService.searchOrgs() - Error searching orgs: ' + e.message);
                  return Q.reject(err);
              });
          }

          // -----------------------------------------------------------------------
          // AGOL GROUPS METHODS


          /**
           * @param {string} id - identifier of AGOL group to fetch
           * @param {Object} options - optional set of request options to apply to xhr request
           * @return {Promise} resolving Item object or an error
           */

      }, {
          key: 'getGroup',
          value: function getGroup(id, options) {
              var _this3 = this;

              return Q.resolve(id).then(function (id) {
                  var opts = _this3.buildRequest({
                      method: "GET", url: _this3.baseUrl + '/groups/' + id, options: options
                  });
                  return _this3.execute(opts);
              }).catch(function (e) {
                  var err = new Error('AgolService.getGroup() - Error fetching group ' + id + ': ' + e.message);
                  return Q.reject(err);
              });
          }

          /**
           * @param {Object} arg - either JS object of query parameters or AgolQuery instance
           * @param {Object} options - optional set of request options to apply to xhr request
           * @return {Promise} resolving search results
           */

      }, {
          key: 'searchGroups',
          value: function searchGroups(arg, options) {
              var _this4 = this;

              return Q.resolve(arg).then(function (params) {

                  if (params && typeof params.getQuery !== 'undefined') {
                      //if passed a GeoPlatform.Query object,
                      // convert to parameters object
                      params = params.getQuery();
                  }
                  var opts = _this4.buildRequest({
                      method: "GET", url: _this4.baseUrl + '/groups', params: params, options: options
                  });
                  return _this4.execute(opts);
              }).catch(function (e) {
                  var err = new Error('AgolService.searchGroups() - Error searching groups: ' + e.message);
                  return Q.reject(err);
              });
          }

          // -----------------------------------------------------------------------
          // AGOL ITEMS METHODS

          /**
           * @param {string} id - identifier of AGOL item to fetch
           * @param {Object} options - optional set of request options to apply to xhr request
           * @return {Promise} resolving Item object or an error
           */

      }, {
          key: 'getItem',
          value: function getItem(id, options) {
              var _this5 = this;

              return Q.resolve(id).then(function (id) {
                  var opts = _this5.buildRequest({
                      method: "GET", url: _this5.baseUrl + '/items/' + id, options: options
                  });
                  return _this5.execute(opts);
              }).catch(function (e) {
                  var err = new Error('AgolService.getItem() - Error fetching item ' + id + ': ' + e.message);
                  return Q.reject(err);
              });
          }

          /**
           * @param {Object} arg - either JS object of query parameters or AgolQuery instance
           * @param {Object} options - optional set of request options to apply to xhr request
           * @return {Promise} resolving search results
           */

      }, {
          key: 'searchItems',
          value: function searchItems(arg, options) {
              var _this6 = this;

              return Q.resolve(arg).then(function (params) {

                  if (params && typeof params.getQuery !== 'undefined') {
                      //if passed a GeoPlatform.Query object,
                      // convert to parameters object
                      params = params.getQuery();
                  }
                  var opts = _this6.buildRequest({
                      method: "GET", url: _this6.baseUrl + '/items', params: params, options: options
                  });
                  return _this6.execute(opts);
              }).catch(function (e) {
                  var err = new Error('AgolService.searchItems() - Error searching items: ' + e.message);
                  return Q.reject(err);
              });
          }

          /* --------------------------- */

      }, {
          key: 'getAgolId',
          value: function getAgolId(obj) {
              if (!obj) return null;

              if (!obj.type) return null;

              if (ItemTypes.ORGANIZATION === obj.type || 'Group' === obj.type) {
                  return obj.id;
              }

              if (!obj.identifiers || !obj.identifiers.length) return null;
              var ids = obj.identifiers.filter(function (id) {
                  return ~id.indexOf('agol:');
              });
              if (!ids.length) return null;
              return ids[0].replace('agol:', '');
          }

          /* ----------------------------------------------------------- */

          /**
           * @param {string} method - one of "GET", "POST", "PUT", "DELETE", "PATCH"
           * @param {string} url - destination of xhr request
           * @param {Object} params - object to be sent with request as query parameters
           * @param {Object} data - object to be sent with request as body
           * @param {Object} options - optional object defining request options
           * @return {Object} request options for xhr
           */

      }, {
          key: 'buildRequest',
          value: function buildRequest(options) {

              if (this.httpMethods.indexOf(options.method) < 0) throw new Error('Unsupported HTTP method ' + options.method);

              if (!options.url) throw new Error('Must specify a URL for HTTP requests');

              options.timeout = this.timeout;

              return this.createRequestOpts(options);
          }
      }, {
          key: 'createRequestOpts',
          value: function createRequestOpts(options) {
              return this.client.createRequestOpts(options);
          }
      }, {
          key: 'execute',
          value: function execute(opts) {
              return this.client.execute(opts);
          }
      }]);
      return AgolService;
  }();

  var QueryParameters = {
      TYPES: 'type',
      QUERY: 'q',
      KEYWORDS: 'keyword',
      URI: 'uri',
      CREATED_BY: 'createdBy',
      CONTRIBUTED_BY: 'contributedBy',
      CREATOR: 'creator.id',
      SVC_TYPES: 'serviceType.id',
      THEMES_ID: 'theme.id',
      THEMES_LABEL: 'theme.label',
      THEMES_URI: 'theme.uri',
      PUBLISHERS: 'publisher.id',
      PUBLISHERS_LABEL: 'publisher.label',
      PUBLISHERS_URI: 'publisher.uri',
      USED_BY_ID: 'usedBy.id',
      USED_BY_LABEL: 'usedBy.label',
      USED_BY_URI: 'usedBy.uri',
      SCHEMES_ID: 'scheme.id',
      SCHEMES_LABEL: 'scheme.label',
      SCHEMES_URI: 'scheme.uri',
      VISIBILITY: 'visibility',
      EXTENT: 'extent',
      MODIFIED_BEFORE: 'modified.max',
      MODIFIED_AFTER: 'modified.min',
      BEGINS: 'startDate.min',
      ENDS: 'endDate.max',
      RESOURCE_TYPE: 'resourceType',

      //recommender service-specific
      FOR_TYPES: 'for'
  };

  var SORT_OPTIONS_DEFAULT = [{ value: "label,asc", label: "Name (A-Z)" }, { value: "label,desc", label: "Name (Z-A)" }, { value: "type,asc", label: "Type (A-Z)" }, { value: "type,desc", label: "Type (Z-A)" }, { value: "modified,desc", label: "Most recently modified" }, { value: "modified,asc", label: "Least recently modified" }, { value: "_score,desc", label: "Relevance" }];

  var KGQuery = function () {
      function KGQuery() {
          classCallCheck(this, KGQuery);


          this.defaultQuery = {
              page: 0,
              size: 10,
              sort: "modified,desc"
          };

          this.query = {
              page: 0,
              size: 10,
              sort: "modified,desc"
          };
      }

      createClass(KGQuery, [{
          key: "getQuery",
          value: function getQuery() {
              var result = {};
              for (var prop in this.query) {
                  var value = this.query[prop];
                  if (value !== null && typeof value.push !== 'undefined') {
                      value = value.join(',');
                  }
                  result[prop] = value;
              }
              return result;
          }

          // -----------------------------------------------------------


      }, {
          key: "parameter",
          value: function parameter(name, value) {
              this.setParameter(name, value);
              return this;
          }
      }, {
          key: "setParameter",
          value: function setParameter(name, value) {
              if (value === null || value === undefined) delete this.query[name];else this.query[name] = value;
          }
      }, {
          key: "getParameter",
          value: function getParameter(key) {
              return this.getParameter(key);
          }
      }, {
          key: "applyParameters",
          value: function applyParameters(obj) {
              for (var p in obj) {
                  if (obj.hasOwnProperty(p)) {
                      this.setParameter(p, obj[p]);
                  }
              }
          }

          // -----------------------------------------------------------


      }, {
          key: "q",
          value: function q(text) {
              this.setQ(text);
              return this;
          }

          /**
           * @param {string} text - free text query
           */

      }, {
          key: "setQ",
          value: function setQ(text) {
              this.setParameter(QueryParameters.QUERY, text);
          }
      }, {
          key: "getQ",
          value: function getQ() {
              return this.getParameter(QueryParameters.QUERY);
          }

          // -----------------------------------------------------------


          /**
           * @param {array[string]} types - KG classifiers for which concepts should be returned
           */

      }, {
          key: "classifiers",
          value: function classifiers(types) {
              this.setClassifiers(types);
              return this;
          }

          /**
           * @param {array[string]} types - KG classifiers for which concepts should be returned
           */

      }, {
          key: "setClassifiers",
          value: function setClassifiers(types) {
              if (types && types.push === 'undefined') types = [types];
              this.setParameter(QueryParameters.TYPES, types);
          }

          /**
           * @return {array[string]} KG classifiers for which concepts should be returned
           */

      }, {
          key: "getClassifiers",
          value: function getClassifiers() {
              return this.getParameter(QueryParameters.TYPES);
          }

          // -----------------------------------------------------------


          /**
           * Specify the Item object model type name(s) for which
           * recommended concepts should be returned. Note: this
           * query parameter is not the same as the GeoPlatform.Query.types()
           * query parameter (they map to different HTTP request parameters).
           * @param {array[string]} objTypes - Item object type names
           */

      }, {
          key: "types",
          value: function types(objTypes) {
              this.setTypes(objTypes);
              return this;
          }

          /**
           * Specify the Item object model type name(s) for which
           * recommended concepts should be returned. Note: this
           * query parameter is not the same as the GeoPlatform.Query.setTypes()
           * query parameter (they map to different HTTP request parameters).
           * @param {array[string]} objTypes - Item object type names
           */

      }, {
          key: "setTypes",
          value: function setTypes(objTypes) {
              if (objTypes && objTypes.push === 'undefined') objTypes = [objTypes];
              this.setParameter(QueryParameters.FOR_TYPES, objTypes);
          }

          /**
           * Get the Item object model type name(s) for which
           * recommended concepts should be returned. Note: this
           * query parameter is not the same as the GeoPlatform.Query.getTypes()
           * query parameter (they map to different HTTP request parameters).
           * @return {array[string]} Item object type names
           */

      }, {
          key: "getTypes",
          value: function getTypes() {
              return this.getParameter(QueryParameters.FOR_TYPES);
          }

          // -----------------------------------------------------------


          /**
           * @param {int} page - page of results to fetch
           */

      }, {
          key: "page",
          value: function page(_page) {
              this.setPage(_page);
              return this;
          }
      }, {
          key: "setPage",
          value: function setPage(page) {
              if (isNaN(page) || page * 1 < 0) return;
              this.query.page = page * 1;
          }
      }, {
          key: "getPage",
          value: function getPage() {
              return this.query.page;
          }
      }, {
          key: "nextPage",
          value: function nextPage() {
              this.setPage(this.query.page + 1);
          }
      }, {
          key: "previousPage",
          value: function previousPage() {
              this.setPage(this.query.page - 1);
          }

          // -----------------------------------------------------------


          /**
           * @param {int} size - page size to request
           */

      }, {
          key: "pageSize",
          value: function pageSize(size) {
              this.setPageSize(size);
              return this;
          }
      }, {
          key: "setPageSize",
          value: function setPageSize(size) {
              if (isNaN(size) || size * 1 < 0) return;
              this.query.size = size * 1;
          }
      }, {
          key: "getPageSize",
          value: function getPageSize() {
              return this.query.size;
          }

          // -----------------------------------------------------------


          /**
           * @param {string} sort - form of <field>,<dir> or just field name
           * @param {string} order - optional, either 'asc' or 'desc'
           */

      }, {
          key: "sort",
          value: function sort(_sort, order) {
              this.setSort(_sort, order);
              return this;
          }

          /**
           * @param {string} sort - form of <field>,<dir> or just field name
           * @param {string} order - optional, either 'asc' or 'desc'
           */

      }, {
          key: "setSort",
          value: function setSort(sort, order) {
              order = order && (order !== 'asc' || order !== 'desc') ? 'desc' : order;
              if (sort && sort.indexOf(',') < 0) sort = sort + ',' + order;
              this.query.sort = sort;
          }
      }, {
          key: "getSort",
          value: function getSort() {
              return this.query.sort;
          }
      }, {
          key: "getSortField",
          value: function getSortField() {
              return this.query.sort.split(',')[0];
          }
      }, {
          key: "getSortOrder",
          value: function getSortOrder() {
              return this.query.sort.split(',')[1] === 'asc';
          }

          /**
           * @return {array} list of key-value pairs of sort options
           */

      }, {
          key: "getSortOptions",
          value: function getSortOptions() {
              return SORT_OPTIONS_DEFAULT.slice(0);
          }

          // -----------------------------------------------------------


          /**
           *
           */

      }, {
          key: "clear",
          value: function clear() {
              this.query = this.defaultQuery;
          }
      }]);
      return KGQuery;
  }();

  var KGService = function () {
      function KGService(url, httpClient) {
          classCallCheck(this, KGService);

          this.setUrl(url);
          this.client = httpClient;
          this.timeout = 10000;
          this.httpMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
      }

      createClass(KGService, [{
          key: 'setUrl',
          value: function setUrl(baseUrl) {
              this.apiBase = baseUrl;
              this.baseUrl = baseUrl + '/api/recommender';
          }

          /**
           * @param {Object} query - optional query parameters to include with request
           * @param {Object} options - optional config to send with http request
           * @return {Promise} resolving recommended concepts as search results
           */

      }, {
          key: 'suggest',
          value: function suggest(query, options) {
              var url = this.baseUrl + '/suggest';
              return this._search(url, query, options).catch(function (e) {
                  var err = new Error('KGService.suggest() - Error suggesting concepts: ' + e.message);
                  return Q.reject(err);
              });
          }

          /**
           * @param {Object} query - optional query parameters to include with request
           * @param {Object} options - optional config to send with http request
           * @return {Promise} resolving concept types as search results
           */

      }, {
          key: 'types',
          value: function types(query, options) {
              var url = this.baseUrl + '/types';
              return this._search(url, query, options).catch(function (e) {
                  var err = new Error('KGService.types() - Error searching types: ' + e.message);
                  return Q.reject(err);
              });
          }

          /**
           * @param {Object} query - optional query parameters to include with request
           * @param {Object} options - optional config to send with http request
           * @return {Promise} resolving concept sources as search results
           */

      }, {
          key: 'sources',
          value: function sources(query, options) {
              var url = this.baseUrl + '/sources';
              return this._search(url, query, options).catch(function (e) {
                  var err = new Error('KGService.sources() - Error searching sources: ' + e.message);
                  return Q.reject(err);
              });
          }

          /* ----------------------------------------------------------- */

          /**
           * internal method used by exposed methods
           */

      }, {
          key: '_search',
          value: function _search(url, query, options) {
              var _this = this;

              return Q.resolve(true).then(function () {

                  if (query && typeof query.getQuery !== 'undefined') {
                      //if passed a GeoPlatform.Query object,
                      // convert to parameters object
                      query = query.getQuery();
                  }

                  var opts = _this.buildRequest({
                      method: "GET", url: url, params: query, options: options
                  });
                  return _this.execute(opts);
              });
          }

          /**
           * @param {string} method - one of "GET", "POST", "PUT", "DELETE", "PATCH"
           * @param {string} url - destination of xhr request
           * @param {Object} params - object to be sent with request as query parameters
           * @param {Object} data - object to be sent with request as body
           * @param {Object} options - optional object defining request options
           * @return {Object} request options for xhr
           */

      }, {
          key: 'buildRequest',
          value: function buildRequest(options) {

              if (this.httpMethods.indexOf(options.method) < 0) throw new Error('Unsupported HTTP method ' + options.method);

              if (!options.url) throw new Error('Must specify a URL for HTTP requests');

              options.timeout = this.timeout;

              return this.createRequestOpts(options);
          }
      }, {
          key: 'createRequestOpts',
          value: function createRequestOpts(options) {
              return this.client.createRequestOpts(options);
          }
      }, {
          key: 'execute',
          value: function execute(opts) {
              return this.client.execute(opts);
          }
      }]);
      return KGService;
  }();

  var classifiers = {
      PURPOSE: 'purposes',
      FUNCTION: 'functions',
      TOPIC_PRIMARY: 'primaryTopics',
      TOPIC_SECONDARY: 'secondaryTopics',
      SUBJECT_PRIMARY: 'primarySubjects',
      SUBJECT_SECONDARY: 'secondarySubjects',
      COMMUNITY: 'communities',
      AUDIENCE: 'audiences',
      PLACE: 'places',
      CATEGORY: 'categories'
  };

  var QueryFacets = {
      TYPES: 'types',
      THEMES: 'themes',
      PUBLISHERS: 'publishers',
      SERVICE_TYPES: 'serviceTypes',
      CONCEPT_SCHEMES: 'schemes',
      VISIBILITY: 'visibility',
      CREATED_BY: 'createdBy',
      USED_BY: 'usedBy.id'
  };

  var FIELDS_DEFAULT = ['created', 'modified', 'createdBy', 'publishers', 'themes', 'description'];

  var FACETS_DEFAULT = [QueryFacets.TYPES, QueryFacets.PUBLISHERS, QueryFacets.SERVICE_TYPES, QueryFacets.CONCEPT_SCHEMES, QueryFacets.VISIBILITY, QueryFacets.CREATED_BY];

  var SORT_OPTIONS_DEFAULT$1 = [{ value: "label,asc", label: "Name (A-Z)" }, { value: "label,desc", label: "Name (Z-A)" }, { value: "type,asc", label: "Type (A-Z)" }, { value: "type,desc", label: "Type (Z-A)" }, { value: "modified,desc", label: "Most recently modified" }, { value: "modified,asc", label: "Least recently modified" }, { value: "_score,desc", label: "Relevance" }];

  var Query$1 = function () {
      function Query() {
          classCallCheck(this, Query);


          this.defaultQuery = {
              page: 0,
              size: 10,
              total: 0,
              sort: "modified,desc",
              fields: FIELDS_DEFAULT.slice(0),
              includeFacets: FACETS_DEFAULT.slice(0)
          };

          this.query = {
              page: 0,
              size: 10,
              total: 0,
              sort: "modified,desc",
              fields: FIELDS_DEFAULT.slice(0),
              includeFacets: FACETS_DEFAULT.slice(0)
          };
      }

      createClass(Query, [{
          key: 'getQuery',
          value: function getQuery() {
              var result = {};
              for (var prop in this.query) {
                  var value = this.query[prop];
                  if (value !== null && typeof value.push !== 'undefined') {
                      value = value.join(',');
                  }
                  result[prop] = value;
              }
              return result;
          }

          // -----------------------------------------------------------


      }, {
          key: 'parameter',
          value: function parameter(name, value) {
              this.setParameter(name, value);
              return this;
          }
      }, {
          key: 'setParameter',
          value: function setParameter(name, value) {
              if (value === null || value === undefined) delete this.query[name];else this.query[name] = value;
          }
      }, {
          key: 'getParameter',
          value: function getParameter(key) {
              return this.getParameter(key);
          }
      }, {
          key: 'applyParameters',
          value: function applyParameters(obj) {
              for (var p in obj) {
                  if (obj.hasOwnProperty(p)) {
                      this.setParameter(p, obj[p]);
                  }
              }
          }

          // -----------------------------------------------------------


      }, {
          key: 'q',
          value: function q(text) {
              this.setQ(text);
              return this;
          }

          /**
           * @param {string} text - free text query
           */

      }, {
          key: 'setQ',
          value: function setQ(text) {
              this.setParameter(QueryParameters.QUERY, text);
          }
      }, {
          key: 'getQ',
          value: function getQ() {
              return this.getParameter(QueryParameters.QUERY);
          }

          // -----------------------------------------------------------


      }, {
          key: 'keywords',
          value: function keywords(text) {
              this.setQ(text);
              return this;
          }

          /**
           * @param {string} text - free text query
           */

      }, {
          key: 'setKeywords',
          value: function setKeywords(text) {
              if (text && typeof text.push !== 'undefined') text = text.join(',');
              this.setParameter(QueryParameters.KEYWORDS, text);
          }
      }, {
          key: 'getKeywords',
          value: function getKeywords() {
              return this.getParameter(QueryParameters.KEYWORDS);
          }

          // -----------------------------------------------------------


      }, {
          key: 'uri',
          value: function uri(_uri) {
              this.setUri(_uri);
              return this;
          }
      }, {
          key: 'setUri',
          value: function setUri(uri) {
              this.setParameter(QueryParameters.URI, uri);
          }
      }, {
          key: 'getUri',
          value: function getUri() {
              return this.getParameter(QueryParameters.URI);
          }

          // -----------------------------------------------------------


      }, {
          key: 'types',
          value: function types(_types) {
              this.setTypes(_types);
              return this;
          }

          /**
           * @param {array[string]} types - name of class(es) to request
           */

      }, {
          key: 'setTypes',
          value: function setTypes(types) {
              if (types && types.push === 'undefined') types = [types];
              this.setParameter(QueryParameters.TYPES, types);
          }
      }, {
          key: 'getTypes',
          value: function getTypes() {
              return this.getParameter(QueryParameters.TYPES);
          }

          // -----------------------------------------------------------


      }, {
          key: 'createdBy',
          value: function createdBy(user) {
              this.setCreatedBy(user);
              return this;
          }

          /**
           * @param {string} user - username
           * @param {boolean} fireUpdate -
           */

      }, {
          key: 'setCreatedBy',
          value: function setCreatedBy(user) {
              this.setParameter(QueryParameters.CREATED_BY, user);
          }
      }, {
          key: 'getCreatedBy',
          value: function getCreatedBy() {
              return this.getParameter(QueryParameters.CREATED_BY);
          }

          // -----------------------------------------------------------


          /**
           * Specify a Theme or set of Themes to constrain results. By
           * default, values are assumed to be theme identifiers. If using
           * theme labels or theme uris, specify the optional second parameter
           * to be either QueryParameters.THEMES_LABEL or QueryParameters.THEMES_URI
           * respectively.
           * @param {array[string]} themes - string or array of strings containing theme constraint
           * @param {string} parameter - optional, to indicate the parameter to use
           * @return {Query}
           */

      }, {
          key: 'themes',
          value: function themes(_themes, parameter) {
              this.setThemes(_themes, parameter);
              return this;
          }

          /**
           * Specify a Theme or set of Themes to constrain results. By
           * default, values are assumed to be theme identifiers. If using
           * theme labels or theme uris, specify the optional second parameter
           * to be either QueryParameters.THEMES_LABEL or QueryParameters.THEMES_URI
           * respectively.
           * @param {array[string]} themes - theme or themes to constrain by
           */

      }, {
          key: 'setThemes',
          value: function setThemes(themes, parameter) {
              if (themes && themes.push === 'undefined') themes = [themes];

              //clear existing
              this.setParameter(QueryParameters.THEMES_ID, null);
              this.setParameter(QueryParameters.THEMES_LABEL, null);
              this.setParameter(QueryParameters.THEMES_URI, null);

              var param = parameter || QueryParameters.THEMES_ID;
              this.setParameter(param, themes);
          }
      }, {
          key: 'getThemes',
          value: function getThemes() {
              return this.getParameter(QueryParameters.THEMES_ID) || this.getParameter(QueryParameters.THEMES_LABEL) || this.getParameter(QueryParameters.THEMES_URI);
          }

          // -----------------------------------------------------------


          /**
           * Specify a Publisher or set of Publishers to constrain results. By
           * default, values are assumed to be theme identifiers. If using
           * theme labels or theme uris, specify the optional second parameter
           * to be either QueryParameters.PUBLISHERS_LABEL or QueryParameters.PUBLISHERS_URI
           * respectively.
           * @param {string} parameter - optional, to indicate the parameter to use
           * @return {Query}
           */

      }, {
          key: 'publishers',
          value: function publishers(_publishers, parameter) {
              this.setPublishers(_publishers, parameter);
              return this;
          }

          /**
           * Specify a Publisher or set of Publishers to constrain results. By
           * default, values are assumed to be theme identifiers. If using
           * theme labels or theme uris, specify the optional second parameter
           * to be either QueryParameters.PUBLISHERS_LABEL or QueryParameters.PUBLISHERS_URI
           * respectively.
           * @param {array[string]} publishers - publishing orgs to constrain by
           */

      }, {
          key: 'setPublishers',
          value: function setPublishers(publishers, parameter) {
              if (publishers && publishers.push === 'undefined') publishers = [publishers];

              //clear existing
              this.setParameter(QueryParameters.PUBLISHERS_ID, null);
              this.setParameter(QueryParameters.PUBLISHERS_LABEL, null);
              this.setParameter(QueryParameters.PUBLISHERS_URI, null);

              var param = parameter || QueryParameters.PUBLISHERS_ID;
              this.setParameter(param, publishers);
          }
      }, {
          key: 'getPublishers',
          value: function getPublishers() {
              return this.getParameter(QueryParameters.PUBLISHERS_ID) || this.getParameter(QueryParameters.PUBLISHERS_LABEL) || this.getParameter(QueryParameters.PUBLISHERS_URI);
          }

          // -----------------------------------------------------------


          /**
           * Specify the identifier of an Agent (Community, Group, etc) that
           * uses items you wish to find in search results. By
           * default, values are assumed to be theme identifiers. If using
           * theme labels or theme uris, specify the optional second parameter
           * to be either QueryParameters.USED_BY_LABEL or QueryParameters.USED_BY_URI
           * respectively.
           * @param {string} parameter - optional, to indicate the parameter to use
           * @return {Query}
           */

      }, {
          key: 'usedBy',
          value: function usedBy(ids, parameter) {
              this.setUsedBy(ids, parameter);
              return this;
          }

          /**
           * Specify the identifier of an Agent (Community, Group, etc) that
           * uses items you wish to find in search results. By
           * default, values are assumed to be theme identifiers. If using
           * theme labels or theme uris, specify the optional second parameter
           * to be either QueryParameters.USED_BY_LABEL or QueryParameters.USED_BY_URI
           * respectively.
           * @param {array[string]} ids - publishing orgs to constrain by
           */

      }, {
          key: 'setUsedBy',
          value: function setUsedBy(ids, parameter) {
              if (ids && ids.push === 'undefined') ids = [ids];

              //clear existing
              this.setParameter(QueryParameters.USED_BY_ID, null);
              this.setParameter(QueryParameters.USED_BY_LABEL, null);
              this.setParameter(QueryParameters.USED_BY_URI, null);

              var param = parameter || QueryParameters.USED_BY_ID;
              this.setParameter(param, ids);
          }
      }, {
          key: 'getUsedBy',
          value: function getUsedBy() {
              return this.getParameter(QueryParameters.USED_BY_ID) || this.getParameter(QueryParameters.USED_BY_LABEL) || this.getParameter(QueryParameters.USED_BY_URI);
          }

          // -----------------------------------------------------------


          /**
           * Specify a Concept Scheme or set of Concept Schemes to constrain results. By
           * default, values are assumed to be theme identifiers. If using
           * theme labels or theme uris, specify the optional second parameter
           * to be either QueryParameters.SCHEMES_LABEL or QueryParameters.SCHEMES_URI
           * respectively.
           * @param {array[string]} schemes - schemes to constrain by
           * @param {string} parameter - optional, to indicate the parameter to use
           * @return {Query}
           */

      }, {
          key: 'schemes',
          value: function schemes(_schemes, parameter) {
              this.setSchemes(_schemes, parameter);
              return this;
          }

          /**
           * Specify a Concept Scheme or set of Concept Schemes to constrain results. By
           * default, values are assumed to be theme identifiers. If using
           * theme labels or theme uris, specify the optional second parameter
           * to be either QueryParameters.SCHEMES_LABEL or QueryParameters.SCHEMES_URI
           * respectively.
           * @param {array[string]} schemes - schemes to constrain by
           * @param {string} parameter - optional, to indicate the parameter to use
           */

      }, {
          key: 'setSchemes',
          value: function setSchemes(schemes, parameter) {
              if (schemes && schemes.push === 'undefined') schemes = [schemes];

              //clear existing
              this.setParameter(QueryParameters.SCHEMES_ID, null);
              this.setParameter(QueryParameters.SCHEMES_LABEL, null);
              this.setParameter(QueryParameters.SCHEMES_URI, null);

              var param = parameter || QueryParameters.SCHEMES_ID;
              this.setParameter(param, schemes);
          }
      }, {
          key: 'getSchemes',
          value: function getSchemes() {
              return this.getParameter(QueryParameters.SCHEMES) || this.getParameter(QueryParameters.SCHEMES_LABEL) || this.getParameter(QueryParameters.SCHEMES_URI);
          }

          // -----------------------------------------------------------

          /**
           *
           */

      }, {
          key: 'serviceTypes',
          value: function serviceTypes(types) {
              this.setServiceTypes(types);
              return this;
          }

          /**
           * @param {array[string]} types - ids
           */

      }, {
          key: 'setServiceTypes',
          value: function setServiceTypes(types) {
              if (types && types.push === 'undefined') types = [types];
              this.setParameter(QueryParameters.SERVICE_TYPES, types);
          }
      }, {
          key: 'getServiceTypes',
          value: function getServiceTypes() {
              return this.getParameter(QueryParameters.SERVICE_TYPES);
          }

          // -----------------------------------------------------------


      }, {
          key: 'visibility',
          value: function visibility(vis) {
              this.setVisibility(vis);
              return this;
          }

          /**
           * @param {string} visibility - one of 'public' or 'private'
           * @param {boolean} fireUpdate
           */

      }, {
          key: 'setVisibility',
          value: function setVisibility(visibility) {
              this.setParameter(QueryParameters.VISIBILITY, visibility);
          }
      }, {
          key: 'getVisibility',
          value: function getVisibility() {
              this.getParameter(QueryParameters.VISIBILITY);
          }

          // -----------------------------------------------------------


      }, {
          key: 'modified',
          value: function modified(date, beforeOrAfter) {
              this.setModified(date, beforeOrAfter);
              return this;
          }

          /**
           * @param {Date} date - date to compare against
           * @param {boolean} beforeOrAfter - flag specifying which boundary condition (true = before, false = after)
           * @param {boolean} fireUpdate - flag specifying whether to trigger update automatically
           */

      }, {
          key: 'setModified',
          value: function setModified(date, beforeOrAfter) {

              //if no date was supplied, consider it "unset" for both properties
              if (!date) {
                  this.setParameter(QueryParameters.MODIFIED_BEFORE, null);
                  this.setParameter(QueryParameters.MODIFIED_AFTER, null);
                  return;
              }

              var dir = beforeOrAfter && (beforeOrAfter === true || beforeOrAfter === "true");
              var prop = dir ? QueryParameters.MODIFIED_BEFORE : QueryParameters.MODIFIED_AFTER; //property being set
              var oppProp = dir ? QueryParameters.MODIFIED_AFTER : QueryParameters.MODIFIED_BEFORE; //unset opposite property
              var arg = date && date.getTime ? date.getTime() : date;

              this.setParameter(oppProp, null);
              this.setParameter(prop, arg);
          }
      }, {
          key: 'getModified',
          value: function getModified() {
              return this.getParameter(QueryParameters.MODIFIED_BEFORE) || this.getParameter(QueryParameters.MODIFIED_AFTER);
          }

          // -----------------------------------------------------------


      }, {
          key: 'extent',
          value: function extent(bbox) {
              this.setExtent(bbox);
              return this;
          }

          /**
           * @param {string} bboxStr - form of "minx,miny,maxx,maxy"
           */

      }, {
          key: 'setExtent',
          value: function setExtent(bbox) {
              if (bbox && typeof bbox.toBboxString !== 'undefined') bbox = bbox.toBboxString();
              this.setParameter(QueryParameters.EXTENT, bbox);
          }

          /**
           * @return {string} bbox string or null if not set
           */

      }, {
          key: 'getExtent',
          value: function getExtent() {
              return this.getParameter(QueryParameters.EXTENT);
          }

          // -----------------------------------------------------------


      }, {
          key: 'begins',
          value: function begins(date) {
              this.setBeginDate(date);
              return this;
          }
      }, {
          key: 'setBeginDate',
          value: function setBeginDate(date) {
              if (date && date instanceof Date) date = date.getTime();
              this.setParameter(QueryParameters.BEGINS, date);
          }
      }, {
          key: 'getBeginDate',
          value: function getBeginDate() {
              var date = this.getParameter(this.parameter.BEGINS);
              if (date) date = new Date(date);
              return date;
          }

          // -----------------------------------------------------------


      }, {
          key: 'ends',
          value: function ends(date) {
              this.setEndDate(date);
              return this;
          }
      }, {
          key: 'setEndDate',
          value: function setEndDate(date) {
              if (date && date instanceof Date) date = date.getTime();
              this.setParameter(QueryParameters.ENDS, date);
          }
      }, {
          key: 'getEndDate',
          value: function getEndDate() {
              var date = this.getParameter(this.parameter.ENDS);
              if (date) date = new Date(date);
              return date;
          }

          // -----------------------------------------------------------


      }, {
          key: 'between',
          value: function between(begin, end) {
              this.setBetween(begin, end);
              return this;
          }
      }, {
          key: 'setBetween',
          value: function setBetween(begin, end) {
              this.begins(begin);
              this.ends(end);
          }

          // -----------------------------------------------------------


      }, {
          key: 'resourceTypes',
          value: function resourceTypes(types) {
              this.setResourceTypes(types);
              return this;
          }
      }, {
          key: 'setResourceTypes',
          value: function setResourceTypes(types) {
              if (types && types.push === 'undefined') types = [types];
              this.setParameter(QueryParameters.RESOURCE_TYPE, types);
          }
      }, {
          key: 'getResourceTypes',
          value: function getResourceTypes() {
              return this.getParameter(QueryParameters.RESOURCE_TYPE);
          }

          // -----------------------------------------------------------


      }, {
          key: 'facets',
          value: function facets(names) {
              this.setFacets(names);
              return this;
          }

          /*
           * @param {array[string]} names - names of facets
           */

      }, {
          key: 'setFacets',
          value: function setFacets(names) {
              this.query.includeFacets = names;
          }
      }, {
          key: 'getFacets',
          value: function getFacets() {
              return this.query.includeFacets;
          }

          /**
           * @param {string} name - name of facet to add
           */

      }, {
          key: 'addFacet',
          value: function addFacet(name) {
              var facets = (this.getFacets() || []).push(name);
              this.setFacets(facets);
          }

          /**
           * @param {string} name - name of facet to remove
           */

      }, {
          key: 'removeFacet',
          value: function removeFacet(name) {
              var facets = this.getFacets() || [];
              var idx = facets.indexOf(name);
              if (idx >= 0) {
                  facets.splice(idx, 1);
                  this.setFacets(facets);
              }
          }

          // -----------------------------------------------------------


      }, {
          key: 'fields',
          value: function fields(_fields) {
              this.setFields(_fields);
              return this;
          }

          /**
           * @param {array[string]} fields - list of field names to request for each search result
           */

      }, {
          key: 'setFields',
          value: function setFields(fields) {
              if (fields && typeof fields.push === 'undefined') fields = [fields];
              this.query.fields = fields;
          }
      }, {
          key: 'getFields',
          value: function getFields() {
              return this.query.fields;
          }

          // -----------------------------------------------------------


          /**
           * @param {int} page - page of results to fetch
           */

      }, {
          key: 'page',
          value: function page(_page) {
              this.setPage(_page);
              return this;
          }
      }, {
          key: 'setPage',
          value: function setPage(page) {
              if (isNaN(page) || page * 1 < 0) return;
              this.query.page = page * 1;
          }
      }, {
          key: 'getPage',
          value: function getPage() {
              return this.query.page;
          }
      }, {
          key: 'nextPage',
          value: function nextPage() {
              this.setPage(this.query.page + 1);
          }
      }, {
          key: 'previousPage',
          value: function previousPage() {
              this.setPage(this.query.page - 1);
          }

          // -----------------------------------------------------------


          /**
           * @param {int} size - page size to request
           */

      }, {
          key: 'pageSize',
          value: function pageSize(size) {
              this.setPageSize(size);
              return this;
          }
      }, {
          key: 'setPageSize',
          value: function setPageSize(size) {
              if (isNaN(size) || size * 1 < 0) return;
              this.query.size = size * 1;
          }
      }, {
          key: 'getPageSize',
          value: function getPageSize() {
              return this.query.size;
          }

          // -----------------------------------------------------------


          /**
           * @param {string} sort - form of <field>,<dir> or just field name
           * @param {string} order - optional, either 'asc' or 'desc'
           */

      }, {
          key: 'sort',
          value: function sort(_sort, order) {
              this.setSort(_sort, order);
              return this;
          }

          /**
           * @param {string} sort - form of <field>,<dir> or just field name
           * @param {string} order - optional, either 'asc' or 'desc'
           */

      }, {
          key: 'setSort',
          value: function setSort(sort, order) {
              order = order && (order !== 'asc' || order !== 'desc') ? 'desc' : order;
              if (sort && sort.indexOf(',') < 0) sort = sort + ',' + order;
              this.query.sort = sort;
          }
      }, {
          key: 'getSort',
          value: function getSort() {
              return this.query.sort;
          }
      }, {
          key: 'getSortField',
          value: function getSortField() {
              return this.query.sort.split(',')[0];
          }
      }, {
          key: 'getSortOrder',
          value: function getSortOrder() {
              return this.query.sort.split(',')[1] === 'asc';
          }

          /**
           * @return {array} list of key-value pairs of sort options
           */

      }, {
          key: 'getSortOptions',
          value: function getSortOptions() {
              return SORT_OPTIONS_DEFAULT$1.slice(0);
          }

          // -----------------------------------------------------------


          /**
           *
           */

      }, {
          key: 'clear',
          value: function clear() {
              this.query = this.defaultQuery;
          }
      }]);
      return Query;
  }();

  function queryFactory () {
      return new Query$1();
  }

  /**
   * @param {any} arg - string type or object with type property
   * @param {string} baseUrl - base endpoint of GeoPlatform API
   * @return {ItemService}
   */
  var ServiceFactory = function ServiceFactory(arg, baseUrl, httpClient) {
      var type = typeof arg === 'string' ? arg : arg && arg.type ? arg.type : null;
      if (!type) throw new Error("Must provide a type or object with a type specified");
      if (!baseUrl) throw new Error("Must provide a base url");
      if (!httpClient) throw new Error("Must provide an http client to use to make requests");
      switch (type) {
          case ItemTypes.LAYER:
              return new LayerService(baseUrl, httpClient);
          case ItemTypes.SERVICE:
              return new ServiceService(baseUrl, httpClient);
          case ItemTypes.MAP:
              return new MapService(baseUrl, httpClient);
          case ItemTypes.GALLERY:
              return new GalleryService(baseUrl, httpClient);
          case ItemTypes.DATASET:
              return new DatasetService(baseUrl, httpClient);
          default:
              return new ItemService(baseUrl, httpClient);
      }
  };

  var config = {

      //ualUrl: '...',
      //appId: '...',

      configure: function configure(options) {
          Object.assign(this, options);
      }
  };

  exports.ItemTypes = ItemTypes;
  exports.QueryParameters = QueryParameters;
  exports.QueryFacets = QueryFacets;
  exports.Query = Query$1;
  exports.QueryFactory = queryFactory;
  exports.KGQuery = KGQuery;
  exports.KGClassifiers = classifiers;
  exports.JQueryHttpClient = JQueryHttpClient;
  exports.NGHttpClient = NGHttpClient;
  exports.NodeHttpClient = NodeHttpClient;
  exports.ItemService = ItemService;
  exports.LayerService = LayerService;
  exports.ServiceService = ServiceService;
  exports.GalleryService = GalleryService;
  exports.DatasetService = DatasetService;
  exports.MapService = MapService;
  exports.UtilsService = UtilsService;
  exports.AgolService = AgolService;
  exports.AgolQuery = AgolQuery;
  exports.KGService = KGService;
  exports.ServiceFactory = ServiceFactory;
  exports.Config = config;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=geoplatform.client.js.map
