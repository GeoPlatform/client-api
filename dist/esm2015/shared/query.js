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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50LyIsInNvdXJjZXMiOlsic2hhcmVkL3F1ZXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLFVBQVUsTUFBTSxjQUFjLENBQUM7QUFDdEMsT0FBTyxXQUFXLE1BQU0sZUFBZSxDQUFDOzs7Ozs7O0FBSXhDLE1BQU0sTUFBTSxHQUFpQjtJQUN6QixhQUFhLEVBQVMsUUFBUTtJQUM5QixnQkFBZ0IsRUFBTSxpQkFBaUI7SUFDdkMsV0FBVyxFQUFXLGFBQWE7SUFDbkMsV0FBVyxFQUFXLGFBQWE7SUFDbkMsY0FBYyxFQUFRLFFBQVE7SUFDOUIsUUFBUSxFQUFjLFVBQVU7SUFDaEMsT0FBTyxFQUFlLFNBQVM7SUFDL0IsVUFBVSxFQUFZLFdBQVc7SUFDakMsUUFBUSxFQUFjLFVBQVU7SUFDaEMsV0FBVyxFQUFXLGFBQWE7SUFDbkMsYUFBYSxFQUFTLGVBQWU7SUFDckMsTUFBTSxFQUFnQixRQUFRO0lBQzlCLGFBQWEsRUFBUyxPQUFPO0lBQzdCLElBQUksRUFBa0IsTUFBTTtJQUM1QixXQUFXLEVBQVcsYUFBYTtJQUNuQyxRQUFRLEVBQWMsVUFBVTtJQUNoQyxLQUFLLEVBQWlCLE9BQU87SUFDN0IsZ0JBQWdCLEVBQU0sZ0JBQWdCO0lBQ3RDLE1BQU0sRUFBZ0IsUUFBUTtJQUM5QixVQUFVLEVBQVksV0FBVztJQUNqQyxVQUFVLEVBQVksV0FBVztJQUNqQyxNQUFNLEVBQWdCLFFBQVE7SUFDOUIsUUFBUSxFQUFjLFVBQVU7SUFDaEMsWUFBWSxFQUFVLGFBQWE7SUFDbkMsVUFBVSxFQUFZLFlBQVk7SUFDbEMsY0FBYyxFQUFRLGVBQWU7SUFDckMsWUFBWSxFQUFVLGFBQWE7SUFDbkMsUUFBUSxFQUFjLFVBQVU7SUFDaEMsT0FBTyxFQUFlLFNBQVM7SUFDL0IsVUFBVSxFQUFZLFlBQVk7SUFDbEMsTUFBTSxFQUFnQixRQUFRO0lBQzlCLFVBQVUsRUFBWSxX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QUFJLE9BQU8sRUFDaEIsS0FBSyxFQUNMLE1BQU0sRUFDTixNQUFNLEVBQ1QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IFBhcmFtZXRlcnMgZnJvbSAnLi9wYXJhbWV0ZXJzJztcbmltcG9ydCBDbGFzc2lmaWVycyBmcm9tICcuL2NsYXNzaWZpZXJzJztcblxuaW50ZXJmYWNlIEtWUDxVPiB7IFsga2V5IDogc3RyaW5nIF0gOiBVIH1cblxuY29uc3QgRmllbGRzIDogS1ZQPHN0cmluZz4gPSB7XG4gICAgQUNDRVNTX1JJR0hUUyAgICAgICA6ICdyaWdodHMnLFxuICAgIEFMVEVSTkFURV9USVRMRVMgICAgOiAnYWx0ZXJuYXRlVGl0bGVzJyxcbiAgICBBTk5PVEFUSU9OUyAgICAgICAgIDogJ2Fubm90YXRpb25zJyxcbiAgICBDTEFTU0lGSUVSUyAgICAgICAgIDogJ2NsYXNzaWZpZXJzJyxcbiAgICBDT05DRVBUX1NDSEVNRSAgICAgIDogJ3NjaGVtZScsXG4gICAgQ09OVEFDVFMgICAgICAgICAgICA6ICdjb250YWN0cycsXG4gICAgQ1JFQVRFRCAgICAgICAgICAgICA6ICdjcmVhdGVkJyxcbiAgICBDUkVBVEVEX0JZICAgICAgICAgIDogJ2NyZWF0ZWRCeScsXG4gICAgREFUQVNFVFMgICAgICAgICAgICA6ICdkYXRhc2V0cycsXG4gICAgREVTQ1JJUFRJT04gICAgICAgICA6ICdkZXNjcmlwdGlvbicsXG4gICAgRElTVFJJQlVUSU9OUyAgICAgICA6ICdkaXN0cmlidXRpb25zJyxcbiAgICBFWFRFTlQgICAgICAgICAgICAgIDogJ2V4dGVudCcsXG4gICAgR0FMTEVSWV9JVEVNUyAgICAgICA6ICdpdGVtcycsXG4gICAgSFJFRiAgICAgICAgICAgICAgICA6ICdocmVmJyxcbiAgICBJREVOVElGSUVSUyAgICAgICAgIDogJ2lkZW50aWZpZXJzJyxcbiAgICBLRVlXT1JEUyAgICAgICAgICAgIDogJ2tleXdvcmRzJyxcbiAgICBMQUJFTCAgICAgICAgICAgICAgIDogJ2xhYmVsJyxcbiAgICBMQVNUX01PRElGSUVEX0JZICAgIDogJ2xhc3RNb2RpZmllZEJ5JyxcbiAgICBMQVlFUlMgICAgICAgICAgICAgIDogJ2xheWVycycsXG4gICAgTEFZRVJfVFlQRSAgICAgICAgICA6ICdsYXllclR5cGUnLFxuICAgIExBWUVSX05BTUUgICAgICAgICAgOiAnbGF5ZXJOYW1lJyxcbiAgICBMRUdFTkQgICAgICAgICAgICAgIDogJ2xlZ2VuZCcsXG4gICAgTU9ESUZJRUQgICAgICAgICAgICA6ICdtb2RpZmllZCcsXG4gICAgUEFSRU5UX0xBWUVSICAgICAgICA6ICdwYXJlbnRMYXllcicsXG4gICAgUFVCTElTSEVSUyAgICAgICAgICA6ICdwdWJsaXNoZXJzJyxcbiAgICBSRVNPVVJDRV9UWVBFUyAgICAgIDogJ3Jlc291cmNlVHlwZXMnLFxuICAgIFNFUlZJQ0VfVFlQRSAgICAgICAgOiAnc2VydmljZVR5cGUnLFxuICAgIFNFUlZJQ0VTICAgICAgICAgICAgOiAnc2VydmljZXMnLFxuICAgIFNQQVRJQUwgICAgICAgICAgICAgOiAnc3BhdGlhbCcsXG4gICAgU1RBVElTVElDUyAgICAgICAgICA6ICdzdGF0aXN0aWNzJyxcbiAgICBTVEFUVVMgICAgICAgICAgICAgIDogJ3N0YXR1cycsXG4gICAgU1VCX0xBWUVSUyAgICAgICAgICA6ICdzdWJMYXllcnMnLFxuICAgIFRFTVBPUkFMICAgICAgICAgICAgOiAndGVtcG9yYWwnLFxuICAgIFRIRU1FUyAgICAgICAgICAgICAgOiAndGhlbWVzJyxcbiAgICBUSFVNQk5BSUwgICAgICAgICAgIDogJ3RodW1ibmFpbCcsXG4gICAgVE9QSUNTICAgICAgICAgICAgICA6ICd0b3BpY3MnLFxuICAgIFVTRURfQlkgICAgICAgICAgICAgOiAndXNlZEJ5JyxcbiAgICBWSVNJQklMSVRZICAgICAgICAgIDogJ3Zpc2liaWxpdHknLFxuICAgIExBTkRJTkdfUEFHRSAgICAgICAgOiAnbGFuZGluZ1BhZ2UnXG59O1xuXG5jb25zdCBGSUVMRFNfREVGQVVMVCA6IHN0cmluZ1tdID0gW1xuICAgIEZpZWxkcy5DUkVBVEVELCBGaWVsZHMuTU9ESUZJRUQsIEZpZWxkcy5DUkVBVEVEX0JZLFxuICAgIEZpZWxkcy5QVUJMSVNIRVJTLCBGaWVsZHMuVEhFTUVTLCBGaWVsZHMuREVTQ1JJUFRJT05cbl07XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5jb25zdCBGYWNldHMgOiBLVlA8c3RyaW5nPiA9IHtcbiAgICBBTFRFUk5BVEVfVElUTEVTICAgIDogJ2FsdGVybmF0ZVRpdGxlcycsXG4gICAgQ09OQ0VQVF9TQ0hFTUVTICAgICA6ICdzY2hlbWVzJyxcbiAgICBDUkVBVEVEX0JZICAgICAgICAgIDogJ2NyZWF0ZWRCeScsXG4gICAgSFJFRiAgICAgICAgICAgICAgICA6ICdocmVmJyxcbiAgICBJREVOVElGSUVSUyAgICAgICAgIDogXCJpZGVudGlmaWVyc1wiLFxuICAgIExBWUVSX1RZUEUgICAgICAgICAgOiAnbGF5ZXJUeXBlJyxcbiAgICBMQVlFUl9OQU1FICAgICAgICAgIDogJ2xheWVyTmFtZScsXG4gICAgTElLRVMgICAgICAgICAgICAgICA6ICdsaWtlcycsXG4gICAgT05MSU5FICAgICAgICAgICAgICA6ICdvbmxpbmUnLFxuICAgIFBVQkxJU0hFUlMgICAgICAgICAgOiAncHVibGlzaGVycycsXG4gICAgQ09OVEFDVFMgICAgICAgICAgICA6ICdjb250YWN0cycsXG4gICAgUkVMSUFCSUxJVFkgICAgICAgICA6ICdyZWxpYWJpbGl0eScsXG4gICAgU0VSVklDRV9UWVBFUyAgICAgICA6ICdzZXJ2aWNlVHlwZXMnLFxuICAgIFNQRUVEICAgICAgICAgICAgICAgOiAnc3BlZWQnLFxuICAgIFNUQVRVUyAgICAgICAgICAgICAgOiAnc3RhdHVzJyxcbiAgICBUSEVNRVMgICAgICAgICAgICAgIDogJ3RoZW1lcycsXG4gICAgVE9QSUNTICAgICAgICAgICAgICA6ICd0b3BpY3MnLFxuICAgIFRZUEVTICAgICAgICAgICAgICAgOiAndHlwZScsICAgLy9UT0RPIGNoYW5nZSB0byAndHlwZXMnXG4gICAgVVNFRF9CWSAgICAgICAgICAgICA6ICd1c2VkQnknLFxuICAgIFZJRVdTICAgICAgICAgICAgICAgOiAndmlld3MnLFxuICAgIFZJU0lCSUxJVFkgICAgICAgICAgOiAndmlzaWJpbGl0eSdcbn07XG5cbmNvbnN0IEZBQ0VUU19ERUZBVUxUIDogc3RyaW5nW10gPSBbXG4gICAgRmFjZXRzLlRZUEVTLFxuICAgIEZhY2V0cy5QVUJMSVNIRVJTLFxuICAgIEZhY2V0cy5TRVJWSUNFX1RZUEVTLFxuICAgIEZhY2V0cy5DT05DRVBUX1NDSEVNRVMsXG4gICAgRmFjZXRzLlZJU0lCSUxJVFksXG4gICAgRmFjZXRzLkNSRUFURURfQllcbl07XG5cblxuLypcbiAgICBNYXAgZmFjZXQga2V5cyB0byBwYXJhbWV0ZXJzIHNvIGNsaWVudHMgY2FuIHNldFxuICAgIHF1ZXJ5IHBhcmFtcyB1c2luZyBmYWNldGVkIHJlc3VsdHNcblxuICAgIC8vVE9ETyByZW1vdmUgdGhlc2UgYW5kIHRoZWlyIGZ1bmN0aW9uIGJlbG93XG4gKi9cbmNvbnN0IEZhY2V0VG9QYXJhbSA6IEtWUDxzdHJpbmc+ID0ge307XG5GYWNldFRvUGFyYW1bRmFjZXRzLlRZUEVTXSAgICAgICAgICAgPSBQYXJhbWV0ZXJzLlRZUEVTO1xuRmFjZXRUb1BhcmFtW0ZhY2V0cy5USEVNRVNdICAgICAgICAgID0gUGFyYW1ldGVycy5USEVNRVNfSUQ7XG5GYWNldFRvUGFyYW1bRmFjZXRzLlRPUElDU10gICAgICAgICAgPSBQYXJhbWV0ZXJzLlRPUElDU19JRDtcbkZhY2V0VG9QYXJhbVtGYWNldHMuUFVCTElTSEVSU10gICAgICA9IFBhcmFtZXRlcnMuUFVCTElTSEVSU19JRDtcbkZhY2V0VG9QYXJhbVtGYWNldHMuQ09OVEFDVFNdICAgICAgICA9IFBhcmFtZXRlcnMuQ09OVEFDVFNfSUQ7XG5GYWNldFRvUGFyYW1bRmFjZXRzLkNPTkNFUFRfU0NIRU1FU10gPSBQYXJhbWV0ZXJzLlNDSEVNRVNfSUQ7XG5GYWNldFRvUGFyYW1bRmFjZXRzLlVTRURfQlldICAgICAgICAgPSBQYXJhbWV0ZXJzLlVTRURfQllfSUQ7XG5cblxuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXG5jb25zdCBTT1JUX09QVElPTlNfREVGQVVMVCA6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgfVtdID0gW1xuICAgIHsgdmFsdWU6XCJsYWJlbCxhc2NcIiwgICAgICAgbGFiZWw6IFwiTmFtZSAoQS1aKVwiICAgICAgICAgICAgICB9LFxuICAgIHsgdmFsdWU6XCJsYWJlbCxkZXNjXCIsICAgICAgbGFiZWw6IFwiTmFtZSAoWi1BKVwiICAgICAgICAgICAgICB9LFxuICAgIHsgdmFsdWU6XCJ0eXBlLGFzY1wiLCAgICAgICAgbGFiZWw6IFwiVHlwZSAoQS1aKVwiICAgICAgICAgICAgICB9LFxuICAgIHsgdmFsdWU6XCJ0eXBlLGRlc2NcIiwgICAgICAgbGFiZWw6IFwiVHlwZSAoWi1BKVwiICAgICAgICAgICAgICB9LFxuICAgIHsgdmFsdWU6XCJtb2RpZmllZCxkZXNjXCIsICAgbGFiZWw6IFwiTW9zdCByZWNlbnRseSBtb2RpZmllZFwiICB9LFxuICAgIHsgdmFsdWU6XCJtb2RpZmllZCxhc2NcIiwgICAgbGFiZWw6IFwiTGVhc3QgcmVjZW50bHkgbW9kaWZpZWRcIiB9LFxuICAgIHsgdmFsdWU6XCJfc2NvcmUsZGVzY1wiLCAgICAgbGFiZWw6IFwiUmVsZXZhbmNlXCIgICAgICAgICAgICAgICB9XG5dO1xuXG5cbmNvbnN0IEJCT1hfUkVHRVggPSAvXlxcLT9cXGQrKFxcLlxcZCopPyxcXC0/XFxkKyhcXC5cXGQqKT8sXFwtP1xcZCsoXFwuXFxkKik/LFxcLT9cXGQrKFxcLlxcZCopPyQvO1xuXG5cbmZ1bmN0aW9uIHRvQXJyYXkodmFsdWUgOiBhbnkpIDogYW55IHwgbnVsbCB7XG4gICAgbGV0IHJlc3VsdCA9IHZhbHVlO1xuICAgIC8vaWYgZ2l2ZW4gYSBub24tYXJyYXkgdmFsdWUsIHdyYXAgaW4gYXJyYXlcbiAgICBpZihyZXN1bHQgIT09IG51bGwgJiYgdHlwZW9mKHJlc3VsdC5wdXNoKSA9PT0gJ3VuZGVmaW5lZCcpIHJlc3VsdCA9IFtyZXN1bHRdO1xuICAgIC8vaWYgYXJyYXkgdmFsdWUgaXMgZW1wdHksIG51bGxpZnkgdGhlIHJlc3VsdFxuICAgIGlmKHJlc3VsdCAhPT0gbnVsbCAmJiAhcmVzdWx0Lmxlbmd0aCkgcmVzdWx0ID0gbnVsbDtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqXG4gKiBRdWVyeVxuICpcbiAqIFNwZWNpZnkgdGhlIFwiZGVmYXVsdFwiIHF1ZXJ5IGNvbnN0cmFpbnRzIHRvIHVzZSBieSBwYXNzaW5nIGluICdvcHRpb25zLmRlZmF1bHRzID0gey4uLn0nO1xuICpcbiAqL1xuY2xhc3MgUXVlcnkge1xuXG4gICAgcHVibGljIHF1ZXJ5IDogS1ZQPGFueT47XG4gICAgcHJpdmF0ZSBkZWZhdWx0UXVlcnkgOiBLVlA8YW55PjtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gc2V0IG9mIGluaXRpYWwgY29uc3RyYWludHNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID86IEtWUDxhbnk+KSB7XG4gICAgICAgIHRoaXMuZGVmYXVsdFF1ZXJ5ID0geyB9O1xuICAgICAgICB0aGlzLmRlZmF1bHRRdWVyeVtQYXJhbWV0ZXJzLlBBR0UudG9TdHJpbmcoKV0gPSAwO1xuICAgICAgICB0aGlzLmRlZmF1bHRRdWVyeVtQYXJhbWV0ZXJzLlBBR0VfU0laRS50b1N0cmluZygpXSA9IDEwO1xuICAgICAgICB0aGlzLmRlZmF1bHRRdWVyeVtQYXJhbWV0ZXJzLlNPUlQudG9TdHJpbmcoKV0gPSBcIm1vZGlmaWVkLGRlc2NcIjtcbiAgICAgICAgdGhpcy5kZWZhdWx0UXVlcnlbUGFyYW1ldGVycy5GSUVMRFMudG9TdHJpbmcoKV0gPSBGSUVMRFNfREVGQVVMVC5zbGljZSgwKTtcbiAgICAgICAgdGhpcy5kZWZhdWx0UXVlcnlbUGFyYW1ldGVycy5GQUNFVFMudG9TdHJpbmcoKV0gPSBGQUNFVFNfREVGQVVMVC5zbGljZSgwKTtcbiAgICAgICAgaWYob3B0aW9ucyAmJiBvcHRpb25zLmRlZmF1bHRzKSB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuZGVmYXVsdFF1ZXJ5LCBvcHRpb25zLmRlZmF1bHRzKTtcbiAgICAgICAgICAgIGRlbGV0ZSBvcHRpb25zLmRlZmF1bHRzO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucXVlcnkgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMuZGVmYXVsdFF1ZXJ5KSk7XG4gICAgICAgIGlmKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlQYXJhbWV0ZXJzKG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIGNvbnRhaW5pbmcgcmVxdWVzdC1yZWFkeSBwYXJhbWV0ZXJzL3ZhbHVlc1xuICAgICAqL1xuICAgIGdldFF1ZXJ5KCkgOiBLVlA8YW55PiB7XG4gICAgICAgIGxldCByZXN1bHQgOiBLVlA8YW55PiA9IHt9O1xuICAgICAgICBmb3IobGV0IHByb3AgaW4gdGhpcy5xdWVyeSkge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5xdWVyeVtwcm9wXTtcbiAgICAgICAgICAgIGlmKHZhbHVlICE9PSBudWxsICYmIHR5cGVvZih2YWx1ZS5wdXNoKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLmpvaW4oJywnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdFtwcm9wXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiBRdWVyeVxuICAgICAqL1xuICAgIGNsb25lKCkgOiBRdWVyeSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBuZXcgUXVlcnkoKTtcbiAgICAgICAgbGV0IGpzb24gPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMucXVlcnkpKTtcbiAgICAgICAgcmVzdWx0LmFwcGx5UGFyYW1ldGVycyhqc29uKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbmFtZVxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEByZXR1cm4gUXVlcnkgdGhpc1xuICAgICAqL1xuICAgIHBhcmFtZXRlcihuYW1lIDogc3RyaW5nLCB2YWx1ZSA6IGFueSkgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKG5hbWUsIHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG5hbWVcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKi9cbiAgICBzZXRQYXJhbWV0ZXIgKG5hbWUgOiBzdHJpbmcsIHZhbHVlOiBhbnkpIDogdm9pZCB7XG4gICAgICAgIGlmKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgLy9pZiBubyB2YWx1ZSB3YXMgcHJvdmlkZVxuICAgICAgICAgICAgKHR5cGVvZih2YWx1ZS5wdXNoKSAhPT0gJ3VuZGVmaW5lZCcgJiYgIXZhbHVlLmxlbmd0aCkpIC8vb3IgZW1wdHkgYXJyYXlcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnF1ZXJ5W25hbWVdO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLnF1ZXJ5W25hbWVdID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGtleSAtIG5hbWUgb2YgcGFyYW1ldGVyXG4gICAgICogQHJldHVybiB2YWx1ZSBvZiBwYXJhbWV0ZXJcbiAgICAgKi9cbiAgICBnZXRQYXJhbWV0ZXIgKGtleSA6IHN0cmluZykgOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5xdWVyeVtrZXldO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBuYW1lIC0gbmFtZSBvZiBwYXJhbWV0ZXIgdG8gcmVtb3ZlIGV4aXN0aW5nIHZhbHVlIGZvclxuICAgICAqL1xuICAgIGNsZWFyUGFyYW1ldGVyKG5hbWUgOiBzdHJpbmcpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMucXVlcnlbbmFtZV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG9iaiAtIHNldCBvZiBwYXJhbWV0ZXIvdmFsdWVzIHRvIGFwcGx5IHRvIHRoaXMgcXVlcnlcbiAgICAgKi9cbiAgICBhcHBseVBhcmFtZXRlcnMgKG9iaiA6IEtWUDxhbnk+KSA6IHZvaWQge8KgXG4gICAgICAgIGZvcihsZXQgcCBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmKG9iai5oYXNPd25Qcm9wZXJ0eShwKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKHAgYXMgc3RyaW5nLCBvYmpbcF0gYXMgYW55KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBmYWNldCAtIG5hbWUgb2YgZmFjZXQgdG8gc2V0IHRoZSB2YWx1ZSBmb3IgYXMgYSBwYXJhbWV0ZXJcbiAgICAgKiBAcGFyYW0gdmFsdWUgLSB2YWx1ZSBvZiB0aGUgZmFjZXQgdG8gdXNlIGFzIHRoZSBwYXJhbWV0ZXIncyB2YWx1ZVxuICAgICAqL1xuICAgICAvL1RPRE8gcmVtb3ZlIHRoaXMgZnVuY3Rpb25cbiAgICBzZXRGYWNldFBhcmFtZXRlciAoZmFjZXQ6IHN0cmluZywgdmFsdWU6IHN0cmluZykgOiB2b2lkIHtcbiAgICAgICAgbGV0IHBhcmFtIDogc3RyaW5nID0gRmFjZXRUb1BhcmFtW2ZhY2V0XTtcbiAgICAgICAgaWYoIXBhcmFtKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIldBUk4gOiBRdWVyeS5hcHBseUZhY2V0UGFyYW1ldGVyKCkgLSBcIiArXG4gICAgICAgICAgICAgICAgXCJ1bmFibGUgdG8gbWFwIGZhY2V0IHRvIGtub3duIHBhcmFtZXRlciAnXCIgKyBmYWNldCArIFwiJywgdXNpbmcgXCIgK1xuICAgICAgICAgICAgICAgIFwiYXMgZGlyZWN0IHBhcmFtZXRlciB3aGljaCBtYXkgbm90IG9wZXJhdGUgYXMgaW50ZW5kZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIocGFyYW18fGZhY2V0LCB2YWx1ZSk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHRleHRcbiAgICAgKiBAcmV0dXJuIFF1ZXJ5IHRoaXNcbiAgICAgKi9cbiAgICBxKHRleHQgOiBzdHJpbmcpIDogUXVlcnkgeyB0aGlzLnNldFEodGV4dCk7IHJldHVybiB0aGlzOyB9XG5cbiAgICAvKiogQHBhcmFtIHRleHQgLSBmcmVlIHRleHQgcXVlcnkgKi9cbiAgICBzZXRRICh0ZXh0IDogc3RyaW5nKSA6IHZvaWQgeyB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlFVRVJZLCB0ZXh0KTsgfVxuICAgIC8qKiBAcmV0dXJuICovXG4gICAgZ2V0USgpIDogc3RyaW5nIHsgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuUVVFUlkpIGFzIHN0cmluZzsgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICBrZXl3b3Jkcyh0ZXh0IDogc3RyaW5nfHN0cmluZ1tdKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRLZXl3b3Jkcyh0ZXh0KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHRleHQgLSBmcmVlIHRleHQgcXVlcnlcbiAgICAgKi9cbiAgICBzZXRLZXl3b3JkcyAodGV4dCA6IHN0cmluZ3xzdHJpbmdbXSkgOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5LRVlXT1JEUywgdG9BcnJheSh0ZXh0KSk7XG4gICAgfVxuXG4gICAgZ2V0S2V5d29yZHMoKSA6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuS0VZV09SRFMpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgdXJpICh1cmkgOiBzdHJpbmcpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldFVyaSh1cmkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRVcmkodXJpIDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVVJJLCB1cmkpO1xuICAgIH1cblxuICAgIGdldFVyaSgpIDogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVVJJKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIHR5cGVzKHR5cGVzIDogc3RyaW5nfHN0cmluZ1tdKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRUeXBlcyh0eXBlcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB0eXBlcyAtIG5hbWUgb2YgY2xhc3MoZXMpIHRvIHJlcXVlc3RcbiAgICAgKi9cbiAgICBzZXRUeXBlcyAodHlwZXMgOiBzdHJpbmd8c3RyaW5nW10pIHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5UWVBFUywgdG9BcnJheSh0eXBlcykpO1xuICAgIH1cblxuICAgIGdldFR5cGVzICgpIDogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5UWVBFUyk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICBjcmVhdGVkQnkodXNlciA6IHN0cmluZykgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0Q3JlYXRlZEJ5KHVzZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKiogQHBhcmFtIHVzZXIgLSB1c2VybmFtZSAqL1xuICAgIHNldENyZWF0ZWRCeSAodXNlciA6IHN0cmluZykge1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkNSRUFURURfQlksIHVzZXIpO1xuICAgIH1cblxuICAgIC8qKiBAcmV0dXJuIHVzZXJuYW1lICovXG4gICAgZ2V0Q3JlYXRlZEJ5ICgpIDogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuQ1JFQVRFRF9CWSk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICBsYXN0TW9kaWZpZWRCeSh1c2VyIDogc3RyaW5nKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRMYXN0TW9kaWZpZWRCeSh1c2VyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqIEBwYXJhbSB1c2VyIC0gdXNlcm5hbWUgKi9cbiAgICBzZXRMYXN0TW9kaWZpZWRCeSAodXNlcjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuTEFTVF9NT0RJRklFRF9CWSwgdXNlcik7XG4gICAgfVxuXG4gICAgLyoqIEByZXR1cm4gdXNlcm5hbWUgKi9cbiAgICBnZXRMYXN0TW9kaWZpZWRCeSAoKSA6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkxBU1RfTU9ESUZJRURfQlkpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSBhIFRoZW1lIG9yIHNldCBvZiBUaGVtZXMgdG8gY29uc3RyYWluIHJlc3VsdHMuIEJ5XG4gICAgICogZGVmYXVsdCwgdmFsdWVzIGFyZSBhc3N1bWVkIHRvIGJlIHRoZW1lIGlkZW50aWZpZXJzLiBJZiB1c2luZ1xuICAgICAqIHRoZW1lIGxhYmVscyBvciB0aGVtZSB1cmlzLCBzcGVjaWZ5IHRoZSBvcHRpb25hbCBzZWNvbmQgcGFyYW1ldGVyXG4gICAgICogdG8gYmUgZWl0aGVyIFBhcmFtZXRlcnMuVEhFTUVTX0xBQkVMIG9yIFBhcmFtZXRlcnMuVEhFTUVTX1VSSVxuICAgICAqIHJlc3BlY3RpdmVseS5cbiAgICAgKiBAcGFyYW0gdGhlbWVzIC0gc3RyaW5nIG9yIGFycmF5IG9mIHN0cmluZ3MgY29udGFpbmluZyB0aGVtZSBjb25zdHJhaW50XG4gICAgICogQHBhcmFtIHBhcmFtZXRlciAtIG9wdGlvbmFsLCB0byBpbmRpY2F0ZSB0aGUgcGFyYW1ldGVyIHRvIHVzZVxuICAgICAqIEByZXR1cm4gUXVlcnlcbiAgICAgKi9cbiAgICB0aGVtZXModGhlbWVzOiBzdHJpbmd8c3RyaW5nW10sIHBhcmFtZXRlcj86c3RyaW5nKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRUaGVtZXModGhlbWVzLCBwYXJhbWV0ZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgYSBUaGVtZSBvciBzZXQgb2YgVGhlbWVzIHRvIGNvbnN0cmFpbiByZXN1bHRzLiBCeVxuICAgICAqIGRlZmF1bHQsIHZhbHVlcyBhcmUgYXNzdW1lZCB0byBiZSB0aGVtZSBpZGVudGlmaWVycy4gSWYgdXNpbmdcbiAgICAgKiB0aGVtZSBsYWJlbHMgb3IgdGhlbWUgdXJpcywgc3BlY2lmeSB0aGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlclxuICAgICAqIHRvIGJlIGVpdGhlciBQYXJhbWV0ZXJzLlRIRU1FU19MQUJFTCBvciBQYXJhbWV0ZXJzLlRIRU1FU19VUklcbiAgICAgKiByZXNwZWN0aXZlbHkuXG4gICAgICogQHBhcmFtIHRoZW1lcyAtIHRoZW1lIG9yIHRoZW1lcyB0byBjb25zdHJhaW4gYnlcbiAgICAgKi9cbiAgICBzZXRUaGVtZXMgKHRoZW1lczpzdHJpbmd8c3RyaW5nW10sIHBhcmFtZXRlcj86c3RyaW5nKSB7XG5cbiAgICAgICAgLy9jbGVhciBleGlzdGluZ1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlRIRU1FU19JRCwgbnVsbCk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVEhFTUVTX0xBQkVMLCBudWxsKTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5USEVNRVNfVVJJLCBudWxsKTtcblxuICAgICAgICBsZXQgcGFyYW0gPSBwYXJhbWV0ZXIgfHwgUGFyYW1ldGVycy5USEVNRVNfSUQ7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKHBhcmFtLCB0b0FycmF5KHRoZW1lcykpO1xuICAgIH1cblxuICAgIGdldFRoZW1lcyAoKSA6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVEhFTUVTX0lEKSB8fFxuICAgICAgICAgICAgdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5USEVNRVNfTEFCRUwpIHx8XG4gICAgICAgICAgICB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlRIRU1FU19VUkkpO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgYSBUb3BpYyBvciBzZXQgb2YgVG9waWNzIHRvIGNvbnN0cmFpbiByZXN1bHRzLiBCeVxuICAgICAqIGRlZmF1bHQsIHZhbHVlcyBhcmUgYXNzdW1lZCB0byBiZSB0aGVtZSBpZGVudGlmaWVycy4gSWYgdXNpbmdcbiAgICAgKiB0aGVtZSBsYWJlbHMgb3IgdGhlbWUgdXJpcywgc3BlY2lmeSB0aGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlclxuICAgICAqIHRvIGJlIGVpdGhlciBQYXJhbWV0ZXJzLlRPUElDX0xBQkVMIG9yIFBhcmFtZXRlcnMuVE9QSUNfVVJJXG4gICAgICogcmVzcGVjdGl2ZWx5LlxuICAgICAqIEBwYXJhbSAgdG9waWNzIC0gc3RyaW5nIG9yIGFycmF5IG9mIHN0cmluZ3MgY29udGFpbmluZyB0aGVtZSBjb25zdHJhaW50XG4gICAgICogQHBhcmFtICBwYXJhbWV0ZXIgLSBvcHRpb25hbCwgdG8gaW5kaWNhdGUgdGhlIHBhcmFtZXRlciB0byB1c2VcbiAgICAgKiBAcmV0dXJuIFF1ZXJ5IGluc3RhbmNlXG4gICAgICovXG4gICAgdG9waWNzKHRvcGljczpzdHJpbmd8c3RyaW5nW10sIHBhcmFtZXRlciA/OiBzdHJpbmcpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldFRvcGljcyh0b3BpY3MsIHBhcmFtZXRlcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSBhIFRvcGljIG9yIHNldCBvZiBUb3BpY3MgdG8gY29uc3RyYWluIHJlc3VsdHMuIEJ5XG4gICAgICogZGVmYXVsdCwgdmFsdWVzIGFyZSBhc3N1bWVkIHRvIGJlIHRoZW1lIGlkZW50aWZpZXJzLiBJZiB1c2luZ1xuICAgICAqIHRoZW1lIGxhYmVscyBvciB0aGVtZSB1cmlzLCBzcGVjaWZ5IHRoZSBvcHRpb25hbCBzZWNvbmQgcGFyYW1ldGVyXG4gICAgICogdG8gYmUgZWl0aGVyIFBhcmFtZXRlcnMuVE9QSUNfTEFCRUwgb3IgUGFyYW1ldGVycy5UT1BJQ19VUklcbiAgICAgKiByZXNwZWN0aXZlbHkuXG4gICAgICogQHBhcmFtIHRvcGljcyAtIHRoZW1lIG9yIHRvcGljcyB0byBjb25zdHJhaW4gYnlcbiAgICAgKi9cbiAgICBzZXRUb3BpY3MgKHRvcGljczpzdHJpbmd8c3RyaW5nW10sIHBhcmFtZXRlciA/OiBzdHJpbmcpIHtcblxuICAgICAgICAvL2NsZWFyIGV4aXN0aW5nXG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVE9QSUNTX0lELCBudWxsKTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5UT1BJQ1NfTEFCRUwsIG51bGwpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlRPUElDU19VUkksIG51bGwpO1xuXG4gICAgICAgIGxldCBwYXJhbSA9IHBhcmFtZXRlciB8fCBQYXJhbWV0ZXJzLlRPUElDU19JRDtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIocGFyYW0sIHRvQXJyYXkodG9waWNzKSk7XG4gICAgfVxuXG4gICAgZ2V0VG9waWNzICgpIDogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5UT1BJQ1NfSUQpIHx8XG4gICAgICAgICAgICB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlRPUElDU19MQUJFTCkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVE9QSUNTX1VSSSk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IGEgUHVibGlzaGVyIG9yIHNldCBvZiBQdWJsaXNoZXJzIHRvIGNvbnN0cmFpbiByZXN1bHRzLiBCeVxuICAgICAqIGRlZmF1bHQsIHZhbHVlcyBhcmUgYXNzdW1lZCB0byBiZSBpZGVudGlmaWVycy4gSWYgdXNpbmcgbGFiZWxzIG9yIHVyaXMsXG4gICAgICogc3BlY2lmeSB0aGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlciB0byBiZSBlaXRoZXJcbiAgICAgKiBQYXJhbWV0ZXJzLlBVQkxJU0hFUlNfTEFCRUwgb3IgUGFyYW1ldGVycy5QVUJMSVNIRVJTX1VSSSByZXNwZWN0aXZlbHkuXG4gICAgICogQHBhcmFtIHBhcmFtZXRlciAtIG9wdGlvbmFsLCB0byBpbmRpY2F0ZSB0aGUgcGFyYW1ldGVyIHRvIHVzZVxuICAgICAqIEByZXR1cm4gUXVlcnlcbiAgICAgKi9cbiAgICBwdWJsaXNoZXJzKHB1Ymxpc2hlcnM6c3RyaW5nfHN0cmluZ1tdLCBwYXJhbWV0ZXI/OnN0cmluZykgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0UHVibGlzaGVycyhwdWJsaXNoZXJzLCBwYXJhbWV0ZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IGEgUHVibGlzaGVyIG9yIHNldCBvZiBQdWJsaXNoZXJzIHRvIGNvbnN0cmFpbiByZXN1bHRzLiBCeVxuICAgICAqIGRlZmF1bHQsIHZhbHVlcyBhcmUgYXNzdW1lZCB0byBiZSBpZGVudGlmaWVycy4gSWYgdXNpbmcgbGFiZWxzIG9yIHVyaXMsXG4gICAgICogc3BlY2lmeSB0aGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlciB0byBiZSBlaXRoZXJcbiAgICAgKiBQYXJhbWV0ZXJzLlBVQkxJU0hFUlNfTEFCRUwgb3IgUGFyYW1ldGVycy5QVUJMSVNIRVJTX1VSSSByZXNwZWN0aXZlbHkuXG4gICAgICogQHBhcmFtIHB1Ymxpc2hlcnMgLSBwdWJsaXNoaW5nIG9yZ3MgdG8gY29uc3RyYWluIGJ5XG4gICAgICovXG4gICAgc2V0UHVibGlzaGVycyAocHVibGlzaGVyczpzdHJpbmd8c3RyaW5nW10sIHBhcmFtZXRlcj86c3RyaW5nKSB7XG5cbiAgICAgICAgLy9jbGVhciBleGlzdGluZ1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlBVQkxJU0hFUlNfSUQsIG51bGwpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlBVQkxJU0hFUlNfTEFCRUwsIG51bGwpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlBVQkxJU0hFUlNfVVJJLCBudWxsKTtcblxuICAgICAgICBsZXQgcGFyYW0gPSBwYXJhbWV0ZXIgfHwgUGFyYW1ldGVycy5QVUJMSVNIRVJTX0lEO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihwYXJhbSwgdG9BcnJheShwdWJsaXNoZXJzKSk7XG4gICAgfVxuXG4gICAgZ2V0UHVibGlzaGVycyAoKSA6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuUFVCTElTSEVSU19JRCkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuUFVCTElTSEVSU19MQUJFTCkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuUFVCTElTSEVSU19VUkkpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSBhIFBvaW50IG9mIENvbnRhY3Qgb3Igc2V0IG9mIENvbnRhY3RzIHRvIGNvbnN0cmFpbiByZXN1bHRzLiBCeVxuICAgICAqIGRlZmF1bHQsIHZhbHVlcyBhcmUgYXNzdW1lZCB0byBiZSBpZGVudGlmaWVycy4gSWYgdXNpbmdcbiAgICAgKiBsYWJlbHMgb3IgdXJpcywgc3BlY2lmeSB0aGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlciB0byBiZSBlaXRoZXJcbiAgICAgKiBQYXJhbWV0ZXJzLkNPTlRBQ1RTX0xBQkVMIG9yIFBhcmFtZXRlcnMuQ09OVEFDVFNfVVJJIHJlc3BlY3RpdmVseS5cbiAgICAgKiBAcGFyYW0gcGFyYW1ldGVyIC0gb3B0aW9uYWwsIHRvIGluZGljYXRlIHRoZSBwYXJhbWV0ZXIgdG8gdXNlXG4gICAgICogQHJldHVybiBRdWVyeVxuICAgICAqL1xuICAgIGNvbnRhY3RzKGNvbnRhY3RzOnN0cmluZ3xzdHJpbmdbXSwgcGFyYW1ldGVyPzpzdHJpbmcpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldENvbnRhY3RzKGNvbnRhY3RzLCBwYXJhbWV0ZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IGEgQ29udGFjdCBvciBzZXQgb2YgQ29udGFjdHMgdG8gY29uc3RyYWluIHJlc3VsdHMuIEJ5XG4gICAgICogZGVmYXVsdCwgdmFsdWVzIGFyZSBhc3N1bWVkIHRvIGJlIGlkZW50aWZpZXJzLiBJZiB1c2luZ1xuICAgICAqIGxhYmVscyBvciB1cmlzLCBzcGVjaWZ5IHRoZSBvcHRpb25hbCBzZWNvbmQgcGFyYW1ldGVyIHRvIGJlIGVpdGhlclxuICAgICAqIFBhcmFtZXRlcnMuQ09OVEFDVFNfTEFCRUwgb3IgUGFyYW1ldGVycy5DT05UQUNUU19VUkkgcmVzcGVjdGl2ZWx5LlxuICAgICAqIEBwYXJhbSBjb250YWN0cyAtIHB1Ymxpc2hpbmcgb3JncyB0byBjb25zdHJhaW4gYnlcbiAgICAgKi9cbiAgICBzZXRDb250YWN0cyAoY29udGFjdHM6c3RyaW5nfHN0cmluZ1tdLCBwYXJhbWV0ZXI/OnN0cmluZykge1xuXG4gICAgICAgIC8vY2xlYXIgZXhpc3RpbmdcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5DT05UQUNUU19JRCwgbnVsbCk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuQ09OVEFDVFNfTEFCRUwsIG51bGwpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkNPTlRBQ1RTX1VSSSwgbnVsbCk7XG5cbiAgICAgICAgbGV0IHBhcmFtID0gcGFyYW1ldGVyIHx8IFBhcmFtZXRlcnMuQ09OVEFDVFNfSUQ7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKHBhcmFtLCB0b0FycmF5KGNvbnRhY3RzKSk7XG4gICAgfVxuXG4gICAgZ2V0Q29udGFjdHMgKCkgOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkNPTlRBQ1RTX0lEKSB8fFxuICAgICAgICAgICAgdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5DT05UQUNUU19MQUJFTCkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuQ09OVEFDVFNfVVJJKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgdGhlIGlkZW50aWZpZXIgb2YgYW4gQWdlbnQgKENvbW11bml0eSwgR3JvdXAsIGV0YykgdGhhdFxuICAgICAqIHVzZXMgaXRlbXMgeW91IHdpc2ggdG8gZmluZCBpbiBzZWFyY2ggcmVzdWx0cy4gQnlcbiAgICAgKiBkZWZhdWx0LCB2YWx1ZXMgYXJlIGFzc3VtZWQgdG8gYmUgaWRlbnRpZmllcnMuIElmIHVzaW5nXG4gICAgICogbGFiZWxzIG9yIHVyaXMsIHNwZWNpZnkgdGhlIG9wdGlvbmFsIHNlY29uZCBwYXJhbWV0ZXJcbiAgICAgKiB0byBiZSBlaXRoZXIgUGFyYW1ldGVycy5VU0VEX0JZX0xBQkVMIG9yIFBhcmFtZXRlcnMuVVNFRF9CWV9VUklcbiAgICAgKiByZXNwZWN0aXZlbHkuXG4gICAgICogQHBhcmFtIHBhcmFtZXRlciAtIG9wdGlvbmFsLCB0byBpbmRpY2F0ZSB0aGUgcGFyYW1ldGVyIHRvIHVzZVxuICAgICAqIEByZXR1cm4gUXVlcnlcbiAgICAgKi9cbiAgICB1c2VkQnkoaWRzOnN0cmluZ3xzdHJpbmdbXSwgcGFyYW1ldGVyPzpzdHJpbmcpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldFVzZWRCeShpZHMsIHBhcmFtZXRlcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgdGhlIGlkZW50aWZpZXIgb2YgYW4gQWdlbnQgKENvbW11bml0eSwgR3JvdXAsIGV0YykgdGhhdFxuICAgICAqIHVzZXMgaXRlbXMgeW91IHdpc2ggdG8gZmluZCBpbiBzZWFyY2ggcmVzdWx0cy4gQnlcbiAgICAgKiBkZWZhdWx0LCB2YWx1ZXMgYXJlIGFzc3VtZWQgdG8gYmUgaWRlbnRpZmllcnMuIElmIHVzaW5nXG4gICAgICogbGFiZWxzIG9yIHVyaXMsIHNwZWNpZnkgdGhlIG9wdGlvbmFsIHNlY29uZCBwYXJhbWV0ZXJcbiAgICAgKiB0byBiZSBlaXRoZXIgUGFyYW1ldGVycy5VU0VEX0JZX0xBQkVMIG9yIFBhcmFtZXRlcnMuVVNFRF9CWV9VUklcbiAgICAgKiByZXNwZWN0aXZlbHkuXG4gICAgICogQHBhcmFtIGlkcyAtIHB1Ymxpc2hpbmcgb3JncyB0byBjb25zdHJhaW4gYnlcbiAgICAgKi9cbiAgICBzZXRVc2VkQnkgKGlkczpzdHJpbmd8c3RyaW5nW10sIHBhcmFtZXRlcj86c3RyaW5nKSB7XG5cbiAgICAgICAgLy9jbGVhciBleGlzdGluZ1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlVTRURfQllfSUQsIG51bGwpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlVTRURfQllfTEFCRUwsIG51bGwpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlVTRURfQllfVVJJLCBudWxsKTtcblxuICAgICAgICBsZXQgcGFyYW0gPSBwYXJhbWV0ZXIgfHwgUGFyYW1ldGVycy5VU0VEX0JZX0lEO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihwYXJhbSwgdG9BcnJheShpZHMpKTtcbiAgICB9XG5cbiAgICBnZXRVc2VkQnkgKCkgOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlVTRURfQllfSUQpIHx8XG4gICAgICAgICAgICB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlVTRURfQllfTEFCRUwpIHx8XG4gICAgICAgICAgICB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlVTRURfQllfVVJJKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgYSBDb25jZXB0IFNjaGVtZSBvciBzZXQgb2YgQ29uY2VwdCBTY2hlbWVzIHRvIGNvbnN0cmFpbiByZXN1bHRzLiBCeVxuICAgICAqIGRlZmF1bHQsIHZhbHVlcyBhcmUgYXNzdW1lZCB0byBiZSBpZGVudGlmaWVycy4gSWYgdXNpbmdcbiAgICAgKiBsYWJlbHMgb3IgdXJpcywgc3BlY2lmeSB0aGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlclxuICAgICAqIHRvIGJlIGVpdGhlciBQYXJhbWV0ZXJzLlNDSEVNRVNfTEFCRUwgb3IgUGFyYW1ldGVycy5TQ0hFTUVTX1VSSVxuICAgICAqIHJlc3BlY3RpdmVseS5cbiAgICAgKiBAcGFyYW0gc2NoZW1lcyAtIHNjaGVtZXMgdG8gY29uc3RyYWluIGJ5XG4gICAgICogQHBhcmFtIHBhcmFtZXRlciAtIG9wdGlvbmFsLCB0byBpbmRpY2F0ZSB0aGUgcGFyYW1ldGVyIHRvIHVzZVxuICAgICAqIEByZXR1cm4gUXVlcnlcbiAgICAgKi9cbiAgICBzY2hlbWVzKHNjaGVtZXM6c3RyaW5nfHN0cmluZ1tdLCBwYXJhbWV0ZXI/OnN0cmluZykgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0U2NoZW1lcyhzY2hlbWVzLCBwYXJhbWV0ZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IGEgQ29uY2VwdCBTY2hlbWUgb3Igc2V0IG9mIENvbmNlcHQgU2NoZW1lcyB0byBjb25zdHJhaW4gcmVzdWx0cy4gQnlcbiAgICAgKiBkZWZhdWx0LCB2YWx1ZXMgYXJlIGFzc3VtZWQgdG8gYmUgdGhlbWUgaWRlbnRpZmllcnMuIElmIHVzaW5nXG4gICAgICogdGhlbWUgbGFiZWxzIG9yIHRoZW1lIHVyaXMsIHNwZWNpZnkgdGhlIG9wdGlvbmFsIHNlY29uZCBwYXJhbWV0ZXJcbiAgICAgKiB0byBiZSBlaXRoZXIgUGFyYW1ldGVycy5TQ0hFTUVTX0xBQkVMIG9yIFBhcmFtZXRlcnMuU0NIRU1FU19VUklcbiAgICAgKiByZXNwZWN0aXZlbHkuXG4gICAgICogQHBhcmFtIHNjaGVtZXMgLSBzY2hlbWVzIHRvIGNvbnN0cmFpbiBieVxuICAgICAqIEBwYXJhbSBwYXJhbWV0ZXIgLSBvcHRpb25hbCwgdG8gaW5kaWNhdGUgdGhlIHBhcmFtZXRlciB0byB1c2VcbiAgICAgKi9cbiAgICBzZXRTY2hlbWVzIChzY2hlbWVzOnN0cmluZ3xzdHJpbmdbXSwgcGFyYW1ldGVyPzpzdHJpbmcpIHtcblxuICAgICAgICAvL2NsZWFyIGV4aXN0aW5nXG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuU0NIRU1FU19JRCwgbnVsbCk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuU0NIRU1FU19MQUJFTCwgbnVsbCk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuU0NIRU1FU19VUkksIG51bGwpO1xuXG4gICAgICAgIGxldCBwYXJhbSA9IHBhcmFtZXRlciB8fCBQYXJhbWV0ZXJzLlNDSEVNRVNfSUQ7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKHBhcmFtLCB0b0FycmF5KHNjaGVtZXMpKTtcbiAgICB9XG5cbiAgICBnZXRTY2hlbWVzKCkgOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlNDSEVNRVNfSUQpIHx8XG4gICAgICAgICAgICB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlNDSEVNRVNfTEFCRUwpIHx8XG4gICAgICAgICAgICB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlNDSEVNRVNfVVJJKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIHNlcnZpY2VUeXBlcyh0eXBlczpzdHJpbmd8c3RyaW5nW10pIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldFNlcnZpY2VUeXBlcyh0eXBlcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB0eXBlcyAtIGlkc1xuICAgICAqL1xuICAgIHNldFNlcnZpY2VUeXBlcyAodHlwZXM6c3RyaW5nfHN0cmluZ1tdKSB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuU0VSVklDRV9UWVBFUywgdG9BcnJheSh0eXBlcykpO1xuICAgIH1cblxuICAgIGdldFNlcnZpY2VUeXBlcyAoKSA6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuU0VSVklDRV9UWVBFUyk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICB2aXNpYmlsaXR5KHZpczpcInB1YmxpY1wifFwicHJpdmF0ZVwiKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRWaXNpYmlsaXR5KHZpcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB2aXNpYmlsaXR5IC0gb25lIG9mICdwdWJsaWMnIG9yICdwcml2YXRlJ1xuICAgICAqL1xuICAgIHNldFZpc2liaWxpdHkgKHZpc2liaWxpdHkgOiBcInB1YmxpY1wifFwicHJpdmF0ZVwiKSB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVklTSUJJTElUWSwgdmlzaWJpbGl0eSk7XG4gICAgfVxuXG4gICAgZ2V0VmlzaWJpbGl0eSAoKSA6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlZJU0lCSUxJVFkpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgc3RhdHVzKHZhbHVlIDogc3RyaW5nKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0dXModmFsdWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc3RhdHVzIC0gY3VycmVudCBzdGF0dXMgb2YgSXRlbVxuICAgICAqL1xuICAgIHNldFN0YXR1cyAodmFsdWUgOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5TVEFUVVMsIHZhbHVlKTtcbiAgICB9XG5cbiAgICBnZXRTdGF0dXMgKCkgOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5TVEFUVVMpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgZXh0ZW50KGJib3ggOiBhbnkpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldEV4dGVudChiYm94KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGJib3ggLSBzdHJpbmcgZm9ybSBvZiBcIm1pbngsbWlueSxtYXh4LG1heHlcIiwgb3IgTC5MYXRMbmdCb3VuZHMsIG9yIEFycmF5XG4gICAgICovXG4gICAgc2V0RXh0ZW50IChiYm94IDogYW55KSB7XG4gICAgICAgIGlmKGJib3gpIHtcbiAgICAgICAgICAgIGlmKHR5cGVvZihiYm94LnRvQmJveFN0cmluZykgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgLy9MZWFmbGV0IEJvdW5kcyBpbnN0YW5jZVxuICAgICAgICAgICAgICAgIGJib3ggPSBiYm94LnRvQmJveFN0cmluZygpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYodHlwZW9mKGJib3gucHVzaCkgIT09ICd1bmRlZmluZWQnICYmIGJib3gubGVuZ3RoICYmXG4gICAgICAgICAgICAgICAgLy9OZXN0ZWQgYXJyYXkgKGFsdGVybmF0ZSBMZWFmbGV0IHJlcHJlc2VudGF0aW9uKTpcbiAgICAgICAgICAgICAgICAvLyBbIFttaW5MYXQsbWluTG9uZ10sIFttYXhMYXQsbWF4TG9uZ10gXVxuICAgICAgICAgICAgICAgIHR5cGVvZihiYm94WzBdLnB1c2gpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGJib3ggPSBiYm94WzBdWzFdKycsJytiYm94WzBdWzBdKycsJytiYm94WzFdWzFdKycsJytiYm94WzFdWzBdO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYodHlwZW9mKGJib3gpID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGlmKCFCQk9YX1JFR0VYLnRlc3QoYmJveCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBhcmd1bWVudDogYmJveCBzdHJpbmcgbXVzdCBiZSBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBcImluIGZvcm0gb2YgJ21pbngsbWlueSxtYXh4LG1heHknXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBhcmd1bWVudDogYmJveCBtdXN0IGJlIG9uZSBvZiBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwiTGVhZmxldC5Cb3VuZHMsIG5lc3RlZCBhcnJheSwgb3IgYmJveCBzdHJpbmdcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5FWFRFTlQsIGJib3gpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4gYmJveCBzdHJpbmcgb3IgbnVsbCBpZiBub3Qgc2V0XG4gICAgICovXG4gICAgZ2V0RXh0ZW50ICgpIDogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuRVhURU5UKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIEV4LlxuICAgICAqICBjb25zdCB7IEtHQ2xhc3NpZmllcnMsIFF1ZXJ5IH0gZnJvbSAnZ2VvcGxhdGZvcm0uY2xpZW50JztcbiAgICAgKiAgbGV0IHB1cnBvc2VJZCA9ICcuLi4nO1xuICAgICAqICBsZXQgcXVlcnkgPSBuZXcgUXVlcnkoKTtcbiAgICAgKiAgcXVlcnkuY2xhc3NpZmllciggS0dDbGFzc2lmaWVycy5QVVJQT1NFLCBwdXJwb3NlSWQgKTtcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjbGFzc2lmaWVyIC0gc3RyaW5nIG5hbWUgb2YgY2xhc3NpZmllciB0byB1c2VcbiAgICAgKiBAcGFyYW0gdmFsdWUgLSBpZCBvciBhcnJheSBvZiBpZHMgb2YgY29uY2VwdHMgdG8gdXNlXG4gICAgICogQHJldHVybiBRdWVyeVxuICAgICAqL1xuICAgIGNsYXNzaWZpZXIoY2xhc3NpZmllciA6IHN0cmluZywgdmFsdWUgOiBzdHJpbmd8c3RyaW5nW10pIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldENsYXNzaWZpZXIoY2xhc3NpZmllciwgdmFsdWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeC5cbiAgICAgKiAgY29uc3QgeyBLR0NsYXNzaWZpZXJzLCBRdWVyeSB9IGZyb20gJ2dlb3BsYXRmb3JtLmNsaWVudCc7XG4gICAgICogIGxldCBwdXJwb3NlSWQgPSAnLi4uJztcbiAgICAgKiAgbGV0IHF1ZXJ5ID0gbmV3IFF1ZXJ5KCk7XG4gICAgICogIHF1ZXJ5LnNldENsYXNzaWZpZXIoIEtHQ2xhc3NpZmllcnMuUFVSUE9TRSwgcHVycG9zZUlkICk7XG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2xhc3NpZmllciAtIHN0cmluZyBuYW1lIG9mIGNsYXNzaWZpZXIgdG8gdXNlXG4gICAgICogQHBhcmFtIHZhbHVlIC0gaWQgb3IgYXJyYXkgb2YgaWRzIG9mIGNvbmNlcHRzIHRvIHVzZVxuICAgICAqL1xuICAgIHNldENsYXNzaWZpZXIoY2xhc3NpZmllciA6IHN0cmluZywgdmFsdWUgOiBzdHJpbmd8c3RyaW5nW10pIHtcbiAgICAgICAgbGV0IGFyciA9IHRvQXJyYXkodmFsdWUpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkNMQVNTSUZJRVJTICsgXCIuXCIgKyBjbGFzc2lmaWVyLCBhcnIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBjbGFzc2lmaWVyIC0gbmFtZSBvZiBjbGFzc2lmaWVyIGNvbnN0cmFpbnQgaW4gdXNlXG4gICAgICogQHJldHVybiBhcnJheSBvZiBjb25jZXB0IGlkc1xuICAgICAqL1xuICAgIGdldENsYXNzaWZpZXIoY2xhc3NpZmllciA6IHN0cmluZykgOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkNMQVNTSUZJRVJTICsgXCIuXCIgKyBjbGFzc2lmaWVyKSB8fCBbXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeC5cbiAgICAgKiAgY29uc3QgeyBLR0NsYXNzaWZpZXJzLCBRdWVyeSB9IGZyb20gJ2dlb3BsYXRmb3JtLmNsaWVudCc7XG4gICAgICogIGxldCBwdXJwb3NlSWQgPSAnLi4uJyxcbiAgICAgKiAgICAgIGZ1bmN0aW9uSWRzID0gWycuLi4nLCcuLi4nXTtcbiAgICAgKiAgbGV0IHF1ZXJ5ID0gbmV3IFF1ZXJ5KCk7XG4gICAgICogIHF1ZXJ5LmNsYXNzaWZpZXJzKHtcbiAgICAgKiAgICAgICBLR0NsYXNzaWZpZXJzLlBVUlBPU0U6IHB1cnBvc2VJZCxcbiAgICAgKiAgICAgICBLR0NsYXNzaWZpZXJzLkZVTkNUSU9OOiBmdW5jdGlvbklkc1xuICAgICAqICB9KTtcbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YWx1ZSAtIG9iamVjdCBkZWZpbmluZyBjbGFzc2lmaWVyc1xuICAgICAqIEByZXR1cm4gUXVlcnkgaW5zdGFuY2VcbiAgICAgKi9cbiAgICBjbGFzc2lmaWVycyh2YWx1ZSA6IGFueSkgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0Q2xhc3NpZmllcnModmFsdWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gdmFsdWUgLSBvYmplY3QgZGVmaW5pbmcgY2xhc3NpZmllcnNcbiAgICAgKi9cbiAgICBzZXRDbGFzc2lmaWVycyAodmFsdWUgOiBhbnkpIHtcbiAgICAgICAgY29uc3QgY2xhc3NlcyA9IE9iamVjdC5rZXlzKENsYXNzaWZpZXJzKS5tYXAoaz0+Q2xhc3NpZmllcnNba10pO1xuICAgICAgICBpZighdmFsdWUgfHwgdHlwZW9mKHZhbHVlKSAhPT0gJ29iamVjdCcgfHwgQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGNsYXNzZXMuZm9yRWFjaCggY2xhc3NpZmllciA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhclBhcmFtZXRlciggUGFyYW1ldGVycy5DTEFTU0lGSUVSUyArIFwiLlwiICsgY2xhc3NpZmllciApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgT2JqZWN0LmtleXModmFsdWUpLmZvckVhY2goIGNsYXNzaWZpZXIgPT4ge1xuICAgICAgICAgICAgaWYofmNsYXNzZXMuaW5kZXhPZihjbGFzc2lmaWVyKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0Q2xhc3NpZmllciggY2xhc3NpZmllciwgdmFsdWVbY2xhc3NpZmllcl0gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiBjbGFzc2lmaWVycyB1c2VkIGluIHRoZSBxdWVyeVxuICAgICAqL1xuICAgIGdldENsYXNzaWZpZXJzICgpIDogYW55IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IHt9O1xuICAgICAgICBPYmplY3Qua2V5cyhDbGFzc2lmaWVycykubWFwKGs9PkNsYXNzaWZpZXJzW2tdKS5mb3JFYWNoKCBjbGFzc2lmaWVyID0+IHtcbiAgICAgICAgICAgIHJlc3VsdFtjbGFzc2lmaWVyXSA9IHRoaXMuZ2V0Q2xhc3NpZmllcihjbGFzc2lmaWVyKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICBtb2RpZmllZChkYXRlIDogbnVtYmVyfERhdGUsIGJlZm9yZU9yQWZ0ZXIgOiBib29sZWFuKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRNb2RpZmllZChkYXRlLCBiZWZvcmVPckFmdGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGRhdGUgLSBkYXRlIHRvIGNvbXBhcmUgYWdhaW5zdFxuICAgICAqIEBwYXJhbSBiZWZvcmVPckFmdGVyIC0gZmxhZyBzcGVjaWZ5aW5nIHdoaWNoIGJvdW5kYXJ5IGNvbmRpdGlvbiAodHJ1ZSA9IGJlZm9yZSwgZmFsc2UgPSBhZnRlcikgZmxhZyBzcGVjaWZ5aW5nIHdoZXRoZXIgdG8gdHJpZ2dlciB1cGRhdGUgYXV0b21hdGljYWxseVxuICAgICAqL1xuICAgIHNldE1vZGlmaWVkIChkYXRlIDogbnVtYmVyfERhdGUsIGJlZm9yZU9yQWZ0ZXI6Ym9vbGVhbikge1xuXG4gICAgICAgIC8vaWYgbm8gZGF0ZSB3YXMgc3VwcGxpZWQsIGNvbnNpZGVyIGl0IFwidW5zZXRcIiBmb3IgYm90aCBwcm9wZXJ0aWVzXG4gICAgICAgIGlmKCFkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLk1PRElGSUVEX0JFRk9SRSwgbnVsbCk7XG4gICAgICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLk1PRElGSUVEX0FGVEVSLCBudWxsKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCEoZGF0ZSBpbnN0YW5jZW9mIERhdGUpKVxuICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUgYXMgbnVtYmVyKTtcblxuICAgICAgICBsZXQgZGlyID0gYmVmb3JlT3JBZnRlciAmJiAoYmVmb3JlT3JBZnRlciA9PT0gdHJ1ZSB8fCBiZWZvcmVPckFmdGVyID09PSBcInRydWVcIik7XG4gICAgICAgIGxldCBwcm9wID0gZGlyID8gUGFyYW1ldGVycy5NT0RJRklFRF9CRUZPUkUgOiBQYXJhbWV0ZXJzLk1PRElGSUVEX0FGVEVSOyAgICAgICAvL3Byb3BlcnR5IGJlaW5nIHNldFxuICAgICAgICBsZXQgb3BwUHJvcCA9IGRpciA/IFBhcmFtZXRlcnMuTU9ESUZJRURfQUZURVIgOiBQYXJhbWV0ZXJzLk1PRElGSUVEX0JFRk9SRTsgICAgLy91bnNldCBvcHBvc2l0ZSBwcm9wZXJ0eVxuICAgICAgICBsZXQgYXJnID0gKGRhdGUgJiYgZGF0ZS5nZXRUaW1lKSA/IGRhdGUuZ2V0VGltZSgpIDogZGF0ZTtcblxuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihvcHBQcm9wLCBudWxsKTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIocHJvcCwgYXJnKTtcbiAgICB9XG5cbiAgICBnZXRNb2RpZmllZCAoKSA6IERhdGUge1xuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLk1PRElGSUVEX0JFRk9SRSkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuTU9ESUZJRURfQUZURVIpO1xuICAgICAgICBpZih2YWx1ZSAmJiB0eXBlb2YodmFsdWUpID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdmFsdWUgPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgY3JlYXRlZChkYXRlIDogbnVtYmVyfERhdGUsIGJlZm9yZU9yQWZ0ZXI6Ym9vbGVhbikgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0Q3JlYXRlZChkYXRlLCBiZWZvcmVPckFmdGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGRhdGUgLSBkYXRlIHRvIGNvbXBhcmUgYWdhaW5zdFxuICAgICAqIEBwYXJhbSBiZWZvcmVPckFmdGVyIC0gZmxhZyBzcGVjaWZ5aW5nIHdoaWNoIGJvdW5kYXJ5IGNvbmRpdGlvbiAodHJ1ZSA9IGJlZm9yZSwgZmFsc2UgPSBhZnRlcikgZmxhZyBzcGVjaWZ5aW5nIHdoZXRoZXIgdG8gdHJpZ2dlciB1cGRhdGUgYXV0b21hdGljYWxseVxuICAgICAqL1xuICAgIHNldENyZWF0ZWQgKGRhdGUgOiBudW1iZXJ8RGF0ZSwgYmVmb3JlT3JBZnRlcjpib29sZWFuKSB7XG5cbiAgICAgICAgLy9pZiBubyBkYXRlIHdhcyBzdXBwbGllZCwgY29uc2lkZXIgaXQgXCJ1bnNldFwiIGZvciBib3RoIHByb3BlcnRpZXNcbiAgICAgICAgaWYoIWRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuQ1JFQVRFRF9CRUZPUkUsIG51bGwpO1xuICAgICAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5DUkVBVEVEX0FGVEVSLCBudWxsKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCEoZGF0ZSBpbnN0YW5jZW9mIERhdGUpKVxuICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUgYXMgbnVtYmVyKTtcblxuICAgICAgICBsZXQgZGlyID0gYmVmb3JlT3JBZnRlciAmJiAoYmVmb3JlT3JBZnRlciA9PT0gdHJ1ZSB8fCBiZWZvcmVPckFmdGVyID09PSBcInRydWVcIik7XG4gICAgICAgIGxldCBwcm9wID0gZGlyID8gUGFyYW1ldGVycy5DUkVBVEVEX0JFRk9SRSA6IFBhcmFtZXRlcnMuQ1JFQVRFRF9BRlRFUjsgICAgICAgLy9wcm9wZXJ0eSBiZWluZyBzZXRcbiAgICAgICAgbGV0IG9wcFByb3AgPSBkaXIgPyBQYXJhbWV0ZXJzLkNSRUFURURfQUZURVIgOiBQYXJhbWV0ZXJzLkNSRUFURURfQkVGT1JFOyAgICAvL3Vuc2V0IG9wcG9zaXRlIHByb3BlcnR5XG4gICAgICAgIGxldCBhcmcgPSAoZGF0ZSAmJiBkYXRlLmdldFRpbWUpID8gZGF0ZS5nZXRUaW1lKCkgOiBkYXRlO1xuXG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKG9wcFByb3AsIG51bGwpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihwcm9wLCBhcmcpO1xuICAgIH1cblxuICAgIGdldENyZWF0ZWQgKCkgOiBEYXRlIHtcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5DUkVBVEVEX0JFRk9SRSkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuQ1JFQVRFRF9BRlRFUik7XG4gICAgICAgIGlmKHZhbHVlICYmIHR5cGVvZih2YWx1ZSkgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IG5ldyBEYXRlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICBiZWdpbnMoZGF0ZSA6IG51bWJlcnxEYXRlKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRCZWdpbkRhdGUoZGF0ZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldEJlZ2luRGF0ZSAoZGF0ZSA6IG51bWJlcnxEYXRlKSB7XG4gICAgICAgIGlmKGRhdGUgJiYgZGF0ZSBpbnN0YW5jZW9mIERhdGUpXG4gICAgICAgICAgICBkYXRlID0gZGF0ZS5nZXRUaW1lKCk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuQkVHSU5TLCBkYXRlKTtcbiAgICB9XG5cbiAgICBnZXRCZWdpbkRhdGUgKCkgOiBEYXRlIHtcbiAgICAgICAgbGV0IGRhdGUgPSB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkJFR0lOUyk7XG4gICAgICAgIGlmKGRhdGUpIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICBlbmRzKGRhdGUgOiBudW1iZXJ8RGF0ZSkgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0RW5kRGF0ZShkYXRlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0RW5kRGF0ZSAoZGF0ZTogbnVtYmVyfERhdGUpIHtcbiAgICAgICAgaWYoZGF0ZSAmJiBkYXRlIGluc3RhbmNlb2YgRGF0ZSlcbiAgICAgICAgICAgIGRhdGUgPSBkYXRlLmdldFRpbWUoKTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5FTkRTLCBkYXRlKTtcbiAgICB9XG5cbiAgICBnZXRFbmREYXRlICgpIDogRGF0ZSB7XG4gICAgICAgIGxldCBkYXRlID0gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5FTkRTKTtcbiAgICAgICAgaWYoZGF0ZSkgZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIGJldHdlZW4oYmVnaW4gOiBudW1iZXJ8RGF0ZSwgZW5kIDogbnVtYmVyfERhdGUpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldEJldHdlZW4oYmVnaW4sIGVuZCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldEJldHdlZW4oYmVnaW4gOiBudW1iZXJ8RGF0ZSwgZW5kIDogbnVtYmVyfERhdGUpIHtcbiAgICAgICAgdGhpcy5iZWdpbnMoYmVnaW4pO1xuICAgICAgICB0aGlzLmVuZHMoZW5kKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIHJlc291cmNlVHlwZXModHlwZXM6IHN0cmluZ3xzdHJpbmdbXSkgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0UmVzb3VyY2VUeXBlcyh0eXBlcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldFJlc291cmNlVHlwZXModHlwZXM6IHN0cmluZ3xzdHJpbmdbXSkge1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlJFU09VUkNFX1RZUEUsIHRvQXJyYXkodHlwZXMpKTtcbiAgICB9XG5cbiAgICBnZXRSZXNvdXJjZVR5cGVzKCkgOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlJFU09VUkNFX1RZUEUpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgZmFjZXRzKG5hbWVzIDogc3RyaW5nfHN0cmluZ1tdKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRGYWNldHMobmFtZXMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIEBwYXJhbSBuYW1lcyAtIG5hbWVzIG9mIGZhY2V0c1xuICAgICAqL1xuICAgIHNldEZhY2V0cyAobmFtZXM6IHN0cmluZ3xzdHJpbmdbXSkge1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkZBQ0VUUywgdG9BcnJheShuYW1lcykpO1xuICAgIH1cblxuICAgIGdldEZhY2V0cygpIDogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5GQUNFVFMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBuYW1lIC0gbmFtZSBvZiBmYWNldCB0byBhZGRcbiAgICAgKi9cbiAgICBhZGRGYWNldChuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGZhY2V0cyA9IHRoaXMuZ2V0RmFjZXRzKCkgfHwgW107XG4gICAgICAgIGZhY2V0cy5wdXNoKG5hbWUpO1xuICAgICAgICB0aGlzLnNldEZhY2V0cyhmYWNldHMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBuYW1lIC0gbmFtZSBvZiBmYWNldCB0byByZW1vdmVcbiAgICAgKi9cbiAgICByZW1vdmVGYWNldChuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGZhY2V0cyA9IHRoaXMuZ2V0RmFjZXRzKCkgfHwgW107XG4gICAgICAgIGxldCBpZHggPSBmYWNldHMuaW5kZXhPZihuYW1lKTtcbiAgICAgICAgaWYoaWR4Pj0wKSB7XG4gICAgICAgICAgICBmYWNldHMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICB0aGlzLnNldEZhY2V0cyhmYWNldHMpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICBmaWVsZHMoZmllbGRzOiBzdHJpbmd8c3RyaW5nW10pIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldEZpZWxkcyhmaWVsZHMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZmllbGRzIC0gbGlzdCBvZiBmaWVsZCBuYW1lcyB0byByZXF1ZXN0IGZvciBlYWNoIHNlYXJjaCByZXN1bHRcbiAgICAgKi9cbiAgICBzZXRGaWVsZHMgKGZpZWxkczogc3RyaW5nfHN0cmluZ1tdKSB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuRklFTERTLCB0b0FycmF5KGZpZWxkcykpO1xuICAgIH1cblxuICAgIGdldEZpZWxkcygpIDogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5GSUVMRFMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBmaWVsZCAtIG5hbWUgb2YgZmllbGQgdG8gcmVtb3ZlXG4gICAgICovXG4gICAgYWRkRmllbGQoZmllbGQ6IHN0cmluZykge1xuICAgICAgICBsZXQgZmllbGRzID0gdGhpcy5nZXRGaWVsZHMoKSB8fCBbXTtcbiAgICAgICAgZmllbGRzLnB1c2goZmllbGQpO1xuICAgICAgICB0aGlzLnNldEZpZWxkcyhmaWVsZHMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBmaWVsZCAtIG5hbWUgb2YgZmllbGQgdG8gcmVtb3ZlXG4gICAgICovXG4gICAgcmVtb3ZlRmllbGQoZmllbGQ6IHN0cmluZykge1xuICAgICAgICBsZXQgZmllbGRzID0gdGhpcy5nZXRGaWVsZHMoKSB8fCBbXTtcbiAgICAgICAgbGV0IGlkeCA9IGZpZWxkcy5pbmRleE9mKGZpZWxkKTtcbiAgICAgICAgaWYoaWR4Pj0wKSB7XG4gICAgICAgICAgICBmaWVsZHMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICB0aGlzLnNldEZpZWxkcyhmaWVsZHMpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBwYWdlIC0gcGFnZSBvZiByZXN1bHRzIHRvIGZldGNoXG4gICAgICovXG4gICAgcGFnZSAocGFnZTogbnVtYmVyKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRQYWdlKHBhZ2UpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRQYWdlKHBhZ2U6IG51bWJlcikge1xuICAgICAgICBpZihpc05hTihwYWdlKSB8fCBwYWdlKjE8MCkgcmV0dXJuO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlBBR0UsIHBhZ2UqMSk7XG4gICAgfVxuXG4gICAgZ2V0UGFnZSgpIDogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuUEFHRSk7XG4gICAgfVxuXG4gICAgbmV4dFBhZ2UoKSA6IHZvaWQge1xuICAgICAgICB0aGlzLnNldFBhZ2UodGhpcy5nZXRQYWdlKCkrMSk7XG4gICAgfVxuXG4gICAgcHJldmlvdXNQYWdlKCkgOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRQYWdlKHRoaXMuZ2V0UGFnZSgpLTEpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHNpemUgLSBwYWdlIHNpemUgdG8gcmVxdWVzdFxuICAgICAqL1xuICAgIHBhZ2VTaXplIChzaXplOiBudW1iZXIpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldFBhZ2VTaXplKHNpemUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRQYWdlU2l6ZSAoc2l6ZTogbnVtYmVyKSB7XG4gICAgICAgIGlmKGlzTmFOKHNpemUpIHx8IHNpemUqMTwwKSByZXR1cm47XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuUEFHRV9TSVpFLCBzaXplKjEpO1xuICAgIH1cblxuICAgIGdldFBhZ2VTaXplKCkgOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5QQUdFX1NJWkUpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHNvcnQgLSBmb3JtIG9mIDxmaWVsZD4sPGRpcj4gb3IganVzdCBmaWVsZCBuYW1lXG4gICAgICogQHBhcmFtIG9yZGVyIC0gb3B0aW9uYWwsIGVpdGhlciAnYXNjJyBvciAnZGVzYydcbiAgICAgKi9cbiAgICBzb3J0IChzb3J0OiBzdHJpbmcsIG9yZGVyPzpzdHJpbmcpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldFNvcnQoc29ydCwgb3JkZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc29ydCAtIGZvcm0gb2YgPGZpZWxkPiw8ZGlyPiBvciBqdXN0IGZpZWxkIG5hbWVcbiAgICAgKiBAcGFyYW0gb3JkZXIgLSBvcHRpb25hbCwgZWl0aGVyICdhc2MnIG9yICdkZXNjJ1xuICAgICAqL1xuICAgICBzZXRTb3J0KHNvcnQ6IHN0cmluZywgb3JkZXI/OnN0cmluZykge1xuICAgICAgICAgb3JkZXIgPSBvcmRlciB8fCAnZGVzYyc7XG4gICAgICAgICBpZihzb3J0ICYmIHNvcnQuaW5kZXhPZignLCcpPDApXG4gICAgICAgICAgICBzb3J0ID0gc29ydCArICcsJyArIG9yZGVyO1xuICAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5TT1JULCBzb3J0KTtcbiAgICB9XG5cbiAgICBnZXRTb3J0KCkgOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5TT1JUKTtcbiAgICB9XG5cbiAgICBnZXRTb3J0RmllbGQoKSA6IHN0cmluZyB8IG51bGwge1xuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLmdldFNvcnQoKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlICYmIHZhbHVlLmxlbmd0aCA/IHZhbHVlLnNwbGl0KCcsJylbMF0gOiBudWxsO1xuICAgIH1cblxuICAgIGdldFNvcnRPcmRlcigpIDogc3RyaW5nIHwgbnVsbCB7XG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZ2V0U29ydCgpO1xuICAgICAgICByZXR1cm4gdmFsdWUgJiYgdmFsdWUubGVuZ3RoID8gdmFsdWUuc3BsaXQoJywnKVsxXSA6IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiBsaXN0IG9mIGtleS12YWx1ZSBwYWlycyBvZiBzb3J0IG9wdGlvbnNcbiAgICAgKi9cbiAgICBnZXRTb3J0T3B0aW9ucygpIDogeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyB9W10ge1xuICAgICAgICByZXR1cm4gU09SVF9PUFRJT05TX0RFRkFVTFQuc2xpY2UoMCk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGNsZWFyICgpIHtcbiAgICAgICAgdGhpcy5xdWVyeSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5kZWZhdWx0UXVlcnkpKTtcbiAgICB9XG59XG5cbmV4cG9ydCB7XG4gICAgUXVlcnkgYXMgZGVmYXVsdCxcbiAgICBRdWVyeSxcbiAgICBGaWVsZHMsXG4gICAgRmFjZXRzXG59O1xuIl19