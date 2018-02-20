(function () {


    angular.module('mainApp')
        .controller('EditDeviceController', ['$routeParams', 'homeService', '$log', '$cookies', '$cookieStore', EditDeviceController]);

    function EditDeviceController($routeParams, homeService, $log, $cookies, $cookieStore) {

        var vm = this;

        $log.debug($routeParams.deviceID);
        $log.debug($routeParams.device);

        homeService.getClickedUserDevices($routeParams.deviceID)
            .then(function (devices) {
                $log.debug(devices.data.data);
                vm.currentDevice = devices.data.data[$routeParams.device]
            });

        vm.updateDevice = function() {
            $log.debug(vm.currentDevice);

            homeService.updateDevice(vm.currentDevice ,$routeParams.deviceID, $routeParams.device)
                .then(updateDeviceSuccess, null)
                .catch(updateDeviceError)
        };

        function updateDeviceSuccess(responce) {
            $log.debug(responce)
        }

        function updateDeviceError(error) {
            $log.debug('Something bad happened ' + error)
        }





        //     vm.setAsFavourite = function() {
        //         $cookies.favouriteDevice = vm.currentDevice;
        //     };
        //
        //     $cookieStore.put('lastEdited', vm.currentDevice);
        //   });
    }
}());