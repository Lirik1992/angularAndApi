'use strict';

eventsApp.controller('DeviceController', 
function DeviceController($scope) {
  var i = 1;
  $scope.devices = [
    {
      id: tableIterator(),
      name: 'Arduino home',
      type: 'temp/hum',
      status: 'working',
      hasError: false
    },
    {
      id: tableIterator(),
      name: 'Arduino nextgen',
      type: 'geo',
      status: 'unstable connection',
      hasError: true

    },
    {
      id: tableIterator(),
      name: 'Arduino shiet',
      type: 'wind speed',
      status: 'broken',
      hasError: false
    }
  ]
  function tableIterator() {
    return i++;
  }


})