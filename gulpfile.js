"use stricte"

const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cssbeautify = require('gulp-cssbeautify');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const rigger = require('gulp-rigger');
const sass = require('gulp-sass')(require('sass'));
const csscomments = require('gulp-strip-css-comments');
const uglify = require('gulp-uglify');
const browser = require('browser-sync').create();
const del = require('del');
const { src, dest } = require('gulp');
const gulpStripCssComments = require('gulp-strip-css-comments');
const concat = require('gulp-concat');
const browserSync = require('browser-sync');
const notify = require('gulp-notify');
const gulpinclude = require('gulp-file-include');


const srcPath = 'layout/'
const distPath = 'dist/'

const path = {
    build: {
        html: distPath,
        css: distPath + 'css/',
        js: distPath + 'js/',
        img: distPath + 'img/',
        fonts: distPath + 'fonts/',
        other: distPath + 'lib/',
    },
    src: {
        html: srcPath + '*.html',
        prefabs: srcPath + 'prefabs/**/*.{html, js}',
        css: srcPath + 'scss/*.scss',
        js: srcPath + 'js/*.js',
        img: srcPath + 'img/**/*.{jpeg,png,svg,gif,ico,xml,json,webp,jpg}',
        fonts: srcPath + 'fonts/**/*.{eot,woff,woff2,ttf,svg}',
        other: srcPath + 'lib/**/*.**'
    },
    watch: {
        html: srcPath + '**/*.html',
        prefabs: srcPath + 'prefabs/**/*.{html, js}',
        css: srcPath + 'scss/**/*.scss',
        js: srcPath + 'js/**/*.js',
        img: srcPath + 'img/**/*.{jpeg,png,svg,gif,ico,xml,json,webp,jpg}',
        fonts: srcPath + 'fonts/**/*.{eot,woff,woff2,ttf,svg}',
        other: srcPath + 'lib/**/*.**',
    },
    clean: './' + distPath
}



function server(){
    browserSync.init({
        server: {
            baseDir: './' + distPath
        }
    });
}



function html(){
    return src(path.src.html, { base: srcPath })
        .pipe(plumber())
        .pipe(plumber.stop())
        .pipe(dest(path.build.html))
        .pipe(browserSync.reload({stream: true}));
}

function prefabs(){
    return src([srcPath + 'index.html'], { base: srcPath })
    .pipe(plumber())
    .pipe(plumber.stop())
    .pipe(gulpinclude({prefix: '@@', basepath: '@file'}))
    .pipe(dest(path.build.html))
    .pipe(browserSync.reload({stream: true}));
}

function css(){
    return src(path.src.css, { base: srcPath + 'scss/'})
        .pipe(plumber({
            errorHandler : function(err){
                notify.onError({
                    title: 'SCSS ERORR, FIX IT!',
                    message: 'Error <% error.message %>'
                })(err);
                this.enit('end');
            }
        }))
        .pipe(sass())
        .pipe(concat('style.css'))
        .pipe(autoprefixer())
        .pipe(cssbeautify())
        .pipe(dest(path.build.css))
        .pipe(cssnano({
            zindex: false,
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(gulpStripCssComments())
        .pipe(rename({
            suffix: '.min',
            extname: '.css'
        }))
        .pipe(plumber.stop())
        .pipe(dest(path.build.css))
        .pipe(browserSync.reload({stream: true}));
}

function js(){
    return src(path.src.js, { base: srcPath + 'js/'})
        .pipe(plumber({
            errorHandler : function(err){
                notify.onError({
                    title: 'JS ERORR, FIX IT!',
                    message: 'Error <% error.message %>'
                })(err);
                this.enit('end');
            }
        }))
        .pipe(rigger())
        .pipe(concat('script.js'))
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min',
            extname: '.js'
        }))
        .pipe(plumber.stop())
        .pipe(dest(path.build.js))
        .pipe(browserSync.reload({stream: true}));
}


function img(){
    return src(path.src.img, { base: srcPath + 'img/' } )
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 80, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(dest(path.build.img))
        .pipe(browserSync.reload({stream: true}));
}

function fonts(){
    return src(path.src.fonts, {base: srcPath + 'fonts/'})
        .pipe(dest(path.build.fonts))
        .pipe(browserSync.reload({stream: true}));
}


function clean(){
    return(del(path.clean))
}

function lib(){
    return src(path.src.other, {base: srcPath + 'lib/'})
        .pipe(dest(path.build.other))
        .pipe(browserSync.reload({stream: true}));
}


function watchFile(){
    gulp.watch([path.watch.html], build_html)
    gulp.watch([path.watch.prefabs], build_html)
    gulp.watch([path.watch.css], css)
    gulp.watch([path.watch.js], js)
    gulp.watch([path.watch.img], gulp.series(function cleanImg() {
return(del(path.build.img))
      },img))
    gulp.watch([path.watch.fonts], gulp.series(function cleanFonts() { 
return(del(path.build.fonts))
     },fonts)),
    gulp.watch([path.watch.other], gulp.series(function cleanLib() { 
return(del(path.build.other))
     },lib))
}

const build_html = gulp.series(html, prefabs)
const build = gulp.series(clean, gulp.parallel(build_html, css, js, img, fonts, lib))
const watch = gulp.parallel(build, watchFile, server)


exports.html = html
exports.prefabs = prefabs
exports.css = css
exports.js = js
exports.img = img
exports.fonts = fonts
exports.clean = clean
exports.build = build
exports.watch = watch
exports.default = watch