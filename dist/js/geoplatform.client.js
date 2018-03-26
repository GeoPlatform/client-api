"use strict";

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (root, factory) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.ItemTypes = factory();
    } else if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define([], function () {
            return root.ItemTypes = factory();
        });
    } else {
        GeoPlatform.ItemTypes = factory();
    }
})(undefined || window, function () {

    var ItemTypes = {
        DATASET: "dcat:Dataset",
        SERVICE: "regp:Service",
        LAYER: "Layer",
        MAP: "Map",
        GALLERY: "Gallery",
        COMMUNITY: 'Community',
        ORGANIZATION: "org:Organization",
        CONCEPT: "skos:Concept",
        CONCEPT_SCHEME: "skos:ConceptScheme",
        STANDARD: 'dct:Standard'
    };

    return ItemTypes;
});

(function (root, factory) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.QueryParameters = factory();
    } else if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define('QueryParameters', function () {
            return root.QueryParameters = factory();
        });
    } else {
        GeoPlatform.QueryParameters = factory();
    }
})(undefined || window, function () {

    var Parameters = {
        TYPES: 'type',
        QUERY: 'q',
        KEYWORDS: 'keyword',
        URI: 'uri',
        CREATED_BY: 'createdBy',
        CONTRIBUTED_BY: 'contributedBy',
        CREATOR: 'creator.id',
        SVC_TYPES: 'serviceType.id',
        THEMES_ID: 'theme.id',
        THEMES_LABEL: 'theme.label',
        THEMES_URI: 'theme.uri',
        PUBLISHERS: 'publisher.id',
        PUBLISHERS_LABEL: 'publisher.label',
        PUBLISHERS_URI: 'publisher.uri',
        USED_BY: 'usedBy.id',
        USED_BY_LABEL: 'usedBy.label',
        USED_BY_URI: 'usedBy.uri',
        SCHEMES_ID: 'scheme.id',
        SCHEMES_LABEL: 'scheme.label',
        SCHEMES_URI: 'scheme.uri',
        VISIBILITY: 'visibility',
        EXTENT: 'extent',
        MODIFIED_BEFORE: 'modified.max',
        MODIFIED_AFTER: 'modified.min',
        BEGINS: 'startDate.min',
        ENDS: 'endDate.max',
        RESOURCE_TYPE: 'resourceType',

        //recommender service-specific
        FOR_TYPES: 'for'
    };

    return Parameters;
});

(function (root, factory) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.QueryFacets = factory();
    } else if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define('QueryFacets', function () {
            return root.QueryFacets = factory();
        });
    } else {
        GeoPlatform.QueryFacets = factory();
    }
})(undefined || window, function () {

    var Facets = {
        TYPES: 'types',
        THEMES: 'themes',
        PUBLISHERS: 'publishers',
        SERVICE_TYPES: 'serviceTypes',
        CONCEPT_SCHEMES: 'schemes',
        VISIBILITY: 'visibility',
        CREATED_BY: 'createdBy',
        USED_BY: 'usedBy.id'
    };

    return Facets;
});

