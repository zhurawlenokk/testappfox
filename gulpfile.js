const gulp         = require('gulp'), 
	  sass         = require('gulp-sass')(require('sass')), 
	  browserSync  = require('browser-sync'), 
	  concat       = require('gulp-concat'), 
	  uglify       = require('gulp-uglifyjs'), 
	  cssnano      = require('gulp-cssnano'), 
	  rename       = require('gulp-rename'),
	  del          = require('del'), 
	  cache        = require('gulp-cache'), 
	  autoprefixer = require('gulp-autoprefixer');
 
gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass') 
		.pipe(sass()) 
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) 
		.pipe(gulp.dest('app/css')) 
		.pipe(browserSync.reload({stream: true})) 
});
 
gulp.task('browser-sync', function() { 
	browserSync({ 
		server: { 
			baseDir: 'app' 
		},
		notify: false 
	});
});
 
gulp.task('code', function() {
	return gulp.src('app/*.html')
	.pipe(browserSync.reload({ stream: true }))
});
 
gulp.task('clean', async function() {
	return del.sync('dist'); 
});
 
gulp.task('prebuild', async function() {
	const buildCss = gulp.src([ 
		'app/css/main.css',
		])
	.pipe(gulp.dest('dist/css'))
 
	const buildFonts = gulp.src('app/fonts/**/*') 
	.pipe(gulp.dest('dist/fonts'))
 
	const buildJs = gulp.src('app/js/**/*') 
	.pipe(gulp.dest('dist/js'))
 
	const buildHtml = gulp.src('app/*.html') 
	.pipe(gulp.dest('dist'));
 
});
 
gulp.task('clear', function (callback) {
	return cache.clearAll();
})
 
gulp.task('watch', function() {
	gulp.watch('app/sass/**/*.sass', gulp.parallel('sass')); 
	gulp.watch('app/*.html', gulp.parallel('code')); 
});
gulp.task('default', gulp.parallel('sass', 'browser-sync', 'watch'));
gulp.task('build', gulp.parallel('prebuild', 'clean', 'sass'));