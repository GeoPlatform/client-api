import { HttpClient } from '@angular/common/http';
import {
    Config, GPHttpClient,
    ItemService, UtilsService, TrackingService,
    DatasetService, ServiceService, LayerService,
    MapService, GalleryService, AgolService
} from "@geoplatform/client";

import { NG2HttpClient } from '../http/ng';


interface ServiceArgs {
    url: string;
    http ?: HttpClient;
    client ?: GPHttpClient;
    provider ?: any;
}

const ARGS_ERROR = "Must provide either an HttpClient or a GPHttpClient when constructing services";

function itemServiceFactory   (args : ServiceArgs) { return serviceFactory(ItemService,    args); }
function datasetServiceFactory(args : ServiceArgs) { return serviceFactory(DatasetService, args); }
function serviceServiceFactory(args : ServiceArgs) { return serviceFactory(ServiceService, args); }
function layerServiceFactory  (args : ServiceArgs) { return serviceFactory(LayerService,   args); }
function mapServiceFactory    (args : ServiceArgs) { return serviceFactory(MapService,     args); }
function galleryServiceFactory(args : ServiceArgs) { return serviceFactory(GalleryService, args); }
function utilsServiceFactory  (args : ServiceArgs) { return serviceFactory(UtilsService,   args); }
function agolServiceFactory  (args : ServiceArgs)  { return serviceFactory(AgolService,   args); }
function trackingServiceFactory(args: ServiceArgs) { return serviceFactory(TrackingService, args); }

function serviceFactory(clazz : any, args : ServiceArgs) {

    if(TrackingService === clazz) {
        if(!args.provider) {
            throw new Error("Must specify a provider when constructing TrackingService instances");
        }
        return new TrackingService(args.provider);
    }

    let client = args.client;
    if(args.http) client = new NG2HttpClient(args.http);
    if(!client) throw new Error(ARGS_ERROR);
    return new clazz(args.url, client);
}





export {
    ServiceArgs,
    itemServiceFactory,
    datasetServiceFactory,
    serviceServiceFactory,
    layerServiceFactory,
    mapServiceFactory,
    galleryServiceFactory,
    utilsServiceFactory,
    agolServiceFactory,
    serviceFactory
}
