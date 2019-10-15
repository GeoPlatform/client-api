const bodyParser       = require('body-parser');
const multer           = require('multer');
const router           = require('express').Router();
const Config           = require('./config');
const Logger           = require('./logger');


module.exports = function(app) {

    // for parsing application/json
    app.use(bodyParser.json());
    // for parsing application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));
    // for parsing multipart/form-data
    app.use(multer());


    // Setup node-gpoauth (authentication)
    require('./authorizer.js')(app)


    // api/config endpoint
    router.get('/config.js', function (req, res, next) {

        res.set("Content-Type", "application/js");

        var str = "GeoPlatform = {";
        str += Object.keys(Config).map( key => '"' + key + '" : "' + Config[key] + '",').join(' ');
        str += 'timestamp: ' + new Date().getTime();
        str += "};";

        res.send(str);
    });



    const GPAPI = require('@geoplatform/client');
    GPAPI.Config.configure({ appId: Config.appId });

    const GPProxies = require('@geoplatform/client/node');

    //api/items endpoints
    router.use( GPProxies.ItemServiceProxy({ logger: Logger }));

    app.use('/api', router);


    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('/*', function(req, res) {
        let path = '.' + ('development' === Config.env ? '/src' : '/public');
        res.sendfile(path + '/index.html');
    });

};
