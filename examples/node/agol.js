
const GPClient = require('../../dist/js/geoplatform.client');
const Query = GPClient.Query;
const ItemTypes = GPClient.ItemTypes;
const ItemService = GPClient.ItemService;
const HttpClient = GPClient.NodeHttpClient;

const URL = 'https://ual.geoplatform.gov';


let service = new ItemService(URL, new HttpClient());


let query = new Query();
query.types(ItemTypes.MAP)
     .fields(query.getFields().push('resourceTypes'))
     .resourceTypes('http://www.geoplatform.gov/ont/openmap/AGOLMap');
service.search(query)
.then( response => {
    response.results.forEach(result => console.log(result.label) );
})
.catch(e => {
    console.log(`Node Agol Test - Error searching items: ${e.message}`);
});
