/* jshint node: true */

module.exports = function(grunt) {
	"use strict";
	
	var fs = require('fs'), pkginfo = grunt.file.readJSON("package.json");

	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);
	

	// Project configuration.
	grunt.initConfig({

		pkg: pkginfo,
		banner: '/*!\n' +
			'* bi-Framework v<%= pkg.version %> - Direitos Reservados <%= grunt.template.today("dd") %> <%= grunt.template.today("mm") %> <%= grunt.template.today("yyyy") %>. \n' +
			'* Uso Restrito a SSM - Sala de Situação Municipal.\n' +
			'*/\n',
		jqueryCheck: 'if (!jQuery) { throw new Error(\"jQuery Ausente\") }\n\n',

		clean: {
            dist: ['dist']
        },
		recess: {
			options: {
				compile: true,
				banner: '<%= banner %>'
			},
			style: {
				options: {
					compress: false
				},
				src: ['less/bootstrap.less'],
				dest: 'dist/css/<%= pkg.name %>.css'
			},
			stylemin: {
				options: {
					compress: true
				},
				src: ['less/bootstrap.less'],
				dest: 'dist/css/<%= pkg.name %>.min.css'
			},
			responsive: {
				options: {
					compress: false
				},
				src: ['less/responsive.less'],
				dest: 'dist/css/<%= pkg.name %>-responsive.css'
			},
			responsivemin: {
				options: {
					compress: true
				},
				src: ['less/responsive.less'],
				dest: 'dist/css/<%= pkg.name %>-responsive.min.css'
			}
		},
		copy: {
			fonts: {
				cwd: 'fonts',
				src: '**/*',
				dest: 'dist/fonts',
				expand: true
			},
			docfonts: {
				cwd: 'dist',
				src: 'fonts/*',
				dest: 'docs/assets/',
				expand: true
			},
			docslib: {
				cwd: 'dist',
				src: 'css/**/*',
				dest: 'docs/assets/',
				expand: true
			}
		},
		connect: {
			server: {
				options: {
					port: 3001,
					keepalive: true,
					base: './docs'
				}
			}
		},
		watch: {
			recess: {
				files: 'less/*.less',
				tasks: ['recess', 'copy:docslib']
			}
		},
		hogan: {
        //desired target name
        mytarget : {
          //Wildcard of desired templates
          src : ['docs/templates/pages/*.mustache', 'view/wcw/*.hogan'],
          //output destination
          dest : 'hulkingup.js'
        }
    }
	});

	// These plugins provide necessary tasks.
	grunt.loadTasks('tasks');

	// Register grunt tasks
	grunt.registerTask("default", [
		"clean",
		"recess",
		"copy"
	]);

	grunt.registerTask("dev", [
		"watch"
	]);

	grunt.registerTask("connect", [
		"connect"
	]);
	
	grunt.registerTask("docs", [
		"hogan"
	]);
};
