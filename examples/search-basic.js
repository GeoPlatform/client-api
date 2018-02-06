

const Query = GeoPlatform.Query;
const ItemTypes = GeoPlatform.ItemTypes;
const QueryParameters = GeoPlatform.QueryParameters;


let query = new Query();

query.setTypes(ItemTypes.DATASET);
query.setTypes([ItemTypes.DATASET, ItemTypes.SERVICE]);

//modified before now
query.setModified(new Date(), true);
//modified after now
query.setModified(new Date(), false);


let themeIds = [...];
query.setThemes(themeIds);  //default using ids
let themeLabels = [...];
query.setThemes(themeLabels, QueryParameters.THEMES_LABEL);
let themeUris = [...];
query.setThemes(themeUris, QueryParameters.THEMES_URI);


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
