module.exports = {
  bower:         {
    files: ['bower.json'],
    tasks: ['wiredep:server']
  },
  js:            {
    files:   ['<%= yeoman.app %>/js/*.js',
      '<%= yeoman.app %>/modules/**/{,*/}*.js',
      '!<%= yeoman.app %>/modules/**/*.spec.js'
    ],
    tasks:   [
      'includeSource:server', 'wiredep:server',
    ],		//'newer:jshint:all',
    options: {
      livereload: '<%= connect.options.livereload %>'
    }
  },
  jsTest:        {
    files:   ['<%= yeoman.app %>/modules/**/*.spec.js'],
    tasks:   ['newer:jshint:test', 'karma'],
    options: {
      livereload: '<%= connect.options.livereload %>'
    }
  },
  styles:        {
    files:   ['<%= yeoman.app %>/css/**/*.css'],
    tasks:   ['newer:copy:styles', 'autoprefixer'],
    options: {
      livereload: '<%= connect.options.livereload %>'
    }
  },
  less:          {
    files:   ['<%= yeoman.app %>/less/**/*.less'],
    tasks:   ['less:dev', 'newer:copy:styles', 'autoprefixer'],
    options: {
      livereload: '<%= connect.options.livereload %>'
    }
  },
  gruntfile:     {
    files: ['Gruntfile.js', 'tasks/**/*.js']
  },
  livereload:    {
    options: {
      livereload: '<%= connect.options.livereload %>'
    },
    files:   ['<%= yeoman.app %>/{,*/}*.html',
      '<%= yeoman.app %>/**/{,*/}*.html',
      '.tmp/css/**/*.css',
      '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
    ]
  },
  includeSource: {
    files: ['<%= yeoman.app %>/index.tpl.html'],
    tasks: ['includeSource:server']
  }
};
