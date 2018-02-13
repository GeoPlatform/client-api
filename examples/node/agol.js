
const GPClient = require('../../src/index');
const Query = GPClient.Query;
const ItemTypes = GPClient.ItemTypes;
const ItemService = GPClient.ItemService;
const HttpClient = GPClient.HttpClient;

const URL = 'https://sit-ual.geoplatform.us';


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
    console.log(`NodeItemService Test - Error exporting dataset: ${e.message}`);
});
