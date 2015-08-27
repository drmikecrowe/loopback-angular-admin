module.exports = function (grunt, options) {
  var t = {
    options:    {
      port:       9000,
      hostname:   '<%= yeoman.host %>',
      livereload: true
    },
    livereload: {
      options: {
        middleware: function (connect) {
          return [
            require('connect-livereload')(),
            connect.static('.tmp'),
            connect().use(
              '/bower_components',
              connect.static('./bower_components')
            ),
            connect.static(options.yeoman.app)
          ];
        }
      }
    },
    dist:       {
      options: {
        open: true,
        base: '<%= yeoman.dist %>'
      }
    }
  };
  return t;
};
