const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const sourceMaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const pngquant = require('imagemin-pngquant');
const del = require('del');
const spritesmith = require('gulp.spritesmith');
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const browserSync = require('browser-sync');
const notify = require('gulp-notify');


gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});


gulp.task('sass', function () {
    return gulp.src('app/sass/**/*.scss')
        .pipe(plumber())
        .pipe(sourceMaps.init())
        .pipe(sass().on("error", notify.onError()))
        .pipe(autoprefixer({
            browsers: ['ie >= 10', 'Firefox >= 30', 'Chrome >= 22', 'Safari >= 6.1', 'Opera >= 12.1']
        }))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});


gulp.task('styles', function () {
    return gulp.src('app/css/style.css')
        .pipe(cssnano())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('app/css'));
});


gulp.task('scripts', function () {
    return gulp.src([
            'node_modules/jquery/dist/jquery.js',
            'node_modules/jquery-migrate/dist/jquery-migrate.min.js',
            'node_modules/svg4everybody/dist/svg4everybody.js',
            'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
            'node_modules/slick-carousel/slick/slick.js',
            //все js до основного common.js
            'app/js/common.js'
        ])
        .pipe(uglify())
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest('app/js'));
});


gulp.task('watch', ['browser-sync', 'styles', 'scripts'], function () {
    gulp.watch('app/sass/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', ['scripts'], browserSync.reload);
});


gulp.task('clean', function () {
    return del.sync('static');
});


gulp.task('img', function () {
    return gulp.src('app/images/**/*.{png,jpg}')
        .pipe(imagemin([
            imagemin.jpegtran({
                progressive: true
            }),
            imageminJpegRecompress({
                loops: 5,
                min: 65,
                max: 70,
                quality: 'medium'
            }),
            imagemin.optipng({
                optimizationLevel: 3
            }),
            pngquant({
                quality: '65-70',
                speed: 5
            })
        ]))
        .pipe(gulp.dest('static/images'));
});


gulp.task('build', ['clean', 'img', 'styles', 'scripts'], function () {

    var buildCss = gulp.src('app/css/style.min.css')
        .pipe(gulp.dest('static/css'));

    var buildCss = gulp.src('app/images/**/*.+(svg|gif)')
        .pipe(gulp.dest('static/images'));

    var buildFonts = gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('static/fonts'));

    var buildJs = gulp.src('app/js/all.min.js')
        .pipe(gulp.dest('static/js'));

    var buildHtml = gulp.src('app/*.html')
        .pipe(gulp.dest('static'));

    var buildPhp = gulp.src('app/*.php')
        .pipe(gulp.dest('static'));

});


// sprite png
gulp.task('sprite', function () {
    var spriteData = gulp.src('app/images/icons/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: '_sprite.scss',
        cssFormat: 'css',
        imgPath: '../images/sprite.png',
        padding: 15
    }));
    spriteData.img.pipe(gulp.dest('app/images'));
    spriteData.css.pipe(gulp.dest('app/sass/sprite'));
});


// sprite svg
gulp.task('svgSpriteBuild', function () {
    return gulp.src('app/images/icons-svg/*.svg')
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: {
                xmlMode: true
            }
        }))
        .pipe(replace('&gt;', '>'))
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: "../sprite.svg"
                }
            }
        }))
        .pipe(gulp.dest('app/images/'));
});


// ttf2woff.
gulp.task('ttf2woff', function () {
    gulp.src(['app/fonts/*.ttf'])
        .pipe(ttf2woff())
        .pipe(gulp.dest('app/fonts'));
});

// ttf2woff2.
gulp.task('ttf2woff2', function () {
    gulp.src(['app/fonts/*.ttf'])
        .pipe(ttf2woff2())
        .pipe(gulp.dest('app/fonts'));
});


gulp.task('default', ['watch']);