
import NGHttpClient from './http/ng';


import * as angular from "angular";
import {
    Config, Query, QueryFactory, Item, SearchResults, GPHttpClient,
    ItemService, UtilsService, TrackingService, AssociationService,
    DatasetService, ServiceService, LayerService, MapService, GalleryService
} from "@geoplatform/client";

import {
    NGItemService, NGDatasetService, NGServiceService,
    NGLayerService, NGMapService, NGGalleryService,
    NGUtilsService, NGAssociationService
} from './services/index';


if(angular && typeof(angular.module) !== 'undefined') {

    let serviceFactory = function(gpNgHttpClient, svcClass, url, $q) {
        if( NGItemService === svcClass    || NGDatasetService === svcClass ||
            NGServiceService === svcClass || NGLayerService === svcClass ||
            NGMapService === svcClass     || NGGalleryService === svcClass ||
            NGUtilsService === svcClass   || NGAssociationService === svcClass ) {
            return new svcClass( url, gpNgHttpClient, $q);
        }
        return new svcClass( url, gpNgHttpClient );
    }

    /*
     * Define AngularJS module that can be included in downstream applications
     *
     * Example:
     *
     *  angular.module('myApp', [ 'ui-router', 'gpClient' ])
     *  .component('myComponent', {
     *    bindings: { },
     *    template: "<div></div>",
     *    controller: function(gpQueryFactory, gpItemService) {
     *       this.$onInit = function() {
     *          gpItemService.search( gpQueryFactory() ).then( response => { ... });
     *       };
     *    }
     *  ]);
     */
    angular.module('gpClient', [])

    .provider('gpConfig', function() {
        return {
            $get: function() {
                return Config;
            }
        };
    })

    .factory('gpQueryFactory', function() { return QueryFactory; })

    .factory('gpNgHttpClient', ['$http', '$q',
        function( $http, $q ) {
            return new NGHttpClient({ $http : $http, $q: $q });
        }
    ])

    .factory('gpTrackingServiceFactory', function() {
        return function(options) {
            return new TrackingService( options );
        };
    })

    ;


    /*
     * Expose Service instances in the 'gpClient' module
     * These services are angular aware using angular's $q wrapper
     */
    const serviceClasses = {
        'gpItemService'       : NGItemService,
        'gpUtilsService'      : NGUtilsService,
        'gpDatasetService'    : NGDatasetService,
        'gpServiceService'    : NGServiceService,
        'gpLayerService'      : NGLayerService,
        'gpMapService'        : NGMapService,
        'gpGalleryService'    : NGGalleryService,
        'gpAssociationService': NGAssociationService
    };

    Object.keys(serviceClasses).forEach( (name) => {

        let svcClass = serviceClasses[name];

        angular.module('gpClient')

        /*
            Service for each client service class that uses the
            currently configured settings when created.  Note the
            settings may change after the service singleton is
            created, in which case the factory option should be used.
         */
        .service(name, [ 'gpNgHttpClient', 'gpConfig', '$q',
            function( gpNgHttpClient, gpConfig, $q ) {
                return serviceFactory(gpNgHttpClient, svcClass, gpConfig.ualUrl, $q);
            }
        ])

        /*
            Factory for creating services for each client service class
            which uses a customizable endpoint to request data from. Use
            this if services need to be able to change API endpoints
            during application runtime.
         */
        .factory(name+'Factory', [ 'gpNgHttpClient', 'gpConfig', '$q',
            function( gpNgHttpClient, gpConfig, $q ) {
                return function( url ?: string ) {
                    return serviceFactory(
                        gpNgHttpClient,
                        svcClass,
                        url || gpConfig.ualUrl,
                        $q
                    );
                };
            }
        ]);

    });
}



export { NGHttpClient };
