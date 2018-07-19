var gulp        = require('gulp');
var minifyCss   = require('gulp-minify-css');
var coffee      = require('gulp-coffee');
var less        = require('gulp-less');
var notify      = require('gulp-notify');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

var paths = {
  html:['index.html'],
  css:['style.scss'],
  script:['app.js']
};

gulp.task('mincss', function(){
  return gulp.src(paths.css)
    .pipe(less().on('error', less.logError))
    .pipe(minifyCss())
    .pipe(gulp.dest('main'))
    .pipe(reload({stream:true}));
});

// ////////////////////////////////////////////////
// HTML 
// ///////////////////////////////////////////////
gulp.task('html', function(){
  gulp.src(paths.html)
  .pipe(reload({stream:true}));
});

// ////////////////////////////////////////////////
// Browser-Sync
// // /////////////////////////////////////////////
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: "./"
    },
    port: 8080,
    open: true,
    notify: false
  });
});

gulp.task('scripts', function(){
  return gulp.src(paths.script)
    .pipe(coffee())
    .pipe(gulp.dest('js'))
    .pipe(reload({stream:true}));
});

gulp.task('watcher',function(){
  gulp.watch(paths.css, ['mincss']);
  gulp.watch(paths.script, ['scripts']);
  gulp.watch(paths.html, ['html']);
});

gulp.task('default', ['watcher', 'browserSync']);