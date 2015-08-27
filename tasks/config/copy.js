module.exports = {
  dist:   {
    files: [{
      expand: true,
      dot:    true,
      cwd:    '<%= yeoman.app %>',
      dest:   '<%= yeoman.dist %>',
      src:    ['*.{ico,png,txt}',
        '.htaccess',
        'modules/**/{,*/}*.html',
        'images/{,*/}*.*',
        'fonts/{,*/}*.*'
      ]
    }, {
      expand: true,
      cwd:    '<%= yeoman.app %>/images',
      dest:   '<%= yeoman.dist %>/images',
      src:    ['generated/*']
    }, {
      expand: true,
      cwd:    '<%= yeoman.app %>/css',
      dest:   '<%= yeoman.dist %>/css',
      src:    ['generated/*']
    }, {
      expand: true,
      cwd:    '<%= yeoman.app %>/bower_components/bootstrap/dist',
      src:    'fonts/*',
      dest:   '<%= yeoman.dist %>'
    }, {
      expand: true,
      cwd:    '<%= yeoman.app %>/bower_components/ionicons',
      src:    'fonts/*',
      dest:   '<%= yeoman.dist %>'
    }, {
      expand: true,
      cwd:    '<%= yeoman.app %>/bower_components/font-awesome',
      src:    'fonts/*',
      dest:   '<%= yeoman.dist %>'
    }]
  },
  styles: {
    expand: true,
    cwd:    '<%= yeoman.app %>/css',
    dest:   '.tmp/css/',
    src:    '**/*.css'
  }
};
