
var pkg         = require('./package.json'),
    gulp        = require('gulp'),
    jshint      = require('gulp-jshint'),
    concat      = require('gulp-concat'),
    babel       = require('gulp-babel'),
    ngAnnotate  = require('gulp-ng-annotate'),
    ngTemplates = require('gulp-ng-templates'),
    uglify      = require('gulp-uglify'),
    rename      = require('gulp-rename'),
    // notify      = require('gulp-notify')
    srcmaps     = require('gulp-sourcemaps'),
    less        = require('gulp-less'),
    autoprefixer= require('less-plugin-autoprefix')
    cssmin      = require('gulp-cssmin'),
    livereload  = require('gulp-livereload');

//~0.3.1

const autoprefix = new autoprefixer({
    browsers: [
        "iOS >= 7",
        "Chrome >= 30",
        "Explorer >= 11",
        "last 2 Edge versions",
        "Firefox >= 20",
        "Safari >= 9"
    ]
});



require('gulp-help')(gulp, { description: 'Help listing.' });


gulp.task('jshint', function () {
    gulp.src(['src/**/*.js'])
        .pipe(jshint({
            // laxbreak: true,
            // laxcomma: true,
            esversion: 6, //JSHint Harmony/ES6
            // eqnull: true,
            browser: true,
            jquery: true
        }))
        .pipe(jshint.reporter('default'))
        .pipe(livereload());
});


gulp.task('assets', function() {

    //copy image assets
    // gulp.src(['src/img/*.*']).pipe(gulp.dest('public/img/'));

    //copy fontawesome font files
    gulp.src(['node_modules/@fortawesome/fontawesome-free/webfonts/*.*']).pipe( gulp.dest('public/webfonts/') );

    //copy gp icons font files
    gulp.src(['node_modules/@geoplatform/style/src/font/*.*']).pipe(gulp.dest('public/font/'));

});



gulp.task('html', function () {
    gulp.src(['src/**/*.html'])
        .pipe(ngTemplates({
            filename: 'templates.js',
            module: 'my-app',
            standalone: false,
            path: function (path, base) {
                return 'modules/' + path.replace(base,'');
            }
        }))
        .pipe(gulp.dest('public/js'))
        // .pipe(notify('Compiled Angular Templates'));
});



gulp.task('js', 'Concat, Ng-Annotate, Uglify JavaScript into a single file', function() {

    //build dependency JS file
    gulp.src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/bootstrap/dist/js/bootstrap.js',
        'node_modules/q/q.js',

        'node_modules/angular/angular.js',
        'node_modules/@uirouter/angularjs/release/angular-ui-router.min.js',
        "node_modules/angular-resource/angular-resource.js",
        "node_modules/angular-sanitize/angular-sanitize.js",
        "node_modules/angular-animate/angular-animate.js",

        'node_modules/es5-shim/es5-shim.min.js',
        'node_modules/es5-shim/es5-sham.min.js',

        'node_modules/@geoplatform/client/dist/bundles/geoplatform-client.umd.js',
        'node_modules/@geoplatform/client/dist/bundles/geoplatform-client-angularjs.umd.js',
        "node_modules/@geoplatform/style/dist/js/geoplatform.style.min.js",
        "node_modules/@geoplatform/common/dist/geoplatform.common.min.js",

        ])
        .pipe(concat('dependencies.js'))
        .pipe(gulp.dest('public/js/'))
        // .pipe(notify('Compiled Dependencies JavaScript'));


    gulp.src([ '!src/**/*.spec.js', 'src/app.js' ])
        .pipe(srcmaps.init())
        .pipe(concat(pkg.name + '.js'))
        .pipe(gulp.dest('public/js/'))
        .pipe(babel({ presets: ["es2015"], compact: true }))
        .pipe(ngAnnotate())
        // .on('error', notify.onError("Error: <%= error.message %>"))
        .pipe(uglify())
        // .on('error', notify.onError("Error: <%= error.message %>"))
        .pipe(rename({extname: ".min.js"}))
        .pipe(srcmaps.write('./'))
        .pipe(gulp.dest('public/js/'))
        // .pipe(notify('Compiled JavaScript'));
});

gulp.task('less', 'Compile less into a single file.', function() {
    gulp.src(
        [
            "node_modules/bootstrap/dist/css/bootstrap.css",
            "node_modules/@fortawesome/fontawesome-free/css/all.css",
            "node_modules/@geoplatform/common/src/icons/fontawesome.css",
            "node_modules/@geoplatform/style/src/icons/geoplatform-icons-font.css",
            'src/app.less',
            'src/**/*.less'
        ])
        .pipe(concat('style.less'))
        //must write to public before processing for paths to work
        .pipe(gulp.dest('public/css/'))
        .pipe(less({plugins: [autoprefix]}))
        // .on("error", notify.onError({message: 'LESS compile error: <%= error.message %>'}))
        .pipe(gulp.dest('public/css/'))
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('public/css/'))
        // .pipe(notify('Compiled styles'))
        .pipe(livereload());
});


gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('src/**/*.less', ['less']);
    gulp.watch('src/**/*.js', ['jshint']);
});



gulp.task('default', ['js', 'html', 'less', 'assets']);

gulp.task('dev', ['default', 'watch']);
