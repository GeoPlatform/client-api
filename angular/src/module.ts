import { NgModule, ModuleWithProviders, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import {
    Config, GPHttpClient,
    ItemService, DatasetService, ServiceService,
    LayerService, MapService, GalleryService, UtilsService
} from '@geoplatform/client';

import NG2HttpClient from './http/ng';


export function ng2HttpClientFactory( http : HttpClient ) {
    return new NG2HttpClient(http);
}
export function itemServiceProviderFactory( http : HttpClient ) {
    let client = ng2HttpClientFactory(http);
    return new ItemService(Config.ualUrl, client);
}
export function datasetServiceProviderFactory( http : HttpClient ) {
    let client = ng2HttpClientFactory(http);
    return new DatasetService(Config.ualUrl, client);
}
export function serviceServiceProviderFactory( http : HttpClient ) {
    let client = ng2HttpClientFactory(http);
    return new ServiceService(Config.ualUrl, client);
}
export function layerServiceProviderFactory( http : HttpClient ) {
    let client = ng2HttpClientFactory(http);
    return new LayerService(Config.ualUrl, client);
}
export function mapServiceProviderFactory( http : HttpClient ) {
    let client = ng2HttpClientFactory(http);
    return new MapService(Config.ualUrl, client);
}
export function galleryServiceProviderFactory( http : HttpClient ) {
    let client = ng2HttpClientFactory(http);
    return new GalleryService(Config.ualUrl, client);
}
export function utilsServiceProviderFactory( http : HttpClient ) {
    let client = ng2HttpClientFactory(http);
    return new UtilsService(Config.ualUrl, client);
}


@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        {
            provide:    NG2HttpClient,
            useFactory: ng2HttpClientFactory,
            deps:       [ HttpClient ]
        },
        {
            provide:    ItemService,
            useFactory: itemServiceProviderFactory,
            deps:       [ HttpClient ]
        },
        {
            provide:    DatasetService,
            useFactory: datasetServiceProviderFactory,
            deps:       [ HttpClient ]
        },
        {
            provide:    ServiceService,
            useFactory: serviceServiceProviderFactory,
            deps:       [ HttpClient ]
        },
        {
            provide:    LayerService,
            useFactory: layerServiceProviderFactory,
            deps:       [ HttpClient ]
        },
        {
            provide:    MapService,
            useFactory: mapServiceProviderFactory,
            deps:       [ HttpClient ]
        },
        {
            provide:    GalleryService,
            useFactory: galleryServiceProviderFactory,
            deps:       [ HttpClient ]
        },
        {
            provide:    UtilsService,
            useFactory: utilsServiceProviderFactory,
            deps:       [ HttpClient ]
        }
    ]
})
export class GeoPlatformClientModule { }
