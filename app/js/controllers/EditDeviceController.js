(function() {


  angular.module('mainApp')
    .controller('EditDeviceController', ['$routeParams', 'homeService', '$cookies', '$cookieStore', EditDeviceController]);

    function EditDeviceController($routeParams, homeService, $cookies, $cookieStore) {

      var vm = this;

      homeService.getAllDevices()
        .then(function(devices) {
            console.log(devices);
          vm.currentDevice = devices.filter(function(item) {
            return item.id === $routeParams.deviceID;
          })[0];
          console.log(vm.currentDevice);

          vm.setAsFavourite = function() {
              $cookies.favouriteDevice = vm.currentDevice;
          };

          $cookieStore.put('lastEdited', vm.currentDevice);
        });
    }
}());