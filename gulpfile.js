var gulp = require('gulp');  
var sass = require('gulp-sass'); 
var cleanCSS = require('gulp-clean-css');
var autiprefixer = require('gulp-autoprefixer');
var minifyjs = require('gulp-js-minify');  
var sourcemaps = require('gulp-sourcemaps'); 
var browserSync = require('browser-sync');
var gulpSequence = require('gulp-sequence');
var wait = require('gulp-wait');

const server = browserSync.create();

const path = {
    src: {
		images: 'src/assets/images/*.jpg',
		scss: 'src/scss/*.scss',
		js: 'src/js/*.js'
	},
	build: {
		scss: './',
		js: './'
	},
	watch: {
		html: 'index.html',
		css: 'src/css/*.css',
		scss: 'src/scss/*.scss',
		js: 'src/js/*.js',
	}
};

//minify js
gulp.task('build:js', function () {  
	return gulp.src(path.src.js)
	.pipe(sourcemaps.init())
	.pipe(minifyjs())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(path.build.js));
});

//build sass
gulp.task('build:sass', function () {  
	return gulp.src(path.src.scss)
	.pipe(wait(1500))
	.pipe(sass())
	.pipe(autiprefixer())
	.pipe(sourcemaps.init())
    .pipe(cleanCSS())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(path.build.scss));
});

//run browsersync
gulp.task('browser-sync', function() {  
    browserSync.init([path.watch.scss, path.watch.img, path.watch.html, path.watch.js], {
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('watch', function () {
	gulp.watch(path.watch.scss, ['build:sass']);
	gulp.watch(path.watch.js, ['build:js']);
});

gulp.task('build', gulpSequence('build:sass', 'build:js', 'browser-sync', 'watch'));