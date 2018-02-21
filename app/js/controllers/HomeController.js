(function() {

  angular.module('mainApp')
    .controller('HomeController', ['appData', 'homeService', '$scope', '$log', '$route', HomeController]);

    function HomeController(appData, homeService, $scope, $log, $route) {
      var vm = this;

      vm.appName = appData.appName;
      vm.appDescription = appData.appDescription;
      vm.appVersion = appData.appVersion;
      vm.welcome = 'Welcome to the Lurukus App';



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