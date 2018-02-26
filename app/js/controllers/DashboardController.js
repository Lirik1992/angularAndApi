(function () {
    'use strict';

    angular.module('mainApp')
        .controller('DashboardController', ['$q', 'homeService', '$log', '$cookies', 'toaster', 'toasterService', DashboardController]);

    function DashboardController($q, homeService, $log, $cookies, toaster, toasterService) {
        var vm = this;

        vm.getCurrentUserDevices = function (id) {
            $log.debug(id);
            localStorage.setItem('CurrentUserId', id);
            vm.currentUserId = localStorage.getItem('CurrentUserId');

            homeService.getClickedUserDevices(id)
                .then(getClickedUserDevices)
                .catch(errorCallback);

            function getClickedUserDevices(devices) {
                $log.debug(devices);
                if (Number(devices.data) === 0) {
                    $log.debug('this user do not have devices');
                    vm.userName = 'Nobody';
                    vm.allDevices = [
                        {
                            name: 'This could be your device',
                            type: 'With the type'
                        },
                        {
                            name: 'But you did not create devices',
                            type: 'Hurry up and take this opportunity'
                        }
                    ]
                } else {
                    homeService.getUserById(id)
                        .then(getUserName)
                        .catch(errorCallback);
                    vm.allDevices = devices.data.data;
                    $log.debug(vm.allDevices.length);
                }
            }

            function getUserName(user) {
                vm.userName = user.data.name;
            }

        };

        homeService.getAllDevices()
            .then(getDevicesSuccess, null)
            .catch(errorCallback);

        function getDevicesSuccess(devices) {
            $log.debug(devices);
        }

        function errorCallback(errorMsg) {
            $log.debug('Error message ' + errorMsg);
            toasterService.getConfiguredToaster('error', 'Error', 'Failed to load all users info');
        }

        homeService.getAllUsers()
            .then(getAllUsersSuccess, null)
            .catch(errorCallback);

        function getAllUsersSuccess(users) {
            vm.allUsers = users;
            toasterService.getConfiguredToaster('success', 'Success', 'All users info has been loaded');
        }

        // var devicesPromise = homeService.getAllDevices();
        // var usersPromise = homeService.getAllUsers();

        // $q.all([devicesPromise, usersPromise])
        //   .then(getAllDataSuccess)
        //   .catch(getAllDataError);
        //
        // function getAllDataSuccess(dataArray) {
        //   $log.debug(dataArray);
        //   vm.allDevices = dataArray[0];
        //   vm.allUsers = dataArray[1];
        // }
        //
        // function getAllDataError(reason) {
        //   $log.debug(reason);
        // }
        //
        // vm.favouriteDevice = $cookies.favouriteDevice;

    }
}());
