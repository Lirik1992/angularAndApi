'use strict';

eventsApp.controller('ProfileController',
  function ProfileController($scope, HttpService) {
    HttpService.get('GET', 'http://localhost:3000/users/profile/user', function (data) {
      $scope.name = data.split(',').splice(2,3)[0].split(':')[1];
      $scope.email = data.split(',').splice(2,3)[1].split(':')[1];
      $scope.username = data.split(',').splice(2,3)[2].split(':')[1];
      $scope.$apply();
    })
  }
);
