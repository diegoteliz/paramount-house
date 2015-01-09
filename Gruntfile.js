module.exports = function(grunt) {

    'use strict';

    var COPYRIGHT = '/*\n Paramount House 2.0 Copyright (c) 2014.\n Diego Teliz - All Rights Reserved.\n Go to: https://github.com/diegoteliz/paramount-house for details.\n*/\n';

    // Project configuration
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        clean: {
            prod: ['www/*']
        },

        compass: {
            dev: {
                options: {
                    sassDir: 'sass',
                    cssDir: 'css',
                    cacheDir: '.tmp/.sass-cache',
                    noLineComments: true,
                    banner: COPYRIGHT,
                    specify: 'sass/*.scss',
                    outputStyle: 'expanded'
                }
            },
            prod: {
                options: {
                    sassDir: 'sass',
                    cssDir: 'www/css',
                    cacheDir: '.tmp/.sass-cache',
                    noLineComments: true,
                    banner: COPYRIGHT,
                    specify: 'sass/*.scss',
                    outputStyle: 'compressed'
                }
            }
        },

        connect: {
            dev: {
                options: {
                    port: 9001,
                    hostname: '*',
                    livereload: true,
                    open: {
                        target: 'http://127.0.0.1:9001'
                    }
                }
            },
            prod: {
                options: {
                    port: 9002,
                    base: 'www',
                    hostname: '*',
                    open: {
                        target: 'http://127.0.0.1:9002'
                    }
                }
            }
        },

        copy: {
            prod: {
                src: [
                    'font/**',
                    'img/**',
                    'js/vendor/**',
                    'template/**',
                    'index.html'
                ],
                dest: 'www/'
            }
        },

        csslint: {
            options: {
                'adjoining-classes': false,
                'box-model': false,
                'box-sizing': false,
                'compatible-vendor-prefixes': true,
                'empty-rules': true,
                'errors': true,
                'display-property-grouping': true,
                'duplicate-background-images': true,
                'duplicate-properties': true,
                'fallback-colors': true,
                'floats': true,
                'font-faces': true,
                'font-sizes': false,
                'gradients': true,
                'ids': false,
                'import': true,
                'important': true,
                'known-properties': true,
                'outline-none': false,
                'overqualified-elements': true,
                'qualified-headings': false,
                'regex-selectors': true,
                'shorthand': true,
                'star-property-hack': true,
                'text-indent': true,
                'underscore-property-hack': true,
                'unique-headings': false,
                'universal-selector': true,
                'unqualified-attributes': true,
                'vendor-prefix': true,
                'zero-units': true
            },
            dev: {
                src: ['css/**/*.css']
            },
            prod: {
                src: ['www/css/**/*.css']
            }
        },

        jshint: {
            options: {
                camelcase: true,
                curly: true,
                eqeqeq: true,
                indent: 4,
                latedef: true,
                newcap: true,
                noempty: true,
                nonew: true,
                quotmark: 'single',
                strict: true,
                globals: {
                    jQuery: true
                }
            },
            src: ['Gruntfile.js', 'js/main.js', 'js/app/**/*.js']
        },

        requirejs: {
            compile: {
                options: {
                    baseUrl: 'js',
                    mainConfigFile: 'js/main.js',
                    name: 'main',
                    optimize: 'uglify2',
                    paths: {
                        jquery: 'empty:',
                        underscore: 'empty:',
                        backbone: 'empty:'
                    },
                    preserveLicenseComments: false,
                    out: 'www/js/main.js'
                }
            }
        },

        watch: {
            compass: {
                files: 'sass/**/*.scss',
                tasks: ['compass', 'csslint']
            },
            scripts: {
                files: ['Gruntfile.js', 'js/main.js', 'js/app/**/*.js'],
                tasks: ['jshint']
            },
            livereload: {
                files: [
                    'img/**/*',
                    'css/**/*.css',
                    'js/**/*.js',
                    'template/**/*.html',
                    'index.html'
                ],
                options: {
                    livereload: true
                }
            }
        }

    });

    // Load plugin tasks
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Tasks
    grunt.registerTask('default', ['dev']);
    grunt.registerTask('dev', [
        'compass:dev',
        'connect:dev',
        'jshint',
        'csslint:dev',
        'watch'
    ]);
    grunt.registerTask('prod', [
        'clean',
        'copy',
        'compass:prod',
        'requirejs',
        //'connect:prod',
        'jshint',
        'csslint:prod',
        //'watch'
    ]);

};