// server.js

// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var multer         = require('multer');
var compress       = require('compression');
var cookieParser   = require('cookie-parser');
var extend         = require('util')._extend;
var pkg            = require('./package.json');
var Logger		   = require('./server/logger');
var config         = require('./server/config');



// set our port
app.set('port', config.port);

// DT-302: add HSTS headers to all requests
app.use(function(req, res, next){
    res.setHeader('Strict-Transport-Security',`max-age=31536000; includeSubDomains`)
    next();
});

//enable cookie handling from clients
app.use(cookieParser());

//enable gzip compression
app.use(compress());

// parse body params and attache them to req.body
app.use(bodyParser.json({ limit: '10mb' }));
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json', limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));


// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// multipart/form handling
app.use(multer({
    dest: './uploads/',
    fileSize: 2000000,              //limit file upload sizes to 2mb each (in bytes)
    onFileSizeLimit: function (file) {
      console.log('Uploaded file too large: ', file.originalname);
      fs.unlink('./' + file.path)   // delete the partially written file
    },
    files: 1                       //limit number of files uploaded at a time
}));




if('development' === config.env) {
    app.use(express.static(__dirname + '/src'));
}
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));


// routes ==================================================
require('./server/routes')(app); // configure our routes


// error handler, send stacktrace only during development
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars

    let e = {
        statusCode: err.status,
        message: err.message    //Object.assign doesn't copy Error.message
    };
    Object.assign(e, err);
    e.stack = config.env === 'development' ? err.stack : {}

    //default error type based upon status code if not provided
    if(!e.error)
        e.error = "Error";

    let code = err.status;
    if(!code || code >= 200 && code <= 204)  //if here, shouldn't be a "OK" response
        code = 500;

    Logger.error( '(' + code + ') ' + e.message);

    res.status(err.status || 500).json(e);
});


// start app ===============================================
app.listen(config.port);

// shoutout to the user
Logger.info('Running in on port ' + config.port);


// expose app
exports = module.exports = app;
