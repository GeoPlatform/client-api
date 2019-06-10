/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import NGHttpClient from './http/ng';
import * as angular from "angular";
import { Config, QueryFactory, ItemService, UtilsService, TrackingService, DatasetService, ServiceService, LayerService, MapService, GalleryService } from "@geoplatform/client";
if (angular && typeof (angular.module) !== 'undefined') {
    /** @type {?} */
    let serviceFactory = function (gpNgHttpClient, svcClass, url) {
        return new svcClass(url, gpNgHttpClient);
    };
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
        .provider('gpConfig', function () {
        return {
            $get: function () {
                return Config;
            }
        };
    })
        .factory('gpQueryFactory', function () { return QueryFactory; })
        .factory('gpNgHttpClient', ['$http',
        function ($http) {
            return new NGHttpClient({ $http: $http });
        }
    ])
        .factory('gpTrackingServiceFactory', function () {
        return function (options) {
            return new TrackingService(options);
        };
    });
    /** @type {?} */
    const serviceClasses = {
        'gpItemService': ItemService,
        'gpUtilsService': UtilsService,
        'gpDatasetService': DatasetService,
        'gpServiceService': ServiceService,
        'gpLayerService': LayerService,
        'gpMapService': MapService,
        'gpGalleryService': GalleryService
    };
    Object.keys(serviceClasses).forEach((name) => {
        /** @type {?} */
        let svcClass = serviceClasses[name];
        angular.module('gpClient')
            /*
                Service for each client service class that uses the
                currently configured settings when created.  Note the
                settings may change after the service singleton is
                created, in which case the factory option should be used.
             */
            .service(name, ['gpNgHttpClient', 'gpConfig',
            function (gpNgHttpClient, gpConfig) {
                return serviceFactory(gpNgHttpClient, svcClass, gpConfig.ualUrl);
            }
        ])
            /*
                Factory for creating services for each client service class
                which uses a customizable endpoint to request data from. Use
                this if services need to be able to change API endpoints
                during application runtime.
             */
            .factory(name + 'Factory', ['gpNgHttpClient', function (gpNgHttpClient) {
                return function (url) {
                    return serviceFactory(gpNgHttpClient, svcClass, url);
                };
            }]);
    });
}
export { NGHttpClient };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50L2FuZ3VsYXJqcy8iLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLFlBQVksTUFBTSxXQUFXLENBQUM7QUFHckMsT0FBTyxLQUFLLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFDbkMsT0FBTyxFQUNILE1BQU0sRUFBUyxZQUFZLEVBQzNCLFdBQVcsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUMxQyxjQUFjLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUMzRSxNQUFNLHFCQUFxQixDQUFDO0FBRTdCLElBQUcsT0FBTyxJQUFJLE9BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssV0FBVyxFQUFFOztJQUVsRCxJQUFJLGNBQWMsR0FBRyxVQUFTLGNBQWMsRUFBRSxRQUFRLEVBQUUsR0FBRztRQUN2RCxPQUFPLElBQUksUUFBUSxDQUFFLEdBQUcsRUFBRSxjQUFjLENBQUUsQ0FBQztLQUM5QyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7OztJQWtCRCxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUM7U0FFN0IsUUFBUSxDQUFDLFVBQVUsRUFBRTtRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLE9BQU8sTUFBTSxDQUFDO2FBQ2pCO1NBQ0osQ0FBQztLQUNMLENBQUM7U0FFRCxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsY0FBYSxPQUFPLFlBQVksQ0FBQyxFQUFFLENBQUM7U0FFOUQsT0FBTyxDQUFDLGdCQUFnQixFQUFFLENBQUMsT0FBTztRQUMvQixVQUFVLEtBQUs7WUFDWCxPQUFPLElBQUksWUFBWSxDQUFDLEVBQUUsS0FBSyxFQUFHLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDOUM7S0FDSixDQUFDO1NBRUQsT0FBTyxDQUFDLDBCQUEwQixFQUFFO1FBQ2pDLE9BQU8sVUFBUyxPQUFPO1lBQ25CLE9BQU8sSUFBSSxlQUFlLENBQUUsT0FBTyxDQUFFLENBQUM7U0FDekMsQ0FBQztLQUNMLENBQUMsQ0FFRDs7SUFHRCxNQUFNLGNBQWMsR0FBRztRQUNuQixlQUFlLEVBQUUsV0FBVztRQUM1QixnQkFBZ0IsRUFBRSxZQUFZO1FBQzlCLGtCQUFrQixFQUFFLGNBQWM7UUFDbEMsa0JBQWtCLEVBQUUsY0FBYztRQUNsQyxnQkFBZ0IsRUFBRSxZQUFZO1FBQzlCLGNBQWMsRUFBRSxVQUFVO1FBQzFCLGtCQUFrQixFQUFFLGNBQWM7S0FDckMsQ0FBQztJQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsT0FBTyxDQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7O1FBRTFDLElBQUksUUFBUSxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVwQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztZQUUxQjs7Ozs7ZUFLRzthQUNGLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVO1lBQ3hDLFVBQVMsY0FBYyxFQUFFLFFBQVE7Z0JBQzdCLE9BQU8sY0FBYyxDQUFDLGNBQWMsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3BFO1NBQ0osQ0FBQztZQUVGOzs7OztlQUtHO2FBQ0YsT0FBTyxDQUFDLElBQUksR0FBQyxTQUFTLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFTLGNBQWM7Z0JBQy9ELE9BQU8sVUFBUyxHQUFHO29CQUNmLE9BQU8sY0FBYyxDQUFDLGNBQWMsRUFBRSxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7aUJBQ3hELENBQUM7YUFDTCxDQUFDLENBQUMsQ0FBQztLQUVQLENBQUMsQ0FBQztDQUNOO0FBSUQsT0FBTyxFQUFFLFlBQVksRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgTkdIdHRwQ2xpZW50IGZyb20gJy4vaHR0cC9uZyc7XG5cblxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tIFwiYW5ndWxhclwiO1xuaW1wb3J0IHtcbiAgICBDb25maWcsIFF1ZXJ5LCBRdWVyeUZhY3RvcnksXG4gICAgSXRlbVNlcnZpY2UsIFV0aWxzU2VydmljZSwgVHJhY2tpbmdTZXJ2aWNlLFxuICAgIERhdGFzZXRTZXJ2aWNlLCBTZXJ2aWNlU2VydmljZSwgTGF5ZXJTZXJ2aWNlLCBNYXBTZXJ2aWNlLCBHYWxsZXJ5U2VydmljZVxufSBmcm9tIFwiQGdlb3BsYXRmb3JtL2NsaWVudFwiO1xuXG5pZihhbmd1bGFyICYmIHR5cGVvZihhbmd1bGFyLm1vZHVsZSkgIT09ICd1bmRlZmluZWQnKSB7XG5cbiAgICBsZXQgc2VydmljZUZhY3RvcnkgPSBmdW5jdGlvbihncE5nSHR0cENsaWVudCwgc3ZjQ2xhc3MsIHVybCkge1xuICAgICAgICByZXR1cm4gbmV3IHN2Y0NsYXNzKCB1cmwsIGdwTmdIdHRwQ2xpZW50ICk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBEZWZpbmUgQW5ndWxhckpTIG1vZHVsZSB0aGF0IGNhbiBiZSBpbmNsdWRlZCBpbiBkb3duc3RyZWFtIGFwcGxpY2F0aW9uc1xuICAgICAqXG4gICAgICogRXhhbXBsZTpcbiAgICAgKlxuICAgICAqICBhbmd1bGFyLm1vZHVsZSgnbXlBcHAnLCBbICd1aS1yb3V0ZXInLCAnZ3BDbGllbnQnIF0pXG4gICAgICogIC5jb21wb25lbnQoJ215Q29tcG9uZW50Jywge1xuICAgICAqICAgIGJpbmRpbmdzOiB7IH0sXG4gICAgICogICAgdGVtcGxhdGU6IFwiPGRpdj48L2Rpdj5cIixcbiAgICAgKiAgICBjb250cm9sbGVyOiBmdW5jdGlvbihncFF1ZXJ5RmFjdG9yeSwgZ3BJdGVtU2VydmljZSkge1xuICAgICAqICAgICAgIHRoaXMuJG9uSW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgICAqICAgICAgICAgIGdwSXRlbVNlcnZpY2Uuc2VhcmNoKCBncFF1ZXJ5RmFjdG9yeSgpICkudGhlbiggcmVzcG9uc2UgPT4geyAuLi4gfSk7XG4gICAgICogICAgICAgfTtcbiAgICAgKiAgICB9XG4gICAgICogIF0pO1xuICAgICAqL1xuICAgIGFuZ3VsYXIubW9kdWxlKCdncENsaWVudCcsIFtdKVxuXG4gICAgLnByb3ZpZGVyKCdncENvbmZpZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIENvbmZpZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KVxuXG4gICAgLmZhY3RvcnkoJ2dwUXVlcnlGYWN0b3J5JywgZnVuY3Rpb24oKSB7IHJldHVybiBRdWVyeUZhY3Rvcnk7IH0pXG5cbiAgICAuZmFjdG9yeSgnZ3BOZ0h0dHBDbGllbnQnLCBbJyRodHRwJyxcbiAgICAgICAgZnVuY3Rpb24oICRodHRwICkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBOR0h0dHBDbGllbnQoeyAkaHR0cCA6ICRodHRwIH0pO1xuICAgICAgICB9XG4gICAgXSlcblxuICAgIC5mYWN0b3J5KCdncFRyYWNraW5nU2VydmljZUZhY3RvcnknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVHJhY2tpbmdTZXJ2aWNlKCBvcHRpb25zICk7XG4gICAgICAgIH07XG4gICAgfSlcblxuICAgIDtcblxuXG4gICAgY29uc3Qgc2VydmljZUNsYXNzZXMgPSB7XG4gICAgICAgICdncEl0ZW1TZXJ2aWNlJzogSXRlbVNlcnZpY2UsXG4gICAgICAgICdncFV0aWxzU2VydmljZSc6IFV0aWxzU2VydmljZSxcbiAgICAgICAgJ2dwRGF0YXNldFNlcnZpY2UnOiBEYXRhc2V0U2VydmljZSxcbiAgICAgICAgJ2dwU2VydmljZVNlcnZpY2UnOiBTZXJ2aWNlU2VydmljZSxcbiAgICAgICAgJ2dwTGF5ZXJTZXJ2aWNlJzogTGF5ZXJTZXJ2aWNlLFxuICAgICAgICAnZ3BNYXBTZXJ2aWNlJzogTWFwU2VydmljZSxcbiAgICAgICAgJ2dwR2FsbGVyeVNlcnZpY2UnOiBHYWxsZXJ5U2VydmljZVxuICAgIH07XG5cbiAgICBPYmplY3Qua2V5cyhzZXJ2aWNlQ2xhc3NlcykuZm9yRWFjaCggKG5hbWUpID0+IHtcblxuICAgICAgICBsZXQgc3ZjQ2xhc3MgPSBzZXJ2aWNlQ2xhc3Nlc1tuYW1lXTtcblxuICAgICAgICBhbmd1bGFyLm1vZHVsZSgnZ3BDbGllbnQnKVxuXG4gICAgICAgIC8qXG4gICAgICAgICAgICBTZXJ2aWNlIGZvciBlYWNoIGNsaWVudCBzZXJ2aWNlIGNsYXNzIHRoYXQgdXNlcyB0aGVcbiAgICAgICAgICAgIGN1cnJlbnRseSBjb25maWd1cmVkIHNldHRpbmdzIHdoZW4gY3JlYXRlZC4gIE5vdGUgdGhlXG4gICAgICAgICAgICBzZXR0aW5ncyBtYXkgY2hhbmdlIGFmdGVyIHRoZSBzZXJ2aWNlIHNpbmdsZXRvbiBpc1xuICAgICAgICAgICAgY3JlYXRlZCwgaW4gd2hpY2ggY2FzZSB0aGUgZmFjdG9yeSBvcHRpb24gc2hvdWxkIGJlIHVzZWQuXG4gICAgICAgICAqL1xuICAgICAgICAuc2VydmljZShuYW1lLCBbJ2dwTmdIdHRwQ2xpZW50JywgJ2dwQ29uZmlnJyxcbiAgICAgICAgICAgIGZ1bmN0aW9uKGdwTmdIdHRwQ2xpZW50LCBncENvbmZpZykge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlRmFjdG9yeShncE5nSHR0cENsaWVudCwgc3ZjQ2xhc3MsIGdwQ29uZmlnLnVhbFVybCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIF0pXG5cbiAgICAgICAgLypcbiAgICAgICAgICAgIEZhY3RvcnkgZm9yIGNyZWF0aW5nIHNlcnZpY2VzIGZvciBlYWNoIGNsaWVudCBzZXJ2aWNlIGNsYXNzXG4gICAgICAgICAgICB3aGljaCB1c2VzIGEgY3VzdG9taXphYmxlIGVuZHBvaW50IHRvIHJlcXVlc3QgZGF0YSBmcm9tLiBVc2VcbiAgICAgICAgICAgIHRoaXMgaWYgc2VydmljZXMgbmVlZCB0byBiZSBhYmxlIHRvIGNoYW5nZSBBUEkgZW5kcG9pbnRzXG4gICAgICAgICAgICBkdXJpbmcgYXBwbGljYXRpb24gcnVudGltZS5cbiAgICAgICAgICovXG4gICAgICAgIC5mYWN0b3J5KG5hbWUrJ0ZhY3RvcnknLCBbJ2dwTmdIdHRwQ2xpZW50JywgZnVuY3Rpb24oZ3BOZ0h0dHBDbGllbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VydmljZUZhY3RvcnkoZ3BOZ0h0dHBDbGllbnQsIHN2Y0NsYXNzLCB1cmwpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfV0pO1xuXG4gICAgfSk7XG59XG5cblxuXG5leHBvcnQgeyBOR0h0dHBDbGllbnQgfTtcbiJdfQ==