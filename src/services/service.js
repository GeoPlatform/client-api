


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
                require('./item'),
                require('../models/factory'),
                require('../shared/query-factory')
            )
        );
    } else if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define('ServiceService', ["q", "../shared/types", "./item", "../models/factory", "../shared/query-factory"],
            function(Q, ItemTypes, ItemService, ItemFactory, QueryFactory) {
                return (root.ServiceService =
                    factory(Q, ItemTypes, ItemService, ItemFactory, QueryFactory));
            });
    } else {
        GeoPlatform.ServiceService = factory(
            Q, GeoPlatform.ItemTypes,
            GeoPlatform.ItemService,
            GeoPlatform.ItemFactory,
            GeoPlatform.QueryFactory
        );
    }
}(this||window, function(Q, ItemTypes, ItemService, ItemFactory, QueryFactory) {

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
                if(!svc) {
                    let err = new Error("Must provide service to get metadata about");
                    err.status = 400;
                    err.error = "Bad Request";
                    throw err;
                }
                let opts = this.buildRequest({
                    method:'POST', url:this.baseUrl + '/about', data:svc, options:options
                });
                return this.execute(opts);
            })
            .catch(e => this._onError(e, "ServiceService.about() - Error describing service") );
        }



        /**
         * @param {Object} options - optional set of request options to apply to request
         * @return {Promise} resolving service types
         */
        types (options) {

            let query = QueryFactory()
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
            .catch(e => this._onError(e, "ServiceService.types() - Error fetching service types") );
        }


        /**
         * @param {Object} service - GP Service definition
         * @param {Object} options - optional set of request options to apply to request
         * @return {Promise} resolving imported service
         */
        import (service, options) {

            return Q.resolve( service )
            .then( svc => {

                if(svc.toJson) {
                    //if passed an ItemModel instance, convert to JSON
                    svc = svc.toJson();
                }

                let url = this.baseUrl + '/import';
                let opts = this.buildRequest({
                    method:'POST', url:url, data:svc, options:options
                });
                return this.execute(opts);
            })
            .then(obj => ItemFactory(obj))
            .catch(e => this._onError(e, "ServiceService.import() - Error importing service") );
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
            .catch(e => this._onError(e, "ServiceService.harvest() - Error harvesting layers from service") );

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
            .catch(e => this._onError(e, "ServiceService.liveTest() - Error testing service") );
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
            .catch(e => this._onError(e, "ServiceService.statistics() - Error getting service statistics") );
        }

    }

    return ServiceService;

}));