(function (root, factory) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.Query = factory(require('./parameters'), require('./facets'));
    } else if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define('Query', ['./parameters', './facets'], function (QueryParameters, QueryFacets) {
            return root.Query = factory(QueryParameters, QueryFacets);
        });
    } else {
        GeoPlatform.Query = factory(GeoPlatform.QueryParameters, GeoPlatform.QueryFacets);
    }
})(undefined || window, function (QueryParameters, QueryFacets) {

    var FIELDS_DEFAULT = ['created', 'modified', 'createdBy', 'publishers', 'themes', 'description'];

    var FACETS_DEFAULT = [QueryFacets.TYPES, QueryFacets.PUBLISHERS, QueryFacets.SERVICE_TYPES, QueryFacets.CONCEPT_SCHEMES, QueryFacets.VISIBILITY, QueryFacets.CREATED_BY];

    var SORT_OPTIONS_DEFAULT = [{ value: "label,asc", label: "Name (A-Z)" }, { value: "label,desc", label: "Name (Z-A)" }, { value: "type,asc", label: "Type (A-Z)" }, { value: "type,desc", label: "Type (Z-A)" }, { value: "modified,desc", label: "Most recently modified" }, { value: "modified,asc", label: "Least recently modified" }, { value: "_score,desc", label: "Relevance" }];

    var Query = function () {
        function Query() {
            _classCallCheck(this, Query);

            this.defaultQuery = {
                page: 0,
                size: 10,
                total: 0,
                sort: "modified,desc",
                fields: FIELDS_DEFAULT.slice(0),
                includeFacets: FACETS_DEFAULT.slice(0)
            };

            this.query = {
                page: 0,
                size: 10,
                total: 0,
                sort: "modified,desc",
                fields: FIELDS_DEFAULT.slice(0),
                includeFacets: FACETS_DEFAULT.slice(0)
            };
        }

        _createClass(Query, [{
            key: "getQuery",
            value: function getQuery() {
                var result = {};
                for (var prop in this.query) {
                    var value = this.query[prop];
                    if (value !== null && typeof value.push !== 'undefined') {
                        value = value.join(',');
                    }
                    result[prop] = value;
                }
                return result;
            }

            // -----------------------------------------------------------


        }, {
            key: "parameter",
            value: function parameter(name, value) {
                this.setParameter(name, value);
                return this;
            }
        }, {
            key: "setParameter",
            value: function setParameter(name, value) {
                if (value === null || value === undefined) delete this.query[name];else this.query[name] = value;
            }
        }, {
            key: "getParameter",
            value: function getParameter(key) {
                return this.getParameter(key);
            }
        }, {
            key: "applyParameters",
            value: function applyParameters(obj) {
                for (var p in obj) {
                    if (obj.hasOwnProperty(p)) {
                        this.setParameter(p, obj[p]);
                    }
                }
            }

            // -----------------------------------------------------------


        }, {
            key: "q",
            value: function q(text) {
                this.setQ(text);
                return this;
            }

            /**
             * @param {string} text - free text query
             */

        }, {
            key: "setQ",
            value: function setQ(text) {
                this.setParameter(QueryParameters.QUERY, text);
            }
        }, {
            key: "getQ",
            value: function getQ() {
                return this.getParameter(QueryParameters.QUERY);
            }

            // -----------------------------------------------------------


        }, {
            key: "keywords",
            value: function keywords(text) {
                this.setQ(text);
                return this;
            }

            /**
             * @param {string} text - free text query
             */

        }, {
            key: "setKeywords",
            value: function setKeywords(text) {
                if (text && typeof text.push !== 'undefined') text = text.join(',');
                this.setParameter(QueryParameters.KEYWORDS, text);
            }
        }, {
            key: "getKeywords",
            value: function getKeywords() {
                return this.getParameter(QueryParameters.KEYWORDS);
            }

            // -----------------------------------------------------------


        }, {
            key: "uri",
            value: function uri(_uri) {
                this.setUri(_uri);
                return this;
            }
        }, {
            key: "setUri",
            value: function setUri(uri) {
                this.setParameter(QueryParameters.URI, uri);
            }
        }, {
            key: "getUri",
            value: function getUri() {
                return this.getParameter(QueryParameters.URI);
            }

            // -----------------------------------------------------------


        }, {
            key: "types",
            value: function types(_types) {
                this.setTypes(_types);
                return this;
            }

            /**
             * @param {array[string]} types - name of class(es) to request
             */

        }, {
            key: "setTypes",
            value: function setTypes(types) {
                if (types && types.push === 'undefined') types = [types];
                this.setParameter(QueryParameters.TYPES, types);
            }
        }, {
            key: "getTypes",
            value: function getTypes() {
                return this.getParameter(QueryParameters.TYPES);
            }

            // -----------------------------------------------------------


        }, {
            key: "createdBy",
            value: function createdBy(user) {
                this.setCreatedBy(user);
                return this;
            }

            /**
             * @param {string} user - username
             * @param {boolean} fireUpdate -
             */

        }, {
            key: "setCreatedBy",
            value: function setCreatedBy(user) {
                this.setParameter(QueryParameters.CREATED_BY, user);
            }
        }, {
            key: "getCreatedBy",
            value: function getCreatedBy() {
                return this.getParameter(QueryParameters.CREATED_BY);
            }

            // -----------------------------------------------------------


            /**
             * Specify a Theme or set of Themes to constrain results. By
             * default, values are assumed to be theme identifiers. If using
             * theme labels or theme uris, specify the optional second parameter
             * to be either QueryParameters.THEMES_LABEL or QueryParameters.THEMES_URI
             * respectively.
             * @param {array[string]} themes - string or array of strings containing theme constraint
             * @param {string} parameter - optional, to indicate the parameter to use
             * @return {Query}
             */

        }, {
            key: "themes",
            value: function themes(_themes, parameter) {
                this.setThemes(_themes, parameter);
                return this;
            }

            /**
             * Specify a Theme or set of Themes to constrain results. By
             * default, values are assumed to be theme identifiers. If using
             * theme labels or theme uris, specify the optional second parameter
             * to be either QueryParameters.THEMES_LABEL or QueryParameters.THEMES_URI
             * respectively.
             * @param {array[string]} themes - theme or themes to constrain by
             */

        }, {
            key: "setThemes",
            value: function setThemes(themes, parameter) {
                if (themes && themes.push === 'undefined') themes = [themes];

                //clear existing
                this.setParameter(QueryParameters.THEMES_ID, null);
                this.setParameter(QueryParameters.THEMES_LABEL, null);
                this.setParameter(QueryParameters.THEMES_URI, null);

                var param = parameter || QueryParameters.THEMES_ID;
                this.setParameter(param, themes);
            }
        }, {
            key: "getThemes",
            value: function getThemes() {
                return this.getParameter(QueryParameters.THEMES_ID) || this.getParameter(QueryParameters.THEMES_LABEL) || this.getParameter(QueryParameters.THEMES_URI);
            }

            // -----------------------------------------------------------


            /**
             * Specify a Publisher or set of Publishers to constrain results. By
             * default, values are assumed to be theme identifiers. If using
             * theme labels or theme uris, specify the optional second parameter
             * to be either QueryParameters.PUBLISHERS_LABEL or QueryParameters.PUBLISHERS_URI
             * respectively.
             * @param {string} parameter - optional, to indicate the parameter to use
             * @return {Query}
             */

        }, {
            key: "publishers",
            value: function publishers(_publishers, parameter) {
                this.setPublishers(_publishers, parameter);
                return this;
            }

            /**
             * Specify a Publisher or set of Publishers to constrain results. By
             * default, values are assumed to be theme identifiers. If using
             * theme labels or theme uris, specify the optional second parameter
             * to be either QueryParameters.PUBLISHERS_LABEL or QueryParameters.PUBLISHERS_URI
             * respectively.
             * @param {array[string]} publishers - publishing orgs to constrain by
             */

        }, {
            key: "setPublishers",
            value: function setPublishers(publishers, parameter) {
                if (publishers && publishers.push === 'undefined') publishers = [publishers];

                //clear existing
                this.setParameter(QueryParameters.PUBLISHERS_ID, null);
                this.setParameter(QueryParameters.PUBLISHERS_LABEL, null);
                this.setParameter(QueryParameters.PUBLISHERS_URI, null);

                var param = parameter || QueryParameters.PUBLISHERS_ID;
                this.setParameter(param, publishers);
            }
        }, {
            key: "getPublishers",
            value: function getPublishers() {
                return this.getParameter(QueryParameters.PUBLISHERS_ID) || this.getParameter(QueryParameters.PUBLISHERS_LABEL) || this.getParameter(QueryParameters.PUBLISHERS_URI);
            }

            // -----------------------------------------------------------


            /**
             * Specify the identifier of an Agent (Community, Group, etc) that
             * uses items you wish to find in search results. By
             * default, values are assumed to be theme identifiers. If using
             * theme labels or theme uris, specify the optional second parameter
             * to be either QueryParameters.USED_BY_LABEL or QueryParameters.USED_BY_URI
             * respectively.
             * @param {string} parameter - optional, to indicate the parameter to use
             * @return {Query}
             */

        }, {
            key: "usedBy",
            value: function usedBy(ids, parameter) {
                this.setUsedBy(ids, parameter);
                return this;
            }

            /**
             * Specify the identifier of an Agent (Community, Group, etc) that
             * uses items you wish to find in search results. By
             * default, values are assumed to be theme identifiers. If using
             * theme labels or theme uris, specify the optional second parameter
             * to be either QueryParameters.USED_BY_LABEL or QueryParameters.USED_BY_URI
             * respectively.
             * @param {array[string]} ids - publishing orgs to constrain by
             */

        }, {
            key: "setUsedBy",
            value: function setUsedBy(ids, parameter) {
                if (ids && ids.push === 'undefined') ids = [ids];

                //clear existing
                this.setParameter(QueryParameters.USED_BY_ID, null);
                this.setParameter(QueryParameters.USED_BY_LABEL, null);
                this.setParameter(QueryParameters.USED_BY_URI, null);

                var param = parameter || QueryParameters.USED_BY_ID;
                this.setParameter(param, ids);
            }
        }, {
            key: "getUsedBy",
            value: function getUsedBy() {
                return this.getParameter(QueryParameters.USED_BY_ID) || this.getParameter(QueryParameters.USED_BY_LABEL) || this.getParameter(QueryParameters.USED_BY_URI);
            }

            // -----------------------------------------------------------


            /**
             * Specify a Concept Scheme or set of Concept Schemes to constrain results. By
             * default, values are assumed to be theme identifiers. If using
             * theme labels or theme uris, specify the optional second parameter
             * to be either QueryParameters.SCHEMES_LABEL or QueryParameters.SCHEMES_URI
             * respectively.
             * @param {array[string]} schemes - schemes to constrain by
             * @param {string} parameter - optional, to indicate the parameter to use
             * @return {Query}
             */

        }, {
            key: "schemes",
            value: function schemes(_schemes, parameter) {
                this.setSchemes(_schemes, parameter);
                return this;
            }

            /**
             * Specify a Concept Scheme or set of Concept Schemes to constrain results. By
             * default, values are assumed to be theme identifiers. If using
             * theme labels or theme uris, specify the optional second parameter
             * to be either QueryParameters.SCHEMES_LABEL or QueryParameters.SCHEMES_URI
             * respectively.
             * @param {array[string]} schemes - schemes to constrain by
             * @param {string} parameter - optional, to indicate the parameter to use
             */

        }, {
            key: "setSchemes",
            value: function setSchemes(schemes, parameter) {
                if (schemes && schemes.push === 'undefined') schemes = [schemes];

                //clear existing
                this.setParameter(QueryParameters.SCHEMES_ID, null);
                this.setParameter(QueryParameters.SCHEMES_LABEL, null);
                this.setParameter(QueryParameters.SCHEMES_URI, null);

                var param = parameter || QueryParameters.SCHEMES_ID;
                this.setParameter(param, schemes);
            }
        }, {
            key: "getSchemes",
            value: function getSchemes() {
                return this.getParameter(QueryParameters.SCHEMES) || this.getParameter(QueryParameters.SCHEMES_LABEL) || this.getParameter(QueryParameters.SCHEMES_URI);
            }

            // -----------------------------------------------------------

            /**
             *
             */

        }, {
            key: "serviceTypes",
            value: function serviceTypes(types) {
                this.setServiceTypes(types);
                return this;
            }

            /**
             * @param {array[string]} types - ids
             */

        }, {
            key: "setServiceTypes",
            value: function setServiceTypes(types) {
                if (types && types.push === 'undefined') types = [types];
                this.setParameter(QueryParameters.SERVICE_TYPES, types);
            }
        }, {
            key: "getServiceTypes",
            value: function getServiceTypes() {
                return this.getParameter(QueryParameters.SERVICE_TYPES);
            }

            // -----------------------------------------------------------


        }, {
            key: "visibility",
            value: function visibility(vis) {
                this.setVisibility(vis);
                return this;
            }

            /**
             * @param {string} visibility - one of 'public' or 'private'
             * @param {boolean} fireUpdate
             */

        }, {
            key: "setVisibility",
            value: function setVisibility(visibility) {
                this.setParameter(QueryParameters.VISIBILITY, visibility);
            }
        }, {
            key: "getVisibility",
            value: function getVisibility() {
                this.getParameter(QueryParameters.VISIBILITY);
            }

            // -----------------------------------------------------------


        }, {
            key: "modified",
            value: function modified(date, beforeOrAfter) {
                this.setModified(date, beforeOrAfter);
                return this;
            }

            /**
             * @param {Date} date - date to compare against
             * @param {boolean} beforeOrAfter - flag specifying which boundary condition (true = before, false = after)
             * @param {boolean} fireUpdate - flag specifying whether to trigger update automatically
             */

        }, {
            key: "setModified",
            value: function setModified(date, beforeOrAfter) {

                //if no date was supplied, consider it "unset" for both properties
                if (!date) {
                    this.setParameter(QueryParameters.MODIFIED_BEFORE, null);
                    this.setParameter(QueryParameters.MODIFIED_AFTER, null);
                    return;
                }

                var dir = beforeOrAfter && (beforeOrAfter === true || beforeOrAfter === "true");
                var prop = dir ? QueryParameters.MODIFIED_BEFORE : QueryParameters.MODIFIED_AFTER; //property being set
                var oppProp = dir ? QueryParameters.MODIFIED_AFTER : QueryParameters.MODIFIED_BEFORE; //unset opposite property
                var arg = date && date.getTime ? date.getTime() : date;

                this.setParameter(oppProp, null);
                this.setParameter(prop, arg);
            }
        }, {
            key: "getModified",
            value: function getModified() {
                return this.getParameter(QueryParameters.MODIFIED_BEFORE) || this.getParameter(QueryParameters.MODIFIED_AFTER);
            }

            // -----------------------------------------------------------


        }, {
            key: "extent",
            value: function extent(bbox) {
                this.setExtent(bbox);
                return this;
            }

            /**
             * @param {string} bboxStr - form of "minx,miny,maxx,maxy"
             */

        }, {
            key: "setExtent",
            value: function setExtent(bbox) {
                if (bbox && typeof bbox.toBboxString !== 'undefined') bbox = bbox.toBboxString();
                this.setParameter(QueryParameters.EXTENT, bbox);
            }

            /**
             * @return {string} bbox string or null if not set
             */

        }, {
            key: "getExtent",
            value: function getExtent() {
                return this.getParameter(QueryParameters.EXTENT);
            }

            // -----------------------------------------------------------


        }, {
            key: "begins",
            value: function begins(date) {
                this.setBeginDate(date);
                return this;
            }
        }, {
            key: "setBeginDate",
            value: function setBeginDate(date) {
                if (date && date instanceof Date) date = date.getTime();
                this.setParameter(QueryParameters.BEGINS, date);
            }
        }, {
            key: "getBeginDate",
            value: function getBeginDate() {
                var date = this.getParameter(this.parameter.BEGINS);
                if (date) date = new Date(date);
                return date;
            }

            // -----------------------------------------------------------


        }, {
            key: "ends",
            value: function ends(date) {
                this.setEndDate(date);
                return this;
            }
        }, {
            key: "setEndDate",
            value: function setEndDate(date) {
                if (date && date instanceof Date) date = date.getTime();
                this.setParameter(QueryParameters.ENDS, date);
            }
        }, {
            key: "getEndDate",
            value: function getEndDate() {
                var date = this.getParameter(this.parameter.ENDS);
                if (date) date = new Date(date);
                return date;
            }

            // -----------------------------------------------------------


        }, {
            key: "between",
            value: function between(begin, end) {
                this.setBetween(begin, end);
                return this;
            }
        }, {
            key: "setBetween",
            value: function setBetween(begin, end) {
                this.begins(begin);
                this.ends(end);
            }

            // -----------------------------------------------------------


        }, {
            key: "resourceTypes",
            value: function resourceTypes(types) {
                this.setResourceTypes(types);
                return this;
            }
        }, {
            key: "setResourceTypes",
            value: function setResourceTypes(types) {
                if (types && types.push === 'undefined') types = [types];
                this.setParameter(QueryParameters.RESOURCE_TYPE, types);
            }
        }, {
            key: "getResourceTypes",
            value: function getResourceTypes() {
                return this.getParameter(QueryParameters.RESOURCE_TYPE);
            }

            // -----------------------------------------------------------


        }, {
            key: "facets",
            value: function facets(names) {
                this.setFacets(names);
                return this;
            }

            /*
             * @param {array[string]} names - names of facets
             */

        }, {
            key: "setFacets",
            value: function setFacets(names) {
                this.query.includeFacets = names;
            }
        }, {
            key: "getFacets",
            value: function getFacets() {
                return this.query.includeFacets;
            }

            /**
             * @param {string} name - name of facet to add
             */

        }, {
            key: "addFacet",
            value: function addFacet(name) {
                var facets = (this.getFacets() || []).push(name);
                this.setFacets(facets);
            }

            /**
             * @param {string} name - name of facet to remove
             */

        }, {
            key: "removeFacet",
            value: function removeFacet(name) {
                var facets = this.getFacets() || [];
                var idx = facets.indexOf(name);
                if (idx >= 0) {
                    facets.splice(idx, 1);
                    this.setFacets(facets);
                }
            }

            // -----------------------------------------------------------


        }, {
            key: "fields",
            value: function fields(_fields) {
                this.setFields(_fields);
                return this;
            }

            /**
             * @param {array[string]} fields - list of field names to request for each search result
             */

        }, {
            key: "setFields",
            value: function setFields(fields) {
                if (fields && typeof fields.push === 'undefined') fields = [fields];
                this.query.fields = fields;
            }
        }, {
            key: "getFields",
            value: function getFields() {
                return this.query.fields;
            }

            // // -----------------------------------------------------------
            //
            //
            // /**
            //  * @param {int} start - beginning index of results to request
            //  */
            // start (start) {
            //     this.setStart(start);
            //     return this;
            // }
            //
            // setStart(start) {
            //     if(isNaN(start)) return;
            //     this.query.start = start*1;
            // }
            //
            // getStart() {
            //     return this.query.start;
            // }


            // -----------------------------------------------------------


            /**
             * @param {int} page - page of results to fetch
             */

        }, {
            key: "page",
            value: function page(_page) {
                this.setPage(_page);
                return this;
            }
        }, {
            key: "setPage",
            value: function setPage(page) {
                if (isNaN(page) || page * 1 < 0) return;
                this.query.page = page * 1;
            }
        }, {
            key: "getPage",
            value: function getPage() {
                return this.query.page;
            }
        }, {
            key: "nextPage",
            value: function nextPage() {
                this.setPage(this.query.page + 1);
            }
        }, {
            key: "previousPage",
            value: function previousPage() {
                this.setPage(this.query.page - 1);
            }

            // -----------------------------------------------------------


            /**
             * @param {int} size - page size to request
             */

        }, {
            key: "pageSize",
            value: function pageSize(size) {
                this.setPageSize(size);
                return this;
            }
        }, {
            key: "setPageSize",
            value: function setPageSize(size) {
                if (isNaN(size) || size * 1 < 0) return;
                this.query.size = size * 1;
            }
        }, {
            key: "getPageSize",
            value: function getPageSize() {
                return this.query.size;
            }

            // -----------------------------------------------------------


            /**
             * @param {string} sort - form of <field>,<dir> or just field name
             * @param {string} order - optional, either 'asc' or 'desc'
             */

        }, {
            key: "sort",
            value: function sort(_sort, order) {
                this.setSort(_sort, order);
                return this;
            }

            /**
             * @param {string} sort - form of <field>,<dir> or just field name
             * @param {string} order - optional, either 'asc' or 'desc'
             */

        }, {
            key: "setSort",
            value: function setSort(sort, order) {
                order = order && (order !== 'asc' || order !== 'desc') ? 'desc' : order;
                if (sort && sort.indexOf(',') < 0) sort = sort + ',' + order;
                this.query.sort = sort;
            }
        }, {
            key: "getSort",
            value: function getSort() {
                return this.query.sort;
            }
        }, {
            key: "getSortField",
            value: function getSortField() {
                return this.query.sort.split(',')[0];
            }
        }, {
            key: "getSortOrder",
            value: function getSortOrder() {
                return this.query.sort.split(',')[1] === 'asc';
            }

            /**
             * @return {array} list of key-value pairs of sort options
             */

        }, {
            key: "getSortOptions",
            value: function getSortOptions() {
                return SORT_OPTIONS_DEFAULT.slice(0);
            }

            // -----------------------------------------------------------


            /**
             *
             */

        }, {
            key: "clear",
            value: function clear() {
                this.query = this.defaultQuery;
            }
        }]);

        return Query;
    }();

    return Query;
});

(function (root, factory) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.QueryFactory = factory(require('./query'));
    } else if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define('QueryFactory', ["./query"], function (Query) {
            return root.QueryFactory = factory(Query);
        });
    } else {
        GeoPlatform.QueryFactory = factory(GeoPlatform.Query);
    }
})(undefined || window, function (Query) {

    return function () {
        return new Query();
    };
});

(function (root, factory) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.KGClassifiers = factory();
    } else if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define('KGClassifiers', function () {
            return root.KGClassifiers = factory();
        });
    } else {
        GeoPlatform.KGClassifiers = factory();
    }
})(undefined || window, function () {

    var classifiers = {
        PURPOSE: 'purposes',
        FUNCTION: 'functions',
        TOPIC_PRIMARY: 'primaryTopics',
        TOPIC_SECONDARY: 'secondaryTopics',
        SUBJECT_PRIMARY: 'primarySubjects',
        SUBJECT_SECONDARY: 'secondarySubjects',
        COMMUNITY: 'communities',
        AUDIENCE: 'audiences',
        PLACE: 'places',
        CATEGORY: 'categories'
    };

    return classifiers;
});

