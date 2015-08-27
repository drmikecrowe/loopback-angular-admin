module.exports = {
  options: {
    space: '  ',
    wrap:  '"use strict";\n\n {%= __ngModule %}',
    name:  'config'
  },
  dev:     {
    options:   {
      dest: '<%= yeoman.app %>/js/config.js'
    },
    constants: {
      ENV: {
        name:    'dev',
        apiUrl:  '<%= yeoman.api.dev %>',
        siteUrl: '<%= yeoman.site.dev %>'
      }
    }
  },
  prod:    {
    options:   {
      dest: '<%= yeoman.app %>/js/config.js'
    },
    constants: {
      ENV: {
        name:    'prod',
        apiUrl:  '<%= yeoman.api.prod %>',
        siteUrl: '<%= yeoman.site.prod %>'
      }
    }
  }
};
