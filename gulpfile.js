var gulp = require('gulp'),
		htmlmin = require('gulp-html-minifier'),
		minifyCss = require('gulp-minify-css'),
		sass = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		browserSync = require('browser-sync').create(),
		uglify = require('gulp-uglify'),
		pump = require('pump'),
		reload = browserSync.reload,
		gulpConcat = require('gulp-concat'),
		pug = require('gulp-pug')
		util = require('gulp-util');

gulp.task('compile-scss', () => {
	gulp.src('./src/scss/main.scss')
	.pipe(sass({
		errLogToConsole: true
	}))
	.pipe(autoprefixer({
		browsers: ['last 2 versions']
	}))
	.pipe(minifyCss())
	.pipe(gulp.dest('./docs/css/'))
	.pipe(reload({
		stream: true
	}));
});

gulp.task('compress-js', () => {
	pump([
		gulp.src('./src/js/*.js'),
		//uglify().on('error', util.log),
		gulpConcat('main.js'),
		gulp.dest('./docs/js')
	]);
});

// gulp.task('minify-html', () => {
// 	gulp.src('./src/*.html')
// 	.pipe(htmlmin({
// 		collapseWhitespace: true
// 	}))
// 	.pipe(gulp.dest('./docs/'));
// });

gulp.task('compile-pug', () => {
	gulp.src('./src/*.pug')
	.pipe(pug({}))
	.pipe(htmlmin({
		collapseWhitespace: true
	}))
	.pipe(gulp.dest('./docs/'));
});

gulp.task('browserSync', ['compile-scss', 'compress-js', 'compile-pug'], () => {
	browserSync.init({
		server: './docs/'
	});

	gulp.watch('./src/scss/*.scss', ['compile-scss']);
	gulp.watch('./src/js/*.js', ['compress-js']);
	gulp.watch('./src/**/*.pug', ['compile-pug']);
	gulp.watch('./prod/**/*.html').on('change', reload);
	gulp.watch('./prod/**/*.js').on('change', reload);
});

gulp.task('default', ['browserSync']);
