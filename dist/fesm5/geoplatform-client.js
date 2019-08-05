import axios from 'axios';
import { __extends } from 'tslib';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function apply() {
    if (typeof Object.assign != 'function') {
        // Must be writable: true, enumerable: false, configurable: true
        Object.defineProperty(Object, "assign", {
            value: function assign(target, varArgs) {
                // .length of function is 2
                if (target == null) { // TypeError if undefined or null
                    // TypeError if undefined or null
                    throw new TypeError('Cannot convert undefined or null to object');
                }
                /** @type {?} */
                var to = Object(target);
                for (var index = 1; index < arguments.length; index++) {
                    /** @type {?} */
                    var nextSource = arguments[index];
                    if (nextSource != null) { // Skip over if undefined or null
                        // Skip over if undefined or null
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
/**
 * @return {?}
 */
function polyfills() {
    apply();
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var GPError = /** @class */ (function (_super) {
    __extends(GPError, _super);
    function GPError(message) {
        var _this = _super.call(this, message) || this;
        _this.status = 500;
        _this.statusCode = 500;
        _this.error = null;
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    GPError.prototype.setError = /**
     * @param {?} value
     * @return {?}
     */
    function (value) { this.error = value; };
    /**
     * @param {?} value
     * @return {?}
     */
    GPError.prototype.setStatus = /**
     * @param {?} value
     * @return {?}
     */
    function (value) { this.status = this.statusCode = value; };
    return GPError;
}(Error));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
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
/** @type {?} */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var URI_BASE = 'http://www.geoplatform.gov';
/** @type {?} */
var ESRI_TYPES = [
    "http://www.geoplatform.gov/spec/esri-feature-rest",
    "http://www.geoplatform.gov/spec/esri-image-rest",
    "http://www.geoplatform.gov/spec/esri-map-rest",
    "http://www.geoplatform.gov/spec/esri-tile-rest"
];
/**
 * @param {?} ref
 * @return {?}
 */
function formatReference(ref) {
    if (ref === null)
        return '';
    if (typeof (ref) === 'string')
        return ref.toLowerCase().replace(/\s/g, '');
    else if (typeof (ref) === 'object') {
        /** @type {?} */
        var result = '';
        for (var prop in ref) {
            if (ref.hasOwnProperty(prop)) {
                /** @type {?} */
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
 * @param {?} service - GP Service instance
 * @return {?} access url adjusted for URI generation needs
 */
function fixServiceHref(service) {
    stripLayerFromServiceHref(service);
    /** @type {?} */
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
    /** @type {?} */
    var lastChar = url[url.length - 1];
    if ('/' === lastChar || '?' === lastChar) { //ignore empty querystring or trailing slashes
        //ignore empty querystring or trailing slashes
        url = url.substring(0, url.length - 1);
    }
    return url;
}
/**
 * ESRI services sometimes have layer information baked into their URL
 * which needs to be removed before the service can be used.
 * @param {?} service - GP Service object
 * @return {?}
 */
function stripLayerFromServiceHref(service) {
    if (!service)
        return;
    /** @type {?} */
    var type = service.serviceType || service.conformsTo;
    if (!type)
        return;
    //if ESRI service, make sure it doesn't have a layer id on the href
    if (ESRI_TYPES.indexOf(type.uri) >= 0) {
        /** @type {?} */
        var href = service.href || service.accessURL;
        /** @type {?} */
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
    /** @type {?} */
    var factory = this.factories[object.type];
    if (!factory)
        return null;
    return factory(object, md5Fn);
};
/** *
 * @see https://geoplatform.atlassian.net/wiki/display/DT/Common+Object+Identifier+Scheme
  @type {?} */
var URIFactory = {
    factories: {},
    register: ɵ0,
    create: ɵ1
};
URIFactory.register(ItemTypes.DATASET, function (dataset, md5) {
    /** @type {?} */
    var pubName = (dataset.publisher || dataset.publishers || [])
        .map(function (pub) { return pub.label || ""; }).join('');
    /** @type {?} */
    var ref = formatReference({
        title: dataset.title,
        pub: pubName
    });
    return URI_BASE + '/id/dataset/' + md5(ref);
});
URIFactory.register(ItemTypes.SERVICE, function (service, md5) {
    /** @type {?} */
    var url = fixServiceHref(service);
    /** @type {?} */
    var ref = formatReference(url);
    return URI_BASE + '/id/service/' + md5(ref);
});
URIFactory.register(ItemTypes.LAYER, function (layer, md5) {
    /** @type {?} */
    var svcUrl = '';
    /** @type {?} */
    var services = layer.servicedBy || layer.services;
    if (services && services.length)
        svcUrl = services[0].accessURL || services[0].href || '';
    /** @type {?} */
    var lyrUrl = layer.accessURL || layer.href || '';
    /** @type {?} */
    var lyrName = layer.layerName || '';
    /** @type {?} */
    var args = svcUrl + lyrName + lyrUrl;
    if (!args.length)
        return null;
    /** @type {?} */
    var ref = formatReference(args);
    return URI_BASE + '/id/layer/' + md5(ref);
});
/**
 * Uses the map title, createdBy, and all third-party identifiers associated with the map
 * @param {object} map - GP Map object
 * @return {string} uri unique to this object
 */
URIFactory.register(ItemTypes.MAP, function (map, md5) {
    /** @type {?} */
    var author = map.createdBy || map._createdBy || "";
    /** @type {?} */
    var identifiers = (map.identifiers || map.identifier || []).join('');
    /** @type {?} */
    var ref = formatReference({ title: map.title, author: author, identifiers: identifiers });
    return URI_BASE + '/id/map/' + md5(ref);
});
URIFactory.register(ItemTypes.GALLERY, function (gallery, md5) {
    /** @type {?} */
    var author = gallery.createdBy || gallery._createdBy || "";
    /** @type {?} */
    var ref = formatReference({ title: gallery.title, author: author });
    return URI_BASE + '/id/gallery/' + md5(ref);
});
URIFactory.register(ItemTypes.COMMUNITY, function (community, md5) {
    /** @type {?} */
    var ref = formatReference({ title: community.title });
    return URI_BASE + '/id/community/' + md5(ref);
});
URIFactory.register(ItemTypes.ORGANIZATION, function (org, md5) {
    /** @type {?} */
    var ref = formatReference(org.label || org.name);
    return URI_BASE + '/id/organization/' + md5(ref);
});
URIFactory.register(ItemTypes.PERSON, function (person, md5) {
    /** @type {?} */
    var ref = formatReference(person.name);
    return URI_BASE + '/id/person/' + md5(ref);
});
URIFactory.register(ItemTypes.CONTACT, function (vcard, md5) {
    /** @type {?} */
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
    /** @type {?} */
    var scheme = object.inScheme || object.scheme;
    /** @type {?} */
    var schemeLabel = scheme ? (scheme.label || scheme.prefLabel) : '';
    /** @type {?} */
    var schemeRef = formatReference(schemeLabel);
    /** @type {?} */
    var ref = formatReference(object.label || object.prefLabel);
    return URI_BASE + '/id/metadata-codelists/' + md5(schemeRef) + '/' + md5(ref);
});
URIFactory.register(ItemTypes.CONCEPT_SCHEME, function (object, md5) {
    /** @type {?} */
    var ref = formatReference(object.label || object.prefLabel);
    return URI_BASE + '/id/metadata-codelists/' + md5(ref);
});
URIFactory.register(ItemTypes.APPLICATION, function (object, md5) {
    if (!object || !object.title)
        return null;
    /** @type {?} */
    var author = object.createdBy || object._createdBy || "";
    /** @type {?} */
    var ref = formatReference({ title: object.title, author: author });
    return URI_BASE + '/id/application/' + md5(ref);
});
URIFactory.register(ItemTypes.TOPIC, function (object, md5) {
    if (!object || !object.title)
        return null;
    /** @type {?} */
    var author = object.createdBy || object._createdBy || "";
    /** @type {?} */
    var ref = formatReference({ title: object.title, author: author });
    return URI_BASE + '/id/topic/' + md5(ref);
});
URIFactory.register(ItemTypes.WEBSITE, function (item, md5) {
    if (!item || !item.landingPage)
        return null;
    /** @type {?} */
    var ref = formatReference(item.landingPage);
    return URI_BASE + '/id/website/' + md5(ref);
});
/**
 * @param {?} md5Fn
 * @return {?}
 */
function factoryFn(md5Fn) {
    if (typeof (md5Fn) !== 'function') {
        throw new Error("Must specify a MD5 function when using URIFactory");
    }
    return function (object) {
        return URIFactory.create(object, md5Fn);
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
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
    function KGQuery() {
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
    /**
     * @return {?}
     */
    KGQuery.prototype.getQuery = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var result = {};
        for (var prop in this.query) {
            /** @type {?} */
            var value = this.query[prop];
            if (value !== null && typeof (value.push) !== 'undefined') {
                value = value.join(',');
            }
            result[prop] = value;
        }
        return result;
    };
    // -----------------------------------------------------------
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    KGQuery.prototype.parameter = /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    function (name, value) {
        this.setParameter(name, value);
        return this;
    };
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    KGQuery.prototype.setParameter = /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    function (name, value) {
        if (value === null || value === undefined)
            delete this.query[name];
        else
            this.query[name] = value;
    };
    /**
     * @param {?} key
     * @return {?}
     */
    KGQuery.prototype.getParameter = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return this.query[key];
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    KGQuery.prototype.applyParameters = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                this.setParameter(p, obj[p]);
            }
        }
    };
    // -----------------------------------------------------------
    /**
     * @param {?} text
     * @return {?}
     */
    KGQuery.prototype.q = /**
     * @param {?} text
     * @return {?}
     */
    function (text) {
        this.setQ(text);
        return this;
    };
    /**
     * @param text - free text query
     */
    /**
     * @param {?} text - free text query
     * @return {?}
     */
    KGQuery.prototype.setQ = /**
     * @param {?} text - free text query
     * @return {?}
     */
    function (text) {
        this.setParameter(Parameters.QUERY, text);
    };
    /**
     * @return {?}
     */
    KGQuery.prototype.getQ = /**
     * @return {?}
     */
    function () {
        return this.getParameter(Parameters.QUERY);
    };
    // -----------------------------------------------------------
    /**
     * @param types - KG classifiers for which concepts should be returned
     */
    /**
     * @param {?} types - KG classifiers for which concepts should be returned
     * @return {?}
     */
    KGQuery.prototype.classifiers = /**
     * @param {?} types - KG classifiers for which concepts should be returned
     * @return {?}
     */
    function (types) {
        this.setClassifiers(types);
        return this;
    };
    /**
     * @param types - KG classifiers for which concepts should be returned
     */
    /**
     * @param {?} types - KG classifiers for which concepts should be returned
     * @return {?}
     */
    KGQuery.prototype.setClassifiers = /**
     * @param {?} types - KG classifiers for which concepts should be returned
     * @return {?}
     */
    function (types) {
        if (!types)
            return;
        if (typeof (types) === 'string')
            types = types = [types];
        this.setParameter(Parameters.TYPES, types);
    };
    /**
     * @return KG classifiers for which concepts should be returned
     */
    /**
     * @return {?} KG classifiers for which concepts should be returned
     */
    KGQuery.prototype.getClassifiers = /**
     * @return {?} KG classifiers for which concepts should be returned
     */
    function () {
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
    /**
     * Specify the Item object model type name(s) for which
     * recommended concepts should be returned. Note: this
     * query parameter is not the same as the GeoPlatform.Query.types()
     * query parameter (they map to different HTTP request parameters).
     * @param {?} objTypes - Item object type names
     * @return {?}
     */
    KGQuery.prototype.types = /**
     * Specify the Item object model type name(s) for which
     * recommended concepts should be returned. Note: this
     * query parameter is not the same as the GeoPlatform.Query.types()
     * query parameter (they map to different HTTP request parameters).
     * @param {?} objTypes - Item object type names
     * @return {?}
     */
    function (objTypes) {
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
    /**
     * Specify the Item object model type name(s) for which
     * recommended concepts should be returned. Note: this
     * query parameter is not the same as the GeoPlatform.Query.setTypes()
     * query parameter (they map to different HTTP request parameters).
     * @param {?} objTypes - Item object type names
     * @return {?}
     */
    KGQuery.prototype.setTypes = /**
     * Specify the Item object model type name(s) for which
     * recommended concepts should be returned. Note: this
     * query parameter is not the same as the GeoPlatform.Query.setTypes()
     * query parameter (they map to different HTTP request parameters).
     * @param {?} objTypes - Item object type names
     * @return {?}
     */
    function (objTypes) {
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
    /**
     * Get the Item object model type name(s) for which
     * recommended concepts should be returned. Note: this
     * query parameter is not the same as the GeoPlatform.Query.getTypes()
     * query parameter (they map to different HTTP request parameters).
     * @return {?} Item object type names
     */
    KGQuery.prototype.getTypes = /**
     * Get the Item object model type name(s) for which
     * recommended concepts should be returned. Note: this
     * query parameter is not the same as the GeoPlatform.Query.getTypes()
     * query parameter (they map to different HTTP request parameters).
     * @return {?} Item object type names
     */
    function () {
        return this.getParameter(Parameters.FOR_TYPES);
    };
    // -----------------------------------------------------------
    /**
     * @param page - page of results to fetch
     */
    /**
     * @param {?} page - page of results to fetch
     * @return {?}
     */
    KGQuery.prototype.page = /**
     * @param {?} page - page of results to fetch
     * @return {?}
     */
    function (page) {
        this.setPage(page);
        return this;
    };
    /**
     * @param {?} page
     * @return {?}
     */
    KGQuery.prototype.setPage = /**
     * @param {?} page
     * @return {?}
     */
    function (page) {
        if (isNaN(page) || page * 1 < 0)
            return;
        this.query["page"] = page * 1;
    };
    /**
     * @return {?}
     */
    KGQuery.prototype.getPage = /**
     * @return {?}
     */
    function () {
        return this.query["page"];
    };
    /**
     * @return {?}
     */
    KGQuery.prototype.nextPage = /**
     * @return {?}
     */
    function () {
        this.setPage(this.query["page"] + 1);
    };
    /**
     * @return {?}
     */
    KGQuery.prototype.previousPage = /**
     * @return {?}
     */
    function () {
        this.setPage(this.query["page"] - 1);
    };
    // -----------------------------------------------------------
    /**
     * @param size - page size to request
     */
    /**
     * @param {?} size - page size to request
     * @return {?}
     */
    KGQuery.prototype.pageSize = /**
     * @param {?} size - page size to request
     * @return {?}
     */
    function (size) {
        this.setPageSize(size);
        return this;
    };
    /**
     * @param {?} size
     * @return {?}
     */
    KGQuery.prototype.setPageSize = /**
     * @param {?} size
     * @return {?}
     */
    function (size) {
        if (isNaN(size) || size * 1 < 0)
            return;
        this.query["size"] = size * 1;
    };
    /**
     * @return {?}
     */
    KGQuery.prototype.getPageSize = /**
     * @return {?}
     */
    function () {
        return this.query["size"];
    };
    // -----------------------------------------------------------
    /**
     * @param sort - form of <field>,<dir> or just field name
     * @param order - optional, either 'asc' or 'desc'
     */
    /**
     * @param {?} sort - form of <field>,<dir> or just field name
     * @param {?=} order - optional, either 'asc' or 'desc'
     * @return {?}
     */
    KGQuery.prototype.sort = /**
     * @param {?} sort - form of <field>,<dir> or just field name
     * @param {?=} order - optional, either 'asc' or 'desc'
     * @return {?}
     */
    function (sort, order) {
        this.setSort(sort, order);
        return this;
    };
    /**
     * @param sort - form of <field>,<dir> or just field name
     * @param order - optional, either 'asc' or 'desc'
     */
    /**
     * @param {?} sort - form of <field>,<dir> or just field name
     * @param {?=} order - optional, either 'asc' or 'desc'
     * @return {?}
     */
    KGQuery.prototype.setSort = /**
     * @param {?} sort - form of <field>,<dir> or just field name
     * @param {?=} order - optional, either 'asc' or 'desc'
     * @return {?}
     */
    function (sort, order) {
        order = order || 'desc';
        if (sort && sort.indexOf(',') < 0)
            sort = sort + ',' + order;
        this.query["sort"] = sort;
    };
    /**
     * @return {?}
     */
    KGQuery.prototype.getSort = /**
     * @return {?}
     */
    function () {
        return this.query["sort"];
    };
    /**
     * @return {?}
     */
    KGQuery.prototype.getSortField = /**
     * @return {?}
     */
    function () {
        return this.query["sort"].split(',')[0];
    };
    /**
     * @return {?}
     */
    KGQuery.prototype.getSortOrder = /**
     * @return {?}
     */
    function () {
        return this.query["sort"].split(',')[1] === 'asc';
    };
    /**
     * @return list of key-value pairs of sort options
     */
    /**
     * @return {?} list of key-value pairs of sort options
     */
    KGQuery.prototype.getSortOptions = /**
     * @return {?} list of key-value pairs of sort options
     */
    function () {
        return SORT_OPTIONS_DEFAULT.slice(0);
    };
    // -----------------------------------------------------------
    /**
     *
     */
    /**
     *
     * @return {?}
     */
    KGQuery.prototype.clear = /**
     *
     * @return {?}
     */
    function () {
        this.query = this.defaultQuery;
    };
    return KGQuery;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
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
/** @type {?} */
var FIELDS_DEFAULT = [
    Fields["CREATED"],
    Fields["MODIFIED"],
    Fields["CREATED_BY"],
    Fields["PUBLISHERS"],
    Fields["THEMES"],
    Fields["DESCRIPTION"]
];
/** @type {?} */
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
    //TODO change to 'types'
    USED_BY: 'usedBy',
    VIEWS: 'views',
    VISIBILITY: 'visibility'
};
/** @type {?} */
var FACETS_DEFAULT = [
    Facets["TYPES"],
    Facets["PUBLISHERS"],
    Facets["SERVICE_TYPES"],
    Facets["CONCEPT_SCHEMES"],
    Facets["VISIBILITY"],
    Facets["CREATED_BY"]
];
/** @type {?} */
var FacetToParam = {};
FacetToParam[Facets["TYPES"]] = Parameters.TYPES;
FacetToParam[Facets["THEMES"]] = Parameters.THEMES_ID;
FacetToParam[Facets["TOPICS"]] = Parameters.TOPICS_ID;
FacetToParam[Facets["PUBLISHERS"]] = Parameters.PUBLISHERS_ID;
FacetToParam[Facets["CONTACTS"]] = Parameters.CONTACTS_ID;
FacetToParam[Facets["CONCEPT_SCHEMES"]] = Parameters.SCHEMES_ID;
FacetToParam[Facets["USED_BY"]] = Parameters.USED_BY_ID;
/** @type {?} */
var SORT_OPTIONS_DEFAULT$1 = [
    { value: "label,asc", label: "Name (A-Z)" },
    { value: "label,desc", label: "Name (Z-A)" },
    { value: "type,asc", label: "Type (A-Z)" },
    { value: "type,desc", label: "Type (Z-A)" },
    { value: "modified,desc", label: "Most recently modified" },
    { value: "modified,asc", label: "Least recently modified" },
    { value: "_score,desc", label: "Relevance" }
];
/** @type {?} */
var BBOX_REGEX = /^\-?\d+(\.\d*)?,\-?\d+(\.\d*)?,\-?\d+(\.\d*)?,\-?\d+(\.\d*)?$/;
/**
 * @param {?} value
 * @return {?}
 */
function toArray(value) {
    /** @type {?} */
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
var  /**
 * Query
 *
 * Specify the "default" query constraints to use by passing in 'options.defaults = {...}';
 *
 */
Query = /** @class */ (function () {
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
        if (options && options["defaults"]) {
            Object.assign(this.defaultQuery, options["defaults"]);
            delete options["defaults"];
        }
        this.query = JSON.parse(JSON.stringify(this.defaultQuery));
        if (options) {
            this.applyParameters(options);
        }
    }
    /**
     * @return containing request-ready parameters/values
     */
    /**
     * @return {?} containing request-ready parameters/values
     */
    Query.prototype.getQuery = /**
     * @return {?} containing request-ready parameters/values
     */
    function () {
        /** @type {?} */
        var result = {};
        for (var prop in this.query) {
            /** @type {?} */
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
    /**
     * @return {?} Query
     */
    Query.prototype.clone = /**
     * @return {?} Query
     */
    function () {
        /** @type {?} */
        var result = new Query();
        /** @type {?} */
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
    /**
     * @param {?} name
     * @param {?} value
     * @return {?} Query this
     */
    Query.prototype.parameter = /**
     * @param {?} name
     * @param {?} value
     * @return {?} Query this
     */
    function (name, value) {
        this.setParameter(name, value);
        return this;
    };
    /**
     * @param name
     * @param value
     */
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    Query.prototype.setParameter = /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    function (name, value) {
        if (value === null || value === undefined || //if no value was provide
            //if no value was provide
            (typeof (value.push) !== 'undefined' && !value.length)) //or empty array
            //or empty array
            delete this.query[name];
        else
            this.query[name] = value;
    };
    /**
     * @param key - name of parameter
     * @return value of parameter
     */
    /**
     * @param {?} key - name of parameter
     * @return {?} value of parameter
     */
    Query.prototype.getParameter = /**
     * @param {?} key - name of parameter
     * @return {?} value of parameter
     */
    function (key) {
        return this.query[key];
    };
    /**
     * @param name - name of parameter to remove existing value for
     */
    /**
     * @param {?} name - name of parameter to remove existing value for
     * @return {?}
     */
    Query.prototype.clearParameter = /**
     * @param {?} name - name of parameter to remove existing value for
     * @return {?}
     */
    function (name) {
        delete this.query[name];
    };
    /**
     * @param obj - set of parameter/values to apply to this query
     */
    /**
     * @param {?} obj - set of parameter/values to apply to this query
     * @return {?}
     */
    Query.prototype.applyParameters = /**
     * @param {?} obj - set of parameter/values to apply to this query
     * @return {?}
     */
    function (obj) {
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                this.setParameter(/** @type {?} */ (p), /** @type {?} */ (obj[p]));
            }
        }
    };
    /**
     * @param facet - name of facet to set the value for as a parameter
     * @param value - value of the facet to use as the parameter's value
     */
    //TODO remove this function
    /**
     * @param {?} facet - name of facet to set the value for as a parameter
     * @param {?} value - value of the facet to use as the parameter's value
     * @return {?}
     */
    Query.prototype.setFacetParameter = /**
     * @param {?} facet - name of facet to set the value for as a parameter
     * @param {?} value - value of the facet to use as the parameter's value
     * @return {?}
     */
    function (facet, value) {
        /** @type {?} */
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
    /**
     * @param {?} text
     * @return {?} Query this
     */
    Query.prototype.q = /**
     * @param {?} text
     * @return {?} Query this
     */
    function (text) { this.setQ(text); return this; };
    /** @param text - free text query */
    /**
     * @param {?} text - free text query
     * @return {?}
     */
    Query.prototype.setQ = /**
     * @param {?} text - free text query
     * @return {?}
     */
    function (text) { this.setParameter(Parameters.QUERY, text); };
    /** @return */
    /**
     * @return {?}
     */
    Query.prototype.getQ = /**
     * @return {?}
     */
    function () { return /** @type {?} */ (this.getParameter(Parameters.QUERY)); };
    // -----------------------------------------------------------
    /**
     * @param {?} text
     * @return {?}
     */
    Query.prototype.keywords = /**
     * @param {?} text
     * @return {?}
     */
    function (text) {
        this.setKeywords(text);
        return this;
    };
    /**
     * @param text - free text query
     */
    /**
     * @param {?} text - free text query
     * @return {?}
     */
    Query.prototype.setKeywords = /**
     * @param {?} text - free text query
     * @return {?}
     */
    function (text) {
        this.setParameter(Parameters.KEYWORDS, toArray(text));
    };
    /**
     * @return {?}
     */
    Query.prototype.getKeywords = /**
     * @return {?}
     */
    function () {
        return this.getParameter(Parameters.KEYWORDS);
    };
    // -----------------------------------------------------------
    /**
     * @param {?} uri
     * @return {?}
     */
    Query.prototype.uri = /**
     * @param {?} uri
     * @return {?}
     */
    function (uri) {
        this.setUri(uri);
        return this;
    };
    /**
     * @param {?} uri
     * @return {?}
     */
    Query.prototype.setUri = /**
     * @param {?} uri
     * @return {?}
     */
    function (uri) {
        this.setParameter(Parameters.URI, uri);
    };
    /**
     * @return {?}
     */
    Query.prototype.getUri = /**
     * @return {?}
     */
    function () {
        return this.getParameter(Parameters.URI);
    };
    // -----------------------------------------------------------
    /**
     * @param {?} types
     * @return {?}
     */
    Query.prototype.types = /**
     * @param {?} types
     * @return {?}
     */
    function (types) {
        this.setTypes(types);
        return this;
    };
    /**
     * @param types - name of class(es) to request
     */
    /**
     * @param {?} types - name of class(es) to request
     * @return {?}
     */
    Query.prototype.setTypes = /**
     * @param {?} types - name of class(es) to request
     * @return {?}
     */
    function (types) {
        this.setParameter(Parameters.TYPES, toArray(types));
    };
    /**
     * @return {?}
     */
    Query.prototype.getTypes = /**
     * @return {?}
     */
    function () {
        return this.getParameter(Parameters.TYPES);
    };
    // -----------------------------------------------------------
    /**
     * @param {?} user
     * @return {?}
     */
    Query.prototype.createdBy = /**
     * @param {?} user
     * @return {?}
     */
    function (user) {
        this.setCreatedBy(user);
        return this;
    };
    /** @param user - username */
    /**
     * @param {?} user - username
     * @return {?}
     */
    Query.prototype.setCreatedBy = /**
     * @param {?} user - username
     * @return {?}
     */
    function (user) {
        this.setParameter(Parameters.CREATED_BY, user);
    };
    /** @return username */
    /**
     * @return {?} username
     */
    Query.prototype.getCreatedBy = /**
     * @return {?} username
     */
    function () {
        return this.getParameter(Parameters.CREATED_BY);
    };
    // -----------------------------------------------------------
    /**
     * @param {?} user
     * @return {?}
     */
    Query.prototype.lastModifiedBy = /**
     * @param {?} user
     * @return {?}
     */
    function (user) {
        this.setLastModifiedBy(user);
        return this;
    };
    /** @param user - username */
    /**
     * @param {?} user - username
     * @return {?}
     */
    Query.prototype.setLastModifiedBy = /**
     * @param {?} user - username
     * @return {?}
     */
    function (user) {
        this.setParameter(Parameters.LAST_MODIFIED_BY, user);
    };
    /** @return username */
    /**
     * @return {?} username
     */
    Query.prototype.getLastModifiedBy = /**
     * @return {?} username
     */
    function () {
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
    /**
     * Specify a Theme or set of Themes to constrain results. By
     * default, values are assumed to be theme identifiers. If using
     * theme labels or theme uris, specify the optional second parameter
     * to be either Parameters.THEMES_LABEL or Parameters.THEMES_URI
     * respectively.
     * @param {?} themes - string or array of strings containing theme constraint
     * @param {?=} parameter - optional, to indicate the parameter to use
     * @return {?} Query
     */
    Query.prototype.themes = /**
     * Specify a Theme or set of Themes to constrain results. By
     * default, values are assumed to be theme identifiers. If using
     * theme labels or theme uris, specify the optional second parameter
     * to be either Parameters.THEMES_LABEL or Parameters.THEMES_URI
     * respectively.
     * @param {?} themes - string or array of strings containing theme constraint
     * @param {?=} parameter - optional, to indicate the parameter to use
     * @return {?} Query
     */
    function (themes, parameter) {
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
    /**
     * Specify a Theme or set of Themes to constrain results. By
     * default, values are assumed to be theme identifiers. If using
     * theme labels or theme uris, specify the optional second parameter
     * to be either Parameters.THEMES_LABEL or Parameters.THEMES_URI
     * respectively.
     * @param {?} themes - theme or themes to constrain by
     * @param {?=} parameter
     * @return {?}
     */
    Query.prototype.setThemes = /**
     * Specify a Theme or set of Themes to constrain results. By
     * default, values are assumed to be theme identifiers. If using
     * theme labels or theme uris, specify the optional second parameter
     * to be either Parameters.THEMES_LABEL or Parameters.THEMES_URI
     * respectively.
     * @param {?} themes - theme or themes to constrain by
     * @param {?=} parameter
     * @return {?}
     */
    function (themes, parameter) {
        //clear existing
        this.setParameter(Parameters.THEMES_ID, null);
        this.setParameter(Parameters.THEMES_LABEL, null);
        this.setParameter(Parameters.THEMES_URI, null);
        /** @type {?} */
        var param = parameter || Parameters.THEMES_ID;
        this.setParameter(param, toArray(themes));
    };
    /**
     * @return {?}
     */
    Query.prototype.getThemes = /**
     * @return {?}
     */
    function () {
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
    /**
     * Specify a Topic or set of Topics to constrain results. By
     * default, values are assumed to be theme identifiers. If using
     * theme labels or theme uris, specify the optional second parameter
     * to be either Parameters.TOPIC_LABEL or Parameters.TOPIC_URI
     * respectively.
     * @param {?} topics - string or array of strings containing theme constraint
     * @param {?=} parameter - optional, to indicate the parameter to use
     * @return {?} Query instance
     */
    Query.prototype.topics = /**
     * Specify a Topic or set of Topics to constrain results. By
     * default, values are assumed to be theme identifiers. If using
     * theme labels or theme uris, specify the optional second parameter
     * to be either Parameters.TOPIC_LABEL or Parameters.TOPIC_URI
     * respectively.
     * @param {?} topics - string or array of strings containing theme constraint
     * @param {?=} parameter - optional, to indicate the parameter to use
     * @return {?} Query instance
     */
    function (topics, parameter) {
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
    /**
     * Specify a Topic or set of Topics to constrain results. By
     * default, values are assumed to be theme identifiers. If using
     * theme labels or theme uris, specify the optional second parameter
     * to be either Parameters.TOPIC_LABEL or Parameters.TOPIC_URI
     * respectively.
     * @param {?} topics - theme or topics to constrain by
     * @param {?=} parameter
     * @return {?}
     */
    Query.prototype.setTopics = /**
     * Specify a Topic or set of Topics to constrain results. By
     * default, values are assumed to be theme identifiers. If using
     * theme labels or theme uris, specify the optional second parameter
     * to be either Parameters.TOPIC_LABEL or Parameters.TOPIC_URI
     * respectively.
     * @param {?} topics - theme or topics to constrain by
     * @param {?=} parameter
     * @return {?}
     */
    function (topics, parameter) {
        //clear existing
        this.setParameter(Parameters.TOPICS_ID, null);
        this.setParameter(Parameters.TOPICS_LABEL, null);
        this.setParameter(Parameters.TOPICS_URI, null);
        /** @type {?} */
        var param = parameter || Parameters.TOPICS_ID;
        this.setParameter(param, toArray(topics));
    };
    /**
     * @return {?}
     */
    Query.prototype.getTopics = /**
     * @return {?}
     */
    function () {
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
    /**
     * Specify a Publisher or set of Publishers to constrain results. By
     * default, values are assumed to be identifiers. If using labels or uris,
     * specify the optional second parameter to be either
     * Parameters.PUBLISHERS_LABEL or Parameters.PUBLISHERS_URI respectively.
     * @param {?} publishers
     * @param {?=} parameter - optional, to indicate the parameter to use
     * @return {?} Query
     */
    Query.prototype.publishers = /**
     * Specify a Publisher or set of Publishers to constrain results. By
     * default, values are assumed to be identifiers. If using labels or uris,
     * specify the optional second parameter to be either
     * Parameters.PUBLISHERS_LABEL or Parameters.PUBLISHERS_URI respectively.
     * @param {?} publishers
     * @param {?=} parameter - optional, to indicate the parameter to use
     * @return {?} Query
     */
    function (publishers, parameter) {
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
    /**
     * Specify a Publisher or set of Publishers to constrain results. By
     * default, values are assumed to be identifiers. If using labels or uris,
     * specify the optional second parameter to be either
     * Parameters.PUBLISHERS_LABEL or Parameters.PUBLISHERS_URI respectively.
     * @param {?} publishers - publishing orgs to constrain by
     * @param {?=} parameter
     * @return {?}
     */
    Query.prototype.setPublishers = /**
     * Specify a Publisher or set of Publishers to constrain results. By
     * default, values are assumed to be identifiers. If using labels or uris,
     * specify the optional second parameter to be either
     * Parameters.PUBLISHERS_LABEL or Parameters.PUBLISHERS_URI respectively.
     * @param {?} publishers - publishing orgs to constrain by
     * @param {?=} parameter
     * @return {?}
     */
    function (publishers, parameter) {
        //clear existing
        this.setParameter(Parameters.PUBLISHERS_ID, null);
        this.setParameter(Parameters.PUBLISHERS_LABEL, null);
        this.setParameter(Parameters.PUBLISHERS_URI, null);
        /** @type {?} */
        var param = parameter || Parameters.PUBLISHERS_ID;
        this.setParameter(param, toArray(publishers));
    };
    /**
     * @return {?}
     */
    Query.prototype.getPublishers = /**
     * @return {?}
     */
    function () {
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
    /**
     * Specify a Point of Contact or set of Contacts to constrain results. By
     * default, values are assumed to be identifiers. If using
     * labels or uris, specify the optional second parameter to be either
     * Parameters.CONTACTS_LABEL or Parameters.CONTACTS_URI respectively.
     * @param {?} contacts
     * @param {?=} parameter - optional, to indicate the parameter to use
     * @return {?} Query
     */
    Query.prototype.contacts = /**
     * Specify a Point of Contact or set of Contacts to constrain results. By
     * default, values are assumed to be identifiers. If using
     * labels or uris, specify the optional second parameter to be either
     * Parameters.CONTACTS_LABEL or Parameters.CONTACTS_URI respectively.
     * @param {?} contacts
     * @param {?=} parameter - optional, to indicate the parameter to use
     * @return {?} Query
     */
    function (contacts, parameter) {
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
    /**
     * Specify a Contact or set of Contacts to constrain results. By
     * default, values are assumed to be identifiers. If using
     * labels or uris, specify the optional second parameter to be either
     * Parameters.CONTACTS_LABEL or Parameters.CONTACTS_URI respectively.
     * @param {?} contacts - publishing orgs to constrain by
     * @param {?=} parameter
     * @return {?}
     */
    Query.prototype.setContacts = /**
     * Specify a Contact or set of Contacts to constrain results. By
     * default, values are assumed to be identifiers. If using
     * labels or uris, specify the optional second parameter to be either
     * Parameters.CONTACTS_LABEL or Parameters.CONTACTS_URI respectively.
     * @param {?} contacts - publishing orgs to constrain by
     * @param {?=} parameter
     * @return {?}
     */
    function (contacts, parameter) {
        //clear existing
        this.setParameter(Parameters.CONTACTS_ID, null);
        this.setParameter(Parameters.CONTACTS_LABEL, null);
        this.setParameter(Parameters.CONTACTS_URI, null);
        /** @type {?} */
        var param = parameter || Parameters.CONTACTS_ID;
        this.setParameter(param, toArray(contacts));
    };
    /**
     * @return {?}
     */
    Query.prototype.getContacts = /**
     * @return {?}
     */
    function () {
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
    /**
     * Specify the identifier of an Agent (Community, Group, etc) that
     * uses items you wish to find in search results. By
     * default, values are assumed to be identifiers. If using
     * labels or uris, specify the optional second parameter
     * to be either Parameters.USED_BY_LABEL or Parameters.USED_BY_URI
     * respectively.
     * @param {?} ids
     * @param {?=} parameter - optional, to indicate the parameter to use
     * @return {?} Query
     */
    Query.prototype.usedBy = /**
     * Specify the identifier of an Agent (Community, Group, etc) that
     * uses items you wish to find in search results. By
     * default, values are assumed to be identifiers. If using
     * labels or uris, specify the optional second parameter
     * to be either Parameters.USED_BY_LABEL or Parameters.USED_BY_URI
     * respectively.
     * @param {?} ids
     * @param {?=} parameter - optional, to indicate the parameter to use
     * @return {?} Query
     */
    function (ids, parameter) {
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
    /**
     * Specify the identifier of an Agent (Community, Group, etc) that
     * uses items you wish to find in search results. By
     * default, values are assumed to be identifiers. If using
     * labels or uris, specify the optional second parameter
     * to be either Parameters.USED_BY_LABEL or Parameters.USED_BY_URI
     * respectively.
     * @param {?} ids - publishing orgs to constrain by
     * @param {?=} parameter
     * @return {?}
     */
    Query.prototype.setUsedBy = /**
     * Specify the identifier of an Agent (Community, Group, etc) that
     * uses items you wish to find in search results. By
     * default, values are assumed to be identifiers. If using
     * labels or uris, specify the optional second parameter
     * to be either Parameters.USED_BY_LABEL or Parameters.USED_BY_URI
     * respectively.
     * @param {?} ids - publishing orgs to constrain by
     * @param {?=} parameter
     * @return {?}
     */
    function (ids, parameter) {
        //clear existing
        this.setParameter(Parameters.USED_BY_ID, null);
        this.setParameter(Parameters.USED_BY_LABEL, null);
        this.setParameter(Parameters.USED_BY_URI, null);
        /** @type {?} */
        var param = parameter || Parameters.USED_BY_ID;
        this.setParameter(param, toArray(ids));
    };
    /**
     * @return {?}
     */
    Query.prototype.getUsedBy = /**
     * @return {?}
     */
    function () {
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
    /**
     * Specify a Concept Scheme or set of Concept Schemes to constrain results. By
     * default, values are assumed to be identifiers. If using
     * labels or uris, specify the optional second parameter
     * to be either Parameters.SCHEMES_LABEL or Parameters.SCHEMES_URI
     * respectively.
     * @param {?} schemes - schemes to constrain by
     * @param {?=} parameter - optional, to indicate the parameter to use
     * @return {?} Query
     */
    Query.prototype.schemes = /**
     * Specify a Concept Scheme or set of Concept Schemes to constrain results. By
     * default, values are assumed to be identifiers. If using
     * labels or uris, specify the optional second parameter
     * to be either Parameters.SCHEMES_LABEL or Parameters.SCHEMES_URI
     * respectively.
     * @param {?} schemes - schemes to constrain by
     * @param {?=} parameter - optional, to indicate the parameter to use
     * @return {?} Query
     */
    function (schemes, parameter) {
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
    /**
     * Specify a Concept Scheme or set of Concept Schemes to constrain results. By
     * default, values are assumed to be theme identifiers. If using
     * theme labels or theme uris, specify the optional second parameter
     * to be either Parameters.SCHEMES_LABEL or Parameters.SCHEMES_URI
     * respectively.
     * @param {?} schemes - schemes to constrain by
     * @param {?=} parameter - optional, to indicate the parameter to use
     * @return {?}
     */
    Query.prototype.setSchemes = /**
     * Specify a Concept Scheme or set of Concept Schemes to constrain results. By
     * default, values are assumed to be theme identifiers. If using
     * theme labels or theme uris, specify the optional second parameter
     * to be either Parameters.SCHEMES_LABEL or Parameters.SCHEMES_URI
     * respectively.
     * @param {?} schemes - schemes to constrain by
     * @param {?=} parameter - optional, to indicate the parameter to use
     * @return {?}
     */
    function (schemes, parameter) {
        //clear existing
        this.setParameter(Parameters.SCHEMES_ID, null);
        this.setParameter(Parameters.SCHEMES_LABEL, null);
        this.setParameter(Parameters.SCHEMES_URI, null);
        /** @type {?} */
        var param = parameter || Parameters.SCHEMES_ID;
        this.setParameter(param, toArray(schemes));
    };
    /**
     * @return {?}
     */
    Query.prototype.getSchemes = /**
     * @return {?}
     */
    function () {
        return this.getParameter(Parameters.SCHEMES_ID) ||
            this.getParameter(Parameters.SCHEMES_LABEL) ||
            this.getParameter(Parameters.SCHEMES_URI);
    };
    // -----------------------------------------------------------
    /**
     *
     */
    /**
     *
     * @param {?} types
     * @return {?}
     */
    Query.prototype.serviceTypes = /**
     *
     * @param {?} types
     * @return {?}
     */
    function (types) {
        this.setServiceTypes(types);
        return this;
    };
    /**
     * @param types - ids
     */
    /**
     * @param {?} types - ids
     * @return {?}
     */
    Query.prototype.setServiceTypes = /**
     * @param {?} types - ids
     * @return {?}
     */
    function (types) {
        this.setParameter(Parameters.SERVICE_TYPES, toArray(types));
    };
    /**
     * @return {?}
     */
    Query.prototype.getServiceTypes = /**
     * @return {?}
     */
    function () {
        return this.getParameter(Parameters.SERVICE_TYPES);
    };
    // -----------------------------------------------------------
    /**
     * @param {?} vis
     * @return {?}
     */
    Query.prototype.visibility = /**
     * @param {?} vis
     * @return {?}
     */
    function (vis) {
        this.setVisibility(vis);
        return this;
    };
    /**
     * @param visibility - one of 'public' or 'private'
     */
    /**
     * @param {?} visibility - one of 'public' or 'private'
     * @return {?}
     */
    Query.prototype.setVisibility = /**
     * @param {?} visibility - one of 'public' or 'private'
     * @return {?}
     */
    function (visibility) {
        this.setParameter(Parameters.VISIBILITY, visibility);
    };
    /**
     * @return {?}
     */
    Query.prototype.getVisibility = /**
     * @return {?}
     */
    function () {
        return this.getParameter(Parameters.VISIBILITY);
    };
    // -----------------------------------------------------------
    /**
     * @param {?} value
     * @return {?}
     */
    Query.prototype.status = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.setStatus(value);
        return this;
    };
    /**
     * @param status - current status of Item
     */
    /**
     * @param {?} value
     * @return {?}
     */
    Query.prototype.setStatus = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.setParameter(Parameters.STATUS, value);
    };
    /**
     * @return {?}
     */
    Query.prototype.getStatus = /**
     * @return {?}
     */
    function () {
        return this.getParameter(Parameters.STATUS);
    };
    // -----------------------------------------------------------
    /**
     * @param {?} bbox
     * @return {?}
     */
    Query.prototype.extent = /**
     * @param {?} bbox
     * @return {?}
     */
    function (bbox) {
        this.setExtent(bbox);
        return this;
    };
    /**
     * @param bbox - string form of "minx,miny,maxx,maxy", or L.LatLngBounds, or Array
     */
    /**
     * @param {?} bbox - string form of "minx,miny,maxx,maxy", or L.LatLngBounds, or Array
     * @return {?}
     */
    Query.prototype.setExtent = /**
     * @param {?} bbox - string form of "minx,miny,maxx,maxy", or L.LatLngBounds, or Array
     * @return {?}
     */
    function (bbox) {
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
    /**
     * @return {?} bbox string or null if not set
     */
    Query.prototype.getExtent = /**
     * @return {?} bbox string or null if not set
     */
    function () {
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
    /**
     * Ex.
     *  const { KGClassifiers, Query } from 'geoplatform.client';
     *  let purposeId = '...';
     *  let query = new Query();
     *  query.classifier( KGClassifiers.PURPOSE, purposeId );
     *
     * @param {?} classifier - string name of classifier to use
     * @param {?} value - id or array of ids of concepts to use
     * @return {?} Query
     */
    Query.prototype.classifier = /**
     * Ex.
     *  const { KGClassifiers, Query } from 'geoplatform.client';
     *  let purposeId = '...';
     *  let query = new Query();
     *  query.classifier( KGClassifiers.PURPOSE, purposeId );
     *
     * @param {?} classifier - string name of classifier to use
     * @param {?} value - id or array of ids of concepts to use
     * @return {?} Query
     */
    function (classifier, value) {
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
    /**
     * Ex.
     *  const { KGClassifiers, Query } from 'geoplatform.client';
     *  let purposeId = '...';
     *  let query = new Query();
     *  query.setClassifier( KGClassifiers.PURPOSE, purposeId );
     *
     * @param {?} classifier - string name of classifier to use
     * @param {?} value - id or array of ids of concepts to use
     * @return {?}
     */
    Query.prototype.setClassifier = /**
     * Ex.
     *  const { KGClassifiers, Query } from 'geoplatform.client';
     *  let purposeId = '...';
     *  let query = new Query();
     *  query.setClassifier( KGClassifiers.PURPOSE, purposeId );
     *
     * @param {?} classifier - string name of classifier to use
     * @param {?} value - id or array of ids of concepts to use
     * @return {?}
     */
    function (classifier, value) {
        /** @type {?} */
        var arr = toArray(value);
        this.setParameter(Parameters.CLASSIFIERS + "." + classifier, arr);
    };
    /**
     * @param classifier - name of classifier constraint in use
     * @return array of concept ids
     */
    /**
     * @param {?} classifier - name of classifier constraint in use
     * @return {?} array of concept ids
     */
    Query.prototype.getClassifier = /**
     * @param {?} classifier - name of classifier constraint in use
     * @return {?} array of concept ids
     */
    function (classifier) {
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
     * @param {?} value - object defining classifiers
     * @return {?} Query instance
     */
    Query.prototype.classifiers = /**
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
     * @param {?} value - object defining classifiers
     * @return {?} Query instance
     */
    function (value) {
        this.setClassifiers(value);
        return this;
    };
    /**
     * @param value - object defining classifiers
     */
    /**
     * @param {?} value - object defining classifiers
     * @return {?}
     */
    Query.prototype.setClassifiers = /**
     * @param {?} value - object defining classifiers
     * @return {?}
     */
    function (value) {
        var _this = this;
        /** @type {?} */
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
    /**
     * @return {?} classifiers used in the query
     */
    Query.prototype.getClassifiers = /**
     * @return {?} classifiers used in the query
     */
    function () {
        var _this = this;
        /** @type {?} */
        var result = {};
        Object.keys(Classifiers).map(function (k) { return Classifiers[k]; }).forEach(function (classifier) {
            result[classifier] = _this.getClassifier(classifier);
        });
        return result;
    };
    // -----------------------------------------------------------
    /**
     * @param {?} date
     * @param {?} beforeOrAfter
     * @return {?}
     */
    Query.prototype.modified = /**
     * @param {?} date
     * @param {?} beforeOrAfter
     * @return {?}
     */
    function (date, beforeOrAfter) {
        this.setModified(date, beforeOrAfter);
        return this;
    };
    /**
     * @param date - date to compare against
     * @param beforeOrAfter - flag specifying which boundary condition (true = before, false = after) flag specifying whether to trigger update automatically
     */
    /**
     * @param {?} date - date to compare against
     * @param {?} beforeOrAfter - flag specifying which boundary condition (true = before, false = after) flag specifying whether to trigger update automatically
     * @return {?}
     */
    Query.prototype.setModified = /**
     * @param {?} date - date to compare against
     * @param {?} beforeOrAfter - flag specifying which boundary condition (true = before, false = after) flag specifying whether to trigger update automatically
     * @return {?}
     */
    function (date, beforeOrAfter) {
        //if no date was supplied, consider it "unset" for both properties
        if (!date) {
            this.setParameter(Parameters.MODIFIED_BEFORE, null);
            this.setParameter(Parameters.MODIFIED_AFTER, null);
            return;
        }
        if (!(date instanceof Date))
            date = new Date(/** @type {?} */ (date));
        /** @type {?} */
        var dir = beforeOrAfter && (beforeOrAfter === true || beforeOrAfter === "true");
        /** @type {?} */
        var prop = dir ? Parameters.MODIFIED_BEFORE : Parameters.MODIFIED_AFTER;
        /** @type {?} */
        var oppProp = dir ? Parameters.MODIFIED_AFTER : Parameters.MODIFIED_BEFORE;
        /** @type {?} */
        var arg = (date && date.getTime) ? date.getTime() : date;
        this.setParameter(oppProp, null);
        this.setParameter(prop, arg);
    };
    /**
     * @return {?}
     */
    Query.prototype.getModified = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var value = this.getParameter(Parameters.MODIFIED_BEFORE) ||
            this.getParameter(Parameters.MODIFIED_AFTER);
        if (value && typeof (value) === 'number') {
            value = new Date(value);
        }
        return value;
    };
    // -----------------------------------------------------------
    /**
     * @param {?} date
     * @param {?} beforeOrAfter
     * @return {?}
     */
    Query.prototype.created = /**
     * @param {?} date
     * @param {?} beforeOrAfter
     * @return {?}
     */
    function (date, beforeOrAfter) {
        this.setCreated(date, beforeOrAfter);
        return this;
    };
    /**
     * @param date - date to compare against
     * @param beforeOrAfter - flag specifying which boundary condition (true = before, false = after) flag specifying whether to trigger update automatically
     */
    /**
     * @param {?} date - date to compare against
     * @param {?} beforeOrAfter - flag specifying which boundary condition (true = before, false = after) flag specifying whether to trigger update automatically
     * @return {?}
     */
    Query.prototype.setCreated = /**
     * @param {?} date - date to compare against
     * @param {?} beforeOrAfter - flag specifying which boundary condition (true = before, false = after) flag specifying whether to trigger update automatically
     * @return {?}
     */
    function (date, beforeOrAfter) {
        //if no date was supplied, consider it "unset" for both properties
        if (!date) {
            this.setParameter(Parameters.CREATED_BEFORE, null);
            this.setParameter(Parameters.CREATED_AFTER, null);
            return;
        }
        if (!(date instanceof Date))
            date = new Date(/** @type {?} */ (date));
        /** @type {?} */
        var dir = beforeOrAfter && (beforeOrAfter === true || beforeOrAfter === "true");
        /** @type {?} */
        var prop = dir ? Parameters.CREATED_BEFORE : Parameters.CREATED_AFTER;
        /** @type {?} */
        var oppProp = dir ? Parameters.CREATED_AFTER : Parameters.CREATED_BEFORE;
        /** @type {?} */
        var arg = (date && date.getTime) ? date.getTime() : date;
        this.setParameter(oppProp, null);
        this.setParameter(prop, arg);
    };
    /**
     * @return {?}
     */
    Query.prototype.getCreated = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var value = this.getParameter(Parameters.CREATED_BEFORE) ||
            this.getParameter(Parameters.CREATED_AFTER);
        if (value && typeof (value) === 'number') {
            value = new Date(value);
        }
        return value;
    };
    // -----------------------------------------------------------
    /**
     * @param {?} date
     * @return {?}
     */
    Query.prototype.begins = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        this.setBeginDate(date);
        return this;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    Query.prototype.setBeginDate = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (date && date instanceof Date)
            date = date.getTime();
        this.setParameter(Parameters.BEGINS, date);
    };
    /**
     * @return {?}
     */
    Query.prototype.getBeginDate = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var date = this.getParameter(Parameters.BEGINS);
        if (date)
            date = new Date(date);
        return date;
    };
    // -----------------------------------------------------------
    /**
     * @param {?} date
     * @return {?}
     */
    Query.prototype.ends = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        this.setEndDate(date);
        return this;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    Query.prototype.setEndDate = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (date && date instanceof Date)
            date = date.getTime();
        this.setParameter(Parameters.ENDS, date);
    };
    /**
     * @return {?}
     */
    Query.prototype.getEndDate = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var date = this.getParameter(Parameters.ENDS);
        if (date)
            date = new Date(date);
        return date;
    };
    // -----------------------------------------------------------
    /**
     * @param {?} begin
     * @param {?} end
     * @return {?}
     */
    Query.prototype.between = /**
     * @param {?} begin
     * @param {?} end
     * @return {?}
     */
    function (begin, end) {
        this.setBetween(begin, end);
        return this;
    };
    /**
     * @param {?} begin
     * @param {?} end
     * @return {?}
     */
    Query.prototype.setBetween = /**
     * @param {?} begin
     * @param {?} end
     * @return {?}
     */
    function (begin, end) {
        this.begins(begin);
        this.ends(end);
    };
    // -----------------------------------------------------------
    /**
     * @param {?} types
     * @return {?}
     */
    Query.prototype.resourceTypes = /**
     * @param {?} types
     * @return {?}
     */
    function (types) {
        this.setResourceTypes(types);
        return this;
    };
    /**
     * @param {?} types
     * @return {?}
     */
    Query.prototype.setResourceTypes = /**
     * @param {?} types
     * @return {?}
     */
    function (types) {
        this.setParameter(Parameters.RESOURCE_TYPE, toArray(types));
    };
    /**
     * @return {?}
     */
    Query.prototype.getResourceTypes = /**
     * @return {?}
     */
    function () {
        return this.getParameter(Parameters.RESOURCE_TYPE);
    };
    // -----------------------------------------------------------
    /**
     * @param {?} names
     * @return {?}
     */
    Query.prototype.facets = /**
     * @param {?} names
     * @return {?}
     */
    function (names) {
        this.setFacets(names);
        return this;
    };
    /*
     * @param names - names of facets
     */
    /**
     * @param {?} names
     * @return {?}
     */
    Query.prototype.setFacets = /**
     * @param {?} names
     * @return {?}
     */
    function (names) {
        this.setParameter(Parameters.FACETS, toArray(names));
    };
    /**
     * @return {?}
     */
    Query.prototype.getFacets = /**
     * @return {?}
     */
    function () {
        return this.getParameter(Parameters.FACETS);
    };
    /**
     * @param name - name of facet to add
     */
    /**
     * @param {?} name - name of facet to add
     * @return {?}
     */
    Query.prototype.addFacet = /**
     * @param {?} name - name of facet to add
     * @return {?}
     */
    function (name) {
        /** @type {?} */
        var facets = this.getFacets() || [];
        facets.push(name);
        this.setFacets(facets);
    };
    /**
     * @param name - name of facet to remove
     */
    /**
     * @param {?} name - name of facet to remove
     * @return {?}
     */
    Query.prototype.removeFacet = /**
     * @param {?} name - name of facet to remove
     * @return {?}
     */
    function (name) {
        /** @type {?} */
        var facets = this.getFacets() || [];
        /** @type {?} */
        var idx = facets.indexOf(name);
        if (idx >= 0) {
            facets.splice(idx, 1);
            this.setFacets(facets);
        }
    };
    // -----------------------------------------------------------
    /**
     * @param {?} fields
     * @return {?}
     */
    Query.prototype.fields = /**
     * @param {?} fields
     * @return {?}
     */
    function (fields) {
        this.setFields(fields);
        return this;
    };
    /**
     * @param fields - list of field names to request for each search result
     */
    /**
     * @param {?} fields - list of field names to request for each search result
     * @return {?}
     */
    Query.prototype.setFields = /**
     * @param {?} fields - list of field names to request for each search result
     * @return {?}
     */
    function (fields) {
        this.setParameter(Parameters.FIELDS, toArray(fields));
    };
    /**
     * @return {?}
     */
    Query.prototype.getFields = /**
     * @return {?}
     */
    function () {
        return this.getParameter(Parameters.FIELDS);
    };
    /**
     * @param field - name of field to remove
     */
    /**
     * @param {?} field - name of field to remove
     * @return {?}
     */
    Query.prototype.addField = /**
     * @param {?} field - name of field to remove
     * @return {?}
     */
    function (field) {
        /** @type {?} */
        var fields = this.getFields() || [];
        fields.push(field);
        this.setFields(fields);
    };
    /**
     * @param field - name of field to remove
     */
    /**
     * @param {?} field - name of field to remove
     * @return {?}
     */
    Query.prototype.removeField = /**
     * @param {?} field - name of field to remove
     * @return {?}
     */
    function (field) {
        /** @type {?} */
        var fields = this.getFields() || [];
        /** @type {?} */
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
    /**
     * @param {?} page - page of results to fetch
     * @return {?}
     */
    Query.prototype.page = /**
     * @param {?} page - page of results to fetch
     * @return {?}
     */
    function (page) {
        this.setPage(page);
        return this;
    };
    /**
     * @param {?} page
     * @return {?}
     */
    Query.prototype.setPage = /**
     * @param {?} page
     * @return {?}
     */
    function (page) {
        if (isNaN(page) || page * 1 < 0)
            return;
        this.setParameter(Parameters.PAGE, page * 1);
    };
    /**
     * @return {?}
     */
    Query.prototype.getPage = /**
     * @return {?}
     */
    function () {
        return this.getParameter(Parameters.PAGE);
    };
    /**
     * @return {?}
     */
    Query.prototype.nextPage = /**
     * @return {?}
     */
    function () {
        this.setPage(this.getPage() + 1);
    };
    /**
     * @return {?}
     */
    Query.prototype.previousPage = /**
     * @return {?}
     */
    function () {
        this.setPage(this.getPage() - 1);
    };
    // -----------------------------------------------------------
    /**
     * @param size - page size to request
     */
    /**
     * @param {?} size - page size to request
     * @return {?}
     */
    Query.prototype.pageSize = /**
     * @param {?} size - page size to request
     * @return {?}
     */
    function (size) {
        this.setPageSize(size);
        return this;
    };
    /**
     * @param {?} size
     * @return {?}
     */
    Query.prototype.setPageSize = /**
     * @param {?} size
     * @return {?}
     */
    function (size) {
        if (isNaN(size) || size * 1 < 0)
            return;
        this.setParameter(Parameters.PAGE_SIZE, size * 1);
    };
    /**
     * @return {?}
     */
    Query.prototype.getPageSize = /**
     * @return {?}
     */
    function () {
        return this.getParameter(Parameters.PAGE_SIZE);
    };
    // -----------------------------------------------------------
    /**
     * @param sort - form of <field>,<dir> or just field name
     * @param order - optional, either 'asc' or 'desc'
     */
    /**
     * @param {?} sort - form of <field>,<dir> or just field name
     * @param {?=} order - optional, either 'asc' or 'desc'
     * @return {?}
     */
    Query.prototype.sort = /**
     * @param {?} sort - form of <field>,<dir> or just field name
     * @param {?=} order - optional, either 'asc' or 'desc'
     * @return {?}
     */
    function (sort, order) {
        this.setSort(sort, order);
        return this;
    };
    /**
     * @param sort - form of <field>,<dir> or just field name
     * @param order - optional, either 'asc' or 'desc'
     */
    /**
     * @param {?} sort - form of <field>,<dir> or just field name
     * @param {?=} order - optional, either 'asc' or 'desc'
     * @return {?}
     */
    Query.prototype.setSort = /**
     * @param {?} sort - form of <field>,<dir> or just field name
     * @param {?=} order - optional, either 'asc' or 'desc'
     * @return {?}
     */
    function (sort, order) {
        order = order || 'desc';
        if (sort && sort.indexOf(',') < 0)
            sort = sort + ',' + order;
        this.setParameter(Parameters.SORT, sort);
    };
    /**
     * @return {?}
     */
    Query.prototype.getSort = /**
     * @return {?}
     */
    function () {
        return this.getParameter(Parameters.SORT);
    };
    /**
     * @return {?}
     */
    Query.prototype.getSortField = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var value = this.getSort();
        return value && value.length ? value.split(',')[0] : null;
    };
    /**
     * @return {?}
     */
    Query.prototype.getSortOrder = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var value = this.getSort();
        return value && value.length ? value.split(',')[1] : null;
    };
    /**
     * @return list of key-value pairs of sort options
     */
    /**
     * @return {?} list of key-value pairs of sort options
     */
    Query.prototype.getSortOptions = /**
     * @return {?} list of key-value pairs of sort options
     */
    function () {
        return SORT_OPTIONS_DEFAULT$1.slice(0);
    };
    // -----------------------------------------------------------
    /**
     *
     */
    /**
     *
     * @return {?}
     */
    Query.prototype.clear = /**
     *
     * @return {?}
     */
    function () {
        this.query = JSON.parse(JSON.stringify(this.defaultQuery));
    };
    return Query;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function queryFactory() {
    return new Query();
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ɵ0$1 = function (options) {
    Object.assign(this, options);
};
/** @type {?} */
var Config = {
    ualUrl: 'https://ual.geoplatform.gov',
    //appId: '...',
    configure: ɵ0$1
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var GPHttpClient = /** @class */ (function () {
    /**
     * @param options.timeout
     * @param options.token - the bearer token or a function to retrieve it
     */
    function GPHttpClient(options) {
        this.timeout = 5000;
        options = options || {};
        this.setTimeout(options["timeout"] || 30000);
        this.setAuthToken(options["token"]);
    }
    /**
     * @param {?} timeout
     * @return {?}
     */
    GPHttpClient.prototype.setTimeout = /**
     * @param {?} timeout
     * @return {?}
     */
    function (timeout) {
        this.timeout = timeout;
    };
    /**
     * @param arg - specify the bearer token or a function to retrieve it
     */
    /**
     * @param {?} arg - specify the bearer token or a function to retrieve it
     * @return {?}
     */
    GPHttpClient.prototype.setAuthToken = /**
     * @param {?} arg - specify the bearer token or a function to retrieve it
     * @return {?}
     */
    function (arg) {
        if (arg && typeof (arg) === 'string')
            this.token = function () { return arg; };
        else if (arg && typeof (arg) === 'function')
            this.token = arg;
        //else do nothing
    };
    /**
     * @return {?}
     */
    GPHttpClient.prototype.getToken = /**
     * @return {?}
     */
    function () {
        if (this.token && typeof (this.token) === 'function')
            return this.token();
        else
            return this.token || null;
    };
    /**
     * @param {?} options
     * @return {?}
     */
    GPHttpClient.prototype.createRequestOpts = /**
     * @param {?} options
     * @return {?}
     */
    function (
    // @ts-ignore
    // @ts-ignore
    options) {
        throw new Error("Must implement 'createRequestOpts' in a sub-class");
    };
    /**
     * @param {?} opts
     * @return {?}
     */
    GPHttpClient.prototype.execute = /**
     * @param {?} opts
     * @return {?}
     */
    function (
    // @ts-ignore
    // @ts-ignore
    opts) {
        return Promise.reject(new Error("Must overrdie 'execute' in a sub-class"));
    };
    return GPHttpClient;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var XHRHttpClient = /** @class */ (function (_super) {
    __extends(XHRHttpClient, _super);
    /**
     * @param options.timeout
     * @param options.token - the bearer token or a function to retrieve it
     */
    function XHRHttpClient(options) {
        return _super.call(this, options) || this;
    }
    /**
     * @param {?} options
     * @return {?}
     */
    XHRHttpClient.prototype.createRequestOpts = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        /** @type {?} */
        var opts = {
            method: options["method"],
            url: options["url"],
            timeout: options["timeout"] || this.timeout
        };
        if (options["json"] === true)
            opts["responseType"] = 'json';
        if (options["params"]) {
            opts["params"] = options["params"];
        }
        if (options["data"]) {
            opts["data"] = options["data"];
            opts["contentType"] = 'application/json';
        }
        //set authorization header if one was provided
        if (this.token) {
            /** @type {?} */
            var token = this.token();
            if (token) {
                opts["headers"] = opts["headers"] || {};
                opts["headers"].Authorization = 'Bearer ' + token;
                opts["withCredentials"] = true;
            }
        }
        //copy over user-supplied options
        if (options["options"]) {
            for (var o in options["options"]) {
                if (options["options"].hasOwnProperty(o)) {
                    opts[o] = options["options"][o];
                }
            }
        }
        return opts;
    };
    /**
     * @param {?} opts
     * @return {?}
     */
    XHRHttpClient.prototype.execute = /**
     * @param {?} opts
     * @return {?}
     */
    function (opts) {
        if (typeof (axios) === 'undefined') {
            throw new Error("Axios not found, check that you have included " +
                "it as a dependency of the application or use a different " +
                "HttpClient implementation");
        }
        /** @type {?} */
        var promise = axios(opts)
            .then(function (response) { return response.data; })
            .catch(function (error) {
            /** @type {?} */
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
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * BaseService
 * abstract service for working with the GeoPlatform API to
 * retrieve and manipulate items.
 *
 */
var /**
 * BaseService
 * abstract service for working with the GeoPlatform API to
 * retrieve and manipulate items.
 *
 */
BaseService = /** @class */ (function () {
    function BaseService(url, httpClient) {
        this._timeout = 30000;
        this.httpMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
        this.setUrl(url);
        this.client = httpClient;
    }
    /**
     * @param {?} baseUrl
     * @return {?}
     */
    BaseService.prototype.setUrl = /**
     * @param {?} baseUrl
     * @return {?}
     */
    function (baseUrl) {
        this.apiBase = baseUrl;
        this.baseUrl = baseUrl + '/api/items';
    };
    /**
     * @param milliseconds - override environment variable timeout
     */
    /**
     * @param {?} milliseconds - override environment variable timeout
     * @return {?}
     */
    BaseService.prototype.setTimeout = /**
     * @param {?} milliseconds - override environment variable timeout
     * @return {?}
     */
    function (milliseconds) {
        this._timeout = milliseconds;
    };
    /**
     * @param milliseconds - override environment variable timeout
     */
    /**
     * @param {?} milliseconds - override environment variable timeout
     * @return {?}
     */
    BaseService.prototype.timeout = /**
     * @param {?} milliseconds - override environment variable timeout
     * @return {?}
     */
    function (milliseconds) {
        this.setTimeout(milliseconds);
        return this;
    };
    /**
     * @return GPHttpClient instance or null if one was not provided
     */
    /**
     * @return {?} GPHttpClient instance or null if one was not provided
     */
    BaseService.prototype.getClient = /**
     * @return {?} GPHttpClient instance or null if one was not provided
     */
    function () {
        return this.client;
    };
    /**
     * @param {?} arg
     * @return {?}
     */
    BaseService.prototype.createPromise = /**
     * @param {?} arg
     * @return {?}
     */
    function (arg) {
        return new Promise(arg);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    BaseService.prototype.createAndResolvePromise = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return Promise.resolve(value);
    };
    /**
     * @param {?} error
     * @return {?}
     */
    BaseService.prototype.createAndRejectPromise = /**
     * @param {?} error
     * @return {?}
     */
    function (error) {
        return Promise.reject(error);
    };
    /**
     * @param logger - log service
     */
    /**
     * @param {?} logger - log service
     * @return {?}
     */
    BaseService.prototype.setLogger = /**
     * @param {?} logger - log service
     * @return {?}
     */
    function (logger) {
        this.logger = logger;
    };
    /**
     * @param e - error to log (if logger specified)
     */
    /**
     * @param {?} e - error to log (if logger specified)
     * @return {?}
     */
    BaseService.prototype.logError = /**
     * @param {?} e - error to log (if logger specified)
     * @return {?}
     */
    function (e) {
        if (this.logger && this.logger.error) {
            this.logger.error(e);
        }
    };
    /**
     * @param msg - message to log as debug
     */
    /**
     * @param {?} msg - message to log as debug
     * @return {?}
     */
    BaseService.prototype.logDebug = /**
     * @param {?} msg - message to log as debug
     * @return {?}
     */
    function (msg) {
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
    /**
     * @param {?} options - optional object defining request options
     * @return {?} request options for xhr
     */
    BaseService.prototype.buildRequest = /**
     * @param {?} options - optional object defining request options
     * @return {?} request options for xhr
     */
    function (options) {
        if (this.httpMethods.indexOf(options["method"]) < 0)
            throw new Error("Unsupported HTTP method " + options["method"]);
        if (!options["url"])
            throw new Error("Must specify a URL for HTTP requests");
        options["timeout"] = this._timeout || 30000;
        /** @type {?} */
        var opts = this.createRequestOpts(options);
        return opts;
    };
    /**
     * @param {?} options
     * @return {?}
     */
    BaseService.prototype.createRequestOpts = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        /** @type {?} */
        var request = this.client.createRequestOpts(options);
        this.logDebug("BaseService.createRequestOpts() - " + JSON.stringify(request));
        return request;
    };
    /**
     * @param {?} opts
     * @return {?}
     */
    BaseService.prototype.execute = /**
     * @param {?} opts
     * @return {?}
     */
    function (opts) {
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
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
var /**
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
ItemService = /** @class */ (function (_super) {
    __extends(ItemService, _super);
    function ItemService(url, httpClient) {
        return _super.call(this, url, httpClient) || this;
    }
    /**
     * @param id - identifier of item to fetch
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving Item object or an error
     */
    /**
     * @param {?} id - identifier of item to fetch
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving Item object or an error
     */
    ItemService.prototype.get = /**
     * @param {?} id - identifier of item to fetch
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving Item object or an error
     */
    function (id, options) {
        var _this = this;
        /** @type {?} */
        var url = this.baseUrl + '/' + id;
        if (options && options.version) {
            url += '/versions/' + options.version;
            // this.logDebug("Client.get requesting version: " + options.version);
        }
        return this.createAndResolvePromise(url)
            .then(function (url) {
            /** @type {?} */
            var opts = _this.buildRequest({ method: "GET", url: url, options: options });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
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
    /**
     * @param {?} itemObj - item to create or update
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving Item object or an error
     */
    ItemService.prototype.save = /**
     * @param {?} itemObj - item to create or update
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving Item object or an error
     */
    function (itemObj, options) {
        var _this = this;
        return this.createAndResolvePromise(itemObj)
            .then(function (item) {
            /** @type {?} */
            var method = 'POST';
            /** @type {?} */
            var url = _this.baseUrl;
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
                        /** @type {?} */
                        var opts = _this.buildRequest({ method: method, url: url, data: item, options: options });
                        return _this.execute(opts);
                    });
                }
            }
            /** @type {?} */
            var opts = _this.buildRequest({ method: method, url: url, data: item, options: options });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
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
    /**
     * @param {?} id - identifier of item to delete
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving true if successful or an error
     */
    ItemService.prototype.remove = /**
     * @param {?} id - identifier of item to delete
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving true if successful or an error
     */
    function (id, options) {
        var _this = this;
        return this.createAndResolvePromise(this.baseUrl + '/' + id)
            .then(function (url) {
            /** @type {?} */
            var opts = _this.buildRequest({
                method: "DELETE", url: url, options: options
            });
            return _this.execute(opts);
        })
            .then(function () { return true; })
            .catch(function (e) {
            /** @type {?} */
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
    /**
     * @param {?} id - identifier of item to patch
     * @param {?} patch - HTTP-PATCH compliant set of properties to patch
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving Item object or an error
     */
    ItemService.prototype.patch = /**
     * @param {?} id - identifier of item to patch
     * @param {?} patch - HTTP-PATCH compliant set of properties to patch
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving Item object or an error
     */
    function (id, patch, options) {
        var _this = this;
        return this.createAndResolvePromise(this.baseUrl + '/' + id)
            .then(function (url) {
            /** @type {?} */
            var opts = _this.buildRequest({
                method: "PATCH", url: url, data: patch, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
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
    /**
     * @param {?} id - identifier of item to clone
     * @param {?} overrides - KVP of property-value overrides to apply to cloned instance
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving clone of Item or an error
     */
    ItemService.prototype.clone = /**
     * @param {?} id - identifier of item to clone
     * @param {?} overrides - KVP of property-value overrides to apply to cloned instance
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving clone of Item or an error
     */
    function (id, overrides, options) {
        var _this = this;
        return this.createAndResolvePromise(this.baseUrl + '/' + id + '/clone')
            .then(function (url) {
            /** @type {?} */
            var opts = _this.buildRequest({
                method: "POST", url: url, data: overrides, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
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
    /**
     * @param {?=} arg - either JS object of query parameters or Query instance
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving search results
     */
    ItemService.prototype.search = /**
     * @param {?=} arg - either JS object of query parameters or Query instance
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving search results
     */
    function (arg, options) {
        var _this = this;
        return this.createAndResolvePromise(arg)
            .then(function (params) {
            /** @type {?} */
            var ps = {};
            if (params && typeof (params.getQuery) === 'function')
                ps = params.getQuery();
            else if (typeof (params) === 'object')
                ps = params;
            else
                ps = {};
            /** @type {?} */
            var opts = _this.buildRequest({
                method: "GET",
                url: _this.baseUrl,
                params: ps,
                options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
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
    /**
     *
     * @param {?} arg - URL to metadata document or File to upload
     * @param {?} format - metadata format of specified document
     * @param {?=} options
     * @return {?} Promise resolving GeoPlatform Item
     */
    ItemService.prototype.import = /**
     *
     * @param {?} arg - URL to metadata document or File to upload
     * @param {?} format - metadata format of specified document
     * @param {?=} options
     * @return {?} Promise resolving GeoPlatform Item
     */
    function (arg, format, options) {
        var _this = this;
        return this.createAndResolvePromise(true)
            .then(function () {
            if (arg === null || arg === undefined) {
                throw new Error("Must provide a valid URL or File");
            }
            /** @type {?} */
            var isFile = typeof (arg) !== 'string';
            /** @type {?} */
            var ro = {
                method: "POST",
                url: _this.apiBase + '/api/import',
                processData: true,
                //for jQuery
                formData: true,
                //for Node (RequestJS)
                options: options
            };
            if (isFile) {
                ro["file"] = arg;
                ro["data"] = { format: format };
            }
            else {
                ro["formData"] = false; //must be false for data to not be multi-part formdata
                ro["data"] = { url: arg, format: format };
            }
            if (options && options.overwrite) {
                ro["data"].overwrite = (!!options.overwrite) + '';
                delete options.overwrite;
            }
            /** @type {?} */
            var opts = _this.buildRequest(ro);
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("Error importing item: " + e.message);
            Object.assign(err, e);
            if (e.status === 409 || ~e.message.indexOf('Item already exists'))
                Object.assign(err, { status: 409 });
            if (e.item)
                Object.assign(err, { item: e.item });
            _this.logError('ItemService.import() - ' + err.message);
            throw err;
        });
    };
    /**
     * @param id - identifier of the item to export
     * @param format - string mime type to export
     * @return Promise resolving HTTP response object for enabling attachment downloading
     */
    /**
     * @param {?} id - identifier of the item to export
     * @param {?} format - string mime type to export
     * @param {?=} options
     * @return {?} Promise resolving HTTP response object for enabling attachment downloading
     */
    ItemService.prototype.export = /**
     * @param {?} id - identifier of the item to export
     * @param {?} format - string mime type to export
     * @param {?=} options
     * @return {?} Promise resolving HTTP response object for enabling attachment downloading
     */
    function (id, format, options) {
        var _this = this;
        return this.createAndResolvePromise(true)
            .then(function () {
            /** @type {?} */
            var url = _this.baseUrl + '/' + id + '/export';
            /** @type {?} */
            var opts = _this.buildRequest({
                method: "GET", url: url,
                params: { format: format },
                json: false,
                options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
            var msg = e.message;
            //https://github.com/GeoPlatform/client-api/issues/1
            if (e.statusCode && e.statusCode === 406 || e.statusCode === '406') {
                msg = "Unsupported export format specified '" + format + "'";
            }
            /** @type {?} */
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
    /**
     * @param {?} object - GP object definition to generate a URI for
     * @param {?=} options - optional request options
     * @return {?} Promise resolving string URI
     */
    ItemService.prototype.getUri = /**
     * @param {?} object - GP object definition to generate a URI for
     * @param {?=} options - optional request options
     * @return {?} Promise resolving string URI
     */
    function (object, options) {
        var _this = this;
        return this.createAndResolvePromise(object)
            .then(function (obj) {
            if (!obj || !obj.type)
                throw new Error("Must provide an object with a type property");
            /** @type {?} */
            var url = _this.apiBase + '/api/utils/uri';
            options = options || {};
            options.responseType = 'text';
            /** @type {?} */
            var opts = _this.buildRequest({
                method: "POST", url: url, data: obj, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
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
    /**
     * @param {?} ids - list of identifiers to fetch objects for
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving list of matching items or an error
     */
    ItemService.prototype.getMultiple = /**
     * @param {?} ids - list of identifiers to fetch objects for
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving list of matching items or an error
     */
    function (ids, options) {
        var _this = this;
        return this.createAndResolvePromise(ids)
            .then(function (identifiers) {
            /** @type {?} */
            var method = 'POST';
            /** @type {?} */
            var url = _this.apiBase + '/api/fetch';
            /** @type {?} */
            var opts = _this.buildRequest({ method: method, url: url, data: identifiers, options: options });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
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
    /**
     * @param {?} uris - list of URIs to retrieve objects for
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving list containing uri-item association where exists
     */
    ItemService.prototype.exists = /**
     * @param {?} uris - list of URIs to retrieve objects for
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving list containing uri-item association where exists
     */
    function (uris, options) {
        var _this = this;
        return this.createAndResolvePromise(uris)
            .then(function (uris) {
            /** @type {?} */
            var method = 'POST';
            /** @type {?} */
            var url = _this.apiBase + '/api/utils/exists';
            /** @type {?} */
            var opts = _this.buildRequest({ method: method, url: url, data: uris, options: options });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("Error resolving items: " + e.message);
            Object.assign(err, e);
            _this.logError('ItemService.exists() - ' + err.message);
            throw err;
        });
    };
    /**
     * @param {?} item
     * @param {?=} options
     * @return {?}
     */
    ItemService.prototype.like = /**
     * @param {?} item
     * @param {?=} options
     * @return {?}
     */
    function (item, options) {
        var _this = this;
        return this.createAndResolvePromise(item.id)
            .then(function (id) {
            /** @type {?} */
            var method = 'PUT';
            /** @type {?} */
            var url = _this.apiBase + '/api/items/' + id + '/likes';
            /** @type {?} */
            var opts = _this.buildRequest({ method: method, url: url, options: options });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("Error liking item " + item.id + ": " + e.message);
            Object.assign(err, e);
            _this.logError('ItemService.like() - ' + err.message);
            throw err;
        });
    };
    /**
     * @param {?} item
     * @param {?=} options
     * @return {?}
     */
    ItemService.prototype.view = /**
     * @param {?} item
     * @param {?=} options
     * @return {?}
     */
    function (item, options) {
        var _this = this;
        return this.createAndResolvePromise(item.id)
            .then(function (id) {
            /** @type {?} */
            var method = 'PUT';
            /** @type {?} */
            var url = _this.apiBase + '/api/items/' + id + '/views';
            /** @type {?} */
            var opts = _this.buildRequest({ method: method, url: url, options: options });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
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
    /**
     * @param {?} id - identifier of item to fetch associations for
     * @param {?} params
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving array of associated items of the item in question
     */
    ItemService.prototype.associations = /**
     * @param {?} id - identifier of item to fetch associations for
     * @param {?} params
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving array of associated items of the item in question
     */
    function (id, params, options) {
        var _this = this;
        return this.createAndResolvePromise(id)
            .then(function (id) {
            /** @type {?} */
            var url = _this.baseUrl + '/' + id + '/associations';
            /** @type {?} */
            var opts = _this.buildRequest({
                method: "GET",
                url: url,
                params: params || {},
                options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
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
    /**
     * @param {?} id - identifier of item to fetch version info for
     * @param {?=} params - optional set of query parameters to constrain list of versions
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving array of available versions of the item
     */
    ItemService.prototype.versions = /**
     * @param {?} id - identifier of item to fetch version info for
     * @param {?=} params - optional set of query parameters to constrain list of versions
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving array of available versions of the item
     */
    function (id, params, options) {
        var _this = this;
        return this.createAndResolvePromise(id)
            .then(function (id) {
            /** @type {?} */
            var url = _this.baseUrl + '/' + id + '/versions';
            /** @type {?} */
            var opts = _this.buildRequest({
                method: "GET", url: url, params: params, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("Error fetching versions for item " + id + ": " + e.message);
            Object.assign(err, e);
            _this.logError('ItemService.versions() - ' + err.message);
            throw err;
        });
    };
    return ItemService;
}(BaseService));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * GeoPlatform Map service
 * service for working with the GeoPlatform API to
 * retrieve and manipulate map objects.
 *
 * @see GeoPlatform.ItemService
 */
var /**
 * GeoPlatform Map service
 * service for working with the GeoPlatform API to
 * retrieve and manipulate map objects.
 *
 * @see GeoPlatform.ItemService
 */
DatasetService = /** @class */ (function (_super) {
    __extends(DatasetService, _super);
    function DatasetService(url, httpClient) {
        return _super.call(this, url, httpClient) || this;
    }
    /**
     * @param {?} baseUrl
     * @return {?}
     */
    DatasetService.prototype.setUrl = /**
     * @param {?} baseUrl
     * @return {?}
     */
    function (baseUrl) {
        _super.prototype.setUrl.call(this, baseUrl);
        this.baseUrl = baseUrl + '/api/datasets';
    };
    return DatasetService;
}(ItemService));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * GeoPlatform Map service
 * service for working with the GeoPlatform API to
 * retrieve and manipulate map objects.
 *
 * @see GeoPlatform.ItemService
 */
var /**
 * GeoPlatform Map service
 * service for working with the GeoPlatform API to
 * retrieve and manipulate map objects.
 *
 * @see GeoPlatform.ItemService
 */
MapService = /** @class */ (function (_super) {
    __extends(MapService, _super);
    function MapService(url, httpClient) {
        return _super.call(this, url, httpClient) || this;
    }
    /**
     * @param {?} baseUrl
     * @return {?}
     */
    MapService.prototype.setUrl = /**
     * @param {?} baseUrl
     * @return {?}
     */
    function (baseUrl) {
        _super.prototype.setUrl.call(this, baseUrl);
        this.baseUrl = baseUrl + '/api/maps';
    };
    return MapService;
}(ItemService));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * GeoPlatform Map service
 * service for working with the GeoPlatform API to
 * retrieve and manipulate map objects.
 *
 * @see GeoPlatform.ItemService
 */
var /**
 * GeoPlatform Map service
 * service for working with the GeoPlatform API to
 * retrieve and manipulate map objects.
 *
 * @see GeoPlatform.ItemService
 */
LayerService = /** @class */ (function (_super) {
    __extends(LayerService, _super);
    function LayerService(url, httpClient) {
        return _super.call(this, url, httpClient) || this;
    }
    /**
     * @param {?} baseUrl
     * @return {?}
     */
    LayerService.prototype.setUrl = /**
     * @param {?} baseUrl
     * @return {?}
     */
    function (baseUrl) {
        _super.prototype.setUrl.call(this, baseUrl);
        this.baseUrl = baseUrl + '/api/layers';
    };
    /**
     * @param id - GeoPlatform Layer identifier
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving style JSON object
     */
    /**
     * @param {?} id - GeoPlatform Layer identifier
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving style JSON object
     */
    LayerService.prototype.style = /**
     * @param {?} id - GeoPlatform Layer identifier
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving style JSON object
     */
    function (id, options) {
        var _this = this;
        return Promise.resolve(id)
            .then(function (id) {
            /** @type {?} */
            var url = _this.baseUrl + '/' + id + '/style';
            /** @type {?} */
            var opts = _this.buildRequest({
                method: "GET", url: url, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
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
    /**
     * @param {?} id - GeoPlatform Layer identifier
     * @param {?} req identifying extent, x, y
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving feature JSON object
     */
    LayerService.prototype.describe = /**
     * @param {?} id - GeoPlatform Layer identifier
     * @param {?} req identifying extent, x, y
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving feature JSON object
     */
    function (id, req, options) {
        var _this = this;
        return Promise.resolve(req)
            .then(function (req) {
            if (!req) {
                throw new Error("Must provide describe parameters to use");
            }
            /** @type {?} */
            var keys = ['bbox', 'height', 'width', 'x', 'y'];
            /** @type {?} */
            var missing = keys.find(function (key) { return !req[key]; });
            if (missing) {
                throw new Error("Must specify " + missing + " in describe req");
            }
            /** @type {?} */
            var params = {
                srs: 'EPSG:4326',
                bbox: req.bbox,
                height: req.height,
                width: req.width,
                info_format: 'text/xml',
                x: req.x,
                y: req.y,
                i: req.x,
                //WMS 1.3.0
                j: req.y //WMS 1.3.0
            };
            /** @type {?} */
            var url = _this.baseUrl + '/' + id + '/describe';
            /** @type {?} */
            var opts = _this.buildRequest({
                method: "GET", url: url, params: params, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
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
    /**
     * @param {?} id - GeoPlatform Layer identifier
     * @param {?} params describing layer request to validate
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving empty if successful or a message if failed
     */
    LayerService.prototype.validate = /**
     * @param {?} id - GeoPlatform Layer identifier
     * @param {?} params describing layer request to validate
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving empty if successful or a message if failed
     */
    function (id, params, options) {
        var _this = this;
        return Promise.resolve(params)
            .then(function (params) {
            if (!params) {
                throw new Error("Must provide parameters to use in layer validation");
            }
            /** @type {?} */
            var url = _this.baseUrl + '/' + id + '/validate';
            /** @type {?} */
            var opts = _this.buildRequest({
                method: "GET", url: url, params: params, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("Error validating layer request: " + e.message);
            Object.assign(err, e);
            _this.logError('LayerService.describe() - ' + err.message);
            throw err;
        });
    };
    return LayerService;
}(ItemService));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * GeoPlatform Service service
 * service for working with the GeoPlatform API to
 * retrieve and manipulate service objects.
 *
 * @see ItemService
 */
var /**
 * GeoPlatform Service service
 * service for working with the GeoPlatform API to
 * retrieve and manipulate service objects.
 *
 * @see ItemService
 */
ServiceService = /** @class */ (function (_super) {
    __extends(ServiceService, _super);
    function ServiceService(url, httpClient) {
        return _super.call(this, url, httpClient) || this;
    }
    /**
     * @param {?} baseUrl
     * @return {?}
     */
    ServiceService.prototype.setUrl = /**
     * @param {?} baseUrl
     * @return {?}
     */
    function (baseUrl) {
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
    /**
     * Fetch metadata from the specified GeoPlatform Service's
     * web-accessible implementation using either GetCapabilities
     * or ESRI documentInfo.
     * @param {?} service - GeoPlatform Service object
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving service metadata
     */
    ServiceService.prototype.about = /**
     * Fetch metadata from the specified GeoPlatform Service's
     * web-accessible implementation using either GetCapabilities
     * or ESRI documentInfo.
     * @param {?} service - GeoPlatform Service object
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving service metadata
     */
    function (service, options) {
        var _this = this;
        return Promise.resolve(service)
            .then(function (svc) {
            if (!svc)
                throw new Error("Must provide service to get metadata about");
            /** @type {?} */
            var opts = _this.buildRequest({
                method: 'POST', url: _this.baseUrl + '/about', data: svc, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("Error describing service: " + e.message);
            Object.assign(err, e);
            _this.logError('ServiceService.about() - ' + err.message);
            throw err;
        });
    };
    /**
     * @param options - optional set of request options to apply to request
     * @return Promise resolving service types
     */
    /**
     * @param {?=} options - optional set of request options to apply to request
     * @return {?} Promise resolving service types
     */
    ServiceService.prototype.types = /**
     * @param {?=} options - optional set of request options to apply to request
     * @return {?} Promise resolving service types
     */
    function (options) {
        var _this = this;
        /** @type {?} */
        var query = new Query()
            .types(ItemTypes.STANDARD)
            .resourceTypes('ServiceType')
            .pageSize(50)
            .getQuery();
        return Promise.resolve(query)
            .then(function (params) {
            /** @type {?} */
            var url = _this.apiBase + '/api/items';
            /** @type {?} */
            var opts = _this.buildRequest({
                method: 'GET', url: url, params: params, options: options
            });
            return _this.execute(opts);
        })
            .then(function (response) { return response.results; })
            .catch(function (e) {
            /** @type {?} */
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
    /**
     * @param {?} service - GP Service definition
     * @param {?=} options - optional set of request options to apply to request
     * @return {?} Promise resolving imported service
     */
    ServiceService.prototype.import = /**
     * @param {?} service - GP Service definition
     * @param {?=} options - optional set of request options to apply to request
     * @return {?} Promise resolving imported service
     */
    function (service, options) {
        var _this = this;
        return Promise.resolve(service)
            .then(function (svc) {
            /** @type {?} */
            var url = _this.baseUrl + '/import';
            /** @type {?} */
            var opts = _this.buildRequest({
                method: 'POST', url: url, data: svc, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
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
    /**
     * @param {?} id - identifier of GP service to harvest layers for
     * @param {?=} options - optional set of request options to apply to request
     * @return {?} Promise resolving service layers
     */
    ServiceService.prototype.harvest = /**
     * @param {?} id - identifier of GP service to harvest layers for
     * @param {?=} options - optional set of request options to apply to request
     * @return {?} Promise resolving service layers
     */
    function (id, options) {
        var _this = this;
        return Promise.resolve(id)
            .then(function (id) {
            /** @type {?} */
            var url = _this.baseUrl + '/' + id + '/harvest';
            /** @type {?} */
            var opts = _this.buildRequest({
                method: 'GET', url: url, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
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
    /**
     * @param {?} id - identifier of GP service to live test
     * @param {?=} options - optional set of request options to apply to request
     * @return {?} Promise resolving service statistics
     */
    ServiceService.prototype.liveTest = /**
     * @param {?} id - identifier of GP service to live test
     * @param {?=} options - optional set of request options to apply to request
     * @return {?} Promise resolving service statistics
     */
    function (id, options) {
        var _this = this;
        return Promise.resolve(id)
            .then(function (id) {
            /** @type {?} */
            var url = _this.baseUrl + '/' + id + '/test';
            /** @type {?} */
            var opts = _this.buildRequest({
                method: 'GET', url: url, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
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
    /**
     * @param {?} id - identifier of GP service to fetch statistics about
     * @param {?=} options - optional set of request options to apply to request
     * @return {?} Promise resolving service statistics
     */
    ServiceService.prototype.statistics = /**
     * @param {?} id - identifier of GP service to fetch statistics about
     * @param {?=} options - optional set of request options to apply to request
     * @return {?} Promise resolving service statistics
     */
    function (id, options) {
        var _this = this;
        return Promise.resolve(id)
            .then(function (id) {
            /** @type {?} */
            var url = _this.baseUrl + '/' + id + '/statistics';
            /** @type {?} */
            var opts = _this.buildRequest({
                method: 'GET', url: url, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("Error getting service statistics: " + e.message);
            Object.assign(err, e);
            _this.logError('ServiceService.statistics() - ' + err.message);
            throw err;
        });
    };
    return ServiceService;
}(ItemService));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * GeoPlatform Map service
 * service for working with the GeoPlatform API to
 * retrieve and manipulate map objects.
 *
 * @see GeoPlatform.ItemService
 */
var /**
 * GeoPlatform Map service
 * service for working with the GeoPlatform API to
 * retrieve and manipulate map objects.
 *
 * @see GeoPlatform.ItemService
 */
GalleryService = /** @class */ (function (_super) {
    __extends(GalleryService, _super);
    function GalleryService(url, httpClient) {
        return _super.call(this, url, httpClient) || this;
    }
    /**
     * @param {?} baseUrl
     * @return {?}
     */
    GalleryService.prototype.setUrl = /**
     * @param {?} baseUrl
     * @return {?}
     */
    function (baseUrl) {
        _super.prototype.setUrl.call(this, baseUrl);
        this.baseUrl = baseUrl + '/api/galleries';
    };
    /**
     * @param {?} galleryId
     * @param {?} itemObj
     * @param {?=} options
     * @return {?}
     */
    GalleryService.prototype.addItem = /**
     * @param {?} galleryId
     * @param {?} itemObj
     * @param {?=} options
     * @return {?}
     */
    function (galleryId, itemObj, options) {
        var _this = this;
        return Promise.resolve(true)
            .then(function () {
            /** @type {?} */
            var url = _this.baseUrl + '/' + galleryId + '/items';
            /** @type {?} */
            var opts = _this.buildRequest({
                method: 'POST', url: url, data: itemObj, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("Error adding item: " + e.message);
            Object.assign(err, e);
            _this.logError('GalleryService.addItem() - ' + err.message);
            throw err;
        });
    };
    /**
     * @param {?} galleryId
     * @param {?} itemId
     * @param {?=} options
     * @return {?}
     */
    GalleryService.prototype.removeItem = /**
     * @param {?} galleryId
     * @param {?} itemId
     * @param {?=} options
     * @return {?}
     */
    function (galleryId, itemId, options) {
        var _this = this;
        return Promise.resolve(this.baseUrl + '/' + galleryId + '/items/' + itemId)
            .then(function (url) {
            /** @type {?} */
            var opts = _this.buildRequest({
                method: 'DELETE', url: url, options: options
            });
            return _this.execute(opts);
        })
            .then(function () { return true; })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("Error adding item: " + e.message);
            Object.assign(err, e);
            _this.logError('GalleryService.addItem() - ' + err.message);
            throw err;
        });
    };
    return GalleryService;
}(ItemService));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var UtilsService = /** @class */ (function (_super) {
    __extends(UtilsService, _super);
    function UtilsService(url, httpClient) {
        var _this = _super.call(this, url, httpClient) || this;
        _this.setTimeout(30000);
        return _this;
    }
    /**
     * @param {?} baseUrl
     * @return {?}
     */
    UtilsService.prototype.setUrl = /**
     * @param {?} baseUrl
     * @return {?}
     */
    function (baseUrl) {
        _super.prototype.setUrl.call(this, baseUrl);
        this.baseUrl = baseUrl;
    };
    /**
     * @param property - optional capa property to specifically request
     * @param query - optional query parameters to include with request
     * @param options - optional config to send with http request
     * @return Promise resolving capabilities object
     */
    /**
     * @param {?} property - optional capa property to specifically request
     * @param {?} query - optional query parameters to include with request
     * @param {?=} options - optional config to send with http request
     * @return {?} Promise resolving capabilities object
     */
    UtilsService.prototype.capabilities = /**
     * @param {?} property - optional capa property to specifically request
     * @param {?} query - optional query parameters to include with request
     * @param {?=} options - optional config to send with http request
     * @return {?} Promise resolving capabilities object
     */
    function (property, query, options) {
        var _this = this;
        /** @type {?} */
        var url = this.baseUrl + '/api/capabilities';
        if (property)
            url += '/' + property;
        return this.createAndResolvePromise(url)
            .then(function (url) {
            /** @type {?} */
            var opts = _this.buildRequest({
                method: "GET", url: url, params: query || {}, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
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
    /**
     * @param {?} file
     * @param {?} format
     * @param {?=} options
     * @return {?} Promise
     */
    UtilsService.prototype.parseFile = /**
     * @param {?} file
     * @param {?} format
     * @param {?=} options
     * @return {?} Promise
     */
    function (file, format, options) {
        var _this = this;
        /** @type {?} */
        var url = this.baseUrl + '/api/utils/parse';
        return this.createAndResolvePromise(url)
            .then(function (url) {
            /** @type {?} */
            var opts = _this.buildRequest({
                method: "POST", url: url,
                data: { format: format },
                file: file,
                formData: true,
                //NodeJS (RequestJS)
                options: options
            });
            return _this.execute(opts);
        })
            .then(function (response) { return response; })
            .catch(function (e) {
            /** @type {?} */
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
    /**
     * Geolocate the specified argument to a set of candidate locations.
     * @param {?} value - text string to geolocate (name or lat,lng)
     * @param {?=} options - optional config to send with http request
     * @return {?} Promise resolving an array of geocoded results
     */
    UtilsService.prototype.locate = /**
     * Geolocate the specified argument to a set of candidate locations.
     * @param {?} value - text string to geolocate (name or lat,lng)
     * @param {?=} options - optional config to send with http request
     * @return {?} Promise resolving an array of geocoded results
     */
    function (value, options) {
        var _this = this;
        /** @type {?} */
        var url = this.baseUrl + '/api/utils/gazetteer';
        return this.createAndResolvePromise(url)
            .then(function (url) {
            /** @type {?} */
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
            /** @type {?} */
            var err = new Error("Error resolving location: " + e.message);
            Object.assign(err, e);
            _this.logError('UtilsService.locate() - ' + err.message);
            throw err;
        });
    };
    return UtilsService;
}(BaseService));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var AgolQuery = /** @class */ (function () {
    function AgolQuery() {
        this._query = {
            page: 0,
            size: 10
        };
    }
    /**
     * @return {?}
     */
    AgolQuery.prototype.getQuery = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var result = {};
        for (var prop in this._query) {
            /** @type {?} */
            var value = this._query[prop];
            if (value !== null && typeof (value.push) !== 'undefined') {
                value = value.join(',');
            }
            result[prop] = value;
        }
        return result;
    };
    // ---------------------------------------
    /**
     * @param {?} value
     * @return {?}
     */
    AgolQuery.prototype.q = /**
     * @param {?} value
     * @return {?}
     */
    function (value) { this.setQ(value); return this; };
    /**
     * @param {?} value
     * @return {?}
     */
    AgolQuery.prototype.setQ = /**
     * @param {?} value
     * @return {?}
     */
    function (value) { this._query["q"] = value; };
    /**
     * @return {?}
     */
    AgolQuery.prototype.getQ = /**
     * @return {?}
     */
    function () { return this._query["q"]; };
    // ---------------------------------------
    /**
     * @param {?} value
     * @return {?}
     */
    AgolQuery.prototype.types = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.setTypes(value);
        return this;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    AgolQuery.prototype.setTypes = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var val;
        if (value && Array.isArray(value))
            val = (/** @type {?} */ (value)).join(',');
        else
            val = /** @type {?} */ (value);
        this._query["types"] = val;
    };
    /**
     * @return {?}
     */
    AgolQuery.prototype.getTypes = /**
     * @return {?}
     */
    function () { return this._query["types"]; };
    // ---------------------------------------
    /**
     * @param {?} value
     * @return {?}
     */
    AgolQuery.prototype.groups = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.setGroups(value);
        return this;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    AgolQuery.prototype.setGroups = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var val;
        if (value && Array.isArray(value))
            val = (/** @type {?} */ (value)).join(',');
        else
            val = /** @type {?} */ (value);
        this._query["groups"] = val;
    };
    /**
     * @return {?}
     */
    AgolQuery.prototype.getGroups = /**
     * @return {?}
     */
    function () { return this._query["groups"]; };
    // ---------------------------------------
    /**
     * @param {?} value
     * @return {?}
     */
    AgolQuery.prototype.orgs = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.setOrgs(value);
        return this;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    AgolQuery.prototype.setOrgs = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var val;
        if (value && Array.isArray(value))
            val = (/** @type {?} */ (value)).join(',');
        else
            val = /** @type {?} */ (value);
        this._query["orgs"] = val;
    };
    /**
     * @return {?}
     */
    AgolQuery.prototype.getOrgs = /**
     * @return {?}
     */
    function () { return this._query["orgs"]; };
    // ---------------------------------------
    /**
     * @param {?} value
     * @return {?}
     */
    AgolQuery.prototype.extent = /**
     * @param {?} value
     * @return {?}
     */
    function (value) { this.setExtent(value); return this; };
    /**
     * @param {?} value
     * @return {?}
     */
    AgolQuery.prototype.setExtent = /**
     * @param {?} value
     * @return {?}
     */
    function (value) { this._query["bbox"] = value; };
    /**
     * @return {?}
     */
    AgolQuery.prototype.getExtent = /**
     * @return {?}
     */
    function () { return this._query["bbox"]; };
    // ---------------------------------------
    /**
     * @param sort - form of <field>,<dir> or just field name
     * @param order - optional, either 'asc' or 'desc'
     */
    /**
     * @param {?} sort - form of <field>,<dir> or just field name
     * @param {?} order - optional, either 'asc' or 'desc'
     * @return {?}
     */
    AgolQuery.prototype.sort = /**
     * @param {?} sort - form of <field>,<dir> or just field name
     * @param {?} order - optional, either 'asc' or 'desc'
     * @return {?}
     */
    function (sort, order) {
        this.setSort(sort, order);
        return this;
    };
    /**
     * @param sort - form of <field>,<dir> or just field name
     * @param order - optional, either 'asc' or 'desc'
     */
    /**
     * @param {?} sort - form of <field>,<dir> or just field name
     * @param {?} order - optional, either 'asc' or 'desc'
     * @return {?}
     */
    AgolQuery.prototype.setSort = /**
     * @param {?} sort - form of <field>,<dir> or just field name
     * @param {?} order - optional, either 'asc' or 'desc'
     * @return {?}
     */
    function (sort, order) {
        order = order || 'desc';
        if (sort && sort.indexOf(',') < 0)
            sort = sort + ',' + order;
        this._query["sort"] = sort;
    };
    /**
     * @return {?}
     */
    AgolQuery.prototype.getSort = /**
     * @return {?}
     */
    function () { return this._query["sort"]; };
    /**
     * @return {?}
     */
    AgolQuery.prototype.getSortField = /**
     * @return {?}
     */
    function () { return this._query["sort"].split(',')[0]; };
    /**
     * @return {?}
     */
    AgolQuery.prototype.getSortOrder = /**
     * @return {?}
     */
    function () { return this._query["sort"].split(',')[1] === 'asc'; };
    // -----------------------------------------------------------
    /**
     * @param page - page of results to fetch
     */
    /**
     * @param {?} page - page of results to fetch
     * @return {?}
     */
    AgolQuery.prototype.page = /**
     * @param {?} page - page of results to fetch
     * @return {?}
     */
    function (page) {
        this.setPage(page);
        return this;
    };
    /**
     * @param {?} page
     * @return {?}
     */
    AgolQuery.prototype.setPage = /**
     * @param {?} page
     * @return {?}
     */
    function (page) {
        if (isNaN(page) || page * 1 < 0)
            return;
        this._query["page"] = page * 1;
    };
    /**
     * @return {?}
     */
    AgolQuery.prototype.getPage = /**
     * @return {?}
     */
    function () {
        return this._query["page"];
    };
    /**
     * @return {?}
     */
    AgolQuery.prototype.nextPage = /**
     * @return {?}
     */
    function () {
        this.setPage(this._query["page"] + 1);
    };
    /**
     * @return {?}
     */
    AgolQuery.prototype.previousPage = /**
     * @return {?}
     */
    function () {
        this.setPage(this._query["page"] - 1);
    };
    // -----------------------------------------------------------
    /**
     * @param size - page size to request
     */
    /**
     * @param {?} size - page size to request
     * @return {?}
     */
    AgolQuery.prototype.pageSize = /**
     * @param {?} size - page size to request
     * @return {?}
     */
    function (size) {
        this.setPageSize(size);
        return this;
    };
    /**
     * @param {?} size
     * @return {?}
     */
    AgolQuery.prototype.setPageSize = /**
     * @param {?} size
     * @return {?}
     */
    function (size) {
        if (isNaN(size) || size * 1 < 0)
            return;
        this._query["size"] = size * 1;
    };
    /**
     * @return {?}
     */
    AgolQuery.prototype.getPageSize = /**
     * @return {?}
     */
    function () {
        return this._query["size"];
    };
    return AgolQuery;
}());
var AgolService = /** @class */ (function (_super) {
    __extends(AgolService, _super);
    function AgolService(url, httpClient) {
        var _this = _super.call(this, url, httpClient) || this;
        _this.setTimeout(30000);
        return _this;
    }
    /**
     * @param {?} baseUrl
     * @return {?}
     */
    AgolService.prototype.setUrl = /**
     * @param {?} baseUrl
     * @return {?}
     */
    function (baseUrl) {
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
    /**
     * @param {?} id - identifier of AGOL organization to fetch
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving Item object or an error
     */
    AgolService.prototype.getOrg = /**
     * @param {?} id - identifier of AGOL organization to fetch
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving Item object or an error
     */
    function (id, options) {
        var _this = this;
        return this.createAndResolvePromise(id)
            .then(function (id) {
            /** @type {?} */
            var opts = _this.buildRequest({
                method: "GET", url: _this.baseUrl + '/orgs/' + id, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
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
    /**
     * @param {?} arg - either JS object of query parameters or Query instance
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving search results
     */
    AgolService.prototype.searchOrgs = /**
     * @param {?} arg - either JS object of query parameters or Query instance
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving search results
     */
    function (arg, options) {
        var _this = this;
        return this.createAndResolvePromise(arg)
            .then(function (params) {
            /** @type {?} */
            var ps = params.getQuery();
            /** @type {?} */
            var opts = _this.buildRequest({
                method: "GET",
                url: _this.baseUrl + '/orgs',
                params: ps,
                options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
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
    /**
     * @param {?} id - identifier of AGOL group to fetch
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving Item object or an error
     */
    AgolService.prototype.getGroup = /**
     * @param {?} id - identifier of AGOL group to fetch
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving Item object or an error
     */
    function (id, options) {
        var _this = this;
        return this.createAndResolvePromise(id)
            .then(function (id) {
            /** @type {?} */
            var opts = _this.buildRequest({
                method: "GET", url: _this.baseUrl + '/groups/' + id, options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
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
    /**
     * @param {?} arg - either JS object of query parameters or AgolQuery instance
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving search results
     */
    AgolService.prototype.searchGroups = /**
     * @param {?} arg - either JS object of query parameters or AgolQuery instance
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving search results
     */
    function (arg, options) {
        var _this = this;
        return this.createAndResolvePromise(arg)
            .then(function (params) {
            /** @type {?} */
            var ps = params.getQuery();
            /** @type {?} */
            var opts = _this.buildRequest({
                method: "GET",
                url: _this.baseUrl + '/groups',
                params: ps,
                options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
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
    /**
     * @param {?} id - identifier of AGOL item to fetch
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving Item object or an error
     */
    AgolService.prototype.getItem = /**
     * @param {?} id - identifier of AGOL item to fetch
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving Item object or an error
     */
    function (id, options) {
        var _this = this;
        return this.createAndResolvePromise(id)
            .then(function (id) {
            /** @type {?} */
            var opts = _this.buildRequest({
                method: "GET",
                url: _this.baseUrl + '/items/' + id,
                options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
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
    /**
     * @param {?} arg - either JS object of query parameters or AgolQuery instance
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving search results
     */
    AgolService.prototype.searchItems = /**
     * @param {?} arg - either JS object of query parameters or AgolQuery instance
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving search results
     */
    function (arg, options) {
        var _this = this;
        return this.createAndResolvePromise(arg)
            .then(function (params) {
            /** @type {?} */
            var ps = params.getQuery();
            /** @type {?} */
            var opts = _this.buildRequest({
                method: "GET",
                url: _this.baseUrl + '/items',
                params: ps,
                options: options
            });
            return _this.execute(opts);
        })
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("AgolService.searchItems() - Error searching items: " + e.message);
            Object.assign(err, e);
            throw err;
        });
    };
    /* --------------------------- */
    /**
     * @param {?} obj
     * @return {?}
     */
    AgolService.prototype.getAgolId = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        if (!obj)
            return null;
        if (!obj.type)
            return null;
        if (ItemTypes.ORGANIZATION === obj.type || 'Group' === obj.type) {
            return obj.id;
        }
        if (!obj.identifiers || !obj.identifiers.length)
            return null;
        /** @type {?} */
        var ids = obj.identifiers.filter(function (id) { return ~id.indexOf('agol:'); });
        if (!ids.length)
            return null;
        return ids[0].replace('agol:', '');
    };
    return AgolService;
}(BaseService));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
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
    //post within a community portal
    COMMUNITY_PAGE: 'Community Page',
    //page within a community portal
    APP_PAGE: 'Application Page',
};
/** @type {?} */
var Events = {
    ACCESSED: 'Accessed',
    //related item was accessed using API
    DISPLAYED: 'Displayed',
    //related item was displayed in a native form (map)
    VIEWED: 'Viewed',
    //related item was viewed in general form (metadata)
    CREATED: 'Created',
    EDITED: 'Edited',
    DELETED: 'Deleted',
    CLONED: 'Cloned',
    ADDED: 'Added',
    //item was added to another (ie, layer on map)
    REMOVED: 'Removed',
    //item was removed from another (ie, item from gallery)
    EXPORTED: 'Exported',
    IMPORTED: 'Imported'
};
/**
 * @param {?} type
 * @return {?}
 */
function getCategory(type) {
    /** @type {?} */
    var result = Categories["UNKNOWN"];
    if (type) {
        /** @type {?} */
        var cats = Object.keys(Categories).map(function (k) { return Categories[k]; });
        //if existing category was specified
        if (~cats.indexOf(type))
            return type;
        //if an ItemType with prefix was specified (strip off prefix)
        else if (~type.indexOf(':')) {
            /** @type {?} */
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
var  /**
 *
 */
Event = /** @class */ (function () {
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
    /**
     * @return {?}
     */
    Event.prototype.getCategory = /**
     * @return {?}
     */
    function () { return this.category; };
    /**
     * @return {?}
     */
    Event.prototype.getType = /**
     * @return {?}
     */
    function () { return this.type; };
    /**
     * @return {?}
     */
    Event.prototype.getItem = /**
     * @return {?}
     */
    function () { return this.item; };
    /**
     * @param {?} item
     * @return {?}
     */
    Event.prototype.setItem = /**
     * @param {?} item
     * @return {?}
     */
    function (item) { this.item = item ? (item.id || item) : null; };
    /**
     * @return {?}
     */
    Event.prototype.getRelated = /**
     * @return {?}
     */
    function () { return this.related; };
    /**
     * @param {?} related
     * @return {?}
     */
    Event.prototype.setRelated = /**
     * @param {?} related
     * @return {?}
     */
    function (related) {
        this.related = related ? (related.id || related) : null;
    };
    return Event;
}());
/**
 * @param {?} eventType - type of event being created
 * @param {?} item - GeoPlatform Item instance
 * @return {?} list of event objects
 */
function TrackingEventFactory(eventType, item) {
    /** @type {?} */
    var result = /** @type {?} */ ([]);
    if (eventType && item && item.type) {
        if (ItemTypes.MAP === item.type) {
            result.push(new Event(Categories["MAP"], eventType, item));
            if (Events["DISPLAYED"] === eventType) {
                item.layers.forEach(function (layerState) {
                    if (layerState.layer) {
                        /** @type {?} */
                        var layerEvents = TrackingEventFactory(eventType, layerState.layer)
                            .filter(function (e) { return e !== null; });
                        if (layerEvents && layerEvents.length) {
                            result = result.concat(layerEvents);
                        }
                    }
                });
                if (item.baseLayer) {
                    /** @type {?} */
                    var baseEvents = TrackingEventFactory(eventType, item.baseLayer)
                        .filter(function (e) { return e !== null; });
                    if (baseEvents && baseEvents.length)
                        result = result.concat(baseEvents);
                }
            }
        }
        else if (ItemTypes.LAYER === item.type) {
            result.push(new Event(Categories["LAYER"], eventType, item));
            if (Events["DISPLAYED"] === eventType && item.services && item.services.length) {
                result.push(new Event(Categories["SERVICE"], eventType, item.services[0]));
            }
        }
        else {
            /** @type {?} */
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
var /**
 *
 */
DefaultTrackingServiceProvider = /** @class */ (function () {
    function DefaultTrackingServiceProvider() {
    }
    /**
     * @param {?} category
     * @param {?} event
     * @param {?=} item
     * @param {?=} related
     * @return {?}
     */
    DefaultTrackingServiceProvider.prototype.logEvent = /**
     * @param {?} category
     * @param {?} event
     * @param {?=} item
     * @param {?=} related
     * @return {?}
     */
    function (category, event, item, 
    // @ts-ignore
    // @ts-ignore
    related) {
        console.log("Event (" + category + ") - " + event + " : " + item);
    };
    /**
     * @param {?} view
     * @param {?} data
     * @return {?}
     */
    DefaultTrackingServiceProvider.prototype.logPageView = /**
     * @param {?} view
     * @param {?} data
     * @return {?}
     */
    function (view, data) {
        console.log("Page View " + view + (data ? " : " + JSON.stringify(data) : ''));
    };
    /**
     * @param {?} params
     * @param {?} resultCount
     * @return {?}
     */
    DefaultTrackingServiceProvider.prototype.logSearch = /**
     * @param {?} params
     * @param {?} resultCount
     * @return {?}
     */
    function (params, resultCount) {
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
var  /**
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
TrackingService = /** @class */ (function () {
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
    /**
     * @param {?} provider -
     * @return {?}
     */
    TrackingService.prototype.setProvider = /**
     * @param {?} provider -
     * @return {?}
     */
    function (provider) {
        if (provider)
            this.provider = provider;
    };
    /**
     * @param event - event to log
     * @return TrackingService
     */
    /**
     * @param {?} event - event to log
     * @return {?} TrackingService
     */
    TrackingService.prototype.event = /**
     * @param {?} event - event to log
     * @return {?} TrackingService
     */
    function (event) {
        this.logEvent(event);
        return this;
    };
    /**
     * @param event - event to log
     */
    /**
     * @param {?} event - event to log
     * @return {?}
     */
    TrackingService.prototype.logEvent = /**
     * @param {?} event - event to log
     * @return {?}
     */
    function (event) {
        var _this = this;
        if (!this.provider || !this.provider.logEvent || !event)
            return;
        if (Array.isArray(event)) {
            /** @type {?} */
            var events = /** @type {?} */ (event);
            events.forEach(function (evt) { return _this.logEvent(evt); });
        }
        else {
            /** @type {?} */
            var evt = /** @type {?} */ (event);
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
    /**
     * @deprecated use svc.event( new Event(EventCategories.APP_PAGE, EventTypes.VIEWED, pageId) )
     * @param {?} view - name of the view being activated
     * @param {?} data - additional context to supply for the event
     * @return {?} TrackingService
     */
    TrackingService.prototype.pageView = /**
     * @deprecated use svc.event( new Event(EventCategories.APP_PAGE, EventTypes.VIEWED, pageId) )
     * @param {?} view - name of the view being activated
     * @param {?} data - additional context to supply for the event
     * @return {?} TrackingService
     */
    function (view, data) {
        this.logPageView(view, data);
        return this;
    };
    /**
     * @param view - name of the view being activated
     * @param data - additional context to supply for the event
     * @deprecated use svc.logEvent( new Event(EventCategories.APP_PAGE, EventTypes.VIEWED, pageId) )
     */
    /**
     * @deprecated use svc.logEvent( new Event(EventCategories.APP_PAGE, EventTypes.VIEWED, pageId) )
     * @param {?} view - name of the view being activated
     * @param {?=} data - additional context to supply for the event
     * @return {?}
     */
    TrackingService.prototype.logPageView = /**
     * @deprecated use svc.logEvent( new Event(EventCategories.APP_PAGE, EventTypes.VIEWED, pageId) )
     * @param {?} view - name of the view being activated
     * @param {?=} data - additional context to supply for the event
     * @return {?}
     */
    function (view, 
    // @ts-ignore
    // @ts-ignore
    data) {
        if (this.provider && this.provider.logPageView) {
            this.provider.logPageView(view, data);
        }
        else {
            this.logEvent(new Event(Categories["APP_PAGE"], Events["VIEWED"], view));
        }
    };
    /**
     * @param params
     * @param resultCount
     */
    /**
     * @param {?} params
     * @param {?} resultCount
     * @return {?}
     */
    TrackingService.prototype.logSearch = /**
     * @param {?} params
     * @param {?} resultCount
     * @return {?}
     */
    function (params, resultCount) {
        if (this.provider.logSearch)
            this.provider.logSearch(params, resultCount);
    };
    return TrackingService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var KGService = /** @class */ (function () {
    function KGService(url, httpClient) {
        this.timeout = 30000;
        this.httpMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
        this.setUrl(url);
        this.client = httpClient;
    }
    /**
     * @param {?} baseUrl
     * @return {?}
     */
    KGService.prototype.setUrl = /**
     * @param {?} baseUrl
     * @return {?}
     */
    function (baseUrl) {
        this.apiBase = baseUrl;
        this.baseUrl = baseUrl + '/api/recommender';
    };
    /**
     * @param query - optional query parameters to include with request
     * @param options - optional config to send with http request
     * @return Promise resolving recommended concepts as search results
     */
    /**
     * @param {?} query - optional query parameters to include with request
     * @param {?=} options - optional config to send with http request
     * @return {?} Promise resolving recommended concepts as search results
     */
    KGService.prototype.suggest = /**
     * @param {?} query - optional query parameters to include with request
     * @param {?=} options - optional config to send with http request
     * @return {?} Promise resolving recommended concepts as search results
     */
    function (query, options) {
        /** @type {?} */
        var url = this.baseUrl + '/suggest';
        return this._search(url, query, options)
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("KGService.suggest() - Error suggesting concepts: " + e.message);
            Object.assign(err, e);
            throw err;
        });
    };
    /**
     * @param query - optional query parameters to include with request
     * @param options - optional config to send with http request
     * @return Promise resolving concept types as search results
     */
    /**
     * @param {?} query - optional query parameters to include with request
     * @param {?=} options - optional config to send with http request
     * @return {?} Promise resolving concept types as search results
     */
    KGService.prototype.types = /**
     * @param {?} query - optional query parameters to include with request
     * @param {?=} options - optional config to send with http request
     * @return {?} Promise resolving concept types as search results
     */
    function (query, options) {
        /** @type {?} */
        var url = this.baseUrl + '/types';
        return this._search(url, query, options)
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("KGService.types() - Error searching types: " + e.message);
            Object.assign(err, e);
            throw err;
        });
    };
    /**
     * @param query - optional query parameters to include with request
     * @param options - optional config to send with http request
     * @return Promise resolving concept sources as search results
     */
    /**
     * @param {?} query - optional query parameters to include with request
     * @param {?=} options - optional config to send with http request
     * @return {?} Promise resolving concept sources as search results
     */
    KGService.prototype.sources = /**
     * @param {?} query - optional query parameters to include with request
     * @param {?=} options - optional config to send with http request
     * @return {?} Promise resolving concept sources as search results
     */
    function (query, options) {
        /** @type {?} */
        var url = this.baseUrl + '/sources';
        return this._search(url, query, options)
            .catch(function (e) {
            /** @type {?} */
            var err = new Error("KGService.sources() - Error searching sources: " + e.message);
            Object.assign(err, e);
            throw err;
        });
    };
    /* ----------------------------------------------------------- */
    /**
     * internal method used by exposed methods
     */
    /**
     * internal method used by exposed methods
     * @param {?} url
     * @param {?} query
     * @param {?=} options
     * @return {?}
     */
    KGService.prototype._search = /**
     * internal method used by exposed methods
     * @param {?} url
     * @param {?} query
     * @param {?=} options
     * @return {?}
     */
    function (url, query, options) {
        var _this = this;
        return Promise.resolve(true)
            .then(function () {
            /** @type {?} */
            var q = query.getQuery();
            /** @type {?} */
            var opts = _this.buildRequest({
                method: "GET", url: url, params: q, options: options
            });
            return _this.execute(opts);
        });
    };
    /**
     * @param method - one of "GET", "POST", "PUT", "DELETE", "PATCH"
     * @param url - destination of xhr request
     * @param params - object to be sent with request as query parameters
     * @param data - object to be sent with request as body
     * @param options - optional object defining request options
     * @return request options for xhr
     */
    /**
     * @param {?} options - optional object defining request options
     * @return {?} request options for xhr
     */
    KGService.prototype.buildRequest = /**
     * @param {?} options - optional object defining request options
     * @return {?} request options for xhr
     */
    function (options) {
        if (this.httpMethods.indexOf(options["method"]) < 0)
            throw new Error("Unsupported HTTP method " + options["method"]);
        if (!options["url"])
            throw new Error("Must specify a URL for HTTP requests");
        options["timeout"] = this.timeout || Config["timeout"] || 30000;
        return this.createRequestOpts(options);
    };
    /**
     * @param {?} options
     * @return {?}
     */
    KGService.prototype.createRequestOpts = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        return this.client.createRequestOpts(options);
    };
    /**
     * @param {?} opts
     * @return {?}
     */
    KGService.prototype.execute = /**
     * @param {?} opts
     * @return {?}
     */
    function (opts) {
        return this.client.execute(opts)
            .catch(function (e) {
            if (e === null || typeof (e) === 'undefined') {
                e = new Error("KGService.execute() - Request failed but didn't return an " +
                    "error. This is most likely because the request timed out");
            }
            throw e;
        });
    };
    return KGService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * \@param arg - string type or object with type property
 * \@param baseUrl - base endpoint of GeoPlatform API
 * \@return ItemService
  @type {?} */
var ServiceFactory = function (arg, baseUrl, httpClient) {
    /** @type {?} */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var ClientVersion = "0.3.0";
polyfills();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { ClientVersion, GPError, ItemTypes, ItemTypeLabels, Parameters as QueryParameters, Facets as QueryFacets, Query, queryFactory as QueryFactory, Fields as QueryFields, KGQuery, Classifiers as KGClassifiers, factoryFn as URIFactory, Config, GPHttpClient, XHRHttpClient, BaseService as AbstractService, ItemService, DatasetService, MapService, LayerService, ServiceService, GalleryService, UtilsService, KGService, ServiceFactory, AgolService, AgolQuery, Event as TrackingEvent, TrackingService, Categories as TrackingCategories, Events as TrackingTypes, TrackingEventFactory };

//# sourceMappingURL=geoplatform-client.js.map