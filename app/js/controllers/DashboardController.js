(function() {
	'use strict';

  angular.module('mainApp')
    .controller('DashboardController', [ '$q' ,'homeService', '$log', '$cookies', DashboardController ]);

	function DashboardController($q, homeService, $log, $cookies) {
    var vm = this;

    var devicesPromise = homeService.getAllDevices();
    var usersPromise = homeService.getAllUsers();

    $q.all([devicesPromise, usersPromise])
      .then(getAllDataSuccess)
      .catch(getAllDataError);

    function getAllDataSuccess(dataArray) {
      console.log(dataArray);
      vm.allDevices = dataArray[0];
      vm.allUsers = dataArray[1];
    }

    function getAllDataError(reason) {
      console.log(reason);
    }

    vm.favouriteDevice = $cookies.favouriteDevice;

    $log.warn('sfdsfs')
    $log.debug('Fdsfsdfsd');

    // homeService.getAllDevices()
    //   .then(getDevicesSuccess, null)
    //   .catch(errorCallback);

    // function getDevicesSuccess(devices) {
    //   vm.allDevices = devices;
    // }

    // function errorCallback(errorMsg) {
    //   console.log('Error message ' + errorMsg);
    // }

    // homeService.getAllUsers()
    //   .then(getAllUsersSuccess)
    //   .catch(errorCallback);

    // function getAllUsersSuccess(users) {
    //   vm.allUsers = users;
    // }

	}
})();
