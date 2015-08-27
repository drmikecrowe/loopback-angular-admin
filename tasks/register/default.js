module.exports = function (grunt) {
  grunt.registerTask('default', [
    'env:setup',
    //'newer:jshint',
    'test',
    'ngconstant:dev',
    'loopback_sdk_angular:dev',
    'docular',
    'nggettext_extract',
    'nggettext_compile',
    'build'
  ]);
};
