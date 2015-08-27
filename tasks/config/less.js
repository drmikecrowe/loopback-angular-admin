module.exports = {
  dev:  {
    options: {
      compress: false
    },
    files:   {
      'client/app/css/AdminLTE.css':         '<%= yeoman.app %>/**/AdminLTE.less',
      'client/app/css/skins/skin-blue.css':  '<%= yeoman.app %>/**/skin-blue.less',
      'client/app/css/skins/_all-skins.css': '<%= yeoman.app %>/**/_all-skins.less',
      'client/app/css/style.css':            '<%= yeoman.app %>/modules/**/*.less'
    }
  },
  prod: {
    options: {
      compress: true
    },
    files:   {
      'css/AdminLTE.min.css':         'build/less/AdminLTE.less',
      'css/skins/skin-blue.min.css':  'build/less/skins/skin-blue.less',
      'css/skins/_all-skins.min.css': 'build/less/skins/_all-skins.less'
    }
  }
};
