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
            .factory(name + 'Factory', ['gpNgHttpClient', '$q', function (gpNgHttpClient, $q) {
                return function (url) {
                    return serviceFactory(gpNgHttpClient, svcClass, url, $q);
                };
            }]);
    });
}
export { NGHttpClient };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50L2FuZ3VsYXJqcy8iLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLFlBQVksTUFBTSxXQUFXLENBQUM7QUFHckMsT0FBTyxLQUFLLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFDbkMsT0FBTyxFQUNILE1BQU0sRUFBUyxZQUFZLEVBQ0EsZUFBZSxFQUU3QyxNQUFNLHFCQUFxQixDQUFDO0FBRTdCLE9BQU8sRUFDSCxhQUFhLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQ2pELGNBQWMsRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQzlDLGNBQWMsRUFDakIsTUFBTSxrQkFBa0IsQ0FBQztBQUcxQixJQUFHLE9BQU8sSUFBSSxPQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLFdBQVcsRUFBRTs7SUFFbEQsSUFBSSxjQUFjLEdBQUcsVUFBUyxjQUFjLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQzNELElBQUksYUFBYSxLQUFLLFFBQVEsSUFBTyxnQkFBZ0IsS0FBSyxRQUFRO1lBQzlELGdCQUFnQixLQUFLLFFBQVEsSUFBSSxjQUFjLEtBQUssUUFBUTtZQUM1RCxZQUFZLEtBQUssUUFBUSxJQUFRLGdCQUFnQixLQUFLLFFBQVE7WUFDOUQsY0FBYyxLQUFLLFFBQVEsRUFBRztZQUM5QixPQUFPLElBQUksUUFBUSxDQUFFLEdBQUcsRUFBRSxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDakQ7UUFDRCxPQUFPLElBQUksUUFBUSxDQUFFLEdBQUcsRUFBRSxjQUFjLENBQUUsQ0FBQztLQUM5QyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7OztJQWtCRCxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUM7U0FFN0IsUUFBUSxDQUFDLFVBQVUsRUFBRTtRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLE9BQU8sTUFBTSxDQUFDO2FBQ2pCO1NBQ0osQ0FBQztLQUNMLENBQUM7U0FFRCxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsY0FBYSxPQUFPLFlBQVksQ0FBQyxFQUFFLENBQUM7U0FFOUQsT0FBTyxDQUFDLGdCQUFnQixFQUFFLENBQUMsT0FBTyxFQUFFLElBQUk7UUFDckMsVUFBVSxLQUFLLEVBQUUsRUFBRTtZQUNmLE9BQU8sSUFBSSxZQUFZLENBQUMsRUFBRSxLQUFLLEVBQUcsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3REO0tBQ0osQ0FBQztTQUVELE9BQU8sQ0FBQywwQkFBMEIsRUFBRTtRQUNqQyxPQUFPLFVBQVMsT0FBTztZQUNuQixPQUFPLElBQUksZUFBZSxDQUFFLE9BQU8sQ0FBRSxDQUFDO1NBQ3pDLENBQUM7S0FDTCxDQUFDLENBRUQ7O0lBT0QsTUFBTSxjQUFjLEdBQUc7UUFDbkIsZUFBZSxFQUFLLGFBQWE7UUFDakMsZ0JBQWdCLEVBQUksY0FBYztRQUNsQyxrQkFBa0IsRUFBRSxnQkFBZ0I7UUFDcEMsa0JBQWtCLEVBQUUsZ0JBQWdCO1FBQ3BDLGdCQUFnQixFQUFJLGNBQWM7UUFDbEMsY0FBYyxFQUFNLFlBQVk7UUFDaEMsa0JBQWtCLEVBQUUsZ0JBQWdCO0tBQ3ZDLENBQUM7SUFFRixNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLE9BQU8sQ0FBRSxDQUFDLElBQUksRUFBRSxFQUFFOztRQUUxQyxJQUFJLFFBQVEsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFcEMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7WUFFMUI7Ozs7O2VBS0c7YUFDRixPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLElBQUk7WUFDOUMsVUFBUyxjQUFjLEVBQUUsUUFBUSxFQUFFLEVBQUU7Z0JBQ2pDLE9BQU8sY0FBYyxDQUFDLGNBQWMsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQzthQUN4RTtTQUNKLENBQUM7WUFFRjs7Ozs7ZUFLRzthQUNGLE9BQU8sQ0FBQyxJQUFJLEdBQUMsU0FBUyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLFVBQVMsY0FBYyxFQUFFLEVBQUU7Z0JBQ3pFLE9BQU8sVUFBUyxHQUFHO29CQUNmLE9BQU8sY0FBYyxDQUFDLGNBQWMsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2lCQUM1RCxDQUFDO2FBQ0wsQ0FBQyxDQUFDLENBQUM7S0FFUCxDQUFDLENBQUM7Q0FDTjtBQUlELE9BQU8sRUFBRSxZQUFZLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IE5HSHR0cENsaWVudCBmcm9tICcuL2h0dHAvbmcnO1xuXG5cbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSBcImFuZ3VsYXJcIjtcbmltcG9ydCB7XG4gICAgQ29uZmlnLCBRdWVyeSwgUXVlcnlGYWN0b3J5LCBJdGVtLCBTZWFyY2hSZXN1bHRzLCBHUEh0dHBDbGllbnQsXG4gICAgSXRlbVNlcnZpY2UsIFV0aWxzU2VydmljZSwgVHJhY2tpbmdTZXJ2aWNlLFxuICAgIERhdGFzZXRTZXJ2aWNlLCBTZXJ2aWNlU2VydmljZSwgTGF5ZXJTZXJ2aWNlLCBNYXBTZXJ2aWNlLCBHYWxsZXJ5U2VydmljZVxufSBmcm9tIFwiQGdlb3BsYXRmb3JtL2NsaWVudFwiO1xuXG5pbXBvcnQge1xuICAgIE5HSXRlbVNlcnZpY2UsIE5HRGF0YXNldFNlcnZpY2UsIE5HU2VydmljZVNlcnZpY2UsXG4gICAgTkdMYXllclNlcnZpY2UsIE5HTWFwU2VydmljZSwgTkdHYWxsZXJ5U2VydmljZSxcbiAgICBOR1V0aWxzU2VydmljZVxufSBmcm9tICcuL3NlcnZpY2VzL2luZGV4JztcblxuXG5pZihhbmd1bGFyICYmIHR5cGVvZihhbmd1bGFyLm1vZHVsZSkgIT09ICd1bmRlZmluZWQnKSB7XG5cbiAgICBsZXQgc2VydmljZUZhY3RvcnkgPSBmdW5jdGlvbihncE5nSHR0cENsaWVudCwgc3ZjQ2xhc3MsIHVybCwgJHEpIHtcbiAgICAgICAgaWYoIE5HSXRlbVNlcnZpY2UgPT09IHN2Y0NsYXNzICAgIHx8IE5HRGF0YXNldFNlcnZpY2UgPT09IHN2Y0NsYXNzIHx8XG4gICAgICAgICAgICBOR1NlcnZpY2VTZXJ2aWNlID09PSBzdmNDbGFzcyB8fCBOR0xheWVyU2VydmljZSA9PT0gc3ZjQ2xhc3MgfHxcbiAgICAgICAgICAgIE5HTWFwU2VydmljZSA9PT0gc3ZjQ2xhc3MgICAgIHx8IE5HR2FsbGVyeVNlcnZpY2UgPT09IHN2Y0NsYXNzIHx8XG4gICAgICAgICAgICBOR1V0aWxzU2VydmljZSA9PT0gc3ZjQ2xhc3MgKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IHN2Y0NsYXNzKCB1cmwsIGdwTmdIdHRwQ2xpZW50LCAkcSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBzdmNDbGFzcyggdXJsLCBncE5nSHR0cENsaWVudCApO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogRGVmaW5lIEFuZ3VsYXJKUyBtb2R1bGUgdGhhdCBjYW4gYmUgaW5jbHVkZWQgaW4gZG93bnN0cmVhbSBhcHBsaWNhdGlvbnNcbiAgICAgKlxuICAgICAqIEV4YW1wbGU6XG4gICAgICpcbiAgICAgKiAgYW5ndWxhci5tb2R1bGUoJ215QXBwJywgWyAndWktcm91dGVyJywgJ2dwQ2xpZW50JyBdKVxuICAgICAqICAuY29tcG9uZW50KCdteUNvbXBvbmVudCcsIHtcbiAgICAgKiAgICBiaW5kaW5nczogeyB9LFxuICAgICAqICAgIHRlbXBsYXRlOiBcIjxkaXY+PC9kaXY+XCIsXG4gICAgICogICAgY29udHJvbGxlcjogZnVuY3Rpb24oZ3BRdWVyeUZhY3RvcnksIGdwSXRlbVNlcnZpY2UpIHtcbiAgICAgKiAgICAgICB0aGlzLiRvbkluaXQgPSBmdW5jdGlvbigpIHtcbiAgICAgKiAgICAgICAgICBncEl0ZW1TZXJ2aWNlLnNlYXJjaCggZ3BRdWVyeUZhY3RvcnkoKSApLnRoZW4oIHJlc3BvbnNlID0+IHsgLi4uIH0pO1xuICAgICAqICAgICAgIH07XG4gICAgICogICAgfVxuICAgICAqICBdKTtcbiAgICAgKi9cbiAgICBhbmd1bGFyLm1vZHVsZSgnZ3BDbGllbnQnLCBbXSlcblxuICAgIC5wcm92aWRlcignZ3BDb25maWcnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICRnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBDb25maWc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSlcblxuICAgIC5mYWN0b3J5KCdncFF1ZXJ5RmFjdG9yeScsIGZ1bmN0aW9uKCkgeyByZXR1cm4gUXVlcnlGYWN0b3J5OyB9KVxuXG4gICAgLmZhY3RvcnkoJ2dwTmdIdHRwQ2xpZW50JywgWyckaHR0cCcsICckcScsXG4gICAgICAgIGZ1bmN0aW9uKCAkaHR0cCwgJHEgKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IE5HSHR0cENsaWVudCh7ICRodHRwIDogJGh0dHAsICRxOiAkcSB9KTtcbiAgICAgICAgfVxuICAgIF0pXG5cbiAgICAuZmFjdG9yeSgnZ3BUcmFja2luZ1NlcnZpY2VGYWN0b3J5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFRyYWNraW5nU2VydmljZSggb3B0aW9ucyApO1xuICAgICAgICB9O1xuICAgIH0pXG5cbiAgICA7XG5cblxuICAgIC8qXG4gICAgICogRXhwb3NlIFNlcnZpY2UgaW5zdGFuY2VzIGluIHRoZSAnZ3BDbGllbnQnIG1vZHVsZVxuICAgICAqIFRoZXNlIHNlcnZpY2VzIGFyZSBhbmd1bGFyIGF3YXJlIHVzaW5nIGFuZ3VsYXIncyAkcSB3cmFwcGVyXG4gICAgICovXG4gICAgY29uc3Qgc2VydmljZUNsYXNzZXMgPSB7XG4gICAgICAgICdncEl0ZW1TZXJ2aWNlJyAgIDogTkdJdGVtU2VydmljZSxcbiAgICAgICAgJ2dwVXRpbHNTZXJ2aWNlJyAgOiBOR1V0aWxzU2VydmljZSxcbiAgICAgICAgJ2dwRGF0YXNldFNlcnZpY2UnOiBOR0RhdGFzZXRTZXJ2aWNlLFxuICAgICAgICAnZ3BTZXJ2aWNlU2VydmljZSc6IE5HU2VydmljZVNlcnZpY2UsXG4gICAgICAgICdncExheWVyU2VydmljZScgIDogTkdMYXllclNlcnZpY2UsXG4gICAgICAgICdncE1hcFNlcnZpY2UnICAgIDogTkdNYXBTZXJ2aWNlLFxuICAgICAgICAnZ3BHYWxsZXJ5U2VydmljZSc6IE5HR2FsbGVyeVNlcnZpY2VcbiAgICB9O1xuXG4gICAgT2JqZWN0LmtleXMoc2VydmljZUNsYXNzZXMpLmZvckVhY2goIChuYW1lKSA9PiB7XG5cbiAgICAgICAgbGV0IHN2Y0NsYXNzID0gc2VydmljZUNsYXNzZXNbbmFtZV07XG5cbiAgICAgICAgYW5ndWxhci5tb2R1bGUoJ2dwQ2xpZW50JylcblxuICAgICAgICAvKlxuICAgICAgICAgICAgU2VydmljZSBmb3IgZWFjaCBjbGllbnQgc2VydmljZSBjbGFzcyB0aGF0IHVzZXMgdGhlXG4gICAgICAgICAgICBjdXJyZW50bHkgY29uZmlndXJlZCBzZXR0aW5ncyB3aGVuIGNyZWF0ZWQuICBOb3RlIHRoZVxuICAgICAgICAgICAgc2V0dGluZ3MgbWF5IGNoYW5nZSBhZnRlciB0aGUgc2VydmljZSBzaW5nbGV0b24gaXNcbiAgICAgICAgICAgIGNyZWF0ZWQsIGluIHdoaWNoIGNhc2UgdGhlIGZhY3Rvcnkgb3B0aW9uIHNob3VsZCBiZSB1c2VkLlxuICAgICAgICAgKi9cbiAgICAgICAgLnNlcnZpY2UobmFtZSwgWydncE5nSHR0cENsaWVudCcsICdncENvbmZpZycsICckcScsXG4gICAgICAgICAgICBmdW5jdGlvbihncE5nSHR0cENsaWVudCwgZ3BDb25maWcsICRxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2VGYWN0b3J5KGdwTmdIdHRwQ2xpZW50LCBzdmNDbGFzcywgZ3BDb25maWcudWFsVXJsLCAkcSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIF0pXG5cbiAgICAgICAgLypcbiAgICAgICAgICAgIEZhY3RvcnkgZm9yIGNyZWF0aW5nIHNlcnZpY2VzIGZvciBlYWNoIGNsaWVudCBzZXJ2aWNlIGNsYXNzXG4gICAgICAgICAgICB3aGljaCB1c2VzIGEgY3VzdG9taXphYmxlIGVuZHBvaW50IHRvIHJlcXVlc3QgZGF0YSBmcm9tLiBVc2VcbiAgICAgICAgICAgIHRoaXMgaWYgc2VydmljZXMgbmVlZCB0byBiZSBhYmxlIHRvIGNoYW5nZSBBUEkgZW5kcG9pbnRzXG4gICAgICAgICAgICBkdXJpbmcgYXBwbGljYXRpb24gcnVudGltZS5cbiAgICAgICAgICovXG4gICAgICAgIC5mYWN0b3J5KG5hbWUrJ0ZhY3RvcnknLCBbJ2dwTmdIdHRwQ2xpZW50JywgJyRxJywgZnVuY3Rpb24oZ3BOZ0h0dHBDbGllbnQsICRxKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24odXJsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2VGYWN0b3J5KGdwTmdIdHRwQ2xpZW50LCBzdmNDbGFzcywgdXJsLCAkcSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XSk7XG5cbiAgICB9KTtcbn1cblxuXG5cbmV4cG9ydCB7IE5HSHR0cENsaWVudCB9O1xuIl19