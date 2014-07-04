/*!
 * Gruntfile for Command Palette
 * Christopher Parsons <cparsons@habaneroconsulting.com>
 * Habanero Consulting Group - Licensed under MIT
 */

module.exports = function(grunt) {

    /**
     * Load required Grunt tasks.
     */
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    /**
     * Task configuration
     */
    var taskConfig = {
        dirs: {
            build: 'build',
            source: 'source',
            vendor: '<%= dirs.source %>/vendor'
        },

        files: {
            main: 'commandpalette.js'
        },

        pkg: grunt.file.readJSON('package.json'),

        clean: {
            build: '<%= dirs.build %>/*'
        },

        jshint: {
            source: [ 
                '<%= dirs.source %>/*.js'
            ],
            gruntfile: [
                'Gruntfile.js'
            ],
            options: {
                ignores: ['/**/*.min.js'],
                curly: true,
                immed: true,
                newcap: false,
                noarg: true,
                debug: true,
                sub: true,
                boss: true,
                eqnull: true,
                multistr: true,
                scripturl: true,
                smarttabs: true,
                '-W099': true,
                loopfunc: true
            }
        },

        uglify: {
            plugin: {
                files: {
                    '<%= dirs.build %>/<%= files.main %>': [
                        '<%= dirs.vendor %>/*',
                        '<%= dirs.source %>/commands.js',
                        '<%= dirs.source %>/commandpalette.js'
                    ]
                },
                options: {
                    preserveComments: 'some'
                }
            }
        },

        watch: {
            scripts: {
                files: ['<%= dirs.source %>/**/*.js'],
                tasks: ['build']
            }
        }
    };

    grunt.initConfig(taskConfig);


    /**
     * Register tasks
     */
    grunt.registerTask('build', [
        'jshint', 'uglify'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);
};