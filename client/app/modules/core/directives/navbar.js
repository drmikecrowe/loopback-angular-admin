'use strict';

/**
 * @ngdoc directive
 * @name com.module.core.directive:navbar
 * @description
 * # navbar
 */
angular.module('com.module.core')
  .directive('navbar', function () {
    return {
      templateUrl: 'modules/core/views/elements/navbar.html',
      link:        function (scope, element, attr) {
        //Easy access to options
        var o = $.AdminLTE.options;

        //Activate the layout maker
        $.AdminLTE.layout.activate();

        //Enable sidebar tree view controls
        $.AdminLTE.tree('.sidebar');

        //Enable control sidebar
        if (o.enableControlSidebar) {
          $.AdminLTE.controlSidebar.activate();
        }

        //Add slimscroll to navbar dropdown
        if (o.navbarMenuSlimscroll && typeof $.fn.slimscroll != 'undefined') {
          $(".navbar .menu").slimscroll({
            height:        o.navbarMenuHeight,
            alwaysVisible: false,
            size:          o.navbarMenuSlimscrollWidth
          }).css("width", "100%");
        }

        //Activate sidebar push menu
        if (o.sidebarPushMenu) {
          $.AdminLTE.pushMenu.activate(o.sidebarToggleSelector);
        }

        //Activate Bootstrap tooltip
        if (o.enableBSToppltip) {
          $('body').tooltip({
            selector: o.BSTooltipSelector
          });
        }

        //Activate box widget
        if (o.enableBoxWidget) {
          $.AdminLTE.boxWidget.activate();
        }

        //Activate fast click
        if (o.enableFastclick && typeof FastClick != 'undefined') {
          FastClick.attach(document.body);
        }

        //Activate direct chat widget
        if (o.directChat.enable) {
          $(o.directChat.contactToggleSelector).on('click', function () {
            var box = $(this).parents('.direct-chat').first();
            box.toggleClass('direct-chat-contacts-open');
          });
        }

        /*
         * INITIALIZE BUTTON TOGGLE
         * ------------------------
         */
        $('.btn-group[data-toggle="btn-toggle"]').each(function () {
          var group = $(this);
          $(this).find(".btn").on('click', function (e) {
            group.find(".btn.active").removeClass("active");
            $(this).addClass("active");
            e.preventDefault();
          });

        });
      }
    };
  });
