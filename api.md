# GeoPlatform APIs

## ItemService
[GeoPlatform.ItemService](src/shared/item-service.js) is a base class from which implementations exist that
allow interacting with GeoPlatform model objects such as Maps, Layers, Services, etc.  
Included with the Map Core's main build file are implementations of ItemService
which use jQuery to perform AJAX requests against the GeoPlatform API.

- [JQueryItemService](src/shared/item-service-jquery.js) - extension of ItemService, base class using jQuery
- [JQueryMapService](src/map/service-jquery.js) - extension of JQueryItemService which works with GP Map objects
- [JQueryLayerService](src/layer/service-jquery.js) - extension of JQueryItemService which works with GP Layer objects
- [JQueryServiceService](src/service/service-jquery.js) - extension of JQueryItemService which works with GP Service objects


Included with the "ng" build file for Angular 1.x applications are
implementations of ItemService which use Angular's $http service.

- [NGItemService](src/shared/item-service-ng.js) - extension of ItemService, base class using $http  
- [NGMapService](src/map/service-ng.js) - extension of NGItemService which works with GP Map objects
- [NGLayerService](src/layer/service-ng.js) - extension of NGItemService which works with GP Layer objects
- [NGServiceService](src/service/service-ng.js) - extension of NGItemService which works with GP Service objects


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

```javascript
let svc = new GeoPlatform.JQueryServiceService();
svc.get(serviceId)
//get service information using Service Harvester
.then( service => svc.about(service) )
//do something with extracted service metadata
.then( md => {...});
.catch(e=>{...});
```
