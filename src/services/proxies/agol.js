

import Q from 'q';
import NodeHttpClient from '../../http/node';
import AgolService from "../item";
import Config from '../../shared/config';

/**
 *
 */
function bindRoutes(router, options) {

    let paths = options.paths || {};

    if(paths.searchItems !== false) {
        router.get('/' + (paths.searchItems||"agol/items"), (req, res, next) => {
            getService(req, false, options)
            .searchItems(req.query)
            .then( response => res.json(response) )
            .catch(next);
        });
    }

    if(paths.searchGroups !== false) {
        router.get('/' + (paths.searchGroups||"agol/groups"), (req, res, next) => {
            getService(req, false, options)
            .searchGroups(req.query)
            .then( response => res.json(response) )
            .catch(next);
        });
    }

    if(paths.searchOrgs !== false) {
        router.get('/' + (paths.searchOrgs||"agol/orgs"), (req, res, next) => {
            getService(req, false, options)
            .searchOrgs(req.query)
            .then( response => res.json(response) )
            .catch(next);
        });
    }

    if(paths.getItem !== false) {
        router.get('/' + (paths.getItem||"agol/items/:id"), (req, res, next) => {
            getService(req, false, options)
            .getItem(req.params.id)
            .then( item => res.json(item) )
            .catch(next);
        });
    }

    if(paths.getGroup !== false) {
        router.get('/' + (paths.getGroup||"agol/groups/:id"), (req, res, next) => {
            getService(req, false, options)
            .getGroup(input)
            .then( item => res.json(item) )
            .catch(next);
        });
    }

    if(paths.getOrg !== false) {
        router.get('/' + (paths.getOrg||"agol/orgs/:id"), (req, res, next) => {
            getService(req, false, options)
            .getOrg(req.params.id)
            .then( item => res.status(204).end() )
            .catch(next);
        });
    }

}

/**
* @param {Request} req - HttpRequest
* @param {boolean} needsAuth - flag indicating if the request must provide an authentication token
* @return {HttpClient} client to use to make requests to GeoPlatform API endpoint
*/
function getClient(req, needsAuth, options) {

    let token = req.accessToken || null;
    if(needsAuth) {
        if(!token && options.logger)
            options.logger.warn("AgolServiceProxy.getClient() - No Access Token was provided on incoming request header!");

        else if(!!options.debug && options.logger) {
            options.logger.debug(`AgolServiceProxy.getClient() - Token: ${token}`);
            options.logger.debug(`AgolServiceProxy.getClient() - JWT: ${req.jwt}`);
        }
    }

    return new NodeHttpClient({
        timeout: Config.timeout,
        token: needsAuth ? token : null
    });
}

/**
 *
 */
function getService(req, needsAuth, options) {
    let client = getClient(req, needsAuth, options);
    let service = new AgolService(Config.ualUrl, client);
    if(options.logger) {
        service.setLogger(options.logger);
    }
    return service;
}


/**
 *
 * Example:
 *
 *   const Logger = require('./logger');
 *
 *   //define GP API Client config options before creating proxy
 *   const Config = require('geoplatform.client');
 *   Config.configure( {
 *     timeout: 20000,
 *     ualUrl: 'https://ual.geoplatform.gov'
 *   });
 *
 *   //optionally, define parent router
 *   router = require('express').Router();
 *   router.use('/api', AgolServiceProxy({
 *     logger: Logger,
 *     debug: true,
 *     //optionally, provide router instance
 *     router: require('express').Router()
 *   }));
 *
 */
function AgolServiceProxy( options ) {

    if(typeof(options) === 'undefined') {
        options = {};
    };

    let router = options.router;
    if(!options.router) {
        let express = require('express');
        if(!express) {
            throw new Error("AgolServiceProxy() - Must provide" +
                "'options.router' or include express as a dependency");
        }
        router = express.Router();
    }

    if(!router) throw new Error("AgolServiceProxy() - " +
        "Unable to create proxy route, missing router");

    bindRoutes(router, options);

    return router;
}

export default AgolServiceProxy;
