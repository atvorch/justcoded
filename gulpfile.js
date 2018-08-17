const gulp = require('gulp');  
const sass = require('gulp-sass'); 
const cleanCSS = require('gulp-clean-css');
const autiprefixer = require('gulp-autoprefixer');
const minifyjs = require('gulp-js-minify');  
const sourcemaps = require('gulp-sourcemaps'); 
const browserSync = require('browser-sync');
const gulpSequence = require('gulp-sequence');
const babel = require('gulp-babel');
const wait = require('gulp-wait');
const concat = require('gulp-concat');

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
		css: 'main.css',
		js: 'main.js',
		scss: 'src/scss/*/*.scss'
	}
};

//minify js
gulp.task('build:js', function () {  
	return gulp.src(path.src.js)
	// .pipe(sourcemaps.init())
	// .pipe(babel({presets: ['env']}))
	.pipe(concat('main.js'))
	// .pipe(minifyjs())
	// .pipe(sourcemaps.write())
	.pipe(gulp.dest(path.build.js));
});

//build sass
gulp.task('build:sass', function () {  
	return gulp.src(path.src.scss)
	.pipe(wait(1500))
	.pipe(sass())
	.pipe(autiprefixer())
	.pipe(sourcemaps.init())
    // .pipe(cleanCSS())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(path.build.scss));
});

//run browsersync
gulp.task('browser-sync', function() {  
    browserSync.init([path.watch.css, path.watch.img, path.watch.html, path.watch.js], {
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