
(function (root, factory) {
    if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.BaseService = factory(require('q'))
        );
    } else if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define('BaseService', ["q"], function(Q){
            return (root.BaseService = factory(Q));
        });
    } else {
        GeoPlatform.BaseService = factory(Q);
    }
}(this||window, function(Q) {

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

    return BaseService;

}));
