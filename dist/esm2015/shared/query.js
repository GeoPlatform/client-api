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
const SORT_OPTIONS_DEFAULT = [
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
        return SORT_OPTIONS_DEFAULT.slice(0);
    }
    /**
     *
     * @return {?}
     */
    clear() {
        this.query = JSON.parse(JSON.stringify(this.defaultQuery));
    }
}
if (false) {
    /** @type {?} */
    Query.prototype.query;
    /** @type {?} */
    Query.prototype.defaultQuery;
}
export { Query as default, Query, Fields, Facets };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50LyIsInNvdXJjZXMiOlsic2hhcmVkL3F1ZXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLFVBQVUsTUFBTSxjQUFjLENBQUM7Ozs7Ozs7QUFJdEMsTUFBTSxNQUFNLEdBQWlCO0lBQ3pCLGFBQWEsRUFBUyxRQUFRO0lBQzlCLGdCQUFnQixFQUFNLGlCQUFpQjtJQUN2QyxXQUFXLEVBQVcsYUFBYTtJQUNuQyxXQUFXLEVBQVcsYUFBYTtJQUNuQyxjQUFjLEVBQVEsUUFBUTtJQUM5QixRQUFRLEVBQWMsVUFBVTtJQUNoQyxPQUFPLEVBQWUsU0FBUztJQUMvQixVQUFVLEVBQVksV0FBVztJQUNqQyxRQUFRLEVBQWMsVUFBVTtJQUNoQyxXQUFXLEVBQVcsYUFBYTtJQUNuQyxhQUFhLEVBQVMsZUFBZTtJQUNyQyxNQUFNLEVBQWdCLFFBQVE7SUFDOUIsYUFBYSxFQUFTLE9BQU87SUFDN0IsSUFBSSxFQUFrQixNQUFNO0lBQzVCLFdBQVcsRUFBVyxhQUFhO0lBQ25DLFFBQVEsRUFBYyxVQUFVO0lBQ2hDLEtBQUssRUFBaUIsT0FBTztJQUM3QixnQkFBZ0IsRUFBTSxnQkFBZ0I7SUFDdEMsTUFBTSxFQUFnQixRQUFRO0lBQzlCLFVBQVUsRUFBWSxXQUFXO0lBQ2pDLFVBQVUsRUFBWSxXQUFXO0lBQ2pDLE1BQU0sRUFBZ0IsUUFBUTtJQUM5QixRQUFRLEVBQWMsVUFBVTtJQUNoQyxZQUFZLEVBQVUsYUFBYTtJQUNuQyxVQUFVLEVBQVksWUFBWTtJQUNsQyxjQUFjLEVBQVEsZUFBZTtJQUNyQyxZQUFZLEVBQVUsYUFBYTtJQUNuQyxRQUFRLEVBQWMsVUFBVTtJQUNoQyxPQUFPLEVBQWUsU0FBUztJQUMvQixVQUFVLEVBQVksWUFBWTtJQUNsQyxNQUFNLEVBQWdCLFFBQVE7SUFDOUIsVUFBVSxFQUFZLFdBQVc7SUFDakMsUUFBUSxFQUFjLFVBQVU7SUFDaEMs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QUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztLQUM3RDs7OztJQUtELGNBQWM7UUFDVixPQUFPLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN4Qzs7Ozs7SUFTRCxLQUFLO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7S0FDOUQ7Q0FDSjs7Ozs7OztBQUVELE9BQU8sRUFDSCxLQUFLLElBQUksT0FBTyxFQUNoQixLQUFLLEVBQ0wsTUFBTSxFQUNOLE1BQU0sRUFDVCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgUGFyYW1ldGVycyBmcm9tICcuL3BhcmFtZXRlcnMnO1xuXG5pbnRlcmZhY2UgS1ZQPFU+IHsgWyBrZXkgOiBzdHJpbmcgXSA6IFUgfVxuXG5jb25zdCBGaWVsZHMgOiBLVlA8c3RyaW5nPiA9IHtcbiAgICBBQ0NFU1NfUklHSFRTICAgICAgIDogJ3JpZ2h0cycsXG4gICAgQUxURVJOQVRFX1RJVExFUyAgICA6ICdhbHRlcm5hdGVUaXRsZXMnLFxuICAgIEFOTk9UQVRJT05TICAgICAgICAgOiAnYW5ub3RhdGlvbnMnLFxuICAgIENMQVNTSUZJRVJTICAgICAgICAgOiAnY2xhc3NpZmllcnMnLFxuICAgIENPTkNFUFRfU0NIRU1FICAgICAgOiAnc2NoZW1lJyxcbiAgICBDT05UQUNUUyAgICAgICAgICAgIDogJ2NvbnRhY3RzJyxcbiAgICBDUkVBVEVEICAgICAgICAgICAgIDogJ2NyZWF0ZWQnLFxuICAgIENSRUFURURfQlkgICAgICAgICAgOiAnY3JlYXRlZEJ5JyxcbiAgICBEQVRBU0VUUyAgICAgICAgICAgIDogJ2RhdGFzZXRzJyxcbiAgICBERVNDUklQVElPTiAgICAgICAgIDogJ2Rlc2NyaXB0aW9uJyxcbiAgICBESVNUUklCVVRJT05TICAgICAgIDogJ2Rpc3RyaWJ1dGlvbnMnLFxuICAgIEVYVEVOVCAgICAgICAgICAgICAgOiAnZXh0ZW50JyxcbiAgICBHQUxMRVJZX0lURU1TICAgICAgIDogJ2l0ZW1zJyxcbiAgICBIUkVGICAgICAgICAgICAgICAgIDogJ2hyZWYnLFxuICAgIElERU5USUZJRVJTICAgICAgICAgOiAnaWRlbnRpZmllcnMnLFxuICAgIEtFWVdPUkRTICAgICAgICAgICAgOiAna2V5d29yZHMnLFxuICAgIExBQkVMICAgICAgICAgICAgICAgOiAnbGFiZWwnLFxuICAgIExBU1RfTU9ESUZJRURfQlkgICAgOiAnbGFzdE1vZGlmaWVkQnknLFxuICAgIExBWUVSUyAgICAgICAgICAgICAgOiAnbGF5ZXJzJyxcbiAgICBMQVlFUl9UWVBFICAgICAgICAgIDogJ2xheWVyVHlwZScsXG4gICAgTEFZRVJfTkFNRSAgICAgICAgICA6ICdsYXllck5hbWUnLFxuICAgIExFR0VORCAgICAgICAgICAgICAgOiAnbGVnZW5kJyxcbiAgICBNT0RJRklFRCAgICAgICAgICAgIDogJ21vZGlmaWVkJyxcbiAgICBQQVJFTlRfTEFZRVIgICAgICAgIDogJ3BhcmVudExheWVyJyxcbiAgICBQVUJMSVNIRVJTICAgICAgICAgIDogJ3B1Ymxpc2hlcnMnLFxuICAgIFJFU09VUkNFX1RZUEVTICAgICAgOiAncmVzb3VyY2VUeXBlcycsXG4gICAgU0VSVklDRV9UWVBFICAgICAgICA6ICdzZXJ2aWNlVHlwZScsXG4gICAgU0VSVklDRVMgICAgICAgICAgICA6ICdzZXJ2aWNlcycsXG4gICAgU1BBVElBTCAgICAgICAgICAgICA6ICdzcGF0aWFsJyxcbiAgICBTVEFUSVNUSUNTICAgICAgICAgIDogJ3N0YXRpc3RpY3MnLFxuICAgIFNUQVRVUyAgICAgICAgICAgICAgOiAnc3RhdHVzJyxcbiAgICBTVUJfTEFZRVJTICAgICAgICAgIDogJ3N1YkxheWVycycsXG4gICAgVEVNUE9SQUwgICAgICAgICAgICA6ICd0ZW1wb3JhbCcsXG4gICAgVEhFTUVTICAgICAgICAgICAgICA6ICd0aGVtZXMnLFxuICAgIFRIVU1CTkFJTCAgICAgICAgICAgOiAndGh1bWJuYWlsJyxcbiAgICBUT1BJQ1MgICAgICAgICAgICAgIDogJ3RvcGljcycsXG4gICAgVVNFRF9CWSAgICAgICAgICAgICA6ICd1c2VkQnknLFxuICAgIFZJU0lCSUxJVFkgICAgICAgICAgOiAndmlzaWJpbGl0eScsXG4gICAgTEFORElOR19QQUdFICAgICAgICA6ICdsYW5kaW5nUGFnZSdcbn07XG5cbmNvbnN0IEZJRUxEU19ERUZBVUxUIDogc3RyaW5nW10gPSBbXG4gICAgRmllbGRzLkNSRUFURUQsIEZpZWxkcy5NT0RJRklFRCwgRmllbGRzLkNSRUFURURfQlksXG4gICAgRmllbGRzLlBVQkxJU0hFUlMsIEZpZWxkcy5USEVNRVMsIEZpZWxkcy5ERVNDUklQVElPTlxuXTtcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmNvbnN0IEZhY2V0cyA6IEtWUDxzdHJpbmc+ID0ge1xuICAgIEFMVEVSTkFURV9USVRMRVMgICAgOiAnYWx0ZXJuYXRlVGl0bGVzJyxcbiAgICBDT05DRVBUX1NDSEVNRVMgICAgIDogJ3NjaGVtZXMnLFxuICAgIENSRUFURURfQlkgICAgICAgICAgOiAnY3JlYXRlZEJ5JyxcbiAgICBIUkVGICAgICAgICAgICAgICAgIDogJ2hyZWYnLFxuICAgIElERU5USUZJRVJTICAgICAgICAgOiBcImlkZW50aWZpZXJzXCIsXG4gICAgTEFZRVJfVFlQRSAgICAgICAgICA6ICdsYXllclR5cGUnLFxuICAgIExBWUVSX05BTUUgICAgICAgICAgOiAnbGF5ZXJOYW1lJyxcbiAgICBMSUtFUyAgICAgICAgICAgICAgIDogJ2xpa2VzJyxcbiAgICBPTkxJTkUgICAgICAgICAgICAgIDogJ29ubGluZScsXG4gICAgUFVCTElTSEVSUyAgICAgICAgICA6ICdwdWJsaXNoZXJzJyxcbiAgICBDT05UQUNUUyAgICAgICAgICAgIDogJ2NvbnRhY3RzJyxcbiAgICBSRUxJQUJJTElUWSAgICAgICAgIDogJ3JlbGlhYmlsaXR5JyxcbiAgICBTRVJWSUNFX1RZUEVTICAgICAgIDogJ3NlcnZpY2VUeXBlcycsXG4gICAgU1BFRUQgICAgICAgICAgICAgICA6ICdzcGVlZCcsXG4gICAgU1RBVFVTICAgICAgICAgICAgICA6ICdzdGF0dXMnLFxuICAgIFRIRU1FUyAgICAgICAgICAgICAgOiAndGhlbWVzJyxcbiAgICBUT1BJQ1MgICAgICAgICAgICAgIDogJ3RvcGljcycsXG4gICAgVFlQRVMgICAgICAgICAgICAgICA6ICd0eXBlJywgICAvL1RPRE8gY2hhbmdlIHRvICd0eXBlcydcbiAgICBVU0VEX0JZICAgICAgICAgICAgIDogJ3VzZWRCeScsXG4gICAgVklFV1MgICAgICAgICAgICAgICA6ICd2aWV3cycsXG4gICAgVklTSUJJTElUWSAgICAgICAgICA6ICd2aXNpYmlsaXR5J1xufTtcblxuY29uc3QgRkFDRVRTX0RFRkFVTFQgOiBzdHJpbmdbXSA9IFtcbiAgICBGYWNldHMuVFlQRVMsXG4gICAgRmFjZXRzLlBVQkxJU0hFUlMsXG4gICAgRmFjZXRzLlNFUlZJQ0VfVFlQRVMsXG4gICAgRmFjZXRzLkNPTkNFUFRfU0NIRU1FUyxcbiAgICBGYWNldHMuVklTSUJJTElUWSxcbiAgICBGYWNldHMuQ1JFQVRFRF9CWVxuXTtcblxuXG4vKlxuICAgIE1hcCBmYWNldCBrZXlzIHRvIHBhcmFtZXRlcnMgc28gY2xpZW50cyBjYW4gc2V0XG4gICAgcXVlcnkgcGFyYW1zIHVzaW5nIGZhY2V0ZWQgcmVzdWx0c1xuXG4gICAgLy9UT0RPIHJlbW92ZSB0aGVzZSBhbmQgdGhlaXIgZnVuY3Rpb24gYmVsb3dcbiAqL1xuY29uc3QgRmFjZXRUb1BhcmFtIDogS1ZQPHN0cmluZz4gPSB7fTtcbkZhY2V0VG9QYXJhbVtGYWNldHMuVFlQRVNdICAgICAgICAgICA9IFBhcmFtZXRlcnMuVFlQRVM7XG5GYWNldFRvUGFyYW1bRmFjZXRzLlRIRU1FU10gICAgICAgICAgPSBQYXJhbWV0ZXJzLlRIRU1FU19JRDtcbkZhY2V0VG9QYXJhbVtGYWNldHMuVE9QSUNTXSAgICAgICAgICA9IFBhcmFtZXRlcnMuVE9QSUNTX0lEO1xuRmFjZXRUb1BhcmFtW0ZhY2V0cy5QVUJMSVNIRVJTXSAgICAgID0gUGFyYW1ldGVycy5QVUJMSVNIRVJTX0lEO1xuRmFjZXRUb1BhcmFtW0ZhY2V0cy5DT05UQUNUU10gICAgICAgID0gUGFyYW1ldGVycy5DT05UQUNUU19JRDtcbkZhY2V0VG9QYXJhbVtGYWNldHMuQ09OQ0VQVF9TQ0hFTUVTXSA9IFBhcmFtZXRlcnMuU0NIRU1FU19JRDtcbkZhY2V0VG9QYXJhbVtGYWNldHMuVVNFRF9CWV0gICAgICAgICA9IFBhcmFtZXRlcnMuVVNFRF9CWV9JRDtcblxuXG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cbmNvbnN0IFNPUlRfT1BUSU9OU19ERUZBVUxUIDogeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyB9W10gPSBbXG4gICAgeyB2YWx1ZTpcImxhYmVsLGFzY1wiLCAgICAgICBsYWJlbDogXCJOYW1lIChBLVopXCIgICAgICAgICAgICAgIH0sXG4gICAgeyB2YWx1ZTpcImxhYmVsLGRlc2NcIiwgICAgICBsYWJlbDogXCJOYW1lIChaLUEpXCIgICAgICAgICAgICAgIH0sXG4gICAgeyB2YWx1ZTpcInR5cGUsYXNjXCIsICAgICAgICBsYWJlbDogXCJUeXBlIChBLVopXCIgICAgICAgICAgICAgIH0sXG4gICAgeyB2YWx1ZTpcInR5cGUsZGVzY1wiLCAgICAgICBsYWJlbDogXCJUeXBlIChaLUEpXCIgICAgICAgICAgICAgIH0sXG4gICAgeyB2YWx1ZTpcIm1vZGlmaWVkLGRlc2NcIiwgICBsYWJlbDogXCJNb3N0IHJlY2VudGx5IG1vZGlmaWVkXCIgIH0sXG4gICAgeyB2YWx1ZTpcIm1vZGlmaWVkLGFzY1wiLCAgICBsYWJlbDogXCJMZWFzdCByZWNlbnRseSBtb2RpZmllZFwiIH0sXG4gICAgeyB2YWx1ZTpcIl9zY29yZSxkZXNjXCIsICAgICBsYWJlbDogXCJSZWxldmFuY2VcIiAgICAgICAgICAgICAgIH1cbl07XG5cblxuY29uc3QgQkJPWF9SRUdFWCA9IC9eXFwtP1xcZCsoXFwuXFxkKik/LFxcLT9cXGQrKFxcLlxcZCopPyxcXC0/XFxkKyhcXC5cXGQqKT8sXFwtP1xcZCsoXFwuXFxkKik/JC87XG5cblxuZnVuY3Rpb24gdG9BcnJheSh2YWx1ZSA6IGFueSkgOiBhbnkgfCBudWxsIHtcbiAgICBsZXQgcmVzdWx0ID0gdmFsdWU7XG4gICAgLy9pZiBnaXZlbiBhIG5vbi1hcnJheSB2YWx1ZSwgd3JhcCBpbiBhcnJheVxuICAgIGlmKHJlc3VsdCAhPT0gbnVsbCAmJiB0eXBlb2YocmVzdWx0LnB1c2gpID09PSAndW5kZWZpbmVkJykgcmVzdWx0ID0gW3Jlc3VsdF07XG4gICAgLy9pZiBhcnJheSB2YWx1ZSBpcyBlbXB0eSwgbnVsbGlmeSB0aGUgcmVzdWx0XG4gICAgaWYocmVzdWx0ICE9PSBudWxsICYmICFyZXN1bHQubGVuZ3RoKSByZXN1bHQgPSBudWxsO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxuXG4vKipcbiAqIFF1ZXJ5XG4gKlxuICogU3BlY2lmeSB0aGUgXCJkZWZhdWx0XCIgcXVlcnkgY29uc3RyYWludHMgdG8gdXNlIGJ5IHBhc3NpbmcgaW4gJ29wdGlvbnMuZGVmYXVsdHMgPSB7Li4ufSc7XG4gKlxuICovXG5jbGFzcyBRdWVyeSB7XG5cbiAgICBwdWJsaWMgcXVlcnkgOiBLVlA8YW55PjtcbiAgICBwcml2YXRlIGRlZmF1bHRRdWVyeSA6IEtWUDxhbnk+O1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBzZXQgb2YgaW5pdGlhbCBjb25zdHJhaW50c1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPzogS1ZQPGFueT4pIHtcbiAgICAgICAgdGhpcy5kZWZhdWx0UXVlcnkgPSB7IH07XG4gICAgICAgIHRoaXMuZGVmYXVsdFF1ZXJ5W1BhcmFtZXRlcnMuUEFHRS50b1N0cmluZygpXSA9IDA7XG4gICAgICAgIHRoaXMuZGVmYXVsdFF1ZXJ5W1BhcmFtZXRlcnMuUEFHRV9TSVpFLnRvU3RyaW5nKCldID0gMTA7XG4gICAgICAgIHRoaXMuZGVmYXVsdFF1ZXJ5W1BhcmFtZXRlcnMuU09SVC50b1N0cmluZygpXSA9IFwibW9kaWZpZWQsZGVzY1wiO1xuICAgICAgICB0aGlzLmRlZmF1bHRRdWVyeVtQYXJhbWV0ZXJzLkZJRUxEUy50b1N0cmluZygpXSA9IEZJRUxEU19ERUZBVUxULnNsaWNlKDApO1xuICAgICAgICB0aGlzLmRlZmF1bHRRdWVyeVtQYXJhbWV0ZXJzLkZBQ0VUUy50b1N0cmluZygpXSA9IEZBQ0VUU19ERUZBVUxULnNsaWNlKDApO1xuICAgICAgICBpZihvcHRpb25zICYmIG9wdGlvbnMuZGVmYXVsdHMpIHtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5kZWZhdWx0UXVlcnksIG9wdGlvbnMuZGVmYXVsdHMpO1xuICAgICAgICAgICAgZGVsZXRlIG9wdGlvbnMuZGVmYXVsdHM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5xdWVyeSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5kZWZhdWx0UXVlcnkpKTtcbiAgICAgICAgaWYob3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5hcHBseVBhcmFtZXRlcnMob3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4gY29udGFpbmluZyByZXF1ZXN0LXJlYWR5IHBhcmFtZXRlcnMvdmFsdWVzXG4gICAgICovXG4gICAgZ2V0UXVlcnkoKSA6IEtWUDxhbnk+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA6IEtWUDxhbnk+ID0ge307XG4gICAgICAgIGZvcihsZXQgcHJvcCBpbiB0aGlzLnF1ZXJ5KSB7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLnF1ZXJ5W3Byb3BdO1xuICAgICAgICAgICAgaWYodmFsdWUgIT09IG51bGwgJiYgdHlwZW9mKHZhbHVlLnB1c2gpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuam9pbignLCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0W3Byb3BdID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIFF1ZXJ5XG4gICAgICovXG4gICAgY2xvbmUoKSA6IFF1ZXJ5IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBRdWVyeSgpO1xuICAgICAgICBsZXQganNvbiA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5xdWVyeSkpO1xuICAgICAgICByZXN1bHQuYXBwbHlQYXJhbWV0ZXJzKGpzb24pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBuYW1lXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHJldHVybiBRdWVyeSB0aGlzXG4gICAgICovXG4gICAgcGFyYW1ldGVyKG5hbWUgOiBzdHJpbmcsIHZhbHVlIDogYW55KSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIobmFtZSwgdmFsdWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbmFtZVxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqL1xuICAgIHNldFBhcmFtZXRlciAobmFtZSA6IHN0cmluZywgdmFsdWU6IGFueSkgOiB2b2lkIHtcbiAgICAgICAgaWYodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCAvL2lmIG5vIHZhbHVlIHdhcyBwcm92aWRlXG4gICAgICAgICAgICAodHlwZW9mKHZhbHVlLnB1c2gpICE9PSAndW5kZWZpbmVkJyAmJiAhdmFsdWUubGVuZ3RoKSkgLy9vciBlbXB0eSBhcnJheVxuICAgICAgICAgICAgZGVsZXRlIHRoaXMucXVlcnlbbmFtZV07XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMucXVlcnlbbmFtZV0gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ga2V5IC0gbmFtZSBvZiBwYXJhbWV0ZXJcbiAgICAgKiBAcmV0dXJuIHZhbHVlIG9mIHBhcmFtZXRlclxuICAgICAqL1xuICAgIGdldFBhcmFtZXRlciAoa2V5IDogc3RyaW5nKSA6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXJ5W2tleV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG9iaiAtIHNldCBvZiBwYXJhbWV0ZXIvdmFsdWVzIHRvIGFwcGx5IHRvIHRoaXMgcXVlcnlcbiAgICAgKi9cbiAgICBhcHBseVBhcmFtZXRlcnMgKG9iaiA6IEtWUDxhbnk+KSA6IHZvaWQge8KgXG4gICAgICAgIGZvcihsZXQgcCBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmKG9iai5oYXNPd25Qcm9wZXJ0eShwKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKHAgYXMgc3RyaW5nLCBvYmpbcF0gYXMgYW55KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBmYWNldCAtIG5hbWUgb2YgZmFjZXQgdG8gc2V0IHRoZSB2YWx1ZSBmb3IgYXMgYSBwYXJhbWV0ZXJcbiAgICAgKiBAcGFyYW0gdmFsdWUgLSB2YWx1ZSBvZiB0aGUgZmFjZXQgdG8gdXNlIGFzIHRoZSBwYXJhbWV0ZXIncyB2YWx1ZVxuICAgICAqL1xuICAgICAvL1RPRE8gcmVtb3ZlIHRoaXMgZnVuY3Rpb25cbiAgICBzZXRGYWNldFBhcmFtZXRlciAoZmFjZXQ6IHN0cmluZywgdmFsdWU6IHN0cmluZykgOiB2b2lkIHtcbiAgICAgICAgbGV0IHBhcmFtIDogc3RyaW5nID0gRmFjZXRUb1BhcmFtW2ZhY2V0XTtcbiAgICAgICAgaWYoIXBhcmFtKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIldBUk4gOiBRdWVyeS5hcHBseUZhY2V0UGFyYW1ldGVyKCkgLSBcIiArXG4gICAgICAgICAgICAgICAgXCJ1bmFibGUgdG8gbWFwIGZhY2V0IHRvIGtub3duIHBhcmFtZXRlciAnXCIgKyBmYWNldCArIFwiJywgdXNpbmcgXCIgK1xuICAgICAgICAgICAgICAgIFwiYXMgZGlyZWN0IHBhcmFtZXRlciB3aGljaCBtYXkgbm90IG9wZXJhdGUgYXMgaW50ZW5kZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIocGFyYW18fGZhY2V0LCB2YWx1ZSk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHRleHRcbiAgICAgKiBAcmV0dXJuIFF1ZXJ5IHRoaXNcbiAgICAgKi9cbiAgICBxKHRleHQgOiBzdHJpbmcpIDogUXVlcnkgeyB0aGlzLnNldFEodGV4dCk7IHJldHVybiB0aGlzOyB9XG5cbiAgICAvKiogQHBhcmFtIHRleHQgLSBmcmVlIHRleHQgcXVlcnkgKi9cbiAgICBzZXRRICh0ZXh0IDogc3RyaW5nKSA6IHZvaWQgeyB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlFVRVJZLCB0ZXh0KTsgfVxuICAgIC8qKiBAcmV0dXJuICovXG4gICAgZ2V0USgpIDogc3RyaW5nIHsgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuUVVFUlkpIGFzIHN0cmluZzsgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICBrZXl3b3Jkcyh0ZXh0IDogc3RyaW5nfHN0cmluZ1tdKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRLZXl3b3Jkcyh0ZXh0KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHRleHQgLSBmcmVlIHRleHQgcXVlcnlcbiAgICAgKi9cbiAgICBzZXRLZXl3b3JkcyAodGV4dCA6IHN0cmluZ3xzdHJpbmdbXSkgOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5LRVlXT1JEUywgdG9BcnJheSh0ZXh0KSk7XG4gICAgfVxuXG4gICAgZ2V0S2V5d29yZHMoKSA6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuS0VZV09SRFMpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgdXJpICh1cmkgOiBzdHJpbmcpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldFVyaSh1cmkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRVcmkodXJpIDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVVJJLCB1cmkpO1xuICAgIH1cblxuICAgIGdldFVyaSgpIDogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVVJJKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIHR5cGVzKHR5cGVzIDogc3RyaW5nfHN0cmluZ1tdKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRUeXBlcyh0eXBlcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB0eXBlcyAtIG5hbWUgb2YgY2xhc3MoZXMpIHRvIHJlcXVlc3RcbiAgICAgKi9cbiAgICBzZXRUeXBlcyAodHlwZXMgOiBzdHJpbmd8c3RyaW5nW10pIHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5UWVBFUywgdG9BcnJheSh0eXBlcykpO1xuICAgIH1cblxuICAgIGdldFR5cGVzICgpIDogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5UWVBFUyk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICBjcmVhdGVkQnkodXNlciA6IHN0cmluZykgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0Q3JlYXRlZEJ5KHVzZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKiogQHBhcmFtIHVzZXIgLSB1c2VybmFtZSAqL1xuICAgIHNldENyZWF0ZWRCeSAodXNlciA6IHN0cmluZykge1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkNSRUFURURfQlksIHVzZXIpO1xuICAgIH1cblxuICAgIC8qKiBAcmV0dXJuIHVzZXJuYW1lICovXG4gICAgZ2V0Q3JlYXRlZEJ5ICgpIDogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuQ1JFQVRFRF9CWSk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICBsYXN0TW9kaWZpZWRCeSh1c2VyIDogc3RyaW5nKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRMYXN0TW9kaWZpZWRCeSh1c2VyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqIEBwYXJhbSB1c2VyIC0gdXNlcm5hbWUgKi9cbiAgICBzZXRMYXN0TW9kaWZpZWRCeSAodXNlcjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuTEFTVF9NT0RJRklFRF9CWSwgdXNlcik7XG4gICAgfVxuXG4gICAgLyoqIEByZXR1cm4gdXNlcm5hbWUgKi9cbiAgICBnZXRMYXN0TW9kaWZpZWRCeSAoKSA6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkxBU1RfTU9ESUZJRURfQlkpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSBhIFRoZW1lIG9yIHNldCBvZiBUaGVtZXMgdG8gY29uc3RyYWluIHJlc3VsdHMuIEJ5XG4gICAgICogZGVmYXVsdCwgdmFsdWVzIGFyZSBhc3N1bWVkIHRvIGJlIHRoZW1lIGlkZW50aWZpZXJzLiBJZiB1c2luZ1xuICAgICAqIHRoZW1lIGxhYmVscyBvciB0aGVtZSB1cmlzLCBzcGVjaWZ5IHRoZSBvcHRpb25hbCBzZWNvbmQgcGFyYW1ldGVyXG4gICAgICogdG8gYmUgZWl0aGVyIFBhcmFtZXRlcnMuVEhFTUVTX0xBQkVMIG9yIFBhcmFtZXRlcnMuVEhFTUVTX1VSSVxuICAgICAqIHJlc3BlY3RpdmVseS5cbiAgICAgKiBAcGFyYW0gdGhlbWVzIC0gc3RyaW5nIG9yIGFycmF5IG9mIHN0cmluZ3MgY29udGFpbmluZyB0aGVtZSBjb25zdHJhaW50XG4gICAgICogQHBhcmFtIHBhcmFtZXRlciAtIG9wdGlvbmFsLCB0byBpbmRpY2F0ZSB0aGUgcGFyYW1ldGVyIHRvIHVzZVxuICAgICAqIEByZXR1cm4gUXVlcnlcbiAgICAgKi9cbiAgICB0aGVtZXModGhlbWVzOiBzdHJpbmd8c3RyaW5nW10sIHBhcmFtZXRlcj86c3RyaW5nKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRUaGVtZXModGhlbWVzLCBwYXJhbWV0ZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgYSBUaGVtZSBvciBzZXQgb2YgVGhlbWVzIHRvIGNvbnN0cmFpbiByZXN1bHRzLiBCeVxuICAgICAqIGRlZmF1bHQsIHZhbHVlcyBhcmUgYXNzdW1lZCB0byBiZSB0aGVtZSBpZGVudGlmaWVycy4gSWYgdXNpbmdcbiAgICAgKiB0aGVtZSBsYWJlbHMgb3IgdGhlbWUgdXJpcywgc3BlY2lmeSB0aGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlclxuICAgICAqIHRvIGJlIGVpdGhlciBQYXJhbWV0ZXJzLlRIRU1FU19MQUJFTCBvciBQYXJhbWV0ZXJzLlRIRU1FU19VUklcbiAgICAgKiByZXNwZWN0aXZlbHkuXG4gICAgICogQHBhcmFtIHRoZW1lcyAtIHRoZW1lIG9yIHRoZW1lcyB0byBjb25zdHJhaW4gYnlcbiAgICAgKi9cbiAgICBzZXRUaGVtZXMgKHRoZW1lczpzdHJpbmd8c3RyaW5nW10sIHBhcmFtZXRlcj86c3RyaW5nKSB7XG5cbiAgICAgICAgLy9jbGVhciBleGlzdGluZ1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlRIRU1FU19JRCwgbnVsbCk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVEhFTUVTX0xBQkVMLCBudWxsKTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5USEVNRVNfVVJJLCBudWxsKTtcblxuICAgICAgICBsZXQgcGFyYW0gPSBwYXJhbWV0ZXIgfHwgUGFyYW1ldGVycy5USEVNRVNfSUQ7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKHBhcmFtLCB0b0FycmF5KHRoZW1lcykpO1xuICAgIH1cblxuICAgIGdldFRoZW1lcyAoKSA6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVEhFTUVTX0lEKSB8fFxuICAgICAgICAgICAgdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5USEVNRVNfTEFCRUwpIHx8XG4gICAgICAgICAgICB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlRIRU1FU19VUkkpO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgYSBUb3BpYyBvciBzZXQgb2YgVG9waWNzIHRvIGNvbnN0cmFpbiByZXN1bHRzLiBCeVxuICAgICAqIGRlZmF1bHQsIHZhbHVlcyBhcmUgYXNzdW1lZCB0byBiZSB0aGVtZSBpZGVudGlmaWVycy4gSWYgdXNpbmdcbiAgICAgKiB0aGVtZSBsYWJlbHMgb3IgdGhlbWUgdXJpcywgc3BlY2lmeSB0aGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlclxuICAgICAqIHRvIGJlIGVpdGhlciBQYXJhbWV0ZXJzLlRPUElDX0xBQkVMIG9yIFBhcmFtZXRlcnMuVE9QSUNfVVJJXG4gICAgICogcmVzcGVjdGl2ZWx5LlxuICAgICAqIEBwYXJhbSAgdG9waWNzIC0gc3RyaW5nIG9yIGFycmF5IG9mIHN0cmluZ3MgY29udGFpbmluZyB0aGVtZSBjb25zdHJhaW50XG4gICAgICogQHBhcmFtICBwYXJhbWV0ZXIgLSBvcHRpb25hbCwgdG8gaW5kaWNhdGUgdGhlIHBhcmFtZXRlciB0byB1c2VcbiAgICAgKiBAcmV0dXJuIFF1ZXJ5IGluc3RhbmNlXG4gICAgICovXG4gICAgdG9waWNzKHRvcGljczpzdHJpbmd8c3RyaW5nW10sIHBhcmFtZXRlciA/OiBzdHJpbmcpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldFRvcGljcyh0b3BpY3MsIHBhcmFtZXRlcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSBhIFRvcGljIG9yIHNldCBvZiBUb3BpY3MgdG8gY29uc3RyYWluIHJlc3VsdHMuIEJ5XG4gICAgICogZGVmYXVsdCwgdmFsdWVzIGFyZSBhc3N1bWVkIHRvIGJlIHRoZW1lIGlkZW50aWZpZXJzLiBJZiB1c2luZ1xuICAgICAqIHRoZW1lIGxhYmVscyBvciB0aGVtZSB1cmlzLCBzcGVjaWZ5IHRoZSBvcHRpb25hbCBzZWNvbmQgcGFyYW1ldGVyXG4gICAgICogdG8gYmUgZWl0aGVyIFBhcmFtZXRlcnMuVE9QSUNfTEFCRUwgb3IgUGFyYW1ldGVycy5UT1BJQ19VUklcbiAgICAgKiByZXNwZWN0aXZlbHkuXG4gICAgICogQHBhcmFtIHRvcGljcyAtIHRoZW1lIG9yIHRvcGljcyB0byBjb25zdHJhaW4gYnlcbiAgICAgKi9cbiAgICBzZXRUb3BpY3MgKHRvcGljczpzdHJpbmd8c3RyaW5nW10sIHBhcmFtZXRlciA/OiBzdHJpbmcpIHtcblxuICAgICAgICAvL2NsZWFyIGV4aXN0aW5nXG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVE9QSUNTX0lELCBudWxsKTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5UT1BJQ1NfTEFCRUwsIG51bGwpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlRPUElDU19VUkksIG51bGwpO1xuXG4gICAgICAgIGxldCBwYXJhbSA9IHBhcmFtZXRlciB8fCBQYXJhbWV0ZXJzLlRPUElDU19JRDtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIocGFyYW0sIHRvQXJyYXkodG9waWNzKSk7XG4gICAgfVxuXG4gICAgZ2V0VG9waWNzICgpIDogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5UT1BJQ1NfSUQpIHx8XG4gICAgICAgICAgICB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlRPUElDU19MQUJFTCkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVE9QSUNTX1VSSSk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IGEgUHVibGlzaGVyIG9yIHNldCBvZiBQdWJsaXNoZXJzIHRvIGNvbnN0cmFpbiByZXN1bHRzLiBCeVxuICAgICAqIGRlZmF1bHQsIHZhbHVlcyBhcmUgYXNzdW1lZCB0byBiZSBpZGVudGlmaWVycy4gSWYgdXNpbmcgbGFiZWxzIG9yIHVyaXMsXG4gICAgICogc3BlY2lmeSB0aGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlciB0byBiZSBlaXRoZXJcbiAgICAgKiBQYXJhbWV0ZXJzLlBVQkxJU0hFUlNfTEFCRUwgb3IgUGFyYW1ldGVycy5QVUJMSVNIRVJTX1VSSSByZXNwZWN0aXZlbHkuXG4gICAgICogQHBhcmFtIHBhcmFtZXRlciAtIG9wdGlvbmFsLCB0byBpbmRpY2F0ZSB0aGUgcGFyYW1ldGVyIHRvIHVzZVxuICAgICAqIEByZXR1cm4gUXVlcnlcbiAgICAgKi9cbiAgICBwdWJsaXNoZXJzKHB1Ymxpc2hlcnM6c3RyaW5nfHN0cmluZ1tdLCBwYXJhbWV0ZXI/OnN0cmluZykgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0UHVibGlzaGVycyhwdWJsaXNoZXJzLCBwYXJhbWV0ZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IGEgUHVibGlzaGVyIG9yIHNldCBvZiBQdWJsaXNoZXJzIHRvIGNvbnN0cmFpbiByZXN1bHRzLiBCeVxuICAgICAqIGRlZmF1bHQsIHZhbHVlcyBhcmUgYXNzdW1lZCB0byBiZSBpZGVudGlmaWVycy4gSWYgdXNpbmcgbGFiZWxzIG9yIHVyaXMsXG4gICAgICogc3BlY2lmeSB0aGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlciB0byBiZSBlaXRoZXJcbiAgICAgKiBQYXJhbWV0ZXJzLlBVQkxJU0hFUlNfTEFCRUwgb3IgUGFyYW1ldGVycy5QVUJMSVNIRVJTX1VSSSByZXNwZWN0aXZlbHkuXG4gICAgICogQHBhcmFtIHB1Ymxpc2hlcnMgLSBwdWJsaXNoaW5nIG9yZ3MgdG8gY29uc3RyYWluIGJ5XG4gICAgICovXG4gICAgc2V0UHVibGlzaGVycyAocHVibGlzaGVyczpzdHJpbmd8c3RyaW5nW10sIHBhcmFtZXRlcj86c3RyaW5nKSB7XG5cbiAgICAgICAgLy9jbGVhciBleGlzdGluZ1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlBVQkxJU0hFUlNfSUQsIG51bGwpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlBVQkxJU0hFUlNfTEFCRUwsIG51bGwpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlBVQkxJU0hFUlNfVVJJLCBudWxsKTtcblxuICAgICAgICBsZXQgcGFyYW0gPSBwYXJhbWV0ZXIgfHwgUGFyYW1ldGVycy5QVUJMSVNIRVJTX0lEO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihwYXJhbSwgdG9BcnJheShwdWJsaXNoZXJzKSk7XG4gICAgfVxuXG4gICAgZ2V0UHVibGlzaGVycyAoKSA6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuUFVCTElTSEVSU19JRCkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuUFVCTElTSEVSU19MQUJFTCkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuUFVCTElTSEVSU19VUkkpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSBhIFBvaW50IG9mIENvbnRhY3Qgb3Igc2V0IG9mIENvbnRhY3RzIHRvIGNvbnN0cmFpbiByZXN1bHRzLiBCeVxuICAgICAqIGRlZmF1bHQsIHZhbHVlcyBhcmUgYXNzdW1lZCB0byBiZSBpZGVudGlmaWVycy4gSWYgdXNpbmdcbiAgICAgKiBsYWJlbHMgb3IgdXJpcywgc3BlY2lmeSB0aGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlciB0byBiZSBlaXRoZXJcbiAgICAgKiBQYXJhbWV0ZXJzLkNPTlRBQ1RTX0xBQkVMIG9yIFBhcmFtZXRlcnMuQ09OVEFDVFNfVVJJIHJlc3BlY3RpdmVseS5cbiAgICAgKiBAcGFyYW0gcGFyYW1ldGVyIC0gb3B0aW9uYWwsIHRvIGluZGljYXRlIHRoZSBwYXJhbWV0ZXIgdG8gdXNlXG4gICAgICogQHJldHVybiBRdWVyeVxuICAgICAqL1xuICAgIGNvbnRhY3RzKGNvbnRhY3RzOnN0cmluZ3xzdHJpbmdbXSwgcGFyYW1ldGVyPzpzdHJpbmcpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldENvbnRhY3RzKGNvbnRhY3RzLCBwYXJhbWV0ZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IGEgQ29udGFjdCBvciBzZXQgb2YgQ29udGFjdHMgdG8gY29uc3RyYWluIHJlc3VsdHMuIEJ5XG4gICAgICogZGVmYXVsdCwgdmFsdWVzIGFyZSBhc3N1bWVkIHRvIGJlIGlkZW50aWZpZXJzLiBJZiB1c2luZ1xuICAgICAqIGxhYmVscyBvciB1cmlzLCBzcGVjaWZ5IHRoZSBvcHRpb25hbCBzZWNvbmQgcGFyYW1ldGVyIHRvIGJlIGVpdGhlclxuICAgICAqIFBhcmFtZXRlcnMuQ09OVEFDVFNfTEFCRUwgb3IgUGFyYW1ldGVycy5DT05UQUNUU19VUkkgcmVzcGVjdGl2ZWx5LlxuICAgICAqIEBwYXJhbSBjb250YWN0cyAtIHB1Ymxpc2hpbmcgb3JncyB0byBjb25zdHJhaW4gYnlcbiAgICAgKi9cbiAgICBzZXRDb250YWN0cyAoY29udGFjdHM6c3RyaW5nfHN0cmluZ1tdLCBwYXJhbWV0ZXI/OnN0cmluZykge1xuXG4gICAgICAgIC8vY2xlYXIgZXhpc3RpbmdcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5DT05UQUNUU19JRCwgbnVsbCk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuQ09OVEFDVFNfTEFCRUwsIG51bGwpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkNPTlRBQ1RTX1VSSSwgbnVsbCk7XG5cbiAgICAgICAgbGV0IHBhcmFtID0gcGFyYW1ldGVyIHx8IFBhcmFtZXRlcnMuQ09OVEFDVFNfSUQ7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKHBhcmFtLCB0b0FycmF5KGNvbnRhY3RzKSk7XG4gICAgfVxuXG4gICAgZ2V0Q29udGFjdHMgKCkgOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkNPTlRBQ1RTX0lEKSB8fFxuICAgICAgICAgICAgdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5DT05UQUNUU19MQUJFTCkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuQ09OVEFDVFNfVVJJKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgdGhlIGlkZW50aWZpZXIgb2YgYW4gQWdlbnQgKENvbW11bml0eSwgR3JvdXAsIGV0YykgdGhhdFxuICAgICAqIHVzZXMgaXRlbXMgeW91IHdpc2ggdG8gZmluZCBpbiBzZWFyY2ggcmVzdWx0cy4gQnlcbiAgICAgKiBkZWZhdWx0LCB2YWx1ZXMgYXJlIGFzc3VtZWQgdG8gYmUgaWRlbnRpZmllcnMuIElmIHVzaW5nXG4gICAgICogbGFiZWxzIG9yIHVyaXMsIHNwZWNpZnkgdGhlIG9wdGlvbmFsIHNlY29uZCBwYXJhbWV0ZXJcbiAgICAgKiB0byBiZSBlaXRoZXIgUGFyYW1ldGVycy5VU0VEX0JZX0xBQkVMIG9yIFBhcmFtZXRlcnMuVVNFRF9CWV9VUklcbiAgICAgKiByZXNwZWN0aXZlbHkuXG4gICAgICogQHBhcmFtIHBhcmFtZXRlciAtIG9wdGlvbmFsLCB0byBpbmRpY2F0ZSB0aGUgcGFyYW1ldGVyIHRvIHVzZVxuICAgICAqIEByZXR1cm4gUXVlcnlcbiAgICAgKi9cbiAgICB1c2VkQnkoaWRzOnN0cmluZ3xzdHJpbmdbXSwgcGFyYW1ldGVyPzpzdHJpbmcpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldFVzZWRCeShpZHMsIHBhcmFtZXRlcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgdGhlIGlkZW50aWZpZXIgb2YgYW4gQWdlbnQgKENvbW11bml0eSwgR3JvdXAsIGV0YykgdGhhdFxuICAgICAqIHVzZXMgaXRlbXMgeW91IHdpc2ggdG8gZmluZCBpbiBzZWFyY2ggcmVzdWx0cy4gQnlcbiAgICAgKiBkZWZhdWx0LCB2YWx1ZXMgYXJlIGFzc3VtZWQgdG8gYmUgaWRlbnRpZmllcnMuIElmIHVzaW5nXG4gICAgICogbGFiZWxzIG9yIHVyaXMsIHNwZWNpZnkgdGhlIG9wdGlvbmFsIHNlY29uZCBwYXJhbWV0ZXJcbiAgICAgKiB0byBiZSBlaXRoZXIgUGFyYW1ldGVycy5VU0VEX0JZX0xBQkVMIG9yIFBhcmFtZXRlcnMuVVNFRF9CWV9VUklcbiAgICAgKiByZXNwZWN0aXZlbHkuXG4gICAgICogQHBhcmFtIGlkcyAtIHB1Ymxpc2hpbmcgb3JncyB0byBjb25zdHJhaW4gYnlcbiAgICAgKi9cbiAgICBzZXRVc2VkQnkgKGlkczpzdHJpbmd8c3RyaW5nW10sIHBhcmFtZXRlcj86c3RyaW5nKSB7XG5cbiAgICAgICAgLy9jbGVhciBleGlzdGluZ1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlVTRURfQllfSUQsIG51bGwpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlVTRURfQllfTEFCRUwsIG51bGwpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlVTRURfQllfVVJJLCBudWxsKTtcblxuICAgICAgICBsZXQgcGFyYW0gPSBwYXJhbWV0ZXIgfHwgUGFyYW1ldGVycy5VU0VEX0JZX0lEO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihwYXJhbSwgdG9BcnJheShpZHMpKTtcbiAgICB9XG5cbiAgICBnZXRVc2VkQnkgKCkgOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlVTRURfQllfSUQpIHx8XG4gICAgICAgICAgICB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlVTRURfQllfTEFCRUwpIHx8XG4gICAgICAgICAgICB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlVTRURfQllfVVJJKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgYSBDb25jZXB0IFNjaGVtZSBvciBzZXQgb2YgQ29uY2VwdCBTY2hlbWVzIHRvIGNvbnN0cmFpbiByZXN1bHRzLiBCeVxuICAgICAqIGRlZmF1bHQsIHZhbHVlcyBhcmUgYXNzdW1lZCB0byBiZSBpZGVudGlmaWVycy4gSWYgdXNpbmdcbiAgICAgKiBsYWJlbHMgb3IgdXJpcywgc3BlY2lmeSB0aGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlclxuICAgICAqIHRvIGJlIGVpdGhlciBQYXJhbWV0ZXJzLlNDSEVNRVNfTEFCRUwgb3IgUGFyYW1ldGVycy5TQ0hFTUVTX1VSSVxuICAgICAqIHJlc3BlY3RpdmVseS5cbiAgICAgKiBAcGFyYW0gc2NoZW1lcyAtIHNjaGVtZXMgdG8gY29uc3RyYWluIGJ5XG4gICAgICogQHBhcmFtIHBhcmFtZXRlciAtIG9wdGlvbmFsLCB0byBpbmRpY2F0ZSB0aGUgcGFyYW1ldGVyIHRvIHVzZVxuICAgICAqIEByZXR1cm4gUXVlcnlcbiAgICAgKi9cbiAgICBzY2hlbWVzKHNjaGVtZXM6c3RyaW5nfHN0cmluZ1tdLCBwYXJhbWV0ZXI/OnN0cmluZykgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0U2NoZW1lcyhzY2hlbWVzLCBwYXJhbWV0ZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IGEgQ29uY2VwdCBTY2hlbWUgb3Igc2V0IG9mIENvbmNlcHQgU2NoZW1lcyB0byBjb25zdHJhaW4gcmVzdWx0cy4gQnlcbiAgICAgKiBkZWZhdWx0LCB2YWx1ZXMgYXJlIGFzc3VtZWQgdG8gYmUgdGhlbWUgaWRlbnRpZmllcnMuIElmIHVzaW5nXG4gICAgICogdGhlbWUgbGFiZWxzIG9yIHRoZW1lIHVyaXMsIHNwZWNpZnkgdGhlIG9wdGlvbmFsIHNlY29uZCBwYXJhbWV0ZXJcbiAgICAgKiB0byBiZSBlaXRoZXIgUGFyYW1ldGVycy5TQ0hFTUVTX0xBQkVMIG9yIFBhcmFtZXRlcnMuU0NIRU1FU19VUklcbiAgICAgKiByZXNwZWN0aXZlbHkuXG4gICAgICogQHBhcmFtIHNjaGVtZXMgLSBzY2hlbWVzIHRvIGNvbnN0cmFpbiBieVxuICAgICAqIEBwYXJhbSBwYXJhbWV0ZXIgLSBvcHRpb25hbCwgdG8gaW5kaWNhdGUgdGhlIHBhcmFtZXRlciB0byB1c2VcbiAgICAgKi9cbiAgICBzZXRTY2hlbWVzIChzY2hlbWVzOnN0cmluZ3xzdHJpbmdbXSwgcGFyYW1ldGVyPzpzdHJpbmcpIHtcblxuICAgICAgICAvL2NsZWFyIGV4aXN0aW5nXG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuU0NIRU1FU19JRCwgbnVsbCk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuU0NIRU1FU19MQUJFTCwgbnVsbCk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuU0NIRU1FU19VUkksIG51bGwpO1xuXG4gICAgICAgIGxldCBwYXJhbSA9IHBhcmFtZXRlciB8fCBQYXJhbWV0ZXJzLlNDSEVNRVNfSUQ7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKHBhcmFtLCB0b0FycmF5KHNjaGVtZXMpKTtcbiAgICB9XG5cbiAgICBnZXRTY2hlbWVzKCkgOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlNDSEVNRVNfSUQpIHx8XG4gICAgICAgICAgICB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlNDSEVNRVNfTEFCRUwpIHx8XG4gICAgICAgICAgICB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlNDSEVNRVNfVVJJKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIHNlcnZpY2VUeXBlcyh0eXBlczpzdHJpbmd8c3RyaW5nW10pIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldFNlcnZpY2VUeXBlcyh0eXBlcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB0eXBlcyAtIGlkc1xuICAgICAqL1xuICAgIHNldFNlcnZpY2VUeXBlcyAodHlwZXM6c3RyaW5nfHN0cmluZ1tdKSB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuU0VSVklDRV9UWVBFUywgdG9BcnJheSh0eXBlcykpO1xuICAgIH1cblxuICAgIGdldFNlcnZpY2VUeXBlcyAoKSA6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuU0VSVklDRV9UWVBFUyk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICB2aXNpYmlsaXR5KHZpczpcInB1YmxpY1wifFwicHJpdmF0ZVwiKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRWaXNpYmlsaXR5KHZpcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB2aXNpYmlsaXR5IC0gb25lIG9mICdwdWJsaWMnIG9yICdwcml2YXRlJ1xuICAgICAqL1xuICAgIHNldFZpc2liaWxpdHkgKHZpc2liaWxpdHkgOiBcInB1YmxpY1wifFwicHJpdmF0ZVwiKSB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVklTSUJJTElUWSwgdmlzaWJpbGl0eSk7XG4gICAgfVxuXG4gICAgZ2V0VmlzaWJpbGl0eSAoKSA6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlZJU0lCSUxJVFkpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgc3RhdHVzKHZhbHVlIDogc3RyaW5nKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0dXModmFsdWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc3RhdHVzIC0gY3VycmVudCBzdGF0dXMgb2YgSXRlbVxuICAgICAqL1xuICAgIHNldFN0YXR1cyAodmFsdWUgOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5TVEFUVVMsIHZhbHVlKTtcbiAgICB9XG5cbiAgICBnZXRTdGF0dXMgKCkgOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5TVEFUVVMpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgZXh0ZW50KGJib3ggOiBhbnkpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldEV4dGVudChiYm94KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGJib3ggLSBzdHJpbmcgZm9ybSBvZiBcIm1pbngsbWlueSxtYXh4LG1heHlcIiwgb3IgTC5MYXRMbmdCb3VuZHMsIG9yIEFycmF5XG4gICAgICovXG4gICAgc2V0RXh0ZW50IChiYm94IDogYW55KSB7XG4gICAgICAgIGlmKGJib3gpIHtcbiAgICAgICAgICAgIGlmKHR5cGVvZihiYm94LnRvQmJveFN0cmluZykgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgLy9MZWFmbGV0IEJvdW5kcyBpbnN0YW5jZVxuICAgICAgICAgICAgICAgIGJib3ggPSBiYm94LnRvQmJveFN0cmluZygpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYodHlwZW9mKGJib3gucHVzaCkgIT09ICd1bmRlZmluZWQnICYmIGJib3gubGVuZ3RoICYmXG4gICAgICAgICAgICAgICAgLy9OZXN0ZWQgYXJyYXkgKGFsdGVybmF0ZSBMZWFmbGV0IHJlcHJlc2VudGF0aW9uKTpcbiAgICAgICAgICAgICAgICAvLyBbIFttaW5MYXQsbWluTG9uZ10sIFttYXhMYXQsbWF4TG9uZ10gXVxuICAgICAgICAgICAgICAgIHR5cGVvZihiYm94WzBdLnB1c2gpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGJib3ggPSBiYm94WzBdWzFdKycsJytiYm94WzBdWzBdKycsJytiYm94WzFdWzFdKycsJytiYm94WzFdWzBdO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYodHlwZW9mKGJib3gpID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGlmKCFCQk9YX1JFR0VYLnRlc3QoYmJveCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBhcmd1bWVudDogYmJveCBzdHJpbmcgbXVzdCBiZSBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBcImluIGZvcm0gb2YgJ21pbngsbWlueSxtYXh4LG1heHknXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBhcmd1bWVudDogYmJveCBtdXN0IGJlIG9uZSBvZiBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwiTGVhZmxldC5Cb3VuZHMsIG5lc3RlZCBhcnJheSwgb3IgYmJveCBzdHJpbmdcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5FWFRFTlQsIGJib3gpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4gYmJveCBzdHJpbmcgb3IgbnVsbCBpZiBub3Qgc2V0XG4gICAgICovXG4gICAgZ2V0RXh0ZW50ICgpIDogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuRVhURU5UKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIG1vZGlmaWVkKGRhdGUgOiBudW1iZXJ8RGF0ZSwgYmVmb3JlT3JBZnRlciA6IGJvb2xlYW4pIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldE1vZGlmaWVkKGRhdGUsIGJlZm9yZU9yQWZ0ZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZGF0ZSAtIGRhdGUgdG8gY29tcGFyZSBhZ2FpbnN0XG4gICAgICogQHBhcmFtIGJlZm9yZU9yQWZ0ZXIgLSBmbGFnIHNwZWNpZnlpbmcgd2hpY2ggYm91bmRhcnkgY29uZGl0aW9uICh0cnVlID0gYmVmb3JlLCBmYWxzZSA9IGFmdGVyKSBmbGFnIHNwZWNpZnlpbmcgd2hldGhlciB0byB0cmlnZ2VyIHVwZGF0ZSBhdXRvbWF0aWNhbGx5XG4gICAgICovXG4gICAgc2V0TW9kaWZpZWQgKGRhdGUgOiBudW1iZXJ8RGF0ZSwgYmVmb3JlT3JBZnRlcjpib29sZWFuKSB7XG5cbiAgICAgICAgLy9pZiBubyBkYXRlIHdhcyBzdXBwbGllZCwgY29uc2lkZXIgaXQgXCJ1bnNldFwiIGZvciBib3RoIHByb3BlcnRpZXNcbiAgICAgICAgaWYoIWRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuTU9ESUZJRURfQkVGT1JFLCBudWxsKTtcbiAgICAgICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuTU9ESUZJRURfQUZURVIsIG51bGwpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIShkYXRlIGluc3RhbmNlb2YgRGF0ZSkpXG4gICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoZGF0ZSBhcyBudW1iZXIpO1xuXG4gICAgICAgIGxldCBkaXIgPSBiZWZvcmVPckFmdGVyICYmIChiZWZvcmVPckFmdGVyID09PSB0cnVlIHx8IGJlZm9yZU9yQWZ0ZXIgPT09IFwidHJ1ZVwiKTtcbiAgICAgICAgbGV0IHByb3AgPSBkaXIgPyBQYXJhbWV0ZXJzLk1PRElGSUVEX0JFRk9SRSA6IFBhcmFtZXRlcnMuTU9ESUZJRURfQUZURVI7ICAgICAgIC8vcHJvcGVydHkgYmVpbmcgc2V0XG4gICAgICAgIGxldCBvcHBQcm9wID0gZGlyID8gUGFyYW1ldGVycy5NT0RJRklFRF9BRlRFUiA6IFBhcmFtZXRlcnMuTU9ESUZJRURfQkVGT1JFOyAgICAvL3Vuc2V0IG9wcG9zaXRlIHByb3BlcnR5XG4gICAgICAgIGxldCBhcmcgPSAoZGF0ZSAmJiBkYXRlLmdldFRpbWUpID8gZGF0ZS5nZXRUaW1lKCkgOiBkYXRlO1xuXG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKG9wcFByb3AsIG51bGwpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihwcm9wLCBhcmcpO1xuICAgIH1cblxuICAgIGdldE1vZGlmaWVkICgpIDogRGF0ZSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuTU9ESUZJRURfQkVGT1JFKSB8fFxuICAgICAgICAgICAgdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5NT0RJRklFRF9BRlRFUik7XG4gICAgICAgIGlmKHZhbHVlICYmIHR5cGVvZih2YWx1ZSkgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IG5ldyBEYXRlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICBjcmVhdGVkKGRhdGUgOiBudW1iZXJ8RGF0ZSwgYmVmb3JlT3JBZnRlcjpib29sZWFuKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRDcmVhdGVkKGRhdGUsIGJlZm9yZU9yQWZ0ZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZGF0ZSAtIGRhdGUgdG8gY29tcGFyZSBhZ2FpbnN0XG4gICAgICogQHBhcmFtIGJlZm9yZU9yQWZ0ZXIgLSBmbGFnIHNwZWNpZnlpbmcgd2hpY2ggYm91bmRhcnkgY29uZGl0aW9uICh0cnVlID0gYmVmb3JlLCBmYWxzZSA9IGFmdGVyKSBmbGFnIHNwZWNpZnlpbmcgd2hldGhlciB0byB0cmlnZ2VyIHVwZGF0ZSBhdXRvbWF0aWNhbGx5XG4gICAgICovXG4gICAgc2V0Q3JlYXRlZCAoZGF0ZSA6IG51bWJlcnxEYXRlLCBiZWZvcmVPckFmdGVyOmJvb2xlYW4pIHtcblxuICAgICAgICAvL2lmIG5vIGRhdGUgd2FzIHN1cHBsaWVkLCBjb25zaWRlciBpdCBcInVuc2V0XCIgZm9yIGJvdGggcHJvcGVydGllc1xuICAgICAgICBpZighZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5DUkVBVEVEX0JFRk9SRSwgbnVsbCk7XG4gICAgICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkNSRUFURURfQUZURVIsIG51bGwpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIShkYXRlIGluc3RhbmNlb2YgRGF0ZSkpXG4gICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoZGF0ZSBhcyBudW1iZXIpO1xuXG4gICAgICAgIGxldCBkaXIgPSBiZWZvcmVPckFmdGVyICYmIChiZWZvcmVPckFmdGVyID09PSB0cnVlIHx8IGJlZm9yZU9yQWZ0ZXIgPT09IFwidHJ1ZVwiKTtcbiAgICAgICAgbGV0IHByb3AgPSBkaXIgPyBQYXJhbWV0ZXJzLkNSRUFURURfQkVGT1JFIDogUGFyYW1ldGVycy5DUkVBVEVEX0FGVEVSOyAgICAgICAvL3Byb3BlcnR5IGJlaW5nIHNldFxuICAgICAgICBsZXQgb3BwUHJvcCA9IGRpciA/IFBhcmFtZXRlcnMuQ1JFQVRFRF9BRlRFUiA6IFBhcmFtZXRlcnMuQ1JFQVRFRF9CRUZPUkU7ICAgIC8vdW5zZXQgb3Bwb3NpdGUgcHJvcGVydHlcbiAgICAgICAgbGV0IGFyZyA9IChkYXRlICYmIGRhdGUuZ2V0VGltZSkgPyBkYXRlLmdldFRpbWUoKSA6IGRhdGU7XG5cbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIob3BwUHJvcCwgbnVsbCk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKHByb3AsIGFyZyk7XG4gICAgfVxuXG4gICAgZ2V0Q3JlYXRlZCAoKSA6IERhdGUge1xuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkNSRUFURURfQkVGT1JFKSB8fFxuICAgICAgICAgICAgdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5DUkVBVEVEX0FGVEVSKTtcbiAgICAgICAgaWYodmFsdWUgJiYgdHlwZW9mKHZhbHVlKSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHZhbHVlID0gbmV3IERhdGUodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIGJlZ2lucyhkYXRlIDogbnVtYmVyfERhdGUpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldEJlZ2luRGF0ZShkYXRlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0QmVnaW5EYXRlIChkYXRlIDogbnVtYmVyfERhdGUpIHtcbiAgICAgICAgaWYoZGF0ZSAmJiBkYXRlIGluc3RhbmNlb2YgRGF0ZSlcbiAgICAgICAgICAgIGRhdGUgPSBkYXRlLmdldFRpbWUoKTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5CRUdJTlMsIGRhdGUpO1xuICAgIH1cblxuICAgIGdldEJlZ2luRGF0ZSAoKSA6IERhdGUge1xuICAgICAgICBsZXQgZGF0ZSA9IHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuQkVHSU5TKTtcbiAgICAgICAgaWYoZGF0ZSkgZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIGVuZHMoZGF0ZSA6IG51bWJlcnxEYXRlKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRFbmREYXRlKGRhdGUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRFbmREYXRlIChkYXRlOiBudW1iZXJ8RGF0ZSkge1xuICAgICAgICBpZihkYXRlICYmIGRhdGUgaW5zdGFuY2VvZiBEYXRlKVxuICAgICAgICAgICAgZGF0ZSA9IGRhdGUuZ2V0VGltZSgpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkVORFMsIGRhdGUpO1xuICAgIH1cblxuICAgIGdldEVuZERhdGUgKCkgOiBEYXRlIHtcbiAgICAgICAgbGV0IGRhdGUgPSB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkVORFMpO1xuICAgICAgICBpZihkYXRlKSBkYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgYmV0d2VlbihiZWdpbiA6IG51bWJlcnxEYXRlLCBlbmQgOiBudW1iZXJ8RGF0ZSkgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0QmV0d2VlbihiZWdpbiwgZW5kKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0QmV0d2VlbihiZWdpbiA6IG51bWJlcnxEYXRlLCBlbmQgOiBudW1iZXJ8RGF0ZSkge1xuICAgICAgICB0aGlzLmJlZ2lucyhiZWdpbik7XG4gICAgICAgIHRoaXMuZW5kcyhlbmQpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgcmVzb3VyY2VUeXBlcyh0eXBlczogc3RyaW5nfHN0cmluZ1tdKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRSZXNvdXJjZVR5cGVzKHR5cGVzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0UmVzb3VyY2VUeXBlcyh0eXBlczogc3RyaW5nfHN0cmluZ1tdKSB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuUkVTT1VSQ0VfVFlQRSwgdG9BcnJheSh0eXBlcykpO1xuICAgIH1cblxuICAgIGdldFJlc291cmNlVHlwZXMoKSA6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuUkVTT1VSQ0VfVFlQRSk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICBmYWNldHMobmFtZXMgOiBzdHJpbmd8c3RyaW5nW10pIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldEZhY2V0cyhuYW1lcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogQHBhcmFtIG5hbWVzIC0gbmFtZXMgb2YgZmFjZXRzXG4gICAgICovXG4gICAgc2V0RmFjZXRzIChuYW1lczogc3RyaW5nfHN0cmluZ1tdKSB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuRkFDRVRTLCB0b0FycmF5KG5hbWVzKSk7XG4gICAgfVxuXG4gICAgZ2V0RmFjZXRzKCkgOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkZBQ0VUUyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG5hbWUgLSBuYW1lIG9mIGZhY2V0IHRvIGFkZFxuICAgICAqL1xuICAgIGFkZEZhY2V0KG5hbWU6IHN0cmluZykge1xuICAgICAgICBsZXQgZmFjZXRzID0gdGhpcy5nZXRGYWNldHMoKSB8fCBbXTtcbiAgICAgICAgZmFjZXRzLnB1c2gobmFtZSk7XG4gICAgICAgIHRoaXMuc2V0RmFjZXRzKGZhY2V0cyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG5hbWUgLSBuYW1lIG9mIGZhY2V0IHRvIHJlbW92ZVxuICAgICAqL1xuICAgIHJlbW92ZUZhY2V0KG5hbWU6IHN0cmluZykge1xuICAgICAgICBsZXQgZmFjZXRzID0gdGhpcy5nZXRGYWNldHMoKSB8fCBbXTtcbiAgICAgICAgbGV0IGlkeCA9IGZhY2V0cy5pbmRleE9mKG5hbWUpO1xuICAgICAgICBpZihpZHg+PTApIHtcbiAgICAgICAgICAgIGZhY2V0cy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgIHRoaXMuc2V0RmFjZXRzKGZhY2V0cyk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIGZpZWxkcyhmaWVsZHM6IHN0cmluZ3xzdHJpbmdbXSkgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0RmllbGRzKGZpZWxkcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBmaWVsZHMgLSBsaXN0IG9mIGZpZWxkIG5hbWVzIHRvIHJlcXVlc3QgZm9yIGVhY2ggc2VhcmNoIHJlc3VsdFxuICAgICAqL1xuICAgIHNldEZpZWxkcyAoZmllbGRzOiBzdHJpbmd8c3RyaW5nW10pIHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5GSUVMRFMsIHRvQXJyYXkoZmllbGRzKSk7XG4gICAgfVxuXG4gICAgZ2V0RmllbGRzKCkgOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkZJRUxEUyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGZpZWxkIC0gbmFtZSBvZiBmaWVsZCB0byByZW1vdmVcbiAgICAgKi9cbiAgICBhZGRGaWVsZChmaWVsZDogc3RyaW5nKSB7XG4gICAgICAgIGxldCBmaWVsZHMgPSB0aGlzLmdldEZpZWxkcygpIHx8IFtdO1xuICAgICAgICBmaWVsZHMucHVzaChmaWVsZCk7XG4gICAgICAgIHRoaXMuc2V0RmllbGRzKGZpZWxkcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGZpZWxkIC0gbmFtZSBvZiBmaWVsZCB0byByZW1vdmVcbiAgICAgKi9cbiAgICByZW1vdmVGaWVsZChmaWVsZDogc3RyaW5nKSB7XG4gICAgICAgIGxldCBmaWVsZHMgPSB0aGlzLmdldEZpZWxkcygpIHx8IFtdO1xuICAgICAgICBsZXQgaWR4ID0gZmllbGRzLmluZGV4T2YoZmllbGQpO1xuICAgICAgICBpZihpZHg+PTApIHtcbiAgICAgICAgICAgIGZpZWxkcy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgIHRoaXMuc2V0RmllbGRzKGZpZWxkcyk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHBhZ2UgLSBwYWdlIG9mIHJlc3VsdHMgdG8gZmV0Y2hcbiAgICAgKi9cbiAgICBwYWdlIChwYWdlOiBudW1iZXIpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldFBhZ2UocGFnZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldFBhZ2UocGFnZTogbnVtYmVyKSB7XG4gICAgICAgIGlmKGlzTmFOKHBhZ2UpIHx8IHBhZ2UqMTwwKSByZXR1cm47XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuUEFHRSwgcGFnZSoxKTtcbiAgICB9XG5cbiAgICBnZXRQYWdlKCkgOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5QQUdFKTtcbiAgICB9XG5cbiAgICBuZXh0UGFnZSgpIDogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0UGFnZSh0aGlzLmdldFBhZ2UoKSsxKTtcbiAgICB9XG5cbiAgICBwcmV2aW91c1BhZ2UoKSA6IHZvaWQge1xuICAgICAgICB0aGlzLnNldFBhZ2UodGhpcy5nZXRQYWdlKCktMSk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc2l6ZSAtIHBhZ2Ugc2l6ZSB0byByZXF1ZXN0XG4gICAgICovXG4gICAgcGFnZVNpemUgKHNpemU6IG51bWJlcikgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0UGFnZVNpemUoc2l6ZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldFBhZ2VTaXplIChzaXplOiBudW1iZXIpIHtcbiAgICAgICAgaWYoaXNOYU4oc2l6ZSkgfHwgc2l6ZSoxPDApIHJldHVybjtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5QQUdFX1NJWkUsIHNpemUqMSk7XG4gICAgfVxuXG4gICAgZ2V0UGFnZVNpemUoKSA6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlBBR0VfU0laRSk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc29ydCAtIGZvcm0gb2YgPGZpZWxkPiw8ZGlyPiBvciBqdXN0IGZpZWxkIG5hbWVcbiAgICAgKiBAcGFyYW0gb3JkZXIgLSBvcHRpb25hbCwgZWl0aGVyICdhc2MnIG9yICdkZXNjJ1xuICAgICAqL1xuICAgIHNvcnQgKHNvcnQ6IHN0cmluZywgb3JkZXI/OnN0cmluZykgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0U29ydChzb3J0LCBvcmRlcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBzb3J0IC0gZm9ybSBvZiA8ZmllbGQ+LDxkaXI+IG9yIGp1c3QgZmllbGQgbmFtZVxuICAgICAqIEBwYXJhbSBvcmRlciAtIG9wdGlvbmFsLCBlaXRoZXIgJ2FzYycgb3IgJ2Rlc2MnXG4gICAgICovXG4gICAgIHNldFNvcnQoc29ydDogc3RyaW5nLCBvcmRlcj86c3RyaW5nKSB7XG4gICAgICAgICBvcmRlciA9IG9yZGVyIHx8ICdkZXNjJztcbiAgICAgICAgIGlmKHNvcnQgJiYgc29ydC5pbmRleE9mKCcsJyk8MClcbiAgICAgICAgICAgIHNvcnQgPSBzb3J0ICsgJywnICsgb3JkZXI7XG4gICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlNPUlQsIHNvcnQpO1xuICAgIH1cblxuICAgIGdldFNvcnQoKSA6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlNPUlQpO1xuICAgIH1cblxuICAgIGdldFNvcnRGaWVsZCgpIDogc3RyaW5nIHwgbnVsbCB7XG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZ2V0U29ydCgpO1xuICAgICAgICByZXR1cm4gdmFsdWUgJiYgdmFsdWUubGVuZ3RoID8gdmFsdWUuc3BsaXQoJywnKVswXSA6IG51bGw7XG4gICAgfVxuXG4gICAgZ2V0U29ydE9yZGVyKCkgOiBzdHJpbmcgfCBudWxsIHtcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5nZXRTb3J0KCk7XG4gICAgICAgIHJldHVybiB2YWx1ZSAmJiB2YWx1ZS5sZW5ndGggPyB2YWx1ZS5zcGxpdCgnLCcpWzFdIDogbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIGxpc3Qgb2Yga2V5LXZhbHVlIHBhaXJzIG9mIHNvcnQgb3B0aW9uc1xuICAgICAqL1xuICAgIGdldFNvcnRPcHRpb25zKCkgOiB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IH1bXSB7XG4gICAgICAgIHJldHVybiBTT1JUX09QVElPTlNfREVGQVVMVC5zbGljZSgwKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgY2xlYXIgKCkge1xuICAgICAgICB0aGlzLnF1ZXJ5ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLmRlZmF1bHRRdWVyeSkpO1xuICAgIH1cbn1cblxuZXhwb3J0IHtcbiAgICBRdWVyeSBhcyBkZWZhdWx0LFxuICAgIFF1ZXJ5LFxuICAgIEZpZWxkcyxcbiAgICBGYWNldHNcbn07XG4iXX0=