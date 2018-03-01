# GeoPlatform API Client Library
This library provides components which provide easier usage of the GeoPlatform API.
It is not required to interact with the GeoPlatform API, but offers services and helper
functionality to speed up your application's integration with the GeoPlatform.

This library is written in JavaScript and is framework _flexible_. The default implementations
require JQuery to facilitate AJAX XHR requests with the GeoPlatform API hosts.
Alternatively, implementations for Angular 1.x and NodeJS are provided.

__Note:__ The JQuery and Angular implementations require an Internet browser environment
and the NodeJS implementation requires a NodeJS environment of at least 6.9 or later.

## Dependencies
This library requires the following dependencies be present in your application:

### Third Party Dependencies

- [jQuery](https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js) - version 2.1+
- [Q](https://cdnjs.cloudflare.com/ajax/libs/q.js/1.5.1/q.js) - version 1.5+


## NG-Common
The ng-common GeoPlatform library provides Angular 1.x components, services,
filters, and other resources for interacting with the GeoPlatform API and Object Model
from within the UI of an application. It does not rely upon this library,
nor does this library rely upon it.

This library contains Angular-based services for invoking the GeoPlatform API,
but nothing more. If you need visual components or support for more than just
API calling, it is recommended that you use ng-common in your application.

It is possible to utilize both libraries; ng-common at the front-end UI layer and
this library within the backend NodeJS server layer. See the NodeJS section on how
to use client-api in a NodeJS application.


## Including GeoPlatform API Client in your app...

### Within a front-end application
This dependency should be included in your app _after_ you provided environment-specific
configuration variables. It expects `window.GeoPlatform` to exist at runtime.
See Environment Variables below for details on what is expected to be provided.

```html
<!-- define 'GeoPlatform' namespace and set env variables-->
<script src="env.js"></script>
<!-- include ng-common -->
<script src="geoplatform.common.js"></script>
<!-- include map core -->
<script src="geoplatform.client.js"></script>
```

If you are using Angular 1.x, import the client.ng.js file to get access to
"NG" services which leverage Angular's $http service when fetching data.

```html
<script src="geoplatform.client.ng.js"></script>
```

#### Environment Variables
An example of the `GeoPlatform` object and environment variables contained
within is shown below.

```javascript
GeoPlatform = {

    //REQUIRED: environment the application is deployed within
    // one of "development", "sit", "stg", "prd", or "production"
    "env" : "development",

    //REQUIRED: URL to GeoPlatform UAL for API usage
    "ualUrl" : "https://www.url.to/geoplatform/api",

    //timeout max for requests
    "timeout" : "5000",

    //{env}-{id} of application deployed
    "appId" : "development-mv"

};
```


### Within a NodeJS Server-side application

First, add this library as a run-time dependency to your server's package.json file:

```json
"geoplatform.client": "git+https://github.com/GeoPlatform/client-api.git",
```

Then, install the library using NPM

```
$>npm install geoplatform.client
```

Lastly, include the necessary modules in your application's source code. See the [GeoPlatform API](api.md) documentation for details.


## Using GeoPlatform API Client
To learn how to use the GeoPlatform API to fetch, create, update, and remove
GeoPlatform Assets, see the [GeoPlatform API](api.md) and [Query](query.md) documentation.


## Examples

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
let myJwtToken = //fetched previous to this code block
let client = new GeoPlatform.JQueryHttpClient({
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
If defining a class or object or constant, use upper case. If defining a function,
use camel case.

### Referencing Classes
When using inside a browser-based client application, it is recommended you reference
classes using the GeoPlatform namespace, unless your application uses a bundler
framework that supports AMD modules.

#### AMD Modules
```javascript
define(['ItemService', 'JQueryHttpClient'], function(ItemService, JQueryHttpClient) {
    const URL = "...";
    let service = new ItemService(URL, new JQueryHttpClient());
});
```

#### Without AMD
```javascript
const URL = "...";
let service = new GeoPlatform.ItemService(URL,
    new GeoPlatform.JQueryHttpClient());
```

#### NodeJS / CommonJS
When inside NodeJS or any CommonJS module-supporting framework...

```javascript
const GPAPI = require('geoplatform.client');
const ItemService = GPAPI.ItemService;
const HttpClient = GPAPI.HttpClient;

const URL = '...';
let service = new ItemService(URL, new HttpClient());
```
