var pkg         = require('./package.json'),
    gulp        = require('gulp'),
    jshint      = require('gulp-jshint'),
    concat      = require('gulp-concat'),
    babel       = require('gulp-babel'),
    uglify      = require('gulp-uglify'),
    rename      = require('gulp-rename'),
    notify      = require('gulp-notify')
    srcmaps     = require('gulp-sourcemaps');

require('gulp-help')(gulp, { description: 'Help listing.' });

gulp.task('jshint', function () {
    gulp.src(['src/**/*.js', 'examples/**/*.js'])
        .pipe(jshint({
            // laxbreak: true,
            // laxcomma: true,
            esversion: 6, //JSHint Harmony/ES6
            // eqnull: true,
            browser: true,
            jquery: true
        }))
        .pipe(jshint.reporter('default'))
        // .pipe(livereload());
});


gulp.task('js', 'Concat, Uglify JavaScript into a single file', function() {

    //include module first, then other src files which depend on module
    gulp.src([
        'src/shared/types.js',
        'src/shared/parameters.js',
        'src/shared/query.js',
        'src/shared/query-factory.js',
        'src/shared/classifiers.js',
        'src/shared/kg-query.js',

        'src/http/jq.js',
        'src/services/item.js',
        'src/services/layer.js',
        'src/services/service.js',
        'src/services/gallery.js',
        'src/services/map.js',
        'src/services/dataset.js',
        'src/services/utils.js',
        'src/services/kg.js',
        'src/services/factory.js'

        ])
        // .pipe(srcmaps.init())
        .pipe(concat(pkg.name + '.js'))
        .pipe(babel({presets: ["es2015"]}))
        .pipe(gulp.dest('dist/js'))
        .pipe(uglify()).on('error', notify.onError("Error: <%= error.message %>"))
        .pipe(rename({extname: ".min.js"}))
        // .pipe(srcmaps.write('./'))
        .pipe(gulp.dest('dist/js'))
        .pipe(notify('Uglified JavaScript'));



        //include module first, then other src files which depend on module
        gulp.src([ 'src/http/ng.js' ])
            // .pipe(srcmaps.init())
            .pipe(concat(pkg.name + '.ng.js'))
            .pipe(babel({presets: ["es2015"]}))
            .pipe(gulp.dest('dist/js'))
            .pipe(uglify()).on('error', notify.onError("Error: <%= error.message %>"))
            .pipe(rename({extname: ".min.js"}))
            // .pipe(srcmaps.write('./'))
            .pipe(gulp.dest('dist/js'))
            .pipe(notify('Uglified JavaScript'));
});


gulp.task('default', ['jshint', 'js']);
