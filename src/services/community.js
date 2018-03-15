


(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["q", "ItemService"],
            function(Q, ItemService) {
                return (root.CommunityService = factory(Q, ItemService));
            });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.CommunityService = factory(
                require('q'),
                require('./item')
            )
        );
    } else {
        GeoPlatform.CommunityService = factory(Q, GeoPlatform.ItemService);
    }
}(this||window, function(Q, ItemService) {


    'use strict';

    /**
     * GeoPlatform Map service
     * service for working with the GeoPlatform API to
     * retrieve and manipulate Community objects.
     *
     * @see GeoPlatform.ItemService
     */

    class CommunityService extends ItemService {

        constructor(url, httpClient) {
            super(url, httpClient);
        }

        setUrl(baseUrl) {
            super.setUrl(baseUrl);
            this.baseUrl = baseUrl + '/api/communities';
        }

    }

    return CommunityService;

}));
