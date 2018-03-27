


(function (root, factory) {
    if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.ServiceService = factory(
                require('q'),
                require('../shared/types'),
                require('./item')
            )
        );
    } else if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define('ServiceService', ["q", "../shared/types", "./item"],
            function(Q, ItemTypes, ItemService) {
                return (root.ServiceService =
                    factory(Q, ItemTypes, ItemService));
            });
    } else {
        GeoPlatform.ServiceService = factory(
            Q, GeoPlatform.ItemTypes,
            GeoPlatform.ItemService);
    }
}(this||window, function(Q, ItemTypes, ItemService) {

    'use strict';

    /**
     * GeoPlatform Service service
     * service for working with the GeoPlatform API to
     * retrieve and manipulate service objects.
     *
     * @see ItemService
     */

    class ServiceService extends ItemService {

        constructor(url, httpClient) {
            super(url, httpClient);
        }

        setUrl(baseUrl) {
            super.setUrl(baseUrl);
            this.baseUrl = baseUrl + '/api/services';
        }


        /**
         * Fetch metadata from the specified GeoPlatform Service's
         * web-accessible implementation using either GetCapabilities
         * or ESRI documentInfo.
         * @param {Object} service - GeoPlatform Service object
         * @param {Object} options - optional set of request options to apply to xhr request
         * @return {Promise} resolving service metadata
         */
        about( service, options ) {

            return Q.resolve( service )
            .then( svc => {
                if(!svc)
                    throw new Error("Must provide service to get metadata about");
                let opts = this.buildRequest({
                    method:'POST', url:this.baseUrl + '/about', data:svc, options:options
                });
                return this.execute(opts);
            })
            .catch(e => {
                let err = new Error(`ServiceService.about() -
                    Error describing service: ${e.message}`);
                return Q.reject(err);
            });
        }



        /**
         * @param {Object} options - optional set of request options to apply to request
         * @return {Promise} resolving service types
         */
        types (options) {

            let query = new Query()
            .types(ItemTypes.STANDARD)
            .resourceTypes('ServiceType')
            .pageSize(50)
            .getQuery();

            return Q.resolve( query )
            .then( (params) => {
                let url = this.apiBase + '/api/items';
                let opts = this.buildRequest({
                    method:'GET', url:url, params:params, options:options
                });
                return this.execute(opts);
            })
            .then(response => response.results)
            .catch(e => {
                let err = new Error(`ServiceService.types() -
                    Error fetching service types: ${e.message}`);
                return Q.reject(err);
            });
        }


        /**
         * @param {Object} service - GP Service definition
         * @param {Object} options - optional set of request options to apply to request
         * @return {Promise} resolving imported service
         */
        import (service, options) {

            return Q.resolve( service )
            .then( svc => {
                let url = this.baseUrl + '/import';
                let opts = this.buildRequest({
                    method:'POST', url:url, data:svc, options:options
                });
                return this.execute(opts);
            })
            .catch(e => {
                let err = new Error(`ServiceService.import() -
                    Error importing service: ${e.message}`);
                return Q.reject(err);
            });
        }


        /**
         * @param {string} id - identifier of GP service to harvest layers for
         * @param {Object} options - optional set of request options to apply to request
         * @return {Promise} resolving service layers
         */
        harvest (id, options) {

            return Q.resolve( id )
            .then( id => {
                let url = this.baseUrl + '/' + id + '/harvest';
                let opts = this.buildRequest({
                    method:'GET', url:url, options:options
                });
                return this.execute(opts);
            })
            .catch(e => {
                let err = new Error(`ServiceService.harvest() -
                    Error harvesting layers from service: ${e.message}`);
                return Q.reject(err);
            });

        }

        /**
         * @param {string} id - identifier of GP service to live test
         * @param {Object} options - optional set of request options to apply to request
         * @return {Promise} resolving service statistics
         */
        liveTest (id, options) {

            return Q.resolve( id )
            .then( id => {
                let url = this.baseUrl + '/' + id + '/test';
                let opts = this.buildRequest({
                    method:'GET', url:url, options:options
                });
                return this.execute(opts);
            })
            .catch(e => {
                let err = new Error(`ServiceService.liveTest() -
                    Error testing service: ${e.message}`);
                return Q.reject(err);
            });
        }

        /**
         * @param {string} id - identifier of GP service to fetch statistics about
         * @param {Object} options - optional set of request options to apply to request
         * @return {Promise} resolving service statistics
         */
        statistics (id, options) {
            return Q.resolve( id )
            .then( id => {
                let url = this.baseUrl + '/' + id + '/statistics';
                let opts = this.buildRequest({
                    method:'GET', url:url, options:options
                });
                return this.execute(opts);
            })
            .catch(e => {
                let err = new Error(`ServiceService.statistics() -
                    Error getting service statistics: ${e.message}`);
                return Q.reject(err);
            });
        }

    }

    return ServiceService;

}));
