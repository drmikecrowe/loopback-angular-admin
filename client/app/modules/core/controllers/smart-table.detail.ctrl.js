'use strict';

angular.module('com.module.core')
  .controller('SmartTableDetailCtrl', function ($scope, detail, close) {

    $scope.detail = detail
    $scope.close  = function (result) {
      close(result, 500); // close, but give 500ms for bootstrap to animate
    };


  });
