module.exports = function(grunt) {

  // Project configuration.

  grunt.initConfig({
  	sass: {
  		options: {
  			sourceMap: true
  		},
  		dist: {
  			files: {
  				'css/style.css': 'sass/style.sass'
  			}
  		}
  	},

  	imagemin: {
  		dynamic: {
  			files: [{
  				expand: true,
  				cwd: 'images/',
  				src: ['**/*.{png,jpg,gif}'],
  				dest: 'images/build/'
  			}]
  		}
  	},

  	watch: {
  		scripts: {
  			files: ['sass/*.sass'],
  			tasks: ['sass'],
  			options: {
  				spawn: false,
  			},
  		}
  	},

  	browserSync: {
    	bsFiles: {
        	src : 'css/*.css'
    },
    	options: {
        	server: {
            	baseDir: "./"
        	}
    	}
	}  	

  });

  // Load the plugins tasks

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');


  // Default task(s).

  grunt.registerTask('default', ['sass', 'imagemin', 'watch', 'browserSync']);
};

$(document).ready(function() {
	"use strict";
	$(".hexFront, .hexBack").click(function() {
	  $(".hexFront")
		.css({ transform: "rotateY(0deg)", opacity: 1 })
		.next()
		.css({ transform: "rotateY(180deg)", opacity: 0 })
	  
	  $(this)
		.css({ transform: "rotateY(180deg)", opacity: 0 })
		.next()
		.css({ transform: "rotateY(0deg)", opacity: 1 })
		.end().prev()
		.css({ transform: "rotateY(0deg)", opacity: 1 });
	});
  });