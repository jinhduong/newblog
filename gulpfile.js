const gulp = require('gulp');
const uglify = require('gulp-uglify');
const pump = require('pump');
const rename = require("gulp-rename");

gulp.task('default', function (cb) {
    pump([
        gulp.src(['static/js/main.js', '!static/js/*.min.js']),
        uglify(),
        rename({ suffix: '.min' }),
        gulp.dest('static/js/')
    ],
        cb
    );
});