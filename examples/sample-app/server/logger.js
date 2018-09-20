

const fs = require('fs');
const winston = require('winston');

const Config = require('./config');



const formatterFn = function(options) {
    // Return string will be passed to logger.
    return  options.timestamp() + ' [' + 
            options.level.toUpperCase() + '] ' + 
            (options.message ? options.message : '') +
            (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
}

const timestampFn = function() { 
    return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') 
};


var transports = [];
if(Config.env === 'development') {
    transports.push(
        new (winston.transports.Console)({
            json: false,
            colorize: true,
            formatter: formatterFn,
            timestamp: timestampFn
        })
    );

} else {

    fs.exists(Config.logFile, (exists) => {
        if(!exists) { 
            //create new log file
            try{
                let data = 'Created log file';
                fs.writeFile(Config.logFile, data, 'utf8', (err) => { if(err) console.log(err) }); 
            } catch(e) {
                console.log(e);
            }           
        }
    }); 


    transports.push(
        new (winston.transports.File)({ 
            filename: Config.logFile,
            maxsize:  1000000,
            maxFiles: 3,
            json: false,
            formatter: formatterFn,
            timestamp: timestampFn
        })
    );
}


const logger = new (winston.Logger)({
    level: process.env.LOG_LEVEL || "debug",
    transports: transports,
    exitOnError: false  //don't exit winston on uncaught exception
});

module.exports = logger;