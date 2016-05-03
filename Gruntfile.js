module.exports = function(grunt) {
  grunt.loadTasks('grunt');

  grunt.registerTask('default', ['webpack-dev-server']);
};
