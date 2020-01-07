import { Item, SearchResults } from '../shared/models';
import GPHttpClient from '../http/client';
import BaseService from "./base";
declare class AgolQuery {
    private _query;
    constructor(options?: {
        [key: string]: any;
    });
    getQuery(): {
        [key: string]: any;
    };
    /**
     * @param obj - set of parameter/values to apply to this query
     */
    applyParameters(obj: {
        [key: string]: any;
    }): void;
    q(value: string): AgolQuery;
    setQ(value: string): void;
    getQ(): string;
    types(value: string | string[]): AgolQuery;
    setTypes(value: string | string[]): void;
    getTypes(): string[];
    groups(value: string | string[]): AgolQuery;
    setGroups(value: string | string[]): void;
    getGroups(): string[];
    orgs(value: string | string[]): AgolQuery;
    setOrgs(value: string | string[]): void;
    getOrgs(): string[];
    extent(value: any): AgolQuery;
    setExtent(value: any): void;
    getExtent(): any;
    /**
     * @param sort - form of <field>,<dir> or just field name
     * @param order - optional, either 'asc' or 'desc'
     */
    sort(sort: string, order: string): AgolQuery;
    /**
     * @param sort - form of <field>,<dir> or just field name
     * @param order - optional, either 'asc' or 'desc'
     */
    setSort(sort: string, order: string): void;
    getSort(): string;
    getSortField(): string;
    getSortOrder(): boolean;
    /**
     * @param page - page of results to fetch
     */
    page(page: number): AgolQuery;
    setPage(page: number): void;
    getPage(): number;
    nextPage(): void;
    previousPage(): void;
    /**
     * @param size - page size to request
     */
    pageSize(size: number): AgolQuery;
    setPageSize(size: number): void;
    getPageSize(): number;
}
/**
 * AGOL Service
 */
declare class AgolService extends BaseService {
    constructor(url: string, httpClient: GPHttpClient);
    setUrl(baseUrl: string): void;
    /**
     * @param id - identifier of AGOL organization to fetch
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving Item object or an error
     */
    getOrg(id: string, options?: any): Promise<Item>;
    /**
     * @param arg - either JS object of query parameters or Query instance
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving search results
     */
    searchOrgs(arg: AgolQuery, options?: any): Promise<SearchResults>;
    /**
     * @param id - identifier of AGOL group to fetch
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving Item object or an error
     */
    getGroup(id: string, options?: any): Promise<Item>;
    /**
     * @param arg - either JS object of query parameters or AgolQuery instance
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving search results
     */
    searchGroups(arg: AgolQuery, options?: any): Promise<SearchResults>;
    /**
     * @param id - identifier of AGOL item to fetch
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving Item object or an error
     */
    getItem(id: string, options?: any): Promise<Item>;
    /**
     * @param arg - either JS object of query parameters or AgolQuery instance
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving search results
     */
    searchItems(arg: AgolQuery, options?: any): Promise<SearchResults>;
    getAgolId(obj: any): string | null;
}
export { AgolService as default, AgolService, AgolQuery };
