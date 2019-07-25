# GeoPlatform API Client Library
This library provides components which provide easier usage of the GeoPlatform API.
It is not required to interact with the GeoPlatform API, but offers services and helper
functionality to speed up your application's integration with the GeoPlatform.

This library is framework _flexible_. The default implementations
require Axios to facilitate AJAX XHR requests with the GeoPlatform API hosts.
Alternatively, implementations for Angular 1.x, Angular 8+ and NodeJS are provided.

## Table of Contents
- [Dependencies and Requirements](#dependencies-and-requirements)
- [Using GeoPlatform API Client in Your App](#using-geoplatform-api-client-in-your-app)
- [Service and Query Documentation](#service-and-query-documentation)
- [Server-side Proxies](#server-side-proxies)
- [User Authentication and Authorization](#user-authentication-and-authorization)
- [Examples](#examples)
- [Miscellaneous](#miscellaneous)


## Dependencies and Requirements
This library requires the following dependencies be present in your application:

- [Axios](https://github.com/axios/axios) - version 0.18+
- [AngularJS](https://angularjs.org/) - 1.x, required if using the [AngularJS support](angularjs/README.md)
- [Angular](https://angular.io) - 8+, required if using the [Angular support](angular/README.md)
- [Request](https://github.com/request/request) - version 2.75+, required if using the [Node support](node/README.md)


For more information about how to use API Client inside AngularJS, see the [AngularJS documentation](angularjs/README.md).


For more information about how to use API Client inside Angular, see the [Angular documentation](angular/README.md)


For more information about how to use API Client inside NodeJS, see the [Node documentation](node/README.md)

## Installation
Include API Client as a dependency of your application inside the package.json file
(or similar dependency definition file).

```
   ...
   "dependencies": {
       ...,
       "@geoplatform/client": "git+https://github.com/GeoPlatform/client-api.git",
       ...
   }
   ...
```

Then run `npm install @geoplatform/client` or `yarn add @geoplatform/client`.  

_Note:_ You can try installing using the --save option but NPM sometimes has issues with installing and updating GIT repo-hosted modules. It's better to explicitly add it to your package.json and then install it.


## Using GeoPlatform API Client in Your App

If not using a build tool like WebPack or Browserify, make sure to include the distribution in your application's HTML file(s):

```html
<script src="path/to/geoplatform.client.js"></script>
```

__Note:__ You can also load the library from a CDN:
```html
<script src="https://s3.amazonaws.com/geoplatform-cdn/@geoplatform/client/_VERSION_/js/geoplatform.client.js"></script>
```

### Referencing Components in your App

#### Using 'require()'
```javascript
//include the config export used to define API properties needed later
const ItemService = require('@geoplatform/client').ItemService;
```
#### Using ES6 'import ... from'
```javascript
//include the config export used to define API properties needed later
import { ItemService } from '@geoplatform/client';
```
#### Using the Global Variable
```javascript
//include the config export used to define API properties needed later
const ItemService = geoplatform.client.ItemService;
```

#### Environment Variables
The `Config` object exposed by GeoPlatform API Client allows configuration of
environment variables necessary to interact with the GeoPlatform API. Below is
an example of how to configure this object.

```javascript
import { Config } from '@geoplatform/client';
Config.configure({

    //REQUIRED: environment the application is deployed within
    // one of "development", "sit", "stg", "prd", or "production"
    "env" : "development",

    //Optional, URL to GeoPlatform UAL for API usage. Override this only if you are
    // communicating with a different instance of GeoPlatform API or if you are
    // using a server-side proxy of API - see below for more info on this.
    "ualUrl" : "https://ual.geoplatform.gov",

    //timeout max for requests
    "timeout" : "5000",

    //application identifier of the application using the API
    "appId" : "my-app"

});

let url = Config.ualUrl;    //will now be set as configured above
```

__Note:__ You must configure this before importing other GeoPlatform libraries which use this
library, such as GeoPlatform.MapCore.


## Service and Query Documentation
To learn how to use the GeoPlatform API to fetch, create, update, and remove
GeoPlatform Assets, see the [GeoPlatform API](docs/api.md) and [Query](docs/query.md) documentation.


## Server-side Proxies
If you are modifying data - which requires OAuth 2.0 identity tokens be supplied to
the API Client http client instances - or are worried about cross-origin request
security (CORS) issues, you should use server-side proxies of the API Client.
The proxies are instances of the same API Client service instances used client-side but
bound to HTTP endpoints through ExpressJS in NodeJS.  The proxies allow better
authorization token refresh handling and avoid browser limitations involving CORS.

To enable server-side proxies in the NodeJS portion of your application, check
out the [proxy documentation](docs/proxies.md).

## User Authentication and Authorization
Check out the [authentication documentation](docs/auth.md) for details about how
to enable authenticating users and providing authorization tokens with requests.


## Examples

Look inside the "examples" folder and its sub-folders to see how to use the client API.

To run the NodeJS examples, run Node from the api project root folder passing it
the desired example JS file (e.g., `node examples/node/item.js`)


## Miscellaneous

### Conventions
#### Code Case
- Classes use capitalized case (e.g., `class MyClass { ... }`)
- Variables and functions use camel-case (e.g., `let myObj = ...`)
- Constants use uppercase (e.g., `const DEFINITIONS = { ... }`)



## Upgrading from version 0.2 to 0.3
Version 0.3 is built using TypeScript and ng-packagr. It uses the namespaced package name
("@geoplatform/client") instead of the previous "geoplatform.client" and separates
the environment-specific support classes into sub-packages: "@geoplatform/client/node",
"@geoplatform/client/angularjs", and the new "@geoplatform/client/angular".

The default XHR mechanism in 0.3 has been migrated from jQuery's AJAX to Axios to
better work when used inside non-browser environments such as NodeJS and server-side Angular.

### Importing into your projects

Update the module name in your package.json and install the necessary dependency libs (Q and Axios, plus any environment-specific libraries).

```json
"dependencies": {
    "@geoplatform/client": "git+https://github.com/GeoPlatform/client-api.git",
    "axios": "0.18.0",
    "q": "1.5.1"
}
```


Use the update package name when include the appropriate library-specific sub-package as necessary:

```html
<!--
    Inside Single Page Application pages
-->
<!-- base library, uses Axios to do XHR requests -->
<script src="node_modules/@geoplatform/client/dist/bundles/geoplatform-client.umd.min.js"></script>
<!-- angularJS support, uses $http to do XHR requests -->
<script src="node_modules/@geoplatform/client/dist/bundles/geoplatform-client-angularjs.umd.min.js"></script>

<script>
    let ItemService = geoplatform.client.ItemService;
    let NGHttpClient = geoplatform.client.angularjs.NGHttpClient;
</script>
```

```javascript
/* Inside NodeJS */
const ItemService = require("@geoplatform/client").ItemService;
const NodeHttpClient = require("@geoplatform/client/node").NodeHttpClient;
```

```javascript
/* Inside Angular (ES6) */
import { ItemService } from "@geoplatform/client";
import { NG2HttpClient } from "@geoplatform/client/angular");
```

*Note:* When using version 0.3 inside client-side SPAs that do not support ES6 imports,
the global constant ("GeoPlatformClient") has been replaced with "geoplatform.client"
(case sensitive). Sub-package constants extend this constant (e.g., "geoplatform.client.angularjs" for AngularJS-specific classes, "geoplatform.client.angular" for Angular).



## Important Notes

### When using inside Angular CLI / WebPack applications
Use `"target" : "es6"` as using older compilation targets may generate errors
regarding things such as superclass constructor calls.
