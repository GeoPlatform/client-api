# GeoPlatform APIs

## Services
[ItemService](src/services/item.js) is the primary class for interacting with
GeoPlatform model objects such as Maps, Layers, Services, etc.  
Included with the the library's main build file are implementations of ItemService
which provide specialized support for specific item types

- [MapService](src/services/map.js) - extension of ItemService which works with GP Map objects
- [LayerService](src/services/layer.js) - extension of ItemService which works with GP Layer objects
- [ServiceService](src/services/service.js) - extension of ItemService which works with GP Service objects
- [GalleryService](src/services/gallery.js) - extension of ItemService which works with GP Gallery objects
- [DatasetService](src/services/dataset.js) - extension of ItemService which works with GP Dataset objects

### Non-Item Support

The [UtilsService](src/services/utils.js) class is provided for working with non-item API endpoints, such as GeoPlatform capabilities queries.

### Http Providers

To allow using this api library across both front-end and back-end applications, these
services support different HTTP mechanisms by accepting an HttpClient which contains
the knowledge of how to construct and transact HTTP requests using specific technologies.

Pass the desired implementation to the service at construction along with the URL to the
GeoPlatform API:

```javascript
let url = "https://sit-ual.geoplatform.us";
let client = new GeoPlatform.JQueryHttpClient();
let svc = new GeoPlatform.ItemService(url, client);
```


HttpClients provided by this library are:

- [JQueryHttpClient](src/http/jq.js) - client capable of using jQuery ajax support
- [NGHttpClient](src/http/ng.js) - client capable of using Angular 1.x $http
- [NodeHttpClient](src/http/node.js) - client capable of using [RequestJS](https://github.com/request/request)

__Note:__ `NGHttpClient` is provided by the 'ng' build file of this library ('geoplatform.client.ng.js').


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



### Service API

- `ItemService.constructor(:baseUrl, :httpClient)` - creates a new instance of the service and points api calls to the specified GP API
- `ItemService.search(:query)` - Searches items using specified query parameters.
- `ItemService.get(:id)` - Fetch item with specified identifier
- `ItemService.save(:item)` - Create or update the specified item. If 'item.id' exists, updates with HTTP-PUT. Otherwise, creates using HTTP-POST.
- `ItemService.patch(:id, :patch)` - Partial update of item with specified identifier using the specified HTTP-PATCH ops.
- `ItemService.remove(:id)` - Delete item with specified identifier
- `ItemService.import(:arg, :format)` - Create a new Item using either a URL or a File (see implementation for specific requirements)
- `ItemService.export(:id, :format)` - Export the specified Item in the specified format
- `ItemService.getUri(:item)` - Given an unpersisted GeoPlatform Item, generate and return a valid URI for it.


#### Importing Files
The `ItemService.import()` method supports both string URLs and files as the first parameter, but only
the Node http client implementation can process file arguments for uploading to
the GeoPlatform.  The jQuery and Angular instances only handle sending URLs at this time.

Similarly, the `UtilsService.parseFile()` method can only upload files when using a
Node http client.  It's recommended you use native form controls or angular components
to upload files when not in a server-side environment.


### Examples

#### JQuery
```javascript
let url = "https://sit-ual.geoplatform.us";
let query = GeoPlatform.QueryFactory().types('Map','Layer');
let svc = new GeoPlatform.ItemService(url, new GeoPlatform.JQueryHttpClient());
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
let url = "https://sit-ual.geoplatform.us";
let query = GeoPlatform.QueryFactory().types('Map','Layer');
let svc = new GeoPlatform.ItemService(url, new GeoPlatform.NGHttpClient());
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
const HttpClient = GPAPI.HttpClient

module.exports = {
    listDatasets: function() {
        let apiUrl = 'https://sit-ual.geoplatform.us'
        let query = new Query().types(ItemTypes.DATASET)
        return new ItemService(apiUrl, new HttpClient()).search(query)
    }
}
```


## NodeJS Modules
The following modules are exposed via `require('geoplatform.client')`:
- `ItemTypes` - set of supported GeoPlatform object model item types.
- `QueryParameters` - set of supported query parameters
- `Query` - class used to build queries
- `QueryFactory` - convenience factory for quickly creating query instances
- `HttpClient` - default NodeJS http client using RequestJS
- `ServiceFactory` - convenience factor for quickly creating a service based upon a specified object model item type
- `ItemService` - default API service, supports all item types
- `MapService` - API service for working with Maps
- `LayerService` - API service for working with Layers
- `ServiceService` - API service for working with Services
- `GalleryService` - API service for working with Galleries
- `DatasetService` - API service for working with Datasets
- `UtilsService` - API service for miscellaneous usage not directly tied to any item type, such as API capabilities queries and GeoJSON file parsing





### Layers

Layer-based implementations of `ItemService` additionally provide the following methods:

- `.style(:layerId)` - requests JSON style content for the FeatureLayer with the specified identifier
- `.describe(:layerId, :options)` - requests feature information for RasterLayer with specified identifier using OGC GetFeatureInfo operation (The layer must reference a service of type WMS)


```javascript
let svc = new GeoPlatform.LayerService(url, client);
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
- `.types(:serviceId)` - requests the list of supported service types that may be selected from
- `.import(:service)` - creates a new GeoPlatform Service object using harvested service capabilities and layer information
- `.harvest(:serviceId)` - re-harvests service layer information and updates the list of Layer objects
- `.liveTest(:serviceId)` - initiates a performance test against the service and returns updated statistics
- `.statistics(:serviceId)` - fetches most recent service statistics


```javascript
let svc = new GeoPlatform.ServiceService(url, client);
svc.get(serviceId)
//get service information using Service Harvester
.then( service => svc.about(service) )
//do something with extracted service metadata
.then( md => {...});
.catch(e=>{...});
```


## Queries
For information on how to construct Query objects to search using ItemService implementations, see the [Query](query.md) documentation.
