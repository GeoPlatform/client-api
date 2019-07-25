# GeoPlatform API Client NodeJS Support

The following documentation covers the usage of API Client within NodeJS environments.

## Bundling in Your Application

Add the API Client library to your project's package.json file as described in
the [Installation documentation](../README.md#Installation).


## Using in Your Application

```javascript
const APIClient = require("@geoplatform/client");
const Config = APIClient.Config;
const Query = APIClient.Query;
const ItemService = APIClient.ItemService;
const NodeHttpClient = require("@geoplatform/client/node").NodeHttpClient;

const client = new NodeHttpClient();
const service = new ItemService(Config.ualUrl, client);

module.exports = {

    search: function(params) {
        let query = new Query(params);  //convert KVP to Query
        return service.search(query);   //returns Promise<SearchResults>
    }

}
```

## Using Service Proxies
API Client Service proxies are available to allow applications with server-side
capabilities to host the API endpoints locally and proxy requests to the
GeoPlatform.  Proxies are useful when applications need to perform custom logic
on requests and/or responses or to avoid cross-origin resource sharing (CORS) errors.

To enable service proxies, bind them to the desired endpoints of your application
using your Express router setup.  An example is shown below.

```javascript
var router      = require('express').Router();

const GPAPI     = require('@geoplatform/client');
const GPProxies = require('@geoplatform/client/node');
const Logger    = require('../logger');

const GPConfig = GPAPI.Config;
GPConfig.configure({
    ualUrl: process.env.UAL_URL || "https://ual.geoplatform.gov",
    timeout: process.env.TIMEOUT || 5000
});

let itemSvcProxy = GPProxies.ItemServiceProxy({
    logger: Logger,
    uri:    { path: 'uri' },
    exists: { path: 'exists' },
    search: { auth: true }
});
router.use( itemSvcProxy );

module.exports = router;
```

To bind service proxy endpoints that differ from default GeoPlatform API endpoints,
use the configuration `path` option for specific proxy capabilities (as shown above).

**Note: ** You will need to configure your client-side services to point to your
local server-side proxies instead of the GeoPlatform API.
