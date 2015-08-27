'use strict';

var _        = require('lodash');
var debug    = require('debug')('boot:server');
var loopback = require('loopback');
var boot     = require('loopback-boot');
var path     = require('path');
var app      = module.exports = loopback();
var env = require('get-env')({
  test: 'test'
});

GLOBAL.__base   = path.dirname(__dirname) + '/';
GLOBAL.Bluebird = require('bluebird');

// Set up the /favicon.ico
app.use(loopback.favicon());

// request pre-processing middleware
app.use(loopback.compress());

// -- Add your pre-processing middleware here --
if (process.env.LOOPBACK_SETUP != 'setup' && process.env.NODE_ENV != 'prod') {
  console.log('Livereload started on port ' + 35729);
  app.use(require('connect-livereload')({
    port: 35729
  }));
} else {
  console.log('NOT starting Livereload #2');
}


// boot scripts mount components like REST API
boot(app, __dirname);


app.use(loopback.context());
app.use(loopback.token());
app.use(function setCurrentUser(req, res, next) {
  if (!req.accessToken) {
    return next();
  }
  app.models.user.findById(req.accessToken.userId, function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(new Error('No user with this access token was found.'));
    }
    var loopbackContext = loopback.getCurrentContext();
    if (loopbackContext) {
      loopbackContext.set('currentUser', user);
    }
    next();
  });
});

var restApiRoot = app.get('restApiRoot');
app.use(restApiRoot, app.loopback.rest());

try {
  // API explorer
  var explorer    = require('loopback-explorer');
  var explorerApp = explorer(app, {basePath: restApiRoot});
  app.use('/explorer', explorerApp);
  //var explorerDevice = explorer(deviceRestManager, { basePath: deviceApiRoot });
  //app.use(deviceApiRoot+'/explorer', explorerDevice);
} catch (err) {
  // silently ignore the error, the explorer is not available in "production"
}

// -- Mount static files here--
// All static middleware should be registered at the end, as all requests
// passing the static middleware are hitting the file system
// Example:

var staticPath = null;

console.log("Running app in " + env + " mode\n");
if (env !== 'prod') {
  staticPath = path.resolve(__dirname, '../client/app/');
} else {
  staticPath = path.resolve(__dirname, '../dist/');
}

app.use(loopback.static(staticPath));

// Requests that get this far won't be handled
// by any middleware. Convert them into a 404 error
// that will be handled later down the chain.
app.use(loopback.urlNotFound());

// The ultimate error handler.
app.use(loopback.errorHandler());

app.start = function () {
  // start the web server
  return app.listen(function () {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

// start the server if `$ node server.js`
if (require.main === module && process.env.LOOPBACK_SETUP != 'setup') {
  app.start();
}
