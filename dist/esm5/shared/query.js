import Parameters from './parameters';
import Classifiers from './classifiers';
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
var FIELDS_DEFAULT = [
    Fields.CREATED, Fields.MODIFIED, Fields.CREATED_BY,
    Fields.PUBLISHERS, Fields.THEMES, Fields.DESCRIPTION
];
/* --------------------------------------------------------- */
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
    USED_BY: 'usedBy',
    VIEWS: 'views',
    VISIBILITY: 'visibility'
};
var FACETS_DEFAULT = [
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
var FacetToParam = {};
FacetToParam[Facets.TYPES] = Parameters.TYPES;
FacetToParam[Facets.THEMES] = Parameters.THEMES_ID;
FacetToParam[Facets.TOPICS] = Parameters.TOPICS_ID;
FacetToParam[Facets.PUBLISHERS] = Parameters.PUBLISHERS_ID;
FacetToParam[Facets.CONTACTS] = Parameters.CONTACTS_ID;
FacetToParam[Facets.CONCEPT_SCHEMES] = Parameters.SCHEMES_ID;
FacetToParam[Facets.USED_BY] = Parameters.USED_BY_ID;
/* --------------------------------------------------------- */
var SORT_OPTIONS_DEFAULT = [
    { value: "label,asc", label: "Name (A-Z)" },
    { value: "label,desc", label: "Name (Z-A)" },
    { value: "type,asc", label: "Type (A-Z)" },
    { value: "type,desc", label: "Type (Z-A)" },
    { value: "modified,desc", label: "Most recently modified" },
    { value: "modified,asc", label: "Least recently modified" },
    { value: "_score,desc", label: "Relevance" }
];
var BBOX_REGEX = /^\-?\d+(\.\d*)?,\-?\d+(\.\d*)?,\-?\d+(\.\d*)?,\-?\d+(\.\d*)?$/;
function toArray(value) {
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
var Query = /** @class */ (function () {
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
    Query.prototype.getQuery = function () {
        var result = {};
        for (var prop in this.query) {
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
    Query.prototype.clone = function () {
        var result = new Query();
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
    Query.prototype.parameter = function (name, value) {
        this.setParameter(name, value);
        return this;
    };
    /**
     * @param name
     * @param value
     */
    Query.prototype.setParameter = function (name, value) {
        if (value === null || value === undefined || //if no value was provide
            (typeof (value.push) !== 'undefined' && !value.length)) //or empty array
            delete this.query[name];
        else
            this.query[name] = value;
    };
    /**
     * @param key - name of parameter
     * @return value of parameter
     */
    Query.prototype.getParameter = function (key) {
        return this.query[key];
    };
    /**
     * @param name - name of parameter to remove existing value for
     */
    Query.prototype.clearParameter = function (name) {
        delete this.query[name];
    };
    /**
     * @param obj - set of parameter/values to apply to this query
     */
    Query.prototype.applyParameters = function (obj) {
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                this.setParameter(p, obj[p]);
            }
        }
    };
    /**
     * @param facet - name of facet to set the value for as a parameter
     * @param value - value of the facet to use as the parameter's value
     */
    //TODO remove this function
    Query.prototype.setFacetParameter = function (facet, value) {
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
    Query.prototype.q = function (text) { this.setQ(text); return this; };
    /** @param text - free text query */
    Query.prototype.setQ = function (text) { this.setParameter(Parameters.QUERY, text); };
    /** @return */
    Query.prototype.getQ = function () { return this.getParameter(Parameters.QUERY); };
    // -----------------------------------------------------------
    Query.prototype.keywords = function (text) {
        this.setKeywords(text);
        return this;
    };
    /**
     * @param text - free text query
     */
    Query.prototype.setKeywords = function (text) {
        this.setParameter(Parameters.KEYWORDS, toArray(text));
    };
    Query.prototype.getKeywords = function () {
        return this.getParameter(Parameters.KEYWORDS);
    };
    // -----------------------------------------------------------
    Query.prototype.uri = function (uri) {
        this.setUri(uri);
        return this;
    };
    Query.prototype.setUri = function (uri) {
        this.setParameter(Parameters.URI, uri);
    };
    Query.prototype.getUri = function () {
        return this.getParameter(Parameters.URI);
    };
    // -----------------------------------------------------------
    Query.prototype.types = function (types) {
        this.setTypes(types);
        return this;
    };
    /**
     * @param types - name of class(es) to request
     */
    Query.prototype.setTypes = function (types) {
        this.setParameter(Parameters.TYPES, toArray(types));
    };
    Query.prototype.getTypes = function () {
        return this.getParameter(Parameters.TYPES);
    };
    // -----------------------------------------------------------
    Query.prototype.createdBy = function (user) {
        this.setCreatedBy(user);
        return this;
    };
    /** @param user - username */
    Query.prototype.setCreatedBy = function (user) {
        this.setParameter(Parameters.CREATED_BY, user);
    };
    /** @return username */
    Query.prototype.getCreatedBy = function () {
        return this.getParameter(Parameters.CREATED_BY);
    };
    // -----------------------------------------------------------
    Query.prototype.lastModifiedBy = function (user) {
        this.setLastModifiedBy(user);
        return this;
    };
    /** @param user - username */
    Query.prototype.setLastModifiedBy = function (user) {
        this.setParameter(Parameters.LAST_MODIFIED_BY, user);
    };
    /** @return username */
    Query.prototype.getLastModifiedBy = function () {
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
    Query.prototype.themes = function (themes, parameter) {
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
    Query.prototype.setThemes = function (themes, parameter) {
        //clear existing
        this.setParameter(Parameters.THEMES_ID, null);
        this.setParameter(Parameters.THEMES_LABEL, null);
        this.setParameter(Parameters.THEMES_URI, null);
        var param = parameter || Parameters.THEMES_ID;
        this.setParameter(param, toArray(themes));
    };
    Query.prototype.getThemes = function () {
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
    Query.prototype.topics = function (topics, parameter) {
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
    Query.prototype.setTopics = function (topics, parameter) {
        //clear existing
        this.setParameter(Parameters.TOPICS_ID, null);
        this.setParameter(Parameters.TOPICS_LABEL, null);
        this.setParameter(Parameters.TOPICS_URI, null);
        var param = parameter || Parameters.TOPICS_ID;
        this.setParameter(param, toArray(topics));
    };
    Query.prototype.getTopics = function () {
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
    Query.prototype.publishers = function (publishers, parameter) {
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
    Query.prototype.setPublishers = function (publishers, parameter) {
        //clear existing
        this.setParameter(Parameters.PUBLISHERS_ID, null);
        this.setParameter(Parameters.PUBLISHERS_LABEL, null);
        this.setParameter(Parameters.PUBLISHERS_URI, null);
        var param = parameter || Parameters.PUBLISHERS_ID;
        this.setParameter(param, toArray(publishers));
    };
    Query.prototype.getPublishers = function () {
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
    Query.prototype.contacts = function (contacts, parameter) {
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
    Query.prototype.setContacts = function (contacts, parameter) {
        //clear existing
        this.setParameter(Parameters.CONTACTS_ID, null);
        this.setParameter(Parameters.CONTACTS_LABEL, null);
        this.setParameter(Parameters.CONTACTS_URI, null);
        var param = parameter || Parameters.CONTACTS_ID;
        this.setParameter(param, toArray(contacts));
    };
    Query.prototype.getContacts = function () {
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
    Query.prototype.usedBy = function (ids, parameter) {
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
    Query.prototype.setUsedBy = function (ids, parameter) {
        //clear existing
        this.setParameter(Parameters.USED_BY_ID, null);
        this.setParameter(Parameters.USED_BY_LABEL, null);
        this.setParameter(Parameters.USED_BY_URI, null);
        var param = parameter || Parameters.USED_BY_ID;
        this.setParameter(param, toArray(ids));
    };
    Query.prototype.getUsedBy = function () {
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
    Query.prototype.schemes = function (schemes, parameter) {
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
    Query.prototype.setSchemes = function (schemes, parameter) {
        //clear existing
        this.setParameter(Parameters.SCHEMES_ID, null);
        this.setParameter(Parameters.SCHEMES_LABEL, null);
        this.setParameter(Parameters.SCHEMES_URI, null);
        var param = parameter || Parameters.SCHEMES_ID;
        this.setParameter(param, toArray(schemes));
    };
    Query.prototype.getSchemes = function () {
        return this.getParameter(Parameters.SCHEMES_ID) ||
            this.getParameter(Parameters.SCHEMES_LABEL) ||
            this.getParameter(Parameters.SCHEMES_URI);
    };
    // -----------------------------------------------------------
    /**
     *
     */
    Query.prototype.serviceTypes = function (types) {
        this.setServiceTypes(types);
        return this;
    };
    /**
     * @param types - ids
     */
    Query.prototype.setServiceTypes = function (types) {
        this.setParameter(Parameters.SERVICE_TYPES, toArray(types));
    };
    Query.prototype.getServiceTypes = function () {
        return this.getParameter(Parameters.SERVICE_TYPES);
    };
    // -----------------------------------------------------------
    Query.prototype.visibility = function (vis) {
        this.setVisibility(vis);
        return this;
    };
    /**
     * @param visibility - one of 'public' or 'private'
     */
    Query.prototype.setVisibility = function (visibility) {
        this.setParameter(Parameters.VISIBILITY, visibility);
    };
    Query.prototype.getVisibility = function () {
        return this.getParameter(Parameters.VISIBILITY);
    };
    // -----------------------------------------------------------
    Query.prototype.status = function (value) {
        this.setStatus(value);
        return this;
    };
    /**
     * @param status - current status of Item
     */
    Query.prototype.setStatus = function (value) {
        this.setParameter(Parameters.STATUS, value);
    };
    Query.prototype.getStatus = function () {
        return this.getParameter(Parameters.STATUS);
    };
    // -----------------------------------------------------------
    Query.prototype.extent = function (bbox) {
        this.setExtent(bbox);
        return this;
    };
    /**
     * @param bbox - string form of "minx,miny,maxx,maxy", or L.LatLngBounds, or Array
     */
    Query.prototype.setExtent = function (bbox) {
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
    Query.prototype.getExtent = function () {
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
    Query.prototype.classifier = function (classifier, value) {
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
    Query.prototype.setClassifier = function (classifier, value) {
        var arr = toArray(value);
        this.setParameter(Parameters.CLASSIFIERS + "." + classifier, arr);
    };
    /**
     * @param classifier - name of classifier constraint in use
     * @return array of concept ids
     */
    Query.prototype.getClassifier = function (classifier) {
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
    Query.prototype.classifiers = function (value) {
        this.setClassifiers(value);
        return this;
    };
    /**
     * @param value - object defining classifiers
     */
    Query.prototype.setClassifiers = function (value) {
        var _this = this;
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
    Query.prototype.getClassifiers = function () {
        var _this = this;
        var result = {};
        Object.keys(Classifiers).map(function (k) { return Classifiers[k]; }).forEach(function (classifier) {
            result[classifier] = _this.getClassifier(classifier);
        });
        return result;
    };
    // -----------------------------------------------------------
    Query.prototype.modified = function (date, beforeOrAfter) {
        this.setModified(date, beforeOrAfter);
        return this;
    };
    /**
     * @param date - date to compare against
     * @param beforeOrAfter - flag specifying which boundary condition (true = before, false = after) flag specifying whether to trigger update automatically
     */
    Query.prototype.setModified = function (date, beforeOrAfter) {
        //if no date was supplied, consider it "unset" for both properties
        if (!date) {
            this.setParameter(Parameters.MODIFIED_BEFORE, null);
            this.setParameter(Parameters.MODIFIED_AFTER, null);
            return;
        }
        if (!(date instanceof Date))
            date = new Date(date);
        var dir = beforeOrAfter && (beforeOrAfter === true || beforeOrAfter === "true");
        var prop = dir ? Parameters.MODIFIED_BEFORE : Parameters.MODIFIED_AFTER; //property being set
        var oppProp = dir ? Parameters.MODIFIED_AFTER : Parameters.MODIFIED_BEFORE; //unset opposite property
        var arg = (date && date.getTime) ? date.getTime() : date;
        this.setParameter(oppProp, null);
        this.setParameter(prop, arg);
    };
    Query.prototype.getModified = function () {
        var value = this.getParameter(Parameters.MODIFIED_BEFORE) ||
            this.getParameter(Parameters.MODIFIED_AFTER);
        if (value && typeof (value) === 'number') {
            value = new Date(value);
        }
        return value;
    };
    // -----------------------------------------------------------
    Query.prototype.created = function (date, beforeOrAfter) {
        this.setCreated(date, beforeOrAfter);
        return this;
    };
    /**
     * @param date - date to compare against
     * @param beforeOrAfter - flag specifying which boundary condition (true = before, false = after) flag specifying whether to trigger update automatically
     */
    Query.prototype.setCreated = function (date, beforeOrAfter) {
        //if no date was supplied, consider it "unset" for both properties
        if (!date) {
            this.setParameter(Parameters.CREATED_BEFORE, null);
            this.setParameter(Parameters.CREATED_AFTER, null);
            return;
        }
        if (!(date instanceof Date))
            date = new Date(date);
        var dir = beforeOrAfter && (beforeOrAfter === true || beforeOrAfter === "true");
        var prop = dir ? Parameters.CREATED_BEFORE : Parameters.CREATED_AFTER; //property being set
        var oppProp = dir ? Parameters.CREATED_AFTER : Parameters.CREATED_BEFORE; //unset opposite property
        var arg = (date && date.getTime) ? date.getTime() : date;
        this.setParameter(oppProp, null);
        this.setParameter(prop, arg);
    };
    Query.prototype.getCreated = function () {
        var value = this.getParameter(Parameters.CREATED_BEFORE) ||
            this.getParameter(Parameters.CREATED_AFTER);
        if (value && typeof (value) === 'number') {
            value = new Date(value);
        }
        return value;
    };
    // -----------------------------------------------------------
    Query.prototype.begins = function (date) {
        this.setBeginDate(date);
        return this;
    };
    Query.prototype.setBeginDate = function (date) {
        if (date && date instanceof Date)
            date = date.getTime();
        this.setParameter(Parameters.BEGINS, date);
    };
    Query.prototype.getBeginDate = function () {
        var date = this.getParameter(Parameters.BEGINS);
        if (date)
            date = new Date(date);
        return date;
    };
    // -----------------------------------------------------------
    Query.prototype.ends = function (date) {
        this.setEndDate(date);
        return this;
    };
    Query.prototype.setEndDate = function (date) {
        if (date && date instanceof Date)
            date = date.getTime();
        this.setParameter(Parameters.ENDS, date);
    };
    Query.prototype.getEndDate = function () {
        var date = this.getParameter(Parameters.ENDS);
        if (date)
            date = new Date(date);
        return date;
    };
    // -----------------------------------------------------------
    Query.prototype.between = function (begin, end) {
        this.setBetween(begin, end);
        return this;
    };
    Query.prototype.setBetween = function (begin, end) {
        this.begins(begin);
        this.ends(end);
    };
    // -----------------------------------------------------------
    Query.prototype.resourceTypes = function (types) {
        this.setResourceTypes(types);
        return this;
    };
    Query.prototype.setResourceTypes = function (types) {
        this.setParameter(Parameters.RESOURCE_TYPE, toArray(types));
    };
    Query.prototype.getResourceTypes = function () {
        return this.getParameter(Parameters.RESOURCE_TYPE);
    };
    // -----------------------------------------------------------
    Query.prototype.facets = function (names) {
        this.setFacets(names);
        return this;
    };
    /*
     * @param names - names of facets
     */
    Query.prototype.setFacets = function (names) {
        this.setParameter(Parameters.FACETS, toArray(names));
    };
    Query.prototype.getFacets = function () {
        return this.getParameter(Parameters.FACETS);
    };
    /**
     * @param name - name of facet to add
     */
    Query.prototype.addFacet = function (name) {
        var facets = this.getFacets() || [];
        facets.push(name);
        this.setFacets(facets);
    };
    /**
     * @param name - name of facet to remove
     */
    Query.prototype.removeFacet = function (name) {
        var facets = this.getFacets() || [];
        var idx = facets.indexOf(name);
        if (idx >= 0) {
            facets.splice(idx, 1);
            this.setFacets(facets);
        }
    };
    // -----------------------------------------------------------
    Query.prototype.fields = function (fields) {
        this.setFields(fields);
        return this;
    };
    /**
     * @param fields - list of field names to request for each search result
     */
    Query.prototype.setFields = function (fields) {
        this.setParameter(Parameters.FIELDS, toArray(fields));
    };
    Query.prototype.getFields = function () {
        return this.getParameter(Parameters.FIELDS);
    };
    /**
     * @param field - name of field to remove
     */
    Query.prototype.addField = function (field) {
        var fields = this.getFields() || [];
        fields.push(field);
        this.setFields(fields);
    };
    /**
     * @param field - name of field to remove
     */
    Query.prototype.removeField = function (field) {
        var fields = this.getFields() || [];
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
    Query.prototype.page = function (page) {
        this.setPage(page);
        return this;
    };
    Query.prototype.setPage = function (page) {
        if (isNaN(page) || page * 1 < 0)
            return;
        this.setParameter(Parameters.PAGE, page * 1);
    };
    Query.prototype.getPage = function () {
        return this.getParameter(Parameters.PAGE);
    };
    Query.prototype.nextPage = function () {
        this.setPage(this.getPage() + 1);
    };
    Query.prototype.previousPage = function () {
        this.setPage(this.getPage() - 1);
    };
    // -----------------------------------------------------------
    /**
     * @param size - page size to request
     */
    Query.prototype.pageSize = function (size) {
        this.setPageSize(size);
        return this;
    };
    Query.prototype.setPageSize = function (size) {
        if (isNaN(size) || size * 1 < 0)
            return;
        this.setParameter(Parameters.PAGE_SIZE, size * 1);
    };
    Query.prototype.getPageSize = function () {
        return this.getParameter(Parameters.PAGE_SIZE);
    };
    // -----------------------------------------------------------
    /**
     * @param sort - form of <field>,<dir> or just field name
     * @param order - optional, either 'asc' or 'desc'
     */
    Query.prototype.sort = function (sort, order) {
        this.setSort(sort, order);
        return this;
    };
    /**
     * @param sort - form of <field>,<dir> or just field name
     * @param order - optional, either 'asc' or 'desc'
     */
    Query.prototype.setSort = function (sort, order) {
        order = order || 'desc';
        if (sort && sort.indexOf(',') < 0)
            sort = sort + ',' + order;
        this.setParameter(Parameters.SORT, sort);
    };
    Query.prototype.getSort = function () {
        return this.getParameter(Parameters.SORT);
    };
    Query.prototype.getSortField = function () {
        var value = this.getSort();
        return value && value.length ? value.split(',')[0] : null;
    };
    Query.prototype.getSortOrder = function () {
        var value = this.getSort();
        return value && value.length ? value.split(',')[1] : null;
    };
    /**
     * @return list of key-value pairs of sort options
     */
    Query.prototype.getSortOptions = function () {
        return SORT_OPTIONS_DEFAULT.slice(0);
    };
    // -----------------------------------------------------------
    /**
     *
     */
    Query.prototype.clear = function () {
        this.query = JSON.parse(JSON.stringify(this.defaultQuery));
    };
    return Query;
}());
export { Query as default, Query, Fields, Facets };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50LyIsInNvdXJjZXMiOlsic2hhcmVkL3F1ZXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sVUFBVSxNQUFNLGNBQWMsQ0FBQztBQUN0QyxPQUFPLFdBQVcsTUFBTSxlQUFlLENBQUM7QUFJeEMsSUFBTSxNQUFNLEdBQWlCO0lBQ3pCLGFBQWEsRUFBUyxRQUFRO0lBQzlCLGdCQUFnQixFQUFNLGlCQUFpQjtJQUN2QyxXQUFXLEVBQVcsYUFBYTtJQUNuQyxXQUFXLEVBQVcsYUFBYTtJQUNuQyxjQUFjLEVBQVEsUUFBUTtJQUM5QixRQUFRLEVBQWMsVUFBVTtJQUNoQyxPQUFPLEVBQWUsU0FBUztJQUMvQixVQUFVLEVBQVksV0FBVztJQUNqQyxRQUFRLEVBQWMsVUFBVTtJQUNoQyxXQUFXLEVBQVcsYUFBYTtJQUNuQyxhQUFhLEVBQVMsZUFBZTtJQUNyQyxNQUFNLEVBQWdCLFFBQVE7SUFDOUIsYUFBYSxFQUFTLE9BQU87SUFDN0IsSUFBSSxFQUFrQixNQUFNO0lBQzVCLFdBQVcsRUFBVyxhQUFhO0lBQ25DLFFBQVEsRUFBYyxVQUFVO0lBQ2hDLEtBQUssRUFBaUIsT0FBTztJQUM3QixnQkFBZ0IsRUFBTSxnQkFBZ0I7SUFDdEMsTUFBTSxFQUFnQixRQUFRO0lBQzlCLFVBQVUsRUFBWSxXQUFXO0lBQ2pDLFVBQVUsRUFBWSxXQUFXO0lBQ2pDLE1BQU0sRUFBZ0IsUUFBUTtJQUM5QixRQUFRLEVBQWMsVUFBVTtJQUNoQyxZQUFZLEVBQVUsYUFBYTtJQUNuQyxVQUFVLEVBQVksWUFBWTtJQUNsQyxjQUFjLEVBQVEsZUFBZTtJQUNyQyxZQUFZLEVBQVUsYUFBYTtJQUNuQyxRQUFRLEVBQWMsVUFBVTtJQUNoQyxPQUFPLEVBQWUsU0FBUztJQUMvQixVQUFVLEVBQVksWUFBWTtJQUNsQyxNQUFNLEVBQWdCLFFBQVE7SUFDOUIsVUFBVSxFQUFZLFdBQVc7SUFDakMs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QyxDQUFDLElBQUksQ0FBQztJQUM5RCxDQUFDO0lBRUQsNEJBQVksR0FBWjtRQUNJLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMzQixPQUFPLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDOUQsQ0FBQztJQUVEOztPQUVHO0lBQ0gsOEJBQWMsR0FBZDtRQUNJLE9BQU8sb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFHRCw4REFBOEQ7SUFHOUQ7O09BRUc7SUFDSCxxQkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUNMLFlBQUM7QUFBRCxDQUFDLEFBdmdDRCxJQXVnQ0M7QUFFRCxPQUFPLEVBQ0gsS0FBSyxJQUFJLE9BQU8sRUFDaEIsS0FBSyxFQUNMLE1BQU0sRUFDTixNQUFNLEVBQ1QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IFBhcmFtZXRlcnMgZnJvbSAnLi9wYXJhbWV0ZXJzJztcbmltcG9ydCBDbGFzc2lmaWVycyBmcm9tICcuL2NsYXNzaWZpZXJzJztcblxuaW50ZXJmYWNlIEtWUDxVPiB7IFsga2V5IDogc3RyaW5nIF0gOiBVIH1cblxuY29uc3QgRmllbGRzIDogS1ZQPHN0cmluZz4gPSB7XG4gICAgQUNDRVNTX1JJR0hUUyAgICAgICA6ICdyaWdodHMnLFxuICAgIEFMVEVSTkFURV9USVRMRVMgICAgOiAnYWx0ZXJuYXRlVGl0bGVzJyxcbiAgICBBTk5PVEFUSU9OUyAgICAgICAgIDogJ2Fubm90YXRpb25zJyxcbiAgICBDTEFTU0lGSUVSUyAgICAgICAgIDogJ2NsYXNzaWZpZXJzJyxcbiAgICBDT05DRVBUX1NDSEVNRSAgICAgIDogJ3NjaGVtZScsXG4gICAgQ09OVEFDVFMgICAgICAgICAgICA6ICdjb250YWN0cycsXG4gICAgQ1JFQVRFRCAgICAgICAgICAgICA6ICdjcmVhdGVkJyxcbiAgICBDUkVBVEVEX0JZICAgICAgICAgIDogJ2NyZWF0ZWRCeScsXG4gICAgREFUQVNFVFMgICAgICAgICAgICA6ICdkYXRhc2V0cycsXG4gICAgREVTQ1JJUFRJT04gICAgICAgICA6ICdkZXNjcmlwdGlvbicsXG4gICAgRElTVFJJQlVUSU9OUyAgICAgICA6ICdkaXN0cmlidXRpb25zJyxcbiAgICBFWFRFTlQgICAgICAgICAgICAgIDogJ2V4dGVudCcsXG4gICAgR0FMTEVSWV9JVEVNUyAgICAgICA6ICdpdGVtcycsXG4gICAgSFJFRiAgICAgICAgICAgICAgICA6ICdocmVmJyxcbiAgICBJREVOVElGSUVSUyAgICAgICAgIDogJ2lkZW50aWZpZXJzJyxcbiAgICBLRVlXT1JEUyAgICAgICAgICAgIDogJ2tleXdvcmRzJyxcbiAgICBMQUJFTCAgICAgICAgICAgICAgIDogJ2xhYmVsJyxcbiAgICBMQVNUX01PRElGSUVEX0JZICAgIDogJ2xhc3RNb2RpZmllZEJ5JyxcbiAgICBMQVlFUlMgICAgICAgICAgICAgIDogJ2xheWVycycsXG4gICAgTEFZRVJfVFlQRSAgICAgICAgICA6ICdsYXllclR5cGUnLFxuICAgIExBWUVSX05BTUUgICAgICAgICAgOiAnbGF5ZXJOYW1lJyxcbiAgICBMRUdFTkQgICAgICAgICAgICAgIDogJ2xlZ2VuZCcsXG4gICAgTU9ESUZJRUQgICAgICAgICAgICA6ICdtb2RpZmllZCcsXG4gICAgUEFSRU5UX0xBWUVSICAgICAgICA6ICdwYXJlbnRMYXllcicsXG4gICAgUFVCTElTSEVSUyAgICAgICAgICA6ICdwdWJsaXNoZXJzJyxcbiAgICBSRVNPVVJDRV9UWVBFUyAgICAgIDogJ3Jlc291cmNlVHlwZXMnLFxuICAgIFNFUlZJQ0VfVFlQRSAgICAgICAgOiAnc2VydmljZVR5cGUnLFxuICAgIFNFUlZJQ0VTICAgICAgICAgICAgOiAnc2VydmljZXMnLFxuICAgIFNQQVRJQUwgICAgICAgICAgICAgOiAnc3BhdGlhbCcsXG4gICAgU1RBVElTVElDUyAgICAgICAgICA6ICdzdGF0aXN0aWNzJyxcbiAgICBTVEFUVVMgICAgICAgICAgICAgIDogJ3N0YXR1cycsXG4gICAgU1VCX0xBWUVSUyAgICAgICAgICA6ICdzdWJMYXllcnMnLFxuICAgIFRFTVBPUkFMICAgICAgICAgICAgOiAndGVtcG9yYWwnLFxuICAgIFRIRU1FUyAgICAgICAgICAgICAgOiAndGhlbWVzJyxcbiAgICBUSFVNQk5BSUwgICAgICAgICAgIDogJ3RodW1ibmFpbCcsXG4gICAgVE9QSUNTICAgICAgICAgICAgICA6ICd0b3BpY3MnLFxuICAgIFVTRURfQlkgICAgICAgICAgICAgOiAndXNlZEJ5JyxcbiAgICBWSVNJQklMSVRZICAgICAgICAgIDogJ3Zpc2liaWxpdHknLFxuICAgIExBTkRJTkdfUEFHRSAgICAgICAgOiAnbGFuZGluZ1BhZ2UnXG59O1xuXG5jb25zdCBGSUVMRFNfREVGQVVMVCA6IHN0cmluZ1tdID0gW1xuICAgIEZpZWxkcy5DUkVBVEVELCBGaWVsZHMuTU9ESUZJRUQsIEZpZWxkcy5DUkVBVEVEX0JZLFxuICAgIEZpZWxkcy5QVUJMSVNIRVJTLCBGaWVsZHMuVEhFTUVTLCBGaWVsZHMuREVTQ1JJUFRJT05cbl07XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5jb25zdCBGYWNldHMgOiBLVlA8c3RyaW5nPiA9IHtcbiAgICBBTFRFUk5BVEVfVElUTEVTICAgIDogJ2FsdGVybmF0ZVRpdGxlcycsXG4gICAgQ09OQ0VQVF9TQ0hFTUVTICAgICA6ICdzY2hlbWVzJyxcbiAgICBDUkVBVEVEX0JZICAgICAgICAgIDogJ2NyZWF0ZWRCeScsXG4gICAgSFJFRiAgICAgICAgICAgICAgICA6ICdocmVmJyxcbiAgICBJREVOVElGSUVSUyAgICAgICAgIDogXCJpZGVudGlmaWVyc1wiLFxuICAgIExBWUVSX1RZUEUgICAgICAgICAgOiAnbGF5ZXJUeXBlJyxcbiAgICBMQVlFUl9OQU1FICAgICAgICAgIDogJ2xheWVyTmFtZScsXG4gICAgTElLRVMgICAgICAgICAgICAgICA6ICdsaWtlcycsXG4gICAgT05MSU5FICAgICAgICAgICAgICA6ICdvbmxpbmUnLFxuICAgIFBVQkxJU0hFUlMgICAgICAgICAgOiAncHVibGlzaGVycycsXG4gICAgQ09OVEFDVFMgICAgICAgICAgICA6ICdjb250YWN0cycsXG4gICAgUkVMSUFCSUxJVFkgICAgICAgICA6ICdyZWxpYWJpbGl0eScsXG4gICAgU0VSVklDRV9UWVBFUyAgICAgICA6ICdzZXJ2aWNlVHlwZXMnLFxuICAgIFNQRUVEICAgICAgICAgICAgICAgOiAnc3BlZWQnLFxuICAgIFNUQVRVUyAgICAgICAgICAgICAgOiAnc3RhdHVzJyxcbiAgICBUSEVNRVMgICAgICAgICAgICAgIDogJ3RoZW1lcycsXG4gICAgVE9QSUNTICAgICAgICAgICAgICA6ICd0b3BpY3MnLFxuICAgIFRZUEVTICAgICAgICAgICAgICAgOiAndHlwZScsICAgLy9UT0RPIGNoYW5nZSB0byAndHlwZXMnXG4gICAgVVNFRF9CWSAgICAgICAgICAgICA6ICd1c2VkQnknLFxuICAgIFZJRVdTICAgICAgICAgICAgICAgOiAndmlld3MnLFxuICAgIFZJU0lCSUxJVFkgICAgICAgICAgOiAndmlzaWJpbGl0eSdcbn07XG5cbmNvbnN0IEZBQ0VUU19ERUZBVUxUIDogc3RyaW5nW10gPSBbXG4gICAgRmFjZXRzLlRZUEVTLFxuICAgIEZhY2V0cy5QVUJMSVNIRVJTLFxuICAgIEZhY2V0cy5TRVJWSUNFX1RZUEVTLFxuICAgIEZhY2V0cy5DT05DRVBUX1NDSEVNRVMsXG4gICAgRmFjZXRzLlZJU0lCSUxJVFksXG4gICAgRmFjZXRzLkNSRUFURURfQllcbl07XG5cblxuLypcbiAgICBNYXAgZmFjZXQga2V5cyB0byBwYXJhbWV0ZXJzIHNvIGNsaWVudHMgY2FuIHNldFxuICAgIHF1ZXJ5IHBhcmFtcyB1c2luZyBmYWNldGVkIHJlc3VsdHNcblxuICAgIC8vVE9ETyByZW1vdmUgdGhlc2UgYW5kIHRoZWlyIGZ1bmN0aW9uIGJlbG93XG4gKi9cbmNvbnN0IEZhY2V0VG9QYXJhbSA6IEtWUDxzdHJpbmc+ID0ge307XG5GYWNldFRvUGFyYW1bRmFjZXRzLlRZUEVTXSAgICAgICAgICAgPSBQYXJhbWV0ZXJzLlRZUEVTO1xuRmFjZXRUb1BhcmFtW0ZhY2V0cy5USEVNRVNdICAgICAgICAgID0gUGFyYW1ldGVycy5USEVNRVNfSUQ7XG5GYWNldFRvUGFyYW1bRmFjZXRzLlRPUElDU10gICAgICAgICAgPSBQYXJhbWV0ZXJzLlRPUElDU19JRDtcbkZhY2V0VG9QYXJhbVtGYWNldHMuUFVCTElTSEVSU10gICAgICA9IFBhcmFtZXRlcnMuUFVCTElTSEVSU19JRDtcbkZhY2V0VG9QYXJhbVtGYWNldHMuQ09OVEFDVFNdICAgICAgICA9IFBhcmFtZXRlcnMuQ09OVEFDVFNfSUQ7XG5GYWNldFRvUGFyYW1bRmFjZXRzLkNPTkNFUFRfU0NIRU1FU10gPSBQYXJhbWV0ZXJzLlNDSEVNRVNfSUQ7XG5GYWNldFRvUGFyYW1bRmFjZXRzLlVTRURfQlldICAgICAgICAgPSBQYXJhbWV0ZXJzLlVTRURfQllfSUQ7XG5cblxuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuXG5jb25zdCBTT1JUX09QVElPTlNfREVGQVVMVCA6IHsgdmFsdWU6IHN0cmluZzsgbGFiZWw6IHN0cmluZzsgfVtdID0gW1xuICAgIHsgdmFsdWU6XCJsYWJlbCxhc2NcIiwgICAgICAgbGFiZWw6IFwiTmFtZSAoQS1aKVwiICAgICAgICAgICAgICB9LFxuICAgIHsgdmFsdWU6XCJsYWJlbCxkZXNjXCIsICAgICAgbGFiZWw6IFwiTmFtZSAoWi1BKVwiICAgICAgICAgICAgICB9LFxuICAgIHsgdmFsdWU6XCJ0eXBlLGFzY1wiLCAgICAgICAgbGFiZWw6IFwiVHlwZSAoQS1aKVwiICAgICAgICAgICAgICB9LFxuICAgIHsgdmFsdWU6XCJ0eXBlLGRlc2NcIiwgICAgICAgbGFiZWw6IFwiVHlwZSAoWi1BKVwiICAgICAgICAgICAgICB9LFxuICAgIHsgdmFsdWU6XCJtb2RpZmllZCxkZXNjXCIsICAgbGFiZWw6IFwiTW9zdCByZWNlbnRseSBtb2RpZmllZFwiICB9LFxuICAgIHsgdmFsdWU6XCJtb2RpZmllZCxhc2NcIiwgICAgbGFiZWw6IFwiTGVhc3QgcmVjZW50bHkgbW9kaWZpZWRcIiB9LFxuICAgIHsgdmFsdWU6XCJfc2NvcmUsZGVzY1wiLCAgICAgbGFiZWw6IFwiUmVsZXZhbmNlXCIgICAgICAgICAgICAgICB9XG5dO1xuXG5cbmNvbnN0IEJCT1hfUkVHRVggPSAvXlxcLT9cXGQrKFxcLlxcZCopPyxcXC0/XFxkKyhcXC5cXGQqKT8sXFwtP1xcZCsoXFwuXFxkKik/LFxcLT9cXGQrKFxcLlxcZCopPyQvO1xuXG5cbmZ1bmN0aW9uIHRvQXJyYXkodmFsdWUgOiBhbnkpIDogYW55IHwgbnVsbCB7XG4gICAgbGV0IHJlc3VsdCA9IHZhbHVlO1xuICAgIC8vaWYgZ2l2ZW4gYSBub24tYXJyYXkgdmFsdWUsIHdyYXAgaW4gYXJyYXlcbiAgICBpZihyZXN1bHQgIT09IG51bGwgJiYgdHlwZW9mKHJlc3VsdC5wdXNoKSA9PT0gJ3VuZGVmaW5lZCcpIHJlc3VsdCA9IFtyZXN1bHRdO1xuICAgIC8vaWYgYXJyYXkgdmFsdWUgaXMgZW1wdHksIG51bGxpZnkgdGhlIHJlc3VsdFxuICAgIGlmKHJlc3VsdCAhPT0gbnVsbCAmJiAhcmVzdWx0Lmxlbmd0aCkgcmVzdWx0ID0gbnVsbDtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqXG4gKiBRdWVyeVxuICpcbiAqIFNwZWNpZnkgdGhlIFwiZGVmYXVsdFwiIHF1ZXJ5IGNvbnN0cmFpbnRzIHRvIHVzZSBieSBwYXNzaW5nIGluICdvcHRpb25zLmRlZmF1bHRzID0gey4uLn0nO1xuICpcbiAqL1xuY2xhc3MgUXVlcnkge1xuXG4gICAgcHVibGljIHF1ZXJ5IDogS1ZQPGFueT47XG4gICAgcHJpdmF0ZSBkZWZhdWx0UXVlcnkgOiBLVlA8YW55PjtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gc2V0IG9mIGluaXRpYWwgY29uc3RyYWludHNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zID86IEtWUDxhbnk+KSB7XG4gICAgICAgIHRoaXMuZGVmYXVsdFF1ZXJ5ID0geyB9O1xuICAgICAgICB0aGlzLmRlZmF1bHRRdWVyeVtQYXJhbWV0ZXJzLlBBR0UudG9TdHJpbmcoKV0gPSAwO1xuICAgICAgICB0aGlzLmRlZmF1bHRRdWVyeVtQYXJhbWV0ZXJzLlBBR0VfU0laRS50b1N0cmluZygpXSA9IDEwO1xuICAgICAgICB0aGlzLmRlZmF1bHRRdWVyeVtQYXJhbWV0ZXJzLlNPUlQudG9TdHJpbmcoKV0gPSBcIm1vZGlmaWVkLGRlc2NcIjtcbiAgICAgICAgdGhpcy5kZWZhdWx0UXVlcnlbUGFyYW1ldGVycy5GSUVMRFMudG9TdHJpbmcoKV0gPSBGSUVMRFNfREVGQVVMVC5zbGljZSgwKTtcbiAgICAgICAgdGhpcy5kZWZhdWx0UXVlcnlbUGFyYW1ldGVycy5GQUNFVFMudG9TdHJpbmcoKV0gPSBGQUNFVFNfREVGQVVMVC5zbGljZSgwKTtcbiAgICAgICAgaWYob3B0aW9ucyAmJiBvcHRpb25zLmRlZmF1bHRzKSB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuZGVmYXVsdFF1ZXJ5LCBvcHRpb25zLmRlZmF1bHRzKTtcbiAgICAgICAgICAgIGRlbGV0ZSBvcHRpb25zLmRlZmF1bHRzO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucXVlcnkgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMuZGVmYXVsdFF1ZXJ5KSk7XG4gICAgICAgIGlmKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlQYXJhbWV0ZXJzKG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIGNvbnRhaW5pbmcgcmVxdWVzdC1yZWFkeSBwYXJhbWV0ZXJzL3ZhbHVlc1xuICAgICAqL1xuICAgIGdldFF1ZXJ5KCkgOiBLVlA8YW55PiB7XG4gICAgICAgIGxldCByZXN1bHQgOiBLVlA8YW55PiA9IHt9O1xuICAgICAgICBmb3IobGV0IHByb3AgaW4gdGhpcy5xdWVyeSkge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5xdWVyeVtwcm9wXTtcbiAgICAgICAgICAgIGlmKHZhbHVlICE9PSBudWxsICYmIHR5cGVvZih2YWx1ZS5wdXNoKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLmpvaW4oJywnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdFtwcm9wXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiBRdWVyeVxuICAgICAqL1xuICAgIGNsb25lKCkgOiBRdWVyeSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBuZXcgUXVlcnkoKTtcbiAgICAgICAgbGV0IGpzb24gPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMucXVlcnkpKTtcbiAgICAgICAgcmVzdWx0LmFwcGx5UGFyYW1ldGVycyhqc29uKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbmFtZVxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEByZXR1cm4gUXVlcnkgdGhpc1xuICAgICAqL1xuICAgIHBhcmFtZXRlcihuYW1lIDogc3RyaW5nLCB2YWx1ZSA6IGFueSkgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKG5hbWUsIHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG5hbWVcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKi9cbiAgICBzZXRQYXJhbWV0ZXIgKG5hbWUgOiBzdHJpbmcsIHZhbHVlOiBhbnkpIDogdm9pZCB7XG4gICAgICAgIGlmKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgLy9pZiBubyB2YWx1ZSB3YXMgcHJvdmlkZVxuICAgICAgICAgICAgKHR5cGVvZih2YWx1ZS5wdXNoKSAhPT0gJ3VuZGVmaW5lZCcgJiYgIXZhbHVlLmxlbmd0aCkpIC8vb3IgZW1wdHkgYXJyYXlcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnF1ZXJ5W25hbWVdO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLnF1ZXJ5W25hbWVdID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGtleSAtIG5hbWUgb2YgcGFyYW1ldGVyXG4gICAgICogQHJldHVybiB2YWx1ZSBvZiBwYXJhbWV0ZXJcbiAgICAgKi9cbiAgICBnZXRQYXJhbWV0ZXIgKGtleSA6IHN0cmluZykgOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5xdWVyeVtrZXldO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBuYW1lIC0gbmFtZSBvZiBwYXJhbWV0ZXIgdG8gcmVtb3ZlIGV4aXN0aW5nIHZhbHVlIGZvclxuICAgICAqL1xuICAgIGNsZWFyUGFyYW1ldGVyKG5hbWUgOiBzdHJpbmcpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMucXVlcnlbbmFtZV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG9iaiAtIHNldCBvZiBwYXJhbWV0ZXIvdmFsdWVzIHRvIGFwcGx5IHRvIHRoaXMgcXVlcnlcbiAgICAgKi9cbiAgICBhcHBseVBhcmFtZXRlcnMgKG9iaiA6IEtWUDxhbnk+KSA6IHZvaWQge8KgXG4gICAgICAgIGZvcihsZXQgcCBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmKG9iai5oYXNPd25Qcm9wZXJ0eShwKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKHAgYXMgc3RyaW5nLCBvYmpbcF0gYXMgYW55KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBmYWNldCAtIG5hbWUgb2YgZmFjZXQgdG8gc2V0IHRoZSB2YWx1ZSBmb3IgYXMgYSBwYXJhbWV0ZXJcbiAgICAgKiBAcGFyYW0gdmFsdWUgLSB2YWx1ZSBvZiB0aGUgZmFjZXQgdG8gdXNlIGFzIHRoZSBwYXJhbWV0ZXIncyB2YWx1ZVxuICAgICAqL1xuICAgICAvL1RPRE8gcmVtb3ZlIHRoaXMgZnVuY3Rpb25cbiAgICBzZXRGYWNldFBhcmFtZXRlciAoZmFjZXQ6IHN0cmluZywgdmFsdWU6IHN0cmluZykgOiB2b2lkIHtcbiAgICAgICAgbGV0IHBhcmFtIDogc3RyaW5nID0gRmFjZXRUb1BhcmFtW2ZhY2V0XTtcbiAgICAgICAgaWYoIXBhcmFtKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIldBUk4gOiBRdWVyeS5hcHBseUZhY2V0UGFyYW1ldGVyKCkgLSBcIiArXG4gICAgICAgICAgICAgICAgXCJ1bmFibGUgdG8gbWFwIGZhY2V0IHRvIGtub3duIHBhcmFtZXRlciAnXCIgKyBmYWNldCArIFwiJywgdXNpbmcgXCIgK1xuICAgICAgICAgICAgICAgIFwiYXMgZGlyZWN0IHBhcmFtZXRlciB3aGljaCBtYXkgbm90IG9wZXJhdGUgYXMgaW50ZW5kZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIocGFyYW18fGZhY2V0LCB2YWx1ZSk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHRleHRcbiAgICAgKiBAcmV0dXJuIFF1ZXJ5IHRoaXNcbiAgICAgKi9cbiAgICBxKHRleHQgOiBzdHJpbmcpIDogUXVlcnkgeyB0aGlzLnNldFEodGV4dCk7IHJldHVybiB0aGlzOyB9XG5cbiAgICAvKiogQHBhcmFtIHRleHQgLSBmcmVlIHRleHQgcXVlcnkgKi9cbiAgICBzZXRRICh0ZXh0IDogc3RyaW5nKSA6IHZvaWQgeyB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlFVRVJZLCB0ZXh0KTsgfVxuICAgIC8qKiBAcmV0dXJuICovXG4gICAgZ2V0USgpIDogc3RyaW5nIHsgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuUVVFUlkpIGFzIHN0cmluZzsgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICBrZXl3b3Jkcyh0ZXh0IDogc3RyaW5nfHN0cmluZ1tdKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRLZXl3b3Jkcyh0ZXh0KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHRleHQgLSBmcmVlIHRleHQgcXVlcnlcbiAgICAgKi9cbiAgICBzZXRLZXl3b3JkcyAodGV4dCA6IHN0cmluZ3xzdHJpbmdbXSkgOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5LRVlXT1JEUywgdG9BcnJheSh0ZXh0KSk7XG4gICAgfVxuXG4gICAgZ2V0S2V5d29yZHMoKSA6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuS0VZV09SRFMpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgdXJpICh1cmkgOiBzdHJpbmcpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldFVyaSh1cmkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRVcmkodXJpIDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVVJJLCB1cmkpO1xuICAgIH1cblxuICAgIGdldFVyaSgpIDogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVVJJKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIHR5cGVzKHR5cGVzIDogc3RyaW5nfHN0cmluZ1tdKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRUeXBlcyh0eXBlcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB0eXBlcyAtIG5hbWUgb2YgY2xhc3MoZXMpIHRvIHJlcXVlc3RcbiAgICAgKi9cbiAgICBzZXRUeXBlcyAodHlwZXMgOiBzdHJpbmd8c3RyaW5nW10pIHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5UWVBFUywgdG9BcnJheSh0eXBlcykpO1xuICAgIH1cblxuICAgIGdldFR5cGVzICgpIDogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5UWVBFUyk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICBjcmVhdGVkQnkodXNlciA6IHN0cmluZykgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0Q3JlYXRlZEJ5KHVzZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKiogQHBhcmFtIHVzZXIgLSB1c2VybmFtZSAqL1xuICAgIHNldENyZWF0ZWRCeSAodXNlciA6IHN0cmluZykge1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkNSRUFURURfQlksIHVzZXIpO1xuICAgIH1cblxuICAgIC8qKiBAcmV0dXJuIHVzZXJuYW1lICovXG4gICAgZ2V0Q3JlYXRlZEJ5ICgpIDogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuQ1JFQVRFRF9CWSk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICBsYXN0TW9kaWZpZWRCeSh1c2VyIDogc3RyaW5nKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRMYXN0TW9kaWZpZWRCeSh1c2VyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqIEBwYXJhbSB1c2VyIC0gdXNlcm5hbWUgKi9cbiAgICBzZXRMYXN0TW9kaWZpZWRCeSAodXNlcjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuTEFTVF9NT0RJRklFRF9CWSwgdXNlcik7XG4gICAgfVxuXG4gICAgLyoqIEByZXR1cm4gdXNlcm5hbWUgKi9cbiAgICBnZXRMYXN0TW9kaWZpZWRCeSAoKSA6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkxBU1RfTU9ESUZJRURfQlkpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSBhIFRoZW1lIG9yIHNldCBvZiBUaGVtZXMgdG8gY29uc3RyYWluIHJlc3VsdHMuIEJ5XG4gICAgICogZGVmYXVsdCwgdmFsdWVzIGFyZSBhc3N1bWVkIHRvIGJlIHRoZW1lIGlkZW50aWZpZXJzLiBJZiB1c2luZ1xuICAgICAqIHRoZW1lIGxhYmVscyBvciB0aGVtZSB1cmlzLCBzcGVjaWZ5IHRoZSBvcHRpb25hbCBzZWNvbmQgcGFyYW1ldGVyXG4gICAgICogdG8gYmUgZWl0aGVyIFBhcmFtZXRlcnMuVEhFTUVTX0xBQkVMIG9yIFBhcmFtZXRlcnMuVEhFTUVTX1VSSVxuICAgICAqIHJlc3BlY3RpdmVseS5cbiAgICAgKiBAcGFyYW0gdGhlbWVzIC0gc3RyaW5nIG9yIGFycmF5IG9mIHN0cmluZ3MgY29udGFpbmluZyB0aGVtZSBjb25zdHJhaW50XG4gICAgICogQHBhcmFtIHBhcmFtZXRlciAtIG9wdGlvbmFsLCB0byBpbmRpY2F0ZSB0aGUgcGFyYW1ldGVyIHRvIHVzZVxuICAgICAqIEByZXR1cm4gUXVlcnlcbiAgICAgKi9cbiAgICB0aGVtZXModGhlbWVzOiBzdHJpbmd8c3RyaW5nW10sIHBhcmFtZXRlcj86c3RyaW5nKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRUaGVtZXModGhlbWVzLCBwYXJhbWV0ZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgYSBUaGVtZSBvciBzZXQgb2YgVGhlbWVzIHRvIGNvbnN0cmFpbiByZXN1bHRzLiBCeVxuICAgICAqIGRlZmF1bHQsIHZhbHVlcyBhcmUgYXNzdW1lZCB0byBiZSB0aGVtZSBpZGVudGlmaWVycy4gSWYgdXNpbmdcbiAgICAgKiB0aGVtZSBsYWJlbHMgb3IgdGhlbWUgdXJpcywgc3BlY2lmeSB0aGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlclxuICAgICAqIHRvIGJlIGVpdGhlciBQYXJhbWV0ZXJzLlRIRU1FU19MQUJFTCBvciBQYXJhbWV0ZXJzLlRIRU1FU19VUklcbiAgICAgKiByZXNwZWN0aXZlbHkuXG4gICAgICogQHBhcmFtIHRoZW1lcyAtIHRoZW1lIG9yIHRoZW1lcyB0byBjb25zdHJhaW4gYnlcbiAgICAgKi9cbiAgICBzZXRUaGVtZXMgKHRoZW1lczpzdHJpbmd8c3RyaW5nW10sIHBhcmFtZXRlcj86c3RyaW5nKSB7XG5cbiAgICAgICAgLy9jbGVhciBleGlzdGluZ1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlRIRU1FU19JRCwgbnVsbCk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVEhFTUVTX0xBQkVMLCBudWxsKTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5USEVNRVNfVVJJLCBudWxsKTtcblxuICAgICAgICBsZXQgcGFyYW0gPSBwYXJhbWV0ZXIgfHwgUGFyYW1ldGVycy5USEVNRVNfSUQ7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKHBhcmFtLCB0b0FycmF5KHRoZW1lcykpO1xuICAgIH1cblxuICAgIGdldFRoZW1lcyAoKSA6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVEhFTUVTX0lEKSB8fFxuICAgICAgICAgICAgdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5USEVNRVNfTEFCRUwpIHx8XG4gICAgICAgICAgICB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlRIRU1FU19VUkkpO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgYSBUb3BpYyBvciBzZXQgb2YgVG9waWNzIHRvIGNvbnN0cmFpbiByZXN1bHRzLiBCeVxuICAgICAqIGRlZmF1bHQsIHZhbHVlcyBhcmUgYXNzdW1lZCB0byBiZSB0aGVtZSBpZGVudGlmaWVycy4gSWYgdXNpbmdcbiAgICAgKiB0aGVtZSBsYWJlbHMgb3IgdGhlbWUgdXJpcywgc3BlY2lmeSB0aGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlclxuICAgICAqIHRvIGJlIGVpdGhlciBQYXJhbWV0ZXJzLlRPUElDX0xBQkVMIG9yIFBhcmFtZXRlcnMuVE9QSUNfVVJJXG4gICAgICogcmVzcGVjdGl2ZWx5LlxuICAgICAqIEBwYXJhbSAgdG9waWNzIC0gc3RyaW5nIG9yIGFycmF5IG9mIHN0cmluZ3MgY29udGFpbmluZyB0aGVtZSBjb25zdHJhaW50XG4gICAgICogQHBhcmFtICBwYXJhbWV0ZXIgLSBvcHRpb25hbCwgdG8gaW5kaWNhdGUgdGhlIHBhcmFtZXRlciB0byB1c2VcbiAgICAgKiBAcmV0dXJuIFF1ZXJ5IGluc3RhbmNlXG4gICAgICovXG4gICAgdG9waWNzKHRvcGljczpzdHJpbmd8c3RyaW5nW10sIHBhcmFtZXRlciA/OiBzdHJpbmcpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldFRvcGljcyh0b3BpY3MsIHBhcmFtZXRlcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSBhIFRvcGljIG9yIHNldCBvZiBUb3BpY3MgdG8gY29uc3RyYWluIHJlc3VsdHMuIEJ5XG4gICAgICogZGVmYXVsdCwgdmFsdWVzIGFyZSBhc3N1bWVkIHRvIGJlIHRoZW1lIGlkZW50aWZpZXJzLiBJZiB1c2luZ1xuICAgICAqIHRoZW1lIGxhYmVscyBvciB0aGVtZSB1cmlzLCBzcGVjaWZ5IHRoZSBvcHRpb25hbCBzZWNvbmQgcGFyYW1ldGVyXG4gICAgICogdG8gYmUgZWl0aGVyIFBhcmFtZXRlcnMuVE9QSUNfTEFCRUwgb3IgUGFyYW1ldGVycy5UT1BJQ19VUklcbiAgICAgKiByZXNwZWN0aXZlbHkuXG4gICAgICogQHBhcmFtIHRvcGljcyAtIHRoZW1lIG9yIHRvcGljcyB0byBjb25zdHJhaW4gYnlcbiAgICAgKi9cbiAgICBzZXRUb3BpY3MgKHRvcGljczpzdHJpbmd8c3RyaW5nW10sIHBhcmFtZXRlciA/OiBzdHJpbmcpIHtcblxuICAgICAgICAvL2NsZWFyIGV4aXN0aW5nXG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVE9QSUNTX0lELCBudWxsKTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5UT1BJQ1NfTEFCRUwsIG51bGwpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlRPUElDU19VUkksIG51bGwpO1xuXG4gICAgICAgIGxldCBwYXJhbSA9IHBhcmFtZXRlciB8fCBQYXJhbWV0ZXJzLlRPUElDU19JRDtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIocGFyYW0sIHRvQXJyYXkodG9waWNzKSk7XG4gICAgfVxuXG4gICAgZ2V0VG9waWNzICgpIDogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5UT1BJQ1NfSUQpIHx8XG4gICAgICAgICAgICB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlRPUElDU19MQUJFTCkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVE9QSUNTX1VSSSk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IGEgUHVibGlzaGVyIG9yIHNldCBvZiBQdWJsaXNoZXJzIHRvIGNvbnN0cmFpbiByZXN1bHRzLiBCeVxuICAgICAqIGRlZmF1bHQsIHZhbHVlcyBhcmUgYXNzdW1lZCB0byBiZSBpZGVudGlmaWVycy4gSWYgdXNpbmcgbGFiZWxzIG9yIHVyaXMsXG4gICAgICogc3BlY2lmeSB0aGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlciB0byBiZSBlaXRoZXJcbiAgICAgKiBQYXJhbWV0ZXJzLlBVQkxJU0hFUlNfTEFCRUwgb3IgUGFyYW1ldGVycy5QVUJMSVNIRVJTX1VSSSByZXNwZWN0aXZlbHkuXG4gICAgICogQHBhcmFtIHBhcmFtZXRlciAtIG9wdGlvbmFsLCB0byBpbmRpY2F0ZSB0aGUgcGFyYW1ldGVyIHRvIHVzZVxuICAgICAqIEByZXR1cm4gUXVlcnlcbiAgICAgKi9cbiAgICBwdWJsaXNoZXJzKHB1Ymxpc2hlcnM6c3RyaW5nfHN0cmluZ1tdLCBwYXJhbWV0ZXI/OnN0cmluZykgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0UHVibGlzaGVycyhwdWJsaXNoZXJzLCBwYXJhbWV0ZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IGEgUHVibGlzaGVyIG9yIHNldCBvZiBQdWJsaXNoZXJzIHRvIGNvbnN0cmFpbiByZXN1bHRzLiBCeVxuICAgICAqIGRlZmF1bHQsIHZhbHVlcyBhcmUgYXNzdW1lZCB0byBiZSBpZGVudGlmaWVycy4gSWYgdXNpbmcgbGFiZWxzIG9yIHVyaXMsXG4gICAgICogc3BlY2lmeSB0aGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlciB0byBiZSBlaXRoZXJcbiAgICAgKiBQYXJhbWV0ZXJzLlBVQkxJU0hFUlNfTEFCRUwgb3IgUGFyYW1ldGVycy5QVUJMSVNIRVJTX1VSSSByZXNwZWN0aXZlbHkuXG4gICAgICogQHBhcmFtIHB1Ymxpc2hlcnMgLSBwdWJsaXNoaW5nIG9yZ3MgdG8gY29uc3RyYWluIGJ5XG4gICAgICovXG4gICAgc2V0UHVibGlzaGVycyAocHVibGlzaGVyczpzdHJpbmd8c3RyaW5nW10sIHBhcmFtZXRlcj86c3RyaW5nKSB7XG5cbiAgICAgICAgLy9jbGVhciBleGlzdGluZ1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlBVQkxJU0hFUlNfSUQsIG51bGwpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlBVQkxJU0hFUlNfTEFCRUwsIG51bGwpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlBVQkxJU0hFUlNfVVJJLCBudWxsKTtcblxuICAgICAgICBsZXQgcGFyYW0gPSBwYXJhbWV0ZXIgfHwgUGFyYW1ldGVycy5QVUJMSVNIRVJTX0lEO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihwYXJhbSwgdG9BcnJheShwdWJsaXNoZXJzKSk7XG4gICAgfVxuXG4gICAgZ2V0UHVibGlzaGVycyAoKSA6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuUFVCTElTSEVSU19JRCkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuUFVCTElTSEVSU19MQUJFTCkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuUFVCTElTSEVSU19VUkkpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgLyoqXG4gICAgICogU3BlY2lmeSBhIFBvaW50IG9mIENvbnRhY3Qgb3Igc2V0IG9mIENvbnRhY3RzIHRvIGNvbnN0cmFpbiByZXN1bHRzLiBCeVxuICAgICAqIGRlZmF1bHQsIHZhbHVlcyBhcmUgYXNzdW1lZCB0byBiZSBpZGVudGlmaWVycy4gSWYgdXNpbmdcbiAgICAgKiBsYWJlbHMgb3IgdXJpcywgc3BlY2lmeSB0aGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlciB0byBiZSBlaXRoZXJcbiAgICAgKiBQYXJhbWV0ZXJzLkNPTlRBQ1RTX0xBQkVMIG9yIFBhcmFtZXRlcnMuQ09OVEFDVFNfVVJJIHJlc3BlY3RpdmVseS5cbiAgICAgKiBAcGFyYW0gcGFyYW1ldGVyIC0gb3B0aW9uYWwsIHRvIGluZGljYXRlIHRoZSBwYXJhbWV0ZXIgdG8gdXNlXG4gICAgICogQHJldHVybiBRdWVyeVxuICAgICAqL1xuICAgIGNvbnRhY3RzKGNvbnRhY3RzOnN0cmluZ3xzdHJpbmdbXSwgcGFyYW1ldGVyPzpzdHJpbmcpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldENvbnRhY3RzKGNvbnRhY3RzLCBwYXJhbWV0ZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IGEgQ29udGFjdCBvciBzZXQgb2YgQ29udGFjdHMgdG8gY29uc3RyYWluIHJlc3VsdHMuIEJ5XG4gICAgICogZGVmYXVsdCwgdmFsdWVzIGFyZSBhc3N1bWVkIHRvIGJlIGlkZW50aWZpZXJzLiBJZiB1c2luZ1xuICAgICAqIGxhYmVscyBvciB1cmlzLCBzcGVjaWZ5IHRoZSBvcHRpb25hbCBzZWNvbmQgcGFyYW1ldGVyIHRvIGJlIGVpdGhlclxuICAgICAqIFBhcmFtZXRlcnMuQ09OVEFDVFNfTEFCRUwgb3IgUGFyYW1ldGVycy5DT05UQUNUU19VUkkgcmVzcGVjdGl2ZWx5LlxuICAgICAqIEBwYXJhbSBjb250YWN0cyAtIHB1Ymxpc2hpbmcgb3JncyB0byBjb25zdHJhaW4gYnlcbiAgICAgKi9cbiAgICBzZXRDb250YWN0cyAoY29udGFjdHM6c3RyaW5nfHN0cmluZ1tdLCBwYXJhbWV0ZXI/OnN0cmluZykge1xuXG4gICAgICAgIC8vY2xlYXIgZXhpc3RpbmdcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5DT05UQUNUU19JRCwgbnVsbCk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuQ09OVEFDVFNfTEFCRUwsIG51bGwpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkNPTlRBQ1RTX1VSSSwgbnVsbCk7XG5cbiAgICAgICAgbGV0IHBhcmFtID0gcGFyYW1ldGVyIHx8IFBhcmFtZXRlcnMuQ09OVEFDVFNfSUQ7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKHBhcmFtLCB0b0FycmF5KGNvbnRhY3RzKSk7XG4gICAgfVxuXG4gICAgZ2V0Q29udGFjdHMgKCkgOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkNPTlRBQ1RTX0lEKSB8fFxuICAgICAgICAgICAgdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5DT05UQUNUU19MQUJFTCkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuQ09OVEFDVFNfVVJJKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgdGhlIGlkZW50aWZpZXIgb2YgYW4gQWdlbnQgKENvbW11bml0eSwgR3JvdXAsIGV0YykgdGhhdFxuICAgICAqIHVzZXMgaXRlbXMgeW91IHdpc2ggdG8gZmluZCBpbiBzZWFyY2ggcmVzdWx0cy4gQnlcbiAgICAgKiBkZWZhdWx0LCB2YWx1ZXMgYXJlIGFzc3VtZWQgdG8gYmUgaWRlbnRpZmllcnMuIElmIHVzaW5nXG4gICAgICogbGFiZWxzIG9yIHVyaXMsIHNwZWNpZnkgdGhlIG9wdGlvbmFsIHNlY29uZCBwYXJhbWV0ZXJcbiAgICAgKiB0byBiZSBlaXRoZXIgUGFyYW1ldGVycy5VU0VEX0JZX0xBQkVMIG9yIFBhcmFtZXRlcnMuVVNFRF9CWV9VUklcbiAgICAgKiByZXNwZWN0aXZlbHkuXG4gICAgICogQHBhcmFtIHBhcmFtZXRlciAtIG9wdGlvbmFsLCB0byBpbmRpY2F0ZSB0aGUgcGFyYW1ldGVyIHRvIHVzZVxuICAgICAqIEByZXR1cm4gUXVlcnlcbiAgICAgKi9cbiAgICB1c2VkQnkoaWRzOnN0cmluZ3xzdHJpbmdbXSwgcGFyYW1ldGVyPzpzdHJpbmcpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldFVzZWRCeShpZHMsIHBhcmFtZXRlcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgdGhlIGlkZW50aWZpZXIgb2YgYW4gQWdlbnQgKENvbW11bml0eSwgR3JvdXAsIGV0YykgdGhhdFxuICAgICAqIHVzZXMgaXRlbXMgeW91IHdpc2ggdG8gZmluZCBpbiBzZWFyY2ggcmVzdWx0cy4gQnlcbiAgICAgKiBkZWZhdWx0LCB2YWx1ZXMgYXJlIGFzc3VtZWQgdG8gYmUgaWRlbnRpZmllcnMuIElmIHVzaW5nXG4gICAgICogbGFiZWxzIG9yIHVyaXMsIHNwZWNpZnkgdGhlIG9wdGlvbmFsIHNlY29uZCBwYXJhbWV0ZXJcbiAgICAgKiB0byBiZSBlaXRoZXIgUGFyYW1ldGVycy5VU0VEX0JZX0xBQkVMIG9yIFBhcmFtZXRlcnMuVVNFRF9CWV9VUklcbiAgICAgKiByZXNwZWN0aXZlbHkuXG4gICAgICogQHBhcmFtIGlkcyAtIHB1Ymxpc2hpbmcgb3JncyB0byBjb25zdHJhaW4gYnlcbiAgICAgKi9cbiAgICBzZXRVc2VkQnkgKGlkczpzdHJpbmd8c3RyaW5nW10sIHBhcmFtZXRlcj86c3RyaW5nKSB7XG5cbiAgICAgICAgLy9jbGVhciBleGlzdGluZ1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlVTRURfQllfSUQsIG51bGwpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlVTRURfQllfTEFCRUwsIG51bGwpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlVTRURfQllfVVJJLCBudWxsKTtcblxuICAgICAgICBsZXQgcGFyYW0gPSBwYXJhbWV0ZXIgfHwgUGFyYW1ldGVycy5VU0VEX0JZX0lEO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihwYXJhbSwgdG9BcnJheShpZHMpKTtcbiAgICB9XG5cbiAgICBnZXRVc2VkQnkgKCkgOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlVTRURfQllfSUQpIHx8XG4gICAgICAgICAgICB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlVTRURfQllfTEFCRUwpIHx8XG4gICAgICAgICAgICB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlVTRURfQllfVVJJKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgYSBDb25jZXB0IFNjaGVtZSBvciBzZXQgb2YgQ29uY2VwdCBTY2hlbWVzIHRvIGNvbnN0cmFpbiByZXN1bHRzLiBCeVxuICAgICAqIGRlZmF1bHQsIHZhbHVlcyBhcmUgYXNzdW1lZCB0byBiZSBpZGVudGlmaWVycy4gSWYgdXNpbmdcbiAgICAgKiBsYWJlbHMgb3IgdXJpcywgc3BlY2lmeSB0aGUgb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlclxuICAgICAqIHRvIGJlIGVpdGhlciBQYXJhbWV0ZXJzLlNDSEVNRVNfTEFCRUwgb3IgUGFyYW1ldGVycy5TQ0hFTUVTX1VSSVxuICAgICAqIHJlc3BlY3RpdmVseS5cbiAgICAgKiBAcGFyYW0gc2NoZW1lcyAtIHNjaGVtZXMgdG8gY29uc3RyYWluIGJ5XG4gICAgICogQHBhcmFtIHBhcmFtZXRlciAtIG9wdGlvbmFsLCB0byBpbmRpY2F0ZSB0aGUgcGFyYW1ldGVyIHRvIHVzZVxuICAgICAqIEByZXR1cm4gUXVlcnlcbiAgICAgKi9cbiAgICBzY2hlbWVzKHNjaGVtZXM6c3RyaW5nfHN0cmluZ1tdLCBwYXJhbWV0ZXI/OnN0cmluZykgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0U2NoZW1lcyhzY2hlbWVzLCBwYXJhbWV0ZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IGEgQ29uY2VwdCBTY2hlbWUgb3Igc2V0IG9mIENvbmNlcHQgU2NoZW1lcyB0byBjb25zdHJhaW4gcmVzdWx0cy4gQnlcbiAgICAgKiBkZWZhdWx0LCB2YWx1ZXMgYXJlIGFzc3VtZWQgdG8gYmUgdGhlbWUgaWRlbnRpZmllcnMuIElmIHVzaW5nXG4gICAgICogdGhlbWUgbGFiZWxzIG9yIHRoZW1lIHVyaXMsIHNwZWNpZnkgdGhlIG9wdGlvbmFsIHNlY29uZCBwYXJhbWV0ZXJcbiAgICAgKiB0byBiZSBlaXRoZXIgUGFyYW1ldGVycy5TQ0hFTUVTX0xBQkVMIG9yIFBhcmFtZXRlcnMuU0NIRU1FU19VUklcbiAgICAgKiByZXNwZWN0aXZlbHkuXG4gICAgICogQHBhcmFtIHNjaGVtZXMgLSBzY2hlbWVzIHRvIGNvbnN0cmFpbiBieVxuICAgICAqIEBwYXJhbSBwYXJhbWV0ZXIgLSBvcHRpb25hbCwgdG8gaW5kaWNhdGUgdGhlIHBhcmFtZXRlciB0byB1c2VcbiAgICAgKi9cbiAgICBzZXRTY2hlbWVzIChzY2hlbWVzOnN0cmluZ3xzdHJpbmdbXSwgcGFyYW1ldGVyPzpzdHJpbmcpIHtcblxuICAgICAgICAvL2NsZWFyIGV4aXN0aW5nXG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuU0NIRU1FU19JRCwgbnVsbCk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuU0NIRU1FU19MQUJFTCwgbnVsbCk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuU0NIRU1FU19VUkksIG51bGwpO1xuXG4gICAgICAgIGxldCBwYXJhbSA9IHBhcmFtZXRlciB8fCBQYXJhbWV0ZXJzLlNDSEVNRVNfSUQ7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKHBhcmFtLCB0b0FycmF5KHNjaGVtZXMpKTtcbiAgICB9XG5cbiAgICBnZXRTY2hlbWVzKCkgOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlNDSEVNRVNfSUQpIHx8XG4gICAgICAgICAgICB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlNDSEVNRVNfTEFCRUwpIHx8XG4gICAgICAgICAgICB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlNDSEVNRVNfVVJJKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIHNlcnZpY2VUeXBlcyh0eXBlczpzdHJpbmd8c3RyaW5nW10pIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldFNlcnZpY2VUeXBlcyh0eXBlcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB0eXBlcyAtIGlkc1xuICAgICAqL1xuICAgIHNldFNlcnZpY2VUeXBlcyAodHlwZXM6c3RyaW5nfHN0cmluZ1tdKSB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuU0VSVklDRV9UWVBFUywgdG9BcnJheSh0eXBlcykpO1xuICAgIH1cblxuICAgIGdldFNlcnZpY2VUeXBlcyAoKSA6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuU0VSVklDRV9UWVBFUyk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICB2aXNpYmlsaXR5KHZpczpcInB1YmxpY1wifFwicHJpdmF0ZVwiKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRWaXNpYmlsaXR5KHZpcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB2aXNpYmlsaXR5IC0gb25lIG9mICdwdWJsaWMnIG9yICdwcml2YXRlJ1xuICAgICAqL1xuICAgIHNldFZpc2liaWxpdHkgKHZpc2liaWxpdHkgOiBcInB1YmxpY1wifFwicHJpdmF0ZVwiKSB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuVklTSUJJTElUWSwgdmlzaWJpbGl0eSk7XG4gICAgfVxuXG4gICAgZ2V0VmlzaWJpbGl0eSAoKSA6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlZJU0lCSUxJVFkpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgc3RhdHVzKHZhbHVlIDogc3RyaW5nKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0dXModmFsdWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc3RhdHVzIC0gY3VycmVudCBzdGF0dXMgb2YgSXRlbVxuICAgICAqL1xuICAgIHNldFN0YXR1cyAodmFsdWUgOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5TVEFUVVMsIHZhbHVlKTtcbiAgICB9XG5cbiAgICBnZXRTdGF0dXMgKCkgOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5TVEFUVVMpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgZXh0ZW50KGJib3ggOiBhbnkpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldEV4dGVudChiYm94KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGJib3ggLSBzdHJpbmcgZm9ybSBvZiBcIm1pbngsbWlueSxtYXh4LG1heHlcIiwgb3IgTC5MYXRMbmdCb3VuZHMsIG9yIEFycmF5XG4gICAgICovXG4gICAgc2V0RXh0ZW50IChiYm94IDogYW55KSB7XG4gICAgICAgIGlmKGJib3gpIHtcbiAgICAgICAgICAgIGlmKHR5cGVvZihiYm94LnRvQmJveFN0cmluZykgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgLy9MZWFmbGV0IEJvdW5kcyBpbnN0YW5jZVxuICAgICAgICAgICAgICAgIGJib3ggPSBiYm94LnRvQmJveFN0cmluZygpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYodHlwZW9mKGJib3gucHVzaCkgIT09ICd1bmRlZmluZWQnICYmIGJib3gubGVuZ3RoICYmXG4gICAgICAgICAgICAgICAgLy9OZXN0ZWQgYXJyYXkgKGFsdGVybmF0ZSBMZWFmbGV0IHJlcHJlc2VudGF0aW9uKTpcbiAgICAgICAgICAgICAgICAvLyBbIFttaW5MYXQsbWluTG9uZ10sIFttYXhMYXQsbWF4TG9uZ10gXVxuICAgICAgICAgICAgICAgIHR5cGVvZihiYm94WzBdLnB1c2gpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGJib3ggPSBiYm94WzBdWzFdKycsJytiYm94WzBdWzBdKycsJytiYm94WzFdWzFdKycsJytiYm94WzFdWzBdO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYodHlwZW9mKGJib3gpID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGlmKCFCQk9YX1JFR0VYLnRlc3QoYmJveCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBhcmd1bWVudDogYmJveCBzdHJpbmcgbXVzdCBiZSBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBcImluIGZvcm0gb2YgJ21pbngsbWlueSxtYXh4LG1heHknXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBhcmd1bWVudDogYmJveCBtdXN0IGJlIG9uZSBvZiBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwiTGVhZmxldC5Cb3VuZHMsIG5lc3RlZCBhcnJheSwgb3IgYmJveCBzdHJpbmdcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5FWFRFTlQsIGJib3gpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4gYmJveCBzdHJpbmcgb3IgbnVsbCBpZiBub3Qgc2V0XG4gICAgICovXG4gICAgZ2V0RXh0ZW50ICgpIDogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuRVhURU5UKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIEV4LlxuICAgICAqICBjb25zdCB7IEtHQ2xhc3NpZmllcnMsIFF1ZXJ5IH0gZnJvbSAnZ2VvcGxhdGZvcm0uY2xpZW50JztcbiAgICAgKiAgbGV0IHB1cnBvc2VJZCA9ICcuLi4nO1xuICAgICAqICBsZXQgcXVlcnkgPSBuZXcgUXVlcnkoKTtcbiAgICAgKiAgcXVlcnkuY2xhc3NpZmllciggS0dDbGFzc2lmaWVycy5QVVJQT1NFLCBwdXJwb3NlSWQgKTtcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjbGFzc2lmaWVyIC0gc3RyaW5nIG5hbWUgb2YgY2xhc3NpZmllciB0byB1c2VcbiAgICAgKiBAcGFyYW0gdmFsdWUgLSBpZCBvciBhcnJheSBvZiBpZHMgb2YgY29uY2VwdHMgdG8gdXNlXG4gICAgICogQHJldHVybiBRdWVyeVxuICAgICAqL1xuICAgIGNsYXNzaWZpZXIoY2xhc3NpZmllciA6IHN0cmluZywgdmFsdWUgOiBzdHJpbmd8c3RyaW5nW10pIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldENsYXNzaWZpZXIoY2xhc3NpZmllciwgdmFsdWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeC5cbiAgICAgKiAgY29uc3QgeyBLR0NsYXNzaWZpZXJzLCBRdWVyeSB9IGZyb20gJ2dlb3BsYXRmb3JtLmNsaWVudCc7XG4gICAgICogIGxldCBwdXJwb3NlSWQgPSAnLi4uJztcbiAgICAgKiAgbGV0IHF1ZXJ5ID0gbmV3IFF1ZXJ5KCk7XG4gICAgICogIHF1ZXJ5LnNldENsYXNzaWZpZXIoIEtHQ2xhc3NpZmllcnMuUFVSUE9TRSwgcHVycG9zZUlkICk7XG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2xhc3NpZmllciAtIHN0cmluZyBuYW1lIG9mIGNsYXNzaWZpZXIgdG8gdXNlXG4gICAgICogQHBhcmFtIHZhbHVlIC0gaWQgb3IgYXJyYXkgb2YgaWRzIG9mIGNvbmNlcHRzIHRvIHVzZVxuICAgICAqL1xuICAgIHNldENsYXNzaWZpZXIoY2xhc3NpZmllciA6IHN0cmluZywgdmFsdWUgOiBzdHJpbmd8c3RyaW5nW10pIHtcbiAgICAgICAgbGV0IGFyciA9IHRvQXJyYXkodmFsdWUpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkNMQVNTSUZJRVJTICsgXCIuXCIgKyBjbGFzc2lmaWVyLCBhcnIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBjbGFzc2lmaWVyIC0gbmFtZSBvZiBjbGFzc2lmaWVyIGNvbnN0cmFpbnQgaW4gdXNlXG4gICAgICogQHJldHVybiBhcnJheSBvZiBjb25jZXB0IGlkc1xuICAgICAqL1xuICAgIGdldENsYXNzaWZpZXIoY2xhc3NpZmllciA6IHN0cmluZykgOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkNMQVNTSUZJRVJTICsgXCIuXCIgKyBjbGFzc2lmaWVyKSB8fCBbXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeC5cbiAgICAgKiAgY29uc3QgeyBLR0NsYXNzaWZpZXJzLCBRdWVyeSB9IGZyb20gJ2dlb3BsYXRmb3JtLmNsaWVudCc7XG4gICAgICogIGxldCBwdXJwb3NlSWQgPSAnLi4uJyxcbiAgICAgKiAgICAgIGZ1bmN0aW9uSWRzID0gWycuLi4nLCcuLi4nXTtcbiAgICAgKiAgbGV0IHF1ZXJ5ID0gbmV3IFF1ZXJ5KCk7XG4gICAgICogIHF1ZXJ5LmNsYXNzaWZpZXJzKHtcbiAgICAgKiAgICAgICBLR0NsYXNzaWZpZXJzLlBVUlBPU0U6IHB1cnBvc2VJZCxcbiAgICAgKiAgICAgICBLR0NsYXNzaWZpZXJzLkZVTkNUSU9OOiBmdW5jdGlvbklkc1xuICAgICAqICB9KTtcbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YWx1ZSAtIG9iamVjdCBkZWZpbmluZyBjbGFzc2lmaWVyc1xuICAgICAqIEByZXR1cm4gUXVlcnkgaW5zdGFuY2VcbiAgICAgKi9cbiAgICBjbGFzc2lmaWVycyh2YWx1ZSA6IGFueSkgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0Q2xhc3NpZmllcnModmFsdWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gdmFsdWUgLSBvYmplY3QgZGVmaW5pbmcgY2xhc3NpZmllcnNcbiAgICAgKi9cbiAgICBzZXRDbGFzc2lmaWVycyAodmFsdWUgOiBhbnkpIHtcbiAgICAgICAgY29uc3QgY2xhc3NlcyA9IE9iamVjdC5rZXlzKENsYXNzaWZpZXJzKS5tYXAoaz0+Q2xhc3NpZmllcnNba10pO1xuICAgICAgICBpZighdmFsdWUgfHwgdHlwZW9mKHZhbHVlKSAhPT0gJ29iamVjdCcgfHwgQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGNsYXNzZXMuZm9yRWFjaCggY2xhc3NpZmllciA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhclBhcmFtZXRlciggUGFyYW1ldGVycy5DTEFTU0lGSUVSUyArIFwiLlwiICsgY2xhc3NpZmllciApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgT2JqZWN0LmtleXModmFsdWUpLmZvckVhY2goIGNsYXNzaWZpZXIgPT4ge1xuICAgICAgICAgICAgaWYofmNsYXNzZXMuaW5kZXhPZihjbGFzc2lmaWVyKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0Q2xhc3NpZmllciggY2xhc3NpZmllciwgdmFsdWVbY2xhc3NpZmllcl0gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiBjbGFzc2lmaWVycyB1c2VkIGluIHRoZSBxdWVyeVxuICAgICAqL1xuICAgIGdldENsYXNzaWZpZXJzICgpIDogYW55IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IHt9O1xuICAgICAgICBPYmplY3Qua2V5cyhDbGFzc2lmaWVycykubWFwKGs9PkNsYXNzaWZpZXJzW2tdKS5mb3JFYWNoKCBjbGFzc2lmaWVyID0+IHtcbiAgICAgICAgICAgIHJlc3VsdFtjbGFzc2lmaWVyXSA9IHRoaXMuZ2V0Q2xhc3NpZmllcihjbGFzc2lmaWVyKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICBtb2RpZmllZChkYXRlIDogbnVtYmVyfERhdGUsIGJlZm9yZU9yQWZ0ZXIgOiBib29sZWFuKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRNb2RpZmllZChkYXRlLCBiZWZvcmVPckFmdGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGRhdGUgLSBkYXRlIHRvIGNvbXBhcmUgYWdhaW5zdFxuICAgICAqIEBwYXJhbSBiZWZvcmVPckFmdGVyIC0gZmxhZyBzcGVjaWZ5aW5nIHdoaWNoIGJvdW5kYXJ5IGNvbmRpdGlvbiAodHJ1ZSA9IGJlZm9yZSwgZmFsc2UgPSBhZnRlcikgZmxhZyBzcGVjaWZ5aW5nIHdoZXRoZXIgdG8gdHJpZ2dlciB1cGRhdGUgYXV0b21hdGljYWxseVxuICAgICAqL1xuICAgIHNldE1vZGlmaWVkIChkYXRlIDogbnVtYmVyfERhdGUsIGJlZm9yZU9yQWZ0ZXI6Ym9vbGVhbikge1xuXG4gICAgICAgIC8vaWYgbm8gZGF0ZSB3YXMgc3VwcGxpZWQsIGNvbnNpZGVyIGl0IFwidW5zZXRcIiBmb3IgYm90aCBwcm9wZXJ0aWVzXG4gICAgICAgIGlmKCFkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLk1PRElGSUVEX0JFRk9SRSwgbnVsbCk7XG4gICAgICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLk1PRElGSUVEX0FGVEVSLCBudWxsKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCEoZGF0ZSBpbnN0YW5jZW9mIERhdGUpKVxuICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUgYXMgbnVtYmVyKTtcblxuICAgICAgICBsZXQgZGlyID0gYmVmb3JlT3JBZnRlciAmJiAoYmVmb3JlT3JBZnRlciA9PT0gdHJ1ZSB8fCBiZWZvcmVPckFmdGVyID09PSBcInRydWVcIik7XG4gICAgICAgIGxldCBwcm9wID0gZGlyID8gUGFyYW1ldGVycy5NT0RJRklFRF9CRUZPUkUgOiBQYXJhbWV0ZXJzLk1PRElGSUVEX0FGVEVSOyAgICAgICAvL3Byb3BlcnR5IGJlaW5nIHNldFxuICAgICAgICBsZXQgb3BwUHJvcCA9IGRpciA/IFBhcmFtZXRlcnMuTU9ESUZJRURfQUZURVIgOiBQYXJhbWV0ZXJzLk1PRElGSUVEX0JFRk9SRTsgICAgLy91bnNldCBvcHBvc2l0ZSBwcm9wZXJ0eVxuICAgICAgICBsZXQgYXJnID0gKGRhdGUgJiYgZGF0ZS5nZXRUaW1lKSA/IGRhdGUuZ2V0VGltZSgpIDogZGF0ZTtcblxuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihvcHBQcm9wLCBudWxsKTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIocHJvcCwgYXJnKTtcbiAgICB9XG5cbiAgICBnZXRNb2RpZmllZCAoKSA6IERhdGUge1xuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLk1PRElGSUVEX0JFRk9SRSkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuTU9ESUZJRURfQUZURVIpO1xuICAgICAgICBpZih2YWx1ZSAmJiB0eXBlb2YodmFsdWUpID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdmFsdWUgPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgY3JlYXRlZChkYXRlIDogbnVtYmVyfERhdGUsIGJlZm9yZU9yQWZ0ZXI6Ym9vbGVhbikgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0Q3JlYXRlZChkYXRlLCBiZWZvcmVPckFmdGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGRhdGUgLSBkYXRlIHRvIGNvbXBhcmUgYWdhaW5zdFxuICAgICAqIEBwYXJhbSBiZWZvcmVPckFmdGVyIC0gZmxhZyBzcGVjaWZ5aW5nIHdoaWNoIGJvdW5kYXJ5IGNvbmRpdGlvbiAodHJ1ZSA9IGJlZm9yZSwgZmFsc2UgPSBhZnRlcikgZmxhZyBzcGVjaWZ5aW5nIHdoZXRoZXIgdG8gdHJpZ2dlciB1cGRhdGUgYXV0b21hdGljYWxseVxuICAgICAqL1xuICAgIHNldENyZWF0ZWQgKGRhdGUgOiBudW1iZXJ8RGF0ZSwgYmVmb3JlT3JBZnRlcjpib29sZWFuKSB7XG5cbiAgICAgICAgLy9pZiBubyBkYXRlIHdhcyBzdXBwbGllZCwgY29uc2lkZXIgaXQgXCJ1bnNldFwiIGZvciBib3RoIHByb3BlcnRpZXNcbiAgICAgICAgaWYoIWRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuQ1JFQVRFRF9CRUZPUkUsIG51bGwpO1xuICAgICAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5DUkVBVEVEX0FGVEVSLCBudWxsKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCEoZGF0ZSBpbnN0YW5jZW9mIERhdGUpKVxuICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUgYXMgbnVtYmVyKTtcblxuICAgICAgICBsZXQgZGlyID0gYmVmb3JlT3JBZnRlciAmJiAoYmVmb3JlT3JBZnRlciA9PT0gdHJ1ZSB8fCBiZWZvcmVPckFmdGVyID09PSBcInRydWVcIik7XG4gICAgICAgIGxldCBwcm9wID0gZGlyID8gUGFyYW1ldGVycy5DUkVBVEVEX0JFRk9SRSA6IFBhcmFtZXRlcnMuQ1JFQVRFRF9BRlRFUjsgICAgICAgLy9wcm9wZXJ0eSBiZWluZyBzZXRcbiAgICAgICAgbGV0IG9wcFByb3AgPSBkaXIgPyBQYXJhbWV0ZXJzLkNSRUFURURfQUZURVIgOiBQYXJhbWV0ZXJzLkNSRUFURURfQkVGT1JFOyAgICAvL3Vuc2V0IG9wcG9zaXRlIHByb3BlcnR5XG4gICAgICAgIGxldCBhcmcgPSAoZGF0ZSAmJiBkYXRlLmdldFRpbWUpID8gZGF0ZS5nZXRUaW1lKCkgOiBkYXRlO1xuXG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKG9wcFByb3AsIG51bGwpO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihwcm9wLCBhcmcpO1xuICAgIH1cblxuICAgIGdldENyZWF0ZWQgKCkgOiBEYXRlIHtcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5DUkVBVEVEX0JFRk9SRSkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuQ1JFQVRFRF9BRlRFUik7XG4gICAgICAgIGlmKHZhbHVlICYmIHR5cGVvZih2YWx1ZSkgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IG5ldyBEYXRlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICBiZWdpbnMoZGF0ZSA6IG51bWJlcnxEYXRlKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRCZWdpbkRhdGUoZGF0ZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldEJlZ2luRGF0ZSAoZGF0ZSA6IG51bWJlcnxEYXRlKSB7XG4gICAgICAgIGlmKGRhdGUgJiYgZGF0ZSBpbnN0YW5jZW9mIERhdGUpXG4gICAgICAgICAgICBkYXRlID0gZGF0ZS5nZXRUaW1lKCk7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuQkVHSU5TLCBkYXRlKTtcbiAgICB9XG5cbiAgICBnZXRCZWdpbkRhdGUgKCkgOiBEYXRlIHtcbiAgICAgICAgbGV0IGRhdGUgPSB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkJFR0lOUyk7XG4gICAgICAgIGlmKGRhdGUpIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICBlbmRzKGRhdGUgOiBudW1iZXJ8RGF0ZSkgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0RW5kRGF0ZShkYXRlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0RW5kRGF0ZSAoZGF0ZTogbnVtYmVyfERhdGUpIHtcbiAgICAgICAgaWYoZGF0ZSAmJiBkYXRlIGluc3RhbmNlb2YgRGF0ZSlcbiAgICAgICAgICAgIGRhdGUgPSBkYXRlLmdldFRpbWUoKTtcbiAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5FTkRTLCBkYXRlKTtcbiAgICB9XG5cbiAgICBnZXRFbmREYXRlICgpIDogRGF0ZSB7XG4gICAgICAgIGxldCBkYXRlID0gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5FTkRTKTtcbiAgICAgICAgaWYoZGF0ZSkgZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIGJldHdlZW4oYmVnaW4gOiBudW1iZXJ8RGF0ZSwgZW5kIDogbnVtYmVyfERhdGUpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldEJldHdlZW4oYmVnaW4sIGVuZCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldEJldHdlZW4oYmVnaW4gOiBudW1iZXJ8RGF0ZSwgZW5kIDogbnVtYmVyfERhdGUpIHtcbiAgICAgICAgdGhpcy5iZWdpbnMoYmVnaW4pO1xuICAgICAgICB0aGlzLmVuZHMoZW5kKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIHJlc291cmNlVHlwZXModHlwZXM6IHN0cmluZ3xzdHJpbmdbXSkgOiBRdWVyeSB7XG4gICAgICAgIHRoaXMuc2V0UmVzb3VyY2VUeXBlcyh0eXBlcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldFJlc291cmNlVHlwZXModHlwZXM6IHN0cmluZ3xzdHJpbmdbXSkge1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlJFU09VUkNFX1RZUEUsIHRvQXJyYXkodHlwZXMpKTtcbiAgICB9XG5cbiAgICBnZXRSZXNvdXJjZVR5cGVzKCkgOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlJFU09VUkNFX1RZUEUpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgZmFjZXRzKG5hbWVzIDogc3RyaW5nfHN0cmluZ1tdKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRGYWNldHMobmFtZXMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIEBwYXJhbSBuYW1lcyAtIG5hbWVzIG9mIGZhY2V0c1xuICAgICAqL1xuICAgIHNldEZhY2V0cyAobmFtZXM6IHN0cmluZ3xzdHJpbmdbXSkge1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLkZBQ0VUUywgdG9BcnJheShuYW1lcykpO1xuICAgIH1cblxuICAgIGdldEZhY2V0cygpIDogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5GQUNFVFMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBuYW1lIC0gbmFtZSBvZiBmYWNldCB0byBhZGRcbiAgICAgKi9cbiAgICBhZGRGYWNldChuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGZhY2V0cyA9IHRoaXMuZ2V0RmFjZXRzKCkgfHwgW107XG4gICAgICAgIGZhY2V0cy5wdXNoKG5hbWUpO1xuICAgICAgICB0aGlzLnNldEZhY2V0cyhmYWNldHMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBuYW1lIC0gbmFtZSBvZiBmYWNldCB0byByZW1vdmVcbiAgICAgKi9cbiAgICByZW1vdmVGYWNldChuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGZhY2V0cyA9IHRoaXMuZ2V0RmFjZXRzKCkgfHwgW107XG4gICAgICAgIGxldCBpZHggPSBmYWNldHMuaW5kZXhPZihuYW1lKTtcbiAgICAgICAgaWYoaWR4Pj0wKSB7XG4gICAgICAgICAgICBmYWNldHMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICB0aGlzLnNldEZhY2V0cyhmYWNldHMpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICBmaWVsZHMoZmllbGRzOiBzdHJpbmd8c3RyaW5nW10pIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldEZpZWxkcyhmaWVsZHMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZmllbGRzIC0gbGlzdCBvZiBmaWVsZCBuYW1lcyB0byByZXF1ZXN0IGZvciBlYWNoIHNlYXJjaCByZXN1bHRcbiAgICAgKi9cbiAgICBzZXRGaWVsZHMgKGZpZWxkczogc3RyaW5nfHN0cmluZ1tdKSB7XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuRklFTERTLCB0b0FycmF5KGZpZWxkcykpO1xuICAgIH1cblxuICAgIGdldEZpZWxkcygpIDogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5GSUVMRFMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBmaWVsZCAtIG5hbWUgb2YgZmllbGQgdG8gcmVtb3ZlXG4gICAgICovXG4gICAgYWRkRmllbGQoZmllbGQ6IHN0cmluZykge1xuICAgICAgICBsZXQgZmllbGRzID0gdGhpcy5nZXRGaWVsZHMoKSB8fCBbXTtcbiAgICAgICAgZmllbGRzLnB1c2goZmllbGQpO1xuICAgICAgICB0aGlzLnNldEZpZWxkcyhmaWVsZHMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBmaWVsZCAtIG5hbWUgb2YgZmllbGQgdG8gcmVtb3ZlXG4gICAgICovXG4gICAgcmVtb3ZlRmllbGQoZmllbGQ6IHN0cmluZykge1xuICAgICAgICBsZXQgZmllbGRzID0gdGhpcy5nZXRGaWVsZHMoKSB8fCBbXTtcbiAgICAgICAgbGV0IGlkeCA9IGZpZWxkcy5pbmRleE9mKGZpZWxkKTtcbiAgICAgICAgaWYoaWR4Pj0wKSB7XG4gICAgICAgICAgICBmaWVsZHMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICB0aGlzLnNldEZpZWxkcyhmaWVsZHMpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBwYWdlIC0gcGFnZSBvZiByZXN1bHRzIHRvIGZldGNoXG4gICAgICovXG4gICAgcGFnZSAocGFnZTogbnVtYmVyKSA6IFF1ZXJ5IHtcbiAgICAgICAgdGhpcy5zZXRQYWdlKHBhZ2UpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRQYWdlKHBhZ2U6IG51bWJlcikge1xuICAgICAgICBpZihpc05hTihwYWdlKSB8fCBwYWdlKjE8MCkgcmV0dXJuO1xuICAgICAgICB0aGlzLnNldFBhcmFtZXRlcihQYXJhbWV0ZXJzLlBBR0UsIHBhZ2UqMSk7XG4gICAgfVxuXG4gICAgZ2V0UGFnZSgpIDogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuUEFHRSk7XG4gICAgfVxuXG4gICAgbmV4dFBhZ2UoKSA6IHZvaWQge1xuICAgICAgICB0aGlzLnNldFBhZ2UodGhpcy5nZXRQYWdlKCkrMSk7XG4gICAgfVxuXG4gICAgcHJldmlvdXNQYWdlKCkgOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRQYWdlKHRoaXMuZ2V0UGFnZSgpLTEpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHNpemUgLSBwYWdlIHNpemUgdG8gcmVxdWVzdFxuICAgICAqL1xuICAgIHBhZ2VTaXplIChzaXplOiBudW1iZXIpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldFBhZ2VTaXplKHNpemUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRQYWdlU2l6ZSAoc2l6ZTogbnVtYmVyKSB7XG4gICAgICAgIGlmKGlzTmFOKHNpemUpIHx8IHNpemUqMTwwKSByZXR1cm47XG4gICAgICAgIHRoaXMuc2V0UGFyYW1ldGVyKFBhcmFtZXRlcnMuUEFHRV9TSVpFLCBzaXplKjEpO1xuICAgIH1cblxuICAgIGdldFBhZ2VTaXplKCkgOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5QQUdFX1NJWkUpO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHNvcnQgLSBmb3JtIG9mIDxmaWVsZD4sPGRpcj4gb3IganVzdCBmaWVsZCBuYW1lXG4gICAgICogQHBhcmFtIG9yZGVyIC0gb3B0aW9uYWwsIGVpdGhlciAnYXNjJyBvciAnZGVzYydcbiAgICAgKi9cbiAgICBzb3J0IChzb3J0OiBzdHJpbmcsIG9yZGVyPzpzdHJpbmcpIDogUXVlcnkge1xuICAgICAgICB0aGlzLnNldFNvcnQoc29ydCwgb3JkZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc29ydCAtIGZvcm0gb2YgPGZpZWxkPiw8ZGlyPiBvciBqdXN0IGZpZWxkIG5hbWVcbiAgICAgKiBAcGFyYW0gb3JkZXIgLSBvcHRpb25hbCwgZWl0aGVyICdhc2MnIG9yICdkZXNjJ1xuICAgICAqL1xuICAgICBzZXRTb3J0KHNvcnQ6IHN0cmluZywgb3JkZXI/OnN0cmluZykge1xuICAgICAgICAgb3JkZXIgPSBvcmRlciB8fCAnZGVzYyc7XG4gICAgICAgICBpZihzb3J0ICYmIHNvcnQuaW5kZXhPZignLCcpPDApXG4gICAgICAgICAgICBzb3J0ID0gc29ydCArICcsJyArIG9yZGVyO1xuICAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5TT1JULCBzb3J0KTtcbiAgICB9XG5cbiAgICBnZXRTb3J0KCkgOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYXJhbWV0ZXIoUGFyYW1ldGVycy5TT1JUKTtcbiAgICB9XG5cbiAgICBnZXRTb3J0RmllbGQoKSA6IHN0cmluZyB8IG51bGwge1xuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLmdldFNvcnQoKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlICYmIHZhbHVlLmxlbmd0aCA/IHZhbHVlLnNwbGl0KCcsJylbMF0gOiBudWxsO1xuICAgIH1cblxuICAgIGdldFNvcnRPcmRlcigpIDogc3RyaW5nIHwgbnVsbCB7XG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZ2V0U29ydCgpO1xuICAgICAgICByZXR1cm4gdmFsdWUgJiYgdmFsdWUubGVuZ3RoID8gdmFsdWUuc3BsaXQoJywnKVsxXSA6IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiBsaXN0IG9mIGtleS12YWx1ZSBwYWlycyBvZiBzb3J0IG9wdGlvbnNcbiAgICAgKi9cbiAgICBnZXRTb3J0T3B0aW9ucygpIDogeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nOyB9W10ge1xuICAgICAgICByZXR1cm4gU09SVF9PUFRJT05TX0RFRkFVTFQuc2xpY2UoMCk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGNsZWFyICgpIHtcbiAgICAgICAgdGhpcy5xdWVyeSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5kZWZhdWx0UXVlcnkpKTtcbiAgICB9XG59XG5cbmV4cG9ydCB7XG4gICAgUXVlcnkgYXMgZGVmYXVsdCxcbiAgICBRdWVyeSxcbiAgICBGaWVsZHMsXG4gICAgRmFjZXRzXG59O1xuIl19