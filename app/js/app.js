(function() {
	'use strict';
	var mainApp = angular.module('mainApp', [ 'ngSanitize', 'ngRoute' ]);

	mainApp.provider('dataService', function() {
		this.$get = function() {
      var name = 'Hello';
      var i = 1;
      var devices = [
				{
					id: tableIterator(),
					name: 'Arduino home',
					type: 'temp/hum',
					status: 'working',
					hasError: false
				},
				{
					id: tableIterator(),
					name: 'Arduino nextgen',
					type: 'geo',
					status: 'unstable connection',
					hasError: true
				},
				{
					id: tableIterator(),
					name: 'Arduino shiet',
					type: 'wind speed',
					status: 'broken',
					hasError: false
				}
      ];
      
			function tableIterator() {
				return i++;
      }
      
			return {
        greeting: name,
        getDevices: devices
			};
		};
	});

	mainApp.config([
		'$logProvider',
		'$routeProvider',
		function($logProvider, $routeProvider) {
			$logProvider.debugEnabled(true);

			$routeProvider
				.when('/', {
					controller: 'HomeController',
					controllerAs: 'home',
					templateUrl: '/templates/home.html'
				})
				.when('/devices', {
					controller: 'DeviceController',
					controllerAs: 'deviceVM',
					templateUrl: '/templates/device.html'
				});
		}
	]);
})();