(function (root, factory) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.KGQuery = factory(require('./parameters'));
    } else if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define('KGQuery', ['./parameters'], function (QueryParameters) {
            return root.KGQuery = factory(QueryParameters);
        });
    } else {
        GeoPlatform.KGQuery = factory(GeoPlatform.QueryParameters);
    }
})(undefined || window, function (QueryParameters) {

    var SORT_OPTIONS_DEFAULT = [{ value: "label,asc", label: "Name (A-Z)" }, { value: "label,desc", label: "Name (Z-A)" }, { value: "type,asc", label: "Type (A-Z)" }, { value: "type,desc", label: "Type (Z-A)" }, { value: "modified,desc", label: "Most recently modified" }, { value: "modified,asc", label: "Least recently modified" }, { value: "_score,desc", label: "Relevance" }];

    var KGQuery = function () {
        function KGQuery() {
            _classCallCheck(this, KGQuery);

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

        _createClass(KGQuery, [{
            key: "getQuery",
            value: function getQuery() {
                var result = {};
                for (var prop in this.query) {
                    var value = this.query[prop];
                    if (value !== null && typeof value.push !== 'undefined') {
                        value = value.join(',');
                    }
                    result[prop] = value;
                }
                return result;
            }

            // -----------------------------------------------------------


        }, {
            key: "parameter",
            value: function parameter(name, value) {
                this.setParameter(name, value);
                return this;
            }
        }, {
            key: "setParameter",
            value: function setParameter(name, value) {
                if (value === null || value === undefined) delete this.query[name];else this.query[name] = value;
            }
        }, {
            key: "getParameter",
            value: function getParameter(key) {
                return this.getParameter(key);
            }
        }, {
            key: "applyParameters",
            value: function applyParameters(obj) {
                for (var p in obj) {
                    if (obj.hasOwnProperty(p)) {
                        this.setParameter(p, obj[p]);
                    }
                }
            }

            // -----------------------------------------------------------


        }, {
            key: "q",
            value: function q(text) {
                this.setQ(text);
                return this;
            }

            /**
             * @param {string} text - free text query
             */

        }, {
            key: "setQ",
            value: function setQ(text) {
                this.setParameter(QueryParameters.QUERY, text);
            }
        }, {
            key: "getQ",
            value: function getQ() {
                return this.getParameter(QueryParameters.QUERY);
            }

            // -----------------------------------------------------------


            /**
             * @param {array[string]} types - KG classifiers for which concepts should be returned
             */

        }, {
            key: "classifiers",
            value: function classifiers(types) {
                this.setClassifiers(types);
                return this;
            }

            /**
             * @param {array[string]} types - KG classifiers for which concepts should be returned
             */

        }, {
            key: "setClassifiers",
            value: function setClassifiers(types) {
                if (types && types.push === 'undefined') types = [types];
                this.setParameter(QueryParameters.TYPES, types);
            }

            /**
             * @return {array[string]} KG classifiers for which concepts should be returned
             */

        }, {
            key: "getClassifiers",
            value: function getClassifiers() {
                return this.getParameter(QueryParameters.TYPES);
            }

            // -----------------------------------------------------------


            /**
             * Specify the Item object model type name(s) for which
             * recommended concepts should be returned. Note: this
             * query parameter is not the same as the GeoPlatform.Query.types()
             * query parameter (they map to different HTTP request parameters).
             * @param {array[string]} objTypes - Item object type names
             */

        }, {
            key: "types",
            value: function types(objTypes) {
                this.setTypes(objTypes);
                return this;
            }

            /**
             * Specify the Item object model type name(s) for which
             * recommended concepts should be returned. Note: this
             * query parameter is not the same as the GeoPlatform.Query.setTypes()
             * query parameter (they map to different HTTP request parameters).
             * @param {array[string]} objTypes - Item object type names
             */

        }, {
            key: "setTypes",
            value: function setTypes(objTypes) {
                if (objTypes && objTypes.push === 'undefined') objTypes = [objTypes];
                this.setParameter(QueryParameters.FOR_TYPES, objTypes);
            }

            /**
             * Get the Item object model type name(s) for which
             * recommended concepts should be returned. Note: this
             * query parameter is not the same as the GeoPlatform.Query.getTypes()
             * query parameter (they map to different HTTP request parameters).
             * @return {array[string]} Item object type names
             */

        }, {
            key: "getTypes",
            value: function getTypes() {
                return this.getParameter(QueryParameters.FOR_TYPES);
            }

            // -----------------------------------------------------------


            /**
             * @param {int} page - page of results to fetch
             */

        }, {
            key: "page",
            value: function page(_page2) {
                this.setPage(_page2);
                return this;
            }
        }, {
            key: "setPage",
            value: function setPage(page) {
                if (isNaN(page) || page * 1 < 0) return;
                this.query.page = page * 1;
            }
        }, {
            key: "getPage",
            value: function getPage() {
                return this.query.page;
            }
        }, {
            key: "nextPage",
            value: function nextPage() {
                this.setPage(this.query.page + 1);
            }
        }, {
            key: "previousPage",
            value: function previousPage() {
                this.setPage(this.query.page - 1);
            }

            // -----------------------------------------------------------


            /**
             * @param {int} size - page size to request
             */

        }, {
            key: "pageSize",
            value: function pageSize(size) {
                this.setPageSize(size);
                return this;
            }
        }, {
            key: "setPageSize",
            value: function setPageSize(size) {
                if (isNaN(size) || size * 1 < 0) return;
                this.query.size = size * 1;
            }
        }, {
            key: "getPageSize",
            value: function getPageSize() {
                return this.query.size;
            }

            // -----------------------------------------------------------


            /**
             * @param {string} sort - form of <field>,<dir> or just field name
             * @param {string} order - optional, either 'asc' or 'desc'
             */

        }, {
            key: "sort",
            value: function sort(_sort2, order) {
                this.setSort(_sort2, order);
                return this;
            }

            /**
             * @param {string} sort - form of <field>,<dir> or just field name
             * @param {string} order - optional, either 'asc' or 'desc'
             */

        }, {
            key: "setSort",
            value: function setSort(sort, order) {
                order = order && (order !== 'asc' || order !== 'desc') ? 'desc' : order;
                if (sort && sort.indexOf(',') < 0) sort = sort + ',' + order;
                this.query.sort = sort;
            }
        }, {
            key: "getSort",
            value: function getSort() {
                return this.query.sort;
            }
        }, {
            key: "getSortField",
            value: function getSortField() {
                return this.query.sort.split(',')[0];
            }
        }, {
            key: "getSortOrder",
            value: function getSortOrder() {
                return this.query.sort.split(',')[1] === 'asc';
            }

            /**
             * @return {array} list of key-value pairs of sort options
             */

        }, {
            key: "getSortOptions",
            value: function getSortOptions() {
                return SORT_OPTIONS_DEFAULT.slice(0);
            }

            // -----------------------------------------------------------


            /**
             *
             */

        }, {
            key: "clear",
            value: function clear() {
                this.query = this.defaultQuery;
            }
        }]);

        return KGQuery;
    }();

    return KGQuery;
});

(function (root, factory) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.ItemModel = factory(require('./base'), require('./properties'));
    } else if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define('ItemModel', ['./base', './properties'], function (BaseModel, ItemProperties) {
            return root.ItemModel = factory(BaseModel, ItemProperties);
        });
    } else {
        GeoPlatform.ItemModel = factory(GeoPlatform.BaseModel, GeoPlatform.ItemProperties);
    }
})(undefined || window, function (BaseModel, ItemProperties) {

    /**
     * Item
     * base class for GeoPlatform objects
     */
    var ItemModel = function (_BaseModel) {
        _inherits(ItemModel, _BaseModel);

        function ItemModel(data) {
            _classCallCheck(this, ItemModel);

            var _this = _possibleConstructorReturn(this, (ItemModel.__proto__ || Object.getPrototypeOf(ItemModel)).call(this));

            if (data) {

                // console.log(' ');
                // console.log('-------------------------------');
                // console.log('Item() - initializing using ' + JSON.stringify(data));

                for (var p in ItemProperties) {
                    var property = ItemProperties[p];
                    var key = property.key;
                    var value = data[key];
                    if (value !== null && value !== undefined) {
                        _this.set(property, value);
                    }
                }
                // console.log('-------------------------------');
                // console.log(' ');
            }

            _this.default(ItemProperties.KEYWORDS, []);
            _this.default(ItemProperties.IDENTIFIERS, []);
            _this.default(ItemProperties.ALTERNATE_TITLES, []);
            _this.default(ItemProperties.THEMES, []);
            _this.default(ItemProperties.CONTACTS, []);
            _this.default(ItemProperties.PUBLISHERS, []);
            _this.default(ItemProperties.CONTRIBUTORS, []);
            _this.default(ItemProperties.RESOURCE_TYPES, []);
            return _this;
        }

        _createClass(ItemModel, [{
            key: "getId",
            value: function getId() {
                return this.get(ItemProperties.ID);
            }
        }, {
            key: "getType",
            value: function getType() {
                return this.get(ItemProperties.TYPE);
            }
        }, {
            key: "getCreated",
            value: function getCreated() {
                return this.get(ItemProperties.CREATED);
            }
        }, {
            key: "getModified",
            value: function getModified() {
                return this.get(ItemProperties.MODIFIED);
            }
        }, {
            key: "getLastModifiedBy",
            value: function getLastModifiedBy() {
                return this.get(ItemProperties.LAST_MODIFIED_BY);
            }

            //-----------------------------------------------------------

        }, {
            key: "uri",
            value: function uri(value) {
                this.setUri(value);return this;
            }
        }, {
            key: "getUri",
            value: function getUri() {
                return this.get(ItemProperties.URI);
            }
        }, {
            key: "setUri",
            value: function setUri(value) {
                this.set(ItemProperties.URI, value);
            }

            //-----------------------------------------------------------

        }, {
            key: "identifiers",
            value: function identifiers(value) {
                this.setIdentifiers(value);return this;
            }
        }, {
            key: "getIdentifiers",
            value: function getIdentifiers() {
                return this.get(ItemProperties.IDENTIFIERS);
            }
        }, {
            key: "setIdentifiers",
            value: function setIdentifiers(value) {
                this.set(ItemProperties.IDENTIFIERS, value);
            }
        }, {
            key: "addIdentifier",
            value: function addIdentifier(value) {
                this.addTo(ItemProperties.IDENTIFIERS, value);
            }
        }, {
            key: "removeIdentifier",
            value: function removeIdentifier(value) {
                this.removeFrom(ItemProperties.IDENTIFIERS, value);
            }

            //-----------------------------------------------------------

        }, {
            key: "alternateTitles",
            value: function alternateTitles(value) {
                this.setAlternateTitles(value);return this;
            }
        }, {
            key: "getAlternateTitles",
            value: function getAlternateTitles() {
                return this.get(ItemProperties.ALTERNATE_TITLES);
            }
        }, {
            key: "setAlternateTitles",
            value: function setAlternateTitles(value) {
                this.set(ItemProperties.ALTERNATE_TITLES, value);
            }
        }, {
            key: "addAlternateTitle",
            value: function addAlternateTitle(value) {
                this.addTo(ItemProperties.ALTERNATE_TITLES, value);
            }
        }, {
            key: "removeAlternateTitle",
            value: function removeAlternateTitle(value) {
                this.removeFrom(ItemProperties.ALTERNATE_TITLES, value);
            }

            //-----------------------------------------------------------

        }, {
            key: "createdBy",
            value: function createdBy(value) {
                this.setCreatedBy(value);return this;
            }
        }, {
            key: "getCreatedBy",
            value: function getCreatedBy() {
                return this.get(ItemProperties.CREATED_BY);
            }
        }, {
            key: "setCreatedBy",
            value: function setCreatedBy(value) {
                this.set(ItemProperties.CREATED_BY, value);
            }

            //-----------------------------------------------------------

        }, {
            key: "label",
            value: function label(value) {
                this.setLabel(value);return this;
            }
        }, {
            key: "getLabel",
            value: function getLabel() {
                return this.get(ItemProperties.LABEL);
            }
        }, {
            key: "setLabel",
            value: function setLabel(value) {
                this.set(ItemProperties.LABEL, value);
            }

            //-----------------------------------------------------------

        }, {
            key: "description",
            value: function description(value) {
                this.setDescription(value);return this;
            }
        }, {
            key: "getDescription",
            value: function getDescription() {
                return this.get(ItemProperties.DESCRIPTION);
            }
        }, {
            key: "setDescription",
            value: function setDescription(value) {
                this.set(ItemProperties.DESCRIPTION, value);
            }

            //-----------------------------------------------------------

        }, {
            key: "keywords",
            value: function keywords(value) {
                this.setKeywords(value);return this;
            }
        }, {
            key: "getKeywords",
            value: function getKeywords() {
                return this.get(ItemProperties.KEYWORDS);
            }
        }, {
            key: "setKeywords",
            value: function setKeywords(value) {
                this.set(ItemProperties.KEYWORDS, value);
            }

            //-----------------------------------------------------------

        }, {
            key: "landingPage",
            value: function landingPage(value) {
                this.setLandingPage(value);return this;
            }
        }, {
            key: "getLandingPage",
            value: function getLandingPage() {
                return this.get(ItemProperties.LANDING_PAGE);
            }
        }, {
            key: "setLandingPage",
            value: function setLandingPage(value) {
                this.set(ItemProperties.LANDING_PAGE, value);
            }

            //-----------------------------------------------------------

        }, {
            key: "status",
            value: function status(value) {
                this.setStatus(value);return this;
            }
        }, {
            key: "getStatus",
            value: function getStatus() {
                return this.get(ItemProperties.STATUS);
            }
        }, {
            key: "setStatus",
            value: function setStatus(value) {
                this.set(ItemProperties.STATUS, value);
            }

            //-----------------------------------------------------------

        }, {
            key: "visibility",
            value: function visibility(value) {
                this.setVisibility(value);return this;
            }
        }, {
            key: "getVisibility",
            value: function getVisibility() {
                return this.get(ItemProperties.VISIBILITY);
            }
        }, {
            key: "setVisibility",
            value: function setVisibility(value) {
                this.set(ItemProperties.VISIBILITY, value === true);
            }

            //-----------------------------------------------------------

        }, {
            key: "themes",
            value: function themes(value) {
                this.setThemes(value);return this;
            }
        }, {
            key: "getThemes",
            value: function getThemes() {
                return this.get(ItemProperties.THEMES);
            }
        }, {
            key: "setThemes",
            value: function setThemes(value) {
                this.set(ItemProperties.THEMES, value);
            }
        }, {
            key: "addTheme",
            value: function addTheme(value) {
                this.addTo(ItemProperties.THEMES, value);
            }
        }, {
            key: "removeTheme",
            value: function removeTheme(value) {
                this.removeFrom(ItemProperties.THEMES, value);
            }

            //-----------------------------------------------------------

        }, {
            key: "publishers",
            value: function publishers(value) {
                this.setPublishers(value);return this;
            }
        }, {
            key: "getPublishers",
            value: function getPublishers() {
                return this.get(ItemProperties.PUBLISHERS);
            }
        }, {
            key: "setPublishers",
            value: function setPublishers(value) {
                this.set(ItemProperties.PUBLISHERS, value);
            }
        }, {
            key: "addPublisher",
            value: function addPublisher(value) {
                this.addTo(ItemProperties.PUBLISHERS, value);
            }
        }, {
            key: "removePublisher",
            value: function removePublisher(value) {
                this.removeFrom(ItemProperties.PUBLISHERS, value);
            }

            //-----------------------------------------------------------

        }, {
            key: "contacts",
            value: function contacts(value) {
                this.setContacts(value);return this;
            }
        }, {
            key: "getContacts",
            value: function getContacts() {
                return this.get(ItemProperties.CONTACTS);
            }
        }, {
            key: "setContacts",
            value: function setContacts(value) {
                this.set(ItemProperties.CONTACTS, value);
            }
        }, {
            key: "addContact",
            value: function addContact(value) {
                this.addTo(ItemProperties.CONTACTS, value);
            }
        }, {
            key: "removeContact",
            value: function removeContact(value) {
                this.removeFrom(ItemProperties.CONTACTS, value);
            }

            //-----------------------------------------------------------

        }, {
            key: "contributors",
            value: function contributors(value) {
                this.setContributors(value);return this;
            }
        }, {
            key: "getContributors",
            value: function getContributors() {
                return this.get(ItemProperties.CONTRIBUTORS);
            }
        }, {
            key: "setContributors",
            value: function setContributors(value) {
                this.set(ItemProperties.CONTRIBUTORS, value);
            }
        }, {
            key: "addContributor",
            value: function addContributor(value) {
                this.addTo(ItemProperties.CONTRIBUTORS, value);
            }
        }, {
            key: "removeContributor",
            value: function removeContributor(value) {
                this.removeFrom(ItemProperties.CONTRIBUTORS, value);
            }

            //-----------------------------------------------------------

        }, {
            key: "resourceTypes",
            value: function resourceTypes(value) {
                this.setResourceTypes(value);return this;
            }
        }, {
            key: "getResourceTypes",
            value: function getResourceTypes() {
                return this.get(ItemProperties.RESOURCE_TYPES);
            }
        }, {
            key: "setResourceTypes",
            value: function setResourceTypes(value) {
                this.set(ItemProperties.RESOURCE_TYPES, value);
            }
        }, {
            key: "addResourceType",
            value: function addResourceType(value) {
                this.addTo(ItemProperties.RESOURCE_TYPES, value);
            }
        }, {
            key: "removeResourceType",
            value: function removeResourceType(value) {
                this.removeFrom(ItemProperties.RESOURCE_TYPES, value);
            }

            //-----------------------------------------------------------

        }, {
            key: "distributions",
            value: function distributions(value) {
                this.setDistributions(value);return this;
            }
        }, {
            key: "getDistributions",
            value: function getDistributions() {
                return this.get(ItemProperties.DISTRIBUTIONS);
            }
        }, {
            key: "setDistributions",
            value: function setDistributions(value) {
                this.set(ItemProperties.DISTRIBUTIONS, value);
            }
        }, {
            key: "addDistribution",
            value: function addDistribution(value) {
                this.addTo(ItemProperties.DISTRIBUTIONS, value);
            }
        }, {
            key: "removeDistribution",
            value: function removeDistribution(value) {
                this.removeFrom(ItemProperties.DISTRIBUTIONS, value);
            }

            //-----------------------------------------------------------

        }, {
            key: "classifiers",
            value: function classifiers(value) {
                this.setClassifiers(value);return this;
            }
        }, {
            key: "getClassifiers",
            value: function getClassifiers() {
                return this.get(ItemProperties.CLASSIFIERS);
            }
        }, {
            key: "setClassifiers",
            value: function setClassifiers(value) {
                if (!value || (typeof value === "undefined" ? "undefined" : _typeof(value)) !== 'object') {
                    this.set(ItemProperties.CLASSIFIERS, {});
                } else {
                    this.set(ItemProperties.CLASSIFIERS, value);
                }
            }

            //-----------------------------------------------------------

            /**
             * @return {boolean} true if the required fields are provided
             */

        }, {
            key: "isValid",
            value: function isValid() {
                return this.getType() && this.getLabel();
            }

            //-----------------------------------------------------------


        }, {
            key: "toJson",
            value: function toJson() {
                var result = {};
                for (var p in ItemProperties) {
                    var property = ItemProperties[p];
                    var value = this.get(property);
                    this.propertyToJson(property, value, result);
                }
                return result;
            }
        }]);

        return ItemModel;
    }(BaseModel);

    return ItemModel;
});

