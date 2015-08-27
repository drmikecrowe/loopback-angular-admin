'use strict';
angular.module('com.module.users')
  .controller('UserTableCtrl', function ($scope, $rootScope, $state, $stateParams,
                                         CoreService, gettextCatalog, SmartTableService,
                                         User, lodash, $modal, $log, ModalService) {

    var ctrl = this;

    ctrl.dateFilter   = false;
    ctrl.reverseDates = false;
    ctrl.displayed    = [];
    ctrl.fields       = [
      {id: 'id', hidden: true, search: 'none'},
      {id: 'username', label: gettextCatalog.getString('Email'), search: 'exact', email: true},
      {id: 'enabled', label: gettextCatalog.getString('Enabled'), search: 'none', toggle: true},
      {id: 'firstName', label: gettextCatalog.getString('First'), search: 'regex'},
      {id: 'lastName', label: gettextCatalog.getString('Last'), search: 'regex'},
      {id: 'phone', label: gettextCatalog.getString('Phone #'), search: 'regex'},
    ];
    ctrl.booleans     = {
      enabled: {
        success: gettextCatalog.getString("User is now "),
        prompt:  gettextCatalog.getString("Change Enable status to "),
      },
    };
    ctrl.rowCommands  = [
      {id: 'devices', 'state': 'app.devices.list', params: {limit: 'userId', value: 'id'}, icon: 'train', title: 'Associated Devices'}
    ];

    ctrl.toggled = function (idmix) {
      var parts          = idmix.split("-");
      var which          = parts[0];
      var id             = parts[1];
      var row            = ctrl.displayed[ctrl.index[id]];
      var new_value      = ctrl.checkboxes[idmix];
      var old_value      = !ctrl.checkboxes[idmix];
      var title          = row.devname + ' (' + gettextCatalog.getString('Serial') + ': ' + row.serialnumber + ')';
      var new_state_info = new_value ? gettextCatalog.getString("Enabled") : gettextCatalog.getString("Disabled");
      var boolean        = ctrl.booleans[which];
      var success        = boolean.success + new_state_info;
      var prompt         = boolean.prompt + new_state_info;

      var info = {
        id:             row.id,
        idmix:          idmix,
        field:          which,
        new_state_info: new_state_info,
        new_state:      new_value,
        old_state:      old_value,
        title:          title,
        prompt:         prompt,
        success:        success,
      };
      ModalService.showModal({
        templateUrl: 'toggleButtonWarning.html',
        controller:  'SmartTableToggleCtrl',
        inputs:      {
          info: info
        }
      }).then(function (modal) {
        modal.element.modal();
        modal.close.then(function (status) {
          if (status != 'confirmed') {
            $scope.reverting            = true;
            ctrl.checkboxes[info.idmix] = info.old_state;
          } else {
            var qry         = {id: info.id};
            qry[info.field] = info.new_state;
            User.updateField(qry)
              .$promise
              .then(function (result) {
                CoreService.toastSuccess(info.success);
              }).
              catch(function (err) {
                $log.error('Error ' + err.status + ': ' + err.statusText, err.data);
                CoreService.toastError('Error ' + err.status + ': ' + err.statusText);
              });
          }
        });
      });
    };

    ctrl.callServer = function callServer(tableState) {

      ctrl.isLoading   = true;
      $scope.reverting = true;

      SmartTableService.getPage(User, 'find', 'username ASC', ctrl.fields, $stateParams.filter, tableState).then(function (result) {
        tableState.pagination.numberOfPages = result.numberOfPages;//set the number of pages so the pagination can update
        ctrl.displayed = result.data;
        SmartTableService.buildCtrlData(ctrl);
        ctrl.isLoading = false;
      });
    };

  });


