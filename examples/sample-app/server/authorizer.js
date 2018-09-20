const config          = require('./config');

module.exports = function(app){
    const IDP = require('node-gpoauth')(app, config.serverAuthSettings);

    /**
     * userAuthenticated
     *
     * Add / link user with the IDP user when they have
     * authenticated.
     */
    IDP.on('userAuthenticated', user => {
        // TODO: implement user tie-up here
    });

    /**
     * unauthorizedRequest
     *
     * Determin how to handle unauthorized requests in the application.
     */
    IDP.on('unauthorizedRequest', (err, req, res, next) => {
        // TODO: limit access to restricted resources (See documentation at https://github.com/GeoPlatform/node-gpoauth
        next();
    });

    /**
     * Custom middleware for futher limiting requests based upon user data
     */
    IDP.on('accessGranted', (req, res, next) => {
        next();
    });

};