(function (root, factory) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.DatasetModel = factory(require('./item'), require('../shared/types'), require('./properties'));
    } else if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define('DatasetModel', ['./item', '../shared/types', './properties'], function (ItemModel, ItemTypes, ItemProperties) {
            return root.DatasetModel = factory(ItemModel, ItemTypes, ItemProperties);
        });
    } else {
        GeoPlatform.DatasetModel = factory(GeoPlatform.ItemModel, GeoPlatform.ItemTypes, GeoPlatform.ItemProperties);
    }
})(undefined || window, function (ItemModel, ItemTypes, ItemProperties) {
    var DatasetModel = function (_ItemModel) {
        _inherits(DatasetModel, _ItemModel);

        function DatasetModel(data) {
            _classCallCheck(this, DatasetModel);

            var _this2 = _possibleConstructorReturn(this, (DatasetModel.__proto__ || Object.getPrototypeOf(DatasetModel)).call(this, data));

            _this2.set(ItemProperties.TYPE, ItemTypes.DATASET);
            _this2.default(ItemProperties.SERVICES, []);
            return _this2;
        }

        //-----------------------------------------------------------

        _createClass(DatasetModel, [{
            key: "services",
            value: function services(value) {
                this.setServices(value);return this;
            }
        }, {
            key: "getServices",
            value: function getServices() {
                return this.get(ItemProperties.SERVICES);
            }
        }, {
            key: "setServices",
            value: function setServices(value) {
                this.set(ItemProperties.SERVICES, value);
            }
        }, {
            key: "addService",
            value: function addService(value) {
                this.addTo(ItemProperties.SERVICES, value);
            }
        }, {
            key: "removeService",
            value: function removeService(value) {
                this.removeFrom(ItemProperties.SERVICES, value);
            }

            //-----------------------------------------------------------


        }]);

        return DatasetModel;
    }(ItemModel);

    return DatasetModel;
});

(function (root, factory) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.ServiceModel = factory(require('./item'), require('../shared/types'), require('./properties'));
    } else if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define('ServiceModel', ['./item', '../shared/types', './properties'], function (ItemModel, ItemTypes, ItemProperties) {
            return root.ServiceModel = factory(ItemModel, ItemTypes, ItemProperties);
        });
    } else {
        GeoPlatform.ServiceModel = factory(GeoPlatform.ItemModel, GeoPlatform.ItemTypes, GeoPlatform.ItemProperties);
    }
})(undefined || window, function (ItemModel, ItemTypes, ItemProperties) {
    var ServiceModel = function (_ItemModel2) {
        _inherits(ServiceModel, _ItemModel2);

        function ServiceModel(data) {
            _classCallCheck(this, ServiceModel);

            var _this3 = _possibleConstructorReturn(this, (ServiceModel.__proto__ || Object.getPrototypeOf(ServiceModel)).call(this, data));

            _this3.set(ItemProperties.TYPE, ItemTypes.SERVICE);
            _this3.default(ItemProperties.DATASETS, []);
            return _this3;
        }

        //-----------------------------------------------------------

        _createClass(ServiceModel, [{
            key: "href",
            value: function href(value) {
                this.setHref(value);return this;
            }
        }, {
            key: "getHref",
            value: function getHref() {
                return this.get(ItemProperties.HREF);
            }
        }, {
            key: "setHref",
            value: function setHref(value) {
                this.set(ItemProperties.HREF, value);
            }

            //-----------------------------------------------------------

        }, {
            key: "serviceType",
            value: function serviceType(value) {
                this.setServiceType(value);return this;
            }
        }, {
            key: "getServiceType",
            value: function getServiceType() {
                return this.get(ItemProperties.SERVICE_TYPE);
            }
        }, {
            key: "setServiceType",
            value: function setServiceType(value) {
                this.set(ItemProperties.SERVICE_TYPE, value);
            }

            //-----------------------------------------------------------

        }, {
            key: "datasets",
            value: function datasets(value) {
                this.setDatasets(value);return this;
            }
        }, {
            key: "getDatasets",
            value: function getDatasets() {
                return this.get(ItemProperties.DATASETS);
            }
        }, {
            key: "setDatasets",
            value: function setDatasets(value) {
                this.set(ItemProperties.DATASETS, value);
            }
        }, {
            key: "addDataset",
            value: function addDataset(value) {
                this.addTo(ItemProperties.DATASETS, value);
            }
        }, {
            key: "removeDataset",
            value: function removeDataset(value) {
                this.removeFrom(ItemProperties.DATASETS, value);
            }

            //-----------------------------------------------------------


        }]);

        return ServiceModel;
    }(ItemModel);

    return ServiceModel;
});

(function (root, factory) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.LayerModel = factory(require('./item'), require('../shared/types'), require('./properties'));
    } else if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define('LayerModel', ['./item', '../shared/types', './properties'], function (ItemModel, ItemTypes, ItemProperties) {
            return root.LayerModel = factory(ItemModel, ItemTypes, ItemProperties);
        });
    } else {
        GeoPlatform.LayerModel = factory(GeoPlatform.ItemModel, GeoPlatform.ItemTypes, GeoPlatform.ItemProperties);
    }
})(undefined || window, function (ItemModel, ItemTypes, ItemProperties) {
    var LayerModel = function (_ItemModel3) {
        _inherits(LayerModel, _ItemModel3);

        function LayerModel(data) {
            _classCallCheck(this, LayerModel);

            var _this4 = _possibleConstructorReturn(this, (LayerModel.__proto__ || Object.getPrototypeOf(LayerModel)).call(this, data));

            _this4.set(ItemProperties.TYPE, ItemTypes.LAYER);
            _this4.default(ItemProperties.SERVICES, []);
            return _this4;
        }

        //-----------------------------------------------------------

        _createClass(LayerModel, [{
            key: "layerType",
            value: function layerType(value) {
                this.setLayerType(value);return this;
            }
        }, {
            key: "getLayerType",
            value: function getLayerType() {
                return this.get(ItemProperties.LAYER_TYPE);
            }
        }, {
            key: "setLayerType",
            value: function setLayerType(value) {
                this.set(ItemProperties.LAYER_TYPE, value);
            }

            //-----------------------------------------------------------

        }, {
            key: "layerName",
            value: function layerName(value) {
                this.setLayerName(value);return this;
            }
        }, {
            key: "getLayerName",
            value: function getLayerName() {
                return this.get(ItemProperties.LAYER_NAME);
            }
        }, {
            key: "setLayerName",
            value: function setLayerName(value) {
                this.set(ItemProperties.LAYER_NAME, value);
            }

            //-----------------------------------------------------------

        }, {
            key: "legend",
            value: function legend(value) {
                this.setLegend(value);return this;
            }
        }, {
            key: "getLegend",
            value: function getLegend() {
                return this.get(ItemProperties.LEGEND);
            }
        }, {
            key: "setLegend",
            value: function setLegend(value) {
                this.set(ItemProperties.LEGEND, value);
            }

            //-----------------------------------------------------------

        }, {
            key: "services",
            value: function services(value) {
                this.setServices(value);return this;
            }
        }, {
            key: "getServices",
            value: function getServices() {
                return this.get(ItemProperties.SERVICES);
            }
        }, {
            key: "setServices",
            value: function setServices(value) {
                this.set(ItemProperties.SERVICES, value);
            }
        }, {
            key: "addService",
            value: function addService(value) {
                this.addTo(ItemProperties.SERVICES, value);
            }
        }, {
            key: "removeService",
            value: function removeService(value) {
                this.removeFrom(ItemProperties.SERVICES, value);
            }

            //-----------------------------------------------------------

        }]);

        return LayerModel;
    }(ItemModel);

    return LayerModel;
});

