# GeoPlatform APIs

## ItemService
[GeoPlatform.ItemService](src/services/base.js) is a base class from which implementations exist that
allow interacting with GeoPlatform model objects such as Maps, Layers, Services, etc.  
Included with the the library's main build file are implementations of ItemService
which use jQuery to perform AJAX requests against the GeoPlatform API.

- [JQueryItemService](src/services/item-jquery.js) - extension of ItemService, base class using jQuery
- [JQueryMapService](src/services/map-jquery.js) - extension of JQueryItemService which works with GP Map objects
- [JQueryLayerService](src/services/layer-jquery.js) - extension of JQueryItemService which works with GP Layer objects
- [JQueryServiceService](src/services/service-jquery.js) - extension of JQueryItemService which works with GP Service objects


Included with the "ng" build file for Angular 1.x applications are
implementations of ItemService which use Angular's $http service.

- [NGItemService](src/services/item-ng.js) - extension of ItemService, base class using $http  
- [NGMapService](src/services/map-ng.js) - extension of NGItemService which works with GP Map objects
- [NGLayerService](src/services/layer-ng.js) - extension of NGItemService which works with GP Layer objects
- [NGServiceService](src/services/service-ng.js) - extension of NGItemService which works with GP Service objects


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

- `ItemService.search(:query)` - Searches items using specified query parameters.
- `ItemService.get(:id)` - Fetch item with specified identifier
- `ItemService.save(:item)` - Create or update the specified item. If 'item.id' exists, updates with HTTP-PUT. Otherwise, creates using HTTP-POST.
- `ItemService.patch(:id, :patch)` - Partial update of item with specified identifier using the specified HTTP-PATCH ops.
- `ItemService.remove(:id)` - Delete item with specified identifier

### Examples

```javascript
let query = GeoPlatform.QueryFactory()
    .types('Map','Layer');
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

```javascript
let item = {
    type: "Map",
    title: "My New Map",
    label: "My New Map",
    description: "This map needs a description",
    createdBy: 'testUser',
    baseLayer: null,
    layers: [],
    keywords: [],
    themes: [],
    resourceTypes: ['http://www.geoplatform.gov/ont/openmap/GeoplatformMap']
};
//save new map
let svc = new GeoPlatform.JQueryMapService();
svc.save(item)
//then work against persisted copy
.then( saved => {

    //patch the map by changing its label
    let patch = [{
        op: 'replace',
        path: '/label',
        value: "Updated label"
    }];
    return svc.patch(saved.id, patch);

})
//lastly, remove the map
.then( updated => svc.remove(updated.id) )
// map has been removed
.then( () => {
    //204 empty response
})
.catch(e => { ... });
```




### Maps

```javascript
new GeoPlatform.JQueryMapService().get(mapId).then( map => {...}).catch(e=>{...});
```

### Layers

`JQueryLayerService` and `NGLayerService` additionally provide the following methods:

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

`JQueryServiceService` and `NGServiceService` additionally provide the following methods:

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

## Query

The 'search' method of ItemService implementations accepts both either generic
JS objects containing parameter name and value combinations to send as the query string
and GeoPlatform.Query objects. `Query` provides methods for quickly building queries
based upon the GeoPlatform object model.

### Creating a Query
You can instantiate Query directly or use `GeoPlatform.QueryFactory` to get a new Query instance.

```javascript
let queryA = new GeoPlatform.Query();
queryA.setQ("testing");

let queryB = GeoPlatform.QueryFactory();
queryB.setQ("testing");
```

### Fluent Queries

`Query` exposes both getter/setter methods for each supported query parameter as well
as a fluent version of the setter which returns "this", allowing you to chain
method calls.

```javascript
//Both of these are equivalent
let queryA = new GeoPlatform.Query();
queryA.setTypes( 'Layer' );
queryA.setEndDate( new Date().getTime() );

let queryB = new GeoPlatform.Query()
    .types( 'Layer' )
    .ends( new Date().getTime() );
```

### Query.setQ()

The `setQ()`, `getQ()`, `q()` methods allow setting/getting the "q" parameter which
maps to free text search in the GeoPlatform API.  This is equivalent to searching
labels, descriptions, keywords, and any other textual field that supports being searched
via free text.

Values with spaces are treated as multiple, OR'ed constraints. To search for a specific
phrase, wrap the value with double quotes.

```javascript
let query = new GeoPlatform.Query().q('"This is a phrase"');
```

### Date Parameters
Date values should be passed to Query methods as their millisecond representation.

```javascript
let queryB = new GeoPlatform.Query().ends( new Date().getTime() );
```

### Requesting Specific Item Properties
By default, search result items contain only a limited set of properties:

- ID ('id') - included automatically
- URI ('uri') - included automatically
- Type ('type') - included automatically
- Label ('label') - included automatically
- Description ('description')
- Created by ('createdBy')
- Creation date ('created')
- Last modified date ('modified')
- Publishing Organizations ('publishers')
- Themes ('themes')

To request a different set of fields, specify them using `Query.setFields()` or
`Query.fields()`. To get the current set of fields, use `Query.getFields()`.

_Note:_ You must specify the property name to use. For example, to also request
the geographic extent for each item in the search results, do the following:

```javascript
let query = new GeoPlatform.Query();
let fields = query.getFields();
fields.push('extent'); //'extent' is the property to use in this case
query.setFields(fields);
```


### Request Faceted Information
Search results contain facet information specifying how certain values appear
within the entire repository of data.  By default, the following facets are
requested with each search:

- Types ('types')
- Themes ('themes')
- Publishers ('publishers')
- Service Types ('serviceTypes') - only applies to type 'regp:Service' items
- Concept Schemes ('schemes') - only applies to type 'skos:Concept' items
- Visibility ('visibility')
- Created By ('createdBy')

To omit facet information, use `Query.setFacets(false)`.  To request a different
set of facets, do the following:

```javascript
let query = new GeoPlatform.Query();
let facets = query.getFacets();
facets.push('layerType'); //Layer.layerType facet info requested
query.setFacets(facets);
```

### Sorting

The `Query.setSort()` and `Query.sort()` methods allows you to set both the property
and direction of sorting to use. To specifically set either, use the `Query.setSortField()`
and `Query.setSortOrder()` methods.

The list of supported default sort options can be retrieved using `Query.getSortOptions()`.

### Clearing Query Values

To reset a Query instance, use `Query.clear()`;
