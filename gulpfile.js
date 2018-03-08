'use strict';

// gulp.src()表示文件的来源 读取的文件路径
// gulp.dest()表示文件的输出 输出文件
// gulp.task()表示要执行的任务
// gulp.watch()表示要监听的任务

// 引用中间件
var gulp = require('gulp');//引入gulp
var runSequence = require('run-sequence');
var connect = require('gulp-connect');//启动服务
var minifyHtml = require('gulp-minify-html');//压缩html
var minifyCss = require('gulp-minify-css');//压缩css

var gulpif = require('gulp-if');
var changed = require('gulp-changed');
var autoprefixer = require('gulp-autoprefixer');

var rev = require('gulp-rev');//对文件名加MD5后缀
var revCollector = require('gulp-rev-collector');//路径替换
var less = require('gulp-less');//less文件

// 设置文件路径
var cssSrc = 'public/app/*/css/*.css';//css原来路径
var cssDest = 'dist/public';//css目标路径
var jsSrc = ['public/app/*.js','public/app/*/js/*.js'];//js原来路径
var jsDest = 'dist/public';//js目标路径
var htmlSrc =['public/app/index.html','public/app/*/*.html'];
var htmlDest = 'dist/public';
var condition = true;


/*---------------------- 压缩搬运 ----------------------------*/
// 搬运图片
gulp.task('moveimg',() => {
  return gulp.src(['public/app/images/*.png','public/app/images/*.jpg','public/app/images/*.jpeg','public/app/images/*.gif'])
  .pipe(gulp.dest('dist/public/app/images'));
});

// 压缩js生成版本号
gulp.task('miniJS',() => {
  return gulp.src(jsSrc)
  .pipe(rev())
  .pipe(gulp.dest(jsDest))
  .pipe(rev.manifest())
  .pipe(gulp.dest('public/rev/js'));
})

//压缩css生成版本号
gulp.task('miniCss',() => {
  return gulp.src(cssSrc)
  .pipe(gulpif(condition,minifyCss({compatibility:'ie11'})))
  .pipe(rev())
  .pipe(gulpif(condition,changed(cssDest)))
  .pipe(autoprefixer({
    browsers:['last 2 versions'],//浏览器
    cascade:false,//不串联
    remove:false
  }))
  .pipe(gulp.dest(cssDest))
  .pipe(rev.manifest())
  .pipe(gulp.dest('public/rev/css'));
})

// 压缩其它里的html
gulp.task('miniComponentsHtml',() => {
  return gulp.src('public/app/*/*.html')
  .pipe(gulpif(condition,minifyHtml({
    empty:true,
    spare:true,
    quotes:true
  })))
  .pipe(gulp.dest(htmlDest))
})

// 压缩index.html并加上版本号
gulp.task('miniHtml',() => {
  return gulp.src(['public/rev/**/*.json','public/app/index.html'])
  .pipe(revCollector())
  .pipe(gulpif(condition,minifyHtml({
    empty:true,
    spare:true,
    quotes:true
  })))
  .pipe(gulp.dest('dist'));
})

/*---------------------- less文件 ----------------------------*/
// less文件转换
gulp.task('less',() => {
  return gulp.src('public/app/styles/less/*.less')
  .pipe(less())
  .pipe(gulp.dest('public/app/styles/css'));
})
// 监听less文件变化，同时改变css文件
gulp.task('watch-less',['less'],() => {
  gulp.watch(['public/app/styles/less/*.less'],['less']);
})

/*---------------------- gulp build 启动压缩等构建 ----------------------------*/
gulp.task('build',(done) => {
  runSequence(
    ['moveimg','miniJS','miniCss','miniComponentsHtml'],
    ['miniHtml'],
    done
    )
})

gulp.task('default',['build']);

/*---------------------- 启动服务 ----------------------------*/
gulp.task('connect',['watch-less'],() => {
  return connect.server({
    name: 'linjiaServer',
    root: 'public',
    port: '3000'
  })
})

// 部署前启动gulp服务，测试代码是否正确
gulp.task('testDev',['build'],() => {
  return connect.server({
    name : 'testLinjiaServer',
    root : 'dist',
    port : '3001'
  })
})