(function (root, factory) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.MapModel = factory(require('./item'), require('../shared/types'), require('./properties'));
    } else if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define('MapModel', ['./item', '../shared/types', './properties'], function (ItemModel, ItemTypes, ItemProperties) {
            return root.MapModel = factory(ItemModel, ItemTypes, ItemProperties);
        });
    } else {
        GeoPlatform.MapModel = factory(GeoPlatform.ItemModel, GeoPlatform.ItemTypes, GeoPlatform.ItemProperties);
    }
})(undefined || window, function (ItemModel, ItemTypes, ItemProperties) {

    var LayerStateProperties = {
        LAYER_ID: { key: "layer_id" },
        LAYER: { key: "layer" },
        OPACITY: { key: "opacity" },
        VISIBILITY: { key: "visibility" }
    };

    var MapModel = function (_ItemModel4) {
        _inherits(MapModel, _ItemModel4);

        function MapModel(data) {
            _classCallCheck(this, MapModel);

            //manually re-set the overlays because each objectc
            // has a nested Item (layer) which needs to be item-ized
            // and the initializer used in the constructor isn't tied
            // to any specific instance's logic.
            var _this5 = _possibleConstructorReturn(this, (MapModel.__proto__ || Object.getPrototypeOf(MapModel)).call(this, data));

            var layers = _this5.getLayers();
            if (layers) {
                _this5.setLayers(layers);
            }

            _this5.set(ItemProperties.TYPE, ItemTypes.MAP);
            _this5.default(ItemProperties.MAP_LAYERS, []);
            return _this5;
        }

        //-----------------------------------------------------------

        _createClass(MapModel, [{
            key: "thumbnail",
            value: function thumbnail(value) {
                this.setThumbnail(value);return this;
            }
        }, {
            key: "getThumbnail",
            value: function getThumbnail() {
                return this.get(ItemProperties.THUMBNAIL);
            }
        }, {
            key: "setThumbnail",
            value: function setThumbnail(value) {
                this.set(ItemProperties.THUMBNAIL, value);
            }

            //-----------------------------------------------------------

        }, {
            key: "baseLayer",
            value: function baseLayer(value) {
                this.setBaseLayer(value);return this;
            }
        }, {
            key: "getBaseLayer",
            value: function getBaseLayer() {
                return this.get(ItemProperties.BASE_LAYER);
            }
        }, {
            key: "setBaseLayer",
            value: function setBaseLayer(value) {
                this.set(ItemProperties.BASE_LAYER, value);
            }

            //-----------------------------------------------------------

        }, {
            key: "layers",
            value: function layers(value) {
                this.setLayers(value);return this;
            }
        }, {
            key: "getLayers",
            value: function getLayers() {
                return this.get(ItemProperties.MAP_LAYERS);
            }
        }, {
            key: "setLayers",
            value: function setLayers(value) {
                var _this6 = this;

                var states = [];
                if (value) {
                    if (typeof value.push === 'undefined') {
                        value = [value];
                    }
                    states = value.map(function (v) {
                        return _this6.toLayerState(v);
                    });
                }
                this.set(ItemProperties.MAP_LAYERS, states);
            }
        }, {
            key: "addLayer",
            value: function addLayer(value) {
                if (!value) return;
                var state = this.toLayerState(value);
                this.addTo(ItemProperties.MAP_LAYERS, state);
            }
        }, {
            key: "removeLayer",
            value: function removeLayer(value) {
                if (!value) return;
                //get id of layer to be removed
                var layerId = value.id;
                if (!layerId && value.layer) {
                    layerId = value.layer.id;
                }
                if (!layerId) return; //can't remove unpersisted layers
                //filter out selected layer from current layers and update
                var layers = this.getLayers().filter(function (ls) {
                    return ls.layer.id !== layerId;
                });
                this.set(ItemProperties.MAP_LAYERS, layers);
            }

            //-----------------------------------------------------------

        }, {
            key: "annotations",
            value: function annotations(value) {
                this.setAnnotations(value);return this;
            }
        }, {
            key: "getAnnotations",
            value: function getAnnotations() {
                return this.get(ItemProperties.ANNOTATIONS);
            }
        }, {
            key: "setAnnotations",
            value: function setAnnotations(value) {
                this.set(ItemProperties.ANNOTATIONS, value);
            }

            //-----------------------------------------------------------


            /*
             * In order to properly handle Layers nested within plain PoJSos
             * @override ItemModel.propertyToJson
             */

        }, {
            key: "propertyToJson",
            value: function propertyToJson(property, value, parentJson) {
                var _this7 = this;

                if (property === ItemProperties.MAP_LAYERS && value && value.length) {
                    var json = value.map(function (v) {
                        return _this7.fromLayerState(v);
                    });
                    parentJson[property.key] = json;
                } else {
                    _get(MapModel.prototype.__proto__ || Object.getPrototypeOf(MapModel.prototype), "propertyToJson", this).call(this, property, value, parentJson);
                }
            }

            /**
             * @param {Object} object
             * @return {Object} layer state representation of the input
             */

        }, {
            key: "toLayerState",
            value: function toLayerState(object) {
                if (!object) {
                    // console.log("MapModel.toLayerState() - input was null");
                    return null;
                }

                var result = {};

                if (object.layer) {
                    // console.log("MapModel.toLayerState() - input was already a state");
                    var layer = this.toItem(object.layer);
                    if (!layer) return null;
                    result[LayerStateProperties.LAYER.key] = layer;
                    result[LayerStateProperties.LAYER_ID.key] = layer.getId() || object.layer_id;
                    result[LayerStateProperties.OPACITY.key] = object.opacity || 1.0;
                    result[LayerStateProperties.VISIBILITY.key] = object.visibility !== undefined ? object.visibility : true;
                } else if (!object.layer) {
                    // console.log("MapModel.toLayerState() - input was a layer");
                    var _layer = this.toItem(object);
                    if (!_layer) return null;
                    result[LayerStateProperties.LAYER.key] = _layer;
                    result[LayerStateProperties.LAYER_ID.key] = _layer.getId();
                    result[LayerStateProperties.OPACITY.key] = 1.0;
                    result[LayerStateProperties.VISIBILITY.key] = true;
                }

                return result;
            }

            /**
             * @param {Object} state -
             * @return {Object} JSON representation
             */

        }, {
            key: "fromLayerState",
            value: function fromLayerState(state) {
                var result = {};
                for (var p in state) {
                    var value = state[p];
                    if (LayerStateProperties.LAYER.key === p) {
                        value = value.toJson();
                    }
                    result[p] = value;
                }
                return result;
            }
        }]);

        return MapModel;
    }(ItemModel);

    return MapModel;
});

(function (root, factory) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.GalleryModel = factory(require('./item'), require('../shared/types'), require('./properties'));
    } else if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define('GalleryModel', ['./item', '../shared/types', './properties'], function (ItemModel, ItemTypes, ItemProperties) {
            return root.GalleryModel = factory(ItemModel, ItemTypes, ItemProperties);
        });
    } else {
        GeoPlatform.GalleryModel = factory(GeoPlatform.ItemModel, GeoPlatform.ItemTypes, GeoPlatform.ItemProperties);
    }
})(undefined || window, function (ItemModel, ItemTypes, ItemProperties) {

    var GalleryItemProperties = {
        ASSET_ID: { key: "assetId" },
        ASSET: { key: "asset" },
        ASSET_TYPE: { key: "assetType" }
    };

    /**
     * Gallery
     */

    var GalleryModel = function (_ItemModel5) {
        _inherits(GalleryModel, _ItemModel5);

        function GalleryModel(data) {
            _classCallCheck(this, GalleryModel);

            //manually re-set the overlays because each objectc
            // has a nested Item (layer) which needs to be item-ized
            // and the initializer used in the constructor isn't tied
            // to any specific instance's logic.
            var _this8 = _possibleConstructorReturn(this, (GalleryModel.__proto__ || Object.getPrototypeOf(GalleryModel)).call(this, data));

            var items = _this8.getItems();
            if (items) {
                _this8.setItems(items);
            }

            _this8.set(ItemProperties.TYPE, ItemTypes.GALLERY);
            _this8.default(ItemProperties.GALLERY_ITEMS, []);
            return _this8;
        }

        //-----------------------------------------------------------

        _createClass(GalleryModel, [{
            key: "items",
            value: function items(value) {
                this.setItems(value);return this;
            }
        }, {
            key: "getItems",
            value: function getItems() {
                return this.get(ItemProperties.GALLERY_ITEMS);
            }
        }, {
            key: "setItems",
            value: function setItems(value) {
                var _this9 = this;

                var items = [];
                //ensure that items being set contain Item-ized assets
                if (value) {
                    if (typeof value.push === 'undefined') {
                        value = [value];
                    }
                    items = value.map(function (v) {
                        return _this9.toGalleryItem(v);
                    });
                }
                this.set(ItemProperties.GALLERY_ITEMS, items);
            }
        }, {
            key: "addItem",
            value: function addItem(value) {
                if (!value) return;
                var item = this.toGalleryItem(value);
                this.addTo(ItemProperties.GALLERY_ITEMS, item);
            }
        }, {
            key: "removeItem",
            value: function removeItem(value) {
                if (!value || typeof value.toJson === 'undefined') return;
                var items = this.getItems().filter(function (i) {
                    return i.assetId !== value.getId();
                });
                this.setItems(items);
            }
        }, {
            key: "reorderItem",
            value: function reorderItem(value, newPosition) {
                var idx = -1;
                var arr = this.getItems();
                arr.each(function (p, i) {
                    if (p.id === value.id) idx = i;
                });
                if (idx < 0) return;
                arr.splice(idx, 1);
                arr.splice(idx, 0, value);
                this.setItems(arr);
            }

            //-----------------------------------------------------------

            /*
             * In order to properly handle Items nested within plain PoJSos
             * @override ItemModel.propertyToJson
             */

        }, {
            key: "propertyToJson",
            value: function propertyToJson(property, value, parentJson) {
                var _this10 = this;

                if (property === ItemProperties.GALLERY_ITEMS && value && value.length) {
                    var json = value.map(function (v) {
                        return _this10.fromGalleryItem(v);
                    }).filter(function (v) {
                        return v !== null;
                    });
                    parentJson[property.key] = json;
                } else {
                    _get(GalleryModel.prototype.__proto__ || Object.getPrototypeOf(GalleryModel.prototype), "propertyToJson", this).call(this, property, value, parentJson);
                }
            }
        }, {
            key: "toGalleryItem",
            value: function toGalleryItem(object) {
                if (!object) return null;

                var result = {};

                if (object.asset) {
                    // console.log("GalleryModel.toGalleryItem() - input was already an item");
                    var asset = this.toItem(object.asset);
                    if (!asset) return null;
                    result[GalleryItemProperties.ASSET.key] = asset;
                    result[GalleryItemProperties.ASSET_ID.key] = asset.getId() || object[GalleryItemProperties.ASSET_ID.key];
                    result[GalleryItemProperties.ASSET_TYPE.key] = asset.getType() || object[GalleryItemProperties.ASSET_TYPE.key];
                } else {
                    // console.log("GalleryModel.toGalleryItem() - input was an asset");
                    var _asset = this.toItem(object);
                    if (!_asset) return null;
                    result[GalleryItemProperties.ASSET.key] = _asset;
                    result[GalleryItemProperties.ASSET_ID.key] = _asset.getId();
                    result[GalleryItemProperties.ASSET_TYPE.key] = _asset.getType();
                }

                return result;
            }
        }, {
            key: "fromGalleryItem",
            value: function fromGalleryItem(item) {
                var result = {};
                for (var p in item) {
                    var value = item[p];
                    if (GalleryItemProperties.ASSET.key === p) {
                        value = value.toJson();
                    }
                    result[p] = value;
                }
                return result;
            }
        }]);

        return GalleryModel;
    }(ItemModel);

    return GalleryModel;
});

