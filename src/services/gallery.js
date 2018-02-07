


(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["q", "ItemService"],
            function(Q, ItemService) {
                return (root.GalleryService = factory(Q, ItemService));
            });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.GalleryService = factory(
                require('q'),
                require('./item')
            )
        );
    } else {
        GeoPlatform.GalleryService = factory(Q, GeoPlatform.ItemService);
    }
}(this||window, function(Q, ItemService) {


    'use strict';

    /**
     * GeoPlatform Map service
     * service for working with the GeoPlatform API to
     * retrieve and manipulate map objects.
     *
     * @see GeoPlatform.ItemService
     */

    class GalleryService extends ItemService {

        constructor(url, httpClient) {
            super(url, httpClient);
        }

        setUrl(baseUrl) {
            super.setUrl(baseUrl);
            this.baseUrl = baseUrl + '/api/galleries';
        }

        addItem (galleryId, itemObj, options) {
            return Q.resolve( true )
            .then( () => {
                let url = this.baseUrl + '/' + galleryId + '/items';
                let opts = this.buildRequest({
                    method:'POST', url:url, data: itemObj, options:options
                });
                return this.execute(opts);
            })
            .catch(e => {
                let err = new Error("GalleryService.addItem() - Error adding item: " + e.message);
                return Q.reject(err);
            });
        }

        removeItem( galleryId, itemId, options) {
            return Q.resolve( this.baseUrl + '/' + galleryId + '/items/' + itemId )
            .then( url => {
                let opts = this.buildRequest({
                    method:'DELETE', url:url, options:options
                });
                return this.execute(opts);
            })
            .then(response=>true)
            .catch(e => {
                let err = new Error("GalleryService.addItem() - Error adding item: " + e.message);
                return Q.reject(err);
            });
        }

    }

    return GalleryService;

}));
