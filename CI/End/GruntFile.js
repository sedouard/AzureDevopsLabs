///////////////////////////////////////////////////////////
///Main Grunt wrapper function
///////////////////////////////////////////////////////////
module.exports = function(grunt) {

  //initConfig will take our configuration object. This specifies which tasks
  //and plugins we want to use
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	//specify that we would like to use the uglify plugin with the build and option parameters
    uglify: {
      options: {
		//places a timestamp on top of our minified file
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      build: {
		//specifies source file(s) and destination.
        src: 'app.js',
		    dest: 'app.min.js'
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['tests/**/*.js']
      }
    }
  });

	
  ///////////////////////////////////////////////////////////
  ///Load the uglify plugin and setting it as the default task
  ///////////////////////////////////////////////////////////
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.registerTask('default', ['uglify', 'mochaTest']);

};