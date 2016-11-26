var gulp = require('gulp');
var stylus = require('gulp-stylus');
var stylint = require('gulp-stylint');
var watch = require ('gulp-watch');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var image = require('gulp-image');

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('images', function() {
  gulp.src('app/images/**/*')
    .pipe(image({
      svgo: true,
    }))
    .on('error', handleError)
    .pipe(gulp.dest('public/assets/images'))
});

gulp.task('script', function() {
  gulp.src('app/scripts/**/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .on('error', handleError)
    .pipe(concat('script.js'))
    .pipe(gulp.dest('public/assets'))
});

gulp.task('stylint', function() {
  gulp.src('app/styles/**/*.styl')
  .pipe(stylint({config: '.stylintrc'}))
  .on('error', handleError)
  .pipe(stylint.reporter())
});

gulp.task('styles', function() {
  gulp.src('app/styles/global.styl')
    .pipe(stylus())
    .on('error', handleError)
    .pipe(gulp.dest('public/assets'))
});

gulp.task('watch', function() {
  gulp.watch('app/styles/**/*.styl', ['styles']);
  gulp.watch('app/styles/**/*.styl', ['stylint']);
  gulp.watch('app/scripts/**/*.js', ['script']);
  gulp.watch('app/images/**/*', ['images']);
});

gulp.task('build', ['styles', 'script', 'images']);
gulp.task('default', ['build', 'watch']);
