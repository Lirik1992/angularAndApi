angular.module('mainApp', [])
.directive('profileDirective', function() {
  return {
    restrict: 'A',
    link: function() {
      console.log('Linked profileDirective')
    }
  }
})
