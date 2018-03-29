
import Q from 'q'

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

    constructor(url) {
        this.setUrl(url);
        this.timeout = 10000;
    }

    setUrl(baseUrl) {
        this.baseUrl = baseUrl + '/api/items';
    }

    /**
     * @param {number} milliseconds - override environment variable timeout
     */
    timeout(milliseconds) {
        this.timeout = milliseconds;
    }

    /**
     * @param {string} id - identifier of item to fetch
     * @return {Promise} resolving Item object or an error
     */
    get (id) {
        return Q.reject(new Error("Must use a subclass of BaseService"));
    }

    /**
     * @param {Object} itemObj - item to create or update
     * @return {Promise} resolving Item object or an error
     */
    save (itemObj) {
        return Q.reject(new Error("Must use a subclass of BaseService"));
    }

    /**
     * @param {string} id - identifier of item to delete
     * @return {Promise} resolving true if successful or an error
     */
    remove (id) {
        return Q.reject(new Error("Must use a subclass of BaseService"));
    }

    /**
     * @param {string} id - identifier of item to patch
     * @param {Object} patch - HTTP-PATCH compliant set of properties to patch
     * @return {Promise} resolving Item object or an error
     */
    patch (id, patch) {
        return Q.reject(new Error("Must use a subclass of BaseService"));
    }

    search (arg) {
        return Q.reject(new Error("Must use a subclass of BaseService"));
    }

}

export default BaseService;
