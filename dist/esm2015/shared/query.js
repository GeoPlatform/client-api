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
        let classifiers = this.getParameter(Parameters.CLASSIFIERS) || {};
        classifiers[classifier] = toArray(value);
        this.setParameter(Parameters.CLASSIFIERS, classifiers);
    }
    /**
     * @param {?} classifier - name of classifier constraint in use
     * @return {?} array of concept ids
     */
    getClassifier(classifier) {
        /** @type {?} */
        let classifiers = this.getParameter(Parameters.CLASSIFIERS) || {};
        return classifiers[classifier] || [];
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
        if (!value || typeof (value) !== 'object' || Array.isArray(value)) {
            this.setParameter(Parameters.CLASSIFIERS, null);
            return;
        }
        /** @type {?} */
        const classes = Object.keys(Classifiers).map(k => Classifiers[k]);
        /** @type {?} */
        let classifiers = this.getParameter(Parameters.CLASSIFIERS) || {};
        Object.keys(value).forEach(classifier => {
            if (~classes.indexOf(classifier)) {
                classifiers[classifier] = toArray(value[classifier]);
            }
        });
        this.setParameter(Parameters.CLASSIFIERS, classifiers);
    }
    /**
     * @return {?} classifiers used in the query
     */
    getClassifiers() {
        return this.getParameter(Parameters.CLASSIFIERS) || null;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50LyIsInNvdXJjZXMiOlsic2hhcmVkL3F1ZXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLFVBQVUsTUFBTSxjQUFjLENBQUM7QUFDdEMsT0FBTyxXQUFXLE1BQU0sZUFBZSxDQUFDOzs7Ozs7O0FBSXhDLE1BQU0sTUFBTSxHQUFpQjtJQUN6QixhQUFhLEVBQVMsUUFBUTtJQUM5QixnQkFBZ0IsRUFBTSxpQkFBaUI7SUFDdkMsV0FBVyxFQUFXLGFBQWE7SUFDbkMsV0FBVyxFQUFXLGFBQWE7SUFDbkMsY0FBYyxFQUFRLFFBQVE7SUFDOUIsUUFBUSxFQUFjLFVBQVU7SUFDaEMsT0FBTyxFQUFlLFNBQVM7SUFDL0IsVUFBVSxFQUFZLFdBQVc7SUFDakMsUUFBUSxFQUFjLFVBQVU7SUFDaEMsV0FBVyxFQUFXLGFBQWE7SUFDbkMsYUFBYSxFQUFTLGVBQWU7SUFDckMsTUFBTSxFQUFnQixRQUFRO0lBQzlCLGFBQWEsRUFBUyxPQUFPO0lBQzdCLElBQUksRUFBa0IsTUFBTTtJQUM1QixXQUFXLEVBQVcsYUFBYTtJQUNuQyxRQUFRLEVBQWMsVUFBVTtJQUNoQyxLQUFLLEVBQWlCLE9BQU87SUFDN0IsZ0JBQWdCLEVBQU0sZ0JBQWdCO0lBQ3RDLE1BQU0sRUFBZ0IsUUFBUTtJQUM5QixVQUFVLEVBQVksV0FBVztJQUNqQyxVQUFVLEVBQVksV0FBVztJQUNqQyxNQUFNLEVBQWdCLFFBQVE7SUFDOUIsUUFBUSxFQUFjLFVBQVU7SUFDaEMsWUFBWSxFQUFVLGFBQWE7SUFDbkMsVUFBVSxFQUFZLFlBQVk7SUFDbEMsY0FBYyxFQUFRLGVBQWU7SUFDckMsWUFBWSxFQUFVLGFBQWE7SUFDbkMsUUFBUSxFQUFjLFVBQVU7SUFDaEMsT0FBTyxFQUFlLFNBQVM7SUFDL0IsVUFBVSxFQUFZLFlBQVk7SUFDbEMsTUFBTSxFQUFnQixRQUFRO0lBQzlCLFVBQVUsRUFBWSxX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cm9tICcuL3BhcmFtZXRlcnMnO1xuaW1wb3J0IENsYXNzaWZpZXJzIGZyb20gJy4vY2xhc3NpZmllcnMnO1xuXG5pbnRlcmZhY2UgS1ZQPFU+IHsgWyBrZXkgOiBzdHJpbmcgXSA6IFUgfVxuXG5jb25zdCBGaWVsZHMgOiBLVlA8c3RyaW5nPiA9IHtcbiAgICBBQ0NFU1NfUklHSFRTICAgICAgIDogJ3JpZ2h0cycsXG4gICAgQUxURVJOQVRFX1RJVExFUyAgICA6ICdhbHRlcm5hdGVUaXRsZXMnLFxuICAgIEFOTk9UQVRJT05TICAgICAgICAgOiAnYW5ub3RhdGlvbnMnLFxuICAgIENMQVNTSUZJRVJTICAgICAgICAgOiAnY2xhc3NpZmllcnMnLFxuICAgIENPTkNFUFRfU0NIRU1FICAgICAgOiAnc2NoZW1lJyxcbiAgICBDT05UQUNUUyAgICAgICAgICAgIDogJ2NvbnRhY3RzJyxcbiAgICBDUkVBVEVEICAgICAgICAgICAgIDogJ2NyZWF0ZWQnLFxuICAgIENSRUFURURfQlkgICAgICAgICAgOiAnY3JlYXRlZEJ5JyxcbiAgICBEQVRBU0VUUyAgICAgICAgICAgIDogJ2RhdGFzZXRzJyxcbiAgICBERVNDUklQVElPTiAgICAgICAgIDogJ2Rlc2NyaXB0aW9uJyxcbiAgICBESVNUUklCVVRJT05TICAgICAgIDogJ2Rpc3RyaWJ1dGlvbnMnLFxuICAgIEVYVEVOVCAgICAgICAgICAgICAgOiAnZXh0ZW50JyxcbiAgICBHQUxMRVJZX0lURU1TICAgICAgIDogJ2l0ZW1zJyxcbiAgICBIUkVGICAgICAgICAgICAgICAgIDogJ2hyZWYnLFxuICAgIElERU5USUZJRVJTICAgICAgICAgOiAnaWRlbnRpZmllcnMnLFxuICAgIEtFWVdPUkRTICAgICAgICAgICAgOiAna2V5d29yZHMnLFxuICAgIExBQkVMICAgICAgICAgICAgICAgOiAnbGFiZWwnLFxuICAgIExBU1RfTU9ESUZJRURfQlkgICAgOiAnbGFzdE1vZGlmaWVkQnknLFxuICAgIExBWUVSUyAgICAgICAgICAgICAgOiAnbGF5ZXJzJyxcbiAgICBMQVlFUl9UWVBFICAgICAgICAgIDogJ2xheWVyVHlwZScsXG4gICAgTEFZRVJfTkFNRSAgICAgICAgICA6ICdsYXllck5hbWUnLFxuICAgIExFR0VORCAgICAgICAgICAgICAgOiAnbGVnZW5kJyxcbiAgICBNT0RJRklFRCAgICAgICAgICAgIDogJ21vZGlmaWVkJyxcbiAgICBQQVJFTlRfTEFZRVIgICAgICAgIDogJ3BhcmVudExheWVyJyxcbiAgICBQVUJMSVNIRVJTICAgICAgICAgIDogJ3B1Ymxpc2hlcnMnLFxuICAgIFJFU09VUkNFX1RZUEVTICAgICAgOiAncmVzb3VyY2VUeXBlcycsXG4gICAgU0VSVklDRV9UWVBFICAgICAgICA6ICdzZXJ2aWNlVHlwZScsXG4gICAgU0VSVklDRVMgICAgICAgICAgICA6ICdzZXJ2aWNlcycsXG4gICAgU1BBVElBTCAgICAgICAgICAgICA6ICdzcGF0aWFsJyxcbiAgICBTVEFUSVNUSUNTICAgICAgICAgIDogJ3N0YXRpc3RpY3MnLFxuICAgIFNUQVRVUyAgICAgICAgICAgICAgOiAnc3RhdHVzJyxcbiAgICBTVUJfTEFZRVJTICAgICAgICAgIDogJ3N1YkxheWVycycsXG4gICAgVEVNUE9SQUwgICAgICAgICAgICA6ICd0ZW1wb3JhbCcsXG4gICAgVEhFTUVTICAgICAgICAgICAgICA6ICd0aGVtZXMnLFxuICAgIFRIVU1CTkFJTCAgICAgICAgICAgOiAndGh1bWJuYWlsJyxcbiAgICBUT1BJQ1MgICAgICAgICAgICAgIDogJ3RvcGljcycsXG4gICAgVVNFRF9CWSAgICAgICAgICAgICA6ICd1c2VkQnknLFxuICAgIFZJU0lCSUxJVFkgICAgICAgICAgOiAndmlzaWJpbGl0eScsXG4gICAgTEFORElOR19QQUdFICAgICAgICA6ICdsYW5kaW5nUGFnZSdcbn07XG5cbmNvbnN0IEZJRUxEU19ERUZBVUxUIDogc3RyaW5nW10gPSBbXG4gICAgRmllbGRzLkNSRUFURUQsIEZpZWxkcy5NT0RJRklFRCwgRmllbGRzLkNSRUFURURfQlksXG4gICAgRmllbGRzLlBVQkxJU0hFUlMsIEZpZWxkcy5USEVNRVMsIEZpZWxkcy5ERVNDUklQVElPTlxuXTtcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbmNvbnN0IEZhY2V0cyA6IEtWUDxzdHJpbmc+ID0ge1xuICAgIEFMVEVSTkFURV9USVRMRVMgICAgOiAnYWx0ZXJuYXRlVGl0bGVzJyxcbiAgICBDT05DRVBUX1NDSEVNRVMgICAgIDogJ3NjaGVtZXMnLFxuICAgIENSRUFURURfQlkgICAgICAgICAgOiAnY3JlYXRlZEJ5JyxcbiAgICBIUkVGICAgICAgICAgICAgICAgIDogJ2hyZWYnLFxuICAgIElERU5USUZJRVJTICAgICAgICAgOiBcImlkZW50aWZpZXJzXCIsXG4gICAgTEFZRVJfVFlQRSAgICAgICAgICA6ICdsYXllclR5cGUnLFxuICAgIExBWUVSX05BTUUgICAgICAgICAgOiAnbGF5ZXJOYW1lJyxcbiAgICBMSUtFUyAgICAgICAgICAgICAgIDogJ2xpa2VzJyxcbiAgICBPTkxJTkUgICAgICAgICAgICAgIDogJ29ubGluZScsXG4gICAgUFVCTElTSEVSUyAgICAgICAgICA6ICdwdWJsaXNoZXJzJyxcbiAgICBDT05UQUNUUyAgICAgICAgICAgIDogJ2NvbnRhY3RzJyxcbiAgICBSRUxJQUJJTElUWSAgICAgICAgIDogJ3JlbGlhYmlsaXR5JyxcbiAgICBTRVJWSUNFX1RZUEVTICAgICAgIDogJ3NlcnZpY2VUeXBlcycsXG4gICAgU1BFRUQgICAgICAgICAgICAgICA6ICdzcGVlZCcsXG4gICAgU1RBVFVTICAgICAgICAgICAgICA6ICdzdGF0dXMnLFxuICAgIFRIRU1FUyAgICAgICAgICAgICAgOiAndGhlbWVzJyxcbiAgICBUT1BJQ1MgICAgICAgICAgICAgIDogJ3RvcGljcycsXG4gICAgVFlQRVMgICAgICAgICAgICAgICA6ICd0eXBlJywgICAvL1RPRE8gY2hhbmdlIHRvICd0eXBlcydcbiAgICBVU0VEX0JZICAgICAgICAgICAgIDogJ3VzZWRCeScsXG4gICAgVklFV1MgICAgICAgICAgICAgICA6ICd2aWV3cycsXG4gICAgVklTSUJJTElUWSAgICAgICAgICA6ICd2aXNpYmlsaXR5J1xufTtcblxuY29uc3QgRkFDRVRTX0RFRkFVTFQgOiBzdHJpbmdbXSA9IFtcbiAgICBGYWNldHMuVFlQRVMsXG4gICAgRmFjZXRzLlBVQkxJU0hFUlMsXG4gICAgRmFjZXRzLlNFUlZJQ0VfVFlQRVMsXG4gICAgRmFjZXRzLkNPTkNFUFRfU0NIRU1FUyxcbiAgICBGYWNldHMuVklTSUJJTElUWSxcbiAgICBGYWNldHMuQ1JFQVRFRF9CWVxuXTtcblxuXG4vKlxuICAgIE1hcCBmYWNldCBrZXlzIHRvIHBhcmFtZXRlcnMgc28gY2xpZW50cyBjYW4gc2V0XG4gICAgcXVlcnkgcGFyYW1zIHVzaW5nIGZhY2V0ZWQgcmVzdWx0c1xuXG4gICAgLy9UT0RPIHJlbW92ZSB0aGVzZSBhbmQgdGhlaXIgZnVuY3Rpb24gYmVsb3dcbiAqL1xuY29uc3QgRmFjZXRUb1BhcmFtIDogS1ZQPHN0cmluZz4gPSB7fTtcbkZhY2V0VG9QYXJhbVtGYWNldHMuVFlQRVNdICAgICAgICAgICA9IFBhcmFtZXRlcnMuVFlQRVM7XG5GYWNldFRvUGFyYW1bRmFjZXRzLlRIRU1FU10gICAgICAgICAgPSBQYXJhbWV0ZXJzLlRIRU1FU19JRDtcbkZhY2V0VG9QYXJhbVtGYWNldHMuVE9QSUNTXSAgICAgICAgICA9IFBhcmFtZXRlcnMuVE9QSUNTX0lEO1xuRmFjZXRUb1BhcmFtW0ZhY2V0cy5QVUJMSVNIRVJTXSAgICAgID0gUGFyYW1ldGVycy5QVUJMSVNIRVJTX0lEO1xuRmFjZXRUb1BhcmFtW0ZhY2V0cy5DT05UQUNUU10gICAgICAgID0gUGFyYW1ldGVycy5DT05UQUNUU19JRDtcbkZhY2V0VG9QYXJhbVtGYWNldHMuQ09OQ0VQVF9TQ0hFTUVTXSA9IFBhcmFtZXRlcnMuU0NIRU1FU19JRDtcbkZhY2V0VG9QYXJhbVtGYWNldHMuVVNFRF9CWV0gICAgICAgICA9IFBhcmFtZXRlcnMuVVNFRF9CWV9JRDtcblxuXG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5cbmNvbnN0IFNPUlRfT1BUSU9OU19ERUZBVUxUIDogeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyB9W10gPSBbXG4gICAgeyB2YWx1ZTpcImxhYmVsLGFzY1wiLCAgICAgICBsYWJlbDogXCJOYW1lIChBLVopXCIgICAgICAgICAgICAgIH0sXG4gICAgeyB2YWx1ZTpcImxhYmVsLGRlc2NcIiwgICAgICBsYWJlbDogXCJOYW1lIChaLUEpXCIgICAgICAgICAgICAgIH0sXG4gICAgeyB2YWx1ZTpcInR5cGUsYXNjXCIsICAgICAgICBsYWJlbDogXCJUeXBlIChBLVopXCIgICAgICAgICAgICAgIH0sXG4gICAgeyB2YWx1ZTpcInR5cGUsZGVzY1wiLCAgICAgICBsYWJlbDogXCJUeXBlIChaLUEpXCIgICAgICAgICAgICAgIH0sXG4gICAgeyB2YWx1ZTpcIm1vZGlmaWVkLGRlc2NcIiwgICBsYWJlbDogXCJNb3N0IHJlY2VudGx5IG1vZGlmaWVkXCIgIH0sXG4gICAgeyB2YWx1ZTpcIm1vZGlmaWVkLGFzY1wiLCAgICBsYWJlbDogXCJMZWFzdCByZWNlbnRseSBtb2RpZmllZFwiIH0sXG4gICAgeyB2YWx1ZTpcIl9zY29yZSxkZXNjXCIsICAgICBsYWJlbDogXCJSZWxldmFuY2VcIiAgICAgICAgICAgICAgIH1cbl07XG5cblxuY29uc3QgQkJPWF9SRUdFWCA9IC9eXFwtP1xcZCsoXFwuXFxkKik/LFxcLT9cXGQrKFxcLlxcZCopPyxcXC0/XFxkKyhcXC5cXGQqKT8sXFwtP1xcZCsoXFwuXFxkKik/JC87XG5cblxuZnVuY3Rpb24gdG9BcnJheSh2YWx1ZSA6IGFueSkgOiBhbnkgfCBudWxsIHtcbiAgICBsZXQgcmVzdWx0ID0gdmFsdWU7XG4gICAgLy9pZiBnaXZlbiBhIG5vbi1hcnJheSB2YWx1ZSwgd3JhcCBpbiBhcnJheVxuICAgIGlmKHJlc3VsdCAhPT0gbnVsbCAmJiB0eXBlb2YocmVzdWx0LnB1c2gpID09PSAndW5kZWZpbmVkJykgcmVzdWx0ID0gW3Jlc3VsdF07XG4gICAgLy9pZiBhcnJheSB2YWx1ZSBpcyBlbXB0eSwgbnVsbGlmeSB0aGUgcmVzdWx0XG4gICAgaWYocmVzdWx0ICE9PSBudWxsICYmICFyZXN1bHQubGVuZ3RoKSByZXN1bHQgPSBudWxsO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxuXG4vKipcbiAqIFF1ZXJ5XG4gKlxuICogU3BlY2lmeSB0aGUgXCJkZWZhdWx0XCIgcXVlcnkgY29uc3RyYWludHMgdG8gdXNlIGJ5IHBhc3NpbmcgaW4gJ29wdGlvbnMuZGVmYXVsdHMgPSB7Li4ufSc7XG4gKlxuICovXG5jbGFzcyBRdWVyeSB7XG5cbiAgICBwdWJsaWMgcXVlcnkgOiBLVlA8YW55PjtcbiAgICBwcml2YXRlIGRlZmF1bHRRdWVyeSA6IEtWUDxhbnk+O1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBzZXQgb2YgaW5pdGlhbCBjb25zdHJhaW50c1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPzogS1ZQPGFueT4pIHtcbiAgICAgICAgdGhpcy5kZWZhdWx0UXVlcnkgPSB7IH07XG4gICAgICAgIHRoaXMuZGVmYXVsdFF1ZXJ5W1BhcmFtZXRlcnMuUEFHRS50b1N0cmluZygpXSA9IDA7XG4gICAgICAgIHRoaXMuZGVmYXVsdFF1ZXJ5W1BhcmFtZXRlcnMuUEFHRV9TSVpFLnRvU3RyaW5nKCldID0gMTA7XG4gICAgICAgIHRoaXMuZGVmYXVsdFF1ZXJ5W1BhcmFtZXRlcnMuU09SVC50b1N0cmluZygpXSA9IFwibW9kaWZpZWQsZGVzY1wiO1xuICAgICAgICB0aGlzLmRlZmF1bHRRdWVyeVtQYXJhbWV0ZXJzLkZJRUxEUy50b1N0cmluZygpXSA9IEZJRUxEU19ERUZBVUxULnNsaWNlKDApO1xuICAgICAgICB0aGlzLmRlZmF1bHRRdWVyeVtQYXJhbWV0ZXJzLkZBQ0VUUy50b1N0cmluZygpXSA9IEZBQ0VUU19ERUZBVUxULnNsaWNlKDApO1xuICAgICAgICBpZihvcHRpb25zICYmIG9wdGlvbnMuZGVmYXVsdHMpIHtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5kZWZhdWx0UXVlcnksIG9wdGlvbnMuZGVmYXVsdHMpO1xuICAgICAgICAgICAgZGVsZXRlIG9wdGlvbnMuZGVmYXVsdHM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5xdWVyeSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5kZWZhdWx0UXVlcnkpKTtcbiAgICAgICAgaWYob3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5hcHBseVBhcmFtZXRlcnMob3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4gY29udGFpbmluZyByZXF1ZXN0LXJlYWR5IHBhcmFtZXRlcnMvdmFsdWVzXG4gICAgICovXG4gICAgZ2V0UXVlcnkoKSA6IEtWUDxhbnk+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA6IEtWUDxhbnk+ID0ge307XG4gICAgICAgIGZvcihsZXQgcHJvcCBpbiB0aGlzLnF1ZXJ5KSB7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLnF1ZXJ5W3Byb3BdO1xuICAgICAgICAgICAgaWYodmFsdWUgIT09IG51bGwgJiYgdHlwZW9mKHZhbHVlLnB1c2gpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuam9pbignLCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0W3Byb3BdID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIFF1ZXJ5XG4gICAgICovXG4gICAgY2xvbmUoKSA6IFF1ZXJ5IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBRdWVyeSgpO1xuICAgICAgICBsZXQganNvbiA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5xdWVyeSkpO1xuICAgICAgICByZXN1bHQuYXBwbHlQYXJhbWV0ZXJzKGpzb24pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBuYW1lXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHJldHVybiBRdWVyeSB0aGlzXG4gICAgICovXG4gICAgcGFyYW1ldGVyKG5hbWUgOiBzdHJpbmcsIHZhbHVlIDogYW55KSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIobmFtZSwgdmFsdWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbmFtZVxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqL1xuICAgIHNldFBhcmFtZXRlciAobmFtZSA6IHN0cmluZywgdmFsdWU6IGFueSkgOiB2b2lkIHtcbiAgICAgICAgaWYodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCAvL2lmIG5vIHZhbHVlIHdhcyBwcm92aWRlXG4gICAgICAgICAgICAodHlwZW9mKHZhbHVlLnB1c2gpICE9PSAndW5kZWZpbmVkJyAmJiAhdmFsdWUubGVuZ3RoKSkgLy9vciBlbXB0eSBhcnJheVxuICAgICAgICAgICAgZGVsZXRlIHRoaXMucXVlcnlbbmFtZV07XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMucXVlcnlbbmFtZV0gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ga2V5IC0gbmFtZSBvZiBwYXJhbWV0ZXJcbiAgICAgKiBAcmV0dXJuIHZhbHVlIG9mIHBhcmFtZXRlclxuICAgICAqL1xuICAgIGdldFBhcmFtZXRlciAoa2V5IDogc3RyaW5nKSA6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXJ5W2tleV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG9iaiAtIHNldCBvZiBwYXJhbWV0ZXIvdmFsdWVzIHRvIGFwcGx5IHRvIHRoaXMgcXVlcnlcbiAgICAgKi9cbiAgICBhcHBseVBhcmFtZXRlcnMgKG9iaiA6IEtWUDxhbnk+KSA6IHZvaWQge8KgXG4gICAgICAgIGZvcihsZXQgcCBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmKG9iai5oYXNPd25Qcm9wZXJ0eShwKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKHAgYXMgc3RyaW5nLCBvYmpbcF0gYXMgYW55KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBmYWNldCAtIG5hbWUgb2YgZmFjZXQgdG8gc2V0IHRoZSB2YWx1ZSBmb3IgYXMgYSBwYXJhbWV0ZXJcbiAgICAgKiBAcGFyYW0gdmFsdWUgLSB2YWx1ZSBvZiB0aGUgZmFjZXQgdG8gdXNlIGFzIHRoZSBwYXJhbWV0ZXIncyB2YWx1ZVxuICAgICAqL1xuICAgICAvL1RPRE8gcmVtb3ZlIHRoaXMgZnVuY3Rpb25cbiAgICBzZXRGYWNldFBhcmFtZXRlciAoZmFjZXQ6IHN0cmluZywgdmFsdWU6IHN0cmluZykgOiB2b2lkIHtcbiAgICAgICAgbGV0IHBhcmFtIDogc3RyaW5nID0gRmFjZXRUb1BhcmFtW2ZhY2V0XTtcbiAgICAgICAgaWYoIXBhcmFtKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIldBUk4gOiBRdWVyeS5hcHBseUZhY2V0UGFyYW1ldGVyKCkgLSBcIiArXG4gICAgICAgICAgICAgICAgXCJ1bmFibGUgdG8gbWFwIGZhY2V0IHRvIGtub3duIHBhcmFtZXRlciAnXCIgKyBmYWNldCArIFwiJywgdXNpbmcgXCIgK1xuICAgICAgICAgICAgICAgIFwiYXMgZGlyZWN0IHBhcmFtZXRlciB3aGljaCBtYXkgbm90IG9wZXJhdGUgYXMgaW50ZW5kZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIocGFyYW18fGZhY2V0LCB2YWx1ZSk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHRleHRcbiAgICAgKiBAcmV0dXJuIFF1ZXJ5IHRoaXNcbiAgICAgKi9cbiAgICBxKHRleHQgOiBzdHJpbmcpIDogUXVlcnkgeyB0aGlzLnNldFEodGV4dCk7IHJldHVybiB0aGlzOyB9XG5cbiAgICAvKiogQHBhcmFtIHRleHQgLSBmcmVlIHRleHQgcXVlcnkgKi9cbiAgICBzZXRRICh0ZXh0IDogc3RyaW5nKSA6IHZvaWQgeyB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlFVRVJZLCB0ZXh0KTsgfVxuICAgIC8qKiBAcmV0dXJuICovXG4gICAgZ2V0USgpIDogc3RyaW5nIHsgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuUVVFUlkpIGFzIHN0cmluZzsgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICBrZXl3b3Jkcyh0ZXh0IDogc3RyaW5nfHN0cmluZ1tdKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRLZXl3b3Jkcyh0ZXh0KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHRleHQgLSBmcmVlIHRleHQgcXVlcnlcbiAgICAgKi9cbiAgICBzZXRLZXl3b3JkcyAodGV4dCA6IHN0cmluZ3xzdHJpbmdbXSkgOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5LRVlXT1JEUywgdG9BcnJheSh0ZXh0KSk7XG4gICAgfVxuXG4gICAgZ2V0S2V5d29yZHMoKSA6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuS0VZV09SRFMpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgdXJpICh1cmkgOiBzdHJpbmcpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldFVyaSh1cmkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRVcmkodXJpIDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVVJJLCB1cmkpO1xuICAgIH1cblxuICAgIGdldFVyaSgpIDogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVVJJKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIHR5cGVzKHR5cGVzIDogc3RyaW5nfHN0cmluZ1tdKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRUeXBlcyh0eXBlcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB0eXBlcyAtIG5hbWUgb2YgY2xhc3MoZXMpIHRvIHJlcXVlc3RcbiAgICAgKi9cbiAgICBzZXRUeXBlcyAodHlwZXMgOiBzdHJpbmd8c3RyaW5nW10pIHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5UWVBFUywgdG9BcnJheSh0eXBlcykpO1xuICAgIH1cblxuICAgIGdldFR5cGVzICgpIDogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5UWVBFUyk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICBjcmVhdGVkQnkodXNlciA6IHN0cmluZykgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0Q3JlYXRlZEJ5KHVzZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKiogQHBhcmFtIHVzZXIgLSB1c2VybmFtZSAqL1xuICAgIHNldENyZWF0ZWRCeSAodXNlciA6IHN0cmluZykge1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkNSRUFURURfQlksIHVzZXIpO1xuICAgIH1cblxuICAgIC8qKiBAcmV0dXJuIHVzZXJuYW1lICovXG4gICAgZ2V0Q3JlYXRlZEJ5ICgpIDogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuQ1JFQVRFRF9CWSk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICBsYXN0TW9kaWZpZWRCeSh1c2VyIDogc3RyaW5nKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRMYXN0TW9kaWZpZWRCeSh1c2VyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqIEBwYXJhbSB1c2VyIC0gdXNlcm5hbWUgKi9cbiAgICBzZXRMYXN0TW9kaWZpZWRCeSAodXNlcjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuTEFTVF9NT0RJRklFRF9CWSwgdXNlcik7XG4gICAgfVxuXG4gICAgLyoqIEByZXR1cm4gdXNlcm5hbWUgKi9cbiAgICBnZXRMYXN0TW9kaWZpZWRCeSAoKSA6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkxBU1RfTU9ESUZJRURfQlkpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSBhIFRoZW1lIG9yIHNldCBvZiBUaGVtZXMgdG8gY29uc3RyYWluIHJlc3VsdHMuIEJ5XG4gICAgICogZGVmYXVsdCwgdmFsdWVzIGFyZSBhc3N1bWVkIHRvIGJlIHRoZW1lIGlkZW50aWZpZXJzLiBJZiB1c2luZ1xuICAgICAqIHRoZW1lIGxhYmVscyBvciB0aGVtZSB1cmlzLCBzcGVjaWZ5IHRoZSBvcHRpb25hbCBzZWNvbmQgcGFyYW1ldGVyXG4gICAgICogdG8gYmUgZWl0aGVyIFBhcmFtZXRlcnMuVEhFTUVTX0xBQkVMIG9yIFBhcmFtZXRlcnMuVEhFTUVTX1VSSVxuICAgICAqIHJlc3BlY3RpdmVseS5cbiAgICAgKiBAcGFyYW0gdGhlbWVzIC0gc3RyaW5nIG9yIGFycmF5IG9mIHN0cmluZ3MgY29udGFpbmluZyB0aGVtZSBjb25zdHJhaW50XG4gICAgICogQHBhcmFtIHBhcmFtZXRlciAtIG9wdGlvbmFsLCB0byBpbmRpY2F0ZSB0aGUgcGFyYW1ldGVyIHRvIHVzZVxuICAgICAqIEByZXR1cm4gUXVlcnlcbiAgICAgKi9cbiAgICB0aGVtZXModGhlbWVzOiBzdHJpbmd8c3RyaW5nW10sIHBhcmFtZXRlcj86c3RyaW5nKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRUaGVtZXModGhlbWVzLCBwYXJhbWV0ZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgYSBUaGVtZSBvciBzZXQgb2YgVGhlbWVzIHRvIGNvbnN0cmFpbiByZXN1bHRzLiBCeVxuICAgICAqIGRlZmF1bHQsIHZhbHVlcyBhcmUgYXNzdW1lZCB0byBiZSB0aGVtZSBpZGVudGlmaWVycy4gSWYgdXNpbmdcbiAgICAgKiB0aGVtZSBsYWJlbHMgb3IgdGhlbWUgdXJpcywgc3BlY2lmeSB0aGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlclxuICAgICAqIHRvIGJlIGVpdGhlciBQYXJhbWV0ZXJzLlRIRU1FU19MQUJFTCBvciBQYXJhbWV0ZXJzLlRIRU1FU19VUklcbiAgICAgKiByZXNwZWN0aXZlbHkuXG4gICAgICogQHBhcmFtIHRoZW1lcyAtIHRoZW1lIG9yIHRoZW1lcyB0byBjb25zdHJhaW4gYnlcbiAgICAgKi9cbiAgICBzZXRUaGVtZXMgKHRoZW1lczpzdHJpbmd8c3RyaW5nW10sIHBhcmFtZXRlcj86c3RyaW5nKSB7XG5cbiAgICAgICAgLy9jbGVhciBleGlzdGluZ1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlRIRU1FU19JRCwgbnVsbCk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVEhFTUVTX0xBQkVMLCBudWxsKTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5USEVNRVNfVVJJLCBudWxsKTtcblxuICAgICAgICBsZXQgcGFyYW0gPSBwYXJhbWV0ZXIgfHwgUGFyYW1ldGVycy5USEVNRVNfSUQ7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKHBhcmFtLCB0b0FycmF5KHRoZW1lcykpO1xuICAgIH1cblxuICAgIGdldFRoZW1lcyAoKSA6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVEhFTUVTX0lEKSB8fFxuICAgICAgICAgICAgdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5USEVNRVNfTEFCRUwpIHx8XG4gICAgICAgICAgICB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlRIRU1FU19VUkkpO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgYSBUb3BpYyBvciBzZXQgb2YgVG9waWNzIHRvIGNvbnN0cmFpbiByZXN1bHRzLiBCeVxuICAgICAqIGRlZmF1bHQsIHZhbHVlcyBhcmUgYXNzdW1lZCB0byBiZSB0aGVtZSBpZGVudGlmaWVycy4gSWYgdXNpbmdcbiAgICAgKiB0aGVtZSBsYWJlbHMgb3IgdGhlbWUgdXJpcywgc3BlY2lmeSB0aGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlclxuICAgICAqIHRvIGJlIGVpdGhlciBQYXJhbWV0ZXJzLlRPUElDX0xBQkVMIG9yIFBhcmFtZXRlcnMuVE9QSUNfVVJJXG4gICAgICogcmVzcGVjdGl2ZWx5LlxuICAgICAqIEBwYXJhbSAgdG9waWNzIC0gc3RyaW5nIG9yIGFycmF5IG9mIHN0cmluZ3MgY29udGFpbmluZyB0aGVtZSBjb25zdHJhaW50XG4gICAgICogQHBhcmFtICBwYXJhbWV0ZXIgLSBvcHRpb25hbCwgdG8gaW5kaWNhdGUgdGhlIHBhcmFtZXRlciB0byB1c2VcbiAgICAgKiBAcmV0dXJuIFF1ZXJ5IGluc3RhbmNlXG4gICAgICovXG4gICAgdG9waWNzKHRvcGljczpzdHJpbmd8c3RyaW5nW10sIHBhcmFtZXRlciA/OiBzdHJpbmcpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldFRvcGljcyh0b3BpY3MsIHBhcmFtZXRlcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSBhIFRvcGljIG9yIHNldCBvZiBUb3BpY3MgdG8gY29uc3RyYWluIHJlc3VsdHMuIEJ5XG4gICAgICogZGVmYXVsdCwgdmFsdWVzIGFyZSBhc3N1bWVkIHRvIGJlIHRoZW1lIGlkZW50aWZpZXJzLiBJZiB1c2luZ1xuICAgICAqIHRoZW1lIGxhYmVscyBvciB0aGVtZSB1cmlzLCBzcGVjaWZ5IHRoZSBvcHRpb25hbCBzZWNvbmQgcGFyYW1ldGVyXG4gICAgICogdG8gYmUgZWl0aGVyIFBhcmFtZXRlcnMuVE9QSUNfTEFCRUwgb3IgUGFyYW1ldGVycy5UT1BJQ19VUklcbiAgICAgKiByZXNwZWN0aXZlbHkuXG4gICAgICogQHBhcmFtIHRvcGljcyAtIHRoZW1lIG9yIHRvcGljcyB0byBjb25zdHJhaW4gYnlcbiAgICAgKi9cbiAgICBzZXRUb3BpY3MgKHRvcGljczpzdHJpbmd8c3RyaW5nW10sIHBhcmFtZXRlciA/OiBzdHJpbmcpIHtcblxuICAgICAgICAvL2NsZWFyIGV4aXN0aW5nXG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVE9QSUNTX0lELCBudWxsKTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5UT1BJQ1NfTEFCRUwsIG51bGwpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlRPUElDU19VUkksIG51bGwpO1xuXG4gICAgICAgIGxldCBwYXJhbSA9IHBhcmFtZXRlciB8fCBQYXJhbWV0ZXJzLlRPUElDU19JRDtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIocGFyYW0sIHRvQXJyYXkodG9waWNzKSk7XG4gICAgfVxuXG4gICAgZ2V0VG9waWNzICgpIDogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5UT1BJQ1NfSUQpIHx8XG4gICAgICAgICAgICB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlRPUElDU19MQUJFTCkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVE9QSUNTX1VSSSk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IGEgUHVibGlzaGVyIG9yIHNldCBvZiBQdWJsaXNoZXJzIHRvIGNvbnN0cmFpbiByZXN1bHRzLiBCeVxuICAgICAqIGRlZmF1bHQsIHZhbHVlcyBhcmUgYXNzdW1lZCB0byBiZSBpZGVudGlmaWVycy4gSWYgdXNpbmcgbGFiZWxzIG9yIHVyaXMsXG4gICAgICogc3BlY2lmeSB0aGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlciB0byBiZSBlaXRoZXJcbiAgICAgKiBQYXJhbWV0ZXJzLlBVQkxJU0hFUlNfTEFCRUwgb3IgUGFyYW1ldGVycy5QVUJMSVNIRVJTX1VSSSByZXNwZWN0aXZlbHkuXG4gICAgICogQHBhcmFtIHBhcmFtZXRlciAtIG9wdGlvbmFsLCB0byBpbmRpY2F0ZSB0aGUgcGFyYW1ldGVyIHRvIHVzZVxuICAgICAqIEByZXR1cm4gUXVlcnlcbiAgICAgKi9cbiAgICBwdWJsaXNoZXJzKHB1Ymxpc2hlcnM6c3RyaW5nfHN0cmluZ1tdLCBwYXJhbWV0ZXI/OnN0cmluZykgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0UHVibGlzaGVycyhwdWJsaXNoZXJzLCBwYXJhbWV0ZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IGEgUHVibGlzaGVyIG9yIHNldCBvZiBQdWJsaXNoZXJzIHRvIGNvbnN0cmFpbiByZXN1bHRzLiBCeVxuICAgICAqIGRlZmF1bHQsIHZhbHVlcyBhcmUgYXNzdW1lZCB0byBiZSBpZGVudGlmaWVycy4gSWYgdXNpbmcgbGFiZWxzIG9yIHVyaXMsXG4gICAgICogc3BlY2lmeSB0aGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlciB0byBiZSBlaXRoZXJcbiAgICAgKiBQYXJhbWV0ZXJzLlBVQkxJU0hFUlNfTEFCRUwgb3IgUGFyYW1ldGVycy5QVUJMSVNIRVJTX1VSSSByZXNwZWN0aXZlbHkuXG4gICAgICogQHBhcmFtIHB1Ymxpc2hlcnMgLSBwdWJsaXNoaW5nIG9yZ3MgdG8gY29uc3RyYWluIGJ5XG4gICAgICovXG4gICAgc2V0UHVibGlzaGVycyAocHVibGlzaGVyczpzdHJpbmd8c3RyaW5nW10sIHBhcmFtZXRlcj86c3RyaW5nKSB7XG5cbiAgICAgICAgLy9jbGVhciBleGlzdGluZ1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlBVQkxJU0hFUlNfSUQsIG51bGwpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlBVQkxJU0hFUlNfTEFCRUwsIG51bGwpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlBVQkxJU0hFUlNfVVJJLCBudWxsKTtcblxuICAgICAgICBsZXQgcGFyYW0gPSBwYXJhbWV0ZXIgfHwgUGFyYW1ldGVycy5QVUJMSVNIRVJTX0lEO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihwYXJhbSwgdG9BcnJheShwdWJsaXNoZXJzKSk7XG4gICAgfVxuXG4gICAgZ2V0UHVibGlzaGVycyAoKSA6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuUFVCTElTSEVSU19JRCkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuUFVCTElTSEVSU19MQUJFTCkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuUFVCTElTSEVSU19VUkkpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSBhIFBvaW50IG9mIENvbnRhY3Qgb3Igc2V0IG9mIENvbnRhY3RzIHRvIGNvbnN0cmFpbiByZXN1bHRzLiBCeVxuICAgICAqIGRlZmF1bHQsIHZhbHVlcyBhcmUgYXNzdW1lZCB0byBiZSBpZGVudGlmaWVycy4gSWYgdXNpbmdcbiAgICAgKiBsYWJlbHMgb3IgdXJpcywgc3BlY2lmeSB0aGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlciB0byBiZSBlaXRoZXJcbiAgICAgKiBQYXJhbWV0ZXJzLkNPTlRBQ1RTX0xBQkVMIG9yIFBhcmFtZXRlcnMuQ09OVEFDVFNfVVJJIHJlc3BlY3RpdmVseS5cbiAgICAgKiBAcGFyYW0gcGFyYW1ldGVyIC0gb3B0aW9uYWwsIHRvIGluZGljYXRlIHRoZSBwYXJhbWV0ZXIgdG8gdXNlXG4gICAgICogQHJldHVybiBRdWVyeVxuICAgICAqL1xuICAgIGNvbnRhY3RzKGNvbnRhY3RzOnN0cmluZ3xzdHJpbmdbXSwgcGFyYW1ldGVyPzpzdHJpbmcpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldENvbnRhY3RzKGNvbnRhY3RzLCBwYXJhbWV0ZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IGEgQ29udGFjdCBvciBzZXQgb2YgQ29udGFjdHMgdG8gY29uc3RyYWluIHJlc3VsdHMuIEJ5XG4gICAgICogZGVmYXVsdCwgdmFsdWVzIGFyZSBhc3N1bWVkIHRvIGJlIGlkZW50aWZpZXJzLiBJZiB1c2luZ1xuICAgICAqIGxhYmVscyBvciB1cmlzLCBzcGVjaWZ5IHRoZSBvcHRpb25hbCBzZWNvbmQgcGFyYW1ldGVyIHRvIGJlIGVpdGhlclxuICAgICAqIFBhcmFtZXRlcnMuQ09OVEFDVFNfTEFCRUwgb3IgUGFyYW1ldGVycy5DT05UQUNUU19VUkkgcmVzcGVjdGl2ZWx5LlxuICAgICAqIEBwYXJhbSBjb250YWN0cyAtIHB1Ymxpc2hpbmcgb3JncyB0byBjb25zdHJhaW4gYnlcbiAgICAgKi9cbiAgICBzZXRDb250YWN0cyAoY29udGFjdHM6c3RyaW5nfHN0cmluZ1tdLCBwYXJhbWV0ZXI/OnN0cmluZykge1xuXG4gICAgICAgIC8vY2xlYXIgZXhpc3RpbmdcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5DT05UQUNUU19JRCwgbnVsbCk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuQ09OVEFDVFNfTEFCRUwsIG51bGwpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkNPTlRBQ1RTX1VSSSwgbnVsbCk7XG5cbiAgICAgICAgbGV0IHBhcmFtID0gcGFyYW1ldGVyIHx8IFBhcmFtZXRlcnMuQ09OVEFDVFNfSUQ7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKHBhcmFtLCB0b0FycmF5KGNvbnRhY3RzKSk7XG4gICAgfVxuXG4gICAgZ2V0Q29udGFjdHMgKCkgOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkNPTlRBQ1RTX0lEKSB8fFxuICAgICAgICAgICAgdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5DT05UQUNUU19MQUJFTCkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuQ09OVEFDVFNfVVJJKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgdGhlIGlkZW50aWZpZXIgb2YgYW4gQWdlbnQgKENvbW11bml0eSwgR3JvdXAsIGV0YykgdGhhdFxuICAgICAqIHVzZXMgaXRlbXMgeW91IHdpc2ggdG8gZmluZCBpbiBzZWFyY2ggcmVzdWx0cy4gQnlcbiAgICAgKiBkZWZhdWx0LCB2YWx1ZXMgYXJlIGFzc3VtZWQgdG8gYmUgaWRlbnRpZmllcnMuIElmIHVzaW5nXG4gICAgICogbGFiZWxzIG9yIHVyaXMsIHNwZWNpZnkgdGhlIG9wdGlvbmFsIHNlY29uZCBwYXJhbWV0ZXJcbiAgICAgKiB0byBiZSBlaXRoZXIgUGFyYW1ldGVycy5VU0VEX0JZX0xBQkVMIG9yIFBhcmFtZXRlcnMuVVNFRF9CWV9VUklcbiAgICAgKiByZXNwZWN0aXZlbHkuXG4gICAgICogQHBhcmFtIHBhcmFtZXRlciAtIG9wdGlvbmFsLCB0byBpbmRpY2F0ZSB0aGUgcGFyYW1ldGVyIHRvIHVzZVxuICAgICAqIEByZXR1cm4gUXVlcnlcbiAgICAgKi9cbiAgICB1c2VkQnkoaWRzOnN0cmluZ3xzdHJpbmdbXSwgcGFyYW1ldGVyPzpzdHJpbmcpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldFVzZWRCeShpZHMsIHBhcmFtZXRlcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgdGhlIGlkZW50aWZpZXIgb2YgYW4gQWdlbnQgKENvbW11bml0eSwgR3JvdXAsIGV0YykgdGhhdFxuICAgICAqIHVzZXMgaXRlbXMgeW91IHdpc2ggdG8gZmluZCBpbiBzZWFyY2ggcmVzdWx0cy4gQnlcbiAgICAgKiBkZWZhdWx0LCB2YWx1ZXMgYXJlIGFzc3VtZWQgdG8gYmUgaWRlbnRpZmllcnMuIElmIHVzaW5nXG4gICAgICogbGFiZWxzIG9yIHVyaXMsIHNwZWNpZnkgdGhlIG9wdGlvbmFsIHNlY29uZCBwYXJhbWV0ZXJcbiAgICAgKiB0byBiZSBlaXRoZXIgUGFyYW1ldGVycy5VU0VEX0JZX0xBQkVMIG9yIFBhcmFtZXRlcnMuVVNFRF9CWV9VUklcbiAgICAgKiByZXNwZWN0aXZlbHkuXG4gICAgICogQHBhcmFtIGlkcyAtIHB1Ymxpc2hpbmcgb3JncyB0byBjb25zdHJhaW4gYnlcbiAgICAgKi9cbiAgICBzZXRVc2VkQnkgKGlkczpzdHJpbmd8c3RyaW5nW10sIHBhcmFtZXRlcj86c3RyaW5nKSB7XG5cbiAgICAgICAgLy9jbGVhciBleGlzdGluZ1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlVTRURfQllfSUQsIG51bGwpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlVTRURfQllfTEFCRUwsIG51bGwpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlVTRURfQllfVVJJLCBudWxsKTtcblxuICAgICAgICBsZXQgcGFyYW0gPSBwYXJhbWV0ZXIgfHwgUGFyYW1ldGVycy5VU0VEX0JZX0lEO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihwYXJhbSwgdG9BcnJheShpZHMpKTtcbiAgICB9XG5cbiAgICBnZXRVc2VkQnkgKCkgOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlVTRURfQllfSUQpIHx8XG4gICAgICAgICAgICB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlVTRURfQllfTEFCRUwpIHx8XG4gICAgICAgICAgICB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlVTRURfQllfVVJJKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgYSBDb25jZXB0IFNjaGVtZSBvciBzZXQgb2YgQ29uY2VwdCBTY2hlbWVzIHRvIGNvbnN0cmFpbiByZXN1bHRzLiBCeVxuICAgICAqIGRlZmF1bHQsIHZhbHVlcyBhcmUgYXNzdW1lZCB0byBiZSBpZGVudGlmaWVycy4gSWYgdXNpbmdcbiAgICAgKiBsYWJlbHMgb3IgdXJpcywgc3BlY2lmeSB0aGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlclxuICAgICAqIHRvIGJlIGVpdGhlciBQYXJhbWV0ZXJzLlNDSEVNRVNfTEFCRUwgb3IgUGFyYW1ldGVycy5TQ0hFTUVTX1VSSVxuICAgICAqIHJlc3BlY3RpdmVseS5cbiAgICAgKiBAcGFyYW0gc2NoZW1lcyAtIHNjaGVtZXMgdG8gY29uc3RyYWluIGJ5XG4gICAgICogQHBhcmFtIHBhcmFtZXRlciAtIG9wdGlvbmFsLCB0byBpbmRpY2F0ZSB0aGUgcGFyYW1ldGVyIHRvIHVzZVxuICAgICAqIEByZXR1cm4gUXVlcnlcbiAgICAgKi9cbiAgICBzY2hlbWVzKHNjaGVtZXM6c3RyaW5nfHN0cmluZ1tdLCBwYXJhbWV0ZXI/OnN0cmluZykgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0U2NoZW1lcyhzY2hlbWVzLCBwYXJhbWV0ZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IGEgQ29uY2VwdCBTY2hlbWUgb3Igc2V0IG9mIENvbmNlcHQgU2NoZW1lcyB0byBjb25zdHJhaW4gcmVzdWx0cy4gQnlcbiAgICAgKiBkZWZhdWx0LCB2YWx1ZXMgYXJlIGFzc3VtZWQgdG8gYmUgdGhlbWUgaWRlbnRpZmllcnMuIElmIHVzaW5nXG4gICAgICogdGhlbWUgbGFiZWxzIG9yIHRoZW1lIHVyaXMsIHNwZWNpZnkgdGhlIG9wdGlvbmFsIHNlY29uZCBwYXJhbWV0ZXJcbiAgICAgKiB0byBiZSBlaXRoZXIgUGFyYW1ldGVycy5TQ0hFTUVTX0xBQkVMIG9yIFBhcmFtZXRlcnMuU0NIRU1FU19VUklcbiAgICAgKiByZXNwZWN0aXZlbHkuXG4gICAgICogQHBhcmFtIHNjaGVtZXMgLSBzY2hlbWVzIHRvIGNvbnN0cmFpbiBieVxuICAgICAqIEBwYXJhbSBwYXJhbWV0ZXIgLSBvcHRpb25hbCwgdG8gaW5kaWNhdGUgdGhlIHBhcmFtZXRlciB0byB1c2VcbiAgICAgKi9cbiAgICBzZXRTY2hlbWVzIChzY2hlbWVzOnN0cmluZ3xzdHJpbmdbXSwgcGFyYW1ldGVyPzpzdHJpbmcpIHtcblxuICAgICAgICAvL2NsZWFyIGV4aXN0aW5nXG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuU0NIRU1FU19JRCwgbnVsbCk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuU0NIRU1FU19MQUJFTCwgbnVsbCk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuU0NIRU1FU19VUkksIG51bGwpO1xuXG4gICAgICAgIGxldCBwYXJhbSA9IHBhcmFtZXRlciB8fCBQYXJhbWV0ZXJzLlNDSEVNRVNfSUQ7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKHBhcmFtLCB0b0FycmF5KHNjaGVtZXMpKTtcbiAgICB9XG5cbiAgICBnZXRTY2hlbWVzKCkgOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlNDSEVNRVNfSUQpIHx8XG4gICAgICAgICAgICB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlNDSEVNRVNfTEFCRUwpIHx8XG4gICAgICAgICAgICB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlNDSEVNRVNfVVJJKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIHNlcnZpY2VUeXBlcyh0eXBlczpzdHJpbmd8c3RyaW5nW10pIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldFNlcnZpY2VUeXBlcyh0eXBlcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB0eXBlcyAtIGlkc1xuICAgICAqL1xuICAgIHNldFNlcnZpY2VUeXBlcyAodHlwZXM6c3RyaW5nfHN0cmluZ1tdKSB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuU0VSVklDRV9UWVBFUywgdG9BcnJheSh0eXBlcykpO1xuICAgIH1cblxuICAgIGdldFNlcnZpY2VUeXBlcyAoKSA6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuU0VSVklDRV9UWVBFUyk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICB2aXNpYmlsaXR5KHZpczpcInB1YmxpY1wifFwicHJpdmF0ZVwiKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRWaXNpYmlsaXR5KHZpcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB2aXNpYmlsaXR5IC0gb25lIG9mICdwdWJsaWMnIG9yICdwcml2YXRlJ1xuICAgICAqL1xuICAgIHNldFZpc2liaWxpdHkgKHZpc2liaWxpdHkgOiBcInB1YmxpY1wifFwicHJpdmF0ZVwiKSB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVklTSUJJTElUWSwgdmlzaWJpbGl0eSk7XG4gICAgfVxuXG4gICAgZ2V0VmlzaWJpbGl0eSAoKSA6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlZJU0lCSUxJVFkpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgc3RhdHVzKHZhbHVlIDogc3RyaW5nKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0dXModmFsdWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc3RhdHVzIC0gY3VycmVudCBzdGF0dXMgb2YgSXRlbVxuICAgICAqL1xuICAgIHNldFN0YXR1cyAodmFsdWUgOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5TVEFUVVMsIHZhbHVlKTtcbiAgICB9XG5cbiAgICBnZXRTdGF0dXMgKCkgOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5TVEFUVVMpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgZXh0ZW50KGJib3ggOiBhbnkpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldEV4dGVudChiYm94KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGJib3ggLSBzdHJpbmcgZm9ybSBvZiBcIm1pbngsbWlueSxtYXh4LG1heHlcIiwgb3IgTC5MYXRMbmdCb3VuZHMsIG9yIEFycmF5XG4gICAgICovXG4gICAgc2V0RXh0ZW50IChiYm94IDogYW55KSB7XG4gICAgICAgIGlmKGJib3gpIHtcbiAgICAgICAgICAgIGlmKHR5cGVvZihiYm94LnRvQmJveFN0cmluZykgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgLy9MZWFmbGV0IEJvdW5kcyBpbnN0YW5jZVxuICAgICAgICAgICAgICAgIGJib3ggPSBiYm94LnRvQmJveFN0cmluZygpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYodHlwZW9mKGJib3gucHVzaCkgIT09ICd1bmRlZmluZWQnICYmIGJib3gubGVuZ3RoICYmXG4gICAgICAgICAgICAgICAgLy9OZXN0ZWQgYXJyYXkgKGFsdGVybmF0ZSBMZWFmbGV0IHJlcHJlc2VudGF0aW9uKTpcbiAgICAgICAgICAgICAgICAvLyBbIFttaW5MYXQsbWluTG9uZ10sIFttYXhMYXQsbWF4TG9uZ10gXVxuICAgICAgICAgICAgICAgIHR5cGVvZihiYm94WzBdLnB1c2gpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGJib3ggPSBiYm94WzBdWzFdKycsJytiYm94WzBdWzBdKycsJytiYm94WzFdWzFdKycsJytiYm94WzFdWzBdO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYodHlwZW9mKGJib3gpID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGlmKCFCQk9YX1JFR0VYLnRlc3QoYmJveCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBhcmd1bWVudDogYmJveCBzdHJpbmcgbXVzdCBiZSBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBcImluIGZvcm0gb2YgJ21pbngsbWlueSxtYXh4LG1heHknXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBhcmd1bWVudDogYmJveCBtdXN0IGJlIG9uZSBvZiBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwiTGVhZmxldC5Cb3VuZHMsIG5lc3RlZCBhcnJheSwgb3IgYmJveCBzdHJpbmdcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5FWFRFTlQsIGJib3gpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4gYmJveCBzdHJpbmcgb3IgbnVsbCBpZiBub3Qgc2V0XG4gICAgICovXG4gICAgZ2V0RXh0ZW50ICgpIDogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuRVhURU5UKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIEV4LlxuICAgICAqICBjb25zdCB7IEtHQ2xhc3NpZmllcnMsIFF1ZXJ5IH0gZnJvbSAnZ2VvcGxhdGZvcm0uY2xpZW50JztcbiAgICAgKiAgbGV0IHB1cnBvc2VJZCA9ICcuLi4nO1xuICAgICAqICBsZXQgcXVlcnkgPSBuZXcgUXVlcnkoKTtcbiAgICAgKiAgcXVlcnkuY2xhc3NpZmllciggS0dDbGFzc2lmaWVycy5QVVJQT1NFLCBwdXJwb3NlSWQgKTtcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjbGFzc2lmaWVyIC0gc3RyaW5nIG5hbWUgb2YgY2xhc3NpZmllciB0byB1c2VcbiAgICAgKiBAcGFyYW0gdmFsdWUgLSBpZCBvciBhcnJheSBvZiBpZHMgb2YgY29uY2VwdHMgdG8gdXNlXG4gICAgICogQHJldHVybiBRdWVyeVxuICAgICAqL1xuICAgIGNsYXNzaWZpZXIoY2xhc3NpZmllciA6IHN0cmluZywgdmFsdWUgOiBzdHJpbmd8c3RyaW5nW10pIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldENsYXNzaWZpZXIoY2xhc3NpZmllciwgdmFsdWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeC5cbiAgICAgKiAgY29uc3QgeyBLR0NsYXNzaWZpZXJzLCBRdWVyeSB9IGZyb20gJ2dlb3BsYXRmb3JtLmNsaWVudCc7XG4gICAgICogIGxldCBwdXJwb3NlSWQgPSAnLi4uJztcbiAgICAgKiAgbGV0IHF1ZXJ5ID0gbmV3IFF1ZXJ5KCk7XG4gICAgICogIHF1ZXJ5LnNldENsYXNzaWZpZXIoIEtHQ2xhc3NpZmllcnMuUFVSUE9TRSwgcHVycG9zZUlkICk7XG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2xhc3NpZmllciAtIHN0cmluZyBuYW1lIG9mIGNsYXNzaWZpZXIgdG8gdXNlXG4gICAgICogQHBhcmFtIHZhbHVlIC0gaWQgb3IgYXJyYXkgb2YgaWRzIG9mIGNvbmNlcHRzIHRvIHVzZVxuICAgICAqL1xuICAgIHNldENsYXNzaWZpZXIoY2xhc3NpZmllciA6IHN0cmluZywgdmFsdWUgOiBzdHJpbmd8c3RyaW5nW10pIHtcbiAgICAgICAgbGV0IGNsYXNzaWZpZXJzID0gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5DTEFTU0lGSUVSUykgfHwge307XG4gICAgICAgIGNsYXNzaWZpZXJzW2NsYXNzaWZpZXJdID0gdG9BcnJheSh2YWx1ZSk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuQ0xBU1NJRklFUlMsIGNsYXNzaWZpZXJzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gY2xhc3NpZmllciAtIG5hbWUgb2YgY2xhc3NpZmllciBjb25zdHJhaW50IGluIHVzZVxuICAgICAqIEByZXR1cm4gYXJyYXkgb2YgY29uY2VwdCBpZHNcbiAgICAgKi9cbiAgICBnZXRDbGFzc2lmaWVyKGNsYXNzaWZpZXIgOiBzdHJpbmcpIDogc3RyaW5nW10ge1xuICAgICAgICBsZXQgY2xhc3NpZmllcnMgPSB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkNMQVNTSUZJRVJTKSB8fCB7fTtcbiAgICAgICAgcmV0dXJuIGNsYXNzaWZpZXJzW2NsYXNzaWZpZXJdIHx8IFtdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV4LlxuICAgICAqICBjb25zdCB7IEtHQ2xhc3NpZmllcnMsIFF1ZXJ5IH0gZnJvbSAnZ2VvcGxhdGZvcm0uY2xpZW50JztcbiAgICAgKiAgbGV0IHB1cnBvc2VJZCA9ICcuLi4nLFxuICAgICAqICAgICAgZnVuY3Rpb25JZHMgPSBbJy4uLicsJy4uLiddO1xuICAgICAqICBsZXQgcXVlcnkgPSBuZXcgUXVlcnkoKTtcbiAgICAgKiAgcXVlcnkuY2xhc3NpZmllcnMoe1xuICAgICAqICAgICAgIEtHQ2xhc3NpZmllcnMuUFVSUE9TRTogcHVycG9zZUlkLFxuICAgICAqICAgICAgIEtHQ2xhc3NpZmllcnMuRlVOQ1RJT046IGZ1bmN0aW9uSWRzXG4gICAgICogIH0pO1xuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlIC0gb2JqZWN0IGRlZmluaW5nIGNsYXNzaWZpZXJzXG4gICAgICogQHJldHVybiBRdWVyeSBpbnN0YW5jZVxuICAgICAqL1xuICAgIGNsYXNzaWZpZXJzKHZhbHVlIDogYW55KSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRDbGFzc2lmaWVycyh2YWx1ZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB2YWx1ZSAtIG9iamVjdCBkZWZpbmluZyBjbGFzc2lmaWVyc1xuICAgICAqL1xuICAgIHNldENsYXNzaWZpZXJzICh2YWx1ZSA6IGFueSkge1xuICAgICAgICBpZighdmFsdWUgfHwgdHlwZW9mKHZhbHVlKSAhPT0gJ29iamVjdCcgfHwgQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuQ0xBU1NJRklFUlMsIG51bGwpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNsYXNzZXMgPSBPYmplY3Qua2V5cyhDbGFzc2lmaWVycykubWFwKGs9PkNsYXNzaWZpZXJzW2tdKTtcbiAgICAgICAgbGV0IGNsYXNzaWZpZXJzID0gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5DTEFTU0lGSUVSUykgfHwge307XG4gICAgICAgIE9iamVjdC5rZXlzKHZhbHVlKS5mb3JFYWNoKCBjbGFzc2lmaWVyID0+IHtcbiAgICAgICAgICAgIGlmKH5jbGFzc2VzLmluZGV4T2YoY2xhc3NpZmllcikpIHtcbiAgICAgICAgICAgICAgICBjbGFzc2lmaWVyc1tjbGFzc2lmaWVyXSA9IHRvQXJyYXkodmFsdWVbY2xhc3NpZmllcl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5DTEFTU0lGSUVSUywgY2xhc3NpZmllcnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4gY2xhc3NpZmllcnMgdXNlZCBpbiB0aGUgcXVlcnlcbiAgICAgKi9cbiAgICBnZXRDbGFzc2lmaWVycyAoKSA6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkNMQVNTSUZJRVJTKSB8fCBudWxsO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgbW9kaWZpZWQoZGF0ZSA6IG51bWJlcnxEYXRlLCBiZWZvcmVPckFmdGVyIDogYm9vbGVhbikgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0TW9kaWZpZWQoZGF0ZSwgYmVmb3JlT3JBZnRlcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBkYXRlIC0gZGF0ZSB0byBjb21wYXJlIGFnYWluc3RcbiAgICAgKiBAcGFyYW0gYmVmb3JlT3JBZnRlciAtIGZsYWcgc3BlY2lmeWluZyB3aGljaCBib3VuZGFyeSBjb25kaXRpb24gKHRydWUgPSBiZWZvcmUsIGZhbHNlID0gYWZ0ZXIpIGZsYWcgc3BlY2lmeWluZyB3aGV0aGVyIHRvIHRyaWdnZXIgdXBkYXRlIGF1dG9tYXRpY2FsbHlcbiAgICAgKi9cbiAgICBzZXRNb2RpZmllZCAoZGF0ZSA6IG51bWJlcnxEYXRlLCBiZWZvcmVPckFmdGVyOmJvb2xlYW4pIHtcblxuICAgICAgICAvL2lmIG5vIGRhdGUgd2FzIHN1cHBsaWVkLCBjb25zaWRlciBpdCBcInVuc2V0XCIgZm9yIGJvdGggcHJvcGVydGllc1xuICAgICAgICBpZighZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5NT0RJRklFRF9CRUZPUkUsIG51bGwpO1xuICAgICAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5NT0RJRklFRF9BRlRFUiwgbnVsbCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZighKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSlcbiAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlIGFzIG51bWJlcik7XG5cbiAgICAgICAgbGV0IGRpciA9IGJlZm9yZU9yQWZ0ZXIgJiYgKGJlZm9yZU9yQWZ0ZXIgPT09IHRydWUgfHwgYmVmb3JlT3JBZnRlciA9PT0gXCJ0cnVlXCIpO1xuICAgICAgICBsZXQgcHJvcCA9IGRpciA/IFBhcmFtZXRlcnMuTU9ESUZJRURfQkVGT1JFIDogUGFyYW1ldGVycy5NT0RJRklFRF9BRlRFUjsgICAgICAgLy9wcm9wZXJ0eSBiZWluZyBzZXRcbiAgICAgICAgbGV0IG9wcFByb3AgPSBkaXIgPyBQYXJhbWV0ZXJzLk1PRElGSUVEX0FGVEVSIDogUGFyYW1ldGVycy5NT0RJRklFRF9CRUZPUkU7ICAgIC8vdW5zZXQgb3Bwb3NpdGUgcHJvcGVydHlcbiAgICAgICAgbGV0IGFyZyA9IChkYXRlICYmIGRhdGUuZ2V0VGltZSkgPyBkYXRlLmdldFRpbWUoKSA6IGRhdGU7XG5cbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIob3BwUHJvcCwgbnVsbCk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKHByb3AsIGFyZyk7XG4gICAgfVxuXG4gICAgZ2V0TW9kaWZpZWQgKCkgOiBEYXRlIHtcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5NT0RJRklFRF9CRUZPUkUpIHx8XG4gICAgICAgICAgICB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLk1PRElGSUVEX0FGVEVSKTtcbiAgICAgICAgaWYodmFsdWUgJiYgdHlwZW9mKHZhbHVlKSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHZhbHVlID0gbmV3IERhdGUodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIGNyZWF0ZWQoZGF0ZSA6IG51bWJlcnxEYXRlLCBiZWZvcmVPckFmdGVyOmJvb2xlYW4pIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldENyZWF0ZWQoZGF0ZSwgYmVmb3JlT3JBZnRlcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBkYXRlIC0gZGF0ZSB0byBjb21wYXJlIGFnYWluc3RcbiAgICAgKiBAcGFyYW0gYmVmb3JlT3JBZnRlciAtIGZsYWcgc3BlY2lmeWluZyB3aGljaCBib3VuZGFyeSBjb25kaXRpb24gKHRydWUgPSBiZWZvcmUsIGZhbHNlID0gYWZ0ZXIpIGZsYWcgc3BlY2lmeWluZyB3aGV0aGVyIHRvIHRyaWdnZXIgdXBkYXRlIGF1dG9tYXRpY2FsbHlcbiAgICAgKi9cbiAgICBzZXRDcmVhdGVkIChkYXRlIDogbnVtYmVyfERhdGUsIGJlZm9yZU9yQWZ0ZXI6Ym9vbGVhbikge1xuXG4gICAgICAgIC8vaWYgbm8gZGF0ZSB3YXMgc3VwcGxpZWQsIGNvbnNpZGVyIGl0IFwidW5zZXRcIiBmb3IgYm90aCBwcm9wZXJ0aWVzXG4gICAgICAgIGlmKCFkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkNSRUFURURfQkVGT1JFLCBudWxsKTtcbiAgICAgICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuQ1JFQVRFRF9BRlRFUiwgbnVsbCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZighKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSlcbiAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlIGFzIG51bWJlcik7XG5cbiAgICAgICAgbGV0IGRpciA9IGJlZm9yZU9yQWZ0ZXIgJiYgKGJlZm9yZU9yQWZ0ZXIgPT09IHRydWUgfHwgYmVmb3JlT3JBZnRlciA9PT0gXCJ0cnVlXCIpO1xuICAgICAgICBsZXQgcHJvcCA9IGRpciA/IFBhcmFtZXRlcnMuQ1JFQVRFRF9CRUZPUkUgOiBQYXJhbWV0ZXJzLkNSRUFURURfQUZURVI7ICAgICAgIC8vcHJvcGVydHkgYmVpbmcgc2V0XG4gICAgICAgIGxldCBvcHBQcm9wID0gZGlyID8gUGFyYW1ldGVycy5DUkVBVEVEX0FGVEVSIDogUGFyYW1ldGVycy5DUkVBVEVEX0JFRk9SRTsgICAgLy91bnNldCBvcHBvc2l0ZSBwcm9wZXJ0eVxuICAgICAgICBsZXQgYXJnID0gKGRhdGUgJiYgZGF0ZS5nZXRUaW1lKSA/IGRhdGUuZ2V0VGltZSgpIDogZGF0ZTtcblxuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihvcHBQcm9wLCBudWxsKTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIocHJvcCwgYXJnKTtcbiAgICB9XG5cbiAgICBnZXRDcmVhdGVkICgpIDogRGF0ZSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuQ1JFQVRFRF9CRUZPUkUpIHx8XG4gICAgICAgICAgICB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkNSRUFURURfQUZURVIpO1xuICAgICAgICBpZih2YWx1ZSAmJiB0eXBlb2YodmFsdWUpID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdmFsdWUgPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgYmVnaW5zKGRhdGUgOiBudW1iZXJ8RGF0ZSkgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0QmVnaW5EYXRlKGRhdGUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRCZWdpbkRhdGUgKGRhdGUgOiBudW1iZXJ8RGF0ZSkge1xuICAgICAgICBpZihkYXRlICYmIGRhdGUgaW5zdGFuY2VvZiBEYXRlKVxuICAgICAgICAgICAgZGF0ZSA9IGRhdGUuZ2V0VGltZSgpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkJFR0lOUywgZGF0ZSk7XG4gICAgfVxuXG4gICAgZ2V0QmVnaW5EYXRlICgpIDogRGF0ZSB7XG4gICAgICAgIGxldCBkYXRlID0gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5CRUdJTlMpO1xuICAgICAgICBpZihkYXRlKSBkYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgZW5kcyhkYXRlIDogbnVtYmVyfERhdGUpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldEVuZERhdGUoZGF0ZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldEVuZERhdGUgKGRhdGU6IG51bWJlcnxEYXRlKSB7XG4gICAgICAgIGlmKGRhdGUgJiYgZGF0ZSBpbnN0YW5jZW9mIERhdGUpXG4gICAgICAgICAgICBkYXRlID0gZGF0ZS5nZXRUaW1lKCk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuRU5EUywgZGF0ZSk7XG4gICAgfVxuXG4gICAgZ2V0RW5kRGF0ZSAoKSA6IERhdGUge1xuICAgICAgICBsZXQgZGF0ZSA9IHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuRU5EUyk7XG4gICAgICAgIGlmKGRhdGUpIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICBiZXR3ZWVuKGJlZ2luIDogbnVtYmVyfERhdGUsIGVuZCA6IG51bWJlcnxEYXRlKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRCZXR3ZWVuKGJlZ2luLCBlbmQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRCZXR3ZWVuKGJlZ2luIDogbnVtYmVyfERhdGUsIGVuZCA6IG51bWJlcnxEYXRlKSB7XG4gICAgICAgIHRoaXMuYmVnaW5zKGJlZ2luKTtcbiAgICAgICAgdGhpcy5lbmRzKGVuZCk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICByZXNvdXJjZVR5cGVzKHR5cGVzOiBzdHJpbmd8c3RyaW5nW10pIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldFJlc291cmNlVHlwZXModHlwZXMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRSZXNvdXJjZVR5cGVzKHR5cGVzOiBzdHJpbmd8c3RyaW5nW10pIHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5SRVNPVVJDRV9UWVBFLCB0b0FycmF5KHR5cGVzKSk7XG4gICAgfVxuXG4gICAgZ2V0UmVzb3VyY2VUeXBlcygpIDogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5SRVNPVVJDRV9UWVBFKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIGZhY2V0cyhuYW1lcyA6IHN0cmluZ3xzdHJpbmdbXSkgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0RmFjZXRzKG5hbWVzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBAcGFyYW0gbmFtZXMgLSBuYW1lcyBvZiBmYWNldHNcbiAgICAgKi9cbiAgICBzZXRGYWNldHMgKG5hbWVzOiBzdHJpbmd8c3RyaW5nW10pIHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5GQUNFVFMsIHRvQXJyYXkobmFtZXMpKTtcbiAgICB9XG5cbiAgICBnZXRGYWNldHMoKSA6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuRkFDRVRTKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbmFtZSAtIG5hbWUgb2YgZmFjZXQgdG8gYWRkXG4gICAgICovXG4gICAgYWRkRmFjZXQobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGxldCBmYWNldHMgPSB0aGlzLmdldEZhY2V0cygpIHx8IFtdO1xuICAgICAgICBmYWNldHMucHVzaChuYW1lKTtcbiAgICAgICAgdGhpcy5zZXRGYWNldHMoZmFjZXRzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbmFtZSAtIG5hbWUgb2YgZmFjZXQgdG8gcmVtb3ZlXG4gICAgICovXG4gICAgcmVtb3ZlRmFjZXQobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGxldCBmYWNldHMgPSB0aGlzLmdldEZhY2V0cygpIHx8IFtdO1xuICAgICAgICBsZXQgaWR4ID0gZmFjZXRzLmluZGV4T2YobmFtZSk7XG4gICAgICAgIGlmKGlkeD49MCkge1xuICAgICAgICAgICAgZmFjZXRzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgdGhpcy5zZXRGYWNldHMoZmFjZXRzKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgZmllbGRzKGZpZWxkczogc3RyaW5nfHN0cmluZ1tdKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRGaWVsZHMoZmllbGRzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGZpZWxkcyAtIGxpc3Qgb2YgZmllbGQgbmFtZXMgdG8gcmVxdWVzdCBmb3IgZWFjaCBzZWFyY2ggcmVzdWx0XG4gICAgICovXG4gICAgc2V0RmllbGRzIChmaWVsZHM6IHN0cmluZ3xzdHJpbmdbXSkge1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkZJRUxEUywgdG9BcnJheShmaWVsZHMpKTtcbiAgICB9XG5cbiAgICBnZXRGaWVsZHMoKSA6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuRklFTERTKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZmllbGQgLSBuYW1lIG9mIGZpZWxkIHRvIHJlbW92ZVxuICAgICAqL1xuICAgIGFkZEZpZWxkKGZpZWxkOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGZpZWxkcyA9IHRoaXMuZ2V0RmllbGRzKCkgfHwgW107XG4gICAgICAgIGZpZWxkcy5wdXNoKGZpZWxkKTtcbiAgICAgICAgdGhpcy5zZXRGaWVsZHMoZmllbGRzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZmllbGQgLSBuYW1lIG9mIGZpZWxkIHRvIHJlbW92ZVxuICAgICAqL1xuICAgIHJlbW92ZUZpZWxkKGZpZWxkOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGZpZWxkcyA9IHRoaXMuZ2V0RmllbGRzKCkgfHwgW107XG4gICAgICAgIGxldCBpZHggPSBmaWVsZHMuaW5kZXhPZihmaWVsZCk7XG4gICAgICAgIGlmKGlkeD49MCkge1xuICAgICAgICAgICAgZmllbGRzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgdGhpcy5zZXRGaWVsZHMoZmllbGRzKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gcGFnZSAtIHBhZ2Ugb2YgcmVzdWx0cyB0byBmZXRjaFxuICAgICAqL1xuICAgIHBhZ2UgKHBhZ2U6IG51bWJlcikgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0UGFnZShwYWdlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0UGFnZShwYWdlOiBudW1iZXIpIHtcbiAgICAgICAgaWYoaXNOYU4ocGFnZSkgfHwgcGFnZSoxPDApIHJldHVybjtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5QQUdFLCBwYWdlKjEpO1xuICAgIH1cblxuICAgIGdldFBhZ2UoKSA6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlBBR0UpO1xuICAgIH1cblxuICAgIG5leHRQYWdlKCkgOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRQYWdlKHRoaXMuZ2V0UGFnZSgpKzEpO1xuICAgIH1cblxuICAgIHByZXZpb3VzUGFnZSgpIDogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0UGFnZSh0aGlzLmdldFBhZ2UoKS0xKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBzaXplIC0gcGFnZSBzaXplIHRvIHJlcXVlc3RcbiAgICAgKi9cbiAgICBwYWdlU2l6ZSAoc2l6ZTogbnVtYmVyKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRQYWdlU2l6ZShzaXplKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0UGFnZVNpemUgKHNpemU6IG51bWJlcikge1xuICAgICAgICBpZihpc05hTihzaXplKSB8fCBzaXplKjE8MCkgcmV0dXJuO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlBBR0VfU0laRSwgc2l6ZSoxKTtcbiAgICB9XG5cbiAgICBnZXRQYWdlU2l6ZSgpIDogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuUEFHRV9TSVpFKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBzb3J0IC0gZm9ybSBvZiA8ZmllbGQ+LDxkaXI+IG9yIGp1c3QgZmllbGQgbmFtZVxuICAgICAqIEBwYXJhbSBvcmRlciAtIG9wdGlvbmFsLCBlaXRoZXIgJ2FzYycgb3IgJ2Rlc2MnXG4gICAgICovXG4gICAgc29ydCAoc29ydDogc3RyaW5nLCBvcmRlcj86c3RyaW5nKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRTb3J0KHNvcnQsIG9yZGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHNvcnQgLSBmb3JtIG9mIDxmaWVsZD4sPGRpcj4gb3IganVzdCBmaWVsZCBuYW1lXG4gICAgICogQHBhcmFtIG9yZGVyIC0gb3B0aW9uYWwsIGVpdGhlciAnYXNjJyBvciAnZGVzYydcbiAgICAgKi9cbiAgICAgc2V0U29ydChzb3J0OiBzdHJpbmcsIG9yZGVyPzpzdHJpbmcpIHtcbiAgICAgICAgIG9yZGVyID0gb3JkZXIgfHwgJ2Rlc2MnO1xuICAgICAgICAgaWYoc29ydCAmJiBzb3J0LmluZGV4T2YoJywnKTwwKVxuICAgICAgICAgICAgc29ydCA9IHNvcnQgKyAnLCcgKyBvcmRlcjtcbiAgICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuU09SVCwgc29ydCk7XG4gICAgfVxuXG4gICAgZ2V0U29ydCgpIDogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuU09SVCk7XG4gICAgfVxuXG4gICAgZ2V0U29ydEZpZWxkKCkgOiBzdHJpbmcgfCBudWxsIHtcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5nZXRTb3J0KCk7XG4gICAgICAgIHJldHVybiB2YWx1ZSAmJiB2YWx1ZS5sZW5ndGggPyB2YWx1ZS5zcGxpdCgnLCcpWzBdIDogbnVsbDtcbiAgICB9XG5cbiAgICBnZXRTb3J0T3JkZXIoKSA6IHN0cmluZyB8IG51bGwge1xuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLmdldFNvcnQoKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlICYmIHZhbHVlLmxlbmd0aCA/IHZhbHVlLnNwbGl0KCcsJylbMV0gOiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4gbGlzdCBvZiBrZXktdmFsdWUgcGFpcnMgb2Ygc29ydCBvcHRpb25zXG4gICAgICovXG4gICAgZ2V0U29ydE9wdGlvbnMoKSA6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgfVtdIHtcbiAgICAgICAgcmV0dXJuIFNPUlRfT1BUSU9OU19ERUZBVUxULnNsaWNlKDApO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBjbGVhciAoKSB7XG4gICAgICAgIHRoaXMucXVlcnkgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMuZGVmYXVsdFF1ZXJ5KSk7XG4gICAgfVxufVxuXG5leHBvcnQge1xuICAgIFF1ZXJ5IGFzIGRlZmF1bHQsXG4gICAgUXVlcnksXG4gICAgRmllbGRzLFxuICAgIEZhY2V0c1xufTtcbiJdfQ==