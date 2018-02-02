# GeoPlatform API Client Library
This library provides functionality used to work with GeoPlatform Map, Layer,
Service and other objects through the GeoPlatform API.

## Dependencies
This library requires the following dependencies be present in your application:

### Third Party Dependencies

- [jQuery](https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js) - version 2.1+
- [Q](https://cdnjs.cloudflare.com/ajax/libs/q.js/1.5.1/q.js) - version 1.5+


### GeoPlatform Dependencies
- [ng-common](https://github.com/GeoPlatform/ng-common)


### Including GeoPlatform API Client in your app

This dependency should be included in your app _after_ you provided environment-specific
configuration variables. It expects `window.GeoPlatform` to exist at runtime.
See Environment Variables below for details on what is expected to be provided.

```html
<!-- define 'GeoPlatform' namespace and set env variables-->
<script src="env.js"></script>
<!-- include ng-common -->
<script src="geoplatform.common.js"></script>
<!-- include map core -->
<script src="geoplatform.client.js"></script>
```

If you are using Angular 1.x, import the client.ng.js file to get access to
"NG" services which leverage Angular's $http service when fetching data.

```html
<script src="geoplatform.client.ng.js"></script>
```

## Environment Variables
An example of the `GeoPlatform` object and environment variables contained
within is shown below.

```javascript
GeoPlatform = {

    //REQUIRED: environment the application is deployed within
    // one of "development", "sit", "stg", "prd", or "production"
    "env" : "development",

    //REQUIRED: URL to GeoPlatform UAL for API usage
    "ualUrl" : "https://sit-ual.geoplatform.us",

    //timeout max for requests
    "timeout" : "5000",

    //{env}-{id} of application deployed
    "appId" : "development-mv"

};
```


## Using GeoPlatform API Client
To learn how to use the GeoPlatform API to fetch, create, update, and remove
GeoPlatform Assets, see the [GeoPlatform API](api.md) documentation.

### Miscellaneous

#### Conventions
If defining a class or object or constant, use upper case. If defining a function,
use camel case.
