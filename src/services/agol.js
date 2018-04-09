

import Q from 'q';
import ItemTypes from '../shared/types';


class AgolQuery {

    constructor() {
        this._query = {
            page: 0,
            size: 10
        };
    }

    getQuery() {
        let result = {};
        for(let prop in this._query) {
            let value = this._query[prop];
            if(value !== null && typeof(value.push) !== 'undefined') {
                value = value.join(',');
            }
            result[prop] = value;
        }
        return result;
    }

    // ---------------------------------------

    q(value) { this.setQ(value); return this; }
    setQ(value) { this._query.q = value; }
    getQ() { return this._query.q; }

    // ---------------------------------------

    types(value) { this.setTypes(value); return this; }
    setTypes(value) {
        if(value && typeof(value.push) !== 'undefined')
            value = value.join(',');
        this._query.types = value;
    }
    getTypes() { return this._query.types; }

    // ---------------------------------------

    groups(value) { this.setGroups(value); return this; }
    setGroups(value) {
        if(value && typeof(value.push) !== 'undefined')
            value = value.join(',');
        this._query.groups = value;
    }
    getGroups() { return this._query.groups; }

    // ---------------------------------------

    orgs(value) { this.setOrgs(value); return this; }
    setOrgs(value) {
        if(value && typeof(value.push) !== 'undefined')
            value = value.join(',');
        this._query.orgs = value;
    }
    getOrgs() { return this._query.orgs; }

    // ---------------------------------------

    extent(value) { this.setExtent(value); return this; }
    setExtent(value) { this._query.bbox = value; }
    getExtent() { return this._query.bbox; }

    // ---------------------------------------

    /**
     * @param {string} sort - form of <field>,<dir> or just field name
     * @param {string} order - optional, either 'asc' or 'desc'
     */
    sort (sort, order) { this.setSort(sort, order); return this; }
    /**
     * @param {string} sort - form of <field>,<dir> or just field name
     * @param {string} order - optional, either 'asc' or 'desc'
     */
     setSort(sort, order) {
         order = (order && (order !== 'asc' || order !== 'desc')) ? 'desc' : order;
         if(sort && sort.indexOf(',')<0)
            sort = sort + ',' + order;
         this._query.sort = sort;
    }
    getSort() { return this._query.sort; }
    getSortField() { return this._query.sort.split(',')[0]; }
    getSortOrder() { return this._query.sort.split(',')[1] === 'asc'; }


    // -----------------------------------------------------------


    /**
     * @param {int} page - page of results to fetch
     */
    page (page) {
        this.setPage(page);
        return this;
    }

    setPage(page) {
        if(isNaN(page) || page*1<0) return;
        this._query.page = page*1;
    }

    getPage() {
        return this._query.page;
    }

    nextPage() {
        this.setPage(this._query.page+1);
    }

    previousPage() {
        this.setPage(this._query.page-1);
    }


    // -----------------------------------------------------------


    /**
     * @param {int} size - page size to request
     */
    pageSize (size) {
        this.setPageSize(size);
        return this;
    }

    setPageSize (size) {
        if(isNaN(size) || size*1<0) return;
        this._query.size = size*1;
    }

    getPageSize() {
        return this._query.size;
    }

}




class AgolService {



    constructor(url, httpClient) {
        this.setUrl(url);
        this.client = httpClient;
        this.timeout = 10000;
        this.httpMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
    }

    setUrl(baseUrl) {
        this.baseUrl = baseUrl + '/api/agol/';
    }




    // -----------------------------------------------------------------------
    // AGOL ORGS METHODS


    /**
     * @param {string} id - identifier of AGOL organization to fetch
     * @param {Object} options - optional set of request options to apply to xhr request
     * @return {Promise} resolving Item object or an error
     */
    getOrg (id, options) {

        return Q.resolve( id )
        .then( id => {
            let opts = this.buildRequest({
                method:"GET", url:this.baseUrl + '/orgs/' + id, options:options
            });
            return this.execute(opts);
        })
        .catch(e => {
            let err = new Error(`AgolService.getOrg() - Error fetching org ${id}: ${e.message}`);
            return Q.reject(err);
        });
    }

