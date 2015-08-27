'use strict';

angular.module('com.module.core')
  .controller('SmartTableToggleCtrl', function ($scope, info, close) {

    $scope.info = info;
    $scope.ok   = function () {
      close('confirmed', 500);
    };

    $scope.cancel = function () {
      close('cancel', 500);
    };
  });
