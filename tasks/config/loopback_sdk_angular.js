module.exports = {
  services: {
    options: {
      input:  'server/server.js',
      output: '<%= yeoman.app %>/js/lb-services.js',
      apiUrl: process.env.API_URL
    }
  },
  dev:      {
    options: {
      input:  'server/server.js',
      output: '<%= yeoman.app %>/js/lb-services.js',
      apiUrl: process.env.API_URL
    }
  },
  prod:     {
    options: {
      input:  'server/server.js',
      output: '<%= yeoman.app %>/js/lb-services.js',
      apiUrl: '<%= yeoman.api.prod %>'
    }
  }
};
