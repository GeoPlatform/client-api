
const Q = require('Q');
const NodeItemService = require('./item');
const Query = require('../../shared/query');
const ItemTypes = require('../../shared/types');


class NodeServiceService extends NodeItemService {

    constructor(url) {
        super( url );
    }

    setUrl(baseUrl) {
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
                throw new Error("Must provide service to get metadata about");
            }

            let opts = this.buildRequest('POST', this.baseUrl + '/about', svc, options);
            return this.execute(opts);
        })
        .then( response => response.body )
        .catch(e => {
            let err = new Error(`NodeServiceService.about() -
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
            let opts = this.buildRequest('GET', url, params, options);
            return this.execute(opts);
        })
        .then( response => response.body.results )
        .catch(e => {
            let err = new Error(`NodeServiceService.types() -
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
            let opts = this.buildRequest('POST', url, svc, options);
            return this.execute(opts);
        })
        .then( response => response.body.results )
        .catch(e => {
            let err = new Error(`NodeServiceService.import() -
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
            let opts = this.buildRequest('GET', url, null, options);
            return this.execute(opts);
        })
        .then( response => response.body )
        .catch(e => {
            let err = new Error(`NodeServiceService.harvest() -
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
            let opts = this.buildRequest('GET', url, null, options);
            return this.execute(opts);
        })
        .then( response => response.body )
        .catch(e => {
            let err = new Error(`NodeServiceService.liveTest() -
                Error testing service: ${e.message}`);
            return Q.reject(err);
        });
    }

}

module.exports = NodeServiceService;
