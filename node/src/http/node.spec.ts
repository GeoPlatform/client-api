
import {
    Config, Query, ItemTypes, ItemService, GPHttpClient
} from '@geoplatform/apicore';
import NodeHttpClient from './node';

describe("Item Service", () => {

    let client : GPHttpClient;
    let service : ItemService;


    beforeAll( () => {
        Config.configure({
            ualUrl : "https://ual.geoplatform.gov"
        });
        client = new NodeHttpClient();
        service = new ItemService(Config.ualUrl, client);
    });


    it("should find and fetch items", () => {

        let query = new Query();
        service.search(query)
        .then( (response:any) => {
            expect(response).toBeDefined();
            expect(response.totalResults).toBeGreaterThan(0);
            expect(response.results).toBeDefined();
            expect(response.results.length).toBeGreaterThan(0);

            let result : any = response.results[0];
            expect(result.id).toBeDefined();
            expect(result.type).toBeDefined();

            return service.get(result.id);
        })
        .then( (item : any) => {
            expect(item).toBeDefined();
            expect(item.id).toBeDefined();
            expect(item.type).toBeDefined();
        })
        .catch( (error : Error) => {
            expect(error).toBeUndefined(error.message);
        });

    });


    it("should support generating URIs", () => {

        let data : any = {
            type: ItemTypes.DATASET,
            title: "Test",
            createdBy: "username"
        };

        service.getUri(data)
        .then( (response : any) => {
            expect(response).toBeDefined();
        })
        .catch( (error : Error) => {
            expect(error).toBeUndefined(error.message);
        });

    });

});
