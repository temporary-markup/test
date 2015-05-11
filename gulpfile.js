var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var rename = require("gulp-rename");
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');

var paths = {
	stylus: [
		'src/**/*.styl'
	],
	css: [
		'src/**/*.css'
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

gulp.task('stylus', [], function () {
	return gulp.src(paths.stylus)
		.pipe(stylus())
		.pipe(rename(function (path) {
			path.extname = ".css"
		}))
		.pipe(gulp.dest('src'));
});

gulp.task('css', ['clean'], function () {
	return gulp.src(paths.css)
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(csso())
		.pipe(concat('all.min.css'))
		.pipe(gulp.dest('build'));
});


gulp.task('scripts', ['clean'], function () {
	return gulp.src(paths.scripts)
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(concat('all.min.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('build'));
});

gulp.task('images', ['clean'], function () {
	return gulp.src(paths.images)
		.pipe(imagemin({optimizationLevel: 5}))
		.pipe(gulp.dest('build'));
});

gulp.task('watch', function () {
	gulp.watch(paths.stylus, ['stylus', 'css']);
	gulp.watch(paths.scripts, ['scripts']);
	gulp.watch(paths.images, ['images']);
});

gulp.task('default', ['watch', 'scripts', 'images']);