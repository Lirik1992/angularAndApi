(function() {
  'use strict';

  angular.module('mainApp')
    .directive('navigationBar', function() {
      return {
        restrict: 'E',
        templateUrl: './js/directives/navigationBar/navigation.html'
      }
    })
}())