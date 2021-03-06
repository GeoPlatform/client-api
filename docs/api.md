# GeoPlatform APIs

## Table of Contents
- [Services](#services)
- [Http Clients](#http-clients)
- [Service API](#service-api)
  - [Layer Service API](#layers-api)
  - [Services Service API](#services-api)
  - [Utils Service API](#utils-service-api)
  - [AgolService API](#agolservice-api)
  - [TrackingService API](#trackingservice-api)


## Services
- [ItemService](../src/services/item.js) primary class for interacting with any GeoPlatform resource
- [DatasetService](../src/services/dataset.js) - extension of ItemService which works with GP Dataset objects
- [ServiceService](../src/services/service.js) - extension of ItemService which works with GP Service objects
- [LayerService](../src/services/layer.js) - extension of ItemService which works with GP Layer objects
- [MapService](../src/services/map.js) - extension of ItemService which works with GP Map objects
- [GalleryService](../src/services/gallery.js) - extension of ItemService which works with GP Gallery objects
- [UtilsService](../src/services/utils.js) class for working with non-item API endpoints, such as GeoPlatform capabilities queries and gazetteer lookups.
- [KGService](../src/services/kg.js) class for recommending concepts to be associated with GeoPlatform Items.
- [AgolService][../src/services/agol.js] class allows searching ArcGIS Online data including Web Maps, Services, Organizations, and Groups.

### Knowledge Graph Service
__Note:__ You must use [KGQuery](../src/shared/kg-query.js) instances with the `KGService` instead of the a normal [Query](../src/shared/query.js).

### ArcGIS Online Service
The AGOL items matching queries are transformed into their appropriate
GeoPlatform business object instance prior to being returned but are not
automatically inserted into the GeoPlatform.

__Note:__ You must use [AgolQuery](../src/shared/agol.js) instances with this service
instead of normal `Query` instances.


## Http Clients

To allow using this api library across both front-end and back-end applications, these
services support different HTTP mechanisms by accepting an HttpClient which contains
the knowledge of how to construct and transact HTTP requests using specific technologies.

Pass the desired implementation to the service at construction along with the URL to the
GeoPlatform API:

```javascript
import { Config, XHRHttpClient, ItemService } from '@geoplatform/client';

//or using require()
//const GeoPlatformClient = require('@geoplatform/client');
//const Config = GeoPlatformClient.Config;
//const XHRHttpClient = GeoPlatformClient.XHRHttpClient;
//const ItemService = GeoPlatformClient.ItemService;

//or using global variable
//const Config = geoplatform.client.Config;
//const XHRHttpClient = geoplatform.client.XHRHttpClient;
//const ItemService = geoplatform.client.ItemService;

let url = Config.ualUrl;
let client = new XHRHttpClient();
let svc = new ItemService(url, client);
```


HttpClients provided by this library are:

- [XHRHttpClient](../src/http/xhr.js) - client capable of using Axios ajax support
  - _requires Axios v0.18+ to be included in your application._
- [NGHttpClient](../angularjs/src/http/ng.js) - client capable of using AngularJS `$http`
  - _requires Angular v1.x to be included in your application._
- [NG2HttpClient](../angular/src/http/ng.js) - client capable of using Angular `HttpClient`
  - _requires Angular v8+ to be included in your application._
- [NodeHttpClient](../node/src/http/node.js) - client capable of using [RequestJS](https://github.com/request/request)
  - _requires requestJS version ? to be included in your application_


### HttpClient Options
| Name    | Type    | Default  |
|:----    |:----    |:-------  |
| timeout | integer | 10000 ms |
| token   | string or function | _N/A_ |



## Service API

### Constructor
Creates a new instance of the service and points api calls to the specified GP API

| Parameter | required   | description |
|:------    |:---------- |:----------- |
| baseUrl   | true | GeoPlatform API base url |
| httpClient | true | http provider to use |

```javascript
//using es6 import in this example
import { Config, XHRHttpClient, ItemService } from '@geoplatform/client';
let url = Config.ualUrl;
let client = new XHRHttpClient();
let itemSvc = new ItemService(url, client);
```

### Search
Searches items using specified query parameters.

| Parameter | required   | description |
|:------    |:---------- |:----------- |
| query     | false | js object or `GeoPlatform.Query` instance |
| options   | false | js object defining additional configuration for the request. See [Configuring Requests](configuring_requests)

```javascript
//continuing from example above...
import { Query } from '@geoplatform/client';
let query = new Query().q('water');
itemSvc.search(query)
.then( response => {
    for(let i=0; i<response.results.length; ++i) {
        console.log(response.results[i].label);
    }
});
.catch(e=>{...});
```

### Get
Fetch item with specified identifier

| Parameter | required   | description |
|:------    |:---------- |:----------- |
| id   | true | identifier of GeoPlatform Item to fetch |
| options | false | optional settings to use in fetching |

```javascript
itemSvc.get(itemId)
.then( item => {
    console.log(JSON.stringify(item));
});
.catch(e=>{...});
```

#### Get a Specific Version of an Item
To request a specific version, specify the version using the `options.version` parameter.

```javascript
itemSvc.get( itemId, { version: 3 } )
.then( item => {
    console.log(JSON.stringify(item));
});
.catch(e=>{...});
```


### Get Multiple By Id
Fetch one or more items using an array of identifiers.

| Parameter | required   | description |
|:------    |:---------- |:----------- |
| ids   | true | array of item identifiers |

```javascript
//continuing from examples above
let id1 = '...', id2 = '...', id3 = '...';
itemSvc.getMultiple([id1, id2, id3])
.then( items => {
    items.forEach(item => console.log(item.label));
});
.catch(e=>{...});
```


### Save
Create or update the specified item. If 'item.id' exists, updates with HTTP-PUT. Otherwise, creates using HTTP-POST.

| Parameter | required   | description |
|:------    |:---------- |:----------- |
| item   | true | GeoPlatform Item to persist |

```javascript
//continuing from examples above
import { ItemTypes } from '@geoplatform/client';
let item = {
    type: ItemTypes.DATASET,
    label: "My New Dataset",
    createdBy: myUserName
};
itemSvc.save(item)
.then( updated => {
    console.log(updated.id + " updated " + new Date(updated.modified));
});
.catch(e=>{...});
```


### Patch
Partial update of item with specified identifier using the specified HTTP-PATCH ops. |

| Parameter | required   | description |
|:------    |:---------- |:----------- |
| id   | true | identifier of GeoPlatform Item to update |
| patch | true | array of HTTP-PATCH ops |

```javascript
let changes = [
    { op: 'replace', path: '/label', value: "Updated Label" }
];
itemSvc.patch(itemId, changes)
.then( item => {
    console.log(item.id + " updated " + new Date(item.modified));
});
.catch(e=>{...});
```


### Remove
Delete item with specified identifier.

| Parameter | required   | description |
|:------    |:---------- |:----------- |
| id   | true | identifier of GeoPlatform Item to remove |

```javascript
itemSvc.remove(itemId)
.then( () => { console.log("Deleted!"); });
.catch(e=>{...});
```


### Import
(:arg, :format) |
Create a new Item using either a URL or a File (see implementation for specific requirements).

This method supports both string URLs and files as the first parameter, but only the Node http client implementation can process file arguments for uploading to the GeoPlatform.  The jQuery and Angular instances only handle sending URLs at this time.

Similarly, the `UtilsService.parseFile()` method can only upload files when using a Node http client.  It's recommended you use native form controls or angular components to upload files when not in a server-side environment.


| Parameter | required   | description |
|:------    |:---------- |:----------- |
| arg   | true | URL to metadata file or uploaded metadata File |
| format | true | string id of incoming metadata format |
| options.overwrite | false | if True, update existing object. Otherwise, reject on existing object |

```javascript
let metadataUrl = "http://www.url.to/metadata/about/item";
itemSvc.import(metadataUrl, 'iso19139', { overwrite: true } )
.then( item => {
    console.log(item.id);
});
.catch(e=>{...});
```


### Export
Export the specified Item in the specified format.

| Parameter | required   | description |
|:------    |:---------- |:----------- |
| id   | true | identifier of GeoPlatform item |
| format | true | string id of outgoing metadata format |

```javascript
itemSvc.export(itemId, 'iso19139')
.then( response => {
    console.log(response);
});
.catch(e=>{...});
```

| Format | Supported Types |
|:-------- |:-------------- |
| (empty) | all, default format used will be different based upon type |
| iso19139 | dcat:Dataset, regp:Service, Map, Layer |
| wmc | Map |
| kml | Map |
| json | all (see below) |

**Note:** The default representation for GeoPlatform items is in JSON, so there is no need
to use the export method with a "json" format. Use the `get(_id_)` method instead.

### Get URI
Given an un-persisted GeoPlatform Item, generate and return a valid URI for it.

| Parameter | required   | description |
|:------    |:---------- |:----------- |
| item   | true | GeoPlatform Item |

```javascript
let item = {
    type: ...,
    ...
}
itemSvc.getUri(item)
.then( uri => {
    console.log(uri);
});
.catch(e=>{...});
```

### List Versions
List available historical versions of an Item

| Parameter | required   | description |
|:------    |:---------- |:----------- |
| id   | true | identifier of GeoPlatform Item to fetch versions for |

```javascript
itemSvc.getVersions(itemId)
.then( versions => {
    versions.forEach(version => { console.log(JSON.stringify(version)); });
});
.catch(e=>{...});
```


### Layers API

Layer-based implementations of `ItemService` additionally provide the following methods:

#### Style
Requests JSON style content for the FeatureLayer with the specified identifier.

| Parameter | Required | Description |
|:--------- |:-------- |:----------- |
| layerId   | true | identifier of Layer to request style about |

```javascript
//using es6 import in this example
import { Config, XHRHttpClient, LayerService } from '@geoplatform/client';
const url = Config.ualUrl;
let client = new XHRHttpClient();
let svc = new LayerService(url, client);
svc.get(layerId).then( layer => {
    //fetch layer style info (feature layers only)
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



#### Describe
Requests feature information for RasterLayer with specified identifier using OGC GetFeatureInfo operation (The layer must reference a service of type WMS).

| Parameter | Required | Description |
|:--------- |:-------- |:----------- |
| layerId   | true | identifier of Layer to request feature information about |
| options   | true | GetFeatureInfo parameters to use |


```javascript
//using es6 import in this example
import { Config, XHRHttpClient, LayerService } from '@geoplatform/client';

const WMS_LABEL = 'OGC Web Map Service (WMS)';
let descOpts = {
    x: 50,
    y: 50,
    width: 500,
    height: 400,
    bbox: '-120,20,-66,50'
};

let svc = new LayerService(url, client);
svc.get(layerId).then( layer => {
    //describe layer feature (wms layers only)
    let serviceLabel = layer.services[0].serviceType.label;
    if(WMS_LABEL !== serviceLabel) return null;
    return svc.describe(layerId, descOpts);
})
.then( feature => {
    //do something with resulting feature info
})
.catch(e=>{...});
```


### Services API

Service-based implementations of `ItemService` additionally provide the following methods:

#### About
requests updated service information from the remote web service

| Parameter | Required | Description |
|:--------- |:-------- |:----------- |
| service   | true | GeoPlatform Service to fetch info about |


```javascript
//using es6 import in this example
import { Config, XHRHttpClient, ServiceService } from '@geoplatform/client';
let svc = new ServiceService(url, client);
svc.get(serviceId)
//get service information using Service Harvester
.then( service => svc.about(service) )
//do something with extracted service metadata
.then( md => {
    console.log("Type: " + md.serviceType.label);
});
.catch(e=>{...});
```


#### Types
Requests the list of supported service types that may be selected from, such as OGC Web Map Service (WMS) and ESRI Rest Map Service.

```javascript
//using es6 import in this example
import { Config, XHRHttpClient, ServiceService } from '@geoplatform/client';
let svc = new ServiceService(url, client);
svc.types()
//get service information using Service Harvester
.then( types => {
    for(let i=0; i<types.length; ++i) {
        console.log(types[i].label);
    }
});
.catch(e=>{...});
```


#### Import
Creates a new GeoPlatform Service object using harvested service capabilities and layer information

| Parameter | Required | Description |
|:--------- |:-------- |:----------- |
| service   | true | GeoPlatform Service to import |

```javascript
//using es6 import in this example
import { Config, XHRHttpClient, ServiceService } from '@geoplatform/client';
let service = {
    href: "http://www.url.to/service/",
    serviceType: "OGC Web Map Service (WMS)" //or other type
};
let svc = new ServiceService(url, client);
svc.import(service)
//get service information using Service Harvester
.then( service => {
    console.log(service.id);
});
.catch(e=>{...});
```


#### Harvest
Re-harvests service layer information and updates the list of Layer objects.

| Parameter | Required | Description |
|:--------- |:-------- |:----------- |
| serviceId   | true | identifier of Service to fetch layers from |

```javascript
//using es6 import in this example
import { Config, XHRHttpClient, ServiceService } from '@geoplatform/client';
let svc = new ServiceService(url, client);
svc.harvest(serviceId)
//get service information using Service Harvester
.then( layers => {
    for(let i=0; i<layers.length; ++i) {
        console.log(layers[i].label);
    }
});
.catch(e=>{...});
```


#### Live Test
Initiates a performance test against the service and returns the service with updated statistics.

| Parameter | Required | Description |
|:--------- |:-------- |:----------- |
| serviceId   | true | identifier of Service to request style about |

```javascript
//using es6 import in this example
import { Config, XHRHttpClient, ServiceService } from '@geoplatform/client';
let svc = new ServiceService(url, client);
svc.liveTest(serviceId)
//get service information using Service Harvester
.then( service => {
    console.log(JSON.stringify(service.statistics));
});
.catch(e=>{...});
```


#### Statistics
Fetches most recent service statistics

| Parameter | Required | Description |
|:--------- |:-------- |:----------- |
| serviceId   | true | identifier of Service to request statistics for |

```javascript
//using es6 import in this example
import { Config, XHRHttpClient, ServiceService } from '@geoplatform/client';
let svc = new ServiceService(url, client);
svc.statistics(serviceId)
//get service information using Service Harvester
.then( statistics => {
    console.log(JSON.stringify(statistics));
});
.catch(e=>{...});
```


### Utils Service API

#### capabilities
Fetch GeoPlatform API capabilities descriptions

| Parameter | Required | Description |
|:--------- |:-------- |:----------- |
| property  | false    | optional capabilities property to specifically request |
| query     | false    | optional query parameters to include with request |


#### parseFile
Parse an uploaded file and receive its contents

| Parameter | Required | Description |
|:--------- |:-------- |:----------- |
| file     | true    | File to upload |
| format   | true    | format of the file ('geojson', 'csv', 'zip')


#### locate
Geolocate the specified argument to a set of candidate locations.

| Parameter | Required | Description |
|:--------- |:-------- |:----------- |
| value     | true    | text string to geolocate (name or lat,lng) |


### AgolService API

#### searchItems
Query non-org, non-group data inside AGOL

| Parameter | Required | Description |
|:--------- |:-------- |:----------- |
| query     | false    | `AgolQuery` instance |

```javascript
//using es6 import in this example
import { AgolService, AgolQuery, Config, XHRHttpClient } from '@geoplatform/client';
let svc = new AgolService(Config.ualUrl, new XHRHttpClient());

let query = new AgolQuery();
query.setQ('testing');
query.setTypes('Web Map');

svc.searchItems(query)
.then( response => {
    console.log(response.totalResults);
    response.results.map( result => { console.log(result.label) });
});
.catch(e=>{...});
```


#### getItem(:id)
Retrieve single AGOL data item by its AGOL identifier

| Parameter | Required | Description |
|:--------- |:-------- |:----------- |
| id     | true    | string identifier |

```javascript
//using es6 import in this example
import { AgolService, Config, XHRHttpClient } from '@geoplatform/client';
let svc = new AgolService(Config.ualUrl, new XHRHttpClient());
let id = ...;
svc.getItem(id)
//get service information using Service Harvester
.then( item => { console.log(JSON.stringify(item)); });
.catch(e=>{...});
```


#### searchOrgs
Query AGOL Organization entities

| Parameter | Required | Description |
|:--------- |:-------- |:----------- |
| query     | false    | `AgolQuery` instance |

```javascript
//using es6 import in this example
import { AgolService, AgolQuery, Config, XHRHttpClient } from '@geoplatform/client';
let svc = new AgolService(Config.ualUrl, new XHRHttpClient());

let query = new AgolQuery();
query.setQ('testing');

svc.searchOrgs(query)
.then( response => {
    console.log(response.totalResults);
    response.results.map( result => { console.log(result.label) });
});
.catch(e=>{...});
```

#### getOrg(:id)
Retrieve single AGOL organization by its AGOL identifier

| Parameter | Required | Description |
|:--------- |:-------- |:----------- |
| id     | true    | string identifier |

```javascript
//using es6 import in this example
import { AgolService, Config, XHRHttpClient } from '@geoplatform/client';
let svc = new AgolService(Config.ualUrl, new XHRHttpClient());
let id = ...;
svc.getOrg(id)
//get service information using Service Harvester
.then( org => { console.log(JSON.stringify(org)); });
.catch(e=>{...});
```


#### searchGroups
Query AGOL Group entities

| Parameter | Required | Description |
|:--------- |:-------- |:----------- |
| query     | false    | `AgolQuery` instance |

```javascript
//using es6 import in this example
import { AgolService, AgolQuery, Config, XHRHttpClient } from '@geoplatform/client';
let svc = new AgolService(Config.ualUrl, new XHRHttpClient());

let query = new AgolQuery();
query.setQ('testing');

svc.searchGroups(query)
.then( response => {
    console.log(response.totalResults);
    response.results.map( result => { console.log(result.label) });
});
.catch(e=>{...});
```

#### getGroup(:id)
Retrieve single AGOL group by its AGOL identifier

| Parameter | Required | Description |
|:--------- |:-------- |:----------- |
| id     | true    | string identifier |

```javascript
//using es6 import in this example
import { AgolService, Config, XHRHttpClient } from '@geoplatform/client';
let svc = new AgolService(Config.ualUrl, new XHRHttpClient());
let id = ...;
svc.getGroup(id)
//get service information using Service Harvester
.then( group => { console.log(JSON.stringify(group)); });
.catch(e=>{...});
```


#### AgolQuery API
| Method | Description |
|:------ |:----------- |
| getQ/setQ | Retrieve/Specify free-text constraint |
| getOrg/setOrg | Retrieve/Specify AGOL organizational constraint |
| getGroup/setGroup | Retrieve/Specify AGOL group constraint |
| getTypes/setTypes | Retrieve/Specify AGOL data type(s) constraint |
| getExtent/setExtent | Retrieve/Specify geospatial bounding box constraint |
| getSort/setSort | Retrieve/Specify sorting field and direction |
| getPage/setPage | Retrieve/Specify starting page of results |
| getPageSize/setPageSize | Retrieve/Specify number of results per page |


### Configuring Requests
Some service API calls may be additionally configured by passing an options parameter defining
settings to use when making the call.  These settings can cover both the GeoPlatform API
request as well as specific configurations for the underlying HttpClient instance being used.



### TrackingService API

#### logEvent
Send tracking event to GeoPlatform Resource Portfolio Management

| Parameter | Required | Description |
|:--------- |:-------- |:----------- |
| event     | true    | `TrackingEvent` instance |

```javascript
//using es6 import in this example
import {
    TrackingService, TrackingEvent, TrackingCategories, TrackingTypes
} from '@geoplatform/client';

//Specify RPM Provider class using that library's mechanism (not covered here)
let rpmProvider = ...

let svc = new TrackingService(rpmProvider);

let evt = new TrackingEvent(
    TrackingCategories.MAP, //type of item being tracked
    TrackingTypes.DISPLAYED,//type of action being recorded
    mapObj  //item being tracking
);
svc.logEvent(evt);
```

## Logging
The services provided also support logging information through a Logger that can
be provided to a service:

```javascript
import {
    Config, XHRHttpClient, ItemService, QueryFactory
} from '@geoplatform/client';
import Logger from './logger';

let url = Config.ualUrl;
let svc = new ItemService(url, new XHRHttpClient());
svc.setLogger(Logger);
```

The logger instance provided to a service must implement the `debug(arg)` and `error(arg)`
interface methods, otherwise, logged information will not be passed to the provided
logger instance.




## Examples

### XHR
```javascript
//using es6 import in this example
import { Config, XHRHttpClient, ItemService, QueryFactory } from '@geoplatform/client';

let url = Config.ualUrl;
let query = QueryFactory().types('Map','Layer');
let svc = new ItemService(url, new XHRHttpClient());
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


### AngularJS

```javascript

//using global constant reference in this example
const APIClient = GeoPlatform.Client;

angular.module('my-app', []).service('myService', ['$http', function($http) {

    let url = APIClient.Config.ualUrl;
    //use the $http service provided by angular
    let client = new APIClient.NGHttpClient({$http: $http})
    let svc = new APIClient.ItemService(url, client);

    return {
        /** @return {Promise} */
        search: function(query) {
            return svc.search(query).then( response => {
                if(!response.results.length) {
                    console.log("No results");
                    return [];
                }
                console.log(response.results.length + " of " + response.totalResults + " matches");
                return response.results;
            });
        }
    };
}]);
```


### NodeJS

```javascript
//using es6 import in this example
import { Config, ItemService, Query } from '@geoplatform/client';
import { NodeHttpClient } from '@geoplatform/client/node';

module.exports = {
    listDatasets: function() {
        let apiUrl = Config.ualUrl;
        let query = new Query().types(ItemTypes.DATASET);
        return new ItemService(apiUrl, new NodeHttpClient()).search(query);
    }
}
```



## Queries
For information on how to construct Query objects to search using ItemService implementations, see the [Query](query.md) documentation.
