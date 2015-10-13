'use strict';

// gulp imports
var gulp = require('gulp'),
    babel = require('gulp-babel'),
    typescript = require('gulp-typescript'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),

    // tsconfig.json support within gulp-typescript
    project = typescript.createProject('tsconfig.json');

var paths = {
    'javascript': ['./src/js/**/*.js'],
    'typescript': ['./src/ts/**/*.ts'],
    'images': ['client/img/**/*'],
    'scss': ['./src/scss/**/*.scss'],
    'bower': {
        'jquery': './bower_components/jquery/dist/jquery.min.js',
        'lodash': './bower_components/lodash/lodash.min.js'
    }
};

function swallowError (error) {

    // If you want details of the error in the console
    console.log(error.toString());

    this.emit('end');
}

gulp.task('default', [
    'tsc',
    'sass',
    'bower'
]);

gulp.task('watch', function(){
    gulp.watch(paths.scss, ['sass']);
})

gulp.task('tsc', function() {
    return gulp.src(paths.typescript)
        .pipe(typescript(project)).js
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest('.'));
});

gulp.task('bower', function() {
    return gulp.src([paths.bower.jquery, paths.bower.lodash]).pipe(gulp.dest('./dist/js/'));
});

gulp.task('sass', function() {
    return gulp.src(paths.scss)
        .pipe(sass({outputStyle: 'compressed'}))
        .on('error', swallowError)
        .pipe(concat('ytlc.css'))
        .pipe(gulp.dest('./dist/css/'));
});
