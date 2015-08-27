'use strict';

angular.module('com.module.core')
  .filter('checkBox', function () {
    return function (checked) {
      var ck = checked ? 'checked' : '';
      return "<div class='checkbox-nice checkbox-inline checkbox-disabled'><input type='checkbox' " + ck + "><label>&nbsp;</label></div>";
    };
  });
