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
        };
        $scope.collapse = function() {
          $scope.collapsed = !$scope.collapsed;
        };
        $scope.editProfile = function() {
          $location.path('/editProfile/'+ $scope.user._id)
        }
      }
    }
  });

  angular.module('mainApp')
    .directive('devicesWidget', function() {
      return {
        restrict: 'E',
        scope: true,
        templateUrl: '/js/directives/devicesWidget/devices.html',
        controller: function($scope) {
          $scope.collapsed = true;
          $scope.collapse = function() {
            $scope.collapsed = !$scope.collapsed
          }
        }
      }
    })
}());
