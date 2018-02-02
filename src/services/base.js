
(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["q", "GeoPlatform"], function(Q, GeoPlatform){
            return (root.ItemService = factory(Q, GeoPlatform));
        });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.ItemService = factory(
                require('q'),
                require('GeoPlatform')
            )
        );
    } else {
        GeoPlatform.ItemService = factory(Q, GeoPlatform);
    }
}(this||window, function(Q, GeoPlatform) {

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
    class ItemService {

        constructor() {
            this.baseUrl = GeoPlatform.ualUrl + '/api/items';
            this.timeout = GeoPlatform.timeout || 10000;
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
            return Q.reject(new Error("Must use a subclass of ItemService"));
        }

        /**
         * @param {Object} itemObj - item to create or update
         * @return {Promise} resolving Item object or an error
         */
        save (itemObj) {
            return Q.reject(new Error("Must use a subclass of ItemService"));
        }

        /**
         * @param {string} id - identifier of item to delete
         * @return {Promise} resolving true if successful or an error
         */
        remove (id) {
            return Q.reject(new Error("Must use a subclass of ItemService"));
        }

        /**
         * @param {string} id - identifier of item to patch
         * @param {Object} patch - HTTP-PATCH compliant set of properties to patch
         * @return {Promise} resolving Item object or an error
         */
        patch (id, patch) {
            return Q.reject(new Error("Must use a subclass of ItemService"));
        }

        search (arg) {

            return Q.reject(new Error("Must use a subclass of ItemService"));
        }

    }

    return ItemService;

}));
