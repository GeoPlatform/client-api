

import ItemTypes from '../shared/types';
import ItemService from './item';
import Query from '../shared/query';
import GPHttpClient from '../http/client';

/**
 * GeoPlatform Service service
 * service for working with the GeoPlatform API to
 * retrieve and manipulate service objects.
 *
 * @see ItemService
 */

class ServiceService extends ItemService {

    constructor(url:string, httpClient:GPHttpClient) {
        super(url, httpClient);
    }

    setUrl(baseUrl:string) {
        super.setUrl(baseUrl);
        this.baseUrl = baseUrl + '/api/services';
    }


    /**
     * Fetch metadata from the specified GeoPlatform Service's
     * web-accessible implementation using either GetCapabilities
     * or ESRI documentInfo.
     * @param service - GeoPlatform Service object
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving service metadata
     */
    about( service : any, options ?: any ) : Promise<any> {

        return Promise.resolve( service )
        .then( svc => {
            if(!svc)
                throw new Error("Must provide service to get metadata about");
            let opts = this.buildRequest({
                method:'POST', url:this.baseUrl + '/about', data:svc, options:options
            });
            return this.execute(opts);
        })
        .catch(e => {
            let err = new Error(`Error describing service: ${e.message}`);
            Object.assign(err, e);
            this.logError('ServiceService.about() - ' + err.message);
            return Promise.reject(err);
        });
    }



    /**
     * @param options - optional set of request options to apply to request
     * @return Promise resolving service types
     */
    types (options ?: any) : Promise<any> {

        let query = new Query()
        .types(ItemTypes.STANDARD)
        .resourceTypes('ServiceType')
        .pageSize(50)
        .getQuery();

        return Promise.resolve( query )
        .then( (params) => {
            let url = this.apiBase + '/api/items';
            let opts = this.buildRequest({
                method:'GET', url:url, params:params, options:options
            });
            return this.execute(opts);
        })
        .then(response => response.results)
        .catch(e => {
            let err = new Error(`Error fetching service types: ${e.message}`);
            Object.assign(err, e);
            this.logError('ServiceService.types() - ' + err.message);
            return Promise.reject(err);
        });
    }


    /**
     * @param service - GP Service definition
     * @param options - optional set of request options to apply to request
     * @return Promise resolving imported service
     */
    import (service : any, options ?: any) : Promise<any> {

        return Promise.resolve( service )
        .then( svc => {
            let url = this.baseUrl + '/import';
            let opts = this.buildRequest({
                method:'POST', url:url, data:svc, options:options
            });
            return this.execute(opts);
        })
        .catch(e => {
            let err = new Error(`Error importing service: ${e.message}`);
            Object.assign(err, e);
            this.logError('ServiceService.import() - ' + err.message);
            return Promise.reject(err);
        });
    }


    /**
     * @param id - identifier of GP service to harvest layers for
     * @param options - optional set of request options to apply to request
     * @return Promise resolving service layers
     */
    harvest (id : string, options ?: any) : Promise<any> {

        return Promise.resolve( id )
        .then( id => {
            let url = this.baseUrl + '/' + id + '/harvest';
            let opts = this.buildRequest({
                method:'GET', url:url, options:options
            });
            return this.execute(opts);
        })
        .catch(e => {
            let err = new Error(`Error harvesting layers from service: ${e.message}`);
            Object.assign(err, e);
            this.logError('ServiceService.harvest() - ' + err.message);
            return Promise.reject(err);
        });

    }

    /**
     * @param id - identifier of GP service to live test
     * @param options - optional set of request options to apply to request
     * @return Promise resolving service statistics
     */
    liveTest (id : string, options ?: any) : Promise<any> {

        return Promise.resolve( id )
        .then( id => {
            let url = this.baseUrl + '/' + id + '/test';
            let opts = this.buildRequest({
                method:'GET', url:url, options:options
            });
            return this.execute(opts);
        })
        .catch(e => {
            let err = new Error(`Error testing service: ${e.message}`);
            Object.assign(err, e);
            this.logError('ServiceService.liveTest() - '  + err.message);
            return Promise.reject(err);
        });
    }

    /**
     * @param id - identifier of GP service to fetch statistics about
     * @param options - optional set of request options to apply to request
     * @return Promise resolving service statistics
     */
    statistics (id : string, options ?: any) : Promise<any> {
        return Promise.resolve( id )
        .then( id => {
            let url = this.baseUrl + '/' + id + '/statistics';
            let opts = this.buildRequest({
                method:'GET', url:url, options:options
            });
            return this.execute(opts);
        })
        .catch(e => {
            let err = new Error(`Error getting service statistics: ${e.message}`);
            Object.assign(err, e);
            this.logError('ServiceService.statistics() - ' + err.message);
            return Promise.reject(err);
        });
    }

}

export default ServiceService;
