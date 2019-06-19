
// const request = require('request');
// require('request-debug')(request);


const GPClient = require('../../dist/js/geoplatform.client');
const Query = GPClient.Query;
const ItemTypes = GPClient.ItemTypes;
const QueryParameters = GPClient.QueryParameters;
const Classifiers = GPClient.KGClassifiers;
const ItemService = GPClient.ItemService;
const HttpClient = GPClient.NodeHttpClient;

const URL = 'https://sit-ual.geoplatform.us';

console.log("Using version: " + GPClient.ClientVersion);


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
     .sort('modified', 'desc')
     .classifier(Classifiers.TOPIC_PRIMARY,'358a1c2b139d3e0e8d83c073c12d8b2d');

console.log(JSON.stringify(query.getQuery()));

service.search(query)
.then( response => {
    response.results.forEach(result => {
        console.log(result.label);
    });
})
.catch(e => {
    console.log("Error! " + e.message);
});
