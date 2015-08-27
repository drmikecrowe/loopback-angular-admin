module.exports = function (grunt) {
  grunt.registerTask('clear', 'Clear various items', function (target) {
    if (target == 'db') {
      return grunt.util.spawn({
        cmd:   'mongo',
        grunt: false,
        args:  ['prtest', '--eval', 'db.dropDatabase();']
      }, function (err, results) {
        if (err) console.log(err);
      });
    }

    if (target == 'logs') {
      return grunt.util.spawn({
        cmd:   'bash',
        grunt: false,
        args:  ['clear_logs.sh']
      }, function (err, results) {
        if (err) console.log(err);
      });
    }
  });
};
