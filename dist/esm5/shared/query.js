/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import Parameters from './parameters';
/**
 * @record
 * @template U
 */
function KVP() { }
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
var SORT_OPTIONS_DEFAULT = [
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
var /**
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
    Query.prototype.clear = /**
     *
     * @return {?}
     */
    function () {
        this.query = JSON.parse(JSON.stringify(this.defaultQuery));
    };
    return Query;
}());
if (false) {
    /** @type {?} */
    Query.prototype.query;
    /** @type {?} */
    Query.prototype.defaultQuery;
}
export { Query as default, Query, Fields, Facets };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50LyIsInNvdXJjZXMiOlsic2hhcmVkL3F1ZXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLFVBQVUsTUFBTSxjQUFjLENBQUM7Ozs7Ozs7QUFJdEMsSUFBTSxNQUFNLEdBQWlCO0lBQ3pCLGFBQWEsRUFBUyxRQUFRO0lBQzlCLGdCQUFnQixFQUFNLGlCQUFpQjtJQUN2QyxXQUFXLEVBQVcsYUFBYTtJQUNuQyxXQUFXLEVBQVcsYUFBYTtJQUNuQyxjQUFjLEVBQVEsUUFBUTtJQUM5QixRQUFRLEVBQWMsVUFBVTtJQUNoQyxPQUFPLEVBQWUsU0FBUztJQUMvQixVQUFVLEVBQVksV0FBVztJQUNqQyxRQUFRLEVBQWMsVUFBVTtJQUNoQyxXQUFXLEVBQVcsYUFBYTtJQUNuQyxhQUFhLEVBQVMsZUFBZTtJQUNyQyxNQUFNLEVBQWdCLFFBQVE7SUFDOUIsYUFBYSxFQUFTLE9BQU87SUFDN0IsSUFBSSxFQUFrQixNQUFNO0lBQzVCLFdBQVcsRUFBVyxhQUFhO0lBQ25DLFFBQVEsRUFBYyxVQUFVO0lBQ2hDLEtBQUssRUFBaUIsT0FBTztJQUM3QixnQkFBZ0IsRUFBTSxnQkFBZ0I7SUFDdEMsTUFBTSxFQUFnQixRQUFRO0lBQzlCLFVBQVUsRUFBWSxXQUFXO0lBQ2pDLFVBQVUsRUFBWSxXQUFXO0lBQ2pDLE1BQU0sRUFBZ0IsUUFBUTtJQUM5QixRQUFRLEVBQWMsVUFBVTtJQUNoQyxZQUFZLEVBQVUsYUFBYTtJQUNuQyxVQUFVLEVBQVksWUFBWTtJQUNsQyxjQUFjLEVBQVEsZUFBZTtJQUNyQyxZQUFZLEVBQVUsYUFBYTtJQUNuQyxRQUFRLEVBQWMsVUFBVTtJQUNoQyxPQUFPLEVBQWUsU0FBUztJQUMvQixVQUFVLEVBQVksWUFBWTtJQUNsQyxNQUFNLEVBQWdCLFFBQVE7SUFDOUIsVUFBVSxFQUFZLFdBQVc7SUFDakMsUUFBUSxFQUFjLFVBQVU7SUFDaEMs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SUFFRCw0QkFBWTs7O0lBQVo7O1FBQ0ksSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzNCLE9BQU8sS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztLQUM3RDtJQUVEOztPQUVHOzs7O0lBQ0gsOEJBQWM7OztJQUFkO1FBQ0ksT0FBTyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDeEM7SUFHRCw4REFBOEQ7SUFHOUQ7O09BRUc7Ozs7O0lBQ0gscUJBQUs7Ozs7SUFBTDtRQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO0tBQzlEO2dCQS9pQ0w7SUFnakNDLENBQUE7Ozs7Ozs7QUFFRCxPQUFPLEVBQ0gsS0FBSyxJQUFJLE9BQU8sRUFDaEIsS0FBSyxFQUNMLE1BQU0sRUFDTixNQUFNLEVBQ1QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IFBhcmFtZXRlcnMgZnJvbSAnLi9wYXJhbWV0ZXJzJztcblxuaW50ZXJmYWNlIEtWUDxVPiB7IFsga2V5IDogc3RyaW5nIF0gOiBVIH1cblxuY29uc3QgRmllbGRzIDogS1ZQPHN0cmluZz4gPSB7XG4gICAgQUNDRVNTX1JJR0hUUyAgICAgICA6ICdyaWdodHMnLFxuICAgIEFMVEVSTkFURV9USVRMRVMgICAgOiAnYWx0ZXJuYXRlVGl0bGVzJyxcbiAgICBBTk5PVEFUSU9OUyAgICAgICAgIDogJ2Fubm90YXRpb25zJyxcbiAgICBDTEFTU0lGSUVSUyAgICAgICAgIDogJ2NsYXNzaWZpZXJzJyxcbiAgICBDT05DRVBUX1NDSEVNRSAgICAgIDogJ3NjaGVtZScsXG4gICAgQ09OVEFDVFMgICAgICAgICAgICA6ICdjb250YWN0cycsXG4gICAgQ1JFQVRFRCAgICAgICAgICAgICA6ICdjcmVhdGVkJyxcbiAgICBDUkVBVEVEX0JZICAgICAgICAgIDogJ2NyZWF0ZWRCeScsXG4gICAgREFUQVNFVFMgICAgICAgICAgICA6ICdkYXRhc2V0cycsXG4gICAgREVTQ1JJUFRJT04gICAgICAgICA6ICdkZXNjcmlwdGlvbicsXG4gICAgRElTVFJJQlVUSU9OUyAgICAgICA6ICdkaXN0cmlidXRpb25zJyxcbiAgICBFWFRFTlQgICAgICAgICAgICAgIDogJ2V4dGVudCcsXG4gICAgR0FMTEVSWV9JVEVNUyAgICAgICA6ICdpdGVtcycsXG4gICAgSFJFRiAgICAgICAgICAgICAgICA6ICdocmVmJyxcbiAgICBJREVOVElGSUVSUyAgICAgICAgIDogJ2lkZW50aWZpZXJzJyxcbiAgICBLRVlXT1JEUyAgICAgICAgICAgIDogJ2tleXdvcmRzJyxcbiAgICBMQUJFTCAgICAgICAgICAgICAgIDogJ2xhYmVsJyxcbiAgICBMQVNUX01PRElGSUVEX0JZICAgIDogJ2xhc3RNb2RpZmllZEJ5JyxcbiAgICBMQVlFUlMgICAgICAgICAgICAgIDogJ2xheWVycycsXG4gICAgTEFZRVJfVFlQRSAgICAgICAgICA6ICdsYXllclR5cGUnLFxuICAgIExBWUVSX05BTUUgICAgICAgICAgOiAnbGF5ZXJOYW1lJyxcbiAgICBMRUdFTkQgICAgICAgICAgICAgIDogJ2xlZ2VuZCcsXG4gICAgTU9ESUZJRUQgICAgICAgICAgICA6ICdtb2RpZmllZCcsXG4gICAgUEFSRU5UX0xBWUVSICAgICAgICA6ICdwYXJlbnRMYXllcicsXG4gICAgUFVCTElTSEVSUyAgICAgICAgICA6ICdwdWJsaXNoZXJzJyxcbiAgICBSRVNPVVJDRV9UWVBFUyAgICAgIDogJ3Jlc291cmNlVHlwZXMnLFxuICAgIFNFUlZJQ0VfVFlQRSAgICAgICAgOiAnc2VydmljZVR5cGUnLFxuICAgIFNFUlZJQ0VTICAgICAgICAgICAgOiAnc2VydmljZXMnLFxuICAgIFNQQVRJQUwgICAgICAgICAgICAgOiAnc3BhdGlhbCcsXG4gICAgU1RBVElTVElDUyAgICAgICAgICA6ICdzdGF0aXN0aWNzJyxcbiAgICBTVEFUVVMgICAgICAgICAgICAgIDogJ3N0YXR1cycsXG4gICAgU1VCX0xBWUVSUyAgICAgICAgICA6ICdzdWJMYXllcnMnLFxuICAgIFRFTVBPUkFMICAgICAgICAgICAgOiAndGVtcG9yYWwnLFxuICAgIFRIRU1FUyAgICAgICAgICAgICAgOiAndGhlbWVzJyxcbiAgICBUSFVNQk5BSUwgICAgICAgICAgIDogJ3RodW1ibmFpbCcsXG4gICAgVE9QSUNTICAgICAgICAgICAgICA6ICd0b3BpY3MnLFxuICAgIFVTRURfQlkgICAgICAgICAgICAgOiAndXNlZEJ5JyxcbiAgICBWSVNJQklMSVRZICAgICAgICAgIDogJ3Zpc2liaWxpdHknLFxuICAgIExBTkRJTkdfUEFHRSAgICAgICAgOiAnbGFuZGluZ1BhZ2UnXG59O1xuXG5jb25zdCBGSUVMRFNfREVGQVVMVCA6IHN0cmluZ1tdID0gW1xuICAgIEZpZWxkcy5DUkVBVEVELCBGaWVsZHMuTU9ESUZJRUQsIEZpZWxkcy5DUkVBVEVEX0JZLFxuICAgIEZpZWxkcy5QVUJMSVNIRVJTLCBGaWVsZHMuVEhFTUVTLCBGaWVsZHMuREVTQ1JJUFRJT05cbl07XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5jb25zdCBGYWNldHMgOiBLVlA8c3RyaW5nPiA9IHtcbiAgICBBTFRFUk5BVEVfVElUTEVTICAgIDogJ2FsdGVybmF0ZVRpdGxlcycsXG4gICAgQ09OQ0VQVF9TQ0hFTUVTICAgICA6ICdzY2hlbWVzJyxcbiAgICBDUkVBVEVEX0JZICAgICAgICAgIDogJ2NyZWF0ZWRCeScsXG4gICAgSFJFRiAgICAgICAgICAgICAgICA6ICdocmVmJyxcbiAgICBJREVOVElGSUVSUyAgICAgICAgIDogXCJpZGVudGlmaWVyc1wiLFxuICAgIExBWUVSX1RZUEUgICAgICAgICAgOiAnbGF5ZXJUeXBlJyxcbiAgICBMQVlFUl9OQU1FICAgICAgICAgIDogJ2xheWVyTmFtZScsXG4gICAgTElLRVMgICAgICAgICAgICAgICA6ICdsaWtlcycsXG4gICAgT05MSU5FICAgICAgICAgICAgICA6ICdvbmxpbmUnLFxuICAgIFBVQkxJU0hFUlMgICAgICAgICAgOiAncHVibGlzaGVycycsXG4gICAgQ09OVEFDVFMgICAgICAgICAgICA6ICdjb250YWN0cycsXG4gICAgUkVMSUFCSUxJVFkgICAgICAgICA6ICdyZWxpYWJpbGl0eScsXG4gICAgU0VSVklDRV9UWVBFUyAgICAgICA6ICdzZXJ2aWNlVHlwZXMnLFxuICAgIFNQRUVEICAgICAgICAgICAgICAgOiAnc3BlZWQnLFxuICAgIFNUQVRVUyAgICAgICAgICAgICAgOiAnc3RhdHVzJyxcbiAgICBUSEVNRVMgICAgICAgICAgICAgIDogJ3RoZW1lcycsXG4gICAgVE9QSUNTICAgICAgICAgICAgICA6ICd0b3BpY3MnLFxuICAgIFRZUEVTICAgICAgICAgICAgICAgOiAndHlwZScsICAgLy9UT0RPIGNoYW5nZSB0byAndHlwZXMnXG4gICAgVVNFRF9CWSAgICAgICAgICAgICA6ICd1c2VkQnknLFxuICAgIFZJRVdTICAgICAgICAgICAgICAgOiAndmlld3MnLFxuICAgIFZJU0lCSUxJVFkgICAgICAgICAgOiAndmlzaWJpbGl0eSdcbn07XG5cbmNvbnN0IEZBQ0VUU19ERUZBVUxUIDogc3RyaW5nW10gPSBbXG4gICAgRmFjZXRzLlRZUEVTLFxuICAgIEZhY2V0cy5QVUJMSVNIRVJTLFxuICAgIEZhY2V0cy5TRVJWSUNFX1RZUEVTLFxuICAgIEZhY2V0cy5DT05DRVBUX1NDSEVNRVMsXG4gICAgRmFjZXRzLlZJU0lCSUxJVFksXG4gICAgRmFjZXRzLkNSRUFURURfQllcbl07XG5cblxuLypcbiAgICBNYXAgZmFjZXQga2V5cyB0byBwYXJhbWV0ZXJzIHNvIGNsaWVudHMgY2FuIHNldFxuICAgIHF1ZXJ5IHBhcmFtcyB1c2luZyBmYWNldGVkIHJlc3VsdHNcblxuICAgIC8vVE9ETyByZW1vdmUgdGhlc2UgYW5kIHRoZWlyIGZ1bmN0aW9uIGJlbG93XG4gKi9cbmNvbnN0IEZhY2V0VG9QYXJhbSA6IEtWUDxzdHJpbmc+ID0ge307XG5GYWNldFRvUGFyYW1bRmFjZXRzLlRZUEVTXSAgICAgICAgICAgPSBQYXJhbWV0ZXJzLlRZUEVTO1xuRmFjZXRUb1BhcmFtW0ZhY2V0cy5USEVNRVNdICAgICAgICAgID0gUGFyYW1ldGVycy5USEVNRVNfSUQ7XG5GYWNldFRvUGFyYW1bRmFjZXRzLlRPUElDU10gICAgICAgICAgPSBQYXJhbWV0ZXJzLlRPUElDU19JRDtcbkZhY2V0VG9QYXJhbVtGYWNldHMuUFVCTElTSEVSU10gICAgICA9IFBhcmFtZXRlcnMuUFVCTElTSEVSU19JRDtcbkZhY2V0VG9QYXJhbVtGYWNldHMuQ09OVEFDVFNdICAgICAgICA9IFBhcmFtZXRlcnMuQ09OVEFDVFNfSUQ7XG5GYWNldFRvUGFyYW1bRmFjZXRzLkNPTkNFUFRfU0NIRU1FU10gPSBQYXJhbWV0ZXJzLlNDSEVNRVNfSUQ7XG5GYWNldFRvUGFyYW1bRmFjZXRzLlVTRURfQlldICAgICAgICAgPSBQYXJhbWV0ZXJzLlVTRURfQllfSUQ7XG5cblxuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXG5jb25zdCBTT1JUX09QVElPTlNfREVGQVVMVCA6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgfVtdID0gW1xuICAgIHsgdmFsdWU6XCJsYWJlbCxhc2NcIiwgICAgICAgbGFiZWw6IFwiTmFtZSAoQS1aKVwiICAgICAgICAgICAgICB9LFxuICAgIHsgdmFsdWU6XCJsYWJlbCxkZXNjXCIsICAgICAgbGFiZWw6IFwiTmFtZSAoWi1BKVwiICAgICAgICAgICAgICB9LFxuICAgIHsgdmFsdWU6XCJ0eXBlLGFzY1wiLCAgICAgICAgbGFiZWw6IFwiVHlwZSAoQS1aKVwiICAgICAgICAgICAgICB9LFxuICAgIHsgdmFsdWU6XCJ0eXBlLGRlc2NcIiwgICAgICAgbGFiZWw6IFwiVHlwZSAoWi1BKVwiICAgICAgICAgICAgICB9LFxuICAgIHsgdmFsdWU6XCJtb2RpZmllZCxkZXNjXCIsICAgbGFiZWw6IFwiTW9zdCByZWNlbnRseSBtb2RpZmllZFwiICB9LFxuICAgIHsgdmFsdWU6XCJtb2RpZmllZCxhc2NcIiwgICAgbGFiZWw6IFwiTGVhc3QgcmVjZW50bHkgbW9kaWZpZWRcIiB9LFxuICAgIHsgdmFsdWU6XCJfc2NvcmUsZGVzY1wiLCAgICAgbGFiZWw6IFwiUmVsZXZhbmNlXCIgICAgICAgICAgICAgICB9XG5dO1xuXG5cbmNvbnN0IEJCT1hfUkVHRVggPSAvXlxcLT9cXGQrKFxcLlxcZCopPyxcXC0/XFxkKyhcXC5cXGQqKT8sXFwtP1xcZCsoXFwuXFxkKik/LFxcLT9cXGQrKFxcLlxcZCopPyQvO1xuXG5cbmZ1bmN0aW9uIHRvQXJyYXkodmFsdWUgOiBhbnkpIDogYW55IHwgbnVsbCB7XG4gICAgbGV0IHJlc3VsdCA9IHZhbHVlO1xuICAgIC8vaWYgZ2l2ZW4gYSBub24tYXJyYXkgdmFsdWUsIHdyYXAgaW4gYXJyYXlcbiAgICBpZihyZXN1bHQgIT09IG51bGwgJiYgdHlwZW9mKHJlc3VsdC5wdXNoKSA9PT0gJ3VuZGVmaW5lZCcpIHJlc3VsdCA9IFtyZXN1bHRdO1xuICAgIC8vaWYgYXJyYXkgdmFsdWUgaXMgZW1wdHksIG51bGxpZnkgdGhlIHJlc3VsdFxuICAgIGlmKHJlc3VsdCAhPT0gbnVsbCAmJiAhcmVzdWx0Lmxlbmd0aCkgcmVzdWx0ID0gbnVsbDtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqXG4gKiBRdWVyeVxuICpcbiAqIFNwZWNpZnkgdGhlIFwiZGVmYXVsdFwiIHF1ZXJ5IGNvbnN0cmFpbnRzIHRvIHVzZSBieSBwYXNzaW5nIGluICdvcHRpb25zLmRlZmF1bHRzID0gey4uLn0nO1xuICpcbiAqL1xuY2xhc3MgUXVlcnkge1xuXG4gICAgcHVibGljIHF1ZXJ5IDogS1ZQPGFueT47XG4gICAgcHJpdmF0ZSBkZWZhdWx0UXVlcnkgOiBLVlA8YW55PjtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gc2V0IG9mIGluaXRpYWwgY29uc3RyYWludHNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID86IEtWUDxhbnk+KSB7XG4gICAgICAgIHRoaXMuZGVmYXVsdFF1ZXJ5ID0geyB9O1xuICAgICAgICB0aGlzLmRlZmF1bHRRdWVyeVtQYXJhbWV0ZXJzLlBBR0UudG9TdHJpbmcoKV0gPSAwO1xuICAgICAgICB0aGlzLmRlZmF1bHRRdWVyeVtQYXJhbWV0ZXJzLlBBR0VfU0laRS50b1N0cmluZygpXSA9IDEwO1xuICAgICAgICB0aGlzLmRlZmF1bHRRdWVyeVtQYXJhbWV0ZXJzLlNPUlQudG9TdHJpbmcoKV0gPSBcIm1vZGlmaWVkLGRlc2NcIjtcbiAgICAgICAgdGhpcy5kZWZhdWx0UXVlcnlbUGFyYW1ldGVycy5GSUVMRFMudG9TdHJpbmcoKV0gPSBGSUVMRFNfREVGQVVMVC5zbGljZSgwKTtcbiAgICAgICAgdGhpcy5kZWZhdWx0UXVlcnlbUGFyYW1ldGVycy5GQUNFVFMudG9TdHJpbmcoKV0gPSBGQUNFVFNfREVGQVVMVC5zbGljZSgwKTtcbiAgICAgICAgaWYob3B0aW9ucyAmJiBvcHRpb25zLmRlZmF1bHRzKSB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuZGVmYXVsdFF1ZXJ5LCBvcHRpb25zLmRlZmF1bHRzKTtcbiAgICAgICAgICAgIGRlbGV0ZSBvcHRpb25zLmRlZmF1bHRzO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucXVlcnkgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMuZGVmYXVsdFF1ZXJ5KSk7XG4gICAgICAgIGlmKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlQYXJhbWV0ZXJzKG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIGNvbnRhaW5pbmcgcmVxdWVzdC1yZWFkeSBwYXJhbWV0ZXJzL3ZhbHVlc1xuICAgICAqL1xuICAgIGdldFF1ZXJ5KCkgOiBLVlA8YW55PiB7XG4gICAgICAgIGxldCByZXN1bHQgOiBLVlA8YW55PiA9IHt9O1xuICAgICAgICBmb3IobGV0IHByb3AgaW4gdGhpcy5xdWVyeSkge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5xdWVyeVtwcm9wXTtcbiAgICAgICAgICAgIGlmKHZhbHVlICE9PSBudWxsICYmIHR5cGVvZih2YWx1ZS5wdXNoKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLmpvaW4oJywnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdFtwcm9wXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiBRdWVyeVxuICAgICAqL1xuICAgIGNsb25lKCkgOiBRdWVyeSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBuZXcgUXVlcnkoKTtcbiAgICAgICAgbGV0IGpzb24gPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMucXVlcnkpKTtcbiAgICAgICAgcmVzdWx0LmFwcGx5UGFyYW1ldGVycyhqc29uKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbmFtZVxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEByZXR1cm4gUXVlcnkgdGhpc1xuICAgICAqL1xuICAgIHBhcmFtZXRlcihuYW1lIDogc3RyaW5nLCB2YWx1ZSA6IGFueSkgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKG5hbWUsIHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG5hbWVcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKi9cbiAgICBzZXRQYXJhbWV0ZXIgKG5hbWUgOiBzdHJpbmcsIHZhbHVlOiBhbnkpIDogdm9pZCB7XG4gICAgICAgIGlmKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgLy9pZiBubyB2YWx1ZSB3YXMgcHJvdmlkZVxuICAgICAgICAgICAgKHR5cGVvZih2YWx1ZS5wdXNoKSAhPT0gJ3VuZGVmaW5lZCcgJiYgIXZhbHVlLmxlbmd0aCkpIC8vb3IgZW1wdHkgYXJyYXlcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnF1ZXJ5W25hbWVdO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLnF1ZXJ5W25hbWVdID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGtleSAtIG5hbWUgb2YgcGFyYW1ldGVyXG4gICAgICogQHJldHVybiB2YWx1ZSBvZiBwYXJhbWV0ZXJcbiAgICAgKi9cbiAgICBnZXRQYXJhbWV0ZXIgKGtleSA6IHN0cmluZykgOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5xdWVyeVtrZXldO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBvYmogLSBzZXQgb2YgcGFyYW1ldGVyL3ZhbHVlcyB0byBhcHBseSB0byB0aGlzIHF1ZXJ5XG4gICAgICovXG4gICAgYXBwbHlQYXJhbWV0ZXJzIChvYmogOiBLVlA8YW55PikgOiB2b2lkIHvCoFxuICAgICAgICBmb3IobGV0IHAgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZihvYmouaGFzT3duUHJvcGVydHkocCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihwIGFzIHN0cmluZywgb2JqW3BdIGFzIGFueSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZmFjZXQgLSBuYW1lIG9mIGZhY2V0IHRvIHNldCB0aGUgdmFsdWUgZm9yIGFzIGEgcGFyYW1ldGVyXG4gICAgICogQHBhcmFtIHZhbHVlIC0gdmFsdWUgb2YgdGhlIGZhY2V0IHRvIHVzZSBhcyB0aGUgcGFyYW1ldGVyJ3MgdmFsdWVcbiAgICAgKi9cbiAgICAgLy9UT0RPIHJlbW92ZSB0aGlzIGZ1bmN0aW9uXG4gICAgc2V0RmFjZXRQYXJhbWV0ZXIgKGZhY2V0OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIDogdm9pZCB7XG4gICAgICAgIGxldCBwYXJhbSA6IHN0cmluZyA9IEZhY2V0VG9QYXJhbVtmYWNldF07XG4gICAgICAgIGlmKCFwYXJhbSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJXQVJOIDogUXVlcnkuYXBwbHlGYWNldFBhcmFtZXRlcigpIC0gXCIgK1xuICAgICAgICAgICAgICAgIFwidW5hYmxlIHRvIG1hcCBmYWNldCB0byBrbm93biBwYXJhbWV0ZXIgJ1wiICsgZmFjZXQgKyBcIicsIHVzaW5nIFwiICtcbiAgICAgICAgICAgICAgICBcImFzIGRpcmVjdCBwYXJhbWV0ZXIgd2hpY2ggbWF5IG5vdCBvcGVyYXRlIGFzIGludGVuZGVkXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKHBhcmFtfHxmYWNldCwgdmFsdWUpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB0ZXh0XG4gICAgICogQHJldHVybiBRdWVyeSB0aGlzXG4gICAgICovXG4gICAgcSh0ZXh0IDogc3RyaW5nKSA6IFF1ZXJ5IHsgdGhpcy5zZXRRKHRleHQpOyByZXR1cm4gdGhpczsgfVxuXG4gICAgLyoqIEBwYXJhbSB0ZXh0IC0gZnJlZSB0ZXh0IHF1ZXJ5ICovXG4gICAgc2V0USAodGV4dCA6IHN0cmluZykgOiB2b2lkIHsgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5RVUVSWSwgdGV4dCk7IH1cbiAgICAvKiogQHJldHVybiAqL1xuICAgIGdldFEoKSA6IHN0cmluZyB7IHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlFVRVJZKSBhcyBzdHJpbmc7IH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAga2V5d29yZHModGV4dCA6IHN0cmluZ3xzdHJpbmdbXSkgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0S2V5d29yZHModGV4dCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB0ZXh0IC0gZnJlZSB0ZXh0IHF1ZXJ5XG4gICAgICovXG4gICAgc2V0S2V5d29yZHMgKHRleHQgOiBzdHJpbmd8c3RyaW5nW10pIDogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuS0VZV09SRFMsIHRvQXJyYXkodGV4dCkpO1xuICAgIH1cblxuICAgIGdldEtleXdvcmRzKCkgOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLktFWVdPUkRTKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIHVyaSAodXJpIDogc3RyaW5nKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRVcmkodXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0VXJpKHVyaSA6IHN0cmluZykge1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlVSSSwgdXJpKTtcbiAgICB9XG5cbiAgICBnZXRVcmkoKSA6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlVSSSk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICB0eXBlcyh0eXBlcyA6IHN0cmluZ3xzdHJpbmdbXSkgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0VHlwZXModHlwZXMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gdHlwZXMgLSBuYW1lIG9mIGNsYXNzKGVzKSB0byByZXF1ZXN0XG4gICAgICovXG4gICAgc2V0VHlwZXMgKHR5cGVzIDogc3RyaW5nfHN0cmluZ1tdKSB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVFlQRVMsIHRvQXJyYXkodHlwZXMpKTtcbiAgICB9XG5cbiAgICBnZXRUeXBlcyAoKSA6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVFlQRVMpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgY3JlYXRlZEJ5KHVzZXIgOiBzdHJpbmcpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldENyZWF0ZWRCeSh1c2VyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqIEBwYXJhbSB1c2VyIC0gdXNlcm5hbWUgKi9cbiAgICBzZXRDcmVhdGVkQnkgKHVzZXIgOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5DUkVBVEVEX0JZLCB1c2VyKTtcbiAgICB9XG5cbiAgICAvKiogQHJldHVybiB1c2VybmFtZSAqL1xuICAgIGdldENyZWF0ZWRCeSAoKSA6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkNSRUFURURfQlkpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgbGFzdE1vZGlmaWVkQnkodXNlciA6IHN0cmluZykgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0TGFzdE1vZGlmaWVkQnkodXNlcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKiBAcGFyYW0gdXNlciAtIHVzZXJuYW1lICovXG4gICAgc2V0TGFzdE1vZGlmaWVkQnkgKHVzZXI6IHN0cmluZykge1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkxBU1RfTU9ESUZJRURfQlksIHVzZXIpO1xuICAgIH1cblxuICAgIC8qKiBAcmV0dXJuIHVzZXJuYW1lICovXG4gICAgZ2V0TGFzdE1vZGlmaWVkQnkgKCkgOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5MQVNUX01PRElGSUVEX0JZKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgYSBUaGVtZSBvciBzZXQgb2YgVGhlbWVzIHRvIGNvbnN0cmFpbiByZXN1bHRzLiBCeVxuICAgICAqIGRlZmF1bHQsIHZhbHVlcyBhcmUgYXNzdW1lZCB0byBiZSB0aGVtZSBpZGVudGlmaWVycy4gSWYgdXNpbmdcbiAgICAgKiB0aGVtZSBsYWJlbHMgb3IgdGhlbWUgdXJpcywgc3BlY2lmeSB0aGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlclxuICAgICAqIHRvIGJlIGVpdGhlciBQYXJhbWV0ZXJzLlRIRU1FU19MQUJFTCBvciBQYXJhbWV0ZXJzLlRIRU1FU19VUklcbiAgICAgKiByZXNwZWN0aXZlbHkuXG4gICAgICogQHBhcmFtIHRoZW1lcyAtIHN0cmluZyBvciBhcnJheSBvZiBzdHJpbmdzIGNvbnRhaW5pbmcgdGhlbWUgY29uc3RyYWludFxuICAgICAqIEBwYXJhbSBwYXJhbWV0ZXIgLSBvcHRpb25hbCwgdG8gaW5kaWNhdGUgdGhlIHBhcmFtZXRlciB0byB1c2VcbiAgICAgKiBAcmV0dXJuIFF1ZXJ5XG4gICAgICovXG4gICAgdGhlbWVzKHRoZW1lczogc3RyaW5nfHN0cmluZ1tdLCBwYXJhbWV0ZXI/OnN0cmluZykgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0VGhlbWVzKHRoZW1lcywgcGFyYW1ldGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IGEgVGhlbWUgb3Igc2V0IG9mIFRoZW1lcyB0byBjb25zdHJhaW4gcmVzdWx0cy4gQnlcbiAgICAgKiBkZWZhdWx0LCB2YWx1ZXMgYXJlIGFzc3VtZWQgdG8gYmUgdGhlbWUgaWRlbnRpZmllcnMuIElmIHVzaW5nXG4gICAgICogdGhlbWUgbGFiZWxzIG9yIHRoZW1lIHVyaXMsIHNwZWNpZnkgdGhlIG9wdGlvbmFsIHNlY29uZCBwYXJhbWV0ZXJcbiAgICAgKiB0byBiZSBlaXRoZXIgUGFyYW1ldGVycy5USEVNRVNfTEFCRUwgb3IgUGFyYW1ldGVycy5USEVNRVNfVVJJXG4gICAgICogcmVzcGVjdGl2ZWx5LlxuICAgICAqIEBwYXJhbSB0aGVtZXMgLSB0aGVtZSBvciB0aGVtZXMgdG8gY29uc3RyYWluIGJ5XG4gICAgICovXG4gICAgc2V0VGhlbWVzICh0aGVtZXM6c3RyaW5nfHN0cmluZ1tdLCBwYXJhbWV0ZXI/OnN0cmluZykge1xuXG4gICAgICAgIC8vY2xlYXIgZXhpc3RpbmdcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5USEVNRVNfSUQsIG51bGwpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlRIRU1FU19MQUJFTCwgbnVsbCk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVEhFTUVTX1VSSSwgbnVsbCk7XG5cbiAgICAgICAgbGV0IHBhcmFtID0gcGFyYW1ldGVyIHx8IFBhcmFtZXRlcnMuVEhFTUVTX0lEO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihwYXJhbSwgdG9BcnJheSh0aGVtZXMpKTtcbiAgICB9XG5cbiAgICBnZXRUaGVtZXMgKCkgOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlRIRU1FU19JRCkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVEhFTUVTX0xBQkVMKSB8fFxuICAgICAgICAgICAgdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5USEVNRVNfVVJJKTtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IGEgVG9waWMgb3Igc2V0IG9mIFRvcGljcyB0byBjb25zdHJhaW4gcmVzdWx0cy4gQnlcbiAgICAgKiBkZWZhdWx0LCB2YWx1ZXMgYXJlIGFzc3VtZWQgdG8gYmUgdGhlbWUgaWRlbnRpZmllcnMuIElmIHVzaW5nXG4gICAgICogdGhlbWUgbGFiZWxzIG9yIHRoZW1lIHVyaXMsIHNwZWNpZnkgdGhlIG9wdGlvbmFsIHNlY29uZCBwYXJhbWV0ZXJcbiAgICAgKiB0byBiZSBlaXRoZXIgUGFyYW1ldGVycy5UT1BJQ19MQUJFTCBvciBQYXJhbWV0ZXJzLlRPUElDX1VSSVxuICAgICAqIHJlc3BlY3RpdmVseS5cbiAgICAgKiBAcGFyYW0gIHRvcGljcyAtIHN0cmluZyBvciBhcnJheSBvZiBzdHJpbmdzIGNvbnRhaW5pbmcgdGhlbWUgY29uc3RyYWludFxuICAgICAqIEBwYXJhbSAgcGFyYW1ldGVyIC0gb3B0aW9uYWwsIHRvIGluZGljYXRlIHRoZSBwYXJhbWV0ZXIgdG8gdXNlXG4gICAgICogQHJldHVybiBRdWVyeSBpbnN0YW5jZVxuICAgICAqL1xuICAgIHRvcGljcyh0b3BpY3M6c3RyaW5nfHN0cmluZ1tdLCBwYXJhbWV0ZXIgPzogc3RyaW5nKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRUb3BpY3ModG9waWNzLCBwYXJhbWV0ZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgYSBUb3BpYyBvciBzZXQgb2YgVG9waWNzIHRvIGNvbnN0cmFpbiByZXN1bHRzLiBCeVxuICAgICAqIGRlZmF1bHQsIHZhbHVlcyBhcmUgYXNzdW1lZCB0byBiZSB0aGVtZSBpZGVudGlmaWVycy4gSWYgdXNpbmdcbiAgICAgKiB0aGVtZSBsYWJlbHMgb3IgdGhlbWUgdXJpcywgc3BlY2lmeSB0aGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlclxuICAgICAqIHRvIGJlIGVpdGhlciBQYXJhbWV0ZXJzLlRPUElDX0xBQkVMIG9yIFBhcmFtZXRlcnMuVE9QSUNfVVJJXG4gICAgICogcmVzcGVjdGl2ZWx5LlxuICAgICAqIEBwYXJhbSB0b3BpY3MgLSB0aGVtZSBvciB0b3BpY3MgdG8gY29uc3RyYWluIGJ5XG4gICAgICovXG4gICAgc2V0VG9waWNzICh0b3BpY3M6c3RyaW5nfHN0cmluZ1tdLCBwYXJhbWV0ZXIgPzogc3RyaW5nKSB7XG5cbiAgICAgICAgLy9jbGVhciBleGlzdGluZ1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlRPUElDU19JRCwgbnVsbCk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVE9QSUNTX0xBQkVMLCBudWxsKTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5UT1BJQ1NfVVJJLCBudWxsKTtcblxuICAgICAgICBsZXQgcGFyYW0gPSBwYXJhbWV0ZXIgfHwgUGFyYW1ldGVycy5UT1BJQ1NfSUQ7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKHBhcmFtLCB0b0FycmF5KHRvcGljcykpO1xuICAgIH1cblxuICAgIGdldFRvcGljcyAoKSA6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVE9QSUNTX0lEKSB8fFxuICAgICAgICAgICAgdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5UT1BJQ1NfTEFCRUwpIHx8XG4gICAgICAgICAgICB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlRPUElDU19VUkkpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSBhIFB1Ymxpc2hlciBvciBzZXQgb2YgUHVibGlzaGVycyB0byBjb25zdHJhaW4gcmVzdWx0cy4gQnlcbiAgICAgKiBkZWZhdWx0LCB2YWx1ZXMgYXJlIGFzc3VtZWQgdG8gYmUgaWRlbnRpZmllcnMuIElmIHVzaW5nIGxhYmVscyBvciB1cmlzLFxuICAgICAqIHNwZWNpZnkgdGhlIG9wdGlvbmFsIHNlY29uZCBwYXJhbWV0ZXIgdG8gYmUgZWl0aGVyXG4gICAgICogUGFyYW1ldGVycy5QVUJMSVNIRVJTX0xBQkVMIG9yIFBhcmFtZXRlcnMuUFVCTElTSEVSU19VUkkgcmVzcGVjdGl2ZWx5LlxuICAgICAqIEBwYXJhbSBwYXJhbWV0ZXIgLSBvcHRpb25hbCwgdG8gaW5kaWNhdGUgdGhlIHBhcmFtZXRlciB0byB1c2VcbiAgICAgKiBAcmV0dXJuIFF1ZXJ5XG4gICAgICovXG4gICAgcHVibGlzaGVycyhwdWJsaXNoZXJzOnN0cmluZ3xzdHJpbmdbXSwgcGFyYW1ldGVyPzpzdHJpbmcpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldFB1Ymxpc2hlcnMocHVibGlzaGVycywgcGFyYW1ldGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSBhIFB1Ymxpc2hlciBvciBzZXQgb2YgUHVibGlzaGVycyB0byBjb25zdHJhaW4gcmVzdWx0cy4gQnlcbiAgICAgKiBkZWZhdWx0LCB2YWx1ZXMgYXJlIGFzc3VtZWQgdG8gYmUgaWRlbnRpZmllcnMuIElmIHVzaW5nIGxhYmVscyBvciB1cmlzLFxuICAgICAqIHNwZWNpZnkgdGhlIG9wdGlvbmFsIHNlY29uZCBwYXJhbWV0ZXIgdG8gYmUgZWl0aGVyXG4gICAgICogUGFyYW1ldGVycy5QVUJMSVNIRVJTX0xBQkVMIG9yIFBhcmFtZXRlcnMuUFVCTElTSEVSU19VUkkgcmVzcGVjdGl2ZWx5LlxuICAgICAqIEBwYXJhbSBwdWJsaXNoZXJzIC0gcHVibGlzaGluZyBvcmdzIHRvIGNvbnN0cmFpbiBieVxuICAgICAqL1xuICAgIHNldFB1Ymxpc2hlcnMgKHB1Ymxpc2hlcnM6c3RyaW5nfHN0cmluZ1tdLCBwYXJhbWV0ZXI/OnN0cmluZykge1xuXG4gICAgICAgIC8vY2xlYXIgZXhpc3RpbmdcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5QVUJMSVNIRVJTX0lELCBudWxsKTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5QVUJMSVNIRVJTX0xBQkVMLCBudWxsKTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5QVUJMSVNIRVJTX1VSSSwgbnVsbCk7XG5cbiAgICAgICAgbGV0IHBhcmFtID0gcGFyYW1ldGVyIHx8IFBhcmFtZXRlcnMuUFVCTElTSEVSU19JRDtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIocGFyYW0sIHRvQXJyYXkocHVibGlzaGVycykpO1xuICAgIH1cblxuICAgIGdldFB1Ymxpc2hlcnMgKCkgOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlBVQkxJU0hFUlNfSUQpIHx8XG4gICAgICAgICAgICB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlBVQkxJU0hFUlNfTEFCRUwpIHx8XG4gICAgICAgICAgICB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlBVQkxJU0hFUlNfVVJJKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgYSBQb2ludCBvZiBDb250YWN0IG9yIHNldCBvZiBDb250YWN0cyB0byBjb25zdHJhaW4gcmVzdWx0cy4gQnlcbiAgICAgKiBkZWZhdWx0LCB2YWx1ZXMgYXJlIGFzc3VtZWQgdG8gYmUgaWRlbnRpZmllcnMuIElmIHVzaW5nXG4gICAgICogbGFiZWxzIG9yIHVyaXMsIHNwZWNpZnkgdGhlIG9wdGlvbmFsIHNlY29uZCBwYXJhbWV0ZXIgdG8gYmUgZWl0aGVyXG4gICAgICogUGFyYW1ldGVycy5DT05UQUNUU19MQUJFTCBvciBQYXJhbWV0ZXJzLkNPTlRBQ1RTX1VSSSByZXNwZWN0aXZlbHkuXG4gICAgICogQHBhcmFtIHBhcmFtZXRlciAtIG9wdGlvbmFsLCB0byBpbmRpY2F0ZSB0aGUgcGFyYW1ldGVyIHRvIHVzZVxuICAgICAqIEByZXR1cm4gUXVlcnlcbiAgICAgKi9cbiAgICBjb250YWN0cyhjb250YWN0czpzdHJpbmd8c3RyaW5nW10sIHBhcmFtZXRlcj86c3RyaW5nKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRDb250YWN0cyhjb250YWN0cywgcGFyYW1ldGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSBhIENvbnRhY3Qgb3Igc2V0IG9mIENvbnRhY3RzIHRvIGNvbnN0cmFpbiByZXN1bHRzLiBCeVxuICAgICAqIGRlZmF1bHQsIHZhbHVlcyBhcmUgYXNzdW1lZCB0byBiZSBpZGVudGlmaWVycy4gSWYgdXNpbmdcbiAgICAgKiBsYWJlbHMgb3IgdXJpcywgc3BlY2lmeSB0aGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlciB0byBiZSBlaXRoZXJcbiAgICAgKiBQYXJhbWV0ZXJzLkNPTlRBQ1RTX0xBQkVMIG9yIFBhcmFtZXRlcnMuQ09OVEFDVFNfVVJJIHJlc3BlY3RpdmVseS5cbiAgICAgKiBAcGFyYW0gY29udGFjdHMgLSBwdWJsaXNoaW5nIG9yZ3MgdG8gY29uc3RyYWluIGJ5XG4gICAgICovXG4gICAgc2V0Q29udGFjdHMgKGNvbnRhY3RzOnN0cmluZ3xzdHJpbmdbXSwgcGFyYW1ldGVyPzpzdHJpbmcpIHtcblxuICAgICAgICAvL2NsZWFyIGV4aXN0aW5nXG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuQ09OVEFDVFNfSUQsIG51bGwpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkNPTlRBQ1RTX0xBQkVMLCBudWxsKTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5DT05UQUNUU19VUkksIG51bGwpO1xuXG4gICAgICAgIGxldCBwYXJhbSA9IHBhcmFtZXRlciB8fCBQYXJhbWV0ZXJzLkNPTlRBQ1RTX0lEO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihwYXJhbSwgdG9BcnJheShjb250YWN0cykpO1xuICAgIH1cblxuICAgIGdldENvbnRhY3RzICgpIDogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5DT05UQUNUU19JRCkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuQ09OVEFDVFNfTEFCRUwpIHx8XG4gICAgICAgICAgICB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkNPTlRBQ1RTX1VSSSk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IHRoZSBpZGVudGlmaWVyIG9mIGFuIEFnZW50IChDb21tdW5pdHksIEdyb3VwLCBldGMpIHRoYXRcbiAgICAgKiB1c2VzIGl0ZW1zIHlvdSB3aXNoIHRvIGZpbmQgaW4gc2VhcmNoIHJlc3VsdHMuIEJ5XG4gICAgICogZGVmYXVsdCwgdmFsdWVzIGFyZSBhc3N1bWVkIHRvIGJlIGlkZW50aWZpZXJzLiBJZiB1c2luZ1xuICAgICAqIGxhYmVscyBvciB1cmlzLCBzcGVjaWZ5IHRoZSBvcHRpb25hbCBzZWNvbmQgcGFyYW1ldGVyXG4gICAgICogdG8gYmUgZWl0aGVyIFBhcmFtZXRlcnMuVVNFRF9CWV9MQUJFTCBvciBQYXJhbWV0ZXJzLlVTRURfQllfVVJJXG4gICAgICogcmVzcGVjdGl2ZWx5LlxuICAgICAqIEBwYXJhbSBwYXJhbWV0ZXIgLSBvcHRpb25hbCwgdG8gaW5kaWNhdGUgdGhlIHBhcmFtZXRlciB0byB1c2VcbiAgICAgKiBAcmV0dXJuIFF1ZXJ5XG4gICAgICovXG4gICAgdXNlZEJ5KGlkczpzdHJpbmd8c3RyaW5nW10sIHBhcmFtZXRlcj86c3RyaW5nKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRVc2VkQnkoaWRzLCBwYXJhbWV0ZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IHRoZSBpZGVudGlmaWVyIG9mIGFuIEFnZW50IChDb21tdW5pdHksIEdyb3VwLCBldGMpIHRoYXRcbiAgICAgKiB1c2VzIGl0ZW1zIHlvdSB3aXNoIHRvIGZpbmQgaW4gc2VhcmNoIHJlc3VsdHMuIEJ5XG4gICAgICogZGVmYXVsdCwgdmFsdWVzIGFyZSBhc3N1bWVkIHRvIGJlIGlkZW50aWZpZXJzLiBJZiB1c2luZ1xuICAgICAqIGxhYmVscyBvciB1cmlzLCBzcGVjaWZ5IHRoZSBvcHRpb25hbCBzZWNvbmQgcGFyYW1ldGVyXG4gICAgICogdG8gYmUgZWl0aGVyIFBhcmFtZXRlcnMuVVNFRF9CWV9MQUJFTCBvciBQYXJhbWV0ZXJzLlVTRURfQllfVVJJXG4gICAgICogcmVzcGVjdGl2ZWx5LlxuICAgICAqIEBwYXJhbSBpZHMgLSBwdWJsaXNoaW5nIG9yZ3MgdG8gY29uc3RyYWluIGJ5XG4gICAgICovXG4gICAgc2V0VXNlZEJ5IChpZHM6c3RyaW5nfHN0cmluZ1tdLCBwYXJhbWV0ZXI/OnN0cmluZykge1xuXG4gICAgICAgIC8vY2xlYXIgZXhpc3RpbmdcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5VU0VEX0JZX0lELCBudWxsKTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5VU0VEX0JZX0xBQkVMLCBudWxsKTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5VU0VEX0JZX1VSSSwgbnVsbCk7XG5cbiAgICAgICAgbGV0IHBhcmFtID0gcGFyYW1ldGVyIHx8IFBhcmFtZXRlcnMuVVNFRF9CWV9JRDtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIocGFyYW0sIHRvQXJyYXkoaWRzKSk7XG4gICAgfVxuXG4gICAgZ2V0VXNlZEJ5ICgpIDogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5VU0VEX0JZX0lEKSB8fFxuICAgICAgICAgICAgdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5VU0VEX0JZX0xBQkVMKSB8fFxuICAgICAgICAgICAgdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5VU0VEX0JZX1VSSSk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IGEgQ29uY2VwdCBTY2hlbWUgb3Igc2V0IG9mIENvbmNlcHQgU2NoZW1lcyB0byBjb25zdHJhaW4gcmVzdWx0cy4gQnlcbiAgICAgKiBkZWZhdWx0LCB2YWx1ZXMgYXJlIGFzc3VtZWQgdG8gYmUgaWRlbnRpZmllcnMuIElmIHVzaW5nXG4gICAgICogbGFiZWxzIG9yIHVyaXMsIHNwZWNpZnkgdGhlIG9wdGlvbmFsIHNlY29uZCBwYXJhbWV0ZXJcbiAgICAgKiB0byBiZSBlaXRoZXIgUGFyYW1ldGVycy5TQ0hFTUVTX0xBQkVMIG9yIFBhcmFtZXRlcnMuU0NIRU1FU19VUklcbiAgICAgKiByZXNwZWN0aXZlbHkuXG4gICAgICogQHBhcmFtIHNjaGVtZXMgLSBzY2hlbWVzIHRvIGNvbnN0cmFpbiBieVxuICAgICAqIEBwYXJhbSBwYXJhbWV0ZXIgLSBvcHRpb25hbCwgdG8gaW5kaWNhdGUgdGhlIHBhcmFtZXRlciB0byB1c2VcbiAgICAgKiBAcmV0dXJuIFF1ZXJ5XG4gICAgICovXG4gICAgc2NoZW1lcyhzY2hlbWVzOnN0cmluZ3xzdHJpbmdbXSwgcGFyYW1ldGVyPzpzdHJpbmcpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldFNjaGVtZXMoc2NoZW1lcywgcGFyYW1ldGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSBhIENvbmNlcHQgU2NoZW1lIG9yIHNldCBvZiBDb25jZXB0IFNjaGVtZXMgdG8gY29uc3RyYWluIHJlc3VsdHMuIEJ5XG4gICAgICogZGVmYXVsdCwgdmFsdWVzIGFyZSBhc3N1bWVkIHRvIGJlIHRoZW1lIGlkZW50aWZpZXJzLiBJZiB1c2luZ1xuICAgICAqIHRoZW1lIGxhYmVscyBvciB0aGVtZSB1cmlzLCBzcGVjaWZ5IHRoZSBvcHRpb25hbCBzZWNvbmQgcGFyYW1ldGVyXG4gICAgICogdG8gYmUgZWl0aGVyIFBhcmFtZXRlcnMuU0NIRU1FU19MQUJFTCBvciBQYXJhbWV0ZXJzLlNDSEVNRVNfVVJJXG4gICAgICogcmVzcGVjdGl2ZWx5LlxuICAgICAqIEBwYXJhbSBzY2hlbWVzIC0gc2NoZW1lcyB0byBjb25zdHJhaW4gYnlcbiAgICAgKiBAcGFyYW0gcGFyYW1ldGVyIC0gb3B0aW9uYWwsIHRvIGluZGljYXRlIHRoZSBwYXJhbWV0ZXIgdG8gdXNlXG4gICAgICovXG4gICAgc2V0U2NoZW1lcyAoc2NoZW1lczpzdHJpbmd8c3RyaW5nW10sIHBhcmFtZXRlcj86c3RyaW5nKSB7XG5cbiAgICAgICAgLy9jbGVhciBleGlzdGluZ1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlNDSEVNRVNfSUQsIG51bGwpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlNDSEVNRVNfTEFCRUwsIG51bGwpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlNDSEVNRVNfVVJJLCBudWxsKTtcblxuICAgICAgICBsZXQgcGFyYW0gPSBwYXJhbWV0ZXIgfHwgUGFyYW1ldGVycy5TQ0hFTUVTX0lEO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihwYXJhbSwgdG9BcnJheShzY2hlbWVzKSk7XG4gICAgfVxuXG4gICAgZ2V0U2NoZW1lcygpIDogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5TQ0hFTUVTX0lEKSB8fFxuICAgICAgICAgICAgdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5TQ0hFTUVTX0xBQkVMKSB8fFxuICAgICAgICAgICAgdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5TQ0hFTUVTX1VSSSk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBzZXJ2aWNlVHlwZXModHlwZXM6c3RyaW5nfHN0cmluZ1tdKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRTZXJ2aWNlVHlwZXModHlwZXMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gdHlwZXMgLSBpZHNcbiAgICAgKi9cbiAgICBzZXRTZXJ2aWNlVHlwZXMgKHR5cGVzOnN0cmluZ3xzdHJpbmdbXSkge1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlNFUlZJQ0VfVFlQRVMsIHRvQXJyYXkodHlwZXMpKTtcbiAgICB9XG5cbiAgICBnZXRTZXJ2aWNlVHlwZXMgKCkgOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlNFUlZJQ0VfVFlQRVMpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgdmlzaWJpbGl0eSh2aXM6XCJwdWJsaWNcInxcInByaXZhdGVcIikgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0VmlzaWJpbGl0eSh2aXMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gdmlzaWJpbGl0eSAtIG9uZSBvZiAncHVibGljJyBvciAncHJpdmF0ZSdcbiAgICAgKi9cbiAgICBzZXRWaXNpYmlsaXR5ICh2aXNpYmlsaXR5IDogXCJwdWJsaWNcInxcInByaXZhdGVcIikge1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlZJU0lCSUxJVFksIHZpc2liaWxpdHkpO1xuICAgIH1cblxuICAgIGdldFZpc2liaWxpdHkgKCkgOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5WSVNJQklMSVRZKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIHN0YXR1cyh2YWx1ZSA6IHN0cmluZykgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdHVzKHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHN0YXR1cyAtIGN1cnJlbnQgc3RhdHVzIG9mIEl0ZW1cbiAgICAgKi9cbiAgICBzZXRTdGF0dXMgKHZhbHVlIDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuU1RBVFVTLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgZ2V0U3RhdHVzICgpIDogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuU1RBVFVTKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIGV4dGVudChiYm94IDogYW55KSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRFeHRlbnQoYmJveCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBiYm94IC0gc3RyaW5nIGZvcm0gb2YgXCJtaW54LG1pbnksbWF4eCxtYXh5XCIsIG9yIEwuTGF0TG5nQm91bmRzLCBvciBBcnJheVxuICAgICAqL1xuICAgIHNldEV4dGVudCAoYmJveCA6IGFueSkge1xuICAgICAgICBpZihiYm94KSB7XG4gICAgICAgICAgICBpZih0eXBlb2YoYmJveC50b0Jib3hTdHJpbmcpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIC8vTGVhZmxldCBCb3VuZHMgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICBiYm94ID0gYmJveC50b0Jib3hTdHJpbmcoKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmKHR5cGVvZihiYm94LnB1c2gpICE9PSAndW5kZWZpbmVkJyAmJiBiYm94Lmxlbmd0aCAmJlxuICAgICAgICAgICAgICAgIC8vTmVzdGVkIGFycmF5IChhbHRlcm5hdGUgTGVhZmxldCByZXByZXNlbnRhdGlvbik6XG4gICAgICAgICAgICAgICAgLy8gWyBbbWluTGF0LG1pbkxvbmddLCBbbWF4TGF0LG1heExvbmddIF1cbiAgICAgICAgICAgICAgICB0eXBlb2YoYmJveFswXS5wdXNoKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBiYm94ID0gYmJveFswXVsxXSsnLCcrYmJveFswXVswXSsnLCcrYmJveFsxXVsxXSsnLCcrYmJveFsxXVswXTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmKHR5cGVvZihiYm94KSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBpZighQkJPWF9SRUdFWC50ZXN0KGJib3gpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgYXJndW1lbnQ6IGJib3ggc3RyaW5nIG11c3QgYmUgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJpbiBmb3JtIG9mICdtaW54LG1pbnksbWF4eCxtYXh5J1wiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgYXJndW1lbnQ6IGJib3ggbXVzdCBiZSBvbmUgb2YgXCIgK1xuICAgICAgICAgICAgICAgICAgICBcIkxlYWZsZXQuQm91bmRzLCBuZXN0ZWQgYXJyYXksIG9yIGJib3ggc3RyaW5nXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuRVhURU5ULCBiYm94KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIGJib3ggc3RyaW5nIG9yIG51bGwgaWYgbm90IHNldFxuICAgICAqL1xuICAgIGdldEV4dGVudCAoKSA6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkVYVEVOVCk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICBtb2RpZmllZChkYXRlIDogbnVtYmVyfERhdGUsIGJlZm9yZU9yQWZ0ZXIgOiBib29sZWFuKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRNb2RpZmllZChkYXRlLCBiZWZvcmVPckFmdGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGRhdGUgLSBkYXRlIHRvIGNvbXBhcmUgYWdhaW5zdFxuICAgICAqIEBwYXJhbSBiZWZvcmVPckFmdGVyIC0gZmxhZyBzcGVjaWZ5aW5nIHdoaWNoIGJvdW5kYXJ5IGNvbmRpdGlvbiAodHJ1ZSA9IGJlZm9yZSwgZmFsc2UgPSBhZnRlcikgZmxhZyBzcGVjaWZ5aW5nIHdoZXRoZXIgdG8gdHJpZ2dlciB1cGRhdGUgYXV0b21hdGljYWxseVxuICAgICAqL1xuICAgIHNldE1vZGlmaWVkIChkYXRlIDogbnVtYmVyfERhdGUsIGJlZm9yZU9yQWZ0ZXI6Ym9vbGVhbikge1xuXG4gICAgICAgIC8vaWYgbm8gZGF0ZSB3YXMgc3VwcGxpZWQsIGNvbnNpZGVyIGl0IFwidW5zZXRcIiBmb3IgYm90aCBwcm9wZXJ0aWVzXG4gICAgICAgIGlmKCFkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLk1PRElGSUVEX0JFRk9SRSwgbnVsbCk7XG4gICAgICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLk1PRElGSUVEX0FGVEVSLCBudWxsKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCEoZGF0ZSBpbnN0YW5jZW9mIERhdGUpKVxuICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUgYXMgbnVtYmVyKTtcblxuICAgICAgICBsZXQgZGlyID0gYmVmb3JlT3JBZnRlciAmJiAoYmVmb3JlT3JBZnRlciA9PT0gdHJ1ZSB8fCBiZWZvcmVPckFmdGVyID09PSBcInRydWVcIik7XG4gICAgICAgIGxldCBwcm9wID0gZGlyID8gUGFyYW1ldGVycy5NT0RJRklFRF9CRUZPUkUgOiBQYXJhbWV0ZXJzLk1PRElGSUVEX0FGVEVSOyAgICAgICAvL3Byb3BlcnR5IGJlaW5nIHNldFxuICAgICAgICBsZXQgb3BwUHJvcCA9IGRpciA/IFBhcmFtZXRlcnMuTU9ESUZJRURfQUZURVIgOiBQYXJhbWV0ZXJzLk1PRElGSUVEX0JFRk9SRTsgICAgLy91bnNldCBvcHBvc2l0ZSBwcm9wZXJ0eVxuICAgICAgICBsZXQgYXJnID0gKGRhdGUgJiYgZGF0ZS5nZXRUaW1lKSA/IGRhdGUuZ2V0VGltZSgpIDogZGF0ZTtcblxuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihvcHBQcm9wLCBudWxsKTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIocHJvcCwgYXJnKTtcbiAgICB9XG5cbiAgICBnZXRNb2RpZmllZCAoKSA6IERhdGUge1xuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLk1PRElGSUVEX0JFRk9SRSkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuTU9ESUZJRURfQUZURVIpO1xuICAgICAgICBpZih2YWx1ZSAmJiB0eXBlb2YodmFsdWUpID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdmFsdWUgPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgY3JlYXRlZChkYXRlIDogbnVtYmVyfERhdGUsIGJlZm9yZU9yQWZ0ZXI6Ym9vbGVhbikgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0Q3JlYXRlZChkYXRlLCBiZWZvcmVPckFmdGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGRhdGUgLSBkYXRlIHRvIGNvbXBhcmUgYWdhaW5zdFxuICAgICAqIEBwYXJhbSBiZWZvcmVPckFmdGVyIC0gZmxhZyBzcGVjaWZ5aW5nIHdoaWNoIGJvdW5kYXJ5IGNvbmRpdGlvbiAodHJ1ZSA9IGJlZm9yZSwgZmFsc2UgPSBhZnRlcikgZmxhZyBzcGVjaWZ5aW5nIHdoZXRoZXIgdG8gdHJpZ2dlciB1cGRhdGUgYXV0b21hdGljYWxseVxuICAgICAqL1xuICAgIHNldENyZWF0ZWQgKGRhdGUgOiBudW1iZXJ8RGF0ZSwgYmVmb3JlT3JBZnRlcjpib29sZWFuKSB7XG5cbiAgICAgICAgLy9pZiBubyBkYXRlIHdhcyBzdXBwbGllZCwgY29uc2lkZXIgaXQgXCJ1bnNldFwiIGZvciBib3RoIHByb3BlcnRpZXNcbiAgICAgICAgaWYoIWRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuQ1JFQVRFRF9CRUZPUkUsIG51bGwpO1xuICAgICAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5DUkVBVEVEX0FGVEVSLCBudWxsKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCEoZGF0ZSBpbnN0YW5jZW9mIERhdGUpKVxuICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUgYXMgbnVtYmVyKTtcblxuICAgICAgICBsZXQgZGlyID0gYmVmb3JlT3JBZnRlciAmJiAoYmVmb3JlT3JBZnRlciA9PT0gdHJ1ZSB8fCBiZWZvcmVPckFmdGVyID09PSBcInRydWVcIik7XG4gICAgICAgIGxldCBwcm9wID0gZGlyID8gUGFyYW1ldGVycy5DUkVBVEVEX0JFRk9SRSA6IFBhcmFtZXRlcnMuQ1JFQVRFRF9BRlRFUjsgICAgICAgLy9wcm9wZXJ0eSBiZWluZyBzZXRcbiAgICAgICAgbGV0IG9wcFByb3AgPSBkaXIgPyBQYXJhbWV0ZXJzLkNSRUFURURfQUZURVIgOiBQYXJhbWV0ZXJzLkNSRUFURURfQkVGT1JFOyAgICAvL3Vuc2V0IG9wcG9zaXRlIHByb3BlcnR5XG4gICAgICAgIGxldCBhcmcgPSAoZGF0ZSAmJiBkYXRlLmdldFRpbWUpID8gZGF0ZS5nZXRUaW1lKCkgOiBkYXRlO1xuXG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKG9wcFByb3AsIG51bGwpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihwcm9wLCBhcmcpO1xuICAgIH1cblxuICAgIGdldENyZWF0ZWQgKCkgOiBEYXRlIHtcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5DUkVBVEVEX0JFRk9SRSkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuQ1JFQVRFRF9BRlRFUik7XG4gICAgICAgIGlmKHZhbHVlICYmIHR5cGVvZih2YWx1ZSkgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IG5ldyBEYXRlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICBiZWdpbnMoZGF0ZSA6IG51bWJlcnxEYXRlKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRCZWdpbkRhdGUoZGF0ZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldEJlZ2luRGF0ZSAoZGF0ZSA6IG51bWJlcnxEYXRlKSB7XG4gICAgICAgIGlmKGRhdGUgJiYgZGF0ZSBpbnN0YW5jZW9mIERhdGUpXG4gICAgICAgICAgICBkYXRlID0gZGF0ZS5nZXRUaW1lKCk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuQkVHSU5TLCBkYXRlKTtcbiAgICB9XG5cbiAgICBnZXRCZWdpbkRhdGUgKCkgOiBEYXRlIHtcbiAgICAgICAgbGV0IGRhdGUgPSB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkJFR0lOUyk7XG4gICAgICAgIGlmKGRhdGUpIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICBlbmRzKGRhdGUgOiBudW1iZXJ8RGF0ZSkgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0RW5kRGF0ZShkYXRlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0RW5kRGF0ZSAoZGF0ZTogbnVtYmVyfERhdGUpIHtcbiAgICAgICAgaWYoZGF0ZSAmJiBkYXRlIGluc3RhbmNlb2YgRGF0ZSlcbiAgICAgICAgICAgIGRhdGUgPSBkYXRlLmdldFRpbWUoKTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5FTkRTLCBkYXRlKTtcbiAgICB9XG5cbiAgICBnZXRFbmREYXRlICgpIDogRGF0ZSB7XG4gICAgICAgIGxldCBkYXRlID0gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5FTkRTKTtcbiAgICAgICAgaWYoZGF0ZSkgZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIGJldHdlZW4oYmVnaW4gOiBudW1iZXJ8RGF0ZSwgZW5kIDogbnVtYmVyfERhdGUpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldEJldHdlZW4oYmVnaW4sIGVuZCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldEJldHdlZW4oYmVnaW4gOiBudW1iZXJ8RGF0ZSwgZW5kIDogbnVtYmVyfERhdGUpIHtcbiAgICAgICAgdGhpcy5iZWdpbnMoYmVnaW4pO1xuICAgICAgICB0aGlzLmVuZHMoZW5kKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIHJlc291cmNlVHlwZXModHlwZXM6IHN0cmluZ3xzdHJpbmdbXSkgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0UmVzb3VyY2VUeXBlcyh0eXBlcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldFJlc291cmNlVHlwZXModHlwZXM6IHN0cmluZ3xzdHJpbmdbXSkge1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlJFU09VUkNFX1RZUEUsIHRvQXJyYXkodHlwZXMpKTtcbiAgICB9XG5cbiAgICBnZXRSZXNvdXJjZVR5cGVzKCkgOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlJFU09VUkNFX1RZUEUpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgZmFjZXRzKG5hbWVzIDogc3RyaW5nfHN0cmluZ1tdKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRGYWNldHMobmFtZXMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIEBwYXJhbSBuYW1lcyAtIG5hbWVzIG9mIGZhY2V0c1xuICAgICAqL1xuICAgIHNldEZhY2V0cyAobmFtZXM6IHN0cmluZ3xzdHJpbmdbXSkge1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkZBQ0VUUywgdG9BcnJheShuYW1lcykpO1xuICAgIH1cblxuICAgIGdldEZhY2V0cygpIDogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5GQUNFVFMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBuYW1lIC0gbmFtZSBvZiBmYWNldCB0byBhZGRcbiAgICAgKi9cbiAgICBhZGRGYWNldChuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGZhY2V0cyA9IHRoaXMuZ2V0RmFjZXRzKCkgfHwgW107XG4gICAgICAgIGZhY2V0cy5wdXNoKG5hbWUpO1xuICAgICAgICB0aGlzLnNldEZhY2V0cyhmYWNldHMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBuYW1lIC0gbmFtZSBvZiBmYWNldCB0byByZW1vdmVcbiAgICAgKi9cbiAgICByZW1vdmVGYWNldChuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGZhY2V0cyA9IHRoaXMuZ2V0RmFjZXRzKCkgfHwgW107XG4gICAgICAgIGxldCBpZHggPSBmYWNldHMuaW5kZXhPZihuYW1lKTtcbiAgICAgICAgaWYoaWR4Pj0wKSB7XG4gICAgICAgICAgICBmYWNldHMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICB0aGlzLnNldEZhY2V0cyhmYWNldHMpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICBmaWVsZHMoZmllbGRzOiBzdHJpbmd8c3RyaW5nW10pIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldEZpZWxkcyhmaWVsZHMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZmllbGRzIC0gbGlzdCBvZiBmaWVsZCBuYW1lcyB0byByZXF1ZXN0IGZvciBlYWNoIHNlYXJjaCByZXN1bHRcbiAgICAgKi9cbiAgICBzZXRGaWVsZHMgKGZpZWxkczogc3RyaW5nfHN0cmluZ1tdKSB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuRklFTERTLCB0b0FycmF5KGZpZWxkcykpO1xuICAgIH1cblxuICAgIGdldEZpZWxkcygpIDogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5GSUVMRFMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBmaWVsZCAtIG5hbWUgb2YgZmllbGQgdG8gcmVtb3ZlXG4gICAgICovXG4gICAgYWRkRmllbGQoZmllbGQ6IHN0cmluZykge1xuICAgICAgICBsZXQgZmllbGRzID0gdGhpcy5nZXRGaWVsZHMoKSB8fCBbXTtcbiAgICAgICAgZmllbGRzLnB1c2goZmllbGQpO1xuICAgICAgICB0aGlzLnNldEZpZWxkcyhmaWVsZHMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBmaWVsZCAtIG5hbWUgb2YgZmllbGQgdG8gcmVtb3ZlXG4gICAgICovXG4gICAgcmVtb3ZlRmllbGQoZmllbGQ6IHN0cmluZykge1xuICAgICAgICBsZXQgZmllbGRzID0gdGhpcy5nZXRGaWVsZHMoKSB8fCBbXTtcbiAgICAgICAgbGV0IGlkeCA9IGZpZWxkcy5pbmRleE9mKGZpZWxkKTtcbiAgICAgICAgaWYoaWR4Pj0wKSB7XG4gICAgICAgICAgICBmaWVsZHMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICB0aGlzLnNldEZpZWxkcyhmaWVsZHMpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBwYWdlIC0gcGFnZSBvZiByZXN1bHRzIHRvIGZldGNoXG4gICAgICovXG4gICAgcGFnZSAocGFnZTogbnVtYmVyKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRQYWdlKHBhZ2UpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRQYWdlKHBhZ2U6IG51bWJlcikge1xuICAgICAgICBpZihpc05hTihwYWdlKSB8fCBwYWdlKjE8MCkgcmV0dXJuO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlBBR0UsIHBhZ2UqMSk7XG4gICAgfVxuXG4gICAgZ2V0UGFnZSgpIDogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuUEFHRSk7XG4gICAgfVxuXG4gICAgbmV4dFBhZ2UoKSA6IHZvaWQge1xuICAgICAgICB0aGlzLnNldFBhZ2UodGhpcy5nZXRQYWdlKCkrMSk7XG4gICAgfVxuXG4gICAgcHJldmlvdXNQYWdlKCkgOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRQYWdlKHRoaXMuZ2V0UGFnZSgpLTEpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHNpemUgLSBwYWdlIHNpemUgdG8gcmVxdWVzdFxuICAgICAqL1xuICAgIHBhZ2VTaXplIChzaXplOiBudW1iZXIpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldFBhZ2VTaXplKHNpemUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRQYWdlU2l6ZSAoc2l6ZTogbnVtYmVyKSB7XG4gICAgICAgIGlmKGlzTmFOKHNpemUpIHx8IHNpemUqMTwwKSByZXR1cm47XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuUEFHRV9TSVpFLCBzaXplKjEpO1xuICAgIH1cblxuICAgIGdldFBhZ2VTaXplKCkgOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5QQUdFX1NJWkUpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHNvcnQgLSBmb3JtIG9mIDxmaWVsZD4sPGRpcj4gb3IganVzdCBmaWVsZCBuYW1lXG4gICAgICogQHBhcmFtIG9yZGVyIC0gb3B0aW9uYWwsIGVpdGhlciAnYXNjJyBvciAnZGVzYydcbiAgICAgKi9cbiAgICBzb3J0IChzb3J0OiBzdHJpbmcsIG9yZGVyPzpzdHJpbmcpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldFNvcnQoc29ydCwgb3JkZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc29ydCAtIGZvcm0gb2YgPGZpZWxkPiw8ZGlyPiBvciBqdXN0IGZpZWxkIG5hbWVcbiAgICAgKiBAcGFyYW0gb3JkZXIgLSBvcHRpb25hbCwgZWl0aGVyICdhc2MnIG9yICdkZXNjJ1xuICAgICAqL1xuICAgICBzZXRTb3J0KHNvcnQ6IHN0cmluZywgb3JkZXI/OnN0cmluZykge1xuICAgICAgICAgb3JkZXIgPSBvcmRlciB8fCAnZGVzYyc7XG4gICAgICAgICBpZihzb3J0ICYmIHNvcnQuaW5kZXhPZignLCcpPDApXG4gICAgICAgICAgICBzb3J0ID0gc29ydCArICcsJyArIG9yZGVyO1xuICAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5TT1JULCBzb3J0KTtcbiAgICB9XG5cbiAgICBnZXRTb3J0KCkgOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5TT1JUKTtcbiAgICB9XG5cbiAgICBnZXRTb3J0RmllbGQoKSA6IHN0cmluZyB8IG51bGwge1xuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLmdldFNvcnQoKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlICYmIHZhbHVlLmxlbmd0aCA/IHZhbHVlLnNwbGl0KCcsJylbMF0gOiBudWxsO1xuICAgIH1cblxuICAgIGdldFNvcnRPcmRlcigpIDogc3RyaW5nIHwgbnVsbCB7XG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZ2V0U29ydCgpO1xuICAgICAgICByZXR1cm4gdmFsdWUgJiYgdmFsdWUubGVuZ3RoID8gdmFsdWUuc3BsaXQoJywnKVsxXSA6IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiBsaXN0IG9mIGtleS12YWx1ZSBwYWlycyBvZiBzb3J0IG9wdGlvbnNcbiAgICAgKi9cbiAgICBnZXRTb3J0T3B0aW9ucygpIDogeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyB9W10ge1xuICAgICAgICByZXR1cm4gU09SVF9PUFRJT05TX0RFRkFVTFQuc2xpY2UoMCk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGNsZWFyICgpIHtcbiAgICAgICAgdGhpcy5xdWVyeSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5kZWZhdWx0UXVlcnkpKTtcbiAgICB9XG59XG5cbmV4cG9ydCB7XG4gICAgUXVlcnkgYXMgZGVmYXVsdCxcbiAgICBRdWVyeSxcbiAgICBGaWVsZHMsXG4gICAgRmFjZXRzXG59O1xuIl19