(function (root, factory) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.ItemFactory = factory(require('../shared/types'), require('./dataset'), require('./service'), require('./layer'), require('./map'), require('./gallery'), require('./community'), require('./concept'), require('./concept-scheme'));
    } else if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define('ItemFactory', ['../shared/types', './dataset', './service', './layer', './map', './gallery', './community', './concept', './concept-scheme'], function (ItemTypes, DatasetModel, ServiceModel, LayerModel, MapModel, GalleryModel, CommunityModel, ConceptModel, ConceptSchemeModel) {
            return root.ItemFactory = factory(ItemTypes, DatasetModel, ServiceModel, LayerModel, MapModel, GalleryModel, CommunityModel, ConceptModel, ConceptSchemeModel);
        });
    } else {
        GeoPlatform.ItemFactory = factory(GeoPlatform.ItemTypes, GeoPlatform.DatasetModel, GeoPlatform.ServiceModel, GeoPlatform.LayerModel, GeoPlatform.MapModel, GeoPlatform.GalleryModel, GeoPlatform.CommunityModel, GeoPlatform.ConceptModel, GeoPlatform.ConceptSchemeModel);
    }
})(undefined || window, function (ItemTypes, DatasetModel, ServiceModel, LayerModel, MapModel, GalleryModel, CommunityModel, ConceptModel, ConceptSchemeModel) {

    function itemFactory(type, options) {
        var item = null;

        // console.log(" ");
        // console.log(`ItemFactory() - Creating ${type} Item`);
        // console.log(" using... " + JSON.stringify(options));
        // console.log("-------------------------------");

        try {

            switch (type) {
                case ItemTypes.DATASET:
                    item = new DatasetModel(options);
                    break;
                case ItemTypes.SERVICE:
                    item = new ServiceModel(options);
                    break;
                case ItemTypes.LAYER:
                    item = new LayerModel(options);
                    break;
                case ItemTypes.MAP:
                    item = new MapModel(options);
                    break;
                case ItemTypes.GALLERY:
                    item = new GalleryModel(options);
                    break;
                case ItemTypes.COMMUNITY:
                    item = new CommunityModel(options);
                    break;
                case ItemTypes.CONCEPT:
                    item = new ConceptModel(options);
                    break;
                case ItemTypes.CONCEPT_SCHEME:
                    item = new ConceptSchemeModel(options);
                    break;
                default:
                    throw new Error("Unsupported item type '" + type + "'");
            }
        } catch (e) {
            console.log("ItemFactory.parse() - Error creating " + type + " using " + JSON.stringify(options) + " : " + e.message);
            throw new Error("ItemFactory.parse() - Error creating " + type + " using " + JSON.stringify(options) + " : " + e.message);
        }

        // console.log(`ItemFactory - done with ${item.getType()}`);
        // console.log(" ");
        return item;
    }

    return function (arg) {

        // console.log("ItemFactory() - " + JSON.stringify(arg));

        var type = null,
            options = null;
        if (arg && typeof arg === 'string') type = arg;else if (arg && (typeof arg === "undefined" ? "undefined" : _typeof(arg)) === 'object') {

            if (typeof arg.toJson !== 'undefined') {
                // console.log(arg.getType() + " is already an Item");
                return arg; //already an Item instance
            }

            if (arg.type) type = arg.type;else throw new Error("ItemFactory() - Must specify 'type' in parameter object");

            options = arg;
        } else {
            throw new Error("Illegal argument; must be string type or object definition");
        }

        return itemFactory(type, options);
    };
});

(function (root, factory) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.JQueryHttpClient = factory(require("jquery"), require('q'), require('./client'));
    } else if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define('JQueryHttpClient', ["jquery", "q", "./client"], function (jQuery, Q, HttpClientBase) {
            return root.JQueryHttpClient = factory(jQuery, Q, HttpClientBase);
        });
    } else {
        GeoPlatform.JQueryHttpClient = factory(jQuery, Q, GeoPlatform.HttpClientBase);
    }
})(undefined || window, function (jQuery, Q, HttpClientBase) {
    var JQueryHttpClient = function (_HttpClientBase) {
        _inherits(JQueryHttpClient, _HttpClientBase);

        /**
         * @param {integer} options.timeout
         * @param {string} options.token - the bearer token or a function to retrieve it
         */
        function JQueryHttpClient(options) {
            _classCallCheck(this, JQueryHttpClient);

            return _possibleConstructorReturn(this, (JQueryHttpClient.__proto__ || Object.getPrototypeOf(JQueryHttpClient)).call(this, options));
        }

        _createClass(JQueryHttpClient, [{
            key: "createRequestOpts",
            value: function createRequestOpts(options) {

                var opts = {
                    method: options.method,
                    url: options.url,
                    timeout: options.timeout || this.timeout
                };

                if (options.json === true) opts.dataType = 'json';

                if (options.params) {
                    opts.data = options.params;
                    opts.processData = true;
                }

                if (options.data) {
                    opts.data = options.data;
                    opts.processData = options.processData || false;
                    opts.contentType = 'application/json';
                }

                //set authorization header if one was provided
                if (this.token) {
                    var token = this.token();
                    if (token) {
                        opts.headers = opts.headers || {};
                        opts.headers.Authorization = 'Bearer ' + token;
                    }
                }

                //copy over user-supplied options
                if (options.options) {
                    for (var o in options.options) {
                        if (options.options.hasOwnProperty(o)) {
                            opts[o] = options.options[o];
                        }
                    }
                }

                return opts;
            }
        }, {
            key: "execute",
            value: function execute(opts) {
                var d = Q.defer();
                opts.success = function (data) {
                    d.resolve(data);
                };
                opts.error = function (xhr, status, message) {
                    d.reject(new Error(message));
                };
                jQuery.ajax(opts);
                return d.promise;
            }
        }]);

        return JQueryHttpClient;
    }(HttpClientBase);

    return JQueryHttpClient;
});

(function (root, factory) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.ItemService = factory(require('q'), require('../models/factory'));
    } else if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define('ItemService', ["q", '../models/factory'], function (Q, ItemFactory) {
            return root.ItemService = factory(Q, ItemFactory);
        });
    } else {
        GeoPlatform.ItemService = factory(Q, GeoPlatform.ItemFactory);
    }
})(undefined || window, function (Q, ItemFactory) {

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
    var ItemService = function () {
        function ItemService(url, httpClient) {
            _classCallCheck(this, ItemService);

            this.setUrl(url);
            this.client = httpClient;
            this.timeout = 10000;
            this.httpMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
        }

        _createClass(ItemService, [{
            key: "setUrl",
            value: function setUrl(baseUrl) {
                this.apiBase = baseUrl;
                this.baseUrl = baseUrl + '/api/items';
            }

            /**
             * @param {string} id - identifier of item to fetch
             * @param {Object} options - optional set of request options to apply to xhr request
             * @return {Promise} resolving Item object or an error
             */

        }, {
            key: "get",
            value: function get(id, options) {
                var _this12 = this;

                return Q.resolve(id).then(function (id) {
                    var opts = _this12.buildRequest({
                        method: "GET", url: _this12.baseUrl + '/' + id, options: options
                    });
                    return _this12.execute(opts);
                }).then(function (obj) {
                    return ItemFactory(obj);
                }).catch(function (e) {
                    return _this12._onError(e, "ItemService.get() - Error fetching item " + id);
                });
            }

            /**
             * @param {Object} itemObj - item to create or update
             * @param {Object} options - optional set of request options to apply to xhr request
             * @return {Promise} resolving Item object or an error
             */

        }, {
            key: "save",
            value: function save(itemObj, options) {
                var _this13 = this;

                return Q.resolve(itemObj).then(function (item) {

                    if (item.toJson) {
                        //if passed an ItemModel instance, convert to JSON
                        item = item.toJson();
                    }

                    var method = 'POST',
                        url = _this13.baseUrl;
                    if (item.id) {
                        method = "PUT";
                        url += '/' + item.id;
                    }

                    var opts = _this13.buildRequest({ method: method, url: url, data: item, options: options });
                    return _this13.execute(opts);
                }).then(function (obj) {
                    return ItemFactory(obj);
                }).catch(function (e) {
                    return _this13._onError(e, "ItemService.save() - Error saving item");
                });
            }

            /**
             * @param {string} id - identifier of item to delete
             * @param {Object} options - optional set of request options to apply to xhr request
             * @return {Promise} resolving true if successful or an error
             */

        }, {
            key: "remove",
            value: function remove(id, options) {
                var _this14 = this;

                return Q.resolve(this.baseUrl + '/' + id).then(function (url) {
                    var opts = _this14.buildRequest({
                        method: "DELETE", url: url, options: options
                    });
                    return _this14.execute(opts);
                }).then(function (response) {
                    return true;
                }).catch(function (e) {
                    return _this14._onError(e, "ItemService.remove() - Error deleting item " + id);
                });
            }

            /**
             * @param {string} id - identifier of item to patch
             * @param {Object} patch - HTTP-PATCH compliant set of properties to patch
             * @param {Object} options - optional set of request options to apply to xhr request
             * @return {Promise} resolving Item object or an error
             */

        }, {
            key: "patch",
            value: function patch(id, _patch, options) {
                var _this15 = this;

                return Q.resolve(this.baseUrl + '/' + id).then(function (url) {
                    var opts = _this15.buildRequest({
                        method: "PATCH", url: url, data: _patch, options: options
                    });
                    return _this15.execute(opts);
                }).then(function (obj) {
                    return ItemFactory(obj);
                }).catch(function (e) {
                    return _this15._onError(e, "ItemService.patch() - Error patching item " + id);
                });
            }

            /**
             * @param {Object} arg - either JS object of query parameters or GeoPlatform.Query instance
             * @param {Object} options - optional set of request options to apply to xhr request
             * @return {Promise} resolving search results
             */

        }, {
            key: "search",
            value: function search(arg, options) {
                var _this16 = this;

                return Q.resolve(arg).then(function (params) {

                    if (params && typeof params.getQuery !== 'undefined') {
                        //if passed a GeoPlatform.Query object,
                        // convert to parameters object
                        params = params.getQuery();
                    }
                    var opts = _this16.buildRequest({
                        method: "GET", url: _this16.baseUrl, params: params, options: options
                    });
                    return _this16.execute(opts);
                }).catch(function (e) {
                    return _this16._onError(e, "ItemService.search() - Error searching items");
                });
            }

            /**
             *
             * @param {string} arg - URL to metadata document or File to upload
             * @param {string} format - metadata format of specified document
             * @return {Promise} resolving GeoPlatform Item
             */

        }, {
            key: "import",
            value: function _import(arg, format, options) {
                var _this17 = this;

                return Q.resolve(true).then(function () {
                    if (!arg || arg.indexOf('http') < 0) {
                        throw new Error("Must provide a valid URL or File");
                    }
                    var url = _this17.apiBase + '/api/import';
                    var isFile = typeof arg !== 'string';
                    var ro = {
                        method: "POST",
                        url: _this17.url,
                        processData: true, //for jQuery
                        formData: true, //for Node (RequestJS)
                        options: options
                    };
                    if (isFile) {
                        ro.file = arg;
                        ro.data = { format: format };
                    } else {
                        ro.formData = false; //prevent multi-part form/data encoding
                        ro.data = { url: arg, format: format };
                    }
                    var opts = _this17.buildRequest(ro);
                    return _this17.execute(opts);
                }).catch(function (e) {
                    return _this17._onError(e, "ItemService.import() - Error importing item");
                });
            }

            /**
             * @param {string} id - identifier of the item to export
             * @param {format} format - string mime type to export
             * @return {Promise} resolving HTTP response object for enabling attachment downloading
             */

        }, {
            key: "export",
            value: function _export(id, format, options) {
                var _this18 = this;

                return Q.resolve(true).then(function () {
                    var url = _this18.baseUrl + '/' + id + '/export';
                    var opts = _this18.buildRequest({
                        method: "GET", url: url,
                        params: { format: format },
                        json: false,
                        options: options
                    });
                    return _this18.execute(opts);
                }).catch(function (e) {
                    return _this18._onError(e, "ItemService.export() - Error exporting item");
                });
            }

            /**
             * @param {Object} object - GP object definition to generate a URI for
             * @param {Object} options - optional request options
             * @return {Promise} resolving string URI
             */

        }, {
            key: "getUri",
            value: function getUri(object, options) {
                var _this19 = this;

                return Q.resolve(object).then(function (obj) {

                    if (!obj) {
                        var err = new Error("Must provide an typed object");
                        err.status = 400;
                        err.error = "Bad Request";
                        throw err;
                    }

                    if (obj.toJson) {
                        //if passed an ItemModel instance, convert to JSON
                        obj = obj.toJson();
                    }

                    if (!obj.type) {
                        var _err = new Error("Must provide a valid type on the specified object");
                        _err.status = 400;
                        _err.error = "Bad Request";
                    }

                    var url = _this19.apiBase + '/api/utils/uri';
                    var opts = _this19.buildRequest({
                        method: "POST", url: url, data: obj, options: options
                    });
                    return _this19.execute(opts);
                }).catch(function (e) {
                    return _this19._onError(e, "ItemService.getUri() - Error getting URI for item");
                });
            }

            /* ----------------------------------------------------------- */

            /**
             * @param {string} method - one of "GET", "POST", "PUT", "DELETE", "PATCH"
             * @param {string} url - destination of xhr request
             * @param {Object} params - object to be sent with request as query parameters
             * @param {Object} data - object to be sent with request as body
             * @param {Object} options - optional object defining request options
             * @return {Object} request options for xhr
             */

        }, {
            key: "buildRequest",
            value: function buildRequest(options) {

                if (this.httpMethods.indexOf(options.method) < 0) {
                    var err = new Error("Unsupported HTTP method " + options.method);
                    err.status = 400;
                    err.error = "Bad Request";
                    throw err;
                }

                if (!options.url) {
                    var _err2 = new Error("Must specify a URL for HTTP requests");
                    _err2.status = 400;
                    _err2.error = "Bad Request";
                    throw _err2;
                }

                options.timeout = this.timeout;

                var opts = this.createRequestOpts(options);

                return opts;
            }
        }, {
            key: "createRequestOpts",
            value: function createRequestOpts(options) {
                return this.client.createRequestOpts(options);
            }
        }, {
            key: "execute",
            value: function execute(opts) {
                return this.client.execute(opts);
            }
        }]);

        return ItemService;
    }();

    return ItemService;
});

