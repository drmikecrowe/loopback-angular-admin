module.exports = function (grunt) {
  grunt.registerTask('loopback', [
    'env:dev',
    'env:setup',
    'ngconstant:dev',
    'includeSource:server',
    'wiredep:server',
    'autoprefixer',
    'loopback_sdk_angular:dev',
  ]);
};
