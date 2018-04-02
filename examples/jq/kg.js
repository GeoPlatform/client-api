
const Config = GeoPlatformClient.Config;

//configure env vars
Config.configure({
    ualUrl : 'https://ual.geoplatform.gov'
});


const KGQuery = GeoPlatformClient.KGQuery;
const KGClassifiers = GeoPlatformClient.KGClassifiers;
const ItemTypes = GeoPlatformClient.ItemTypes;
const QueryParameters = GeoPlatformClient.QueryParameters;
const KGService = GeoPlatformClient.KGService;
const JQHttpClient = GeoPlatformClient.JQueryHttpClient;


let service = new KGService(Config.ualUrl, new JQHttpClient());


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
    let html = 'No results';
    if(response.results.length) {
        html = response.results.map(result => `<li>${result.label}</li>` );
    }
    jQuery('#results').html(html);
})
.catch(e => {
   jQuery('#results').html(e.message);
});