(function (root, factory) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.LayerService = factory(require('q'), require('./item'));
    } else if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define('LayerService', ["q", "./item"], function (Q, ItemService) {
            return root.LayerService = factory(Q, ItemService);
        });
    } else {
        GeoPlatform.LayerService = factory(Q, GeoPlatform.ItemService);
    }
})(undefined || window, function (Q, ItemService) {

    'use strict';

    /**
     * GeoPlatform Map service
     * service for working with the GeoPlatform API to
     * retrieve and manipulate map objects.
     *
     * @see GeoPlatform.ItemService
     */

    var LayerService = function (_ItemService) {
        _inherits(LayerService, _ItemService);

        function LayerService(url, httpClient) {
            _classCallCheck(this, LayerService);

            return _possibleConstructorReturn(this, (LayerService.__proto__ || Object.getPrototypeOf(LayerService)).call(this, url, httpClient));
        }

        _createClass(LayerService, [{
            key: "setUrl",
            value: function setUrl(baseUrl) {
                _get(LayerService.prototype.__proto__ || Object.getPrototypeOf(LayerService.prototype), "setUrl", this).call(this, baseUrl);
                this.baseUrl = baseUrl + '/api/layers';
            }

            /**
             * @param {Object} options - optional set of request options to apply to xhr request
             * @return {Promise} resolving style JSON object
             */

        }, {
            key: "style",
            value: function style(options) {
                var _this21 = this;

                return Q.resolve(true).then(function () {

                    var url = _this21.baseUrl + '/' + id + '/style';
                    var opts = _this21.buildRequest({
                        method: "GET", url: url, options: options
                    });
                    return _this21.execute(opts);
                }).catch(function (e) {
                    return _this21._onError(e, "LayerService.style() - Error fetching style");
                });
            }

            /**
             * @param {string} id - GeoPlatform Layer identifier
             * @param {Object} req identifying extent, x, y
             * @param {Object} options - optional set of request options to apply to xhr request
             * @return {Promise} resolving feature JSON object
             */

        }, {
            key: "describe",
            value: function describe(id, req, options) {
                var _this22 = this;

                return Q.resolve(req).then(function (req) {

                    if (!req) {
                        var err = new Error("Must provide describe parameters to use");
                        err.status = 400;
                        err.error = "Bad Request";
                        throw err;
                    }

                    var keys = ['bbox', 'height', 'width', 'x', 'y'];
                    var missing = keys.find(function (key) {
                        return !req[key];
                    });
                    if (missing) {
                        var _err3 = new Error("Must specify " + missing + " in describe req");
                        _err3.status = 400;
                        _err3.error = "Bad Request";
                        throw _err3;
                    }

                    var params = {
                        srs: 'EPSG:4326',
                        bbox: req.bbox,
                        height: req.height,
                        width: req.width,
                        info_format: 'text/xml',
                        x: req.x,
                        y: req.y,
                        i: req.x, //WMS 1.3.0
                        j: req.y //WMS 1.3.0
                    };

                    var url = _this22.baseUrl + '/' + id + '/describe';
                    var opts = _this22.buildRequest({
                        method: "GET", url: url, params: params, options: options
                    });
                    return _this22.execute(opts);
                }).catch(function (e) {
                    return _this22._onError(e, "LayerService.describe() - Error describing layer feature");
                });
            }

            /**
             * @param {string} id - GeoPlatform Layer identifier
             * @param {Object} params describing layer request to validate
             * @param {Object} options - optional set of request options to apply to xhr request
             * @return {Promise} resolving empty if successful or a message if failed
             */

        }, {
            key: "validate",
            value: function validate(id, params, options) {
                var _this23 = this;

                return Q.resolve(params).then(function (params) {

                    if (!params) {
                        var err = new Error("Must provide parameters to use in layer validation");
                        err.status = 400;
                        err.error = "Bad Request";
                        throw err;
                    }

                    var url = _this23.baseUrl + '/' + id + '/validate';
                    var opts = _this23.buildRequest({
                        method: "GET", url: url, params: params, options: options
                    });
                    return _this23.execute(opts);
                }).catch(function (e) {
                    return _this23._onError(e, "LayerService.describe() - Error describing layer feature");
                });
            }
        }]);

        return LayerService;
    }(ItemService);

    return LayerService;
});

(function (root, factory) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.ServiceService = factory(require('q'), require('../shared/types'), require('./item'), require('../models/factory'), require('../shared/query-factory'));
    } else if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define('ServiceService', ["q", "../shared/types", "./item", "../models/factory", "../shared/query-factory"], function (Q, ItemTypes, ItemService, ItemFactory, QueryFactory) {
            return root.ServiceService = factory(Q, ItemTypes, ItemService, ItemFactory, QueryFactory);
        });
    } else {
        GeoPlatform.ServiceService = factory(Q, GeoPlatform.ItemTypes, GeoPlatform.ItemService, GeoPlatform.ItemFactory, GeoPlatform.QueryFactory);
    }
})(undefined || window, function (Q, ItemTypes, ItemService, ItemFactory, QueryFactory) {

    'use strict';

    /**
     * GeoPlatform Service service
     * service for working with the GeoPlatform API to
     * retrieve and manipulate service objects.
     *
     * @see ItemService
     */

    var ServiceService = function (_ItemService2) {
        _inherits(ServiceService, _ItemService2);

        function ServiceService(url, httpClient) {
            _classCallCheck(this, ServiceService);

            return _possibleConstructorReturn(this, (ServiceService.__proto__ || Object.getPrototypeOf(ServiceService)).call(this, url, httpClient));
        }

        _createClass(ServiceService, [{
            key: "setUrl",
            value: function setUrl(baseUrl) {
                _get(ServiceService.prototype.__proto__ || Object.getPrototypeOf(ServiceService.prototype), "setUrl", this).call(this, baseUrl);
                this.baseUrl = baseUrl + '/api/services';
            }

            /**
             * Fetch metadata from the specified GeoPlatform Service's
             * web-accessible implementation using either GetCapabilities
             * or ESRI documentInfo.
             * @param {Object} service - GeoPlatform Service object
             * @param {Object} options - optional set of request options to apply to xhr request
             * @return {Promise} resolving service metadata
             */

        }, {
            key: "about",
            value: function about(service, options) {
                var _this25 = this;

                return Q.resolve(service).then(function (svc) {
                    if (!svc) {
                        var err = new Error("Must provide service to get metadata about");
                        err.status = 400;
                        err.error = "Bad Request";
                        throw err;
                    }
                    var opts = _this25.buildRequest({
                        method: 'POST', url: _this25.baseUrl + '/about', data: svc, options: options
                    });
                    return _this25.execute(opts);
                }).catch(function (e) {
                    return _this25._onError(e, "ServiceService.about() - Error describing service");
                });
            }

            /**
             * @param {Object} options - optional set of request options to apply to request
             * @return {Promise} resolving service types
             */

        }, {
            key: "types",
            value: function types(options) {
                var _this26 = this;

                var query = QueryFactory().types(ItemTypes.STANDARD).resourceTypes('ServiceType').pageSize(50).getQuery();

                return Q.resolve(query).then(function (params) {
                    var url = _this26.apiBase + '/api/items';
                    var opts = _this26.buildRequest({
                        method: 'GET', url: url, params: params, options: options
                    });
                    return _this26.execute(opts);
                }).then(function (response) {
                    return response.results;
                }).catch(function (e) {
                    return _this26._onError(e, "ServiceService.types() - Error fetching service types");
                });
            }

            /**
             * @param {Object} service - GP Service definition
             * @param {Object} options - optional set of request options to apply to request
             * @return {Promise} resolving imported service
             */

        }, {
            key: "import",
            value: function _import(service, options) {
                var _this27 = this;

                return Q.resolve(service).then(function (svc) {

                    if (svc.toJson) {
                        //if passed an ItemModel instance, convert to JSON
                        svc = svc.toJson();
                    }

                    var url = _this27.baseUrl + '/import';
                    var opts = _this27.buildRequest({
                        method: 'POST', url: url, data: svc, options: options
                    });
                    return _this27.execute(opts);
                }).then(function (obj) {
                    return ItemFactory(obj);
                }).catch(function (e) {
                    return _this27._onError(e, "ServiceService.import() - Error importing service");
                });
            }

            /**
             * @param {string} id - identifier of GP service to harvest layers for
             * @param {Object} options - optional set of request options to apply to request
             * @return {Promise} resolving service layers
             */

        }, {
            key: "harvest",
            value: function harvest(id, options) {
                var _this28 = this;

                return Q.resolve(id).then(function (id) {
                    var url = _this28.baseUrl + '/' + id + '/harvest';
                    var opts = _this28.buildRequest({
                        method: 'GET', url: url, options: options
                    });
                    return _this28.execute(opts);
                }).catch(function (e) {
                    return _this28._onError(e, "ServiceService.harvest() - Error harvesting layers from service");
                });
            }

            /**
             * @param {string} id - identifier of GP service to live test
             * @param {Object} options - optional set of request options to apply to request
             * @return {Promise} resolving service statistics
             */

        }, {
            key: "liveTest",
            value: function liveTest(id, options) {
                var _this29 = this;

                return Q.resolve(id).then(function (id) {
                    var url = _this29.baseUrl + '/' + id + '/test';
                    var opts = _this29.buildRequest({
                        method: 'GET', url: url, options: options
                    });
                    return _this29.execute(opts);
                }).catch(function (e) {
                    return _this29._onError(e, "ServiceService.liveTest() - Error testing service");
                });
            }

            /**
             * @param {string} id - identifier of GP service to fetch statistics about
             * @param {Object} options - optional set of request options to apply to request
             * @return {Promise} resolving service statistics
             */

        }, {
            key: "statistics",
            value: function statistics(id, options) {
                var _this30 = this;

                return Q.resolve(id).then(function (id) {
                    var url = _this30.baseUrl + '/' + id + '/statistics';
                    var opts = _this30.buildRequest({
                        method: 'GET', url: url, options: options
                    });
                    return _this30.execute(opts);
                }).catch(function (e) {
                    return _this30._onError(e, "ServiceService.statistics() - Error getting service statistics");
                });
            }
        }]);

        return ServiceService;
    }(ItemService);

    return ServiceService;
});

(function (root, factory) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.GalleryService = factory(require('q'), require('./item'));
    } else if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define('GalleryService', ["q", "./item"], function (Q, ItemService) {
            return root.GalleryService = factory(Q, ItemService);
        });
    } else {
        GeoPlatform.GalleryService = factory(Q, GeoPlatform.ItemService);
    }
})(undefined || window, function (Q, ItemService) {

    'use strict';

    /**
     * GeoPlatform Map service
     * service for working with the GeoPlatform API to
     * retrieve and manipulate map objects.
     *
     * @see GeoPlatform.ItemService
     */

    var GalleryService = function (_ItemService3) {
        _inherits(GalleryService, _ItemService3);

        function GalleryService(url, httpClient) {
            _classCallCheck(this, GalleryService);

            return _possibleConstructorReturn(this, (GalleryService.__proto__ || Object.getPrototypeOf(GalleryService)).call(this, url, httpClient));
        }

        _createClass(GalleryService, [{
            key: "setUrl",
            value: function setUrl(baseUrl) {
                _get(GalleryService.prototype.__proto__ || Object.getPrototypeOf(GalleryService.prototype), "setUrl", this).call(this, baseUrl);
                this.baseUrl = baseUrl + '/api/galleries';
            }
        }, {
            key: "addItem",
            value: function addItem(galleryId, itemObj, options) {
                var _this32 = this;

                return Q.resolve(true).then(function () {
                    var url = _this32.baseUrl + '/' + galleryId + '/items';
                    var opts = _this32.buildRequest({
                        method: 'POST', url: url, data: itemObj, options: options
                    });
                    return _this32.execute(opts);
                }).catch(function (e) {
                    return _this32._onError(e, "GalleryService.addItem() - Error adding item");
                });
            }
        }, {
            key: "removeItem",
            value: function removeItem(galleryId, itemId, options) {
                var _this33 = this;

                return Q.resolve(this.baseUrl + '/' + galleryId + '/items/' + itemId).then(function (url) {
                    var opts = _this33.buildRequest({
                        method: 'DELETE', url: url, options: options
                    });
                    return _this33.execute(opts);
                }).then(function (response) {
                    return true;
                }).catch(function (e) {
                    return _this33._onError(e, "GalleryService.addItem() - Error adding item");
                });
            }
        }]);

        return GalleryService;
    }(ItemService);

    return GalleryService;
});

