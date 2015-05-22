var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    jshint = require('gulp-jshint'),
    reactify = require('reactify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    paths = {
        scripts: 'app/**/*.{js,jsx}',
        styles: 'assets/styles/**/*.sass',
        jshint: [
            'gulpfile.js', 'app/**/*.{jsx,js}'
        ]
    };

gulp.task('js', function() {
    gulp.src('./app/index.jsx')
        .pipe(browserify({
            debug: true,
            transform: ['reactify'],
            extensions: ['.js', '.jsx']
        }))
        .on('error', function (error) {
            console.log(error.toString());
            this.emit('end');
        })
        .pipe(rename('reader.min.js'))
        .pipe(gulp.dest('./assets/build'));
});

gulp.task('css', function () {
    gulp.src(paths.styles)
        .pipe(sourcemaps.init())
        .pipe(sass({
            indentedSyntax: true
        }))
        .on('error', function (error) {
            console.log(error.toString());
            this.emit('end');
        })
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./assets/build'));
});

gulp.task('jshint', function () {
    gulp.src(paths.test)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['js']);
    gulp.watch(paths.styles, ['css']);
});

gulp.task('default', ['js', 'css', 'jshint']);