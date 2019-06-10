
import NGHttpClient from './http/ng';


import * as angular from "angular";
import {
    Config, Query, QueryFactory,
    ItemService, UtilsService, TrackingService,
    DatasetService, ServiceService, LayerService, MapService, GalleryService
} from "@geoplatform/client";

if(angular && typeof(angular.module) !== 'undefined') {

    let serviceFactory = function(gpNgHttpClient, svcClass, url) {
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

    .factory('gpNgHttpClient', ['$http',
        function( $http ) {
            return new NGHttpClient({ $http : $http });
        }
    ])

    .factory('gpTrackingServiceFactory', function() {
        return function(options) {
            return new TrackingService( options );
        };
    })

    ;


    const serviceClasses = {
        'gpItemService': ItemService,
        'gpUtilsService': UtilsService,
        'gpDatasetService': DatasetService,
        'gpServiceService': ServiceService,
        'gpLayerService': LayerService,
        'gpMapService': MapService,
        'gpGalleryService': GalleryService
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
        .service(name, ['gpNgHttpClient', 'gpConfig',
            function(gpNgHttpClient, gpConfig) {
                return serviceFactory(gpNgHttpClient, svcClass, gpConfig.ualUrl);
            }
        ])

        /*
            Factory for creating services for each client service class
            which uses a customizable endpoint to request data from. Use
            this if services need to be able to change API endpoints
            during application runtime.
         */
        .factory(name+'Factory', ['gpNgHttpClient', function(gpNgHttpClient) {
            return function(url) {
                return serviceFactory(gpNgHttpClient, svcClass, url);
            };
        }]);

    });
}



export { NGHttpClient };
