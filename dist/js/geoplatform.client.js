"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define([], function () {
            return root.ItemTypes = factory();
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.ItemTypes = factory();
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
        CONCEPT: "skos:Concept",
        CONCEPT_SCHEME: "skos:ConceptScheme",
        STANDARD: 'dct:Standard'
    };

    return ItemTypes;
});

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define([], function () {
            return root.QueryParameters = factory();
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.QueryParameters = factory();
    } else {
        GeoPlatform.QueryParameters = factory();
    }
})(undefined || window, function () {

    var Parameters = {
        TYPES: 'type',
        QUERY: 'q',
        KEYWORDS: 'keyword',
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
        SCHEMES_ID: 'scheme.id',
        SCHEMES_LABEL: 'scheme.label',
        SCHEMES_URI: 'scheme.uri',
        VISIBILITY: 'visibility',
        EXTENT: 'extent',
        MODIFIED_BEFORE: 'modified.max',
        MODIFIED_AFTER: 'modified.min',
        BEGINS: 'startDate.min',
        ENDS: 'endDate.max',
        RESOURCE_TYPE: 'resourceType'
    };

    return Parameters;
});

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(['QueryParameters'], function (QueryParameters) {
            return root.Query = factory(QueryParameters);
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.Query = factory(require('./parameters'));
    } else {
        GeoPlatform.Query = factory(GeoPlatform.QueryParameters);
    }
})(undefined || window, function (QueryParameters) {

    var FIELDS_DEFAULT = ['created', 'modified', 'createdBy', 'publishers', 'themes', 'description'];

    var FACETS_DEFAULT = ['types', 'themes', 'publishers', 'serviceTypes', 'schemes', 'visibility', 'createdBy'];

    var SORT_OPTIONS_DEFAULT = [{ value: "label,asc", label: "Name (A-Z)" }, { value: "label,desc", label: "Name (Z-A)" }, { value: "type,asc", label: "Type (A-Z)" }, { value: "type,desc", label: "Type (Z-A)" }, { value: "modified,desc", label: "Most recently modified" }, { value: "modified,asc", label: "Least recently modified" }, { value: "_score,desc", label: "Relevance" }];

    var Query = function () {
        function Query() {
            _classCallCheck(this, Query);

            this.defaultQuery = {
                start: 0,
                size: 10,
                total: 0,
                sort: "modified,desc",
                fields: FIELDS_DEFAULT.slice(0),
                includeFacets: FACETS_DEFAULT.slice(0)
            };

            this.query = {
                start: 0,
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
                this.query[name] = value;
            }
        }, {
            key: "getParameter",
            value: function getParameter(key) {
                return this.getParameter(ke);
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

            // -----------------------------------------------------------


            /**
             * @param {int} start - beginning index of results to request
             */

        }, {
            key: "start",
            value: function start(_start) {
                this.setStart(_start);
                return this;
            }
        }, {
            key: "setStart",
            value: function setStart(start) {
                if (isNaN(start)) return;
                this.query.start = start;
            }
        }, {
            key: "getStart",
            value: function getStart() {
                return this.query.start;
            }

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
                if (isNaN(page)) return;
                this.query.start = page * this.query.size;
            }
        }, {
            key: "getPage",
            value: function getPage() {
                return this.query.start;
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
                if (isNaN(size)) return;
                this.query.size = size;

                //find out which page in the new scheme the current first-result of current page
                // will show up in, and set start so that it shows up with the new page size
                var page = Math.floor(this.query.start * 1 / this.query.size * 1);
                this.query.start = page * (this.query.size * 1);
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
    if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["Query"], function (Query) {
            return root.QueryFactory = factory(Query);
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.QueryFactory = factory(require('./query'));
    } else {
        GeoPlatform.QueryFactory = factory(GeoPlatform.Query);
    }
})(undefined || window, function (Query) {

    return function () {
        return new Query();
    };
});

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["q"], function (Q) {
            return root.ItemService = factory(Q);
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.ItemService = factory(require('Q'));
    } else {
        GeoPlatform.ItemService = factory(Q);
    }
})(undefined || window, function (Q) {

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
        function ItemService(url) {
            _classCallCheck(this, ItemService);

            this.setUrl(url);
            this.timeout = 10000;
        }

        _createClass(ItemService, [{
            key: "setUrl",
            value: function setUrl(baseUrl) {
                this.baseUrl = baseUrl + '/api/items';
            }

            /**
             * @param {number} milliseconds - override environment variable timeout
             */

        }, {
            key: "timeout",
            value: function timeout(milliseconds) {
                this.timeout = milliseconds;
            }

            /**
             * @param {string} id - identifier of item to fetch
             * @return {Promise} resolving Item object or an error
             */

        }, {
            key: "get",
            value: function get(id) {
                return Q.reject(new Error("Must use a subclass of ItemService"));
            }

            /**
             * @param {Object} itemObj - item to create or update
             * @return {Promise} resolving Item object or an error
             */

        }, {
            key: "save",
            value: function save(itemObj) {
                return Q.reject(new Error("Must use a subclass of ItemService"));
            }

            /**
             * @param {string} id - identifier of item to delete
             * @return {Promise} resolving true if successful or an error
             */

        }, {
            key: "remove",
            value: function remove(id) {
                return Q.reject(new Error("Must use a subclass of ItemService"));
            }

            /**
             * @param {string} id - identifier of item to patch
             * @param {Object} patch - HTTP-PATCH compliant set of properties to patch
             * @return {Promise} resolving Item object or an error
             */

        }, {
            key: "patch",
            value: function patch(id, _patch) {
                return Q.reject(new Error("Must use a subclass of ItemService"));
            }
        }, {
            key: "search",
            value: function search(arg) {
                return Q.reject(new Error("Must use a subclass of ItemService"));
            }
        }]);

        return ItemService;
    }();

    return ItemService;
});

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["jquery", "q", "GeoPlatform", "ItemService"], function (jQuery, Q, GeoPlatform, ItemService) {
            return root.JQueryItemService = factory(jQuery, Q, GeoPlatform, ItemService);
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.JQueryItemService = factory(require("jquery"), require('q'), require('GeoPlatform'), require('ItemService'));
    } else {
        GeoPlatform.JQueryItemService = factory(jQuery, Q, GeoPlatform, GeoPlatform.ItemService);
    }
})(undefined || window, function (jQuery, Q, GeoPlatform, ItemService) {

    var METHODS = ["GET", "POST", "PUT", "DELETE", "PATCH"];

    /**
     * JQuery ItemService
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
     *
     * Example of adding custom request options:
     *
     *      let options = {
     *          headers: { 'X-My-Header': 'myHeaderValue' },
     *          xhrFields: { withCredentials: true }
     *      };
     *      itemService.get(itemId, options).then(item=> {...}).catch(e=>{...});
     *
     */

    var JQueryItemService = function (_ItemService) {
        _inherits(JQueryItemService, _ItemService);

        function JQueryItemService() {
            _classCallCheck(this, JQueryItemService);

            return _possibleConstructorReturn(this, (JQueryItemService.__proto__ || Object.getPrototypeOf(JQueryItemService)).call(this, GeoPlatform.ualUrl));
        }

        /**
         * @param {string} id - identifier of item to fetch
         * @param {Object} options - optional set of request options to apply to xhr request
         * @return {Promise} resolving Item object or an error
         */


        _createClass(JQueryItemService, [{
            key: "get",
            value: function get(id, options) {
                var _this2 = this;

                return Q.resolve(true).then(function () {
                    var opts = _this2.buildRequest("GET", _this2.baseUrl + '/' + id, null, options);
                    var d = Q.defer();
                    opts.success = function (data) {
                        d.resolve(data);
                    };
                    opts.error = function (xhr, status, message) {
                        d.reject(new Error(message));
                    };
                    jQuery.ajax(opts);
                    return d.promise;
                }).catch(function (e) {
                    var err = new Error("ItemService.save() - Error fetching item: " + e.message);
                    return Q.reject(err);
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
                var _this3 = this;

                return Q.resolve(true).then(function () {

                    var method = 'POST',
                        url = _this3.baseUrl;
                    if (itemObj.id) {
                        method = "PUT";
                        url += '/' + itemObj.id;
                    }

                    var opts = _this3.buildRequest(method, url, itemObj, options);

                    var d = Q.defer();
                    opts.success = function (data) {
                        d.resolve(data);
                    };
                    opts.error = function (xhr, status, message) {
                        d.reject(new Error(message));
                    };
                    jQuery.ajax(opts);
                    return d.promise;
                }).catch(function (e) {
                    var err = new Error("ItemService.save() - Error saving item: " + e.message);
                    return Q.reject(err);
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
                var _this4 = this;

                return Q.resolve(true).then(function () {

                    var opts = _this4.buildRequest("DELETE", _this4.baseUrl + '/' + id, null, options);
                    var d = Q.defer();
                    opts.success = function (data) {
                        d.resolve(true);
                    };
                    opts.error = function (xhr, status, message) {
                        d.reject(new Error(message));
                    };
                    jQuery.ajax(opts);
                    return d.promise;
                }).catch(function (e) {
                    var err = new Error("ItemService.save() - Error deleting item: " + e.message);
                    return Q.reject(err);
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
            value: function patch(id, _patch2, options) {
                var _this5 = this;

                return Q.resolve(true).then(function () {

                    var opts = _this5.buildRequest("PATCH", _this5.baseUrl + '/' + id, _patch2, options);
                    var d = Q.defer();
                    opts.success = function (data) {
                        d.resolve(data);
                    };
                    opts.error == function (xhr, status, message) {
                        d.reject(new Error(message));
                    };
                    jQuery.ajax(opts);
                    return d.promise;
                }).catch(function (e) {
                    var err = new Error("ItemService.save() - Error patching item: " + e.message);
                    return Q.reject(err);
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
                var _this6 = this;

                return Q.resolve(true).then(function () {

                    var params = arg;

                    if (arg && typeof arg.getQuery !== 'undefined') {
                        //if passed a GeoPlatform.Query object,
                        // convert to parameters object
                        params = arg.getQuery();
                    }

                    var opts = _this6.buildRequest("GET", _this6.baseUrl, params, options);
                    var d = Q.defer();
                    opts.success = function (data) {
                        d.resolve(data);
                    };
                    opts.error = function (xhr, status, message) {
                        d.reject(new Error(message));
                    };
                    jQuery.ajax(opts);
                    return d.promise;
                }).catch(function (e) {
                    var err = new Error("ItemService.search() - Error searching items: " + e.message);
                    return Q.reject(err);
                });
            }

            /**
             * @param {string} method - one of "GET", "POST", "PUT", "DELETE", "PATCH"
             * @param {string} url - destination of xhr request
             * @param {Object} data - object to be sent with request
             * @param {Object} options - optional object defining request options
             * @return {Object} request options for xhr
             */

        }, {
            key: "buildRequest",
            value: function buildRequest(method, url, data, options) {

                if (METHODS.indexOf(method) < 0) throw new Error("Unsupported HTTP method " + method);

                if (!url) throw new Error("Must specify a URL for HTTP requests");

                //define default options
                var opts = {
                    method: method,
                    url: url,
                    dataType: 'json', //expected response type
                    timeout: this.timeout
                };
                if (data) {
                    opts.data = data;
                    if ("POST" === method || "PUT" === method || "PATCH" === method) {
                        opts.processData = false;
                        opts.contentType = 'application/json';
                    }
                }

                //copy over user-supplied options
                if (options && (typeof options === "undefined" ? "undefined" : _typeof(options)) === 'object') {
                    for (var o in options) {
                        if (options.hasOwnProperty(o)) {
                            opts[o] = options[o];
                        }
                    }
                }

                return opts;
            }
        }]);

        return JQueryItemService;
    }(ItemService);

    return JQueryItemService;
});

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["jquery", "q", "GeoPlatform", "JQueryItemService"], function (jQuery, Q, GeoPlatform, JQueryItemService) {
            return root.JQueryMapService = factory(jQuery, Q, GeoPlatform, JQueryItemService);
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.JQueryMapService = factory(require("jquery"), require('q'), require('GeoPlatform'), require('JQueryItemService'));
    } else {
        GeoPlatform.JQueryMapService = factory(jQuery, Q, GeoPlatform, GeoPlatform.JQueryItemService);
    }
})(undefined || window, function (jQuery, Q, GeoPlatform, JQueryItemService) {

    'use strict';

    /**
     * GeoPlatform Map service
     * service for working with the GeoPlatform API to
     * retrieve and manipulate map objects.
     *
     * @see GeoPlatform.JQueryItemService
     */

    var JQueryMapService = function (_JQueryItemService) {
        _inherits(JQueryMapService, _JQueryItemService);

        function JQueryMapService() {
            _classCallCheck(this, JQueryMapService);

            return _possibleConstructorReturn(this, (JQueryMapService.__proto__ || Object.getPrototypeOf(JQueryMapService)).call(this));
        }

        _createClass(JQueryMapService, [{
            key: "setUrl",
            value: function setUrl(baseUrl) {
                this.baseUrl = baseUrl + '/api/maps';
            }
        }]);

        return JQueryMapService;
    }(JQueryItemService);

    return JQueryMapService;
});

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["jquery", "q", "GeoPlatform", "JQueryItemService"], function (jQuery, Q, GeoPlatform, JQueryItemService) {
            return root.JQueryLayerService = factory(jQuery, Q, GeoPlatform, JQueryItemService);
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.JQueryLayerService = factory(require("jquery"), require('q'), require('GeoPlatform'), require('JQueryItemService'));
    } else {
        GeoPlatform.JQueryLayerService = factory(jQuery, Q, GeoPlatform, GeoPlatform.JQueryItemService);
    }
})(undefined || window, function (jQuery, Q, GeoPlatform, JQueryItemService) {

    'use strict';

    /**
     * GeoPlatform Map service
     * service for working with the GeoPlatform API to
     * retrieve and manipulate map objects.
     *
     * @see GeoPlatform.JQueryItemService
     */

    var JQueryLayerService = function (_JQueryItemService2) {
        _inherits(JQueryLayerService, _JQueryItemService2);

        function JQueryLayerService() {
            _classCallCheck(this, JQueryLayerService);

            return _possibleConstructorReturn(this, (JQueryLayerService.__proto__ || Object.getPrototypeOf(JQueryLayerService)).call(this));
        }

        _createClass(JQueryLayerService, [{
            key: "setUrl",
            value: function setUrl(baseUrl) {
                this.baseUrl = baseUrl + '/api/layers';
            }

            /**
             * @param {Object} options - optional set of request options to apply to xhr request
             * @return {Promise} resolving style JSON object
             */

        }, {
            key: "style",
            value: function style(options) {
                var _this9 = this;

                return Q.resolve(true).then(function () {

                    var d = Q.defer();
                    var url = _this9.baseUrl + '/' + id + '/style';
                    var opts = _this9.buildRequest("GET", url, null, options);
                    opts.success = function (data) {
                        d.resolve(data);
                    };
                    opts.error = function (xhr, status, message) {
                        var m = "GeoPlatform.LayerService.style() - Error fetching item style: " + message;
                        var err = new Error(m);
                        d.reject(err);
                    };
                    jQuery.ajax(opts);
                    return d.promise;
                }).catch(function (e) {
                    var err = new Error("ItemService.save() - Error deleting item: " + e.message);
                    return Q.reject(err);
                });
            }

            /**
             * @param {Object} req identifying extent, x, y
             * @param {Object} options - optional set of request options to apply to xhr request
             * @return {Promise} resolving feature JSON object
             */

        }, {
            key: "describe",
            value: function describe(req, options) {
                var _this10 = this;

                return Q.resolve(true).then(function () {

                    if (!req) {
                        throw new Error("Must provide describe req");
                    }

                    var keys = ['bbox', 'height', 'width', 'x', 'y'];
                    var missing = keys.find(function (key) {
                        return !req[key];
                    });
                    if (missing) {
                        throw new Error("Must specify " + missing + " in describe req");
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

                    var d = Q.defer();
                    var url = _this10.baseUrl + '/' + id + '/describe';
                    var opts = _this10.buildRequest("GET", url, params, options);
                    opts.success = function (data) {
                        d.resolve(data);
                    };
                    opts.error = function (xhr, status, message) {
                        d.reject(new Error(message));
                    };
                    jQuery.ajax(opts);
                    return d.promise;
                }).catch(function (e) {
                    var err = new Error("JQueryLayerService.describe() -\n                    Error describing layer feature: " + e.message);
                    return Q.reject(err);
                });
            }
        }]);

        return JQueryLayerService;
    }(JQueryItemService);

    return JQueryLayerService;
});

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["jquery", "q", "GeoPlatform", "JQueryItemService"], function (jQuery, Q, GeoPlatform, JQueryItemService) {
            return root.JQueryServiceService = factory(jQuery, Q, GeoPlatform, JQueryItemService);
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.JQueryServiceService = factory(require("jquery"), require('q'), require('GeoPlatform'), require('JQueryItemService'));
    } else {
        GeoPlatform.JQueryServiceService = factory(jQuery, Q, GeoPlatform, GeoPlatform.JQueryItemService);
    }
})(undefined || window, function (jQuery, Q, GeoPlatform, JQueryItemService) {

    // ( function(jQuery, Q, L/*eaflet*/, GeoPlatform) {

    'use strict';

    /**
     * GeoPlatform Service service
     * service for working with the GeoPlatform API to
     * retrieve and manipulate service objects.
     *
     * @see GeoPlatform.JQueryItemService
     */

    var JQueryServiceService = function (_JQueryItemService3) {
        _inherits(JQueryServiceService, _JQueryItemService3);

        function JQueryServiceService() {
            _classCallCheck(this, JQueryServiceService);

            return _possibleConstructorReturn(this, (JQueryServiceService.__proto__ || Object.getPrototypeOf(JQueryServiceService)).call(this));
        }

        _createClass(JQueryServiceService, [{
            key: "setUrl",
            value: function setUrl(baseUrl) {
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
                var _this12 = this;

                return Q.resolve(true).then(function () {

                    if (!service) {
                        throw new Error("Must provide service to get metadata about");
                    }

                    var d = Q.defer();
                    var opts = _this12.buildRequest('POST', _this12.baseUrl + '/about', service, options);
                    opts.success = function (data) {
                        d.resolve(data);
                    };
                    opts.error = function (xhr, status, message) {
                        d.reject(new Error(message));
                    };
                    jQuery.ajax(opts);
                    return d.promise;
                }).catch(function (e) {
                    var err = new Error("JQueryServiceService.about() -\n                    Error describing service: " + e.message);
                    return Q.reject(err);
                });
            }
        }]);

        return JQueryServiceService;
    }(JQueryItemService);

    return JQueryServiceService;
});

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["ItemTypes", "JQueryItemService", "JQueryLayerService", "JQueryMapService", "JQueryServiceService"], function (ItemTypes, JQueryItemService, JQueryLayerService, JQueryMapService, JQueryServiceService) {
            return root.JQueryServiceFactory = factory(ItemTypes, JQueryItemService, JQueryLayerService, JQueryMapService, JQueryServiceService);
        });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = root.JQueryServiceFactory = factory(require('../../shared/types'), require('./item'), require('./layer'), require('./map'), require('./service'));
    } else {
        GeoPlatform.JQueryServiceFactory = factory(GeoPlatform.ItemTypes, GeoPlatform.JQueryItemService, GeoPlatform.JQueryLayerService, GeoPlatform.JQueryMapService, GeoPlatform.JQueryServiceService);
    }
})(undefined || window, function (JQueryItemService, JQueryLayerService, JQueryMapService, JQueryServiceService) {

    /**
     * @param {any} arg - string type or object with type property
     * @param {string} baseUrl - base endpoint of GeoPlatform API
     * @return {ItemService}
     */
    var ServiceFactory = function ServiceFactory(arg, baseUrl) {
        var type = typeof arg === 'string' ? arg : arg && arg.type ? arg.type : null;
        if (!type) throw new Error("Must provide a type or object with a type specified");
        if (!baseUrl) throw new Error("Must provide a base url");
        switch (type) {
            case Types.LAYER:
                return new JQueryLayerService(baseUrl);
            case Types.SERVICE:
                return new JQueryServiceService(baseUrl);
            case Types.MAP:
                return new JQueryMapService(baseUrl);
            // case Types.GALLERY: return new JQueryGalleryService(baseUrl);
            // case Types.DATASET: return new JQueryDatasetService(baseUrl);
            default:
                return new JQueryItemService(baseUrl);
        }
    };

    return ServiceFactory;
});