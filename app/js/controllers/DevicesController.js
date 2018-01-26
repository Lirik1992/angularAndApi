'use strict';

eventsApp.controller('DeviceController',
  function DeviceController($scope) {
    $scope.local = {
      date: new Date()
    }
    $scope.saveEvent = function(device, newDevice) {
      
    }
    $scope.cancelEvent = function() {
      window.location = '/EventDetails.html'
    }
  })