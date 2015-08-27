'use strict';

/**
 * @ngdoc directive
 * @name com.module.core.directive:register
 * @description
 * # register
 */
angular.module('com.module.users')
  .directive('reset-password', function () {
    return {
      templateUrl: 'modules/users/views/reset-password.html',
      restrict:    'E'
    };
  });
