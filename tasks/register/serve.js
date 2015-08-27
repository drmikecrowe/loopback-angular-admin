module.exports = function (grunt) {
  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run([
        'build',
        'connect:dist:keepalive'
      ]);
    }

    if (target === 'debug') {
      return grunt.task.run([
        'clear:logs',
        'env:test',
        'clean:server',
        'includeSource:server',
        'ngconstant:dev',
        'wiredep:server',
        'loopback_sdk_angular:dev',
        'autoprefixer',
      ]);
    }

    // Running nodejs in a different process and displaying output on the main console
    //var nodemon = grunt.util.spawn({
    //	cmd:   'grunt',
    //	grunt: true,
    //	args:  'nodemon'
    //});
    //
    //nodemon.stdout.pipe(process.stdout);
    //nodemon.stderr.pipe(process.stderr);

    grunt.task.run([
      'env:setup',
      'clean:server',
      //'less:dev',
      'includeSource:server',
      'ngconstant:dev',
      'wiredep:server',
      //'loopback_sdk_angular:dev',
      'autoprefixer',
      //'concurrent:server',
      //'connect:livereload',
      //'watch',
      'env:test',
      'concurrent:dev'
      //'nodemon',
    ]);
  });
};

