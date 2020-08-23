'use strict'

const gulp = require('gulp');
const watch = require('gulp-watch');
const htmlmin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const imageminSvgo = require('imagemin-svgo');
const rimraf = require('rimraf');

const path = {
    build: {
        html: 'docs/',
        js: 'docs/js/',
        css: 'docs/css/',
        img: 'D:/Server/domains/monterey.loc/docs/img/'
    },
    src: {
        html: 'src/index.html',
        js: 'src/js/script.js',
        style: 'src/style/style.css',
        img: 'D:/Server/domains/monterey.loc/src/image/**/*.*',
    },
    watch: {
        html: 'src/index.html',
        js: 'src/js/script.js',
        style: 'src/style/style.css',
        img: 'D:/Server/domains/monterey.loc/src/image/**/*.*',
    },
    clean: './docs'
};

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('minify', () => {
  return gulp.src(path.src.html)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(path.build.html))
});

gulp.task('uglify', function () {
    return gulp.src(path.src.js)
        .pipe(rename("script.min.js"))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js))
});

gulp.task('stylebuild', async function () {
    gulp.src(path.src.style)
        .pipe(rename("style.min.css"))
        .pipe(autoprefixer({cascade: false}))
        .pipe(cleanCSS())
        .pipe(gulp.dest(path.build.css))
});

gulp.task('imagebuild', function () {
      return gulp.src(path.src.img)
        .pipe(imagemin([
           imageminJpegRecompress({
                progressive: true,
                max: 80,
                min: 70
              }),
            imageminPngquant({
                quality: [0.6, 0.8]
            }),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest(path.build.img))
});

gulp.task('build', gulp.series(
  'minify',
  'uglify',
  'stylebuild',
  'imagebuild'
));

gulp.task('watch', function() {
    gulp.watch([path.watch.html], gulp.series('minify'));
    gulp.watch([path.watch.js], gulp.series('uglify'));
    gulp.watch([path.watch.style], gulp.series('stylebuild'));
    gulp.watch([path.watch.img], gulp.series('imagebuild'));
    return;
});

gulp.task('default', gulp.series(
  'build',
  'watch'
));
