
// const request = require('request');
// require('request-debug')(request);


const KGQuery = GeoPlatform.KGQuery;
const KGClassifiers = GeoPlatform.KGClassifiers;
const ItemTypes = GeoPlatform.ItemTypes;
const QueryParameters = GeoPlatform.QueryParameters;
const KGService = GeoPlatform.KGService;
const JQHttpClient = GeoPlatform.JQueryHttpClient;

const URL = 'https://sit-ual.geoplatform.us';


let service = new KGService(URL, new JQHttpClient());


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
    let html = response.results.map(result => {
        return `<li>${result.label}</li>`
    });
    jQuery('#results').html(html);
})
.catch(e => {
   jQuery('#results').html(e.message);
});
