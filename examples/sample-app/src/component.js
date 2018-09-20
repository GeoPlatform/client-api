

(function(angular, APIClient, AuthenticatedComponent, Environment) {

    'use strict';

    const Query = APIClient.Query;
    const QueryParams = APIClient.QueryParameters;
    const ItemTypes = APIClient.ItemTypes;
    const NGHttpClient = APIClient.NGHttpClient;
    const ItemService = APIClient.ItemService;



    /**
     * Root-level component for the Map Viewer.
     */
    class MyComponent extends AuthenticatedComponent {

        constructor(
            $rootScope, $timeout,
            AuthenticationService, MyItemService,
        ) {
            super($rootScope, AuthenticationService);
            this.itemService = MyItemService;
            this.$timeout = $timeout;
            this.$rootScope = $rootScope;
        }

        $onInit () {
            super.$onInit();
            this.state = {
                loading: true
            };
            this.data = {
                query: {
                    keywords: null,
                    type: ItemTypes.DATASET
                },
                itemTypes: Object.keys(ItemTypes).map(k=>ItemTypes[k])
            };
            this.search();
        }

        $onDestroy () {
            super.$onDestroy();
            this.state = null;
            this.data = null;
            this.itemService = null;
            this.$timeout = null;
            this.$rootScope = null;
        }

        onAuthEvent(event, user) {
            super.onAuthEvent(event, user);
            console.log("User is now: " + user);
            this.data.user = user;
        }

        search() {

            let query = new Query();
            if(this.data.query.type)
                query.types(this.data.query.type);
            if(this.data.query.keywords)
                query.q(this.data.query.keywords);

            this.itemService.search(query)
            .then( response => {
                //debounce setting results since fetch happened outside ng scope
                this.$timeout( () => {
                    this.data.total = response.totalResults;
                    this.data.items = response.results.slice(0);
                });
            })
            .catch( e => {
                this.state.error = e;
            })
            .finally( () => {
                this.state.loading = false;
            });
        }


        /**
         *
         */
        select(item) {

            this.$rootScope.$broadcast('myapp:selection:loading', true);

            //search results have only partial item data, so we should fetch the
            //whole item if we need to display more about a single item
            this.itemService.get(item.id)
            .then( fullItem => {
                this.$timeout( () => {
                    this.$rootScope.$broadcast('myapp:selection:data', fullItem);
                });
            })
            .catch( e => {
                this.state.error = e;
                this.$rootScope.$broadcast('myapp:selection:error', e);
            });
        }


        /**
         *
         */
        createItem () {

            if(!this.data.user) {
                console.log("You are not logged in!");
                return;
            }

            let item = {
                type: ItemTypes.DATASET,
                title: "This is my new dataset",
                description: "This is a rich description of this new dataset",
                createdBy: this.data.user.username
            };

            this.itemService.save(item)
            .then( response => {
                console.log(`Dataset now has ID: ${response.id}`);
            })
            .catch( e => { console.log(e.message); });
        }

    }



    angular.module('my-app').component('myCustomComponent', {
        bindings: { onSelect: '&' },
        controller: MyComponent,
        template:
        `
        <div class="p-custom-component">
            <h5>It Works!</h5>

            <span ng-if="$ctrl.state.error">
                <h5>There was an error:</h5>
                <p>{{$ctrl.state.error.message}}</p>
            </span>
            <span ng-if="$ctrl.state.loading">Loading, please wait...</span>
            <div ng-if="!$ctrl.state.loading">

                <input class="a-form-field" type="text" placeholder="Search by keywords..."
                    ng-model="$ctrl.data.query.keywords"
                    ng-key-up="$ctrl.search()">

                <select class="a-form-field"
                    ng-model="$ctrl.data.query.type"
                    ng-change="$ctrl.search()">
                    <option value="">Search for type</option>
                    <option ng-repeat="type in $ctrl.data.itemTypes"value="{{type}}">{{type}}</option>
                </select>

                <hr>

                <div>showing {{$ctrl.data.items.length}} of {{$ctrl.data.total}} hits</div>
                <br>
                <ol>
                    <li ng-repeat="item in $ctrl.data.items track by $index">
                        <a ng-click="$ctrl.select(item)">{{item.label}}</a>
                    </li>
                </ol>
                <hr>
                <button type="button" ng-click="$ctrl.createItem()">Create</button>
            </div>
        </div>
        `
    });


})(
    angular,                            //<- for angular syntax
    GeoPlatformClient,                  //<- for using GP API Client
    GeoPlatform.AuthenticatedComponent, //<- for using GP Auth-aware component class
    GeoPlatform                         //<- environment vars
);
