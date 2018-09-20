

(function(angular) {

    'use strict';

    /**
     * Root-level component for the Map Viewer.
     */
    class DetailsComponent {

        constructor($rootScope) {
            this.$rootScope = $rootScope;
        }

        $onInit () {
            this.state = {
                loading: false,
                error: null
            };

            this.listeners = [

                this.$rootScope.$on('myapp:selection:loading', (event) => {
                    this.state.loading = true;
                }),

                this.$rootScope.$on('myapp:selection:data', (event, item) => {
                    this.state.loading = false;
                    this.item = item;
                }),

                this.$rootScope.$on('myapp:selection:error', (event, error) => {
                    this.state.loading = false;
                    this.state.error = error;
                })

            ];

        }

        $onDestroy () {
            while(this.listeners.length)
                this.listeners.pop()();
            this.item = null;
            this.state = null;
            this.$rootScope = null;
        }

    }



    angular.module('my-app').component('myDetailsComponent', {
        controller: DetailsComponent,
        template:
        `
        <div class="p-details-component">

            <div ng-if="$ctrl.state.error">
                <h5>An Error Occurred</h5>
                <p>{{$ctrl.state.error}}</p>
            </div>

            <div ng-if="$ctrl.state.loading">Fetching complete item details, please wait...</div>

            <div ng-if="!$ctrl.state.loading">

                <div ng-if="!$ctrl.item">Select a result on the left to see it's details here</div>

                <div ng-if="$ctrl.item">
                    <h5>{{$ctrl.item.label}}</h5>
                    <div>{{$ctrl.item.type}}</div>
                    <div>{{$ctrl.item.description}}</div>
                </div>

            </div>

        </div>
        `
    });


})( angular );
