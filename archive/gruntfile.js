module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    htmlmin: {                                     // Task
      dist: {                                      // Target
      options: {                                 // Target options
        removeComments: true,
        collapseWhitespace: true
      },
      files: [{                                  // Dictionary of files
        expand: true,
        cwd: 'src/',                             // Project root
        src: ['index.html','jobs.html','jobs-thanks.html'],                        // Source
        dest: 'prod/'                            // Destination
        }]
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.registerTask('default', ['htmlmin']);

};