const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const watchify = require('watchify');
const sass = require('gulp-sass');
const envify = require('envify/custom');

gulp.task('sass', function(){
    return gulp.src('src/stylesheets/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('static'))
});

gulp.task('watch', function() {

    gulp.watch('src/stylesheets/style.scss', ['sass']);

    let b = browserify({
        entries: ['src/app.js'],
        cache: {}, packageCache: {},
        plugin: ['watchify']
    });

    b.on('update', makeBundle)

    function makeBundle() { 
        
        b.transform('babelify', { presets: 'react' })
        .bundle()
        b.transform()
        .on('error', (err) => {
            console.error(err.message);
            console.error(err.codeFrame);
        }) 
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist/'));
    }
    makeBundle();
    return b;
});

gulp.task('build', () => {
    browserify({
        entries: ['src/app.js'],
        cache: {}, packageCache: {},
    })
    .transform('babelify', { presets: 'react' })
    .transform(envify({
        NODE_ENV: 'production'
    }))
    .bundle()
    .on('error', (err) => {
            console.error(err.message);
            console.error(err.codeFrame);
        })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist/')); 
});