'use strict';
/**
 * @ngdoc function
 * @name com.module.users.controller:RegisterCtrl
 * @description Login Controller
 * @requires $scope
 * @requires $routeParams
 * @requires $location
 * Controller for Register Page
 **/
angular.module('com.module.users')
  .controller('ResetPasswordCtrl', function ($scope, $routeParams, $location, $filter,
                                             CoreService, User, LoopBackAuth, AppAuth, gettextCatalog) {

    $scope.email = 'drmikecrowe@gmail.com';

    $scope.information = {
      password: ''
    };

    LoopBackAuth.currentUserId = $routeParams.uid;
    LoopBackAuth.accessTokenId = $routeParams.token;
    LoopBackAuth.save();

    $scope.schema = [
      {
        type:    'multiple',
        fields:  [{
          label:       '',
          property:    'password',
          placehodler: gettextCatalog.getString('Password'),
          type:        'password',
          attr:        {
            required:    true,
            ngMinlength: 6
          }
        }, {
          label:       '',
          property:    'confirmPassword',
          placeholder: gettextCatalog.getString('Confirm Password'),
          type:        'password',
          attr:        {
            confirmPassword: 'user.password',
            required:        true,
            ngMinlength:     6
          },
          msgs:        {
            match: gettextCatalog.getString(
              'Your passwords need to match')
          }
        }],
        columns: 6
      }
    ];

    $scope.options = {
      validation: {
        enabled:      true,
        showMessages: false
      },
      layout:     {
        type:      'basic',
        labelSize: 3,
        inputSize: 9
      }
    };


    $scope.confirmPassword = '';

    $scope.changePassword = function (ev, rF) {
      ev && ev.preventDefault();
      // Registering short term session
      $scope.ongoingProgress = true;
      rF.$attempted          = true;
      if (rF.$invalid || rF.$pristine) return;

      User.updateOrCreate({
        id:       $routeParams.uid,
        password: rF.password.$viewValue
      }).$promise

        .then(function () {
          //alert('okay');
          $scope.successMessage  = 'Changement effectué avec succès. Vous pouvez ' +
            'fermer la fenêtre.';
          $scope.ongoingProgress = false;
        })

        .catch(function () {
          //alert('not okay');
          $scope.errorMessage    = 'Une erreur est survenue lors de l\'enregistrement';
          $scope.ongoingProgress = false;
        });
    };

  })
  .directive('confirmPassword',
  function () {
    return {
      restrict: 'A',
      require:  'ngModel',
      link:     function (scope, element, attrs, ngModel) {
        var validate = function (viewValue) {
          var password = scope.$eval(attrs.confirmPassword);
          ngModel.$setValidity('match', ngModel.$isEmpty(viewValue) ||
            viewValue === password);
          return viewValue;
        };
        ngModel.$parsers.push(validate);
        scope.$watch(attrs.confirmPassword, function () {
          validate(ngModel.$viewValue);
        });
      }
    };
  }
);
