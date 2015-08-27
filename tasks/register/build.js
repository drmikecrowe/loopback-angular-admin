module.exports = function (grunt) {
  grunt.registerTask('build', [
    'clean:dist',
    'test',
    'ngconstant:prod',
    'loopback_sdk_angular:prod',
    'includeSource:dist',
    'less:prod',
    'wiredep:dist',
    'useminPrepare',
    //'concurrent:dist',
    //'autoprefixer',
    'concat',
    'ngAnnotate',
    'copy:dist',
    //'cdnify',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
  ]);
};
