'use strict';
/**
 * @ngdoc overview
 * @name loopbackApp
 * @description
 * # loopbackApp
 *
 * Main module of the application.
 */
angular.module('loopbackApp', [
  'angular-loading-bar',
  'angular.filter',
  'angularBootstrapNavTree',
  'angularFileUpload',
  'btford.markdown',
  'oitozero.ngSweetAlert',
  'config',
  'formly',
  'formlyBootstrap',
  'lbServices',
  'monospaced.elastic',
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngStorage',
  'ngTouch',
  'ui.bootstrap',
  'ui.codemirror',
  'ui.gravatar',
  'ui.grid',
  'ui.router',
  'toasty',
  'autofields',
  'gettext',
  'smart-table',
  'daterangepicker',
  'cr.acl',
  'ngLodash',
  'toggle-switch',
  'angularModalService',
  'truncate',
  'rzModule',
  'picardy.fontawesome',
  'ui.checkbox',
  'xeditable',
  'mgo-angular-wizard',
  'com.module.core',
  'com.module.about',
  'com.module.events',
  'com.module.files',
  'com.module.notes',
  'com.module.pages',
  'com.module.posts',
  'com.module.products',
  'com.module.sandbox',
  'com.module.settings',
  'com.module.users'
])
  .run(function ($rootScope, $cookies, gettextCatalog, crAcl, editableOptions) {

    $rootScope.locales = {

      'en':    {
        lang:    'en',
        country: 'US',
        name:    gettextCatalog.getString('English')
      },
      'pt-BR': {
        lang:    'pt_BR',
        country: 'BR',
        name:    gettextCatalog.getString('Portuguese Brazil')
      },
      'nl':    {
        lang:    'nl',
        country: 'NL',
        name:    gettextCatalog.getString('Dutch')
      },
      'de':    {
        lang:    'de',
        country: 'DE',
        name:    gettextCatalog.getString('German')
      },
      'fr':    {
        lang:    'fr',
        country: 'FR',
        name:    gettextCatalog.getString('Français')
      }
    }

    var lang = $cookies.lang || navigator.language || navigator.userLanguage;

    $rootScope.locale = $rootScope.locales[lang];

    if ($rootScope.locale === undefined) {
      $rootScope.locale = $rootScope.locales[lang];
      if ($rootScope.locale === undefined) {
        $rootScope.locale = $rootScope.locales['en'];
      }
    }

    gettextCatalog.setCurrentLanguage($rootScope.locale.lang);
    crAcl.setInheritanceRoles({
      "ADMIN":      ["ROLE_USER"],
      "SUPERADMIN": ["ROLE_USER", "ADMIN"],
    });
    crAcl.setRedirect('login');

    editableOptions.theme = 'bs3';

  });
