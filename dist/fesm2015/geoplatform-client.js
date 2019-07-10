import axios from 'axios';

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
function Polyfills () {
    apply();
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class GPError extends Error {
    /**
     * @param {?} message
     */
    constructor(message) {
        super(message);
        this.status = 500;
        this.statusCode = 500;
        this.error = null;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setError(value) { this.error = value; }
    /**
     * @param {?} value
     * @return {?}
     */
    setStatus(value) { this.status = this.statusCode = value; }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const ItemTypes = {
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
const ItemTypeLabels = {};
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
const URI_BASE = 'http://www.geoplatform.gov';
/** @type {?} */
const ESRI_TYPES = [
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
    let url = service.accessURL || service.href;
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
    let lastChar = url[url.length - 1];
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
    let type = service.serviceType || service.conformsTo;
    if (!type)
        return;
    //if ESRI service, make sure it doesn't have a layer id on the href
    if (ESRI_TYPES.indexOf(type.uri) >= 0) {
        /** @type {?} */
        let href = service.href || service.accessURL;
        /** @type {?} */
        let matches = href.match(/(Map|Feature|Image)(Server\/\d+)/i);
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
const ɵ0 = function (type, factory) {
    this.factories[type] = factory;
}, ɵ1 = function (object, md5Fn) {
    if (!object || !object.type)
        return null;
    if (typeof (md5Fn) !== 'function') {
        throw new Error("Must specify a MD5 function when using URIFactory");
    }
    /** @type {?} */
    let factory = this.factories[object.type];
    if (!factory)
        return null;
    return factory(object, md5Fn);
};
/** *
 * @see https://geoplatform.atlassian.net/wiki/display/DT/Common+Object+Identifier+Scheme
  @type {?} */
const URIFactory = {
    factories: {},
    register: ɵ0,
    create: ɵ1
};
URIFactory.register(ItemTypes.DATASET, function (dataset, md5) {
    /** @type {?} */
    let pubName = (dataset.publisher || dataset.publishers || [])
        .map(pub => { return pub.label || ""; }).join('');
    /** @type {?} */
    let ref = formatReference({
        title: dataset.title,
        pub: pubName
    });
    return URI_BASE + '/id/dataset/' + md5(ref);
});
URIFactory.register(ItemTypes.SERVICE, function (service, md5) {
    /** @type {?} */
    let url = fixServiceHref(service);
    /** @type {?} */
    let ref = formatReference(url);
    return URI_BASE + '/id/service/' + md5(ref);
});
URIFactory.register(ItemTypes.LAYER, function (layer, md5) {
    /** @type {?} */
    let svcUrl = '';
    /** @type {?} */
    let services = layer.servicedBy || layer.services;
    if (services && services.length)
        svcUrl = services[0].accessURL || services[0].href || '';
    /** @type {?} */
    let lyrUrl = layer.accessURL || layer.href || '';
    /** @type {?} */
    let lyrName = layer.layerName || '';
    /** @type {?} */
    let args = svcUrl + lyrName + lyrUrl;
    if (!args.length)
        return null;
    /** @type {?} */
    let ref = formatReference(args);
    return URI_BASE + '/id/layer/' + md5(ref);
});
/**
 * Uses the map title, createdBy, and all third-party identifiers associated with the map
 * @param {object} map - GP Map object
 * @return {string} uri unique to this object
 */
URIFactory.register(ItemTypes.MAP, function (map, md5) {
    /** @type {?} */
    let author = map.createdBy || map._createdBy || "";
    /** @type {?} */
    let identifiers = (map.identifiers || map.identifier || []).join('');
    /** @type {?} */
    let ref = formatReference({ title: map.title, author: author, identifiers: identifiers });
    return URI_BASE + '/id/map/' + md5(ref);
});
URIFactory.register(ItemTypes.GALLERY, function (gallery, md5) {
    /** @type {?} */
    let author = gallery.createdBy || gallery._createdBy || "";
    /** @type {?} */
    let ref = formatReference({ title: gallery.title, author: author });
    return URI_BASE + '/id/gallery/' + md5(ref);
});
URIFactory.register(ItemTypes.COMMUNITY, function (community, md5) {
    /** @type {?} */
    let ref = formatReference({ title: community.title });
    return URI_BASE + '/id/community/' + md5(ref);
});
URIFactory.register(ItemTypes.ORGANIZATION, function (org, md5) {
    /** @type {?} */
    let ref = formatReference(org.label || org.name);
    return URI_BASE + '/id/organization/' + md5(ref);
});
URIFactory.register(ItemTypes.PERSON, function (person, md5) {
    /** @type {?} */
    let ref = formatReference(person.name);
    return URI_BASE + '/id/person/' + md5(ref);
});
URIFactory.register(ItemTypes.CONTACT, function (vcard, md5) {
    /** @type {?} */
    let ref = {};
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
    let scheme = object.inScheme || object.scheme;
    /** @type {?} */
    let schemeLabel = scheme ? (scheme.label || scheme.prefLabel) : '';
    /** @type {?} */
    let schemeRef = formatReference(schemeLabel);
    /** @type {?} */
    let ref = formatReference(object.label || object.prefLabel);
    return URI_BASE + '/id/metadata-codelists/' + md5(schemeRef) + '/' + md5(ref);
});
URIFactory.register(ItemTypes.CONCEPT_SCHEME, function (object, md5) {
    /** @type {?} */
    let ref = formatReference(object.label || object.prefLabel);
    return URI_BASE + '/id/metadata-codelists/' + md5(ref);
});
URIFactory.register(ItemTypes.APPLICATION, function (object, md5) {
    if (!object || !object.title)
        return null;
    /** @type {?} */
    let author = object.createdBy || object._createdBy || "";
    /** @type {?} */
    let ref = formatReference({ title: object.title, author: author });
    return URI_BASE + '/id/application/' + md5(ref);
});
URIFactory.register(ItemTypes.TOPIC, function (object, md5) {
    if (!object || !object.title)
        return null;
    /** @type {?} */
    let author = object.createdBy || object._createdBy || "";
    /** @type {?} */
    let ref = formatReference({ title: object.title, author: author });
    return URI_BASE + '/id/topic/' + md5(ref);
});
URIFactory.register(ItemTypes.WEBSITE, function (item, md5) {
    if (!item || !item.landingPage)
        return null;
    /** @type {?} */
    let ref = formatReference(item.landingPage);
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
const SORT_OPTIONS_DEFAULT = [
    { value: "label,asc", label: "Name (A-Z)" },
    { value: "label,desc", label: "Name (Z-A)" },
    { value: "type,asc", label: "Type (A-Z)" },
    { value: "type,desc", label: "Type (Z-A)" },
    { value: "modified,desc", label: "Most recently modified" },
    { value: "modified,asc", label: "Least recently modified" },
    { value: "_score,desc", label: "Relevance" }
];
class KGQuery {
    constructor() {
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
    getQuery() {
        /** @type {?} */
        let result = {};
        for (let prop in this.query) {
            /** @type {?} */
            let value = this.query[prop];
            if (value !== null && typeof (value.push) !== 'undefined') {
                value = value.join(',');
            }
            result[prop] = value;
        }
        return result;
    }
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    parameter(name, value) {
        this.setParameter(name, value);
        return this;
    }
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setParameter(name, value) {
        if (value === null || value === undefined)
            delete this.query[name];
        else
            this.query[name] = value;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    getParameter(key) {
        return this.query[key];
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    applyParameters(obj) {
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                this.setParameter(p, obj[p]);
            }
        }
    }
    /**
     * @param {?} text
     * @return {?}
     */
    q(text) {
        this.setQ(text);
        return this;
    }
    /**
     * @param {?} text - free text query
     * @return {?}
     */
    setQ(text) {
        this.setParameter(Parameters.QUERY, text);
    }
    /**
     * @return {?}
     */
    getQ() {
        return this.getParameter(Parameters.QUERY);
    }
    /**
     * @param {?} types - KG classifiers for which concepts should be returned
     * @return {?}
     */
    classifiers(types) {
        this.setClassifiers(types);
        return this;
    }
    /**
     * @param {?} types - KG classifiers for which concepts should be returned
     * @return {?}
     */
    setClassifiers(types) {
        if (!types)
            return;
        if (typeof (types) === 'string')
            types = types = [types];
        this.setParameter(Parameters.TYPES, types);
    }
    /**
     * @return {?} KG classifiers for which concepts should be returned
     */
    getClassifiers() {
        return this.getParameter(Parameters.TYPES);
    }
    /**
     * Specify the Item object model type name(s) for which
     * recommended concepts should be returned. Note: this
     * query parameter is not the same as the GeoPlatform.Query.types()
     * query parameter (they map to different HTTP request parameters).
     * @param {?} objTypes - Item object type names
     * @return {?}
     */
    types(objTypes) {
        this.setTypes(objTypes);
        return this;
    }
    /**
     * Specify the Item object model type name(s) for which
     * recommended concepts should be returned. Note: this
     * query parameter is not the same as the GeoPlatform.Query.setTypes()
     * query parameter (they map to different HTTP request parameters).
     * @param {?} objTypes - Item object type names
     * @return {?}
     */
    setTypes(objTypes) {
        if (!objTypes)
            return;
        if (typeof (objTypes) === 'string')
            objTypes = [objTypes];
        this.setParameter(Parameters.FOR_TYPES, objTypes);
    }
    /**
     * Get the Item object model type name(s) for which
     * recommended concepts should be returned. Note: this
     * query parameter is not the same as the GeoPlatform.Query.getTypes()
     * query parameter (they map to different HTTP request parameters).
     * @return {?} Item object type names
     */
    getTypes() {
        return this.getParameter(Parameters.FOR_TYPES);
    }
    /**
     * @param {?} page - page of results to fetch
     * @return {?}
     */
    page(page) {
        this.setPage(page);
        return this;
    }
    /**
     * @param {?} page
     * @return {?}
     */
    setPage(page) {
        if (isNaN(page) || page * 1 < 0)
            return;
        this.query["page"] = page * 1;
    }
    /**
     * @return {?}
     */
    getPage() {
        return this.query["page"];
    }
    /**
     * @return {?}
     */
    nextPage() {
        this.setPage(this.query["page"] + 1);
    }
    /**
     * @return {?}
     */
    previousPage() {
        this.setPage(this.query["page"] - 1);
    }
    /**
     * @param {?} size - page size to request
     * @return {?}
     */
    pageSize(size) {
        this.setPageSize(size);
        return this;
    }
    /**
     * @param {?} size
     * @return {?}
     */
    setPageSize(size) {
        if (isNaN(size) || size * 1 < 0)
            return;
        this.query["size"] = size * 1;
    }
    /**
     * @return {?}
     */
    getPageSize() {
        return this.query["size"];
    }
    /**
     * @param {?} sort - form of <field>,<dir> or just field name
     * @param {?=} order - optional, either 'asc' or 'desc'
     * @return {?}
     */
    sort(sort, order) {
        this.setSort(sort, order);
        return this;
    }
    /**
     * @param {?} sort - form of <field>,<dir> or just field name
     * @param {?=} order - optional, either 'asc' or 'desc'
     * @return {?}
     */
    setSort(sort, order) {
        order = order || 'desc';
        if (sort && sort.indexOf(',') < 0)
            sort = sort + ',' + order;
        this.query["sort"] = sort;
    }
    /**
     * @return {?}
     */
    getSort() {
        return this.query["sort"];
    }
    /**
     * @return {?}
     */
    getSortField() {
        return this.query["sort"].split(',')[0];
    }
    /**
     * @return {?}
     */
    getSortOrder() {
        return this.query["sort"].split(',')[1] === 'asc';
    }
    /**
     * @return {?} list of key-value pairs of sort options
     */
    getSortOptions() {
        return SORT_OPTIONS_DEFAULT.slice(0);
    }
    /**
     *
     * @return {?}
     */
    clear() {
        this.query = this.defaultQuery;
    }
}

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
const Fields = {
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
const FIELDS_DEFAULT = [
    Fields["CREATED"],
    Fields["MODIFIED"],
    Fields["CREATED_BY"],
    Fields["PUBLISHERS"],
    Fields["THEMES"],
    Fields["DESCRIPTION"]
];
/** @type {?} */
const Facets = {
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
const FACETS_DEFAULT = [
    Facets["TYPES"],
    Facets["PUBLISHERS"],
    Facets["SERVICE_TYPES"],
    Facets["CONCEPT_SCHEMES"],
    Facets["VISIBILITY"],
    Facets["CREATED_BY"]
];
/** @type {?} */
const FacetToParam = {};
FacetToParam[Facets["TYPES"]] = Parameters.TYPES;
FacetToParam[Facets["THEMES"]] = Parameters.THEMES_ID;
FacetToParam[Facets["TOPICS"]] = Parameters.TOPICS_ID;
FacetToParam[Facets["PUBLISHERS"]] = Parameters.PUBLISHERS_ID;
FacetToParam[Facets["CONTACTS"]] = Parameters.CONTACTS_ID;
FacetToParam[Facets["CONCEPT_SCHEMES"]] = Parameters.SCHEMES_ID;
FacetToParam[Facets["USED_BY"]] = Parameters.USED_BY_ID;
/** @type {?} */
const SORT_OPTIONS_DEFAULT$1 = [
    { value: "label,asc", label: "Name (A-Z)" },
    { value: "label,desc", label: "Name (Z-A)" },
    { value: "type,asc", label: "Type (A-Z)" },
    { value: "type,desc", label: "Type (Z-A)" },
    { value: "modified,desc", label: "Most recently modified" },
    { value: "modified,asc", label: "Least recently modified" },
    { value: "_score,desc", label: "Relevance" }
];
/** @type {?} */
const BBOX_REGEX = /^\-?\d+(\.\d*)?,\-?\d+(\.\d*)?,\-?\d+(\.\d*)?,\-?\d+(\.\d*)?$/;
/**
 * @param {?} value
 * @return {?}
 */
function toArray(value) {
    /** @type {?} */
    let result = value;
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
class Query {
    /**
     * @param {?=} options - set of initial constraints
     */
    constructor(options) {
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
     * @return {?} containing request-ready parameters/values
     */
    getQuery() {
        /** @type {?} */
        let result = {};
        for (let prop in this.query) {
            /** @type {?} */
            let value = this.query[prop];
            if (value !== null && typeof (value.push) !== 'undefined') {
                value = value.join(',');
            }
            result[prop] = value;
        }
        return result;
    }
    /**
     * @return {?} Query
     */
    clone() {
        /** @type {?} */
        let result = new Query();
        /** @type {?} */
        let json = JSON.parse(JSON.stringify(this.query));
        result.applyParameters(json);
        return result;
    }
    /**
     * @param {?} name
     * @param {?} value
     * @return {?} Query this
     */
    parameter(name, value) {
        this.setParameter(name, value);
        return this;
    }
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    setParameter(name, value) {
        if (value === null || value === undefined || //if no value was provide
            //if no value was provide
            (typeof (value.push) !== 'undefined' && !value.length)) //or empty array
            //or empty array
            delete this.query[name];
        else
            this.query[name] = value;
    }
    /**
     * @param {?} key - name of parameter
     * @return {?} value of parameter
     */
    getParameter(key) {
        return this.query[key];
    }
    /**
     * @param {?} name - name of parameter to remove existing value for
     * @return {?}
     */
    clearParameter(name) {
        delete this.query[name];
    }
    /**
     * @param {?} obj - set of parameter/values to apply to this query
     * @return {?}
     */
    applyParameters(obj) {
        for (let p in obj) {
            if (obj.hasOwnProperty(p)) {
                this.setParameter(/** @type {?} */ (p), /** @type {?} */ (obj[p]));
            }
        }
    }
    /**
     * @param {?} facet - name of facet to set the value for as a parameter
     * @param {?} value - value of the facet to use as the parameter's value
     * @return {?}
     */
    setFacetParameter(facet, value) {
        /** @type {?} */
        let param = FacetToParam[facet];
        if (!param) {
            console.log("WARN : Query.applyFacetParameter() - " +
                "unable to map facet to known parameter '" + facet + "', using " +
                "as direct parameter which may not operate as intended");
        }
        this.setParameter(param || facet, value);
    }
    /**
     * @param {?} text
     * @return {?} Query this
     */
    q(text) { this.setQ(text); return this; }
    /**
     * @param {?} text - free text query
     * @return {?}
     */
    setQ(text) { this.setParameter(Parameters.QUERY, text); }
    /**
     * @return {?}
     */
    getQ() { return /** @type {?} */ (this.getParameter(Parameters.QUERY)); }
    /**
     * @param {?} text
     * @return {?}
     */
    keywords(text) {
        this.setKeywords(text);
        return this;
    }
    /**
     * @param {?} text - free text query
     * @return {?}
     */
    setKeywords(text) {
        this.setParameter(Parameters.KEYWORDS, toArray(text));
    }
    /**
     * @return {?}
     */
    getKeywords() {
        return this.getParameter(Parameters.KEYWORDS);
    }
    /**
     * @param {?} uri
     * @return {?}
     */
    uri(uri) {
        this.setUri(uri);
        return this;
    }
    /**
     * @param {?} uri
     * @return {?}
     */
    setUri(uri) {
        this.setParameter(Parameters.URI, uri);
    }
    /**
     * @return {?}
     */
    getUri() {
        return this.getParameter(Parameters.URI);
    }
    /**
     * @param {?} types
     * @return {?}
     */
    types(types) {
        this.setTypes(types);
        return this;
    }
    /**
     * @param {?} types - name of class(es) to request
     * @return {?}
     */
    setTypes(types) {
        this.setParameter(Parameters.TYPES, toArray(types));
    }
    /**
     * @return {?}
     */
    getTypes() {
        return this.getParameter(Parameters.TYPES);
    }
    /**
     * @param {?} user
     * @return {?}
     */
    createdBy(user) {
        this.setCreatedBy(user);
        return this;
    }
    /**
     * @param {?} user - username
     * @return {?}
     */
    setCreatedBy(user) {
        this.setParameter(Parameters.CREATED_BY, user);
    }
    /**
     * @return {?} username
     */
    getCreatedBy() {
        return this.getParameter(Parameters.CREATED_BY);
    }
    /**
     * @param {?} user
     * @return {?}
     */
    lastModifiedBy(user) {
        this.setLastModifiedBy(user);
        return this;
    }
    /**
     * @param {?} user - username
     * @return {?}
     */
    setLastModifiedBy(user) {
        this.setParameter(Parameters.LAST_MODIFIED_BY, user);
    }
    /**
     * @return {?} username
     */
    getLastModifiedBy() {
        return this.getParameter(Parameters.LAST_MODIFIED_BY);
    }
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
    themes(themes, parameter) {
        this.setThemes(themes, parameter);
        return this;
    }
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
    setThemes(themes, parameter) {
        //clear existing
        this.setParameter(Parameters.THEMES_ID, null);
        this.setParameter(Parameters.THEMES_LABEL, null);
        this.setParameter(Parameters.THEMES_URI, null);
        /** @type {?} */
        let param = parameter || Parameters.THEMES_ID;
        this.setParameter(param, toArray(themes));
    }
    /**
     * @return {?}
     */
    getThemes() {
        return this.getParameter(Parameters.THEMES_ID) ||
            this.getParameter(Parameters.THEMES_LABEL) ||
            this.getParameter(Parameters.THEMES_URI);
    }
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
    topics(topics, parameter) {
        this.setTopics(topics, parameter);
        return this;
    }
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
    setTopics(topics, parameter) {
        //clear existing
        this.setParameter(Parameters.TOPICS_ID, null);
        this.setParameter(Parameters.TOPICS_LABEL, null);
        this.setParameter(Parameters.TOPICS_URI, null);
        /** @type {?} */
        let param = parameter || Parameters.TOPICS_ID;
        this.setParameter(param, toArray(topics));
    }
    /**
     * @return {?}
     */
    getTopics() {
        return this.getParameter(Parameters.TOPICS_ID) ||
            this.getParameter(Parameters.TOPICS_LABEL) ||
            this.getParameter(Parameters.TOPICS_URI);
    }
    /**
     * Specify a Publisher or set of Publishers to constrain results. By
     * default, values are assumed to be identifiers. If using labels or uris,
     * specify the optional second parameter to be either
     * Parameters.PUBLISHERS_LABEL or Parameters.PUBLISHERS_URI respectively.
     * @param {?} publishers
     * @param {?=} parameter - optional, to indicate the parameter to use
     * @return {?} Query
     */
    publishers(publishers, parameter) {
        this.setPublishers(publishers, parameter);
        return this;
    }
    /**
     * Specify a Publisher or set of Publishers to constrain results. By
     * default, values are assumed to be identifiers. If using labels or uris,
     * specify the optional second parameter to be either
     * Parameters.PUBLISHERS_LABEL or Parameters.PUBLISHERS_URI respectively.
     * @param {?} publishers - publishing orgs to constrain by
     * @param {?=} parameter
     * @return {?}
     */
    setPublishers(publishers, parameter) {
        //clear existing
        this.setParameter(Parameters.PUBLISHERS_ID, null);
        this.setParameter(Parameters.PUBLISHERS_LABEL, null);
        this.setParameter(Parameters.PUBLISHERS_URI, null);
        /** @type {?} */
        let param = parameter || Parameters.PUBLISHERS_ID;
        this.setParameter(param, toArray(publishers));
    }
    /**
     * @return {?}
     */
    getPublishers() {
        return this.getParameter(Parameters.PUBLISHERS_ID) ||
            this.getParameter(Parameters.PUBLISHERS_LABEL) ||
            this.getParameter(Parameters.PUBLISHERS_URI);
    }
    /**
     * Specify a Point of Contact or set of Contacts to constrain results. By
     * default, values are assumed to be identifiers. If using
     * labels or uris, specify the optional second parameter to be either
     * Parameters.CONTACTS_LABEL or Parameters.CONTACTS_URI respectively.
     * @param {?} contacts
     * @param {?=} parameter - optional, to indicate the parameter to use
     * @return {?} Query
     */
    contacts(contacts, parameter) {
        this.setContacts(contacts, parameter);
        return this;
    }
    /**
     * Specify a Contact or set of Contacts to constrain results. By
     * default, values are assumed to be identifiers. If using
     * labels or uris, specify the optional second parameter to be either
     * Parameters.CONTACTS_LABEL or Parameters.CONTACTS_URI respectively.
     * @param {?} contacts - publishing orgs to constrain by
     * @param {?=} parameter
     * @return {?}
     */
    setContacts(contacts, parameter) {
        //clear existing
        this.setParameter(Parameters.CONTACTS_ID, null);
        this.setParameter(Parameters.CONTACTS_LABEL, null);
        this.setParameter(Parameters.CONTACTS_URI, null);
        /** @type {?} */
        let param = parameter || Parameters.CONTACTS_ID;
        this.setParameter(param, toArray(contacts));
    }
    /**
     * @return {?}
     */
    getContacts() {
        return this.getParameter(Parameters.CONTACTS_ID) ||
            this.getParameter(Parameters.CONTACTS_LABEL) ||
            this.getParameter(Parameters.CONTACTS_URI);
    }
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
    usedBy(ids, parameter) {
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
     * @param {?} ids - publishing orgs to constrain by
     * @param {?=} parameter
     * @return {?}
     */
    setUsedBy(ids, parameter) {
        //clear existing
        this.setParameter(Parameters.USED_BY_ID, null);
        this.setParameter(Parameters.USED_BY_LABEL, null);
        this.setParameter(Parameters.USED_BY_URI, null);
        /** @type {?} */
        let param = parameter || Parameters.USED_BY_ID;
        this.setParameter(param, toArray(ids));
    }
    /**
     * @return {?}
     */
    getUsedBy() {
        return this.getParameter(Parameters.USED_BY_ID) ||
            this.getParameter(Parameters.USED_BY_LABEL) ||
            this.getParameter(Parameters.USED_BY_URI);
    }
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
    schemes(schemes, parameter) {
        this.setSchemes(schemes, parameter);
        return this;
    }
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
    setSchemes(schemes, parameter) {
        //clear existing
        this.setParameter(Parameters.SCHEMES_ID, null);
        this.setParameter(Parameters.SCHEMES_LABEL, null);
        this.setParameter(Parameters.SCHEMES_URI, null);
        /** @type {?} */
        let param = parameter || Parameters.SCHEMES_ID;
        this.setParameter(param, toArray(schemes));
    }
    /**
     * @return {?}
     */
    getSchemes() {
        return this.getParameter(Parameters.SCHEMES_ID) ||
            this.getParameter(Parameters.SCHEMES_LABEL) ||
            this.getParameter(Parameters.SCHEMES_URI);
    }
    /**
     *
     * @param {?} types
     * @return {?}
     */
    serviceTypes(types) {
        this.setServiceTypes(types);
        return this;
    }
    /**
     * @param {?} types - ids
     * @return {?}
     */
    setServiceTypes(types) {
        this.setParameter(Parameters.SERVICE_TYPES, toArray(types));
    }
    /**
     * @return {?}
     */
    getServiceTypes() {
        return this.getParameter(Parameters.SERVICE_TYPES);
    }
    /**
     * @param {?} vis
     * @return {?}
     */
    visibility(vis) {
        this.setVisibility(vis);
        return this;
    }
    /**
     * @param {?} visibility - one of 'public' or 'private'
     * @return {?}
     */
    setVisibility(visibility) {
        this.setParameter(Parameters.VISIBILITY, visibility);
    }
    /**
     * @return {?}
     */
    getVisibility() {
        return this.getParameter(Parameters.VISIBILITY);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    status(value) {
        this.setStatus(value);
        return this;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setStatus(value) {
        this.setParameter(Parameters.STATUS, value);
    }
    /**
     * @return {?}
     */
    getStatus() {
        return this.getParameter(Parameters.STATUS);
    }
    /**
     * @param {?} bbox
     * @return {?}
     */
    extent(bbox) {
        this.setExtent(bbox);
        return this;
    }
    /**
     * @param {?} bbox - string form of "minx,miny,maxx,maxy", or L.LatLngBounds, or Array
     * @return {?}
     */
    setExtent(bbox) {
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
    }
    /**
     * @return {?} bbox string or null if not set
     */
    getExtent() {
        return this.getParameter(Parameters.EXTENT);
    }
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
    classifier(classifier, value) {
        this.setClassifier(classifier, value);
        return this;
    }
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
    setClassifier(classifier, value) {
        /** @type {?} */
        let arr = toArray(value);
        this.setParameter(Parameters.CLASSIFIERS + "." + classifier, arr);
    }
    /**
     * @param {?} classifier - name of classifier constraint in use
     * @return {?} array of concept ids
     */
    getClassifier(classifier) {
        return this.getParameter(Parameters.CLASSIFIERS + "." + classifier) || [];
    }
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
    classifiers(value) {
        this.setClassifiers(value);
        return this;
    }
    /**
     * @param {?} value - object defining classifiers
     * @return {?}
     */
    setClassifiers(value) {
        /** @type {?} */
        const classes = Object.keys(Classifiers).map(k => Classifiers[k]);
        if (!value || typeof (value) !== 'object' || Array.isArray(value)) {
            classes.forEach(classifier => {
                this.clearParameter(Parameters.CLASSIFIERS + "." + classifier);
            });
            return;
        }
        Object.keys(value).forEach(classifier => {
            if (~classes.indexOf(classifier)) {
                this.setClassifier(classifier, value[classifier]);
            }
        });
    }
    /**
     * @return {?} classifiers used in the query
     */
    getClassifiers() {
        /** @type {?} */
        let result = {};
        Object.keys(Classifiers).map(k => Classifiers[k]).forEach(classifier => {
            result[classifier] = this.getClassifier(classifier);
        });
        return result;
    }
    /**
     * @param {?} date
     * @param {?} beforeOrAfter
     * @return {?}
     */
    modified(date, beforeOrAfter) {
        this.setModified(date, beforeOrAfter);
        return this;
    }
    /**
     * @param {?} date - date to compare against
     * @param {?} beforeOrAfter - flag specifying which boundary condition (true = before, false = after) flag specifying whether to trigger update automatically
     * @return {?}
     */
    setModified(date, beforeOrAfter) {
        //if no date was supplied, consider it "unset" for both properties
        if (!date) {
            this.setParameter(Parameters.MODIFIED_BEFORE, null);
            this.setParameter(Parameters.MODIFIED_AFTER, null);
            return;
        }
        if (!(date instanceof Date))
            date = new Date(/** @type {?} */ (date));
        /** @type {?} */
        let dir = beforeOrAfter && (beforeOrAfter === true || beforeOrAfter === "true");
        /** @type {?} */
        let prop = dir ? Parameters.MODIFIED_BEFORE : Parameters.MODIFIED_AFTER;
        /** @type {?} */
        let oppProp = dir ? Parameters.MODIFIED_AFTER : Parameters.MODIFIED_BEFORE;
        /** @type {?} */
        let arg = (date && date.getTime) ? date.getTime() : date;
        this.setParameter(oppProp, null);
        this.setParameter(prop, arg);
    }
    /**
     * @return {?}
     */
    getModified() {
        /** @type {?} */
        let value = this.getParameter(Parameters.MODIFIED_BEFORE) ||
            this.getParameter(Parameters.MODIFIED_AFTER);
        if (value && typeof (value) === 'number') {
            value = new Date(value);
        }
        return value;
    }
    /**
     * @param {?} date
     * @param {?} beforeOrAfter
     * @return {?}
     */
    created(date, beforeOrAfter) {
        this.setCreated(date, beforeOrAfter);
        return this;
    }
    /**
     * @param {?} date - date to compare against
     * @param {?} beforeOrAfter - flag specifying which boundary condition (true = before, false = after) flag specifying whether to trigger update automatically
     * @return {?}
     */
    setCreated(date, beforeOrAfter) {
        //if no date was supplied, consider it "unset" for both properties
        if (!date) {
            this.setParameter(Parameters.CREATED_BEFORE, null);
            this.setParameter(Parameters.CREATED_AFTER, null);
            return;
        }
        if (!(date instanceof Date))
            date = new Date(/** @type {?} */ (date));
        /** @type {?} */
        let dir = beforeOrAfter && (beforeOrAfter === true || beforeOrAfter === "true");
        /** @type {?} */
        let prop = dir ? Parameters.CREATED_BEFORE : Parameters.CREATED_AFTER;
        /** @type {?} */
        let oppProp = dir ? Parameters.CREATED_AFTER : Parameters.CREATED_BEFORE;
        /** @type {?} */
        let arg = (date && date.getTime) ? date.getTime() : date;
        this.setParameter(oppProp, null);
        this.setParameter(prop, arg);
    }
    /**
     * @return {?}
     */
    getCreated() {
        /** @type {?} */
        let value = this.getParameter(Parameters.CREATED_BEFORE) ||
            this.getParameter(Parameters.CREATED_AFTER);
        if (value && typeof (value) === 'number') {
            value = new Date(value);
        }
        return value;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    begins(date) {
        this.setBeginDate(date);
        return this;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    setBeginDate(date) {
        if (date && date instanceof Date)
            date = date.getTime();
        this.setParameter(Parameters.BEGINS, date);
    }
    /**
     * @return {?}
     */
    getBeginDate() {
        /** @type {?} */
        let date = this.getParameter(Parameters.BEGINS);
        if (date)
            date = new Date(date);
        return date;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    ends(date) {
        this.setEndDate(date);
        return this;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    setEndDate(date) {
        if (date && date instanceof Date)
            date = date.getTime();
        this.setParameter(Parameters.ENDS, date);
    }
    /**
     * @return {?}
     */
    getEndDate() {
        /** @type {?} */
        let date = this.getParameter(Parameters.ENDS);
        if (date)
            date = new Date(date);
        return date;
    }
    /**
     * @param {?} begin
     * @param {?} end
     * @return {?}
     */
    between(begin, end) {
        this.setBetween(begin, end);
        return this;
    }
    /**
     * @param {?} begin
     * @param {?} end
     * @return {?}
     */
    setBetween(begin, end) {
        this.begins(begin);
        this.ends(end);
    }
    /**
     * @param {?} types
     * @return {?}
     */
    resourceTypes(types) {
        this.setResourceTypes(types);
        return this;
    }
    /**
     * @param {?} types
     * @return {?}
     */
    setResourceTypes(types) {
        this.setParameter(Parameters.RESOURCE_TYPE, toArray(types));
    }
    /**
     * @return {?}
     */
    getResourceTypes() {
        return this.getParameter(Parameters.RESOURCE_TYPE);
    }
    /**
     * @param {?} names
     * @return {?}
     */
    facets(names) {
        this.setFacets(names);
        return this;
    }
    /**
     * @param {?} names
     * @return {?}
     */
    setFacets(names) {
        this.setParameter(Parameters.FACETS, toArray(names));
    }
    /**
     * @return {?}
     */
    getFacets() {
        return this.getParameter(Parameters.FACETS);
    }
    /**
     * @param {?} name - name of facet to add
     * @return {?}
     */
    addFacet(name) {
        /** @type {?} */
        let facets = this.getFacets() || [];
        facets.push(name);
        this.setFacets(facets);
    }
    /**
     * @param {?} name - name of facet to remove
     * @return {?}
     */
    removeFacet(name) {
        /** @type {?} */
        let facets = this.getFacets() || [];
        /** @type {?} */
        let idx = facets.indexOf(name);
        if (idx >= 0) {
            facets.splice(idx, 1);
            this.setFacets(facets);
        }
    }
    /**
     * @param {?} fields
     * @return {?}
     */
    fields(fields) {
        this.setFields(fields);
        return this;
    }
    /**
     * @param {?} fields - list of field names to request for each search result
     * @return {?}
     */
    setFields(fields) {
        this.setParameter(Parameters.FIELDS, toArray(fields));
    }
    /**
     * @return {?}
     */
    getFields() {
        return this.getParameter(Parameters.FIELDS);
    }
    /**
     * @param {?} field - name of field to remove
     * @return {?}
     */
    addField(field) {
        /** @type {?} */
        let fields = this.getFields() || [];
        fields.push(field);
        this.setFields(fields);
    }
    /**
     * @param {?} field - name of field to remove
     * @return {?}
     */
    removeField(field) {
        /** @type {?} */
        let fields = this.getFields() || [];
        /** @type {?} */
        let idx = fields.indexOf(field);
        if (idx >= 0) {
            fields.splice(idx, 1);
            this.setFields(fields);
        }
    }
    /**
     * @param {?} page - page of results to fetch
     * @return {?}
     */
    page(page) {
        this.setPage(page);
        return this;
    }
    /**
     * @param {?} page
     * @return {?}
     */
    setPage(page) {
        if (isNaN(page) || page * 1 < 0)
            return;
        this.setParameter(Parameters.PAGE, page * 1);
    }
    /**
     * @return {?}
     */
    getPage() {
        return this.getParameter(Parameters.PAGE);
    }
    /**
     * @return {?}
     */
    nextPage() {
        this.setPage(this.getPage() + 1);
    }
    /**
     * @return {?}
     */
    previousPage() {
        this.setPage(this.getPage() - 1);
    }
    /**
     * @param {?} size - page size to request
     * @return {?}
     */
    pageSize(size) {
        this.setPageSize(size);
        return this;
    }
    /**
     * @param {?} size
     * @return {?}
     */
    setPageSize(size) {
        if (isNaN(size) || size * 1 < 0)
            return;
        this.setParameter(Parameters.PAGE_SIZE, size * 1);
    }
    /**
     * @return {?}
     */
    getPageSize() {
        return this.getParameter(Parameters.PAGE_SIZE);
    }
    /**
     * @param {?} sort - form of <field>,<dir> or just field name
     * @param {?=} order - optional, either 'asc' or 'desc'
     * @return {?}
     */
    sort(sort, order) {
        this.setSort(sort, order);
        return this;
    }
    /**
     * @param {?} sort - form of <field>,<dir> or just field name
     * @param {?=} order - optional, either 'asc' or 'desc'
     * @return {?}
     */
    setSort(sort, order) {
        order = order || 'desc';
        if (sort && sort.indexOf(',') < 0)
            sort = sort + ',' + order;
        this.setParameter(Parameters.SORT, sort);
    }
    /**
     * @return {?}
     */
    getSort() {
        return this.getParameter(Parameters.SORT);
    }
    /**
     * @return {?}
     */
    getSortField() {
        /** @type {?} */
        let value = this.getSort();
        return value && value.length ? value.split(',')[0] : null;
    }
    /**
     * @return {?}
     */
    getSortOrder() {
        /** @type {?} */
        let value = this.getSort();
        return value && value.length ? value.split(',')[1] : null;
    }
    /**
     * @return {?} list of key-value pairs of sort options
     */
    getSortOptions() {
        return SORT_OPTIONS_DEFAULT$1.slice(0);
    }
    /**
     *
     * @return {?}
     */
    clear() {
        this.query = JSON.parse(JSON.stringify(this.defaultQuery));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function queryFactory () {
    return new Query();
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
const ɵ0$1 = function (options) {
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
class GPHttpClient {
    /**
     * @param {?=} options
     */
    constructor(options) {
        this.timeout = 5000;
        options = options || {};
        this.setTimeout(options["timeout"] || 30000);
        this.setAuthToken(options["token"]);
    }
    /**
     * @param {?} timeout
     * @return {?}
     */
    setTimeout(timeout) {
        this.timeout = timeout;
    }
    /**
     * @param {?} arg - specify the bearer token or a function to retrieve it
     * @return {?}
     */
    setAuthToken(arg) {
        if (arg && typeof (arg) === 'string')
            this.token = function () { return arg; };
        else if (arg && typeof (arg) === 'function')
            this.token = arg;
        //else do nothing
    }
    /**
     * @param {?} options
     * @return {?}
     */
    createRequestOpts(
    // @ts-ignore
    // @ts-ignore
    options) {
        throw new Error("Must implement 'createRequestOpts' in a sub-class");
    }
    /**
     * @param {?} opts
     * @return {?}
     */
    execute(
    // @ts-ignore
    // @ts-ignore
    opts) {
        return Promise.reject(new Error("Must overrdie 'execute' in a sub-class"));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class XHRHttpClient extends GPHttpClient {
    /**
     * @param {?=} options
     */
    constructor(options) {
        super(options);
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
            let token = this.token();
            if (token) {
                opts["headers"] = opts["headers"] || {};
                opts["headers"].Authorization = 'Bearer ' + token;
                opts["withCredentials"] = true;
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
        if (typeof (axios) === 'undefined') {
            throw new Error("Axios not found, check that you have included " +
                "it as a dependency of the application or use a different " +
                "HttpClient implementation");
        }
        /** @type {?} */
        let promise = axios(opts)
            .then(response => { return response.data; })
            .catch(error => {
            /** @type {?} */
            let err = new GPError(error.message);
            if (error.response) {
                err = new GPError(error.response.data);
            }
            throw err;
        });
        return promise;
    }
}

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
class ItemService {
    /**
     * @param {?} url
     * @param {?} httpClient
     */
    constructor(url, httpClient) {
        this._timeout = 30000;
        this.httpMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
        this.setUrl(url);
        this.client = httpClient;
    }
    /**
     * @param {?} baseUrl
     * @return {?}
     */
    setUrl(baseUrl) {
        this.apiBase = baseUrl;
        this.baseUrl = baseUrl + '/api/items';
    }
    /**
     * @param {?} milliseconds - override environment variable timeout
     * @return {?}
     */
    setTimeout(milliseconds) {
        this._timeout = milliseconds;
    }
    /**
     * @param {?} milliseconds - override environment variable timeout
     * @return {?}
     */
    timeout(milliseconds) {
        this.setTimeout(milliseconds);
        return this;
    }
    /**
     * @return {?} GPHttpClient instance or null if one was not provided
     */
    getClient() {
        return this.client;
    }
    /**
     * @param {?} logger - log service
     * @return {?}
     */
    setLogger(logger) {
        this.logger = logger;
    }
    /**
     * @param {?} e - error to log (if logger specified)
     * @return {?}
     */
    logError(e) {
        if (this.logger && this.logger.error) {
            this.logger.error(e);
        }
    }
    /**
     * @param {?} msg - message to log as debug
     * @return {?}
     */
    logDebug(msg) {
        if (this.logger && this.logger.debug) {
            this.logger.debug(msg);
        }
    }
    /**
     * @param {?} id - identifier of item to fetch
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving Item object or an error
     */
    get(id, options) {
        /** @type {?} */
        let url = this.baseUrl + '/' + id;
        if (options && options.version) {
            url += '/versions/' + options.version;
            // this.logDebug("Client.get requesting version: " + options.version);
        }
        return Promise.resolve(url)
            .then(url => {
            /** @type {?} */
            let opts = this.buildRequest({ method: "GET", url: url, options: options });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error fetching item ${id}: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.get() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param {?} itemObj - item to create or update
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving Item object or an error
     */
    save(itemObj, options) {
        return Promise.resolve(itemObj)
            .then(item => {
            /** @type {?} */
            let method = 'POST';
            /** @type {?} */
            let url = this.baseUrl;
            if (item.id) {
                method = "PUT";
                url += '/' + item.id;
            }
            else {
                //if item is being created and has no URI already defined
                // attempt to create one using the API's method for doing so
                // and then attempt the actual item creation
                if (!item.uri) {
                    return this.getUri(item, options)
                        .then(uri => {
                        item.uri = uri;
                        /** @type {?} */
                        let opts = this.buildRequest({ method: method, url: url, data: item, options: options });
                        return this.execute(opts);
                    });
                }
            }
            /** @type {?} */
            let opts = this.buildRequest({ method: method, url: url, data: item, options: options });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error saving item: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.save() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param {?} id - identifier of item to delete
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving true if successful or an error
     */
    remove(id, options) {
        return Promise.resolve(this.baseUrl + '/' + id)
            .then(url => {
            /** @type {?} */
            let opts = this.buildRequest({
                method: "DELETE", url: url, options: options
            });
            return this.execute(opts);
        })
            .then(() => true)
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error deleting item ${id}: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.remove() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param {?} id - identifier of item to patch
     * @param {?} patch - HTTP-PATCH compliant set of properties to patch
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving Item object or an error
     */
    patch(id, patch, options) {
        return Promise.resolve(this.baseUrl + '/' + id)
            .then(url => {
            /** @type {?} */
            let opts = this.buildRequest({
                method: "PATCH", url: url, data: patch, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error patching item ${id}: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.patch() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param {?} id - identifier of item to clone
     * @param {?} overrides - KVP of property-value overrides to apply to cloned instance
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving clone of Item or an error
     */
    clone(id, overrides, options) {
        return Promise.resolve(this.baseUrl + '/' + id + '/clone')
            .then(url => {
            /** @type {?} */
            let opts = this.buildRequest({
                method: "POST", url: url, data: overrides, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error cloning item ${id}: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.clone() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param {?=} arg - either JS object of query parameters or Query instance
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving search results
     */
    search(arg, options) {
        return Promise.resolve(arg)
            .then(params => {
            /** @type {?} */
            let ps = {};
            if (params && typeof (params.getQuery) === 'function')
                ps = params.getQuery();
            else if (typeof (params) === 'object')
                ps = params;
            else
                ps = {};
            /** @type {?} */
            let opts = this.buildRequest({
                method: "GET",
                url: this.baseUrl,
                params: ps,
                options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error searching items: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.search() - ' + err.message);
            throw err;
        });
    }
    /**
     *
     * @param {?} arg - URL to metadata document or File to upload
     * @param {?} format - metadata format of specified document
     * @param {?=} options
     * @return {?} Promise resolving GeoPlatform Item
     */
    import(arg, format, options) {
        return Promise.resolve(true)
            .then(() => {
            if (arg === null || arg === undefined) {
                throw new Error("Must provide a valid URL or File");
            }
            /** @type {?} */
            let isFile = typeof (arg) !== 'string';
            /** @type {?} */
            let ro = {
                method: "POST",
                url: this.apiBase + '/api/import',
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
            let opts = this.buildRequest(ro);
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error importing item: ${e.message}`);
            Object.assign(err, e);
            if (e.status === 409 || ~e.message.indexOf('Item already exists'))
                Object.assign(err, { status: 409 });
            if (e.item)
                Object.assign(err, { item: e.item });
            this.logError('ItemService.import() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param {?} id - identifier of the item to export
     * @param {?} format - string mime type to export
     * @param {?=} options
     * @return {?} Promise resolving HTTP response object for enabling attachment downloading
     */
    export(id, format, options) {
        return Promise.resolve(true)
            .then(() => {
            /** @type {?} */
            let url = this.baseUrl + '/' + id + '/export';
            /** @type {?} */
            let opts = this.buildRequest({
                method: "GET", url: url,
                params: { format: format },
                json: false,
                options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let msg = e.message;
            //https://github.com/GeoPlatform/client-api/issues/1
            if (e.statusCode && e.statusCode === 406 || e.statusCode === '406') {
                msg = `Unsupported export format specified '${format}'`;
            }
            /** @type {?} */
            let err = new Error(`Error exporting item: ${msg}`);
            Object.assign(err, e);
            this.logError('ItemService.export() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param {?} object - GP object definition to generate a URI for
     * @param {?=} options - optional request options
     * @return {?} Promise resolving string URI
     */
    getUri(object, options) {
        return Promise.resolve(object)
            .then(obj => {
            if (!obj || !obj.type)
                throw new Error("Must provide an object with a type property");
            /** @type {?} */
            let url = this.apiBase + '/api/utils/uri';
            options = options || {};
            options.responseType = 'text';
            /** @type {?} */
            let opts = this.buildRequest({
                method: "POST", url: url, data: obj, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error getting URI for item: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.getUri() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param {?} ids - list of identifiers to fetch objects for
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving list of matching items or an error
     */
    getMultiple(ids, options) {
        return Promise.resolve(ids)
            .then(identifiers => {
            /** @type {?} */
            let method = 'POST';
            /** @type {?} */
            let url = this.apiBase + '/api/fetch';
            /** @type {?} */
            let opts = this.buildRequest({ method: method, url: url, data: identifiers, options: options });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error fetching items: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.getMultiple() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param {?} uris - list of URIs to retrieve objects for
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving list containing uri-item association where exists
     */
    exists(uris, options) {
        return Promise.resolve(uris)
            .then(uris => {
            /** @type {?} */
            let method = 'POST';
            /** @type {?} */
            let url = this.apiBase + '/api/utils/exists';
            /** @type {?} */
            let opts = this.buildRequest({ method: method, url: url, data: uris, options: options });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error resolving items: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.exists() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param {?} item
     * @param {?=} options
     * @return {?}
     */
    like(item, options) {
        return Promise.resolve(item.id)
            .then(id => {
            /** @type {?} */
            let method = 'PUT';
            /** @type {?} */
            let url = this.apiBase + '/api/items/' + id + '/likes';
            /** @type {?} */
            let opts = this.buildRequest({ method: method, url: url, options: options });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error liking item ${item.id}: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.like() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param {?} item
     * @param {?=} options
     * @return {?}
     */
    view(item, options) {
        return Promise.resolve(item.id)
            .then(id => {
            /** @type {?} */
            let method = 'PUT';
            /** @type {?} */
            let url = this.apiBase + '/api/items/' + id + '/views';
            /** @type {?} */
            let opts = this.buildRequest({ method: method, url: url, options: options });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error incrementing views for item ${item.id}: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.like() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param {?} id - identifier of item to fetch associations for
     * @param {?} params
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving array of associated items of the item in question
     */
    associations(id, params, options) {
        return Promise.resolve(id)
            .then(id => {
            /** @type {?} */
            let url = this.baseUrl + '/' + id + '/associations';
            /** @type {?} */
            let opts = this.buildRequest({
                method: "GET",
                url: url,
                params: params || {},
                options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error fetching associations for item ${id}: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.associations() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param {?} id - identifier of item to fetch version info for
     * @param {?=} params - optional set of query parameters to constrain list of versions
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving array of available versions of the item
     */
    versions(id, params, options) {
        return Promise.resolve(id)
            .then(id => {
            /** @type {?} */
            let url = this.baseUrl + '/' + id + '/versions';
            /** @type {?} */
            let opts = this.buildRequest({
                method: "GET", url: url, params: params, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error fetching versions for item ${id}: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.versions() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param {?} options - optional object defining request options
     * @return {?} request options for xhr
     */
    buildRequest(options) {
        if (this.httpMethods.indexOf(options["method"]) < 0)
            throw new Error(`Unsupported HTTP method ${options["method"]}`);
        if (!options["url"])
            throw new Error(`Must specify a URL for HTTP requests`);
        options["timeout"] = this._timeout || 30000;
        /** @type {?} */
        let opts = this.createRequestOpts(options);
        return opts;
    }
    /**
     * @param {?} options
     * @return {?}
     */
    createRequestOpts(options) {
        /** @type {?} */
        let request = this.client.createRequestOpts(options);
        this.logDebug("ItemService.createRequestOpts() - " + JSON.stringify(request));
        return request;
    }
    /**
     * @param {?} opts
     * @return {?}
     */
    execute(opts) {
        return this.client.execute(opts)
            .catch(e => {
            if (e === null || typeof (e) === 'undefined') {
                e = new Error("ItemService.execute() - Request failed but didn't return an " +
                    "error. This is most likely because the request timed out");
            }
            return Promise.reject(e);
        });
    }
}

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
class DatasetService extends ItemService {
    /**
     * @param {?} url
     * @param {?} httpClient
     */
    constructor(url, httpClient) {
        super(url, httpClient);
    }
    /**
     * @param {?} baseUrl
     * @return {?}
     */
    setUrl(baseUrl) {
        super.setUrl(baseUrl);
        this.baseUrl = baseUrl + '/api/datasets';
    }
}

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
class MapService extends ItemService {
    /**
     * @param {?} url
     * @param {?} httpClient
     */
    constructor(url, httpClient) {
        super(url, httpClient);
    }
    /**
     * @param {?} baseUrl
     * @return {?}
     */
    setUrl(baseUrl) {
        super.setUrl(baseUrl);
        this.baseUrl = baseUrl + '/api/maps';
    }
}

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
class LayerService extends ItemService {
    /**
     * @param {?} url
     * @param {?} httpClient
     */
    constructor(url, httpClient) {
        super(url, httpClient);
    }
    /**
     * @param {?} baseUrl
     * @return {?}
     */
    setUrl(baseUrl) {
        super.setUrl(baseUrl);
        this.baseUrl = baseUrl + '/api/layers';
    }
    /**
     * @param {?} id - GeoPlatform Layer identifier
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving style JSON object
     */
    style(id, options) {
        return Promise.resolve(id)
            .then((id) => {
            /** @type {?} */
            let url = this.baseUrl + '/' + id + '/style';
            /** @type {?} */
            let opts = this.buildRequest({
                method: "GET", url: url, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error fetching style: ${e.message}`);
            Object.assign(err, e);
            this.logError('LayerService.style() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param {?} id - GeoPlatform Layer identifier
     * @param {?} req identifying extent, x, y
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving feature JSON object
     */
    describe(id, req, options) {
        return Promise.resolve(req)
            .then((req) => {
            if (!req) {
                throw new Error("Must provide describe parameters to use");
            }
            /** @type {?} */
            let keys = ['bbox', 'height', 'width', 'x', 'y'];
            /** @type {?} */
            let missing = keys.find(key => !req[key]);
            if (missing) {
                throw new Error(`Must specify ${missing} in describe req`);
            }
            /** @type {?} */
            let params = {
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
            let url = this.baseUrl + '/' + id + '/describe';
            /** @type {?} */
            let opts = this.buildRequest({
                method: "GET", url: url, params: params, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error describing layer feature: ${e.message}`);
            Object.assign(err, e);
            this.logError('LayerService.describe() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param {?} id - GeoPlatform Layer identifier
     * @param {?} params describing layer request to validate
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving empty if successful or a message if failed
     */
    validate(id, params, options) {
        return Promise.resolve(params)
            .then(params => {
            if (!params) {
                throw new Error("Must provide parameters to use in layer validation");
            }
            /** @type {?} */
            let url = this.baseUrl + '/' + id + '/validate';
            /** @type {?} */
            let opts = this.buildRequest({
                method: "GET", url: url, params: params, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error validating layer request: ${e.message}`);
            Object.assign(err, e);
            this.logError('LayerService.describe() - ' + err.message);
            throw err;
        });
    }
}

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
class ServiceService extends ItemService {
    /**
     * @param {?} url
     * @param {?} httpClient
     */
    constructor(url, httpClient) {
        super(url, httpClient);
    }
    /**
     * @param {?} baseUrl
     * @return {?}
     */
    setUrl(baseUrl) {
        super.setUrl(baseUrl);
        this.baseUrl = baseUrl + '/api/services';
    }
    /**
     * Fetch metadata from the specified GeoPlatform Service's
     * web-accessible implementation using either GetCapabilities
     * or ESRI documentInfo.
     * @param {?} service - GeoPlatform Service object
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving service metadata
     */
    about(service, options) {
        return Promise.resolve(service)
            .then(svc => {
            if (!svc)
                throw new Error("Must provide service to get metadata about");
            /** @type {?} */
            let opts = this.buildRequest({
                method: 'POST', url: this.baseUrl + '/about', data: svc, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error describing service: ${e.message}`);
            Object.assign(err, e);
            this.logError('ServiceService.about() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param {?=} options - optional set of request options to apply to request
     * @return {?} Promise resolving service types
     */
    types(options) {
        /** @type {?} */
        let query = new Query()
            .types(ItemTypes.STANDARD)
            .resourceTypes('ServiceType')
            .pageSize(50)
            .getQuery();
        return Promise.resolve(query)
            .then((params) => {
            /** @type {?} */
            let url = this.apiBase + '/api/items';
            /** @type {?} */
            let opts = this.buildRequest({
                method: 'GET', url: url, params: params, options: options
            });
            return this.execute(opts);
        })
            .then(response => response.results)
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error fetching service types: ${e.message}`);
            Object.assign(err, e);
            this.logError('ServiceService.types() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param {?} service - GP Service definition
     * @param {?=} options - optional set of request options to apply to request
     * @return {?} Promise resolving imported service
     */
    import(service, options) {
        return Promise.resolve(service)
            .then(svc => {
            /** @type {?} */
            let url = this.baseUrl + '/import';
            /** @type {?} */
            let opts = this.buildRequest({
                method: 'POST', url: url, data: svc, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error importing service: ${e.message}`);
            Object.assign(err, e);
            this.logError('ServiceService.import() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param {?} id - identifier of GP service to harvest layers for
     * @param {?=} options - optional set of request options to apply to request
     * @return {?} Promise resolving service layers
     */
    harvest(id, options) {
        return Promise.resolve(id)
            .then(id => {
            /** @type {?} */
            let url = this.baseUrl + '/' + id + '/harvest';
            /** @type {?} */
            let opts = this.buildRequest({
                method: 'GET', url: url, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error harvesting layers from service: ${e.message}`);
            Object.assign(err, e);
            this.logError('ServiceService.harvest() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param {?} id - identifier of GP service to live test
     * @param {?=} options - optional set of request options to apply to request
     * @return {?} Promise resolving service statistics
     */
    liveTest(id, options) {
        return Promise.resolve(id)
            .then(id => {
            /** @type {?} */
            let url = this.baseUrl + '/' + id + '/test';
            /** @type {?} */
            let opts = this.buildRequest({
                method: 'GET', url: url, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error testing service: ${e.message}`);
            Object.assign(err, e);
            this.logError('ServiceService.liveTest() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param {?} id - identifier of GP service to fetch statistics about
     * @param {?=} options - optional set of request options to apply to request
     * @return {?} Promise resolving service statistics
     */
    statistics(id, options) {
        return Promise.resolve(id)
            .then(id => {
            /** @type {?} */
            let url = this.baseUrl + '/' + id + '/statistics';
            /** @type {?} */
            let opts = this.buildRequest({
                method: 'GET', url: url, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error getting service statistics: ${e.message}`);
            Object.assign(err, e);
            this.logError('ServiceService.statistics() - ' + err.message);
            throw err;
        });
    }
}

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
class GalleryService extends ItemService {
    /**
     * @param {?} url
     * @param {?} httpClient
     */
    constructor(url, httpClient) {
        super(url, httpClient);
    }
    /**
     * @param {?} baseUrl
     * @return {?}
     */
    setUrl(baseUrl) {
        super.setUrl(baseUrl);
        this.baseUrl = baseUrl + '/api/galleries';
    }
    /**
     * @param {?} galleryId
     * @param {?} itemObj
     * @param {?=} options
     * @return {?}
     */
    addItem(galleryId, itemObj, options) {
        return Promise.resolve(true)
            .then(() => {
            /** @type {?} */
            let url = this.baseUrl + '/' + galleryId + '/items';
            /** @type {?} */
            let opts = this.buildRequest({
                method: 'POST', url: url, data: itemObj, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error("Error adding item: " + e.message);
            Object.assign(err, e);
            this.logError('GalleryService.addItem() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param {?} galleryId
     * @param {?} itemId
     * @param {?=} options
     * @return {?}
     */
    removeItem(galleryId, itemId, options) {
        return Promise.resolve(this.baseUrl + '/' + galleryId + '/items/' + itemId)
            .then(url => {
            /** @type {?} */
            let opts = this.buildRequest({
                method: 'DELETE', url: url, options: options
            });
            return this.execute(opts);
        })
            .then(() => true)
            .catch(e => {
            /** @type {?} */
            let err = new Error("Error adding item: " + e.message);
            Object.assign(err, e);
            this.logError('GalleryService.addItem() - ' + err.message);
            throw err;
        });
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class UtilsService {
    /**
     * @param {?} url
     * @param {?} httpClient
     */
    constructor(url, httpClient) {
        this.timeout = 30000;
        this.httpMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
        this.client = httpClient;
        this.baseUrl = url;
        this.timeout = Config["timeout"] || 30000;
    }
    /**
     * @param {?} baseUrl
     * @return {?}
     */
    setUrl(baseUrl) {
        this.baseUrl = baseUrl;
    }
    /**
     * @param {?} logger - log service
     * @return {?}
     */
    setLogger(logger) {
        this.logger = logger;
    }
    /**
     * @param {?} e - error to log (if logger specified)
     * @return {?}
     */
    logError(e) {
        if (this.logger && this.logger.error) {
            this.logger.error(e);
        }
    }
    /**
     * @param {?} msg - message to log as debug
     * @return {?}
     */
    logDebug(msg) {
        if (this.logger && this.logger.debug) {
            this.logger.debug(msg);
        }
    }
    /**
     * @param {?} property - optional capa property to specifically request
     * @param {?} query - optional query parameters to include with request
     * @param {?=} options - optional config to send with http request
     * @return {?} Promise resolving capabilities object
     */
    capabilities(property, query, options) {
        /** @type {?} */
        let url = this.baseUrl + '/api/capabilities';
        if (property)
            url += '/' + property;
        return Promise.resolve(url)
            .then((url) => {
            /** @type {?} */
            let opts = this.buildRequest({
                method: "GET", url: url, params: query || {}, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error getting capabilities: ${e.message}`);
            Object.assign(err, e);
            this.logError('UtilsService.capabilities() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param {?} file
     * @param {?} format
     * @param {?=} options
     * @return {?} Promise
     */
    parseFile(file, format, options) {
        /** @type {?} */
        var url = this.baseUrl + '/api/utils/parse';
        return Promise.resolve(url)
            .then(url => {
            /** @type {?} */
            let opts = this.buildRequest({
                method: "POST", url: url,
                data: { format: format },
                file: file,
                formData: true,
                //NodeJS (RequestJS)
                options: options
            });
            return this.execute(opts);
        })
            .then(response => response)
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error parsing file: ${e.message}`);
            Object.assign(err, e);
            this.logError('UtilsService.parseFile() - ' + err.message);
            throw err;
        });
    }
    /**
     * Geolocate the specified argument to a set of candidate locations.
     * @param {?} value - text string to geolocate (name or lat,lng)
     * @param {?=} options - optional config to send with http request
     * @return {?} Promise resolving an array of geocoded results
     */
    locate(value, options) {
        /** @type {?} */
        var url = this.baseUrl + '/api/utils/gazetteer';
        return Promise.resolve(url)
            .then(url => {
            /** @type {?} */
            let opts = this.buildRequest({
                method: 'GET',
                url: url,
                params: { location: value },
                options: options
            });
            return this.execute(opts);
        })
            .then(response => response)
            .catch(e => {
            /** @type {?} */
            let err = new Error(`Error resolving location: ${e.message}`);
            Object.assign(err, e);
            this.logError('UtilsService.locate() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param {?} options - optional object defining request options
     * @return {?} request options for xhr
     */
    buildRequest(options) {
        if (this.httpMethods.indexOf(options["method"]) < 0)
            throw new Error(`Unsupported HTTP method ${options["method"]}`);
        if (!options["url"])
            throw new Error(`Must specify a URL for HTTP requests`);
        options["timeout"] = this.timeout || Config["timeout"] || 30000;
        return this.createRequestOpts(options);
    }
    /**
     * @param {?} options
     * @return {?}
     */
    createRequestOpts(options) {
        return this.client.createRequestOpts(options);
    }
    /**
     * @param {?} opts
     * @return {?}
     */
    execute(opts) {
        return this.client.execute(opts)
            .catch((e) => {
            if (e === null || typeof (e) === 'undefined') {
                e = new Error("UtilsService.execute() - Request failed but didn't return an " +
                    "error. This is most likely because the request timed out");
            }
            return Promise.reject(e);
        });
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class AgolQuery {
    constructor() {
        this._query = {
            page: 0,
            size: 10
        };
    }
    /**
     * @return {?}
     */
    getQuery() {
        /** @type {?} */
        let result = {};
        for (let prop in this._query) {
            /** @type {?} */
            let value = this._query[prop];
            if (value !== null && typeof (value.push) !== 'undefined') {
                value = value.join(',');
            }
            result[prop] = value;
        }
        return result;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    q(value) { this.setQ(value); return this; }
    /**
     * @param {?} value
     * @return {?}
     */
    setQ(value) { this._query["q"] = value; }
    /**
     * @return {?}
     */
    getQ() { return this._query["q"]; }
    /**
     * @param {?} value
     * @return {?}
     */
    types(value) {
        this.setTypes(value);
        return this;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setTypes(value) {
        /** @type {?} */
        let val;
        if (value && Array.isArray(value))
            val = (/** @type {?} */ (value)).join(',');
        else
            val = /** @type {?} */ (value);
        this._query["types"] = val;
    }
    /**
     * @return {?}
     */
    getTypes() { return this._query["types"]; }
    /**
     * @param {?} value
     * @return {?}
     */
    groups(value) {
        this.setGroups(value);
        return this;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setGroups(value) {
        /** @type {?} */
        let val;
        if (value && Array.isArray(value))
            val = (/** @type {?} */ (value)).join(',');
        else
            val = /** @type {?} */ (value);
        this._query["groups"] = val;
    }
    /**
     * @return {?}
     */
    getGroups() { return this._query["groups"]; }
    /**
     * @param {?} value
     * @return {?}
     */
    orgs(value) {
        this.setOrgs(value);
        return this;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setOrgs(value) {
        /** @type {?} */
        let val;
        if (value && Array.isArray(value))
            val = (/** @type {?} */ (value)).join(',');
        else
            val = /** @type {?} */ (value);
        this._query["orgs"] = val;
    }
    /**
     * @return {?}
     */
    getOrgs() { return this._query["orgs"]; }
    /**
     * @param {?} value
     * @return {?}
     */
    extent(value) { this.setExtent(value); return this; }
    /**
     * @param {?} value
     * @return {?}
     */
    setExtent(value) { this._query["bbox"] = value; }
    /**
     * @return {?}
     */
    getExtent() { return this._query["bbox"]; }
    /**
     * @param {?} sort - form of <field>,<dir> or just field name
     * @param {?} order - optional, either 'asc' or 'desc'
     * @return {?}
     */
    sort(sort, order) {
        this.setSort(sort, order);
        return this;
    }
    /**
     * @param {?} sort - form of <field>,<dir> or just field name
     * @param {?} order - optional, either 'asc' or 'desc'
     * @return {?}
     */
    setSort(sort, order) {
        order = order || 'desc';
        if (sort && sort.indexOf(',') < 0)
            sort = sort + ',' + order;
        this._query["sort"] = sort;
    }
    /**
     * @return {?}
     */
    getSort() { return this._query["sort"]; }
    /**
     * @return {?}
     */
    getSortField() { return this._query["sort"].split(',')[0]; }
    /**
     * @return {?}
     */
    getSortOrder() { return this._query["sort"].split(',')[1] === 'asc'; }
    /**
     * @param {?} page - page of results to fetch
     * @return {?}
     */
    page(page) {
        this.setPage(page);
        return this;
    }
    /**
     * @param {?} page
     * @return {?}
     */
    setPage(page) {
        if (isNaN(page) || page * 1 < 0)
            return;
        this._query["page"] = page * 1;
    }
    /**
     * @return {?}
     */
    getPage() {
        return this._query["page"];
    }
    /**
     * @return {?}
     */
    nextPage() {
        this.setPage(this._query["page"] + 1);
    }
    /**
     * @return {?}
     */
    previousPage() {
        this.setPage(this._query["page"] - 1);
    }
    /**
     * @param {?} size - page size to request
     * @return {?}
     */
    pageSize(size) {
        this.setPageSize(size);
        return this;
    }
    /**
     * @param {?} size
     * @return {?}
     */
    setPageSize(size) {
        if (isNaN(size) || size * 1 < 0)
            return;
        this._query["size"] = size * 1;
    }
    /**
     * @return {?}
     */
    getPageSize() {
        return this._query["size"];
    }
}
class AgolService {
    /**
     * @param {?} url
     * @param {?} httpClient
     */
    constructor(url, httpClient) {
        this.timeout = 30000;
        this.httpMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
        this.setUrl(url);
        this.client = httpClient;
        this.timeout = 30000;
    }
    /**
     * @param {?} baseUrl
     * @return {?}
     */
    setUrl(baseUrl) {
        this.baseUrl = baseUrl + '/api/agol';
    }
    /**
     * @param {?} id - identifier of AGOL organization to fetch
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving Item object or an error
     */
    getOrg(id, options) {
        return Promise.resolve(id)
            .then(id => {
            /** @type {?} */
            let opts = this.buildRequest({
                method: "GET", url: this.baseUrl + '/orgs/' + id, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`AgolService.getOrg() - Error fetching org ${id}: ${e.message}`);
            Object.assign(err, e);
            throw err;
        });
    }
    /**
     * @param {?} arg - either JS object of query parameters or Query instance
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving search results
     */
    searchOrgs(arg, options) {
        return Promise.resolve(arg)
            .then(params => {
            /** @type {?} */
            let ps = params.getQuery();
            /** @type {?} */
            let opts = this.buildRequest({
                method: "GET",
                url: this.baseUrl + '/orgs',
                params: ps,
                options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`AgolService.searchOrgs() - Error searching orgs: ${e.message}`);
            Object.assign(err, e);
            throw err;
        });
    }
    /**
     * @param {?} id - identifier of AGOL group to fetch
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving Item object or an error
     */
    getGroup(id, options) {
        return Promise.resolve(id)
            .then(id => {
            /** @type {?} */
            let opts = this.buildRequest({
                method: "GET", url: this.baseUrl + '/groups/' + id, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`AgolService.getGroup() - Error fetching group ${id}: ${e.message}`);
            Object.assign(err, e);
            throw err;
        });
    }
    /**
     * @param {?} arg - either JS object of query parameters or AgolQuery instance
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving search results
     */
    searchGroups(arg, options) {
        return Promise.resolve(arg)
            .then(params => {
            /** @type {?} */
            let ps = params.getQuery();
            /** @type {?} */
            let opts = this.buildRequest({
                method: "GET",
                url: this.baseUrl + '/groups',
                params: ps,
                options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`AgolService.searchGroups() - Error searching groups: ${e.message}`);
            Object.assign(err, e);
            throw err;
        });
    }
    /**
     * @param {?} id - identifier of AGOL item to fetch
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving Item object or an error
     */
    getItem(id, options) {
        return Promise.resolve(id)
            .then((id) => {
            /** @type {?} */
            let opts = this.buildRequest({
                method: "GET",
                url: this.baseUrl + '/items/' + id,
                options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`AgolService.getItem() - Error fetching item ${id}: ${e.message}`);
            Object.assign(err, e);
            throw err;
        });
    }
    /**
     * @param {?} arg - either JS object of query parameters or AgolQuery instance
     * @param {?=} options - optional set of request options to apply to xhr request
     * @return {?} Promise resolving search results
     */
    searchItems(arg, options) {
        return Promise.resolve(arg)
            .then(params => {
            /** @type {?} */
            let ps = params.getQuery();
            /** @type {?} */
            let opts = this.buildRequest({
                method: "GET",
                url: this.baseUrl + '/items',
                params: ps,
                options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            /** @type {?} */
            let err = new Error(`AgolService.searchItems() - Error searching items: ${e.message}`);
            Object.assign(err, e);
            throw err;
        });
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    getAgolId(obj) {
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
        let ids = obj.identifiers.filter((id) => ~id.indexOf('agol:'));
        if (!ids.length)
            return null;
        return ids[0].replace('agol:', '');
    }
    /**
     * @param {?} options - optional object defining request options
     * @return {?} request options for xhr
     */
    buildRequest(options) {
        if (this.httpMethods.indexOf(options["method"]) < 0)
            throw new Error(`Unsupported HTTP method ${options["method"]}`);
        if (!options["url"])
            throw new Error(`Must specify a URL for HTTP requests`);
        options["timeout"] = this.timeout || Config["timeout"] || 30000;
        return this.createRequestOpts(options);
    }
    /**
     * @param {?} options
     * @return {?}
     */
    createRequestOpts(options) {
        return this.client.createRequestOpts(options);
    }
    /**
     * @param {?} opts
     * @return {?}
     */
    execute(opts) {
        return new Promise((resolve, reject) => {
            this.client.execute(opts)
                .then(result => resolve(result))
                .catch(e => {
                if (e === null || typeof (e) === 'undefined') {
                    e = new Error("AGOLService.execute() - Request failed but didn't return an " +
                        "error. This is most likely because the request timed out");
                }
                reject(e);
            });
        });
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const Categories = {
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
const Events = {
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
    let result = Categories["UNKNOWN"];
    if (type) {
        /** @type {?} */
        let cats = Object.keys(Categories).map((k) => Categories[k]);
        //if existing category was specified
        if (~cats.indexOf(type))
            return type;
        //if an ItemType with prefix was specified (strip off prefix)
        else if (~type.indexOf(':')) {
            /** @type {?} */
            let cat = type.split(':')[1];
            if (~cats.indexOf(cat))
                return cat;
        }
    }
    return result;
}
/**
 *
 */
class Event {
    /**
     * @param {?} category
     * @param {?} type
     * @param {?=} item
     * @param {?=} related
     */
    constructor(category, type, item, related) {
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
    getCategory() { return this.category; }
    /**
     * @return {?}
     */
    getType() { return this.type; }
    /**
     * @return {?}
     */
    getItem() { return this.item; }
    /**
     * @param {?} item
     * @return {?}
     */
    setItem(item) { this.item = item ? (item.id || item) : null; }
    /**
     * @return {?}
     */
    getRelated() { return this.related; }
    /**
     * @param {?} related
     * @return {?}
     */
    setRelated(related) {
        this.related = related ? (related.id || related) : null;
    }
}
/**
 * @param {?} eventType - type of event being created
 * @param {?} item - GeoPlatform Item instance
 * @return {?} list of event objects
 */
function TrackingEventFactory(eventType, item) {
    /** @type {?} */
    let result = /** @type {?} */ ([]);
    if (eventType && item && item.type) {
        if (ItemTypes.MAP === item.type) {
            result.push(new Event(Categories["MAP"], eventType, item));
            if (Events["DISPLAYED"] === eventType) {
                item.layers.forEach((layerState) => {
                    if (layerState.layer) {
                        /** @type {?} */
                        let layerEvents = TrackingEventFactory(eventType, layerState.layer)
                            .filter(e => e !== null);
                        if (layerEvents && layerEvents.length) {
                            result = result.concat(layerEvents);
                        }
                    }
                });
                if (item.baseLayer) {
                    /** @type {?} */
                    let baseEvents = TrackingEventFactory(eventType, item.baseLayer)
                        .filter(e => e !== null);
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
            let category = getCategory(item.type);
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
class DefaultTrackingServiceProvider {
    constructor() { }
    /**
     * @param {?} category
     * @param {?} event
     * @param {?=} item
     * @param {?=} related
     * @return {?}
     */
    logEvent(category, event, item, 
    // @ts-ignore
    // @ts-ignore
    related) {
        console.log("EVENT (" + category + ") - " + event + " : " + item);
    }
    /**
     * @param {?} params
     * @param {?} resultCount
     * @return {?}
     */
    logSearch(params, resultCount) {
        console.log("Query : " + JSON.stringify(params) + " found " + resultCount + " matches");
    }
}
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
class TrackingService {
    /**
     * @param {?=} options
     */
    constructor(options) {
        this.provider = null;
        if (options && typeof (options) === 'object')
            Object.assign(this, options);
        if (!this.provider)
            this.setProvider(new DefaultTrackingServiceProvider());
    }
    /**
     * @param {?} provider -
     * @return {?}
     */
    setProvider(provider) {
        if (provider)
            this.provider = provider;
    }
    /**
     * @param {?} event - event to log
     * @return {?} TrackingService
     */
    event(event) {
        this.logEvent(event);
        return this;
    }
    /**
     * @param {?} event - event to log
     * @return {?}
     */
    logEvent(event) {
        if (!this.provider || !this.provider.logEvent || !event)
            return;
        if (Array.isArray(event)) {
            /** @type {?} */
            let events = /** @type {?} */ (event);
            events.forEach((evt) => this.logEvent(evt));
        }
        else {
            /** @type {?} */
            let evt = /** @type {?} */ (event);
            try {
                this.provider.logEvent(evt.getCategory(), evt.getType(), evt.getItem(), evt.getRelated());
            }
            catch (e) {
                console.log("TrackingService.logEvent() - Error logging event (" +
                    evt.getCategory() + ", " + evt.getType() + ", " +
                    evt.getItem() + ") - " + e.message);
            }
        }
    }
    /**
     * @deprecated use svc.event( new Event(EventCategories.APP_PAGE, EventTypes.VIEWED, pageId) )
     * @param {?} view - name of the view being activated
     * @param {?} data - additional context to supply for the event
     * @return {?} TrackingService
     */
    pageView(view, data) {
        this.logPageView(view, data);
        return this;
    }
    /**
     * @deprecated use svc.logEvent( new Event(EventCategories.APP_PAGE, EventTypes.VIEWED, pageId) )
     * @param {?} view - name of the view being activated
     * @param {?=} data - additional context to supply for the event
     * @return {?}
     */
    logPageView(view, 
    // @ts-ignore
    // @ts-ignore
    data) {
        this.logEvent(new Event(Categories["APP_PAGE"], Events["VIEWED"], view));
        // if(this.provider && this.provider.logPageView) {
        //     this.provider.logPageView(view, data);
        // }
    }
    /**
     * @param {?} params
     * @param {?} resultCount
     * @return {?}
     */
    logSearch(params, resultCount) {
        this.provider.logSearch(params, resultCount);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class KGService {
    /**
     * @param {?} url
     * @param {?} httpClient
     */
    constructor(url, httpClient) {
        this.timeout = 30000;
        this.httpMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
        this.setUrl(url);
        this.client = httpClient;
    }
    /**
     * @param {?} baseUrl
     * @return {?}
     */
    setUrl(baseUrl) {
        this.apiBase = baseUrl;
        this.baseUrl = baseUrl + '/api/recommender';
    }
    /**
     * @param {?} query - optional query parameters to include with request
     * @param {?=} options - optional config to send with http request
     * @return {?} Promise resolving recommended concepts as search results
     */
    suggest(query, options) {
        /** @type {?} */
        let url = this.baseUrl + '/suggest';
        return this._search(url, query, options)
            .catch(e => {
            /** @type {?} */
            let err = new Error(`KGService.suggest() - Error suggesting concepts: ${e.message}`);
            Object.assign(err, e);
            throw err;
        });
    }
    /**
     * @param {?} query - optional query parameters to include with request
     * @param {?=} options - optional config to send with http request
     * @return {?} Promise resolving concept types as search results
     */
    types(query, options) {
        /** @type {?} */
        let url = this.baseUrl + '/types';
        return this._search(url, query, options)
            .catch(e => {
            /** @type {?} */
            let err = new Error(`KGService.types() - Error searching types: ${e.message}`);
            Object.assign(err, e);
            throw err;
        });
    }
    /**
     * @param {?} query - optional query parameters to include with request
     * @param {?=} options - optional config to send with http request
     * @return {?} Promise resolving concept sources as search results
     */
    sources(query, options) {
        /** @type {?} */
        let url = this.baseUrl + '/sources';
        return this._search(url, query, options)
            .catch(e => {
            /** @type {?} */
            let err = new Error(`KGService.sources() - Error searching sources: ${e.message}`);
            Object.assign(err, e);
            throw err;
        });
    }
    /**
     * internal method used by exposed methods
     * @param {?} url
     * @param {?} query
     * @param {?=} options
     * @return {?}
     */
    _search(url, query, options) {
        return Promise.resolve(true)
            .then(() => {
            /** @type {?} */
            let q = query.getQuery();
            /** @type {?} */
            let opts = this.buildRequest({
                method: "GET", url: url, params: q, options: options
            });
            return this.execute(opts);
        });
    }
    /**
     * @param {?} options - optional object defining request options
     * @return {?} request options for xhr
     */
    buildRequest(options) {
        if (this.httpMethods.indexOf(options["method"]) < 0)
            throw new Error(`Unsupported HTTP method ${options["method"]}`);
        if (!options["url"])
            throw new Error(`Must specify a URL for HTTP requests`);
        options["timeout"] = this.timeout || Config["timeout"] || 30000;
        return this.createRequestOpts(options);
    }
    /**
     * @param {?} options
     * @return {?}
     */
    createRequestOpts(options) {
        return this.client.createRequestOpts(options);
    }
    /**
     * @param {?} opts
     * @return {?}
     */
    execute(opts) {
        return this.client.execute(opts)
            .catch(e => {
            if (e === null || typeof (e) === 'undefined') {
                e = new Error("KGService.execute() - Request failed but didn't return an " +
                    "error. This is most likely because the request timed out");
            }
            throw e;
        });
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * \@param arg - string type or object with type property
 * \@param baseUrl - base endpoint of GeoPlatform API
 * \@return ItemService
  @type {?} */
const ServiceFactory = function (arg, baseUrl, httpClient) {
    /** @type {?} */
    let type = (typeof (arg) === 'string') ?
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
/** @type {?} */
const VERSION = "0.3.0";
Polyfills();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { VERSION as ClientVersion, GPError, ItemTypes, ItemTypeLabels, Parameters as QueryParameters, Facets as QueryFacets, Query, queryFactory as QueryFactory, Fields as QueryFields, KGQuery, Classifiers as KGClassifiers, AgolQuery, factoryFn as URIFactory, Config, GPHttpClient, XHRHttpClient, ItemService, DatasetService, MapService, LayerService, ServiceService, GalleryService, UtilsService, KGService, ServiceFactory, AgolService, Event as TrackingEvent, TrackingService, Categories as TrackingCategories, Events as TrackingTypes, TrackingEventFactory };

//# sourceMappingURL=geoplatform-client.js.map