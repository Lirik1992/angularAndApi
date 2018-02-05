(function() {
  'use strict'

  angular.module('mainApp')
    .factory('homeService',['$q', '$timeout', homeService]);

    function homeService($q, $timeout) {

      var greeting = 'Hello';

      return {
        getAllDevices: getAllDevices,
        getAllUsers: getAllUsers,
        greeting: greeting
      }

      function getAllDevices() {
        var devicesArray = [
          {
            id: 1,
            name: 'Arduino home',
            type: 'temp/hum',
            status: 'working',
            hasError: false
          },
          {
            id: 2,
            name: 'Arduino nextgen',
            type: 'geo',
            status: 'unstable connection',
            hasError: false
          },
          {
            id: 3,
            name: 'Arduino shiet',
            type: 'wind speed',
            status: 'broken',
            hasError: true
          },
          {
            id: 4,
            name: 'Arduino X',
            type: 'move sensor',
            status: 'working',
            hasError: false
          },
          {
            id: 5,
            name: 'Arduino XVI',
            type: 'GPS',
            status: 'working',
            hasError: false
          }
        ];

        var deferred = $q.defer();
      
        $timeout(function() {

          var successful = true;

          if(successful) {

            deferred.resolve(devicesArray);
          } else {
            deferred.reject('Error happened')
          }

        }, 1000);

        return deferred.promise;
      }

      function getAllUsers() {

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

        $timeout(function() {
          deferred.resolve(usersArray)

        }, 1500);

        return deferred.promise;
      }
    }

}())