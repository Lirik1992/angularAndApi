(function () {
    'use strict';

    angular.module('mainApp')
        .controller('AddDeviceController', [ 'homeService', '$scope', '$location', '$log', 'toaster', '$timeout', 'toasterService', AddDeviceController]);

    function AddDeviceController(homeService, $scope, $location, $log, toaster, $timeout, toasterService) {
        var vm = this;

        vm.device = {
            name: '',
            type: '',
            model: ''
        };

        vm.cancelCreation = function() {
            $timeout(function() {
                toasterService.getConfiguredToaster('info', 'Info', 'Canceled device creation')
            }, 100)
            $location.path('/devices');
        };

        vm.saveDevice = function() {
            $log.debug(JSON.stringify(vm.device));

            homeService.saveDeviceById(JSON.stringify(vm.device))
                .then(getSavedDeviceResponse, null)
                .catch(getError)
        };

        function getSavedDeviceResponse(response) {
            $log.debug(response);
            $timeout(function() {
                toasterService.getConfiguredToaster('success', 'Success', 'New device has been created')
            }, 100);
            $location.path('/devices');
        }

        function getError(errorMsg) {
            $log.debug('Error occured' + errorMsg);
            toasterService.getConfiguredToaster('error', 'Error', 'Failed to create new device')
        }

    }
}());