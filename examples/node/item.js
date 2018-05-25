
const GPClient = require('../../dist/js/geoplatform.client');
const Query = GPClient.Query;
const ItemTypes = GPClient.ItemTypes;
const ItemService = GPClient.ItemService;
const HttpClient = GPClient.NodeHttpClient;

const URL = 'https://ual.geoplatform.gov';


let service = new ItemService(URL, new HttpClient());


//
// EXPORTING ITEMS
//
let query = new Query().types(ItemTypes.DATASET);
service.search(query)
.then( response => response.results[0] )
.then( item => service.export(item.id) )
.then( response => {
    console.log(response.body);
})
.catch(e => {
    console.log(`NodeItemService Test - Error exporting dataset: ${e.message}`);
});


//
// FETCH MULTIPLE
//
service.search(query)
.then( response => response.results.map(it=>it.id).slice(0,3) )
.then( ids => service.getMultiple(ids) )
.then( response => {
    console.log(response.length);
})
.catch(e => {
    console.log(`NodeItemService Test - Error fetching multiple: ${e.message}`);
});


//
// Item Test
//
let obj = {
    type: ItemTypes.DATASET,
    label: "Test DataSet",
    createdBy: "test_user"
};
//1. test generating URI for minimal object
service.getUri(obj)
//2. test creating new object
.then( uri => {
    // console.log(`NodeItemService Test - URI '${uri}'`)
    obj.uri = uri;
    return service.save(obj);
})
//3. test updating saved object
.then( dataset => {
    // console.log(`Created dataset ${dataset.id}`)
    dataset.description = "This is a dataset";
    return service.save(dataset);
})
//4. test deleting object
.then( dataset => {
    // console.log(`Updated dataset ${dataset.description}`)
    return service.remove(dataset.id);
})
.then( () => {
    // console.log("Deleted dataset");
    return true;
})
.catch(e => {
    console.log(`NodeItemService Test - Error: ${e.message}`)
})
