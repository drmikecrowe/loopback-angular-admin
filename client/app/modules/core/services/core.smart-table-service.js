'use strict';
var app = angular.module('com.module.core');

app.service('SmartTableService',
  ['$q', '$filter', '$timeout', 'lodash', 'gettextCatalog', 'ModalService', '$state', 'CoreService', '$rootScope',
    function ($q, $filter, $timeout, lodash, gettextCatalog, ModalService, $state, CoreService, $rootScope) {

      function buildCtrlData(ctrl) {
        ctrl.index         = {};
        ctrl.checkboxes    = {};
        ctrl.details       = {};
        ctrl.editable      = {};
        ctrl.field_details = {};
        lodash.each(ctrl.fields, function (value) {
          ctrl.field_details[value.id] = value;
        });
        for (var row = 0; row < ctrl.displayed.length; row++) {
          var id         = ctrl.displayed[row].id;
          ctrl.index[id] = row;
          lodash.each(ctrl.booleans, function (value, key) {
            var idmix                   = key + '-' + id;
            ctrl.checkboxes[idmix]      = ctrl.displayed[row][key];
            ctrl.displayed[row].enabled = ctrl.checkboxes[idmix];
          });
          lodash.each(ctrl.fields, function (value) {
            if (lodash.has(value, 'truncate')) {
              var idmix = value.id + '-' + id;
              if (typeof ctrl.displayed[row][value.id] == 'object') {
                ctrl.displayed[row][value.id] = JSON.stringify(ctrl.displayed[row][value.id], null, '  ');
              }
              ctrl.details[idmix] = ctrl.displayed[row][value.id];
            }
            if (value.editable) {
              var idmix            = value.id + '-' + id;
              ctrl.editable[idmix] = ctrl.displayed[row][value.id];
            }
          });
        }

        ctrl.openDetail = function (idmix) {
          var parts   = idmix.split("-");
          var which   = parts[0];
          var id      = parts[1];
          var details = ctrl.details[idmix];
          if (details.indexOf('JSON:') == 0) {
            details = JSON.stringify(JSON.parse(details.substring(6)), null, '  ')
          }
          var detail = {
            title:   ctrl.field_details[which].label + gettextCatalog.getString(" Details"),
            details: details
          };
          ModalService.showModal({
            templateUrl: 'detailItem.html',
            controller:  'SmartTableDetailCtrl',
            inputs:      {
              detail: detail
            }
          }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (status) {
            });
          });
        };

        ctrl.commandClick = function (idmix, row) {
          var parts   = idmix.split("-");
          var which   = parts[0];
          var id      = parts[1];
          var command = lodash.find(this.rowCommands, {id: which});
          var params  = {};
          var filter  = null;
          if (lodash.has(command.params, 'limit')) {
            filter = command.params.limit;
            if (lodash.has(command.params, 'value')) {
              filter += '=' + row[command.params.value];
            }
            params.filter = filter;
          }
          if (lodash.has(command.params, 'param')) {
            filter                       = row[command.params.value];
            params[command.params.param] = filter;
          }
          $state.go(command.state, params);
        };

        ctrl.testRow = function testRow(command, id) {
          if (command.disabled) return false;
          if (!command.conditions || command.conditions.length == 0) return true;
          var any = false;
          lodash.each(command.conditions, function (condition) {
            any = any || condition(id);
          });
          return any;
        }
      }

      function getPage(model, method, sort, fields, url_filter, params) {

        var pagination = params.pagination;
        var start      = pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
        var number = pagination.number || $rootScope.getSetting('tableRows', 25);  // Number of entries showed per page.

        var searches = lodash.pluck(lodash.filter(fields, function (field) {
          return field.search != 'none';
        }), 'id');
        var nfields  = {};
        lodash.each(lodash.pluck(fields, 'id'), function (field) {
          nfields[field] = true;
        });
        var filter   = {
          where:  {},
          limit:  number,
          skip:   start,
          sort:   sort,
          fields: lodash.pluck(fields, 'id')
        };

        params.search.predicateObject = params.search.predicateObject || {};
        if (url_filter) {
          var parts = url_filter.split("=");
          var limit = parts.length > 0 ? parts[0] : "";
          var value = parts.length > 1 ? parts[1] : "";
          if (limit > "") {
            if (value == "") {
              value = limit;
              limit = "id";
            }
            var found = false;
            lodash.each(fields, function (field) {
              if (field.id == limit) {
                found                           = true;
                params.search.predicateObject.$ = value;
              }
            });
            if (!found) {
              var restrict    = {};
              restrict[limit] = value;
              filter.restrict = restrict;
            }
          }
        }

        if (params.search.predicateObject.$ > '') {
          var value = params.search.predicateObject.$ + "";
          if (value.match(/[0-9]{6}/)) {
            filter.where['account'] = parseInt(value);
          } else {
            filter.where.or = [];
            searches.forEach(function (field) {
              if (field == 'account') return;
              var qry  = {};
              var fdef = lodash.find(fields, {id: field});
              if (fdef.search == 'regex') {
                qry[field] = {like: '%' + value + '%'};
              } else if (fdef.search == 'parseInt') {
                qry[field] = parseInt(params.search.predicateObject.$);
              } else {
                qry[field] = params.search.predicateObject.$;
              }
              filter.where.or.push(qry)
            });
          }
        }

        if (params.search.predicateObject.dateFilter) {
          var df     = params.search.predicateObject.dateFilter;
          var before = df.before;
          var after  = df.after;
          //{ date: { '>': new Date('2/4/2014'), '<': new Date('2/7/2014') } }
          filter.where.createdAt = {'>=': before, '<=': after};
        }

        if (params.sort.predicate) {
          filter.sort = params.sort.predicate + (params.sort.reverse ? ' DESC' : ' ASC');
        }

        return model[method](filter)
          .$promise
          .then(function (results) {
            return {
              data:          results.data,
              total:         results.total,
              numberOfPages: Math.ceil(results.total / number)
            }
          })
          .catch(function (err) {
            console.log(err);
            CoreService.toastError(err.data.error.message);
            return {
              data:          [],
              total:         0,
              numberOfPages: 0
            }
          });
      }

      return {
        getPage:       getPage,
        buildCtrlData: buildCtrlData
      };
    }]);
