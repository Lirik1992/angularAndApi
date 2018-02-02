(function() {

  angular.module('mainApp')
    .controller('HomeController', ['dataService', '$route', '$log', HomeController]);

    function HomeController(dataService, $route, $log) {
      var vm = this;
      
      vm.name = 'Dima';
      vm.email = 'Dima';
      vm.username = 'Dima';

      vm.greeting = dataService.greeting;

    }
})();