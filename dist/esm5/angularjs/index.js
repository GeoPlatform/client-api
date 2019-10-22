import NGHttpClient from './http/ng';
import * as angular from "angular";
import { Config, QueryFactory, TrackingService } from "@geoplatform/client";
import { NGItemService, NGDatasetService, NGServiceService, NGLayerService, NGMapService, NGGalleryService, NGUtilsService, NGAssociationService } from './services/index';
if (angular && typeof (angular.module) !== 'undefined') {
    var serviceFactory_1 = function (gpNgHttpClient, svcClass, url, $q) {
        if (NGItemService === svcClass || NGDatasetService === svcClass ||
            NGServiceService === svcClass || NGLayerService === svcClass ||
            NGMapService === svcClass || NGGalleryService === svcClass ||
            NGUtilsService === svcClass || NGAssociationService === svcClass) {
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
    var serviceClasses_1 = {
        'gpItemService': NGItemService,
        'gpUtilsService': NGUtilsService,
        'gpDatasetService': NGDatasetService,
        'gpServiceService': NGServiceService,
        'gpLayerService': NGLayerService,
        'gpMapService': NGMapService,
        'gpGalleryService': NGGalleryService,
        'gpAssociationService': NGAssociationService
    };
    Object.keys(serviceClasses_1).forEach(function (name) {
        var svcClass = serviceClasses_1[name];
        angular.module('gpClient')
            /*
                Service for each client service class that uses the
                currently configured settings when created.  Note the
                settings may change after the service singleton is
                created, in which case the factory option should be used.
             */
            .service(name, ['gpNgHttpClient', 'gpConfig', '$q',
            function (gpNgHttpClient, gpConfig, $q) {
                return serviceFactory_1(gpNgHttpClient, svcClass, gpConfig.ualUrl, $q);
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
                    return serviceFactory_1(gpNgHttpClient, svcClass, url || gpConfig.ualUrl, $q);
                };
            }
        ]);
    });
}
export { NGHttpClient };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50L2FuZ3VsYXJqcy8iLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sWUFBWSxNQUFNLFdBQVcsQ0FBQztBQUdyQyxPQUFPLEtBQUssT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUNuQyxPQUFPLEVBQ0gsTUFBTSxFQUFTLFlBQVksRUFDQSxlQUFlLEVBRTdDLE1BQU0scUJBQXFCLENBQUM7QUFFN0IsT0FBTyxFQUNILGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFDakQsY0FBYyxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFDOUMsY0FBYyxFQUFFLG9CQUFvQixFQUN2QyxNQUFNLGtCQUFrQixDQUFDO0FBRzFCLElBQUcsT0FBTyxJQUFJLE9BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssV0FBVyxFQUFFO0lBRWxELElBQUksZ0JBQWMsR0FBRyxVQUFTLGNBQWMsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDM0QsSUFBSSxhQUFhLEtBQUssUUFBUSxJQUFPLGdCQUFnQixLQUFLLFFBQVE7WUFDOUQsZ0JBQWdCLEtBQUssUUFBUSxJQUFJLGNBQWMsS0FBSyxRQUFRO1lBQzVELFlBQVksS0FBSyxRQUFRLElBQVEsZ0JBQWdCLEtBQUssUUFBUTtZQUM5RCxjQUFjLEtBQUssUUFBUSxJQUFNLG9CQUFvQixLQUFLLFFBQVEsRUFBRztZQUNyRSxPQUFPLElBQUksUUFBUSxDQUFFLEdBQUcsRUFBRSxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDakQ7UUFDRCxPQUFPLElBQUksUUFBUSxDQUFFLEdBQUcsRUFBRSxjQUFjLENBQUUsQ0FBQztJQUMvQyxDQUFDLENBQUE7SUFFRDs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDSCxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUM7U0FFN0IsUUFBUSxDQUFDLFVBQVUsRUFBRTtRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLE9BQU8sTUFBTSxDQUFDO1lBQ2xCLENBQUM7U0FDSixDQUFDO0lBQ04sQ0FBQyxDQUFDO1NBRUQsT0FBTyxDQUFDLGdCQUFnQixFQUFFLGNBQWEsT0FBTyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FFOUQsT0FBTyxDQUFDLGdCQUFnQixFQUFFLENBQUMsT0FBTyxFQUFFLElBQUk7UUFDckMsVUFBVSxLQUFLLEVBQUUsRUFBRTtZQUNmLE9BQU8sSUFBSSxZQUFZLENBQUMsRUFBRSxLQUFLLEVBQUcsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZELENBQUM7S0FDSixDQUFDO1NBRUQsT0FBTyxDQUFDLDBCQUEwQixFQUFFO1FBQ2pDLE9BQU8sVUFBUyxPQUFPO1lBQ25CLE9BQU8sSUFBSSxlQUFlLENBQUUsT0FBTyxDQUFFLENBQUM7UUFDMUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLENBRUQ7SUFHRDs7O09BR0c7SUFDSCxJQUFNLGdCQUFjLEdBQUc7UUFDbkIsZUFBZSxFQUFTLGFBQWE7UUFDckMsZ0JBQWdCLEVBQVEsY0FBYztRQUN0QyxrQkFBa0IsRUFBTSxnQkFBZ0I7UUFDeEMsa0JBQWtCLEVBQU0sZ0JBQWdCO1FBQ3hDLGdCQUFnQixFQUFRLGNBQWM7UUFDdEMsY0FBYyxFQUFVLFlBQVk7UUFDcEMsa0JBQWtCLEVBQU0sZ0JBQWdCO1FBQ3hDLHNCQUFzQixFQUFFLG9CQUFvQjtLQUMvQyxDQUFDO0lBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBYyxDQUFDLENBQUMsT0FBTyxDQUFFLFVBQUMsSUFBSTtRQUV0QyxJQUFJLFFBQVEsR0FBRyxnQkFBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXBDLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO1lBRTFCOzs7OztlQUtHO2FBQ0YsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFFLGdCQUFnQixFQUFFLFVBQVUsRUFBRSxJQUFJO1lBQy9DLFVBQVUsY0FBYyxFQUFFLFFBQVEsRUFBRSxFQUFFO2dCQUNsQyxPQUFPLGdCQUFjLENBQUMsY0FBYyxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3pFLENBQUM7U0FDSixDQUFDO1lBRUY7Ozs7O2VBS0c7YUFDRixPQUFPLENBQUMsSUFBSSxHQUFDLFNBQVMsRUFBRSxDQUFFLGdCQUFnQixFQUFFLFVBQVUsRUFBRSxJQUFJO1lBQ3pELFVBQVUsY0FBYyxFQUFFLFFBQVEsRUFBRSxFQUFFO2dCQUNsQyxPQUFPLFVBQVUsR0FBYTtvQkFDMUIsT0FBTyxnQkFBYyxDQUNqQixjQUFjLEVBQ2QsUUFBUSxFQUNSLEdBQUcsSUFBSSxRQUFRLENBQUMsTUFBTSxFQUN0QixFQUFFLENBQ0wsQ0FBQztnQkFDTixDQUFDLENBQUM7WUFDTixDQUFDO1NBQ0osQ0FBQyxDQUFDO0lBRVAsQ0FBQyxDQUFDLENBQUM7Q0FDTjtBQUlELE9BQU8sRUFBRSxZQUFZLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IE5HSHR0cENsaWVudCBmcm9tICcuL2h0dHAvbmcnO1xuXG5cbmltcG9ydCAqIGFzIGFuZ3VsYXIgZnJvbSBcImFuZ3VsYXJcIjtcbmltcG9ydCB7XG4gICAgQ29uZmlnLCBRdWVyeSwgUXVlcnlGYWN0b3J5LCBJdGVtLCBTZWFyY2hSZXN1bHRzLCBHUEh0dHBDbGllbnQsXG4gICAgSXRlbVNlcnZpY2UsIFV0aWxzU2VydmljZSwgVHJhY2tpbmdTZXJ2aWNlLCBBc3NvY2lhdGlvblNlcnZpY2UsXG4gICAgRGF0YXNldFNlcnZpY2UsIFNlcnZpY2VTZXJ2aWNlLCBMYXllclNlcnZpY2UsIE1hcFNlcnZpY2UsIEdhbGxlcnlTZXJ2aWNlXG59IGZyb20gXCJAZ2VvcGxhdGZvcm0vY2xpZW50XCI7XG5cbmltcG9ydCB7XG4gICAgTkdJdGVtU2VydmljZSwgTkdEYXRhc2V0U2VydmljZSwgTkdTZXJ2aWNlU2VydmljZSxcbiAgICBOR0xheWVyU2VydmljZSwgTkdNYXBTZXJ2aWNlLCBOR0dhbGxlcnlTZXJ2aWNlLFxuICAgIE5HVXRpbHNTZXJ2aWNlLCBOR0Fzc29jaWF0aW9uU2VydmljZVxufSBmcm9tICcuL3NlcnZpY2VzL2luZGV4JztcblxuXG5pZihhbmd1bGFyICYmIHR5cGVvZihhbmd1bGFyLm1vZHVsZSkgIT09ICd1bmRlZmluZWQnKSB7XG5cbiAgICBsZXQgc2VydmljZUZhY3RvcnkgPSBmdW5jdGlvbihncE5nSHR0cENsaWVudCwgc3ZjQ2xhc3MsIHVybCwgJHEpIHtcbiAgICAgICAgaWYoIE5HSXRlbVNlcnZpY2UgPT09IHN2Y0NsYXNzICAgIHx8IE5HRGF0YXNldFNlcnZpY2UgPT09IHN2Y0NsYXNzIHx8XG4gICAgICAgICAgICBOR1NlcnZpY2VTZXJ2aWNlID09PSBzdmNDbGFzcyB8fCBOR0xheWVyU2VydmljZSA9PT0gc3ZjQ2xhc3MgfHxcbiAgICAgICAgICAgIE5HTWFwU2VydmljZSA9PT0gc3ZjQ2xhc3MgICAgIHx8IE5HR2FsbGVyeVNlcnZpY2UgPT09IHN2Y0NsYXNzIHx8XG4gICAgICAgICAgICBOR1V0aWxzU2VydmljZSA9PT0gc3ZjQ2xhc3MgICB8fCBOR0Fzc29jaWF0aW9uU2VydmljZSA9PT0gc3ZjQ2xhc3MgKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IHN2Y0NsYXNzKCB1cmwsIGdwTmdIdHRwQ2xpZW50LCAkcSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBzdmNDbGFzcyggdXJsLCBncE5nSHR0cENsaWVudCApO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogRGVmaW5lIEFuZ3VsYXJKUyBtb2R1bGUgdGhhdCBjYW4gYmUgaW5jbHVkZWQgaW4gZG93bnN0cmVhbSBhcHBsaWNhdGlvbnNcbiAgICAgKlxuICAgICAqIEV4YW1wbGU6XG4gICAgICpcbiAgICAgKiAgYW5ndWxhci5tb2R1bGUoJ215QXBwJywgWyAndWktcm91dGVyJywgJ2dwQ2xpZW50JyBdKVxuICAgICAqICAuY29tcG9uZW50KCdteUNvbXBvbmVudCcsIHtcbiAgICAgKiAgICBiaW5kaW5nczogeyB9LFxuICAgICAqICAgIHRlbXBsYXRlOiBcIjxkaXY+PC9kaXY+XCIsXG4gICAgICogICAgY29udHJvbGxlcjogZnVuY3Rpb24oZ3BRdWVyeUZhY3RvcnksIGdwSXRlbVNlcnZpY2UpIHtcbiAgICAgKiAgICAgICB0aGlzLiRvbkluaXQgPSBmdW5jdGlvbigpIHtcbiAgICAgKiAgICAgICAgICBncEl0ZW1TZXJ2aWNlLnNlYXJjaCggZ3BRdWVyeUZhY3RvcnkoKSApLnRoZW4oIHJlc3BvbnNlID0+IHsgLi4uIH0pO1xuICAgICAqICAgICAgIH07XG4gICAgICogICAgfVxuICAgICAqICBdKTtcbiAgICAgKi9cbiAgICBhbmd1bGFyLm1vZHVsZSgnZ3BDbGllbnQnLCBbXSlcblxuICAgIC5wcm92aWRlcignZ3BDb25maWcnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICRnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBDb25maWc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSlcblxuICAgIC5mYWN0b3J5KCdncFF1ZXJ5RmFjdG9yeScsIGZ1bmN0aW9uKCkgeyByZXR1cm4gUXVlcnlGYWN0b3J5OyB9KVxuXG4gICAgLmZhY3RvcnkoJ2dwTmdIdHRwQ2xpZW50JywgWyckaHR0cCcsICckcScsXG4gICAgICAgIGZ1bmN0aW9uKCAkaHR0cCwgJHEgKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IE5HSHR0cENsaWVudCh7ICRodHRwIDogJGh0dHAsICRxOiAkcSB9KTtcbiAgICAgICAgfVxuICAgIF0pXG5cbiAgICAuZmFjdG9yeSgnZ3BUcmFja2luZ1NlcnZpY2VGYWN0b3J5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFRyYWNraW5nU2VydmljZSggb3B0aW9ucyApO1xuICAgICAgICB9O1xuICAgIH0pXG5cbiAgICA7XG5cblxuICAgIC8qXG4gICAgICogRXhwb3NlIFNlcnZpY2UgaW5zdGFuY2VzIGluIHRoZSAnZ3BDbGllbnQnIG1vZHVsZVxuICAgICAqIFRoZXNlIHNlcnZpY2VzIGFyZSBhbmd1bGFyIGF3YXJlIHVzaW5nIGFuZ3VsYXIncyAkcSB3cmFwcGVyXG4gICAgICovXG4gICAgY29uc3Qgc2VydmljZUNsYXNzZXMgPSB7XG4gICAgICAgICdncEl0ZW1TZXJ2aWNlJyAgICAgICA6IE5HSXRlbVNlcnZpY2UsXG4gICAgICAgICdncFV0aWxzU2VydmljZScgICAgICA6IE5HVXRpbHNTZXJ2aWNlLFxuICAgICAgICAnZ3BEYXRhc2V0U2VydmljZScgICAgOiBOR0RhdGFzZXRTZXJ2aWNlLFxuICAgICAgICAnZ3BTZXJ2aWNlU2VydmljZScgICAgOiBOR1NlcnZpY2VTZXJ2aWNlLFxuICAgICAgICAnZ3BMYXllclNlcnZpY2UnICAgICAgOiBOR0xheWVyU2VydmljZSxcbiAgICAgICAgJ2dwTWFwU2VydmljZScgICAgICAgIDogTkdNYXBTZXJ2aWNlLFxuICAgICAgICAnZ3BHYWxsZXJ5U2VydmljZScgICAgOiBOR0dhbGxlcnlTZXJ2aWNlLFxuICAgICAgICAnZ3BBc3NvY2lhdGlvblNlcnZpY2UnOiBOR0Fzc29jaWF0aW9uU2VydmljZVxuICAgIH07XG5cbiAgICBPYmplY3Qua2V5cyhzZXJ2aWNlQ2xhc3NlcykuZm9yRWFjaCggKG5hbWUpID0+IHtcblxuICAgICAgICBsZXQgc3ZjQ2xhc3MgPSBzZXJ2aWNlQ2xhc3Nlc1tuYW1lXTtcblxuICAgICAgICBhbmd1bGFyLm1vZHVsZSgnZ3BDbGllbnQnKVxuXG4gICAgICAgIC8qXG4gICAgICAgICAgICBTZXJ2aWNlIGZvciBlYWNoIGNsaWVudCBzZXJ2aWNlIGNsYXNzIHRoYXQgdXNlcyB0aGVcbiAgICAgICAgICAgIGN1cnJlbnRseSBjb25maWd1cmVkIHNldHRpbmdzIHdoZW4gY3JlYXRlZC4gIE5vdGUgdGhlXG4gICAgICAgICAgICBzZXR0aW5ncyBtYXkgY2hhbmdlIGFmdGVyIHRoZSBzZXJ2aWNlIHNpbmdsZXRvbiBpc1xuICAgICAgICAgICAgY3JlYXRlZCwgaW4gd2hpY2ggY2FzZSB0aGUgZmFjdG9yeSBvcHRpb24gc2hvdWxkIGJlIHVzZWQuXG4gICAgICAgICAqL1xuICAgICAgICAuc2VydmljZShuYW1lLCBbICdncE5nSHR0cENsaWVudCcsICdncENvbmZpZycsICckcScsXG4gICAgICAgICAgICBmdW5jdGlvbiggZ3BOZ0h0dHBDbGllbnQsIGdwQ29uZmlnLCAkcSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VydmljZUZhY3RvcnkoZ3BOZ0h0dHBDbGllbnQsIHN2Y0NsYXNzLCBncENvbmZpZy51YWxVcmwsICRxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSlcblxuICAgICAgICAvKlxuICAgICAgICAgICAgRmFjdG9yeSBmb3IgY3JlYXRpbmcgc2VydmljZXMgZm9yIGVhY2ggY2xpZW50IHNlcnZpY2UgY2xhc3NcbiAgICAgICAgICAgIHdoaWNoIHVzZXMgYSBjdXN0b21pemFibGUgZW5kcG9pbnQgdG8gcmVxdWVzdCBkYXRhIGZyb20uIFVzZVxuICAgICAgICAgICAgdGhpcyBpZiBzZXJ2aWNlcyBuZWVkIHRvIGJlIGFibGUgdG8gY2hhbmdlIEFQSSBlbmRwb2ludHNcbiAgICAgICAgICAgIGR1cmluZyBhcHBsaWNhdGlvbiBydW50aW1lLlxuICAgICAgICAgKi9cbiAgICAgICAgLmZhY3RvcnkobmFtZSsnRmFjdG9yeScsIFsgJ2dwTmdIdHRwQ2xpZW50JywgJ2dwQ29uZmlnJywgJyRxJyxcbiAgICAgICAgICAgIGZ1bmN0aW9uKCBncE5nSHR0cENsaWVudCwgZ3BDb25maWcsICRxICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiggdXJsID86IHN0cmluZyApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2VGYWN0b3J5KFxuICAgICAgICAgICAgICAgICAgICAgICAgZ3BOZ0h0dHBDbGllbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdmNDbGFzcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCB8fCBncENvbmZpZy51YWxVcmwsXG4gICAgICAgICAgICAgICAgICAgICAgICAkcVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIF0pO1xuXG4gICAgfSk7XG59XG5cblxuXG5leHBvcnQgeyBOR0h0dHBDbGllbnQgfTtcbiJdfQ==