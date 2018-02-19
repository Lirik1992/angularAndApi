(function () {
    'use strict';

    angular.module('mainApp')
        .controller('DashboardController', ['$q', 'homeService', '$log', '$cookies', DashboardController]);

    function DashboardController($q, homeService, $log, $cookies) {
        var vm = this;

        vm.getCurrentUserDevices = function (id) {
            console.log(id);
            homeService.getClickedUserDevices(id)
                .then(getClickedUserDevices)
                .catch(errorCallback);

            function getClickedUserDevices(devices) {
                console.log(devices);
                if (Number(devices.data) === 0) {
                    console.log('this user do not have devices');
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
                    console.log(vm.allDevices.length);
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
            console.log(devices);
        }

        function errorCallback(errorMsg) {
            console.log('Error message ' + errorMsg);
        }


        homeService.getAllUsers()
            .then(getAllUsersSuccess)
            .catch(errorCallback);

        function getAllUsersSuccess(users) {
            vm.allUsers = users;
        }

        // var devicesPromise = homeService.getAllDevices();
        // var usersPromise = homeService.getAllUsers();

        // $q.all([devicesPromise, usersPromise])
        //   .then(getAllDataSuccess)
        //   .catch(getAllDataError);
        //
        // function getAllDataSuccess(dataArray) {
        //   console.log(dataArray);
        //   vm.allDevices = dataArray[0];
        //   vm.allUsers = dataArray[1];
        // }
        //
        // function getAllDataError(reason) {
        //   console.log(reason);
        // }
        //
        // vm.favouriteDevice = $cookies.favouriteDevice;

    }
}());
