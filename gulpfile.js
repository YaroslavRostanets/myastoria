// [ БАЗОВІ НАЛАШТУВАННЯ ]
var gulp = require('gulp'), //Відповідно сам gulp
    concat = require('gulp-concat'), //Обєднання файлів
    rename = require("gulp-rename"), //Перейменування файлів
    sourcemaps = require('gulp-sourcemaps'), //Робота з переліком файлів
    watch = require('gulp-watch'); //Наглядачі

//Сервер для розробки
var cached = require('gulp-cached'), //Кешування файлів для прискорення обробки в память
    remember = require('gulp-remember'), //
    connect = require('gulp-connect'); //Livereload Server

// [ ОБРОБКА ]
// [ LESS ]
var less = require('gulp-less'); //Підключення LESS
// [ SASS ]
var compass = require('gulp-compass'), //Підключення COMPAS
    scss = require('gulp-sass'); //Підключення SASS

//Вихідна обобка файлів CSS, JS
var uglify = require('gulp-uglify'), //Архівація JS файлів
    minifyCss = require('gulp-minify-css'), //Архівація CSS файлів
    cssBase64 = require('gulp-css-base64'); //transform all resources found in a CSS into base64-encoded data URI strings
//You can ignore a resource with a comment /*base64:skip*/ in CSS file after url definition.

//var gulpif = require('gulp-if'),
var sprite = require('gulp-sprite-generator');

//Вихідна обобка файлів JPG, PNG
var imagemin = require('gulp-imagemin'), //Обробка зображень
    imagePngquant = require('imagemin-pngquant'), //Обробка зображень формату PNG
    imageminJpegtran = require('imagemin-jpegtran'), //Обробка зображень формату JPG
    imageSvgo = require('imagemin-svgo'), //Обробка зображень формату SVG
    imageResize = require('gulp-image-resize'); //

// [ ТЕСТУВАННЯ ]
//Перевірка коду
var jshint = require('gulp-jshint'), //Перевірка JS
    stylish = require('jshint-stylish'), //Stylish
//cssLint = require('gulp-csslint'); //Перевірка CSS
    scssLint = require('gulp-scss-lint'); //Перевірка SCSS
//gem install scss-lint  !!ОБОВЯЗКОВО


//Джерела
var dev_patches = {
    'js': ['./src/js/*'],
    'font': ['./src/font/*'],
    'less': ['./src/less/**/*.less'],
    'scss': ['./src/scss/**/*.scss'],
    'css': ['./src/css/main.css'],
    'css-base': './src/css/',
    'images-jpg': ['./src/img/**/*.jpg', './src/img/*.jpg'],
    'images-svg': ['./src/img/**/*.svg'],
    'images-png': ['./src/img/**/*.png'],
    'images': ['./src/img/**/*'],
    'images-css': ['./src/imgcss']
};
//Точки слідування
var build_patches = {
    'images': './dist/img/',
    'js': './dist/js/',
    'css': './dist/css/',
    'font': './dist/font/'
};
//Джерела точок слідування
var build_patches_copy_list = {
    'images': './dist/img/**/*',
    'js': './dist/js/**/*',
    'css': './dist/css/**/*',
    'font': './dist/font/**/*'
};

//build yii patches
//Для копіювання до теми фреймворку
var yii_base_path = '../web';
var yii_patches = {
    'images': yii_base_path + '/img/',
    'js': yii_base_path + '/js/',
    'css': yii_base_path + '/css/',
    'font': yii_base_path + '/font/'
};

// [ ЗАВДАННЯ ТЕСТОВІ ]
//------------------------------------------------------------------------

// [ ПРОГРАМА ]
// [ НАЛАШТУВАННЯ SERVER ]
// Rerun the task when a file changes
gulp.task('watch', function () {
    gulp.watch(dev_patches['js'], ['scripts']);
    gulp.watch(dev_patches['images'], ['images']);
    gulp.watch(dev_patches['css'], ['minify-css']);
    gulp.watch(dev_patches['scss'], ['scss']);
    gulp.watch(dev_patches['less'], ['less']);
    gulp.watch(dev_patches['font'], ['font']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'scss', 'less', 'scripts', 'images', 'minify-css']);
//'webserver', 'livereload', 'base64'
//------------------------------------------------------------------------

//Копіювання файлів у тему
gulp.task('yii:build', function () {
    gulp.src(build_patches_copy_list['images']).pipe(gulp.dest(yii_patches['images']));
    gulp.src(build_patches_copy_list['js']).pipe(gulp.dest(yii_patches['js']));
    gulp.src(build_patches_copy_list['css']).pipe(gulp.dest(yii_patches['css']));
    gulp.src(build_patches_copy_list['font']).pipe(gulp.dest(yii_patches['font']));
});

gulp.task('font', function () {
    gulp.src(dev_patches['font'])
        .pipe(gulp.dest(build_patches['font']));
});

//------------------------------------------------------------------------

// generate sprite.png and _sprite.scss
//gulp.task('sprites', function () {
//    return gulp.src('./build/imgsprite/*.png')
//        .pipe(sprite({
//            name: 'sprite',
//            style: '_sprite.scss',
//            cssPath: './img',
//            //processor: 'scss'
//        }))
//        .pipe(gulpif('*.png', gulp.dest('./build/img/'), gulp.dest('./build/css/')))
//});
//
gulp.task('sprites', function () {
    var spriteOutput;

    spriteOutput = gulp.src("./src/css/*.css")
        .pipe(sprite({
            //baseUrl: "./build",
            spriteSheetName: "sprite.png",
            spriteSheetPath: "../img"
        }));

    spriteOutput.css.pipe(gulp.dest("./src/css1"));
    spriteOutput.img.pipe(gulp.dest("./src/img"));
});

// [ ЗАВДАННЯ ]
//------------------------------------------------------------------------

// [ НАЛАШТУВАННЯ SERVER ]
//gulp.task('webserver', function () {
//    connect.server({
//        port: 8088,
//        livereload: true
//    });
//});
//
//gulp.task('livereload', function () {
//    gulp.src(['./**/*'])
//            .pipe(connect.reload());
//});
//------------------------------------------------------------------------

// [ ОБРОБКА COMPASS ]
gulp.task('compass', function () {
    gulp.src(dev_patches['scss'])
    // .pipe(plumber({
    //   errorHandler: function (error) {
    //     console.log(error.message);
    //     this.emit('end');
    // }}))
        .pipe(compass({
            css: dev_patches['css-base'],
            sass: 'scss',
            image: 'images'
        }))
        .on('error', console.log)
        .pipe(gulp.dest(dev_patches['css-base']))
        .pipe(minifyCss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(build_patches['css']));
});

//------------------------------------------------------------------------

// [ ОБРОБКА LESS ]
gulp.task('less', function () {
    return gulp.src(dev_patches['less'])
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.less'}))
        .pipe(gulp.dest(dev_patches['css-base']));
});

//------------------------------------------------------------------------

// [ ОБРОБКА SASS ]
//['lintSCSS']
gulp.task('scss', function () {
    return gulp.src(dev_patches['scss'])
        .pipe(sourcemaps.init())
        .pipe(scss())
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: ''}))
        .pipe(gulp.dest(dev_patches['css-base']));
});

