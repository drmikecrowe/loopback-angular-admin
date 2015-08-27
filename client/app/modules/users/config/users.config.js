'use strict';
angular.module('com.module.users')
  .run(function ($rootScope, gettextCatalog) {
    $rootScope.appendMenu(gettextCatalog.getString('Admin'), [
      $rootScope.subMenu(gettextCatalog.getString('Users'), 'app.users.table', 'fa-user', ['ADMIN'])
    ]);

  });
