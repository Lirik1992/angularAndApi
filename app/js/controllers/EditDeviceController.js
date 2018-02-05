(function() {
  'use strict'

  angular.module('mainApp')
    .controller('EditDeviceController', ['$routeParams', 'homeService', EditDeviceController]);

    function EditDeviceController($routeParams, homeService) {

      var vm = this;

      homeService.getAllDevices()
        .then(function(devices) {
          vm.currentDevice = devices.filter(function(item) {
            return item.device_id = $routeParams.deviceID;
          })[0];
        });
    }
}())