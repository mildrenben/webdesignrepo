var gulp = require('gulp'),
	htmlmin = require('gulp-html-minifier'),
	minifyCSS = require('gulp-minify-css');

gulp.task('minify-css', function(){
	return gulp.src('./src/css/*.css')
	.pipe(minifyCSS())
	.pipe(gulp.dest('./docs/css/'));
});

gulp.task('minify-html', function(){
	return gulp.src('./src/*.html')
	.pipe(htmlmin({
		collapseWhitespace: true
	}))
	.pipe(gulp.dest('./docs/'));
});

gulp.task('default', ['minify-html']);
