# GeoPlatform APIs

## Services
[ItemService](src/services/base.js) is a base class from which implementations exist that
allow interacting with GeoPlatform model objects such as Maps, Layers, Services, etc.  
Included with the the library's main build file are implementations of ItemService
which use jQuery to perform AJAX requests against the GeoPlatform API.

- [JQueryItemService](src/services/jq/item.js) - extension of ItemService, base class using jQuery
- [JQueryMapService](src/services/jq/map.js) - extension of JQueryItemService which works with GP Map objects
- [JQueryLayerService](src/services/jq/layer.js) - extension of JQueryItemService which works with GP Layer objects
- [JQueryServiceService](src/services/jq/service.js) - extension of JQueryItemService which works with GP Service objects


Included with the "ng" build file for Angular 1.x applications are
implementations of ItemService which use Angular's $http service.

- [NGItemService](src/services/ng/item.js) - extension of ItemService, base class using $http  
- [NGMapService](src/services/ng/map.js) - extension of NGItemService which works with GP Map objects
- [NGLayerService](src/services/ng/layer.js) - extension of NGItemService which works with GP Layer objects
- [NGServiceService](src/services/ng/service.js) - extension of NGItemService which works with GP Service objects


_Note:_ Using Angular's $http service allows you to define global behaviors in your application's
config file using $httpProvider. This can include forwarding authentication credentials automatically
or appending parameters and headers to each request.  For example, setting a default timeout for all $http
service requests:


```javascript

angular.module('myApp', [])

.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.timeout = GeoPlatform.timeout || 10000;
}]);

```

Provided via module.exports and usable within NodeJS applications are implementations
which use [request](https://github.com/request/request) to perform HTTP calls.

- [NodeItemService](src/services/node/item.js) - extension of ItemService, base class using request
- [NodeMapService](src/services/node/map.js) - extension of NodeItemService which works with GP Map objects
- [NodeLayerService](src/services/node/layer.js) - extension of NodeItemService which works with GP Layer objects
- [NodeServiceService](src/services/node/service.js) - extension of NodeItemService which works with GP Service objects
- [NodeServiceService](src/services/node/dataset.js) - extension of NodeItemService which works with GP Dataset objects
- [NodeServiceService](src/services/node/gallery.js) - extension of NodeItemService which works with GP Gallery objects




### Service API

- `ItemService.constructor(:baseUrl)` - creates a new instance of the service and points api calls to the specified GP API
- `ItemService.search(:query)` - Searches items using specified query parameters.
- `ItemService.get(:id)` - Fetch item with specified identifier
- `ItemService.save(:item)` - Create or update the specified item. If 'item.id' exists, updates with HTTP-PUT. Otherwise, creates using HTTP-POST.
- `ItemService.patch(:id, :patch)` - Partial update of item with specified identifier using the specified HTTP-PATCH ops.
- `ItemService.remove(:id)` - Delete item with specified identifier

#### Configuring the GeoPlatform API URL
The JQuery and Angular versions of `ItemService` and its sub-classes will, by default,
use the `GeoPlatform` configuration object to direct all API calls using the services
to that defined by `GeoPlatform.ualUrl` (the location of the GeoPlatform Unified Access Layer service).
If you wish to override that location, provide the desired UAL base endpoint (without "/api/...")
when calling the constructor of the service.

__Note:__ Node-based `ItemService` implementations __require__ the base URL to be provided
in the constructor as there is no `GeoPlatform` configuration object present when
operating inside a NodeJS app.

### Examples

#### JQuery
```javascript
let query = GeoPlatform.QueryFactory().types('Map','Layer');
let svc = new GeoPlatform.JQueryItemService();
svc.search(query)
.then( response => {
    if(!response.results.length) {
        console.log("No results");
        return;
    }
    console.log(response.results.length + " of " +
    response.totalResults + " matches");
})
.catch(e=>{...});
```


#### Angular

```javascript
let query = GeoPlatform.QueryFactory().types('Map','Layer');
let svc = new GeoPlatform.NGItemService();
svc.search(query)
.then( response => {
    if(!response.results.length) {
        console.log("No results");
        return;
    }
    console.log(response.results.length + " of " +
    response.totalResults + " matches");
})
.catch(e=>{...});
```


#### NodeJS

```javascript
const GPAPI = require('geoplatform.client')
const Query = GPAPI.Query
const ItemTypes = GPAPI.ItemTypes
const ItemService = GPAPI.ItemService

module.exports = {
    listDatasets: function() {
        let apiUrl = 'https://sit-ual.geoplatform.us'
        let query = new Query().types(ItemTypes.DATASET)
        return new ItemService(apiUrl).search(query)
    }
}
```


## NodeJS Modules
The following modules are exposed via `require('geoplatform.client')`:
- `ItemTypes` - set of supported GeoPlatform object model item types.
- `QueryParameters` - set of supported query parameters
- `Query` - class used to build queries
- `QueryFactory` - convenience factory for quickly creating query instances
- `ServiceFactory` - convenience factor for quickly creating a service based upon a specified object model item type
- `ItemService` - default API service, supports all item types
- `DatasetService` - API service for working with Datasets
- `MapService` - API service for working with Maps
- `LayerService` - API service for working with Layers
- `ServiceService` - API service for working with Services
- `GalleryService` - API service for working with Galleries
- `UtilsService` - API service for miscellaneous usage not directly tied to any item type, such as API capabilities queries and GeoJSON file parsing





### Layers

Layer-based implementations of `ItemService` additionally provide the following methods:

- `.style(:id)` - requests JSON style content for the FeatureLayer with the specified identifier
- `.describe(:id, :options)` - requests feature information for RasterLayer with specified identifier using OGC GetFeatureInfo operation (The layer must reference a service of type WMS)


```javascript
let svc = new GeoPlatform.JQueryLayerService();
svc.get(layerId)
//fetch layer style info (feature layers only)
.then( layer => {
    if('FeatureLayer' !== layer.layerType) return null;
    return svc.style(layer.id);
})
.then( styleJson => {
    if(styleJson !== null) {
        //do something
    }
})
.catch(e=>{...});
```


### Services

Service-based implementations of `ItemService` additionally provide the following methods:

- `.about(:service)` - requests updated service information from the remote web service

```javascript
let svc = new GeoPlatform.JQueryServiceService();
svc.get(serviceId)
//get service information using Service Harvester
.then( service => svc.about(service) )
//do something with extracted service metadata
.then( md => {...});
.catch(e=>{...});
```


## Queries
For information on how to construct Query objects to search using ItemService implementations, see the [Query](query.md) documentation.
