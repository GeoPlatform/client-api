import NGHttpClient from './http/ng';
import * as angular from "angular";
import { Config, QueryFactory, TrackingService } from "@geoplatform/client";
import { NGItemService, NGDatasetService, NGServiceService, NGLayerService, NGMapService, NGGalleryService, NGUtilsService, NGAssociationService } from './services/index';
if (angular && typeof (angular.module) !== 'undefined') {
    let serviceFactory = function (gpNgHttpClient, svcClass, url, $q) {
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
    const serviceClasses = {
        'gpItemService': NGItemService,
        'gpUtilsService': NGUtilsService,
        'gpDatasetService': NGDatasetService,
        'gpServiceService': NGServiceService,
        'gpLayerService': NGLayerService,
        'gpMapService': NGMapService,
        'gpGalleryService': NGGalleryService,
        'gpAssociationService': NGAssociationService
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50L2FuZ3VsYXJqcy8iLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sWUFBWSxNQUFNLFdBQVcsQ0FBQztBQUdyQyxPQUFPLEtBQUssT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUNuQyxPQUFPLEVBQ0gsTUFBTSxFQUFTLFlBQVksRUFDQSxlQUFlLEVBRTdDLE1BQU0scUJBQXFCLENBQUM7QUFFN0IsT0FBTyxFQUNILGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFDakQsY0FBYyxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFDOUMsY0FBYyxFQUFFLG9CQUFvQixFQUN2QyxNQUFNLGtCQUFrQixDQUFDO0FBRzFCLElBQUcsT0FBTyxJQUFJLE9BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssV0FBVyxFQUFFO0lBRWxELElBQUksY0FBYyxHQUFHLFVBQVMsY0FBYyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUMzRCxJQUFJLGFBQWEsS0FBSyxRQUFRLElBQU8sZ0JBQWdCLEtBQUssUUFBUTtZQUM5RCxnQkFBZ0IsS0FBSyxRQUFRLElBQUksY0FBYyxLQUFLLFFBQVE7WUFDNUQsWUFBWSxLQUFLLFFBQVEsSUFBUSxnQkFBZ0IsS0FBSyxRQUFRO1lBQzlELGNBQWMsS0FBSyxRQUFRLElBQU0sb0JBQW9CLEtBQUssUUFBUSxFQUFHO1lBQ3JFLE9BQU8sSUFBSSxRQUFRLENBQUUsR0FBRyxFQUFFLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNqRDtRQUNELE9BQU8sSUFBSSxRQUFRLENBQUUsR0FBRyxFQUFFLGNBQWMsQ0FBRSxDQUFDO0lBQy9DLENBQUMsQ0FBQTtJQUVEOzs7Ozs7Ozs7Ozs7Ozs7T0FlRztJQUNILE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQztTQUU3QixRQUFRLENBQUMsVUFBVSxFQUFFO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsT0FBTyxNQUFNLENBQUM7WUFDbEIsQ0FBQztTQUNKLENBQUM7SUFDTixDQUFDLENBQUM7U0FFRCxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsY0FBYSxPQUFPLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUU5RCxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSTtRQUNyQyxVQUFVLEtBQUssRUFBRSxFQUFFO1lBQ2YsT0FBTyxJQUFJLFlBQVksQ0FBQyxFQUFFLEtBQUssRUFBRyxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdkQsQ0FBQztLQUNKLENBQUM7U0FFRCxPQUFPLENBQUMsMEJBQTBCLEVBQUU7UUFDakMsT0FBTyxVQUFTLE9BQU87WUFDbkIsT0FBTyxJQUFJLGVBQWUsQ0FBRSxPQUFPLENBQUUsQ0FBQztRQUMxQyxDQUFDLENBQUM7SUFDTixDQUFDLENBQUMsQ0FFRDtJQUdEOzs7T0FHRztJQUNILE1BQU0sY0FBYyxHQUFHO1FBQ25CLGVBQWUsRUFBUyxhQUFhO1FBQ3JDLGdCQUFnQixFQUFRLGNBQWM7UUFDdEMsa0JBQWtCLEVBQU0sZ0JBQWdCO1FBQ3hDLGtCQUFrQixFQUFNLGdCQUFnQjtRQUN4QyxnQkFBZ0IsRUFBUSxjQUFjO1FBQ3RDLGNBQWMsRUFBVSxZQUFZO1FBQ3BDLGtCQUFrQixFQUFNLGdCQUFnQjtRQUN4QyxzQkFBc0IsRUFBRSxvQkFBb0I7S0FDL0MsQ0FBQztJQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsT0FBTyxDQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFFMUMsSUFBSSxRQUFRLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXBDLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO1lBRTFCOzs7OztlQUtHO2FBQ0YsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFFLGdCQUFnQixFQUFFLFVBQVUsRUFBRSxJQUFJO1lBQy9DLFVBQVUsY0FBYyxFQUFFLFFBQVEsRUFBRSxFQUFFO2dCQUNsQyxPQUFPLGNBQWMsQ0FBQyxjQUFjLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDekUsQ0FBQztTQUNKLENBQUM7WUFFRjs7Ozs7ZUFLRzthQUNGLE9BQU8sQ0FBQyxJQUFJLEdBQUMsU0FBUyxFQUFFLENBQUUsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLElBQUk7WUFDekQsVUFBVSxjQUFjLEVBQUUsUUFBUSxFQUFFLEVBQUU7Z0JBQ2xDLE9BQU8sVUFBVSxHQUFhO29CQUMxQixPQUFPLGNBQWMsQ0FDakIsY0FBYyxFQUNkLFFBQVEsRUFDUixHQUFHLElBQUksUUFBUSxDQUFDLE1BQU0sRUFDdEIsRUFBRSxDQUNMLENBQUM7Z0JBQ04sQ0FBQyxDQUFDO1lBQ04sQ0FBQztTQUNKLENBQUMsQ0FBQztJQUVQLENBQUMsQ0FBQyxDQUFDO0NBQ047QUFJRCxPQUFPLEVBQUUsWUFBWSxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBOR0h0dHBDbGllbnQgZnJvbSAnLi9odHRwL25nJztcblxuXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gXCJhbmd1bGFyXCI7XG5pbXBvcnQge1xuICAgIENvbmZpZywgUXVlcnksIFF1ZXJ5RmFjdG9yeSwgSXRlbSwgU2VhcmNoUmVzdWx0cywgR1BIdHRwQ2xpZW50LFxuICAgIEl0ZW1TZXJ2aWNlLCBVdGlsc1NlcnZpY2UsIFRyYWNraW5nU2VydmljZSwgQXNzb2NpYXRpb25TZXJ2aWNlLFxuICAgIERhdGFzZXRTZXJ2aWNlLCBTZXJ2aWNlU2VydmljZSwgTGF5ZXJTZXJ2aWNlLCBNYXBTZXJ2aWNlLCBHYWxsZXJ5U2VydmljZVxufSBmcm9tIFwiQGdlb3BsYXRmb3JtL2NsaWVudFwiO1xuXG5pbXBvcnQge1xuICAgIE5HSXRlbVNlcnZpY2UsIE5HRGF0YXNldFNlcnZpY2UsIE5HU2VydmljZVNlcnZpY2UsXG4gICAgTkdMYXllclNlcnZpY2UsIE5HTWFwU2VydmljZSwgTkdHYWxsZXJ5U2VydmljZSxcbiAgICBOR1V0aWxzU2VydmljZSwgTkdBc3NvY2lhdGlvblNlcnZpY2Vcbn0gZnJvbSAnLi9zZXJ2aWNlcy9pbmRleCc7XG5cblxuaWYoYW5ndWxhciAmJiB0eXBlb2YoYW5ndWxhci5tb2R1bGUpICE9PSAndW5kZWZpbmVkJykge1xuXG4gICAgbGV0IHNlcnZpY2VGYWN0b3J5ID0gZnVuY3Rpb24oZ3BOZ0h0dHBDbGllbnQsIHN2Y0NsYXNzLCB1cmwsICRxKSB7XG4gICAgICAgIGlmKCBOR0l0ZW1TZXJ2aWNlID09PSBzdmNDbGFzcyAgICB8fCBOR0RhdGFzZXRTZXJ2aWNlID09PSBzdmNDbGFzcyB8fFxuICAgICAgICAgICAgTkdTZXJ2aWNlU2VydmljZSA9PT0gc3ZjQ2xhc3MgfHwgTkdMYXllclNlcnZpY2UgPT09IHN2Y0NsYXNzIHx8XG4gICAgICAgICAgICBOR01hcFNlcnZpY2UgPT09IHN2Y0NsYXNzICAgICB8fCBOR0dhbGxlcnlTZXJ2aWNlID09PSBzdmNDbGFzcyB8fFxuICAgICAgICAgICAgTkdVdGlsc1NlcnZpY2UgPT09IHN2Y0NsYXNzICAgfHwgTkdBc3NvY2lhdGlvblNlcnZpY2UgPT09IHN2Y0NsYXNzICkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBzdmNDbGFzcyggdXJsLCBncE5nSHR0cENsaWVudCwgJHEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgc3ZjQ2xhc3MoIHVybCwgZ3BOZ0h0dHBDbGllbnQgKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIERlZmluZSBBbmd1bGFySlMgbW9kdWxlIHRoYXQgY2FuIGJlIGluY2x1ZGVkIGluIGRvd25zdHJlYW0gYXBwbGljYXRpb25zXG4gICAgICpcbiAgICAgKiBFeGFtcGxlOlxuICAgICAqXG4gICAgICogIGFuZ3VsYXIubW9kdWxlKCdteUFwcCcsIFsgJ3VpLXJvdXRlcicsICdncENsaWVudCcgXSlcbiAgICAgKiAgLmNvbXBvbmVudCgnbXlDb21wb25lbnQnLCB7XG4gICAgICogICAgYmluZGluZ3M6IHsgfSxcbiAgICAgKiAgICB0ZW1wbGF0ZTogXCI8ZGl2PjwvZGl2PlwiLFxuICAgICAqICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKGdwUXVlcnlGYWN0b3J5LCBncEl0ZW1TZXJ2aWNlKSB7XG4gICAgICogICAgICAgdGhpcy4kb25Jbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgICogICAgICAgICAgZ3BJdGVtU2VydmljZS5zZWFyY2goIGdwUXVlcnlGYWN0b3J5KCkgKS50aGVuKCByZXNwb25zZSA9PiB7IC4uLiB9KTtcbiAgICAgKiAgICAgICB9O1xuICAgICAqICAgIH1cbiAgICAgKiAgXSk7XG4gICAgICovXG4gICAgYW5ndWxhci5tb2R1bGUoJ2dwQ2xpZW50JywgW10pXG5cbiAgICAucHJvdmlkZXIoJ2dwQ29uZmlnJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAkZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gQ29uZmlnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0pXG5cbiAgICAuZmFjdG9yeSgnZ3BRdWVyeUZhY3RvcnknLCBmdW5jdGlvbigpIHsgcmV0dXJuIFF1ZXJ5RmFjdG9yeTsgfSlcblxuICAgIC5mYWN0b3J5KCdncE5nSHR0cENsaWVudCcsIFsnJGh0dHAnLCAnJHEnLFxuICAgICAgICBmdW5jdGlvbiggJGh0dHAsICRxICkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBOR0h0dHBDbGllbnQoeyAkaHR0cCA6ICRodHRwLCAkcTogJHEgfSk7XG4gICAgICAgIH1cbiAgICBdKVxuXG4gICAgLmZhY3RvcnkoJ2dwVHJhY2tpbmdTZXJ2aWNlRmFjdG9yeScsIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBUcmFja2luZ1NlcnZpY2UoIG9wdGlvbnMgKTtcbiAgICAgICAgfTtcbiAgICB9KVxuXG4gICAgO1xuXG5cbiAgICAvKlxuICAgICAqIEV4cG9zZSBTZXJ2aWNlIGluc3RhbmNlcyBpbiB0aGUgJ2dwQ2xpZW50JyBtb2R1bGVcbiAgICAgKiBUaGVzZSBzZXJ2aWNlcyBhcmUgYW5ndWxhciBhd2FyZSB1c2luZyBhbmd1bGFyJ3MgJHEgd3JhcHBlclxuICAgICAqL1xuICAgIGNvbnN0IHNlcnZpY2VDbGFzc2VzID0ge1xuICAgICAgICAnZ3BJdGVtU2VydmljZScgICAgICAgOiBOR0l0ZW1TZXJ2aWNlLFxuICAgICAgICAnZ3BVdGlsc1NlcnZpY2UnICAgICAgOiBOR1V0aWxzU2VydmljZSxcbiAgICAgICAgJ2dwRGF0YXNldFNlcnZpY2UnICAgIDogTkdEYXRhc2V0U2VydmljZSxcbiAgICAgICAgJ2dwU2VydmljZVNlcnZpY2UnICAgIDogTkdTZXJ2aWNlU2VydmljZSxcbiAgICAgICAgJ2dwTGF5ZXJTZXJ2aWNlJyAgICAgIDogTkdMYXllclNlcnZpY2UsXG4gICAgICAgICdncE1hcFNlcnZpY2UnICAgICAgICA6IE5HTWFwU2VydmljZSxcbiAgICAgICAgJ2dwR2FsbGVyeVNlcnZpY2UnICAgIDogTkdHYWxsZXJ5U2VydmljZSxcbiAgICAgICAgJ2dwQXNzb2NpYXRpb25TZXJ2aWNlJzogTkdBc3NvY2lhdGlvblNlcnZpY2VcbiAgICB9O1xuXG4gICAgT2JqZWN0LmtleXMoc2VydmljZUNsYXNzZXMpLmZvckVhY2goIChuYW1lKSA9PiB7XG5cbiAgICAgICAgbGV0IHN2Y0NsYXNzID0gc2VydmljZUNsYXNzZXNbbmFtZV07XG5cbiAgICAgICAgYW5ndWxhci5tb2R1bGUoJ2dwQ2xpZW50JylcblxuICAgICAgICAvKlxuICAgICAgICAgICAgU2VydmljZSBmb3IgZWFjaCBjbGllbnQgc2VydmljZSBjbGFzcyB0aGF0IHVzZXMgdGhlXG4gICAgICAgICAgICBjdXJyZW50bHkgY29uZmlndXJlZCBzZXR0aW5ncyB3aGVuIGNyZWF0ZWQuICBOb3RlIHRoZVxuICAgICAgICAgICAgc2V0dGluZ3MgbWF5IGNoYW5nZSBhZnRlciB0aGUgc2VydmljZSBzaW5nbGV0b24gaXNcbiAgICAgICAgICAgIGNyZWF0ZWQsIGluIHdoaWNoIGNhc2UgdGhlIGZhY3Rvcnkgb3B0aW9uIHNob3VsZCBiZSB1c2VkLlxuICAgICAgICAgKi9cbiAgICAgICAgLnNlcnZpY2UobmFtZSwgWyAnZ3BOZ0h0dHBDbGllbnQnLCAnZ3BDb25maWcnLCAnJHEnLFxuICAgICAgICAgICAgZnVuY3Rpb24oIGdwTmdIdHRwQ2xpZW50LCBncENvbmZpZywgJHEgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2VGYWN0b3J5KGdwTmdIdHRwQ2xpZW50LCBzdmNDbGFzcywgZ3BDb25maWcudWFsVXJsLCAkcSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIF0pXG5cbiAgICAgICAgLypcbiAgICAgICAgICAgIEZhY3RvcnkgZm9yIGNyZWF0aW5nIHNlcnZpY2VzIGZvciBlYWNoIGNsaWVudCBzZXJ2aWNlIGNsYXNzXG4gICAgICAgICAgICB3aGljaCB1c2VzIGEgY3VzdG9taXphYmxlIGVuZHBvaW50IHRvIHJlcXVlc3QgZGF0YSBmcm9tLiBVc2VcbiAgICAgICAgICAgIHRoaXMgaWYgc2VydmljZXMgbmVlZCB0byBiZSBhYmxlIHRvIGNoYW5nZSBBUEkgZW5kcG9pbnRzXG4gICAgICAgICAgICBkdXJpbmcgYXBwbGljYXRpb24gcnVudGltZS5cbiAgICAgICAgICovXG4gICAgICAgIC5mYWN0b3J5KG5hbWUrJ0ZhY3RvcnknLCBbICdncE5nSHR0cENsaWVudCcsICdncENvbmZpZycsICckcScsXG4gICAgICAgICAgICBmdW5jdGlvbiggZ3BOZ0h0dHBDbGllbnQsIGdwQ29uZmlnLCAkcSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oIHVybCA/OiBzdHJpbmcgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlRmFjdG9yeShcbiAgICAgICAgICAgICAgICAgICAgICAgIGdwTmdIdHRwQ2xpZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgc3ZjQ2xhc3MsXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwgfHwgZ3BDb25maWcudWFsVXJsLFxuICAgICAgICAgICAgICAgICAgICAgICAgJHFcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICBdKTtcblxuICAgIH0pO1xufVxuXG5cblxuZXhwb3J0IHsgTkdIdHRwQ2xpZW50IH07XG4iXX0=