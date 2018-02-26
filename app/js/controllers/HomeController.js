(function() {

  angular.module('mainApp')
    .controller('HomeController', ['appData', 'homeService', '$scope', '$log', '$route', 'toaster', 'toasterService', HomeController]);

    function HomeController(appData, homeService, $scope, $log, $route, toaster, toasterService) {
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
        
        toasterService.getConfiguredToaster('success', 'Success', 'Devices info has been loaded successfully')
      }

      function getDevicesError(err) {
        $log.debug(err);
        toasterService.getConfiguredToaster('error', 'Error', 'Failed to load devices info')
      }
      
      homeService.getUserById(localStorage.getItem('ID'))
          .then(getUserSuccess, null)
          .catch(getUserError);

      function getUserSuccess(user) {
        $log.debug(user);
        $scope.user = user.data;
        toasterService.getConfiguredToaster('success', 'Success', 'Profile info has been loaded successfully')
      }

      function getUserError(err) {
        $log.debug('Error occured ' + err);
        toasterService.getConfiguredToaster('error', 'Error', 'Failed to load profile info')
      }

      $scope.logoutUser = function() {
        $log.debug('User logged out');
        localStorage.clear();
      }

    }
})();