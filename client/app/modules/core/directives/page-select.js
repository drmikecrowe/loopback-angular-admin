'use strict';

angular.module('com.module.core')
  .directive('pageSelect', function () {
    return {
      restrict: 'E',
      template: '<input type="text" class="select-page" ng-model="inputPage" ng-change="selectPage(inputPage)">',
      link:     function (scope, element, attrs) {
        scope.$watch('currentPage', function (c) {
          scope.inputPage = c;
        });
      }
    }
  });
