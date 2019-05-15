
var mock = require('mock-require');

const request = require('request');

const Client = require('../../dist/bundles/geoplatform-client.umd');
const ItemService = Client.ItemService;

//needed to use the base client lib in this test server
// as the client-node UMD file will attempt to require('@geoplatform/client')
mock('@geoplatform/client', Client);

const NodeClient = require('../../dist/bundles/geoplatform-client-node.umd');
const NodeHttpClient = NodeClient.NodeHttpClient;


let service = new ItemService("https://ual.geoplatform.gov",
    new NodeHttpClient());

service.search().then( response => {
    response.results.map( it => { console.log(it.label); });
});
