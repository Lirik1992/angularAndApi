(function() {
  'use strict';

  angular.module('mainApp')
  .directive('profileCard', function() {
    return {
      restrict: 'E',
      scope: {
        user: '='
      },
      templateUrl: '/js/directives/profileDirective/profile.html',
      controller: function($scope, $location) {
        $scope.collapsed = false;
        $scope.rankUp = function(user) {
          $scope.user.rank = 'GOD';
        }
        $scope.collapse = function() {
          $scope.collapsed = !$scope.collapsed;
        }
        $scope.editProfile = function() {
          $location.path('/editProfile/'+ $scope.user._id)
        }
      }
    }
  })
}())
