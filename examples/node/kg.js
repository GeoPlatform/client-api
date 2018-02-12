
// const request = require('request');
// require('request-debug')(request);


const GPClient = require('../../src/index');
const KGQuery = GPClient.KGQuery;
const ItemTypes = GPClient.ItemTypes;
const QueryParameters = GPClient.QueryParameters;
const KGClassifiers = GPClient.KGClassifiers;
const KGService = GPClient.KGService;
const HttpClient = GPClient.HttpClient;

const URL = 'https://sit-ual.geoplatform.us';


let service = new KGService(URL, new HttpClient());


let query = new KGQuery()
     .types(ItemTypes.MAP)  //constrain to those used for Maps
     .classifiers(KGClassifiers.PLACE)    //constrain to those defining purpose
     .q("paris")
     .page(0)
     .pageSize(50)
     .sort('modified', 'desc');

// console.log(JSON.stringify(query.getQuery()));

service.suggest(query)
.then( response => {
    response.results.forEach(result => {
        console.log(result.label);
    });
})
.catch(e => {
    console.log("Error! " + e.message);
});
