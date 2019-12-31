/*global require, module*/

module.exports = function(grunt) {
	'use strict';

	// load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({

		// watch for changes and trigger compass, jshint, uglify and livereload
		watch: {
			options: {
				livereload: true,
			},
			compass: {
				files: ['develop/scss/**/*.{scss,sass}'],
				tasks: ['compass']
			},
			js: {
				files: ['<%= jshint.all %>', 'Scripts/**/*.js'],
				tasks: ['jshint', 'uglify']
			},
			img: {
				files: ['develop/images/*.{png,jpg,jpeg}'],
				tasks: ['imagemin']
			},
			livereload: {
				files: ['*.html', '**/*.php']
			}
		},

		// compass and scss
		compass: {
			dist: {
				options: {
					config: 'config.rb',
					force: true
				}
			}
		},

		// javascript linting with jshint
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				"force": true
			},
			all: [
				'Gruntfile.js',
				'assets/js/source/**/*.js'
			]
		},

		uglify: {
			dist: {
				options: {
					sourceMap: 'assets/js/map/source-map.js',
					sourceMappingURL: 'map/source-map.js',
					sourceMapRoot: '/'
				},
				files: {
					'assets/js/main.min.js': [
						'assets/vendor/jquery-1.10.2.js',
						'assets/vendor/waypoints.js',
						'assets/vendor/fastclick.js',
						'assets/vendor/jquery.cycle2.js',
						'assets/vendor/jquery.cycle2.center.js',
						'assets/vendor/jquery.cycle2.swipe.js',
						'assets/vendor/iscroll.js',
						'assets/vendor/jquery.colorbox.js',
						'assets/vendor/jquery.cookie.js',
						'assets/js/source/main.js'
					]
				}
			}
		},

		// image optimization
		imagemin: {
			dist: {
				options: {
					optimizationLevel: 7,
					progressive: true
				},
				files: [{
					expand: true,
					cwd: 'develop/images',
					src: '**/*',
					dest: 'assets/images'
				}]
			}
		},

	});

	// register task
	grunt.registerTask('default', ['watch']);

};