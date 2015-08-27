module.exports = {
  options: {
    jshintrc: '<%= yeoman.app %>/../../.jshintrc',
    reporter: 'node_modules/jshint-stylish/stylish.js'
  },
  all:     {
    src: ['Gruntfile.js', '<%= yeoman.app %>/modules/**/{,*/}*.js']
  },
  test:    {
    options: {
      jshintrc: '<%= yeoman.test %>/.jshintrc'
    },
    src:     ['<%= yeoman.test %>/spec/{,*/}*.js',
      '<%= yeoman.app %>/modules/**/*.spec.js'
    ]
  }
};
