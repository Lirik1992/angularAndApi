'use strict';

eventsApp.controller('ProfileController',
  function ProfileController($scope, HttpService) {
    HttpService.get('GET', 'http://localhost:3000/users/profile/user', function (data) {
      $scope.name = data.split(',').splice(2,3)[0].split(':')[1];
      $scope.$apply();
    })
  }
);
