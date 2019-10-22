

import BaseService from './base';
import GPHttpClient from '../http/client';

/**
 * GeoPlatform Association service
 * service for working with the GeoPlatform API to
 * retrieve and manipulate association objects.
 *
 * @see GeoPlatform.ItemService
 */

class AssociationService extends BaseService {

    constructor(url:string, httpClient:GPHttpClient) {
        super(url, httpClient);
    }


    /**
     * @param itemId - identifier of item to fetch associations for
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving array of associated items of the item in question
     */
    search (itemId : string, params ?: any, options ?: any) : Promise<any> {

        return this.createAndResolvePromise( itemId )
        .then( id => {

            if(!id) throw new Error("Must specify a GeoPlatform resource for which to search associations");

            let url = this.baseUrl + '/' + id + '/associations';
            let opts = this.buildRequest({
                method:"GET",
                url:url,
                params: params || {},
                options: options
            });
            return this.execute(opts);
        })
        .catch(e => {
            let err = new Error(`Error fetching associations for item ${itemId}: ${e.message}`);
            Object.assign(err, e);
            this.logError(`AssociationService.search(${itemId}) - ${err.message}`);
            throw err;
        });
    }

    /**
     * @param itemId - identifier of item
     * @param associationId - identifier of association to fetch
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving association
     */
    get (itemId : string, associationId : string, options ?: any) : Promise<any> {

        return this.createAndResolvePromise( itemId )
        .then( itemId => {

            if(!itemId || !associationId)
                throw new Error("Must specify both the GeoPlatform resource id and its association's id");

            let url = this.baseUrl + '/' + itemId + '/associations/' + associationId;
            let opts = this.buildRequest({ method:"GET", url:url, options: options });
            return this.execute(opts);
        })
        .catch(e => {
            let err = new Error(`Error fetching association for item ${itemId}: ${e.message}`);
            Object.assign(err, e);
            this.logError(`AssociationService.get(${itemId},${associationId}) - ${err.message}`);
            throw err;
        });
    }

    /**
     * @param itemId - identifier of item
     * @param associationId - identifier of association to remove
     * @param options - optional set of request options to apply to xhr request
     * @return Promise resolving empty
     */
    remove (itemId : string, associationId : string, options ?: any) : Promise<any> {

        return this.createAndResolvePromise( itemId )
        .then( itemId => {

            if(!itemId || !associationId)
                throw new Error("Must specify both the GeoPlatform resource id and its association's id");

            let url = this.baseUrl + '/' + itemId + '/associations/' + associationId;
            let opts = this.buildRequest({ method:"DELETE", url:url, options: options });
            return this.execute(opts);
        })
        .catch(e => {
            let err = new Error(`Error removing association for item ${itemId}: ${e.message}`);
            Object.assign(err, e);
            this.logError(`AssociationService.remove(${itemId},${associationId}) - ${err.message}`);
            throw err;
        });
    }

}

export default AssociationService;
