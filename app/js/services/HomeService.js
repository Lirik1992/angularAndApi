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
            saveDeviceById: SaveNewDevice,
            updateDevice: UpdateDeviceById
        };

        function UpdateDeviceById(data, id, index) {
            return $http.post(
                'http://localhost:3000/devices/update/' + id + '/' + index,
                data
            )
                .then(sendResponseData)
                .catch(sendGetError)
        }

        function SaveNewDevice(data) {
            return $http.post(
                'http://localhost:3000/devices/save/' + localStorage.getItem('ID'),
                data
                // {
                //     transformRequest: transformPostRequest
                // }
                )
                .then(sendResponseData)
                .catch(sendGetError)
        }

        // Request transformator, currently there is no reason to use such
        
        // function transformPostRequest(data, headersGetter, status) {
        //     data = JSON.parse(data);
        //     data.hasError = true;
        //     console.log(data + headersGetter);
        //     return JSON.stringify(data);
        // }

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
                {
                    transformResponse: transformGetUsers
                }
            )
                .then(sendResponseData)
                .catch(sendGetError)
        }

        function transformGetUsers(data, headersGetter, status) {
            var transformed = angular.fromJson(data);

            transformed.forEach(function(currentValue, index, array) {
                currentValue.dateDownloaded = new Date();
            });
            console.log(transformed);
            return transformed;
        }

        function sendResponseData(response) {
            return response.data;
        }

        function sendGetError(response) {
            return $q.reject('Error retrieving devices. HTTP status : ' + response.status);
        }
    }

}());