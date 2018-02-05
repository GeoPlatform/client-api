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
    gulp.src(['src/js/**/*.js'])
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
        'src/services/base.js',
        'src/services/jq/item.js',
        'src/services/jq/map.js',
        'src/services/jq/layer.js',
        'src/services/jq/service.js',
        'src/services/jq/factory.js'
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
        gulp.src([
            'src/services/ng/item.js',
            'src/services/ng/map.js',
            'src/services/ng/layer.js',
            'src/services/ng/service.js',
            'src/services/ng/factory.js'
            ])
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
