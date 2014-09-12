/* global angular */
(function() {
  'use strict';
  
  function Checkbox() {

    return {
      replace: true,
      restrict: 'AE',
      transclude: true,
      priority: 0,
      require: ['?ngModel'],
      link: function() {},
      template: [
        '<div class="checkbox-input">',
        '  <div class="checkbox-toggle" ng-class="{\'checked\': checked, \'disabled\': disabled}"/>',
        '  <span class="label-text" ng-transclude/>',
        '</div>'
      ].join('')
    }
  }

  angular.module('corespring.input', []).directive('checkbox', Checkbox);
  
})();