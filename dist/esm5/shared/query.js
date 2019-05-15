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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50LyIsInNvdXJjZXMiOlsic2hhcmVkL3F1ZXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLFVBQVUsTUFBTSxjQUFjLENBQUM7Ozs7Ozs7QUFJdEMsSUFBTSxNQUFNLEdBQWlCO0lBQ3pCLGFBQWEsRUFBUyxRQUFRO0lBQzlCLGdCQUFnQixFQUFNLGlCQUFpQjtJQUN2QyxXQUFXLEVBQVcsYUFBYTtJQUNuQyxXQUFXLEVBQVcsYUFBYTtJQUNuQyxjQUFjLEVBQVEsUUFBUTtJQUM5QixRQUFRLEVBQWMsVUFBVTtJQUNoQyxPQUFPLEVBQWUsU0FBUztJQUMvQixVQUFVLEVBQVksV0FBVztJQUNqQyxRQUFRLEVBQWMsVUFBVTtJQUNoQyxXQUFXLEVBQVcsYUFBYTtJQUNuQyxhQUFhLEVBQVMsZUFBZTtJQUNyQyxNQUFNLEVBQWdCLFFBQVE7SUFDOUIsYUFBYSxFQUFTLE9BQU87SUFDN0IsSUFBSSxFQUFrQixNQUFNO0lBQzVCLFdBQVcsRUFBVyxhQUFhO0lBQ25DLFFBQVEsRUFBYyxVQUFVO0lBQ2hDLEtBQUssRUFBaUIsT0FBTztJQUM3QixnQkFBZ0IsRUFBTSxnQkFBZ0I7SUFDdEMsTUFBTSxFQUFnQixRQUFRO0lBQzlCLFVBQVUsRUFBWSxXQUFXO0lBQ2pDLFVBQVUsRUFBWSxXQUFXO0lBQ2pDLE1BQU0sRUFBZ0IsUUFBUTtJQUM5QixRQUFRLEVBQWMsVUFBVTtJQUNoQyxZQUFZLEVBQVUsYUFBYTtJQUNuQyxVQUFVLEVBQVksWUFBWTtJQUNsQyxjQUFjLEVBQVEsZUFBZTtJQUNyQyxZQUFZLEVBQVUsYUFBYTtJQUNuQyxRQUFRLEVBQWMsVUFBVTtJQUNoQyxPQUFPLEVBQWUsU0FBUztJQUMvQixVQUFVLEVBQVksWUFBWTtJQUNsQyxNQUFNLEVBQWdCLFFBQVE7SUFDOUIsVUFBVSxFQUFZLFdBQVc7SUFDakMsUUFBUSxFQUFjLFVBQVU7SUFDaEMs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LENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0tBQzdEOzs7O0lBRUQsNEJBQVk7OztJQUFaOztRQUNJLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMzQixPQUFPLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7S0FDN0Q7SUFFRDs7T0FFRzs7OztJQUNILDhCQUFjOzs7SUFBZDtRQUNJLE9BQU8sb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3hDO0lBR0QsOERBQThEO0lBRzlEOztPQUVHOzs7OztJQUNILHFCQUFLOzs7O0lBQUw7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztLQUM5RDtnQkFoZ0NMO0lBaWdDQyxDQUFBOzs7Ozs7O0FBRUQsT0FBTyxFQUNILEtBQUssSUFBSSxPQUFPLEVBQ2hCLEtBQUssRUFDTCxNQUFNLEVBQ04sTUFBTSxFQUNULENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBQYXJhbWV0ZXJzIGZyb20gJy4vcGFyYW1ldGVycyc7XG5cbmludGVyZmFjZSBLVlA8VT4geyBbIGtleSA6IHN0cmluZyBdIDogVSB9XG5cbmNvbnN0IEZpZWxkcyA6IEtWUDxzdHJpbmc+ID0ge1xuICAgIEFDQ0VTU19SSUdIVFMgICAgICAgOiAncmlnaHRzJyxcbiAgICBBTFRFUk5BVEVfVElUTEVTICAgIDogJ2FsdGVybmF0ZVRpdGxlcycsXG4gICAgQU5OT1RBVElPTlMgICAgICAgICA6ICdhbm5vdGF0aW9ucycsXG4gICAgQ0xBU1NJRklFUlMgICAgICAgICA6ICdjbGFzc2lmaWVycycsXG4gICAgQ09OQ0VQVF9TQ0hFTUUgICAgICA6ICdzY2hlbWUnLFxuICAgIENPTlRBQ1RTICAgICAgICAgICAgOiAnY29udGFjdHMnLFxuICAgIENSRUFURUQgICAgICAgICAgICAgOiAnY3JlYXRlZCcsXG4gICAgQ1JFQVRFRF9CWSAgICAgICAgICA6ICdjcmVhdGVkQnknLFxuICAgIERBVEFTRVRTICAgICAgICAgICAgOiAnZGF0YXNldHMnLFxuICAgIERFU0NSSVBUSU9OICAgICAgICAgOiAnZGVzY3JpcHRpb24nLFxuICAgIERJU1RSSUJVVElPTlMgICAgICAgOiAnZGlzdHJpYnV0aW9ucycsXG4gICAgRVhURU5UICAgICAgICAgICAgICA6ICdleHRlbnQnLFxuICAgIEdBTExFUllfSVRFTVMgICAgICAgOiAnaXRlbXMnLFxuICAgIEhSRUYgICAgICAgICAgICAgICAgOiAnaHJlZicsXG4gICAgSURFTlRJRklFUlMgICAgICAgICA6ICdpZGVudGlmaWVycycsXG4gICAgS0VZV09SRFMgICAgICAgICAgICA6ICdrZXl3b3JkcycsXG4gICAgTEFCRUwgICAgICAgICAgICAgICA6ICdsYWJlbCcsXG4gICAgTEFTVF9NT0RJRklFRF9CWSAgICA6ICdsYXN0TW9kaWZpZWRCeScsXG4gICAgTEFZRVJTICAgICAgICAgICAgICA6ICdsYXllcnMnLFxuICAgIExBWUVSX1RZUEUgICAgICAgICAgOiAnbGF5ZXJUeXBlJyxcbiAgICBMQVlFUl9OQU1FICAgICAgICAgIDogJ2xheWVyTmFtZScsXG4gICAgTEVHRU5EICAgICAgICAgICAgICA6ICdsZWdlbmQnLFxuICAgIE1PRElGSUVEICAgICAgICAgICAgOiAnbW9kaWZpZWQnLFxuICAgIFBBUkVOVF9MQVlFUiAgICAgICAgOiAncGFyZW50TGF5ZXInLFxuICAgIFBVQkxJU0hFUlMgICAgICAgICAgOiAncHVibGlzaGVycycsXG4gICAgUkVTT1VSQ0VfVFlQRVMgICAgICA6ICdyZXNvdXJjZVR5cGVzJyxcbiAgICBTRVJWSUNFX1RZUEUgICAgICAgIDogJ3NlcnZpY2VUeXBlJyxcbiAgICBTRVJWSUNFUyAgICAgICAgICAgIDogJ3NlcnZpY2VzJyxcbiAgICBTUEFUSUFMICAgICAgICAgICAgIDogJ3NwYXRpYWwnLFxuICAgIFNUQVRJU1RJQ1MgICAgICAgICAgOiAnc3RhdGlzdGljcycsXG4gICAgU1RBVFVTICAgICAgICAgICAgICA6ICdzdGF0dXMnLFxuICAgIFNVQl9MQVlFUlMgICAgICAgICAgOiAnc3ViTGF5ZXJzJyxcbiAgICBURU1QT1JBTCAgICAgICAgICAgIDogJ3RlbXBvcmFsJyxcbiAgICBUSEVNRVMgICAgICAgICAgICAgIDogJ3RoZW1lcycsXG4gICAgVEhVTUJOQUlMICAgICAgICAgICA6ICd0aHVtYm5haWwnLFxuICAgIFVTRURfQlkgICAgICAgICAgICAgOiAndXNlZEJ5JyxcbiAgICBWSVNJQklMSVRZICAgICAgICAgIDogJ3Zpc2liaWxpdHknLFxuICAgIExBTkRJTkdfUEFHRSAgICAgICAgOiAnbGFuZGluZ1BhZ2UnXG59O1xuXG5jb25zdCBGSUVMRFNfREVGQVVMVCA6IHN0cmluZ1tdID0gW1xuICAgIEZpZWxkcy5DUkVBVEVELCBGaWVsZHMuTU9ESUZJRUQsIEZpZWxkcy5DUkVBVEVEX0JZLFxuICAgIEZpZWxkcy5QVUJMSVNIRVJTLCBGaWVsZHMuVEhFTUVTLCBGaWVsZHMuREVTQ1JJUFRJT05cbl07XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5jb25zdCBGYWNldHMgOiBLVlA8c3RyaW5nPiA9IHtcbiAgICBBTFRFUk5BVEVfVElUTEVTICAgIDogJ2FsdGVybmF0ZVRpdGxlcycsXG4gICAgQ09OQ0VQVF9TQ0hFTUVTICAgICA6ICdzY2hlbWVzJyxcbiAgICBDUkVBVEVEX0JZICAgICAgICAgIDogJ2NyZWF0ZWRCeScsXG4gICAgSFJFRiAgICAgICAgICAgICAgICA6ICdocmVmJyxcbiAgICBJREVOVElGSUVSUyAgICAgICAgIDogXCJpZGVudGlmaWVyc1wiLFxuICAgIExBWUVSX1RZUEUgICAgICAgICAgOiAnbGF5ZXJUeXBlJyxcbiAgICBMQVlFUl9OQU1FICAgICAgICAgIDogJ2xheWVyTmFtZScsXG4gICAgTElLRVMgICAgICAgICAgICAgICA6ICdsaWtlcycsXG4gICAgT05MSU5FICAgICAgICAgICAgICA6ICdvbmxpbmUnLFxuICAgIFBVQkxJU0hFUlMgICAgICAgICAgOiAncHVibGlzaGVycycsXG4gICAgQ09OVEFDVFMgICAgICAgICAgICA6ICdjb250YWN0cycsXG4gICAgUkVMSUFCSUxJVFkgICAgICAgICA6ICdyZWxpYWJpbGl0eScsXG4gICAgU0VSVklDRV9UWVBFUyAgICAgICA6ICdzZXJ2aWNlVHlwZXMnLFxuICAgIFNQRUVEICAgICAgICAgICAgICAgOiAnc3BlZWQnLFxuICAgIFNUQVRVUyAgICAgICAgICAgICAgOiAnc3RhdHVzJyxcbiAgICBUSEVNRVMgICAgICAgICAgICAgIDogJ3RoZW1lcycsXG4gICAgVFlQRVMgICAgICAgICAgICAgICA6ICd0eXBlJywgICAvL1RPRE8gY2hhbmdlIHRvICd0eXBlcydcbiAgICBVU0VEX0JZICAgICAgICAgICAgIDogJ3VzZWRCeScsXG4gICAgVklFV1MgICAgICAgICAgICAgICA6ICd2aWV3cycsXG4gICAgVklTSUJJTElUWSAgICAgICAgICA6ICd2aXNpYmlsaXR5J1xufTtcblxuY29uc3QgRkFDRVRTX0RFRkFVTFQgOiBzdHJpbmdbXSA9IFtcbiAgICBGYWNldHMuVFlQRVMsXG4gICAgRmFjZXRzLlBVQkxJU0hFUlMsXG4gICAgRmFjZXRzLlNFUlZJQ0VfVFlQRVMsXG4gICAgRmFjZXRzLkNPTkNFUFRfU0NIRU1FUyxcbiAgICBGYWNldHMuVklTSUJJTElUWSxcbiAgICBGYWNldHMuQ1JFQVRFRF9CWVxuXTtcblxuXG4vKlxuICAgIE1hcCBmYWNldCBrZXlzIHRvIHBhcmFtZXRlcnMgc28gY2xpZW50cyBjYW4gc2V0XG4gICAgcXVlcnkgcGFyYW1zIHVzaW5nIGZhY2V0ZWQgcmVzdWx0c1xuXG4gICAgLy9UT0RPIHJlbW92ZSB0aGVzZSBhbmQgdGhlaXIgZnVuY3Rpb24gYmVsb3dcbiAqL1xuY29uc3QgRmFjZXRUb1BhcmFtIDogS1ZQPHN0cmluZz4gPSB7fTtcbkZhY2V0VG9QYXJhbVtGYWNldHMuVFlQRVNdICAgICAgICAgICA9IFBhcmFtZXRlcnMuVFlQRVM7XG5GYWNldFRvUGFyYW1bRmFjZXRzLlRIRU1FU10gICAgICAgICAgPSBQYXJhbWV0ZXJzLlRIRU1FU19JRDtcbkZhY2V0VG9QYXJhbVtGYWNldHMuUFVCTElTSEVSU10gICAgICA9IFBhcmFtZXRlcnMuUFVCTElTSEVSU19JRDtcbkZhY2V0VG9QYXJhbVtGYWNldHMuQ09OVEFDVFNdICAgICAgICA9IFBhcmFtZXRlcnMuQ09OVEFDVFNfSUQ7XG5GYWNldFRvUGFyYW1bRmFjZXRzLkNPTkNFUFRfU0NIRU1FU10gPSBQYXJhbWV0ZXJzLlNDSEVNRVNfSUQ7XG5GYWNldFRvUGFyYW1bRmFjZXRzLlVTRURfQlldICAgICAgICAgPSBQYXJhbWV0ZXJzLlVTRURfQllfSUQ7XG5cblxuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXG5jb25zdCBTT1JUX09QVElPTlNfREVGQVVMVCA6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgfVtdID0gW1xuICAgIHsgdmFsdWU6XCJsYWJlbCxhc2NcIiwgICAgICAgbGFiZWw6IFwiTmFtZSAoQS1aKVwiICAgICAgICAgICAgICB9LFxuICAgIHsgdmFsdWU6XCJsYWJlbCxkZXNjXCIsICAgICAgbGFiZWw6IFwiTmFtZSAoWi1BKVwiICAgICAgICAgICAgICB9LFxuICAgIHsgdmFsdWU6XCJ0eXBlLGFzY1wiLCAgICAgICAgbGFiZWw6IFwiVHlwZSAoQS1aKVwiICAgICAgICAgICAgICB9LFxuICAgIHsgdmFsdWU6XCJ0eXBlLGRlc2NcIiwgICAgICAgbGFiZWw6IFwiVHlwZSAoWi1BKVwiICAgICAgICAgICAgICB9LFxuICAgIHsgdmFsdWU6XCJtb2RpZmllZCxkZXNjXCIsICAgbGFiZWw6IFwiTW9zdCByZWNlbnRseSBtb2RpZmllZFwiICB9LFxuICAgIHsgdmFsdWU6XCJtb2RpZmllZCxhc2NcIiwgICAgbGFiZWw6IFwiTGVhc3QgcmVjZW50bHkgbW9kaWZpZWRcIiB9LFxuICAgIHsgdmFsdWU6XCJfc2NvcmUsZGVzY1wiLCAgICAgbGFiZWw6IFwiUmVsZXZhbmNlXCIgICAgICAgICAgICAgICB9XG5dO1xuXG5cbmNvbnN0IEJCT1hfUkVHRVggPSAvXlxcLT9cXGQrKFxcLlxcZCopPyxcXC0/XFxkKyhcXC5cXGQqKT8sXFwtP1xcZCsoXFwuXFxkKik/LFxcLT9cXGQrKFxcLlxcZCopPyQvO1xuXG5cbmZ1bmN0aW9uIHRvQXJyYXkodmFsdWUgOiBhbnkpIDogYW55IHwgbnVsbCB7XG4gICAgbGV0IHJlc3VsdCA9IHZhbHVlO1xuICAgIC8vaWYgZ2l2ZW4gYSBub24tYXJyYXkgdmFsdWUsIHdyYXAgaW4gYXJyYXlcbiAgICBpZihyZXN1bHQgIT09IG51bGwgJiYgdHlwZW9mKHJlc3VsdC5wdXNoKSA9PT0gJ3VuZGVmaW5lZCcpIHJlc3VsdCA9IFtyZXN1bHRdO1xuICAgIC8vaWYgYXJyYXkgdmFsdWUgaXMgZW1wdHksIG51bGxpZnkgdGhlIHJlc3VsdFxuICAgIGlmKHJlc3VsdCAhPT0gbnVsbCAmJiAhcmVzdWx0Lmxlbmd0aCkgcmVzdWx0ID0gbnVsbDtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqXG4gKiBRdWVyeVxuICpcbiAqIFNwZWNpZnkgdGhlIFwiZGVmYXVsdFwiIHF1ZXJ5IGNvbnN0cmFpbnRzIHRvIHVzZSBieSBwYXNzaW5nIGluICdvcHRpb25zLmRlZmF1bHRzID0gey4uLn0nO1xuICpcbiAqL1xuY2xhc3MgUXVlcnkge1xuXG4gICAgcHVibGljIHF1ZXJ5IDogS1ZQPGFueT47XG4gICAgcHJpdmF0ZSBkZWZhdWx0UXVlcnkgOiBLVlA8YW55PjtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gc2V0IG9mIGluaXRpYWwgY29uc3RyYWludHNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID86IEtWUDxhbnk+KSB7XG4gICAgICAgIHRoaXMuZGVmYXVsdFF1ZXJ5ID0geyB9O1xuICAgICAgICB0aGlzLmRlZmF1bHRRdWVyeVtQYXJhbWV0ZXJzLlBBR0UudG9TdHJpbmcoKV0gPSAwO1xuICAgICAgICB0aGlzLmRlZmF1bHRRdWVyeVtQYXJhbWV0ZXJzLlBBR0VfU0laRS50b1N0cmluZygpXSA9IDEwO1xuICAgICAgICB0aGlzLmRlZmF1bHRRdWVyeVtQYXJhbWV0ZXJzLlNPUlQudG9TdHJpbmcoKV0gPSBcIm1vZGlmaWVkLGRlc2NcIjtcbiAgICAgICAgdGhpcy5kZWZhdWx0UXVlcnlbUGFyYW1ldGVycy5GSUVMRFMudG9TdHJpbmcoKV0gPSBGSUVMRFNfREVGQVVMVC5zbGljZSgwKTtcbiAgICAgICAgdGhpcy5kZWZhdWx0UXVlcnlbUGFyYW1ldGVycy5GQUNFVFMudG9TdHJpbmcoKV0gPSBGQUNFVFNfREVGQVVMVC5zbGljZSgwKTtcbiAgICAgICAgaWYob3B0aW9ucyAmJiBvcHRpb25zLmRlZmF1bHRzKSB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuZGVmYXVsdFF1ZXJ5LCBvcHRpb25zLmRlZmF1bHRzKTtcbiAgICAgICAgICAgIGRlbGV0ZSBvcHRpb25zLmRlZmF1bHRzO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucXVlcnkgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMuZGVmYXVsdFF1ZXJ5KSk7XG4gICAgICAgIGlmKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlQYXJhbWV0ZXJzKG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIGNvbnRhaW5pbmcgcmVxdWVzdC1yZWFkeSBwYXJhbWV0ZXJzL3ZhbHVlc1xuICAgICAqL1xuICAgIGdldFF1ZXJ5KCkgOiBLVlA8YW55PiB7XG4gICAgICAgIGxldCByZXN1bHQgOiBLVlA8YW55PiA9IHt9O1xuICAgICAgICBmb3IobGV0IHByb3AgaW4gdGhpcy5xdWVyeSkge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5xdWVyeVtwcm9wXTtcbiAgICAgICAgICAgIGlmKHZhbHVlICE9PSBudWxsICYmIHR5cGVvZih2YWx1ZS5wdXNoKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLmpvaW4oJywnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdFtwcm9wXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiBRdWVyeVxuICAgICAqL1xuICAgIGNsb25lKCkgOiBRdWVyeSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBuZXcgUXVlcnkoKTtcbiAgICAgICAgbGV0IGpzb24gPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMucXVlcnkpKTtcbiAgICAgICAgcmVzdWx0LmFwcGx5UGFyYW1ldGVycyhqc29uKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbmFtZVxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEByZXR1cm4gUXVlcnkgdGhpc1xuICAgICAqL1xuICAgIHBhcmFtZXRlcihuYW1lIDogc3RyaW5nLCB2YWx1ZSA6IGFueSkgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKG5hbWUsIHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG5hbWVcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKi9cbiAgICBzZXRQYXJhbWV0ZXIgKG5hbWUgOiBzdHJpbmcsIHZhbHVlOiBhbnkpIDogdm9pZCB7XG4gICAgICAgIGlmKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgLy9pZiBubyB2YWx1ZSB3YXMgcHJvdmlkZVxuICAgICAgICAgICAgKHR5cGVvZih2YWx1ZS5wdXNoKSAhPT0gJ3VuZGVmaW5lZCcgJiYgIXZhbHVlLmxlbmd0aCkpIC8vb3IgZW1wdHkgYXJyYXlcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnF1ZXJ5W25hbWVdO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLnF1ZXJ5W25hbWVdID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGtleSAtIG5hbWUgb2YgcGFyYW1ldGVyXG4gICAgICogQHJldHVybiB2YWx1ZSBvZiBwYXJhbWV0ZXJcbiAgICAgKi9cbiAgICBnZXRQYXJhbWV0ZXIgKGtleSA6IHN0cmluZykgOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5xdWVyeVtrZXldO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBvYmogLSBzZXQgb2YgcGFyYW1ldGVyL3ZhbHVlcyB0byBhcHBseSB0byB0aGlzIHF1ZXJ5XG4gICAgICovXG4gICAgYXBwbHlQYXJhbWV0ZXJzIChvYmogOiBLVlA8YW55PikgOiB2b2lkIHvCoFxuICAgICAgICBmb3IobGV0IHAgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZihvYmouaGFzT3duUHJvcGVydHkocCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihwIGFzIHN0cmluZywgb2JqW3BdIGFzIGFueSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZmFjZXQgLSBuYW1lIG9mIGZhY2V0IHRvIHNldCB0aGUgdmFsdWUgZm9yIGFzIGEgcGFyYW1ldGVyXG4gICAgICogQHBhcmFtIHZhbHVlIC0gdmFsdWUgb2YgdGhlIGZhY2V0IHRvIHVzZSBhcyB0aGUgcGFyYW1ldGVyJ3MgdmFsdWVcbiAgICAgKi9cbiAgICAgLy9UT0RPIHJlbW92ZSB0aGlzIGZ1bmN0aW9uXG4gICAgc2V0RmFjZXRQYXJhbWV0ZXIgKGZhY2V0OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIDogdm9pZCB7XG4gICAgICAgIGxldCBwYXJhbSA6IHN0cmluZyA9IEZhY2V0VG9QYXJhbVtmYWNldF07XG4gICAgICAgIGlmKCFwYXJhbSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJXQVJOIDogUXVlcnkuYXBwbHlGYWNldFBhcmFtZXRlcigpIC0gXCIgK1xuICAgICAgICAgICAgICAgIFwidW5hYmxlIHRvIG1hcCBmYWNldCB0byBrbm93biBwYXJhbWV0ZXIgJ1wiICsgZmFjZXQgKyBcIicsIHVzaW5nIFwiICtcbiAgICAgICAgICAgICAgICBcImFzIGRpcmVjdCBwYXJhbWV0ZXIgd2hpY2ggbWF5IG5vdCBvcGVyYXRlIGFzIGludGVuZGVkXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKHBhcmFtfHxmYWNldCwgdmFsdWUpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB0ZXh0XG4gICAgICogQHJldHVybiBRdWVyeSB0aGlzXG4gICAgICovXG4gICAgcSh0ZXh0IDogc3RyaW5nKSA6IFF1ZXJ5IHsgdGhpcy5zZXRRKHRleHQpOyByZXR1cm4gdGhpczsgfVxuXG4gICAgLyoqIEBwYXJhbSB0ZXh0IC0gZnJlZSB0ZXh0IHF1ZXJ5ICovXG4gICAgc2V0USAodGV4dCA6IHN0cmluZykgOiB2b2lkIHsgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5RVUVSWSwgdGV4dCk7IH1cbiAgICAvKiogQHJldHVybiAqL1xuICAgIGdldFEoKSA6IHN0cmluZyB7IHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlFVRVJZKSBhcyBzdHJpbmc7IH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAga2V5d29yZHModGV4dCA6IHN0cmluZ3xzdHJpbmdbXSkgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0S2V5d29yZHModGV4dCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB0ZXh0IC0gZnJlZSB0ZXh0IHF1ZXJ5XG4gICAgICovXG4gICAgc2V0S2V5d29yZHMgKHRleHQgOiBzdHJpbmd8c3RyaW5nW10pIDogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuS0VZV09SRFMsIHRvQXJyYXkodGV4dCkpO1xuICAgIH1cblxuICAgIGdldEtleXdvcmRzKCkgOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLktFWVdPUkRTKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIHVyaSAodXJpIDogc3RyaW5nKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRVcmkodXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0VXJpKHVyaSA6IHN0cmluZykge1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlVSSSwgdXJpKTtcbiAgICB9XG5cbiAgICBnZXRVcmkoKSA6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlVSSSk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICB0eXBlcyh0eXBlcyA6IHN0cmluZ3xzdHJpbmdbXSkgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0VHlwZXModHlwZXMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gdHlwZXMgLSBuYW1lIG9mIGNsYXNzKGVzKSB0byByZXF1ZXN0XG4gICAgICovXG4gICAgc2V0VHlwZXMgKHR5cGVzIDogc3RyaW5nfHN0cmluZ1tdKSB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVFlQRVMsIHRvQXJyYXkodHlwZXMpKTtcbiAgICB9XG5cbiAgICBnZXRUeXBlcyAoKSA6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVFlQRVMpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgY3JlYXRlZEJ5KHVzZXIgOiBzdHJpbmcpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldENyZWF0ZWRCeSh1c2VyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqIEBwYXJhbSB1c2VyIC0gdXNlcm5hbWUgKi9cbiAgICBzZXRDcmVhdGVkQnkgKHVzZXIgOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5DUkVBVEVEX0JZLCB1c2VyKTtcbiAgICB9XG5cbiAgICAvKiogQHJldHVybiB1c2VybmFtZSAqL1xuICAgIGdldENyZWF0ZWRCeSAoKSA6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkNSRUFURURfQlkpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgbGFzdE1vZGlmaWVkQnkodXNlciA6IHN0cmluZykgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0TGFzdE1vZGlmaWVkQnkodXNlcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKiBAcGFyYW0gdXNlciAtIHVzZXJuYW1lICovXG4gICAgc2V0TGFzdE1vZGlmaWVkQnkgKHVzZXI6IHN0cmluZykge1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkxBU1RfTU9ESUZJRURfQlksIHVzZXIpO1xuICAgIH1cblxuICAgIC8qKiBAcmV0dXJuIHVzZXJuYW1lICovXG4gICAgZ2V0TGFzdE1vZGlmaWVkQnkgKCkgOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5MQVNUX01PRElGSUVEX0JZKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgYSBUaGVtZSBvciBzZXQgb2YgVGhlbWVzIHRvIGNvbnN0cmFpbiByZXN1bHRzLiBCeVxuICAgICAqIGRlZmF1bHQsIHZhbHVlcyBhcmUgYXNzdW1lZCB0byBiZSB0aGVtZSBpZGVudGlmaWVycy4gSWYgdXNpbmdcbiAgICAgKiB0aGVtZSBsYWJlbHMgb3IgdGhlbWUgdXJpcywgc3BlY2lmeSB0aGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlclxuICAgICAqIHRvIGJlIGVpdGhlciBQYXJhbWV0ZXJzLlRIRU1FU19MQUJFTCBvciBQYXJhbWV0ZXJzLlRIRU1FU19VUklcbiAgICAgKiByZXNwZWN0aXZlbHkuXG4gICAgICogQHBhcmFtIHRoZW1lcyAtIHN0cmluZyBvciBhcnJheSBvZiBzdHJpbmdzIGNvbnRhaW5pbmcgdGhlbWUgY29uc3RyYWludFxuICAgICAqIEBwYXJhbSBwYXJhbWV0ZXIgLSBvcHRpb25hbCwgdG8gaW5kaWNhdGUgdGhlIHBhcmFtZXRlciB0byB1c2VcbiAgICAgKiBAcmV0dXJuIFF1ZXJ5XG4gICAgICovXG4gICAgdGhlbWVzKHRoZW1lczogc3RyaW5nfHN0cmluZ1tdLCBwYXJhbWV0ZXI/OnN0cmluZykgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0VGhlbWVzKHRoZW1lcywgcGFyYW1ldGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IGEgVGhlbWUgb3Igc2V0IG9mIFRoZW1lcyB0byBjb25zdHJhaW4gcmVzdWx0cy4gQnlcbiAgICAgKiBkZWZhdWx0LCB2YWx1ZXMgYXJlIGFzc3VtZWQgdG8gYmUgdGhlbWUgaWRlbnRpZmllcnMuIElmIHVzaW5nXG4gICAgICogdGhlbWUgbGFiZWxzIG9yIHRoZW1lIHVyaXMsIHNwZWNpZnkgdGhlIG9wdGlvbmFsIHNlY29uZCBwYXJhbWV0ZXJcbiAgICAgKiB0byBiZSBlaXRoZXIgUGFyYW1ldGVycy5USEVNRVNfTEFCRUwgb3IgUGFyYW1ldGVycy5USEVNRVNfVVJJXG4gICAgICogcmVzcGVjdGl2ZWx5LlxuICAgICAqIEBwYXJhbSB0aGVtZXMgLSB0aGVtZSBvciB0aGVtZXMgdG8gY29uc3RyYWluIGJ5XG4gICAgICovXG4gICAgc2V0VGhlbWVzICh0aGVtZXM6c3RyaW5nfHN0cmluZ1tdLCBwYXJhbWV0ZXI/OnN0cmluZykge1xuXG4gICAgICAgIC8vY2xlYXIgZXhpc3RpbmdcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5USEVNRVNfSUQsIG51bGwpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlRIRU1FU19MQUJFTCwgbnVsbCk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVEhFTUVTX1VSSSwgbnVsbCk7XG5cbiAgICAgICAgbGV0IHBhcmFtID0gcGFyYW1ldGVyIHx8IFBhcmFtZXRlcnMuVEhFTUVTX0lEO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihwYXJhbSwgdG9BcnJheSh0aGVtZXMpKTtcbiAgICB9XG5cbiAgICBnZXRUaGVtZXMgKCkgOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlRIRU1FU19JRCkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVEhFTUVTX0xBQkVMKSB8fFxuICAgICAgICAgICAgdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5USEVNRVNfVVJJKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgYSBQdWJsaXNoZXIgb3Igc2V0IG9mIFB1Ymxpc2hlcnMgdG8gY29uc3RyYWluIHJlc3VsdHMuIEJ5XG4gICAgICogZGVmYXVsdCwgdmFsdWVzIGFyZSBhc3N1bWVkIHRvIGJlIGlkZW50aWZpZXJzLiBJZiB1c2luZyBsYWJlbHMgb3IgdXJpcyxcbiAgICAgKiBzcGVjaWZ5IHRoZSBvcHRpb25hbCBzZWNvbmQgcGFyYW1ldGVyIHRvIGJlIGVpdGhlclxuICAgICAqIFBhcmFtZXRlcnMuUFVCTElTSEVSU19MQUJFTCBvciBQYXJhbWV0ZXJzLlBVQkxJU0hFUlNfVVJJIHJlc3BlY3RpdmVseS5cbiAgICAgKiBAcGFyYW0gcGFyYW1ldGVyIC0gb3B0aW9uYWwsIHRvIGluZGljYXRlIHRoZSBwYXJhbWV0ZXIgdG8gdXNlXG4gICAgICogQHJldHVybiBRdWVyeVxuICAgICAqL1xuICAgIHB1Ymxpc2hlcnMocHVibGlzaGVyczpzdHJpbmd8c3RyaW5nW10sIHBhcmFtZXRlcj86c3RyaW5nKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRQdWJsaXNoZXJzKHB1Ymxpc2hlcnMsIHBhcmFtZXRlcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgYSBQdWJsaXNoZXIgb3Igc2V0IG9mIFB1Ymxpc2hlcnMgdG8gY29uc3RyYWluIHJlc3VsdHMuIEJ5XG4gICAgICogZGVmYXVsdCwgdmFsdWVzIGFyZSBhc3N1bWVkIHRvIGJlIGlkZW50aWZpZXJzLiBJZiB1c2luZyBsYWJlbHMgb3IgdXJpcyxcbiAgICAgKiBzcGVjaWZ5IHRoZSBvcHRpb25hbCBzZWNvbmQgcGFyYW1ldGVyIHRvIGJlIGVpdGhlclxuICAgICAqIFBhcmFtZXRlcnMuUFVCTElTSEVSU19MQUJFTCBvciBQYXJhbWV0ZXJzLlBVQkxJU0hFUlNfVVJJIHJlc3BlY3RpdmVseS5cbiAgICAgKiBAcGFyYW0gcHVibGlzaGVycyAtIHB1Ymxpc2hpbmcgb3JncyB0byBjb25zdHJhaW4gYnlcbiAgICAgKi9cbiAgICBzZXRQdWJsaXNoZXJzIChwdWJsaXNoZXJzOnN0cmluZ3xzdHJpbmdbXSwgcGFyYW1ldGVyPzpzdHJpbmcpIHtcblxuICAgICAgICAvL2NsZWFyIGV4aXN0aW5nXG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuUFVCTElTSEVSU19JRCwgbnVsbCk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuUFVCTElTSEVSU19MQUJFTCwgbnVsbCk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuUFVCTElTSEVSU19VUkksIG51bGwpO1xuXG4gICAgICAgIGxldCBwYXJhbSA9IHBhcmFtZXRlciB8fCBQYXJhbWV0ZXJzLlBVQkxJU0hFUlNfSUQ7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKHBhcmFtLCB0b0FycmF5KHB1Ymxpc2hlcnMpKTtcbiAgICB9XG5cbiAgICBnZXRQdWJsaXNoZXJzICgpIDogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5QVUJMSVNIRVJTX0lEKSB8fFxuICAgICAgICAgICAgdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5QVUJMSVNIRVJTX0xBQkVMKSB8fFxuICAgICAgICAgICAgdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5QVUJMSVNIRVJTX1VSSSk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IGEgUG9pbnQgb2YgQ29udGFjdCBvciBzZXQgb2YgQ29udGFjdHMgdG8gY29uc3RyYWluIHJlc3VsdHMuIEJ5XG4gICAgICogZGVmYXVsdCwgdmFsdWVzIGFyZSBhc3N1bWVkIHRvIGJlIGlkZW50aWZpZXJzLiBJZiB1c2luZ1xuICAgICAqIGxhYmVscyBvciB1cmlzLCBzcGVjaWZ5IHRoZSBvcHRpb25hbCBzZWNvbmQgcGFyYW1ldGVyIHRvIGJlIGVpdGhlclxuICAgICAqIFBhcmFtZXRlcnMuQ09OVEFDVFNfTEFCRUwgb3IgUGFyYW1ldGVycy5DT05UQUNUU19VUkkgcmVzcGVjdGl2ZWx5LlxuICAgICAqIEBwYXJhbSBwYXJhbWV0ZXIgLSBvcHRpb25hbCwgdG8gaW5kaWNhdGUgdGhlIHBhcmFtZXRlciB0byB1c2VcbiAgICAgKiBAcmV0dXJuIFF1ZXJ5XG4gICAgICovXG4gICAgY29udGFjdHMoY29udGFjdHM6c3RyaW5nfHN0cmluZ1tdLCBwYXJhbWV0ZXI/OnN0cmluZykgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0Q29udGFjdHMoY29udGFjdHMsIHBhcmFtZXRlcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgYSBDb250YWN0IG9yIHNldCBvZiBDb250YWN0cyB0byBjb25zdHJhaW4gcmVzdWx0cy4gQnlcbiAgICAgKiBkZWZhdWx0LCB2YWx1ZXMgYXJlIGFzc3VtZWQgdG8gYmUgaWRlbnRpZmllcnMuIElmIHVzaW5nXG4gICAgICogbGFiZWxzIG9yIHVyaXMsIHNwZWNpZnkgdGhlIG9wdGlvbmFsIHNlY29uZCBwYXJhbWV0ZXIgdG8gYmUgZWl0aGVyXG4gICAgICogUGFyYW1ldGVycy5DT05UQUNUU19MQUJFTCBvciBQYXJhbWV0ZXJzLkNPTlRBQ1RTX1VSSSByZXNwZWN0aXZlbHkuXG4gICAgICogQHBhcmFtIGNvbnRhY3RzIC0gcHVibGlzaGluZyBvcmdzIHRvIGNvbnN0cmFpbiBieVxuICAgICAqL1xuICAgIHNldENvbnRhY3RzIChjb250YWN0czpzdHJpbmd8c3RyaW5nW10sIHBhcmFtZXRlcj86c3RyaW5nKSB7XG5cbiAgICAgICAgLy9jbGVhciBleGlzdGluZ1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkNPTlRBQ1RTX0lELCBudWxsKTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5DT05UQUNUU19MQUJFTCwgbnVsbCk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuQ09OVEFDVFNfVVJJLCBudWxsKTtcblxuICAgICAgICBsZXQgcGFyYW0gPSBwYXJhbWV0ZXIgfHwgUGFyYW1ldGVycy5DT05UQUNUU19JRDtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIocGFyYW0sIHRvQXJyYXkoY29udGFjdHMpKTtcbiAgICB9XG5cbiAgICBnZXRDb250YWN0cyAoKSA6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuQ09OVEFDVFNfSUQpIHx8XG4gICAgICAgICAgICB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkNPTlRBQ1RTX0xBQkVMKSB8fFxuICAgICAgICAgICAgdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5DT05UQUNUU19VUkkpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSB0aGUgaWRlbnRpZmllciBvZiBhbiBBZ2VudCAoQ29tbXVuaXR5LCBHcm91cCwgZXRjKSB0aGF0XG4gICAgICogdXNlcyBpdGVtcyB5b3Ugd2lzaCB0byBmaW5kIGluIHNlYXJjaCByZXN1bHRzLiBCeVxuICAgICAqIGRlZmF1bHQsIHZhbHVlcyBhcmUgYXNzdW1lZCB0byBiZSBpZGVudGlmaWVycy4gSWYgdXNpbmdcbiAgICAgKiBsYWJlbHMgb3IgdXJpcywgc3BlY2lmeSB0aGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlclxuICAgICAqIHRvIGJlIGVpdGhlciBQYXJhbWV0ZXJzLlVTRURfQllfTEFCRUwgb3IgUGFyYW1ldGVycy5VU0VEX0JZX1VSSVxuICAgICAqIHJlc3BlY3RpdmVseS5cbiAgICAgKiBAcGFyYW0gcGFyYW1ldGVyIC0gb3B0aW9uYWwsIHRvIGluZGljYXRlIHRoZSBwYXJhbWV0ZXIgdG8gdXNlXG4gICAgICogQHJldHVybiBRdWVyeVxuICAgICAqL1xuICAgIHVzZWRCeShpZHM6c3RyaW5nfHN0cmluZ1tdLCBwYXJhbWV0ZXI/OnN0cmluZykgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0VXNlZEJ5KGlkcywgcGFyYW1ldGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSB0aGUgaWRlbnRpZmllciBvZiBhbiBBZ2VudCAoQ29tbXVuaXR5LCBHcm91cCwgZXRjKSB0aGF0XG4gICAgICogdXNlcyBpdGVtcyB5b3Ugd2lzaCB0byBmaW5kIGluIHNlYXJjaCByZXN1bHRzLiBCeVxuICAgICAqIGRlZmF1bHQsIHZhbHVlcyBhcmUgYXNzdW1lZCB0byBiZSBpZGVudGlmaWVycy4gSWYgdXNpbmdcbiAgICAgKiBsYWJlbHMgb3IgdXJpcywgc3BlY2lmeSB0aGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlclxuICAgICAqIHRvIGJlIGVpdGhlciBQYXJhbWV0ZXJzLlVTRURfQllfTEFCRUwgb3IgUGFyYW1ldGVycy5VU0VEX0JZX1VSSVxuICAgICAqIHJlc3BlY3RpdmVseS5cbiAgICAgKiBAcGFyYW0gaWRzIC0gcHVibGlzaGluZyBvcmdzIHRvIGNvbnN0cmFpbiBieVxuICAgICAqL1xuICAgIHNldFVzZWRCeSAoaWRzOnN0cmluZ3xzdHJpbmdbXSwgcGFyYW1ldGVyPzpzdHJpbmcpIHtcblxuICAgICAgICAvL2NsZWFyIGV4aXN0aW5nXG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVVNFRF9CWV9JRCwgbnVsbCk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVVNFRF9CWV9MQUJFTCwgbnVsbCk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVVNFRF9CWV9VUkksIG51bGwpO1xuXG4gICAgICAgIGxldCBwYXJhbSA9IHBhcmFtZXRlciB8fCBQYXJhbWV0ZXJzLlVTRURfQllfSUQ7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKHBhcmFtLCB0b0FycmF5KGlkcykpO1xuICAgIH1cblxuICAgIGdldFVzZWRCeSAoKSA6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVVNFRF9CWV9JRCkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVVNFRF9CWV9MQUJFTCkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVVNFRF9CWV9VUkkpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSBhIENvbmNlcHQgU2NoZW1lIG9yIHNldCBvZiBDb25jZXB0IFNjaGVtZXMgdG8gY29uc3RyYWluIHJlc3VsdHMuIEJ5XG4gICAgICogZGVmYXVsdCwgdmFsdWVzIGFyZSBhc3N1bWVkIHRvIGJlIGlkZW50aWZpZXJzLiBJZiB1c2luZ1xuICAgICAqIGxhYmVscyBvciB1cmlzLCBzcGVjaWZ5IHRoZSBvcHRpb25hbCBzZWNvbmQgcGFyYW1ldGVyXG4gICAgICogdG8gYmUgZWl0aGVyIFBhcmFtZXRlcnMuU0NIRU1FU19MQUJFTCBvciBQYXJhbWV0ZXJzLlNDSEVNRVNfVVJJXG4gICAgICogcmVzcGVjdGl2ZWx5LlxuICAgICAqIEBwYXJhbSBzY2hlbWVzIC0gc2NoZW1lcyB0byBjb25zdHJhaW4gYnlcbiAgICAgKiBAcGFyYW0gcGFyYW1ldGVyIC0gb3B0aW9uYWwsIHRvIGluZGljYXRlIHRoZSBwYXJhbWV0ZXIgdG8gdXNlXG4gICAgICogQHJldHVybiBRdWVyeVxuICAgICAqL1xuICAgIHNjaGVtZXMoc2NoZW1lczpzdHJpbmd8c3RyaW5nW10sIHBhcmFtZXRlcj86c3RyaW5nKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRTY2hlbWVzKHNjaGVtZXMsIHBhcmFtZXRlcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgYSBDb25jZXB0IFNjaGVtZSBvciBzZXQgb2YgQ29uY2VwdCBTY2hlbWVzIHRvIGNvbnN0cmFpbiByZXN1bHRzLiBCeVxuICAgICAqIGRlZmF1bHQsIHZhbHVlcyBhcmUgYXNzdW1lZCB0byBiZSB0aGVtZSBpZGVudGlmaWVycy4gSWYgdXNpbmdcbiAgICAgKiB0aGVtZSBsYWJlbHMgb3IgdGhlbWUgdXJpcywgc3BlY2lmeSB0aGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlclxuICAgICAqIHRvIGJlIGVpdGhlciBQYXJhbWV0ZXJzLlNDSEVNRVNfTEFCRUwgb3IgUGFyYW1ldGVycy5TQ0hFTUVTX1VSSVxuICAgICAqIHJlc3BlY3RpdmVseS5cbiAgICAgKiBAcGFyYW0gc2NoZW1lcyAtIHNjaGVtZXMgdG8gY29uc3RyYWluIGJ5XG4gICAgICogQHBhcmFtIHBhcmFtZXRlciAtIG9wdGlvbmFsLCB0byBpbmRpY2F0ZSB0aGUgcGFyYW1ldGVyIHRvIHVzZVxuICAgICAqL1xuICAgIHNldFNjaGVtZXMgKHNjaGVtZXM6c3RyaW5nfHN0cmluZ1tdLCBwYXJhbWV0ZXI/OnN0cmluZykge1xuXG4gICAgICAgIC8vY2xlYXIgZXhpc3RpbmdcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5TQ0hFTUVTX0lELCBudWxsKTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5TQ0hFTUVTX0xBQkVMLCBudWxsKTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5TQ0hFTUVTX1VSSSwgbnVsbCk7XG5cbiAgICAgICAgbGV0IHBhcmFtID0gcGFyYW1ldGVyIHx8IFBhcmFtZXRlcnMuU0NIRU1FU19JRDtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIocGFyYW0sIHRvQXJyYXkoc2NoZW1lcykpO1xuICAgIH1cblxuICAgIGdldFNjaGVtZXMoKSA6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuU0NIRU1FU19JRCkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuU0NIRU1FU19MQUJFTCkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuU0NIRU1FU19VUkkpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgc2VydmljZVR5cGVzKHR5cGVzOnN0cmluZ3xzdHJpbmdbXSkgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0U2VydmljZVR5cGVzKHR5cGVzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHR5cGVzIC0gaWRzXG4gICAgICovXG4gICAgc2V0U2VydmljZVR5cGVzICh0eXBlczpzdHJpbmd8c3RyaW5nW10pIHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5TRVJWSUNFX1RZUEVTLCB0b0FycmF5KHR5cGVzKSk7XG4gICAgfVxuXG4gICAgZ2V0U2VydmljZVR5cGVzICgpIDogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5TRVJWSUNFX1RZUEVTKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIHZpc2liaWxpdHkodmlzOlwicHVibGljXCJ8XCJwcml2YXRlXCIpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldFZpc2liaWxpdHkodmlzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHZpc2liaWxpdHkgLSBvbmUgb2YgJ3B1YmxpYycgb3IgJ3ByaXZhdGUnXG4gICAgICovXG4gICAgc2V0VmlzaWJpbGl0eSAodmlzaWJpbGl0eSA6IFwicHVibGljXCJ8XCJwcml2YXRlXCIpIHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5WSVNJQklMSVRZLCB2aXNpYmlsaXR5KTtcbiAgICB9XG5cbiAgICBnZXRWaXNpYmlsaXR5ICgpIDogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVklTSUJJTElUWSk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICBzdGF0dXModmFsdWUgOiBzdHJpbmcpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldFN0YXR1cyh2YWx1ZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBzdGF0dXMgLSBjdXJyZW50IHN0YXR1cyBvZiBJdGVtXG4gICAgICovXG4gICAgc2V0U3RhdHVzICh2YWx1ZSA6IHN0cmluZykge1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlNUQVRVUywgdmFsdWUpO1xuICAgIH1cblxuICAgIGdldFN0YXR1cyAoKSA6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlNUQVRVUyk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICBleHRlbnQoYmJveCA6IGFueSkgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0RXh0ZW50KGJib3gpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gYmJveCAtIHN0cmluZyBmb3JtIG9mIFwibWlueCxtaW55LG1heHgsbWF4eVwiLCBvciBMLkxhdExuZ0JvdW5kcywgb3IgQXJyYXlcbiAgICAgKi9cbiAgICBzZXRFeHRlbnQgKGJib3ggOiBhbnkpIHtcbiAgICAgICAgaWYoYmJveCkge1xuICAgICAgICAgICAgaWYodHlwZW9mKGJib3gudG9CYm94U3RyaW5nKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAvL0xlYWZsZXQgQm91bmRzIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgYmJveCA9IGJib3gudG9CYm94U3RyaW5nKCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZih0eXBlb2YoYmJveC5wdXNoKSAhPT0gJ3VuZGVmaW5lZCcgJiYgYmJveC5sZW5ndGggJiZcbiAgICAgICAgICAgICAgICAvL05lc3RlZCBhcnJheSAoYWx0ZXJuYXRlIExlYWZsZXQgcmVwcmVzZW50YXRpb24pOlxuICAgICAgICAgICAgICAgIC8vIFsgW21pbkxhdCxtaW5Mb25nXSwgW21heExhdCxtYXhMb25nXSBdXG4gICAgICAgICAgICAgICAgdHlwZW9mKGJib3hbMF0ucHVzaCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgYmJveCA9IGJib3hbMF1bMV0rJywnK2Jib3hbMF1bMF0rJywnK2Jib3hbMV1bMV0rJywnK2Jib3hbMV1bMF07XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZih0eXBlb2YoYmJveCkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgaWYoIUJCT1hfUkVHRVgudGVzdChiYm94KSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGFyZ3VtZW50OiBiYm94IHN0cmluZyBtdXN0IGJlIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaW4gZm9ybSBvZiAnbWlueCxtaW55LG1heHgsbWF4eSdcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGFyZ3VtZW50OiBiYm94IG11c3QgYmUgb25lIG9mIFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCJMZWFmbGV0LkJvdW5kcywgbmVzdGVkIGFycmF5LCBvciBiYm94IHN0cmluZ1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkVYVEVOVCwgYmJveCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiBiYm94IHN0cmluZyBvciBudWxsIGlmIG5vdCBzZXRcbiAgICAgKi9cbiAgICBnZXRFeHRlbnQgKCkgOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5FWFRFTlQpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgbW9kaWZpZWQoZGF0ZSA6IG51bWJlcnxEYXRlLCBiZWZvcmVPckFmdGVyIDogYm9vbGVhbikgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0TW9kaWZpZWQoZGF0ZSwgYmVmb3JlT3JBZnRlcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBkYXRlIC0gZGF0ZSB0byBjb21wYXJlIGFnYWluc3RcbiAgICAgKiBAcGFyYW0gYmVmb3JlT3JBZnRlciAtIGZsYWcgc3BlY2lmeWluZyB3aGljaCBib3VuZGFyeSBjb25kaXRpb24gKHRydWUgPSBiZWZvcmUsIGZhbHNlID0gYWZ0ZXIpIGZsYWcgc3BlY2lmeWluZyB3aGV0aGVyIHRvIHRyaWdnZXIgdXBkYXRlIGF1dG9tYXRpY2FsbHlcbiAgICAgKi9cbiAgICBzZXRNb2RpZmllZCAoZGF0ZSA6IG51bWJlcnxEYXRlLCBiZWZvcmVPckFmdGVyOmJvb2xlYW4pIHtcblxuICAgICAgICAvL2lmIG5vIGRhdGUgd2FzIHN1cHBsaWVkLCBjb25zaWRlciBpdCBcInVuc2V0XCIgZm9yIGJvdGggcHJvcGVydGllc1xuICAgICAgICBpZighZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5NT0RJRklFRF9CRUZPUkUsIG51bGwpO1xuICAgICAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5NT0RJRklFRF9BRlRFUiwgbnVsbCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZighKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSlcbiAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlIGFzIG51bWJlcik7XG5cbiAgICAgICAgbGV0IGRpciA9IGJlZm9yZU9yQWZ0ZXIgJiYgKGJlZm9yZU9yQWZ0ZXIgPT09IHRydWUgfHwgYmVmb3JlT3JBZnRlciA9PT0gXCJ0cnVlXCIpO1xuICAgICAgICBsZXQgcHJvcCA9IGRpciA/IFBhcmFtZXRlcnMuTU9ESUZJRURfQkVGT1JFIDogUGFyYW1ldGVycy5NT0RJRklFRF9BRlRFUjsgICAgICAgLy9wcm9wZXJ0eSBiZWluZyBzZXRcbiAgICAgICAgbGV0IG9wcFByb3AgPSBkaXIgPyBQYXJhbWV0ZXJzLk1PRElGSUVEX0FGVEVSIDogUGFyYW1ldGVycy5NT0RJRklFRF9CRUZPUkU7ICAgIC8vdW5zZXQgb3Bwb3NpdGUgcHJvcGVydHlcbiAgICAgICAgbGV0IGFyZyA9IChkYXRlICYmIGRhdGUuZ2V0VGltZSkgPyBkYXRlLmdldFRpbWUoKSA6IGRhdGU7XG5cbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIob3BwUHJvcCwgbnVsbCk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKHByb3AsIGFyZyk7XG4gICAgfVxuXG4gICAgZ2V0TW9kaWZpZWQgKCkgOiBEYXRlIHtcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5NT0RJRklFRF9CRUZPUkUpIHx8XG4gICAgICAgICAgICB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLk1PRElGSUVEX0FGVEVSKTtcbiAgICAgICAgaWYodmFsdWUgJiYgdHlwZW9mKHZhbHVlKSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHZhbHVlID0gbmV3IERhdGUodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIGNyZWF0ZWQoZGF0ZSA6IG51bWJlcnxEYXRlLCBiZWZvcmVPckFmdGVyOmJvb2xlYW4pIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldENyZWF0ZWQoZGF0ZSwgYmVmb3JlT3JBZnRlcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBkYXRlIC0gZGF0ZSB0byBjb21wYXJlIGFnYWluc3RcbiAgICAgKiBAcGFyYW0gYmVmb3JlT3JBZnRlciAtIGZsYWcgc3BlY2lmeWluZyB3aGljaCBib3VuZGFyeSBjb25kaXRpb24gKHRydWUgPSBiZWZvcmUsIGZhbHNlID0gYWZ0ZXIpIGZsYWcgc3BlY2lmeWluZyB3aGV0aGVyIHRvIHRyaWdnZXIgdXBkYXRlIGF1dG9tYXRpY2FsbHlcbiAgICAgKi9cbiAgICBzZXRDcmVhdGVkIChkYXRlIDogbnVtYmVyfERhdGUsIGJlZm9yZU9yQWZ0ZXI6Ym9vbGVhbikge1xuXG4gICAgICAgIC8vaWYgbm8gZGF0ZSB3YXMgc3VwcGxpZWQsIGNvbnNpZGVyIGl0IFwidW5zZXRcIiBmb3IgYm90aCBwcm9wZXJ0aWVzXG4gICAgICAgIGlmKCFkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkNSRUFURURfQkVGT1JFLCBudWxsKTtcbiAgICAgICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuQ1JFQVRFRF9BRlRFUiwgbnVsbCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZighKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSlcbiAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlIGFzIG51bWJlcik7XG5cbiAgICAgICAgbGV0IGRpciA9IGJlZm9yZU9yQWZ0ZXIgJiYgKGJlZm9yZU9yQWZ0ZXIgPT09IHRydWUgfHwgYmVmb3JlT3JBZnRlciA9PT0gXCJ0cnVlXCIpO1xuICAgICAgICBsZXQgcHJvcCA9IGRpciA/IFBhcmFtZXRlcnMuQ1JFQVRFRF9CRUZPUkUgOiBQYXJhbWV0ZXJzLkNSRUFURURfQUZURVI7ICAgICAgIC8vcHJvcGVydHkgYmVpbmcgc2V0XG4gICAgICAgIGxldCBvcHBQcm9wID0gZGlyID8gUGFyYW1ldGVycy5DUkVBVEVEX0FGVEVSIDogUGFyYW1ldGVycy5DUkVBVEVEX0JFRk9SRTsgICAgLy91bnNldCBvcHBvc2l0ZSBwcm9wZXJ0eVxuICAgICAgICBsZXQgYXJnID0gKGRhdGUgJiYgZGF0ZS5nZXRUaW1lKSA/IGRhdGUuZ2V0VGltZSgpIDogZGF0ZTtcblxuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihvcHBQcm9wLCBudWxsKTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIocHJvcCwgYXJnKTtcbiAgICB9XG5cbiAgICBnZXRDcmVhdGVkICgpIDogRGF0ZSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuQ1JFQVRFRF9CRUZPUkUpIHx8XG4gICAgICAgICAgICB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkNSRUFURURfQUZURVIpO1xuICAgICAgICBpZih2YWx1ZSAmJiB0eXBlb2YodmFsdWUpID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdmFsdWUgPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgYmVnaW5zKGRhdGUgOiBudW1iZXJ8RGF0ZSkgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0QmVnaW5EYXRlKGRhdGUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRCZWdpbkRhdGUgKGRhdGUgOiBudW1iZXJ8RGF0ZSkge1xuICAgICAgICBpZihkYXRlICYmIGRhdGUgaW5zdGFuY2VvZiBEYXRlKVxuICAgICAgICAgICAgZGF0ZSA9IGRhdGUuZ2V0VGltZSgpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkJFR0lOUywgZGF0ZSk7XG4gICAgfVxuXG4gICAgZ2V0QmVnaW5EYXRlICgpIDogRGF0ZSB7XG4gICAgICAgIGxldCBkYXRlID0gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5CRUdJTlMpO1xuICAgICAgICBpZihkYXRlKSBkYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgZW5kcyhkYXRlIDogbnVtYmVyfERhdGUpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldEVuZERhdGUoZGF0ZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldEVuZERhdGUgKGRhdGU6IG51bWJlcnxEYXRlKSB7XG4gICAgICAgIGlmKGRhdGUgJiYgZGF0ZSBpbnN0YW5jZW9mIERhdGUpXG4gICAgICAgICAgICBkYXRlID0gZGF0ZS5nZXRUaW1lKCk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuRU5EUywgZGF0ZSk7XG4gICAgfVxuXG4gICAgZ2V0RW5kRGF0ZSAoKSA6IERhdGUge1xuICAgICAgICBsZXQgZGF0ZSA9IHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuRU5EUyk7XG4gICAgICAgIGlmKGRhdGUpIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICBiZXR3ZWVuKGJlZ2luIDogbnVtYmVyfERhdGUsIGVuZCA6IG51bWJlcnxEYXRlKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRCZXR3ZWVuKGJlZ2luLCBlbmQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRCZXR3ZWVuKGJlZ2luIDogbnVtYmVyfERhdGUsIGVuZCA6IG51bWJlcnxEYXRlKSB7XG4gICAgICAgIHRoaXMuYmVnaW5zKGJlZ2luKTtcbiAgICAgICAgdGhpcy5lbmRzKGVuZCk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICByZXNvdXJjZVR5cGVzKHR5cGVzOiBzdHJpbmd8c3RyaW5nW10pIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldFJlc291cmNlVHlwZXModHlwZXMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRSZXNvdXJjZVR5cGVzKHR5cGVzOiBzdHJpbmd8c3RyaW5nW10pIHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5SRVNPVVJDRV9UWVBFLCB0b0FycmF5KHR5cGVzKSk7XG4gICAgfVxuXG4gICAgZ2V0UmVzb3VyY2VUeXBlcygpIDogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5SRVNPVVJDRV9UWVBFKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIGZhY2V0cyhuYW1lcyA6IHN0cmluZ3xzdHJpbmdbXSkgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0RmFjZXRzKG5hbWVzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBAcGFyYW0gbmFtZXMgLSBuYW1lcyBvZiBmYWNldHNcbiAgICAgKi9cbiAgICBzZXRGYWNldHMgKG5hbWVzOiBzdHJpbmd8c3RyaW5nW10pIHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5GQUNFVFMsIHRvQXJyYXkobmFtZXMpKTtcbiAgICB9XG5cbiAgICBnZXRGYWNldHMoKSA6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuRkFDRVRTKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbmFtZSAtIG5hbWUgb2YgZmFjZXQgdG8gYWRkXG4gICAgICovXG4gICAgYWRkRmFjZXQobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGxldCBmYWNldHMgPSB0aGlzLmdldEZhY2V0cygpIHx8IFtdO1xuICAgICAgICBmYWNldHMucHVzaChuYW1lKTtcbiAgICAgICAgdGhpcy5zZXRGYWNldHMoZmFjZXRzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbmFtZSAtIG5hbWUgb2YgZmFjZXQgdG8gcmVtb3ZlXG4gICAgICovXG4gICAgcmVtb3ZlRmFjZXQobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGxldCBmYWNldHMgPSB0aGlzLmdldEZhY2V0cygpIHx8IFtdO1xuICAgICAgICBsZXQgaWR4ID0gZmFjZXRzLmluZGV4T2YobmFtZSk7XG4gICAgICAgIGlmKGlkeD49MCkge1xuICAgICAgICAgICAgZmFjZXRzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgdGhpcy5zZXRGYWNldHMoZmFjZXRzKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgZmllbGRzKGZpZWxkczogc3RyaW5nfHN0cmluZ1tdKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRGaWVsZHMoZmllbGRzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGZpZWxkcyAtIGxpc3Qgb2YgZmllbGQgbmFtZXMgdG8gcmVxdWVzdCBmb3IgZWFjaCBzZWFyY2ggcmVzdWx0XG4gICAgICovXG4gICAgc2V0RmllbGRzIChmaWVsZHM6IHN0cmluZ3xzdHJpbmdbXSkge1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkZJRUxEUywgdG9BcnJheShmaWVsZHMpKTtcbiAgICB9XG5cbiAgICBnZXRGaWVsZHMoKSA6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuRklFTERTKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZmllbGQgLSBuYW1lIG9mIGZpZWxkIHRvIHJlbW92ZVxuICAgICAqL1xuICAgIGFkZEZpZWxkKGZpZWxkOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGZpZWxkcyA9IHRoaXMuZ2V0RmllbGRzKCkgfHwgW107XG4gICAgICAgIGZpZWxkcy5wdXNoKGZpZWxkKTtcbiAgICAgICAgdGhpcy5zZXRGaWVsZHMoZmllbGRzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZmllbGQgLSBuYW1lIG9mIGZpZWxkIHRvIHJlbW92ZVxuICAgICAqL1xuICAgIHJlbW92ZUZpZWxkKGZpZWxkOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGZpZWxkcyA9IHRoaXMuZ2V0RmllbGRzKCkgfHwgW107XG4gICAgICAgIGxldCBpZHggPSBmaWVsZHMuaW5kZXhPZihmaWVsZCk7XG4gICAgICAgIGlmKGlkeD49MCkge1xuICAgICAgICAgICAgZmllbGRzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgdGhpcy5zZXRGaWVsZHMoZmllbGRzKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gcGFnZSAtIHBhZ2Ugb2YgcmVzdWx0cyB0byBmZXRjaFxuICAgICAqL1xuICAgIHBhZ2UgKHBhZ2U6IG51bWJlcikgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0UGFnZShwYWdlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0UGFnZShwYWdlOiBudW1iZXIpIHtcbiAgICAgICAgaWYoaXNOYU4ocGFnZSkgfHwgcGFnZSoxPDApIHJldHVybjtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5QQUdFLCBwYWdlKjEpO1xuICAgIH1cblxuICAgIGdldFBhZ2UoKSA6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlBBR0UpO1xuICAgIH1cblxuICAgIG5leHRQYWdlKCkgOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRQYWdlKHRoaXMuZ2V0UGFnZSgpKzEpO1xuICAgIH1cblxuICAgIHByZXZpb3VzUGFnZSgpIDogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0UGFnZSh0aGlzLmdldFBhZ2UoKS0xKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBzaXplIC0gcGFnZSBzaXplIHRvIHJlcXVlc3RcbiAgICAgKi9cbiAgICBwYWdlU2l6ZSAoc2l6ZTogbnVtYmVyKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRQYWdlU2l6ZShzaXplKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0UGFnZVNpemUgKHNpemU6IG51bWJlcikge1xuICAgICAgICBpZihpc05hTihzaXplKSB8fCBzaXplKjE8MCkgcmV0dXJuO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlBBR0VfU0laRSwgc2l6ZSoxKTtcbiAgICB9XG5cbiAgICBnZXRQYWdlU2l6ZSgpIDogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuUEFHRV9TSVpFKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBzb3J0IC0gZm9ybSBvZiA8ZmllbGQ+LDxkaXI+IG9yIGp1c3QgZmllbGQgbmFtZVxuICAgICAqIEBwYXJhbSBvcmRlciAtIG9wdGlvbmFsLCBlaXRoZXIgJ2FzYycgb3IgJ2Rlc2MnXG4gICAgICovXG4gICAgc29ydCAoc29ydDogc3RyaW5nLCBvcmRlcj86c3RyaW5nKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRTb3J0KHNvcnQsIG9yZGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHNvcnQgLSBmb3JtIG9mIDxmaWVsZD4sPGRpcj4gb3IganVzdCBmaWVsZCBuYW1lXG4gICAgICogQHBhcmFtIG9yZGVyIC0gb3B0aW9uYWwsIGVpdGhlciAnYXNjJyBvciAnZGVzYydcbiAgICAgKi9cbiAgICAgc2V0U29ydChzb3J0OiBzdHJpbmcsIG9yZGVyPzpzdHJpbmcpIHtcbiAgICAgICAgIG9yZGVyID0gb3JkZXIgfHwgJ2Rlc2MnO1xuICAgICAgICAgaWYoc29ydCAmJiBzb3J0LmluZGV4T2YoJywnKTwwKVxuICAgICAgICAgICAgc29ydCA9IHNvcnQgKyAnLCcgKyBvcmRlcjtcbiAgICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuU09SVCwgc29ydCk7XG4gICAgfVxuXG4gICAgZ2V0U29ydCgpIDogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuU09SVCk7XG4gICAgfVxuXG4gICAgZ2V0U29ydEZpZWxkKCkgOiBzdHJpbmcgfCBudWxsIHtcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5nZXRTb3J0KCk7XG4gICAgICAgIHJldHVybiB2YWx1ZSAmJiB2YWx1ZS5sZW5ndGggPyB2YWx1ZS5zcGxpdCgnLCcpWzBdIDogbnVsbDtcbiAgICB9XG5cbiAgICBnZXRTb3J0T3JkZXIoKSA6IHN0cmluZyB8IG51bGwge1xuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLmdldFNvcnQoKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlICYmIHZhbHVlLmxlbmd0aCA/IHZhbHVlLnNwbGl0KCcsJylbMV0gOiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4gbGlzdCBvZiBrZXktdmFsdWUgcGFpcnMgb2Ygc29ydCBvcHRpb25zXG4gICAgICovXG4gICAgZ2V0U29ydE9wdGlvbnMoKSA6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgfVtdIHtcbiAgICAgICAgcmV0dXJuIFNPUlRfT1BUSU9OU19ERUZBVUxULnNsaWNlKDApO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBjbGVhciAoKSB7XG4gICAgICAgIHRoaXMucXVlcnkgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMuZGVmYXVsdFF1ZXJ5KSk7XG4gICAgfVxufVxuXG5leHBvcnQge1xuICAgIFF1ZXJ5IGFzIGRlZmF1bHQsXG4gICAgUXVlcnksXG4gICAgRmllbGRzLFxuICAgIEZhY2V0c1xufTtcbiJdfQ==