
# GeoPlatform API Client for Angular
The following information covers the API Client support for use within the
Angular framework.

## Bundling in Your Application

Add the API Client library to your project's package.json file as described in
the [Installation documentation](../README.md#Installation).

In addition, it's recommended you configure the TypeScript compiler
(in `src/tsconfig.app.json`) to specify the location of the Angular-specific
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
you can use service providers defined inside the `GeoPlatformClientModule`
which configures the desired endpoint URL as well as the instance of NG2HttpClient.


#### Import GeoPlatformClientModule in AppModule
```javascript
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { GeoPlatformClientModule } from '@geoplatform/client/angular';

@NgModule({
    declarations: [...],
    imports: [
        HttpClientModule,

        //import the module into your application's module
        GeoPlatformClientModule,
        // --------------------

        ...
    ],
    providers: [...],
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
        //inject service instance into your component
        @Inject(ItemService) itemService: ItemService
    ) {
        this.itemService = itemService;
    }

    ...
}
```
