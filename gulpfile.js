const
	gulp = require('gulp');
	browserSync = require('browser-sync').create();
	del = require('del');
	concat = require('gulp-concat');
	rename = require("gulp-rename");
	pug = require('gulp-pug');
	sass = require('gulp-sass')(require('sass'));
	autoprefixer = require('gulp-autoprefixer');
	csso = require('gulp-csso');
	csscomb = require('gulp-csscomb');
	uglify = require('gulp-uglify');
	svgSprite = require('gulp-svg-sprite');

function clean() { return del(['dist/*']) }
function watch() {
	browserSync.init({
		server: { baseDir: "dist/" },
		// tunnel: true
	});
	gulp.watch('src/**/*.pug', layout);
	gulp.watch('src/styles/**/*.scss', styles);
	gulp.watch('src/scripts/**/*.js', scripts);
	gulp.watch('src/fonts/**/*', fonts);
	gulp.watch('src/img/**/*', img);
	gulp.watch('src/img/sprite-svg/*.svg', spriteSvg);
}

function layout() {
	return gulp.src('src/*.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('dist/'))
		.pipe(browserSync.stream());
}
function styles() {
	return gulp.src([
		'./node_modules/normalize.css/normalize.css',
		'./node_modules/slick-carousel/slick/slick.css',
		'./src/styles/main.scss'
	])
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 2 versions'],
			cascade: false
		}))
		.pipe(concat('bundle.css'))
		.pipe(csscomb())
		.pipe(gulp.dest('dist/css/'))
		.pipe(csso())
		.pipe(rename(function (path) { path.basename += ".min"; }))
		.pipe(gulp.dest('dist/css/'))
		.pipe(browserSync.stream());
}
function scripts() {
	return gulp.src([
		'./node_modules/jquery/dist/jquery.js',
		'./node_modules/slick-carousel/slick/slick.js',
		'./src/scripts/main.js'
	])
		.pipe(concat('bundle.js'))
		.pipe(gulp.dest('dist/js/'))
		.pipe(uglify())
		.pipe(rename(function (path) { path.basename += ".min"; }))
		.pipe(gulp.dest('dist/js/'))
		.pipe(browserSync.stream());
}
function fonts() {
	return gulp.src('src/fonts/**/*')
		.pipe(gulp.dest('dist/fonts/'))
		.pipe(browserSync.stream());
}
function img() {
	return gulp.src([
		'./src/img/**/*',
		'!./src/img/sprite-svg',
		'!./src/img/sprite-svg/**/*'
	])
		.pipe(gulp.dest('dist/img/'))
		.pipe(browserSync.stream());
}
function spriteSvg() {
	return gulp.src('./src/img/sprite-svg/*.svg')
		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: "../sprite.svg"
				}
			},
		}
		))
		.pipe(gulp.dest('dist/img/'))
		.pipe(browserSync.stream());
}

gulp.task('watch', watch);
gulp.task('clean', clean);
gulp.task('layout', layout);
gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('fonts', fonts);
gulp.task('img', img);
gulp.task('spriteSvg', spriteSvg);
gulp.task('build', gulp.series(clean, layout, styles, scripts, fonts, img, spriteSvg));
gulp.task('develop', gulp.series('build', 'watch'));
