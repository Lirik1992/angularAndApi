(function () {
    'use strict';
    var mainApp = angular.module('mainApp', ['ngSanitize', 'ngRoute', 'ngCookies', 'toaster', 'ngAnimate']);

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
        '$locationProvider',
        '$httpProvider',
        function ($logProvider, $routeProvider, $locationProvider, $httpProvider) {
            $logProvider.debugEnabled(true);


            //$locationProvider.hashPrefix('!')
            // $locationProvider.html5Mode({
            //     enabled: true,
            //     requireBase: true,
            //     rewriteLinks: true
            // });

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
                .when('/editDevice/:deviceID/:device', {
                    controller: 'EditDeviceController',
                    controllerAs: 'deviceEditor',
                    templateUrl: '/templates/editDevice.html'
                })
                .when('/dashboard', {
                    controller: 'DashboardController',
                    controllerAs: 'dashboardVM',
                    templateUrl: '/templates/dashboard.html',
                    // resolve: {
                    //     users: function(homeService) {
                    //         return homeService.getAllUsers();
                    //     }
                    // }
                })
                .when('/editProfile/:userId', {
                    controller: 'EditProfileController',
                    constrollerAs: 'profileEditorVM',
                    templateUrl: '/templates/editProfile.html'
                })
                .otherwise('/')
        }
    ]);

    mainApp.run(['$rootScope', '$templateCache', function ($rootScope, $templateCache) {

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
