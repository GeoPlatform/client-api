

let query = GeoPlatform.QueryFactory()
     .types(['dcat:Dataset', 'regp:Service'])
     .modified(new Date(), true)
     //use labels to search using themes
     .themes("Imagery", 'label')
     //use labels to search using publishers
     .publishers('DOI-USGS', 'label')
     .extent('-120,20,-66,50')
     .begins(new Date())
     .ends(new Date())
     .facets(['themes','publishers'])
     .fields(['label','theme', 'publisher'])
     .start(0)
     .size(50)
     .sort('modified', 'desc');

let service = new GeoPlatform.JQueryItemService();
service.search(query)
.then( response => {
   //display results
})
.catch(e => {
   //deal with error
});