// [ ПЕРЕВІРКА КОДУ SCSS ]
gulp.task('lintSCSS', function () {
    return gulp.src(dev_patches['scss'])
        .pipe(cached('lintingCSS'))
        .on('error', console.log)
        .pipe(scssLint({
            // 'maxBuffer': 307200
        }));
});
//------------------------------------------------------------------------

// [ ОБРОБКА CSS ]
//Мінімізація CSS файлів
gulp.task('minify-css', function () {
    return gulp.src(dev_patches['css'])
    //.pipe(cssBase64())
        .pipe(rename({
            'suffix': '.min'
        }))
        .pipe(minifyCss())
        .on('error', console.log)
        .pipe(gulp.dest(build_patches['css']))
        .pipe(connect.reload());
});

// [ ПЕРЕВІРКА КОДУ CSS ]
gulp.task('lintCSS', function () {
    return gulp.src(dev_patches['css'])
        .pipe(cached('lintingCSS'))
        .pipe(cssLint())
        .on('error', console.log)
        // .pipe(jshint.reporter('default'));
        .pipe(cssLint.reporter('jshint-stylish'));
});

//------------------------------------------------------------------------

// [ ОБРОБКА JS ]
// [ COMMON JS TASK ]
gulp.task('scripts', ['minify-js', 'lintJS'], function () {
    return gulp.src(dev_patches['js'])
        .pipe(remember('lintingJS'))
        .pipe(concat('main.js'))
        .on('error', console.log)
        .pipe(gulp.dest(build_patches['js']));
});

// [ МІНІФІКАЦІЯ JS ]
gulp.task('minify-js', function () {
    return gulp.src(build_patches['scripts'] + 'main.js')
        .pipe(rename(build_patches['scripts'] + 'main.min.js'))
        .pipe(uglify())
        .on('error', console.log)
        .pipe(gulp.dest('.'));
});

// [ ПЕРЕВІРКА КОДУ JS ]
gulp.task('lintJS', function () {
    return gulp.src(dev_patches['js'])
        .pipe(cached('lintingJS'))
        .pipe(jshint())
        // .pipe(jshint.reporter('default'));
        .pipe(jshint.reporter('jshint-stylish'));
});
//------------------------------------------------------------------------

// [ ОБРОБКА ЗОБРАЖЕНЬ ]
gulp.task('images', ['image-jpg', 'image-png', 'image-svg']);

// [ ОБРОБКА JPG ]
gulp.task('image-jpg', function () {
    return gulp.src(dev_patches['images-jpg'])
    // .pipe(imageminJpegtran({progressive: true})())
    // .on('error', console.log)
        .pipe(gulp.dest(build_patches['images']));
});

// [ ОБРОБКА PNG ]
gulp.task('image-png', function () {
    return gulp.src(dev_patches['images-png'])
        .pipe(imagemin({
            use: [imagePngquant()]
        }))
        .on('error', console.log)
        .pipe(gulp.dest(build_patches['images']));
});

// [ ОБРОБКА SVG ]
gulp.task('image-svg', function () {
    return gulp.src(dev_patches['images-svg'])
        .pipe(imagemin({
            svgoPlugins: [{removeViewBox: false}],
        }))
        .on('error', console.log)
        .pipe(gulp.dest(build_patches['images']));
});
//------------------------------------------------------------------------

// [ ПЕРЕВІРКА КОДУ ]

// [ ПЕРЕВІРКА КОДУ HTML ]
gulp.task('lintHTML', function () {
    return gulp.src('./src/*.html')
        .pipe(cache('lintingHTML'))
        // if flag is not defined default value is 'auto'
        .pipe(jshint.extract('auto|always|never'))
        .pipe(jshint())
        // .pipe(jshint.reporter('default'));
        .pipe(jshint.reporter('jshint-stylish'));
});

//------------------------------------------------------------------------