module.exports = {
  dist: {
    files: [{
      expand: true,
      cwd:    '.tmp/concat/scripts',
      src:    ['*.js',
        '!lb-services.js',
        '!config.js',
        '!oldieshim.js',
        '!*.spec.js'
      ],
      dest:   '.tmp/concat/scripts'
    }]
  }
};
