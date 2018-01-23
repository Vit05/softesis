'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    // rigger = require('gulp-rigger'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require('browser-sync'),
//    spritesmith = require('gulp.spritesmith-multi'),
    rename = require('gulp-rename'),
    reload = browserSync.reload,
    minifyjs = require('gulp-js-minify'),
    plumber = require('gulp-plumber');

var path = {
  build: { //Тут мы укажем куда складывать готовые после сборки файлы
    html:  'build/',
    js:    'build/js/',
    js_libs:    'build/js/libs',
    css:   'build/css/',
    img:   'build/img/',
    fonts: 'build/fonts/',
  },
  src:   { //Пути откуда брать исходники
    html:  'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
    js:    'src/js/common/*.js',//В стилях и скриптах нам понадобятся только main файлы
    js_libs:'src/js/libs/**/*.js',//В стилях и скриптах нам понадобятся только main файлы
    style: 'src/styles/**/*.scss',
    img:   'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
    fonts: 'src/fonts/**/*.*',
  },
  watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
    html:  'src/**/*.html',
    js:    'src/js/**/*.js',
    style: 'src/styles/**/*.scss',
    img:   'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*',
  },
  clean: './build',
};

var config = {
  server:    {
    baseDir: './build',
  },
  tunnel:    true,
  host:      'localhost',
  port:      5000,
  logPrefix: 'Frontend_Devil',
};

gulp.task('sprite', function() {
  return gulp.src('src/img/sprite/**/*.png').
      pipe(spritesmith()).
      on('error', function(err) {
        console.log(err);
      }).
      pipe(gulp.dest('build/css/sprites/'));
});

gulp.task('html:build', function() {
  gulp.src(path.src.html) //Выберем файлы по нужному пути
      .pipe(plumber())
      .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
      .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});

gulp.task('js_libs:build', function() {
  gulp.src(path.src.js_libs) //Выберем файлы по нужному пути
      .pipe(plumber())
      .pipe(gulp.dest(path.build.js_libs)) //Выплюнем их в папку build
      .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});

gulp.task('js:build', function () {
  gulp.src(path.src.js) //Найдем наш main файл
  // .pipe(sourcemaps.init()) //Инициализируем sourcemap
      .pipe(concat('common.js'))
      .pipe(uglify()) //Сожмем наш js
      .pipe(minifyjs())
      .pipe(rename({ suffix: '.min' }))
  // .pipe(sourcemaps.write()) //Пропишем карты

      .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
      .pipe(reload({stream: true})); //И перезагрузим сервер
});

gulp.task('style:build', function() {
  gulp.src(path.src.style) //Выберем наш main.scss
      .pipe(plumber())
      .pipe(sass({
        includePaths: require('node-reset-scss').includePath,
      })) //Скомпилируем
      .pipe(prefixer()) //Добавим вендорные префиксы
      .pipe(cssmin()) //Сожмем
      .pipe(rename({suffix: '.min'})).pipe(gulp.dest(path.build.css)) //И в build
      .pipe(reload({stream: true}));
});

gulp.task('image:build', function() {
  gulp.src(path.src.img) //Выберем наши картинки
      .pipe(imagemin({ //Сожмем их
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
//        use:         [pngquant()],
        interlaced:  true,
      })).pipe(gulp.dest(path.build.img)) //И бросим в build
      .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
  gulp.src(path.src.fonts).pipe(gulp.dest(path.build.fonts));
});

gulp.task('build', [
  'html:build',
   'js:build',
  'style:build',
  'js_libs:build',
//  'fonts:build',
  'image:build',

]);

gulp.task('watch', function() {
  watch([path.watch.html], function(event, cb) {
    gulp.start('html:build');
  });
  watch([path.watch.style], function(event, cb) {
    gulp.start('style:build');
  });
  watch([path.watch.js], function(event, cb) {
    gulp.start('js:build');
  });
//  watch([path.watch.img], function(event, cb) {
//    gulp.start('image:build');
//  });
//  watch([path.watch.fonts], function(event, cb) {
//    gulp.start('fonts:build');
//  });
});

gulp.task('webserver', function() {
  browserSync(config);
});

gulp.task('clean', function(cb) {
  rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);

//npm install --save-dev gulp-watch gulp-autoprefixer gulp-uglify gulp-sass gulp-sourcemaps gulp-clean-css gulp-imagemin imagemin-pngquant rimraf browser-sync node-reset-scss
