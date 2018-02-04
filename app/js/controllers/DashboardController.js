(function () {
  'use strict'

  angular.module('mainApp')
    .controller('DashboardController', DashboardController);

    function DashboardController(homeSevice) {

      var vm = this;
      vm.dev = homeSevice.getAllDevices();
    }


}())