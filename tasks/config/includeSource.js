module.exports = {
  options: {
    basePath:  'client/app',
    baseUrl:   '/',
    templates: {
      html: {
        js:  '<script src="{filePath}"></script>',
        css: '<link rel="stylesheet" href="{filePath}" />'
      }
    }
  },
  server:  {
    files: {
      'client/app/index.html': '<%= yeoman.app %>/index.tpl.html'
    }
  },
  dist:    {
    files: {
      'dist/index.html': '<%= yeoman.app %>/index.tpl.html'
    }
  }
};
