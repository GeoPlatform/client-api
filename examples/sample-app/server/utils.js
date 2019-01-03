
var Q = require('q');
const Logger = require('./logger');


/**
 * @param {string|number} code status code (number) or nodejs error code (string)
 * @return {string} error title
 */
function getErrorTitle(code) {
    if(400 === code) return "Bad Request";
    if(401 === code) return "Unauthorized";
    if(403 === code) return "Not allowed";
    if("ECONNRESET" === code) return "Connection Reset";
    return "Internal Server Error";
}

/**
 * @param {string|number} code status code (number) or nodejs error code (string)
 * @return {string} error message (body)
 */
function getErrorMessage(code) {
    if("ECONNRESET" === code)
        return "Unable to establish a connection to the registry";
    return 'An error occurred: ' + code;
}


module.exports = {

    /**
     * @param {Error} error - possible error from remote call
     * @param {Response} response - remote call response object
     * @return {Promise} resolving error or empty if no error
     */
    checkForResponseError: function (error, response) {

        let props = {
            message: null,
            error: "Server Error",    //error type
            status: 200
        };

        if(error) {
            // console.log("Error generated by request library: " + error.code);

            if(error.code === 'ETIMEDOUT' || error.code === 'ESOCKETTIMEDOUT') {

                props.status = 500;
                props.error = "Connection Timeout";
                props.message = "The response from the service took too long to read";

                if(error.connect === true) {
                    props.message = "Unable to establish a connection to the service";
                }

            } else {
                return Q.reject(error);
            }

        } else if(response.statusCode < 200 || response.statusCode > 204) {


            // Logger.debug('Error returned by remote endpoint (' + response.statusCode + ')');
            // Logger.debug(JSON.stringify(response));

            props.status = response.statusCode;

            if(response.body && typeof(response.body) === 'string') {
                try {
                    let json = JSON.parse(response.body);
                    // Logger.debug("Parsed JSON response");
                    // Logger.debug(JSON.stringify(json));

                    props.error = json.error;
                    props.message = json.message;
                    if(json.statusCode)
                        props.status = json.statusCode;

                } catch (e) {
                    props.error = "Server Error";
                    props.message = "An error occurred communicating with service";
                }

            } else if(response.body && typeof(response.body) === 'object') {
                props = response.body;
            }




            // console.log('Error returned by remote endpoint (' + response.statusCode + ')');
            // console.log(JSON.stringify(response));

            props.status = response.statusCode;

            if(response.body) {

                if(typeof(response.body) === 'string') {
                    try {
                        props = JSON.parse(response.body);
                    } catch(e) {

                    }
                } else if(response.body && typeof(response.body) === 'object') {
                    props = response.body;
                }

            }

        }

        if( props.status < 200 || props.status > 204 ) {

            props.error = props.error || "Server Error";
            props.status = props.status || response.statusCode;
            props.message = props.message || "An error occurred communicating with service";

            let err = new Error(props.message);
            this.copy(props, err);

            // console.log("UTILS: " + err);
            // console.log("UTILS: " + JSON.stringify(err));
            return Q.reject(err);
        }

        return Q.resolve();
    }
}