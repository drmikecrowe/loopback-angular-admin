/**
 * Created by mcrowe on 5/4/15.
 */

var sharedConfig = require('./karma-shared.conf');

module.exports = function(config) {
  var conf = sharedConfig();

  conf.files = conf.files.concat([
    //test files
    './e2e/**/*.js'
  ]);

  conf.urlRoot = '/__karma__/';

  conf.frameworks = ['ng-scenario'];

  // level of logging
  // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
  conf.logLevel = config.LOG_INFO;

  config.set(conf);
};
