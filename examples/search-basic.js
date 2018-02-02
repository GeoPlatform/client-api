

let query = new GeoPlatform.Query();

query.setTypes('dcat:Dataset');
query.setTypes(['dcat:Dataset', 'regp:Service']);

//modified before now
query.setModified(new Date(), true);
//modified after now
query.setModified(new Date(), false);


let themeIds = [...];
query.setThemes(themeIds);  //default using ids
let themeLabels = [...];
query.setThemes(themeLabels, 'label');
let themeUris = [...];
query.setThemes(themeUris, 'uri');


let publisherIds = [...];
query.setPublishers(publisherIds);


//set spatial query
query.setExtent('-120,20,-66,50');
query.setExtent(L.LatLngBounds([[-120,20],[-66,50]]));  //same as above


//set temporal query
query.setBeginDate(new Date());
query.setEndDate(new Date());
query.setBetween(new Date(), new Date());


//specify which facets are calculated
query.setFacets(['themes','publishers']);


//specify which fields are returned in results
query.setFields(['label','theme', 'publisher']);


//set pagination and sorting
query.setStart(0);
query.setPageSize(50);
query.setSort('modified,desc');
query.setSort('modified', 'desc');  //same as previous line


let service = new GeoPlatform.JQueryItemService();
service.search(query)
.then( response => {
   //do something with results
})
.catch(e => {
   //do something with error
});
