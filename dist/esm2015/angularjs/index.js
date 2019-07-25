/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import NGHttpClient from './http/ng';
import * as angular from "angular";
import { Config, QueryFactory, TrackingService } from "@geoplatform/client";
import { NGItemService, NGDatasetService, NGServiceService, NGLayerService, NGMapService, NGGalleryService, NGUtilsService } from './services/index';
if (angular && typeof (angular.module) !== 'undefined') {
    /** @type {?} */
    let serviceFactory = function (gpNgHttpClient, svcClass, url, $q) {
        if (NGItemService === svcClass || NGDatasetService === svcClass ||
            NGServiceService === svcClass || NGLayerService === svcClass ||
            NGMapService === svcClass || NGGalleryService === svcClass ||
            NGUtilsService === svcClass) {
            return new svcClass(url, gpNgHttpClient, $q);
        }
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
        .factory('gpNgHttpClient', ['$http', '$q',
        function ($http, $q) {
            return new NGHttpClient({ $http: $http, $q: $q });
        }
    ])
        .factory('gpTrackingServiceFactory', function () {
        return function (options) {
            return new TrackingService(options);
        };
    });
    /** @type {?} */
    const serviceClasses = {
        'gpItemService': NGItemService,
        'gpUtilsService': NGUtilsService,
        'gpDatasetService': NGDatasetService,
        'gpServiceService': NGServiceService,
        'gpLayerService': NGLayerService,
        'gpMapService': NGMapService,
        'gpGalleryService': NGGalleryService
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
            .service(name, ['gpNgHttpClient', 'gpConfig', '$q',
            function (gpNgHttpClient, gpConfig, $q) {
                return serviceFactory(gpNgHttpClient, svcClass, gpConfig.ualUrl, $q);
            }
        ])
            /*
                Factory for creating services for each client service class
                which uses a customizable endpoint to request data from. Use
                this if services need to be able to change API endpoints
                during application runtime.
             */
            .factory(name + 'Factory', ['gpNgHttpClient', 'gpConfig', '$q',
            function (gpNgHttpClient, gpConfig, $q) {
                return function (url) {
                    return serviceFactory(gpNgHttpClient, svcClass, url || gpConfig.ualUrl, $q);
                };
            }
        ]);
    });
}
export { NGHttpClient };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50L2FuZ3VsYXJqcy8iLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLFlBQVksTUFBTSxXQUFXLENBQUM7QUFHckMsT0FBTyxLQUFLLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFDbkMsT0FBTyxFQUNILE1BQU0sRUFBUyxZQUFZLEVBQ0EsZUFBZSxFQUU3QyxNQUFNLHFCQUFxQixDQUFDO0FBRTdCLE9BQU8sRUFDSCxhQUFhLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQ2pELGNBQWMsRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQzlDLGNBQWMsRUFDakIsTUFBTSxrQkFBa0IsQ0FBQztBQUcxQixJQUFHLE9BQU8sSUFBSSxPQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLFdBQVcsRUFBRTs7SUFFbEQsSUFBSSxjQUFjLEdBQUcsVUFBUyxjQUFjLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQzNELElBQUksYUFBYSxLQUFLLFFBQVEsSUFBTyxnQkFBZ0IsS0FBSyxRQUFRO1lBQzlELGdCQUFnQixLQUFLLFFBQVEsSUFBSSxjQUFjLEtBQUssUUFBUTtZQUM1RCxZQUFZLEtBQUssUUFBUSxJQUFRLGdCQUFnQixLQUFLLFFBQVE7WUFDOUQsY0FBYyxLQUFLLFFBQVEsRUFBRztZQUM5QixPQUFPLElBQUksUUFBUSxDQUFFLEdBQUcsRUFBRSxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDakQ7UUFDRCxPQUFPLElBQUksUUFBUSxDQUFFLEdBQUcsRUFBRSxjQUFjLENBQUUsQ0FBQztLQUM5QyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7OztJQWtCRCxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUM7U0FFN0IsUUFBUSxDQUFDLFVBQVUsRUFBRTtRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLE9BQU8sTUFBTSxDQUFDO2FBQ2pCO1NBQ0osQ0FBQztLQUNMLENBQUM7U0FFRCxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsY0FBYSxPQUFPLFlBQVksQ0FBQyxFQUFFLENBQUM7U0FFOUQsT0FBTyxDQUFDLGdCQUFnQixFQUFFLENBQUMsT0FBTyxFQUFFLElBQUk7UUFDckMsVUFBVSxLQUFLLEVBQUUsRUFBRTtZQUNmLE9BQU8sSUFBSSxZQUFZLENBQUMsRUFBRSxLQUFLLEVBQUcsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3REO0tBQ0osQ0FBQztTQUVELE9BQU8sQ0FBQywwQkFBMEIsRUFBRTtRQUNqQyxPQUFPLFVBQVMsT0FBTztZQUNuQixPQUFPLElBQUksZUFBZSxDQUFFLE9BQU8sQ0FBRSxDQUFDO1NBQ3pDLENBQUM7S0FDTCxDQUFDLENBRUQ7O0lBT0QsTUFBTSxjQUFjLEdBQUc7UUFDbkIsZUFBZSxFQUFLLGFBQWE7UUFDakMsZ0JBQWdCLEVBQUksY0FBYztRQUNsQyxrQkFBa0IsRUFBRSxnQkFBZ0I7UUFDcEMsa0JBQWtCLEVBQUUsZ0JBQWdCO1FBQ3BDLGdCQUFnQixFQUFJLGNBQWM7UUFDbEMsY0FBYyxFQUFNLFlBQVk7UUFDaEMsa0JBQWtCLEVBQUUsZ0JBQWdCO0tBQ3ZDLENBQUM7SUFFRixNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLE9BQU8sQ0FBRSxDQUFDLElBQUksRUFBRSxFQUFFOztRQUUxQyxJQUFJLFFBQVEsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFcEMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7WUFFMUI7Ozs7O2VBS0c7YUFDRixPQUFPLENBQUMsSUFBSSxFQUFFLENBQUUsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLElBQUk7WUFDL0MsVUFBVSxjQUFjLEVBQUUsUUFBUSxFQUFFLEVBQUU7Z0JBQ2xDLE9BQU8sY0FBYyxDQUFDLGNBQWMsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQzthQUN4RTtTQUNKLENBQUM7WUFFRjs7Ozs7ZUFLRzthQUNGLE9BQU8sQ0FBQyxJQUFJLEdBQUMsU0FBUyxFQUFFLENBQUUsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLElBQUk7WUFDekQsVUFBVSxjQUFjLEVBQUUsUUFBUSxFQUFFLEVBQUU7Z0JBQ2xDLE9BQU8sVUFBVSxHQUFhO29CQUMxQixPQUFPLGNBQWMsQ0FDakIsY0FBYyxFQUNkLFFBQVEsRUFDUixHQUFHLElBQUksUUFBUSxDQUFDLE1BQU0sRUFDdEIsRUFBRSxDQUNMLENBQUM7aUJBQ0wsQ0FBQzthQUNMO1NBQ0osQ0FBQyxDQUFDO0tBRU4sQ0FBQyxDQUFDO0NBQ047QUFJRCxPQUFPLEVBQUUsWUFBWSxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBOR0h0dHBDbGllbnQgZnJvbSAnLi9odHRwL25nJztcblxuXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gXCJhbmd1bGFyXCI7XG5pbXBvcnQge1xuICAgIENvbmZpZywgUXVlcnksIFF1ZXJ5RmFjdG9yeSwgSXRlbSwgU2VhcmNoUmVzdWx0cywgR1BIdHRwQ2xpZW50LFxuICAgIEl0ZW1TZXJ2aWNlLCBVdGlsc1NlcnZpY2UsIFRyYWNraW5nU2VydmljZSxcbiAgICBEYXRhc2V0U2VydmljZSwgU2VydmljZVNlcnZpY2UsIExheWVyU2VydmljZSwgTWFwU2VydmljZSwgR2FsbGVyeVNlcnZpY2Vcbn0gZnJvbSBcIkBnZW9wbGF0Zm9ybS9jbGllbnRcIjtcblxuaW1wb3J0IHtcbiAgICBOR0l0ZW1TZXJ2aWNlLCBOR0RhdGFzZXRTZXJ2aWNlLCBOR1NlcnZpY2VTZXJ2aWNlLFxuICAgIE5HTGF5ZXJTZXJ2aWNlLCBOR01hcFNlcnZpY2UsIE5HR2FsbGVyeVNlcnZpY2UsXG4gICAgTkdVdGlsc1NlcnZpY2Vcbn0gZnJvbSAnLi9zZXJ2aWNlcy9pbmRleCc7XG5cblxuaWYoYW5ndWxhciAmJiB0eXBlb2YoYW5ndWxhci5tb2R1bGUpICE9PSAndW5kZWZpbmVkJykge1xuXG4gICAgbGV0IHNlcnZpY2VGYWN0b3J5ID0gZnVuY3Rpb24oZ3BOZ0h0dHBDbGllbnQsIHN2Y0NsYXNzLCB1cmwsICRxKSB7XG4gICAgICAgIGlmKCBOR0l0ZW1TZXJ2aWNlID09PSBzdmNDbGFzcyAgICB8fCBOR0RhdGFzZXRTZXJ2aWNlID09PSBzdmNDbGFzcyB8fFxuICAgICAgICAgICAgTkdTZXJ2aWNlU2VydmljZSA9PT0gc3ZjQ2xhc3MgfHwgTkdMYXllclNlcnZpY2UgPT09IHN2Y0NsYXNzIHx8XG4gICAgICAgICAgICBOR01hcFNlcnZpY2UgPT09IHN2Y0NsYXNzICAgICB8fCBOR0dhbGxlcnlTZXJ2aWNlID09PSBzdmNDbGFzcyB8fFxuICAgICAgICAgICAgTkdVdGlsc1NlcnZpY2UgPT09IHN2Y0NsYXNzICkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBzdmNDbGFzcyggdXJsLCBncE5nSHR0cENsaWVudCwgJHEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgc3ZjQ2xhc3MoIHVybCwgZ3BOZ0h0dHBDbGllbnQgKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIERlZmluZSBBbmd1bGFySlMgbW9kdWxlIHRoYXQgY2FuIGJlIGluY2x1ZGVkIGluIGRvd25zdHJlYW0gYXBwbGljYXRpb25zXG4gICAgICpcbiAgICAgKiBFeGFtcGxlOlxuICAgICAqXG4gICAgICogIGFuZ3VsYXIubW9kdWxlKCdteUFwcCcsIFsgJ3VpLXJvdXRlcicsICdncENsaWVudCcgXSlcbiAgICAgKiAgLmNvbXBvbmVudCgnbXlDb21wb25lbnQnLCB7XG4gICAgICogICAgYmluZGluZ3M6IHsgfSxcbiAgICAgKiAgICB0ZW1wbGF0ZTogXCI8ZGl2PjwvZGl2PlwiLFxuICAgICAqICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKGdwUXVlcnlGYWN0b3J5LCBncEl0ZW1TZXJ2aWNlKSB7XG4gICAgICogICAgICAgdGhpcy4kb25Jbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgICogICAgICAgICAgZ3BJdGVtU2VydmljZS5zZWFyY2goIGdwUXVlcnlGYWN0b3J5KCkgKS50aGVuKCByZXNwb25zZSA9PiB7IC4uLiB9KTtcbiAgICAgKiAgICAgICB9O1xuICAgICAqICAgIH1cbiAgICAgKiAgXSk7XG4gICAgICovXG4gICAgYW5ndWxhci5tb2R1bGUoJ2dwQ2xpZW50JywgW10pXG5cbiAgICAucHJvdmlkZXIoJ2dwQ29uZmlnJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAkZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gQ29uZmlnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0pXG5cbiAgICAuZmFjdG9yeSgnZ3BRdWVyeUZhY3RvcnknLCBmdW5jdGlvbigpIHsgcmV0dXJuIFF1ZXJ5RmFjdG9yeTsgfSlcblxuICAgIC5mYWN0b3J5KCdncE5nSHR0cENsaWVudCcsIFsnJGh0dHAnLCAnJHEnLFxuICAgICAgICBmdW5jdGlvbiggJGh0dHAsICRxICkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBOR0h0dHBDbGllbnQoeyAkaHR0cCA6ICRodHRwLCAkcTogJHEgfSk7XG4gICAgICAgIH1cbiAgICBdKVxuXG4gICAgLmZhY3RvcnkoJ2dwVHJhY2tpbmdTZXJ2aWNlRmFjdG9yeScsIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBUcmFja2luZ1NlcnZpY2UoIG9wdGlvbnMgKTtcbiAgICAgICAgfTtcbiAgICB9KVxuXG4gICAgO1xuXG5cbiAgICAvKlxuICAgICAqIEV4cG9zZSBTZXJ2aWNlIGluc3RhbmNlcyBpbiB0aGUgJ2dwQ2xpZW50JyBtb2R1bGVcbiAgICAgKiBUaGVzZSBzZXJ2aWNlcyBhcmUgYW5ndWxhciBhd2FyZSB1c2luZyBhbmd1bGFyJ3MgJHEgd3JhcHBlclxuICAgICAqL1xuICAgIGNvbnN0IHNlcnZpY2VDbGFzc2VzID0ge1xuICAgICAgICAnZ3BJdGVtU2VydmljZScgICA6IE5HSXRlbVNlcnZpY2UsXG4gICAgICAgICdncFV0aWxzU2VydmljZScgIDogTkdVdGlsc1NlcnZpY2UsXG4gICAgICAgICdncERhdGFzZXRTZXJ2aWNlJzogTkdEYXRhc2V0U2VydmljZSxcbiAgICAgICAgJ2dwU2VydmljZVNlcnZpY2UnOiBOR1NlcnZpY2VTZXJ2aWNlLFxuICAgICAgICAnZ3BMYXllclNlcnZpY2UnICA6IE5HTGF5ZXJTZXJ2aWNlLFxuICAgICAgICAnZ3BNYXBTZXJ2aWNlJyAgICA6IE5HTWFwU2VydmljZSxcbiAgICAgICAgJ2dwR2FsbGVyeVNlcnZpY2UnOiBOR0dhbGxlcnlTZXJ2aWNlXG4gICAgfTtcblxuICAgIE9iamVjdC5rZXlzKHNlcnZpY2VDbGFzc2VzKS5mb3JFYWNoKCAobmFtZSkgPT4ge1xuXG4gICAgICAgIGxldCBzdmNDbGFzcyA9IHNlcnZpY2VDbGFzc2VzW25hbWVdO1xuXG4gICAgICAgIGFuZ3VsYXIubW9kdWxlKCdncENsaWVudCcpXG5cbiAgICAgICAgLypcbiAgICAgICAgICAgIFNlcnZpY2UgZm9yIGVhY2ggY2xpZW50IHNlcnZpY2UgY2xhc3MgdGhhdCB1c2VzIHRoZVxuICAgICAgICAgICAgY3VycmVudGx5IGNvbmZpZ3VyZWQgc2V0dGluZ3Mgd2hlbiBjcmVhdGVkLiAgTm90ZSB0aGVcbiAgICAgICAgICAgIHNldHRpbmdzIG1heSBjaGFuZ2UgYWZ0ZXIgdGhlIHNlcnZpY2Ugc2luZ2xldG9uIGlzXG4gICAgICAgICAgICBjcmVhdGVkLCBpbiB3aGljaCBjYXNlIHRoZSBmYWN0b3J5IG9wdGlvbiBzaG91bGQgYmUgdXNlZC5cbiAgICAgICAgICovXG4gICAgICAgIC5zZXJ2aWNlKG5hbWUsIFsgJ2dwTmdIdHRwQ2xpZW50JywgJ2dwQ29uZmlnJywgJyRxJyxcbiAgICAgICAgICAgIGZ1bmN0aW9uKCBncE5nSHR0cENsaWVudCwgZ3BDb25maWcsICRxICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlRmFjdG9yeShncE5nSHR0cENsaWVudCwgc3ZjQ2xhc3MsIGdwQ29uZmlnLnVhbFVybCwgJHEpO1xuICAgICAgICAgICAgfVxuICAgICAgICBdKVxuXG4gICAgICAgIC8qXG4gICAgICAgICAgICBGYWN0b3J5IGZvciBjcmVhdGluZyBzZXJ2aWNlcyBmb3IgZWFjaCBjbGllbnQgc2VydmljZSBjbGFzc1xuICAgICAgICAgICAgd2hpY2ggdXNlcyBhIGN1c3RvbWl6YWJsZSBlbmRwb2ludCB0byByZXF1ZXN0IGRhdGEgZnJvbS4gVXNlXG4gICAgICAgICAgICB0aGlzIGlmIHNlcnZpY2VzIG5lZWQgdG8gYmUgYWJsZSB0byBjaGFuZ2UgQVBJIGVuZHBvaW50c1xuICAgICAgICAgICAgZHVyaW5nIGFwcGxpY2F0aW9uIHJ1bnRpbWUuXG4gICAgICAgICAqL1xuICAgICAgICAuZmFjdG9yeShuYW1lKydGYWN0b3J5JywgWyAnZ3BOZ0h0dHBDbGllbnQnLCAnZ3BDb25maWcnLCAnJHEnLFxuICAgICAgICAgICAgZnVuY3Rpb24oIGdwTmdIdHRwQ2xpZW50LCBncENvbmZpZywgJHEgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCB1cmwgPzogc3RyaW5nICkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VydmljZUZhY3RvcnkoXG4gICAgICAgICAgICAgICAgICAgICAgICBncE5nSHR0cENsaWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN2Y0NsYXNzLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsIHx8IGdwQ29uZmlnLnVhbFVybCxcbiAgICAgICAgICAgICAgICAgICAgICAgICRxXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSk7XG5cbiAgICB9KTtcbn1cblxuXG5cbmV4cG9ydCB7IE5HSHR0cENsaWVudCB9O1xuIl19