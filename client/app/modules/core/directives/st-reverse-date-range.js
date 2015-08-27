'use strict';
/**
 * @ngdoc directive
 * @name com.module.core.directive:stDateRange
 * @restrict E
 * @description DateRange Picker
 */
angular.module('com.module.core')
  .directive('stReverseDateRange', function ($compile, gettextCatalog) {
    var uniqueId = 1;
    return {
      restrict: 'E',
      require:  '^stTable',
      scope:    false,


      link: function (scope, element, attr, table) {

        scope.uniqueId = 'strdr' + uniqueId++;

        var endDate                                       = new Date();
        var startDate                                     = new Date();
        startDate.setDate(startDate.getDate() - 3);
        scope.date                                        = {startDate: startDate, endDate: endDate};
        var ranges                                        = {};
        ranges[gettextCatalog.getString('Today')]         = [moment(), moment()];
        ranges[gettextCatalog.getString('Last 72 hours')] = [startDate, new Date()];
        ranges[gettextCatalog.getString('Last 7 Days')]   = [moment().subtract(6, 'days'), moment()];
        ranges[gettextCatalog.getString('Last 30 Days')]  = [moment().subtract(29, 'days'), moment()];
        ranges[gettextCatalog.getString('This Month')]    = [moment().startOf('month'), moment().endOf('month')];
        ranges[gettextCatalog.getString('Last Month')]    = [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')];
        scope.options                                     = {
          ranges: ranges
        };

        function toJSONLocal(date) {
          var local = new Date(date);
          local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
          return local.toJSON().slice(5, 10) + "-" + local.toJSON().slice(0, 4);
        }

        var template = '<div class="input-group">' +
          '<span class="input-group-addon"><i class="fa fa-calendar-o"></i></span>' +
          '<input id="' + scope.uniqueId + '" date-range-picker type="text" class="form-control col-lg-2 col-md-4 col-sm-8 date-picker" ng-model="date" options="options">' +
          '</div>';

        var linkFn        = $compile(template);
        var content       = linkFn(scope);
        element.append(content);
        var predicateName = attr.predicate;

        scope.$watch('date', function (newValue) {
          var query = {};
          if (!scope.isBeforeOpen && !scope.isAfterOpen) {

            if (newValue.startDate) {
              query.before = typeof newValue.startDate.toDate == 'function' ? newValue.startDate.toDate() : newValue.startDate;
            }

            if (newValue.endDate) {
              query.after = typeof newValue.endDate.toDate == 'function' ? newValue.endDate.toDate() : newValue.endDate;
            }

            //scope.$apply(function () {
            table.search(query, predicateName);
            //})
          }
        });


        function open(before) {
          return function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            if (before) {
              scope.isBeforeOpen = true;
            } else {
              scope.isAfterOpen = true;
            }
          }
        }

        scope.openBefore = open(true);
        scope.openAfter  = open();
      }
    }
  });
