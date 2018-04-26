# GeoPlatform API Client Library
This library provides components which provide easier usage of the GeoPlatform API.
It is not required to interact with the GeoPlatform API, but offers services and helper
functionality to speed up your application's integration with the GeoPlatform.

This library is framework _flexible_. The default implementations
require JQuery to facilitate AJAX XHR requests with the GeoPlatform API hosts.
Alternatively, implementations for Angular 1.x and NodeJS are provided.

__Note:__ The JQuery and Angular implementations require an Internet browser environment
and the NodeJS implementation requires a NodeJS environment of at least 6.9 or later.

## Dependencies and Requirements
This library requires the following dependencies be present in your application:

- [Q](https://cdnjs.cloudflare.com/ajax/libs/q.js/1.5.1/q.js) - version 1.5+
- [jQuery](https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js) - version 2.1+
- [Request](https://github.com/request/request) - version 2.75+
- [AngularJS 1.x](http://...) - optional, used by the NGHttpClient component


## Using GeoPlatform API Client in your app...

### Include as a Dependency
Include Client-API as a dependency of your application inside the package.json file (or similar dependency definition file).

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
<script src="http://dyk46gk69472z.cloudfront.net/geoplatform.client/_VERSION_/js/geoplatform.client.js"></script>
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
The `Config` object exposed by GeoPlatform Client API allows configuration of
environment variables necessary to interact with the GeoPlatform API. Below is
an example of how to configure this object.

```javascript
import { Config } from 'geoplatform.client';
Config.configure({

    //REQUIRED: environment the application is deployed within
    // one of "development", "sit", "stg", "prd", or "production"
    "env" : "development",

    //REQUIRED: URL to GeoPlatform UAL for API usage
    "ualUrl" : "https://www.url.to/geoplatform/api",

    //timeout max for requests
    "timeout" : "5000",

    //{env}-{id} of application deployed
    "appId" : "development-mv"

});

let url = Config.ualUrl;    //will now be set as configured above
```

__Note:__ You must configure this before importing other GeoPlatform libraries which use this
library, such as GeoPlatform.MapCore.

### Service and Query Documentation
To learn how to use the GeoPlatform API to fetch, create, update, and remove
GeoPlatform Assets, see the [GeoPlatform API](api.md) and [Query](query.md) documentation.


### Examples

Look inside the "examples" folder and its sub-folders to see how to use the client API.

To run the JQuery and Angular examples, it is recommended you use http-server:

1. Install http-server if it isn't already: `npm install -g http-server`
2. Run an http server in the root folder of the api project: `http-server -p8080`
3. Load the desired example in your browser (e.g., http://localhost:8080/examples/jq/item.html)

To run the NodeJS examples, run Node from the api project root folder passing it
the desired example JS file (e.g., `node examples/node/item.js`)


## Authentication and Authorization
The GeoPlatform API uses OAuth 2.0 to authenticate users and restrict access to data and operations.
Client API provides a way to specify a valid JWT token to be used with requests, but assumes a
valid token has already been fetched by another component within your application.

__Important!__ To use any data-modifying portion of this client API, you __must__ provide
an authentication token or the request will be denied by the GeoPlatform API.


```javascript
//es6 import
import { JQueryHttpClient } from 'geoplatform.client';
//or using require()
//const JQueryHttpClient = require('geoplatform.client').JQueryHttpClient;
//or using global
//const JQueryHttpClient = GeoPlatformClient.JQueryHttpClient;

let myJwtToken = //fetched previous to this code block
let client = new JQueryHttpClient({
    token: myJwtToken
});

//or
client.setAuthToken(myJwtToken);

//or as a function
let myTokenFn = function() { return myJwtToken; };
client.setAuthToken(myTokenFn);
```

__Note:__ If the token is refreshed or removed, you must make sure to update the client
with the latest information.

## Miscellaneous

### Conventions
If defining a class or object or constant, use upper case. If defining a function, use camel case.
