(function() {

  angular.module('mainApp')
    .controller('HomeController', ['appData', 'homeService', '$scope', '$log', '$route', HomeController]);

    function HomeController(appData, homeService, $scope, $log, $route) {
      var vm = this;

      vm.appName = appData.appName;
      vm.appDescription = appData.appDescription;
      vm.appVersion = appData.appVersion;
      vm.welcome = 'Welcome to the Lirikus App';
      $scope.devices = {};
      
      $log.debug(localStorage.getItem('ID'))

      homeService.getCurrentAuthorizedUserDevices()
          .then(getCurrentUserDevices, null)
          .catch(getDevicesError)

      function getCurrentUserDevices(currentDevices) {
        $log.debug(currentDevices.data.data.length);
        $scope.devices.userDevices = currentDevices.data.data.length;
      }

      homeService.getAllDevices()
          .then(getAllDevicesSuccess, null)
          .catch(getDevicesError)

      function getAllDevicesSuccess(devices) {
        $log.debug(devices)
        var countInnerArrays = devices.data.length;
        $log.debug(countInnerArrays)
        var countAllElements = 0;
        (devices.data).forEach(element => {
          $log.debug(element.data.length);
          countAllElements += element.data.length
        });
        $log.debug(countAllElements)
        $scope.devices.totalCount = countAllElements;
      }

      function getDevicesError(err) {
        $log.debug(err)
      }
      
      homeService.getUserById(localStorage.getItem('ID'))
          .then(getUserSuccess, null)
          .catch(getUserError);

      function getUserSuccess(user) {
        $log.debug(user);
        $scope.user = user.data;
      }

      function getUserError(err) {
        $log.debug('Error occured ' + err);
      }


      $scope.logoutUser = function() {
        $log.debug('User logged out');
        localStorage.clear();
      }

    }
})();