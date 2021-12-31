var { src, parallel, watch, dest } = require("gulp");
var stylus = require("gulp-stylus");
var watch = require("gulp-watch");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var image = require("gulp-image");

function handleError(err) {
  console.log(err.toString());
  this.emit("end");
}

const images = function () {
  src("app/images/**/*")
    .pipe(
      image({
        svgo: true,
      })
    )
    .on("error", handleError)
    .pipe(dest("public/assets/images"));
};

const script = function () {
  src("app/scripts/**/*.js")
    .pipe(
      babel({
        presets: ["es2015"],
      })
    )
    .on("error", handleError)
    .pipe(concat("script.js"))
    .pipe(dest("public/assets"));
};

const styles = function () {
  src("app/styles/global.styl")
    .pipe(stylus())
    .on("error", handleError)
    .pipe(dest("public/assets"));
};

const wat = function () {
  watch("app/styles/**/*.styl", styles);
  watch("app/scripts/**/*.js", script);
  watch("app/images/**/*", images);
};

const build = function (cb) {
  styles();
  script();
  images();
  cb();
};

exports.build = build;
exports.default = parallel(build, wat);
