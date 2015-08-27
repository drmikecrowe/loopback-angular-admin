module.exports = function (grunt) {
  grunt.registerTask('gettext', [
    'nggettext_extract',
    'nggettext_compile'
  ]);
};
