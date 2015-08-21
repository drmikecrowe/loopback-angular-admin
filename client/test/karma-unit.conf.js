// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2014-07-30 using
// generator-karma 0.8.3

var sharedConfig = require('./karma-shared.conf');

module.exports = function (config) {
  'use strict';
  var conf = sharedConfig();

  conf.files = conf.files.concat([
    //extra testing code
    'app/bower_components/angular-mocks/angular-mocks.js',

    //test files
    'app/js/*.js',
    'app/modules/**/*.js',
    'app/modules/**/*.spec.js'
  ]);

  // level of logging
  // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
  conf.logLevel = config.LOG_INFO;

  config.set(conf);
};
