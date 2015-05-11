/* global require */
/* jshint strict: false */

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var stylus = require('gulp-stylus');
var base64 = require('gulp-base64');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var livereload = require('gulp-livereload');
var del = require('del');

var paths = {
	stylus: ['src/**/*.styl', '!src/stylus-libs/*'],
	css: [
		'bower_components/normalize.css/normalize.css',
		'src/main/main.styl.css',
		'src/fonts/fonts.styl.css',
		'src/intro/intro.styl.css',
		'src/layout/layout.styl.css'
		//'src/**/*.css'
	],
	scripts: [
		'src/**/*.js'
	],
	images: [
		'src/**/*.jpg',
		'src/**/*.png',
		'src/**/*.svg'
	]
};

gulp.task('clean', function (cb) {
	del(['build'], cb);
});

gulp.task('stylus', function () {
	return gulp.src(paths.stylus)
		.pipe(stylus({
			// stylus accord does not support urlfunc
			// urlfunc: 'embedurl',
			paths: ['src/stylus-libs'],
			import: [
				'variables'
			]
		}))
		.pipe(rename(function (path) {
			path.extname = '.styl.css';
		}))
		.pipe(gulp.dest('src'));
});

gulp.task('css', ['clean'], function () {
	return gulp.src(paths.css)
		.pipe(base64({
			baseDir: 'src',
			extensions: ['woff'],
			maxImageSize: 64 * 1024
		}))
		.pipe(base64({
			baseDir: 'src',
			extensions: ['png'],
			maxImageSize: 8 * 1024
		}))
		.pipe(autoprefixer({
			cascade: false
		}))
		//.pipe(csso())
		.pipe(concat('all.min.css'))
		.pipe(gulp.dest('build'))
		.pipe(livereload());
});

gulp.task('scripts', ['clean'], function () {
	return gulp.src(paths.scripts)
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(concat('all.min.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('build'))
		.pipe(livereload());
});

gulp.task('images', ['clean'], function () {
	return gulp.src(paths.images)
		.pipe(imagemin({optimizationLevel: 5}))
		.pipe(gulp.dest('build'))
		.pipe(livereload());
});

gulp.task('watch', function () {
	livereload.listen();
	gulp.watch(paths.stylus, ['stylus', 'css']);
	gulp.watch(paths.scripts, ['scripts']);
	gulp.watch(paths.images, ['images']);
});

gulp.task('default', ['stylus', 'css', 'scripts', 'images']);