module.exports = {
  server:  ['copy:styles'],
  test:    ['copy:styles'],
  dist:    ['copy:styles', 'imagemin', 'svgmin'],
  //dev:     ['connect:livereload', 'nodemon'],
  dev:     ['watch', 'nodemon'],
  options: {
    logConcurrentOutput: true
  }
};
