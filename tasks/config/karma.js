module.exports = {
  unit:      {
    configFile: '<%= yeoman.test %>/../test/karma-unit.conf.js',
    autoWatch:  true,
    singleRun:  false
  },
  unit_once: {
    configFile: '<%= yeoman.test %>/../test/karma-unit.conf.js',
    autoWatch:  false,
    singleRun:  true
  },
  e2e:       {
    configFile: '<%= yeoman.test %>/../test/karma-e2e.conf.js'
  },
  e2e_once:  {
    configFile: '<%= yeoman.test %>/../test/karma-e2e.conf.js',
    autoWatch:  false,
    singleRun:  true
  }
};
