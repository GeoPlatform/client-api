/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import Parameters from './parameters';
import Classifiers from './classifiers';
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
        var classifiers = this.getParameter(Parameters.CLASSIFIERS) || {};
        classifiers[classifier] = toArray(value);
        this.setParameter(Parameters.CLASSIFIERS, classifiers);
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
        /** @type {?} */
        var classifiers = this.getParameter(Parameters.CLASSIFIERS) || {};
        return classifiers[classifier] || [];
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
        if (!value || typeof (value) !== 'object' || Array.isArray(value)) {
            this.setParameter(Parameters.CLASSIFIERS, null);
            return;
        }
        /** @type {?} */
        var classes = Object.keys(Classifiers).map(function (k) { return Classifiers[k]; });
        /** @type {?} */
        var classifiers = this.getParameter(Parameters.CLASSIFIERS) || {};
        Object.keys(value).forEach(function (classifier) {
            if (~classes.indexOf(classifier)) {
                classifiers[classifier] = toArray(value[classifier]);
            }
        });
        this.setParameter(Parameters.CLASSIFIERS, classifiers);
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
        return this.getParameter(Parameters.CLASSIFIERS) || null;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50LyIsInNvdXJjZXMiOlsic2hhcmVkL3F1ZXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLFVBQVUsTUFBTSxjQUFjLENBQUM7QUFDdEMsT0FBTyxXQUFXLE1BQU0sZUFBZSxDQUFDOzs7Ozs7O0FBSXhDLElBQU0sTUFBTSxHQUFpQjtJQUN6QixhQUFhLEVBQVMsUUFBUTtJQUM5QixnQkFBZ0IsRUFBTSxpQkFBaUI7SUFDdkMsV0FBVyxFQUFXLGFBQWE7SUFDbkMsV0FBVyxFQUFXLGFBQWE7SUFDbkMsY0FBYyxFQUFRLFFBQVE7SUFDOUIsUUFBUSxFQUFjLFVBQVU7SUFDaEMsT0FBTyxFQUFlLFNBQVM7SUFDL0IsVUFBVSxFQUFZLFdBQVc7SUFDakMsUUFBUSxFQUFjLFVBQVU7SUFDaEMsV0FBVyxFQUFXLGFBQWE7SUFDbkMsYUFBYSxFQUFTLGVBQWU7SUFDckMsTUFBTSxFQUFnQixRQUFRO0lBQzlCLGFBQWEsRUFBUyxPQUFPO0lBQzdCLElBQUksRUFBa0IsTUFBTTtJQUM1QixXQUFXLEVBQVcsYUFBYTtJQUNuQyxRQUFRLEVBQWMsVUFBVTtJQUNoQyxLQUFLLEVBQWlCLE9BQU87SUFDN0IsZ0JBQWdCLEVBQU0sZ0JBQWdCO0lBQ3RDLE1BQU0sRUFBZ0IsUUFBUTtJQUM5QixVQUFVLEVBQVksV0FBVztJQUNqQyxVQUFVLEVBQVksV0FBVztJQUNqQyxNQUFNLEVBQWdCLFFBQVE7SUFDOUIsUUFBUSxFQUFjLFVBQVU7SUFDaEMsWUFBWSxFQUFVLGFBQWE7SUFDbkMsVUFBVSxFQUFZLFlBQVk7SUFDbEMsY0FBYyxFQUFRLGVBQWU7SUFDckMsWUFBWSxFQUFVLGFBQWE7SUFDbkMsUUFBUSxFQUFjLFVBQVU7SUFDaEMsT0FBTyxFQUFlLFNBQVM7SUFDL0IsVUFBVSxFQUFZLFlBQVk7SUFDbEMsTUFBTSxFQUFnQixRQUFRO0lBQzlCLFVBQVUsRUFBWSxX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QUFjOzs7SUFBZDtRQUNJLE9BQU8sb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3hDO0lBR0QsOERBQThEO0lBRzlEOztPQUVHOzs7OztJQUNILHFCQUFLOzs7O0lBQUw7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztLQUM5RDtnQkF6b0NMO0lBMG9DQyxDQUFBOzs7Ozs7O0FBRUQsT0FBTyxFQUNILEtBQUssSUFBSSxPQUFPLEVBQ2hCLEtBQUssRUFDTCxNQUFNLEVBQ04sTUFBTSxFQUNULENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBQYXJhbWV0ZXJzIGZyb20gJy4vcGFyYW1ldGVycyc7XG5pbXBvcnQgQ2xhc3NpZmllcnMgZnJvbSAnLi9jbGFzc2lmaWVycyc7XG5cbmludGVyZmFjZSBLVlA8VT4geyBbIGtleSA6IHN0cmluZyBdIDogVSB9XG5cbmNvbnN0IEZpZWxkcyA6IEtWUDxzdHJpbmc+ID0ge1xuICAgIEFDQ0VTU19SSUdIVFMgICAgICAgOiAncmlnaHRzJyxcbiAgICBBTFRFUk5BVEVfVElUTEVTICAgIDogJ2FsdGVybmF0ZVRpdGxlcycsXG4gICAgQU5OT1RBVElPTlMgICAgICAgICA6ICdhbm5vdGF0aW9ucycsXG4gICAgQ0xBU1NJRklFUlMgICAgICAgICA6ICdjbGFzc2lmaWVycycsXG4gICAgQ09OQ0VQVF9TQ0hFTUUgICAgICA6ICdzY2hlbWUnLFxuICAgIENPTlRBQ1RTICAgICAgICAgICAgOiAnY29udGFjdHMnLFxuICAgIENSRUFURUQgICAgICAgICAgICAgOiAnY3JlYXRlZCcsXG4gICAgQ1JFQVRFRF9CWSAgICAgICAgICA6ICdjcmVhdGVkQnknLFxuICAgIERBVEFTRVRTICAgICAgICAgICAgOiAnZGF0YXNldHMnLFxuICAgIERFU0NSSVBUSU9OICAgICAgICAgOiAnZGVzY3JpcHRpb24nLFxuICAgIERJU1RSSUJVVElPTlMgICAgICAgOiAnZGlzdHJpYnV0aW9ucycsXG4gICAgRVhURU5UICAgICAgICAgICAgICA6ICdleHRlbnQnLFxuICAgIEdBTExFUllfSVRFTVMgICAgICAgOiAnaXRlbXMnLFxuICAgIEhSRUYgICAgICAgICAgICAgICAgOiAnaHJlZicsXG4gICAgSURFTlRJRklFUlMgICAgICAgICA6ICdpZGVudGlmaWVycycsXG4gICAgS0VZV09SRFMgICAgICAgICAgICA6ICdrZXl3b3JkcycsXG4gICAgTEFCRUwgICAgICAgICAgICAgICA6ICdsYWJlbCcsXG4gICAgTEFTVF9NT0RJRklFRF9CWSAgICA6ICdsYXN0TW9kaWZpZWRCeScsXG4gICAgTEFZRVJTICAgICAgICAgICAgICA6ICdsYXllcnMnLFxuICAgIExBWUVSX1RZUEUgICAgICAgICAgOiAnbGF5ZXJUeXBlJyxcbiAgICBMQVlFUl9OQU1FICAgICAgICAgIDogJ2xheWVyTmFtZScsXG4gICAgTEVHRU5EICAgICAgICAgICAgICA6ICdsZWdlbmQnLFxuICAgIE1PRElGSUVEICAgICAgICAgICAgOiAnbW9kaWZpZWQnLFxuICAgIFBBUkVOVF9MQVlFUiAgICAgICAgOiAncGFyZW50TGF5ZXInLFxuICAgIFBVQkxJU0hFUlMgICAgICAgICAgOiAncHVibGlzaGVycycsXG4gICAgUkVTT1VSQ0VfVFlQRVMgICAgICA6ICdyZXNvdXJjZVR5cGVzJyxcbiAgICBTRVJWSUNFX1RZUEUgICAgICAgIDogJ3NlcnZpY2VUeXBlJyxcbiAgICBTRVJWSUNFUyAgICAgICAgICAgIDogJ3NlcnZpY2VzJyxcbiAgICBTUEFUSUFMICAgICAgICAgICAgIDogJ3NwYXRpYWwnLFxuICAgIFNUQVRJU1RJQ1MgICAgICAgICAgOiAnc3RhdGlzdGljcycsXG4gICAgU1RBVFVTICAgICAgICAgICAgICA6ICdzdGF0dXMnLFxuICAgIFNVQl9MQVlFUlMgICAgICAgICAgOiAnc3ViTGF5ZXJzJyxcbiAgICBURU1QT1JBTCAgICAgICAgICAgIDogJ3RlbXBvcmFsJyxcbiAgICBUSEVNRVMgICAgICAgICAgICAgIDogJ3RoZW1lcycsXG4gICAgVEhVTUJOQUlMICAgICAgICAgICA6ICd0aHVtYm5haWwnLFxuICAgIFRPUElDUyAgICAgICAgICAgICAgOiAndG9waWNzJyxcbiAgICBVU0VEX0JZICAgICAgICAgICAgIDogJ3VzZWRCeScsXG4gICAgVklTSUJJTElUWSAgICAgICAgICA6ICd2aXNpYmlsaXR5JyxcbiAgICBMQU5ESU5HX1BBR0UgICAgICAgIDogJ2xhbmRpbmdQYWdlJ1xufTtcblxuY29uc3QgRklFTERTX0RFRkFVTFQgOiBzdHJpbmdbXSA9IFtcbiAgICBGaWVsZHMuQ1JFQVRFRCwgRmllbGRzLk1PRElGSUVELCBGaWVsZHMuQ1JFQVRFRF9CWSxcbiAgICBGaWVsZHMuUFVCTElTSEVSUywgRmllbGRzLlRIRU1FUywgRmllbGRzLkRFU0NSSVBUSU9OXG5dO1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuY29uc3QgRmFjZXRzIDogS1ZQPHN0cmluZz4gPSB7XG4gICAgQUxURVJOQVRFX1RJVExFUyAgICA6ICdhbHRlcm5hdGVUaXRsZXMnLFxuICAgIENPTkNFUFRfU0NIRU1FUyAgICAgOiAnc2NoZW1lcycsXG4gICAgQ1JFQVRFRF9CWSAgICAgICAgICA6ICdjcmVhdGVkQnknLFxuICAgIEhSRUYgICAgICAgICAgICAgICAgOiAnaHJlZicsXG4gICAgSURFTlRJRklFUlMgICAgICAgICA6IFwiaWRlbnRpZmllcnNcIixcbiAgICBMQVlFUl9UWVBFICAgICAgICAgIDogJ2xheWVyVHlwZScsXG4gICAgTEFZRVJfTkFNRSAgICAgICAgICA6ICdsYXllck5hbWUnLFxuICAgIExJS0VTICAgICAgICAgICAgICAgOiAnbGlrZXMnLFxuICAgIE9OTElORSAgICAgICAgICAgICAgOiAnb25saW5lJyxcbiAgICBQVUJMSVNIRVJTICAgICAgICAgIDogJ3B1Ymxpc2hlcnMnLFxuICAgIENPTlRBQ1RTICAgICAgICAgICAgOiAnY29udGFjdHMnLFxuICAgIFJFTElBQklMSVRZICAgICAgICAgOiAncmVsaWFiaWxpdHknLFxuICAgIFNFUlZJQ0VfVFlQRVMgICAgICAgOiAnc2VydmljZVR5cGVzJyxcbiAgICBTUEVFRCAgICAgICAgICAgICAgIDogJ3NwZWVkJyxcbiAgICBTVEFUVVMgICAgICAgICAgICAgIDogJ3N0YXR1cycsXG4gICAgVEhFTUVTICAgICAgICAgICAgICA6ICd0aGVtZXMnLFxuICAgIFRPUElDUyAgICAgICAgICAgICAgOiAndG9waWNzJyxcbiAgICBUWVBFUyAgICAgICAgICAgICAgIDogJ3R5cGUnLCAgIC8vVE9ETyBjaGFuZ2UgdG8gJ3R5cGVzJ1xuICAgIFVTRURfQlkgICAgICAgICAgICAgOiAndXNlZEJ5JyxcbiAgICBWSUVXUyAgICAgICAgICAgICAgIDogJ3ZpZXdzJyxcbiAgICBWSVNJQklMSVRZICAgICAgICAgIDogJ3Zpc2liaWxpdHknXG59O1xuXG5jb25zdCBGQUNFVFNfREVGQVVMVCA6IHN0cmluZ1tdID0gW1xuICAgIEZhY2V0cy5UWVBFUyxcbiAgICBGYWNldHMuUFVCTElTSEVSUyxcbiAgICBGYWNldHMuU0VSVklDRV9UWVBFUyxcbiAgICBGYWNldHMuQ09OQ0VQVF9TQ0hFTUVTLFxuICAgIEZhY2V0cy5WSVNJQklMSVRZLFxuICAgIEZhY2V0cy5DUkVBVEVEX0JZXG5dO1xuXG5cbi8qXG4gICAgTWFwIGZhY2V0IGtleXMgdG8gcGFyYW1ldGVycyBzbyBjbGllbnRzIGNhbiBzZXRcbiAgICBxdWVyeSBwYXJhbXMgdXNpbmcgZmFjZXRlZCByZXN1bHRzXG5cbiAgICAvL1RPRE8gcmVtb3ZlIHRoZXNlIGFuZCB0aGVpciBmdW5jdGlvbiBiZWxvd1xuICovXG5jb25zdCBGYWNldFRvUGFyYW0gOiBLVlA8c3RyaW5nPiA9IHt9O1xuRmFjZXRUb1BhcmFtW0ZhY2V0cy5UWVBFU10gICAgICAgICAgID0gUGFyYW1ldGVycy5UWVBFUztcbkZhY2V0VG9QYXJhbVtGYWNldHMuVEhFTUVTXSAgICAgICAgICA9IFBhcmFtZXRlcnMuVEhFTUVTX0lEO1xuRmFjZXRUb1BhcmFtW0ZhY2V0cy5UT1BJQ1NdICAgICAgICAgID0gUGFyYW1ldGVycy5UT1BJQ1NfSUQ7XG5GYWNldFRvUGFyYW1bRmFjZXRzLlBVQkxJU0hFUlNdICAgICAgPSBQYXJhbWV0ZXJzLlBVQkxJU0hFUlNfSUQ7XG5GYWNldFRvUGFyYW1bRmFjZXRzLkNPTlRBQ1RTXSAgICAgICAgPSBQYXJhbWV0ZXJzLkNPTlRBQ1RTX0lEO1xuRmFjZXRUb1BhcmFtW0ZhY2V0cy5DT05DRVBUX1NDSEVNRVNdID0gUGFyYW1ldGVycy5TQ0hFTUVTX0lEO1xuRmFjZXRUb1BhcmFtW0ZhY2V0cy5VU0VEX0JZXSAgICAgICAgID0gUGFyYW1ldGVycy5VU0VEX0JZX0lEO1xuXG5cblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblxuY29uc3QgU09SVF9PUFRJT05TX0RFRkFVTFQgOiB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IH1bXSA9IFtcbiAgICB7IHZhbHVlOlwibGFiZWwsYXNjXCIsICAgICAgIGxhYmVsOiBcIk5hbWUgKEEtWilcIiAgICAgICAgICAgICAgfSxcbiAgICB7IHZhbHVlOlwibGFiZWwsZGVzY1wiLCAgICAgIGxhYmVsOiBcIk5hbWUgKFotQSlcIiAgICAgICAgICAgICAgfSxcbiAgICB7IHZhbHVlOlwidHlwZSxhc2NcIiwgICAgICAgIGxhYmVsOiBcIlR5cGUgKEEtWilcIiAgICAgICAgICAgICAgfSxcbiAgICB7IHZhbHVlOlwidHlwZSxkZXNjXCIsICAgICAgIGxhYmVsOiBcIlR5cGUgKFotQSlcIiAgICAgICAgICAgICAgfSxcbiAgICB7IHZhbHVlOlwibW9kaWZpZWQsZGVzY1wiLCAgIGxhYmVsOiBcIk1vc3QgcmVjZW50bHkgbW9kaWZpZWRcIiAgfSxcbiAgICB7IHZhbHVlOlwibW9kaWZpZWQsYXNjXCIsICAgIGxhYmVsOiBcIkxlYXN0IHJlY2VudGx5IG1vZGlmaWVkXCIgfSxcbiAgICB7IHZhbHVlOlwiX3Njb3JlLGRlc2NcIiwgICAgIGxhYmVsOiBcIlJlbGV2YW5jZVwiICAgICAgICAgICAgICAgfVxuXTtcblxuXG5jb25zdCBCQk9YX1JFR0VYID0gL15cXC0/XFxkKyhcXC5cXGQqKT8sXFwtP1xcZCsoXFwuXFxkKik/LFxcLT9cXGQrKFxcLlxcZCopPyxcXC0/XFxkKyhcXC5cXGQqKT8kLztcblxuXG5mdW5jdGlvbiB0b0FycmF5KHZhbHVlIDogYW55KSA6IGFueSB8IG51bGwge1xuICAgIGxldCByZXN1bHQgPSB2YWx1ZTtcbiAgICAvL2lmIGdpdmVuIGEgbm9uLWFycmF5IHZhbHVlLCB3cmFwIGluIGFycmF5XG4gICAgaWYocmVzdWx0ICE9PSBudWxsICYmIHR5cGVvZihyZXN1bHQucHVzaCkgPT09ICd1bmRlZmluZWQnKSByZXN1bHQgPSBbcmVzdWx0XTtcbiAgICAvL2lmIGFycmF5IHZhbHVlIGlzIGVtcHR5LCBudWxsaWZ5IHRoZSByZXN1bHRcbiAgICBpZihyZXN1bHQgIT09IG51bGwgJiYgIXJlc3VsdC5sZW5ndGgpIHJlc3VsdCA9IG51bGw7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8qKlxuICogUXVlcnlcbiAqXG4gKiBTcGVjaWZ5IHRoZSBcImRlZmF1bHRcIiBxdWVyeSBjb25zdHJhaW50cyB0byB1c2UgYnkgcGFzc2luZyBpbiAnb3B0aW9ucy5kZWZhdWx0cyA9IHsuLi59JztcbiAqXG4gKi9cbmNsYXNzIFF1ZXJ5IHtcblxuICAgIHB1YmxpYyBxdWVyeSA6IEtWUDxhbnk+O1xuICAgIHByaXZhdGUgZGVmYXVsdFF1ZXJ5IDogS1ZQPGFueT47XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIHNldCBvZiBpbml0aWFsIGNvbnN0cmFpbnRzXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA/OiBLVlA8YW55Pikge1xuICAgICAgICB0aGlzLmRlZmF1bHRRdWVyeSA9IHsgfTtcbiAgICAgICAgdGhpcy5kZWZhdWx0UXVlcnlbUGFyYW1ldGVycy5QQUdFLnRvU3RyaW5nKCldID0gMDtcbiAgICAgICAgdGhpcy5kZWZhdWx0UXVlcnlbUGFyYW1ldGVycy5QQUdFX1NJWkUudG9TdHJpbmcoKV0gPSAxMDtcbiAgICAgICAgdGhpcy5kZWZhdWx0UXVlcnlbUGFyYW1ldGVycy5TT1JULnRvU3RyaW5nKCldID0gXCJtb2RpZmllZCxkZXNjXCI7XG4gICAgICAgIHRoaXMuZGVmYXVsdFF1ZXJ5W1BhcmFtZXRlcnMuRklFTERTLnRvU3RyaW5nKCldID0gRklFTERTX0RFRkFVTFQuc2xpY2UoMCk7XG4gICAgICAgIHRoaXMuZGVmYXVsdFF1ZXJ5W1BhcmFtZXRlcnMuRkFDRVRTLnRvU3RyaW5nKCldID0gRkFDRVRTX0RFRkFVTFQuc2xpY2UoMCk7XG4gICAgICAgIGlmKG9wdGlvbnMgJiYgb3B0aW9ucy5kZWZhdWx0cykge1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmRlZmF1bHRRdWVyeSwgb3B0aW9ucy5kZWZhdWx0cyk7XG4gICAgICAgICAgICBkZWxldGUgb3B0aW9ucy5kZWZhdWx0cztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnF1ZXJ5ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLmRlZmF1bHRRdWVyeSkpO1xuICAgICAgICBpZihvcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5UGFyYW1ldGVycyhvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiBjb250YWluaW5nIHJlcXVlc3QtcmVhZHkgcGFyYW1ldGVycy92YWx1ZXNcbiAgICAgKi9cbiAgICBnZXRRdWVyeSgpIDogS1ZQPGFueT4ge1xuICAgICAgICBsZXQgcmVzdWx0IDogS1ZQPGFueT4gPSB7fTtcbiAgICAgICAgZm9yKGxldCBwcm9wIGluIHRoaXMucXVlcnkpIHtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRoaXMucXVlcnlbcHJvcF07XG4gICAgICAgICAgICBpZih2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YodmFsdWUucHVzaCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5qb2luKCcsJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHRbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4gUXVlcnlcbiAgICAgKi9cbiAgICBjbG9uZSgpIDogUXVlcnkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IFF1ZXJ5KCk7XG4gICAgICAgIGxldCBqc29uID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLnF1ZXJ5KSk7XG4gICAgICAgIHJlc3VsdC5hcHBseVBhcmFtZXRlcnMoanNvbik7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG5hbWVcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcmV0dXJuIFF1ZXJ5IHRoaXNcbiAgICAgKi9cbiAgICBwYXJhbWV0ZXIobmFtZSA6IHN0cmluZywgdmFsdWUgOiBhbnkpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihuYW1lLCB2YWx1ZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBuYW1lXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICovXG4gICAgc2V0UGFyYW1ldGVyIChuYW1lIDogc3RyaW5nLCB2YWx1ZTogYW55KSA6IHZvaWQge1xuICAgICAgICBpZih2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IC8vaWYgbm8gdmFsdWUgd2FzIHByb3ZpZGVcbiAgICAgICAgICAgICh0eXBlb2YodmFsdWUucHVzaCkgIT09ICd1bmRlZmluZWQnICYmICF2YWx1ZS5sZW5ndGgpKSAvL29yIGVtcHR5IGFycmF5XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5xdWVyeVtuYW1lXTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5xdWVyeVtuYW1lXSA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBrZXkgLSBuYW1lIG9mIHBhcmFtZXRlclxuICAgICAqIEByZXR1cm4gdmFsdWUgb2YgcGFyYW1ldGVyXG4gICAgICovXG4gICAgZ2V0UGFyYW1ldGVyIChrZXkgOiBzdHJpbmcpIDogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucXVlcnlba2V5XTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gb2JqIC0gc2V0IG9mIHBhcmFtZXRlci92YWx1ZXMgdG8gYXBwbHkgdG8gdGhpcyBxdWVyeVxuICAgICAqL1xuICAgIGFwcGx5UGFyYW1ldGVycyAob2JqIDogS1ZQPGFueT4pIDogdm9pZCB7wqBcbiAgICAgICAgZm9yKGxldCBwIGluIG9iaikge1xuICAgICAgICAgICAgaWYob2JqLmhhc093blByb3BlcnR5KHApKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIocCBhcyBzdHJpbmcsIG9ialtwXSBhcyBhbnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGZhY2V0IC0gbmFtZSBvZiBmYWNldCB0byBzZXQgdGhlIHZhbHVlIGZvciBhcyBhIHBhcmFtZXRlclxuICAgICAqIEBwYXJhbSB2YWx1ZSAtIHZhbHVlIG9mIHRoZSBmYWNldCB0byB1c2UgYXMgdGhlIHBhcmFtZXRlcidzIHZhbHVlXG4gICAgICovXG4gICAgIC8vVE9ETyByZW1vdmUgdGhpcyBmdW5jdGlvblxuICAgIHNldEZhY2V0UGFyYW1ldGVyIChmYWNldDogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSA6IHZvaWQge1xuICAgICAgICBsZXQgcGFyYW0gOiBzdHJpbmcgPSBGYWNldFRvUGFyYW1bZmFjZXRdO1xuICAgICAgICBpZighcGFyYW0pIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV0FSTiA6IFF1ZXJ5LmFwcGx5RmFjZXRQYXJhbWV0ZXIoKSAtIFwiICtcbiAgICAgICAgICAgICAgICBcInVuYWJsZSB0byBtYXAgZmFjZXQgdG8ga25vd24gcGFyYW1ldGVyICdcIiArIGZhY2V0ICsgXCInLCB1c2luZyBcIiArXG4gICAgICAgICAgICAgICAgXCJhcyBkaXJlY3QgcGFyYW1ldGVyIHdoaWNoIG1heSBub3Qgb3BlcmF0ZSBhcyBpbnRlbmRlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihwYXJhbXx8ZmFjZXQsIHZhbHVlKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gdGV4dFxuICAgICAqIEByZXR1cm4gUXVlcnkgdGhpc1xuICAgICAqL1xuICAgIHEodGV4dCA6IHN0cmluZykgOiBRdWVyeSB7IHRoaXMuc2V0USh0ZXh0KTsgcmV0dXJuIHRoaXM7IH1cblxuICAgIC8qKiBAcGFyYW0gdGV4dCAtIGZyZWUgdGV4dCBxdWVyeSAqL1xuICAgIHNldFEgKHRleHQgOiBzdHJpbmcpIDogdm9pZCB7IHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuUVVFUlksIHRleHQpOyB9XG4gICAgLyoqIEByZXR1cm4gKi9cbiAgICBnZXRRKCkgOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5RVUVSWSkgYXMgc3RyaW5nOyB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIGtleXdvcmRzKHRleHQgOiBzdHJpbmd8c3RyaW5nW10pIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldEtleXdvcmRzKHRleHQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gdGV4dCAtIGZyZWUgdGV4dCBxdWVyeVxuICAgICAqL1xuICAgIHNldEtleXdvcmRzICh0ZXh0IDogc3RyaW5nfHN0cmluZ1tdKSA6IHZvaWQge1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLktFWVdPUkRTLCB0b0FycmF5KHRleHQpKTtcbiAgICB9XG5cbiAgICBnZXRLZXl3b3JkcygpIDogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5LRVlXT1JEUyk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICB1cmkgKHVyaSA6IHN0cmluZykgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0VXJpKHVyaSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldFVyaSh1cmkgOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5VUkksIHVyaSk7XG4gICAgfVxuXG4gICAgZ2V0VXJpKCkgOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5VUkkpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgdHlwZXModHlwZXMgOiBzdHJpbmd8c3RyaW5nW10pIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldFR5cGVzKHR5cGVzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHR5cGVzIC0gbmFtZSBvZiBjbGFzcyhlcykgdG8gcmVxdWVzdFxuICAgICAqL1xuICAgIHNldFR5cGVzICh0eXBlcyA6IHN0cmluZ3xzdHJpbmdbXSkge1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlRZUEVTLCB0b0FycmF5KHR5cGVzKSk7XG4gICAgfVxuXG4gICAgZ2V0VHlwZXMgKCkgOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlRZUEVTKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIGNyZWF0ZWRCeSh1c2VyIDogc3RyaW5nKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRDcmVhdGVkQnkodXNlcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKiBAcGFyYW0gdXNlciAtIHVzZXJuYW1lICovXG4gICAgc2V0Q3JlYXRlZEJ5ICh1c2VyIDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuQ1JFQVRFRF9CWSwgdXNlcik7XG4gICAgfVxuXG4gICAgLyoqIEByZXR1cm4gdXNlcm5hbWUgKi9cbiAgICBnZXRDcmVhdGVkQnkgKCkgOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5DUkVBVEVEX0JZKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIGxhc3RNb2RpZmllZEJ5KHVzZXIgOiBzdHJpbmcpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldExhc3RNb2RpZmllZEJ5KHVzZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKiogQHBhcmFtIHVzZXIgLSB1c2VybmFtZSAqL1xuICAgIHNldExhc3RNb2RpZmllZEJ5ICh1c2VyOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5MQVNUX01PRElGSUVEX0JZLCB1c2VyKTtcbiAgICB9XG5cbiAgICAvKiogQHJldHVybiB1c2VybmFtZSAqL1xuICAgIGdldExhc3RNb2RpZmllZEJ5ICgpIDogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuTEFTVF9NT0RJRklFRF9CWSk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IGEgVGhlbWUgb3Igc2V0IG9mIFRoZW1lcyB0byBjb25zdHJhaW4gcmVzdWx0cy4gQnlcbiAgICAgKiBkZWZhdWx0LCB2YWx1ZXMgYXJlIGFzc3VtZWQgdG8gYmUgdGhlbWUgaWRlbnRpZmllcnMuIElmIHVzaW5nXG4gICAgICogdGhlbWUgbGFiZWxzIG9yIHRoZW1lIHVyaXMsIHNwZWNpZnkgdGhlIG9wdGlvbmFsIHNlY29uZCBwYXJhbWV0ZXJcbiAgICAgKiB0byBiZSBlaXRoZXIgUGFyYW1ldGVycy5USEVNRVNfTEFCRUwgb3IgUGFyYW1ldGVycy5USEVNRVNfVVJJXG4gICAgICogcmVzcGVjdGl2ZWx5LlxuICAgICAqIEBwYXJhbSB0aGVtZXMgLSBzdHJpbmcgb3IgYXJyYXkgb2Ygc3RyaW5ncyBjb250YWluaW5nIHRoZW1lIGNvbnN0cmFpbnRcbiAgICAgKiBAcGFyYW0gcGFyYW1ldGVyIC0gb3B0aW9uYWwsIHRvIGluZGljYXRlIHRoZSBwYXJhbWV0ZXIgdG8gdXNlXG4gICAgICogQHJldHVybiBRdWVyeVxuICAgICAqL1xuICAgIHRoZW1lcyh0aGVtZXM6IHN0cmluZ3xzdHJpbmdbXSwgcGFyYW1ldGVyPzpzdHJpbmcpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldFRoZW1lcyh0aGVtZXMsIHBhcmFtZXRlcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSBhIFRoZW1lIG9yIHNldCBvZiBUaGVtZXMgdG8gY29uc3RyYWluIHJlc3VsdHMuIEJ5XG4gICAgICogZGVmYXVsdCwgdmFsdWVzIGFyZSBhc3N1bWVkIHRvIGJlIHRoZW1lIGlkZW50aWZpZXJzLiBJZiB1c2luZ1xuICAgICAqIHRoZW1lIGxhYmVscyBvciB0aGVtZSB1cmlzLCBzcGVjaWZ5IHRoZSBvcHRpb25hbCBzZWNvbmQgcGFyYW1ldGVyXG4gICAgICogdG8gYmUgZWl0aGVyIFBhcmFtZXRlcnMuVEhFTUVTX0xBQkVMIG9yIFBhcmFtZXRlcnMuVEhFTUVTX1VSSVxuICAgICAqIHJlc3BlY3RpdmVseS5cbiAgICAgKiBAcGFyYW0gdGhlbWVzIC0gdGhlbWUgb3IgdGhlbWVzIHRvIGNvbnN0cmFpbiBieVxuICAgICAqL1xuICAgIHNldFRoZW1lcyAodGhlbWVzOnN0cmluZ3xzdHJpbmdbXSwgcGFyYW1ldGVyPzpzdHJpbmcpIHtcblxuICAgICAgICAvL2NsZWFyIGV4aXN0aW5nXG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVEhFTUVTX0lELCBudWxsKTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5USEVNRVNfTEFCRUwsIG51bGwpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlRIRU1FU19VUkksIG51bGwpO1xuXG4gICAgICAgIGxldCBwYXJhbSA9IHBhcmFtZXRlciB8fCBQYXJhbWV0ZXJzLlRIRU1FU19JRDtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIocGFyYW0sIHRvQXJyYXkodGhlbWVzKSk7XG4gICAgfVxuXG4gICAgZ2V0VGhlbWVzICgpIDogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5USEVNRVNfSUQpIHx8XG4gICAgICAgICAgICB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlRIRU1FU19MQUJFTCkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVEhFTUVTX1VSSSk7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSBhIFRvcGljIG9yIHNldCBvZiBUb3BpY3MgdG8gY29uc3RyYWluIHJlc3VsdHMuIEJ5XG4gICAgICogZGVmYXVsdCwgdmFsdWVzIGFyZSBhc3N1bWVkIHRvIGJlIHRoZW1lIGlkZW50aWZpZXJzLiBJZiB1c2luZ1xuICAgICAqIHRoZW1lIGxhYmVscyBvciB0aGVtZSB1cmlzLCBzcGVjaWZ5IHRoZSBvcHRpb25hbCBzZWNvbmQgcGFyYW1ldGVyXG4gICAgICogdG8gYmUgZWl0aGVyIFBhcmFtZXRlcnMuVE9QSUNfTEFCRUwgb3IgUGFyYW1ldGVycy5UT1BJQ19VUklcbiAgICAgKiByZXNwZWN0aXZlbHkuXG4gICAgICogQHBhcmFtICB0b3BpY3MgLSBzdHJpbmcgb3IgYXJyYXkgb2Ygc3RyaW5ncyBjb250YWluaW5nIHRoZW1lIGNvbnN0cmFpbnRcbiAgICAgKiBAcGFyYW0gIHBhcmFtZXRlciAtIG9wdGlvbmFsLCB0byBpbmRpY2F0ZSB0aGUgcGFyYW1ldGVyIHRvIHVzZVxuICAgICAqIEByZXR1cm4gUXVlcnkgaW5zdGFuY2VcbiAgICAgKi9cbiAgICB0b3BpY3ModG9waWNzOnN0cmluZ3xzdHJpbmdbXSwgcGFyYW1ldGVyID86IHN0cmluZykgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0VG9waWNzKHRvcGljcywgcGFyYW1ldGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IGEgVG9waWMgb3Igc2V0IG9mIFRvcGljcyB0byBjb25zdHJhaW4gcmVzdWx0cy4gQnlcbiAgICAgKiBkZWZhdWx0LCB2YWx1ZXMgYXJlIGFzc3VtZWQgdG8gYmUgdGhlbWUgaWRlbnRpZmllcnMuIElmIHVzaW5nXG4gICAgICogdGhlbWUgbGFiZWxzIG9yIHRoZW1lIHVyaXMsIHNwZWNpZnkgdGhlIG9wdGlvbmFsIHNlY29uZCBwYXJhbWV0ZXJcbiAgICAgKiB0byBiZSBlaXRoZXIgUGFyYW1ldGVycy5UT1BJQ19MQUJFTCBvciBQYXJhbWV0ZXJzLlRPUElDX1VSSVxuICAgICAqIHJlc3BlY3RpdmVseS5cbiAgICAgKiBAcGFyYW0gdG9waWNzIC0gdGhlbWUgb3IgdG9waWNzIHRvIGNvbnN0cmFpbiBieVxuICAgICAqL1xuICAgIHNldFRvcGljcyAodG9waWNzOnN0cmluZ3xzdHJpbmdbXSwgcGFyYW1ldGVyID86IHN0cmluZykge1xuXG4gICAgICAgIC8vY2xlYXIgZXhpc3RpbmdcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5UT1BJQ1NfSUQsIG51bGwpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlRPUElDU19MQUJFTCwgbnVsbCk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVE9QSUNTX1VSSSwgbnVsbCk7XG5cbiAgICAgICAgbGV0IHBhcmFtID0gcGFyYW1ldGVyIHx8IFBhcmFtZXRlcnMuVE9QSUNTX0lEO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihwYXJhbSwgdG9BcnJheSh0b3BpY3MpKTtcbiAgICB9XG5cbiAgICBnZXRUb3BpY3MgKCkgOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlRPUElDU19JRCkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVE9QSUNTX0xBQkVMKSB8fFxuICAgICAgICAgICAgdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5UT1BJQ1NfVVJJKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgYSBQdWJsaXNoZXIgb3Igc2V0IG9mIFB1Ymxpc2hlcnMgdG8gY29uc3RyYWluIHJlc3VsdHMuIEJ5XG4gICAgICogZGVmYXVsdCwgdmFsdWVzIGFyZSBhc3N1bWVkIHRvIGJlIGlkZW50aWZpZXJzLiBJZiB1c2luZyBsYWJlbHMgb3IgdXJpcyxcbiAgICAgKiBzcGVjaWZ5IHRoZSBvcHRpb25hbCBzZWNvbmQgcGFyYW1ldGVyIHRvIGJlIGVpdGhlclxuICAgICAqIFBhcmFtZXRlcnMuUFVCTElTSEVSU19MQUJFTCBvciBQYXJhbWV0ZXJzLlBVQkxJU0hFUlNfVVJJIHJlc3BlY3RpdmVseS5cbiAgICAgKiBAcGFyYW0gcGFyYW1ldGVyIC0gb3B0aW9uYWwsIHRvIGluZGljYXRlIHRoZSBwYXJhbWV0ZXIgdG8gdXNlXG4gICAgICogQHJldHVybiBRdWVyeVxuICAgICAqL1xuICAgIHB1Ymxpc2hlcnMocHVibGlzaGVyczpzdHJpbmd8c3RyaW5nW10sIHBhcmFtZXRlcj86c3RyaW5nKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRQdWJsaXNoZXJzKHB1Ymxpc2hlcnMsIHBhcmFtZXRlcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgYSBQdWJsaXNoZXIgb3Igc2V0IG9mIFB1Ymxpc2hlcnMgdG8gY29uc3RyYWluIHJlc3VsdHMuIEJ5XG4gICAgICogZGVmYXVsdCwgdmFsdWVzIGFyZSBhc3N1bWVkIHRvIGJlIGlkZW50aWZpZXJzLiBJZiB1c2luZyBsYWJlbHMgb3IgdXJpcyxcbiAgICAgKiBzcGVjaWZ5IHRoZSBvcHRpb25hbCBzZWNvbmQgcGFyYW1ldGVyIHRvIGJlIGVpdGhlclxuICAgICAqIFBhcmFtZXRlcnMuUFVCTElTSEVSU19MQUJFTCBvciBQYXJhbWV0ZXJzLlBVQkxJU0hFUlNfVVJJIHJlc3BlY3RpdmVseS5cbiAgICAgKiBAcGFyYW0gcHVibGlzaGVycyAtIHB1Ymxpc2hpbmcgb3JncyB0byBjb25zdHJhaW4gYnlcbiAgICAgKi9cbiAgICBzZXRQdWJsaXNoZXJzIChwdWJsaXNoZXJzOnN0cmluZ3xzdHJpbmdbXSwgcGFyYW1ldGVyPzpzdHJpbmcpIHtcblxuICAgICAgICAvL2NsZWFyIGV4aXN0aW5nXG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuUFVCTElTSEVSU19JRCwgbnVsbCk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuUFVCTElTSEVSU19MQUJFTCwgbnVsbCk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuUFVCTElTSEVSU19VUkksIG51bGwpO1xuXG4gICAgICAgIGxldCBwYXJhbSA9IHBhcmFtZXRlciB8fCBQYXJhbWV0ZXJzLlBVQkxJU0hFUlNfSUQ7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKHBhcmFtLCB0b0FycmF5KHB1Ymxpc2hlcnMpKTtcbiAgICB9XG5cbiAgICBnZXRQdWJsaXNoZXJzICgpIDogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5QVUJMSVNIRVJTX0lEKSB8fFxuICAgICAgICAgICAgdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5QVUJMSVNIRVJTX0xBQkVMKSB8fFxuICAgICAgICAgICAgdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5QVUJMSVNIRVJTX1VSSSk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IGEgUG9pbnQgb2YgQ29udGFjdCBvciBzZXQgb2YgQ29udGFjdHMgdG8gY29uc3RyYWluIHJlc3VsdHMuIEJ5XG4gICAgICogZGVmYXVsdCwgdmFsdWVzIGFyZSBhc3N1bWVkIHRvIGJlIGlkZW50aWZpZXJzLiBJZiB1c2luZ1xuICAgICAqIGxhYmVscyBvciB1cmlzLCBzcGVjaWZ5IHRoZSBvcHRpb25hbCBzZWNvbmQgcGFyYW1ldGVyIHRvIGJlIGVpdGhlclxuICAgICAqIFBhcmFtZXRlcnMuQ09OVEFDVFNfTEFCRUwgb3IgUGFyYW1ldGVycy5DT05UQUNUU19VUkkgcmVzcGVjdGl2ZWx5LlxuICAgICAqIEBwYXJhbSBwYXJhbWV0ZXIgLSBvcHRpb25hbCwgdG8gaW5kaWNhdGUgdGhlIHBhcmFtZXRlciB0byB1c2VcbiAgICAgKiBAcmV0dXJuIFF1ZXJ5XG4gICAgICovXG4gICAgY29udGFjdHMoY29udGFjdHM6c3RyaW5nfHN0cmluZ1tdLCBwYXJhbWV0ZXI/OnN0cmluZykgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0Q29udGFjdHMoY29udGFjdHMsIHBhcmFtZXRlcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgYSBDb250YWN0IG9yIHNldCBvZiBDb250YWN0cyB0byBjb25zdHJhaW4gcmVzdWx0cy4gQnlcbiAgICAgKiBkZWZhdWx0LCB2YWx1ZXMgYXJlIGFzc3VtZWQgdG8gYmUgaWRlbnRpZmllcnMuIElmIHVzaW5nXG4gICAgICogbGFiZWxzIG9yIHVyaXMsIHNwZWNpZnkgdGhlIG9wdGlvbmFsIHNlY29uZCBwYXJhbWV0ZXIgdG8gYmUgZWl0aGVyXG4gICAgICogUGFyYW1ldGVycy5DT05UQUNUU19MQUJFTCBvciBQYXJhbWV0ZXJzLkNPTlRBQ1RTX1VSSSByZXNwZWN0aXZlbHkuXG4gICAgICogQHBhcmFtIGNvbnRhY3RzIC0gcHVibGlzaGluZyBvcmdzIHRvIGNvbnN0cmFpbiBieVxuICAgICAqL1xuICAgIHNldENvbnRhY3RzIChjb250YWN0czpzdHJpbmd8c3RyaW5nW10sIHBhcmFtZXRlcj86c3RyaW5nKSB7XG5cbiAgICAgICAgLy9jbGVhciBleGlzdGluZ1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkNPTlRBQ1RTX0lELCBudWxsKTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5DT05UQUNUU19MQUJFTCwgbnVsbCk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuQ09OVEFDVFNfVVJJLCBudWxsKTtcblxuICAgICAgICBsZXQgcGFyYW0gPSBwYXJhbWV0ZXIgfHwgUGFyYW1ldGVycy5DT05UQUNUU19JRDtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIocGFyYW0sIHRvQXJyYXkoY29udGFjdHMpKTtcbiAgICB9XG5cbiAgICBnZXRDb250YWN0cyAoKSA6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuQ09OVEFDVFNfSUQpIHx8XG4gICAgICAgICAgICB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkNPTlRBQ1RTX0xBQkVMKSB8fFxuICAgICAgICAgICAgdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5DT05UQUNUU19VUkkpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSB0aGUgaWRlbnRpZmllciBvZiBhbiBBZ2VudCAoQ29tbXVuaXR5LCBHcm91cCwgZXRjKSB0aGF0XG4gICAgICogdXNlcyBpdGVtcyB5b3Ugd2lzaCB0byBmaW5kIGluIHNlYXJjaCByZXN1bHRzLiBCeVxuICAgICAqIGRlZmF1bHQsIHZhbHVlcyBhcmUgYXNzdW1lZCB0byBiZSBpZGVudGlmaWVycy4gSWYgdXNpbmdcbiAgICAgKiBsYWJlbHMgb3IgdXJpcywgc3BlY2lmeSB0aGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlclxuICAgICAqIHRvIGJlIGVpdGhlciBQYXJhbWV0ZXJzLlVTRURfQllfTEFCRUwgb3IgUGFyYW1ldGVycy5VU0VEX0JZX1VSSVxuICAgICAqIHJlc3BlY3RpdmVseS5cbiAgICAgKiBAcGFyYW0gcGFyYW1ldGVyIC0gb3B0aW9uYWwsIHRvIGluZGljYXRlIHRoZSBwYXJhbWV0ZXIgdG8gdXNlXG4gICAgICogQHJldHVybiBRdWVyeVxuICAgICAqL1xuICAgIHVzZWRCeShpZHM6c3RyaW5nfHN0cmluZ1tdLCBwYXJhbWV0ZXI/OnN0cmluZykgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0VXNlZEJ5KGlkcywgcGFyYW1ldGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSB0aGUgaWRlbnRpZmllciBvZiBhbiBBZ2VudCAoQ29tbXVuaXR5LCBHcm91cCwgZXRjKSB0aGF0XG4gICAgICogdXNlcyBpdGVtcyB5b3Ugd2lzaCB0byBmaW5kIGluIHNlYXJjaCByZXN1bHRzLiBCeVxuICAgICAqIGRlZmF1bHQsIHZhbHVlcyBhcmUgYXNzdW1lZCB0byBiZSBpZGVudGlmaWVycy4gSWYgdXNpbmdcbiAgICAgKiBsYWJlbHMgb3IgdXJpcywgc3BlY2lmeSB0aGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlclxuICAgICAqIHRvIGJlIGVpdGhlciBQYXJhbWV0ZXJzLlVTRURfQllfTEFCRUwgb3IgUGFyYW1ldGVycy5VU0VEX0JZX1VSSVxuICAgICAqIHJlc3BlY3RpdmVseS5cbiAgICAgKiBAcGFyYW0gaWRzIC0gcHVibGlzaGluZyBvcmdzIHRvIGNvbnN0cmFpbiBieVxuICAgICAqL1xuICAgIHNldFVzZWRCeSAoaWRzOnN0cmluZ3xzdHJpbmdbXSwgcGFyYW1ldGVyPzpzdHJpbmcpIHtcblxuICAgICAgICAvL2NsZWFyIGV4aXN0aW5nXG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVVNFRF9CWV9JRCwgbnVsbCk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVVNFRF9CWV9MQUJFTCwgbnVsbCk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVVNFRF9CWV9VUkksIG51bGwpO1xuXG4gICAgICAgIGxldCBwYXJhbSA9IHBhcmFtZXRlciB8fCBQYXJhbWV0ZXJzLlVTRURfQllfSUQ7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKHBhcmFtLCB0b0FycmF5KGlkcykpO1xuICAgIH1cblxuICAgIGdldFVzZWRCeSAoKSA6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVVNFRF9CWV9JRCkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVVNFRF9CWV9MQUJFTCkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVVNFRF9CWV9VUkkpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSBhIENvbmNlcHQgU2NoZW1lIG9yIHNldCBvZiBDb25jZXB0IFNjaGVtZXMgdG8gY29uc3RyYWluIHJlc3VsdHMuIEJ5XG4gICAgICogZGVmYXVsdCwgdmFsdWVzIGFyZSBhc3N1bWVkIHRvIGJlIGlkZW50aWZpZXJzLiBJZiB1c2luZ1xuICAgICAqIGxhYmVscyBvciB1cmlzLCBzcGVjaWZ5IHRoZSBvcHRpb25hbCBzZWNvbmQgcGFyYW1ldGVyXG4gICAgICogdG8gYmUgZWl0aGVyIFBhcmFtZXRlcnMuU0NIRU1FU19MQUJFTCBvciBQYXJhbWV0ZXJzLlNDSEVNRVNfVVJJXG4gICAgICogcmVzcGVjdGl2ZWx5LlxuICAgICAqIEBwYXJhbSBzY2hlbWVzIC0gc2NoZW1lcyB0byBjb25zdHJhaW4gYnlcbiAgICAgKiBAcGFyYW0gcGFyYW1ldGVyIC0gb3B0aW9uYWwsIHRvIGluZGljYXRlIHRoZSBwYXJhbWV0ZXIgdG8gdXNlXG4gICAgICogQHJldHVybiBRdWVyeVxuICAgICAqL1xuICAgIHNjaGVtZXMoc2NoZW1lczpzdHJpbmd8c3RyaW5nW10sIHBhcmFtZXRlcj86c3RyaW5nKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRTY2hlbWVzKHNjaGVtZXMsIHBhcmFtZXRlcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgYSBDb25jZXB0IFNjaGVtZSBvciBzZXQgb2YgQ29uY2VwdCBTY2hlbWVzIHRvIGNvbnN0cmFpbiByZXN1bHRzLiBCeVxuICAgICAqIGRlZmF1bHQsIHZhbHVlcyBhcmUgYXNzdW1lZCB0byBiZSB0aGVtZSBpZGVudGlmaWVycy4gSWYgdXNpbmdcbiAgICAgKiB0aGVtZSBsYWJlbHMgb3IgdGhlbWUgdXJpcywgc3BlY2lmeSB0aGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlclxuICAgICAqIHRvIGJlIGVpdGhlciBQYXJhbWV0ZXJzLlNDSEVNRVNfTEFCRUwgb3IgUGFyYW1ldGVycy5TQ0hFTUVTX1VSSVxuICAgICAqIHJlc3BlY3RpdmVseS5cbiAgICAgKiBAcGFyYW0gc2NoZW1lcyAtIHNjaGVtZXMgdG8gY29uc3RyYWluIGJ5XG4gICAgICogQHBhcmFtIHBhcmFtZXRlciAtIG9wdGlvbmFsLCB0byBpbmRpY2F0ZSB0aGUgcGFyYW1ldGVyIHRvIHVzZVxuICAgICAqL1xuICAgIHNldFNjaGVtZXMgKHNjaGVtZXM6c3RyaW5nfHN0cmluZ1tdLCBwYXJhbWV0ZXI/OnN0cmluZykge1xuXG4gICAgICAgIC8vY2xlYXIgZXhpc3RpbmdcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5TQ0hFTUVTX0lELCBudWxsKTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5TQ0hFTUVTX0xBQkVMLCBudWxsKTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5TQ0hFTUVTX1VSSSwgbnVsbCk7XG5cbiAgICAgICAgbGV0IHBhcmFtID0gcGFyYW1ldGVyIHx8IFBhcmFtZXRlcnMuU0NIRU1FU19JRDtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIocGFyYW0sIHRvQXJyYXkoc2NoZW1lcykpO1xuICAgIH1cblxuICAgIGdldFNjaGVtZXMoKSA6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuU0NIRU1FU19JRCkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuU0NIRU1FU19MQUJFTCkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuU0NIRU1FU19VUkkpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgc2VydmljZVR5cGVzKHR5cGVzOnN0cmluZ3xzdHJpbmdbXSkgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0U2VydmljZVR5cGVzKHR5cGVzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHR5cGVzIC0gaWRzXG4gICAgICovXG4gICAgc2V0U2VydmljZVR5cGVzICh0eXBlczpzdHJpbmd8c3RyaW5nW10pIHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5TRVJWSUNFX1RZUEVTLCB0b0FycmF5KHR5cGVzKSk7XG4gICAgfVxuXG4gICAgZ2V0U2VydmljZVR5cGVzICgpIDogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5TRVJWSUNFX1RZUEVTKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIHZpc2liaWxpdHkodmlzOlwicHVibGljXCJ8XCJwcml2YXRlXCIpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldFZpc2liaWxpdHkodmlzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHZpc2liaWxpdHkgLSBvbmUgb2YgJ3B1YmxpYycgb3IgJ3ByaXZhdGUnXG4gICAgICovXG4gICAgc2V0VmlzaWJpbGl0eSAodmlzaWJpbGl0eSA6IFwicHVibGljXCJ8XCJwcml2YXRlXCIpIHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5WSVNJQklMSVRZLCB2aXNpYmlsaXR5KTtcbiAgICB9XG5cbiAgICBnZXRWaXNpYmlsaXR5ICgpIDogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVklTSUJJTElUWSk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICBzdGF0dXModmFsdWUgOiBzdHJpbmcpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldFN0YXR1cyh2YWx1ZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBzdGF0dXMgLSBjdXJyZW50IHN0YXR1cyBvZiBJdGVtXG4gICAgICovXG4gICAgc2V0U3RhdHVzICh2YWx1ZSA6IHN0cmluZykge1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlNUQVRVUywgdmFsdWUpO1xuICAgIH1cblxuICAgIGdldFN0YXR1cyAoKSA6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlNUQVRVUyk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICBleHRlbnQoYmJveCA6IGFueSkgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0RXh0ZW50KGJib3gpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gYmJveCAtIHN0cmluZyBmb3JtIG9mIFwibWlueCxtaW55LG1heHgsbWF4eVwiLCBvciBMLkxhdExuZ0JvdW5kcywgb3IgQXJyYXlcbiAgICAgKi9cbiAgICBzZXRFeHRlbnQgKGJib3ggOiBhbnkpIHtcbiAgICAgICAgaWYoYmJveCkge1xuICAgICAgICAgICAgaWYodHlwZW9mKGJib3gudG9CYm94U3RyaW5nKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAvL0xlYWZsZXQgQm91bmRzIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgYmJveCA9IGJib3gudG9CYm94U3RyaW5nKCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZih0eXBlb2YoYmJveC5wdXNoKSAhPT0gJ3VuZGVmaW5lZCcgJiYgYmJveC5sZW5ndGggJiZcbiAgICAgICAgICAgICAgICAvL05lc3RlZCBhcnJheSAoYWx0ZXJuYXRlIExlYWZsZXQgcmVwcmVzZW50YXRpb24pOlxuICAgICAgICAgICAgICAgIC8vIFsgW21pbkxhdCxtaW5Mb25nXSwgW21heExhdCxtYXhMb25nXSBdXG4gICAgICAgICAgICAgICAgdHlwZW9mKGJib3hbMF0ucHVzaCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgYmJveCA9IGJib3hbMF1bMV0rJywnK2Jib3hbMF1bMF0rJywnK2Jib3hbMV1bMV0rJywnK2Jib3hbMV1bMF07XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZih0eXBlb2YoYmJveCkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgaWYoIUJCT1hfUkVHRVgudGVzdChiYm94KSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGFyZ3VtZW50OiBiYm94IHN0cmluZyBtdXN0IGJlIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaW4gZm9ybSBvZiAnbWlueCxtaW55LG1heHgsbWF4eSdcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGFyZ3VtZW50OiBiYm94IG11c3QgYmUgb25lIG9mIFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCJMZWFmbGV0LkJvdW5kcywgbmVzdGVkIGFycmF5LCBvciBiYm94IHN0cmluZ1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkVYVEVOVCwgYmJveCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiBiYm94IHN0cmluZyBvciBudWxsIGlmIG5vdCBzZXRcbiAgICAgKi9cbiAgICBnZXRFeHRlbnQgKCkgOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5FWFRFTlQpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgLyoqXG4gICAgICogRXguXG4gICAgICogIGNvbnN0IHsgS0dDbGFzc2lmaWVycywgUXVlcnkgfSBmcm9tICdnZW9wbGF0Zm9ybS5jbGllbnQnO1xuICAgICAqICBsZXQgcHVycG9zZUlkID0gJy4uLic7XG4gICAgICogIGxldCBxdWVyeSA9IG5ldyBRdWVyeSgpO1xuICAgICAqICBxdWVyeS5jbGFzc2lmaWVyKCBLR0NsYXNzaWZpZXJzLlBVUlBPU0UsIHB1cnBvc2VJZCApO1xuICAgICAqXG4gICAgICogQHBhcmFtIGNsYXNzaWZpZXIgLSBzdHJpbmcgbmFtZSBvZiBjbGFzc2lmaWVyIHRvIHVzZVxuICAgICAqIEBwYXJhbSB2YWx1ZSAtIGlkIG9yIGFycmF5IG9mIGlkcyBvZiBjb25jZXB0cyB0byB1c2VcbiAgICAgKiBAcmV0dXJuIFF1ZXJ5XG4gICAgICovXG4gICAgY2xhc3NpZmllcihjbGFzc2lmaWVyIDogc3RyaW5nLCB2YWx1ZSA6IHN0cmluZ3xzdHJpbmdbXSkgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0Q2xhc3NpZmllcihjbGFzc2lmaWVyLCB2YWx1ZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV4LlxuICAgICAqICBjb25zdCB7IEtHQ2xhc3NpZmllcnMsIFF1ZXJ5IH0gZnJvbSAnZ2VvcGxhdGZvcm0uY2xpZW50JztcbiAgICAgKiAgbGV0IHB1cnBvc2VJZCA9ICcuLi4nO1xuICAgICAqICBsZXQgcXVlcnkgPSBuZXcgUXVlcnkoKTtcbiAgICAgKiAgcXVlcnkuc2V0Q2xhc3NpZmllciggS0dDbGFzc2lmaWVycy5QVVJQT1NFLCBwdXJwb3NlSWQgKTtcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjbGFzc2lmaWVyIC0gc3RyaW5nIG5hbWUgb2YgY2xhc3NpZmllciB0byB1c2VcbiAgICAgKiBAcGFyYW0gdmFsdWUgLSBpZCBvciBhcnJheSBvZiBpZHMgb2YgY29uY2VwdHMgdG8gdXNlXG4gICAgICovXG4gICAgc2V0Q2xhc3NpZmllcihjbGFzc2lmaWVyIDogc3RyaW5nLCB2YWx1ZSA6IHN0cmluZ3xzdHJpbmdbXSkge1xuICAgICAgICBsZXQgY2xhc3NpZmllcnMgPSB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkNMQVNTSUZJRVJTKSB8fCB7fTtcbiAgICAgICAgY2xhc3NpZmllcnNbY2xhc3NpZmllcl0gPSB0b0FycmF5KHZhbHVlKTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5DTEFTU0lGSUVSUywgY2xhc3NpZmllcnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBjbGFzc2lmaWVyIC0gbmFtZSBvZiBjbGFzc2lmaWVyIGNvbnN0cmFpbnQgaW4gdXNlXG4gICAgICogQHJldHVybiBhcnJheSBvZiBjb25jZXB0IGlkc1xuICAgICAqL1xuICAgIGdldENsYXNzaWZpZXIoY2xhc3NpZmllciA6IHN0cmluZykgOiBzdHJpbmdbXSB7XG4gICAgICAgIGxldCBjbGFzc2lmaWVycyA9IHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuQ0xBU1NJRklFUlMpIHx8IHt9O1xuICAgICAgICByZXR1cm4gY2xhc3NpZmllcnNbY2xhc3NpZmllcl0gfHwgW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXguXG4gICAgICogIGNvbnN0IHsgS0dDbGFzc2lmaWVycywgUXVlcnkgfSBmcm9tICdnZW9wbGF0Zm9ybS5jbGllbnQnO1xuICAgICAqICBsZXQgcHVycG9zZUlkID0gJy4uLicsXG4gICAgICogICAgICBmdW5jdGlvbklkcyA9IFsnLi4uJywnLi4uJ107XG4gICAgICogIGxldCBxdWVyeSA9IG5ldyBRdWVyeSgpO1xuICAgICAqICBxdWVyeS5jbGFzc2lmaWVycyh7XG4gICAgICogICAgICAgS0dDbGFzc2lmaWVycy5QVVJQT1NFOiBwdXJwb3NlSWQsXG4gICAgICogICAgICAgS0dDbGFzc2lmaWVycy5GVU5DVElPTjogZnVuY3Rpb25JZHNcbiAgICAgKiAgfSk7XG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmFsdWUgLSBvYmplY3QgZGVmaW5pbmcgY2xhc3NpZmllcnNcbiAgICAgKiBAcmV0dXJuIFF1ZXJ5IGluc3RhbmNlXG4gICAgICovXG4gICAgY2xhc3NpZmllcnModmFsdWUgOiBhbnkpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldENsYXNzaWZpZXJzKHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHZhbHVlIC0gb2JqZWN0IGRlZmluaW5nIGNsYXNzaWZpZXJzXG4gICAgICovXG4gICAgc2V0Q2xhc3NpZmllcnMgKHZhbHVlIDogYW55KSB7XG4gICAgICAgIGlmKCF2YWx1ZSB8fCB0eXBlb2YodmFsdWUpICE9PSAnb2JqZWN0JyB8fCBBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5DTEFTU0lGSUVSUywgbnVsbCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY2xhc3NlcyA9IE9iamVjdC5rZXlzKENsYXNzaWZpZXJzKS5tYXAoaz0+Q2xhc3NpZmllcnNba10pO1xuICAgICAgICBsZXQgY2xhc3NpZmllcnMgPSB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkNMQVNTSUZJRVJTKSB8fCB7fTtcbiAgICAgICAgT2JqZWN0LmtleXModmFsdWUpLmZvckVhY2goIGNsYXNzaWZpZXIgPT4ge1xuICAgICAgICAgICAgaWYofmNsYXNzZXMuaW5kZXhPZihjbGFzc2lmaWVyKSkge1xuICAgICAgICAgICAgICAgIGNsYXNzaWZpZXJzW2NsYXNzaWZpZXJdID0gdG9BcnJheSh2YWx1ZVtjbGFzc2lmaWVyXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkNMQVNTSUZJRVJTLCBjbGFzc2lmaWVycyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiBjbGFzc2lmaWVycyB1c2VkIGluIHRoZSBxdWVyeVxuICAgICAqL1xuICAgIGdldENsYXNzaWZpZXJzICgpIDogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuQ0xBU1NJRklFUlMpIHx8IG51bGw7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICBtb2RpZmllZChkYXRlIDogbnVtYmVyfERhdGUsIGJlZm9yZU9yQWZ0ZXIgOiBib29sZWFuKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRNb2RpZmllZChkYXRlLCBiZWZvcmVPckFmdGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGRhdGUgLSBkYXRlIHRvIGNvbXBhcmUgYWdhaW5zdFxuICAgICAqIEBwYXJhbSBiZWZvcmVPckFmdGVyIC0gZmxhZyBzcGVjaWZ5aW5nIHdoaWNoIGJvdW5kYXJ5IGNvbmRpdGlvbiAodHJ1ZSA9IGJlZm9yZSwgZmFsc2UgPSBhZnRlcikgZmxhZyBzcGVjaWZ5aW5nIHdoZXRoZXIgdG8gdHJpZ2dlciB1cGRhdGUgYXV0b21hdGljYWxseVxuICAgICAqL1xuICAgIHNldE1vZGlmaWVkIChkYXRlIDogbnVtYmVyfERhdGUsIGJlZm9yZU9yQWZ0ZXI6Ym9vbGVhbikge1xuXG4gICAgICAgIC8vaWYgbm8gZGF0ZSB3YXMgc3VwcGxpZWQsIGNvbnNpZGVyIGl0IFwidW5zZXRcIiBmb3IgYm90aCBwcm9wZXJ0aWVzXG4gICAgICAgIGlmKCFkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLk1PRElGSUVEX0JFRk9SRSwgbnVsbCk7XG4gICAgICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLk1PRElGSUVEX0FGVEVSLCBudWxsKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCEoZGF0ZSBpbnN0YW5jZW9mIERhdGUpKVxuICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUgYXMgbnVtYmVyKTtcblxuICAgICAgICBsZXQgZGlyID0gYmVmb3JlT3JBZnRlciAmJiAoYmVmb3JlT3JBZnRlciA9PT0gdHJ1ZSB8fCBiZWZvcmVPckFmdGVyID09PSBcInRydWVcIik7XG4gICAgICAgIGxldCBwcm9wID0gZGlyID8gUGFyYW1ldGVycy5NT0RJRklFRF9CRUZPUkUgOiBQYXJhbWV0ZXJzLk1PRElGSUVEX0FGVEVSOyAgICAgICAvL3Byb3BlcnR5IGJlaW5nIHNldFxuICAgICAgICBsZXQgb3BwUHJvcCA9IGRpciA/IFBhcmFtZXRlcnMuTU9ESUZJRURfQUZURVIgOiBQYXJhbWV0ZXJzLk1PRElGSUVEX0JFRk9SRTsgICAgLy91bnNldCBvcHBvc2l0ZSBwcm9wZXJ0eVxuICAgICAgICBsZXQgYXJnID0gKGRhdGUgJiYgZGF0ZS5nZXRUaW1lKSA/IGRhdGUuZ2V0VGltZSgpIDogZGF0ZTtcblxuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihvcHBQcm9wLCBudWxsKTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIocHJvcCwgYXJnKTtcbiAgICB9XG5cbiAgICBnZXRNb2RpZmllZCAoKSA6IERhdGUge1xuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLk1PRElGSUVEX0JFRk9SRSkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuTU9ESUZJRURfQUZURVIpO1xuICAgICAgICBpZih2YWx1ZSAmJiB0eXBlb2YodmFsdWUpID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdmFsdWUgPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgY3JlYXRlZChkYXRlIDogbnVtYmVyfERhdGUsIGJlZm9yZU9yQWZ0ZXI6Ym9vbGVhbikgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0Q3JlYXRlZChkYXRlLCBiZWZvcmVPckFmdGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGRhdGUgLSBkYXRlIHRvIGNvbXBhcmUgYWdhaW5zdFxuICAgICAqIEBwYXJhbSBiZWZvcmVPckFmdGVyIC0gZmxhZyBzcGVjaWZ5aW5nIHdoaWNoIGJvdW5kYXJ5IGNvbmRpdGlvbiAodHJ1ZSA9IGJlZm9yZSwgZmFsc2UgPSBhZnRlcikgZmxhZyBzcGVjaWZ5aW5nIHdoZXRoZXIgdG8gdHJpZ2dlciB1cGRhdGUgYXV0b21hdGljYWxseVxuICAgICAqL1xuICAgIHNldENyZWF0ZWQgKGRhdGUgOiBudW1iZXJ8RGF0ZSwgYmVmb3JlT3JBZnRlcjpib29sZWFuKSB7XG5cbiAgICAgICAgLy9pZiBubyBkYXRlIHdhcyBzdXBwbGllZCwgY29uc2lkZXIgaXQgXCJ1bnNldFwiIGZvciBib3RoIHByb3BlcnRpZXNcbiAgICAgICAgaWYoIWRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuQ1JFQVRFRF9CRUZPUkUsIG51bGwpO1xuICAgICAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5DUkVBVEVEX0FGVEVSLCBudWxsKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCEoZGF0ZSBpbnN0YW5jZW9mIERhdGUpKVxuICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUgYXMgbnVtYmVyKTtcblxuICAgICAgICBsZXQgZGlyID0gYmVmb3JlT3JBZnRlciAmJiAoYmVmb3JlT3JBZnRlciA9PT0gdHJ1ZSB8fCBiZWZvcmVPckFmdGVyID09PSBcInRydWVcIik7XG4gICAgICAgIGxldCBwcm9wID0gZGlyID8gUGFyYW1ldGVycy5DUkVBVEVEX0JFRk9SRSA6IFBhcmFtZXRlcnMuQ1JFQVRFRF9BRlRFUjsgICAgICAgLy9wcm9wZXJ0eSBiZWluZyBzZXRcbiAgICAgICAgbGV0IG9wcFByb3AgPSBkaXIgPyBQYXJhbWV0ZXJzLkNSRUFURURfQUZURVIgOiBQYXJhbWV0ZXJzLkNSRUFURURfQkVGT1JFOyAgICAvL3Vuc2V0IG9wcG9zaXRlIHByb3BlcnR5XG4gICAgICAgIGxldCBhcmcgPSAoZGF0ZSAmJiBkYXRlLmdldFRpbWUpID8gZGF0ZS5nZXRUaW1lKCkgOiBkYXRlO1xuXG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKG9wcFByb3AsIG51bGwpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihwcm9wLCBhcmcpO1xuICAgIH1cblxuICAgIGdldENyZWF0ZWQgKCkgOiBEYXRlIHtcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5DUkVBVEVEX0JFRk9SRSkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuQ1JFQVRFRF9BRlRFUik7XG4gICAgICAgIGlmKHZhbHVlICYmIHR5cGVvZih2YWx1ZSkgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IG5ldyBEYXRlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICBiZWdpbnMoZGF0ZSA6IG51bWJlcnxEYXRlKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRCZWdpbkRhdGUoZGF0ZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldEJlZ2luRGF0ZSAoZGF0ZSA6IG51bWJlcnxEYXRlKSB7XG4gICAgICAgIGlmKGRhdGUgJiYgZGF0ZSBpbnN0YW5jZW9mIERhdGUpXG4gICAgICAgICAgICBkYXRlID0gZGF0ZS5nZXRUaW1lKCk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuQkVHSU5TLCBkYXRlKTtcbiAgICB9XG5cbiAgICBnZXRCZWdpbkRhdGUgKCkgOiBEYXRlIHtcbiAgICAgICAgbGV0IGRhdGUgPSB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkJFR0lOUyk7XG4gICAgICAgIGlmKGRhdGUpIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICBlbmRzKGRhdGUgOiBudW1iZXJ8RGF0ZSkgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0RW5kRGF0ZShkYXRlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0RW5kRGF0ZSAoZGF0ZTogbnVtYmVyfERhdGUpIHtcbiAgICAgICAgaWYoZGF0ZSAmJiBkYXRlIGluc3RhbmNlb2YgRGF0ZSlcbiAgICAgICAgICAgIGRhdGUgPSBkYXRlLmdldFRpbWUoKTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5FTkRTLCBkYXRlKTtcbiAgICB9XG5cbiAgICBnZXRFbmREYXRlICgpIDogRGF0ZSB7XG4gICAgICAgIGxldCBkYXRlID0gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5FTkRTKTtcbiAgICAgICAgaWYoZGF0ZSkgZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIGJldHdlZW4oYmVnaW4gOiBudW1iZXJ8RGF0ZSwgZW5kIDogbnVtYmVyfERhdGUpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldEJldHdlZW4oYmVnaW4sIGVuZCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldEJldHdlZW4oYmVnaW4gOiBudW1iZXJ8RGF0ZSwgZW5kIDogbnVtYmVyfERhdGUpIHtcbiAgICAgICAgdGhpcy5iZWdpbnMoYmVnaW4pO1xuICAgICAgICB0aGlzLmVuZHMoZW5kKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIHJlc291cmNlVHlwZXModHlwZXM6IHN0cmluZ3xzdHJpbmdbXSkgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0UmVzb3VyY2VUeXBlcyh0eXBlcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldFJlc291cmNlVHlwZXModHlwZXM6IHN0cmluZ3xzdHJpbmdbXSkge1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlJFU09VUkNFX1RZUEUsIHRvQXJyYXkodHlwZXMpKTtcbiAgICB9XG5cbiAgICBnZXRSZXNvdXJjZVR5cGVzKCkgOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlJFU09VUkNFX1RZUEUpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgZmFjZXRzKG5hbWVzIDogc3RyaW5nfHN0cmluZ1tdKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRGYWNldHMobmFtZXMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIEBwYXJhbSBuYW1lcyAtIG5hbWVzIG9mIGZhY2V0c1xuICAgICAqL1xuICAgIHNldEZhY2V0cyAobmFtZXM6IHN0cmluZ3xzdHJpbmdbXSkge1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkZBQ0VUUywgdG9BcnJheShuYW1lcykpO1xuICAgIH1cblxuICAgIGdldEZhY2V0cygpIDogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5GQUNFVFMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBuYW1lIC0gbmFtZSBvZiBmYWNldCB0byBhZGRcbiAgICAgKi9cbiAgICBhZGRGYWNldChuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGZhY2V0cyA9IHRoaXMuZ2V0RmFjZXRzKCkgfHwgW107XG4gICAgICAgIGZhY2V0cy5wdXNoKG5hbWUpO1xuICAgICAgICB0aGlzLnNldEZhY2V0cyhmYWNldHMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBuYW1lIC0gbmFtZSBvZiBmYWNldCB0byByZW1vdmVcbiAgICAgKi9cbiAgICByZW1vdmVGYWNldChuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGZhY2V0cyA9IHRoaXMuZ2V0RmFjZXRzKCkgfHwgW107XG4gICAgICAgIGxldCBpZHggPSBmYWNldHMuaW5kZXhPZihuYW1lKTtcbiAgICAgICAgaWYoaWR4Pj0wKSB7XG4gICAgICAgICAgICBmYWNldHMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICB0aGlzLnNldEZhY2V0cyhmYWNldHMpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICBmaWVsZHMoZmllbGRzOiBzdHJpbmd8c3RyaW5nW10pIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldEZpZWxkcyhmaWVsZHMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZmllbGRzIC0gbGlzdCBvZiBmaWVsZCBuYW1lcyB0byByZXF1ZXN0IGZvciBlYWNoIHNlYXJjaCByZXN1bHRcbiAgICAgKi9cbiAgICBzZXRGaWVsZHMgKGZpZWxkczogc3RyaW5nfHN0cmluZ1tdKSB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuRklFTERTLCB0b0FycmF5KGZpZWxkcykpO1xuICAgIH1cblxuICAgIGdldEZpZWxkcygpIDogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5GSUVMRFMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBmaWVsZCAtIG5hbWUgb2YgZmllbGQgdG8gcmVtb3ZlXG4gICAgICovXG4gICAgYWRkRmllbGQoZmllbGQ6IHN0cmluZykge1xuICAgICAgICBsZXQgZmllbGRzID0gdGhpcy5nZXRGaWVsZHMoKSB8fCBbXTtcbiAgICAgICAgZmllbGRzLnB1c2goZmllbGQpO1xuICAgICAgICB0aGlzLnNldEZpZWxkcyhmaWVsZHMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBmaWVsZCAtIG5hbWUgb2YgZmllbGQgdG8gcmVtb3ZlXG4gICAgICovXG4gICAgcmVtb3ZlRmllbGQoZmllbGQ6IHN0cmluZykge1xuICAgICAgICBsZXQgZmllbGRzID0gdGhpcy5nZXRGaWVsZHMoKSB8fCBbXTtcbiAgICAgICAgbGV0IGlkeCA9IGZpZWxkcy5pbmRleE9mKGZpZWxkKTtcbiAgICAgICAgaWYoaWR4Pj0wKSB7XG4gICAgICAgICAgICBmaWVsZHMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICB0aGlzLnNldEZpZWxkcyhmaWVsZHMpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBwYWdlIC0gcGFnZSBvZiByZXN1bHRzIHRvIGZldGNoXG4gICAgICovXG4gICAgcGFnZSAocGFnZTogbnVtYmVyKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRQYWdlKHBhZ2UpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRQYWdlKHBhZ2U6IG51bWJlcikge1xuICAgICAgICBpZihpc05hTihwYWdlKSB8fCBwYWdlKjE8MCkgcmV0dXJuO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlBBR0UsIHBhZ2UqMSk7XG4gICAgfVxuXG4gICAgZ2V0UGFnZSgpIDogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuUEFHRSk7XG4gICAgfVxuXG4gICAgbmV4dFBhZ2UoKSA6IHZvaWQge1xuICAgICAgICB0aGlzLnNldFBhZ2UodGhpcy5nZXRQYWdlKCkrMSk7XG4gICAgfVxuXG4gICAgcHJldmlvdXNQYWdlKCkgOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRQYWdlKHRoaXMuZ2V0UGFnZSgpLTEpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHNpemUgLSBwYWdlIHNpemUgdG8gcmVxdWVzdFxuICAgICAqL1xuICAgIHBhZ2VTaXplIChzaXplOiBudW1iZXIpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldFBhZ2VTaXplKHNpemUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRQYWdlU2l6ZSAoc2l6ZTogbnVtYmVyKSB7XG4gICAgICAgIGlmKGlzTmFOKHNpemUpIHx8IHNpemUqMTwwKSByZXR1cm47XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuUEFHRV9TSVpFLCBzaXplKjEpO1xuICAgIH1cblxuICAgIGdldFBhZ2VTaXplKCkgOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5QQUdFX1NJWkUpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHNvcnQgLSBmb3JtIG9mIDxmaWVsZD4sPGRpcj4gb3IganVzdCBmaWVsZCBuYW1lXG4gICAgICogQHBhcmFtIG9yZGVyIC0gb3B0aW9uYWwsIGVpdGhlciAnYXNjJyBvciAnZGVzYydcbiAgICAgKi9cbiAgICBzb3J0IChzb3J0OiBzdHJpbmcsIG9yZGVyPzpzdHJpbmcpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldFNvcnQoc29ydCwgb3JkZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc29ydCAtIGZvcm0gb2YgPGZpZWxkPiw8ZGlyPiBvciBqdXN0IGZpZWxkIG5hbWVcbiAgICAgKiBAcGFyYW0gb3JkZXIgLSBvcHRpb25hbCwgZWl0aGVyICdhc2MnIG9yICdkZXNjJ1xuICAgICAqL1xuICAgICBzZXRTb3J0KHNvcnQ6IHN0cmluZywgb3JkZXI/OnN0cmluZykge1xuICAgICAgICAgb3JkZXIgPSBvcmRlciB8fCAnZGVzYyc7XG4gICAgICAgICBpZihzb3J0ICYmIHNvcnQuaW5kZXhPZignLCcpPDApXG4gICAgICAgICAgICBzb3J0ID0gc29ydCArICcsJyArIG9yZGVyO1xuICAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5TT1JULCBzb3J0KTtcbiAgICB9XG5cbiAgICBnZXRTb3J0KCkgOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5TT1JUKTtcbiAgICB9XG5cbiAgICBnZXRTb3J0RmllbGQoKSA6IHN0cmluZyB8IG51bGwge1xuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLmdldFNvcnQoKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlICYmIHZhbHVlLmxlbmd0aCA/IHZhbHVlLnNwbGl0KCcsJylbMF0gOiBudWxsO1xuICAgIH1cblxuICAgIGdldFNvcnRPcmRlcigpIDogc3RyaW5nIHwgbnVsbCB7XG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZ2V0U29ydCgpO1xuICAgICAgICByZXR1cm4gdmFsdWUgJiYgdmFsdWUubGVuZ3RoID8gdmFsdWUuc3BsaXQoJywnKVsxXSA6IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiBsaXN0IG9mIGtleS12YWx1ZSBwYWlycyBvZiBzb3J0IG9wdGlvbnNcbiAgICAgKi9cbiAgICBnZXRTb3J0T3B0aW9ucygpIDogeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyB9W10ge1xuICAgICAgICByZXR1cm4gU09SVF9PUFRJT05TX0RFRkFVTFQuc2xpY2UoMCk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGNsZWFyICgpIHtcbiAgICAgICAgdGhpcy5xdWVyeSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5kZWZhdWx0UXVlcnkpKTtcbiAgICB9XG59XG5cbmV4cG9ydCB7XG4gICAgUXVlcnkgYXMgZGVmYXVsdCxcbiAgICBRdWVyeSxcbiAgICBGaWVsZHMsXG4gICAgRmFjZXRzXG59O1xuIl19