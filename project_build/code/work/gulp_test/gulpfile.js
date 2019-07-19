const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

// const jshint = require('gulp-jshint');
// const babel = require('gulp-babel');
// const concat = require('gulp-concat');
// const uglify = require('gulp-uglify');
// const rename = require("gulp-rename");
// const less = require('gulp-less');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix;
// const cssmin = require('gulp-cssmin');
// const htmlmin = require('gulp-htmlmin');
// const livereload = require('gulp-livereload');
// const connect = require("gulp-connect");
const open = require("open");
const opn = require("opn");



//定义任务
/*gulp.task('jshint', function () {
  return gulp.src('./src/js/!*.js')
    .pipe(jshint({esversion: 6}))
    .pipe(jshint.reporter('default'));
});
gulp.task('babel', ['jshint'], function () {
  return gulp.src('./src/js/!*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('build/js'))
});
gulp.task('concat', ['babel'], function () {
  return gulp.src(['./build/js/module1.js', './build/js/module2.js'])
    .pipe(concat('built.js'))
    .pipe(gulp.dest('./build/js'))
});
gulp.task('uglify', ['concat'], function () {
  return gulp.src('./build/js/built.js')
    .pipe(uglify())
    .pipe(rename('dist.min.js'))
    .pipe(gulp.dest('./dist/js'))
});*/

gulp.task('minifyjs', function () {
  return gulp.src('./src/js/*.js')
    .pipe($.jshint({esversion: 6}))
    .pipe($.jshint.reporter('default'))
    .pipe($.babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('build/js'))
    .pipe($.concat('built.js'))
    .pipe(gulp.dest('./build/js'))
    .pipe($.uglify())
    .pipe($.rename('dist.min.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe($.livereload());
});

gulp.task('minifycss', function () {
  return gulp.src('./src/less/*.less')
    .pipe($.less({
      plugins: [autoprefix]
    }))
    .pipe(gulp.dest('./build/css'))
    .pipe($.concat('built.css'))
    .pipe(gulp.dest('./build/css'))
    .pipe($.cssmin())
    .pipe($.rename('dist.min.css'))
    .pipe(gulp.dest('./dist/css'))
    .pipe($.livereload());
});

gulp.task('minifyhtml', function () {
  return gulp.src('./index.html')
    .pipe($.htmlmin({
      removeComments: true,
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('./dist'))
    .pipe($.livereload());
  
});

gulp.task('watch', ['default'], function () {
  $.livereload.listen();
  $.connect.server({
    root: 'dist',
    livereload: true,
    port: 3000
  });
  opn('http://localhost:3000');
  gulp.watch('./src/less/*.less', ['minifycss']);
  gulp.watch('./src/js/*.js', ['minifyjs']);
  gulp.watch('index.html', ['minifyhtml']);
})




gulp.task('default', ['minifyjs', 'minifycss', 'minifyhtml']);