# GeoPlatform API Client Library
This library provides components which provide easier usage of the GeoPlatform API.
It is not required to interact with the GeoPlatform API, but offers services and helper
functionality to speed up your application's integration with the GeoPlatform.

This library is framework _flexible_. The default implementations
require JQuery to facilitate AJAX XHR requests with the GeoPlatform API hosts.
Alternatively, implementations for Angular 1.x and NodeJS are provided.

__Note:__ The JQuery and Angular implementations require an Internet browser environment
and the NodeJS implementation requires a NodeJS environment of at least 6.9 or later.

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

- [Q](https://cdnjs.cloudflare.com/ajax/libs/q.js/1.5.1/q.js) - version 1.5+
- [jQuery](https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js) - version 2.1+
- [Request](https://github.com/request/request) - version 2.75+, optional (used by `NodeHttpClient`)
- [AngularJS](http://...) - 1.x, optional (used by `NGHttpClient`)


## Using GeoPlatform API Client in Your App

### Include as a Dependency
Include API Client as a dependency of your application inside the package.json file (or similar dependency definition file).

```
   ...
   "dependencies": {
       ...,
       "geoplatform.client": "git+https://github.com/GeoPlatform/client-api.git",
       ...
   }
   ...
```

and then run `npm install geoplatform.client` or `yarn add geoplatform.client`.  

_Note:_ You can try installing using the --save option but NPM sometimes has issues with installing and updating GIT repo-hosted modules. It's better to explicitly add it to your package.json and then install it.


If not using a build tool like WebPack or Browserify, make sure to include the distribution in your application's HTML file(s):

```html
<script src="geoplatform.client.js"></script>
```

__Note:__ You can also load the library from a CDN:
```html
<script src="https://s3.amazonaws.com/geoplatform-cdn/geoplatform.client/_VERSION_/js/geoplatform.client.js"></script>
```

### Referencing Components in your App

#### Using 'require()'
```javascript
//include the config export used to define API properties needed later
const ItemService = require('geoplatform.client').ItemService;
```
#### Using ES6 'import ... from'
```javascript
//include the config export used to define API properties needed later
import { ItemService } from 'geoplatform.client';
```
#### Using the "GeoPlatformClient" Global
```javascript
//include the config export used to define API properties needed later
const ItemService = GeoPlatformClient.ItemService;
```

#### Environment Variables
The `Config` object exposed by GeoPlatform API Client allows configuration of
environment variables necessary to interact with the GeoPlatform API. Below is
an example of how to configure this object.

```javascript
import { Config } from 'geoplatform.client';
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

To run the JQuery and Angular examples, it is recommended you use http-server:

1. Install http-server if it isn't already: `npm install -g http-server`
2. Run an http server in the root folder of the api project: `http-server -p8080`
3. Load the desired example in your browser (e.g., http://localhost:8080/examples/jq/item.html)

To run the NodeJS examples, run Node from the api project root folder passing it
the desired example JS file (e.g., `node examples/node/item.js`)


## Miscellaneous

### Conventions
#### Code Case
- Classes use capitalized case (e.g., `class MyClass { ... }`)
- Variables and functions use camel-case (e.g., `let myObj = ...`)
- Constants use uppercase (e.g., `const DEFINITIONS = { ... }`)
