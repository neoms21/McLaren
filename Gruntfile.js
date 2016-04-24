"use strict";

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        watch: {
            files: ["**/*", "!**/node_modules/**", "!**public/bower_components/**"],
            tasks: ["watch-tasks"],
        },
        jshint: {
            files: [
                "test/client/*.js",
                "public/**/*.js"
            ],
            options: {
                ignores: [
                    "node_modules/**",
                    "public/bower_components/**",
                    "public/css/**",
                    "public/js/lib/**"
                ],
                jshintrc: true
            }
        },
        karma: {
            unit: {
                configFile: "test/client/karma.conf.js",
                background: false
            },
            singleRun: {
                configFile: "test/client/karma.conf.js",
                singleRun: true
            },
            continuous: {
                configFile: "test/client/karma.conf.js",
                singleRun: true,
                reporters: "dots",
                browsers: ["Chrome"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-karma");

    // running `grunt w` will startup karma and run the watch tasks
    grunt.registerTask("w", ["karma:unit:start", "watch"]);
    grunt.registerTask("watch-tasks", ["karma:unit:run"]);
};