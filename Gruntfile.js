/**
 * Created by Andrey on 31.01.2015.
 * skype: snaipi91;
 * mail: snaipi91@rambler.ru
 */
module.exports = function(grunt) {

    var config = {
        js: 'js',
        image: 'image'
    };

    grunt.initConfig({
        config: 'config',
        pkg: grunt.file.readJSON('package.json'),


        //concat: {
        //
        //},

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            }
        },

        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                'js/*.js'
            ]
        },

        watch: {
            scripts: {
                files: ['js/*.js'],
                tasks: ['jshint']
            },
            options: {
                livereload: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default',['uglify', 'jshint', 'watch']);
};