'use strict';
var app = angular.module('com.module.core');
app.run(function ($rootScope, Setting, gettextCatalog, crAcl, $localStorage, AppAuth, User, $state, lodash, CoreService, $log, $filter) {

  // Left Sidemenu
  $rootScope.menu = [];

  // Setup the user and save it's defaults
  $rootScope.setupUser = function (user) {
    crAcl.setRole("ROLE_USER");
    $rootScope.currentUser    = user;
    $localStorage.currentUser = user;
    AppAuth.currentUser       = user;
    $rootScope.currentUser.currentRoles.forEach(function (role) {
      crAcl.setRole(role);
    });
  };

  $rootScope.logout = function () {
    try {
      User.logout(function () {
      });
    } catch (ex) {
    }
    delete $rootScope.currentUser;
    delete AppAuth.currentUser;
    delete $rootScope.dashboardInfo;
    $rootScope.dashboardBox  = [];
    $rootScope.dashboardInfo = null;
    $localStorage.$reset();
    crAcl.setRole("ROLE_GUEST");
    CoreService.toastSuccess(gettextCatalog.getString('Logged out'), gettextCatalog.getString('You are logged out!'));
    $state.go('login');
  };

  // Add Sidebar Menu
  $rootScope.addMenu    = function (name, uisref, icon, permissions, subMenu) {
    var user = $localStorage.currentUser;
    if (!user || typeof user != 'object') {
      return;
    }
    if (!subMenu && typeof permissions == 'object') {
      subMenu = permissions;
    } else if (typeof permissions == 'object' && permissions.length > 0) {
      var delta = lodash.intersection(permissions, user.currentRoles);
      if (delta == 0) return;
    }
    var menu = {
      name: name,
      sref: uisref,
      icon: icon
    };
    if (subMenu) {
      menu.subMenu = subMenu;
    }
    $rootScope.menu.push(menu);
  };
  $rootScope.subMenu    = function (name, uisref, icon) {
    return {
      name: name,
      sref: uisref,
      icon: icon
    };
  };
  $rootScope.appendMenu = function (name, submenu) {
    var menu = lodash.find($rootScope.menu, {name: name});
    if (menu) {
      if (!lodash.has(menu, 'subMenu')) {
        menu.subMenu = submenu;
      } else {
        menu.subMenu = menu.subMenu.concat(submenu);
      }
    }
  };

  // Add Sidebar Menu
  $rootScope.addMenu(gettextCatalog.getString('Dashboard'), 'app.home', 'fa-dashboard');

  // Dashboard
  $rootScope.dashboardBox  = [];
  $rootScope.dashboardInfo = null;

  // Add Dashboard Box
  $rootScope.addDashboardBox = function (name, color, icon, quantity, href) {
    $rootScope.dashboardBox.push({
      name:     name,
      color:    color,
      icon:     icon,
      quantity: quantity,
      href:     href
    });
  };

  // Get Settings for Database
  $rootScope.setSetting = function (key, value) {

    Setting.find({
      filter: {
        where: {
          key: key
        }
      }
    }, function (data) {

      if (data.length) {
        data[0].value = value;
        data[0].$save();
      } else {
        Setting.create({
          key:   key,
          value: value
        }, function (data) {
          console.log(data);
        });
      }
      $rootScope.loadSettings();
    });
  };

  // Load Settings blank
  $rootScope.settings = {};

  // Get Settings for Loopback Service
  $rootScope.loadSettings = function () {
    Setting.find(function (settings) {
      $rootScope.settings.data = settings;
      $rootScope.tableRows     = $rootScope.getSetting('tableRows', 25);
    });
  };

  $rootScope.$on('$stateNotFound',
    function (event, unfoundState, fromState, fromParams) {
      console.log(unfoundState.to); // "lazy.state"
      console.log(unfoundState.toParams); // {a:1, b:2}
      console.log(unfoundState.options); // {inherit:false} + default options
    });

  $rootScope.$on('$stateChangeError',
    function (event, toState, toParams, fromState, fromParams, error) {
      console.log(unfoundState.to); // "lazy.state"
      console.log(unfoundState.toParams); // {a:1, b:2}
      console.log(unfoundState.options); // {inherit:false} + default options
    });

  $rootScope.previousState       = null;
  $rootScope.previousStateParams = null;
  $rootScope.currentState        = null;
  $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
    $rootScope.previousState       = from.name;
    $rootScope.previousStateParams = fromParams;
    $rootScope.currentState        = to.name;
    //console.log('Previous state:'+$rootScope.previousState)
    //console.log('Current state:'+$rootScope.currentState)
  });

  $rootScope.goBack = function () {
    $state.go($rootScope.previousState, $rootScope.previousStateParams);
  };

  $rootScope.Commands = gettextCatalog.getString('Actions');

  $rootScope.currentUser = $localStorage.currentUser;
  if ($rootScope.currentUser) {
    $rootScope.setupUser($rootScope.currentUser);
    $log.info('Roles: ', crAcl.getRole());
  } else {
    if (!location.pathname.match(/\/users\/reset-password/)) {
      console.log('Sending to login');
      $rootScope.logout();
    }
  }

  $rootScope.applyFilter = function (model, filter) {
    return $filter(filter)(model);
  };


  $rootScope.addMenu(gettextCatalog.getString('Content'), []);
  $rootScope.addMenu(gettextCatalog.getString('Admin'), []);
});

app.config(function (formlyConfigProvider) {

  formlyConfigProvider.setWrapper({
    name:     'horizontalBootstrapLabel',
    template: [
                '<label for="{{::id}}" class="col-sm-2 control-label">',
                '{{to.label}} {{to.required ? "*" : ""}}',
                '</label>',
                '<div class="col-sm-8">',
                '<formly-transclude></formly-transclude>',
                '</div>'
              ].join(' ')
  });

  formlyConfigProvider.setWrapper({
    name:     'horizontalBootstrapCheckbox',
    template: [
                '<div class="col-sm-offset-2 col-sm-8">',
                '<formly-transclude></formly-transclude>',
                '</div>'
              ].join(' ')
  });

  formlyConfigProvider.setType({
    name:    'horizontalInput',
    extends: 'input',
    wrapper: ['horizontalBootstrapLabel', 'bootstrapHasError']
  });

  formlyConfigProvider.setType({
    name:    'horizontalCheckbox',
    extends: 'checkbox',
    wrapper: ['horizontalBootstrapCheckbox', 'bootstrapHasError']
  });
});

app.config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
  cfpLoadingBarProvider.includeSpinner = false;
}]);
