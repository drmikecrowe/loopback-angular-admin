module.exports = {
  default:          {
    src:     ['<%= yeoman.app %>/app/js/app.js',
      '<%= yeoman.app %>/app/modules/**/*.js',
      '!*.spec.js',
      'common/**/*.js',
      'server/**/*.js'
    ],
    options: {
      config: '.jsbeautifyrc'
    }
  },
  'git-pre-commit': {
    src:     ['src/**/*.js'],
    options: {
      mode: 'VERIFY_ONLY'
    }
  }
};
