const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const cssnano = require('cssnano');
const concat = require('gulp-concat');
const cheerio = require('gulp-cheerio');
const del = require('del');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const pngquant = require('imagemin-pngquant');
const sass = require('gulp-sass');
const spritesmith = require('gulp.spritesmith');
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

// Clean dist directory
function clean() {
    return del(['./dist/']);
}

// Optimize Images
function images() {
    return gulp
        .src("./assets/img/**/*")
        .pipe(newer("./_site/assets/img"))
        .pipe(
            imagemin([
                imagemin.gifsicle({ interlaced: true }),
                imagemin.jpegtran({ progressive: true }),
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
        .pipe(gulp.dest("./src/images"));
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
    gulp.watch('./src/**/*.html').on('change', browserSync.reload); // reload browser when .html changes
    gulp.watch('./src/js/**/*.js', scripts).on('change', browserSync.reload); // reload browser when .js changes
}

// Export tasks
exports.styles = styles;
exports.scripts = scripts;
exports.clean = clean;
exports.watch = watch;
exports.default = watch;



// gulp.task('browser-sync', function () {
//     browserSync({
//         server: {
//             baseDir: 'app'
//         },
//         notify: false
//     });
// });

// gulp.task('styles', function () {
//     return gulp.src('app/css/style.css')
//         .pipe(cssnano())
//         .pipe(concat('style.min.css'))
//         .pipe(gulp.dest('app/css'));
// });


// gulp.task('scripts', function () {
//     return gulp.src([
//         'node_modules/jquery/dist/jquery.js',
//         'node_modules/jquery-migrate/dist/jquery-migrate.min.js',
//         'node_modules/svg4everybody/dist/svg4everybody.js',
//         'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
//         'node_modules/slick-carousel/slick/slick.js',
//         //все js до основного common.js
//         'app/js/common.js'
//     ])
//         .pipe(plumber({
//             errorHandler: notify.onError("Script Error: <%= error.message %>")
//         }))
//         .pipe(uglify())
//         .pipe(concat('all.min.js'))
//         .pipe(gulp.dest('app/js'))
//         .pipe(browserSync.reload({
//             stream: true
//         }));
// });


// gulp.task('img', function () {
//     return gulp.src('app/images/**/*.{png,jpg,jpeg,mp4,webm}')
//         .pipe(plumber({
//             errorHandler: notify.onError("Script Error: <%= error.message %>")
//         }))
//         .pipe(imagemin([
//             imagemin.jpegtran({
//                 progressive: true
//             }),
//             imageminJpegRecompress({
//                 loops: 5,
//                 min: 65,
//                 max: 70,
//                 quality: 'medium'
//             }),
//             imagemin.optipng({
//                 optimizationLevel: 3
//             }),
//             pngquant({
//                 quality: [0.65, 0.70],
//                 speed: 5
//             })
//         ]))
//         .pipe(gulp.dest('static/images'));
// });


// gulp.task('build', ['clean', 'img', 'styles', 'scripts'], function () {

//     var buildCss = gulp.src('app/css/style.min.css')
//         .pipe(gulp.dest('static/css'));

//     var buildCss = gulp.src('app/images/**/*.+(svg|gif)')
//         .pipe(gulp.dest('static/images'));

//     var buildFonts = gulp.src('app/fonts/**/*')
//         .pipe(gulp.dest('static/fonts'));

//     var buildJs = gulp.src('app/js/all.min.js')
//         .pipe(gulp.dest('static/js'));

//     var buildHtml = gulp.src('app/*.html')
//         .pipe(replace('style.css', 'style.min.css'))
//         .pipe(gulp.dest('static'));

// });


// // sprite svg
// gulp.task('svgSpriteBuild', function () {
//     return gulp.src('app/images/icons-svg/*.svg')
//         .pipe(svgmin({
//             js2svg: {
//                 pretty: true
//             }
//         }))
//         .pipe(cheerio({
//             run: function ($) {
//                 $('[fill]').removeAttr('fill');
//                 $('[stroke]').removeAttr('stroke');
//                 $('[style]').removeAttr('style');
//             },
//             parserOptions: {
//                 xmlMode: true
//             }
//         }))
//         .pipe(replace('&gt;', '>'))
//         .pipe(svgSprite({
//             mode: {
//                 symbol: {
//                     sprite: "../sprite.svg"
//                 }
//             }
//         }))
//         .pipe(gulp.dest('app/images/'));
// });