(function () {
    'use strict';

    angular.module('mainApp')
        .controller('AddDeviceController', [ 'homeService', '$scope', '$location', '$log', AddDeviceController]);

    function AddDeviceController(homeService, $scope, $location, $log) {
        var vm = this;

        vm.device = {
            name: '',
            type: '',
            model: ''
        };

        vm.cancelCreation = function() {
            $location.path('/devices');
        };

        vm.saveDevice = function() {
            $log.debug(JSON.stringify(vm.device));

            homeService.saveDeviceById(JSON.stringify(vm.device))
                .then(getSavedDeviceResponce, null)
                .catch(getError)
        };

        function getSavedDeviceResponce(responce) {
            $log.debug(responce);
            $location.path('/devices');
        }

        function getError(errorMsg) {
            $log.debug('Error occured' + errorMsg)
        }

    }
}());