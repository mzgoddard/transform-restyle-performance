module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-webpack');

  grunt.config.set('webpack', {
    dev: require('../webpack.config'),
  });

  grunt.config.set('webpack-dev-server', {
    dev: {
      host: '0.0.0.0',
      port: 8082,
      hot: true,
      inline: true,
      keepalive: true,
      webpack: require('../webpack.config'),
    },
  });
};
