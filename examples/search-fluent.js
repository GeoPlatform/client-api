

const QueryFactory = GeoPlatform.QueryFactory;
const ItemTypes = GeoPlatform.ItemTypes;
const QueryParameters = GeoPlatform.QueryParameters;
const JQueryItemService = GeoPlatform.JQueryItemService;


let query = QueryFactory()
     .types([ItemTypes.DATASET, ItemTypes.SERVICE])
     .modified(new Date(), true)
     //use labels to search using themes
     .themes("Imagery", QueryParameters.THEMES_LABEL)
     //use labels to search using publishers
     .publishers('DOI-USGS', QueryParameters.PUBLISHERS_LABEL)
     .extent('-120,20,-66,50')
     .begins(new Date())
     .ends(new Date())
     .facets(['themes','publishers'])
     .fields(['label','theme', 'publisher'])
     .start(0)
     .size(50)
     .sort('modified', 'desc');

let service = new JQueryItemService();
service.search(query)
.then( response => {
   //display results
})
.catch(e => {
   //deal with error
});
