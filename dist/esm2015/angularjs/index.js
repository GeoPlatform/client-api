import NGHttpClient from './http/ng';
import * as angular from "angular";
import { Config, QueryFactory, TrackingService } from "@geoplatform/client";
import { NGItemService, NGDatasetService, NGServiceService, NGLayerService, NGMapService, NGGalleryService, NGUtilsService } from './services/index';
if (angular && typeof (angular.module) !== 'undefined') {
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
    /*
     * Expose Service instances in the 'gpClient' module
     * These services are angular aware using angular's $q wrapper
     */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50L2FuZ3VsYXJqcy8iLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sWUFBWSxNQUFNLFdBQVcsQ0FBQztBQUdyQyxPQUFPLEtBQUssT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUNuQyxPQUFPLEVBQ0gsTUFBTSxFQUFTLFlBQVksRUFDQSxlQUFlLEVBRTdDLE1BQU0scUJBQXFCLENBQUM7QUFFN0IsT0FBTyxFQUNILGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFDakQsY0FBYyxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFDOUMsY0FBYyxFQUNqQixNQUFNLGtCQUFrQixDQUFDO0FBRzFCLElBQUcsT0FBTyxJQUFJLE9BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssV0FBVyxFQUFFO0lBRWxELElBQUksY0FBYyxHQUFHLFVBQVMsY0FBYyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUMzRCxJQUFJLGFBQWEsS0FBSyxRQUFRLElBQU8sZ0JBQWdCLEtBQUssUUFBUTtZQUM5RCxnQkFBZ0IsS0FBSyxRQUFRLElBQUksY0FBYyxLQUFLLFFBQVE7WUFDNUQsWUFBWSxLQUFLLFFBQVEsSUFBUSxnQkFBZ0IsS0FBSyxRQUFRO1lBQzlELGNBQWMsS0FBSyxRQUFRLEVBQUc7WUFDOUIsT0FBTyxJQUFJLFFBQVEsQ0FBRSxHQUFHLEVBQUUsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ2pEO1FBQ0QsT0FBTyxJQUFJLFFBQVEsQ0FBRSxHQUFHLEVBQUUsY0FBYyxDQUFFLENBQUM7SUFDL0MsQ0FBQyxDQUFBO0lBRUQ7Ozs7Ozs7Ozs7Ozs7OztPQWVHO0lBQ0gsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDO1NBRTdCLFFBQVEsQ0FBQyxVQUFVLEVBQUU7UUFDbEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFDRixPQUFPLE1BQU0sQ0FBQztZQUNsQixDQUFDO1NBQ0osQ0FBQztJQUNOLENBQUMsQ0FBQztTQUVELE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxjQUFhLE9BQU8sWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBRTlELE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJO1FBQ3JDLFVBQVUsS0FBSyxFQUFFLEVBQUU7WUFDZixPQUFPLElBQUksWUFBWSxDQUFDLEVBQUUsS0FBSyxFQUFHLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN2RCxDQUFDO0tBQ0osQ0FBQztTQUVELE9BQU8sQ0FBQywwQkFBMEIsRUFBRTtRQUNqQyxPQUFPLFVBQVMsT0FBTztZQUNuQixPQUFPLElBQUksZUFBZSxDQUFFLE9BQU8sQ0FBRSxDQUFDO1FBQzFDLENBQUMsQ0FBQztJQUNOLENBQUMsQ0FBQyxDQUVEO0lBR0Q7OztPQUdHO0lBQ0gsTUFBTSxjQUFjLEdBQUc7UUFDbkIsZUFBZSxFQUFLLGFBQWE7UUFDakMsZ0JBQWdCLEVBQUksY0FBYztRQUNsQyxrQkFBa0IsRUFBRSxnQkFBZ0I7UUFDcEMsa0JBQWtCLEVBQUUsZ0JBQWdCO1FBQ3BDLGdCQUFnQixFQUFJLGNBQWM7UUFDbEMsY0FBYyxFQUFNLFlBQVk7UUFDaEMsa0JBQWtCLEVBQUUsZ0JBQWdCO0tBQ3ZDLENBQUM7SUFFRixNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLE9BQU8sQ0FBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBRTFDLElBQUksUUFBUSxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVwQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztZQUUxQjs7Ozs7ZUFLRzthQUNGLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBRSxnQkFBZ0IsRUFBRSxVQUFVLEVBQUUsSUFBSTtZQUMvQyxVQUFVLGNBQWMsRUFBRSxRQUFRLEVBQUUsRUFBRTtnQkFDbEMsT0FBTyxjQUFjLENBQUMsY0FBYyxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3pFLENBQUM7U0FDSixDQUFDO1lBRUY7Ozs7O2VBS0c7YUFDRixPQUFPLENBQUMsSUFBSSxHQUFDLFNBQVMsRUFBRSxDQUFFLGdCQUFnQixFQUFFLFVBQVUsRUFBRSxJQUFJO1lBQ3pELFVBQVUsY0FBYyxFQUFFLFFBQVEsRUFBRSxFQUFFO2dCQUNsQyxPQUFPLFVBQVUsR0FBYTtvQkFDMUIsT0FBTyxjQUFjLENBQ2pCLGNBQWMsRUFDZCxRQUFRLEVBQ1IsR0FBRyxJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQ3RCLEVBQUUsQ0FDTCxDQUFDO2dCQUNOLENBQUMsQ0FBQztZQUNOLENBQUM7U0FDSixDQUFDLENBQUM7SUFFUCxDQUFDLENBQUMsQ0FBQztDQUNOO0FBSUQsT0FBTyxFQUFFLFlBQVksRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgTkdIdHRwQ2xpZW50IGZyb20gJy4vaHR0cC9uZyc7XG5cblxuaW1wb3J0ICogYXMgYW5ndWxhciBmcm9tIFwiYW5ndWxhclwiO1xuaW1wb3J0IHtcbiAgICBDb25maWcsIFF1ZXJ5LCBRdWVyeUZhY3RvcnksIEl0ZW0sIFNlYXJjaFJlc3VsdHMsIEdQSHR0cENsaWVudCxcbiAgICBJdGVtU2VydmljZSwgVXRpbHNTZXJ2aWNlLCBUcmFja2luZ1NlcnZpY2UsXG4gICAgRGF0YXNldFNlcnZpY2UsIFNlcnZpY2VTZXJ2aWNlLCBMYXllclNlcnZpY2UsIE1hcFNlcnZpY2UsIEdhbGxlcnlTZXJ2aWNlXG59IGZyb20gXCJAZ2VvcGxhdGZvcm0vY2xpZW50XCI7XG5cbmltcG9ydCB7XG4gICAgTkdJdGVtU2VydmljZSwgTkdEYXRhc2V0U2VydmljZSwgTkdTZXJ2aWNlU2VydmljZSxcbiAgICBOR0xheWVyU2VydmljZSwgTkdNYXBTZXJ2aWNlLCBOR0dhbGxlcnlTZXJ2aWNlLFxuICAgIE5HVXRpbHNTZXJ2aWNlXG59IGZyb20gJy4vc2VydmljZXMvaW5kZXgnO1xuXG5cbmlmKGFuZ3VsYXIgJiYgdHlwZW9mKGFuZ3VsYXIubW9kdWxlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgIGxldCBzZXJ2aWNlRmFjdG9yeSA9IGZ1bmN0aW9uKGdwTmdIdHRwQ2xpZW50LCBzdmNDbGFzcywgdXJsLCAkcSkge1xuICAgICAgICBpZiggTkdJdGVtU2VydmljZSA9PT0gc3ZjQ2xhc3MgICAgfHwgTkdEYXRhc2V0U2VydmljZSA9PT0gc3ZjQ2xhc3MgfHxcbiAgICAgICAgICAgIE5HU2VydmljZVNlcnZpY2UgPT09IHN2Y0NsYXNzIHx8IE5HTGF5ZXJTZXJ2aWNlID09PSBzdmNDbGFzcyB8fFxuICAgICAgICAgICAgTkdNYXBTZXJ2aWNlID09PSBzdmNDbGFzcyAgICAgfHwgTkdHYWxsZXJ5U2VydmljZSA9PT0gc3ZjQ2xhc3MgfHxcbiAgICAgICAgICAgIE5HVXRpbHNTZXJ2aWNlID09PSBzdmNDbGFzcyApIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgc3ZjQ2xhc3MoIHVybCwgZ3BOZ0h0dHBDbGllbnQsICRxKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IHN2Y0NsYXNzKCB1cmwsIGdwTmdIdHRwQ2xpZW50ICk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBEZWZpbmUgQW5ndWxhckpTIG1vZHVsZSB0aGF0IGNhbiBiZSBpbmNsdWRlZCBpbiBkb3duc3RyZWFtIGFwcGxpY2F0aW9uc1xuICAgICAqXG4gICAgICogRXhhbXBsZTpcbiAgICAgKlxuICAgICAqICBhbmd1bGFyLm1vZHVsZSgnbXlBcHAnLCBbICd1aS1yb3V0ZXInLCAnZ3BDbGllbnQnIF0pXG4gICAgICogIC5jb21wb25lbnQoJ215Q29tcG9uZW50Jywge1xuICAgICAqICAgIGJpbmRpbmdzOiB7IH0sXG4gICAgICogICAgdGVtcGxhdGU6IFwiPGRpdj48L2Rpdj5cIixcbiAgICAgKiAgICBjb250cm9sbGVyOiBmdW5jdGlvbihncFF1ZXJ5RmFjdG9yeSwgZ3BJdGVtU2VydmljZSkge1xuICAgICAqICAgICAgIHRoaXMuJG9uSW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgICAqICAgICAgICAgIGdwSXRlbVNlcnZpY2Uuc2VhcmNoKCBncFF1ZXJ5RmFjdG9yeSgpICkudGhlbiggcmVzcG9uc2UgPT4geyAuLi4gfSk7XG4gICAgICogICAgICAgfTtcbiAgICAgKiAgICB9XG4gICAgICogIF0pO1xuICAgICAqL1xuICAgIGFuZ3VsYXIubW9kdWxlKCdncENsaWVudCcsIFtdKVxuXG4gICAgLnByb3ZpZGVyKCdncENvbmZpZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIENvbmZpZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KVxuXG4gICAgLmZhY3RvcnkoJ2dwUXVlcnlGYWN0b3J5JywgZnVuY3Rpb24oKSB7IHJldHVybiBRdWVyeUZhY3Rvcnk7IH0pXG5cbiAgICAuZmFjdG9yeSgnZ3BOZ0h0dHBDbGllbnQnLCBbJyRodHRwJywgJyRxJyxcbiAgICAgICAgZnVuY3Rpb24oICRodHRwLCAkcSApIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgTkdIdHRwQ2xpZW50KHsgJGh0dHAgOiAkaHR0cCwgJHE6ICRxIH0pO1xuICAgICAgICB9XG4gICAgXSlcblxuICAgIC5mYWN0b3J5KCdncFRyYWNraW5nU2VydmljZUZhY3RvcnknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVHJhY2tpbmdTZXJ2aWNlKCBvcHRpb25zICk7XG4gICAgICAgIH07XG4gICAgfSlcblxuICAgIDtcblxuXG4gICAgLypcbiAgICAgKiBFeHBvc2UgU2VydmljZSBpbnN0YW5jZXMgaW4gdGhlICdncENsaWVudCcgbW9kdWxlXG4gICAgICogVGhlc2Ugc2VydmljZXMgYXJlIGFuZ3VsYXIgYXdhcmUgdXNpbmcgYW5ndWxhcidzICRxIHdyYXBwZXJcbiAgICAgKi9cbiAgICBjb25zdCBzZXJ2aWNlQ2xhc3NlcyA9IHtcbiAgICAgICAgJ2dwSXRlbVNlcnZpY2UnICAgOiBOR0l0ZW1TZXJ2aWNlLFxuICAgICAgICAnZ3BVdGlsc1NlcnZpY2UnICA6IE5HVXRpbHNTZXJ2aWNlLFxuICAgICAgICAnZ3BEYXRhc2V0U2VydmljZSc6IE5HRGF0YXNldFNlcnZpY2UsXG4gICAgICAgICdncFNlcnZpY2VTZXJ2aWNlJzogTkdTZXJ2aWNlU2VydmljZSxcbiAgICAgICAgJ2dwTGF5ZXJTZXJ2aWNlJyAgOiBOR0xheWVyU2VydmljZSxcbiAgICAgICAgJ2dwTWFwU2VydmljZScgICAgOiBOR01hcFNlcnZpY2UsXG4gICAgICAgICdncEdhbGxlcnlTZXJ2aWNlJzogTkdHYWxsZXJ5U2VydmljZVxuICAgIH07XG5cbiAgICBPYmplY3Qua2V5cyhzZXJ2aWNlQ2xhc3NlcykuZm9yRWFjaCggKG5hbWUpID0+IHtcblxuICAgICAgICBsZXQgc3ZjQ2xhc3MgPSBzZXJ2aWNlQ2xhc3Nlc1tuYW1lXTtcblxuICAgICAgICBhbmd1bGFyLm1vZHVsZSgnZ3BDbGllbnQnKVxuXG4gICAgICAgIC8qXG4gICAgICAgICAgICBTZXJ2aWNlIGZvciBlYWNoIGNsaWVudCBzZXJ2aWNlIGNsYXNzIHRoYXQgdXNlcyB0aGVcbiAgICAgICAgICAgIGN1cnJlbnRseSBjb25maWd1cmVkIHNldHRpbmdzIHdoZW4gY3JlYXRlZC4gIE5vdGUgdGhlXG4gICAgICAgICAgICBzZXR0aW5ncyBtYXkgY2hhbmdlIGFmdGVyIHRoZSBzZXJ2aWNlIHNpbmdsZXRvbiBpc1xuICAgICAgICAgICAgY3JlYXRlZCwgaW4gd2hpY2ggY2FzZSB0aGUgZmFjdG9yeSBvcHRpb24gc2hvdWxkIGJlIHVzZWQuXG4gICAgICAgICAqL1xuICAgICAgICAuc2VydmljZShuYW1lLCBbICdncE5nSHR0cENsaWVudCcsICdncENvbmZpZycsICckcScsXG4gICAgICAgICAgICBmdW5jdGlvbiggZ3BOZ0h0dHBDbGllbnQsIGdwQ29uZmlnLCAkcSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VydmljZUZhY3RvcnkoZ3BOZ0h0dHBDbGllbnQsIHN2Y0NsYXNzLCBncENvbmZpZy51YWxVcmwsICRxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSlcblxuICAgICAgICAvKlxuICAgICAgICAgICAgRmFjdG9yeSBmb3IgY3JlYXRpbmcgc2VydmljZXMgZm9yIGVhY2ggY2xpZW50IHNlcnZpY2UgY2xhc3NcbiAgICAgICAgICAgIHdoaWNoIHVzZXMgYSBjdXN0b21pemFibGUgZW5kcG9pbnQgdG8gcmVxdWVzdCBkYXRhIGZyb20uIFVzZVxuICAgICAgICAgICAgdGhpcyBpZiBzZXJ2aWNlcyBuZWVkIHRvIGJlIGFibGUgdG8gY2hhbmdlIEFQSSBlbmRwb2ludHNcbiAgICAgICAgICAgIGR1cmluZyBhcHBsaWNhdGlvbiBydW50aW1lLlxuICAgICAgICAgKi9cbiAgICAgICAgLmZhY3RvcnkobmFtZSsnRmFjdG9yeScsIFsgJ2dwTmdIdHRwQ2xpZW50JywgJ2dwQ29uZmlnJywgJyRxJyxcbiAgICAgICAgICAgIGZ1bmN0aW9uKCBncE5nSHR0cENsaWVudCwgZ3BDb25maWcsICRxICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiggdXJsID86IHN0cmluZyApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2VGYWN0b3J5KFxuICAgICAgICAgICAgICAgICAgICAgICAgZ3BOZ0h0dHBDbGllbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdmNDbGFzcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCB8fCBncENvbmZpZy51YWxVcmwsXG4gICAgICAgICAgICAgICAgICAgICAgICAkcVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIF0pO1xuXG4gICAgfSk7XG59XG5cblxuXG5leHBvcnQgeyBOR0h0dHBDbGllbnQgfTtcbiJdfQ==