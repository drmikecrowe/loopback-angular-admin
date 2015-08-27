module.exports = function (grunt) {
  grunt.registerTask('test', [
    'clean:server',
    'includeSource:server',
    'wiredep:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test'
  ]);
};
