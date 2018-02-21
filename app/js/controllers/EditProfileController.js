(function () {
  'use strict';

  angular.module('mainApp')
      .controller('EditDeviceController', ['$routeParams', 'homeService', '$log', '$cookies', '$cookieStore', '$location', EditDeviceController]);

  function EditDeviceController($routeParams, homeService, $log, $cookies, $cookieStore, $location) {

      var vm = this;

      $log.debug()
  }
}());