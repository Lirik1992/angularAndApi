(function(){
    angular.module('mainApp')
        .factory('DeviceLoggerInteceptor', ['$q', '$log', DeviceLoggerInteceptor]);

    function DeviceLoggerInteceptor($q, $log) {

        return {
            request: requestInterceptor,
            responseError: responseErrorInterceptor
        };

        function requestInterceptor(config) {
            $log.debug('HTTP ' + config.method + ' request ' + config.url);
            return config;
        }

        function responseErrorInterceptor(response) {
            $log.debug('HTTP ' + response.config.method + ' response error ' + response.config.url);
            return $q.reject(response);
        }
    }
}());