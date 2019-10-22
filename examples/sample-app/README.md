# GeoPlatform API Client Sample Application

This example application shows how to use API Client inside an AngularJS application
that also has NodeJS server-side components.

For the detailed walkthrough associated with this application, check out the
[Getting Started](https://www.geoplatform.gov/help/api/getting-started) page on
GeoPlatform.gov.










## Setup
The walkthrough will demonstrate how to integrate an AngularJS + NodeJS application with the GeoPlatform API using the **@geoplatform/common**, **@geoplatform/client**, and **@geoplatform/oauth-node** libraries.  

It is possible to integrate Angular (2+) and other applications, but those will not be covered here.


### Dependencies
It is assumed the application being developed is setup as follows:

- NodeJS 10.15x backend
- AngularJS 1.6 or Angular 6+ frontend
- NPM/Yarn dependency manager

#### GeoPlatform API Client        
The **@geoplatform/client** API Client library is a set of Javascript classes and functions that provides a convenient interface on top the GeoPlatform API. It supports the basic operations exposed for all GeoPlatform CBO assets (e.g., “CRUD”), asset-specific operations, and authentication and authorization integration.

#### GeoPlatform NG Common
The **@geoplatform/common** library is an AngularJS support library that provides an `AuthenticationService` which can be used to sign users in to the GeoPlatform as well as request user information and validate user authorization to perform operations against individual GeoPlatform resources.

#### GeoPlatform NodeJS Oauth
The **@geoplatform/oauth-node** library is a NodeJS support library that is used by the **@geoplatform/common** library to facilitate communication with the GeoPlatform identity provider and automatically perform token refreshes and revocations when needed.

**NOTE:** If your application supports creating or modifying content within GeoPlatform, you must utilize the GeoPlatform OAuth2 identity provider and support passing JWT identity tokens with requests to the API.

```json
"name": "my-custom-app",
"dependencies": {
  "@geoplatform/oauth-node": "git+https://github.com/GeoPlatform/node-gpoauth.git",
  "@geoplatform/common": "git+https://github.com/GeoPlatform/ng-common.git",
  "@geoplatform/client": "git+https://github.com/GeoPlatform/client-api.git",
  "angular": "1.6.1",
  "axios": "0.18.0",
  "request": "^2.75.0",
  "jquery": "~2.1.4"
}
```



### User Authentication
In this section, we’ll discuss the steps needed to get your application using the GeoPlatform authentication mechanisms.

#### STEP 1: Register your application for GeoPlatform authentication access

In order to authenticate users, your application must provide an identifier and a secret token which confirms your application is authorized to participate in the authentication of GeoPlatform users. To obtain this identifier and token, you must contact the [GeoPlatform Service Desk](mailto:servicedesk@geoplatform.gov) requesting your application be registered to access the identity provider and providing the following information:

##### Required Information
- Your full name and GeoPlatform user account
- A brief description of your application and how it will use the GeoPlatform
- The name of your application
- The base URL at which your application will be hosted

**NOTE:** If your application runs if different deployments, such as in a Systems Integration Testing (SIT) and Production environments, you can register your application for each environment as long as the deployed base URLs are different.


**Development Testing**
You should also register your application with a local development URL to enable testing authentication while your application is being built. Use the appropriate base URL and port information, such as `http://localhost:80` or `http://localhost:8080`, when registering your application’s development instance.


#### STEP 2: Configure your application

Once you have received the identity provider information from the service desk, you will need to provide the following environment variables to NodeJS in your application:

| Variable | Description |
|:---------|:------------|
| APP_SECRET | The secret token provided for your application by the service desk |
| APP_ID | The identifier for your application provided by the service desk |
| IDP_BASE_URL | The URL of the GeoPlatform identity provider service: `https://sit-accounts.geoplatform.us` |
| APP_BASE_URL | The host URL of your application as provided to the service desk when requesting the information above |

Additional optional parameters are detailed in the [GeoPlatform OAuth docs](https://sit.geoplatform.us/help/api/oauth2-documentation/)

**Be Careful!** Variable names are *case sensitive*.



##### Passing variables to NodeJS via command line
```
$> APP_ID=my_app_id APP_SECRET=my_app_secret APP_BASE_URL=https://my.app.url IDP_BASE_URL=https://accounts.geoplatform.gov node index.js
```

**NOTE:** It is recommended you leverage environment configuration support from libraries such as [dotenv](https://www.npmjs.com/package/dotenv) and similar in order to have more flexible configuration with validation


##### Handle Authentication Events
Inside the NodeJS server-side, define a service to monitor authentication events and handle tokens:

```javascript
const Logger = require('../logger');
const Config = require('../config'); // application's configuration settings (env vars)

module.exports = function(app) {

    const IDP = require('@geoplatform/oauth-node')(app, {
        APP_SECRET:        Config.APP_SECRET,
        APP_ID:            Config.APP_ID,
        IDP_BASE_URL:      Config.IDP_BASE_URL,
        APP_BASE_URL:      Config.APP_BASE_URL,
        AUTH_DEBUG:        Config.AUTH_DEBUG,
        REFRESH_DEBOUNCE:  Config.REFRESH_DEBOUNCE,
        PRE_REFRESH_BUFFER:Config.PRE_REFRESH_BUFFER
    });

    /**
     * userAuthenticated
     *
     * Add / link user with the IDP user when they have
     * authenticated.
     */
    IDP.on('userAuthenticated', user => {
        if(Config.AUTH_DEBUG) {
            Logger.debug("User Authenticated Event: " + (user?user.username:'null'));
        }
    });

    /**
     * Determine how to handle unauthorized requests in the application.
     */
    IDP.on('unauthorizedRequest', (err, req, res, next) => {
        // limit access to restricted resources (See documentation at https://github.com/GeoPlatform/node-gpoauth
        Logger.info("UnAuthorized Request: " + req.url);

        //if trying to hit a protected endpoint...
        if( req.originalUrl.match(/api\/(upload|parse|import).+/) || (
            //or if trying to do non-GET requests against endpoints other than URI,
            // Exists, or Service About, deny request for unauthorized users
            req.method.match(/POST|PUT|DELETE|PATCH/i) &amp;&amp;
            req.originalUrl.match(/api\/(?!(uri|exists|about)).+/)
        )) {
            Logger.info(`UnAuthorized Request denied:  [${req.method}] ${req.originalUrl}`);
            // reject API endpoint calls for unauthenticated users
            res.status(401).send({
                error: "Not Allowed",
                message: 'Request is not allowed because it was not authorized',
                status: 401
            })

        } else {
            next();
        }
    });

    /**
     * Custom middleware for futher limiting requests based upon user data
     */
    IDP.on('accessGranted', (req, res, next) => {
        if(Config.AUTH_DEBUG) {
          Logger.debug("Request Granted: " + req.url);
        }
        next();
    });

}
```

Configure the server-side portion of your app to use it:

```javascript
const express = require('express');
const app = express();
const appRouter = require('./routes/api');

//...http configuration goes here...

// enable authorization hooks
require('./auth-service.js')(app);

//define routes
app.use('/api', appRouter);

//... remaining app setup goes here...

module.exports = app;
```


### Server-side Proxy
It is recommended you create a NodeJS proxy for your API interaction to best handle token refresh events without disrupting the user. API Client provides factories for quickly creating proxies for most of the services it supports.
The following example demonstrates how to create a proxy for the `ItemService` class.

```javascript
const express = require('express');
const app     = express();
const router  = require('express').Router();

/* ... any app setup like ports, error handling, bodyparser, multer, etc ... */

const GPAPI = require('@geoplatform/client');
GPAPI.Config.configure({ /* ... any configuration items needed ... */ });

const GPProxies = require("@geoplatform/client/node");

//use ItemService proxy
const proxyOptions = { /* ...any proxy settings desired ... */ };
router.use( GPProxies.ItemServiceProxy( proxyOptions ));

app.use('/api', router);
```


### Inside the Application
Include GeoPlatform modules in your app as follows:

```javascript
angular.module('my-app-module', [

    //3rd party modules
    'ngResource', 'ngAnimate', 'ui.router', ... ,

    //GeoPlatform modules
    'gp-common',  //will get us authentication hooks plus much more!

    //local modules
    'my-app-sub-module1', ...
]);
```

You now have access to the `AuthenticationService` via injection.

```javascript
(function(angular) {
    'use strict';

    angular.module('my-app-sub-module1').component('MyComponent', {
        bindings: { ... },
        templateUrl: ...,
        controller: function(AuthenticationService) {
            let user = AuthenticationService.getUser();
        }
    });

})(angular);
```

You can also sub-class the `AuthenticatedComponent` class to make your AngularJS components authentication-aware and receive events notifying them when the user’s authenticated state changes

```javascript
(function(angular, AuthenticatedComponent) {
    'use strict';

    class MyComponent extends AuthenticatedComponent {

        constructor ($rootScope, AuthenticationService) {
            super($rootScope, AuthenticationService);
        }

        $onInit () {
            super.$onInit();
            this.state = { };
        }

        $onDestroy () {
            super.$onDestroy();
        }

        onAuthEvent (event, user) {
            super.onAuthEvent(event, user);
            console.log("User is now: " + user);

            this.state.isLoggedIn = this.isAuthenticated(); //is user authenticated?

            let item = {
                //define properties
            };
            this.state.canEdit = this.canUserEdit(item); //does user have permissions?

            this.state.isAuthor = this.isAuthorOf(item); //is user creator of item?
        }
    }

    angular.module('my-app-sub-module1').component('MyComponent', {
        bindings: { ... },
        templateUrl: ...,
        controller: MyComponent
    });

})(angular, GeoPlatform.AuthenticatedComponent);
```

### Configure API Client
For more details about API Client, please read the API Client [documentation](../../README.md).

**NOTE:** The example code below will utilize the `GeoPlatformClient` global variable, but if your application supports ES6 `import` or CommonJS `require` syntax you can use those (refer to the full API Client documentation for more info).

**NOTE:** It also uses the AngularJS `$http` service as the underlying HTTP mechanism (the `NGHttpClient` class), but both Axios (`XHRHttpClient`) and NodeJS (`NodeHttpClient`) implementations are available in appropriate environments. Angular (4+) implementations (`NG2HttpClient`) are also available.


```javascript
const MyAppEnvVars = {
    'ualUrl': 'api/items',  //&lt;-- using local proxy instead of API at 'https://ual.geoplatform.gov',
    'appId':  'my-custom-app',
    'env':    'development'
};

(function(angular, GeoPlatformClient, Environment) {
    'use strict';

    //configure environment variables needed by the api client (including URL to GeoPlatform API 'ualUrl')
    GeoPlatformClient.Config(Environment);

    angular.module('my-app-sub-module1').service('MyItemService', [
        '$http',
        'AuthenticationService', //&lt;-- assumes 'gp-common' is installed and configured as shown above

        function($http, AuthenticationService) {

            //passes the AngularJS $http service as an option parameter so the client may use it
            //this is required in order to support authentication as tokens will be automatically
            //injected onto HTTP requests using AngularJS http interceptors
            let client = new NGHttpClient({http: $http})
            client.setAuthToken(function() {
            //provides token via function so it can be re-evaluated each time in case the token is revoked
            let token = AuthenticationService.getJWTfromLocalStorage();
            return token;
            });

            let url = GeoPlatformClient.Config.ualUrl; //&lt;-- if not using server-side proxy
            //let url = ''; //&lt;-- if using server-side proxy

            let service = new ItemService( url , client );
            return service;

        }
    ]);

})(angular, geoplatform.client, MyAppEnvVars);
```

**NOTE:** If you are using a Proxy as described in the [Server-side Proxy](#server-side-proxy) section above, the client-side portion of your app should point to your proxy while the server-side proxy should point to the GeoPlatform API as shown above.



## Usage: Searching GeoPlatform Datasets
To enable searching, we’ll augment the `MyComponent` class above to use the new `MyItemService` class.

### AngularJS
```javascript
(function(angular, GeoPlatformClient) {
    'use strict';

    const Query = GeoPlatformClient.Query;
    const QueryParams = GeoPlatformClient.QueryParameters;
    const ItemTypes = GeoPlatformClient.ItemTypes;

    class MyComponent {

        //will inject 'gpItemService' from @geoplatform/client already configured
        // with angular's $http service
        constructor ( gpItemService ) {
            this.itemService = gpItemService;
        }

        $onInit () {

            let query = new Query().types(ItemTypes.DATASET);
            this.itemService.search(query)
            .then( response => {
                console.log(`${response.totalResults} matches found`);
                response.results.forEach( result => console.log(result.label) );
            })
            .catch( e => { console.log(e.message); });
        }

        $onDestroy () {
            this.itemService = null;
        }

    }

    angular.module('my-app-sub-module1').component('MyComponent', {
        bindings: { ... },
        templateUrl: '...',
        controller: MyComponent
    });
})(angular, geoplatform.client);
```


### Angular
```javascript
import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Config, Query, QueryParams, ItemTypes, ItemService } from '@geoplatform/client';
import { NG2HttpClient } from "@geoplatform/client/angular";

@Component({ ... })
class MyComponent implements OnInit, OnDestroy {

    private itemService : ItemService;

    constructor ( private http : HttpClient ) {
        this.itemService = new ItemService( Config.ualUrl, new NG2HttpClient(http) );
    }

    ngOnInit () {

        let query = new Query().types(ItemTypes.DATASET);
        this.itemService.search(query)
        .then( response => {
            console.log(`${response.totalResults} matches found`);
            response.results.forEach( result => console.log(result.label) );
        })
        .catch( e => { console.log(e.message); });
    }

    ngOnDestroy () {
        this.itemService = null;
    }


}

```


### Usage: Creating and Modifying Content
We can augment the `MyComponent` class to also create items.

**NOTE:** This functionality requires [enabling user authentication](#user-authentication)

```javascript

class MyComponent extends AuthenticatedComponent {
    constructor(...) { ... }

    ...

    onAuthEvent(event, user) {
        super.onAuthEvent(event, user);
        if(!this.data) this.data = {};
        this.data.user = user;  //store user info
    }

    createItem () {
        if(!this.data.user) {
          console.log("You are not logged in!");
          return;
        }
        let item = {
          type: ItemTypes.DATASET,
          title: "This is my new dataset",
          description: "This is a rich description of this new dataset",
          createdBy: this.data.user.username
        };

        this.itemService.save(item)
        .then( response => { console.log(`Dataset now has ID: ${response.id}`); })
        .catch( e => { console.log(e.message); });
    }
}

angular.module(...).component('MyComponent', { ... });

```
