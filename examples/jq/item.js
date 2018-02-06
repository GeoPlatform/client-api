

const QueryFactory = GeoPlatform.QueryFactory;
const ItemTypes = GeoPlatform.ItemTypes;
const QueryParameters = GeoPlatform.QueryParameters;
const ItemService = GeoPlatform.ItemService;

const JQHttpClient = GeoPlatform.JQueryHttpClient;
const URL = 'https://sit-ual.geoplatform.us';

let query = QueryFactory()
     .types([ItemTypes.DATASET, ItemTypes.SERVICE, ItemTypes.MAP, ItemTypes.LAYER])
     //use labels to search using themes
     // .themes("Imagery", QueryParameters.THEMES_LABEL)
     //use labels to search using publishers
     // .publishers('DOI-USGS', QueryParameters.PUBLISHERS_LABEL)
     // .modified(new Date(), true)
     // .extent('-120,20,-66,50')
     // .begins(new Date())
     // .ends(new Date())
     .facets(['themes','publishers'])
     .fields(['label','theme', 'publisher'])
     .start(0)
     .pageSize(10)
     .sort('modified', 'desc');

let service = new ItemService( URL, new JQHttpClient() );
service.search(query)
.then( response => {
    let html = response.results.map(result => result.label).join('<br>');
    jQuery('#results').html(html);
})
.catch(e => {
   jQuery('#results').html(e.message);
});






query = QueryFactory()
     .types(ItemTypes.DATASET);
service.search(query)
.then( response => {
    let id = response.results[0].id;
    return service.export(id);
})
.then( response => {
    jQuery('#export').html(response.documentElement.outerHTML);
})
.catch(e => {
    jQuery('#export').html(e.message);
});
