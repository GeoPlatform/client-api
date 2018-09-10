

import Q from 'q';
import NodeHttpClient from '../../http/node';
import Config from '../../shared/config';
import ItemService from "../item";

const ServiceProxy = {

    bindRoutes: function(router, options) {

        options = options || {};
        let paths = options.paths || {};

        if(paths.search !== false) {
            router.get('/' + (paths.search||options.pathBaseDefault), (req, res, next) => {
                this.getService(req, false, options)
                .search(req.query)
                .then( response => res.json(response) )
                .catch(next);
            });
        }

        if(paths.getById !== false) {
            router.get('/' + (paths.getById||options.pathBaseDefault+"/:id"), (req, res, next) => {
                this.getService(req, false, options)
                .get(req.params.id)
                .then( item => res.json(item) )
                .catch(next);
            });
        }

        if(paths.create !== false) {
            router.post('/' + (paths.create||options.pathBaseDefault+''), (req, res, next) => {
                var input = req.body;
                this.getService(req, true, options)
                .save(input)
                .then( item => res.json(item) )
                .catch(next);
            });
        }

        if(paths.delete !== false) {
            router.delete('/' + (paths.delete||options.pathBaseDefault+'/:id'), (req, res, next) => {
                this.getService(req, true, options)
                .remove(req.params.id)
                .then( item => res.status(204).end() )
                .catch(next);
            });
        }

        if(paths.update !== false) {
            router.put('/' + (paths.update||options.pathBaseDefault+'/:id'), (req, res, next) => {
                var id = req.params.id;
                var obj = req.body;
                this.getService(req, true, options)
                .save(obj)
                .then( item => res.json(item) )
                .catch(next);
            });
        }

        if(paths.patch !== false) {
            router.patch('/' + (paths.patch||options.pathBaseDefault+'/:id'), (req, res, next) => {
                var id = req.params.id;
                var obj = req.body;
                this.getService(req, true, options)
                .patch(id, obj)
                .then( item => res.json(item) )
                .catch(next);
            });
        }

        if(paths.export !== false) {
            router.get('/' + (paths.export||options.pathBaseDefault+'/:id'), (req, res, next) => {
                var id = req.params.id;
                var format = req.query.format;

                this.getService(req, false, options)
                .export(id, format)
                .then( response => {
                    let mimeType = response.headers['content-type'];
                    let disposition = response.headers['content-disposition'];
                    res.set("Content-Type", mimeType);
                    res.setHeader('Content-disposition', disposition);
                    res.send(response.body);
                })
                .catch(next);
            });
        }

    },

    /**
    * @param {Request} req - HttpRequest
    * @param {boolean} needsAuth - flag indicating if the request must provide an authentication token
    * @return {HttpClient} client to use to make requests to GeoPlatform API endpoint
    */
    getClient: function(req, needsAuth, options) {

        let token = req.accessToken || null;
        if(needsAuth) {
            if(!token && options.logger)
                options.logger.warn("ServiceProxy.getClient() - No Access Token was provided on incoming request header!");

            else if(!!options.debug && options.logger) {
                options.logger.debug(`ServiceProxy.getClient() - Token: ${token}`);
                options.logger.debug(`ServiceProxy.getClient() - JWT: ${req.jwt}`);
            }
        }

        return new NodeHttpClient({
            timeout: Config.timeout,
            token: needsAuth ? token : null
        });
    },


    /**
     *
     */
    getService: function(req, needsAuth, options) {
        let client = this.getClient(req, needsAuth, options);
        let svcClass = options.serviceClass || ItemService;
        let service = new svcClass(Config.ualUrl, client);
        if(options.logger) {
            service.setLogger(options.logger);
        }
        return service;
    }
};

export default ServiceProxy;
