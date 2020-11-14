const { src, dest, parallel, series, watch } = require('gulp');
const autoprefixer = require('autoprefixer');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const cssnano = require('cssnano');
const concat = require('gulp-concat');
const cheerio = require('gulp-cheerio');
const del = require('del');
const data = require('gulp-data');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const sourceMaps = require('gulp-sourcemaps');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const notify = require('gulp-notify');
const uglify = require('gulp-uglify-es').default;

/** Base working directory */
const baseDir = './src';

/**
 * Config
 */
const config = {

    /** Files to watch and hard reload */
    filesToWatch: 'html,htm,json,md',

    /** Images to watch and process */
    imagesToWatch: 'jpg,jpeg,png,webp,svg',

    /** BrowserSync setting; if "false", BrowserSync will work offline */
    browserSyncMode: 'true',

    /** Path to files and directories */
    paths: {
        scripts: {
            src: [
                // dependencies
                './node_modules/jquery/dist/jquery.js',
                './node_modules/svg4everybody/dist/svg4everybody.js',
                './node_modules/magnific-popup/dist/jquery.magnific-popup.js',
                './node_modules/swiper/swiper-bundle.min.js',
                // "app.js" always at the end
                './src/js/app.js'
            ],
            dest: `${baseDir}/js`,
        },
        styles: {
            src: `${baseDir}/scss/main.scss`,
            dest: `${baseDir}/css`,
        },
        images: {
            src: `${baseDir}/images/src/**/*`,
            dest: `${baseDir}/images/dest`,
        },
        deploy: {
            hostname: 'username@yousite.com', // Deploy hostname
            destination: 'your-app/public_html/', // Deploy destination
            include: [/* '*.htaccess' */], // Included files to deploy
            exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excluded files from deploy
        },
        buildFolder: './static',
        cssOutputName: 'main.min.css',
        jsOutputName: 'main.min.js',
    }

}

/**
 * Initializes BrowserSync
 */
function browserSyncInit() {
    browserSync.init({
        server: {
            baseDir: `${baseDir}/`
        },
        notify: false,
        online: config.browserSyncMode
    });
}

// Compile and optimize scripts
function styles() {
    return src(`${baseDir}/scss/**/*.scss`) // find all scss files
        .pipe(plumber()) // plumb errors
        .pipe(sourceMaps.init()) // init source maps
        .pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError())) // notify on sass error
        .pipe(postcss([autoprefixer()]))
        .pipe(sourceMaps.write()) // write sourcemaps
        .pipe(dest(`${baseDir}/css`)) // configure the destination
        .pipe(browserSync.stream()); // stream changes to all browsers
}

function buildStyles() {
    return src(`${baseDir}/css/main.css`)
        .pipe(postcss([cssnano()]))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest(`${config.paths.buildFolder}/css`))
}

// Compile and optimize scripts
function scripts() {
    return src(config.paths.scripts.src)
        .pipe(plumber({
            errorHandler: notify.onError("Script Error: <%= error.message %>")
        }))
        .pipe(concat(config.paths.jsOutputName))
        .pipe(babel({
            presets: [[
                '@babel/env',
                { modules: false }
            ]]
        }))
        .pipe(dest(config.paths.scripts.dest))
        .pipe(browserSync.stream());
}

function buildScripts() {
    return src(`${baseDir}/js/main.min.js`)
        .pipe(uglify())
        .pipe(dest(`${config.paths.buildFolder}/js`));
}

// Pug
function buildPug() {
    return src(`${baseDir}/pug/pages/**/*.pug`)
        .pipe(data(function () {
            return require(`${baseDir}/pug/data.json`);
        }))
        .pipe(pug({
            pretty: true
        }))
        .pipe(dest(baseDir));
}

// SVG sprite
function buildSVGSprite() {
    return src(`${baseDir}/images/icons-svg/*.svg`)
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
        .pipe(dest(`${baseDir}/images/`));
}

// Optimize Images
function processImages() {
    return src(`${baseDir}/images/**/*`)
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 })
        ]))
        .pipe(dest(`${config.paths.buildFolder}/images`));
}

// Watch changes
function setupWatch() {
    watch(`${baseDir}/pug/**/*.pug`, { usePolling: true }, buildPug);
    watch(`${baseDir}/scss/**/*.scss`, { usePolling: true }, styles); // change styles files on .scss files change
    watch([`${baseDir}/js/**/*.js`, `!${baseDir}/js/**/*.min.js`], { usePolling: true }, scripts); // reload browser when .js change
    watch(`${baseDir}/**/*.{${config.filesToWatch}}`, { usePolling: true }).on('change', browserSync.reload); // reload browser when static files change
    watch(`${baseDir}/images/icons-svg/*.svg`, { usePolling: true }, buildSVGSprite); // automatically build svg sprite
}

// Clean dist directory
function clearDist() {
    return del([`${config.paths.buildFolder}/`]);
}

// Move all static files to dist folder
function moveStatic(done) {
    src(`${baseDir}/fonts/**/*`).pipe(dest(`${config.paths.buildFolder}/fonts`));
    src(`${baseDir}/*.html`).pipe(replace('main.css', 'main.min.css')).pipe(dest(config.paths.buildFolder));
    done();
}

// Export tasks
exports.styles = styles;
exports.scripts = scripts;
exports.buildSVGSprite = buildSVGSprite;
exports.processImages = processImages;
exports.clearDist = clearDist;
exports.buildPug = buildPug;

exports.build = series(
    clearDist,
    parallel(
        series(buildSVGSprite, processImages),
        series(styles, buildStyles),
        series(scripts, buildScripts),
    ),
    moveStatic
);

exports.default = parallel(series(styles, scripts, browserSyncInit), setupWatch);