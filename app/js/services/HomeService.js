(function () {
    'use strict'

    angular.module('mainApp')
        .factory('homeService', ['$q', '$timeout','$http', 'constants', homeService]);

    function homeService($q, $timeout, $http, constants) {

        var greeting = 'Hello';

        return {
            getAllDevices: AllDevices,
            getAllUsers: AllUsers,
            getCurrentAuthorizedUserDevices: CurrentAuthorizedUserDevices,
            getClickedUserDevices: ClickedUserDevices,
            getUserById: UserById,
            greeting: greeting
        };

        function UserById(id) {
            return $http({
                method: 'GET',
                url: 'http://localhost:3000/users/profile/' + id,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(sendResponseData)
                .catch(sendGetError)
        }

        function ClickedUserDevices(id) {
            return $http({
                method: 'GET',
                url: 'http://localhost:3000/devices/getDevice/' + id,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(sendResponseData)
                .catch(sendGetError)
        }

        function AllDevices() {
            return $http({
                method: 'GET',
                url: 'http://localhost:3000/devices/allDevices',
                headers: {
                    'Content-Type': 'application/json',
                    'PS-Lirikus-Version': constants.APP_VERSION
                }
            })
                .then(sendResponseData)
                .catch(sendGetError)
        }

        function CurrentAuthorizedUserDevices() {
            return $http({
                method: 'GET',
                url: 'http://localhost:3000/devices/getDevice/' + localStorage.getItem('ID'),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(sendResponseData)
                .catch(sendGetError)

        }

        // Get all users
        function AllUsers() {
            return $http({
                method: 'GET',
                url: 'http://localhost:3000/users/getall',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
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