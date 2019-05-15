var pkg   = require('./package.json'),
    gulp  = require('gulp'),
    gap   = require('gulp-append-prepend');


gulp.task('license', function() {

    gulp.src('dist/bundles/geoplatform-client.umd.js')
        .pipe( gap.prependFile('LICENSE.txt') )
        .pipe(gulp.dest('dist/bundles'));
    gulp.src('dist/bundles/geoplatform-client.umd.min.js')
        .pipe( gap.prependFile('LICENSE.txt') )
        .pipe(gulp.dest('dist/bundles'));
    gulp.src('dist/bundles/geoplatform-client-angularjs.umd.js')
        .pipe( gap.prependFile('LICENSE.txt') )
        .pipe(gulp.dest('dist/bundles'));
    gulp.src('dist/bundles/geoplatform-client-angularjs.umd.min.js')
        .pipe( gap.prependFile('LICENSE.txt') )
        .pipe(gulp.dest('dist/bundles'));
    gulp.src('dist/bundles/geoplatform-client-angular.umd.js')
        .pipe( gap.prependFile('LICENSE.txt') )
        .pipe(gulp.dest('dist/bundles'));
    gulp.src('dist/bundles/geoplatform-client-angular.umd.min.js')
        .pipe( gap.prependFile('LICENSE.txt') )
        .pipe(gulp.dest('dist/bundles'));
    gulp.src('dist/bundles/geoplatform-client-node.umd.js')
        .pipe( gap.prependFile('LICENSE.txt') )
        .pipe(gulp.dest('dist/bundles'));
    gulp.src('dist/bundles/geoplatform-client-node.umd.min.js')
        .pipe( gap.prependFile('LICENSE.txt') )
        .pipe(gulp.dest('dist/bundles'));
});


gulp.task('default', ['license']);
