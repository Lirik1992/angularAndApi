(function () {
  'use strict';

  angular.module('mainApp')
    .controller('DeviceController', ['homeService', DeviceController]);

  function DeviceController(homeService) {
    
    var vm = this;

    vm.getDevice = function() {
      console.log("dfsdf")
    };

    homeService.getCurrentAuthorizedUserDevices()
        .then(getDevicesSuccess, null)
        .catch(errorCallback);


      function getDevicesSuccess(devices) {
          console.log(devices.data.data);
          vm.devices = devices.data.data;
      }

      function errorCallback(errorMsg) {
          console.log('Error message ' + errorMsg);
      }
  }

})();