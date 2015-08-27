module.exports = {
  server: {
    src:        ['<%= yeoman.app %>/index.html'],
    ignorePath: /\.\.\//
  },
  dist:   {
    src:        ['<%= yeoman.dist %>/index.html'],
    ignorePath: '../client/app/'
  }
};
