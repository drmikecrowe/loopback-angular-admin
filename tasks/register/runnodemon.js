module.exports = function (grunt) {
  grunt.registerTask('runnodemon', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
      cmd:   'grunt',
      grunt: true,
      args:  'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);
    grunt.task.run('wait');

    // here you can run other tasks e.g.
    // grunt.task.run([ 'watch' ]);

  });
};
