const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const cssnano = require('cssnano');
const concat = require('gulp-concat');
const cheerio = require('gulp-cheerio');
const del = require('del');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const sourceMaps = require('gulp-sourcemaps');
const replace = require('gulp-replace');
const notify = require('gulp-notify');
const uglify = require('gulp-uglify-es').default;

// Compile and optimize scripts
function styles() {
    return gulp
        .src('./src/scss/**/*.scss') // find all scss files
        .pipe(plumber()) // plumb errors
        .pipe(sourceMaps.init()) // init source maps
        .pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError())) // notify on sass error
        .pipe(gulp.dest('./src/css')) // configure the destination
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourceMaps.write()) // write sourcemaps
        .pipe(gulp.dest('./src/css')) // configure the destination
        .pipe(browserSync.stream()); // stream changes to all browsers
}

// Compile and optimize scripts
function scripts() {
    return gulp.src([
        './node_modules/jquery/dist/jquery.js',
        './node_modules/jquery-migrate/dist/jquery-migrate.min.js',
        './node_modules/svg4everybody/dist/svg4everybody.js',
        './node_modules/magnific-popup/dist/jquery.magnific-popup.js',
        './node_modules/slick-carousel/slick/slick.js',
        //все js до основного common.js
        './src/js/common.js'
    ])
        .pipe(plumber({
            errorHandler: notify.onError("Script Error: <%= error.message %>")
        }))
        .pipe(uglify())
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./src/js'));
}

// Optimize Images
function images() {
    return gulp
        .src("./src/images/**/*")
        .pipe(
            imagemin([
                imagemin.gifsicle({ interlaced: true }),
                imagemin.mozjpeg({ progressive: true }),
                imagemin.optipng({ optimizationLevel: 5 }),
                imagemin.svgo({
                    plugins: [
                        {
                            removeViewBox: false,
                            collapseGroups: true
                        }
                    ]
                })
            ])
        )
        .pipe(gulp.dest("./dist/images"));
}

// Transpile, concatenate and minify scripts
function scripts() {
    return gulp
        .src([
            './node_modules/jquery/dist/jquery.js',
            './node_modules/jquery-migrate/dist/jquery-migrate.min.js',
            './node_modules/svg4everybody/dist/svg4everybody.js',
            './node_modules/magnific-popup/dist/jquery.magnific-popup.js',
            './node_modules/slick-carousel/slick/slick.js',
            //все js до основного common.js
            './src/js/common.js'
        ])
        .pipe(plumber())
        .pipe(uglify())
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./src/js'))
        .pipe(browserSync.stream());
}

// SVG sprite
function buildSVGSprite() {
    return gulp.src('./src/images/icons-svg/*.svg')
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
        .pipe(gulp.dest('./src/images/'));
}

// Clean dist directory
function clean() {
    return del(['./dist/']);
}

// Watch changes
function watch() {
    browserSync.init({ // initialize browserSync
        server: {
            baseDir: './src' // development source directory
        },
        notify: false // disable notifications
    });

    gulp.watch('./src/scss/**/*.scss', styles); // change styles files on .scss files change
    gulp.watch("./src/js/common.js", scripts); // reload browser when .js changes
    gulp.watch('./src/**/*.html').on('change', browserSync.reload); // reload browser when .html changes
    gulp.watch("./src/images/**/*").on('change', browserSync.reload);
}

function build() {
    gulp.src('./src/css/style.min.css')
        .pipe(gulp.dest('./dist/css'));

    gulp.src('./src/images/**/*.+(svg|gif)')
        .pipe(gulp.dest('./dist/images'));

    gulp.src('./src/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts'));

    gulp.src('./src/js/bundle.js')
        .pipe(gulp.dest('./dist/js'));

    return gulp.src('./src/*.html')
        .pipe(replace('style.css', 'style.min.css'))
        .pipe(gulp.dest('./dist'));
}

// Export tasks
exports.styles = styles;
exports.scripts = scripts;
exports.clean = clean;
exports.images = images;
exports.buildSVGSprite = buildSVGSprite;
exports.watch = watch;
exports.build = build;
exports.default = watch;