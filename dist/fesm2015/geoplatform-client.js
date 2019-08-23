import axios from 'axios';

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

class GPError extends Error {
    constructor(message) {
        super(message);
        this.status = 500;
        this.statusCode = 500;
        this.error = null;
    }
    setError(value) { this.error = value; }
    setStatus(value) { this.status = this.statusCode = value; }
}

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

const URI_BASE = 'http://www.geoplatform.gov';
const ESRI_TYPES = [
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
    let lastChar = url[url.length - 1];
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
    let type = service.serviceType || service.conformsTo;
    if (!type)
        return;
    //if ESRI service, make sure it doesn't have a layer id on the href
    if (ESRI_TYPES.indexOf(type.uri) >= 0) {
        let href = service.href || service.accessURL;
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
    let factory = this.factories[object.type];
    if (!factory)
        return null;
    return factory(object, md5Fn);
};
/**
 * @see https://geoplatform.atlassian.net/wiki/display/DT/Common+Object+Identifier+Scheme
 */
const URIFactory = {
    factories: {},
    register: ɵ0,
    create: ɵ1
};
URIFactory.register(ItemTypes.DATASET, function (dataset, md5) {
    let pubName = (dataset.publisher || dataset.publishers || [])
        .map(pub => { return pub.label || ""; }).join('');
    let ref = formatReference({
        title: dataset.title,
        pub: pubName
    });
    return URI_BASE + '/id/dataset/' + md5(ref);
});
URIFactory.register(ItemTypes.SERVICE, function (service, md5) {
    let url = fixServiceHref(service);
    let ref = formatReference(url);
    return URI_BASE + '/id/service/' + md5(ref);
});
URIFactory.register(ItemTypes.LAYER, function (layer, md5) {
    let svcUrl = '';
    let services = layer.servicedBy || layer.services;
    if (services && services.length)
        svcUrl = services[0].accessURL || services[0].href || '';
    let lyrUrl = layer.accessURL || layer.href || '';
    let lyrName = layer.layerName || '';
    //not recommended based upon following example:
    //  http://services.nationalmap.gov/.../MapServer/WMSServer?request=GetCapabilities&service=WMS/layer/1
    // return url + '/layer/' + layer.layerName;
    let args = svcUrl + lyrName + lyrUrl;
    if (!args.length)
        return null; //nothing was provided
    //ALTERNATE URI PATTERN
    let ref = formatReference(args);
    return URI_BASE + '/id/layer/' + md5(ref);
});
/**
 * Uses the map title, createdBy, and all third-party identifiers associated with the map
 * @param {object} map - GP Map object
 * @return {string} uri unique to this object
 */
URIFactory.register(ItemTypes.MAP, function (map, md5) {
    let author = map.createdBy || map._createdBy || "";
    let identifiers = (map.identifiers || map.identifier || []).join('');
    let ref = formatReference({ title: map.title, author: author, identifiers: identifiers });
    return URI_BASE + '/id/map/' + md5(ref);
});
URIFactory.register(ItemTypes.GALLERY, function (gallery, md5) {
    let author = gallery.createdBy || gallery._createdBy || "";
    let ref = formatReference({ title: gallery.title, author: author });
    return URI_BASE + '/id/gallery/' + md5(ref);
});
URIFactory.register(ItemTypes.COMMUNITY, function (community, md5) {
    let ref = formatReference({ title: community.title });
    return URI_BASE + '/id/community/' + md5(ref);
});
URIFactory.register(ItemTypes.ORGANIZATION, function (org, md5) {
    let ref = formatReference(org.label || org.name);
    return URI_BASE + '/id/organization/' + md5(ref);
});
URIFactory.register(ItemTypes.PERSON, function (person, md5) {
    let ref = formatReference(person.name);
    return URI_BASE + '/id/person/' + md5(ref);
});
URIFactory.register(ItemTypes.CONTACT, function (vcard, md5) {
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
    let scheme = object.inScheme || object.scheme;
    let schemeLabel = scheme ? (scheme.label || scheme.prefLabel) : '';
    let schemeRef = formatReference(schemeLabel);
    let ref = formatReference(object.label || object.prefLabel);
    return URI_BASE + '/id/metadata-codelists/' + md5(schemeRef) + '/' + md5(ref);
});
URIFactory.register(ItemTypes.CONCEPT_SCHEME, function (object, md5) {
    let ref = formatReference(object.label || object.prefLabel);
    return URI_BASE + '/id/metadata-codelists/' + md5(ref);
});
URIFactory.register(ItemTypes.APPLICATION, function (object, md5) {
    if (!object || !object.title)
        return null;
    let author = object.createdBy || object._createdBy || "";
    let ref = formatReference({ title: object.title, author: author });
    return URI_BASE + '/id/application/' + md5(ref);
});
URIFactory.register(ItemTypes.TOPIC, function (object, md5) {
    if (!object || !object.title)
        return null;
    let author = object.createdBy || object._createdBy || "";
    let ref = formatReference({ title: object.title, author: author });
    return URI_BASE + '/id/topic/' + md5(ref);
});
URIFactory.register(ItemTypes.WEBSITE, function (item, md5) {
    if (!item || !item.landingPage)
        return null;
    let ref = formatReference(item.landingPage);
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
    constructor(options) {
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
    getQuery() {
        let result = {};
        for (let prop in this.query) {
            let value = this.query[prop];
            if (value !== null && typeof (value.push) !== 'undefined') {
                value = value.join(',');
            }
            result[prop] = value;
        }
        return result;
    }
    // -----------------------------------------------------------
    parameter(name, value) {
        this.setParameter(name, value);
        return this;
    }
    setParameter(name, value) {
        if (value === null || value === undefined)
            delete this.query[name];
        else
            this.query[name] = value;
    }
    getParameter(key) {
        return this.query[key];
    }
    applyParameters(obj) {
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                this.setParameter(p, obj[p]);
            }
        }
    }
    // -----------------------------------------------------------
    q(text) {
        this.setQ(text);
        return this;
    }
    /**
     * @param text - free text query
     */
    setQ(text) {
        this.setParameter(Parameters.QUERY, text);
    }
    getQ() {
        return this.getParameter(Parameters.QUERY);
    }
    // -----------------------------------------------------------
    /**
     * @param types - KG classifiers for which concepts should be returned
     */
    classifiers(types) {
        this.setClassifiers(types);
        return this;
    }
    /**
     * @param types - KG classifiers for which concepts should be returned
     */
    setClassifiers(types) {
        if (!types)
            return;
        if (typeof (types) === 'string')
            types = types = [types];
        this.setParameter(Parameters.TYPES, types);
    }
    /**
     * @return KG classifiers for which concepts should be returned
     */
    getClassifiers() {
        return this.getParameter(Parameters.TYPES);
    }
    // -----------------------------------------------------------
    /**
     * Specify the Item object model type name(s) for which
     * recommended concepts should be returned. Note: this
     * query parameter is not the same as the GeoPlatform.Query.types()
     * query parameter (they map to different HTTP request parameters).
     * @param objTypes - Item object type names
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
     * @param objTypes - Item object type names
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
     * @return Item object type names
     */
    getTypes() {
        return this.getParameter(Parameters.FOR_TYPES);
    }
    // -----------------------------------------------------------
    /**
     * @param page - page of results to fetch
     */
    page(page) {
        this.setPage(page);
        return this;
    }
    setPage(page) {
        if (isNaN(page) || page * 1 < 0)
            return;
        this.query.page = page * 1;
    }
    getPage() {
        return this.query.page;
    }
    nextPage() {
        this.setPage(this.query.page + 1);
    }
    previousPage() {
        this.setPage(this.query.page - 1);
    }
    // -----------------------------------------------------------
    /**
     * @param size - page size to request
     */
    pageSize(size) {
        this.setPageSize(size);
        return this;
    }
    setPageSize(size) {
        if (isNaN(size) || size * 1 < 0)
            return;
        this.query.size = size * 1;
    }
    getPageSize() {
        return this.query.size;
    }
    // -----------------------------------------------------------
    /**
     * @param sort - form of <field>,<dir> or just field name
     * @param order - optional, either 'asc' or 'desc'
     */
    sort(sort, order) {
        this.setSort(sort, order);
        return this;
    }
    /**
     * @param sort - form of <field>,<dir> or just field name
     * @param order - optional, either 'asc' or 'desc'
     */
    setSort(sort, order) {
        order = order || 'desc';
        if (sort && sort.indexOf(',') < 0)
            sort = sort + ',' + order;
        this.query.sort = sort;
    }
    getSort() {
        return this.query.sort;
    }
    getSortField() {
        return this.query.sort.split(',')[0];
    }
    getSortOrder() {
        return this.query.sort.split(',')[1] === 'asc';
    }
    /**
     * @return list of key-value pairs of sort options
     */
    getSortOptions() {
        return SORT_OPTIONS_DEFAULT.slice(0);
    }
    // -----------------------------------------------------------
    /**
     *
     */
    clear() {
        this.query = this.defaultQuery;
    }
}

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
const FIELDS_DEFAULT = [
    Fields.CREATED, Fields.MODIFIED, Fields.CREATED_BY,
    Fields.PUBLISHERS, Fields.THEMES, Fields.DESCRIPTION
];
/* --------------------------------------------------------- */
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
    USED_BY: 'usedBy',
    VIEWS: 'views',
    VISIBILITY: 'visibility'
};
const FACETS_DEFAULT = [
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
const FacetToParam = {};
FacetToParam[Facets.TYPES] = Parameters.TYPES;
FacetToParam[Facets.THEMES] = Parameters.THEMES_ID;
FacetToParam[Facets.TOPICS] = Parameters.TOPICS_ID;
FacetToParam[Facets.PUBLISHERS] = Parameters.PUBLISHERS_ID;
FacetToParam[Facets.CONTACTS] = Parameters.CONTACTS_ID;
FacetToParam[Facets.CONCEPT_SCHEMES] = Parameters.SCHEMES_ID;
FacetToParam[Facets.USED_BY] = Parameters.USED_BY_ID;
/* --------------------------------------------------------- */
const SORT_OPTIONS_DEFAULT$1 = [
    { value: "label,asc", label: "Name (A-Z)" },
    { value: "label,desc", label: "Name (Z-A)" },
    { value: "type,asc", label: "Type (A-Z)" },
    { value: "type,desc", label: "Type (Z-A)" },
    { value: "modified,desc", label: "Most recently modified" },
    { value: "modified,asc", label: "Least recently modified" },
    { value: "_score,desc", label: "Relevance" }
];
const BBOX_REGEX = /^\-?\d+(\.\d*)?,\-?\d+(\.\d*)?,\-?\d+(\.\d*)?,\-?\d+(\.\d*)?$/;
function toArray(value) {
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
     * @param options - set of initial constraints
     */
    constructor(options) {
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
    getQuery() {
        let result = {};
        for (let prop in this.query) {
            let value = this.query[prop];
            if (value !== null && typeof (value.push) !== 'undefined') {
                value = value.join(',');
            }
            result[prop] = value;
        }
        return result;
    }
    /**
     * @return Query
     */
    clone() {
        let result = new Query();
        let json = JSON.parse(JSON.stringify(this.query));
        result.applyParameters(json);
        return result;
    }
    // -----------------------------------------------------------
    /**
     * @param name
     * @param value
     * @return Query this
     */
    parameter(name, value) {
        this.setParameter(name, value);
        return this;
    }
    /**
     * @param name
     * @param value
     */
    setParameter(name, value) {
        if (value === null || value === undefined || //if no value was provide
            (typeof (value.push) !== 'undefined' && !value.length)) //or empty array
            delete this.query[name];
        else
            this.query[name] = value;
    }
    /**
     * @param key - name of parameter
     * @return value of parameter
     */
    getParameter(key) {
        return this.query[key];
    }
    /**
     * @param name - name of parameter to remove existing value for
     */
    clearParameter(name) {
        delete this.query[name];
    }
    /**
     * @param obj - set of parameter/values to apply to this query
     */
    applyParameters(obj) {
        for (let p in obj) {
            if (obj.hasOwnProperty(p)) {
                this.setParameter(p, obj[p]);
            }
        }
    }
    /**
     * @param facet - name of facet to set the value for as a parameter
     * @param value - value of the facet to use as the parameter's value
     */
    //TODO remove this function
    setFacetParameter(facet, value) {
        let param = FacetToParam[facet];
        if (!param) {
            console.log("WARN : Query.applyFacetParameter() - " +
                "unable to map facet to known parameter '" + facet + "', using " +
                "as direct parameter which may not operate as intended");
        }
        this.setParameter(param || facet, value);
    }
    // -----------------------------------------------------------
    /**
     * @param text
     * @return Query this
     */
    q(text) { this.setQ(text); return this; }
    /** @param text - free text query */
    setQ(text) { this.setParameter(Parameters.QUERY, text); }
    /** @return */
    getQ() { return this.getParameter(Parameters.QUERY); }
    // -----------------------------------------------------------
    keywords(text) {
        this.setKeywords(text);
        return this;
    }
    /**
     * @param text - free text query
     */
    setKeywords(text) {
        this.setParameter(Parameters.KEYWORDS, toArray(text));
    }
    getKeywords() {
        return this.getParameter(Parameters.KEYWORDS);
    }
    // -----------------------------------------------------------
    uri(uri) {
        this.setUri(uri);
        return this;
    }
    setUri(uri) {
        this.setParameter(Parameters.URI, uri);
    }
    getUri() {
        return this.getParameter(Parameters.URI);
    }
    // -----------------------------------------------------------
    types(types) {
        this.setTypes(types);
        return this;
    }
    /**
     * @param types - name of class(es) to request
     */
    setTypes(types) {
        this.setParameter(Parameters.TYPES, toArray(types));
    }
    getTypes() {
        return this.getParameter(Parameters.TYPES);
    }
    // -----------------------------------------------------------
    createdBy(user) {
        this.setCreatedBy(user);
        return this;
    }
    /** @param user - username */
    setCreatedBy(user) {
        this.setParameter(Parameters.CREATED_BY, user);
    }
    /** @return username */
    getCreatedBy() {
        return this.getParameter(Parameters.CREATED_BY);
    }
    // -----------------------------------------------------------
    lastModifiedBy(user) {
        this.setLastModifiedBy(user);
        return this;
    }
    /** @param user - username */
    setLastModifiedBy(user) {
        this.setParameter(Parameters.LAST_MODIFIED_BY, user);
    }
    /** @return username */
    getLastModifiedBy() {
        return this.getParameter(Parameters.LAST_MODIFIED_BY);
    }
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
     * @param themes - theme or themes to constrain by
     */
    setThemes(themes, parameter) {
        //clear existing
        this.setParameter(Parameters.THEMES_ID, null);
        this.setParameter(Parameters.THEMES_LABEL, null);
        this.setParameter(Parameters.THEMES_URI, null);
        let param = parameter || Parameters.THEMES_ID;
        this.setParameter(param, toArray(themes));
    }
    getThemes() {
        return this.getParameter(Parameters.THEMES_ID) ||
            this.getParameter(Parameters.THEMES_LABEL) ||
            this.getParameter(Parameters.THEMES_URI);
    }
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
     * @param topics - theme or topics to constrain by
     */
    setTopics(topics, parameter) {
        //clear existing
        this.setParameter(Parameters.TOPICS_ID, null);
        this.setParameter(Parameters.TOPICS_LABEL, null);
        this.setParameter(Parameters.TOPICS_URI, null);
        let param = parameter || Parameters.TOPICS_ID;
        this.setParameter(param, toArray(topics));
    }
    getTopics() {
        return this.getParameter(Parameters.TOPICS_ID) ||
            this.getParameter(Parameters.TOPICS_LABEL) ||
            this.getParameter(Parameters.TOPICS_URI);
    }
    // -----------------------------------------------------------
    /**
     * Specify a Publisher or set of Publishers to constrain results. By
     * default, values are assumed to be identifiers. If using labels or uris,
     * specify the optional second parameter to be either
     * Parameters.PUBLISHERS_LABEL or Parameters.PUBLISHERS_URI respectively.
     * @param parameter - optional, to indicate the parameter to use
     * @return Query
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
     * @param publishers - publishing orgs to constrain by
     */
    setPublishers(publishers, parameter) {
        //clear existing
        this.setParameter(Parameters.PUBLISHERS_ID, null);
        this.setParameter(Parameters.PUBLISHERS_LABEL, null);
        this.setParameter(Parameters.PUBLISHERS_URI, null);
        let param = parameter || Parameters.PUBLISHERS_ID;
        this.setParameter(param, toArray(publishers));
    }
    getPublishers() {
        return this.getParameter(Parameters.PUBLISHERS_ID) ||
            this.getParameter(Parameters.PUBLISHERS_LABEL) ||
            this.getParameter(Parameters.PUBLISHERS_URI);
    }
    // -----------------------------------------------------------
    /**
     * Specify a Point of Contact or set of Contacts to constrain results. By
     * default, values are assumed to be identifiers. If using
     * labels or uris, specify the optional second parameter to be either
     * Parameters.CONTACTS_LABEL or Parameters.CONTACTS_URI respectively.
     * @param parameter - optional, to indicate the parameter to use
     * @return Query
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
     * @param contacts - publishing orgs to constrain by
     */
    setContacts(contacts, parameter) {
        //clear existing
        this.setParameter(Parameters.CONTACTS_ID, null);
        this.setParameter(Parameters.CONTACTS_LABEL, null);
        this.setParameter(Parameters.CONTACTS_URI, null);
        let param = parameter || Parameters.CONTACTS_ID;
        this.setParameter(param, toArray(contacts));
    }
    getContacts() {
        return this.getParameter(Parameters.CONTACTS_ID) ||
            this.getParameter(Parameters.CONTACTS_LABEL) ||
            this.getParameter(Parameters.CONTACTS_URI);
    }
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
     * @param ids - publishing orgs to constrain by
     */
    setUsedBy(ids, parameter) {
        //clear existing
        this.setParameter(Parameters.USED_BY_ID, null);
        this.setParameter(Parameters.USED_BY_LABEL, null);
        this.setParameter(Parameters.USED_BY_URI, null);
        let param = parameter || Parameters.USED_BY_ID;
        this.setParameter(param, toArray(ids));
    }
    getUsedBy() {
        return this.getParameter(Parameters.USED_BY_ID) ||
            this.getParameter(Parameters.USED_BY_LABEL) ||
            this.getParameter(Parameters.USED_BY_URI);
    }
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
     * @param schemes - schemes to constrain by
     * @param parameter - optional, to indicate the parameter to use
     */
    setSchemes(schemes, parameter) {
        //clear existing
        this.setParameter(Parameters.SCHEMES_ID, null);
        this.setParameter(Parameters.SCHEMES_LABEL, null);
        this.setParameter(Parameters.SCHEMES_URI, null);
        let param = parameter || Parameters.SCHEMES_ID;
        this.setParameter(param, toArray(schemes));
    }
    getSchemes() {
        return this.getParameter(Parameters.SCHEMES_ID) ||
            this.getParameter(Parameters.SCHEMES_LABEL) ||
            this.getParameter(Parameters.SCHEMES_URI);
    }
    // -----------------------------------------------------------
    /**
     *
     */
    serviceTypes(types) {
        this.setServiceTypes(types);
        return this;
    }
    /**
     * @param types - ids
     */
    setServiceTypes(types) {
        this.setParameter(Parameters.SERVICE_TYPES, toArray(types));
    }
    getServiceTypes() {
        return this.getParameter(Parameters.SERVICE_TYPES);
    }
    // -----------------------------------------------------------
    visibility(vis) {
        this.setVisibility(vis);
        return this;
    }
    /**
     * @param visibility - one of 'public' or 'private'
     */
    setVisibility(visibility) {
        this.setParameter(Parameters.VISIBILITY, visibility);
    }
    getVisibility() {
        return this.getParameter(Parameters.VISIBILITY);
    }
    // -----------------------------------------------------------
    status(value) {
        this.setStatus(value);
        return this;
    }
    /**
     * @param status - current status of Item
     */
    setStatus(value) {
        this.setParameter(Parameters.STATUS, value);
    }
    getStatus() {
        return this.getParameter(Parameters.STATUS);
    }
    // -----------------------------------------------------------
    extent(bbox) {
        this.setExtent(bbox);
        return this;
    }
    /**
     * @param bbox - string form of "minx,miny,maxx,maxy", or L.LatLngBounds, or Array
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
     * @return bbox string or null if not set
     */
    getExtent() {
        return this.getParameter(Parameters.EXTENT);
    }
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
     * @param classifier - string name of classifier to use
     * @param value - id or array of ids of concepts to use
     */
    setClassifier(classifier, value) {
        let arr = toArray(value);
        this.setParameter(Parameters.CLASSIFIERS + "." + classifier, arr);
    }
    /**
     * @param classifier - name of classifier constraint in use
     * @return array of concept ids
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
     * @param value - object defining classifiers
     * @return Query instance
     */
    classifiers(value) {
        this.setClassifiers(value);
        return this;
    }
    /**
     * @param value - object defining classifiers
     */
    setClassifiers(value) {
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
     * @return classifiers used in the query
     */
    getClassifiers() {
        let result = {};
        Object.keys(Classifiers).map(k => Classifiers[k]).forEach(classifier => {
            result[classifier] = this.getClassifier(classifier);
        });
        return result;
    }
    // -----------------------------------------------------------
    modified(date, beforeOrAfter) {
        this.setModified(date, beforeOrAfter);
        return this;
    }
    /**
     * @param date - date to compare against
     * @param beforeOrAfter - flag specifying which boundary condition (true = before, false = after) flag specifying whether to trigger update automatically
     */
    setModified(date, beforeOrAfter) {
        //if no date was supplied, consider it "unset" for both properties
        if (!date) {
            this.setParameter(Parameters.MODIFIED_BEFORE, null);
            this.setParameter(Parameters.MODIFIED_AFTER, null);
            return;
        }
        if (!(date instanceof Date))
            date = new Date(date);
        let dir = beforeOrAfter && (beforeOrAfter === true || beforeOrAfter === "true");
        let prop = dir ? Parameters.MODIFIED_BEFORE : Parameters.MODIFIED_AFTER; //property being set
        let oppProp = dir ? Parameters.MODIFIED_AFTER : Parameters.MODIFIED_BEFORE; //unset opposite property
        let arg = (date && date.getTime) ? date.getTime() : date;
        this.setParameter(oppProp, null);
        this.setParameter(prop, arg);
    }
    getModified() {
        let value = this.getParameter(Parameters.MODIFIED_BEFORE) ||
            this.getParameter(Parameters.MODIFIED_AFTER);
        if (value && typeof (value) === 'number') {
            value = new Date(value);
        }
        return value;
    }
    // -----------------------------------------------------------
    created(date, beforeOrAfter) {
        this.setCreated(date, beforeOrAfter);
        return this;
    }
    /**
     * @param date - date to compare against
     * @param beforeOrAfter - flag specifying which boundary condition (true = before, false = after) flag specifying whether to trigger update automatically
     */
    setCreated(date, beforeOrAfter) {
        //if no date was supplied, consider it "unset" for both properties
        if (!date) {
            this.setParameter(Parameters.CREATED_BEFORE, null);
            this.setParameter(Parameters.CREATED_AFTER, null);
            return;
        }
        if (!(date instanceof Date))
            date = new Date(date);
        let dir = beforeOrAfter && (beforeOrAfter === true || beforeOrAfter === "true");
        let prop = dir ? Parameters.CREATED_BEFORE : Parameters.CREATED_AFTER; //property being set
        let oppProp = dir ? Parameters.CREATED_AFTER : Parameters.CREATED_BEFORE; //unset opposite property
        let arg = (date && date.getTime) ? date.getTime() : date;
        this.setParameter(oppProp, null);
        this.setParameter(prop, arg);
    }
    getCreated() {
        let value = this.getParameter(Parameters.CREATED_BEFORE) ||
            this.getParameter(Parameters.CREATED_AFTER);
        if (value && typeof (value) === 'number') {
            value = new Date(value);
        }
        return value;
    }
    // -----------------------------------------------------------
    begins(date) {
        this.setBeginDate(date);
        return this;
    }
    setBeginDate(date) {
        if (date && date instanceof Date)
            date = date.getTime();
        this.setParameter(Parameters.BEGINS, date);
    }
    getBeginDate() {
        let date = this.getParameter(Parameters.BEGINS);
        if (date)
            date = new Date(date);
        return date;
    }
    // -----------------------------------------------------------
    ends(date) {
        this.setEndDate(date);
        return this;
    }
    setEndDate(date) {
        if (date && date instanceof Date)
            date = date.getTime();
        this.setParameter(Parameters.ENDS, date);
    }
    getEndDate() {
        let date = this.getParameter(Parameters.ENDS);
        if (date)
            date = new Date(date);
        return date;
    }
    // -----------------------------------------------------------
    between(begin, end) {
        this.setBetween(begin, end);
        return this;
    }
    setBetween(begin, end) {
        this.begins(begin);
        this.ends(end);
    }
    // -----------------------------------------------------------
    resourceTypes(types) {
        this.setResourceTypes(types);
        return this;
    }
    setResourceTypes(types) {
        this.setParameter(Parameters.RESOURCE_TYPE, toArray(types));
    }
    getResourceTypes() {
        return this.getParameter(Parameters.RESOURCE_TYPE);
    }
    // -----------------------------------------------------------
    facets(names) {
        this.setFacets(names);
        return this;
    }
    /*
     * @param names - names of facets
     */
    setFacets(names) {
        this.setParameter(Parameters.FACETS, toArray(names));
    }
    getFacets() {
        return this.getParameter(Parameters.FACETS);
    }
    /**
     * @param name - name of facet to add
     */
    addFacet(name) {
        let facets = this.getFacets() || [];
        facets.push(name);
        this.setFacets(facets);
    }
    /**
     * @param name - name of facet to remove
     */
    removeFacet(name) {
        let facets = this.getFacets() || [];
        let idx = facets.indexOf(name);
        if (idx >= 0) {
            facets.splice(idx, 1);
            this.setFacets(facets);
        }
    }
    // -----------------------------------------------------------
    fields(fields) {
        this.setFields(fields);
        return this;
    }
    /**
     * @param fields - list of field names to request for each search result
     */
    setFields(fields) {
        this.setParameter(Parameters.FIELDS, toArray(fields));
    }
    getFields() {
        return this.getParameter(Parameters.FIELDS);
    }
    /**
     * @param field - name of field to remove
     */
    addField(field) {
        let fields = this.getFields() || [];
        fields.push(field);
        this.setFields(fields);
    }
    /**
     * @param field - name of field to remove
     */
    removeField(field) {
        let fields = this.getFields() || [];
        let idx = fields.indexOf(field);
        if (idx >= 0) {
            fields.splice(idx, 1);
            this.setFields(fields);
        }
    }
    // -----------------------------------------------------------
    /**
     * @param page - page of results to fetch
     */
    page(page) {
        this.setPage(page);
        return this;
    }
    setPage(page) {
        if (isNaN(page) || page * 1 < 0)
            return;
        this.setParameter(Parameters.PAGE, page * 1);
    }
    getPage() {
        return this.getParameter(Parameters.PAGE);
    }
    nextPage() {
        this.setPage(this.getPage() + 1);
    }
    previousPage() {
        this.setPage(this.getPage() - 1);
    }
    // -----------------------------------------------------------
    /**
     * @param size - page size to request
     */
    pageSize(size) {
        this.setPageSize(size);
        return this;
    }
    setPageSize(size) {
        if (isNaN(size) || size * 1 < 0)
            return;
        this.setParameter(Parameters.PAGE_SIZE, size * 1);
    }
    getPageSize() {
        return this.getParameter(Parameters.PAGE_SIZE);
    }
    // -----------------------------------------------------------
    /**
     * @param sort - form of <field>,<dir> or just field name
     * @param order - optional, either 'asc' or 'desc'
     */
    sort(sort, order) {
        this.setSort(sort, order);
        return this;
    }
    /**
     * @param sort - form of <field>,<dir> or just field name
     * @param order - optional, either 'asc' or 'desc'
     */
    setSort(sort, order) {
        order = order || 'desc';
        if (sort && sort.indexOf(',') < 0)
            sort = sort + ',' + order;
        this.setParameter(Parameters.SORT, sort);
    }
    getSort() {
        return this.getParameter(Parameters.SORT);
    }
    getSortField() {
        let value = this.getSort();
        return value && value.length ? value.split(',')[0] : null;
    }
    getSortOrder() {
        let value = this.getSort();
        return value && value.length ? value.split(',')[1] : null;
    }
    /**
     * @return list of key-value pairs of sort options
     */
    getSortOptions() {
        return SORT_OPTIONS_DEFAULT$1.slice(0);
    }
    // -----------------------------------------------------------
    /**
     *
     */
    clear() {
        this.query = JSON.parse(JSON.stringify(this.defaultQuery));
    }
}

function queryFactory() {
    return new Query();
}

const ɵ0$1 = function (options) {
    Object.assign(this, options);
};
var Config = {
    ualUrl: 'https://ual.geoplatform.gov',
    //appId: '...',
    configure: ɵ0$1
};

class GPHttpClient {
    /**
     * @param options.timeout
     * @param options.token - the bearer token or a function to retrieve it
     */
    constructor(options) {
        this.timeout = 5000;
        options = options || {};
        this.setTimeout(options.timeout || 30000);
        this.setAuthToken(options.token);
    }
    setTimeout(timeout) {
        this.timeout = timeout;
    }
    /**
     * @param arg - specify the bearer token or a function to retrieve it
     */
    setAuthToken(arg) {
        if (arg && typeof (arg) === 'string')
            this.token = function () { return arg; };
        else if (arg && typeof (arg) === 'function')
            this.token = arg;
        //else do nothing
    }
    getToken() {
        if (this.token && typeof (this.token) === 'function')
            return this.token();
        else
            return this.token || null;
    }
    createRequestOpts(
    // @ts-ignore
    options) {
        throw new Error("Must implement 'createRequestOpts' in a sub-class");
    }
    execute(
    // @ts-ignore
    opts) {
        return Promise.reject(new Error("Must overrdie 'execute' in a sub-class"));
    }
}

class XHRHttpClient extends GPHttpClient {
    /**
     * @param options.timeout
     * @param options.token - the bearer token or a function to retrieve it
     */
    constructor(options) {
        super(options);
    }
    createRequestOpts(options) {
        let opts = {
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
        //set authorization header if one was provided
        if (this.token) {
            let token = this.token();
            if (token) {
                opts.headers = opts.headers || {};
                opts.headers.Authorization = 'Bearer ' + token;
                opts.withCredentials = true;
            }
        }
        //copy over user-supplied options
        if (options.options) {
            for (let o in options.options) {
                if (options.options.hasOwnProperty(o)) {
                    opts[o] = options.options[o];
                }
            }
        }
        return opts;
    }
    execute(opts) {
        if (typeof (axios) === 'undefined') {
            throw new Error("Axios not found, check that you have included " +
                "it as a dependency of the application or use a different " +
                "HttpClient implementation");
        }
        let promise = axios(opts)
            .then(response => { return response.data; })
            .catch(error => {
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
 * BaseService
 * abstract service for working with the GeoPlatform API to
 * retrieve and manipulate items.
 *
 */
class BaseService {
    constructor(url, httpClient) {
        this._timeout = 30000;
        this.httpMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
        this.setUrl(url);
        this.client = httpClient;
    }
    setUrl(baseUrl) {
        this.apiBase = baseUrl;
        this.baseUrl = baseUrl + '/api/items';
    }
    /**
     * @param milliseconds - override environment variable timeout
     */
    setTimeout(milliseconds) {
        this._timeout = milliseconds;
    }
    /**
     * @param milliseconds - override environment variable timeout
     */
    timeout(milliseconds) {
        this.setTimeout(milliseconds);
        return this;
    }
    /**
     * @return GPHttpClient instance or null if one was not provided
     */
    getClient() {
        return this.client;
    }
    createPromise(arg) {
        return new Promise(arg);
    }
    createAndResolvePromise(value) {
        return Promise.resolve(value);
    }
    createAndRejectPromise(error) {
        return Promise.reject(error);
    }
    /**
     * @param logger - log service
     */
    setLogger(logger) {
        this.logger = logger;
    }
    /**
     * @param e - error to log (if logger specified)
     */
    logError(e) {
        if (this.logger && this.logger.error) {
            this.logger.error(e);
        }
    }
    /**
     * @param msg - message to log as debug
     */
    logDebug(msg) {
        if (this.logger && this.logger.debug) {
            this.logger.debug(msg);
        }
    }
    /**
     * @param method - one of "GET", "POST", "PUT", "DELETE", "PATCH"
     * @param url - destination of xhr request
     * @param params - object to be sent with request as query parameters
     * @param data - object to be sent with request as body
     * @param options - optional object defining request options
     * @return request options for xhr
     */
    buildRequest(options) {
        if (this.httpMethods.indexOf(options.method) < 0)
            throw new Error(`Unsupported HTTP method ${options.method}`);
        if (!options.url)
            throw new Error(`Must specify a URL for HTTP requests`);
        options.timeout = this._timeout || 30000;
        let opts = this.createRequestOpts(options);
        return opts;
    }
    createRequestOpts(options) {
        let request = this.client.createRequestOpts(options);
        this.logDebug("BaseService.createRequestOpts() - " + JSON.stringify(request));
        return request;
    }
    execute(opts) {
        return this.client.execute(opts)
            .catch(e => {
            if (e === null || typeof (e) === 'undefined') {
                e = new Error("Request failed but didn't return an " +
                    "error. This is most likely because the request timed out");
            }
            return this.createAndRejectPromise(e);
        });
    }
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
class ItemService extends BaseService {
    constructor(url, httpClient) {
        super(url, httpClient);
    }
    /**
     * @param id - identifier of item to fetch
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving Item object or an error
     */
    get(id, options) {
        let url = this.baseUrl + '/' + id;
        if (options && options.version) {
            url += '/versions/' + options.version;
            // this.logDebug("Client.get requesting version: " + options.version);
        }
        return this.createAndResolvePromise(url)
            .then(url => {
            let opts = this.buildRequest({ method: "GET", url: url, options: options });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`Error fetching item ${id}: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.get() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param itemObj - item to create or update
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving Item object or an error
     */
    save(itemObj, options) {
        return this.createAndResolvePromise(itemObj)
            .then(item => {
            let method = 'POST', url = this.baseUrl;
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
                        let opts = this.buildRequest({ method: method, url: url, data: item, options: options });
                        return this.execute(opts);
                    });
                }
            }
            let opts = this.buildRequest({ method: method, url: url, data: item, options: options });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`Error saving item: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.save() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param id - identifier of item to delete
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving true if successful or an error
     */
    remove(id, options) {
        return this.createAndResolvePromise(this.baseUrl + '/' + id)
            .then(url => {
            let opts = this.buildRequest({
                method: "DELETE", url: url, options: options
            });
            return this.execute(opts);
        })
            .then(() => true)
            .catch(e => {
            let err = new Error(`Error deleting item ${id}: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.remove() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param id - identifier of item to patch
     * @param patch - HTTP-PATCH compliant set of properties to patch
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving Item object or an error
     */
    patch(id, patch, options) {
        return this.createAndResolvePromise(this.baseUrl + '/' + id)
            .then(url => {
            let opts = this.buildRequest({
                method: "PATCH", url: url, data: patch, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`Error patching item ${id}: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.patch() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param id - identifier of item to clone
     * @param overrides - KVP of property-value overrides to apply to cloned instance
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving clone of Item or an error
     */
    clone(id, overrides, options) {
        return this.createAndResolvePromise(this.baseUrl + '/' + id + '/clone')
            .then(url => {
            let opts = this.buildRequest({
                method: "POST", url: url, data: overrides, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`Error cloning item ${id}: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.clone() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param arg - either JS object of query parameters or Query instance
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving search results
     */
    search(arg, options) {
        return this.createAndResolvePromise(arg)
            .then(params => {
            let ps = {};
            if (params && typeof (params.getQuery) === 'function')
                ps = params.getQuery();
            else if (typeof (params) === 'object')
                ps = params;
            else
                ps = {};
            let opts = this.buildRequest({
                method: "GET",
                url: this.baseUrl,
                params: ps,
                options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`Error searching items: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.search() - ' + err.message);
            throw err;
        });
    }
    /**
     *
     * @param arg - URL to metadata document or File to upload
     * @param format - metadata format of specified document
     * @return Promise resolving GeoPlatform Item
     */
    import(arg, format, options) {
        return this.createAndResolvePromise(true)
            .then(() => {
            if (arg === null || arg === undefined) {
                throw new Error("Must provide a valid URL or File");
            }
            let isFile = typeof (arg) !== 'string';
            let ro = {
                method: "POST",
                url: this.apiBase + '/api/import',
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
            let opts = this.buildRequest(ro);
            return this.execute(opts);
        })
            .catch(e => {
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
     * @param id - identifier of the item to export
     * @param format - string mime type to export
     * @return Promise resolving HTTP response object for enabling attachment downloading
     */
    export(id, format, options) {
        return this.createAndResolvePromise(true)
            .then(() => {
            let url = this.baseUrl + '/' + id + '/export';
            let opts = this.buildRequest({
                method: "GET", url: url,
                params: { format: format },
                json: false,
                options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            let msg = e.message;
            //https://github.com/GeoPlatform/client-api/issues/1
            if (e.statusCode && e.statusCode === 406 || e.statusCode === '406') {
                msg = `Unsupported export format specified '${format}'`;
            }
            let err = new Error(`Error exporting item: ${msg}`);
            Object.assign(err, e);
            this.logError('ItemService.export() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param object - GP object definition to generate a URI for
     * @param options - optional request options
     * @return Promise resolving string URI
     */
    getUri(object, options) {
        return this.createAndResolvePromise(object)
            .then(obj => {
            if (!obj || !obj.type)
                throw new Error("Must provide an object with a type property");
            let url = this.apiBase + '/api/utils/uri';
            options = options || {};
            options.responseType = 'text'; //to ensure plaintext is expected
            let opts = this.buildRequest({
                method: "POST", url: url, data: obj, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`Error getting URI for item: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.getUri() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param ids - list of identifiers to fetch objects for
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving list of matching items or an error
     */
    getMultiple(ids, options) {
        return this.createAndResolvePromise(ids)
            .then(identifiers => {
            let method = 'POST', url = this.apiBase + '/api/fetch';
            let opts = this.buildRequest({ method: method, url: url, data: identifiers, options: options });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`Error fetching items: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.getMultiple() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param uris - list of URIs to retrieve objects for
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving list containing uri-item association where exists
     */
    exists(uris, options) {
        return this.createAndResolvePromise(uris)
            .then(uris => {
            let method = 'POST', url = this.apiBase + '/api/utils/exists';
            let opts = this.buildRequest({ method: method, url: url, data: uris, options: options });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`Error resolving items: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.exists() - ' + err.message);
            throw err;
        });
    }
    like(item, options) {
        return this.createAndResolvePromise(item.id)
            .then(id => {
            let method = 'PUT', url = this.apiBase + '/api/items/' + id + '/likes';
            let opts = this.buildRequest({ method: method, url: url, options: options });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`Error liking item ${item.id}: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.like() - ' + err.message);
            throw err;
        });
    }
    view(item, options) {
        return this.createAndResolvePromise(item.id)
            .then(id => {
            let method = 'PUT', url = this.apiBase + '/api/items/' + id + '/views';
            let opts = this.buildRequest({ method: method, url: url, options: options });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`Error incrementing views for item ${item.id}: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.like() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param id - identifier of item to fetch associations for
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving array of associated items of the item in question
     */
    associations(id, params, options) {
        return this.createAndResolvePromise(id)
            .then(id => {
            let url = this.baseUrl + '/' + id + '/associations';
            let opts = this.buildRequest({
                method: "GET",
                url: url,
                params: params || {},
                options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`Error fetching associations for item ${id}: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.associations() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param id - identifier of item to fetch version info for
     * @param params - optional set of query parameters to constrain list of versions
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving array of available versions of the item
     */
    versions(id, params, options) {
        return this.createAndResolvePromise(id)
            .then(id => {
            let url = this.baseUrl + '/' + id + '/versions';
            let opts = this.buildRequest({
                method: "GET", url: url, params: params, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`Error fetching versions for item ${id}: ${e.message}`);
            Object.assign(err, e);
            this.logError('ItemService.versions() - ' + err.message);
            throw err;
        });
    }
}

/**
 * GeoPlatform Map service
 * service for working with the GeoPlatform API to
 * retrieve and manipulate map objects.
 *
 * @see GeoPlatform.ItemService
 */
class DatasetService extends ItemService {
    constructor(url, httpClient) {
        super(url, httpClient);
    }
    setUrl(baseUrl) {
        super.setUrl(baseUrl);
        this.baseUrl = baseUrl + '/api/datasets';
    }
}

/**
 * GeoPlatform Map service
 * service for working with the GeoPlatform API to
 * retrieve and manipulate map objects.
 *
 * @see GeoPlatform.ItemService
 */
class MapService extends ItemService {
    constructor(url, httpClient) {
        super(url, httpClient);
    }
    setUrl(baseUrl) {
        super.setUrl(baseUrl);
        this.baseUrl = baseUrl + '/api/maps';
    }
}

/**
 * GeoPlatform Map service
 * service for working with the GeoPlatform API to
 * retrieve and manipulate map objects.
 *
 * @see GeoPlatform.ItemService
 */
class LayerService extends ItemService {
    constructor(url, httpClient) {
        super(url, httpClient);
    }
    setUrl(baseUrl) {
        super.setUrl(baseUrl);
        this.baseUrl = baseUrl + '/api/layers';
    }
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
    style(id, ...args) {
        return Promise.resolve(id)
            .then((id) => {
            let options = null;
            let url = this.baseUrl + '/' + id + '/style';
            if (args[0] && typeof (args[0]) === 'string') { //style id parameter
                url += 's/' + args[0]; //
                if (args[1])
                    options = args[1]; // ... plus options parameter
            }
            else if (args[0] && typeof (args[0]) === 'object') { //options parameter
                options = args[0];
            }
            let opts = this.buildRequest({ method: "GET", url: url, options: options });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`Error fetching style: ${e.message}`);
            Object.assign(err, e);
            this.logError('LayerService.style() - ' + err.message);
            throw err;
        });
    }
    /**
     * Fetch the list of styles associated with a given GeoPlatform Layer asset
     * @param id - GeoPlatform Layer identifier
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving style JSON object
     */
    styles(id, options) {
        return Promise.resolve(id)
            .then((id) => {
            let url = this.baseUrl + '/' + id + '/styles';
            let opts = this.buildRequest({ method: "GET", url: url, options: options });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`Error fetching style: ${e.message}`);
            Object.assign(err, e);
            this.logError('LayerService.style() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param id - GeoPlatform Layer identifier
     * @param req identifying extent, x, y
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving feature JSON object
     */
    describe(id, req, options) {
        return Promise.resolve(req)
            .then((req) => {
            if (!req) {
                throw new Error("Must provide describe parameters to use");
            }
            let keys = ['bbox', 'height', 'width', 'x', 'y'];
            let missing = keys.find(key => !req[key]);
            if (missing) {
                throw new Error(`Must specify ${missing} in describe req`);
            }
            let params = {
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
            let url = this.baseUrl + '/' + id + '/describe';
            let opts = this.buildRequest({
                method: "GET", url: url, params: params, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`Error describing layer feature: ${e.message}`);
            Object.assign(err, e);
            this.logError('LayerService.describe() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param id - GeoPlatform Layer identifier
     * @param params describing layer request to validate
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving empty if successful or a message if failed
     */
    validate(id, params, options) {
        return Promise.resolve(params)
            .then(params => {
            if (!params) {
                throw new Error("Must provide parameters to use in layer validation");
            }
            let url = this.baseUrl + '/' + id + '/validate';
            let opts = this.buildRequest({
                method: "GET", url: url, params: params, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`Error validating layer request: ${e.message}`);
            Object.assign(err, e);
            this.logError('LayerService.describe() - ' + err.message);
            throw err;
        });
    }
}

/**
 * GeoPlatform Service service
 * service for working with the GeoPlatform API to
 * retrieve and manipulate service objects.
 *
 * @see ItemService
 */
class ServiceService extends ItemService {
    constructor(url, httpClient) {
        super(url, httpClient);
    }
    setUrl(baseUrl) {
        super.setUrl(baseUrl);
        this.baseUrl = baseUrl + '/api/services';
    }
    /**
     * Fetch metadata from the specified GeoPlatform Service's
     * web-accessible implementation using either GetCapabilities
     * or ESRI documentInfo.
     * @param service - GeoPlatform Service object
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving service metadata
     */
    about(service, options) {
        return Promise.resolve(service)
            .then(svc => {
            if (!svc)
                throw new Error("Must provide service to get metadata about");
            let opts = this.buildRequest({
                method: 'POST', url: this.baseUrl + '/about', data: svc, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`Error describing service: ${e.message}`);
            Object.assign(err, e);
            this.logError('ServiceService.about() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param options - optional set of request options to apply to request
     * @return Promise resolving service types
     */
    types(options) {
        let query = new Query()
            .types(ItemTypes.STANDARD)
            .resourceTypes('ServiceType')
            .pageSize(50)
            .getQuery();
        return Promise.resolve(query)
            .then((params) => {
            let url = this.apiBase + '/api/items';
            let opts = this.buildRequest({
                method: 'GET', url: url, params: params, options: options
            });
            return this.execute(opts);
        })
            .then(response => response.results)
            .catch(e => {
            let err = new Error(`Error fetching service types: ${e.message}`);
            Object.assign(err, e);
            this.logError('ServiceService.types() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param service - GP Service definition
     * @param options - optional set of request options to apply to request
     * @return Promise resolving imported service
     */
    import(service, options) {
        return Promise.resolve(service)
            .then(svc => {
            let url = this.baseUrl + '/import';
            let opts = this.buildRequest({
                method: 'POST', url: url, data: svc, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`Error importing service: ${e.message}`);
            Object.assign(err, e);
            this.logError('ServiceService.import() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param id - identifier of GP service to harvest layers for
     * @param options - optional set of request options to apply to request
     * @return Promise resolving service layers
     */
    harvest(id, options) {
        return Promise.resolve(id)
            .then(id => {
            let url = this.baseUrl + '/' + id + '/harvest';
            let opts = this.buildRequest({
                method: 'GET', url: url, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`Error harvesting layers from service: ${e.message}`);
            Object.assign(err, e);
            this.logError('ServiceService.harvest() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param id - identifier of GP service to live test
     * @param options - optional set of request options to apply to request
     * @return Promise resolving service statistics
     */
    liveTest(id, options) {
        return Promise.resolve(id)
            .then(id => {
            let url = this.baseUrl + '/' + id + '/test';
            let opts = this.buildRequest({
                method: 'GET', url: url, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`Error testing service: ${e.message}`);
            Object.assign(err, e);
            this.logError('ServiceService.liveTest() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param id - identifier of GP service to fetch statistics about
     * @param options - optional set of request options to apply to request
     * @return Promise resolving service statistics
     */
    statistics(id, options) {
        return Promise.resolve(id)
            .then(id => {
            let url = this.baseUrl + '/' + id + '/statistics';
            let opts = this.buildRequest({
                method: 'GET', url: url, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`Error getting service statistics: ${e.message}`);
            Object.assign(err, e);
            this.logError('ServiceService.statistics() - ' + err.message);
            throw err;
        });
    }
}

/**
 * GeoPlatform Map service
 * service for working with the GeoPlatform API to
 * retrieve and manipulate map objects.
 *
 * @see GeoPlatform.ItemService
 */
class GalleryService extends ItemService {
    constructor(url, httpClient) {
        super(url, httpClient);
    }
    setUrl(baseUrl) {
        super.setUrl(baseUrl);
        this.baseUrl = baseUrl + '/api/galleries';
    }
    addItem(galleryId, itemObj, options) {
        return Promise.resolve(true)
            .then(() => {
            let url = this.baseUrl + '/' + galleryId + '/items';
            let opts = this.buildRequest({
                method: 'POST', url: url, data: itemObj, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error("Error adding item: " + e.message);
            Object.assign(err, e);
            this.logError('GalleryService.addItem() - ' + err.message);
            throw err;
        });
    }
    removeItem(galleryId, itemId, options) {
        return Promise.resolve(this.baseUrl + '/' + galleryId + '/items/' + itemId)
            .then(url => {
            let opts = this.buildRequest({
                method: 'DELETE', url: url, options: options
            });
            return this.execute(opts);
        })
            .then(() => true)
            .catch(e => {
            let err = new Error("Error adding item: " + e.message);
            Object.assign(err, e);
            this.logError('GalleryService.addItem() - ' + err.message);
            throw err;
        });
    }
}

class UtilsService extends BaseService {
    constructor(url, httpClient) {
        super(url, httpClient);
        this.setTimeout(30000);
    }
    setUrl(baseUrl) {
        super.setUrl(baseUrl);
        this.baseUrl = baseUrl;
    }
    /**
     * @param property - optional capa property to specifically request
     * @param query - optional query parameters to include with request
     * @param options - optional config to send with http request
     * @return Promise resolving capabilities object
     */
    capabilities(property, query, options) {
        let url = this.baseUrl + '/api/capabilities';
        if (property)
            url += '/' + property;
        return this.createAndResolvePromise(url)
            .then((url) => {
            let opts = this.buildRequest({
                method: "GET", url: url, params: query || {}, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`Error getting capabilities: ${e.message}`);
            Object.assign(err, e);
            this.logError('UtilsService.capabilities() - ' + err.message);
            throw err;
        });
    }
    /**
     * @param file
     * @param format
     * @param options
     * @return Promise
     */
    parseFile(file, format, options) {
        var url = this.baseUrl + '/api/utils/parse';
        return this.createAndResolvePromise(url)
            .then(url => {
            let opts = this.buildRequest({
                method: "POST", url: url,
                data: { format: format },
                file: file,
                formData: true,
                options: options
            });
            return this.execute(opts);
        })
            .then(response => response)
            .catch(e => {
            let err = new Error(`Error parsing file: ${e.message}`);
            Object.assign(err, e);
            this.logError('UtilsService.parseFile() - ' + err.message);
            throw err;
        });
    }
    /**
     * Geolocate the specified argument to a set of candidate locations.
     * @param value - text string to geolocate (name or lat,lng)
     * @param options - optional config to send with http request
     * @return Promise resolving an array of geocoded results
     */
    locate(value, options) {
        var url = this.baseUrl + '/api/utils/gazetteer';
        return this.createAndResolvePromise(url)
            .then(url => {
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
            let err = new Error(`Error resolving location: ${e.message}`);
            Object.assign(err, e);
            this.logError('UtilsService.locate() - ' + err.message);
            throw err;
        });
    }
    /**
     * Upload a file to store within the GeoPlatform for association with
     * one or more portfolio Assets.
     *
     * @param file File to store
     * @param format string media type of the file being stored
     * @param options optional
     * @return Promise resolving metadata for stored content
     */
    store(file, format, options) {
        var url = this.baseUrl + '/api/store';
        return this.createAndResolvePromise(url)
            .then(url => {
            let opts = this.buildRequest({
                method: "POST",
                url: url,
                data: { format: format },
                file: file,
                formData: true,
                options: options
            });
            return this.execute(opts);
        })
            .then(response => response)
            .catch(e => {
            let err = new Error(`Error uploading file for storage: ${e.message}`);
            Object.assign(err, e);
            this.logError('UtilsService.store() - ' + err.message);
            throw err;
        });
    }
}

class AgolQuery {
    constructor() {
        this._query = {
            page: 0,
            size: 10
        };
    }
    getQuery() {
        let result = {};
        for (let prop in this._query) {
            let value = this._query[prop];
            if (value !== null && typeof (value.push) !== 'undefined') {
                value = value.join(',');
            }
            result[prop] = value;
        }
        return result;
    }
    // ---------------------------------------
    q(value) { this.setQ(value); return this; }
    setQ(value) { this._query.q = value; }
    getQ() { return this._query.q; }
    // ---------------------------------------
    types(value) {
        this.setTypes(value);
        return this;
    }
    setTypes(value) {
        let val;
        if (value && Array.isArray(value))
            val = value.join(',');
        else
            val = value;
        this._query.types = val;
    }
    getTypes() { return this._query.types; }
    // ---------------------------------------
    groups(value) {
        this.setGroups(value);
        return this;
    }
    setGroups(value) {
        let val;
        if (value && Array.isArray(value))
            val = value.join(',');
        else
            val = value;
        this._query.groups = val;
    }
    getGroups() { return this._query.groups; }
    // ---------------------------------------
    orgs(value) {
        this.setOrgs(value);
        return this;
    }
    setOrgs(value) {
        let val;
        if (value && Array.isArray(value))
            val = value.join(',');
        else
            val = value;
        this._query.orgs = val;
    }
    getOrgs() { return this._query.orgs; }
    // ---------------------------------------
    extent(value) { this.setExtent(value); return this; }
    setExtent(value) { this._query.bbox = value; }
    getExtent() { return this._query.bbox; }
    // ---------------------------------------
    /**
     * @param sort - form of <field>,<dir> or just field name
     * @param order - optional, either 'asc' or 'desc'
     */
    sort(sort, order) {
        this.setSort(sort, order);
        return this;
    }
    /**
     * @param sort - form of <field>,<dir> or just field name
     * @param order - optional, either 'asc' or 'desc'
     */
    setSort(sort, order) {
        order = order || 'desc';
        if (sort && sort.indexOf(',') < 0)
            sort = sort + ',' + order;
        this._query.sort = sort;
    }
    getSort() { return this._query.sort; }
    getSortField() { return this._query.sort.split(',')[0]; }
    getSortOrder() { return this._query.sort.split(',')[1] === 'asc'; }
    // -----------------------------------------------------------
    /**
     * @param page - page of results to fetch
     */
    page(page) {
        this.setPage(page);
        return this;
    }
    setPage(page) {
        if (isNaN(page) || page * 1 < 0)
            return;
        this._query.page = page * 1;
    }
    getPage() {
        return this._query.page;
    }
    nextPage() {
        this.setPage(this._query.page + 1);
    }
    previousPage() {
        this.setPage(this._query.page - 1);
    }
    // -----------------------------------------------------------
    /**
     * @param size - page size to request
     */
    pageSize(size) {
        this.setPageSize(size);
        return this;
    }
    setPageSize(size) {
        if (isNaN(size) || size * 1 < 0)
            return;
        this._query.size = size * 1;
    }
    getPageSize() {
        return this._query.size;
    }
}
class AgolService extends BaseService {
    constructor(url, httpClient) {
        super(url, httpClient);
        this.setTimeout(30000);
    }
    setUrl(baseUrl) {
        super.setUrl(baseUrl);
        this.baseUrl = baseUrl + '/api/agol';
    }
    // -----------------------------------------------------------------------
    // AGOL ORGS METHODS
    /**
     * @param id - identifier of AGOL organization to fetch
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving Item object or an error
     */
    getOrg(id, options) {
        return this.createAndResolvePromise(id)
            .then(id => {
            let opts = this.buildRequest({
                method: "GET", url: this.baseUrl + '/orgs/' + id, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`AgolService.getOrg() - Error fetching org ${id}: ${e.message}`);
            Object.assign(err, e);
            throw err;
        });
    }
    /**
     * @param arg - either JS object of query parameters or Query instance
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving search results
     */
    searchOrgs(arg, options) {
        return this.createAndResolvePromise(arg)
            .then(params => {
            let ps = params.getQuery();
            let opts = this.buildRequest({
                method: "GET",
                url: this.baseUrl + '/orgs',
                params: ps,
                options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`AgolService.searchOrgs() - Error searching orgs: ${e.message}`);
            Object.assign(err, e);
            throw err;
        });
    }
    // -----------------------------------------------------------------------
    // AGOL GROUPS METHODS
    /**
     * @param id - identifier of AGOL group to fetch
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving Item object or an error
     */
    getGroup(id, options) {
        return this.createAndResolvePromise(id)
            .then(id => {
            let opts = this.buildRequest({
                method: "GET", url: this.baseUrl + '/groups/' + id, options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`AgolService.getGroup() - Error fetching group ${id}: ${e.message}`);
            Object.assign(err, e);
            throw err;
        });
    }
    /**
     * @param arg - either JS object of query parameters or AgolQuery instance
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving search results
     */
    searchGroups(arg, options) {
        return this.createAndResolvePromise(arg)
            .then(params => {
            let ps = params.getQuery();
            let opts = this.buildRequest({
                method: "GET",
                url: this.baseUrl + '/groups',
                params: ps,
                options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`AgolService.searchGroups() - Error searching groups: ${e.message}`);
            Object.assign(err, e);
            throw err;
        });
    }
    // -----------------------------------------------------------------------
    // AGOL ITEMS METHODS
    /**
     * @param id - identifier of AGOL item to fetch
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving Item object or an error
     */
    getItem(id, options) {
        return this.createAndResolvePromise(id)
            .then((id) => {
            let opts = this.buildRequest({
                method: "GET",
                url: this.baseUrl + '/items/' + id,
                options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`AgolService.getItem() - Error fetching item ${id}: ${e.message}`);
            Object.assign(err, e);
            throw err;
        });
    }
    /**
     * @param arg - either JS object of query parameters or AgolQuery instance
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving search results
     */
    searchItems(arg, options) {
        return this.createAndResolvePromise(arg)
            .then(params => {
            let ps = params.getQuery();
            let opts = this.buildRequest({
                method: "GET",
                url: this.baseUrl + '/items',
                params: ps,
                options: options
            });
            return this.execute(opts);
        })
            .catch(e => {
            let err = new Error(`AgolService.searchItems() - Error searching items: ${e.message}`);
            Object.assign(err, e);
            throw err;
        });
    }
    /* --------------------------- */
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
        let ids = obj.identifiers.filter((id) => ~id.indexOf('agol:'));
        if (!ids.length)
            return null;
        return ids[0].replace('agol:', '');
    }
}

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
    COMMUNITY_PAGE: 'Community Page',
    APP_PAGE: 'Application Page',
};
const Events = {
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
    let result = Categories.UNKNOWN;
    if (type) {
        let cats = Object.keys(Categories).map((k) => Categories[k]);
        //if existing category was specified
        if (~cats.indexOf(type))
            return type;
        //if an ItemType with prefix was specified (strip off prefix)
        else if (~type.indexOf(':')) {
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
    getCategory() { return this.category; }
    getType() { return this.type; }
    getItem() { return this.item; }
    setItem(item) { this.item = item ? (item.id || item) : null; }
    getRelated() { return this.related; }
    setRelated(related) {
        this.related = related ? (related.id || related) : null;
    }
}
/**
 * @param eventType - type of event being created
 * @param item - GeoPlatform Item instance
 * @return list of event objects
 */
function TrackingEventFactory(eventType, item) {
    let result = [];
    if (eventType && item && item.type) {
        if (ItemTypes.MAP === item.type) {
            result.push(new Event(Categories.MAP, eventType, item));
            if (Events.DISPLAYED === eventType) {
                item.layers.forEach((layerState) => {
                    if (layerState.layer) {
                        let layerEvents = TrackingEventFactory(eventType, layerState.layer)
                            .filter(e => e !== null);
                        if (layerEvents && layerEvents.length) {
                            result = result.concat(layerEvents);
                        }
                    }
                });
                if (item.baseLayer) {
                    let baseEvents = TrackingEventFactory(eventType, item.baseLayer)
                        .filter(e => e !== null);
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
    logEvent(category, event, item, 
    // @ts-ignore
    related) {
        console.log("Event (" + category + ") - " + event + " : " + item);
    }
    logPageView(view, data) {
        console.log("Page View " + view + (data ? " : " + JSON.stringify(data) : ''));
    }
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
    constructor(options) {
        this.provider = null;
        if (options && typeof (options) === 'object')
            Object.assign(this, options);
        if (!this.provider)
            this.setProvider(new DefaultTrackingServiceProvider());
    }
    /**
     * @param provider -
     */
    setProvider(provider) {
        if (provider)
            this.provider = provider;
    }
    /**
     * @param event - event to log
     * @return TrackingService
     */
    event(event) {
        this.logEvent(event);
        return this;
    }
    /**
     * @param event - event to log
     */
    logEvent(event) {
        if (!this.provider || !this.provider.logEvent || !event)
            return;
        if (Array.isArray(event)) {
            let events = event;
            events.forEach((evt) => this.logEvent(evt));
        }
        else {
            let evt = event;
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
     * @param view - name of the view being activated
     * @param data - additional context to supply for the event
     * @return TrackingService
     * @deprecated use svc.event( new Event(EventCategories.APP_PAGE, EventTypes.VIEWED, pageId) )
     */
    pageView(view, data) {
        this.logPageView(view, data);
        return this;
    }
    /**
     * @param view - name of the view being activated
     * @param data - additional context to supply for the event
     * @deprecated use svc.logEvent( new Event(EventCategories.APP_PAGE, EventTypes.VIEWED, pageId) )
     */
    logPageView(view, 
    // @ts-ignore
    data) {
        if (this.provider && this.provider.logPageView) {
            this.provider.logPageView(view, data);
        }
        else {
            this.logEvent(new Event(Categories.APP_PAGE, Events.VIEWED, view));
        }
    }
    /**
     * @param params
     * @param resultCount
     */
    logSearch(params, resultCount) {
        if (this.provider.logSearch)
            this.provider.logSearch(params, resultCount);
    }
}

class KGService extends BaseService {
    // @ts-ignore
    // private apiBase : string;
    // @ts-ignore
    // private baseUrl : string;
    // private client : GPHttpClient;
    // private timeout : number = 30000;
    // private httpMethods : string[] = ["GET", "POST", "PUT", "DELETE", "PATCH"];
    constructor(url, httpClient) {
        super(url, httpClient);
    }
    setUrl(baseUrl) {
        super.setUrl(baseUrl);
        this.baseUrl = baseUrl + '/api/recommender';
    }
    /**
     * @param query - optional query parameters to include with request
     * @param options - optional config to send with http request
     * @return Promise resolving recommended concepts as search results
     */
    suggest(query, options) {
        let url = this.baseUrl + '/suggest';
        return this._search(url, query, options)
            .catch(e => {
            this.logError('KGService.suggest() - ' + e.message);
            let err = new Error(`Error suggesting concepts: ${e.message}`);
            Object.assign(err, e);
            throw err;
        });
    }
    /**
     * @param query - optional query parameters to include with request
     * @param options - optional config to send with http request
     * @return Promise resolving concept types as search results
     */
    types(query, options) {
        let url = this.baseUrl + '/types';
        return this._search(url, query, options)
            .catch(e => {
            this.logError('KGService.types() - ' + e.message);
            let err = new Error(`Error searching types: ${e.message}`);
            Object.assign(err, e);
            throw err;
        });
    }
    /**
     * @param query - optional query parameters to include with request
     * @param options - optional config to send with http request
     * @return Promise resolving concept sources as search results
     */
    sources(query, options) {
        let url = this.baseUrl + '/sources';
        return this._search(url, query, options)
            .catch(e => {
            this.logError('KGService.sources() - ' + e.message);
            let err = new Error(`Error searching sources: ${e.message}`);
            Object.assign(err, e);
            throw err;
        });
    }
    /* ----------------------------------------------------------- */
    /**
     * internal method used by exposed methods
     */
    _search(url, query, options) {
        return this.createAndResolvePromise(url)
            .then((url) => {
            let q = query.getQuery();
            let opts = this.buildRequest({
                method: "GET", url: url, params: q, options: options
            });
            return this.execute(opts);
        });
    }
}

/**
 * @param arg - string type or object with type property
 * @param baseUrl - base endpoint of GeoPlatform API
 * @return ItemService
 */
const ServiceFactory = function (arg, baseUrl, httpClient) {
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
const ɵ0$2 = ServiceFactory;

/*
    Version of the library exposed to consumers.
    Long-term this value should be auto-set to be whatever is set in package.json
 */
const ClientVersion = "0.3.0";
polyfills();

/**
 * Generated bundle index. Do not edit.
 */

export { BaseService as AbstractService, AgolQuery, AgolService, ClientVersion, Config, DatasetService, GPError, GPHttpClient, GalleryService, ItemService, ItemTypeLabels, ItemTypes, Classifiers as KGClassifiers, KGQuery, KGService, LayerService, MapService, Query, Facets as QueryFacets, queryFactory as QueryFactory, Fields as QueryFields, Parameters as QueryParameters, ServiceFactory, ServiceService, Categories as TrackingCategories, Event as TrackingEvent, TrackingEventFactory, TrackingService, Events as TrackingTypes, factoryFn as URIFactory, UtilsService, XHRHttpClient };
//# sourceMappingURL=geoplatform-client.js.map
