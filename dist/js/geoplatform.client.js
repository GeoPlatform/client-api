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

  var HttpClientBase = function () {

      /**
       * @param {integer} options.timeout
       * @param {string} options.token - the bearer token or a function to retrieve it
       */
      function HttpClientBase(options) {
          classCallCheck(this, HttpClientBase);

          options = options || {};
          this.setTimeout(options.timeout || 10000);
          this.setAuthToken(options.token);
      }

      createClass(HttpClientBase, [{
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
              throw new Error("HttpClientBase.createRequestOpts() - Function must be overridden by a sub-class");
          }
      }, {
          key: 'execute',
          value: function execute(opts) {
              throw new Error("HttpClientBase.execute() - Function must be overridden by a sub-class");
          }
      }]);
      return HttpClientBase;
  }();

  var JQueryHttpClient = function (_HttpClientBase) {
      inherits(JQueryHttpClient, _HttpClientBase);

      /**
       * @param {integer} options.timeout
       * @param {string} options.token - the bearer token or a function to retrieve it
       */
      function JQueryHttpClient(options) {
          classCallCheck(this, JQueryHttpClient);
          return possibleConstructorReturn(this, (JQueryHttpClient.__proto__ || Object.getPrototypeOf(JQueryHttpClient)).call(this, options));
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
  }(HttpClientBase);

  var NGHttpClient = function (_HttpClientBase) {
      inherits(NGHttpClient, _HttpClientBase);

      /**
       * @param {integer} options.timeout
       * @param {string} options.token - the bearer token or a function to retrieve it
       * @param {Object} options.$http - angular $http service instance
       */
      function NGHttpClient(options) {
          classCallCheck(this, NGHttpClient);

          var _this = possibleConstructorReturn(this, (NGHttpClient.__proto__ || Object.getPrototypeOf(NGHttpClient)).call(this, options));

          if (typeof angular === 'undefined') throw new Error("Angular not defined");
          if (options.$http) _this.$http = options.$http;
          return _this;
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
  }(HttpClientBase);

  var NodeHttpClient = function (_HttpClientBase) {
      inherits(NodeHttpClient, _HttpClientBase);

      /**
       * @param {integer} options.timeout
       * @param {string} options.token - the bearer token or a function to retrieve it
       */
      function NodeHttpClient(options) {
          classCallCheck(this, NodeHttpClient);
          return possibleConstructorReturn(this, (NodeHttpClient.__proto__ || Object.getPrototypeOf(NodeHttpClient)).call(this, options));
      }

      createClass(NodeHttpClient, [{
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
              var _this2 = this;

              var deferred = Q.defer();

              var request = require('request');
              if (!request) {
                  throw new Error("Module 'request' not available");
              }
              // require('request-debug')(request);

              request(options, function (error, response, body) {
                  _this2.checkAndHandleError(error, response).then(function () {
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
  }(HttpClientBase);

  var ItemTypes = {
      DATASET: "dcat:Dataset",
      SERVICE: "regp:Service",
      LAYER: "Layer",
      MAP: "Map",
      GALLERY: "Gallery",
      CONTACT: "vcard:VCard",
      ORGANIZATION: "org:Organization",
      COMMUNITY: 'Community',
      CONCEPT: "skos:Concept",
      CONCEPT_SCHEME: "skos:ConceptScheme",
      STANDARD: 'dct:Standard'
  };

  /**
   * BaseService
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

  var BaseService = function () {
      function BaseService(url, httpClient) {
          classCallCheck(this, BaseService);

          this.setUrl(url);
          this.client = httpClient;
          this.setTimeout(10000);
          this.httpMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
      }

      createClass(BaseService, [{
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
           * @param {Error} e - error generated by the api
           * @param {string} prefixMsg - label or message to prepend to the error's message
           * @return {Promise} rejecting with the updated error
           */

      }, {
          key: "_onError",
          value: function _onError(e, prefixMsg) {

              var code = e.statusCode || e.status || 500;
              var title = e.error;
              var msg = e.message;
              if (!msg) {
                  if (code === 400) msg = "The request was invalid";else if (code === 401) msg = "You must sign in before making this request";else if (code === 403) msg = "You are not authorized to make this request";else if (code === 404) msg = "The specified resource was not found";else if (code === 409) msg = "The resource already exists";else msg = "The request resulted in an unspecified error";
              }

              e.message = prefixMsg ? prefixMsg + ": " + msg : msg;
              e.status = code;
              e.error = title;
              return Q.reject(e);
          }
      }]);
      return BaseService;
  }();

  var ItemProperties = {
      ID: { key: 'id' },
      URI: { key: 'uri' },
      TYPE: { key: 'type' },
      CREATED: { key: '_created' },
      MODIFIED: { key: 'modified' },
      LAST_MODIFIED_BY: { key: 'lastModifiedBy' },
      IDENTIFIERS: { key: 'identifiers', multi: true },
      ALTERNATE_TITLES: { key: 'alternateTitles', multi: true },
      CREATED_BY: { key: 'createdBy' },
      LABEL: { key: 'label' },
      TITLE: { key: 'title' },
      DESCRIPTION: { key: 'description' },
      KEYWORDS: { key: 'keywords', multi: true },
      LANDING_PAGE: { key: 'landingPage' },
      STATUS: { key: 'status' },
      VISIBILITY: { key: 'visibility' },
      THEMES: { key: 'themes', multi: true, type: 'item' },
      PUBLISHERS: { key: 'publishers', multi: true, type: 'item' },
      CONTACTS: { key: 'contacts', multi: true, type: 'item' },
      CONTRIBUTORS: { key: 'contributors', multi: true, type: 'item' },
      DISTRIBUTIONS: { key: 'distributions', multi: true, type: 'object' },
      RESOURCE_TYPES: { key: 'resourceTypes', multi: true, type: 'object' },
      CLASSIFIERS: { key: 'classifiers', type: 'object' },

      HREF: { key: 'href' },
      SERVICE_TYPE: { key: 'serviceType', type: 'object' },
      DATASETS: { key: 'datasets', multi: true, type: 'item' },

      LAYER_TYPE: { key: 'layerType' },
      LAYER_NAME: { key: 'layerName' },
      LEGEND: { key: 'legend', type: 'object' },
      SERVICES: { key: 'services', multi: true, type: 'item' },

      BASE_LAYER: { key: 'baseLayer', type: 'item' },
      MAP_LAYERS: { key: 'layers', multi: true, type: 'object' },
      THUMBNAIL: { key: 'thumbnail', type: "object" },
      ANNOTATIONS: { key: 'annotations', type: 'object' },

      GALLERY_ITEMS: { key: 'items', multi: true, type: 'object' },

      CONCEPT_SCHEME: { key: 'scheme', type: 'item' },

      FULL_NAME: { key: 'fullName' },
      ORGANIZATION_NAME: { key: 'orgName' },
      POSITION_TITLE: { key: 'positionTitle' },
      EMAIL: { key: 'email' },
      TELEPHONE: { key: 'tel' },
      ADDRESS: { key: 'address', type: 'object' },

      NAME: { key: 'name' },
      PARENT_ORGANIZATION: { key: 'subOrganizationOf', type: 'item' }

  };

  function mapArray(arr, fn) {
      var len = arr.length,
          res = [];
      for (var i = 0; i < len; ++i) {
          res[i] = fn(arr[i]);
      }
      return res;
  }

  /**
   *
   */

  var BaseModel = function () {
      function BaseModel() {
          classCallCheck(this, BaseModel);

          this._data = {};
      }

      createClass(BaseModel, [{
          key: 'set',
          value: function set$$1(property, value) {
              var _this = this;

              // console.log(' ');
              // console.log('-------------------');
              // console.log(`Item.set() - ${property.key} = ${typeof(value)}` );
              // console.log(`Item.set() - ${property.type} / ${property.multi}`);

              if (value === null || value === undefined) delete this._data[property.key];else {
                  var newValue = value;
                  var isItem = 'item' === property.type;
                  if (property.multi) {
                      if (typeof value.push === 'undefined') {
                          // console.log('Item.set() - ' + key + ' has many but is singular: ' + typeof(value.push));
                          newValue = isItem ? [this.toItem(value)] : [value];
                      } else {
                          newValue = mapArray(value, function (v) {
                              return isItem ? _this.toItem(v) : v;
                          });
                      }
                  } else if (isItem) {
                      newValue = this.toItem(value);
                  } else {
                      newValue = JSON.parse(JSON.stringify(value));
                  }

                  this._data[property.key] = newValue;
              }
              // console.log('---------------------');
              // console.log(' ');
          }
      }, {
          key: 'get',
          value: function get$$1(property) {
              return this._data[property.key];
          }
      }, {
          key: 'addTo',
          value: function addTo(property, value) {
              var _this2 = this;

              if (value === null || value === undefined) return;
              if (property.multi) {
                  if (!this._data[property.key]) this._data[property.key] = [];

                  if (typeof value.push !== 'undefined') {
                      if ('item' === property.type) {
                          value = mapArray(value, function (v) {
                              return _this2.toItem(v);
                          });
                      } else {
                          value = value.slice(0);
                      }
                      this._data[property.key] = this._data[property.key].concat(value);
                  } else {
                      if ('item' === property.type) {
                          value = this.toItem(value);
                      }
                      this._data[property.key].push(value);
                  }
              }
          }
      }, {
          key: 'removeFrom',
          value: function removeFrom(property, value) {
              if (value === null || value === undefined) return;
              if (property.multi) {

                  var isObj = 'object' === property.type;
                  var current = this.get(property);
                  if (!current) return;

                  if (typeof value.push !== 'undefined') {

                      // this._data[property.key] = current.concat(value);
                      for (var i = 0; i < value.length; ++i) {
                          if (isObj) {
                              current = this.removeObject(value, current);
                          } else {
                              current = this.removeValue(value, current);
                          }
                      }
                      this._data[property.key] = current;
                  } else {

                      if (isObj) {
                          current = this.removeObject(value, current);
                      } else {
                          current = this.removeValue(value, current);
                      }
                      this._data[property.key] = current;
                  }
              }
          }
      }, {
          key: 'addObject',
          value: function addObject(value, arr) {
              if (!value) return;
              arr = arr || [];
              arr.push(value);
              return arr;
          }
      }, {
          key: 'removeObject',
          value: function removeObject(value, arr) {
              if (!value || !value.id && !value.uri) return;
              var k = value.id ? 'id' : 'uri';
              arr = arr || [];
              var idx = -1;
              arr.each(function (p, i) {
                  if (p[k] === value[k]) idx = i;
              });
              if (idx >= 0) {
                  arr.splice(idx, 1);
              }
              return arr;
          }
      }, {
          key: 'addValue',
          value: function addValue(value, arr) {
              if (!value) return;
              arr = arr || [];
              arr.push(value);
              return arr;
          }
      }, {
          key: 'removeValue',
          value: function removeValue(value, arr) {
              if (!value) return;
              arr = arr || [];
              var idx = arr.indexOf(value);
              if (idx >= 0) {
                  arr.splice(idx, 1);
              }
              return arr;
          }
      }, {
          key: 'default',
          value: function _default(property, value) {
              var current = this.get(property);
              if (current === null || current === undefined) this.set(property, value);
          }
      }, {
          key: 'toItem',
          value: function toItem(obj) {
              // console.log(" ");
              if (!obj) {
                  // console.log(`Item[${this._data.type}].toItem() - Value is null`);
                  return null;
              }

              var itemFactory = this.getFactory();
              if (itemFactory) {
                  // console.log(`Item[${this._data.type}].toItem() - INPUT: ${JSON.stringify(obj)}`);
                  var result = itemFactory(obj);
                  // console.log(`Item[${this._data.type}].toItem() - ITEMIZED: ${JSON.stringify(result)}`);
                  return result;
              } else {
                  console.log('WARN: Item[' + this._data.type + '].toItem() - No Factory!');
                  return JSON.parse(JSON.stringify(obj));
              }
          }
      }, {
          key: 'getFactory',
          value: function getFactory() {
              return factory;
          }

          /**
           * @param {ItemProperty} property - property to be written to output JSON object
           * @param {any} value - value associated with the property
           * @param {Object} parentJson - parent object to write the property's value to
           */

      }, {
          key: 'propertyToJson',
          value: function propertyToJson(property, value, parentJson) {

              if (value !== null && value !== undefined) {

                  var isItem = 'item' === property.type;
                  var isMulti = property.multi;
                  var result = null;

                  if (isMulti && isItem) {
                      result = value.map(function (v) {
                          return v.toJson();
                      });
                  } else if (isMulti) {
                      result = value.slice(0);
                  } else if (isItem) {
                      result = value.toJson();
                  } else {
                      result = value;
                  }

                  parentJson[property.key] = result;
              }
          }
      }]);
      return BaseModel;
  }();

  /**
   * Item
   * base class for GeoPlatform objects
   */

  var ItemModel = function (_BaseModel) {
      inherits(ItemModel, _BaseModel);

      function ItemModel(data) {
          classCallCheck(this, ItemModel);

          var _this = possibleConstructorReturn(this, (ItemModel.__proto__ || Object.getPrototypeOf(ItemModel)).call(this));

          if (data) {

              // console.log(' ');
              // console.log('-------------------------------');
              // console.log('Item() - initializing using ' + JSON.stringify(data));

              for (var p in ItemProperties) {
                  var property = ItemProperties[p];
                  var key = property.key;
                  var value = data[key];
                  if (value !== null && value !== undefined) {
                      _this.set(property, value);
                  }
              }
              // console.log('-------------------------------');
              // console.log(' ');
          }

          _this.default(ItemProperties.KEYWORDS, []);
          _this.default(ItemProperties.IDENTIFIERS, []);
          _this.default(ItemProperties.ALTERNATE_TITLES, []);
          _this.default(ItemProperties.THEMES, []);
          _this.default(ItemProperties.CONTACTS, []);
          _this.default(ItemProperties.PUBLISHERS, []);
          _this.default(ItemProperties.CONTRIBUTORS, []);
          _this.default(ItemProperties.RESOURCE_TYPES, []);
          return _this;
      }

      createClass(ItemModel, [{
          key: 'getId',
          value: function getId() {
              return this.get(ItemProperties.ID);
          }
      }, {
          key: 'getType',
          value: function getType() {
              return this.get(ItemProperties.TYPE);
          }
      }, {
          key: 'getCreated',
          value: function getCreated() {
              return this.get(ItemProperties.CREATED);
          }
      }, {
          key: 'getModified',
          value: function getModified() {
              return this.get(ItemProperties.MODIFIED);
          }
      }, {
          key: 'getLastModifiedBy',
          value: function getLastModifiedBy() {
              return this.get(ItemProperties.LAST_MODIFIED_BY);
          }

          //-----------------------------------------------------------

      }, {
          key: 'uri',
          value: function uri(value) {
              this.setUri(value);return this;
          }
      }, {
          key: 'getUri',
          value: function getUri() {
              return this.get(ItemProperties.URI);
          }
      }, {
          key: 'setUri',
          value: function setUri(value) {
              this.set(ItemProperties.URI, value);
          }

          //-----------------------------------------------------------

      }, {
          key: 'identifiers',
          value: function identifiers(value) {
              this.setIdentifiers(value);return this;
          }
      }, {
          key: 'getIdentifiers',
          value: function getIdentifiers() {
              return this.get(ItemProperties.IDENTIFIERS);
          }
      }, {
          key: 'setIdentifiers',
          value: function setIdentifiers(value) {
              this.set(ItemProperties.IDENTIFIERS, value);
          }
      }, {
          key: 'addIdentifier',
          value: function addIdentifier(value) {
              this.addTo(ItemProperties.IDENTIFIERS, value);
          }
      }, {
          key: 'removeIdentifier',
          value: function removeIdentifier(value) {
              this.removeFrom(ItemProperties.IDENTIFIERS, value);
          }

          //-----------------------------------------------------------

      }, {
          key: 'alternateTitles',
          value: function alternateTitles(value) {
              this.setAlternateTitles(value);return this;
          }
      }, {
          key: 'getAlternateTitles',
          value: function getAlternateTitles() {
              return this.get(ItemProperties.ALTERNATE_TITLES);
          }
      }, {
          key: 'setAlternateTitles',
          value: function setAlternateTitles(value) {
              this.set(ItemProperties.ALTERNATE_TITLES, value);
          }
      }, {
          key: 'addAlternateTitle',
          value: function addAlternateTitle(value) {
              this.addTo(ItemProperties.ALTERNATE_TITLES, value);
          }
      }, {
          key: 'removeAlternateTitle',
          value: function removeAlternateTitle(value) {
              this.removeFrom(ItemProperties.ALTERNATE_TITLES, value);
          }

          //-----------------------------------------------------------

      }, {
          key: 'createdBy',
          value: function createdBy(value) {
              this.setCreatedBy(value);return this;
          }
      }, {
          key: 'getCreatedBy',
          value: function getCreatedBy() {
              return this.get(ItemProperties.CREATED_BY);
          }
      }, {
          key: 'setCreatedBy',
          value: function setCreatedBy(value) {
              this.set(ItemProperties.CREATED_BY, value);
          }

          //-----------------------------------------------------------

      }, {
          key: 'label',
          value: function label(value) {
              this.setLabel(value);return this;
          }
      }, {
          key: 'getLabel',
          value: function getLabel() {
              return this.get(ItemProperties.LABEL);
          }
      }, {
          key: 'setLabel',
          value: function setLabel(value) {
              this.set(ItemProperties.LABEL, value);
          }

          //-----------------------------------------------------------

      }, {
          key: 'description',
          value: function description(value) {
              this.setDescription(value);return this;
          }
      }, {
          key: 'getDescription',
          value: function getDescription() {
              return this.get(ItemProperties.DESCRIPTION);
          }
      }, {
          key: 'setDescription',
          value: function setDescription(value) {
              this.set(ItemProperties.DESCRIPTION, value);
          }

          //-----------------------------------------------------------

      }, {
          key: 'keywords',
          value: function keywords(value) {
              this.setKeywords(value);return this;
          }
      }, {
          key: 'getKeywords',
          value: function getKeywords() {
              return this.get(ItemProperties.KEYWORDS);
          }
      }, {
          key: 'setKeywords',
          value: function setKeywords(value) {
              this.set(ItemProperties.KEYWORDS, value);
          }

          //-----------------------------------------------------------

      }, {
          key: 'landingPage',
          value: function landingPage(value) {
              this.setLandingPage(value);return this;
          }
      }, {
          key: 'getLandingPage',
          value: function getLandingPage() {
              return this.get(ItemProperties.LANDING_PAGE);
          }
      }, {
          key: 'setLandingPage',
          value: function setLandingPage(value) {
              this.set(ItemProperties.LANDING_PAGE, value);
          }

          //-----------------------------------------------------------

      }, {
          key: 'status',
          value: function status(value) {
              this.setStatus(value);return this;
          }
      }, {
          key: 'getStatus',
          value: function getStatus() {
              return this.get(ItemProperties.STATUS);
          }
      }, {
          key: 'setStatus',
          value: function setStatus(value) {
              this.set(ItemProperties.STATUS, value);
          }

          //-----------------------------------------------------------

      }, {
          key: 'visibility',
          value: function visibility(value) {
              this.setVisibility(value);return this;
          }
      }, {
          key: 'getVisibility',
          value: function getVisibility() {
              return this.get(ItemProperties.VISIBILITY);
          }
      }, {
          key: 'setVisibility',
          value: function setVisibility(value) {
              this.set(ItemProperties.VISIBILITY, value === true);
          }

          //-----------------------------------------------------------

      }, {
          key: 'themes',
          value: function themes(value) {
              this.setThemes(value);return this;
          }
      }, {
          key: 'getThemes',
          value: function getThemes() {
              return this.get(ItemProperties.THEMES);
          }
      }, {
          key: 'setThemes',
          value: function setThemes(value) {
              this.set(ItemProperties.THEMES, value);
          }
      }, {
          key: 'addTheme',
          value: function addTheme(value) {
              this.addTo(ItemProperties.THEMES, value);
          }
      }, {
          key: 'removeTheme',
          value: function removeTheme(value) {
              this.removeFrom(ItemProperties.THEMES, value);
          }

          //-----------------------------------------------------------

      }, {
          key: 'publishers',
          value: function publishers(value) {
              this.setPublishers(value);return this;
          }
      }, {
          key: 'getPublishers',
          value: function getPublishers() {
              return this.get(ItemProperties.PUBLISHERS);
          }
      }, {
          key: 'setPublishers',
          value: function setPublishers(value) {
              this.set(ItemProperties.PUBLISHERS, value);
          }
      }, {
          key: 'addPublisher',
          value: function addPublisher(value) {
              this.addTo(ItemProperties.PUBLISHERS, value);
          }
      }, {
          key: 'removePublisher',
          value: function removePublisher(value) {
              this.removeFrom(ItemProperties.PUBLISHERS, value);
          }

          //-----------------------------------------------------------

      }, {
          key: 'contacts',
          value: function contacts(value) {
              this.setContacts(value);return this;
          }
      }, {
          key: 'getContacts',
          value: function getContacts() {
              return this.get(ItemProperties.CONTACTS);
          }
      }, {
          key: 'setContacts',
          value: function setContacts(value) {
              this.set(ItemProperties.CONTACTS, value);
          }
      }, {
          key: 'addContact',
          value: function addContact(value) {
              this.addTo(ItemProperties.CONTACTS, value);
          }
      }, {
          key: 'removeContact',
          value: function removeContact(value) {
              this.removeFrom(ItemProperties.CONTACTS, value);
          }

          //-----------------------------------------------------------

      }, {
          key: 'contributors',
          value: function contributors(value) {
              this.setContributors(value);return this;
          }
      }, {
          key: 'getContributors',
          value: function getContributors() {
              return this.get(ItemProperties.CONTRIBUTORS);
          }
      }, {
          key: 'setContributors',
          value: function setContributors(value) {
              this.set(ItemProperties.CONTRIBUTORS, value);
          }
      }, {
          key: 'addContributor',
          value: function addContributor(value) {
              this.addTo(ItemProperties.CONTRIBUTORS, value);
          }
      }, {
          key: 'removeContributor',
          value: function removeContributor(value) {
              this.removeFrom(ItemProperties.CONTRIBUTORS, value);
          }

          //-----------------------------------------------------------

      }, {
          key: 'resourceTypes',
          value: function resourceTypes(value) {
              this.setResourceTypes(value);return this;
          }
      }, {
          key: 'getResourceTypes',
          value: function getResourceTypes() {
              return this.get(ItemProperties.RESOURCE_TYPES);
          }
      }, {
          key: 'setResourceTypes',
          value: function setResourceTypes(value) {
              this.set(ItemProperties.RESOURCE_TYPES, value);
          }
      }, {
          key: 'addResourceType',
          value: function addResourceType(value) {
              this.addTo(ItemProperties.RESOURCE_TYPES, value);
          }
      }, {
          key: 'removeResourceType',
          value: function removeResourceType(value) {
              this.removeFrom(ItemProperties.RESOURCE_TYPES, value);
          }

          //-----------------------------------------------------------

      }, {
          key: 'distributions',
          value: function distributions(value) {
              this.setDistributions(value);return this;
          }
      }, {
          key: 'getDistributions',
          value: function getDistributions() {
              return this.get(ItemProperties.DISTRIBUTIONS);
          }
      }, {
          key: 'setDistributions',
          value: function setDistributions(value) {
              this.set(ItemProperties.DISTRIBUTIONS, value);
          }
      }, {
          key: 'addDistribution',
          value: function addDistribution(value) {
              this.addTo(ItemProperties.DISTRIBUTIONS, value);
          }
      }, {
          key: 'removeDistribution',
          value: function removeDistribution(value) {
              this.removeFrom(ItemProperties.DISTRIBUTIONS, value);
          }

          //-----------------------------------------------------------

      }, {
          key: 'classifiers',
          value: function classifiers(value) {
              this.setClassifiers(value);return this;
          }
      }, {
          key: 'getClassifiers',
          value: function getClassifiers() {
              return this.get(ItemProperties.CLASSIFIERS);
          }
      }, {
          key: 'setClassifiers',
          value: function setClassifiers(value) {
              if (!value || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
                  this.set(ItemProperties.CLASSIFIERS, {});
              } else {
                  this.set(ItemProperties.CLASSIFIERS, value);
              }
          }

          //-----------------------------------------------------------

          /**
           * @return {boolean} true if the required fields are provided
           */

      }, {
          key: 'isValid',
          value: function isValid() {
              return this.getType() && this.getLabel();
          }

          //-----------------------------------------------------------


      }, {
          key: 'toJson',
          value: function toJson() {
              var result = {};
              for (var p in ItemProperties) {
                  var property = ItemProperties[p];
                  var value = this.get(property);
                  this.propertyToJson(property, value, result);
              }
              return result;
          }
      }]);
      return ItemModel;
  }(BaseModel);

  var DatasetModel = function (_ItemModel) {
      inherits(DatasetModel, _ItemModel);

      function DatasetModel(data) {
          classCallCheck(this, DatasetModel);

          var _this = possibleConstructorReturn(this, (DatasetModel.__proto__ || Object.getPrototypeOf(DatasetModel)).call(this, data));

          _this.set(ItemProperties.TYPE, ItemTypes.DATASET);
          _this.default(ItemProperties.SERVICES, []);
          return _this;
      }

      //-----------------------------------------------------------

      createClass(DatasetModel, [{
          key: 'services',
          value: function services(value) {
              this.setServices(value);return this;
          }
      }, {
          key: 'getServices',
          value: function getServices() {
              return this.get(ItemProperties.SERVICES);
          }
      }, {
          key: 'setServices',
          value: function setServices(value) {
              this.set(ItemProperties.SERVICES, value);
          }
      }, {
          key: 'addService',
          value: function addService(value) {
              this.addTo(ItemProperties.SERVICES, value);
          }
      }, {
          key: 'removeService',
          value: function removeService(value) {
              this.removeFrom(ItemProperties.SERVICES, value);
          }

          //-----------------------------------------------------------


      }]);
      return DatasetModel;
  }(ItemModel);

  var ServiceModel = function (_ItemModel) {
      inherits(ServiceModel, _ItemModel);

      function ServiceModel(data) {
          classCallCheck(this, ServiceModel);

          var _this = possibleConstructorReturn(this, (ServiceModel.__proto__ || Object.getPrototypeOf(ServiceModel)).call(this, data));

          _this.set(ItemProperties.TYPE, ItemTypes.SERVICE);
          _this.default(ItemProperties.DATASETS, []);
          return _this;
      }

      //-----------------------------------------------------------

      createClass(ServiceModel, [{
          key: 'href',
          value: function href(value) {
              this.setHref(value);return this;
          }
      }, {
          key: 'getHref',
          value: function getHref() {
              return this.get(ItemProperties.HREF);
          }
      }, {
          key: 'setHref',
          value: function setHref(value) {
              this.set(ItemProperties.HREF, value);
          }

          //-----------------------------------------------------------

      }, {
          key: 'serviceType',
          value: function serviceType(value) {
              this.setServiceType(value);return this;
          }
      }, {
          key: 'getServiceType',
          value: function getServiceType() {
              return this.get(ItemProperties.SERVICE_TYPE);
          }
      }, {
          key: 'setServiceType',
          value: function setServiceType(value) {
              this.set(ItemProperties.SERVICE_TYPE, value);
          }

          //-----------------------------------------------------------

      }, {
          key: 'datasets',
          value: function datasets(value) {
              this.setDatasets(value);return this;
          }
      }, {
          key: 'getDatasets',
          value: function getDatasets() {
              return this.get(ItemProperties.DATASETS);
          }
      }, {
          key: 'setDatasets',
          value: function setDatasets(value) {
              this.set(ItemProperties.DATASETS, value);
          }
      }, {
          key: 'addDataset',
          value: function addDataset(value) {
              this.addTo(ItemProperties.DATASETS, value);
          }
      }, {
          key: 'removeDataset',
          value: function removeDataset(value) {
              this.removeFrom(ItemProperties.DATASETS, value);
          }

          //-----------------------------------------------------------


      }]);
      return ServiceModel;
  }(ItemModel);

  var LayerModel = function (_ItemModel) {
      inherits(LayerModel, _ItemModel);

      function LayerModel(data) {
          classCallCheck(this, LayerModel);

          var _this = possibleConstructorReturn(this, (LayerModel.__proto__ || Object.getPrototypeOf(LayerModel)).call(this, data));

          _this.set(ItemProperties.TYPE, ItemTypes.LAYER);
          _this.default(ItemProperties.SERVICES, []);
          return _this;
      }

      //-----------------------------------------------------------

      createClass(LayerModel, [{
          key: 'layerType',
          value: function layerType(value) {
              this.setLayerType(value);return this;
          }
      }, {
          key: 'getLayerType',
          value: function getLayerType() {
              return this.get(ItemProperties.LAYER_TYPE);
          }
      }, {
          key: 'setLayerType',
          value: function setLayerType(value) {
              this.set(ItemProperties.LAYER_TYPE, value);
          }

          //-----------------------------------------------------------

      }, {
          key: 'layerName',
          value: function layerName(value) {
              this.setLayerName(value);return this;
          }
      }, {
          key: 'getLayerName',
          value: function getLayerName() {
              return this.get(ItemProperties.LAYER_NAME);
          }
      }, {
          key: 'setLayerName',
          value: function setLayerName(value) {
              this.set(ItemProperties.LAYER_NAME, value);
          }

          //-----------------------------------------------------------

      }, {
          key: 'legend',
          value: function legend(value) {
              this.setLegend(value);return this;
          }
      }, {
          key: 'getLegend',
          value: function getLegend() {
              return this.get(ItemProperties.LEGEND);
          }
      }, {
          key: 'setLegend',
          value: function setLegend(value) {
              this.set(ItemProperties.LEGEND, value);
          }

          //-----------------------------------------------------------

      }, {
          key: 'services',
          value: function services(value) {
              this.setServices(value);return this;
          }
      }, {
          key: 'getServices',
          value: function getServices() {
              return this.get(ItemProperties.SERVICES);
          }
      }, {
          key: 'setServices',
          value: function setServices(value) {
              this.set(ItemProperties.SERVICES, value);
          }
      }, {
          key: 'addService',
          value: function addService(value) {
              this.addTo(ItemProperties.SERVICES, value);
          }
      }, {
          key: 'removeService',
          value: function removeService(value) {
              this.removeFrom(ItemProperties.SERVICES, value);
          }

          //-----------------------------------------------------------

      }]);
      return LayerModel;
  }(ItemModel);

  var LayerStateProperties = {
      LAYER_ID: { key: "layer_id" },
      LAYER: { key: "layer" },
      OPACITY: { key: "opacity" },
      VISIBILITY: { key: "visibility" }
  };

  var MapModel = function (_ItemModel) {
      inherits(MapModel, _ItemModel);

      function MapModel(data) {
          classCallCheck(this, MapModel);

          //manually re-set the overlays because each objectc
          // has a nested Item (layer) which needs to be item-ized
          // and the initializer used in the constructor isn't tied
          // to any specific instance's logic.
          var _this = possibleConstructorReturn(this, (MapModel.__proto__ || Object.getPrototypeOf(MapModel)).call(this, data));

          var layers = _this.getLayers();
          if (layers) {
              _this.setLayers(layers);
          }

          _this.set(ItemProperties.TYPE, ItemTypes.MAP);
          _this.default(ItemProperties.MAP_LAYERS, []);
          return _this;
      }

      //-----------------------------------------------------------

      createClass(MapModel, [{
          key: 'thumbnail',
          value: function thumbnail(value) {
              this.setThumbnail(value);return this;
          }
      }, {
          key: 'getThumbnail',
          value: function getThumbnail() {
              return this.get(ItemProperties.THUMBNAIL);
          }
      }, {
          key: 'setThumbnail',
          value: function setThumbnail(value) {
              this.set(ItemProperties.THUMBNAIL, value);
          }

          //-----------------------------------------------------------

      }, {
          key: 'baseLayer',
          value: function baseLayer(value) {
              this.setBaseLayer(value);return this;
          }
      }, {
          key: 'getBaseLayer',
          value: function getBaseLayer() {
              return this.get(ItemProperties.BASE_LAYER);
          }
      }, {
          key: 'setBaseLayer',
          value: function setBaseLayer(value) {
              this.set(ItemProperties.BASE_LAYER, value);
          }

          //-----------------------------------------------------------

      }, {
          key: 'layers',
          value: function layers(value) {
              this.setLayers(value);return this;
          }
      }, {
          key: 'getLayers',
          value: function getLayers() {
              return this.get(ItemProperties.MAP_LAYERS);
          }
      }, {
          key: 'setLayers',
          value: function setLayers(value) {
              var _this2 = this;

              var states = [];
              if (value) {
                  if (typeof value.push === 'undefined') {
                      value = [value];
                  }
                  states = value.map(function (v) {
                      return _this2.toLayerState(v);
                  });
              }
              this.set(ItemProperties.MAP_LAYERS, states);
          }
      }, {
          key: 'addLayer',
          value: function addLayer(value) {
              if (!value) return;
              var state = this.toLayerState(value);
              this.addTo(ItemProperties.MAP_LAYERS, state);
          }
      }, {
          key: 'removeLayer',
          value: function removeLayer(value) {
              if (!value) return;
              //get id of layer to be removed
              var layerId = value.id;
              if (!layerId && value.layer) {
                  layerId = value.layer.id;
              }
              if (!layerId) return; //can't remove unpersisted layers
              //filter out selected layer from current layers and update
              var layers = this.getLayers().filter(function (ls) {
                  return ls.layer.id !== layerId;
              });
              this.set(ItemProperties.MAP_LAYERS, layers);
          }

          //-----------------------------------------------------------

      }, {
          key: 'annotations',
          value: function annotations(value) {
              this.setAnnotations(value);return this;
          }
      }, {
          key: 'getAnnotations',
          value: function getAnnotations() {
              return this.get(ItemProperties.ANNOTATIONS);
          }
      }, {
          key: 'setAnnotations',
          value: function setAnnotations(value) {
              this.set(ItemProperties.ANNOTATIONS, value);
          }

          //-----------------------------------------------------------


          /*
           * In order to properly handle Layers nested within plain PoJSos
           * @override ItemModel.propertyToJson
           */

      }, {
          key: 'propertyToJson',
          value: function propertyToJson(property, value, parentJson) {
              var _this3 = this;

              if (property === ItemProperties.MAP_LAYERS && value && value.length) {
                  var json = value.map(function (v) {
                      return _this3.fromLayerState(v);
                  });
                  parentJson[property.key] = json;
              } else {
                  get(MapModel.prototype.__proto__ || Object.getPrototypeOf(MapModel.prototype), 'propertyToJson', this).call(this, property, value, parentJson);
              }
          }

          /**
           * @param {Object} object
           * @return {Object} layer state representation of the input
           */

      }, {
          key: 'toLayerState',
          value: function toLayerState(object) {
              if (!object) {
                  // console.log("MapModel.toLayerState() - input was null");
                  return null;
              }

              var result = {};

              if (object.layer) {
                  // console.log("MapModel.toLayerState() - input was already a state");
                  var layer = this.toItem(object.layer);
                  if (!layer) return null;
                  result[LayerStateProperties.LAYER.key] = layer;
                  result[LayerStateProperties.LAYER_ID.key] = layer.getId() || object.layer_id;
                  result[LayerStateProperties.OPACITY.key] = object.opacity || 1.0;
                  result[LayerStateProperties.VISIBILITY.key] = object.visibility !== undefined ? object.visibility : true;
              } else if (!object.layer) {
                  // console.log("MapModel.toLayerState() - input was a layer");
                  var _layer = this.toItem(object);
                  if (!_layer) return null;
                  result[LayerStateProperties.LAYER.key] = _layer;
                  result[LayerStateProperties.LAYER_ID.key] = _layer.getId();
                  result[LayerStateProperties.OPACITY.key] = 1.0;
                  result[LayerStateProperties.VISIBILITY.key] = true;
              }

              return result;
          }

          /**
           * @param {Object} state -
           * @return {Object} JSON representation
           */

      }, {
          key: 'fromLayerState',
          value: function fromLayerState(state) {
              var result = {};
              for (var p in state) {
                  var value = state[p];
                  if (LayerStateProperties.LAYER.key === p) {
                      value = value.toJson();
                  }
                  result[p] = value;
              }
              return result;
          }
      }]);
      return MapModel;
  }(ItemModel);

  var GalleryItemProperties = {
      ASSET_ID: { key: "assetId" },
      ASSET: { key: "asset" },
      ASSET_TYPE: { key: "assetType" }
  };

  /**
   * Gallery
   */

  var GalleryModel = function (_ItemModel) {
      inherits(GalleryModel, _ItemModel);

      function GalleryModel(data) {
          classCallCheck(this, GalleryModel);

          //manually re-set the overlays because each objectc
          // has a nested Item (layer) which needs to be item-ized
          // and the initializer used in the constructor isn't tied
          // to any specific instance's logic.
          var _this = possibleConstructorReturn(this, (GalleryModel.__proto__ || Object.getPrototypeOf(GalleryModel)).call(this, data));

          var items = _this.getItems();
          if (items) {
              _this.setItems(items);
          }

          _this.set(ItemProperties.TYPE, ItemTypes.GALLERY);
          _this.default(ItemProperties.GALLERY_ITEMS, []);
          return _this;
      }

      //-----------------------------------------------------------

      createClass(GalleryModel, [{
          key: 'items',
          value: function items(value) {
              this.setItems(value);return this;
          }
      }, {
          key: 'getItems',
          value: function getItems() {
              return this.get(ItemProperties.GALLERY_ITEMS);
          }
      }, {
          key: 'setItems',
          value: function setItems(value) {
              var _this2 = this;

              var items = [];
              //ensure that items being set contain Item-ized assets
              if (value) {
                  if (typeof value.push === 'undefined') {
                      value = [value];
                  }
                  items = value.map(function (v) {
                      return _this2.toGalleryItem(v);
                  });
              }
              this.set(ItemProperties.GALLERY_ITEMS, items);
          }
      }, {
          key: 'addItem',
          value: function addItem(value) {
              if (!value) return;
              var item = this.toGalleryItem(value);
              this.addTo(ItemProperties.GALLERY_ITEMS, item);
          }
      }, {
          key: 'removeItem',
          value: function removeItem(value) {
              if (!value || typeof value.toJson === 'undefined') return;
              var items = this.getItems().filter(function (i) {
                  return i.assetId !== value.getId();
              });
              this.setItems(items);
          }
      }, {
          key: 'reorderItem',
          value: function reorderItem(value, newPosition) {
              var idx = -1;
              var arr = this.getItems();
              arr.each(function (p, i) {
                  if (p.id === value.id) idx = i;
              });
              if (idx < 0) return;
              arr.splice(idx, 1);
              arr.splice(idx, 0, value);
              this.setItems(arr);
          }

          //-----------------------------------------------------------

          /*
           * In order to properly handle Items nested within plain PoJSos
           * @override ItemModel.propertyToJson
           */

      }, {
          key: 'propertyToJson',
          value: function propertyToJson(property, value, parentJson) {
              var _this3 = this;

              if (property === ItemProperties.GALLERY_ITEMS && value && value.length) {
                  var json = value.map(function (v) {
                      return _this3.fromGalleryItem(v);
                  }).filter(function (v) {
                      return v !== null;
                  });
                  parentJson[property.key] = json;
              } else {
                  get(GalleryModel.prototype.__proto__ || Object.getPrototypeOf(GalleryModel.prototype), 'propertyToJson', this).call(this, property, value, parentJson);
              }
          }
      }, {
          key: 'toGalleryItem',
          value: function toGalleryItem(object) {
              if (!object) return null;

              var result = {};

              if (object.asset) {
                  // console.log("GalleryModel.toGalleryItem() - input was already an item");
                  var asset = this.toItem(object.asset);
                  if (!asset) return null;
                  result[GalleryItemProperties.ASSET.key] = asset;
                  result[GalleryItemProperties.ASSET_ID.key] = asset.getId() || object[GalleryItemProperties.ASSET_ID.key];
                  result[GalleryItemProperties.ASSET_TYPE.key] = asset.getType() || object[GalleryItemProperties.ASSET_TYPE.key];
              } else {
                  // console.log("GalleryModel.toGalleryItem() - input was an asset");
                  var _asset = this.toItem(object);
                  if (!_asset) return null;
                  result[GalleryItemProperties.ASSET.key] = _asset;
                  result[GalleryItemProperties.ASSET_ID.key] = _asset.getId();
                  result[GalleryItemProperties.ASSET_TYPE.key] = _asset.getType();
              }

              return result;
          }
      }, {
          key: 'fromGalleryItem',
          value: function fromGalleryItem(item) {
              var result = {};
              for (var p in item) {
                  var value = item[p];
                  if (GalleryItemProperties.ASSET.key === p) {
                      value = value.toJson();
                  }
                  result[p] = value;
              }
              return result;
          }
      }]);
      return GalleryModel;
  }(ItemModel);

  var CommunityModel = function (_ItemModel) {
      inherits(CommunityModel, _ItemModel);

      function CommunityModel(data) {
          classCallCheck(this, CommunityModel);

          var _this = possibleConstructorReturn(this, (CommunityModel.__proto__ || Object.getPrototypeOf(CommunityModel)).call(this, data));

          _this.set(ItemProperties.TYPE, ItemTypes.COMMUNITY);
          return _this;
      }

      //-----------------------------------------------------------


      //-----------------------------------------------------------


      return CommunityModel;
  }(ItemModel);

  var ADDRESS_STREET = 'street';
  var ADDRESS_CITY = 'city';
  var ADDRESS_STATE = 'state';
  var ADDRESS_ZIP = 'zip';
  var ADDRESS_COUNTRY = 'country';

  var ContactModel = function (_ItemModel) {
      inherits(ContactModel, _ItemModel);

      function ContactModel(data) {
          classCallCheck(this, ContactModel);

          var _this = possibleConstructorReturn(this, (ContactModel.__proto__ || Object.getPrototypeOf(ContactModel)).call(this, data));

          _this.set(ItemProperties.TYPE, ItemTypes.CONTACT);
          return _this;
      }

      //-----------------------------------------------------------

      createClass(ContactModel, [{
          key: 'fullName',
          value: function fullName(value) {
              this.setFullName(value);return this;
          }
      }, {
          key: 'getFullName',
          value: function getFullName() {
              return this.get(ItemProperties.FULL_NAME);
          }
      }, {
          key: 'setFullName',
          value: function setFullName(value) {
              this.set(ItemProperties.FULL_NAME, value);
          }

          //-----------------------------------------------------------

      }, {
          key: 'orgName',
          value: function orgName(value) {
              this.setOrgName(value);return this;
          }
      }, {
          key: 'getOrgName',
          value: function getOrgName() {
              return this.get(ItemProperties.ORGANIZATION_NAME);
          }
      }, {
          key: 'setOrgName',
          value: function setOrgName(value) {
              this.set(ItemProperties.ORGANIZATION_NAME, value);
          }

          //-----------------------------------------------------------

      }, {
          key: 'position',
          value: function position(value) {
              this.setPosition(value);return this;
          }
      }, {
          key: 'getPosition',
          value: function getPosition() {
              return this.get(ItemProperties.POSITION_TITLE);
          }
      }, {
          key: 'setPosition',
          value: function setPosition(value) {
              this.set(ItemProperties.POSITION_TITLE, value);
          }

          //-----------------------------------------------------------

      }, {
          key: 'email',
          value: function email(value) {
              this.setEmail(value);return this;
          }
      }, {
          key: 'getEmail',
          value: function getEmail() {
              return this.get(ItemProperties.EMAIL);
          }
      }, {
          key: 'setEmail',
          value: function setEmail(value) {
              this.set(ItemProperties.EMAIL, value);
          }

          //-----------------------------------------------------------

      }, {
          key: 'phone',
          value: function phone(value) {
              this.setPhone(value);return this;
          }
      }, {
          key: 'getPhone',
          value: function getPhone() {
              return this.get(ItemProperties.TELEPHONE);
          }
      }, {
          key: 'setPhone',
          value: function setPhone(value) {
              this.set(ItemProperties.TELEPHONE, value);
          }

          //-----------------------------------------------------------

      }, {
          key: 'address',
          value: function address(value) {
              this.setAddress(value);return this;
          }
      }, {
          key: 'getAddress',
          value: function getAddress() {
              return this.get(ItemProperties.ADDRESS);
          }
      }, {
          key: 'setAddress',
          value: function setAddress(value) {
              this.set(ItemProperties.ADDRESS, value);
          }

          //-----------------------------------------------------------

      }, {
          key: 'street',
          value: function street(value) {
              this.setStreet(value);return this;
          }
      }, {
          key: 'getStreet',
          value: function getStreet() {
              var address = this.getAddress();
              return address ? address[ADDRESS_STREET] : null;
          }
      }, {
          key: 'setStreet',
          value: function setStreet(value) {
              var address = this.getAddress() || {};
              address[ADDRESS_STREET] = value;
              this.setAddress(address);
          }

          //-----------------------------------------------------------

      }, {
          key: 'city',
          value: function city(value) {
              this.setCity(value);return this;
          }
      }, {
          key: 'getCity',
          value: function getCity() {
              var address = this.getAddress();
              return address ? address[ADDRESS_CITY] : null;
          }
      }, {
          key: 'setCity',
          value: function setCity(value) {
              var address = this.getAddress() || {};
              address[ADDRESS_CITY] = value;
              this.setAddress(address);
          }

          //-----------------------------------------------------------

      }, {
          key: 'state',
          value: function state(value) {
              this.setState(value);return this;
          }
      }, {
          key: 'getState',
          value: function getState() {
              var address = this.getAddress();
              return address ? address[ADDRESS_STATE] : null;
          }
      }, {
          key: 'setState',
          value: function setState(value) {
              var address = this.getAddress() || {};
              address[ADDRESS_STATE] = value;
              this.setAddress(address);
          }

          //-----------------------------------------------------------

      }, {
          key: 'zipCode',
          value: function zipCode(value) {
              this.setZipCode(value);return this;
          }
      }, {
          key: 'getZipCode',
          value: function getZipCode() {
              var address = this.getAddress();
              return address ? address[ADDRESS_ZIP] : null;
          }
      }, {
          key: 'setZipCode',
          value: function setZipCode(value) {
              var address = this.getAddress() || {};
              address[ADDRESS_ZIP] = value;
              this.setAddress(address);
          }

          //-----------------------------------------------------------

      }, {
          key: 'country',
          value: function country(value) {
              this.setCountry(value);return this;
          }
      }, {
          key: 'getCountry',
          value: function getCountry() {
              var address = this.getAddress();
              return address ? address[ADDRESS_COUNTRY] : null;
          }
      }, {
          key: 'setCountry',
          value: function setCountry(value) {
              var address = this.getAddress() || {};
              address[ADDRESS_COUNTRY] = value;
              this.setAddress(address);
          }

          //-----------------------------------------------------------

      }]);
      return ContactModel;
  }(ItemModel);

  var OrganizationModel = function (_ItemModel) {
      inherits(OrganizationModel, _ItemModel);

      function OrganizationModel(data) {
          classCallCheck(this, OrganizationModel);

          var _this = possibleConstructorReturn(this, (OrganizationModel.__proto__ || Object.getPrototypeOf(OrganizationModel)).call(this, data));

          _this.set(ItemProperties.TYPE, ItemTypes.ORGANIZATION);
          return _this;
      }

      //-----------------------------------------------------------

      createClass(OrganizationModel, [{
          key: 'name',
          value: function name(value) {
              this.setName(value);return this;
          }
      }, {
          key: 'getName',
          value: function getName() {
              return this.get(ItemProperties.NAME);
          }
      }, {
          key: 'setName',
          value: function setName(value) {
              this.set(ItemProperties.NAME, value);
          }

          //-----------------------------------------------------------

      }, {
          key: 'parentOrg',
          value: function parentOrg(value) {
              this.setParentOrganization(value);return this;
          }
      }, {
          key: 'getParentOrganization',
          value: function getParentOrganization() {
              return this.get(ItemProperties.PARENT_ORGANIZATION);
          }
      }, {
          key: 'setParentOrganization',
          value: function setParentOrganization(value) {
              this.set(ItemProperties.PARENT_ORGANIZATION, value);
          }

          //-----------------------------------------------------------


      }]);
      return OrganizationModel;
  }(ItemModel);

  var ConceptModel = function (_ItemModel) {
      inherits(ConceptModel, _ItemModel);

      function ConceptModel(data) {
          classCallCheck(this, ConceptModel);

          var _this = possibleConstructorReturn(this, (ConceptModel.__proto__ || Object.getPrototypeOf(ConceptModel)).call(this, data));

          _this.set(ItemProperties.TYPE, ItemTypes.CONCEPT);
          return _this;
      }

      //-----------------------------------------------------------

      createClass(ConceptModel, [{
          key: 'scheme',
          value: function scheme(value) {
              this.setScheme(value);return this;
          }
      }, {
          key: 'getScheme',
          value: function getScheme() {
              return this.get(ItemProperties.CONCEPT_SCHEME);
          }
      }, {
          key: 'setScheme',
          value: function setScheme(value) {
              this.set(ItemProperties.CONCEPT_SCHEME, value);
          }

          //-----------------------------------------------------------


      }]);
      return ConceptModel;
  }(ItemModel);

  var ConceptSchemeModel = function (_ItemModel) {
      inherits(ConceptSchemeModel, _ItemModel);

      function ConceptSchemeModel(data) {
          classCallCheck(this, ConceptSchemeModel);

          var _this = possibleConstructorReturn(this, (ConceptSchemeModel.__proto__ || Object.getPrototypeOf(ConceptSchemeModel)).call(this, data));

          _this.set(ItemProperties.TYPE, ItemTypes.CONCEPT_SCHEME);
          return _this;
      }

      //-----------------------------------------------------------


      //-----------------------------------------------------------


      return ConceptSchemeModel;
  }(ItemModel);

  function itemFactory(type, options) {
      var item = null;

      // console.log(" ");
      // console.log(`ItemFactory() - Creating ${type} Item`);
      // console.log(" using... " + JSON.stringify(options));
      // console.log("-------------------------------");

      try {

          switch (type) {
              case ItemTypes.DATASET:
                  item = new DatasetModel(options);break;
              case ItemTypes.SERVICE:
                  item = new ServiceModel(options);break;
              case ItemTypes.LAYER:
                  item = new LayerModel(options);break;
              case ItemTypes.MAP:
                  item = new MapModel(options);break;
              case ItemTypes.GALLERY:
                  item = new GalleryModel(options);break;
              case ItemTypes.COMMUNITY:
                  item = new CommunityModel(options);break;
              case ItemTypes.CONTACT:
                  item = new ContactModel(options);break;
              case ItemTypes.ORGANIZATION:
                  item = new OrganizationModel(options);break;
              case ItemTypes.CONCEPT:
                  item = new ConceptModel(options);break;
              case ItemTypes.CONCEPT_SCHEME:
                  item = new ConceptSchemeModel(options);break;
              default:
                  throw new Error('Unsupported item type \'' + type + '\'');
          }
      } catch (e) {
          console.log("ItemFactory.parse() - Error creating " + type + " using " + JSON.stringify(options) + " : " + e.message);
          throw new Error("ItemFactory.parse() - Error creating " + type + " using " + JSON.stringify(options) + " : " + e.message);
      }

      // console.log(`ItemFactory - done with ${item.getType()}`);
      // console.log(" ");
      return item;
  }

  function factory(arg) {

      // console.log("ItemFactory() - " + JSON.stringify(arg));

      var type = null,
          options = null;
      if (arg && typeof arg === 'string') type = arg;else if (arg && (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object') {

          if (typeof arg.toJson !== 'undefined') {
              // console.log(arg.getType() + " is already an Item");
              return arg; //already an Item instance
          }

          if (arg.type) type = arg.type;else throw new Error("ItemFactory() - Must specify 'type' in parameter object");

          options = arg;
      } else {
          throw new Error("Illegal argument; must be string type or object definition");
      }

      return itemFactory(type, options);
  }

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

  var ItemService = function (_BaseService) {
      inherits(ItemService, _BaseService);

      function ItemService(url, httpClient) {
          classCallCheck(this, ItemService);
          return possibleConstructorReturn(this, (ItemService.__proto__ || Object.getPrototypeOf(ItemService)).call(this, url, httpClient));
      }

      /**
       * @param {string} id - identifier of item to fetch
       * @param {Object} options - optional set of request options to apply to xhr request
       * @return {Promise} resolving Item object or an error
       */


      createClass(ItemService, [{
          key: 'get',
          value: function get$$1(id, options) {
              var _this2 = this;

              return Q.resolve(id).then(function (id) {
                  var opts = _this2.buildRequest({
                      method: "GET", url: _this2.baseUrl + '/' + id, options: options
                  });
                  return _this2.execute(opts);
              }).then(function (obj) {
                  return factory(obj);
              }).catch(function (e) {
                  return _this2._onError(e, 'ItemService.get() - Error fetching item ' + id);
              });
          }

          /**
           * @param {Object} itemObj - item to create or update
           * @param {Object} options - optional set of request options to apply to xhr request
           * @return {Promise} resolving Item object or an error
           */

      }, {
          key: 'save',
          value: function save(itemObj, options) {
              var _this3 = this;

              return Q.resolve(itemObj).then(function (item) {

                  if (item.toJson) {
                      //if passed an ItemModel instance, convert to JSON
                      item = item.toJson();
                  }

                  var method = 'POST',
                      url = _this3.baseUrl;
                  if (item.id) {
                      method = "PUT";
                      url += '/' + item.id;
                  }

                  var opts = _this3.buildRequest({ method: method, url: url, data: item, options: options });
                  return _this3.execute(opts);
              }).then(function (obj) {
                  return factory(obj);
              }).catch(function (e) {
                  return _this3._onError(e, 'ItemService.save() - Error saving item');
              });
          }

          /**
           * @param {string} id - identifier of item to delete
           * @param {Object} options - optional set of request options to apply to xhr request
           * @return {Promise} resolving true if successful or an error
           */

      }, {
          key: 'remove',
          value: function remove(id, options) {
              var _this4 = this;

              return Q.resolve(this.baseUrl + '/' + id).then(function (url) {
                  var opts = _this4.buildRequest({
                      method: "DELETE", url: url, options: options
                  });
                  return _this4.execute(opts);
              }).then(function (response) {
                  return true;
              }).catch(function (e) {
                  return _this4._onError(e, 'ItemService.remove() - Error deleting item ' + id);
              });
          }

          /**
           * @param {string} id - identifier of item to patch
           * @param {Object} patch - HTTP-PATCH compliant set of properties to patch
           * @param {Object} options - optional set of request options to apply to xhr request
           * @return {Promise} resolving Item object or an error
           */

      }, {
          key: 'patch',
          value: function patch(id, _patch, options) {
              var _this5 = this;

              return Q.resolve(this.baseUrl + '/' + id).then(function (url) {
                  var opts = _this5.buildRequest({
                      method: "PATCH", url: url, data: _patch, options: options
                  });
                  return _this5.execute(opts);
              }).then(function (obj) {
                  return factory(obj);
              }).catch(function (e) {
                  return _this5._onError(e, 'ItemService.patch() - Error patching item ' + id);
              });
          }

          /**
           * @param {Object} arg - either JS object of query parameters or GeoPlatform.Query instance
           * @param {Object} options - optional set of request options to apply to xhr request
           * @return {Promise} resolving search results
           */

      }, {
          key: 'search',
          value: function search(arg, options) {
              var _this6 = this;

              return Q.resolve(arg).then(function (params) {

                  if (params && typeof params.getQuery !== 'undefined') {
                      //if passed a GeoPlatform.Query object,
                      // convert to parameters object
                      params = params.getQuery();
                  }
                  var opts = _this6.buildRequest({
                      method: "GET", url: _this6.baseUrl, params: params, options: options
                  });
                  return _this6.execute(opts);
              }).catch(function (e) {
                  return _this6._onError(e, 'ItemService.search() - Error searching items');
              });
          }

          /**
           *
           * @param {string} arg - URL to metadata document or File to upload
           * @param {string} format - metadata format of specified document
           * @return {Promise} resolving GeoPlatform Item
           */

      }, {
          key: 'import',
          value: function _import(arg, format, options) {
              var _this7 = this;

              return Q.resolve(true).then(function () {
                  if (!arg || arg.indexOf('http') < 0) {
                      throw new Error("Must provide a valid URL or File");
                  }
                  var isFile = typeof arg !== 'string';
                  var ro = {
                      method: "POST",
                      url: _this7.apiBase + '/api/import',
                      processData: true, //for jQuery
                      formData: true, //for Node (RequestJS)
                      options: options
                  };
                  if (isFile) {
                      ro.file = arg;
                      ro.data = { format: format };
                  } else {
                      ro.formData = false; //prevent multi-part form/data encoding
                      ro.data = { url: arg, format: format };
                  }
                  var opts = _this7.buildRequest(ro);
                  return _this7.execute(opts);
              }).catch(function (e) {
                  var err = new Error('ItemService.import() - Error importing item: ' + e.message);
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
          key: 'export',
          value: function _export(id, format, options) {
              var _this8 = this;

              return Q.resolve(true).then(function () {
                  var url = _this8.baseUrl + '/' + id + '/export';
                  var opts = _this8.buildRequest({
                      method: "GET", url: url,
                      params: { format: format },
                      json: false,
                      options: options
                  });
                  return _this8.execute(opts);
              }).catch(function (e) {
                  return _this8._onError(e, 'ItemService.export() - Error exporting item');
              });
          }

          /**
           * @param {Object} object - GP object definition to generate a URI for
           * @param {Object} options - optional request options
           * @return {Promise} resolving string URI
           */

      }, {
          key: 'getUri',
          value: function getUri(object, options) {
              var _this9 = this;

              return Q.resolve(object).then(function (obj) {

                  if (!obj) {
                      var err = new Error("Must provide an typed object");
                      err.status = 400;
                      err.error = "Bad Request";
                      throw err;
                  }

                  if (obj.toJson) {
                      //if passed an ItemModel instance, convert to JSON
                      obj = obj.toJson();
                  }

                  if (!obj.type) {
                      var _err = new Error("Must provide a valid type on the specified object");
                      _err.status = 400;
                      _err.error = "Bad Request";
                  }

                  var url = _this9.apiBase + '/api/utils/uri';
                  var opts = _this9.buildRequest({
                      method: "POST", url: url, data: obj, options: options
                  });
                  return _this9.execute(opts);
              }).catch(function (e) {
                  return _this9._onError(e, 'ItemService.getUri() - Error getting URI for item');
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
          key: 'buildRequest',
          value: function buildRequest(options) {

              if (this.httpMethods.indexOf(options.method) < 0) {
                  var err = new Error('Unsupported HTTP method ' + options.method);
                  err.status = 400;
                  err.error = "Bad Request";
                  throw err;
              }

              if (!options.url) {
                  var _err2 = new Error('Must specify a URL for HTTP requests');
                  _err2.status = 400;
                  _err2.error = "Bad Request";
                  throw _err2;
              }

              options.timeout = this.timeout;

              var opts = this.createRequestOpts(options);

              return opts;
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
      return ItemService;
  }(BaseService);

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
                  return _this2._onError(e, "LayerService.style() - Error fetching style");
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
                      var err = new Error("Must provide describe parameters to use");
                      err.status = 400;
                      err.error = "Bad Request";
                      throw err;
                  }

                  var keys = ['bbox', 'height', 'width', 'x', 'y'];
                  var missing = keys.find(function (key) {
                      return !req[key];
                  });
                  if (missing) {
                      var _err = new Error('Must specify ' + missing + ' in describe req');
                      _err.status = 400;
                      _err.error = "Bad Request";
                      throw _err;
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
                  return _this3._onError(e, "LayerService.describe() - Error describing layer feature");
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
                      var err = new Error("Must provide parameters to use in layer validation");
                      err.status = 400;
                      err.error = "Bad Request";
                      throw err;
                  }

                  var url = _this4.baseUrl + '/' + id + '/validate';
                  var opts = _this4.buildRequest({
                      method: "GET", url: url, params: params, options: options
                  });
                  return _this4.execute(opts);
              }).catch(function (e) {
                  return _this4._onError(e, "LayerService.describe() - Error describing layer feature");
              });
          }
      }]);
      return LayerService;
  }(ItemService);

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

  var SORT_OPTIONS_DEFAULT = [{ value: "label,asc", label: "Name (A-Z)" }, { value: "label,desc", label: "Name (Z-A)" }, { value: "type,asc", label: "Type (A-Z)" }, { value: "type,desc", label: "Type (Z-A)" }, { value: "modified,desc", label: "Most recently modified" }, { value: "modified,asc", label: "Least recently modified" }, { value: "_score,desc", label: "Relevance" }];

  var Query = function () {
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
                  if (value === null || value === undefined) continue;
                  if (typeof value.push !== 'undefined') {
                      value = value.join(',');
                  }
                  if (typeof value !== 'string' || value.length > 0) result[prop] = value;
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
              return SORT_OPTIONS_DEFAULT.slice(0);
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

  function QueryFactory () {
      return new Query();
  }

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
                  if (!svc) {
                      var err = new Error("Must provide service to get metadata about");
                      err.status = 400;
                      err.error = "Bad Request";
                      throw err;
                  }
                  var opts = _this2.buildRequest({
                      method: 'POST', url: _this2.baseUrl + '/about', data: svc, options: options
                  });
                  return _this2.execute(opts);
              }).catch(function (e) {
                  return _this2._onError(e, "ServiceService.about() - Error describing service");
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

              var query = QueryFactory().types(ItemTypes.STANDARD).resourceTypes('ServiceType').pageSize(50).getQuery();

              return Q.resolve(query).then(function (params) {
                  var url = _this3.apiBase + '/api/items';
                  var opts = _this3.buildRequest({
                      method: 'GET', url: url, params: params, options: options
                  });
                  return _this3.execute(opts);
              }).then(function (response) {
                  return response.results;
              }).catch(function (e) {
                  return _this3._onError(e, "ServiceService.types() - Error fetching service types");
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

                  if (svc.toJson) {
                      //if passed an ItemModel instance, convert to JSON
                      svc = svc.toJson();
                  }

                  var url = _this4.baseUrl + '/import';
                  var opts = _this4.buildRequest({
                      method: 'POST', url: url, data: svc, options: options
                  });
                  return _this4.execute(opts);
              }).then(function (obj) {
                  return factory(obj);
              }).catch(function (e) {
                  return _this4._onError(e, "ServiceService.import() - Error importing service");
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
                  return _this5._onError(e, "ServiceService.harvest() - Error harvesting layers from service");
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
                  return _this6._onError(e, "ServiceService.liveTest() - Error testing service");
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
                  return _this7._onError(e, "ServiceService.statistics() - Error getting service statistics");
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
                  return _this2._onError(e, "GalleryService.addItem() - Error adding item");
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
                  return _this3._onError(e, "GalleryService.addItem() - Error adding item");
              });
          }
      }]);
      return GalleryService;
  }(ItemService);

  /**
   * GeoPlatform Map service
   * service for working with the GeoPlatform API to
   * retrieve and manipulate Community objects.
   *
   * @see GeoPlatform.ItemService
   */

  var CommunityService = function (_ItemService) {
      inherits(CommunityService, _ItemService);

      function CommunityService(url, httpClient) {
          classCallCheck(this, CommunityService);
          return possibleConstructorReturn(this, (CommunityService.__proto__ || Object.getPrototypeOf(CommunityService)).call(this, url, httpClient));
      }

      createClass(CommunityService, [{
          key: 'setUrl',
          value: function setUrl(baseUrl) {
              get(CommunityService.prototype.__proto__ || Object.getPrototypeOf(CommunityService.prototype), 'setUrl', this).call(this, baseUrl);
              this.baseUrl = baseUrl + '/api/communities';
          }
      }]);
      return CommunityService;
  }(ItemService);

  var UtilsService = function (_BaseService) {
      inherits(UtilsService, _BaseService);

      function UtilsService(url, httpClient) {
          classCallCheck(this, UtilsService);
          return possibleConstructorReturn(this, (UtilsService.__proto__ || Object.getPrototypeOf(UtilsService)).call(this, url, httpClient));
      }

      createClass(UtilsService, [{
          key: 'setUrl',
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
          key: 'capabilities',
          value: function capabilities(property, query, options) {
              var _this2 = this;

              var url = this.baseUrl + '/api/capabilities';
              if (property) url += '/' + property;

              return Q.resolve(url).then(function (url) {
                  var opts = _this2.buildRequest({
                      method: "GET", url: url, params: query || {}, options: options
                  });
                  return _this2.execute(opts);
              }).catch(function (e) {
                  return _this2._onError(e, "UtilsService.capabilities() - Error getting capabilities");
              });
          }

          /**
           * @param {File} file
           * @param {string} format
           * @param {Object} options
           * @return {Promise}
           */

      }, {
          key: 'parseFile',
          value: function parseFile(file, format, options) {
              var _this3 = this;

              var url = this.baseUrl + '/api/utils/parse';

              return Q.resolve(url).then(function (url) {

                  var opts = _this3.buildRequest({
                      method: "POST", url: url,
                      data: { format: format },
                      file: file,
                      formData: true, //NodeJS (RequestJS)
                      options: options
                  });
                  return _this3.execute(opts);
              }).then(function (response) {
                  return response;
              }).catch(function (e) {
                  var err = new Error('UtilsService.parseFile() - Error parsing file: ' + e.message);
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
          key: 'buildRequest',
          value: function buildRequest(options) {

              if (this.httpMethods.indexOf(options.method) < 0) {
                  var err = new Error('Unsupported HTTP method ' + options.method);
                  err.status = 400;
                  err.error = "Bad Request";
                  throw err;
              }

              if (!options.url) {
                  var _err = new Error('Must specify a URL for HTTP requests');
                  _err.status = 400;
                  _err.error = "Bad Request";
                  throw _err;
              }

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
      return UtilsService;
  }(BaseService);

  var SORT_OPTIONS_DEFAULT$1 = [{ value: "label,asc", label: "Name (A-Z)" }, { value: "label,desc", label: "Name (Z-A)" }, { value: "type,asc", label: "Type (A-Z)" }, { value: "type,desc", label: "Type (Z-A)" }, { value: "modified,desc", label: "Most recently modified" }, { value: "modified,asc", label: "Least recently modified" }, { value: "_score,desc", label: "Relevance" }];

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
              return SORT_OPTIONS_DEFAULT$1.slice(0);
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

  var KGService = function (_BaseService) {
      inherits(KGService, _BaseService);

      function KGService(url, httpClient) {
          classCallCheck(this, KGService);
          return possibleConstructorReturn(this, (KGService.__proto__ || Object.getPrototypeOf(KGService)).call(this, url, httpClient));
      }

      createClass(KGService, [{
          key: 'setUrl',
          value: function setUrl(baseUrl) {
              get(KGService.prototype.__proto__ || Object.getPrototypeOf(KGService.prototype), 'setUrl', this).call(this, baseUrl);
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
              var _this2 = this;

              return Q.resolve(true).then(function () {

                  if (query && typeof query.getQuery !== 'undefined') {
                      //if passed a GeoPlatform.Query object,
                      // convert to parameters object
                      query = query.getQuery();
                  }

                  var opts = _this2.buildRequest({
                      method: "GET", url: url, params: query, options: options
                  });
                  return _this2.execute(opts);
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
  }(BaseService);

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
          case ItemTypes.COMMUNITY:
              return new CommunityService(baseUrl, httpClient);
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
  exports.Query = Query;
  exports.QueryFactory = QueryFactory;
  exports.KGQuery = KGQuery;
  exports.KGClassifiers = classifiers;
  exports.HttpClientBase = HttpClientBase;
  exports.JQueryHttpClient = JQueryHttpClient;
  exports.NGHttpClient = NGHttpClient;
  exports.NodeHttpClient = NodeHttpClient;
  exports.ItemService = ItemService;
  exports.LayerService = LayerService;
  exports.ServiceService = ServiceService;
  exports.GalleryService = GalleryService;
  exports.CommunityService = CommunityService;
  exports.DatasetService = DatasetService;
  exports.MapService = MapService;
  exports.UtilsService = UtilsService;
  exports.KGService = KGService;
  exports.ServiceFactory = ServiceFactory;
  exports.ItemProperties = ItemProperties;
  exports.ItemFactory = factory;
  exports.BaseModel = BaseModel;
  exports.DatasetModel = DatasetModel;
  exports.MapModel = MapModel;
  exports.LayerModel = LayerModel;
  exports.ServiceModel = ServiceModel;
  exports.GalleryModel = GalleryModel;
  exports.CommunityModel = CommunityModel;
  exports.ContactModel = ContactModel;
  exports.OrganizationModel = OrganizationModel;
  exports.Config = config;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=geoplatform.client.js.map
