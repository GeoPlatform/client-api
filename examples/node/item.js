
const GPClient = require('../../src/index');
const Query = GPClient.Query;
const ItemTypes = GPClient.ItemTypes;
const ItemService = GPClient.ItemService;

const URL = 'https://sit-ual.geoplatform.us';


let service = new ItemService(URL);


//
// EXPORTING ITEMS
//
let query = new Query().types(ItemTypes.DATASET);
service.search(query)
.then( response => response.results[0] )
.then( item => service.export(item.id) )
.then( data => {
    //buffered data
})
.catch(e => {
    console.log(`NodeItemService Test - Error exporting dataset: ${e.message}`);
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