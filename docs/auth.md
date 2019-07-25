# Authentication and Authorization

The GeoPlatform API uses OAuth 2.0 to authenticate users and restrict access to data and operations.
API Client provides a way to specify a valid JWT token to be used with requests, but assumes a
valid token has already been fetched by another component within your application.

__Important!__ To use any data-modifying portion of this client API, you __must__ provide
an authentication token or the request will be denied by the GeoPlatform API.


```javascript
//es6 import
import { XHRHttpClient } from '@geoplatform/client';
//or using require()
//const XHRHttpClient = require('@geoplatform/client').XHRHttpClient;
//or using global
//const XHRHttpClient = geoplatform.client.XHRHttpClient;

let myJwtToken = //fetched previous to this code block
let client = new XHRHttpClient({
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
