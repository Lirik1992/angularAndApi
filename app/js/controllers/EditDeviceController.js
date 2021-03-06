(function () {
    'use strict';

    angular.module('mainApp')
        .controller('EditDeviceController', ['$routeParams', 'homeService', '$log', '$cookies', '$cookieStore', '$location', '$timeout', 'toaster', 'toasterService', EditDeviceController]);

    function EditDeviceController($routeParams, homeService, $log, $cookies, $cookieStore, $location,  $timeout, toaster, toasterService) {

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
            if(vm.currentDevice.name === undefined && vm.currentDevice.type === undefined &&
                vm.currentDevice.model === undefined) {
                    $log.debug('you can not leave fields empty')
                } else {
                    homeService.updateDevice(vm.currentDevice ,$routeParams.deviceID, $routeParams.device)
                        .then(updateDeviceSuccess, null)
                        .catch(updateDeviceError)
                }
        };

        vm.cancelUpdating = function() {
            $log.debug('Updating canceled');
            $timeout(function(){
                toasterService.getConfiguredToaster('info', 'Info', 'Device editing was canceled');
            }, 100);
            $location.path('/dashboard');
        }

        function updateDeviceSuccess(response) {
            $log.debug(response);
            $timeout(function() {
                toasterService.getConfiguredToaster('success', 'Success', 'Device has been successfully updated');
            }, 100)
            $location.path('/home');
        }

        function updateDeviceError(error) {
            $log.debug('Something bad happened ' + error);
            toasterService.getConfiguredToaster('error', 'Error', 'Failed to update device. Do not duplicate your devices!')
        }





        //     vm.setAsFavourite = function() {
        //         $cookies.favouriteDevice = vm.currentDevice;
        //     };
        //
        //     $cookieStore.put('lastEdited', vm.currentDevice);
        //   });
    }
}());