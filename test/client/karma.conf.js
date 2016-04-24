module.exports = function (config) {
    "use strict";

    config.set({

        basePath: ".",

        files: [
            // angular code
            "../../public/bower_components/angular/angular.js",
            "../../public/bower_components/angular-ui-router/release/angular-ui-router.min.js",
            // test code
            "../../public/bower_components/angular-mocks/angular-mocks.js",
            "../../public/bower_components/underscore/underscore-min.js",
             "../../public/js/*.js",

            // source code
            "../../public/stories/*.js",
            "../../public/tasks/*.js",

            // test files
            "**/*.js"
        ],

        autoWatch: true,

        frameworks: ["jasmine"],

        browsers: ["Chrome"],

        plugins: [
            "karma-chrome-launcher",
            "karma-jasmine"
        ]
    });
};