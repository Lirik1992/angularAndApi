(function() {
  'use strict'

  angular.module('mainApp')
    .factory('homeSevice', homeService);

    function homeService() {

      return {
        getAllDevices: getAllDevices
      }

      function getAllDevices() {
        return [
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
      }
    }

}())