import * as Q from 'q';
import { Item, SearchResults } from '../shared/models';
import GPHttpClient from '../http/client';
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
declare class ItemService {
    protected apiBase?: string;
    protected baseUrl?: string;
    protected client: GPHttpClient;
    protected _timeout: number;
    protected logger: any;
    protected httpMethods: string[];
    constructor(url: string, httpClient: GPHttpClient);
    setUrl(baseUrl: string): void;
    /**
     * @param milliseconds - override environment variable timeout
     */
    setTimeout(milliseconds: number): void;
    /**
     * @param milliseconds - override environment variable timeout
     */
    timeout(milliseconds: number): ItemService;
    /**
     * @return GPHttpClient instance or null if one was not provided
     */
    getClient(): GPHttpClient;
    /**
     * @param logger - log service
     */
    setLogger(logger: any): void;
    /**
     * @param e - error to log (if logger specified)
     */
    logError(e: string | Error): void;
    /**
     * @param msg - message to log as debug
     */
    logDebug(msg: string): void;
    /**
     * @param id - identifier of item to fetch
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving Item object or an error
     */
    get(id: string, options?: any): Q.Promise<Item>;
    /**
     * @param itemObj - item to create or update
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving Item object or an error
     */
    save(itemObj: Item, options?: any): Q.Promise<Item>;
    /**
     * @param id - identifier of item to delete
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving true if successful or an error
     */
    remove(id: string, options?: any): Q.Promise<boolean>;
    /**
     * @param id - identifier of item to patch
     * @param patch - HTTP-PATCH compliant set of properties to patch
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving Item object or an error
     */
    patch(id: string, patch: any, options?: any): Q.Promise<Item>;
    /**
     * @param id - identifier of item to clone
     * @param overrides - KVP of property-value overrides to apply to cloned instance
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving clone of Item or an error
     */
    clone(id: string, overrides: any, options?: any): Q.Promise<Item>;
    /**
     * @param arg - either JS object of query parameters or Query instance
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving search results
     */
    search(arg?: any, options?: any): Q.Promise<SearchResults>;
    /**
     *
     * @param arg - URL to metadata document or File to upload
     * @param format - metadata format of specified document
     * @return Promise resolving GeoPlatform Item
     */
    import(arg: any, format: string, options?: any): Q.Promise<Item>;
    /**
     * @param id - identifier of the item to export
     * @param format - string mime type to export
     * @return Promise resolving HTTP response object for enabling attachment downloading
     */
    export(id: string, format: string, options?: any): Q.Promise<any>;
    /**
     * @param object - GP object definition to generate a URI for
     * @param options - optional request options
     * @return Promise resolving string URI
     */
    getUri(object: any, options?: any): Q.Promise<any>;
    /**
     * @param ids - list of identifiers to fetch objects for
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving list of matching items or an error
     */
    getMultiple(ids: string[], options?: any): Q.Promise<any>;
    /**
     * @param uris - list of URIs to retrieve objects for
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving list containing uri-item association where exists
     */
    exists(uris: string[], options?: any): Q.Promise<any>;
    like(item: any, options?: any): Q.Promise<any>;
    view(item: any, options?: any): Q.Promise<any>;
    /**
     * @param id - identifier of item to fetch associations for
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving array of associated items of the item in question
     */
    associations(id: string, params: any, options?: any): Q.Promise<any>;
    /**
     * @param id - identifier of item to fetch version info for
     * @param params - optional set of query parameters to constrain list of versions
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving array of available versions of the item
     */
    versions(id: string, params?: any, options?: any): Q.Promise<any>;
    /**
     * @param method - one of "GET", "POST", "PUT", "DELETE", "PATCH"
     * @param url - destination of xhr request
     * @param params - object to be sent with request as query parameters
     * @param data - object to be sent with request as body
     * @param options - optional object defining request options
     * @return request options for xhr
     */
    buildRequest(options: {
        [key: string]: any;
    }): {
        [key: string]: any;
    };
    createRequestOpts(options: {
        [key: string]: any;
    }): {
        [key: string]: any;
    };
    execute(opts: {
        [key: string]: any;
    }): Q.Promise<any>;
}
export default ItemService;
