'use strict';

eventsApp.controller('ProfileController',['$scope', 'UserService',
  function ProfileController($scope, Http) {
    $scope.profile = getAll();


    function getAll() {
      Http.get('GET', 'http://localhost:3000/users/getall', function (err,data) {
        console.log(data)
      })
    }
  }])
