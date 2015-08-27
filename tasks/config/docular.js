module.exports = {
  useHtml5Mode:          true,
  docular_webapp_target: 'docs',
  showAngularDocs:       true,
  showDocularDocs:       true,
  groups:                [{
    groupTitle: 'Admin',
    groupId:    'Livi',
    sections:   [{
      id:      'Livi',
      title:   'LoopBack Services',
      scripts: ['!<%= yeoman.app %>/modules/**/*.spec.js',
        '<%= yeoman.app %>/modules/**/{,*/}*.js'
      ]
    }]
  }, {
    groupTitle: 'LoopBack',
    groupId:    'loopback',
    sections:   [{
      id:      'lbServices',
      title:   'LoopBack Services',
      scripts: ['<%= yeoman.app %>/js/lb-services.js']
    }]
  }]
};
