'use strict';
angular.module('com.module.users')
  .config(function ($stateProvider) {
    $stateProvider
      .state('reset-password', {
        url:        '/reset-password',
        template:   '<reset-password></reset-password>',
        controller: 'ResetPasswordCtrl'
      })
      .state('login', {
        url:        '/login',
        template:   '<login></login>',
        controller: 'LoginCtrl',
        data:       {is_granted: ['ROLE_GUEST']}
      })
      .state('register', {
        url:        '/register',
        template:   '<register></register>',
        controller: 'RegisterCtrl',
        data:       {is_granted: ['ROLE_USER']}
      })
      .state('app.users', {
        abstract:    true,
        url:         '/users',
        templateUrl: 'modules/users/views/main.html'
      })
      .state('app.users.profile', {
        url:         '/profile',
        templateUrl: 'modules/users/views/profile.html',
        controller:  'ProfileCtrl',
        data:        {is_granted: ['ROLE_USER']}
      })
      .state('app.users.list', {
        url:         '',
        templateUrl: 'modules/users/views/list.html',
        controller:  'UsersCtrl',
        data:        {is_granted: ['ROLE_USER']}
      })
      .state('app.users.add', {
        url:         '/add',
        templateUrl: 'modules/users/views/form.html',
        controller:  'UsersCtrl',
        data:        {is_granted: ['ROLE_USER']}
      })
      .state('app.users.edit', {
        url:         '/edit/:id',
        templateUrl: 'modules/users/views/form.html',
        controller:  'UsersCtrl',
        data:        {is_granted: ['ROLE_USER']}
      })
      .state('app.users.view', {
        url:         '/view/:id',
        templateUrl: 'modules/users/views/view.html',
        controller:  'UsersCtrl',
        data:        {is_granted: ['ROLE_USER']}
      })
      .state('app.users.delete', {
        url:        '/delete/:id',
        controller: 'UsersCtrl',
        data:       {is_granted: ['ROLE_USER']}
      })
      .state('app.users.table', {
        url:         '/:filter',
        templateUrl: 'modules/users/views/table.html',
        controller:  'UserTableCtrl',
        data:        {is_granted: ['ROLE_USER']}
      })
    ;
  });
