var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var sass = require('gulp-sass');

// gulp.task('bundle', function() {
//     return browserify('src/app.js')
//         .transform('babelify', {presets: 'react'})
//         .bundle()
//         .pipe(source('bundle.js'))
//         .pipe(gulp.dest('static/'));
// });

gulp.task('sass', function(){
    return gulp.src('src/stylesheets/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('static'))
});

gulp.task('watch', function() {

    gulp.watch('src/stylesheets/style.scss', ['sass']);

    var b = browserify({
        entries: ['src/app.js'],
        cache: {}, packageCache: {},
        plugin: ['watchify']
    });

    b.on('update', makeBundle);

    function makeBundle() {
        b.transform('babelify', { presets: 'react' })
        .bundle()
        .on('error', function(err) {
            console.error(err.message);
            console.error(err.codeFrame);
        })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('static/'));
    }
    makeBundle();
    return b;
});