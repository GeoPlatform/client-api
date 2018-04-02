
const Client = require('../../dist/js/geoplatform.client');
const Query = Client.Query;
const ItemTypes = Client.ItemTypes;
const QueryParameters = Client.QueryParameters;
const ItemService = Client.ItemService;
const HttpClient = Client.NodeHttpClient;

const URL = 'https://ual.geoplatform.gov';


let service = new ItemService(URL, new HttpClient());


let query = new Query()
     .types([ItemTypes.DATASET, ItemTypes.SERVICE])
     // .modified(new Date(), true)
     //use labels to search using themes
     // .themes("Imagery", QueryParameters.THEMES_LABEL)
     //use labels to search using publishers
     // .publishers('DOI-USGS', QueryParameters.PUBLISHERS_LABEL)
     // .extent('-120,20,-66,50')
     // .begins(new Date())
     // .ends(new Date())
     .facets(['themes','publishers'])
     .fields(['label','theme', 'publisher'])
     .page(0)
     .pageSize(50)
     .sort('modified', 'desc');

// console.log(JSON.stringify(query.getQuery()));

service.search(query)
.then( response => {
    response.results.forEach(result => {
        console.log(result.label);
    });
})
.catch(e => {
    console.log("Error! " + e.message);
});
