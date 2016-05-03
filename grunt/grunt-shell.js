module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-shell');

  grunt.config.set('shell', {
    deploy: __dirname + '/ghpages.sh',
  });
};
