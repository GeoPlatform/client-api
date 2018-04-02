
// const request = require('request');
// require('request-debug')(request);


const GPClient = require('../../dist/js/geoplatform.client');
const KGQuery = GPClient.KGQuery;
const ItemTypes = GPClient.ItemTypes;
const QueryParameters = GPClient.QueryParameters;
const KGClassifiers = GPClient.KGClassifiers;
const KGService = GPClient.KGService;
const HttpClient = GPClient.NodeHttpClient;

const URL = 'https://ual.geoplatform.gov';


let service = new KGService(URL, new HttpClient());


let query = new KGQuery()
     .types(ItemTypes.MAP)  //constrain to those used for Maps
     .classifiers(KGClassifiers.PLACE)    //constrain to those defining purpose
     .q("Paris")
     .page(0)
     .pageSize(50)
     .sort('modified', 'desc');

// console.log(JSON.stringify(query.getQuery()));

service.suggest(query)
.then( response => {
    if(!response.results.length) console.log("No results");
    response.results.forEach(result => {
        console.log(result.label);
    });
})
.catch(e => {
    console.log("Error! " + e.message);
});
