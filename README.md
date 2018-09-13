# GeoPlatform API Client Library
This library provides components which provide easier usage of the GeoPlatform API.
It is not required to interact with the GeoPlatform API, but offers services and helper
functionality to speed up your application's integration with the GeoPlatform.

This library is framework _flexible_. The default implementations
require JQuery to facilitate AJAX XHR requests with the GeoPlatform API hosts.
Alternatively, implementations for Angular 1.x and NodeJS are provided.

__Note:__ The JQuery and Angular implementations require an Internet browser environment
and the NodeJS implementation requires a NodeJS environment of at least 6.9 or later.

## Dependencies and Requirements
This library requires the following dependencies be present in your application:

- [Q](https://cdnjs.cloudflare.com/ajax/libs/q.js/1.5.1/q.js) - version 1.5+
- [jQuery](https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js) - version 2.1+
- [Request](https://github.com/request/request) - version 2.75+, optional (used by `NodeHttpClient`)
- [AngularJS](http://...) - 1.x, optional (used by `NGHttpClient`)


## Using GeoPlatform API Client in your app...

### Include as a Dependency
Include API Client as a dependency of your application inside the package.json file (or similar dependency definition file).

```
   ...
   "dependencies": {
       ...,
       "geoplatform.client": "git+https://github.com/GeoPlatform/client-api.git",
       ...
   }
   ...
```

and then run `npm install geoplatform.client` or `yarn add geoplatform.client`.  

_Note:_ You can try installing using the --save option but NPM sometimes has issues with installing and updating GIT repo-hosted modules. It's better to explicitly add it to your package.json and then install it.


If not using a build tool like WebPack or Browserify, make sure to include the distribution in your application's HTML file(s):

```html
<script src="geoplatform.client.js"></script>
```

__Note:__ You can also load the library from a CDN:
```html
<script src="https://s3.amazonaws.com/geoplatform-cdn/geoplatform.client/_VERSION_/js/geoplatform.client.js"></script>
```

### Referencing Components in your App

#### Using 'require()'
```javascript
//include the config export used to define API properties needed later
const ItemService = require('geoplatform.client').ItemService;
```
#### Using ES6 'import ... from'
```javascript
//include the config export used to define API properties needed later
import { ItemService } from 'geoplatform.client';
```
#### Using the "GeoPlatformClient" Global
```javascript
//include the config export used to define API properties needed later
const ItemService = GeoPlatformClient.ItemService;
```

#### Environment Variables
The `Config` object exposed by GeoPlatform API Client allows configuration of
environment variables necessary to interact with the GeoPlatform API. Below is
an example of how to configure this object.

```javascript
import { Config } from 'geoplatform.client';
Config.configure({

    //REQUIRED: environment the application is deployed within
    // one of "development", "sit", "stg", "prd", or "production"
    "env" : "development",

    //Optional, URL to GeoPlatform UAL for API usage. Override this only if you are
    // communicating with a different instance of GeoPlatform API or if you are
    // using a server-side proxy of API - see below for more info on this.
    "ualUrl" : "https://ual.geoplatform.gov",

    //timeout max for requests
    "timeout" : "5000",

    //application identifier of the application using the API
    "appId" : "my-app"

});

let url = Config.ualUrl;    //will now be set as configured above
```

__Note:__ You must configure this before importing other GeoPlatform libraries which use this
library, such as GeoPlatform.MapCore.


### Server-side Proxies
If you are modifying data - which requires OAuth 2.0 identity tokens be supplied to
the API Client http client instances - or are worried about cross-origin request
security (CORS) issues, you should use server-side proxies of the API Client.
The proxies are instances of the same API Client service instances used client-side but
bound to HTTP endpoints through ExpressJS in NodeJS.  The proxies allow better
authorization token refresh handling and avoid browser limitations involving CORS.

To enable server-side proxies in the NodeJS portion of your application, do the following:

```javascript
const express = require('express');
const app     = express();
const router  = require('express').Router();

//
// ... any app setup like ports, error handling, bodyparser, multer, etc ...
//

const GPAPI = require('geoplatform.client');
GPAPI.Config.configure({
    //... any configuration items needed
});

const proxyOptions = {
    //...any proxy settings desired
};
//bind GP Item Service methods to the router
router.use( GPAPI.ItemServiceProxy( proxyOptions ));

//bind our router to 'api' path
app.use('/api', router);
```

The above sample code would expose all of the `ItemService` methods as HTTP endpoints.
Using defaults, these endpoints would be:

|Service Method|Http Method|Path|
|:---|:---|:---|
|search(query)|GET|api/items?:query|
|get(id)|GET|api/items/:id|
|save(item) _[create]_|POST|api/items|
|save(item) _[update]_|PUT|api/items/:id|
|remove(item)|DELETE|api/items/:id|
|patch(id,changes)|PATCH|api/items/:id|
|import(arg,format)|POST|api/items/import?url=:argformat=:format|
|export(id,format)|GET|api/items:id/export?format=:format|


#### Available Service Proxies
- `ItemServiceProxy`
- `ServiceServiceProxy` - also provides endpoints for operations such as harvest and live-test
- `LayerServiceProxy` - also provides endpoints for operations such as style fetching and validation
- `MapServiceProxy`
- `DatasetServiceProxy`
- `GalleryServiceProxy`
- `UtilsServiceProxy` - provides endpoints for gazetteer geocoding and file parsing
- `AgolServiceProxy` - provides endpoints for AGOL searching and data fetching

Please see the specific proxy class sources for more information about what endpoints are available (and as which paths).

#### Configuration Service Proxies
Each proxy function accepts a configuration object which allows specifying the following properties:

|Property|Default|Description|
|:-------|:------|:----------|
|router|none|The desired ExpressJS router instance to bind to and then return. If not specified, one will be created automatically and returned|
|logger|none|Specify the logging class to log service messages|
|paths|_see instances_|See below for details|
|onError(pathId,error)|none|Function to invoke on an error resulting from a request|
|onFinish(pathId,req,res)|none|Function to invoke once a request has been handled and response written out (useful for deleting temp files, etc)|

##### Path Configuration
You can override the route bindings used by the proxy by passing a `paths` property object. Keys should be those defined in the specific proxy instance and values should be strings containing the paths _after_ the route path and trailing '/'.  For example, overriding the `ItemServiceProxy` path defaults could be done as follows:

```javascript
const proxyOptions = {
    paths: {
        //will bind service.search() to 'api/query' instead of 'api/items'
        'search': 'query',
        //will bind service.get() to 'api/data/:id' instead of 'api/items/:id'
        'get': 'data/:id',
        //will disable export endpoint from being bound and exposed
        'export': false
    }
};
//bind GP Item Service methods to the router
router.use( GPAPI.ItemServiceProxy( proxyOptions ));
app.use('api', router);
```

As shown in the above example, you can also disable specific method-endpoint bindings by passing a value of `false` for the path.


### Service and Query Documentation
To learn how to use the GeoPlatform API to fetch, create, update, and remove
GeoPlatform Assets, see the [GeoPlatform API](api.md) and [Query](query.md) documentation.


### Examples

Look inside the "examples" folder and its sub-folders to see how to use the client API.

To run the JQuery and Angular examples, it is recommended you use http-server:

1. Install http-server if it isn't already: `npm install -g http-server`
2. Run an http server in the root folder of the api project: `http-server -p8080`
3. Load the desired example in your browser (e.g., http://localhost:8080/examples/jq/item.html)

To run the NodeJS examples, run Node from the api project root folder passing it
the desired example JS file (e.g., `node examples/node/item.js`)


## Authentication and Authorization
The GeoPlatform API uses OAuth 2.0 to authenticate users and restrict access to data and operations.
API Client provides a way to specify a valid JWT token to be used with requests, but assumes a
valid token has already been fetched by another component within your application.

__Important!__ To use any data-modifying portion of this client API, you __must__ provide
an authentication token or the request will be denied by the GeoPlatform API.


```javascript
//es6 import
import { JQueryHttpClient } from 'geoplatform.client';
//or using require()
//const JQueryHttpClient = require('geoplatform.client').JQueryHttpClient;
//or using global
//const JQueryHttpClient = GeoPlatformClient.JQueryHttpClient;

let myJwtToken = //fetched previous to this code block
let client = new JQueryHttpClient({
    token: myJwtToken
});

//or
client.setAuthToken(myJwtToken);

//or as a function
let myTokenFn = function() { return myJwtToken; };
client.setAuthToken(myTokenFn);
```

__Note:__ If the token is refreshed or removed, you must make sure to update the client
with the latest information.

## Miscellaneous

### Conventions
If defining a class or object or constant, use upper case. If defining a function, use camel case.
