'use strict';

var includeAll = require('include-all')
  , path       = require('path');

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    yeoman: {
      app:  'client/app',
      test: 'client/test',
      dist: 'dist',
      api:  {
        test: 'http://0.0.0.0:3000/api/',
        dev: 'http://0.0.0.0:3000/api/',
        prod:  '/api/'
      },
      site: {
        test: 'http://0.0.0.0:3000',
        dev: 'http://0.0.0.0:3000',
        prod:  ''
      },
      host: '0.0.0.0'
    },
    config: {
      src: "tasks/config/*.js"
    }
  };

  // Define the configuration for all the tasks
  var configs = require('load-grunt-configs')(grunt, appConfig);
  //grunt.log.write(JSON.stringify(configs));
  grunt.initConfig(configs);

  // Register all the tasks
  configureGruntfile();

  /**
   * Load CommonJS submodules from the specified
   * relative path.
   *
   * @return {Object}
   */
  function loadTasks(relPath) {
    return includeAll({
      dirname: path.resolve(__dirname, relPath),
      filter:  /(.+)\.js$/
    });
  }

  /**
   * Invokes the config function for the task config and register definitions.
   * Make sure to pass in grunt.
   *
   * @param  {Object} tasks [Grunt object that each task will need]
   */
  function invokeConfigFn(tasks) {
    for (var taskName in tasks) {
      if (tasks.hasOwnProperty(taskName)) {
        tasks[taskName](grunt);
      }
    }
  }

  /**
   * Configure the gruntfile.
   */
  function configureGruntfile() {
    var registerDefinitions = loadTasks('./tasks/register');

    invokeConfigFn(registerDefinitions);
  }


};
