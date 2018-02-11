

const QueryFactory = GeoPlatform.QueryFactory;
const ItemTypes = GeoPlatform.ItemTypes;
const QueryParameters = GeoPlatform.QueryParameters;
const ItemService = GeoPlatform.ItemService;

const JQHttpClient = GeoPlatform.JQueryHttpClient;
const URL = 'https://sit-ual.geoplatform.us';

let service = new ItemService( URL, new JQHttpClient() );


let query1 = QueryFactory()
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
     // .page(0)
     .pageSize(10)
     .sort('modified', 'desc');

search1(query1);


function previousPage() {
    query1.page(query1.getPage()-1);
    search1(query1);
}
function nextPage() {
    query1.page(query1.getPage()+1);
    search1(query1);
}

function search1(query) {
    service.search(query)
    .then( response => {
        let html = response.results.map(result => {
            return `<li>[${result.type}] ${result.label}</li>`
        });
        jQuery('#results').html(html);
    })
    .catch(e => {
       jQuery('#results').html(e.message);
    });
}









let query2 = QueryFactory()
     .types(ItemTypes.DATASET);
service.search(query2)
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
