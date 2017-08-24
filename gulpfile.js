const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const watchify = require('watchify');
const sass = require('gulp-sass');

gulp.task('sass', function(){
    return gulp.src('src/stylesheets/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('static'))
});

gulp.task('watch', function() {

    gulp.watch('src/stylesheets/style.scss', ['sass']);

    process.env.NODE_ENV = 'production';

    let b = browserify({
        entries: ['src/app.js'],
        cache: {}, packageCache: {},
        plugin: ['watchify']
    });

    b.on('update', makeBundle)

    function makeBundle() { 
        b.transform('babelify', { presets: 'react' })
        .bundle()
        .on('error', (err) => {
            console.error(err.message);
            console.error(err.codeFrame);
        }) 
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('static/'));
    }
    makeBundle();
    return b;
});