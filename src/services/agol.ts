
import { Item, SearchResults } from '../shared/models';
import ItemTypes from '../shared/types';
import Config from '../shared/config';
import GPHttpClient from '../http/client';
import BaseService from "./base";

class AgolQuery {

    private _query : { [key:string]:any };

    constructor() {
        this._query = {
            page: 0,
            size: 10
        };
    }

    getQuery() : { [key:string]:any } {
        let result : { [key:string]:any } = {};
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

    q(value : string) : AgolQuery { this.setQ(value); return this; }
    setQ(value : string) { this._query.q = value; }
    getQ() : string { return this._query.q; }

    // ---------------------------------------

    types(value : string|string[]) : AgolQuery {
        this.setTypes(value); return this;
    }
    setTypes(value : string|string[]) {
        let val : string;
        if(value && Array.isArray(value))
            val = (value as Array<string>).join(',');
        else val = value as string;
        this._query.types = val;
    }
    getTypes() : string[] { return this._query.types; }

    // ---------------------------------------

    groups(value : string|string[]) : AgolQuery {
        this.setGroups(value); return this;
    }
    setGroups(value : string|string[]) {
        let val : string;
        if(value && Array.isArray(value))
            val = (value as Array<string>).join(',');
        else val = value as string;
        this._query.groups = val;
    }
    getGroups() : string[] { return this._query.groups; }

    // ---------------------------------------

    orgs(value : string|string[]) : AgolQuery {
        this.setOrgs(value); return this;
    }
    setOrgs(value : string|string[]) {
        let val : string;
        if(value && Array.isArray(value))
            val = (value as Array<string>).join(',');
        else val = value as string;
        this._query.orgs = val;
    }
    getOrgs() : string[] { return this._query.orgs; }

    // ---------------------------------------

    extent(value : any) : AgolQuery { this.setExtent(value); return this; }
    setExtent(value : any) { this._query.bbox = value; }
    getExtent() : any { return this._query.bbox; }

    // ---------------------------------------

    /**
     * @param sort - form of <field>,<dir> or just field name
     * @param order - optional, either 'asc' or 'desc'
     */
    sort (sort : string, order : string) : AgolQuery {
        this.setSort(sort, order); return this;
    }
    /**
     * @param sort - form of <field>,<dir> or just field name
     * @param order - optional, either 'asc' or 'desc'
     */
     setSort(sort : string, order : string) {
         order = order || 'desc';
         if(sort && sort.indexOf(',')<0)
            sort = sort + ',' + order;
         this._query.sort = sort;
    }
    getSort() : string { return this._query.sort; }
    getSortField() : string { return this._query.sort.split(',')[0]; }
    getSortOrder() : boolean { return this._query.sort.split(',')[1] === 'asc'; }


    // -----------------------------------------------------------


    /**
     * @param page - page of results to fetch
     */
    page (page : number) : AgolQuery {
        this.setPage(page);
        return this;
    }

    setPage(page : number) {
        if(isNaN(page) || page*1<0) return;
        this._query.page = page*1;
    }

    getPage() : number {
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
     * @param size - page size to request
     */
    pageSize (size : number) : AgolQuery {
        this.setPageSize(size);
        return this;
    }

    setPageSize (size : number) {
        if(isNaN(size) || size*1<0) return;
        this._query.size = size*1;
    }

    getPageSize() : number {
        return this._query.size;
    }

}


class AgolService extends BaseService {

    constructor(url : string, httpClient : GPHttpClient) {
        super(url, httpClient);
        this.setTimeout(30000);
    }

    setUrl(baseUrl : string) {
        super.setUrl(baseUrl);
        this.baseUrl = baseUrl + '/api/agol';
    }

    // -----------------------------------------------------------------------
    // AGOL ORGS METHODS


    /**
     * @param id - identifier of AGOL organization to fetch
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving Item object or an error
     */
    getOrg (id : string, options ?: any) : Promise<Item> {

        return this.createAndResolvePromise( id )
        .then( id => {
            let opts = this.buildRequest({
                method:"GET", url:this.baseUrl + '/orgs/' + id, options:options
            });
            return this.execute(opts);
        })
        .catch(e => {
            let err = new Error(`AgolService.getOrg() - Error fetching org ${id}: ${e.message}`);
            Object.assign(err, e);
            throw err;
        });
    }

    /**
     * @param arg - either JS object of query parameters or Query instance
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving search results
     */
    searchOrgs (arg : AgolQuery, options ?: any) : Promise<SearchResults> {

        return this.createAndResolvePromise( arg )
        .then( params => {

            let ps = params.getQuery();
            let opts = this.buildRequest({
                method:"GET",
                url: this.baseUrl + '/orgs',
                params: ps,
                options: options
            });
            return this.execute(opts);
        })
        .catch(e => {
            let err = new Error(`AgolService.searchOrgs() - Error searching orgs: ${e.message}`);
            Object.assign(err, e);
            throw err;
        });
    }




    // -----------------------------------------------------------------------
    // AGOL GROUPS METHODS


    /**
     * @param id - identifier of AGOL group to fetch
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving Item object or an error
     */
    getGroup (id : string, options ?: any) : Promise<Item> {

        return this.createAndResolvePromise( id )
        .then( id => {
            let opts = this.buildRequest({
                method:"GET", url:this.baseUrl + '/groups/' + id, options:options
            });
            return this.execute(opts);
        })
        .catch(e => {
            let err = new Error(`AgolService.getGroup() - Error fetching group ${id}: ${e.message}`);
            Object.assign(err, e);
            throw err;
        });
    }


    /**
     * @param arg - either JS object of query parameters or AgolQuery instance
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving search results
     */
    searchGroups (arg : AgolQuery, options ?: any) : Promise<SearchResults> {

        return this.createAndResolvePromise( arg )
        .then( params => {

            let ps = params.getQuery();
            let opts = this.buildRequest({
                method:"GET",
                url: this.baseUrl + '/groups',
                params: ps,
                options: options
            });
            return this.execute(opts);
        })
        .catch(e => {
            let err = new Error(`AgolService.searchGroups() - Error searching groups: ${e.message}`);
            Object.assign(err, e);
            throw err;
        });
    }




    // -----------------------------------------------------------------------
    // AGOL ITEMS METHODS

    /**
     * @param id - identifier of AGOL item to fetch
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving Item object or an error
     */
    getItem (id : string, options ?: any) : Promise<Item> {

        return this.createAndResolvePromise( id )
        .then( (id : string) => {
            let opts = this.buildRequest({
                method:"GET",
                url:this.baseUrl + '/items/' + id,
                options:options
            });
            return this.execute(opts);
        })
        .catch(e => {
            let err = new Error(`AgolService.getItem() - Error fetching item ${id}: ${e.message}`);
            Object.assign(err, e);
            throw err;
        });
    }


    /**
     * @param arg - either JS object of query parameters or AgolQuery instance
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving search results
     */
    searchItems (arg : AgolQuery, options ?: any) : Promise<SearchResults> {

        return this.createAndResolvePromise( arg )
        .then( params => {

            let ps = params.getQuery();
            let opts = this.buildRequest({
                method:"GET",
                url: this.baseUrl + '/items',
                params: ps,
                options: options
            });
            return this.execute(opts);
        })
        .catch(e => {
            let err = new Error(`AgolService.searchItems() - Error searching items: ${e.message}`);
            Object.assign(err, e);
            throw err;
        });
    }



    /* --------------------------- */

    getAgolId (obj : any) : string|null {
        if(!obj) return null;

        if(!obj.type) return null;

        if(ItemTypes.ORGANIZATION === obj.type || 'Group' === obj.type) {
            return obj.id;
        }

        if(!obj.identifiers || !obj.identifiers.length) return null;
        let ids = obj.identifiers.filter( (id:string) => ~id.indexOf('agol:'));
        if(!ids.length) return null;
        return ids[0].replace('agol:','');
    }

}

export {
    AgolService as default,
    AgolService,
    AgolQuery
};
