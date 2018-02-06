(function () {
    'use strict';
    var mainApp = angular.module('mainApp', ['ngSanitize', 'ngRoute', 'ngCookies']);

    mainApp.provider('appData', ['constants', function (constants) {
        this.$get = function () {

            var appName = constants.APP_NAME;
            console.log(appName);
            var appDescription = constants.APP_DESCRIPTION;
            var appVersion = constants.APP_VERSION;

            return {
                appName: appName,
                appDescription: appDescription,
                appVersion: appVersion
            };
        };
    }]);

    mainApp.config([
        '$logProvider',
        '$routeProvider',
        function ($logProvider, $routeProvider) {
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
                })
                .when('/addDevice', {
                    controller: 'AddDeviceController',
                    controllerAs: 'addDeviceVM',
                    templateUrl: '/templates/addDevice.html'
                })
                .when('/editDevice/:deviceID', {
                    controller: 'EditDeviceController',
                    controllerAs: 'deviceEditor',
                    templateUrl: '/templates/editDevice.html'
                })
                .when('/dashboard', {
                    controller: 'DashboardController',
                    controllerAs: 'dashboardVM',
                    templateUrl: '/templates/dashboard.html'
                })
                .otherwise('/')
        }
    ]);

    mainApp.run(['$rootScope', function ($rootScope) {
        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            console.log('successfully changed routes')
        });

        $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
            console.log('error changing routes');

            console.log(event);
            console.log(current);
            console.log(previous);
            console.log(rejection)
        })
    }])
})();
