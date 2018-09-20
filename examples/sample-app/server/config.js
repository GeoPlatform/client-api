
const VERSION = require('../package.json').version;

const Joi = require('joi');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({

    NODE_ENV: Joi.string()
        .allow(['development', 'production', 'test', 'provision'])
        .default('development'),

    PORT: Joi.number()
        .default(8081),

    /*************** Auth Settings *****************/
    APP_ID: Joi.string().required()
    .description("Application ID registered with gpoauth (oauth2 provider)"),

    APP_SECRET: Joi.string().required()
        .description('oauth Application Secret required for authentication'),

    IDP_BASE_URL: Joi.string().required()
        .description("URL to IDP service"),

    APP_BASE_URL: Joi.string().required()
        .description("URL to host service (this service)"),

    AUTH_DEBUG: Joi.boolean()
        .description("Show debug for node-gpoauth")
        .default(false),

    FORCE_LOGIN: Joi.boolean()
        .description("Force login on page angular page load")
        .default(false),

    ALLOWIFRAMELOGIN: Joi.boolean()
        .description("Allow user to authenticate in an iframe")
        .default(true),
    /***********************************************/

    UAL_URL: Joi.string().required()
        .description("URL to GeoPlatform Unified Access Layer")
        .default("https://ual.geoplatform.gov"),

    TIMEOUT: Joi.number()
        .default(5000),

    LOG_FILE: Joi.string()
        .description("Path to log file for the application")
        .default("./app.log"),

    LOG_LEVEL: Joi.string()
        .description("Logging level")
        .allow(['info', 'warn', 'error', 'debug'])
        .default('error')

}).unknown()
  .required();


const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}


const config = {
    env:            envVars.NODE_ENV,
    port:           envVars.PORT,
    serverAuthSettings: {
        APP_SECRET:     envVars.APP_SECRET,
        APP_ID:         envVars.APP_ID,
        IDP_BASE_URL:   envVars.IDP_BASE_URL,
        APP_BASE_URL:   envVars.APP_BASE_URL,
        AUTH_DEBUG:     envVars.AUTH_DEBUG
    },
    // Front end Auth settings
    IDP_BASE_URL:     envVars.IDP_BASE_URL,
    AUTH_TYPE:        'grant',
    ALLOWIFRAMELOGIN: envVars.ALLOWIFRAMELOGIN,
    FORCE_LOGIN:      envVars.FORCE_LOGIN,
    IDP_BASE_URL:     envVars.IDP_BASE_URL,
    // other settings
    ualUrl:         envVars.UAL_URL,
    timeout:        envVars.TIMEOUT,
    logFile:        envVars.LOG_FILE,
    logLevel:       envVars.LOG_LEVEL,
    version:        VERSION,
    appId:          'my-custom-app'
};

module.exports = config;
