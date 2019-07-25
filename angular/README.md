
# GeoPlatform API Client for Angular
The following information covers the API Client support for use within the
Angular framework.

## Bundling in Your Application

Add the API Client library to your project's package.json file as described in
the [Installation documentation](../README.md#Installation).

In addition, it's recommended you configure the Angular-CLI project settings
(angular.json or .angular-cli.json) to know where to find the Angular-specific
portion of API Client, as shown below.

```
{
    ...
    "compilerOptions": {
        ...
        "paths": {
            "@geoplatform/client/angular": ["../node_modules/@geoplatform/client/dist/angular"],
            ...
        }
    },
    ...
}
```


## Using in Your Application

```javascript
import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Config, Query, ItemService, SearchResults } from "@geoplatform/client";
import { NG2HttpClient } from '@geoplatform/client/angular';

@Component({
    selector: 'my-component',
    styleUrls: ['./my.component.css']
    template: `
        <div>{{results?.totalResults}} matches</div>
        <div *ngFor="let result of results?.results">{{result.label}}</div>
    `    
})
class MyComponent implements OnInit {

    public results      : SearchResults;

    private query       : Query;
    private itemService : ItemService;

    constructor( http : HttpClient ) {
        let url = Config.ualUrl;
        let client = new NG2HttpClient(http);
        this.itemService = new ItemService(url, client);
        this.query = new Query();
    }

    ngOnInit() {
        this.itemService.search( this.query )
        .then( (response : SearchResults) => {
            this.results = response;
        })
        .catch( (error : Error) => {
            console.log(error.message);
        });
    }
});
```


### Using Dependency Injection
If you want to create singleton instances for use across multiple components in your application,
you can define a service provider which configures the desired endpoint URL as
well as the instance of NG2HttpClient.


#### Define the Service Provider (e.g., `shared/service.provider.ts`)
```javascript
import { HttpClient } from '@angular/common/http';
import { Config, ItemService } from '@geoplatform/client';
import { NG2HttpClient } from '@geoplatform/client/angular';

//singleton instances
var _client : NG2HttpClient = null;
var _itemService : ItemService = null;
v
export function itemServiceFactory( http : HttpClient ) {
    if(_itemService) return _itemService;
    if(_client === null) _client = new NG2HttpClient(http);
    // console.log("Creating ItemService using:");
    // console.log(Config);
    _itemService = new ItemService(Config.ualUrl, _client);
    return _itemService;
}

export let itemServiceProvider = {
    provide: ItemService,
    useFactory: itemServiceFactory,
    deps: [ HttpClient ]
}
```

#### Register Provider Inside App Module
```javascript
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { itemServiceProvider } from './shared/service.provider';
import { NG2HttpClient } from '@geoplatform/client/angular';

@NgModule({
    declarations: [...],
    imports: [
        HttpClientModule,
        ...
    ],
    providers: [
        {
            provide: NG2HttpClient,
            useFactory: (http:HttpClient) => {
                return new NG2HttpClient(http);
            },
            deps: [HttpClient]
        },
        itemServiceProvider,
        ...
    ],
    entryComponents: [...],
    bootstrap: [ ... ]
})
export class AppModule { }
```

#### Inject Service Inside Component (e.g., `my.component.ts`)
```javascript
import { Inject, Component } from '@angular/core';
import { Config, ItemService } from "@geoplatform/client";
import { NG2HttpClient } from '@geoplatform/client/angular';

@Component({
    selector: 'my-component',
    templateUrl: './my.component.html',
    styleUrls: ['./my.component.css']
})
export class MyComponent {

    private itemService : ItemService;

    constructor(
        @Inject(ItemService) itemService: ItemService
    ) {
        this.itemService = itemService;
    }

    ...
}
```
