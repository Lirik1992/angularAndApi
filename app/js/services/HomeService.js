(function () {
    'use strict';

    angular.module('mainApp')
        .factory('homeService', ['$q', '$timeout', '$http', 'constants', homeService]);

    function homeService($q, $timeout, $http, constants) {

        return {
            getAllDevices: AllDevices,
            getAllUsers: AllUsers,
            getCurrentAuthorizedUserDevices: CurrentAuthorizedUserDevices,
            getClickedUserDevices: ClickedUserDevices,
            getUserById: UserById,
            saveDeviceById: SaveNewDevice
        };

        function SaveNewDevice(data) {
            return $http.post(
                'http://localhost:3000/devices/save/' + localStorage.getItem('ID'),
                data
                )
                .then(sendResponseData)
                .catch(sendGetError)
        }

        function UserById(id) {
            return $http.get(
                'http://localhost:3000/users/profile/' + id,
                {
                    headers: {'Content-Type': 'application/json'}
                })
                .then(sendResponseData)
                .catch(sendGetError)
        }

        function ClickedUserDevices(id) {
            return $http.get(
                'http://localhost:3000/devices/getDevice/' + id,
            )
                .then(sendResponseData)
                .catch(sendGetError)
        }

        function AllDevices() {
            return $http.get(
                'http://localhost:3000/devices/allDevices',
            )
                .then(sendResponseData)
                .catch(sendGetError)
        }

        function CurrentAuthorizedUserDevices() {
            return $http.get(
                'http://localhost:3000/devices/getDevice/' + localStorage.getItem('ID'),
            )
                .then(sendResponseData)
                .catch(sendGetError)

        }

        // Get all users
        function AllUsers() {
            return $http.get(
                'http://localhost:3000/users/getall',
            )
                .then(sendResponseData)
                .catch(sendGetError)
        }

        function sendResponseData(response) {
            return response.data;
        }

        function sendGetError(response) {
            return $q.reject('Error retrieving devices. HTTP status : ' + response.status);
        }
    }

}());