/*jshint esversion: 6 */

var gulp = require('gulp')
  , babel = require('gulp-babel')
  , plugins = require('gulp-load-plugins')()
  , exec = require('gulp-exec')
  , browserify = require('browserify')
  , babelify = require('babelify')
  , streamify = require('gulp-streamify')
  , rename = require('gulp-rename')
  , source = require('vinyl-source-stream')
  , buffer = require('vinyl-buffer')
  , runSeq = require('run-sequence');
  
var paths = {
  src: './src',
  out: './dist'
}

var errorHandler = function(err) {
  var util = plugins.util;
  util.log(util.colors.red(err));
  console.log(err.codeFrame);
  this.emit('end');
}

gulp.task('clean', (cb) => {
  return gulp.src(paths.out, { read: false })
    .pipe(plugins.clean());
});

// copies any src HTML markup to output
gulp.task('markup', () => {
  return gulp.src(paths.src + '/**/*.html')
    .pipe(gulp.dest(paths.out));
});

gulp.task('markup:watch', () => {
  return gulp.watch(paths.src + '/**/*.html', ['markup']);
});

// copies any src images to output
gulp.task('images', () => {
  return gulp.src(paths.src + '/images/**/*')
    .pipe(gulp.dest(paths.out + '/images'));
});

gulp.task('images:watch', () => {
  return gulp.watch(paths.src + '/images/**/*', ['images']);
});

// compiles SASS files to output CSS
gulp.task('styles', () => {
  return gulp.src(paths.src + '/styles/**/*.scss')
    .pipe(plugins.sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest(paths.out + '/styles'));
});

gulp.task('styles:watch', () => {
  return gulp.watch(paths.src + '/styles/**/*.scss', ['styles']);
});

// copies any scripts/vendor scripts to output
gulp.task('vendor', () => {
  return gulp.src(paths.src + '/vendor/**/*')
    .pipe(gulp.dest(paths.out + '/vendor'));
});

gulp.task('vendor:watch', () => {
  return gulp.watch(paths.src + '/vendor/**/*', ['vendor']);
});

// compiles ES6 to single output file ES5
gulp.task('scripts', () => {
  var job = browserify({
    entries: paths.src + '/scripts/master.js',
    debug: true
  }).transform(babelify.configure({
    presets: ['es2015']
  })).bundle()
    .on('error', errorHandler)
    .pipe(source('master.min.js'))
    .pipe(buffer())
    .pipe(plugins.ngAnnotate());

  if('dev' != process.env.ENV) {
    job = job.pipe(plugins.uglify());
  }

  return job.pipe(gulp.dest(paths.out + '/scripts'));
});

gulp.task('nodeapp', ()=>{
   var src = gulp.src(paths.src + '/api/app.js');
//   var b =  browserify({
//     entries: paths.src + '/api/app.js',
//     debug: true
//   }).transform(babelify.configure({
//     presets: ['es2015']
//   })).bundle()
  
   src
     .pipe(babel())
     .on('error', errorHandler)
     .pipe(source('app.min.js'))
     .pipe(streamify(plugins.uglify()))
     //.pipe(buffer())
     //.pipe(plugins.ngAnnotate())
     //.pipe(plugins.rename('app.min.js'))
    .pipe(gulp.dest(paths.out + '/api'));
  return src;
});


gulp.task('scripts:watch', () => {
  return gulp.watch(paths.src + '/scripts/**/*', ['scripts']);
});

// does a full run through the build process
gulp.task('build', (callback) => {
  runSeq('clean', ['markup', 'images', 'styles', 'scripts', 'vendor'], callback);
})

// watches and builds on changes to any src files
gulp.task('build:watch', [
  'build',
  'markup:watch',
  'scripts:watch',
  'images:watch',
  'styles:watch',
  'vendor:watch'
]);

// starts up a webserver with a build:watch
gulp.task('build:serve', ['nodeapp','build:watch'], () => {
  gulp.src(paths.out)
  .pipe(plugins.webserver({
    host: /^win/.test(process.platform) ? '127.0.0.1' : '0.0.0.0',
    livereload: true,
    open: true
  })).pipe(exec('node ./dist/api/app.min.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    console.log(err);
  })
  );
});
