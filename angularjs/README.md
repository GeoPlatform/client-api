
# GeoPlatform API Client for Angular JS
The following information covers the API Client support for use within the
AngularJS (1.x) framework. This only covers AngularJS, for support within
Angular (8+), see the [API Client for Angular support documentation](../angular/README.md).

## Bundling in Your Application
In addition to the core API Client library, you must also include the AngularJS
API Client library file.

```html
<script src="@geoplatform/client/dist/bundles/geoplatform-client.umd.js"></script>
<script src="@geoplatform/client/dist/bundles/geoplatform-client-angularjs.umd.js"></script>
```

## Using in Your Application

```javascript
angular.module( 'myApp', [ 'gpClient' ] )
.config([ 'gpConfigProvider',
    function myAppConfig ( gpConfigProvider ) {
        //configure application defaults
        gpConfigProvider.$get().configure({
            ualUrl: "https://ual.geoplatform.gov"
        });
    }
])
.component('searchResults', {
    template: `
        <ul>
            <li ng-repeat="result in $ctrl.results track by $index">
                [{{result.type}}] {{result.label}}
            </li>
        </ul>
    `,
    controller: function(gpItemService, gpQueryFactory) {
        this.$onInit = function() {
            gpItemService.search( gpQueryFactory() )
            .then( response => { this.results = response.results; })
            .catch( error => { console.log(error.message); });
        };
    }
});
```

## `gpClient` Module
The `gpClient` module exposes services and factories for the API Client services
which utilize the Angular `$http` module for communications with the GeoPlatform.
Simply inject the appropriate service instance (such as the `gpItemService` shown above)
in your directive or component.

### Available Resources

- `gpConfig` - Injects the `Config` object
- `gpQueryFactory` - Injects the `QueryFactory` object
- `gpNgHttpClient` - Injects the `NGHttpClient` instance
- `gpItemService` - Injects an AngularJS-aware [`ItemService`](../README.md#Services) instance
- `gpUtilsService` - Injects an AngularJS-aware [`UtilsService`](../README.md#Services) instance
- `gpDatasetService` - Injects an AngularJS-aware [`DatasetService`](../README.md#Services) instance
- `gpServiceService` - Injects an AngularJS-aware [`ServiceService`](../README.md#Services) instance
- `gpLayerService` - Injects an AngularJS-aware [`LayerService`](../README.md#Services) instance
- `gpMapService` - Injects an AngularJS-aware [`MapService`](../README.md#Services) instance
- `gpGalleryService` - Injects an AngularJS-aware [`GalleryService`](../README.md#Services) instance
- `gpItemServiceFactory` - Injects an AngularJS-aware [`ItemService`](../README.md#Services) factory
- `gpUtilsServiceFactory` - Injects an AngularJS-aware [`UtilsService`](../README.md#Services) factory
- `gpDatasetServiceFactory` - Injects an AngularJS-aware [`DatasetService`](../README.md#Services) factory
- `gpServiceServiceFactory` - Injects an AngularJS-aware [`ServiceService`](../README.md#Services) factory
- `gpLayerServiceFactory` - Injects an AngularJS-aware [`LayerService`](../README.md#Services) factory
- `gpMapServiceFactory` - Injects an AngularJS-aware [`MapService`](../README.md#Services) factory
- `gpGalleryServiceFactory` - Injects an AngularJS-aware [`GalleryService`](../README.md#Services) factory
- `gpTrackingServiceFactory` - Injects an AngularJS-aware [`TrackingService`](../README.md#Services) factory


### Using Factories Instead of Services

Note that the services listed above are singletons and are shared by any that
use them via dependency injection.  To configure specific instances per injection,
use the appropriate factory instead of the service.  For example...

```javascript
//...
controller: function(gpItemServiceFactory, gpQueryFactory) {
    this.$onInit = function() {
        this.service = gpItemServiceFactory();
        this.service.search( gpQueryFactory() )
        .then( response => { this.results = response.results; })
        .catch( error => { console.log(error.message); });
    };
    this.$onDestroy = function() {
        this.service = null;
    };
}
```

It is important to note that the service factories also allows specifying the desired
endpoint for communicating with the GeoPlatform. This is useful if your application
uses the provided API Client [service proxies](../docs/proxies.md) or if you use a
custom local proxy, such as for avoiding CORS issues.

```javascript
//...
controller: function( gpItemServiceFactory, gpQueryFactory ) {
    this.$onInit = function() {
        this.service = gpItemServiceFactory( 'api/my-proxy' );
        this.service.search( gpQueryFactory() )
        .then( response => { this.results = response.results; })
        .catch( error => { console.log(error.message); });
    };
    this.$onDestroy = function() {
        this.service = null;
    };
}
```


### Passing Authentication Credentials
If you are using GeoPlatform's ng-common library, which updates the `$http` defaults to include the 'Authorization' header with the user's token, please note that you must do one of the following
to ensure your credentials are passed with each request to the GeoPlatform:

- use a provided service or create a service via a provided factory (see above)
- provide the `$http` instance within your application to the `NGHttpClient` instance if you create one manually
