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
    'int': {
        'javascript': ['./src/scripts/js/**/*.js'],
        'typescript': ['./src/scripts/ts/**/*.ts'],
        'scss': ['./src/styles/scss/**/*.scss'],
        'css': ['./src/styles/css/*.css'],
    },
    'ext': {
        'jquery' : ['./bower_components/jquery/dist/jquery.min.js'],
        'lodash' : ['./bower_components/lodash/lodash.min.js'],
        'materializeJS' : ['./bower_components/Materialize/dist/js/materialize.min.js'],
        'materializeSass': ['./bower_components/Materialize/sass/**/*.scss'],
        'fonts': ['./bower_components/Materialize/dist/font/**/*.*']
    }
};



function swallowError (error) {
    // If you want details of the error in the console
    console.log(error.toString());
    this.emit('end');
}

gulp.task('default', [
    'dist'
]);

gulp.task('dist', [
    'styles',
    'scripts'
]);

gulp.task('watch', function(){
    gulp.watch(paths.int.scss, ['styles']);
    gulp.watch(paths.int.typescript, ['scripts']);
});

gulp.task('ts-compile', function() {
    return project.src()
        .pipe(typescript(project)).js
        .pipe(babel())
        .pipe(gulp.dest('./src/scripts/js/'));
});
gulp.task('js-dist', ['ts-compile'], function() {
    var blob = paths.ext.jquery.concat(paths.ext.lodash, paths.ext.materializeJS, paths.int.javascript);
    return gulp.src(blob)
        .pipe(concat('ytlc.js'))
//        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'));
});
gulp.task('scripts', [
    'ts-compile',
    'js-dist'
]);

gulp.task('sass-compile', function() {
    //move Materialize scss files to src for compilation
    gulp.src(paths.ext.materializeSass)
        .pipe(gulp.dest('./src/styles/scss/Materialize/'));

    return gulp.src(paths.int.scss)
        .pipe(sass({outputStyle: 'compressed'}))
        .on('error', swallowError)
        .pipe(concat('YTL-sass.css'))
        .pipe(gulp.dest('./src/styles/css/'));
});
gulp.task('css-dist', ['sass-compile'], function() {
    return gulp.src(paths.int.css)
        .pipe(concat('ytlc.css'))
        .pipe(gulp.dest('./dist/css/'));
});
gulp.task('font-dist', function() {
    return gulp.src(paths.ext.fonts)
        .pipe(gulp.dest('./dist/fonts/'));
});
gulp.task('styles', [
    'sass-compile',
    'css-dist',
    'font-dist'
]);