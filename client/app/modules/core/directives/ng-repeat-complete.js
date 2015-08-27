'use strict';
/**
 * @ngdoc directive
 * @name com.module.core.directive:stDateRange
 * @restrict E
 * @description DateRange Picker
 */
angular.module('com.module.core')
  .directive('onFinishRender', function ($timeout) {
    return {
      restrict: 'A',
      link:     function (scope, element, attr) {
        if (scope.$last === true) {
          $timeout(function () {
            scope.$emit('ngRepeatFinished');
          });
        }
      }
    }
  });

