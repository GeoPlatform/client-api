

(function(angular, APIClient, Environment) {

    'use strict';

    const NGHttpClient = APIClient.angularjs.NGHttpClient;
    const ItemService = APIClient.ItemService;


    angular.module('my-app', [

        //3rd party modules
        'ngResource', 'ngAnimate', 'ui.router',

        //external GeoPlatform modules
        'gp-common'

    ])


    .component('myAppContainer', {
        template:
        `
        <div class="app-container">
            <h3 class="app-heading">{{$ctrl.title}}</h3>
            <div class="d-flex has-gutter">

                <my-custom-component class="col">
                </my-custom-component>

                <my-details-component class="col">
                </my-details-component>

            </div>
        </div>
        `,
        controller: function() {

            this.$onInit = function() {
                this.title = 'My Custom App';
            };

            this.$onDestroy = function() { };
        }
    })


    /**
     *
     */
    .config(function myAppConfig ($httpProvider, $locationProvider) {
        //for passing cookies with $http and $resource requests to WMVR
        $httpProvider.defaults.withCredentials = true;
        $locationProvider.html5Mode(true);
    })


    .service('MyItemService', [
        '$http',
        'AuthenticationService', //<-- requires 'gp-common' is installed and configured as shown above

        function($http, AuthenticationService) {

            //passes the AngularJS $http service as an option parameter so the client may use it
            //this is required in order to support authentication as tokens will be automatically
            //injected onto HTTP requests using AngularJS http interceptors
            let client = new NGHttpClient({http: $http});

            client.setAuthToken(function() {

                //provides token via function so it can be re-evaluated each time in case the token is revoked
                let token = AuthenticationService.getJWTfromLocalStorage();
                return token;

            });

            //pass empty string as URL to use local Node Proxy instead of going
            // directly to GP API. This is helpful for managing session tokens'
            // refreshes when users must be authenticated in order to transact
            // with the API (create, delete, update, etc)
            let service = new ItemService( '', client );
            return service;

        }
    ])

  ;

})(angular, geoplatform.client, GeoPlatform);
