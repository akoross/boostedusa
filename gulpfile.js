const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const csso = require('postcss-csso');
const autoprefixer = require('autoprefixer');
const sync = require('browser-sync').create();
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const svgstore = require('gulp-svgstore');
const del = require('del');
const { reload } = require('browser-sync');

// Styles

const styles = () => {
  return gulp
    .src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(postcss([autoprefixer(), csso()]))
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(sync.stream());
};
exports.styles = styles;

//html

const html = () => {
  return gulp
    .src('source/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
};
exports.html = html;

//js

const scripts = () => {
  return gulp
    .src('source/js/**/*.js')
    .pipe(terser())
    .pipe(gulp.dest('build/js'))
    .pipe(sync.stream());
};
exports.scripts = scripts;

//imagemin

const optimizeImage = () => {
  return gulp
    .src(
      [
        'source/img/**/*.{png,jpg,svg}',
        '!source/img/ico*/',
        '!source/img/icon*/*',
      ],
      {
        nodir: true,
      },
    )
    .pipe(
      imagemin([
        imagemin.mozjpeg({ progresive: true }),
        imagemin.optipng({ optimizationLevev: 3 }),
        imagemin.svgo(),
      ]),
    )
    .pipe(gulp.dest('build/img'));
};
exports.optimizeImage = optimizeImage;

const copyImages = () => {
  return gulp
    .src(
      [
        'source/img/**/*.{png,jpg,svg,webp}',
        '!source/img/ico*/',
        '!source/img/icon*/*',
      ],
      {
        nodir: true,
      },
    )
    .pipe(gulp.dest('build/img'));
};
exports.copyImages = copyImages;

const createWebp = () => {
  return gulp
    .src('source/img/**/*.{jpg,png}')
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest('build/img'));
};
exports.createWebp = createWebp;

//sprite

const sprite = () => {
  return gulp
    .src('source/img/icons/*.svg')
    .pipe(
      svgstore({
        inlineSvg: true,
      }),
    )
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
};
exports.sprite = sprite;

//copy

const copy = (done) => {
  gulp
    .src(['source/fonts/*.{woff2,woff}', 'source/*.ico'], {
      base: 'source',
    })
    .pipe(gulp.dest('build'));
  done();
};
exports.copy = copy;

//clean

const clean = () => {
  return del('build');
};

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build',
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};
exports.server = server;

const reloadHTML = (done) => {
  sync.reload();
  done();
};

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/**/*.js', gulp.series(scripts));
  gulp.watch('source/*.html', gulp.series(html, reloadHTML));
};

//build

const build = gulp.series(
  clean,
  copy,
  optimizeImage,
  gulp.parallel(styles, html, scripts, sprite, createWebp),
);
exports.build = build;

// exports.default = gulp.series(styles, server, watcher);

exports.default = gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(styles, html, scripts, sprite, createWebp),
  gulp.series(server, watcher),
);