(function (root, factory) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.MapService = factory(require('q'), require('./item'));
    } else if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define('MapService', ["q", "./item"], function (Q, ItemService) {
            return root.MapService = factory(Q, ItemService);
        });
    } else {
        GeoPlatform.MapService = factory(Q, GeoPlatform.ItemService);
    }
})(undefined || window, function (Q, ItemService) {

    'use strict';

    /**
     * GeoPlatform Map service
     * service for working with the GeoPlatform API to
     * retrieve and manipulate map objects.
     *
     * @see GeoPlatform.ItemService
     */

    var MapService = function (_ItemService4) {
        _inherits(MapService, _ItemService4);

        function MapService(url, httpClient) {
            _classCallCheck(this, MapService);

            return _possibleConstructorReturn(this, (MapService.__proto__ || Object.getPrototypeOf(MapService)).call(this, url, httpClient));
        }

        _createClass(MapService, [{
            key: "setUrl",
            value: function setUrl(baseUrl) {
                _get(MapService.prototype.__proto__ || Object.getPrototypeOf(MapService.prototype), "setUrl", this).call(this, baseUrl);
                this.baseUrl = baseUrl + '/api/maps';
            }
        }]);

        return MapService;
    }(ItemService);

    return MapService;
});

(function (root, factory) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.DatasetService = factory(require('q'), require('./item'));
    } else if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define('DatasetService', ["q", "./item"], function (Q, ItemService) {
            return root.DatasetService = factory(Q, ItemService);
        });
    } else {
        GeoPlatform.DatasetService = factory(Q, GeoPlatform.ItemService);
    }
})(undefined || window, function (Q, ItemService) {

    'use strict';

    /**
     * GeoPlatform Map service
     * service for working with the GeoPlatform API to
     * retrieve and manipulate map objects.
     *
     * @see GeoPlatform.ItemService
     */

    var DatasetService = function (_ItemService5) {
        _inherits(DatasetService, _ItemService5);

        function DatasetService(url, httpClient) {
            _classCallCheck(this, DatasetService);

            return _possibleConstructorReturn(this, (DatasetService.__proto__ || Object.getPrototypeOf(DatasetService)).call(this, url, httpClient));
        }

        _createClass(DatasetService, [{
            key: "setUrl",
            value: function setUrl(baseUrl) {
                _get(DatasetService.prototype.__proto__ || Object.getPrototypeOf(DatasetService.prototype), "setUrl", this).call(this, baseUrl);
                this.baseUrl = baseUrl + '/api/datasets';
            }
        }]);

        return DatasetService;
    }(ItemService);

    return DatasetService;
});

(function (root, factory) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.UtilsService = factory(require('q'));
    } else if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define('UtilsService', ["q"], function (Q) {
            return root.UtilsService = factory(Q);
        });
    } else {
        GeoPlatform.UtilsService = factory(Q);
    }
})(undefined || window, function (Q) {

    'use strict';

    var METHODS = ["GET", "POST", "PUT", "DELETE", "PATCH"];

    var UtilsService = function () {
        function UtilsService(url, httpClient) {
            _classCallCheck(this, UtilsService);

            this.setUrl(url);
            this.client = httpClient;
            this.timeout = 10000;
            this.httpMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
        }

        _createClass(UtilsService, [{
            key: "setUrl",
            value: function setUrl(baseUrl) {
                this.baseUrl = baseUrl;
            }

            /**
             * @param {string} property - optional capa property to specifically request
             * @param {Object} query - optional query parameters to include with request
             * @param {Object} options - optional config to send with http request
             * @return {Promise} resolving capabilities object
             */

        }, {
            key: "capabilities",
            value: function capabilities(property, query, options) {
                var _this36 = this;

                var url = this.baseUrl + '/api/capabilities';
                if (property) url += '/' + property;

                return Q.resolve(url).then(function (url) {
                    var opts = _this36.buildRequest({
                        method: "GET", url: url, params: query || {}, options: options
                    });
                    return _this36.execute(opts);
                }).catch(function (e) {
                    return _this36._onError(e, "UtilsService.capabilities() - Error getting capabilities");
                });
            }

            /**
             * @param {File} file
             * @param {string} format
             * @param {Object} options
             * @return {Promise}
             */

        }, {
            key: "parseFile",
            value: function parseFile(file, format, options) {
                var _this37 = this;

                var url = this.baseUrl + '/api/utils/parse';

                return Q.resolve(url).then(function (url) {

                    var opts = _this37.buildRequest({
                        method: "POST", url: url,
                        data: { format: format },
                        file: file,
                        formData: true, //NodeJS (RequestJS)
                        options: options
                    });
                    return _this37.execute(opts);
                }).then(function (response) {
                    return response;
                }).catch(function (e) {
                    return _this37._onError(e, "UtilsService.parseFile() - Error parsing file");
                });
            }

            /* ----------------------------------------------------------- */

            /**
             * @param {string} method - one of "GET", "POST", "PUT", "DELETE", "PATCH"
             * @param {string} url - destination of xhr request
             * @param {Object} params - object to be sent with request as query parameters
             * @param {Object} data - object to be sent with request as body
             * @param {Object} options - optional object defining request options
             * @return {Object} request options for xhr
             */

        }, {
            key: "buildRequest",
            value: function buildRequest(options) {

                if (this.httpMethods.indexOf(options.method) < 0) {
                    var err = new Error("Unsupported HTTP method " + options.method);
                    err.status = 400;
                    err.error = "Bad Request";
                    throw err;
                }

                if (!options.url) {
                    var _err4 = new Error("Must specify a URL for HTTP requests");
                    _err4.status = 400;
                    _err4.error = "Bad Request";
                    throw _err4;
                }

                options.timeout = this.timeout;

                return this.createRequestOpts(options);
            }
        }, {
            key: "createRequestOpts",
            value: function createRequestOpts(options) {
                return this.client.createRequestOpts(options);
            }
        }, {
            key: "execute",
            value: function execute(opts) {
                return this.client.execute(opts);
            }
        }]);

        return UtilsService;
    }();

    return UtilsService;
});

(function (root, factory) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.KGService = factory(require('q'), require('../shared/parameters'));
    } else if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define('KGService', ["q", "../shared/parameters"], function (Q, QueryParameters) {
            return root.KGService = factory(Q, QueryParameters);
        });
    } else {
        GeoPlatform.KGService = factory(Q, GeoPlatform.QueryParameters);
    }
})(undefined || window, function (Q, QueryParameters) {

    'use strict';

    var KGService = function () {
        function KGService(url, httpClient) {
            _classCallCheck(this, KGService);

            this.setUrl(url);
            this.client = httpClient;
            this.timeout = 10000;
            this.httpMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
        }

        _createClass(KGService, [{
            key: "setUrl",
            value: function setUrl(baseUrl) {
                this.apiBase = baseUrl;
                this.baseUrl = baseUrl + '/api/recommender';
            }

            /**
             * @param {Object} query - optional query parameters to include with request
             * @param {Object} options - optional config to send with http request
             * @return {Promise} resolving recommended concepts as search results
             */

        }, {
            key: "suggest",
            value: function suggest(query, options) {
                var url = this.baseUrl + '/suggest';
                return this._search(url, query, options).catch(function (e) {
                    var err = new Error("KGService.suggest() - Error suggesting concepts: " + e.message);
                    return Q.reject(err);
                });
            }

            /**
             * @param {Object} query - optional query parameters to include with request
             * @param {Object} options - optional config to send with http request
             * @return {Promise} resolving concept types as search results
             */

        }, {
            key: "types",
            value: function types(query, options) {
                var url = this.baseUrl + '/types';
                return this._search(url, query, options).catch(function (e) {
                    var err = new Error("KGService.types() - Error searching types: " + e.message);
                    return Q.reject(err);
                });
            }

            /**
             * @param {Object} query - optional query parameters to include with request
             * @param {Object} options - optional config to send with http request
             * @return {Promise} resolving concept sources as search results
             */

        }, {
            key: "sources",
            value: function sources(query, options) {
                var url = this.baseUrl + '/sources';
                return this._search(url, query, options).catch(function (e) {
                    var err = new Error("KGService.sources() - Error searching sources: " + e.message);
                    return Q.reject(err);
                });
            }

            /* ----------------------------------------------------------- */

            /**
             * internal method used by exposed methods
             */

        }, {
            key: "_search",
            value: function _search(url, query, options) {
                var _this38 = this;

                return Q.resolve(true).then(function () {

                    if (query && typeof query.getQuery !== 'undefined') {
                        //if passed a GeoPlatform.Query object,
                        // convert to parameters object
                        query = query.getQuery();
                    }

                    var opts = _this38.buildRequest({
                        method: "GET", url: url, params: query, options: options
                    });
                    return _this38.execute(opts);
                });
            }

            /**
             * @param {string} method - one of "GET", "POST", "PUT", "DELETE", "PATCH"
             * @param {string} url - destination of xhr request
             * @param {Object} params - object to be sent with request as query parameters
             * @param {Object} data - object to be sent with request as body
             * @param {Object} options - optional object defining request options
             * @return {Object} request options for xhr
             */

        }, {
            key: "buildRequest",
            value: function buildRequest(options) {

                if (this.httpMethods.indexOf(options.method) < 0) throw new Error("Unsupported HTTP method " + options.method);

                if (!options.url) throw new Error("Must specify a URL for HTTP requests");

                options.timeout = this.timeout;

                return this.createRequestOpts(options);
            }
        }, {
            key: "createRequestOpts",
            value: function createRequestOpts(options) {
                return this.client.createRequestOpts(options);
            }
        }, {
            key: "execute",
            value: function execute(opts) {
                return this.client.execute(opts);
            }
        }]);

        return KGService;
    }();

    return KGService;
});

(function (root, factory) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.ServiceFactory = factory(require('../shared/types'), require('./item'), require('./layer'), require('./service'), require('./gallery'), require('./community'), require('./dataset'), require('./map'));
    } else if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define('ServiceFactory', ["../shared/types", "./item", "./layer", "./service", "./gallery", "./community", "./dataset", "./map"], function (ItemTypes, ItemService, LayerService, ServiceService, GalleryService, CommunityService, DatasetService, MapService) {
            return root.ServiceFactory = factory(ItemTypes, ItemService, LayerService, ServiceService, GalleryService, CommunityService, DatasetService, MapService);
        });
    } else {
        GeoPlatform.ServiceFactory = factory(GeoPlatform.ItemTypes, GeoPlatform.ItemService, GeoPlatform.LayerService, GeoPlatform.ServiceService, GeoPlatform.GalleryService, GeoPlatform.CommunityService, GeoPlatform.DatasetService, GeoPlatform.MapService);
    }
})(undefined || window, function (ItemTypes, ItemService, LayerService, ServiceService, GalleryService, CommunityService, DatasetService, MapService) {

    /**
     * @param {any} arg - string type or object with type property
     * @param {string} baseUrl - base endpoint of GeoPlatform API
     * @return {ItemService}
     */
    var ServiceFactory = function ServiceFactory(arg, baseUrl, httpClient) {
        var type = typeof arg === 'string' ? arg : arg && arg.type ? arg.type : null;
        if (!type) throw new Error("Must provide a type or object with a type specified");
        if (!baseUrl) throw new Error("Must provide a base url");
        if (!httpClient) throw new Error("Must provide an http client to use to make requests");
        switch (type) {
            case ItemTypes.LAYER:
                return new LayerService(baseUrl, httpClient);
            case ItemTypes.SERVICE:
                return new ServiceService(baseUrl, httpClient);
            case ItemTypes.MAP:
                return new MapService(baseUrl, httpClient);
            case ItemTypes.GALLERY:
                return new GalleryService(baseUrl, httpClient);
            case ItemTypes.COMMUNITY:
                return new CommunityService(baseUrl, httpClient);
            case ItemTypes.DATASET:
                return new DatasetService(baseUrl, httpClient);
            default:
                return new ItemService(baseUrl, httpClient);
        }
    };

    return ServiceFactory;
});