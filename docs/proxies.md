# Service Proxies

The following information details how to setup and use the service proxies
provided by this library to enable server-side proxying of GeoPlatform API
requests and responses.

## Setting Up a Proxy

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


## Available Service Proxies
- `ItemServiceProxy`
- `ServiceServiceProxy` - also provides endpoints for operations such as harvest and live-test
- `LayerServiceProxy` - also provides endpoints for operations such as style fetching and validation
- `MapServiceProxy`
- `DatasetServiceProxy`
- `GalleryServiceProxy`
- `UtilsServiceProxy` - provides endpoints for gazetteer geocoding and file parsing
- `AgolServiceProxy` - provides endpoints for AGOL searching and data fetching

Please see the specific proxy class sources for more information about what endpoints are available (and as which paths).

## Configuring Service Proxies
Each proxy function accepts a configuration object which allows specifying the following properties:

|Property|Default|Description|
|:-------|:------|:----------|
|router|none|The desired ExpressJS router instance to bind to and then return. If not specified, one will be created automatically and returned|
|logger|none|Specify the logging class to log service messages|
|paths|_see instances_|See below for details|
|onError(pathId,error)|none|Function to invoke on an error resulting from a request|
|onFinish(pathId,req,res)|none|Function to invoke once a request has been handled and response written out (useful for deleting temp files, etc)|

### Path Configuration
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