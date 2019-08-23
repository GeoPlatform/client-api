import Parameters from './parameters';
import Classifiers from './classifiers';
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
const SORT_OPTIONS_DEFAULT = [
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
        return SORT_OPTIONS_DEFAULT.slice(0);
    }
    // -----------------------------------------------------------
    /**
     *
     */
    clear() {
        this.query = JSON.parse(JSON.stringify(this.defaultQuery));
    }
}
export { Query as default, Query, Fields, Facets };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50LyIsInNvdXJjZXMiOlsic2hhcmVkL3F1ZXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sVUFBVSxNQUFNLGNBQWMsQ0FBQztBQUN0QyxPQUFPLFdBQVcsTUFBTSxlQUFlLENBQUM7QUFJeEMsTUFBTSxNQUFNLEdBQWlCO0lBQ3pCLGFBQWEsRUFBUyxRQUFRO0lBQzlCLGdCQUFnQixFQUFNLGlCQUFpQjtJQUN2QyxXQUFXLEVBQVcsYUFBYTtJQUNuQyxXQUFXLEVBQVcsYUFBYTtJQUNuQyxjQUFjLEVBQVEsUUFBUTtJQUM5QixRQUFRLEVBQWMsVUFBVTtJQUNoQyxPQUFPLEVBQWUsU0FBUztJQUMvQixVQUFVLEVBQVksV0FBVztJQUNqQyxRQUFRLEVBQWMsVUFBVTtJQUNoQyxXQUFXLEVBQVcsYUFBYTtJQUNuQyxhQUFhLEVBQVMsZUFBZTtJQUNyQyxNQUFNLEVBQWdCLFFBQVE7SUFDOUIsYUFBYSxFQUFTLE9BQU87SUFDN0IsSUFBSSxFQUFrQixNQUFNO0lBQzVCLFdBQVcsRUFBVyxhQUFhO0lBQ25DLFFBQVEsRUFBYyxVQUFVO0lBQ2hDLEtBQUssRUFBaUIsT0FBTztJQUM3QixnQkFBZ0IsRUFBTSxnQkFBZ0I7SUFDdEMsTUFBTSxFQUFnQixRQUFRO0lBQzlCLFVBQVUsRUFBWSxXQUFXO0lBQ2pDLFVBQVUsRUFBWSxXQUFXO0lBQ2pDLE1BQU0sRUFBZ0IsUUFBUTtJQUM5QixRQUFRLEVBQWMsVUFBVTtJQUNoQyxZQUFZLEVBQVUsYUFBYTtJQUNuQyxVQUFVLEVBQVksWUFBWTtJQUNsQyxjQUFjLEVBQVEsZUFBZTtJQUNyQyxZQUFZLEVBQVUsYUFBYTtJQUNuQyxRQUFRLEVBQWMsVUFBVTtJQUNoQyxPQUFPLEVBQWUsU0FBUztJQUMvQixVQUFVLEVBQVksWUFBWTtJQUNsQyxNQUFNLEVBQWdCLFFBQVE7SUFDOUIsVUFBVSxFQUFZLFdBQVc7SUFDakMsUUFBUSxFQUFjLFVBQVU7SUFDaEMsTUFBTSxFQUFnQixRQUFRO0lBQzlCLFNBQVMsRUFBYSxXQUFXO0lBQ2pDLE1BQU0sRUFBZ0IsUUFBUTtJQUM5QixPQUFPLEVBQWUsUUFBUTtJQUM5QixVQUFVLEVBQVksWUFBWTtJQUNsQyxZQUFZLEVBQVUsYUFBYTtDQUN0QyxDQUFDO0FBRUYsTUFBTSxjQUFjLEdBQWM7SUFDOUIsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxVQUFVO0lBQ2xELE1BQU0sQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsV0FBVztDQUN2RCxDQUFDO0FBRUYsK0RBQStEO0FBRS9ELE1BQU0sTUFBTSxHQUFpQjtJQUN6QixnQkFBZ0IsRUFBTSxpQkFBaUI7SUFDdkMsZUFBZSxFQUFPLFNBQVM7SUFDL0IsVUFBVSxFQUFZLFdBQVc7SUFDakMsSUFBSSxFQUFrQixNQUFNO0lBQzVCLFdBQVcsRUFBVyxhQUFhO0lBQ25DLFVBQVUsRUFBWSxXQUFXO0lBQ2pDLFVBQVUsRUFBWSxXQUFXO0lBQ2pDLEtBQUssRUFBaUIsT0FBTztJQUM3QixNQUFNLEVBQWdCLFFBQVE7SUFDOUIsVUFBVSxFQUFZLFlBQVk7SUFDbEMsUUFBUSxFQUFjLFVBQVU7SUFDaEMsV0FBVyxFQUFXLGFBQWE7SUFDbkMsYUFBYSxFQUFTLGNBQWM7SUFDcEMsS0FBSyxFQUFpQixPQUFPO0lBQzdCLE1BQU0sRUFBZ0IsUUFBUTtJQUM5QixNQUFNLEVBQWdCLFFBQVE7SUFDOUIsTUFBTSxFQUFnQixRQUFRO0lBQzlCLEtBQUssRUFBaUIsTUFBTTtJQUM1QixPQUFPLEVBQWUsUUFBUTtJQUM5QixLQUFLLEVBQWlCLE9BQU87SUFDN0IsVUFBVSxFQUFZLFlBQVk7Q0FDckMsQ0FBQztBQUVGLE1BQU0sY0FBYyxHQUFjO0lBQzlCLE1BQU0sQ0FBQyxLQUFLO0lBQ1osTUFBTSxDQUFDLFVBQVU7SUFDakIsTUFBTSxDQUFDLGFBQWE7SUFDcEIsTUFBTSxDQUFDLGVBQWU7SUFDdEIsTUFBTSxDQUFDLFVBQVU7SUFDakIsTUFBTSxDQUFDLFVBQVU7Q0FDcEIsQ0FBQztBQUdGOzs7OztHQUtHO0FBQ0gsTUFBTSxZQUFZLEdBQWlCLEVBQUUsQ0FBQztBQUN0QyxZQUFZLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFhLFVBQVUsQ0FBQyxLQUFLLENBQUM7QUFDeEQsWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBWSxVQUFVLENBQUMsU0FBUyxDQUFDO0FBQzVELFlBQVksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQVksVUFBVSxDQUFDLFNBQVMsQ0FBQztBQUM1RCxZQUFZLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFRLFVBQVUsQ0FBQyxhQUFhLENBQUM7QUFDaEUsWUFBWSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBVSxVQUFVLENBQUMsV0FBVyxDQUFDO0FBQzlELFlBQVksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQztBQUM3RCxZQUFZLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFXLFVBQVUsQ0FBQyxVQUFVLENBQUM7QUFJN0QsK0RBQStEO0FBRy9ELE1BQU0sb0JBQW9CLEdBQXlDO0lBQy9ELEVBQUUsS0FBSyxFQUFDLFdBQVcsRUFBUSxLQUFLLEVBQUUsWUFBWSxFQUFlO0lBQzdELEVBQUUsS0FBSyxFQUFDLFlBQVksRUFBTyxLQUFLLEVBQUUsWUFBWSxFQUFlO0lBQzdELEVBQUUsS0FBSyxFQUFDLFVBQVUsRUFBUyxLQUFLLEVBQUUsWUFBWSxFQUFlO0lBQzdELEVBQUUsS0FBSyxFQUFDLFdBQVcsRUFBUSxLQUFLLEVBQUUsWUFBWSxFQUFlO0lBQzdELEVBQUUsS0FBSyxFQUFDLGVBQWUsRUFBSSxLQUFLLEVBQUUsd0JBQXdCLEVBQUc7SUFDN0QsRUFBRSxLQUFLLEVBQUMsY0FBYyxFQUFLLEtBQUssRUFBRSx5QkFBeUIsRUFBRTtJQUM3RCxFQUFFLEtBQUssRUFBQyxhQUFhLEVBQU0sS0FBSyxFQUFFLFdBQVcsRUFBZ0I7Q0FDaEUsQ0FBQztBQUdGLE1BQU0sVUFBVSxHQUFHLCtEQUErRCxDQUFDO0FBR25GLFNBQVMsT0FBTyxDQUFDLEtBQVc7SUFDeEIsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ25CLDJDQUEyQztJQUMzQyxJQUFHLE1BQU0sS0FBSyxJQUFJLElBQUksT0FBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxXQUFXO1FBQUUsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0UsNkNBQTZDO0lBQzdDLElBQUcsTUFBTSxLQUFLLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNO1FBQUUsTUFBTSxHQUFHLElBQUksQ0FBQztJQUNwRCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBSUQ7Ozs7O0dBS0c7QUFDSCxNQUFNLEtBQUs7SUFLUDs7T0FFRztJQUNILFlBQVksT0FBbUI7UUFDM0IsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFHLENBQUM7UUFDeEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN4RCxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxlQUFlLENBQUM7UUFDaEUsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFFLElBQUcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxRQUFRLEVBQUU7WUFDNUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNuRCxPQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUM7U0FDM0I7UUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUMzRCxJQUFHLE9BQU8sRUFBRTtZQUNSLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDakM7SUFDTCxDQUFDO0lBR0Q7O09BRUc7SUFDSCxRQUFRO1FBQ0osSUFBSSxNQUFNLEdBQWMsRUFBRSxDQUFDO1FBQzNCLEtBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUN4QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdCLElBQUcsS0FBSyxLQUFLLElBQUksSUFBSSxPQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLFdBQVcsRUFBRTtnQkFDckQsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDM0I7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO1NBQ3hCO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSztRQUNELElBQUksTUFBTSxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7UUFDekIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0IsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUdELDhEQUE4RDtJQUU5RDs7OztPQUlHO0lBQ0gsU0FBUyxDQUFDLElBQWEsRUFBRSxLQUFXO1FBQ2hDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQy9CLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxZQUFZLENBQUUsSUFBYSxFQUFFLEtBQVU7UUFDbkMsSUFBRyxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxTQUFTLElBQUkseUJBQXlCO1lBQ2pFLENBQUMsT0FBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxXQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsZ0JBQWdCO1lBQ3ZFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzs7WUFFeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDakMsQ0FBQztJQUVEOzs7T0FHRztJQUNILFlBQVksQ0FBRSxHQUFZO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxjQUFjLENBQUMsSUFBYTtRQUN4QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsZUFBZSxDQUFFLEdBQWM7UUFDM0IsS0FBSSxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUU7WUFDZCxJQUFHLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQVEsQ0FBQyxDQUFDO2FBQ2pEO1NBQ0o7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0YsMkJBQTJCO0lBQzVCLGlCQUFpQixDQUFFLEtBQWEsRUFBRSxLQUFhO1FBQzNDLElBQUksS0FBSyxHQUFZLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QyxJQUFHLENBQUMsS0FBSyxFQUFFO1lBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUM7Z0JBQy9DLDBDQUEwQyxHQUFHLEtBQUssR0FBRyxXQUFXO2dCQUNoRSx1REFBdUQsQ0FBQyxDQUFDO1NBQ2hFO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLElBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFHRCw4REFBOEQ7SUFFOUQ7OztPQUdHO0lBQ0gsQ0FBQyxDQUFDLElBQWEsSUFBWSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRTFELG9DQUFvQztJQUNwQyxJQUFJLENBQUUsSUFBYSxJQUFXLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUUsY0FBYztJQUNkLElBQUksS0FBYyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBVyxDQUFDLENBQUMsQ0FBQztJQUd6RSw4REFBOEQ7SUFHOUQsUUFBUSxDQUFDLElBQXNCO1FBQzNCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsV0FBVyxDQUFFLElBQXNCO1FBQy9CLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQsV0FBVztRQUNQLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUdELDhEQUE4RDtJQUc5RCxHQUFHLENBQUUsR0FBWTtRQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELE1BQU0sQ0FBQyxHQUFZO1FBQ2YsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxNQUFNO1FBQ0YsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBR0QsOERBQThEO0lBRzlELEtBQUssQ0FBQyxLQUF1QjtRQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7T0FFRztJQUNILFFBQVEsQ0FBRSxLQUF1QjtRQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELFFBQVE7UUFDSixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFHRCw4REFBOEQ7SUFHOUQsU0FBUyxDQUFDLElBQWE7UUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsNkJBQTZCO0lBQzdCLFlBQVksQ0FBRSxJQUFhO1FBQ3ZCLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsdUJBQXVCO0lBQ3ZCLFlBQVk7UUFDUixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFHRCw4REFBOEQ7SUFHOUQsY0FBYyxDQUFDLElBQWE7UUFDeEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCw2QkFBNkI7SUFDN0IsaUJBQWlCLENBQUUsSUFBWTtRQUMzQixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQsdUJBQXVCO0lBQ3ZCLGlCQUFpQjtRQUNiLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBR0QsOERBQThEO0lBRzlEOzs7Ozs7Ozs7T0FTRztJQUNILE1BQU0sQ0FBQyxNQUF1QixFQUFFLFNBQWlCO1FBQzdDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ2xDLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFHRDs7Ozs7OztPQU9HO0lBQ0gsU0FBUyxDQUFFLE1BQXNCLEVBQUUsU0FBaUI7UUFFaEQsZ0JBQWdCO1FBQ2hCLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRS9DLElBQUksS0FBSyxHQUFHLFNBQVMsSUFBSSxVQUFVLENBQUMsU0FBUyxDQUFDO1FBQzlDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxTQUFTO1FBQ0wsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUM7WUFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDO1lBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCw4REFBOEQ7SUFHOUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsTUFBTSxDQUFDLE1BQXNCLEVBQUUsU0FBbUI7UUFDOUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDbEMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUdEOzs7Ozs7O09BT0c7SUFDSCxTQUFTLENBQUUsTUFBc0IsRUFBRSxTQUFtQjtRQUVsRCxnQkFBZ0I7UUFDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFL0MsSUFBSSxLQUFLLEdBQUcsU0FBUyxJQUFJLFVBQVUsQ0FBQyxTQUFTLENBQUM7UUFDOUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELFNBQVM7UUFDTCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztZQUMxQyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUM7WUFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUdELDhEQUE4RDtJQUc5RDs7Ozs7OztPQU9HO0lBQ0gsVUFBVSxDQUFDLFVBQTBCLEVBQUUsU0FBaUI7UUFDcEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDMUMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILGFBQWEsQ0FBRSxVQUEwQixFQUFFLFNBQWlCO1FBRXhELGdCQUFnQjtRQUNoQixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRW5ELElBQUksS0FBSyxHQUFHLFNBQVMsSUFBSSxVQUFVLENBQUMsYUFBYSxDQUFDO1FBQ2xELElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxhQUFhO1FBQ1QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7WUFDOUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUM7WUFDOUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUdELDhEQUE4RDtJQUc5RDs7Ozs7OztPQU9HO0lBQ0gsUUFBUSxDQUFDLFFBQXdCLEVBQUUsU0FBaUI7UUFDaEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDdEMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILFdBQVcsQ0FBRSxRQUF3QixFQUFFLFNBQWlCO1FBRXBELGdCQUFnQjtRQUNoQixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUVqRCxJQUFJLEtBQUssR0FBRyxTQUFTLElBQUksVUFBVSxDQUFDLFdBQVcsQ0FBQztRQUNoRCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsV0FBVztRQUNQLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDO1lBQzVDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQztZQUM1QyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBR0QsOERBQThEO0lBRzlEOzs7Ozs7Ozs7T0FTRztJQUNILE1BQU0sQ0FBQyxHQUFtQixFQUFFLFNBQWlCO1FBQ3pDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQy9CLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILFNBQVMsQ0FBRSxHQUFtQixFQUFFLFNBQWlCO1FBRTdDLGdCQUFnQjtRQUNoQixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUVoRCxJQUFJLEtBQUssR0FBRyxTQUFTLElBQUksVUFBVSxDQUFDLFVBQVUsQ0FBQztRQUMvQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsU0FBUztRQUNMLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDO1lBQzNDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztZQUMzQyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBR0QsOERBQThEO0lBRzlEOzs7Ozs7Ozs7T0FTRztJQUNILE9BQU8sQ0FBQyxPQUF1QixFQUFFLFNBQWlCO1FBQzlDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3BDLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILFVBQVUsQ0FBRSxPQUF1QixFQUFFLFNBQWlCO1FBRWxELGdCQUFnQjtRQUNoQixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUVoRCxJQUFJLEtBQUssR0FBRyxTQUFTLElBQUksVUFBVSxDQUFDLFVBQVUsQ0FBQztRQUMvQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsVUFBVTtRQUNOLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDO1lBQzNDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztZQUMzQyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBR0QsOERBQThEO0lBRTlEOztPQUVHO0lBQ0gsWUFBWSxDQUFDLEtBQXFCO1FBQzlCLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsZUFBZSxDQUFFLEtBQXFCO1FBQ2xDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsZUFBZTtRQUNYLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUdELDhEQUE4RDtJQUc5RCxVQUFVLENBQUMsR0FBc0I7UUFDN0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxhQUFhLENBQUUsVUFBK0I7UUFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRCxhQUFhO1FBQ1QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBR0QsOERBQThEO0lBRzlELE1BQU0sQ0FBQyxLQUFjO1FBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsU0FBUyxDQUFFLEtBQWM7UUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxTQUFTO1FBQ0wsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBR0QsOERBQThEO0lBRzlELE1BQU0sQ0FBQyxJQUFVO1FBQ2IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxTQUFTLENBQUUsSUFBVTtRQUNqQixJQUFHLElBQUksRUFBRTtZQUNMLElBQUcsT0FBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxXQUFXLEVBQUU7Z0JBQzFDLHlCQUF5QjtnQkFDekIsSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUU5QjtpQkFBTSxJQUFHLE9BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssV0FBVyxJQUFJLElBQUksQ0FBQyxNQUFNO2dCQUN0RCxrREFBa0Q7Z0JBQ2xELHlDQUF5QztnQkFDekMsT0FBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxXQUFXLEVBQUU7Z0JBQ3RDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsR0FBRyxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLEdBQUcsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFFbEU7aUJBQU0sSUFBRyxPQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssUUFBUSxFQUFFO2dCQUNqQyxJQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDdkIsTUFBTSxJQUFJLEtBQUssQ0FBQyx3Q0FBd0M7d0JBQ3BELGtDQUFrQyxDQUFDLENBQUM7aUJBQzNDO2FBQ0o7aUJBQU07Z0JBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQyx3Q0FBd0M7b0JBQ3BELDhDQUE4QyxDQUFDLENBQUM7YUFDdkQ7U0FDSjtRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxTQUFTO1FBQ0wsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBR0QsOERBQThEO0lBRzlEOzs7Ozs7Ozs7O09BVUc7SUFDSCxVQUFVLENBQUMsVUFBbUIsRUFBRSxLQUF1QjtRQUNuRCxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN0QyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsYUFBYSxDQUFDLFVBQW1CLEVBQUUsS0FBdUI7UUFDdEQsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLFdBQVcsR0FBRyxHQUFHLEdBQUcsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFRDs7O09BR0c7SUFDSCxhQUFhLENBQUMsVUFBbUI7UUFDN0IsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsR0FBRyxHQUFHLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM5RSxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILFdBQVcsQ0FBQyxLQUFXO1FBQ25CLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0IsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsY0FBYyxDQUFFLEtBQVc7UUFDdkIsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBLEVBQUUsQ0FBQSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoRSxJQUFHLENBQUMsS0FBSyxJQUFJLE9BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUM3RCxPQUFPLENBQUMsT0FBTyxDQUFFLFVBQVUsQ0FBQyxFQUFFO2dCQUMxQixJQUFJLENBQUMsY0FBYyxDQUFFLFVBQVUsQ0FBQyxXQUFXLEdBQUcsR0FBRyxHQUFHLFVBQVUsQ0FBRSxDQUFDO1lBQ3JFLENBQUMsQ0FBQyxDQUFDO1lBQ0gsT0FBTztTQUNWO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUUsVUFBVSxDQUFDLEVBQUU7WUFDckMsSUFBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxhQUFhLENBQUUsVUFBVSxFQUFFLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBRSxDQUFDO2FBQ3ZEO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxjQUFjO1FBQ1YsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQSxFQUFFLENBQUEsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFFLFVBQVUsQ0FBQyxFQUFFO1lBQ2xFLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hELENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUdELDhEQUE4RDtJQUc5RCxRQUFRLENBQUMsSUFBa0IsRUFBRSxhQUF1QjtRQUNoRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsQ0FBQztRQUN0QyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsV0FBVyxDQUFFLElBQWtCLEVBQUUsYUFBcUI7UUFFbEQsa0VBQWtFO1FBQ2xFLElBQUcsQ0FBQyxJQUFJLEVBQUU7WUFDTixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDcEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ25ELE9BQU87U0FDVjtRQUVELElBQUcsQ0FBQyxDQUFDLElBQUksWUFBWSxJQUFJLENBQUM7WUFDdEIsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQWMsQ0FBQyxDQUFDO1FBRXBDLElBQUksR0FBRyxHQUFHLGFBQWEsSUFBSSxDQUFDLGFBQWEsS0FBSyxJQUFJLElBQUksYUFBYSxLQUFLLE1BQU0sQ0FBQyxDQUFDO1FBQ2hGLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFPLG9CQUFvQjtRQUNuRyxJQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBSSx5QkFBeUI7UUFDeEcsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUV6RCxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQztZQUNyRCxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNqRCxJQUFHLEtBQUssSUFBSSxPQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssUUFBUSxFQUFFO1lBQ3BDLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMzQjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFHRCw4REFBOEQ7SUFHOUQsT0FBTyxDQUFDLElBQWtCLEVBQUUsYUFBcUI7UUFDN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDckMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7T0FHRztJQUNILFVBQVUsQ0FBRSxJQUFrQixFQUFFLGFBQXFCO1FBRWpELGtFQUFrRTtRQUNsRSxJQUFHLENBQUMsSUFBSSxFQUFFO1lBQ04sSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNsRCxPQUFPO1NBQ1Y7UUFFRCxJQUFHLENBQUMsQ0FBQyxJQUFJLFlBQVksSUFBSSxDQUFDO1lBQ3RCLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFjLENBQUMsQ0FBQztRQUVwQyxJQUFJLEdBQUcsR0FBRyxhQUFhLElBQUksQ0FBQyxhQUFhLEtBQUssSUFBSSxJQUFJLGFBQWEsS0FBSyxNQUFNLENBQUMsQ0FBQztRQUNoRixJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBTyxvQkFBb0I7UUFDakcsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUkseUJBQXlCO1FBQ3RHLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFFekQsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELFVBQVU7UUFDTixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUM7WUFDcEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDaEQsSUFBRyxLQUFLLElBQUksT0FBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLFFBQVEsRUFBRTtZQUNwQyxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDM0I7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBR0QsOERBQThEO0lBRzlELE1BQU0sQ0FBQyxJQUFrQjtRQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxZQUFZLENBQUUsSUFBa0I7UUFDNUIsSUFBRyxJQUFJLElBQUksSUFBSSxZQUFZLElBQUk7WUFDM0IsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELFlBQVk7UUFDUixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoRCxJQUFHLElBQUk7WUFBRSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0IsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUdELDhEQUE4RDtJQUc5RCxJQUFJLENBQUMsSUFBa0I7UUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsVUFBVSxDQUFFLElBQWlCO1FBQ3pCLElBQUcsSUFBSSxJQUFJLElBQUksWUFBWSxJQUFJO1lBQzNCLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxVQUFVO1FBQ04sSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUMsSUFBRyxJQUFJO1lBQUUsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9CLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFHRCw4REFBOEQ7SUFHOUQsT0FBTyxDQUFDLEtBQW1CLEVBQUUsR0FBaUI7UUFDMUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDNUIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFtQixFQUFFLEdBQWlCO1FBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBR0QsOERBQThEO0lBRzlELGFBQWEsQ0FBQyxLQUFzQjtRQUNoQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0IsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELGdCQUFnQixDQUFDLEtBQXNCO1FBQ25DLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsZ0JBQWdCO1FBQ1osT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBR0QsOERBQThEO0lBRzlELE1BQU0sQ0FBQyxLQUF1QjtRQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7T0FFRztJQUNILFNBQVMsQ0FBRSxLQUFzQjtRQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELFNBQVM7UUFDTCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRDs7T0FFRztJQUNILFFBQVEsQ0FBQyxJQUFZO1FBQ2pCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRDs7T0FFRztJQUNILFdBQVcsQ0FBQyxJQUFZO1FBQ3BCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDcEMsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixJQUFHLEdBQUcsSUFBRSxDQUFDLEVBQUU7WUFDUCxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzFCO0lBQ0wsQ0FBQztJQUdELDhEQUE4RDtJQUc5RCxNQUFNLENBQUMsTUFBdUI7UUFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxTQUFTLENBQUUsTUFBdUI7UUFDOUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCxTQUFTO1FBQ0wsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxRQUFRLENBQUMsS0FBYTtRQUNsQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxXQUFXLENBQUMsS0FBYTtRQUNyQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO1FBQ3BDLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsSUFBRyxHQUFHLElBQUUsQ0FBQyxFQUFFO1lBQ1AsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMxQjtJQUNMLENBQUM7SUFJRCw4REFBOEQ7SUFHOUQ7O09BRUc7SUFDSCxJQUFJLENBQUUsSUFBWTtRQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELE9BQU8sQ0FBQyxJQUFZO1FBQ2hCLElBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksR0FBQyxDQUFDLEdBQUMsQ0FBQztZQUFFLE9BQU87UUFDbkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksR0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsT0FBTztRQUNILE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsWUFBWTtRQUNSLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFHRCw4REFBOEQ7SUFHOUQ7O09BRUc7SUFDSCxRQUFRLENBQUUsSUFBWTtRQUNsQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxXQUFXLENBQUUsSUFBWTtRQUNyQixJQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEdBQUMsQ0FBQyxHQUFDLENBQUM7WUFBRSxPQUFPO1FBQ25DLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxJQUFJLEdBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELFdBQVc7UUFDUCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFHRCw4REFBOEQ7SUFHOUQ7OztPQUdHO0lBQ0gsSUFBSSxDQUFFLElBQVksRUFBRSxLQUFhO1FBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzFCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7O09BR0c7SUFDRixPQUFPLENBQUMsSUFBWSxFQUFFLEtBQWE7UUFDL0IsS0FBSyxHQUFHLEtBQUssSUFBSSxNQUFNLENBQUM7UUFDeEIsSUFBRyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBQyxDQUFDO1lBQzNCLElBQUksR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQztRQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELE9BQU87UUFDSCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxZQUFZO1FBQ1IsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzNCLE9BQU8sS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUM5RCxDQUFDO0lBRUQsWUFBWTtRQUNSLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMzQixPQUFPLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDOUQsQ0FBQztJQUVEOztPQUVHO0lBQ0gsY0FBYztRQUNWLE9BQU8sb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFHRCw4REFBOEQ7SUFHOUQ7O09BRUc7SUFDSCxLQUFLO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFDL0QsQ0FBQztDQUNKO0FBRUQsT0FBTyxFQUNILEtBQUssSUFBSSxPQUFPLEVBQ2hCLEtBQUssRUFDTCxNQUFNLEVBQ04sTUFBTSxFQUNULENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBQYXJhbWV0ZXJzIGZyb20gJy4vcGFyYW1ldGVycyc7XG5pbXBvcnQgQ2xhc3NpZmllcnMgZnJvbSAnLi9jbGFzc2lmaWVycyc7XG5cbmludGVyZmFjZSBLVlA8VT4geyBbIGtleSA6IHN0cmluZyBdIDogVSB9XG5cbmNvbnN0IEZpZWxkcyA6IEtWUDxzdHJpbmc+ID0ge1xuICAgIEFDQ0VTU19SSUdIVFMgICAgICAgOiAncmlnaHRzJyxcbiAgICBBTFRFUk5BVEVfVElUTEVTICAgIDogJ2FsdGVybmF0ZVRpdGxlcycsXG4gICAgQU5OT1RBVElPTlMgICAgICAgICA6ICdhbm5vdGF0aW9ucycsXG4gICAgQ0xBU1NJRklFUlMgICAgICAgICA6ICdjbGFzc2lmaWVycycsXG4gICAgQ09OQ0VQVF9TQ0hFTUUgICAgICA6ICdzY2hlbWUnLFxuICAgIENPTlRBQ1RTICAgICAgICAgICAgOiAnY29udGFjdHMnLFxuICAgIENSRUFURUQgICAgICAgICAgICAgOiAnY3JlYXRlZCcsXG4gICAgQ1JFQVRFRF9CWSAgICAgICAgICA6ICdjcmVhdGVkQnknLFxuICAgIERBVEFTRVRTICAgICAgICAgICAgOiAnZGF0YXNldHMnLFxuICAgIERFU0NSSVBUSU9OICAgICAgICAgOiAnZGVzY3JpcHRpb24nLFxuICAgIERJU1RSSUJVVElPTlMgICAgICAgOiAnZGlzdHJpYnV0aW9ucycsXG4gICAgRVhURU5UICAgICAgICAgICAgICA6ICdleHRlbnQnLFxuICAgIEdBTExFUllfSVRFTVMgICAgICAgOiAnaXRlbXMnLFxuICAgIEhSRUYgICAgICAgICAgICAgICAgOiAnaHJlZicsXG4gICAgSURFTlRJRklFUlMgICAgICAgICA6ICdpZGVudGlmaWVycycsXG4gICAgS0VZV09SRFMgICAgICAgICAgICA6ICdrZXl3b3JkcycsXG4gICAgTEFCRUwgICAgICAgICAgICAgICA6ICdsYWJlbCcsXG4gICAgTEFTVF9NT0RJRklFRF9CWSAgICA6ICdsYXN0TW9kaWZpZWRCeScsXG4gICAgTEFZRVJTICAgICAgICAgICAgICA6ICdsYXllcnMnLFxuICAgIExBWUVSX1RZUEUgICAgICAgICAgOiAnbGF5ZXJUeXBlJyxcbiAgICBMQVlFUl9OQU1FICAgICAgICAgIDogJ2xheWVyTmFtZScsXG4gICAgTEVHRU5EICAgICAgICAgICAgICA6ICdsZWdlbmQnLFxuICAgIE1PRElGSUVEICAgICAgICAgICAgOiAnbW9kaWZpZWQnLFxuICAgIFBBUkVOVF9MQVlFUiAgICAgICAgOiAncGFyZW50TGF5ZXInLFxuICAgIFBVQkxJU0hFUlMgICAgICAgICAgOiAncHVibGlzaGVycycsXG4gICAgUkVTT1VSQ0VfVFlQRVMgICAgICA6ICdyZXNvdXJjZVR5cGVzJyxcbiAgICBTRVJWSUNFX1RZUEUgICAgICAgIDogJ3NlcnZpY2VUeXBlJyxcbiAgICBTRVJWSUNFUyAgICAgICAgICAgIDogJ3NlcnZpY2VzJyxcbiAgICBTUEFUSUFMICAgICAgICAgICAgIDogJ3NwYXRpYWwnLFxuICAgIFNUQVRJU1RJQ1MgICAgICAgICAgOiAnc3RhdGlzdGljcycsXG4gICAgU1RBVFVTICAgICAgICAgICAgICA6ICdzdGF0dXMnLFxuICAgIFNVQl9MQVlFUlMgICAgICAgICAgOiAnc3ViTGF5ZXJzJyxcbiAgICBURU1QT1JBTCAgICAgICAgICAgIDogJ3RlbXBvcmFsJyxcbiAgICBUSEVNRVMgICAgICAgICAgICAgIDogJ3RoZW1lcycsXG4gICAgVEhVTUJOQUlMICAgICAgICAgICA6ICd0aHVtYm5haWwnLFxuICAgIFRPUElDUyAgICAgICAgICAgICAgOiAndG9waWNzJyxcbiAgICBVU0VEX0JZICAgICAgICAgICAgIDogJ3VzZWRCeScsXG4gICAgVklTSUJJTElUWSAgICAgICAgICA6ICd2aXNpYmlsaXR5JyxcbiAgICBMQU5ESU5HX1BBR0UgICAgICAgIDogJ2xhbmRpbmdQYWdlJ1xufTtcblxuY29uc3QgRklFTERTX0RFRkFVTFQgOiBzdHJpbmdbXSA9IFtcbiAgICBGaWVsZHMuQ1JFQVRFRCwgRmllbGRzLk1PRElGSUVELCBGaWVsZHMuQ1JFQVRFRF9CWSxcbiAgICBGaWVsZHMuUFVCTElTSEVSUywgRmllbGRzLlRIRU1FUywgRmllbGRzLkRFU0NSSVBUSU9OXG5dO1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuY29uc3QgRmFjZXRzIDogS1ZQPHN0cmluZz4gPSB7XG4gICAgQUxURVJOQVRFX1RJVExFUyAgICA6ICdhbHRlcm5hdGVUaXRsZXMnLFxuICAgIENPTkNFUFRfU0NIRU1FUyAgICAgOiAnc2NoZW1lcycsXG4gICAgQ1JFQVRFRF9CWSAgICAgICAgICA6ICdjcmVhdGVkQnknLFxuICAgIEhSRUYgICAgICAgICAgICAgICAgOiAnaHJlZicsXG4gICAgSURFTlRJRklFUlMgICAgICAgICA6IFwiaWRlbnRpZmllcnNcIixcbiAgICBMQVlFUl9UWVBFICAgICAgICAgIDogJ2xheWVyVHlwZScsXG4gICAgTEFZRVJfTkFNRSAgICAgICAgICA6ICdsYXllck5hbWUnLFxuICAgIExJS0VTICAgICAgICAgICAgICAgOiAnbGlrZXMnLFxuICAgIE9OTElORSAgICAgICAgICAgICAgOiAnb25saW5lJyxcbiAgICBQVUJMSVNIRVJTICAgICAgICAgIDogJ3B1Ymxpc2hlcnMnLFxuICAgIENPTlRBQ1RTICAgICAgICAgICAgOiAnY29udGFjdHMnLFxuICAgIFJFTElBQklMSVRZICAgICAgICAgOiAncmVsaWFiaWxpdHknLFxuICAgIFNFUlZJQ0VfVFlQRVMgICAgICAgOiAnc2VydmljZVR5cGVzJyxcbiAgICBTUEVFRCAgICAgICAgICAgICAgIDogJ3NwZWVkJyxcbiAgICBTVEFUVVMgICAgICAgICAgICAgIDogJ3N0YXR1cycsXG4gICAgVEhFTUVTICAgICAgICAgICAgICA6ICd0aGVtZXMnLFxuICAgIFRPUElDUyAgICAgICAgICAgICAgOiAndG9waWNzJyxcbiAgICBUWVBFUyAgICAgICAgICAgICAgIDogJ3R5cGUnLCAgIC8vVE9ETyBjaGFuZ2UgdG8gJ3R5cGVzJ1xuICAgIFVTRURfQlkgICAgICAgICAgICAgOiAndXNlZEJ5JyxcbiAgICBWSUVXUyAgICAgICAgICAgICAgIDogJ3ZpZXdzJyxcbiAgICBWSVNJQklMSVRZICAgICAgICAgIDogJ3Zpc2liaWxpdHknXG59O1xuXG5jb25zdCBGQUNFVFNfREVGQVVMVCA6IHN0cmluZ1tdID0gW1xuICAgIEZhY2V0cy5UWVBFUyxcbiAgICBGYWNldHMuUFVCTElTSEVSUyxcbiAgICBGYWNldHMuU0VSVklDRV9UWVBFUyxcbiAgICBGYWNldHMuQ09OQ0VQVF9TQ0hFTUVTLFxuICAgIEZhY2V0cy5WSVNJQklMSVRZLFxuICAgIEZhY2V0cy5DUkVBVEVEX0JZXG5dO1xuXG5cbi8qXG4gICAgTWFwIGZhY2V0IGtleXMgdG8gcGFyYW1ldGVycyBzbyBjbGllbnRzIGNhbiBzZXRcbiAgICBxdWVyeSBwYXJhbXMgdXNpbmcgZmFjZXRlZCByZXN1bHRzXG5cbiAgICAvL1RPRE8gcmVtb3ZlIHRoZXNlIGFuZCB0aGVpciBmdW5jdGlvbiBiZWxvd1xuICovXG5jb25zdCBGYWNldFRvUGFyYW0gOiBLVlA8c3RyaW5nPiA9IHt9O1xuRmFjZXRUb1BhcmFtW0ZhY2V0cy5UWVBFU10gICAgICAgICAgID0gUGFyYW1ldGVycy5UWVBFUztcbkZhY2V0VG9QYXJhbVtGYWNldHMuVEhFTUVTXSAgICAgICAgICA9IFBhcmFtZXRlcnMuVEhFTUVTX0lEO1xuRmFjZXRUb1BhcmFtW0ZhY2V0cy5UT1BJQ1NdICAgICAgICAgID0gUGFyYW1ldGVycy5UT1BJQ1NfSUQ7XG5GYWNldFRvUGFyYW1bRmFjZXRzLlBVQkxJU0hFUlNdICAgICAgPSBQYXJhbWV0ZXJzLlBVQkxJU0hFUlNfSUQ7XG5GYWNldFRvUGFyYW1bRmFjZXRzLkNPTlRBQ1RTXSAgICAgICAgPSBQYXJhbWV0ZXJzLkNPTlRBQ1RTX0lEO1xuRmFjZXRUb1BhcmFtW0ZhY2V0cy5DT05DRVBUX1NDSEVNRVNdID0gUGFyYW1ldGVycy5TQ0hFTUVTX0lEO1xuRmFjZXRUb1BhcmFtW0ZhY2V0cy5VU0VEX0JZXSAgICAgICAgID0gUGFyYW1ldGVycy5VU0VEX0JZX0lEO1xuXG5cblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblxuY29uc3QgU09SVF9PUFRJT05TX0RFRkFVTFQgOiB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmc7IH1bXSA9IFtcbiAgICB7IHZhbHVlOlwibGFiZWwsYXNjXCIsICAgICAgIGxhYmVsOiBcIk5hbWUgKEEtWilcIiAgICAgICAgICAgICAgfSxcbiAgICB7IHZhbHVlOlwibGFiZWwsZGVzY1wiLCAgICAgIGxhYmVsOiBcIk5hbWUgKFotQSlcIiAgICAgICAgICAgICAgfSxcbiAgICB7IHZhbHVlOlwidHlwZSxhc2NcIiwgICAgICAgIGxhYmVsOiBcIlR5cGUgKEEtWilcIiAgICAgICAgICAgICAgfSxcbiAgICB7IHZhbHVlOlwidHlwZSxkZXNjXCIsICAgICAgIGxhYmVsOiBcIlR5cGUgKFotQSlcIiAgICAgICAgICAgICAgfSxcbiAgICB7IHZhbHVlOlwibW9kaWZpZWQsZGVzY1wiLCAgIGxhYmVsOiBcIk1vc3QgcmVjZW50bHkgbW9kaWZpZWRcIiAgfSxcbiAgICB7IHZhbHVlOlwibW9kaWZpZWQsYXNjXCIsICAgIGxhYmVsOiBcIkxlYXN0IHJlY2VudGx5IG1vZGlmaWVkXCIgfSxcbiAgICB7IHZhbHVlOlwiX3Njb3JlLGRlc2NcIiwgICAgIGxhYmVsOiBcIlJlbGV2YW5jZVwiICAgICAgICAgICAgICAgfVxuXTtcblxuXG5jb25zdCBCQk9YX1JFR0VYID0gL15cXC0/XFxkKyhcXC5cXGQqKT8sXFwtP1xcZCsoXFwuXFxkKik/LFxcLT9cXGQrKFxcLlxcZCopPyxcXC0/XFxkKyhcXC5cXGQqKT8kLztcblxuXG5mdW5jdGlvbiB0b0FycmF5KHZhbHVlIDogYW55KSA6IGFueSB8IG51bGwge1xuICAgIGxldCByZXN1bHQgPSB2YWx1ZTtcbiAgICAvL2lmIGdpdmVuIGEgbm9uLWFycmF5IHZhbHVlLCB3cmFwIGluIGFycmF5XG4gICAgaWYocmVzdWx0ICE9PSBudWxsICYmIHR5cGVvZihyZXN1bHQucHVzaCkgPT09ICd1bmRlZmluZWQnKSByZXN1bHQgPSBbcmVzdWx0XTtcbiAgICAvL2lmIGFycmF5IHZhbHVlIGlzIGVtcHR5LCBudWxsaWZ5IHRoZSByZXN1bHRcbiAgICBpZihyZXN1bHQgIT09IG51bGwgJiYgIXJlc3VsdC5sZW5ndGgpIHJlc3VsdCA9IG51bGw7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8qKlxuICogUXVlcnlcbiAqXG4gKiBTcGVjaWZ5IHRoZSBcImRlZmF1bHRcIiBxdWVyeSBjb25zdHJhaW50cyB0byB1c2UgYnkgcGFzc2luZyBpbiAnb3B0aW9ucy5kZWZhdWx0cyA9IHsuLi59JztcbiAqXG4gKi9cbmNsYXNzIFF1ZXJ5IHtcblxuICAgIHB1YmxpYyBxdWVyeSA6IEtWUDxhbnk+O1xuICAgIHByaXZhdGUgZGVmYXVsdFF1ZXJ5IDogS1ZQPGFueT47XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIHNldCBvZiBpbml0aWFsIGNvbnN0cmFpbnRzXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA/OiBLVlA8YW55Pikge1xuICAgICAgICB0aGlzLmRlZmF1bHRRdWVyeSA9IHsgfTtcbiAgICAgICAgdGhpcy5kZWZhdWx0UXVlcnlbUGFyYW1ldGVycy5QQUdFLnRvU3RyaW5nKCldID0gMDtcbiAgICAgICAgdGhpcy5kZWZhdWx0UXVlcnlbUGFyYW1ldGVycy5QQUdFX1NJWkUudG9TdHJpbmcoKV0gPSAxMDtcbiAgICAgICAgdGhpcy5kZWZhdWx0UXVlcnlbUGFyYW1ldGVycy5TT1JULnRvU3RyaW5nKCldID0gXCJtb2RpZmllZCxkZXNjXCI7XG4gICAgICAgIHRoaXMuZGVmYXVsdFF1ZXJ5W1BhcmFtZXRlcnMuRklFTERTLnRvU3RyaW5nKCldID0gRklFTERTX0RFRkFVTFQuc2xpY2UoMCk7XG4gICAgICAgIHRoaXMuZGVmYXVsdFF1ZXJ5W1BhcmFtZXRlcnMuRkFDRVRTLnRvU3RyaW5nKCldID0gRkFDRVRTX0RFRkFVTFQuc2xpY2UoMCk7XG4gICAgICAgIGlmKG9wdGlvbnMgJiYgb3B0aW9ucy5kZWZhdWx0cykge1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmRlZmF1bHRRdWVyeSwgb3B0aW9ucy5kZWZhdWx0cyk7XG4gICAgICAgICAgICBkZWxldGUgb3B0aW9ucy5kZWZhdWx0cztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnF1ZXJ5ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLmRlZmF1bHRRdWVyeSkpO1xuICAgICAgICBpZihvcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5UGFyYW1ldGVycyhvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiBjb250YWluaW5nIHJlcXVlc3QtcmVhZHkgcGFyYW1ldGVycy92YWx1ZXNcbiAgICAgKi9cbiAgICBnZXRRdWVyeSgpIDogS1ZQPGFueT4ge1xuICAgICAgICBsZXQgcmVzdWx0IDogS1ZQPGFueT4gPSB7fTtcbiAgICAgICAgZm9yKGxldCBwcm9wIGluIHRoaXMucXVlcnkpIHtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRoaXMucXVlcnlbcHJvcF07XG4gICAgICAgICAgICBpZih2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YodmFsdWUucHVzaCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5qb2luKCcsJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHRbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4gUXVlcnlcbiAgICAgKi9cbiAgICBjbG9uZSgpIDogUXVlcnkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IFF1ZXJ5KCk7XG4gICAgICAgIGxldCBqc29uID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLnF1ZXJ5KSk7XG4gICAgICAgIHJlc3VsdC5hcHBseVBhcmFtZXRlcnMoanNvbik7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG5hbWVcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcmV0dXJuIFF1ZXJ5IHRoaXNcbiAgICAgKi9cbiAgICBwYXJhbWV0ZXIobmFtZSA6IHN0cmluZywgdmFsdWUgOiBhbnkpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihuYW1lLCB2YWx1ZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBuYW1lXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICovXG4gICAgc2V0UGFyYW1ldGVyIChuYW1lIDogc3RyaW5nLCB2YWx1ZTogYW55KSA6IHZvaWQge1xuICAgICAgICBpZih2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IC8vaWYgbm8gdmFsdWUgd2FzIHByb3ZpZGVcbiAgICAgICAgICAgICh0eXBlb2YodmFsdWUucHVzaCkgIT09ICd1bmRlZmluZWQnICYmICF2YWx1ZS5sZW5ndGgpKSAvL29yIGVtcHR5IGFycmF5XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5xdWVyeVtuYW1lXTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5xdWVyeVtuYW1lXSA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBrZXkgLSBuYW1lIG9mIHBhcmFtZXRlclxuICAgICAqIEByZXR1cm4gdmFsdWUgb2YgcGFyYW1ldGVyXG4gICAgICovXG4gICAgZ2V0UGFyYW1ldGVyIChrZXkgOiBzdHJpbmcpIDogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucXVlcnlba2V5XTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbmFtZSAtIG5hbWUgb2YgcGFyYW1ldGVyIHRvIHJlbW92ZSBleGlzdGluZyB2YWx1ZSBmb3JcbiAgICAgKi9cbiAgICBjbGVhclBhcmFtZXRlcihuYW1lIDogc3RyaW5nKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLnF1ZXJ5W25hbWVdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBvYmogLSBzZXQgb2YgcGFyYW1ldGVyL3ZhbHVlcyB0byBhcHBseSB0byB0aGlzIHF1ZXJ5XG4gICAgICovXG4gICAgYXBwbHlQYXJhbWV0ZXJzIChvYmogOiBLVlA8YW55PikgOiB2b2lkIHvCoFxuICAgICAgICBmb3IobGV0IHAgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZihvYmouaGFzT3duUHJvcGVydHkocCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihwIGFzIHN0cmluZywgb2JqW3BdIGFzIGFueSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZmFjZXQgLSBuYW1lIG9mIGZhY2V0IHRvIHNldCB0aGUgdmFsdWUgZm9yIGFzIGEgcGFyYW1ldGVyXG4gICAgICogQHBhcmFtIHZhbHVlIC0gdmFsdWUgb2YgdGhlIGZhY2V0IHRvIHVzZSBhcyB0aGUgcGFyYW1ldGVyJ3MgdmFsdWVcbiAgICAgKi9cbiAgICAgLy9UT0RPIHJlbW92ZSB0aGlzIGZ1bmN0aW9uXG4gICAgc2V0RmFjZXRQYXJhbWV0ZXIgKGZhY2V0OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIDogdm9pZCB7XG4gICAgICAgIGxldCBwYXJhbSA6IHN0cmluZyA9IEZhY2V0VG9QYXJhbVtmYWNldF07XG4gICAgICAgIGlmKCFwYXJhbSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJXQVJOIDogUXVlcnkuYXBwbHlGYWNldFBhcmFtZXRlcigpIC0gXCIgK1xuICAgICAgICAgICAgICAgIFwidW5hYmxlIHRvIG1hcCBmYWNldCB0byBrbm93biBwYXJhbWV0ZXIgJ1wiICsgZmFjZXQgKyBcIicsIHVzaW5nIFwiICtcbiAgICAgICAgICAgICAgICBcImFzIGRpcmVjdCBwYXJhbWV0ZXIgd2hpY2ggbWF5IG5vdCBvcGVyYXRlIGFzIGludGVuZGVkXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKHBhcmFtfHxmYWNldCwgdmFsdWUpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB0ZXh0XG4gICAgICogQHJldHVybiBRdWVyeSB0aGlzXG4gICAgICovXG4gICAgcSh0ZXh0IDogc3RyaW5nKSA6IFF1ZXJ5IHsgdGhpcy5zZXRRKHRleHQpOyByZXR1cm4gdGhpczsgfVxuXG4gICAgLyoqIEBwYXJhbSB0ZXh0IC0gZnJlZSB0ZXh0IHF1ZXJ5ICovXG4gICAgc2V0USAodGV4dCA6IHN0cmluZykgOiB2b2lkIHsgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5RVUVSWSwgdGV4dCk7IH1cbiAgICAvKiogQHJldHVybiAqL1xuICAgIGdldFEoKSA6IHN0cmluZyB7IHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlFVRVJZKSBhcyBzdHJpbmc7IH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAga2V5d29yZHModGV4dCA6IHN0cmluZ3xzdHJpbmdbXSkgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0S2V5d29yZHModGV4dCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB0ZXh0IC0gZnJlZSB0ZXh0IHF1ZXJ5XG4gICAgICovXG4gICAgc2V0S2V5d29yZHMgKHRleHQgOiBzdHJpbmd8c3RyaW5nW10pIDogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuS0VZV09SRFMsIHRvQXJyYXkodGV4dCkpO1xuICAgIH1cblxuICAgIGdldEtleXdvcmRzKCkgOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLktFWVdPUkRTKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIHVyaSAodXJpIDogc3RyaW5nKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRVcmkodXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0VXJpKHVyaSA6IHN0cmluZykge1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlVSSSwgdXJpKTtcbiAgICB9XG5cbiAgICBnZXRVcmkoKSA6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlVSSSk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICB0eXBlcyh0eXBlcyA6IHN0cmluZ3xzdHJpbmdbXSkgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0VHlwZXModHlwZXMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gdHlwZXMgLSBuYW1lIG9mIGNsYXNzKGVzKSB0byByZXF1ZXN0XG4gICAgICovXG4gICAgc2V0VHlwZXMgKHR5cGVzIDogc3RyaW5nfHN0cmluZ1tdKSB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVFlQRVMsIHRvQXJyYXkodHlwZXMpKTtcbiAgICB9XG5cbiAgICBnZXRUeXBlcyAoKSA6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVFlQRVMpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgY3JlYXRlZEJ5KHVzZXIgOiBzdHJpbmcpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldENyZWF0ZWRCeSh1c2VyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqIEBwYXJhbSB1c2VyIC0gdXNlcm5hbWUgKi9cbiAgICBzZXRDcmVhdGVkQnkgKHVzZXIgOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5DUkVBVEVEX0JZLCB1c2VyKTtcbiAgICB9XG5cbiAgICAvKiogQHJldHVybiB1c2VybmFtZSAqL1xuICAgIGdldENyZWF0ZWRCeSAoKSA6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkNSRUFURURfQlkpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgbGFzdE1vZGlmaWVkQnkodXNlciA6IHN0cmluZykgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0TGFzdE1vZGlmaWVkQnkodXNlcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKiBAcGFyYW0gdXNlciAtIHVzZXJuYW1lICovXG4gICAgc2V0TGFzdE1vZGlmaWVkQnkgKHVzZXI6IHN0cmluZykge1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkxBU1RfTU9ESUZJRURfQlksIHVzZXIpO1xuICAgIH1cblxuICAgIC8qKiBAcmV0dXJuIHVzZXJuYW1lICovXG4gICAgZ2V0TGFzdE1vZGlmaWVkQnkgKCkgOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5MQVNUX01PRElGSUVEX0JZKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgYSBUaGVtZSBvciBzZXQgb2YgVGhlbWVzIHRvIGNvbnN0cmFpbiByZXN1bHRzLiBCeVxuICAgICAqIGRlZmF1bHQsIHZhbHVlcyBhcmUgYXNzdW1lZCB0byBiZSB0aGVtZSBpZGVudGlmaWVycy4gSWYgdXNpbmdcbiAgICAgKiB0aGVtZSBsYWJlbHMgb3IgdGhlbWUgdXJpcywgc3BlY2lmeSB0aGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlclxuICAgICAqIHRvIGJlIGVpdGhlciBQYXJhbWV0ZXJzLlRIRU1FU19MQUJFTCBvciBQYXJhbWV0ZXJzLlRIRU1FU19VUklcbiAgICAgKiByZXNwZWN0aXZlbHkuXG4gICAgICogQHBhcmFtIHRoZW1lcyAtIHN0cmluZyBvciBhcnJheSBvZiBzdHJpbmdzIGNvbnRhaW5pbmcgdGhlbWUgY29uc3RyYWludFxuICAgICAqIEBwYXJhbSBwYXJhbWV0ZXIgLSBvcHRpb25hbCwgdG8gaW5kaWNhdGUgdGhlIHBhcmFtZXRlciB0byB1c2VcbiAgICAgKiBAcmV0dXJuIFF1ZXJ5XG4gICAgICovXG4gICAgdGhlbWVzKHRoZW1lczogc3RyaW5nfHN0cmluZ1tdLCBwYXJhbWV0ZXI/OnN0cmluZykgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0VGhlbWVzKHRoZW1lcywgcGFyYW1ldGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IGEgVGhlbWUgb3Igc2V0IG9mIFRoZW1lcyB0byBjb25zdHJhaW4gcmVzdWx0cy4gQnlcbiAgICAgKiBkZWZhdWx0LCB2YWx1ZXMgYXJlIGFzc3VtZWQgdG8gYmUgdGhlbWUgaWRlbnRpZmllcnMuIElmIHVzaW5nXG4gICAgICogdGhlbWUgbGFiZWxzIG9yIHRoZW1lIHVyaXMsIHNwZWNpZnkgdGhlIG9wdGlvbmFsIHNlY29uZCBwYXJhbWV0ZXJcbiAgICAgKiB0byBiZSBlaXRoZXIgUGFyYW1ldGVycy5USEVNRVNfTEFCRUwgb3IgUGFyYW1ldGVycy5USEVNRVNfVVJJXG4gICAgICogcmVzcGVjdGl2ZWx5LlxuICAgICAqIEBwYXJhbSB0aGVtZXMgLSB0aGVtZSBvciB0aGVtZXMgdG8gY29uc3RyYWluIGJ5XG4gICAgICovXG4gICAgc2V0VGhlbWVzICh0aGVtZXM6c3RyaW5nfHN0cmluZ1tdLCBwYXJhbWV0ZXI/OnN0cmluZykge1xuXG4gICAgICAgIC8vY2xlYXIgZXhpc3RpbmdcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5USEVNRVNfSUQsIG51bGwpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlRIRU1FU19MQUJFTCwgbnVsbCk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVEhFTUVTX1VSSSwgbnVsbCk7XG5cbiAgICAgICAgbGV0IHBhcmFtID0gcGFyYW1ldGVyIHx8IFBhcmFtZXRlcnMuVEhFTUVTX0lEO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihwYXJhbSwgdG9BcnJheSh0aGVtZXMpKTtcbiAgICB9XG5cbiAgICBnZXRUaGVtZXMgKCkgOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlRIRU1FU19JRCkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVEhFTUVTX0xBQkVMKSB8fFxuICAgICAgICAgICAgdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5USEVNRVNfVVJJKTtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IGEgVG9waWMgb3Igc2V0IG9mIFRvcGljcyB0byBjb25zdHJhaW4gcmVzdWx0cy4gQnlcbiAgICAgKiBkZWZhdWx0LCB2YWx1ZXMgYXJlIGFzc3VtZWQgdG8gYmUgdGhlbWUgaWRlbnRpZmllcnMuIElmIHVzaW5nXG4gICAgICogdGhlbWUgbGFiZWxzIG9yIHRoZW1lIHVyaXMsIHNwZWNpZnkgdGhlIG9wdGlvbmFsIHNlY29uZCBwYXJhbWV0ZXJcbiAgICAgKiB0byBiZSBlaXRoZXIgUGFyYW1ldGVycy5UT1BJQ19MQUJFTCBvciBQYXJhbWV0ZXJzLlRPUElDX1VSSVxuICAgICAqIHJlc3BlY3RpdmVseS5cbiAgICAgKiBAcGFyYW0gIHRvcGljcyAtIHN0cmluZyBvciBhcnJheSBvZiBzdHJpbmdzIGNvbnRhaW5pbmcgdGhlbWUgY29uc3RyYWludFxuICAgICAqIEBwYXJhbSAgcGFyYW1ldGVyIC0gb3B0aW9uYWwsIHRvIGluZGljYXRlIHRoZSBwYXJhbWV0ZXIgdG8gdXNlXG4gICAgICogQHJldHVybiBRdWVyeSBpbnN0YW5jZVxuICAgICAqL1xuICAgIHRvcGljcyh0b3BpY3M6c3RyaW5nfHN0cmluZ1tdLCBwYXJhbWV0ZXIgPzogc3RyaW5nKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRUb3BpY3ModG9waWNzLCBwYXJhbWV0ZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgYSBUb3BpYyBvciBzZXQgb2YgVG9waWNzIHRvIGNvbnN0cmFpbiByZXN1bHRzLiBCeVxuICAgICAqIGRlZmF1bHQsIHZhbHVlcyBhcmUgYXNzdW1lZCB0byBiZSB0aGVtZSBpZGVudGlmaWVycy4gSWYgdXNpbmdcbiAgICAgKiB0aGVtZSBsYWJlbHMgb3IgdGhlbWUgdXJpcywgc3BlY2lmeSB0aGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlclxuICAgICAqIHRvIGJlIGVpdGhlciBQYXJhbWV0ZXJzLlRPUElDX0xBQkVMIG9yIFBhcmFtZXRlcnMuVE9QSUNfVVJJXG4gICAgICogcmVzcGVjdGl2ZWx5LlxuICAgICAqIEBwYXJhbSB0b3BpY3MgLSB0aGVtZSBvciB0b3BpY3MgdG8gY29uc3RyYWluIGJ5XG4gICAgICovXG4gICAgc2V0VG9waWNzICh0b3BpY3M6c3RyaW5nfHN0cmluZ1tdLCBwYXJhbWV0ZXIgPzogc3RyaW5nKSB7XG5cbiAgICAgICAgLy9jbGVhciBleGlzdGluZ1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlRPUElDU19JRCwgbnVsbCk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVE9QSUNTX0xBQkVMLCBudWxsKTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5UT1BJQ1NfVVJJLCBudWxsKTtcblxuICAgICAgICBsZXQgcGFyYW0gPSBwYXJhbWV0ZXIgfHwgUGFyYW1ldGVycy5UT1BJQ1NfSUQ7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKHBhcmFtLCB0b0FycmF5KHRvcGljcykpO1xuICAgIH1cblxuICAgIGdldFRvcGljcyAoKSA6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVE9QSUNTX0lEKSB8fFxuICAgICAgICAgICAgdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5UT1BJQ1NfTEFCRUwpIHx8XG4gICAgICAgICAgICB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlRPUElDU19VUkkpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSBhIFB1Ymxpc2hlciBvciBzZXQgb2YgUHVibGlzaGVycyB0byBjb25zdHJhaW4gcmVzdWx0cy4gQnlcbiAgICAgKiBkZWZhdWx0LCB2YWx1ZXMgYXJlIGFzc3VtZWQgdG8gYmUgaWRlbnRpZmllcnMuIElmIHVzaW5nIGxhYmVscyBvciB1cmlzLFxuICAgICAqIHNwZWNpZnkgdGhlIG9wdGlvbmFsIHNlY29uZCBwYXJhbWV0ZXIgdG8gYmUgZWl0aGVyXG4gICAgICogUGFyYW1ldGVycy5QVUJMSVNIRVJTX0xBQkVMIG9yIFBhcmFtZXRlcnMuUFVCTElTSEVSU19VUkkgcmVzcGVjdGl2ZWx5LlxuICAgICAqIEBwYXJhbSBwYXJhbWV0ZXIgLSBvcHRpb25hbCwgdG8gaW5kaWNhdGUgdGhlIHBhcmFtZXRlciB0byB1c2VcbiAgICAgKiBAcmV0dXJuIFF1ZXJ5XG4gICAgICovXG4gICAgcHVibGlzaGVycyhwdWJsaXNoZXJzOnN0cmluZ3xzdHJpbmdbXSwgcGFyYW1ldGVyPzpzdHJpbmcpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldFB1Ymxpc2hlcnMocHVibGlzaGVycywgcGFyYW1ldGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSBhIFB1Ymxpc2hlciBvciBzZXQgb2YgUHVibGlzaGVycyB0byBjb25zdHJhaW4gcmVzdWx0cy4gQnlcbiAgICAgKiBkZWZhdWx0LCB2YWx1ZXMgYXJlIGFzc3VtZWQgdG8gYmUgaWRlbnRpZmllcnMuIElmIHVzaW5nIGxhYmVscyBvciB1cmlzLFxuICAgICAqIHNwZWNpZnkgdGhlIG9wdGlvbmFsIHNlY29uZCBwYXJhbWV0ZXIgdG8gYmUgZWl0aGVyXG4gICAgICogUGFyYW1ldGVycy5QVUJMSVNIRVJTX0xBQkVMIG9yIFBhcmFtZXRlcnMuUFVCTElTSEVSU19VUkkgcmVzcGVjdGl2ZWx5LlxuICAgICAqIEBwYXJhbSBwdWJsaXNoZXJzIC0gcHVibGlzaGluZyBvcmdzIHRvIGNvbnN0cmFpbiBieVxuICAgICAqL1xuICAgIHNldFB1Ymxpc2hlcnMgKHB1Ymxpc2hlcnM6c3RyaW5nfHN0cmluZ1tdLCBwYXJhbWV0ZXI/OnN0cmluZykge1xuXG4gICAgICAgIC8vY2xlYXIgZXhpc3RpbmdcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5QVUJMSVNIRVJTX0lELCBudWxsKTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5QVUJMSVNIRVJTX0xBQkVMLCBudWxsKTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5QVUJMSVNIRVJTX1VSSSwgbnVsbCk7XG5cbiAgICAgICAgbGV0IHBhcmFtID0gcGFyYW1ldGVyIHx8IFBhcmFtZXRlcnMuUFVCTElTSEVSU19JRDtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIocGFyYW0sIHRvQXJyYXkocHVibGlzaGVycykpO1xuICAgIH1cblxuICAgIGdldFB1Ymxpc2hlcnMgKCkgOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlBVQkxJU0hFUlNfSUQpIHx8XG4gICAgICAgICAgICB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlBVQkxJU0hFUlNfTEFCRUwpIHx8XG4gICAgICAgICAgICB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlBVQkxJU0hFUlNfVVJJKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgYSBQb2ludCBvZiBDb250YWN0IG9yIHNldCBvZiBDb250YWN0cyB0byBjb25zdHJhaW4gcmVzdWx0cy4gQnlcbiAgICAgKiBkZWZhdWx0LCB2YWx1ZXMgYXJlIGFzc3VtZWQgdG8gYmUgaWRlbnRpZmllcnMuIElmIHVzaW5nXG4gICAgICogbGFiZWxzIG9yIHVyaXMsIHNwZWNpZnkgdGhlIG9wdGlvbmFsIHNlY29uZCBwYXJhbWV0ZXIgdG8gYmUgZWl0aGVyXG4gICAgICogUGFyYW1ldGVycy5DT05UQUNUU19MQUJFTCBvciBQYXJhbWV0ZXJzLkNPTlRBQ1RTX1VSSSByZXNwZWN0aXZlbHkuXG4gICAgICogQHBhcmFtIHBhcmFtZXRlciAtIG9wdGlvbmFsLCB0byBpbmRpY2F0ZSB0aGUgcGFyYW1ldGVyIHRvIHVzZVxuICAgICAqIEByZXR1cm4gUXVlcnlcbiAgICAgKi9cbiAgICBjb250YWN0cyhjb250YWN0czpzdHJpbmd8c3RyaW5nW10sIHBhcmFtZXRlcj86c3RyaW5nKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRDb250YWN0cyhjb250YWN0cywgcGFyYW1ldGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSBhIENvbnRhY3Qgb3Igc2V0IG9mIENvbnRhY3RzIHRvIGNvbnN0cmFpbiByZXN1bHRzLiBCeVxuICAgICAqIGRlZmF1bHQsIHZhbHVlcyBhcmUgYXNzdW1lZCB0byBiZSBpZGVudGlmaWVycy4gSWYgdXNpbmdcbiAgICAgKiBsYWJlbHMgb3IgdXJpcywgc3BlY2lmeSB0aGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlciB0byBiZSBlaXRoZXJcbiAgICAgKiBQYXJhbWV0ZXJzLkNPTlRBQ1RTX0xBQkVMIG9yIFBhcmFtZXRlcnMuQ09OVEFDVFNfVVJJIHJlc3BlY3RpdmVseS5cbiAgICAgKiBAcGFyYW0gY29udGFjdHMgLSBwdWJsaXNoaW5nIG9yZ3MgdG8gY29uc3RyYWluIGJ5XG4gICAgICovXG4gICAgc2V0Q29udGFjdHMgKGNvbnRhY3RzOnN0cmluZ3xzdHJpbmdbXSwgcGFyYW1ldGVyPzpzdHJpbmcpIHtcblxuICAgICAgICAvL2NsZWFyIGV4aXN0aW5nXG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuQ09OVEFDVFNfSUQsIG51bGwpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkNPTlRBQ1RTX0xBQkVMLCBudWxsKTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5DT05UQUNUU19VUkksIG51bGwpO1xuXG4gICAgICAgIGxldCBwYXJhbSA9IHBhcmFtZXRlciB8fCBQYXJhbWV0ZXJzLkNPTlRBQ1RTX0lEO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihwYXJhbSwgdG9BcnJheShjb250YWN0cykpO1xuICAgIH1cblxuICAgIGdldENvbnRhY3RzICgpIDogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5DT05UQUNUU19JRCkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuQ09OVEFDVFNfTEFCRUwpIHx8XG4gICAgICAgICAgICB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkNPTlRBQ1RTX1VSSSk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IHRoZSBpZGVudGlmaWVyIG9mIGFuIEFnZW50IChDb21tdW5pdHksIEdyb3VwLCBldGMpIHRoYXRcbiAgICAgKiB1c2VzIGl0ZW1zIHlvdSB3aXNoIHRvIGZpbmQgaW4gc2VhcmNoIHJlc3VsdHMuIEJ5XG4gICAgICogZGVmYXVsdCwgdmFsdWVzIGFyZSBhc3N1bWVkIHRvIGJlIGlkZW50aWZpZXJzLiBJZiB1c2luZ1xuICAgICAqIGxhYmVscyBvciB1cmlzLCBzcGVjaWZ5IHRoZSBvcHRpb25hbCBzZWNvbmQgcGFyYW1ldGVyXG4gICAgICogdG8gYmUgZWl0aGVyIFBhcmFtZXRlcnMuVVNFRF9CWV9MQUJFTCBvciBQYXJhbWV0ZXJzLlVTRURfQllfVVJJXG4gICAgICogcmVzcGVjdGl2ZWx5LlxuICAgICAqIEBwYXJhbSBwYXJhbWV0ZXIgLSBvcHRpb25hbCwgdG8gaW5kaWNhdGUgdGhlIHBhcmFtZXRlciB0byB1c2VcbiAgICAgKiBAcmV0dXJuIFF1ZXJ5XG4gICAgICovXG4gICAgdXNlZEJ5KGlkczpzdHJpbmd8c3RyaW5nW10sIHBhcmFtZXRlcj86c3RyaW5nKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRVc2VkQnkoaWRzLCBwYXJhbWV0ZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IHRoZSBpZGVudGlmaWVyIG9mIGFuIEFnZW50IChDb21tdW5pdHksIEdyb3VwLCBldGMpIHRoYXRcbiAgICAgKiB1c2VzIGl0ZW1zIHlvdSB3aXNoIHRvIGZpbmQgaW4gc2VhcmNoIHJlc3VsdHMuIEJ5XG4gICAgICogZGVmYXVsdCwgdmFsdWVzIGFyZSBhc3N1bWVkIHRvIGJlIGlkZW50aWZpZXJzLiBJZiB1c2luZ1xuICAgICAqIGxhYmVscyBvciB1cmlzLCBzcGVjaWZ5IHRoZSBvcHRpb25hbCBzZWNvbmQgcGFyYW1ldGVyXG4gICAgICogdG8gYmUgZWl0aGVyIFBhcmFtZXRlcnMuVVNFRF9CWV9MQUJFTCBvciBQYXJhbWV0ZXJzLlVTRURfQllfVVJJXG4gICAgICogcmVzcGVjdGl2ZWx5LlxuICAgICAqIEBwYXJhbSBpZHMgLSBwdWJsaXNoaW5nIG9yZ3MgdG8gY29uc3RyYWluIGJ5XG4gICAgICovXG4gICAgc2V0VXNlZEJ5IChpZHM6c3RyaW5nfHN0cmluZ1tdLCBwYXJhbWV0ZXI/OnN0cmluZykge1xuXG4gICAgICAgIC8vY2xlYXIgZXhpc3RpbmdcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5VU0VEX0JZX0lELCBudWxsKTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5VU0VEX0JZX0xBQkVMLCBudWxsKTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5VU0VEX0JZX1VSSSwgbnVsbCk7XG5cbiAgICAgICAgbGV0IHBhcmFtID0gcGFyYW1ldGVyIHx8IFBhcmFtZXRlcnMuVVNFRF9CWV9JRDtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIocGFyYW0sIHRvQXJyYXkoaWRzKSk7XG4gICAgfVxuXG4gICAgZ2V0VXNlZEJ5ICgpIDogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5VU0VEX0JZX0lEKSB8fFxuICAgICAgICAgICAgdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5VU0VEX0JZX0xBQkVMKSB8fFxuICAgICAgICAgICAgdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5VU0VEX0JZX1VSSSk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IGEgQ29uY2VwdCBTY2hlbWUgb3Igc2V0IG9mIENvbmNlcHQgU2NoZW1lcyB0byBjb25zdHJhaW4gcmVzdWx0cy4gQnlcbiAgICAgKiBkZWZhdWx0LCB2YWx1ZXMgYXJlIGFzc3VtZWQgdG8gYmUgaWRlbnRpZmllcnMuIElmIHVzaW5nXG4gICAgICogbGFiZWxzIG9yIHVyaXMsIHNwZWNpZnkgdGhlIG9wdGlvbmFsIHNlY29uZCBwYXJhbWV0ZXJcbiAgICAgKiB0byBiZSBlaXRoZXIgUGFyYW1ldGVycy5TQ0hFTUVTX0xBQkVMIG9yIFBhcmFtZXRlcnMuU0NIRU1FU19VUklcbiAgICAgKiByZXNwZWN0aXZlbHkuXG4gICAgICogQHBhcmFtIHNjaGVtZXMgLSBzY2hlbWVzIHRvIGNvbnN0cmFpbiBieVxuICAgICAqIEBwYXJhbSBwYXJhbWV0ZXIgLSBvcHRpb25hbCwgdG8gaW5kaWNhdGUgdGhlIHBhcmFtZXRlciB0byB1c2VcbiAgICAgKiBAcmV0dXJuIFF1ZXJ5XG4gICAgICovXG4gICAgc2NoZW1lcyhzY2hlbWVzOnN0cmluZ3xzdHJpbmdbXSwgcGFyYW1ldGVyPzpzdHJpbmcpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldFNjaGVtZXMoc2NoZW1lcywgcGFyYW1ldGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSBhIENvbmNlcHQgU2NoZW1lIG9yIHNldCBvZiBDb25jZXB0IFNjaGVtZXMgdG8gY29uc3RyYWluIHJlc3VsdHMuIEJ5XG4gICAgICogZGVmYXVsdCwgdmFsdWVzIGFyZSBhc3N1bWVkIHRvIGJlIHRoZW1lIGlkZW50aWZpZXJzLiBJZiB1c2luZ1xuICAgICAqIHRoZW1lIGxhYmVscyBvciB0aGVtZSB1cmlzLCBzcGVjaWZ5IHRoZSBvcHRpb25hbCBzZWNvbmQgcGFyYW1ldGVyXG4gICAgICogdG8gYmUgZWl0aGVyIFBhcmFtZXRlcnMuU0NIRU1FU19MQUJFTCBvciBQYXJhbWV0ZXJzLlNDSEVNRVNfVVJJXG4gICAgICogcmVzcGVjdGl2ZWx5LlxuICAgICAqIEBwYXJhbSBzY2hlbWVzIC0gc2NoZW1lcyB0byBjb25zdHJhaW4gYnlcbiAgICAgKiBAcGFyYW0gcGFyYW1ldGVyIC0gb3B0aW9uYWwsIHRvIGluZGljYXRlIHRoZSBwYXJhbWV0ZXIgdG8gdXNlXG4gICAgICovXG4gICAgc2V0U2NoZW1lcyAoc2NoZW1lczpzdHJpbmd8c3RyaW5nW10sIHBhcmFtZXRlcj86c3RyaW5nKSB7XG5cbiAgICAgICAgLy9jbGVhciBleGlzdGluZ1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlNDSEVNRVNfSUQsIG51bGwpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlNDSEVNRVNfTEFCRUwsIG51bGwpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlNDSEVNRVNfVVJJLCBudWxsKTtcblxuICAgICAgICBsZXQgcGFyYW0gPSBwYXJhbWV0ZXIgfHwgUGFyYW1ldGVycy5TQ0hFTUVTX0lEO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihwYXJhbSwgdG9BcnJheShzY2hlbWVzKSk7XG4gICAgfVxuXG4gICAgZ2V0U2NoZW1lcygpIDogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5TQ0hFTUVTX0lEKSB8fFxuICAgICAgICAgICAgdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5TQ0hFTUVTX0xBQkVMKSB8fFxuICAgICAgICAgICAgdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5TQ0hFTUVTX1VSSSk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBzZXJ2aWNlVHlwZXModHlwZXM6c3RyaW5nfHN0cmluZ1tdKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRTZXJ2aWNlVHlwZXModHlwZXMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gdHlwZXMgLSBpZHNcbiAgICAgKi9cbiAgICBzZXRTZXJ2aWNlVHlwZXMgKHR5cGVzOnN0cmluZ3xzdHJpbmdbXSkge1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlNFUlZJQ0VfVFlQRVMsIHRvQXJyYXkodHlwZXMpKTtcbiAgICB9XG5cbiAgICBnZXRTZXJ2aWNlVHlwZXMgKCkgOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlNFUlZJQ0VfVFlQRVMpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgdmlzaWJpbGl0eSh2aXM6XCJwdWJsaWNcInxcInByaXZhdGVcIikgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0VmlzaWJpbGl0eSh2aXMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gdmlzaWJpbGl0eSAtIG9uZSBvZiAncHVibGljJyBvciAncHJpdmF0ZSdcbiAgICAgKi9cbiAgICBzZXRWaXNpYmlsaXR5ICh2aXNpYmlsaXR5IDogXCJwdWJsaWNcInxcInByaXZhdGVcIikge1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlZJU0lCSUxJVFksIHZpc2liaWxpdHkpO1xuICAgIH1cblxuICAgIGdldFZpc2liaWxpdHkgKCkgOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5WSVNJQklMSVRZKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIHN0YXR1cyh2YWx1ZSA6IHN0cmluZykgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdHVzKHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHN0YXR1cyAtIGN1cnJlbnQgc3RhdHVzIG9mIEl0ZW1cbiAgICAgKi9cbiAgICBzZXRTdGF0dXMgKHZhbHVlIDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuU1RBVFVTLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgZ2V0U3RhdHVzICgpIDogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuU1RBVFVTKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIGV4dGVudChiYm94IDogYW55KSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRFeHRlbnQoYmJveCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBiYm94IC0gc3RyaW5nIGZvcm0gb2YgXCJtaW54LG1pbnksbWF4eCxtYXh5XCIsIG9yIEwuTGF0TG5nQm91bmRzLCBvciBBcnJheVxuICAgICAqL1xuICAgIHNldEV4dGVudCAoYmJveCA6IGFueSkge1xuICAgICAgICBpZihiYm94KSB7XG4gICAgICAgICAgICBpZih0eXBlb2YoYmJveC50b0Jib3hTdHJpbmcpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIC8vTGVhZmxldCBCb3VuZHMgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICBiYm94ID0gYmJveC50b0Jib3hTdHJpbmcoKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmKHR5cGVvZihiYm94LnB1c2gpICE9PSAndW5kZWZpbmVkJyAmJiBiYm94Lmxlbmd0aCAmJlxuICAgICAgICAgICAgICAgIC8vTmVzdGVkIGFycmF5IChhbHRlcm5hdGUgTGVhZmxldCByZXByZXNlbnRhdGlvbik6XG4gICAgICAgICAgICAgICAgLy8gWyBbbWluTGF0LG1pbkxvbmddLCBbbWF4TGF0LG1heExvbmddIF1cbiAgICAgICAgICAgICAgICB0eXBlb2YoYmJveFswXS5wdXNoKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBiYm94ID0gYmJveFswXVsxXSsnLCcrYmJveFswXVswXSsnLCcrYmJveFsxXVsxXSsnLCcrYmJveFsxXVswXTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmKHR5cGVvZihiYm94KSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBpZighQkJPWF9SRUdFWC50ZXN0KGJib3gpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgYXJndW1lbnQ6IGJib3ggc3RyaW5nIG11c3QgYmUgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJpbiBmb3JtIG9mICdtaW54LG1pbnksbWF4eCxtYXh5J1wiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgYXJndW1lbnQ6IGJib3ggbXVzdCBiZSBvbmUgb2YgXCIgK1xuICAgICAgICAgICAgICAgICAgICBcIkxlYWZsZXQuQm91bmRzLCBuZXN0ZWQgYXJyYXksIG9yIGJib3ggc3RyaW5nXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuRVhURU5ULCBiYm94KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIGJib3ggc3RyaW5nIG9yIG51bGwgaWYgbm90IHNldFxuICAgICAqL1xuICAgIGdldEV4dGVudCAoKSA6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkVYVEVOVCk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAvKipcbiAgICAgKiBFeC5cbiAgICAgKiAgY29uc3QgeyBLR0NsYXNzaWZpZXJzLCBRdWVyeSB9IGZyb20gJ2dlb3BsYXRmb3JtLmNsaWVudCc7XG4gICAgICogIGxldCBwdXJwb3NlSWQgPSAnLi4uJztcbiAgICAgKiAgbGV0IHF1ZXJ5ID0gbmV3IFF1ZXJ5KCk7XG4gICAgICogIHF1ZXJ5LmNsYXNzaWZpZXIoIEtHQ2xhc3NpZmllcnMuUFVSUE9TRSwgcHVycG9zZUlkICk7XG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2xhc3NpZmllciAtIHN0cmluZyBuYW1lIG9mIGNsYXNzaWZpZXIgdG8gdXNlXG4gICAgICogQHBhcmFtIHZhbHVlIC0gaWQgb3IgYXJyYXkgb2YgaWRzIG9mIGNvbmNlcHRzIHRvIHVzZVxuICAgICAqIEByZXR1cm4gUXVlcnlcbiAgICAgKi9cbiAgICBjbGFzc2lmaWVyKGNsYXNzaWZpZXIgOiBzdHJpbmcsIHZhbHVlIDogc3RyaW5nfHN0cmluZ1tdKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRDbGFzc2lmaWVyKGNsYXNzaWZpZXIsIHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXguXG4gICAgICogIGNvbnN0IHsgS0dDbGFzc2lmaWVycywgUXVlcnkgfSBmcm9tICdnZW9wbGF0Zm9ybS5jbGllbnQnO1xuICAgICAqICBsZXQgcHVycG9zZUlkID0gJy4uLic7XG4gICAgICogIGxldCBxdWVyeSA9IG5ldyBRdWVyeSgpO1xuICAgICAqICBxdWVyeS5zZXRDbGFzc2lmaWVyKCBLR0NsYXNzaWZpZXJzLlBVUlBPU0UsIHB1cnBvc2VJZCApO1xuICAgICAqXG4gICAgICogQHBhcmFtIGNsYXNzaWZpZXIgLSBzdHJpbmcgbmFtZSBvZiBjbGFzc2lmaWVyIHRvIHVzZVxuICAgICAqIEBwYXJhbSB2YWx1ZSAtIGlkIG9yIGFycmF5IG9mIGlkcyBvZiBjb25jZXB0cyB0byB1c2VcbiAgICAgKi9cbiAgICBzZXRDbGFzc2lmaWVyKGNsYXNzaWZpZXIgOiBzdHJpbmcsIHZhbHVlIDogc3RyaW5nfHN0cmluZ1tdKSB7XG4gICAgICAgIGxldCBhcnIgPSB0b0FycmF5KHZhbHVlKTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5DTEFTU0lGSUVSUyArIFwiLlwiICsgY2xhc3NpZmllciwgYXJyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gY2xhc3NpZmllciAtIG5hbWUgb2YgY2xhc3NpZmllciBjb25zdHJhaW50IGluIHVzZVxuICAgICAqIEByZXR1cm4gYXJyYXkgb2YgY29uY2VwdCBpZHNcbiAgICAgKi9cbiAgICBnZXRDbGFzc2lmaWVyKGNsYXNzaWZpZXIgOiBzdHJpbmcpIDogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5DTEFTU0lGSUVSUyArIFwiLlwiICsgY2xhc3NpZmllcikgfHwgW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXguXG4gICAgICogIGNvbnN0IHsgS0dDbGFzc2lmaWVycywgUXVlcnkgfSBmcm9tICdnZW9wbGF0Zm9ybS5jbGllbnQnO1xuICAgICAqICBsZXQgcHVycG9zZUlkID0gJy4uLicsXG4gICAgICogICAgICBmdW5jdGlvbklkcyA9IFsnLi4uJywnLi4uJ107XG4gICAgICogIGxldCBxdWVyeSA9IG5ldyBRdWVyeSgpO1xuICAgICAqICBxdWVyeS5jbGFzc2lmaWVycyh7XG4gICAgICogICAgICAgS0dDbGFzc2lmaWVycy5QVVJQT1NFOiBwdXJwb3NlSWQsXG4gICAgICogICAgICAgS0dDbGFzc2lmaWVycy5GVU5DVElPTjogZnVuY3Rpb25JZHNcbiAgICAgKiAgfSk7XG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmFsdWUgLSBvYmplY3QgZGVmaW5pbmcgY2xhc3NpZmllcnNcbiAgICAgKiBAcmV0dXJuIFF1ZXJ5IGluc3RhbmNlXG4gICAgICovXG4gICAgY2xhc3NpZmllcnModmFsdWUgOiBhbnkpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldENsYXNzaWZpZXJzKHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHZhbHVlIC0gb2JqZWN0IGRlZmluaW5nIGNsYXNzaWZpZXJzXG4gICAgICovXG4gICAgc2V0Q2xhc3NpZmllcnMgKHZhbHVlIDogYW55KSB7XG4gICAgICAgIGNvbnN0IGNsYXNzZXMgPSBPYmplY3Qua2V5cyhDbGFzc2lmaWVycykubWFwKGs9PkNsYXNzaWZpZXJzW2tdKTtcbiAgICAgICAgaWYoIXZhbHVlIHx8IHR5cGVvZih2YWx1ZSkgIT09ICdvYmplY3QnIHx8IEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICBjbGFzc2VzLmZvckVhY2goIGNsYXNzaWZpZXIgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJQYXJhbWV0ZXIoIFBhcmFtZXRlcnMuQ0xBU1NJRklFUlMgKyBcIi5cIiArIGNsYXNzaWZpZXIgKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIE9iamVjdC5rZXlzKHZhbHVlKS5mb3JFYWNoKCBjbGFzc2lmaWVyID0+IHtcbiAgICAgICAgICAgIGlmKH5jbGFzc2VzLmluZGV4T2YoY2xhc3NpZmllcikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldENsYXNzaWZpZXIoIGNsYXNzaWZpZXIsIHZhbHVlW2NsYXNzaWZpZXJdICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4gY2xhc3NpZmllcnMgdXNlZCBpbiB0aGUgcXVlcnlcbiAgICAgKi9cbiAgICBnZXRDbGFzc2lmaWVycyAoKSA6IGFueSB7XG4gICAgICAgIGxldCByZXN1bHQgPSB7fTtcbiAgICAgICAgT2JqZWN0LmtleXMoQ2xhc3NpZmllcnMpLm1hcChrPT5DbGFzc2lmaWVyc1trXSkuZm9yRWFjaCggY2xhc3NpZmllciA9PiB7XG4gICAgICAgICAgICByZXN1bHRbY2xhc3NpZmllcl0gPSB0aGlzLmdldENsYXNzaWZpZXIoY2xhc3NpZmllcik7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgbW9kaWZpZWQoZGF0ZSA6IG51bWJlcnxEYXRlLCBiZWZvcmVPckFmdGVyIDogYm9vbGVhbikgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0TW9kaWZpZWQoZGF0ZSwgYmVmb3JlT3JBZnRlcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBkYXRlIC0gZGF0ZSB0byBjb21wYXJlIGFnYWluc3RcbiAgICAgKiBAcGFyYW0gYmVmb3JlT3JBZnRlciAtIGZsYWcgc3BlY2lmeWluZyB3aGljaCBib3VuZGFyeSBjb25kaXRpb24gKHRydWUgPSBiZWZvcmUsIGZhbHNlID0gYWZ0ZXIpIGZsYWcgc3BlY2lmeWluZyB3aGV0aGVyIHRvIHRyaWdnZXIgdXBkYXRlIGF1dG9tYXRpY2FsbHlcbiAgICAgKi9cbiAgICBzZXRNb2RpZmllZCAoZGF0ZSA6IG51bWJlcnxEYXRlLCBiZWZvcmVPckFmdGVyOmJvb2xlYW4pIHtcblxuICAgICAgICAvL2lmIG5vIGRhdGUgd2FzIHN1cHBsaWVkLCBjb25zaWRlciBpdCBcInVuc2V0XCIgZm9yIGJvdGggcHJvcGVydGllc1xuICAgICAgICBpZighZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5NT0RJRklFRF9CRUZPUkUsIG51bGwpO1xuICAgICAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5NT0RJRklFRF9BRlRFUiwgbnVsbCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZighKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSlcbiAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlIGFzIG51bWJlcik7XG5cbiAgICAgICAgbGV0IGRpciA9IGJlZm9yZU9yQWZ0ZXIgJiYgKGJlZm9yZU9yQWZ0ZXIgPT09IHRydWUgfHwgYmVmb3JlT3JBZnRlciA9PT0gXCJ0cnVlXCIpO1xuICAgICAgICBsZXQgcHJvcCA9IGRpciA/IFBhcmFtZXRlcnMuTU9ESUZJRURfQkVGT1JFIDogUGFyYW1ldGVycy5NT0RJRklFRF9BRlRFUjsgICAgICAgLy9wcm9wZXJ0eSBiZWluZyBzZXRcbiAgICAgICAgbGV0IG9wcFByb3AgPSBkaXIgPyBQYXJhbWV0ZXJzLk1PRElGSUVEX0FGVEVSIDogUGFyYW1ldGVycy5NT0RJRklFRF9CRUZPUkU7ICAgIC8vdW5zZXQgb3Bwb3NpdGUgcHJvcGVydHlcbiAgICAgICAgbGV0IGFyZyA9IChkYXRlICYmIGRhdGUuZ2V0VGltZSkgPyBkYXRlLmdldFRpbWUoKSA6IGRhdGU7XG5cbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIob3BwUHJvcCwgbnVsbCk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKHByb3AsIGFyZyk7XG4gICAgfVxuXG4gICAgZ2V0TW9kaWZpZWQgKCkgOiBEYXRlIHtcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5NT0RJRklFRF9CRUZPUkUpIHx8XG4gICAgICAgICAgICB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLk1PRElGSUVEX0FGVEVSKTtcbiAgICAgICAgaWYodmFsdWUgJiYgdHlwZW9mKHZhbHVlKSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHZhbHVlID0gbmV3IERhdGUodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIGNyZWF0ZWQoZGF0ZSA6IG51bWJlcnxEYXRlLCBiZWZvcmVPckFmdGVyOmJvb2xlYW4pIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldENyZWF0ZWQoZGF0ZSwgYmVmb3JlT3JBZnRlcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBkYXRlIC0gZGF0ZSB0byBjb21wYXJlIGFnYWluc3RcbiAgICAgKiBAcGFyYW0gYmVmb3JlT3JBZnRlciAtIGZsYWcgc3BlY2lmeWluZyB3aGljaCBib3VuZGFyeSBjb25kaXRpb24gKHRydWUgPSBiZWZvcmUsIGZhbHNlID0gYWZ0ZXIpIGZsYWcgc3BlY2lmeWluZyB3aGV0aGVyIHRvIHRyaWdnZXIgdXBkYXRlIGF1dG9tYXRpY2FsbHlcbiAgICAgKi9cbiAgICBzZXRDcmVhdGVkIChkYXRlIDogbnVtYmVyfERhdGUsIGJlZm9yZU9yQWZ0ZXI6Ym9vbGVhbikge1xuXG4gICAgICAgIC8vaWYgbm8gZGF0ZSB3YXMgc3VwcGxpZWQsIGNvbnNpZGVyIGl0IFwidW5zZXRcIiBmb3IgYm90aCBwcm9wZXJ0aWVzXG4gICAgICAgIGlmKCFkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkNSRUFURURfQkVGT1JFLCBudWxsKTtcbiAgICAgICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuQ1JFQVRFRF9BRlRFUiwgbnVsbCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZighKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSlcbiAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlIGFzIG51bWJlcik7XG5cbiAgICAgICAgbGV0IGRpciA9IGJlZm9yZU9yQWZ0ZXIgJiYgKGJlZm9yZU9yQWZ0ZXIgPT09IHRydWUgfHwgYmVmb3JlT3JBZnRlciA9PT0gXCJ0cnVlXCIpO1xuICAgICAgICBsZXQgcHJvcCA9IGRpciA/IFBhcmFtZXRlcnMuQ1JFQVRFRF9CRUZPUkUgOiBQYXJhbWV0ZXJzLkNSRUFURURfQUZURVI7ICAgICAgIC8vcHJvcGVydHkgYmVpbmcgc2V0XG4gICAgICAgIGxldCBvcHBQcm9wID0gZGlyID8gUGFyYW1ldGVycy5DUkVBVEVEX0FGVEVSIDogUGFyYW1ldGVycy5DUkVBVEVEX0JFRk9SRTsgICAgLy91bnNldCBvcHBvc2l0ZSBwcm9wZXJ0eVxuICAgICAgICBsZXQgYXJnID0gKGRhdGUgJiYgZGF0ZS5nZXRUaW1lKSA/IGRhdGUuZ2V0VGltZSgpIDogZGF0ZTtcblxuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihvcHBQcm9wLCBudWxsKTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIocHJvcCwgYXJnKTtcbiAgICB9XG5cbiAgICBnZXRDcmVhdGVkICgpIDogRGF0ZSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuQ1JFQVRFRF9CRUZPUkUpIHx8XG4gICAgICAgICAgICB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkNSRUFURURfQUZURVIpO1xuICAgICAgICBpZih2YWx1ZSAmJiB0eXBlb2YodmFsdWUpID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdmFsdWUgPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgYmVnaW5zKGRhdGUgOiBudW1iZXJ8RGF0ZSkgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0QmVnaW5EYXRlKGRhdGUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRCZWdpbkRhdGUgKGRhdGUgOiBudW1iZXJ8RGF0ZSkge1xuICAgICAgICBpZihkYXRlICYmIGRhdGUgaW5zdGFuY2VvZiBEYXRlKVxuICAgICAgICAgICAgZGF0ZSA9IGRhdGUuZ2V0VGltZSgpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkJFR0lOUywgZGF0ZSk7XG4gICAgfVxuXG4gICAgZ2V0QmVnaW5EYXRlICgpIDogRGF0ZSB7XG4gICAgICAgIGxldCBkYXRlID0gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5CRUdJTlMpO1xuICAgICAgICBpZihkYXRlKSBkYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgZW5kcyhkYXRlIDogbnVtYmVyfERhdGUpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldEVuZERhdGUoZGF0ZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldEVuZERhdGUgKGRhdGU6IG51bWJlcnxEYXRlKSB7XG4gICAgICAgIGlmKGRhdGUgJiYgZGF0ZSBpbnN0YW5jZW9mIERhdGUpXG4gICAgICAgICAgICBkYXRlID0gZGF0ZS5nZXRUaW1lKCk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuRU5EUywgZGF0ZSk7XG4gICAgfVxuXG4gICAgZ2V0RW5kRGF0ZSAoKSA6IERhdGUge1xuICAgICAgICBsZXQgZGF0ZSA9IHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuRU5EUyk7XG4gICAgICAgIGlmKGRhdGUpIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICBiZXR3ZWVuKGJlZ2luIDogbnVtYmVyfERhdGUsIGVuZCA6IG51bWJlcnxEYXRlKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRCZXR3ZWVuKGJlZ2luLCBlbmQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRCZXR3ZWVuKGJlZ2luIDogbnVtYmVyfERhdGUsIGVuZCA6IG51bWJlcnxEYXRlKSB7XG4gICAgICAgIHRoaXMuYmVnaW5zKGJlZ2luKTtcbiAgICAgICAgdGhpcy5lbmRzKGVuZCk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICByZXNvdXJjZVR5cGVzKHR5cGVzOiBzdHJpbmd8c3RyaW5nW10pIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldFJlc291cmNlVHlwZXModHlwZXMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRSZXNvdXJjZVR5cGVzKHR5cGVzOiBzdHJpbmd8c3RyaW5nW10pIHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5SRVNPVVJDRV9UWVBFLCB0b0FycmF5KHR5cGVzKSk7XG4gICAgfVxuXG4gICAgZ2V0UmVzb3VyY2VUeXBlcygpIDogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5SRVNPVVJDRV9UWVBFKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIGZhY2V0cyhuYW1lcyA6IHN0cmluZ3xzdHJpbmdbXSkgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0RmFjZXRzKG5hbWVzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBAcGFyYW0gbmFtZXMgLSBuYW1lcyBvZiBmYWNldHNcbiAgICAgKi9cbiAgICBzZXRGYWNldHMgKG5hbWVzOiBzdHJpbmd8c3RyaW5nW10pIHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5GQUNFVFMsIHRvQXJyYXkobmFtZXMpKTtcbiAgICB9XG5cbiAgICBnZXRGYWNldHMoKSA6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuRkFDRVRTKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbmFtZSAtIG5hbWUgb2YgZmFjZXQgdG8gYWRkXG4gICAgICovXG4gICAgYWRkRmFjZXQobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGxldCBmYWNldHMgPSB0aGlzLmdldEZhY2V0cygpIHx8IFtdO1xuICAgICAgICBmYWNldHMucHVzaChuYW1lKTtcbiAgICAgICAgdGhpcy5zZXRGYWNldHMoZmFjZXRzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbmFtZSAtIG5hbWUgb2YgZmFjZXQgdG8gcmVtb3ZlXG4gICAgICovXG4gICAgcmVtb3ZlRmFjZXQobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGxldCBmYWNldHMgPSB0aGlzLmdldEZhY2V0cygpIHx8IFtdO1xuICAgICAgICBsZXQgaWR4ID0gZmFjZXRzLmluZGV4T2YobmFtZSk7XG4gICAgICAgIGlmKGlkeD49MCkge1xuICAgICAgICAgICAgZmFjZXRzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgdGhpcy5zZXRGYWNldHMoZmFjZXRzKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgZmllbGRzKGZpZWxkczogc3RyaW5nfHN0cmluZ1tdKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRGaWVsZHMoZmllbGRzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGZpZWxkcyAtIGxpc3Qgb2YgZmllbGQgbmFtZXMgdG8gcmVxdWVzdCBmb3IgZWFjaCBzZWFyY2ggcmVzdWx0XG4gICAgICovXG4gICAgc2V0RmllbGRzIChmaWVsZHM6IHN0cmluZ3xzdHJpbmdbXSkge1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkZJRUxEUywgdG9BcnJheShmaWVsZHMpKTtcbiAgICB9XG5cbiAgICBnZXRGaWVsZHMoKSA6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuRklFTERTKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZmllbGQgLSBuYW1lIG9mIGZpZWxkIHRvIHJlbW92ZVxuICAgICAqL1xuICAgIGFkZEZpZWxkKGZpZWxkOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGZpZWxkcyA9IHRoaXMuZ2V0RmllbGRzKCkgfHwgW107XG4gICAgICAgIGZpZWxkcy5wdXNoKGZpZWxkKTtcbiAgICAgICAgdGhpcy5zZXRGaWVsZHMoZmllbGRzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZmllbGQgLSBuYW1lIG9mIGZpZWxkIHRvIHJlbW92ZVxuICAgICAqL1xuICAgIHJlbW92ZUZpZWxkKGZpZWxkOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGZpZWxkcyA9IHRoaXMuZ2V0RmllbGRzKCkgfHwgW107XG4gICAgICAgIGxldCBpZHggPSBmaWVsZHMuaW5kZXhPZihmaWVsZCk7XG4gICAgICAgIGlmKGlkeD49MCkge1xuICAgICAgICAgICAgZmllbGRzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgdGhpcy5zZXRGaWVsZHMoZmllbGRzKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gcGFnZSAtIHBhZ2Ugb2YgcmVzdWx0cyB0byBmZXRjaFxuICAgICAqL1xuICAgIHBhZ2UgKHBhZ2U6IG51bWJlcikgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0UGFnZShwYWdlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0UGFnZShwYWdlOiBudW1iZXIpIHtcbiAgICAgICAgaWYoaXNOYU4ocGFnZSkgfHwgcGFnZSoxPDApIHJldHVybjtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5QQUdFLCBwYWdlKjEpO1xuICAgIH1cblxuICAgIGdldFBhZ2UoKSA6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlBBR0UpO1xuICAgIH1cblxuICAgIG5leHRQYWdlKCkgOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRQYWdlKHRoaXMuZ2V0UGFnZSgpKzEpO1xuICAgIH1cblxuICAgIHByZXZpb3VzUGFnZSgpIDogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0UGFnZSh0aGlzLmdldFBhZ2UoKS0xKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBzaXplIC0gcGFnZSBzaXplIHRvIHJlcXVlc3RcbiAgICAgKi9cbiAgICBwYWdlU2l6ZSAoc2l6ZTogbnVtYmVyKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRQYWdlU2l6ZShzaXplKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0UGFnZVNpemUgKHNpemU6IG51bWJlcikge1xuICAgICAgICBpZihpc05hTihzaXplKSB8fCBzaXplKjE8MCkgcmV0dXJuO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlBBR0VfU0laRSwgc2l6ZSoxKTtcbiAgICB9XG5cbiAgICBnZXRQYWdlU2l6ZSgpIDogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuUEFHRV9TSVpFKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBzb3J0IC0gZm9ybSBvZiA8ZmllbGQ+LDxkaXI+IG9yIGp1c3QgZmllbGQgbmFtZVxuICAgICAqIEBwYXJhbSBvcmRlciAtIG9wdGlvbmFsLCBlaXRoZXIgJ2FzYycgb3IgJ2Rlc2MnXG4gICAgICovXG4gICAgc29ydCAoc29ydDogc3RyaW5nLCBvcmRlcj86c3RyaW5nKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRTb3J0KHNvcnQsIG9yZGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHNvcnQgLSBmb3JtIG9mIDxmaWVsZD4sPGRpcj4gb3IganVzdCBmaWVsZCBuYW1lXG4gICAgICogQHBhcmFtIG9yZGVyIC0gb3B0aW9uYWwsIGVpdGhlciAnYXNjJyBvciAnZGVzYydcbiAgICAgKi9cbiAgICAgc2V0U29ydChzb3J0OiBzdHJpbmcsIG9yZGVyPzpzdHJpbmcpIHtcbiAgICAgICAgIG9yZGVyID0gb3JkZXIgfHwgJ2Rlc2MnO1xuICAgICAgICAgaWYoc29ydCAmJiBzb3J0LmluZGV4T2YoJywnKTwwKVxuICAgICAgICAgICAgc29ydCA9IHNvcnQgKyAnLCcgKyBvcmRlcjtcbiAgICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuU09SVCwgc29ydCk7XG4gICAgfVxuXG4gICAgZ2V0U29ydCgpIDogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuU09SVCk7XG4gICAgfVxuXG4gICAgZ2V0U29ydEZpZWxkKCkgOiBzdHJpbmcgfCBudWxsIHtcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5nZXRTb3J0KCk7XG4gICAgICAgIHJldHVybiB2YWx1ZSAmJiB2YWx1ZS5sZW5ndGggPyB2YWx1ZS5zcGxpdCgnLCcpWzBdIDogbnVsbDtcbiAgICB9XG5cbiAgICBnZXRTb3J0T3JkZXIoKSA6IHN0cmluZyB8IG51bGwge1xuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLmdldFNvcnQoKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlICYmIHZhbHVlLmxlbmd0aCA/IHZhbHVlLnNwbGl0KCcsJylbMV0gOiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4gbGlzdCBvZiBrZXktdmFsdWUgcGFpcnMgb2Ygc29ydCBvcHRpb25zXG4gICAgICovXG4gICAgZ2V0U29ydE9wdGlvbnMoKSA6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgfVtdIHtcbiAgICAgICAgcmV0dXJuIFNPUlRfT1BUSU9OU19ERUZBVUxULnNsaWNlKDApO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBjbGVhciAoKSB7XG4gICAgICAgIHRoaXMucXVlcnkgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMuZGVmYXVsdFF1ZXJ5KSk7XG4gICAgfVxufVxuXG5leHBvcnQge1xuICAgIFF1ZXJ5IGFzIGRlZmF1bHQsXG4gICAgUXVlcnksXG4gICAgRmllbGRzLFxuICAgIEZhY2V0c1xufTtcbiJdfQ==