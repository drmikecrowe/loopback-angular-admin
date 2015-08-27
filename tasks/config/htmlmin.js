module.exports = {
  dist: {
    options: {
      collapseWhitespace:            true,
      conservativeCollapse:          true,
      collapseBooleanAttributes:     true,
      removeCommentsFromCDATA:       true,
      removeOptionalTags:            true,
      removeAttributeQuotes:         true,
      removeComments:                true,
      removeEmptyAttributes:         true,
      removeRedundantAttributes:     true,
      removeScriptTypeAttributes:    true,
      removeStyleLinkTypeAttributes: true,
      minifyJS:                      true
    },
    files:   [{
      expand: true,
      cwd:    '<%= yeoman.dist %>',
      src:    ['*.html', 'modules/**/views/{,*/}*.html'],
      dest:   '<%= yeoman.dist %>'
    }]
  }
};
