const   { src, dest, pipe, watch, task, series } = require('gulp');

var pkg   = require('./package.json'),
    gap   = require('gulp-append-prepend');


function doTask( file, done ) {
    return src([file])
    .pipe( gap.prependFile('LICENSE.txt') )
    .pipe( dest('dist/bundles') );
}

function clientTask() { return doTask('dist/bundles/geoplatform-client.umd.js'); }
function clientMinTask() { return doTask('dist/bundles/geoplatform-client.umd.min.js'); }
function ng2Task() { return doTask('dist/bundles/geoplatform-client-angularjs.umd.js'); }
function ng2MinTask() { return doTask('dist/bundles/geoplatform-client-angularjs.umd.min.js'); }
function ngTask() { return doTask('dist/bundles/geoplatform-client-angular.umd.js'); }
function ngMinTask() { return doTask('dist/bundles/geoplatform-client-angular.umd.min.js'); }
function nodeTask() { return doTask('dist/bundles/geoplatform-client-node.umd.js'); }
function nodeMinTask() { return doTask('dist/bundles/geoplatform-client-node.umd.min.js') }

exports.license = exports.default = series(
    clientTask, clientMinTask,
    ng2Task, ng2MinTask,
    ngTask, ngMinTask,
    nodeTask, nodeMinTask
);
