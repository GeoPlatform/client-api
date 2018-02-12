
const QueryFactory = GeoPlatform.QueryFactory;
const ItemTypes = GeoPlatform.ItemTypes;
const QueryParameters = GeoPlatform.QueryParameters;
const ItemService = GeoPlatform.ItemService;
const NGHttpClient = GeoPlatform.NGHttpClient;
const URL = 'https://sit-ual.geoplatform.us';


//define the application's angular module and make sure to include the $httpProvider
// in the config function
angular.module('ngExample', []).config(function myAppConfig ($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
});



angular.module('ngExample').service('ItemServiceInst', ['$http', function($http) {
    let httpClient = new NGHttpClient({$http:$http});
    return new ItemService(URL, httpClient);
}])



angular.module('ngExample').component('searchWidget', {

    controller: function(ItemServiceInst) {

        this.$onInit = function() {

            this.query = QueryFactory()
                 .types([ItemTypes.DATASET, ItemTypes.SERVICE, ItemTypes.MAP, ItemTypes.LAYER])
                 //use labels to search using themes
                 // .themes("Imagery", QueryParameters.THEMES_LABEL)
                 //use labels to search using publishers
                 // .publishers('DOI-USGS', QueryParameters.PUBLISHERS_LABEL)
                 // .modified(new Date(), true)
                 // .extent('-120,20,-66,50')
                 // .begins(new Date())
                 // .ends(new Date())
                 .facets(['themes','publishers'])
                 .fields(['label','theme', 'publisher'])
                 .page(0)
                 .pageSize(10)
                 .sort('modified', 'desc');
        };

        this.$postLink = function() {
             this.search();
        };

        this.previousPage = function() {
            this.query.page(this.query.getPage()-1);
            this.search(this.query);
        };

        this.nextPage = function () {
            this.query.page(this.query.getPage()+1);
            this.search(this.query);
        };

        this.search = function(query) {
            ItemServiceInst.search(query)
            .then( response => { this.results = response.results; })
            .catch(e => { this.error = e.message; });
        };

    },

    template:
    `
    <h5>Search</h5>
    <div>
        <button type="button" ng-click="$ctrl.previousPage()">prev</button>
        <button type="button" ng-click="$ctrl.nextPage()">next</button>
    </div>
    <ul>
        <li ng-repeat="result in $ctrl.results track by $index">
            [{{result.type}}] {{result.label}}</li>
        </li>
    </ul>
    <div>{{$ctrl.error}}</div>
    `
})



angular.module('ngExample').component('exportWidget', {

    controller: function(ItemServiceInst) {

        this.$onInit = function() {

            this.query = QueryFactory()
                 .types(ItemTypes.DATASET);

        };

        this.$postLink = function() {
            this.export();
        };

        this.export = function() {
            ItemServiceInst.search(this.query)
            .then( response => {
                let id = response.results[0].id;
                return ItemServiceInst.export(id);
            })
            .then( response => {
                this.output = response;
            })
            .catch(e => { this.error = e.message; });
        };

    },

    template:
    `
    <h5>Export</h5>
    <pre>{{$ctrl.output}}</pre>
    <div>{{$ctrl.error}}</div>
    `
})
