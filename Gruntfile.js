/*!
 * Gruntfile for Command Palette
 * Christopher Parsons <cparsons@habaneroconsulting.com>
 * Habanero Consulting Group - Licensed under MIT
 */

module.exports = function (grunt) {
	'use strict';

	/**
	 * Load required Grunt tasks.
	 */
	require('load-grunt-tasks')(grunt);

	/**
	 * Task configuration
	 */
	var taskConfig = {
		dirs: {
			build: 'build',
			source: 'source',
			tmp: '.tmp',
			vendor: '<%= dirs.source %>/vendor'
		},

		files: {
			main: 'commandpalette.js'
		},

		pkg: grunt.file.readJSON('package.json'),

		clean: {
			build: '<%= dirs.build %>/*',
			temp: '<%= dirs.tmp %>'
		},

		jscs: {
			options: {
				config: '.jscsrc'
			},
			source: [
				'<%= dirs.source %>/*.js',
				'<%= dirs.source %>/commands/*.js'
			]
		},

		jshint: {
			gruntfile: [
				'Gruntfile.js'
			],
			options: {
				jshintrc: '.jshintrc',
				ignores: ['/**/*.min.js']
			},
			source: [
				'<%= dirs.source %>/*.js',
				'<%= dirs.source %>/commands/*.js',
				'!<%= dirs.source %>/commands/site-actions.js'
			]
		},

		uglify: {
			plugin: {
				files: [
					{
						expand: true,
						cwd: '<%= dirs.source %>',
						src: [
							'**/*.js',
							'!vendor/**/*.min.js'
						],
						dest: '<%= dirs.tmp %>/',
						ext: '.min.js'
					}
				],
				options: {
					preserveComments: 'some'
				}
			}
		},

		concat: {
			source: {
				files: {
					'<%= dirs.build %>/sp2013-commandpalette.min.js': [
						'<%= dirs.tmp %>/command-constants.min.js',
						'<%= dirs.tmp %>/command-util.min.js',
						'<%= dirs.tmp %>/commands/*.js',
						'<%= dirs.tmp %>/command-palette.min.js'
					]
				},
				options: {
					banner: '/*!\r\n * sp2013-commandpalette.min.js\r\n * Habanero Consulting Group\r\n * Licensed under MIT\r\n */\r\n\r\n',
					separator: '\r\n\r\n'
				}
			},
			pkg: {
				files: {
					'<%= dirs.build %>/sp2013-commandpalette.pkg.min.js': [
						'<%= dirs.tmp %>/vendor/**/*.js',
						'<%= dirs.vendor %>/**/*.min.js',
						'<%= dirs.tmp %>/command-constants.min.js',
						'<%= dirs.tmp %>/command-util.min.js',
						'<%= dirs.tmp %>/commands/*.js',
						'<%= dirs.tmp %>/command-palette.min.js'
					]
				},
				options: {
					banner: '/*!\r\n * sp2013-commandpalette.pkg.min.js\r\n * Habanero Consulting Group\r\n * Licensed under MIT\r\n */\r\n\r\n',
					separator: '\r\n\r\n'
				}
			}
		},

		shell: {
			bower: {
				options: {
					stdout: true
				},
				command: 'bower-installer'
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
	grunt.registerTask('bower', [
		'shell'
	]);

	grunt.registerTask('build', [
		'clean', 'jscs', 'jshint', 'uglify', 'concat', 'clean:temp'
	]);

	grunt.registerTask('serve', [
		'build', 'watch'
	]);

	grunt.registerTask('default', [
		'build'
	]);
};
