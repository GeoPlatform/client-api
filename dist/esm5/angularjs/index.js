/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import NGHttpClient from './http/ng';
import * as angular from "angular";
import { Config, QueryFactory, ItemService, UtilsService, TrackingService, DatasetService, ServiceService, LayerService, MapService, GalleryService } from "@geoplatform/client";
if (angular && typeof (angular.module) !== 'undefined') {
    /** @type {?} */
    var serviceFactory_1 = function (gpNgHttpClient, svcClass, url) {
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
    var serviceClasses_1 = {
        'gpItemService': ItemService,
        'gpUtilsService': UtilsService,
        'gpDatasetService': DatasetService,
        'gpServiceService': ServiceService,
        'gpLayerService': LayerService,
        'gpMapService': MapService,
        'gpGalleryService': GalleryService
    };
    Object.keys(serviceClasses_1).forEach(function (name) {
        /** @type {?} */
        var svcClass = serviceClasses_1[name];
        angular.module('gpClient')
            /*
                Service for each client service class that uses the
                currently configured settings when created.  Note the
                settings may change after the service singleton is
                created, in which case the factory option should be used.
             */
            .service(name, ['gpNgHttpClient', 'gpConfig',
            function (gpNgHttpClient, gpConfig) {
                return serviceFactory_1(gpNgHttpClient, svcClass, gpConfig.ualUrl);
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
                    return serviceFactory_1(gpNgHttpClient, svcClass, url);
                };
            }]);
    });
}
export { NGHttpClient };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY2xpZW50L2FuZ3VsYXJqcy8iLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLFlBQVksTUFBTSxXQUFXLENBQUM7QUFHckMsT0FBTyxLQUFLLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFDbkMsT0FBTyxFQUNILE1BQU0sRUFBUyxZQUFZLEVBQzNCLFdBQVcsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUMxQyxjQUFjLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUMzRSxNQUFNLHFCQUFxQixDQUFDO0FBRTdCLElBQUcsT0FBTyxJQUFJLE9BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssV0FBVyxFQUFFOztJQUVsRCxJQUFJLGdCQUFjLEdBQUcsVUFBUyxjQUFjLEVBQUUsUUFBUSxFQUFFLEdBQUc7UUFDdkQsT0FBTyxJQUFJLFFBQVEsQ0FBRSxHQUFHLEVBQUUsY0FBYyxDQUFFLENBQUM7S0FDOUMsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFrQkQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDO1NBRTdCLFFBQVEsQ0FBQyxVQUFVLEVBQUU7UUFDbEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFDRixPQUFPLE1BQU0sQ0FBQzthQUNqQjtTQUNKLENBQUM7S0FDTCxDQUFDO1NBRUQsT0FBTyxDQUFDLGdCQUFnQixFQUFFLGNBQWEsT0FBTyxZQUFZLENBQUMsRUFBRSxDQUFDO1NBRTlELE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLE9BQU87UUFDL0IsVUFBVSxLQUFLO1lBQ1gsT0FBTyxJQUFJLFlBQVksQ0FBQyxFQUFFLEtBQUssRUFBRyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1NBQzlDO0tBQ0osQ0FBQztTQUVELE9BQU8sQ0FBQywwQkFBMEIsRUFBRTtRQUNqQyxPQUFPLFVBQVMsT0FBTztZQUNuQixPQUFPLElBQUksZUFBZSxDQUFFLE9BQU8sQ0FBRSxDQUFDO1NBQ3pDLENBQUM7S0FDTCxDQUFDLENBRUQ7O0lBR0QsSUFBTSxnQkFBYyxHQUFHO1FBQ25CLGVBQWUsRUFBRSxXQUFXO1FBQzVCLGdCQUFnQixFQUFFLFlBQVk7UUFDOUIsa0JBQWtCLEVBQUUsY0FBYztRQUNsQyxrQkFBa0IsRUFBRSxjQUFjO1FBQ2xDLGdCQUFnQixFQUFFLFlBQVk7UUFDOUIsY0FBYyxFQUFFLFVBQVU7UUFDMUIsa0JBQWtCLEVBQUUsY0FBYztLQUNyQyxDQUFDO0lBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBYyxDQUFDLENBQUMsT0FBTyxDQUFFLFVBQUMsSUFBSTs7UUFFdEMsSUFBSSxRQUFRLEdBQUcsZ0JBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVwQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztZQUUxQjs7Ozs7ZUFLRzthQUNGLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVO1lBQ3hDLFVBQVMsY0FBYyxFQUFFLFFBQVE7Z0JBQzdCLE9BQU8sZ0JBQWMsQ0FBQyxjQUFjLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNwRTtTQUNKLENBQUM7WUFFRjs7Ozs7ZUFLRzthQUNGLE9BQU8sQ0FBQyxJQUFJLEdBQUMsU0FBUyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsVUFBUyxjQUFjO2dCQUMvRCxPQUFPLFVBQVMsR0FBRztvQkFDZixPQUFPLGdCQUFjLENBQUMsY0FBYyxFQUFFLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztpQkFDeEQsQ0FBQzthQUNMLENBQUMsQ0FBQyxDQUFDO0tBRVAsQ0FBQyxDQUFDO0NBQ047QUFJRCxPQUFPLEVBQUUsWUFBWSxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBOR0h0dHBDbGllbnQgZnJvbSAnLi9odHRwL25nJztcblxuXG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gXCJhbmd1bGFyXCI7XG5pbXBvcnQge1xuICAgIENvbmZpZywgUXVlcnksIFF1ZXJ5RmFjdG9yeSxcbiAgICBJdGVtU2VydmljZSwgVXRpbHNTZXJ2aWNlLCBUcmFja2luZ1NlcnZpY2UsXG4gICAgRGF0YXNldFNlcnZpY2UsIFNlcnZpY2VTZXJ2aWNlLCBMYXllclNlcnZpY2UsIE1hcFNlcnZpY2UsIEdhbGxlcnlTZXJ2aWNlXG59IGZyb20gXCJAZ2VvcGxhdGZvcm0vY2xpZW50XCI7XG5cbmlmKGFuZ3VsYXIgJiYgdHlwZW9mKGFuZ3VsYXIubW9kdWxlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgIGxldCBzZXJ2aWNlRmFjdG9yeSA9IGZ1bmN0aW9uKGdwTmdIdHRwQ2xpZW50LCBzdmNDbGFzcywgdXJsKSB7XG4gICAgICAgIHJldHVybiBuZXcgc3ZjQ2xhc3MoIHVybCwgZ3BOZ0h0dHBDbGllbnQgKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIERlZmluZSBBbmd1bGFySlMgbW9kdWxlIHRoYXQgY2FuIGJlIGluY2x1ZGVkIGluIGRvd25zdHJlYW0gYXBwbGljYXRpb25zXG4gICAgICpcbiAgICAgKiBFeGFtcGxlOlxuICAgICAqXG4gICAgICogIGFuZ3VsYXIubW9kdWxlKCdteUFwcCcsIFsgJ3VpLXJvdXRlcicsICdncENsaWVudCcgXSlcbiAgICAgKiAgLmNvbXBvbmVudCgnbXlDb21wb25lbnQnLCB7XG4gICAgICogICAgYmluZGluZ3M6IHsgfSxcbiAgICAgKiAgICB0ZW1wbGF0ZTogXCI8ZGl2PjwvZGl2PlwiLFxuICAgICAqICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKGdwUXVlcnlGYWN0b3J5LCBncEl0ZW1TZXJ2aWNlKSB7XG4gICAgICogICAgICAgdGhpcy4kb25Jbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgICogICAgICAgICAgZ3BJdGVtU2VydmljZS5zZWFyY2goIGdwUXVlcnlGYWN0b3J5KCkgKS50aGVuKCByZXNwb25zZSA9PiB7IC4uLiB9KTtcbiAgICAgKiAgICAgICB9O1xuICAgICAqICAgIH1cbiAgICAgKiAgXSk7XG4gICAgICovXG4gICAgYW5ndWxhci5tb2R1bGUoJ2dwQ2xpZW50JywgW10pXG5cbiAgICAucHJvdmlkZXIoJ2dwQ29uZmlnJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAkZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gQ29uZmlnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0pXG5cbiAgICAuZmFjdG9yeSgnZ3BRdWVyeUZhY3RvcnknLCBmdW5jdGlvbigpIHsgcmV0dXJuIFF1ZXJ5RmFjdG9yeTsgfSlcblxuICAgIC5mYWN0b3J5KCdncE5nSHR0cENsaWVudCcsIFsnJGh0dHAnLFxuICAgICAgICBmdW5jdGlvbiggJGh0dHAgKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IE5HSHR0cENsaWVudCh7ICRodHRwIDogJGh0dHAgfSk7XG4gICAgICAgIH1cbiAgICBdKVxuXG4gICAgLmZhY3RvcnkoJ2dwVHJhY2tpbmdTZXJ2aWNlRmFjdG9yeScsIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBUcmFja2luZ1NlcnZpY2UoIG9wdGlvbnMgKTtcbiAgICAgICAgfTtcbiAgICB9KVxuXG4gICAgO1xuXG5cbiAgICBjb25zdCBzZXJ2aWNlQ2xhc3NlcyA9IHtcbiAgICAgICAgJ2dwSXRlbVNlcnZpY2UnOiBJdGVtU2VydmljZSxcbiAgICAgICAgJ2dwVXRpbHNTZXJ2aWNlJzogVXRpbHNTZXJ2aWNlLFxuICAgICAgICAnZ3BEYXRhc2V0U2VydmljZSc6IERhdGFzZXRTZXJ2aWNlLFxuICAgICAgICAnZ3BTZXJ2aWNlU2VydmljZSc6IFNlcnZpY2VTZXJ2aWNlLFxuICAgICAgICAnZ3BMYXllclNlcnZpY2UnOiBMYXllclNlcnZpY2UsXG4gICAgICAgICdncE1hcFNlcnZpY2UnOiBNYXBTZXJ2aWNlLFxuICAgICAgICAnZ3BHYWxsZXJ5U2VydmljZSc6IEdhbGxlcnlTZXJ2aWNlXG4gICAgfTtcblxuICAgIE9iamVjdC5rZXlzKHNlcnZpY2VDbGFzc2VzKS5mb3JFYWNoKCAobmFtZSkgPT4ge1xuXG4gICAgICAgIGxldCBzdmNDbGFzcyA9IHNlcnZpY2VDbGFzc2VzW25hbWVdO1xuXG4gICAgICAgIGFuZ3VsYXIubW9kdWxlKCdncENsaWVudCcpXG5cbiAgICAgICAgLypcbiAgICAgICAgICAgIFNlcnZpY2UgZm9yIGVhY2ggY2xpZW50IHNlcnZpY2UgY2xhc3MgdGhhdCB1c2VzIHRoZVxuICAgICAgICAgICAgY3VycmVudGx5IGNvbmZpZ3VyZWQgc2V0dGluZ3Mgd2hlbiBjcmVhdGVkLiAgTm90ZSB0aGVcbiAgICAgICAgICAgIHNldHRpbmdzIG1heSBjaGFuZ2UgYWZ0ZXIgdGhlIHNlcnZpY2Ugc2luZ2xldG9uIGlzXG4gICAgICAgICAgICBjcmVhdGVkLCBpbiB3aGljaCBjYXNlIHRoZSBmYWN0b3J5IG9wdGlvbiBzaG91bGQgYmUgdXNlZC5cbiAgICAgICAgICovXG4gICAgICAgIC5zZXJ2aWNlKG5hbWUsIFsnZ3BOZ0h0dHBDbGllbnQnLCAnZ3BDb25maWcnLFxuICAgICAgICAgICAgZnVuY3Rpb24oZ3BOZ0h0dHBDbGllbnQsIGdwQ29uZmlnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2VGYWN0b3J5KGdwTmdIdHRwQ2xpZW50LCBzdmNDbGFzcywgZ3BDb25maWcudWFsVXJsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSlcblxuICAgICAgICAvKlxuICAgICAgICAgICAgRmFjdG9yeSBmb3IgY3JlYXRpbmcgc2VydmljZXMgZm9yIGVhY2ggY2xpZW50IHNlcnZpY2UgY2xhc3NcbiAgICAgICAgICAgIHdoaWNoIHVzZXMgYSBjdXN0b21pemFibGUgZW5kcG9pbnQgdG8gcmVxdWVzdCBkYXRhIGZyb20uIFVzZVxuICAgICAgICAgICAgdGhpcyBpZiBzZXJ2aWNlcyBuZWVkIHRvIGJlIGFibGUgdG8gY2hhbmdlIEFQSSBlbmRwb2ludHNcbiAgICAgICAgICAgIGR1cmluZyBhcHBsaWNhdGlvbiBydW50aW1lLlxuICAgICAgICAgKi9cbiAgICAgICAgLmZhY3RvcnkobmFtZSsnRmFjdG9yeScsIFsnZ3BOZ0h0dHBDbGllbnQnLCBmdW5jdGlvbihncE5nSHR0cENsaWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHVybCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlRmFjdG9yeShncE5nSHR0cENsaWVudCwgc3ZjQ2xhc3MsIHVybCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XSk7XG5cbiAgICB9KTtcbn1cblxuXG5cbmV4cG9ydCB7IE5HSHR0cENsaWVudCB9O1xuIl19