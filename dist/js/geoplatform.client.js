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
      COMMUNITY: 'Community',
      ORGANIZATION: "org:Organization",
      CONTACT: "vcard:VCard",
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
           * @param {number} milliseconds - override environment variable timeout
           */

      }, {
          key: "setTimeout",
          value: function setTimeout(milliseconds) {
              this.timeout = milliseconds;
          }

          /**
           * @param {number} milliseconds - override environment variable timeout
           */

      }, {
          key: "timeout",
          value: function timeout(milliseconds) {
              this.setTimeout(milliseconds);
              return this;
          }

          /**
           * @param {Logger} logger - log service
           */

      }, {
          key: "setLogger",
          value: function setLogger(logger) {
              this.logger = logger;
          }

          /**
           * @param {Error} e - error to log (if logger specified)
           */

      }, {
          key: "logError",
          value: function logError(e) {
              if (this.logger && this.logger.error) {
                  this.logger.error(e);
              }
          }

          /**
           * @param {string} msg - message to log as debug
           */

      }, {
          key: "logDebug",
          value: function logDebug(msg) {
              if (this.logger && this.logger.debug) {
                  this.logger.debug(msg);
              }
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
                  _this.logError(err);
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
                  } else {
                      //if item is being created and has no URI already defined
                      // attempt to create one using the API's method for doing so
                      // and then attempt the actual item creation
                      if (!item.uri) {
                          return _this2.getUri(item, options).then(function (uri) {
                              item.uri = uri;
                              var opts = _this2.buildRequest({ method: method, url: url, data: item, options: options });
                              return _this2.execute(opts);
                          });
                      }
                  }

                  var opts = _this2.buildRequest({ method: method, url: url, data: item, options: options });
                  return _this2.execute(opts);
              }).catch(function (e) {
                  var err = new Error("ItemService.save() - Error saving item: " + e.message);
                  _this2.logError(err);
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
                  _this3.logError(err);
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
                  _this4.logError(err);
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
                  _this5.logError(err);
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
                  _this6.logError(err);
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
                  var msg = e.message;
                  //https://github.com/GeoPlatform/client-api/issues/1
                  if (e.statusCode && e.statusCode === 406 || e.statusCode === '406') {
                      msg = "Unsupported export format specified '" + format + "'";
                  }
                  var err = new Error("ItemService.export() - Error exporting item: " + msg);
                  _this7.logError(err);
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
                  _this8.logError(err);
                  return Q.reject(err);
              });
          }

          /**
           * @param {Array} ids - list of identifiers to fetch objects for
           * @param {Object} options - optional set of request options to apply to xhr request
           * @return {Promise} resolving list of matching items or an error
           */

      }, {
          key: "getMultiple",
          value: function getMultiple(ids, options) {
              var _this9 = this;

              return Q.resolve(ids).then(function (identifiers) {

                  var method = 'POST',
                      url = _this9.apiBase + '/api/fetch';

                  var opts = _this9.buildRequest({ method: method, url: url, data: identifiers, options: options });
                  return _this9.execute(opts);
              }).catch(function (e) {
                  var err = new Error("ItemService.getMultiple() - Error fetching items: " + e.message);
                  _this9.logError(err);
                  return Q.reject(err);
              });
          }

          /**
           * @param {Array} uris - list of URIs to retrieve objects for
           * @param {Object} options - optional set of request options to apply to xhr request
           * @return {Promise} resolving list containing uri-item association where exists
           */

      }, {
          key: "exists",
          value: function exists(uris, options) {
              var _this10 = this;

              return Q.resolve(uris).then(function (uris) {
                  var method = 'POST',
                      url = _this10.apiBase + '/api/utils/exists';
                  var opts = _this10.buildRequest({ method: method, url: url, data: uris, options: options });
                  return _this10.execute(opts);
              }).catch(function (e) {
                  var err = new Error("ItemService.exists() - Error resolving items: " + e.message);
                  _this10.logError(err);
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
                  _this2.logError(err);
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
                  var err = new Error('LayerService.describe() - Error describing layer feature: ' + e.message);
                  _this3.logError(err);
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
                  var err = new Error('LayerService.describe() - Error describing layer feature: ' + e.message);
                  _this4.logError(err);
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
                  var err = new Error('ServiceService.about() - Error describing service: ' + e.message);
                  _this2.logError(err);
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
                  var err = new Error('ServiceService.types() - Error fetching service types: ' + e.message);
                  _this3.logError(err);
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
                  var err = new Error('ServiceService.import() - Error importing service: ' + e.message);
                  _this4.logError(err);
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
                  var err = new Error('ServiceService.harvest() - Error harvesting layers from service: ' + e.message);
                  _this5.logError(err);
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
                  var err = new Error('ServiceService.liveTest() - Error testing service: ' + e.message);
                  _this6.logError(err);
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
                  var err = new Error('ServiceService.statistics() - Error getting service statistics: ' + e.message);
                  _this7.logError(err);
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
                  _this2.logError(err);
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
                  _this3.logError(err);
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
           * @param {Logger} logger - log service
           */

      }, {
          key: "setLogger",
          value: function setLogger(logger) {
              this.logger = logger;
          }

          /**
           * @param {Error} e - error to log (if logger specified)
           */

      }, {
          key: "logError",
          value: function logError(e) {
              if (this.logger && this.logger.error) {
                  this.logger.error(e);
              }
          }

          /**
           * @param {string} msg - message to log as debug
           */

      }, {
          key: "logDebug",
          value: function logDebug(msg) {
              if (this.logger && this.logger.debug) {
                  this.logger.debug(msg);
              }
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
                  _this.logError(err);
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
                  _this2.logError(err);
                  return Q.reject(err);
              });
          }

          /**
           * Geolocate the specified argument to a set of candidate locations.
           * @param {Object} value - text string to geolocate (name or lat,lng)
           * @param {Object} options - optional config to send with http request
           * @return {Promise} resolving an array of geocoded results
           */

      }, {
          key: "locate",
          value: function locate(value, options) {
              var _this3 = this;

              var url = this.baseUrl + '/api/utils/gazetteer';
              return Q.resolve(url).then(function (url) {
                  var opts = _this3.buildRequest({
                      method: 'GET',
                      url: url,
                      params: { location: value }
                  });
                  return _this3.execute(opts);
              }).then(function (response) {
                  return response;
              }).catch(function (e) {
                  var err = new Error("UtilsService.locate() - Error resolving location: " + e.message);
                  _this3.logError(err);
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

  var Parameters = {
      ALTERNATE_TITLE: 'alternateTitles',
      BEGINS: 'startDate.min',
      CREATED: 'created',
      CREATED_BEFORE: 'created.max',
      CREATED_AFTER: 'created.min',
      CREATED_BY: 'createdBy',
      CREATOR: 'creator.id',
      CONTRIBUTED_BY: 'contributedBy',
      ENDS: 'endDate.max',
      EXTENT: 'extent',
      IDENTIFIERS: 'identifiers',
      KEYWORDS: 'keywords',
      LAST_MODIFIED_BY: 'lastModifiedBy',
      MODIFIED: 'modified',
      MODIFIED_BEFORE: 'modified.max',
      MODIFIED_AFTER: 'modified.min',
      PUBLISHERS_ID: 'publisher.id',
      PUBLISHERS_LABEL: 'publisher.label',
      PUBLISHERS_URI: 'publisher.uri',
      CONTACTS_ID: 'contacts.id',
      CONTACTS_LABEL: 'contacts.label',
      CONTACTS_URI: 'contacts.uri',
      QUERY: 'q',
      SCHEMES_ID: 'scheme.id',
      SCHEMES_LABEL: 'scheme.label',
      SCHEMES_URI: 'scheme.uri',
      STATUS: 'status',
      SERVICE_TYPES: 'serviceType.id',
      THEMES_ID: 'theme.id',
      THEMES_LABEL: 'theme.label',
      THEMES_URI: 'theme.uri',
      TYPES: 'type', //TODO change to 'types'
      URI: 'uri',
      USED_BY_ID: 'usedBy.id',
      USED_BY_LABEL: 'usedBy.label',
      USED_BY_URI: 'usedBy.uri',
      VISIBILITY: 'visibility',
      RESOURCE_TYPE: 'resourceType',
      DATASET: 'dataset',
      LANDING_PAGE: 'landingPage',
      PURPOSE: 'purpose',

      //statistics parameters
      RELIABILITY: 'reliability',
      RELIABILITY_MIN: 'reliability.min',
      RELIABILITY_MAX: 'reliability.max',
      ONLINE: 'online',
      COMPLIANT: 'compliant',
      SPEED: 'speed',
      SPEED_MIN: 'speed.min',
      SPEED_MAX: 'speed.max',
      LIKES: 'likes',
      LIKES_MIN: 'likes.min',
      LIKES_MAX: 'likes.max',
      VIEWS: 'views',
      VIEWS_MIN: 'views.min',
      VIEWS_MAX: 'views.max',

      //type-specific parameters
      HREF: 'href', //service-specific
      LAYER_TYPE: 'layerType', //layer-specific
      LAYER_NAME: 'layerName', //...
      PARENT_LAYER: 'parentLayer', //...
      SUB_LAYER: 'subLayer', //...
      SERVICE: 'service', //...
      MAP_LAYER: 'mapLayer', //map-specific
      GALLERY_ITEM: 'galleryItem', //gallery-specific

      //meta-parameters
      FACETS: 'includeFacets', //TODO change to 'facets'
      FIELDS: 'fields',
      SORT: 'sort',
      PAGE: 'page',
      PAGE_SIZE: 'size',

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
              return this.query[key];
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
              this.setParameter(Parameters.QUERY, text);
          }
      }, {
          key: "getQ",
          value: function getQ() {
              return this.getParameter(Parameters.QUERY);
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
              if (types && typeof types.push === 'undefined') types = [types];
              this.setParameter(Parameters.TYPES, types);
          }

          /**
           * @return {array[string]} KG classifiers for which concepts should be returned
           */

      }, {
          key: "getClassifiers",
          value: function getClassifiers() {
              return this.getParameter(Parameters.TYPES);
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
              if (objTypes && typeof objTypes.push === 'undefined') objTypes = [objTypes];
              this.setParameter(Parameters.FOR_TYPES, objTypes);
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
              return this.getParameter(Parameters.FOR_TYPES);
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

  var Fields = {
      ACCESS_RIGHTS: 'rights',
      ALTERNATE_TITLES: 'alternateTitles',
      ANNOTATIONS: 'annotations',
      CLASSIFIERS: 'classifiers',
      CONCEPT_SCHEME: 'scheme',
      CONTACTS: 'contacts',
      CREATED: 'created',
      CREATED_BY: 'createdBy',
      DATASETS: 'datasets',
      DESCRIPTION: 'description',
      DISTRIBUTIONS: 'distributions',
      EXTENT: 'extent',
      GALLERY_ITEMS: 'items',
      HREF: 'href',
      IDENTIFIERS: 'identifiers',
      KEYWORDS: 'keywords',
      LABEL: 'label',
      LAST_MODIFIED_BY: 'lastModifiedBy',
      LAYERS: 'layers',
      LAYER_TYPE: 'layerType',
      LAYER_NAME: 'layerName',
      LEGEND: 'legend',
      MODIFIED: 'modified',
      PARENT_LAYER: 'parentLayer',
      PUBLISHERS: 'publishers',
      RESOURCE_TYPES: 'resourceTypes',
      SERVICE_TYPE: 'serviceType',
      SERVICES: 'services',
      SPATIAL: 'spatial',
      STATISTICS: 'statistics',
      STATUS: 'status',
      SUB_LAYERS: 'subLayers',
      TEMPORAL: 'temporal',
      THEMES: 'themes',
      THUMBNAIL: 'thumbnail',
      USED_BY: 'usedBy',
      VISIBILITY: 'visibility',
      LANDING_PAGE: 'landingPage'
  };

  var FIELDS_DEFAULT = [Fields.CREATED, Fields.MODIFIED, Fields.CREATED_BY, Fields.PUBLISHERS, Fields.THEMES, Fields.DESCRIPTION];

  /* --------------------------------------------------------- */

  var Facets = {
      ALTERNATE_TITLES: 'alternateTitles',
      CONCEPT_SCHEMES: 'schemes',
      CREATED_BY: 'createdBy',
      HREF: 'href',
      IDENTIFIERS: "identifiers",
      LAYER_TYPE: 'layerType',
      LAYER_NAME: 'layerName',
      LIKES: 'likes',
      ONLINE: 'online',
      PUBLISHERS: 'publishers',
      CONTACTS: 'contacts',
      RELIABILITY: 'reliability',
      SERVICE_TYPES: 'serviceTypes',
      SPEED: 'speed',
      STATUS: 'status',
      THEMES: 'themes',
      TYPES: 'type', //TODO change to 'types'
      USED_BY: 'usedBy',
      VIEWS: 'views',
      VISIBILITY: 'visibility'
  };

  var FACETS_DEFAULT = [Facets.TYPES, Facets.PUBLISHERS, Facets.SERVICE_TYPES, Facets.CONCEPT_SCHEMES, Facets.VISIBILITY, Facets.CREATED_BY];

  /*
      Map facet keys to parameters so clients can set
      query params using faceted results

      //TODO remove these and their function below
   */
  var FacetToParam = {};
  FacetToParam[Facets.TYPES] = Parameters.TYPES;
  FacetToParam[Facets.THEMES] = Parameters.THEMES_ID;
  FacetToParam[Facets.PUBLISHERS] = Parameters.PUBLISHERS_ID;
  FacetToParam[Facets.CONTACTS] = Parameters.CONTACTS_ID;
  FacetToParam[Facets.CONCEPT_SCHEMES] = Parameters.SCHEMES_ID;
  FacetToParam[Facets.USED_BY] = Parameters.USED_BY_ID;

  /* --------------------------------------------------------- */

  var SORT_OPTIONS_DEFAULT$1 = [{ value: "label,asc", label: "Name (A-Z)" }, { value: "label,desc", label: "Name (Z-A)" }, { value: "type,asc", label: "Type (A-Z)" }, { value: "type,desc", label: "Type (Z-A)" }, { value: "modified,desc", label: "Most recently modified" }, { value: "modified,asc", label: "Least recently modified" }, { value: "_score,desc", label: "Relevance" }];

  var BBOX_REGEX = /^\-?\d+(\.\d*)?,\-?\d+(\.\d*)?,\-?\d+(\.\d*)?,\-?\d+(\.\d*)?$/;

  function toArray$1(value) {
      var result = value;
      //if given a non-array value, wrap in array
      if (result !== null && typeof result.push === 'undefined') result = [result];
      //if array value is empty, nullify the result
      if (result !== null && !result.length) result = null;
      return result;
  }

  /**
   * Query
   *
   * Specify the "default" query constraints to use by passing in 'options.defaults = {...}';
   *
   * @constructor
   */

  var Query$1 = function () {

      /**
       * @param {Object} options - set of initial constraints
       */
      function Query(options) {
          classCallCheck(this, Query);

          this.defaultQuery = {};
          this.defaultQuery[Parameters.PAGE] = 0;
          this.defaultQuery[Parameters.PAGE_SIZE] = 10;
          this.defaultQuery[Parameters.SORT] = "modified,desc";
          this.defaultQuery[Parameters.FIELDS] = FIELDS_DEFAULT.slice(0);
          this.defaultQuery[Parameters.FACETS] = FACETS_DEFAULT.slice(0);
          if (options && options.defaults) {
              Object.assign(this.defaultQuery, options.defaults);
              delete options.defaults;
          }
          this.query = JSON.parse(JSON.stringify(this.defaultQuery));
          if (options) {
              this.applyParameters(options);
          }
      }

      /**
       * @return {object} containing request-ready parameters/values
       */


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

          /**
           * @return {Query}
           */

      }, {
          key: 'clone',
          value: function clone() {
              var result = new Query();
              var json = JSON.parse(JSON.stringify(this.query));
              result.applyParameters(json);
              return result;
          }

          // -----------------------------------------------------------

          /**
           * @param {string} name
           * @param {any} value
           * @return {Query} this
           */

      }, {
          key: 'parameter',
          value: function parameter(name, value) {
              this.setParameter(name, value);
              return this;
          }

          /**
           * @param {string} name
           * @param {any} value
           */

      }, {
          key: 'setParameter',
          value: function setParameter(name, value) {
              if (value === null || value === undefined || //if no value was provide
              typeof value.push !== 'undefined' && !value.length) //or empty array
                  delete this.query[name];else this.query[name] = value;
          }

          /**
           * @param {string} key - name of parameter
           * @return {string} value of parameter
           */

      }, {
          key: 'getParameter',
          value: function getParameter(key) {
              return this.query[key];
          }

          /**
           * @param {object} obj - set of parameter/values to apply to this query
           */

      }, {
          key: 'applyParameters',
          value: function applyParameters(obj) {
              for (var p in obj) {
                  if (obj.hasOwnProperty(p)) {
                      this.setParameter(p, obj[p]);
                  }
              }
          }

          /**
           * @param {string} facet - name of facet to set the value for as a parameter
           * @param {string} value - value of the facet to use as the parameter's value
           */
          //TODO remove this function

      }, {
          key: 'setFacetParameter',
          value: function setFacetParameter(facet, value) {
              var param = FacetToParam[facet];
              if (!param) {
                  console.log("WARN : Query.applyFacetParameter() - " + "unable to map facet to known parameter '" + facet + "', using " + "as direct parameter which may not operate as intended");
              }
              this.setParameter(param || facet, value);
          }

          // -----------------------------------------------------------

          /**
           * @param {string} text
           * @return {Query} this
           */

      }, {
          key: 'q',
          value: function q(text) {
              this.setQ(text);return this;
          }
          /** @param {string} text - free text query */

      }, {
          key: 'setQ',
          value: function setQ(text) {
              this.setParameter(Parameters.QUERY, text);
          }
          /** @return {string} */

      }, {
          key: 'getQ',
          value: function getQ() {
              return this.getParameter(Parameters.QUERY);
          }

          // -----------------------------------------------------------


      }, {
          key: 'keywords',
          value: function keywords(text) {
              this.setKeywords(text);
              return this;
          }

          /**
           * @param {string} text - free text query
           */

      }, {
          key: 'setKeywords',
          value: function setKeywords(text) {
              this.setParameter(Parameters.KEYWORDS, toArray$1(text));
          }
      }, {
          key: 'getKeywords',
          value: function getKeywords() {
              return this.getParameter(Parameters.KEYWORDS);
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
              this.setParameter(Parameters.URI, uri);
          }
      }, {
          key: 'getUri',
          value: function getUri() {
              return this.getParameter(Parameters.URI);
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
              this.setParameter(Parameters.TYPES, toArray$1(types));
          }
      }, {
          key: 'getTypes',
          value: function getTypes() {
              return this.getParameter(Parameters.TYPES);
          }

          // -----------------------------------------------------------


      }, {
          key: 'createdBy',
          value: function createdBy(user) {
              this.setCreatedBy(user);
              return this;
          }

          /** @param {string} user - username */

      }, {
          key: 'setCreatedBy',
          value: function setCreatedBy(user) {
              this.setParameter(Parameters.CREATED_BY, user);
          }

          /** @return {string} username */

      }, {
          key: 'getCreatedBy',
          value: function getCreatedBy() {
              return this.getParameter(Parameters.CREATED_BY);
          }

          // -----------------------------------------------------------


      }, {
          key: 'lastModifiedBy',
          value: function lastModifiedBy(user) {
              this.setLastModifiedBy(user);
              return this;
          }

          /** @param {string} user - username */

      }, {
          key: 'setLastModifiedBy',
          value: function setLastModifiedBy(user) {
              this.setParameter(Parameters.LAST_MODIFIED_BY, user);
          }

          /** @return {string} username */

      }, {
          key: 'getLastModifiedBy',
          value: function getLastModifiedBy() {
              return this.getParameter(Parameters.LAST_MODIFIED_BY);
          }

          // -----------------------------------------------------------


          /**
           * Specify a Theme or set of Themes to constrain results. By
           * default, values are assumed to be theme identifiers. If using
           * theme labels or theme uris, specify the optional second parameter
           * to be either Parameters.THEMES_LABEL or Parameters.THEMES_URI
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
           * to be either Parameters.THEMES_LABEL or Parameters.THEMES_URI
           * respectively.
           * @param {array[string]} themes - theme or themes to constrain by
           */

      }, {
          key: 'setThemes',
          value: function setThemes(themes, parameter) {

              //clear existing
              this.setParameter(Parameters.THEMES_ID, null);
              this.setParameter(Parameters.THEMES_LABEL, null);
              this.setParameter(Parameters.THEMES_URI, null);

              var param = parameter || Parameters.THEMES_ID;
              this.setParameter(param, toArray$1(themes));
          }
      }, {
          key: 'getThemes',
          value: function getThemes() {
              return this.getParameter(Parameters.THEMES_ID) || this.getParameter(Parameters.THEMES_LABEL) || this.getParameter(Parameters.THEMES_URI);
          }

          // -----------------------------------------------------------


          /**
           * Specify a Publisher or set of Publishers to constrain results. By
           * default, values are assumed to be identifiers. If using labels or uris,
           * specify the optional second parameter to be either
           * Parameters.PUBLISHERS_LABEL or Parameters.PUBLISHERS_URI respectively.
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
           * default, values are assumed to be identifiers. If using labels or uris,
           * specify the optional second parameter to be either
           * Parameters.PUBLISHERS_LABEL or Parameters.PUBLISHERS_URI respectively.
           * @param {array[string]} publishers - publishing orgs to constrain by
           */

      }, {
          key: 'setPublishers',
          value: function setPublishers(publishers, parameter) {

              //clear existing
              this.setParameter(Parameters.PUBLISHERS_ID, null);
              this.setParameter(Parameters.PUBLISHERS_LABEL, null);
              this.setParameter(Parameters.PUBLISHERS_URI, null);

              var param = parameter || Parameters.PUBLISHERS_ID;
              this.setParameter(param, toArray$1(publishers));
          }
      }, {
          key: 'getPublishers',
          value: function getPublishers() {
              return this.getParameter(Parameters.PUBLISHERS_ID) || this.getParameter(Parameters.PUBLISHERS_LABEL) || this.getParameter(Parameters.PUBLISHERS_URI);
          }

          // -----------------------------------------------------------


          /**
           * Specify a Point of Contact or set of Contacts to constrain results. By
           * default, values are assumed to be identifiers. If using
           * labels or uris, specify the optional second parameter to be either
           * Parameters.CONTACTS_LABEL or Parameters.CONTACTS_URI respectively.
           * @param {string} parameter - optional, to indicate the parameter to use
           * @return {Query}
           */

      }, {
          key: 'contacts',
          value: function contacts(_contacts, parameter) {
              this.setContacts(_contacts, parameter);
              return this;
          }

          /**
           * Specify a Contact or set of Contacts to constrain results. By
           * default, values are assumed to be identifiers. If using
           * labels or uris, specify the optional second parameter to be either
           * Parameters.CONTACTS_LABEL or Parameters.CONTACTS_URI respectively.
           * @param {array[string]} contacts - publishing orgs to constrain by
           */

      }, {
          key: 'setContacts',
          value: function setContacts(contacts, parameter) {

              //clear existing
              this.setParameter(Parameters.CONTACTS_ID, null);
              this.setParameter(Parameters.CONTACTS_LABEL, null);
              this.setParameter(Parameters.CONTACTS_URI, null);

              var param = parameter || Parameters.CONTACTS_ID;
              this.setParameter(param, toArray$1(contacts));
          }
      }, {
          key: 'getContacts',
          value: function getContacts() {
              return this.getParameter(Parameters.CONTACTS_ID) || this.getParameter(Parameters.CONTACTS_LABEL) || this.getParameter(Parameters.CONTACTS_URI);
          }

          // -----------------------------------------------------------


          /**
           * Specify the identifier of an Agent (Community, Group, etc) that
           * uses items you wish to find in search results. By
           * default, values are assumed to be identifiers. If using
           * labels or uris, specify the optional second parameter
           * to be either Parameters.USED_BY_LABEL or Parameters.USED_BY_URI
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
           * default, values are assumed to be identifiers. If using
           * labels or uris, specify the optional second parameter
           * to be either Parameters.USED_BY_LABEL or Parameters.USED_BY_URI
           * respectively.
           * @param {array[string]} ids - publishing orgs to constrain by
           */

      }, {
          key: 'setUsedBy',
          value: function setUsedBy(ids, parameter) {

              //clear existing
              this.setParameter(Parameters.USED_BY_ID, null);
              this.setParameter(Parameters.USED_BY_LABEL, null);
              this.setParameter(Parameters.USED_BY_URI, null);

              var param = parameter || Parameters.USED_BY_ID;
              this.setParameter(param, toArray$1(ids));
          }
      }, {
          key: 'getUsedBy',
          value: function getUsedBy() {
              return this.getParameter(Parameters.USED_BY_ID) || this.getParameter(Parameters.USED_BY_LABEL) || this.getParameter(Parameters.USED_BY_URI);
          }

          // -----------------------------------------------------------


          /**
           * Specify a Concept Scheme or set of Concept Schemes to constrain results. By
           * default, values are assumed to be identifiers. If using
           * labels or uris, specify the optional second parameter
           * to be either Parameters.SCHEMES_LABEL or Parameters.SCHEMES_URI
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
           * to be either Parameters.SCHEMES_LABEL or Parameters.SCHEMES_URI
           * respectively.
           * @param {array[string]} schemes - schemes to constrain by
           * @param {string} parameter - optional, to indicate the parameter to use
           */

      }, {
          key: 'setSchemes',
          value: function setSchemes(schemes, parameter) {

              //clear existing
              this.setParameter(Parameters.SCHEMES_ID, null);
              this.setParameter(Parameters.SCHEMES_LABEL, null);
              this.setParameter(Parameters.SCHEMES_URI, null);

              var param = parameter || Parameters.SCHEMES_ID;
              this.setParameter(param, toArray$1(schemes));
          }
      }, {
          key: 'getSchemes',
          value: function getSchemes() {
              return this.getParameter(Parameters.SCHEMES_ID) || this.getParameter(Parameters.SCHEMES_LABEL) || this.getParameter(Parameters.SCHEMES_URI);
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
              this.setParameter(Parameters.SERVICE_TYPES, toArray$1(types));
          }
      }, {
          key: 'getServiceTypes',
          value: function getServiceTypes() {
              return this.getParameter(Parameters.SERVICE_TYPES);
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
           */

      }, {
          key: 'setVisibility',
          value: function setVisibility(visibility) {
              this.setParameter(Parameters.VISIBILITY, visibility);
          }
      }, {
          key: 'getVisibility',
          value: function getVisibility() {
              return this.getParameter(Parameters.VISIBILITY);
          }

          // -----------------------------------------------------------


      }, {
          key: 'status',
          value: function status(value) {
              this.setStatus(value);
              return this;
          }

          /**
           * @param {string} status - current status of Item
           */

      }, {
          key: 'setStatus',
          value: function setStatus(value) {
              this.setParameter(Parameters.STATUS, value);
          }
      }, {
          key: 'getStatus',
          value: function getStatus() {
              return this.getParameter(Parameters.STATUS);
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
              if (bbox && typeof bbox.toBboxString !== 'undefined') {
                  //Leaflet Bounds instance
                  bbox = bbox.toBboxString();
              } else if (typeof bbox.push !== 'undefined' && bbox.length &&
              //Nested array (alternate Leaflet representation):
              // [ [minLat,minLong], [maxLat,maxLong] ]
              typeof bbox[0].push !== 'undefined') {
                  bbox = bbox[0][1] + ',' + bbox[0][0] + ',' + bbox[1][1] + ',' + bbox[1][0];
              } else if (typeof bbox === 'string') {
                  if (!BBOX_REGEX.test(bbox)) {
                      throw new Error("Invalid argument: bbox string must be " + "in form of 'minx,miny,maxx,maxy'");
                  }
              } else {
                  throw new Error("Invalid argument: bbox must be one of " + "Leaflet.Bounds, nested array, or bbox string");
              }
              this.setParameter(Parameters.EXTENT, bbox);
          }

          /**
           * @return {string} bbox string or null if not set
           */

      }, {
          key: 'getExtent',
          value: function getExtent() {
              return this.getParameter(Parameters.EXTENT);
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
           * @param {boolean} beforeOrAfter - flag specifying which boundary condition (true = before, false = after) flag specifying whether to trigger update automatically
           */

      }, {
          key: 'setModified',
          value: function setModified(date, beforeOrAfter) {

              //if no date was supplied, consider it "unset" for both properties
              if (!date) {
                  this.setParameter(Parameters.MODIFIED_BEFORE, null);
                  this.setParameter(Parameters.MODIFIED_AFTER, null);
                  return;
              }

              var dir = beforeOrAfter && (beforeOrAfter === true || beforeOrAfter === "true");
              var prop = dir ? Parameters.MODIFIED_BEFORE : Parameters.MODIFIED_AFTER; //property being set
              var oppProp = dir ? Parameters.MODIFIED_AFTER : Parameters.MODIFIED_BEFORE; //unset opposite property
              var arg = date && date.getTime ? date.getTime() : date;

              this.setParameter(oppProp, null);
              this.setParameter(prop, arg);
          }
      }, {
          key: 'getModified',
          value: function getModified() {
              var value = this.getParameter(Parameters.MODIFIED_BEFORE) || this.getParameter(Parameters.MODIFIED_AFTER);
              if (value && typeof value === 'number') {
                  value = new Date(value);
              }
              return value;
          }

          // -----------------------------------------------------------


      }, {
          key: 'created',
          value: function created(date, beforeOrAfter) {
              this.setCreated(date, beforeOrAfter);
              return this;
          }

          /**
           * @param {Date} date - date to compare against
           * @param {boolean} beforeOrAfter - flag specifying which boundary condition (true = before, false = after) flag specifying whether to trigger update automatically
           */

      }, {
          key: 'setCreated',
          value: function setCreated(date, beforeOrAfter) {

              //if no date was supplied, consider it "unset" for both properties
              if (!date) {
                  this.setParameter(Parameters.CREATED_BEFORE, null);
                  this.setParameter(Parameters.CREATED_AFTER, null);
                  return;
              }

              var dir = beforeOrAfter && (beforeOrAfter === true || beforeOrAfter === "true");
              var prop = dir ? Parameters.CREATED_BEFORE : Parameters.CREATED_AFTER; //property being set
              var oppProp = dir ? Parameters.CREATED_AFTER : Parameters.CREATED_BEFORE; //unset opposite property
              var arg = date && date.getTime ? date.getTime() : date;

              this.setParameter(oppProp, null);
              this.setParameter(prop, arg);
          }
      }, {
          key: 'getCreated',
          value: function getCreated() {
              var value = this.getParameter(Parameters.CREATED_BEFORE) || this.getParameter(Parameters.CREATED_AFTER);
              if (value && typeof value === 'number') {
                  value = new Date(value);
              }
              return value;
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
              this.setParameter(Parameters.BEGINS, date);
          }
      }, {
          key: 'getBeginDate',
          value: function getBeginDate() {
              var date = this.getParameter(Parameters.BEGINS);
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
              this.setParameter(Parameters.ENDS, date);
          }
      }, {
          key: 'getEndDate',
          value: function getEndDate() {
              var date = this.getParameter(Parameters.ENDS);
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
              this.setParameter(Parameters.RESOURCE_TYPE, toArray$1(types));
          }
      }, {
          key: 'getResourceTypes',
          value: function getResourceTypes() {
              return this.getParameter(Parameters.RESOURCE_TYPE);
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
              this.setParameter(Parameters.FACETS, toArray$1(names));
          }
      }, {
          key: 'getFacets',
          value: function getFacets() {
              return this.getParameter(Parameters.FACETS);
          }

          /**
           * @param {string} name - name of facet to add
           */

      }, {
          key: 'addFacet',
          value: function addFacet(name) {
              var facets = this.getFacets() || [];
              facets.push(name);
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
              this.setParameter(Parameters.FIELDS, toArray$1(fields));
          }
      }, {
          key: 'getFields',
          value: function getFields() {
              return this.getParameter(Parameters.FIELDS);
          }

          /**
           * @param {string} field - name of field to remove
           */

      }, {
          key: 'addField',
          value: function addField(field) {
              var fields = this.getFields() || [];
              fields.push(field);
              this.setFields(fields);
          }

          /**
           * @param {string} field - name of field to remove
           */

      }, {
          key: 'removeField',
          value: function removeField(field) {
              var fields = this.getFields() || [];
              var idx = fields.indexOf(name);
              if (idx >= 0) {
                  fields.splice(idx, 1);
                  this.setFields(fields);
              }
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
              this.setParameter(Parameters.PAGE, page * 1);
          }
      }, {
          key: 'getPage',
          value: function getPage() {
              return this.getParameter(Parameters.PAGE);
          }
      }, {
          key: 'nextPage',
          value: function nextPage() {
              this.setPage(this.getPage() + 1);
          }
      }, {
          key: 'previousPage',
          value: function previousPage() {
              this.setPage(this.getPage() - 1);
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
              this.setParameter(Parameters.PAGE_SIZE, size * 1);
          }
      }, {
          key: 'getPageSize',
          value: function getPageSize() {
              return this.getParameter(Parameters.PAGE_SIZE);
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
              this.setParameter(Parameters.SORT, sort);
          }
      }, {
          key: 'getSort',
          value: function getSort() {
              return this.getParameter(Parameters.SORT);
          }
      }, {
          key: 'getSortField',
          value: function getSortField() {
              var value = this.getSort();
              return value && value.length ? value.split(',')[0] : null;
          }
      }, {
          key: 'getSortOrder',
          value: function getSortOrder() {
              var value = this.getSort();
              return value && value.length ? value.split(',')[1] : null;
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
              this.query = JSON.parse(JSON.stringify(this.defaultQuery));
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

  var Categories = {
      UNKNOWN: 'Unknown Category',
      DATASET: 'Dataset',
      SERVICE: 'Service',
      LAYER: 'Layer',
      MAP: 'Map',
      GALLERY: 'Gallery',
      COMMUNITY: 'Community',
      CONTACT: 'Contact',
      ORGANIZATION: 'Organization',
      CONCEPT: 'Concept',
      CONCEPT_SCHEME: 'Concept Scheme',
      KNOWLEDGE_GRAPH: 'Knowledge Graph',
      USER: 'User',
      COMMUNITY_POST: 'Community Post', //post within a community portal
      COMMUNITY_PAGE: 'Community Page', //page within a community portal
      APP_PAGE: 'Application Page' //page/view within a client application
  };

  var Events = {
      ACCESSED: 'Accessed', //related item was accessed using API
      DISPLAYED: 'Displayed', //related item was displayed in a native form (map)
      VIEWED: 'Viewed', //related item was viewed in general form (metadata)
      CREATED: 'Created',
      EDITED: 'Edited',
      DELETED: 'Deleted'
  };

  function getCategory(type) {
      var result = Categories.UNKNOWN;
      if (type) {
          var cats = Object.keys(Categories).map(function (k) {
              return Categories[k];
          });
          //if existing category was specified
          if (~cats.indexOf(type)) return type;
          //if an ItemType with prefix was specified (strip off prefix)
          else if (~type.indexOf(':')) {
                  var cat = type.split(':')[1];
                  if (~cats.indexOf(cat)) return cat;
              }
      }
      return result;
  }

  /**
   *
   */

  var Event = function () {
      function Event(category, type, item, related) {
          classCallCheck(this, Event);

          if (!category || !type) {
              throw new Error("TrackingService Event - Must specific an event " + "category and event type when constructing events");
          }
          this.category = category;
          this.type = type;
          this.setItem(item);
          this.setRelated(related);
      }

      createClass(Event, [{
          key: 'getCategory',
          value: function getCategory() {
              return this.category;
          }
      }, {
          key: 'getType',
          value: function getType() {
              return this.type;
          }
      }, {
          key: 'getItem',
          value: function getItem() {
              return this.item;
          }
      }, {
          key: 'setItem',
          value: function setItem(item) {
              this.item = item ? item.id || item : null;
          }
      }, {
          key: 'getRelated',
          value: function getRelated() {
              return this.related;
          }
      }, {
          key: 'setRelated',
          value: function setRelated(related) {
              this.related = related ? related.id || related : null;
          }
      }]);
      return Event;
  }();

  /**
   * @param {string} eventType - type of event being created
   * @param {Object} item - GeoPlatform Item instance
   * @return {Array<Event>} list of event objects
   */


  function TrackingEventFactory(eventType, item) {
      var result = [];
      if (eventType && item && item.type) {
          if (ItemTypes.MAP === item.type) {
              result.push(new Event(Categories.MAP, eventType, item));
              if (Events.DISPLAYED === eventType) {

                  item.layers.forEach(function (layer) {
                      var layerEvents = TrackingEventFactory(eventType, layer).filter(function (e) {
                          return e !== null;
                      });
                      if (layerEvents && layerEvents.length) {
                          result = result.concat(layerEvents);
                      }
                  });

                  if (item.baseLayer) {
                      var baseEvents = TrackingEventFactory(eventType, item.baseLayer).filter(function (e) {
                          return e !== null;
                      });
                      if (baseEvents && baseEvents.length) result = result.concat(baseEvents);
                  }
              }
          } else if (ItemTypes.LAYER === item.type) {
              result.push(new Event(Categories.LAYER, eventType, item));
              if (Events.DISPLAYED === eventType && item.services && item.services.length) {
                  result.push(new Event(Categories.SERVICE, eventType, item.services[0]));
              }
          } else {
              var category = getCategory(item.type);
              result.push(new Event(category, eventType, item));
          }
      }
      // else {
      //     if(!event) console.log("Missing event");
      //     if(!item) console.log("Missing item");
      //     if(!item.type) console.log("Missing item type");
      // }
      return result;
  }

  /**
   *
   */

  var DefaultTrackingServiceProvider = function () {
      function DefaultTrackingServiceProvider() {
          classCallCheck(this, DefaultTrackingServiceProvider);
      }

      createClass(DefaultTrackingServiceProvider, [{
          key: 'logEvent',
          value: function logEvent(category, event, item, related) {
              console.log("EVENT (" + category + ") - " + event + " : " + item);
          }
          // logPageView( view, data ) {
          //     console.log("PAGEVIEW " + view + (data ? " : " + JSON.stringify(data) : '') );
          // }

      }]);
      return DefaultTrackingServiceProvider;
  }();

  /**
   * TrackingService
   *
   * Service for logging events related to usage of the GeoPlatform and its data
   *
   * Example:
   *
   *   import { TrackingService, EventCategories, EventTypes } from 'geoplatform.client';
   *
   *   let tracker = new TrackingService();
   *   tracker.setProvider( ... );
   *   tracker.event( Event.of(EventCategories.MAP, EventTypes.VIEWED, map) );
   *
   * Multi-event example:
   *
   *   import {
   *      TrackingService, TrackingEventCategories, TrackingEventTypes, TrackingEventFactory
   *   } from 'geoplatform.client';
   *
   *   let tracker = new TrackingService();
   *   tracker.setProvider( ... );
   *
   *   let events = [
   *       TrackingEvent.of( TrackingCategories.MAP, TrackingEventTypes.VIEWED, this.map )
   *       TrackingEvent.of( TrackingCategories.LAYER, TrackingEventTypes.VIEWED, this.map.baseLayer )
   *   ];
   *   tracker.event(events);
   *
   *   //OR use the event factory:
   *   tracker.event( TrackingEventFactory(EventTypes.VIEWED, this.map) );
   */


  var TrackingService = function () {
      function TrackingService(options) {
          classCallCheck(this, TrackingService);

          if (options && (typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') Object.assign(this, options);

          if (!this.provider) this.setProvider(new DefaultEventServiceProvider());
      }

      /**
       * @param {EventServiceProvider} provider -
       */


      createClass(TrackingService, [{
          key: 'setProvider',
          value: function setProvider(provider) {
              if (provider) this.provider = provider;
          }

          /**
           * @param {Event} event - event to log
           * @return {TrackingService}
           */

      }, {
          key: 'event',
          value: function event(_event) {
              this.logEvent(_event);
              return this;
          }

          /**
           * @param {Event} event - event to log
           */

      }, {
          key: 'logEvent',
          value: function logEvent(event) {
              var _this = this;

              if (!this.provider || !this.provider.logEvent || !event) return;

              if (typeof event.push !== 'undefined') {
                  event.forEach(function (evt) {
                      return _this.logEvent(evt);
                  });
              } else {
                  try {
                      this.provider.logEvent(event.getCategory(), event.getType(), event.getItem(), event.getRelated());
                  } catch (e) {
                      console.log("TrackingService.logEvent() - Error logging event (" + event.getCategory() + ", " + event.getType() + ", " + event.getItem() + ") - " + e.message);
                  }
              }
          }

          /**
           * @param {string} view - name of the view being activated
           * @param {any} data - additional context to supply for the event
           * @return {TrackingService}
           * @deprecated use svc.event( new Event(EventCategories.APP_PAGE, EventTypes.VIEWED, pageId) )
           */

      }, {
          key: 'pageView',
          value: function pageView(view, data) {
              this.logPageView(view, data);
              return this;
          }

          /**
           * @param {string} view - name of the view being activated
           * @param {any} data - additional context to supply for the event
           * @deprecated use svc.logEvent( new Event(EventCategories.APP_PAGE, EventTypes.VIEWED, pageId) )
           */

      }, {
          key: 'logPageView',
          value: function logPageView(view, data) {
              this.logEvent(new Event(Categories.APP_PAGE, Events.VIEWED, view));
              // if(this.provider && this.provider.logPageView) {
              //     this.provider.logPageView(view, data);
              // }
          }
      }]);
      return TrackingService;
  }();

  exports.ItemTypes = ItemTypes;
  exports.QueryParameters = Parameters;
  exports.QueryFacets = Facets;
  exports.Query = Query$1;
  exports.QueryFactory = queryFactory;
  exports.QueryFields = Fields;
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
  exports.TrackingEvent = Event;
  exports.TrackingService = TrackingService;
  exports.TrackingCategories = Categories;
  exports.TrackingTypes = Events;
  exports.TrackingEventFactory = TrackingEventFactory;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=geoplatform.client.js.map
