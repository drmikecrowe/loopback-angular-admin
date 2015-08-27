module.exports = {
  html:    ['<%= yeoman.dist %>/{,*/}*.html'],
  css:     ['<%= yeoman.dist %>/css/**/*.css'],
  options: {
    assetsDirs: ['<%= yeoman.dist %>', '<%= yeoman.dist %>/images']
  }
};
