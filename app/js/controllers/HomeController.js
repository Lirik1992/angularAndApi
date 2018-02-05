(function() {

  angular.module('mainApp')
    .controller('HomeController', ['appData', 'homeService', '$route', '$log', HomeController]);

    function HomeController(appData, homeService, $route, $log) {
      var vm = this;

      vm.appName = appData.appName;
      vm.appDescription = appData.appDescription;
      vm.appVersion = appData.appVersion;

      
      vm.name = 'Dima';
      vm.email = 'Dima';
      vm.username = 'Dima';

      vm.greeting = homeService.greeting;


    }
})();