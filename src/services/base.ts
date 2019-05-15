
import * as Q from 'q';
import Config from '../shared/config';
import Query from '../shared/query';

/**
 * BaseService
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
class BaseService {

    // @ts-ignore
    private _timeout : number = 30000;
    // @ts-ignore
    private baseUrl : string;

    constructor(url:string) {
        this.setUrl(url);
        this._timeout = Config.timeout || 30000;
    }

    setUrl(baseUrl : string) {
        this.baseUrl = baseUrl + '/api/items';
    }

    /**
     * @param milliseconds - override environment variable timeout
     */
    timeout(milliseconds : number) {
        this._timeout = milliseconds;
    }

    /**
     * @param id - identifier of item to fetch
     * @return Promise resolving Item object or an error
     */
    get (
        // @ts-ignore
        id : string
    ) : Q.Promise<any> {
        return Q.reject(new Error("Must use a subclass of BaseService"));
    }

    /**
     * @param {Object} itemObj - item to create or update
     * @return Promise resolving Item object or an error
     */
    save (
        // @ts-ignore
        itemObj : any
    ) : Q.Promise<any> {
        return Q.reject(new Error("Must use a subclass of BaseService"));
    }

    /**
     * @param id - identifier of item to delete
     * @return Promise resolving true if successful or an error
     */
    remove (
        // @ts-ignore
        id : string
    ) : Q.Promise<any> {
        return Q.reject(new Error("Must use a subclass of BaseService"));
    }

    /**
     * @param id - identifier of item to patch
     * @param {Object} patch - HTTP-PATCH compliant set of properties to patch
     * @return Promise resolving Item object or an error
     */
    patch (
        // @ts-ignore
        id : string,
        // @ts-ignore
        patch : any
    ) : Q.Promise<any> {
        return Q.reject(new Error("Must use a subclass of BaseService"));
    }

    search (
        // @ts-ignore
        arg ?: Query
    ) : Q.Promise<any> {
        return Q.reject(new Error("Must use a subclass of BaseService"));
    }

}

export default BaseService;
