module.exports = {
  html:    '<%= yeoman.dist %>/index.html',
  options: {
    dest: '<%= yeoman.dist %>',
    root: '<%= yeoman.app %>',
    flow: {
      html: {
        steps: {
          js:  ['concat', 'uglifyjs'],
          css: ['cssmin']
        },
        post:  {}
      }
    }
  }
};
