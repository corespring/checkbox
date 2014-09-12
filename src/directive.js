/* global angular */
(function() {
  'use strict';
  
  function Checkbox() {

    function link($scope, $element, $attr, ctrls) {
      
      /**
       * Updates the provided element's checked property to be 'checked' if not defined, otherwise defines it as
       * 'checked'.
       */
      function toggleCheckbox($scope, $element) {
        var isChecked = angular.isDefined($element.attr('checked'));
        if (isChecked) {
          $element.removeAttr('checked');
        } else {
          $element.attr('checked', 'checked');
        }

        updateChecked($scope, $element);
      }
      
      function updateChecked($scope, $element) {
        $scope.checked = $element.attr('checked') === 'checked';
        $scope.disabled = $element.attr('disabled') === 'disabled';
      }
      
      function ngModelLink($scope, $element, $attr, $ctrl) {
        var trueValue = $attr.ngTrueValue,
          falseValue = $attr.ngFalseValue;
          
        trueValue = (!angular.isString(trueValue)) ? true : trueValue;
        falseValue = (!angular.isString(falseValue)) ? false : falseValue;

        $element.on('click', function() {
          if (!$element.attr('disabled')) {
            $scope.$apply(function() {
              toggleCheckbox($scope, $element);
              $ctrl.$setViewValue($element.attr('checked') === 'checked');
            });
          }
        });

        $ctrl.$render = function() {
          $element[0].checked = $ctrl.$viewValue;
        };

        // Override the standard `$isEmpty` because a value of `false` means empty in a checkbox.
        $ctrl.$isEmpty = function(value) {
          return value !== trueValue;
        };

        $ctrl.$formatters.push(function(value) {
          return value === trueValue;
        });

        $ctrl.$parsers.push(function(value) {
          return value ? trueValue : falseValue;
        });

        updateChecked($scope, $element);
      }
      
      /**
       * This function emulates the functions of a regular checkbox, by toggling when it's clicked and updating the
       * model's attributes to reflect that it has been checked.
       */
      function simulateNativeCheckbox($scope, $element, $attr) {
        $element.on('click', function() {
          $scope.$apply(function() {
            if (!$element.attr('disabled')) {
              toggleCheckbox($scope, $element);
            }
          });
        });
      };
      
      $attr.$observe('checked', function() {
        $scope.checked = !!$element.attr('checked');
        updateChecked($scope, $element);
      });
      
      $attr.$observe('disabled', function() {
        $scope.disabled = !!$element.attr('disabled');
        updateChecked($scope, $element);
      });

      if (ctrls[0]) {
        ngModelLink($scope, $element, $attr, ctrls[0]);
      } else {
        simulateNativeCheckbox($scope, $element, $attr);
      }
    }

    return {
      replace: true,
      restrict: 'AE',
      transclude: true,
      priority: 0,
      require: ['?ngModel'],
      link: link,
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