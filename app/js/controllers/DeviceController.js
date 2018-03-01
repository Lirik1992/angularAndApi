(function () {
    'use strict';

    angular.module('mainApp')
        .controller('DeviceController', ['homeService', '$log', '$scope', 'toaster', 'toasterService', DeviceController]);

    function DeviceController(homeService, $log, $scope, toaster, toasterService) {

        var vm = this;

        vm.getDevice = function () {
            // TODO: Figure out what can i do here on ng-click
        };

        var socket = io('http://localhost:3000');
        socket.on('connected', function (msg) {
            console.log(msg)
        });


        homeService.getCurrentAuthorizedUserDevices()
            .then(getDevicesSuccess, null)
            .catch(errorCallback);

        function getDevicesSuccess(devices) {
            $log.debug(devices);
            $log.debug(devices.data.data);
            vm.devices = devices.data.data;
            toasterService.getConfiguredToaster('success', 'Success', 'Your devices has been loaded');
        }

        function errorCallback(errorMsg) {
            $log.debug('Error message ' + errorMsg);
            toasterService.getConfiguredToaster('error', 'Error', 'Failed to load your devices')
        }
    }
})();