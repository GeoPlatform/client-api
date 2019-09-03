# ExpressJS Service Proxies

GeoPlatform API Client provides a set of proxies for its [services](../src/services), allowing
quick integration into a NodeJS backend server using ExpressJS.  These proxies
accept API calls matching their respective service APIs, forward the requests to
the desired API destination (typically GeoPlatform's UAL server), and returns the
received response back to the originating caller.

## Supported Proxies

- ItemServiceProxy - proxy for [ItemService](../src/services/item.ts)
- DatasetServiceProxy - proxy for [DatasetService](../src/services/dataset.ts)
- ServiceServiceProxy - proxy for [ServiceService](../src/services/service.ts)
- LayerServiceProxy - proxy for [LayerService](../src/services/layer.ts)
- MapServiceProxy - proxy for [MapService](../src/services/map.ts)
- GalleryServiceProxy - proxy for [GalleryService](../src/services/gallery.ts)
- UtilsServiceProxy - proxy for [UtilsService](../src/services/utils.ts)
- KGServiceProxy - proxy for [KGService](../src/services/kg.ts)
- AgolServiceProxy - proxy for [AgolService](../src/services/agol.ts)

## Setting Up a Proxy

```javascript
const express = require('express');
var app       = express();
var router    = express.Router();

//bind router to desired path base
app.use('/api', router);

//import the api client base for service support
const GPAPI     = require('@geoplatform/client');

//import the api client nodejs library for proxy support
const GPProxies = require('@geoplatform/client/node');

//configure the api as normal to define where to proxy requests to
GPAPI.Config.configure({
    ualUrl: 'https://ual.geoplatform.gov'
});

//bind the desired proxy onto the router
router.use( GPProxies.ItemServiceProxy() );
```


## Proxy Endpoints
Each proxy binds an endpoint to a default route path for each of the API methods
supported by its associated service.  These endpoints are defined using keys which
allow them to be configured and overridden as needed (see below for more information).

Refer to each service proxy's definition for the list of keys associated with the proxy.


## Configuring Proxies
See below

### Logger
Associate a logger with a proxy by passing it to the proxy.

```javascript
const winston = require('winston');
const Logger = new (winston.Logger)( /* logger options */ );
GPProxies.ItemServiceProxy({
    logger : Logger
})
```

### Error Handling
To provide an overall error handler for all endpoints for a proxy, provide a
custom function using the `onError` property. Note the proxy will still invoke the
ExpressJS `next(error)` middleware component after your error handler is finished.

```javascript
GPProxies.ItemServiceProxy({
    onError: function( routeKey, error ) {
        // 'routeKey' is the key of the route generating the error
        /* do something with the error */
    }
})
```

### Post-Process / Cleanup
To define a post-process handler for all endpoints for a proxy, provide a custom
function using the 'onFinish' property.


```javascript
GPProxies.ItemServiceProxy({
    onFinish: function( routeKey, request, response ) {
        // 'routeKey' is the key of the route finishing its processing of a response
        // request is a NodeJS Http.Request
        // response is a NodeJS Http.Response
    }
})
```



### Per Endpoint Configuration
Each endpoint supported by a proxy can be configured or even disabled by specifying
options as detailed below.  For each endpoint, specify the endpoint's 'key' and
then the configuration for that endpoint.

#### Path
Each proxy's API endpoints are bind to a default path. To change the bound path,
specify the desired path using the `path` configuration property. Note the path will
still be bound to the root path associated with the ExpressJS router you bind the
proxy to (see above example).

```javascript
GPProxies.ItemServiceProxy({
    'search': {
        'path': 'query' //will bind search to '/api/query' using above example
    }
})
```

#### Authentication
To enable an endpoint to forward authentication information as a part of request proxying,
specify "true" using the `auth` configuration property.  By default some operations,
such as those involving creation and deletion of data, set `auth` to be true.

```javascript
GPProxies.ItemServiceProxy({
    'search': {
        'auth': true //auth tokens will be forwarded with query reqeusts
    }
})
```

#### Successful Response Handling
To override the default response handling of a proxied request's response, specify
a custom response function for a given endpoint.

```javascript
GPProxies.ItemServiceProxy({
    'search': {
        'onResponse': function( result, response ) {
            //result is the data to be sent back to the caller
            //response is NodeJS Http.Response
        }
    }
})
```


#### Error Response Handling
To provide custom error handling for an endpoint during proxying of a request
and response, specify the desired function. Note: this custom handler is invoked
before a custom `onError` handler on the parent Proxy, if one is also registered.

```javascript
GPProxies.ItemServiceProxy({
    'search': {
        'onError': function( error ) {

        }
    }
})
```


#### After Response and Cleanup
To provide cleanup or post-processing to an endpoint, specify a custom finish function.
A typical example of when this would be used is to unlink (ie, delete) uploaded files that were
proxied along with a request. Note: this custom handler is invoked
before a custom `onFinish` handler on the parent Proxy, if one is also registered.

```javascript
GPProxies.ItemServiceProxy({
    'search': {
        'onFinish': function( request, response ) {
            if(req.files.file) {
                fs.unlink(req.files.file.path, function(fsErr) {
                    if(fsErr) {
                        //do something with the error
                    }
                });
            }
        }
    }
})
```

#### Disabling an Endpoint
To prevent the proxy from handling a specific API request, specify a value of `false`
instead of a configuration object.

```javascript
GPProxies.ItemServiceProxy({
    'search': false //will not bind a proxy at '/api/search'
})
```
