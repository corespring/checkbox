## Corespring `</checkbox>` Directive

A substitute for `input[type=checkbox]` that can be styled across all browsers.

[![Build Status](https://travis-ci.org/corespring/checkbox.svg)](https://travis-ci.org/corespring/checkbox)

### Directive Info

This directive executes at priority level 0.

**NOTE**: Although this directive operates the same way as `input[type=checkbox]`, you may *not* alter the `checked` and `disabled` attributes of this directive outside of an Angular context. If these attributes are set using, for example, jQuery's `$.attr` method, the changes will not be picked up by Angular, and the directive will not update. This is a known issue with no reasonable workaround for 100% compatibility (although an improvement may be to add `MutationObserver` support for evergreen browsers, but this will not work for IE10 and under).

---

### Usage

    <checkbox
      ng-model=""
      [name=""]
      [ng-true-value=""]
      [ng-false-value=""]
      [ng-change=""]>


### Arguments

| Param                     | Type       | Details
|---------------------------|------------|--------
| ngModel                   | string     | Assignable angular expression to data-bind to.
| name *(optional)*         | string     | Property name of the form under which the control is published.
| ngTrueValue *(optional)*  | expression | The value to which the expression should be set when selected.
| ngFalseValue *(optional)* | expression | The value to which the expression should be set when not selected.
| ngChange *(optional)*     | string     | Angular expression to be executed when input changes due to user interaction with the input element.

### Example

    <script>
      angular.module('checkboxExample', [])
        .controller('ExampleController', ['$scope', function($scope) {
          $scope.value1 = true;
          $scope.value2 = 'YES'
        }]);
    </script>
    <form name="myForm" ng-controller="ExampleController">
      Value1: <checkbox ng-model="value1"> <br/>
      Value2: <checkbox ng-model="value2"
                     ng-true-value="'YES'" ng-false-value="'NO'"> <br/>
      <tt>value1 = {{value1}}</tt><br/>
      <tt>value2 = {{value2}}</tt><br/>
     </form>


## Testing

    npm install
    bower install
    grunt
    
    
## License

This library is distributed under the MIT License found in the provided [LICENSE](/LICENSE) file.