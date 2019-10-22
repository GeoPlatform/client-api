
import * as angular from "angular";
import {
    Config, Query, QueryFactory, Item, SearchResults, GPHttpClient,
    ItemService, UtilsService, TrackingService, AssociationService,
    DatasetService, ServiceService, LayerService, MapService, GalleryService
} from "@geoplatform/client";

import NGHttpClient from '../http/ng';




/*
 * NOTICE:
 *
 * These services are angular aware (using angular's $q wrapper)
 * to ensure that any Promises returned are ultimately gated
 * through a $q instance and therefore will trigger a digest
 * upon completion.
 *
 * If you manually create an instance that is not angular aware,
 * you will need to wrap any response handler's manipulation of data
 * with $scope.$apply, $timeout, or an equivalent to trigger a digest
 */



/** Angular-aware instance of ItemService */
class NGItemService extends ItemService {

    private $q : any;

    constructor(url : string, httpClient : GPHttpClient, $q : any) {
        super(url, httpClient);
        this.$q = $q;
    }

    createPromise ( arg: (resolve: (value?: any) => void, reject: (reason?: any) => void) => void ) : Promise<any> {
        return this.$q( arg );
    }
    createAndResolvePromise( value : any ) : Promise<any> {
        return this.$q.resolve(value);
    }
    createAndRejectPromise ( error : Error ) : Promise<any>{
        return this.$q.reject(error);
    }

}


/** Angular-aware instance of DatasetService */
class NGDatasetService extends DatasetService {

    private $q : any;

    constructor(url : string, httpClient : GPHttpClient, $q : any) {
        super(url, httpClient);
        this.$q = $q;
    }

    createPromise ( arg: (resolve: (value?: any) => void, reject: (reason?: any) => void) => void ) : Promise<any> {
        return this.$q( arg );
    }
    createAndResolvePromise( value : any ) : Promise<any> {
        return this.$q.resolve(value);
    }
    createAndRejectPromise ( error : Error ) : Promise<any>{
        return this.$q.reject(error);
    }

}


/** Angular-aware instance of GalleryService */
class NGGalleryService extends GalleryService {

    private $q : any;

    constructor(url : string, httpClient : GPHttpClient, $q : any) {
        super(url, httpClient);
        this.$q = $q;
    }

    createPromise ( arg: (resolve: (value?: any) => void, reject: (reason?: any) => void) => void ) : Promise<any> {
        return this.$q( arg );
    }
    createAndResolvePromise( value : any ) : Promise<any> {
        return this.$q.resolve(value);
    }
    createAndRejectPromise ( error : Error ) : Promise<any>{
        return this.$q.reject(error);
    }

}


/** Angular-aware instance of LayerService */
class NGLayerService extends LayerService {

    private $q : any;

    constructor(url : string, httpClient : GPHttpClient, $q : any) {
        super(url, httpClient);
        this.$q = $q;
    }

    createPromise ( arg: (resolve: (value?: any) => void, reject: (reason?: any) => void) => void ) : Promise<any> {
        return this.$q( arg );
    }
    createAndResolvePromise( value : any ) : Promise<any> {
        return this.$q.resolve(value);
    }
    createAndRejectPromise ( error : Error ) : Promise<any>{
        return this.$q.reject(error);
    }

}


/** Angular-aware instance of MapService */
class NGMapService extends MapService {

    private $q : any;

    constructor(url : string, httpClient : GPHttpClient, $q : any) {
        super(url, httpClient);
        this.$q = $q;
    }

    createPromise ( arg: (resolve: (value?: any) => void, reject: (reason?: any) => void) => void ) : Promise<any> {
        return this.$q( arg );
    }
    createAndResolvePromise( value : any ) : Promise<any> {
        return this.$q.resolve(value);
    }
    createAndRejectPromise ( error : Error ) : Promise<any>{
        return this.$q.reject(error);
    }

}


/** Angular-aware instance of ServiceService */
class NGServiceService extends ServiceService {

    private $q : any;

    constructor(url : string, httpClient : GPHttpClient, $q : any) {
        super(url, httpClient);
        this.$q = $q;
    }

    createPromise ( arg: (resolve: (value?: any) => void, reject: (reason?: any) => void) => void ) : Promise<any> {
        return this.$q( arg );
    }
    createAndResolvePromise( value : any ) : Promise<any> {
        return this.$q.resolve(value);
    }
    createAndRejectPromise ( error : Error ) : Promise<any>{
        return this.$q.reject(error);
    }

}


/** Angular-aware instance of UtilsService */
class NGUtilsService extends UtilsService {

    private $q : any;

    constructor(url : string, httpClient : GPHttpClient, $q : any) {
        super(url, httpClient);
        this.$q = $q;
    }

    createPromise ( arg: (resolve: (value?: any) => void, reject: (reason?: any) => void) => void ) : Promise<any> {
        return this.$q( arg );
    }
    createAndResolvePromise( value : any ) : Promise<any> {
        return this.$q.resolve(value);
    }
    createAndRejectPromise ( error : Error ) : Promise<any>{
        return this.$q.reject(error);
    }

}

/** Angular-aware instance of AssociationService */
class NGAssociationService extends AssociationService {

    private $q : any;

    constructor(url : string, httpClient : GPHttpClient, $q : any) {
        super(url, httpClient);
        this.$q = $q;
    }

    createPromise ( arg: (resolve: (value?: any) => void, reject: (reason?: any) => void) => void ) : Promise<any> {
        return this.$q( arg );
    }
    createAndResolvePromise( value : any ) : Promise<any> {
        return this.$q.resolve(value);
    }
    createAndRejectPromise ( error : Error ) : Promise<any>{
        return this.$q.reject(error);
    }

}



export {
    NGItemService,
    NGDatasetService,
    NGServiceService,
    NGLayerService,
    NGMapService,
    NGGalleryService,
    NGUtilsService,
    NGAssociationService
}
