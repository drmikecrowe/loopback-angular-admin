module.exports = {
  pot: {
    files: {
      'po/template.pot': ['<%= yeoman.app %>/modules/**/*.js',
        '<%= yeoman.app %>/modules/**/**/*.js',
        '<%= yeoman.app %>/modules/*/views/*.html',
        '<%= yeoman.app %>/modules/*/views/**/*.html',
        '!<%= yeoman.app %>/modules/**/*.spec.js'
      ]
    }
  }
};
