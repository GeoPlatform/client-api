/*
This software has been approved for release by the U.S. Department of the Interior. Although the software has been subjected to rigorous review, the DOI reserves the right to update the software as needed pursuant to further analysis and review. No warranty, expressed or implied, is made by the DOI or the U.S. Government as to the functionality of the software and related material nor shall the fact of release constitute any such warranty. Furthermore, the software is released on condition that neither the DOI nor the U.S. Government shall be held liable for any damages resulting from its authorized or unauthorized use.
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('axios')) :
    typeof define === 'function' && define.amd ? define('@geoplatform/client', ['exports', 'axios'], factory) :
    (global = global || self, factory((global.geoplatform = global.geoplatform || {}, global.geoplatform.client = {}), global.axios));
}(this, function (exports, axios) { 'use strict';

    axios = axios && axios.hasOwnProperty('default') ? axios['default'] : axios;

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

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function apply() {
        if (typeof Object.assign != 'function') {
            // Must be writable: true, enumerable: false, configurable: true
            Object.defineProperty(Object, "assign", {
                value: function assign(target, varArgs) {
                    if (target == null) { // TypeError if undefined or null
                        throw new TypeError('Cannot convert undefined or null to object');
                    }
                    if (varArgs) { }
                    var to = Object(target);
                    for (var index = 1; index < arguments.length; index++) {
                        var nextSource = arguments[index];
                        if (nextSource != null) { // Skip over if undefined or null
                            for (var nextKey in nextSource) {
                                // Avoid bugs when hasOwnProperty is shadowed
                                if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                                    to[nextKey] = nextSource[nextKey];
                                }
                            }
                        }
                    }
                    return to;
                },
                writable: true,
                configurable: true
            });
        }
    }
    function polyfills() {
        apply();
    }
    ;

    var GPError = /** @class */ (function (_super) {
        __extends(GPError, _super);
        function GPError(message) {
            var _this = _super.call(this, message) || this;
            _this.status = 500;
            _this.statusCode = 500;
            _this.error = null;
            return _this;
        }
        GPError.prototype.setError = function (value) { this.error = value; };
        GPError.prototype.setStatus = function (value) { this.status = this.statusCode = value; };
        return GPError;
    }(Error));

    var ItemTypes = {
        DATASET: "dcat:Dataset",
        SERVICE: "regp:Service",
        LAYER: "Layer",
        MAP: "Map",
        GALLERY: "Gallery",
        COMMUNITY: 'Community',
        APPLICATION: 'Application',
        TOPIC: 'Topic',
        WEBSITE: 'WebSite',
        ORGANIZATION: "org:Organization",
        CONTACT: "vcard:VCard",
        PERSON: "foaf:Person",
        CONCEPT: "skos:Concept",
        CONCEPT_SCHEME: "skos:ConceptScheme",
        STANDARD: 'dct:Standard',
        RIGHTS_STATEMENT: 'dct:RightsStatement'
    };
    var ItemTypeLabels = {};
    ItemTypeLabels[ItemTypes.DATASET] = "Dataset";
    ItemTypeLabels[ItemTypes.SERVICE] = "Service";
    ItemTypeLabels[ItemTypes.LAYER] = "Layer";
    ItemTypeLabels[ItemTypes.MAP] = "Map";
    ItemTypeLabels[ItemTypes.GALLERY] = "Gallery";
    ItemTypeLabels[ItemTypes.COMMUNITY] = 'Community';
    ItemTypeLabels[ItemTypes.APPLICATION] = 'Application';
    ItemTypeLabels[ItemTypes.TOPIC] = 'Topic';
    ItemTypeLabels[ItemTypes.WEBSITE] = 'WebSite';
    ItemTypeLabels[ItemTypes.ORGANIZATION] = "Organization";
    ItemTypeLabels[ItemTypes.CONTACT] = "Contact";
    ItemTypeLabels[ItemTypes.PERSON] = "Person";
    ItemTypeLabels[ItemTypes.CONCEPT] = "Concept";
    ItemTypeLabels[ItemTypes.CONCEPT_SCHEME] = "Concept Scheme";
    ItemTypeLabels[ItemTypes.STANDARD] = 'Standard';
    ItemTypeLabels[ItemTypes.RIGHTS_STATEMENT] = 'Rights Statement';

    var URI_BASE = 'http://www.geoplatform.gov';
    var ESRI_TYPES = [
        "http://www.geoplatform.gov/spec/esri-feature-rest",
        "http://www.geoplatform.gov/spec/esri-image-rest",
        "http://www.geoplatform.gov/spec/esri-map-rest",
        "http://www.geoplatform.gov/spec/esri-tile-rest"
    ];
    function formatReference(ref) {
        if (ref === null)
            return '';
        if (typeof (ref) === 'string')
            return ref.toLowerCase().replace(/\s/g, '');
        else if (typeof (ref) === 'object') {
            var result = '';
            for (var prop in ref) {
                if (ref.hasOwnProperty(prop)) {
                    var value = ref[prop];
                    if (value !== null && typeof (value) !== 'undefined') {
                        //TODO catch non-string-able values
                        result += (value + '').toLowerCase().replace(/\s/g, '');
                    }
                }
            }
            return result;
        }
        return '';
    }
    /**
     * Adjusts service access url to ignore certain patterns that can affect
     * how URI uniqueness is.
     * @param service - GP Service instance
     * @return access url adjusted for URI generation needs
     */
    function fixServiceHref(service) {
        stripLayerFromServiceHref(service);
        var url = service.accessURL || service.href;
        if (!url || !url.length)
            return null;
        //ensure case sensitivity is not an issue
        // and that any surrounding whitespace is ignored
        url = (url + '').trim().toLowerCase();
        url = url.replace(/http(s)?:\/\//, ''); //ignore protocol for URI purposes
        url = url.replace(/&?request=[A-Za-z]+/i, '')
            .replace(/&?service=(WMS|WFS|WCS|CSW)/i, '')
            .replace(/&?version=[0-9\.]*/i, '')
            .replace(/&?layers=[A-Za-z0-9\-\:_,]*/i, '')
            .replace(/&?srs=[A-Za-z0-9\:]*/i, '')
            .replace(/&?crs=[A-Za-z0-9\:]*/i, '')
            .replace(/&?format=[A-Za-z\/]*/i, '')
            .replace(/&?bbox=[0-9,\.]*/i, '');
        var lastChar = url[url.length - 1];
        if ('/' === lastChar || '?' === lastChar) { //ignore empty querystring or trailing slashes
            url = url.substring(0, url.length - 1);
        }
        return url;
    }
    /**
     * ESRI services sometimes have layer information baked into their URL
     * which needs to be removed before the service can be used.
     * @param service - GP Service object
     */
    function stripLayerFromServiceHref(service) {
        if (!service)
            return;
        var type = service.serviceType || service.conformsTo;
        if (!type)
            return;
        //if ESRI service, make sure it doesn't have a layer id on the href
        if (ESRI_TYPES.indexOf(type.uri) >= 0) {
            var href = service.href || service.accessURL;
            var matches = href.match(/(Map|Feature|Image)(Server\/\d+)/i);
            if (matches && matches.length > 2) {
                // 0 < full string match (ie, 'MapServer/1')
                // 1 < server type match (ie, 'Map' or 'Feature')
                // 2 < bit we care about (ie, 'Server/1')
                href = href.replace(matches[2], 'Server/');
                if (service.href)
                    service.href = href;
                if (service.accessURL)
                    service.accessURL = href;
            }
        }
    }
    var ɵ0 = function (type, factory) {
        this.factories[type] = factory;
    }, ɵ1 = function (object, md5Fn) {
        if (!object || !object.type)
            return null;
        if (typeof (md5Fn) !== 'function') {
            throw new Error("Must specify a MD5 function when using URIFactory");
        }
        var factory = this.factories[object.type];
        if (!factory)
            return null;
        return factory(object, md5Fn);
    };
    /**
     * @see https://geoplatform.atlassian.net/wiki/display/DT/Common+Object+Identifier+Scheme
     */
    var URIFactory = {
        factories: {},
        register: ɵ0,
        create: ɵ1
    };
    URIFactory.register(ItemTypes.DATASET, function (dataset, md5) {
        var pubName = (dataset.publisher || dataset.publishers || [])
            .map(function (pub) { return pub.label || ""; }).join('');
        var ref = formatReference({
            title: dataset.title,
            pub: pubName
        });
        return URI_BASE + '/id/dataset/' + md5(ref);
    });
    URIFactory.register(ItemTypes.SERVICE, function (service, md5) {
        var url = fixServiceHref(service);
        var ref = formatReference(url);
        return URI_BASE + '/id/service/' + md5(ref);
    });
    URIFactory.register(ItemTypes.LAYER, function (layer, md5) {
        var svcUrl = '';
        var services = layer.servicedBy || layer.services;
        if (services && services.length)
            svcUrl = services[0].accessURL || services[0].href || '';
        var lyrUrl = layer.accessURL || layer.href || '';
        var lyrName = layer.layerName || '';
        //not recommended based upon following example:
        //  http://services.nationalmap.gov/.../MapServer/WMSServer?request=GetCapabilities&service=WMS/layer/1
        // return url + '/layer/' + layer.layerName;
        var args = svcUrl + lyrName + lyrUrl;
        if (!args.length)
            return null; //nothing was provided
        //ALTERNATE URI PATTERN
        var ref = formatReference(args);
        return URI_BASE + '/id/layer/' + md5(ref);
    });
    /**
     * Uses the map title, createdBy, and all third-party identifiers associated with the map
     * @param {object} map - GP Map object
     * @return {string} uri unique to this object
     */
    URIFactory.register(ItemTypes.MAP, function (map, md5) {
        var author = map.createdBy || map._createdBy || "";
        var identifiers = (map.identifiers || map.identifier || []).join('');
        var ref = formatReference({ title: map.title, author: author, identifiers: identifiers });
        return URI_BASE + '/id/map/' + md5(ref);
    });
    URIFactory.register(ItemTypes.GALLERY, function (gallery, md5) {
        var author = gallery.createdBy || gallery._createdBy || "";
        var ref = formatReference({ title: gallery.title, author: author });
        return URI_BASE + '/id/gallery/' + md5(ref);
    });
    URIFactory.register(ItemTypes.COMMUNITY, function (community, md5) {
        var ref = formatReference({ title: community.title });
        return URI_BASE + '/id/community/' + md5(ref);
    });
    URIFactory.register(ItemTypes.ORGANIZATION, function (org, md5) {
        var ref = formatReference(org.label || org.name);
        return URI_BASE + '/id/organization/' + md5(ref);
    });
    URIFactory.register(ItemTypes.PERSON, function (person, md5) {
        var ref = formatReference(person.name);
        return URI_BASE + '/id/person/' + md5(ref);
    });
    URIFactory.register(ItemTypes.CONTACT, function (vcard, md5) {
        var ref = {};
        if (vcard.email || vcard.hasEmail)
            ref.email = vcard.email || vcard.hasEmail; //email
        if (vcard.tel)
            ref.tel = vcard.tel; //tel
        if (vcard.orgName || vcard['organization-name'])
            ref.orgName = vcard.orgName || vcard['organization-name']; //orgName
        if (vcard.positionTitle)
            ref.positionTitle = vcard.positionTitle; //positionTitle
        ref = formatReference(ref);
        return URI_BASE + '/id/contact/' + md5(ref);
    });
    URIFactory.register(ItemTypes.CONCEPT, function (object, md5) {
        var scheme = object.inScheme || object.scheme;
        var schemeLabel = scheme ? (scheme.label || scheme.prefLabel) : '';
        var schemeRef = formatReference(schemeLabel);
        var ref = formatReference(object.label || object.prefLabel);
        return URI_BASE + '/id/metadata-codelists/' + md5(schemeRef) + '/' + md5(ref);
    });
    URIFactory.register(ItemTypes.CONCEPT_SCHEME, function (object, md5) {
        var ref = formatReference(object.label || object.prefLabel);
        return URI_BASE + '/id/metadata-codelists/' + md5(ref);
    });
    URIFactory.register(ItemTypes.APPLICATION, function (object, md5) {
        if (!object || !object.title)
            return null;
        var author = object.createdBy || object._createdBy || "";
        var ref = formatReference({ title: object.title, author: author });
        return URI_BASE + '/id/application/' + md5(ref);
    });
    URIFactory.register(ItemTypes.TOPIC, function (object, md5) {
        if (!object || !object.title)
            return null;
        var author = object.createdBy || object._createdBy || "";
        var ref = formatReference({ title: object.title, author: author });
        return URI_BASE + '/id/topic/' + md5(ref);
    });
    URIFactory.register(ItemTypes.WEBSITE, function (item, md5) {
        if (!item || !item.landingPage)
            return null;
        var ref = formatReference(item.landingPage);
        return URI_BASE + '/id/website/' + md5(ref);
    });
    function factoryFn(md5Fn) {
        if (typeof (md5Fn) !== 'function') {
            throw new Error("Must specify a MD5 function when using URIFactory");
        }
        return function (object) {
            return URIFactory.create(object, md5Fn);
        };
    }

    var Parameters = {
        ALTERNATE_TITLE: 'alternateTitles',
        BEGINS: 'startDate.min',
        CLASSIFIERS: 'classifiers',
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
        SEMANTIC_CONCEPTS: 'concepts',
        SIMILAR_TO: 'similarTo',
        STATUS: 'status',
        SERVICE_TYPES: 'serviceType.id',
        THEMES_ID: 'theme.id',
        THEMES_LABEL: 'theme.label',
        THEMES_URI: 'theme.uri',
        TOPICS_ID: 'topic.id',
        TOPICS_LABEL: 'topic.label',
        TOPICS_URI: 'topic.uri',
        TYPES: 'type',
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
        HREF: 'href',
        LAYER_TYPE: 'layerType',
        LAYER_NAME: 'layerName',
        PARENT_LAYER: 'parentLayer',
        SUB_LAYER: 'subLayer',
        SERVICE: 'service',
        MAP_LAYER: 'mapLayer',
        GALLERY_ITEM: 'galleryItem',
        //meta-parameters
        FACETS: 'includeFacets',
        FIELDS: 'fields',
        SORT: 'sort',
        PAGE: 'page',
        PAGE_SIZE: 'size',
        //recommender service-specific
        FOR_TYPES: 'for'
    };

    var SORT_OPTIONS_DEFAULT = [
        { value: "label,asc", label: "Name (A-Z)" },
        { value: "label,desc", label: "Name (Z-A)" },
        { value: "type,asc", label: "Type (A-Z)" },
        { value: "type,desc", label: "Type (Z-A)" },
        { value: "modified,desc", label: "Most recently modified" },
        { value: "modified,asc", label: "Least recently modified" },
        { value: "_score,desc", label: "Relevance" }
    ];
    var KGQuery = /** @class */ (function () {
        function KGQuery(options) {
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
            if (options) {
                this.applyParameters(options);
            }
        }
        KGQuery.prototype.getQuery = function () {
            var result = {};
            for (var prop in this.query) {
                var value = this.query[prop];
                if (value !== null && typeof (value.push) !== 'undefined') {
                    value = value.join(',');
                }
                result[prop] = value;
            }
            return result;
        };
        // -----------------------------------------------------------
        KGQuery.prototype.parameter = function (name, value) {
            this.setParameter(name, value);
            return this;
        };
        KGQuery.prototype.setParameter = function (name, value) {
            if (value === null || value === undefined)
                delete this.query[name];
            else
                this.query[name] = value;
        };
        KGQuery.prototype.getParameter = function (key) {
            return this.query[key];
        };
        KGQuery.prototype.applyParameters = function (obj) {
            for (var p in obj) {
                if (obj.hasOwnProperty(p)) {
                    this.setParameter(p, obj[p]);
                }
            }
        };
        // -----------------------------------------------------------
        KGQuery.prototype.q = function (text) {
            this.setQ(text);
            return this;
        };
        /**
         * @param text - free text query
         */
        KGQuery.prototype.setQ = function (text) {
            this.setParameter(Parameters.QUERY, text);
        };
        KGQuery.prototype.getQ = function () {
            return this.getParameter(Parameters.QUERY);
        };
        // -----------------------------------------------------------
        /**
         * @param types - KG classifiers for which concepts should be returned
         */
        KGQuery.prototype.classifiers = function (types) {
            this.setClassifiers(types);
            return this;
        };
        /**
         * @param types - KG classifiers for which concepts should be returned
         */
        KGQuery.prototype.setClassifiers = function (types) {
            if (!types)
                return;
            if (typeof (types) === 'string')
                types = types = [types];
            this.setParameter(Parameters.TYPES, types);
        };
        /**
         * @return KG classifiers for which concepts should be returned
         */
        KGQuery.prototype.getClassifiers = function () {
            return this.getParameter(Parameters.TYPES);
        };
        // -----------------------------------------------------------
        /**
         * Specify the Item object model type name(s) for which
         * recommended concepts should be returned. Note: this
         * query parameter is not the same as the GeoPlatform.Query.types()
         * query parameter (they map to different HTTP request parameters).
         * @param objTypes - Item object type names
         */
        KGQuery.prototype.types = function (objTypes) {
            this.setTypes(objTypes);
            return this;
        };
        /**
         * Specify the Item object model type name(s) for which
         * recommended concepts should be returned. Note: this
         * query parameter is not the same as the GeoPlatform.Query.setTypes()
         * query parameter (they map to different HTTP request parameters).
         * @param objTypes - Item object type names
         */
        KGQuery.prototype.setTypes = function (objTypes) {
            if (!objTypes)
                return;
            if (typeof (objTypes) === 'string')
                objTypes = [objTypes];
            this.setParameter(Parameters.FOR_TYPES, objTypes);
        };
        /**
         * Get the Item object model type name(s) for which
         * recommended concepts should be returned. Note: this
         * query parameter is not the same as the GeoPlatform.Query.getTypes()
         * query parameter (they map to different HTTP request parameters).
         * @return Item object type names
         */
        KGQuery.prototype.getTypes = function () {
            return this.getParameter(Parameters.FOR_TYPES);
        };
        // -----------------------------------------------------------
        /**
         * @param page - page of results to fetch
         */
        KGQuery.prototype.page = function (page) {
            this.setPage(page);
            return this;
        };
        KGQuery.prototype.setPage = function (page) {
            if (isNaN(page) || page * 1 < 0)
                return;
            this.query.page = page * 1;
        };
        KGQuery.prototype.getPage = function () {
            return this.query.page;
        };
        KGQuery.prototype.nextPage = function () {
            this.setPage(this.query.page + 1);
        };
        KGQuery.prototype.previousPage = function () {
            this.setPage(this.query.page - 1);
        };
        // -----------------------------------------------------------
        /**
         * @param size - page size to request
         */
        KGQuery.prototype.pageSize = function (size) {
            this.setPageSize(size);
            return this;
        };
        KGQuery.prototype.setPageSize = function (size) {
            if (isNaN(size) || size * 1 < 0)
                return;
            this.query.size = size * 1;
        };
        KGQuery.prototype.getPageSize = function () {
            return this.query.size;
        };
        // -----------------------------------------------------------
        /**
         * @param sort - form of <field>,<dir> or just field name
         * @param order - optional, either 'asc' or 'desc'
         */
        KGQuery.prototype.sort = function (sort, order) {
            this.setSort(sort, order);
            return this;
        };
        /**
         * @param sort - form of <field>,<dir> or just field name
         * @param order - optional, either 'asc' or 'desc'
         */
        KGQuery.prototype.setSort = function (sort, order) {
            order = order || 'desc';
            if (sort && sort.indexOf(',') < 0)
                sort = sort + ',' + order;
            this.query.sort = sort;
        };
        KGQuery.prototype.getSort = function () {
            return this.query.sort;
        };
        KGQuery.prototype.getSortField = function () {
            return this.query.sort.split(',')[0];
        };
        KGQuery.prototype.getSortOrder = function () {
            return this.query.sort.split(',')[1] === 'asc';
        };
        /**
         * @return list of key-value pairs of sort options
         */
        KGQuery.prototype.getSortOptions = function () {
            return SORT_OPTIONS_DEFAULT.slice(0);
        };
        // -----------------------------------------------------------
        /**
         *
         */
        KGQuery.prototype.clear = function () {
            this.query = this.defaultQuery;
        };
        return KGQuery;
    }());

    var Classifiers = {
        PURPOSE: 'purpose',
        FUNCTION: 'function',
        TOPIC_PRIMARY: 'primaryTopic',
        TOPIC_SECONDARY: 'secondaryTopic',
        SUBJECT_PRIMARY: 'primarySubject',
        SUBJECT_SECONDARY: 'secondarySubject',
        COMMUNITY: 'community',
        AUDIENCE: 'audience',
        PLACE: 'place',
        CATEGORY: 'category'
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
        TOPICS: 'topics',
        USED_BY: 'usedBy',
        VISIBILITY: 'visibility',
        LANDING_PAGE: 'landingPage'
    };
    var FIELDS_DEFAULT = [
        Fields.CREATED, Fields.MODIFIED, Fields.CREATED_BY,
        Fields.PUBLISHERS, Fields.THEMES, Fields.DESCRIPTION
    ];
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
        TOPICS: 'topics',
        TYPES: 'type',
        USED_BY: 'usedBy',
        VIEWS: 'views',
        VISIBILITY: 'visibility'
    };
    var FACETS_DEFAULT = [
        Facets.TYPES,
        Facets.PUBLISHERS,
        Facets.SERVICE_TYPES,
        Facets.CONCEPT_SCHEMES,
        Facets.VISIBILITY,
        Facets.CREATED_BY
    ];
    /*
        Map facet keys to parameters so clients can set
        query params using faceted results

        //TODO remove these and their function below
     */
    var FacetToParam = {};
    FacetToParam[Facets.TYPES] = Parameters.TYPES;
    FacetToParam[Facets.THEMES] = Parameters.THEMES_ID;
    FacetToParam[Facets.TOPICS] = Parameters.TOPICS_ID;
    FacetToParam[Facets.PUBLISHERS] = Parameters.PUBLISHERS_ID;
    FacetToParam[Facets.CONTACTS] = Parameters.CONTACTS_ID;
    FacetToParam[Facets.CONCEPT_SCHEMES] = Parameters.SCHEMES_ID;
    FacetToParam[Facets.USED_BY] = Parameters.USED_BY_ID;
    /* --------------------------------------------------------- */
    var SORT_OPTIONS_DEFAULT$1 = [
        { value: "label,asc", label: "Name (A-Z)" },
        { value: "label,desc", label: "Name (Z-A)" },
        { value: "type,asc", label: "Type (A-Z)" },
        { value: "type,desc", label: "Type (Z-A)" },
        { value: "modified,desc", label: "Most recently modified" },
        { value: "modified,asc", label: "Least recently modified" },
        { value: "_score,desc", label: "Relevance" }
    ];
    var BBOX_REGEX = /^\-?\d+(\.\d*)?,\-?\d+(\.\d*)?,\-?\d+(\.\d*)?,\-?\d+(\.\d*)?$/;
    function toArray(value) {
        var result = value;
        //if given a non-array value, wrap in array
        if (result !== null && typeof (result.push) === 'undefined')
            result = [result];
        //if array value is empty, nullify the result
        if (result !== null && !result.length)
            result = null;
        return result;
    }
    /**
     * Query
     *
     * Specify the "default" query constraints to use by passing in 'options.defaults = {...}';
     *
     */
    var Query = /** @class */ (function () {
        /**
         * @param options - set of initial constraints
         */
        function Query(options) {
            this.defaultQuery = {};
            this.defaultQuery[Parameters.PAGE.toString()] = 0;
            this.defaultQuery[Parameters.PAGE_SIZE.toString()] = 10;
            this.defaultQuery[Parameters.SORT.toString()] = "modified,desc";
            this.defaultQuery[Parameters.FIELDS.toString()] = FIELDS_DEFAULT.slice(0);
            this.defaultQuery[Parameters.FACETS.toString()] = FACETS_DEFAULT.slice(0);
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
         * @return containing request-ready parameters/values
         */
        Query.prototype.getQuery = function () {
            var result = {};
            for (var prop in this.query) {
                var value = this.query[prop];
                if (value !== null && typeof (value.push) !== 'undefined') {
                    value = value.join(',');
                }
                result[prop] = value;
            }
            return result;
        };
        /**
         * @return Query
         */
        Query.prototype.clone = function () {
            var result = new Query();
            var json = JSON.parse(JSON.stringify(this.query));
            result.applyParameters(json);
            return result;
        };
        // -----------------------------------------------------------
        /**
         * @param name
         * @param value
         * @return Query this
         */
        Query.prototype.parameter = function (name, value) {
            this.setParameter(name, value);
            return this;
        };
        /**
         * @param name
         * @param value
         */
        Query.prototype.setParameter = function (name, value) {
            if (value === null || value === undefined || //if no value was provide
                (typeof (value.push) !== 'undefined' && !value.length)) //or empty array
                delete this.query[name];
            else
                this.query[name] = value;
        };
        /**
         * @param key - name of parameter
         * @return value of parameter
         */
        Query.prototype.getParameter = function (key) {
            return this.query[key];
        };
        /**
         * @param name - name of parameter to remove existing value for
         */
        Query.prototype.clearParameter = function (name) {
            delete this.query[name];
        };
        /**
         * @param obj - set of parameter/values to apply to this query
         */
        Query.prototype.applyParameters = function (obj) {
            for (var p in obj) {
                if (obj.hasOwnProperty(p)) {
                    this.setParameter(p, obj[p]);
                }
            }
        };
        /**
         * @param facet - name of facet to set the value for as a parameter
         * @param value - value of the facet to use as the parameter's value
         */
        //TODO remove this function
        Query.prototype.setFacetParameter = function (facet, value) {
            var param = FacetToParam[facet];
            if (!param) {
                console.log("WARN : Query.applyFacetParameter() - " +
                    "unable to map facet to known parameter '" + facet + "', using " +
                    "as direct parameter which may not operate as intended");
            }
            this.setParameter(param || facet, value);
        };
        // -----------------------------------------------------------
        /**
         * @param text
         * @return Query this
         */
        Query.prototype.q = function (text) { this.setQ(text); return this; };
        /** @param text - free text query */
        Query.prototype.setQ = function (text) { this.setParameter(Parameters.QUERY, text); };
        /** @return */
        Query.prototype.getQ = function () { return this.getParameter(Parameters.QUERY); };
        // -----------------------------------------------------------
        Query.prototype.keywords = function (text) {
            this.setKeywords(text);
            return this;
        };
        /**
         * @param text - free text query
         */
        Query.prototype.setKeywords = function (text) {
            this.setParameter(Parameters.KEYWORDS, toArray(text));
        };
        Query.prototype.getKeywords = function () {
            return this.getParameter(Parameters.KEYWORDS);
        };
        // -----------------------------------------------------------
        Query.prototype.uri = function (uri) {
            this.setUri(uri);
            return this;
        };
        Query.prototype.setUri = function (uri) {
            this.setParameter(Parameters.URI, uri);
        };
        Query.prototype.getUri = function () {
            return this.getParameter(Parameters.URI);
        };
        // -----------------------------------------------------------
        Query.prototype.types = function (types) {
            this.setTypes(types);
            return this;
        };
        /**
         * @param types - name of class(es) to request
         */
        Query.prototype.setTypes = function (types) {
            this.setParameter(Parameters.TYPES, toArray(types));
        };
        Query.prototype.getTypes = function () {
            return this.getParameter(Parameters.TYPES);
        };
        // -----------------------------------------------------------
        Query.prototype.createdBy = function (user) {
            this.setCreatedBy(user);
            return this;
        };
        /** @param user - username */
        Query.prototype.setCreatedBy = function (user) {
            this.setParameter(Parameters.CREATED_BY, user);
        };
        /** @return username */
        Query.prototype.getCreatedBy = function () {
            return this.getParameter(Parameters.CREATED_BY);
        };
        // -----------------------------------------------------------
        Query.prototype.lastModifiedBy = function (user) {
            this.setLastModifiedBy(user);
            return this;
        };
        /** @param user - username */
        Query.prototype.setLastModifiedBy = function (user) {
            this.setParameter(Parameters.LAST_MODIFIED_BY, user);
        };
        /** @return username */
        Query.prototype.getLastModifiedBy = function () {
            return this.getParameter(Parameters.LAST_MODIFIED_BY);
        };
        // -----------------------------------------------------------
        /**
         * Specify a Theme or set of Themes to constrain results. By
         * default, values are assumed to be theme identifiers. If using
         * theme labels or theme uris, specify the optional second parameter
         * to be either Parameters.THEMES_LABEL or Parameters.THEMES_URI
         * respectively.
         * @param themes - string or array of strings containing theme constraint
         * @param parameter - optional, to indicate the parameter to use
         * @return Query
         */
        Query.prototype.themes = function (themes, parameter) {
            this.setThemes(themes, parameter);
            return this;
        };
        /**
         * Specify a Theme or set of Themes to constrain results. By
         * default, values are assumed to be theme identifiers. If using
         * theme labels or theme uris, specify the optional second parameter
         * to be either Parameters.THEMES_LABEL or Parameters.THEMES_URI
         * respectively.
         * @param themes - theme or themes to constrain by
         */
        Query.prototype.setThemes = function (themes, parameter) {
            //clear existing
            this.setParameter(Parameters.THEMES_ID, null);
            this.setParameter(Parameters.THEMES_LABEL, null);
            this.setParameter(Parameters.THEMES_URI, null);
            var param = parameter || Parameters.THEMES_ID;
            this.setParameter(param, toArray(themes));
        };
        Query.prototype.getThemes = function () {
            return this.getParameter(Parameters.THEMES_ID) ||
                this.getParameter(Parameters.THEMES_LABEL) ||
                this.getParameter(Parameters.THEMES_URI);
        };
        // -----------------------------------------------------------
        /**
         * Specify a Topic or set of Topics to constrain results. By
         * default, values are assumed to be theme identifiers. If using
         * theme labels or theme uris, specify the optional second parameter
         * to be either Parameters.TOPIC_LABEL or Parameters.TOPIC_URI
         * respectively.
         * @param  topics - string or array of strings containing theme constraint
         * @param  parameter - optional, to indicate the parameter to use
         * @return Query instance
         */
        Query.prototype.topics = function (topics, parameter) {
            this.setTopics(topics, parameter);
            return this;
        };
        /**
         * Specify a Topic or set of Topics to constrain results. By
         * default, values are assumed to be theme identifiers. If using
         * theme labels or theme uris, specify the optional second parameter
         * to be either Parameters.TOPIC_LABEL or Parameters.TOPIC_URI
         * respectively.
         * @param topics - theme or topics to constrain by
         */
        Query.prototype.setTopics = function (topics, parameter) {
            //clear existing
            this.setParameter(Parameters.TOPICS_ID, null);
            this.setParameter(Parameters.TOPICS_LABEL, null);
            this.setParameter(Parameters.TOPICS_URI, null);
            var param = parameter || Parameters.TOPICS_ID;
            this.setParameter(param, toArray(topics));
        };
        Query.prototype.getTopics = function () {
            return this.getParameter(Parameters.TOPICS_ID) ||
                this.getParameter(Parameters.TOPICS_LABEL) ||
                this.getParameter(Parameters.TOPICS_URI);
        };
        // -----------------------------------------------------------
        /**
         * Specify a Publisher or set of Publishers to constrain results. By
         * default, values are assumed to be identifiers. If using labels or uris,
         * specify the optional second parameter to be either
         * Parameters.PUBLISHERS_LABEL or Parameters.PUBLISHERS_URI respectively.
         * @param parameter - optional, to indicate the parameter to use
         * @return Query
         */
        Query.prototype.publishers = function (publishers, parameter) {
            this.setPublishers(publishers, parameter);
            return this;
        };
        /**
         * Specify a Publisher or set of Publishers to constrain results. By
         * default, values are assumed to be identifiers. If using labels or uris,
         * specify the optional second parameter to be either
         * Parameters.PUBLISHERS_LABEL or Parameters.PUBLISHERS_URI respectively.
         * @param publishers - publishing orgs to constrain by
         */
        Query.prototype.setPublishers = function (publishers, parameter) {
            //clear existing
            this.setParameter(Parameters.PUBLISHERS_ID, null);
            this.setParameter(Parameters.PUBLISHERS_LABEL, null);
            this.setParameter(Parameters.PUBLISHERS_URI, null);
            var param = parameter || Parameters.PUBLISHERS_ID;
            this.setParameter(param, toArray(publishers));
        };
        Query.prototype.getPublishers = function () {
            return this.getParameter(Parameters.PUBLISHERS_ID) ||
                this.getParameter(Parameters.PUBLISHERS_LABEL) ||
                this.getParameter(Parameters.PUBLISHERS_URI);
        };
        // -----------------------------------------------------------
        /**
         * Specify a Point of Contact or set of Contacts to constrain results. By
         * default, values are assumed to be identifiers. If using
         * labels or uris, specify the optional second parameter to be either
         * Parameters.CONTACTS_LABEL or Parameters.CONTACTS_URI respectively.
         * @param parameter - optional, to indicate the parameter to use
         * @return Query
         */
        Query.prototype.contacts = function (contacts, parameter) {
            this.setContacts(contacts, parameter);
            return this;
        };
        /**
         * Specify a Contact or set of Contacts to constrain results. By
         * default, values are assumed to be identifiers. If using
         * labels or uris, specify the optional second parameter to be either
         * Parameters.CONTACTS_LABEL or Parameters.CONTACTS_URI respectively.
         * @param contacts - publishing orgs to constrain by
         */
        Query.prototype.setContacts = function (contacts, parameter) {
            //clear existing
            this.setParameter(Parameters.CONTACTS_ID, null);
            this.setParameter(Parameters.CONTACTS_LABEL, null);
            this.setParameter(Parameters.CONTACTS_URI, null);
            var param = parameter || Parameters.CONTACTS_ID;
            this.setParameter(param, toArray(contacts));
        };
        Query.prototype.getContacts = function () {
            return this.getParameter(Parameters.CONTACTS_ID) ||
                this.getParameter(Parameters.CONTACTS_LABEL) ||
                this.getParameter(Parameters.CONTACTS_URI);
        };
        // -----------------------------------------------------------
        /**
         * Specify the identifier of an Agent (Community, Group, etc) that
         * uses items you wish to find in search results. By
         * default, values are assumed to be identifiers. If using
         * labels or uris, specify the optional second parameter
         * to be either Parameters.USED_BY_LABEL or Parameters.USED_BY_URI
         * respectively.
         * @param parameter - optional, to indicate the parameter to use
         * @return Query
         */
        Query.prototype.usedBy = function (ids, parameter) {
            this.setUsedBy(ids, parameter);
            return this;
        };
        /**
         * Specify the identifier of an Agent (Community, Group, etc) that
         * uses items you wish to find in search results. By
         * default, values are assumed to be identifiers. If using
         * labels or uris, specify the optional second parameter
         * to be either Parameters.USED_BY_LABEL or Parameters.USED_BY_URI
         * respectively.
         * @param ids - publishing orgs to constrain by
         */
        Query.prototype.setUsedBy = function (ids, parameter) {
            //clear existing
            this.setParameter(Parameters.USED_BY_ID, null);
            this.setParameter(Parameters.USED_BY_LABEL, null);
            this.setParameter(Parameters.USED_BY_URI, null);
            var param = parameter || Parameters.USED_BY_ID;
            this.setParameter(param, toArray(ids));
        };
        Query.prototype.getUsedBy = function () {
            return this.getParameter(Parameters.USED_BY_ID) ||
                this.getParameter(Parameters.USED_BY_LABEL) ||
                this.getParameter(Parameters.USED_BY_URI);
        };
        // -----------------------------------------------------------
        /**
         * Specify a Concept Scheme or set of Concept Schemes to constrain results. By
         * default, values are assumed to be identifiers. If using
         * labels or uris, specify the optional second parameter
         * to be either Parameters.SCHEMES_LABEL or Parameters.SCHEMES_URI
         * respectively.
         * @param schemes - schemes to constrain by
         * @param parameter - optional, to indicate the parameter to use
         * @return Query
         */
        Query.prototype.schemes = function (schemes, parameter) {
            this.setSchemes(schemes, parameter);
            return this;
        };
        /**
         * Specify a Concept Scheme or set of Concept Schemes to constrain results. By
         * default, values are assumed to be theme identifiers. If using
         * theme labels or theme uris, specify the optional second parameter
         * to be either Parameters.SCHEMES_LABEL or Parameters.SCHEMES_URI
         * respectively.
         * @param schemes - schemes to constrain by
         * @param parameter - optional, to indicate the parameter to use
         */
        Query.prototype.setSchemes = function (schemes, parameter) {
            //clear existing
            this.setParameter(Parameters.SCHEMES_ID, null);
            this.setParameter(Parameters.SCHEMES_LABEL, null);
            this.setParameter(Parameters.SCHEMES_URI, null);
            var param = parameter || Parameters.SCHEMES_ID;
            this.setParameter(param, toArray(schemes));
        };
        Query.prototype.getSchemes = function () {
            return this.getParameter(Parameters.SCHEMES_ID) ||
                this.getParameter(Parameters.SCHEMES_LABEL) ||
                this.getParameter(Parameters.SCHEMES_URI);
        };
        // -----------------------------------------------------------
        /**
         *
         */
        Query.prototype.serviceTypes = function (types) {
            this.setServiceTypes(types);
            return this;
        };
        /**
         * @param types - ids
         */
        Query.prototype.setServiceTypes = function (types) {
            this.setParameter(Parameters.SERVICE_TYPES, toArray(types));
        };
        Query.prototype.getServiceTypes = function () {
            return this.getParameter(Parameters.SERVICE_TYPES);
        };
        // -----------------------------------------------------------
        Query.prototype.visibility = function (vis) {
            this.setVisibility(vis);
            return this;
        };
        /**
         * @param visibility - one of 'public' or 'private'
         */
        Query.prototype.setVisibility = function (visibility) {
            this.setParameter(Parameters.VISIBILITY, visibility);
        };
        Query.prototype.getVisibility = function () {
            return this.getParameter(Parameters.VISIBILITY);
        };
        // -----------------------------------------------------------
        Query.prototype.status = function (value) {
            this.setStatus(value);
            return this;
        };
        /**
         * @param status - current status of Item
         */
        Query.prototype.setStatus = function (value) {
            this.setParameter(Parameters.STATUS, value);
        };
        Query.prototype.getStatus = function () {
            return this.getParameter(Parameters.STATUS);
        };
        // -----------------------------------------------------------
        Query.prototype.extent = function (bbox) {
            this.setExtent(bbox);
            return this;
        };
        /**
         * @param bbox - string form of "minx,miny,maxx,maxy", or L.LatLngBounds, or Array
         */
        Query.prototype.setExtent = function (bbox) {
            if (bbox) {
                if (typeof (bbox.toBboxString) !== 'undefined') {
                    //Leaflet Bounds instance
                    bbox = bbox.toBboxString();
                }
                else if (typeof (bbox.push) !== 'undefined' && bbox.length &&
                    //Nested array (alternate Leaflet representation):
                    // [ [minLat,minLong], [maxLat,maxLong] ]
                    typeof (bbox[0].push) !== 'undefined') {
                    bbox = bbox[0][1] + ',' + bbox[0][0] + ',' + bbox[1][1] + ',' + bbox[1][0];
                }
                else if (typeof (bbox) === 'string') {
                    if (!BBOX_REGEX.test(bbox)) {
                        throw new Error("Invalid argument: bbox string must be " +
                            "in form of 'minx,miny,maxx,maxy'");
                    }
                }
                else {
                    throw new Error("Invalid argument: bbox must be one of " +
                        "Leaflet.Bounds, nested array, or bbox string");
                }
            }
            this.setParameter(Parameters.EXTENT, bbox);
        };
        /**
         * @return bbox string or null if not set
         */
        Query.prototype.getExtent = function () {
            return this.getParameter(Parameters.EXTENT);
        };
        // -----------------------------------------------------------
        /**
         * Ex.
         *  const { KGClassifiers, Query } from 'geoplatform.client';
         *  let purposeId = '...';
         *  let query = new Query();
         *  query.classifier( KGClassifiers.PURPOSE, purposeId );
         *
         * @param classifier - string name of classifier to use
         * @param value - id or array of ids of concepts to use
         * @return Query
         */
        Query.prototype.classifier = function (classifier, value) {
            this.setClassifier(classifier, value);
            return this;
        };
        /**
         * Ex.
         *  const { KGClassifiers, Query } from 'geoplatform.client';
         *  let purposeId = '...';
         *  let query = new Query();
         *  query.setClassifier( KGClassifiers.PURPOSE, purposeId );
         *
         * @param classifier - string name of classifier to use
         * @param value - id or array of ids of concepts to use
         */
        Query.prototype.setClassifier = function (classifier, value) {
            var arr = toArray(value);
            this.setParameter(Parameters.CLASSIFIERS + "." + classifier, arr);
        };
        /**
         * @param classifier - name of classifier constraint in use
         * @return array of concept ids
         */
        Query.prototype.getClassifier = function (classifier) {
            return this.getParameter(Parameters.CLASSIFIERS + "." + classifier) || [];
        };
        /**
         * Ex.
         *  const { KGClassifiers, Query } from 'geoplatform.client';
         *  let purposeId = '...',
         *      functionIds = ['...','...'];
         *  let query = new Query();
         *  query.classifiers({
         *       KGClassifiers.PURPOSE: purposeId,
         *       KGClassifiers.FUNCTION: functionIds
         *  });
         *
         * @param value - object defining classifiers
         * @return Query instance
         */
        Query.prototype.classifiers = function (value) {
            this.setClassifiers(value);
            return this;
        };
        /**
         * @param value - object defining classifiers
         */
        Query.prototype.setClassifiers = function (value) {
            var _this = this;
            var classes = Object.keys(Classifiers).map(function (k) { return Classifiers[k]; });
            if (!value || typeof (value) !== 'object' || Array.isArray(value)) {
                classes.forEach(function (classifier) {
                    _this.clearParameter(Parameters.CLASSIFIERS + "." + classifier);
                });
                return;
            }
            Object.keys(value).forEach(function (classifier) {
                if (~classes.indexOf(classifier)) {
                    _this.setClassifier(classifier, value[classifier]);
                }
            });
        };
        /**
         * @return classifiers used in the query
         */
        Query.prototype.getClassifiers = function () {
            var _this = this;
            var result = {};
            Object.keys(Classifiers).map(function (k) { return Classifiers[k]; }).forEach(function (classifier) {
                result[classifier] = _this.getClassifier(classifier);
            });
            return result;
        };
        // -----------------------------------------------------------
        Query.prototype.modified = function (date, beforeOrAfter) {
            this.setModified(date, beforeOrAfter);
            return this;
        };
        /**
         * @param date - date to compare against
         * @param beforeOrAfter - flag specifying which boundary condition (true = before, false = after) flag specifying whether to trigger update automatically
         */
        Query.prototype.setModified = function (date, beforeOrAfter) {
            //if no date was supplied, consider it "unset" for both properties
            if (!date) {
                this.setParameter(Parameters.MODIFIED_BEFORE, null);
                this.setParameter(Parameters.MODIFIED_AFTER, null);
                return;
            }
            if (!(date instanceof Date))
                date = new Date(date);
            var dir = beforeOrAfter && (beforeOrAfter === true || beforeOrAfter === "true");
            var prop = dir ? Parameters.MODIFIED_BEFORE : Parameters.MODIFIED_AFTER; //property being set
            var oppProp = dir ? Parameters.MODIFIED_AFTER : Parameters.MODIFIED_BEFORE; //unset opposite property
            var arg = (date && date.getTime) ? date.getTime() : date;
            this.setParameter(oppProp, null);
            this.setParameter(prop, arg);
        };
        Query.prototype.getModified = function () {
            var value = this.getParameter(Parameters.MODIFIED_BEFORE) ||
                this.getParameter(Parameters.MODIFIED_AFTER);
            if (value && typeof (value) === 'number') {
                value = new Date(value);
            }
            return value;
        };
        // -----------------------------------------------------------
        Query.prototype.created = function (date, beforeOrAfter) {
            this.setCreated(date, beforeOrAfter);
            return this;
        };
        /**
         * @param date - date to compare against
         * @param beforeOrAfter - flag specifying which boundary condition (true = before, false = after) flag specifying whether to trigger update automatically
         */
        Query.prototype.setCreated = function (date, beforeOrAfter) {
            //if no date was supplied, consider it "unset" for both properties
            if (!date) {
                this.setParameter(Parameters.CREATED_BEFORE, null);
                this.setParameter(Parameters.CREATED_AFTER, null);
                return;
            }
            if (!(date instanceof Date))
                date = new Date(date);
            var dir = beforeOrAfter && (beforeOrAfter === true || beforeOrAfter === "true");
            var prop = dir ? Parameters.CREATED_BEFORE : Parameters.CREATED_AFTER; //property being set
            var oppProp = dir ? Parameters.CREATED_AFTER : Parameters.CREATED_BEFORE; //unset opposite property
            var arg = (date && date.getTime) ? date.getTime() : date;
            this.setParameter(oppProp, null);
            this.setParameter(prop, arg);
        };
        Query.prototype.getCreated = function () {
            var value = this.getParameter(Parameters.CREATED_BEFORE) ||
                this.getParameter(Parameters.CREATED_AFTER);
            if (value && typeof (value) === 'number') {
                value = new Date(value);
            }
            return value;
        };
        // -----------------------------------------------------------
        Query.prototype.begins = function (date) {
            this.setBeginDate(date);
            return this;
        };
        Query.prototype.setBeginDate = function (date) {
            if (date && date instanceof Date)
                date = date.getTime();
            this.setParameter(Parameters.BEGINS, date);
        };
        Query.prototype.getBeginDate = function () {
            var date = this.getParameter(Parameters.BEGINS);
            if (date)
                date = new Date(date);
            return date;
        };
        // -----------------------------------------------------------
        Query.prototype.ends = function (date) {
            this.setEndDate(date);
            return this;
        };
        Query.prototype.setEndDate = function (date) {
            if (date && date instanceof Date)
                date = date.getTime();
            this.setParameter(Parameters.ENDS, date);
        };
        Query.prototype.getEndDate = function () {
            var date = this.getParameter(Parameters.ENDS);
            if (date)
                date = new Date(date);
            return date;
        };
        // -----------------------------------------------------------
        Query.prototype.between = function (begin, end) {
            this.setBetween(begin, end);
            return this;
        };
        Query.prototype.setBetween = function (begin, end) {
            this.begins(begin);
            this.ends(end);
        };
        // -----------------------------------------------------------
        Query.prototype.resourceTypes = function (types) {
            this.setResourceTypes(types);
            return this;
        };
        Query.prototype.setResourceTypes = function (types) {
            this.setParameter(Parameters.RESOURCE_TYPE, toArray(types));
        };
        Query.prototype.getResourceTypes = function () {
            return this.getParameter(Parameters.RESOURCE_TYPE);
        };
        // -----------------------------------------------------------
        Query.prototype.facets = function (names) {
            this.setFacets(names);
            return this;
        };
        /*
         * @param names - names of facets
         */
        Query.prototype.setFacets = function (names) {
            this.setParameter(Parameters.FACETS, toArray(names));
        };
        Query.prototype.getFacets = function () {
            return this.getParameter(Parameters.FACETS);
        };
        /**
         * @param name - name of facet to add
         */
        Query.prototype.addFacet = function (name) {
            var facets = this.getFacets() || [];
            facets.push(name);
            this.setFacets(facets);
        };
        /**
         * @param name - name of facet to remove
         */
        Query.prototype.removeFacet = function (name) {
            var facets = this.getFacets() || [];
            var idx = facets.indexOf(name);
            if (idx >= 0) {
                facets.splice(idx, 1);
                this.setFacets(facets);
            }
        };
        // -----------------------------------------------------------
        Query.prototype.fields = function (fields) {
            this.setFields(fields);
            return this;
        };
        /**
         * @param fields - list of field names to request for each search result
         */
        Query.prototype.setFields = function (fields) {
            this.setParameter(Parameters.FIELDS, toArray(fields));
        };
        Query.prototype.getFields = function () {
            return this.getParameter(Parameters.FIELDS);
        };
        /**
         * @param field - name of field to remove
         */
        Query.prototype.addField = function (field) {
            var fields = this.getFields() || [];
            fields.push(field);
            this.setFields(fields);
        };
        /**
         * @param field - name of field to remove
         */
        Query.prototype.removeField = function (field) {
            var fields = this.getFields() || [];
            var idx = fields.indexOf(field);
            if (idx >= 0) {
                fields.splice(idx, 1);
                this.setFields(fields);
            }
        };
        // -----------------------------------------------------------
        /**
         * @param page - page of results to fetch
         */
        Query.prototype.page = function (page) {
            this.setPage(page);
            return this;
        };
        Query.prototype.setPage = function (page) {
            if (isNaN(page) || page * 1 < 0)
                return;
            this.setParameter(Parameters.PAGE, page * 1);
        };
        Query.prototype.getPage = function () {
            return this.getParameter(Parameters.PAGE);
        };
        Query.prototype.nextPage = function () {
            this.setPage(this.getPage() + 1);
        };
        Query.prototype.previousPage = function () {
            this.setPage(this.getPage() - 1);
        };
        // -----------------------------------------------------------
        /**
         * @param size - page size to request
         */
        Query.prototype.pageSize = function (size) {
            this.setPageSize(size);
            return this;
        };
        Query.prototype.setPageSize = function (size) {
            if (isNaN(size) || size * 1 < 0)
                return;
            this.setParameter(Parameters.PAGE_SIZE, size * 1);
        };
        Query.prototype.getPageSize = function () {
            return this.getParameter(Parameters.PAGE_SIZE);
        };
        // -----------------------------------------------------------
        /**
         * @param sort - form of <field>,<dir> or just field name
         * @param order - optional, either 'asc' or 'desc'
         */
        Query.prototype.sort = function (sort, order) {
            this.setSort(sort, order);
            return this;
        };
        /**
         * @param sort - form of <field>,<dir> or just field name
         * @param order - optional, either 'asc' or 'desc'
         */
        Query.prototype.setSort = function (sort, order) {
            order = order || 'desc';
            if (sort && sort.indexOf(',') < 0)
                sort = sort + ',' + order;
            this.setParameter(Parameters.SORT, sort);
        };
        Query.prototype.getSort = function () {
            return this.getParameter(Parameters.SORT);
        };
        Query.prototype.getSortField = function () {
            var value = this.getSort();
            return value && value.length ? value.split(',')[0] : null;
        };
        Query.prototype.getSortOrder = function () {
            var value = this.getSort();
            return value && value.length ? value.split(',')[1] : null;
        };
        /**
         * @return list of key-value pairs of sort options
         */
        Query.prototype.getSortOptions = function () {
            return SORT_OPTIONS_DEFAULT$1.slice(0);
        };
        // -----------------------------------------------------------
        /**
         *
         */
        Query.prototype.clear = function () {
            this.query = JSON.parse(JSON.stringify(this.defaultQuery));
        };
        return Query;
    }());

    function queryFactory() {
        return new Query();
    }

    var ɵ0$1 = function (options) {
        Object.assign(this, options);
    };
    var Config = {
        ualUrl: 'https://ual.geoplatform.gov',
        //appId: '...',
        configure: ɵ0$1
    };

    var GPHttpClient = /** @class */ (function () {
        /**
         * @param options.timeout
         * @param options.token - the bearer token or a function to retrieve it
         */
        function GPHttpClient(options) {
            this.timeout = 5000;
            this.authCookieName = 'gpoauth-a';
            options = options || {};
            this.setTimeout(options.timeout || 30000);
            this.setAuthToken(options.token);
            this.setCookie(options.cookie);
        }
        GPHttpClient.prototype.setTimeout = function (timeout) {
            this.timeout = timeout;
        };
        /**
         * @param arg - specify the bearer token or a function to retrieve it
         */
        GPHttpClient.prototype.setAuthToken = function (arg) {
            if (arg && typeof (arg) === 'string')
                this.token = function () { return arg; };
            else if (arg && typeof (arg) === 'function')
                this.token = arg;
            //else do nothing
        };
        GPHttpClient.prototype.getToken = function () {
            if (this.token && typeof (this.token) === 'function')
                return this.token();
            else
                return this.token || null;
        };
        GPHttpClient.prototype.setCookie = function (cookie) {
            this.cookie = cookie;
        };
        GPHttpClient.prototype.getCookie = function () {
            return this.cookie;
        };
        GPHttpClient.prototype.createRequestOpts = function (
        // @ts-ignore
        options) {
            throw new Error("Must implement 'createRequestOpts' in a sub-class");
        };
        GPHttpClient.prototype.execute = function (
        // @ts-ignore
        opts) {
            return Promise.reject(new Error("Must overrdie 'execute' in a sub-class"));
        };
        return GPHttpClient;
    }());

    var XHRHttpClient = /** @class */ (function (_super) {
        __extends(XHRHttpClient, _super);
        /**
         * @param options.timeout
         * @param options.token - the bearer token or a function to retrieve it
         */
        function XHRHttpClient(options) {
            return _super.call(this, options) || this;
        }
        XHRHttpClient.prototype.createRequestOpts = function (options) {
            var opts = {
                method: options.method,
                url: options.url,
                timeout: options.timeout || this.timeout
            };
            if (options.json === true)
                opts.responseType = 'json';
            if (options.params) {
                opts.params = options.params;
            }
            if (options.data) {
                opts.data = options.data;
                opts.contentType = 'application/json';
            }
            //set headers requested by user config
            opts.headers = {};
            if (options.headers) {
                Object.assign(opts.headers, options.headers);
            }
            //set authorization header if one was provided
            if (this.token) {
                var token = this.token();
                if (token) {
                    opts.headers.Authorization = 'Bearer ' + token;
                    opts.withCredentials = true;
                }
            }
            var cookie = this.getCookie();
            if (cookie)
                opts.headers.Cookie = this.authCookieName + '=' + cookie;
            //copy over user-supplied options
            if (options.options) {
                for (var o in options.options) {
                    if (options.options.hasOwnProperty(o)) {
                        opts[o] = options.options[o];
                    }
                }
            }
            return opts;
        };
        XHRHttpClient.prototype.execute = function (opts) {
            if (typeof (axios) === 'undefined') {
                throw new Error("Axios not found, check that you have included " +
                    "it as a dependency of the application or use a different " +
                    "HttpClient implementation");
            }
            var promise = axios(opts)
                .then(function (response) { return response.data; })
                .catch(function (error) {
                var err = new GPError(error.message);
                if (error.response) {
                    err = new GPError(error.response.data);
                }
                throw err;
            });
            return promise;
        };
        return XHRHttpClient;
    }(GPHttpClient));

    /**
     * BaseService
     * abstract service for working with the GeoPlatform API to
     * retrieve and manipulate items.
     *
     */
    var BaseService = /** @class */ (function () {
        function BaseService(url, httpClient) {
            this._timeout = 30000;
            this.httpMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
            this.setUrl(url);
            this.client = httpClient;
        }
        BaseService.prototype.setUrl = function (baseUrl) {
            this.apiBase = baseUrl;
            this.baseUrl = baseUrl + '/api/items';
        };
        /**
         * @param milliseconds - override environment variable timeout
         */
        BaseService.prototype.setTimeout = function (milliseconds) {
            this._timeout = milliseconds;
        };
        /**
         * @param milliseconds - override environment variable timeout
         */
        BaseService.prototype.timeout = function (milliseconds) {
            this.setTimeout(milliseconds);
            return this;
        };
        /**
         * @return GPHttpClient instance or null if one was not provided
         */
        BaseService.prototype.getClient = function () {
            return this.client;
        };
        BaseService.prototype.createPromise = function (arg) {
            return new Promise(arg);
        };
        BaseService.prototype.createAndResolvePromise = function (value) {
            return Promise.resolve(value);
        };
        BaseService.prototype.createAndRejectPromise = function (error) {
            return Promise.reject(error);
        };
        /**
         * @param logger - log service
         */
        BaseService.prototype.setLogger = function (logger) {
            this.logger = logger;
        };
        /**
         * @param e - error to log (if logger specified)
         */
        BaseService.prototype.logError = function (e) {
            if (this.logger && this.logger.error) {
                this.logger.error(e);
            }
        };
        /**
         * @param msg - message to log as debug
         */
        BaseService.prototype.logDebug = function (msg) {
            if (this.logger && this.logger.debug) {
                this.logger.debug(msg);
            }
        };
        /**
         * @param method - one of "GET", "POST", "PUT", "DELETE", "PATCH"
         * @param url - destination of xhr request
         * @param params - object to be sent with request as query parameters
         * @param data - object to be sent with request as body
         * @param options - optional object defining request options
         * @return request options for xhr
         */
        BaseService.prototype.buildRequest = function (options) {
            if (this.httpMethods.indexOf(options.method) < 0)
                throw new Error("Unsupported HTTP method " + options.method);
            if (!options.url)
                throw new Error("Must specify a URL for HTTP requests");
            options.timeout = this._timeout || 30000;
            var opts = this.createRequestOpts(options);
            return opts;
        };
        BaseService.prototype.createRequestOpts = function (options) {
            if (typeof (options.options) === 'object') {
                var req_1 = options.options; //user supplied configuration
                delete options.options;
                if (req_1.params && options.params) { //merge user params with ones needed by API calls
                    //Note: any user-supplied parameter of the same name as one used
                    // by the GP API call will be overwritten
                    Object.keys(options.params).forEach(function (param) {
                        req_1.params[param] = options.params[param];
                    });
                    delete options.params;
                }
                Object.assign(req_1, options);
                options = req_1;
            }
            var request = this.client.createRequestOpts(options);
            this.logDebug("BaseService.createRequestOpts() - " + JSON.stringify(request));
            return request;
        };
        BaseService.prototype.execute = function (opts) {
            var _this = this;
            return this.client.execute(opts)
                .catch(function (e) {
                if (e === null || typeof (e) === 'undefined') {
                    e = new Error("Request failed but didn't return an " +
                        "error. This is most likely because the request timed out");
                }
                return _this.createAndRejectPromise(e);
            });
        };
        return BaseService;
    }());

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
    var ItemService = /** @class */ (function (_super) {
        __extends(ItemService, _super);
        function ItemService(url, httpClient) {
            return _super.call(this, url, httpClient) || this;
        }
        /**
         * @param id - identifier of item to fetch
         * @param options - optional set of request options to apply to xhr request
         * @return Promise resolving Item object or an error
         */
        ItemService.prototype.get = function (id, options) {
            var _this = this;
            var url = this.baseUrl + '/' + id;
            if (options && options.version) {
                url += '/versions/' + options.version;
                // this.logDebug("Client.get requesting version: " + options.version);
            }
            return this.createAndResolvePromise(url)
                .then(function (url) {
                var opts = _this.buildRequest({ method: "GET", url: url, options: options });
                return _this.execute(opts);
            })
                .catch(function (e) {
                var err = new Error("Error fetching item " + id + ": " + e.message);
                Object.assign(err, e);
                _this.logError('ItemService.get() - ' + err.message);
                throw err;
            });
        };
        /**
         * @param itemObj - item to create or update
         * @param options - optional set of request options to apply to xhr request
         * @return Promise resolving Item object or an error
         */
        ItemService.prototype.save = function (itemObj, options) {
            var _this = this;
            return this.createAndResolvePromise(itemObj)
                .then(function (item) {
                var method = 'POST', url = _this.baseUrl;
                if (item.id) {
                    method = "PUT";
                    url += '/' + item.id;
                }
                else {
                    //if item is being created and has no URI already defined
                    // attempt to create one using the API's method for doing so
                    // and then attempt the actual item creation
                    if (!item.uri) {
                        return _this.getUri(item, options)
                            .then(function (uri) {
                            item.uri = uri;
                            var opts = _this.buildRequest({ method: method, url: url, data: item, options: options });
                            return _this.execute(opts);
                        });
                    }
                }
                var opts = _this.buildRequest({ method: method, url: url, data: item, options: options });
                return _this.execute(opts);
            })
                .catch(function (e) {
                var err = new Error("Error saving item: " + e.message);
                Object.assign(err, e);
                _this.logError('ItemService.save() - ' + err.message);
                throw err;
            });
        };
        /**
         * @param id - identifier of item to delete
         * @param options - optional set of request options to apply to xhr request
         * @return Promise resolving true if successful or an error
         */
        ItemService.prototype.remove = function (id, options) {
            var _this = this;
            return this.createAndResolvePromise(this.baseUrl + '/' + id)
                .then(function (url) {
                var opts = _this.buildRequest({
                    method: "DELETE", url: url, options: options
                });
                return _this.execute(opts);
            })
                .then(function () { return true; })
                .catch(function (e) {
                var err = new Error("Error deleting item " + id + ": " + e.message);
                Object.assign(err, e);
                _this.logError('ItemService.remove() - ' + err.message);
                throw err;
            });
        };
        /**
         * @param id - identifier of item to patch
         * @param patch - HTTP-PATCH compliant set of properties to patch
         * @param options - optional set of request options to apply to xhr request
         * @return Promise resolving Item object or an error
         */
        ItemService.prototype.patch = function (id, patch, options) {
            var _this = this;
            return this.createAndResolvePromise(this.baseUrl + '/' + id)
                .then(function (url) {
                var opts = _this.buildRequest({
                    method: "PATCH", url: url, data: patch, options: options
                });
                return _this.execute(opts);
            })
                .catch(function (e) {
                var err = new Error("Error patching item " + id + ": " + e.message);
                Object.assign(err, e);
                _this.logError('ItemService.patch() - ' + err.message);
                throw err;
            });
        };
        /**
         * @param id - identifier of item to clone
         * @param overrides - KVP of property-value overrides to apply to cloned instance
         * @param options - optional set of request options to apply to xhr request
         * @return Promise resolving clone of Item or an error
         */
        ItemService.prototype.clone = function (id, overrides, options) {
            var _this = this;
            return this.createAndResolvePromise(this.baseUrl + '/' + id + '/clone')
                .then(function (url) {
                var opts = _this.buildRequest({
                    method: "POST", url: url, data: overrides, options: options
                });
                return _this.execute(opts);
            })
                .catch(function (e) {
                var err = new Error("Error cloning item " + id + ": " + e.message);
                Object.assign(err, e);
                _this.logError('ItemService.clone() - ' + err.message);
                throw err;
            });
        };
        /**
         * @param arg - either JS object of query parameters or Query instance
         * @param options - optional set of request options to apply to xhr request
         * @return Promise resolving search results
         */
        ItemService.prototype.search = function (arg, options) {
            var _this = this;
            return this.createAndResolvePromise(arg)
                .then(function (params) {
                var ps = {};
                if (params && typeof (params.getQuery) === 'function')
                    ps = params.getQuery();
                else if (typeof (params) === 'object')
                    ps = params;
                else
                    ps = {};
                var opts = _this.buildRequest({
                    method: "GET",
                    url: _this.baseUrl,
                    params: ps,
                    options: options
                });
                return _this.execute(opts);
            })
                .catch(function (e) {
                var err = new Error("Error searching items: " + e.message);
                Object.assign(err, e);
                _this.logError('ItemService.search() - ' + err.message);
                throw err;
            });
        };
        /**
         *
         * @param arg - URL to metadata document or File to upload
         * @param format - metadata format of specified document
         * @return Promise resolving GeoPlatform Item
         */
        ItemService.prototype.import = function (arg, format, options) {
            var _this = this;
            return this.createAndResolvePromise(true)
                .then(function () {
                if (arg === null || arg === undefined) {
                    throw new Error("Must provide a valid URL or File");
                }
                var isFile = typeof (arg) !== 'string';
                var ro = {
                    method: "POST",
                    url: _this.apiBase + '/api/import',
                    processData: true,
                    formData: true,
                    options: options
                };
                if (isFile) {
                    ro.file = arg;
                    ro.data = { format: format };
                }
                else {
                    ro.formData = false; //must be false for data to not be multi-part formdata
                    ro.data = { url: arg, format: format };
                }
                if (options && options.overwrite) {
                    ro.data.overwrite = (!!options.overwrite) + '';
                    delete options.overwrite;
                }
                var opts = _this.buildRequest(ro);
                return _this.execute(opts);
            })
                .catch(function (e) {
                var err = new Error("Error importing item: " + (e.message || e));
                Object.assign(err, e);
                if (e.status === 409 || (e.message && ~e.message.indexOf('Item already exists')))
                    Object.assign(err, { status: 409 });
                if (e.item)
                    Object.assign(err, { item: e.item });
                _this.logError('ItemService.import() - ' + (err.message || e));
                throw err;
            });
        };
        /**
         * @param id - identifier of the item to export
         * @param format - string mime type to export
         * @return Promise resolving HTTP response object for enabling attachment downloading
         */
        ItemService.prototype.export = function (id, format, options) {
            var _this = this;
            return this.createAndResolvePromise(true)
                .then(function () {
                var url = _this.baseUrl + '/' + id + '/export';
                var opts = _this.buildRequest({
                    method: "GET", url: url,
                    params: { format: format },
                    json: false,
                    options: options
                });
                return _this.execute(opts);
            })
                .catch(function (e) {
                var msg = e.message;
                //https://github.com/GeoPlatform/client-api/issues/1
                if (e.statusCode && e.statusCode === 406 || e.statusCode === '406') {
                    msg = "Unsupported export format specified '" + format + "'";
                }
                var err = new Error("Error exporting item: " + msg);
                Object.assign(err, e);
                _this.logError('ItemService.export() - ' + err.message);
                throw err;
            });
        };
        /**
         * @param object - GP object definition to generate a URI for
         * @param options - optional request options
         * @return Promise resolving string URI
         */
        ItemService.prototype.getUri = function (object, options) {
            var _this = this;
            return this.createAndResolvePromise(object)
                .then(function (obj) {
                if (!obj || !obj.type)
                    throw new Error("Must provide an object with a type property");
                var url = _this.apiBase + '/api/utils/uri';
                options = options || {};
                options.responseType = 'text'; //to ensure plaintext is expected
                var opts = _this.buildRequest({
                    method: "POST", url: url, data: obj, options: options
                });
                return _this.execute(opts);
            })
                .catch(function (e) {
                var err = new Error("Error getting URI for item: " + e.message);
                Object.assign(err, e);
                _this.logError('ItemService.getUri() - ' + err.message);
                throw err;
            });
        };
        /**
         * @param ids - list of identifiers to fetch objects for
         * @param options - optional set of request options to apply to xhr request
         * @return Promise resolving list of matching items or an error
         */
        ItemService.prototype.getMultiple = function (ids, options) {
            var _this = this;
            return this.createAndResolvePromise(ids)
                .then(function (identifiers) {
                var method = 'POST', url = _this.apiBase + '/api/fetch';
                var opts = _this.buildRequest({ method: method, url: url, data: identifiers, options: options });
                return _this.execute(opts);
            })
                .catch(function (e) {
                var err = new Error("Error fetching items: " + e.message);
                Object.assign(err, e);
                _this.logError('ItemService.getMultiple() - ' + err.message);
                throw err;
            });
        };
        /**
         * @param uris - list of URIs to retrieve objects for
         * @param options - optional set of request options to apply to xhr request
         * @return Promise resolving list containing uri-item association where exists
         */
        ItemService.prototype.exists = function (uris, options) {
            var _this = this;
            return this.createAndResolvePromise(uris)
                .then(function (uris) {
                var method = 'POST', url = _this.apiBase + '/api/utils/exists';
                var opts = _this.buildRequest({ method: method, url: url, data: uris, options: options });
                return _this.execute(opts);
            })
                .catch(function (e) {
                var err = new Error("Error resolving items: " + e.message);
                Object.assign(err, e);
                _this.logError('ItemService.exists() - ' + err.message);
                throw err;
            });
        };
        ItemService.prototype.like = function (item, options) {
            var _this = this;
            return this.createAndResolvePromise(item.id)
                .then(function (id) {
                var method = 'PUT', url = _this.apiBase + '/api/items/' + id + '/likes';
                var opts = _this.buildRequest({ method: method, url: url, options: options });
                return _this.execute(opts);
            })
                .catch(function (e) {
                var err = new Error("Error liking item " + item.id + ": " + e.message);
                Object.assign(err, e);
                _this.logError('ItemService.like() - ' + err.message);
                throw err;
            });
        };
        ItemService.prototype.view = function (item, options) {
            var _this = this;
            return this.createAndResolvePromise(item.id)
                .then(function (id) {
                var method = 'PUT', url = _this.apiBase + '/api/items/' + id + '/views';
                var opts = _this.buildRequest({ method: method, url: url, options: options });
                return _this.execute(opts);
            })
                .catch(function (e) {
                var err = new Error("Error incrementing views for item " + item.id + ": " + e.message);
                Object.assign(err, e);
                _this.logError('ItemService.like() - ' + err.message);
                throw err;
            });
        };
        /**
         * @param id - identifier of item to fetch associations for
         * @param options - optional set of request options to apply to xhr request
         * @return Promise resolving array of associated items of the item in question
         */
        ItemService.prototype.associations = function (id, params, options) {
            var _this = this;
            return this.createAndResolvePromise(id)
                .then(function (id) {
                var url = _this.baseUrl + '/' + id + '/associations';
                var opts = _this.buildRequest({
                    method: "GET",
                    url: url,
                    params: params || {},
                    options: options
                });
                return _this.execute(opts);
            })
                .catch(function (e) {
                var err = new Error("Error fetching associations for item " + id + ": " + e.message);
                Object.assign(err, e);
                _this.logError('ItemService.associations() - ' + err.message);
                throw err;
            });
        };
        /**
         * @param id - identifier of item to fetch version info for
         * @param params - optional set of query parameters to constrain list of versions
         * @param options - optional set of request options to apply to xhr request
         * @return Promise resolving array of available versions of the item
         */
        ItemService.prototype.versions = function (id, params, options) {
            var _this = this;
            return this.createAndResolvePromise(id)
                .then(function (id) {
                var url = _this.baseUrl + '/' + id + '/versions';
                var opts = _this.buildRequest({
                    method: "GET", url: url, params: params, options: options
                });
                return _this.execute(opts);
            })
                .catch(function (e) {
                var err = new Error("Error fetching versions for item " + id + ": " + e.message);
                Object.assign(err, e);
                _this.logError('ItemService.versions() - ' + err.message);
                throw err;
            });
        };
        return ItemService;
    }(BaseService));

    /**
     * GeoPlatform Map service
     * service for working with the GeoPlatform API to
     * retrieve and manipulate map objects.
     *
     * @see GeoPlatform.ItemService
     */
    var DatasetService = /** @class */ (function (_super) {
        __extends(DatasetService, _super);
        function DatasetService(url, httpClient) {
            return _super.call(this, url, httpClient) || this;
        }
        DatasetService.prototype.setUrl = function (baseUrl) {
            _super.prototype.setUrl.call(this, baseUrl);
            this.baseUrl = baseUrl + '/api/datasets';
        };
        return DatasetService;
    }(ItemService));

    /**
     * GeoPlatform Map service
     * service for working with the GeoPlatform API to
     * retrieve and manipulate map objects.
     *
     * @see GeoPlatform.ItemService
     */
    var MapService = /** @class */ (function (_super) {
        __extends(MapService, _super);
        function MapService(url, httpClient) {
            return _super.call(this, url, httpClient) || this;
        }
        MapService.prototype.setUrl = function (baseUrl) {
            _super.prototype.setUrl.call(this, baseUrl);
            this.baseUrl = baseUrl + '/api/maps';
        };
        return MapService;
    }(ItemService));

    /**
     * GeoPlatform Map service
     * service for working with the GeoPlatform API to
     * retrieve and manipulate map objects.
     *
     * @see GeoPlatform.ItemService
     */
    var LayerService = /** @class */ (function (_super) {
        __extends(LayerService, _super);
        function LayerService(url, httpClient) {
            return _super.call(this, url, httpClient) || this;
        }
        LayerService.prototype.setUrl = function (baseUrl) {
            _super.prototype.setUrl.call(this, baseUrl);
            this.baseUrl = baseUrl + '/api/layers';
        };
        /**
         * Fetch a style associated with a given GeoPlatform Layer asset. This may
         * be the style for an Esri FeatureServer layer using the following:
         *
         *   .style( layerId, options);
         *
         * or a specific style definition for a non-Esri layer using the following call:
         *
         *   .style( layerId, styleId, options);
         *
         * @param id - GeoPlatform Layer identifier
         * @param options - optional set of request options to apply to xhr request
         * @return Promise resolving style JSON object
         */
        LayerService.prototype.style = function (id) {
            var _this = this;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return this.createAndResolvePromise(id)
                .then(function (id) {
                var options = { params: null };
                var url = _this.baseUrl + '/' + id + '/style';
                if (args[0] && typeof (args[0]) === 'string') { //style id parameter
                    url += 's/' + args[0]; //
                    if (args[1])
                        options.params = args[1]; // ... plus options parameter
                }
                else if (args[0] && typeof (args[0]) === 'object') { //options parameter
                    options.params = args[0];
                }
                var opts = _this.buildRequest({ method: "GET", url: url, options: options });
                return _this.execute(opts);
            })
                .catch(function (e) {
                var err = new Error("Error fetching style: " + e.message);
                Object.assign(err, e);
                _this.logError('LayerService.style() - ' + err.message);
                throw err;
            });
        };
        /**
         * Fetch the list of styles associated with a given GeoPlatform Layer asset
         * @param id - GeoPlatform Layer identifier
         * @param options - optional set of request options to apply to xhr request
         * @return Promise resolving style JSON object
         */
        LayerService.prototype.styles = function (id, options) {
            var _this = this;
            return this.createAndResolvePromise(id)
                .then(function (id) {
                var url = _this.baseUrl + '/' + id + '/styles';
                var opts = _this.buildRequest({ method: "GET", url: url, options: options });
                return _this.execute(opts);
            })
                .catch(function (e) {
                var err = new Error("Error fetching style: " + e.message);
                Object.assign(err, e);
                _this.logError('LayerService.style() - ' + err.message);
                throw err;
            });
        };
        /**
         * @param id - GeoPlatform Layer identifier
         * @param req identifying extent, x, y
         * @param options - optional set of request options to apply to xhr request
         * @return Promise resolving feature JSON object
         */
        LayerService.prototype.describe = function (id, req, options) {
            var _this = this;
            return this.createAndResolvePromise(req)
                .then(function (req) {
                if (!req) {
                    throw new Error("Must provide describe parameters to use");
                }
                var keys = ['bbox', 'height', 'width', 'x', 'y'];
                var missing = keys.find(function (key) { return !req[key]; });
                if (missing) {
                    throw new Error("Must specify " + missing + " in describe req");
                }
                var params = {
                    srs: 'EPSG:4326',
                    bbox: req.bbox,
                    height: req.height,
                    width: req.width,
                    info_format: 'text/xml',
                    x: req.x,
                    y: req.y,
                    i: req.x,
                    j: req.y //WMS 1.3.0
                };
                var url = _this.baseUrl + '/' + id + '/describe';
                var opts = _this.buildRequest({
                    method: "GET", url: url, params: params, options: options
                });
                return _this.execute(opts);
            })
                .catch(function (e) {
                var err = new Error("Error describing layer feature: " + e.message);
                Object.assign(err, e);
                _this.logError('LayerService.describe() - ' + err.message);
                throw err;
            });
        };
        /**
         * @param id - GeoPlatform Layer identifier
         * @param params describing layer request to validate
         * @param options - optional set of request options to apply to xhr request
         * @return Promise resolving empty if successful or a message if failed
         */
        LayerService.prototype.validate = function (id, params, options) {
            var _this = this;
            return this.createAndResolvePromise(params)
                .then(function (params) {
                if (!params) {
                    throw new Error("Must provide parameters to use in layer validation");
                }
                var url = _this.baseUrl + '/' + id + '/validate';
                var opts = _this.buildRequest({
                    method: "GET", url: url, params: params, options: options
                });
                return _this.execute(opts);
            })
                .catch(function (e) {
                var err = new Error("Error validating layer request: " + e.message);
                Object.assign(err, e);
                _this.logError('LayerService.describe() - ' + err.message);
                throw err;
            });
        };
        return LayerService;
    }(ItemService));

    /**
     * GeoPlatform Service service
     * service for working with the GeoPlatform API to
     * retrieve and manipulate service objects.
     *
     * @see ItemService
     */
    var ServiceService = /** @class */ (function (_super) {
        __extends(ServiceService, _super);
        function ServiceService(url, httpClient) {
            return _super.call(this, url, httpClient) || this;
        }
        ServiceService.prototype.setUrl = function (baseUrl) {
            _super.prototype.setUrl.call(this, baseUrl);
            this.baseUrl = baseUrl + '/api/services';
        };
        /**
         * Fetch metadata from the specified GeoPlatform Service's
         * web-accessible implementation using either GetCapabilities
         * or ESRI documentInfo.
         * @param service - GeoPlatform Service object
         * @param options - optional set of request options to apply to xhr request
         * @return Promise resolving service metadata
         */
        ServiceService.prototype.about = function (service, options) {
            var _this = this;
            return this.createAndResolvePromise(service)
                .then(function (svc) {
                if (!svc)
                    throw new Error("Must provide service to get metadata about");
                var opts = _this.buildRequest({
                    method: 'POST', url: _this.baseUrl + '/about', data: svc, options: options
                });
                return _this.execute(opts);
            })
                .catch(function (e) {
                var err = new Error("Error describing service: " + e.message);
                Object.assign(err, e);
                _this.logError('ServiceService.about() - ' + err.message);
                throw err;
            });
        };
        /**
         * @param id - identifier of the parent service to fetch layers from
         * @param options - optional set of request options to apply to xhr request
         * @return Promise resolving search results containing Layers
         */
        ServiceService.prototype.layers = function (id, options) {
            var _this = this;
            return this.createAndResolvePromise(id)
                .then(function (svcId) {
                if (!svcId)
                    throw new Error("Must provide service identifier");
                var opts = _this.buildRequest({
                    method: 'GET',
                    url: _this.baseUrl + '/' + svcId + '/layers',
                    options: options
                });
                return _this.execute(opts);
            })
                .catch(function (e) {
                var err = new Error("Error fetching service layers: " + e.message);
                Object.assign(err, e);
                _this.logError('ServiceService.layers() - ' + err.message);
                throw err;
            });
        };
        /**
         * @param options - optional set of request options to apply to request
         * @return Promise resolving service types
         */
        ServiceService.prototype.types = function (options) {
            var _this = this;
            var query = new Query()
                .types(ItemTypes.STANDARD)
                .resourceTypes('ServiceType')
                .pageSize(50)
                .getQuery();
            return this.createAndResolvePromise(query)
                .then(function (params) {
                var url = _this.apiBase + '/api/items';
                var opts = _this.buildRequest({
                    method: 'GET', url: url, params: params, options: options
                });
                return _this.execute(opts);
            })
                .then(function (response) { return response.results; })
                .catch(function (e) {
                var err = new Error("Error fetching service types: " + e.message);
                Object.assign(err, e);
                _this.logError('ServiceService.types() - ' + err.message);
                throw err;
            });
        };
        /**
         * @param service - GP Service definition
         * @param options - optional set of request options to apply to request
         * @return Promise resolving imported service
         */
        ServiceService.prototype.import = function (service, options) {
            var _this = this;
            return this.createAndResolvePromise(service)
                .then(function (svc) {
                var url = _this.baseUrl + '/import';
                var opts = _this.buildRequest({
                    method: 'POST', url: url, data: svc, options: options
                });
                return _this.execute(opts);
            })
                .catch(function (e) {
                var err = new Error("Error importing service: " + e.message);
                Object.assign(err, e);
                _this.logError('ServiceService.import() - ' + err.message);
                throw err;
            });
        };
        /**
         * @param id - identifier of GP service to harvest layers for
         * @param options - optional set of request options to apply to request
         * @return Promise resolving service layers
         */
        ServiceService.prototype.harvest = function (id, options) {
            var _this = this;
            return this.createAndResolvePromise(id)
                .then(function (id) {
                var url = _this.baseUrl + '/' + id + '/harvest';
                var opts = _this.buildRequest({
                    method: 'GET', url: url, options: options
                });
                return _this.execute(opts);
            })
                .catch(function (e) {
                var err = new Error("Error harvesting layers from service: " + e.message);
                Object.assign(err, e);
                _this.logError('ServiceService.harvest() - ' + err.message);
                throw err;
            });
        };
        /**
         * @param id - identifier of GP service to live test
         * @param options - optional set of request options to apply to request
         * @return Promise resolving service statistics
         */
        ServiceService.prototype.liveTest = function (id, options) {
            var _this = this;
            return this.createAndResolvePromise(id)
                .then(function (id) {
                var url = _this.baseUrl + '/' + id + '/test';
                var opts = _this.buildRequest({
                    method: 'GET', url: url, options: options
                });
                return _this.execute(opts);
            })
                .catch(function (e) {
                var err = new Error("Error testing service: " + e.message);
                Object.assign(err, e);
                _this.logError('ServiceService.liveTest() - ' + err.message);
                throw err;
            });
        };
        /**
         * @param id - identifier of GP service to fetch statistics about
         * @param options - optional set of request options to apply to request
         * @return Promise resolving service statistics
         */
        ServiceService.prototype.statistics = function (id, options) {
            var _this = this;
            return this.createAndResolvePromise(id)
                .then(function (id) {
                var url = _this.baseUrl + '/' + id + '/statistics';
                var opts = _this.buildRequest({
                    method: 'GET', url: url, options: options
                });
                return _this.execute(opts);
            })
                .catch(function (e) {
                var err = new Error("Error getting service statistics: " + e.message);
                Object.assign(err, e);
                _this.logError('ServiceService.statistics() - ' + err.message);
                throw err;
            });
        };
        return ServiceService;
    }(ItemService));

    /**
     * GeoPlatform Map service
     * service for working with the GeoPlatform API to
     * retrieve and manipulate map objects.
     *
     * @see GeoPlatform.ItemService
     */
    var GalleryService = /** @class */ (function (_super) {
        __extends(GalleryService, _super);
        function GalleryService(url, httpClient) {
            return _super.call(this, url, httpClient) || this;
        }
        GalleryService.prototype.setUrl = function (baseUrl) {
            _super.prototype.setUrl.call(this, baseUrl);
            this.baseUrl = baseUrl + '/api/galleries';
        };
        GalleryService.prototype.addItem = function (galleryId, itemObj, options) {
            var _this = this;
            return this.createAndResolvePromise(true)
                .then(function () {
                var url = _this.baseUrl + '/' + galleryId + '/items';
                var opts = _this.buildRequest({
                    method: 'POST', url: url, data: itemObj, options: options
                });
                return _this.execute(opts);
            })
                .catch(function (e) {
                var err = new Error("Error adding item: " + e.message);
                Object.assign(err, e);
                _this.logError('GalleryService.addItem() - ' + err.message);
                throw err;
            });
        };
        GalleryService.prototype.removeItem = function (galleryId, itemId, options) {
            var _this = this;
            return this.createAndResolvePromise(this.baseUrl + '/' + galleryId + '/items/' + itemId)
                .then(function (url) {
                var opts = _this.buildRequest({
                    method: 'DELETE', url: url, options: options
                });
                return _this.execute(opts);
            })
                .then(function () { return true; })
                .catch(function (e) {
                var err = new Error("Error adding item: " + e.message);
                Object.assign(err, e);
                _this.logError('GalleryService.addItem() - ' + err.message);
                throw err;
            });
        };
        return GalleryService;
    }(ItemService));

    var UtilsService = /** @class */ (function (_super) {
        __extends(UtilsService, _super);
        function UtilsService(url, httpClient) {
            var _this = _super.call(this, url, httpClient) || this;
            _this.setTimeout(30000);
            return _this;
        }
        UtilsService.prototype.setUrl = function (baseUrl) {
            _super.prototype.setUrl.call(this, baseUrl);
            this.baseUrl = baseUrl;
        };
        /**
         * @param property - optional capa property to specifically request
         * @param query - optional query parameters to include with request
         * @param options - optional config to send with http request
         * @return Promise resolving capabilities object
         */
        UtilsService.prototype.capabilities = function (property, query, options) {
            var _this = this;
            var url = this.baseUrl + '/api/capabilities';
            if (property)
                url += '/' + property;
            return this.createAndResolvePromise(url)
                .then(function (url) {
                var opts = _this.buildRequest({
                    method: "GET", url: url, params: query || {}, options: options
                });
                return _this.execute(opts);
            })
                .catch(function (e) {
                var err = new Error("Error getting capabilities: " + e.message);
                Object.assign(err, e);
                _this.logError('UtilsService.capabilities() - ' + err.message);
                throw err;
            });
        };
        /**
         * @param file
         * @param format
         * @param options
         * @return Promise
         */
        UtilsService.prototype.parseFile = function (file, format, options) {
            var _this = this;
            var url = this.baseUrl + '/api/utils/parse';
            return this.createAndResolvePromise(url)
                .then(function (url) {
                var opts = _this.buildRequest({
                    method: "POST", url: url,
                    data: { format: format },
                    file: file,
                    formData: true,
                    options: options
                });
                return _this.execute(opts);
            })
                .then(function (response) { return response; })
                .catch(function (e) {
                var err = new Error("Error parsing file: " + e.message);
                Object.assign(err, e);
                _this.logError('UtilsService.parseFile() - ' + err.message);
                throw err;
            });
        };
        /**
         * Geolocate the specified argument to a set of candidate locations.
         * @param value - text string to geolocate (name or lat,lng)
         * @param options - optional config to send with http request
         * @return Promise resolving an array of geocoded results
         */
        UtilsService.prototype.locate = function (value, options) {
            var _this = this;
            var url = this.baseUrl + '/api/utils/gazetteer';
            return this.createAndResolvePromise(url)
                .then(function (url) {
                var opts = _this.buildRequest({
                    method: 'GET',
                    url: url,
                    params: { location: value },
                    options: options
                });
                return _this.execute(opts);
            })
                .then(function (response) { return response; })
                .catch(function (e) {
                var err = new Error("Error resolving location: " + e.message);
                Object.assign(err, e);
                _this.logError('UtilsService.locate() - ' + err.message);
                throw err;
            });
        };
        /**
         * Upload a file to store within the GeoPlatform for association with
         * one or more portfolio Assets.
         *
         * @param file File to store
         * @param format string media type of the file being stored
         * @param options optional
         * @return Promise resolving metadata for stored content
         */
        UtilsService.prototype.store = function (file, format, options) {
            var _this = this;
            var url = this.baseUrl + '/api/store';
            return this.createAndResolvePromise(url)
                .then(function (url) {
                var opts = _this.buildRequest({
                    method: "POST",
                    url: url,
                    data: { format: format },
                    file: file,
                    formData: true,
                    options: options
                });
                return _this.execute(opts);
            })
                .then(function (response) { return response; })
                .catch(function (e) {
                var err = new Error("Error uploading file for storage: " + e.message);
                Object.assign(err, e);
                _this.logError('UtilsService.store() - ' + err.message);
                throw err;
            });
        };
        return UtilsService;
    }(BaseService));

    /**
     * GeoPlatform Association service
     * service for working with the GeoPlatform API to
     * retrieve and manipulate association objects.
     *
     * @see GeoPlatform.ItemService
     */
    var AssociationService = /** @class */ (function (_super) {
        __extends(AssociationService, _super);
        function AssociationService(url, httpClient) {
            return _super.call(this, url, httpClient) || this;
        }
        /**
         * @param itemId - identifier of item to fetch associations for
         * @param options - optional set of request options to apply to xhr request
         * @return Promise resolving array of associated items of the item in question
         */
        AssociationService.prototype.search = function (itemId, params, options) {
            var _this = this;
            return this.createAndResolvePromise(itemId)
                .then(function (id) {
                if (!id)
                    throw new Error("Must specify a GeoPlatform resource for which to search associations");
                var url = _this.baseUrl + '/' + id + '/associations';
                var opts = _this.buildRequest({
                    method: "GET",
                    url: url,
                    params: params || {},
                    options: options
                });
                return _this.execute(opts);
            })
                .catch(function (e) {
                var err = new Error("Error fetching associations for item " + itemId + ": " + e.message);
                Object.assign(err, e);
                _this.logError("AssociationService.search(" + itemId + ") - " + err.message);
                throw err;
            });
        };
        /**
         * @param itemId - identifier of item
         * @param associationId - identifier of association to fetch
         * @param options - optional set of request options to apply to xhr request
         * @return Promise resolving association
         */
        AssociationService.prototype.get = function (itemId, associationId, options) {
            var _this = this;
            return this.createAndResolvePromise(itemId)
                .then(function (itemId) {
                if (!itemId || !associationId)
                    throw new Error("Must specify both the GeoPlatform resource id and its association's id");
                var url = _this.baseUrl + '/' + itemId + '/associations/' + associationId;
                var opts = _this.buildRequest({ method: "GET", url: url, options: options });
                return _this.execute(opts);
            })
                .catch(function (e) {
                var err = new Error("Error fetching association for item " + itemId + ": " + e.message);
                Object.assign(err, e);
                _this.logError("AssociationService.get(" + itemId + "," + associationId + ") - " + err.message);
                throw err;
            });
        };
        /**
         * @param itemId - identifier of item
         * @param associationId - identifier of association to remove
         * @param options - optional set of request options to apply to xhr request
         * @return Promise resolving empty
         */
        AssociationService.prototype.remove = function (itemId, associationId, options) {
            var _this = this;
            return this.createAndResolvePromise(itemId)
                .then(function (itemId) {
                if (!itemId || !associationId)
                    throw new Error("Must specify both the GeoPlatform resource id and its association's id");
                var url = _this.baseUrl + '/' + itemId + '/associations/' + associationId;
                var opts = _this.buildRequest({ method: "DELETE", url: url, options: options });
                return _this.execute(opts);
            })
                .catch(function (e) {
                var err = new Error("Error removing association for item " + itemId + ": " + e.message);
                Object.assign(err, e);
                _this.logError("AssociationService.remove(" + itemId + "," + associationId + ") - " + err.message);
                throw err;
            });
        };
        return AssociationService;
    }(BaseService));

    var AgolQuery = /** @class */ (function () {
        function AgolQuery(options) {
            this._query = {
                page: 0,
                size: 10
            };
            if (options) {
                this.applyParameters(options);
            }
        }
        AgolQuery.prototype.getQuery = function () {
            var result = {};
            for (var prop in this._query) {
                var value = this._query[prop];
                if (value !== null && typeof (value.push) !== 'undefined') {
                    value = value.join(',');
                }
                result[prop] = value;
            }
            return result;
        };
        /**
         * @param obj - set of parameter/values to apply to this query
         */
        AgolQuery.prototype.applyParameters = function (obj) {
            for (var p in obj) {
                if (obj.hasOwnProperty(p)) {
                    this._query[p] = obj[p];
                }
            }
        };
        // ---------------------------------------
        AgolQuery.prototype.q = function (value) { this.setQ(value); return this; };
        AgolQuery.prototype.setQ = function (value) { this._query.q = value; };
        AgolQuery.prototype.getQ = function () { return this._query.q; };
        // ---------------------------------------
        AgolQuery.prototype.types = function (value) {
            this.setTypes(value);
            return this;
        };
        AgolQuery.prototype.setTypes = function (value) {
            var val;
            if (value && Array.isArray(value))
                val = value.join(',');
            else
                val = value;
            this._query.types = val;
        };
        AgolQuery.prototype.getTypes = function () { return this._query.types; };
        // ---------------------------------------
        AgolQuery.prototype.groups = function (value) {
            this.setGroups(value);
            return this;
        };
        AgolQuery.prototype.setGroups = function (value) {
            var val;
            if (value && Array.isArray(value))
                val = value.join(',');
            else
                val = value;
            this._query.groups = val;
        };
        AgolQuery.prototype.getGroups = function () { return this._query.groups; };
        // ---------------------------------------
        AgolQuery.prototype.orgs = function (value) {
            this.setOrgs(value);
            return this;
        };
        AgolQuery.prototype.setOrgs = function (value) {
            var val;
            if (value && Array.isArray(value))
                val = value.join(',');
            else
                val = value;
            this._query.orgs = val;
        };
        AgolQuery.prototype.getOrgs = function () { return this._query.orgs; };
        // ---------------------------------------
        AgolQuery.prototype.extent = function (value) { this.setExtent(value); return this; };
        AgolQuery.prototype.setExtent = function (value) { this._query.bbox = value; };
        AgolQuery.prototype.getExtent = function () { return this._query.bbox; };
        // ---------------------------------------
        /**
         * @param sort - form of <field>,<dir> or just field name
         * @param order - optional, either 'asc' or 'desc'
         */
        AgolQuery.prototype.sort = function (sort, order) {
            this.setSort(sort, order);
            return this;
        };
        /**
         * @param sort - form of <field>,<dir> or just field name
         * @param order - optional, either 'asc' or 'desc'
         */
        AgolQuery.prototype.setSort = function (sort, order) {
            order = order || 'desc';
            if (sort && sort.indexOf(',') < 0)
                sort = sort + ',' + order;
            this._query.sort = sort;
        };
        AgolQuery.prototype.getSort = function () { return this._query.sort; };
        AgolQuery.prototype.getSortField = function () { return this._query.sort.split(',')[0]; };
        AgolQuery.prototype.getSortOrder = function () { return this._query.sort.split(',')[1] === 'asc'; };
        // -----------------------------------------------------------
        /**
         * @param page - page of results to fetch
         */
        AgolQuery.prototype.page = function (page) {
            this.setPage(page);
            return this;
        };
        AgolQuery.prototype.setPage = function (page) {
            if (isNaN(page) || page * 1 < 0)
                return;
            this._query.page = page * 1;
        };
        AgolQuery.prototype.getPage = function () {
            return this._query.page;
        };
        AgolQuery.prototype.nextPage = function () {
            this.setPage(this._query.page + 1);
        };
        AgolQuery.prototype.previousPage = function () {
            this.setPage(this._query.page - 1);
        };
        // -----------------------------------------------------------
        /**
         * @param size - page size to request
         */
        AgolQuery.prototype.pageSize = function (size) {
            this.setPageSize(size);
            return this;
        };
        AgolQuery.prototype.setPageSize = function (size) {
            if (isNaN(size) || size * 1 < 0)
                return;
            this._query.size = size * 1;
        };
        AgolQuery.prototype.getPageSize = function () {
            return this._query.size;
        };
        return AgolQuery;
    }());
    /**
     * AGOL Service
     */
    var AgolService = /** @class */ (function (_super) {
        __extends(AgolService, _super);
        function AgolService(url, httpClient) {
            var _this = _super.call(this, url, httpClient) || this;
            _this.setTimeout(30000);
            return _this;
        }
        AgolService.prototype.setUrl = function (baseUrl) {
            _super.prototype.setUrl.call(this, baseUrl);
            this.baseUrl = baseUrl + '/api/agol';
        };
        // -----------------------------------------------------------------------
        // AGOL ORGS METHODS
        /**
         * @param id - identifier of AGOL organization to fetch
         * @param options - optional set of request options to apply to xhr request
         * @return Promise resolving Item object or an error
         */
        AgolService.prototype.getOrg = function (id, options) {
            var _this = this;
            return this.createAndResolvePromise(id)
                .then(function (id) {
                var opts = _this.buildRequest({
                    method: "GET", url: _this.baseUrl + '/orgs/' + id, options: options
                });
                return _this.execute(opts);
            })
                .catch(function (e) {
                var err = new Error("AgolService.getOrg() - Error fetching org " + id + ": " + e.message);
                Object.assign(err, e);
                throw err;
            });
        };
        /**
         * @param arg - either JS object of query parameters or Query instance
         * @param options - optional set of request options to apply to xhr request
         * @return Promise resolving search results
         */
        AgolService.prototype.searchOrgs = function (arg, options) {
            var _this = this;
            return this.createAndResolvePromise(arg)
                .then(function (params) {
                var ps = params.getQuery();
                var opts = _this.buildRequest({
                    method: "GET",
                    url: _this.baseUrl + '/orgs',
                    params: ps,
                    options: options
                });
                return _this.execute(opts);
            })
                .catch(function (e) {
                var err = new Error("AgolService.searchOrgs() - Error searching orgs: " + e.message);
                Object.assign(err, e);
                throw err;
            });
        };
        // -----------------------------------------------------------------------
        // AGOL GROUPS METHODS
        /**
         * @param id - identifier of AGOL group to fetch
         * @param options - optional set of request options to apply to xhr request
         * @return Promise resolving Item object or an error
         */
        AgolService.prototype.getGroup = function (id, options) {
            var _this = this;
            return this.createAndResolvePromise(id)
                .then(function (id) {
                var opts = _this.buildRequest({
                    method: "GET", url: _this.baseUrl + '/groups/' + id, options: options
                });
                return _this.execute(opts);
            })
                .catch(function (e) {
                var err = new Error("AgolService.getGroup() - Error fetching group " + id + ": " + e.message);
                Object.assign(err, e);
                throw err;
            });
        };
        /**
         * @param arg - either JS object of query parameters or AgolQuery instance
         * @param options - optional set of request options to apply to xhr request
         * @return Promise resolving search results
         */
        AgolService.prototype.searchGroups = function (arg, options) {
            var _this = this;
            return this.createAndResolvePromise(arg)
                .then(function (params) {
                var ps = params.getQuery();
                var opts = _this.buildRequest({
                    method: "GET",
                    url: _this.baseUrl + '/groups',
                    params: ps,
                    options: options
                });
                return _this.execute(opts);
            })
                .catch(function (e) {
                var err = new Error("AgolService.searchGroups() - Error searching groups: " + e.message);
                Object.assign(err, e);
                throw err;
            });
        };
        // -----------------------------------------------------------------------
        // AGOL ITEMS METHODS
        /**
         * @param id - identifier of AGOL item to fetch
         * @param options - optional set of request options to apply to xhr request
         * @return Promise resolving Item object or an error
         */
        AgolService.prototype.getItem = function (id, options) {
            var _this = this;
            return this.createAndResolvePromise(id)
                .then(function (id) {
                var opts = _this.buildRequest({
                    method: "GET",
                    url: _this.baseUrl + '/items/' + id,
                    options: options
                });
                return _this.execute(opts);
            })
                .catch(function (e) {
                var err = new Error("AgolService.getItem() - Error fetching item " + id + ": " + e.message);
                Object.assign(err, e);
                throw err;
            });
        };
        /**
         * @param arg - either JS object of query parameters or AgolQuery instance
         * @param options - optional set of request options to apply to xhr request
         * @return Promise resolving search results
         */
        AgolService.prototype.searchItems = function (arg, options) {
            var _this = this;
            return this.createAndResolvePromise(arg)
                .then(function (params) {
                var ps = params.getQuery();
                var opts = _this.buildRequest({
                    method: "GET",
                    url: _this.baseUrl + '/items',
                    params: ps,
                    options: options
                });
                return _this.execute(opts);
            })
                .catch(function (e) {
                var err = new Error("AgolService.searchItems() - Error searching items: " + e.message);
                Object.assign(err, e);
                throw err;
            });
        };
        /* --------------------------- */
        AgolService.prototype.getAgolId = function (obj) {
            if (!obj)
                return null;
            if (!obj.type)
                return null;
            if (ItemTypes.ORGANIZATION === obj.type || 'Group' === obj.type) {
                return obj.id;
            }
            if (!obj.identifiers || !obj.identifiers.length)
                return null;
            var ids = obj.identifiers.filter(function (id) { return ~id.indexOf('agol:'); });
            if (!ids.length)
                return null;
            return ids[0].replace('agol:', '');
        };
        return AgolService;
    }(BaseService));

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
        APPLICATION: 'Application',
        TOPIC: 'Topic',
        WEBSITE: 'WebSite',
        IMAGE_PRODUCT: 'Image Product',
        RIGHTS_STATEMENT: 'RightsStatement',
        KNOWLEDGE_GRAPH: 'Knowledge Graph',
        USER: 'User',
        COMMUNITY_POST: 'Community Post',
        COMMUNITY_PAGE: 'Community Page',
        APP_PAGE: 'Application Page',
    };
    var Events = {
        ACCESSED: 'Accessed',
        DISPLAYED: 'Displayed',
        VIEWED: 'Viewed',
        CREATED: 'Created',
        EDITED: 'Edited',
        DELETED: 'Deleted',
        CLONED: 'Cloned',
        ADDED: 'Added',
        REMOVED: 'Removed',
        EXPORTED: 'Exported',
        IMPORTED: 'Imported'
    };
    function getCategory(type) {
        var result = Categories.UNKNOWN;
        if (type) {
            var cats = Object.keys(Categories).map(function (k) { return Categories[k]; });
            //if existing category was specified
            if (~cats.indexOf(type))
                return type;
            //if an ItemType with prefix was specified (strip off prefix)
            else if (~type.indexOf(':')) {
                var cat = type.split(':')[1];
                if (~cats.indexOf(cat))
                    return cat;
            }
        }
        return result;
    }
    /**
     *
     */
    var Event = /** @class */ (function () {
        function Event(category, type, item, related) {
            this.item = null;
            this.related = null;
            if (!category || !type) {
                throw new Error("TrackingService Event - Must specific an event " +
                    "category and event type when constructing events");
            }
            this.category = category;
            this.type = type;
            this.setItem(item);
            this.setRelated(related);
        }
        Event.prototype.getCategory = function () { return this.category; };
        Event.prototype.getType = function () { return this.type; };
        Event.prototype.getItem = function () { return this.item; };
        Event.prototype.setItem = function (item) { this.item = item ? (item.id || item) : null; };
        Event.prototype.getRelated = function () { return this.related; };
        Event.prototype.setRelated = function (related) {
            this.related = related ? (related.id || related) : null;
        };
        return Event;
    }());
    /**
     * @param eventType - type of event being created
     * @param item - GeoPlatform Item instance
     * @return list of event objects
     */
    function TrackingEventFactory(eventType, item) {
        var result = [];
        if (eventType && item && item.type) {
            if (ItemTypes.MAP === item.type) {
                result.push(new Event(Categories.MAP, eventType, item));
                if (Events.DISPLAYED === eventType) {
                    item.layers.forEach(function (layerState) {
                        if (layerState.layer) {
                            var layerEvents = TrackingEventFactory(eventType, layerState.layer)
                                .filter(function (e) { return e !== null; });
                            if (layerEvents && layerEvents.length) {
                                result = result.concat(layerEvents);
                            }
                        }
                    });
                    if (item.baseLayer) {
                        var baseEvents = TrackingEventFactory(eventType, item.baseLayer)
                            .filter(function (e) { return e !== null; });
                        if (baseEvents && baseEvents.length)
                            result = result.concat(baseEvents);
                    }
                }
            }
            else if (ItemTypes.LAYER === item.type) {
                result.push(new Event(Categories.LAYER, eventType, item));
                if (Events.DISPLAYED === eventType && item.services && item.services.length) {
                    result.push(new Event(Categories.SERVICE, eventType, item.services[0]));
                }
            }
            else {
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
    var DefaultTrackingServiceProvider = /** @class */ (function () {
        function DefaultTrackingServiceProvider() {
        }
        DefaultTrackingServiceProvider.prototype.logEvent = function (category, event, item, 
        // @ts-ignore
        related) {
            console.log("Event (" + category + ") - " + event + " : " + item);
        };
        DefaultTrackingServiceProvider.prototype.logPageView = function (view, data) {
            console.log("Page View " + view + (data ? " : " + JSON.stringify(data) : ''));
        };
        DefaultTrackingServiceProvider.prototype.logSearch = function (params, resultCount) {
            console.log("Query : " + JSON.stringify(params) + " found " + resultCount + " matches");
        };
        return DefaultTrackingServiceProvider;
    }());
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
    var TrackingService = /** @class */ (function () {
        function TrackingService(options) {
            this.provider = null;
            if (options && typeof (options) === 'object')
                Object.assign(this, options);
            if (!this.provider)
                this.setProvider(new DefaultTrackingServiceProvider());
        }
        /**
         * @param provider -
         */
        TrackingService.prototype.setProvider = function (provider) {
            if (provider)
                this.provider = provider;
        };
        /**
         * @param event - event to log
         * @return TrackingService
         */
        TrackingService.prototype.event = function (event) {
            this.logEvent(event);
            return this;
        };
        /**
         * @param event - event to log
         */
        TrackingService.prototype.logEvent = function (event) {
            var _this = this;
            if (!this.provider || !this.provider.logEvent || !event)
                return;
            if (Array.isArray(event)) {
                var events = event;
                events.forEach(function (evt) { return _this.logEvent(evt); });
            }
            else {
                var evt = event;
                try {
                    this.provider.logEvent(evt.getCategory(), evt.getType(), evt.getItem(), evt.getRelated());
                }
                catch (e) {
                    console.log("TrackingService.logEvent() - Error logging event (" +
                        evt.getCategory() + ", " + evt.getType() + ", " +
                        evt.getItem() + ") - " + e.message);
                }
            }
        };
        /**
         * @param view - name of the view being activated
         * @param data - additional context to supply for the event
         * @return TrackingService
         * @deprecated use svc.event( new Event(EventCategories.APP_PAGE, EventTypes.VIEWED, pageId) )
         */
        TrackingService.prototype.pageView = function (view, data) {
            this.logPageView(view, data);
            return this;
        };
        /**
         * @param view - name of the view being activated
         * @param data - additional context to supply for the event
         * @deprecated use svc.logEvent( new Event(EventCategories.APP_PAGE, EventTypes.VIEWED, pageId) )
         */
        TrackingService.prototype.logPageView = function (view, 
        // @ts-ignore
        data) {
            if (this.provider && this.provider.logPageView) {
                this.provider.logPageView(view, data);
            }
            else {
                this.logEvent(new Event(Categories.APP_PAGE, Events.VIEWED, view));
            }
        };
        /**
         * @param params
         * @param resultCount
         */
        TrackingService.prototype.logSearch = function (params, resultCount) {
            if (this.provider.logSearch)
                this.provider.logSearch(params, resultCount);
        };
        return TrackingService;
    }());

    var KGService = /** @class */ (function (_super) {
        __extends(KGService, _super);
        // @ts-ignore
        // private apiBase : string;
        // @ts-ignore
        // private baseUrl : string;
        // private client : GPHttpClient;
        // private timeout : number = 30000;
        // private httpMethods : string[] = ["GET", "POST", "PUT", "DELETE", "PATCH"];
        function KGService(url, httpClient) {
            return _super.call(this, url, httpClient) || this;
        }
        KGService.prototype.setUrl = function (baseUrl) {
            _super.prototype.setUrl.call(this, baseUrl);
            this.baseUrl = baseUrl + '/api/recommender';
        };
        /**
         * @param query - optional query parameters to include with request
         * @param options - optional config to send with http request
         * @return Promise resolving recommended concepts as search results
         */
        KGService.prototype.suggest = function (query, options) {
            var _this = this;
            var url = this.baseUrl + '/suggest';
            return this._search(url, query, options)
                .catch(function (e) {
                _this.logError('KGService.suggest() - ' + e.message);
                var err = new Error("Error suggesting concepts: " + e.message);
                Object.assign(err, e);
                throw err;
            });
        };
        /**
         * @param query - optional query parameters to include with request
         * @param options - optional config to send with http request
         * @return Promise resolving concept types as search results
         */
        KGService.prototype.types = function (query, options) {
            var _this = this;
            var url = this.baseUrl + '/types';
            return this._search(url, query, options)
                .catch(function (e) {
                _this.logError('KGService.types() - ' + e.message);
                var err = new Error("Error searching types: " + e.message);
                Object.assign(err, e);
                throw err;
            });
        };
        /**
         * @param query - optional query parameters to include with request
         * @param options - optional config to send with http request
         * @return Promise resolving concept sources as search results
         */
        KGService.prototype.sources = function (query, options) {
            var _this = this;
            var url = this.baseUrl + '/sources';
            return this._search(url, query, options)
                .catch(function (e) {
                _this.logError('KGService.sources() - ' + e.message);
                var err = new Error("Error searching sources: " + e.message);
                Object.assign(err, e);
                throw err;
            });
        };
        /* ----------------------------------------------------------- */
        /**
         * internal method used by exposed methods
         */
        KGService.prototype._search = function (url, query, options) {
            var _this = this;
            return this.createAndResolvePromise(url)
                .then(function (url) {
                var q = query.getQuery();
                var opts = _this.buildRequest({
                    method: "GET", url: url, params: q, options: options
                });
                return _this.execute(opts);
            });
        };
        return KGService;
    }(BaseService));

    /**
     * @param arg - string type or object with type property
     * @param baseUrl - base endpoint of GeoPlatform API
     * @return ItemService
     */
    var ServiceFactory = function (arg, baseUrl, httpClient) {
        var type = (typeof (arg) === 'string') ?
            arg : (arg && arg.type ? arg.type : null);
        if (!type)
            throw new Error("Must provide a type or object with a type specified");
        if (!baseUrl)
            throw new Error("Must provide a base url");
        if (!httpClient)
            throw new Error("Must provide an http client to use to make requests");
        switch (type) {
            case ItemTypes.LAYER: return new LayerService(baseUrl, httpClient);
            case ItemTypes.SERVICE: return new ServiceService(baseUrl, httpClient);
            case ItemTypes.MAP: return new MapService(baseUrl, httpClient);
            case ItemTypes.GALLERY: return new GalleryService(baseUrl, httpClient);
            case ItemTypes.DATASET: return new DatasetService(baseUrl, httpClient);
            default: return new ItemService(baseUrl, httpClient);
        }
    };
    var ɵ0$2 = ServiceFactory;

    /*
        Version of the library exposed to consumers.
        Long-term this value should be auto-set to be whatever is set in package.json
     */
    var ClientVersion = "0.3.0";
    polyfills();

    exports.AbstractService = BaseService;
    exports.AgolQuery = AgolQuery;
    exports.AgolService = AgolService;
    exports.AssociationService = AssociationService;
    exports.ClientVersion = ClientVersion;
    exports.Config = Config;
    exports.DatasetService = DatasetService;
    exports.GPError = GPError;
    exports.GPHttpClient = GPHttpClient;
    exports.GalleryService = GalleryService;
    exports.ItemService = ItemService;
    exports.ItemTypeLabels = ItemTypeLabels;
    exports.ItemTypes = ItemTypes;
    exports.KGClassifiers = Classifiers;
    exports.KGQuery = KGQuery;
    exports.KGService = KGService;
    exports.LayerService = LayerService;
    exports.MapService = MapService;
    exports.Query = Query;
    exports.QueryFacets = Facets;
    exports.QueryFactory = queryFactory;
    exports.QueryFields = Fields;
    exports.QueryParameters = Parameters;
    exports.ServiceFactory = ServiceFactory;
    exports.ServiceService = ServiceService;
    exports.TrackingCategories = Categories;
    exports.TrackingEvent = Event;
    exports.TrackingEventFactory = TrackingEventFactory;
    exports.TrackingService = TrackingService;
    exports.TrackingTypes = Events;
    exports.URIFactory = factoryFn;
    exports.UtilsService = UtilsService;
    exports.XHRHttpClient = XHRHttpClient;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=geoplatform-client.umd.js.map
