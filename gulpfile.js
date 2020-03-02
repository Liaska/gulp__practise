const gulp = require("gulp"),
      rename = require("gulp-rename"),
      sass = require("gulp-sass"),
      autoprefixer  = require("gulp-autoprefixer"),
      sourcemaps  = require("gulp-sourcemaps"),
      browserSync = require("browser-sync").create(),
      pug = require("gulp-pug"),
      plumber = require('gulp-plumber');


function css_style (done) {
    gulp.src("./scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: "compressed",
    }))
    .on("error", console.error.bind(console))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false
    }))
    .pipe(rename({suffix: ".min"}))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./build/css/"))
    .pipe(browserSync.stream())

    done()
}



function html_pug (done) {
    gulp.src('./pug/**/*.pug')
        .pipe(plumber())
        .pipe(pug({pretty: '\t'}))
        .pipe(gulp.dest("./"))
        .pipe(browserSync.stream())

    done();
};

function watchFiles () {
    gulp.watch("./scss/**/*",css_style);
    gulp.watch('./**/*.pug', html_pug);
    gulp.watch("./**/*.html",browserReload);
    gulp.watch("./**/*.js",browserReload);
    gulp.watch("./**/*.js",browserReload);
}

function sync (done) {
    browserSync.init({
        server: {
            baseDir: "./",
        },
        port: 3000,
    })

    done();
}

function browserReload (done) {
    browserSync.reload();
    done();
}



gulp.task(html_pug);
gulp.task("default", gulp.parallel(sync, watchFiles));


// gulp.task("default", gulp.series(sync, watchSass));

// gulp.task(css_style);
// exports.default = defaultTask;
