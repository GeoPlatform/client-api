# GeoPlatform API Client Library
This library provides functionality used to work with GeoPlatform Map, Layer,
Service and other objects through the GeoPlatform API.

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
    "ualUrl" : "https://sit-ual.geoplatform.us",

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


## Miscellaneous

### Conventions
If defining a class or object or constant, use upper case. If defining a function,
use camel case.
