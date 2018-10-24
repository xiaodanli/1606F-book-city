/*
 * @Author: 李晓丹 
 * @Date: 2018-10-17 10:53:57 
 * @Last Modified by: 李晓丹
 * @Last Modified time: 2018-10-24 11:23:28
 */

var gulp = require('gulp');

var server = require('gulp-webserver');

var config = require('./server/config');

var middleware = require('./server/middleware');

var sass = require('gulp-sass');

var clean = require('gulp-clean-css');

var uglify = require('gulp-uglify');

gulp.task('webServer',function(){
    return gulp.src(config.publicPath)
    .pipe(server({
        port:config.port,
        middleware:middleware
    }))
})

gulp.task('sass',function(){
    return gulp.src('./src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./src/css'))
})

gulp.task('watch',function(){
    return gulp.watch('./src/scss/*.scss',gulp.series('sass'))
})

//开发环境
gulp.task('dev',gulp.series('sass','webServer','watch'))

//上线环境

gulp.task('buildCss',function(){
    return gulp.src('./src/css/*.css')
    .pipe(clean())
    .pipe(gulp.dest('./build/css'))
})

gulp.task('buildJs',function(){
    return gulp.src('./src/js/{common,page}/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'))
})

gulp.task('copyJs',function(){
    return gulp.src(['./src/js/**/*.js','./src/js/{common,page}/*.js'])
    .pipe(gulp.dest('./build/js'))
})

gulp.task('buildImg',function(){
    return gulp.src('./src/imgs/*.{jpg,png}')
    .pipe(gulp.dest('./build/imgs'))
})

gulp.task('buildHtml',function(){
    return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./build'))
})

gulp.task('build',gulp.series('buildCss','buildJs','copyJs','buildImg','buildHtml'))
