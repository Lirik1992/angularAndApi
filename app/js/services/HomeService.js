(function () {
    'use strict'

    angular.module('mainApp')
        .factory('homeService', ['$q', '$timeout','$http', 'constants', homeService]);

    function homeService($q, $timeout, $http, constants) {

        var greeting = 'Hello';

        return {
            getAllDevices: AllDevices,
            getAllUsers: AllUsers,
            greeting: greeting
        };

        function AllDevices() {

            return $http({
                method: 'GET',
                url: 'localhost:3000',

            })
        }

        function AllUsers() {

            var usersArray = [
                {
                    id: 1,
                    name: 'Volodia',
                    username: 'Master',
                    password: '111',
                    email: 'master@f.com'
                },
                {
                    id: 2,
                    name: 'Semen',
                    username: 'Chucha',
                    password: '222',
                    email: 'chucha@list.ru'
                },
                {
                    id: 3,
                    name: 'Gena',
                    username: 'Bober',
                    password: '333',
                    email: 'bober@gmail.com'
                }
            ];

            var deferred = $q.defer();

            $timeout(function () {
                deferred.resolve(usersArray)

            }, 1500);

            return deferred.promise;
        }
    }

}())