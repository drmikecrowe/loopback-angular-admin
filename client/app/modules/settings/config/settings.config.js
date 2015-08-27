'use strict';
angular.module('com.module.settings')
  .run(function ($rootScope, gettextCatalog) {
    $rootScope.appendMenu(gettextCatalog.getString('Admin'), [
      $rootScope.subMenu(gettextCatalog.getString('Settings'), 'app.settings.list', 'fa-cog', ['ADMIN'])
    ]);

    $rootScope.getSetting = function (key, def) {
      var valor = def || '';
      angular.forEach($rootScope.settings.data, function (item) {
        if (item.key === key) {
          valor = item.value;
        }
      });
      return valor;
    };


  });