    /**
     * @param {Object} arg - either JS object of query parameters or Query instance
     * @param {Object} options - optional set of request options to apply to xhr request
     * @return {Promise} resolving search results
     */
    searchOrgs (arg, options) {

        return Q.resolve( arg )
        .then( params => {

            if(params && typeof(params.getQuery) !== 'undefined') {
                //if passed a GeoPlatform.Query object,
                // convert to parameters object
                params = params.getQuery();
            }
            let opts = this.buildRequest({
                method:"GET", url: this.baseUrl + '/orgs', params: params, options: options
            });
            return this.execute(opts);
        })
        .catch(e => {
            let err = new Error(`AgolService.searchOrgs() - Error searching orgs: ${e.message}`);
            return Q.reject(err);
        });
    }




    // -----------------------------------------------------------------------
    // AGOL GROUPS METHODS


    /**
     * @param {string} id - identifier of AGOL group to fetch
     * @param {Object} options - optional set of request options to apply to xhr request
     * @return {Promise} resolving Item object or an error
     */
    getGroup (id, options) {

        return Q.resolve( id )
        .then( id => {
            let opts = this.buildRequest({
                method:"GET", url:this.baseUrl + '/groups/' + id, options:options
            });
            return this.execute(opts);
        })
        .catch(e => {
            let err = new Error(`AgolService.getGroup() - Error fetching group ${id}: ${e.message}`);
            return Q.reject(err);
        });
    }


    /**
     * @param {Object} arg - either JS object of query parameters or AgolQuery instance
     * @param {Object} options - optional set of request options to apply to xhr request
     * @return {Promise} resolving search results
     */
    searchGroups (arg, options) {

        return Q.resolve( arg )
        .then( params => {

            if(params && typeof(params.getQuery) !== 'undefined') {
                //if passed a GeoPlatform.Query object,
                // convert to parameters object
                params = params.getQuery();
            }
            let opts = this.buildRequest({
                method:"GET", url: this.baseUrl + '/groups', params: params, options: options
            });
            return this.execute(opts);
        })
        .catch(e => {
            let err = new Error(`AgolService.searchGroups() - Error searching groups: ${e.message}`);
            return Q.reject(err);
        });
    }




    // -----------------------------------------------------------------------
    // AGOL ITEMS METHODS

    /**
     * @param {string} id - identifier of AGOL item to fetch
     * @param {Object} options - optional set of request options to apply to xhr request
     * @return {Promise} resolving Item object or an error
     */
    getItem (id, options) {

        return Q.resolve( id )
        .then( id => {
            let opts = this.buildRequest({
                method:"GET", url:this.baseUrl + '/items/' + id, options:options
            });
            return this.execute(opts);
        })
        .catch(e => {
            let err = new Error(`AgolService.getItem() - Error fetching item ${id}: ${e.message}`);
            return Q.reject(err);
        });
    }


    /**
     * @param {Object} arg - either JS object of query parameters or AgolQuery instance
     * @param {Object} options - optional set of request options to apply to xhr request
     * @return {Promise} resolving search results
     */
    searchItems (arg, options) {

        return Q.resolve( arg )
        .then( params => {

            if(params && typeof(params.getQuery) !== 'undefined') {
                //if passed a GeoPlatform.Query object,
                // convert to parameters object
                params = params.getQuery();
            }
            let opts = this.buildRequest({
                method:"GET", url: this.baseUrl + '/items', params: params, options: options
            });
            return this.execute(opts);
        })
        .catch(e => {
            let err = new Error(`AgolService.searchItems() - Error searching items: ${e.message}`);
            return Q.reject(err);
        });
    }



    /* --------------------------- */

    getAgolId (obj) {
        if(!obj) return null;

        if(!obj.type) return null;

        if(ItemTypes.ORGANIZATION === obj.type || 'Group' === obj.type) {
            return obj.id;
        }

        if(!obj.identifiers || !obj.identifiers.length) return null;
        let ids = obj.identifiers.filter(id => ~id.indexOf('agol:'));
        if(!ids.length) return null;
        return ids[0].replace('agol:','');
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
    buildRequest (options) {

        if(this.httpMethods.indexOf(options.method)<0)
            throw new Error(`Unsupported HTTP method ${options.method}`);

        if(!options.url)
            throw new Error(`Must specify a URL for HTTP requests`);

        options.timeout = this.timeout;

        return this.createRequestOpts(options);
    }

    createRequestOpts(options) {
        return this.client.createRequestOpts(options);
    }

    execute(opts) {
        return this.client.execute(opts);
    }

}

export {
    AgolService as default,
    AgolService,
    AgolQuery
};
