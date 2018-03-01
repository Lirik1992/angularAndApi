(function(){
    angular.module('mainApp')
        .factory('weatherFactory', ['$q', '$http', weatherFactory]);

        function weatherFactory($q, $http){
            return {
                getCurrentWeather: CurrentWeather
            };

            function CurrentWeather(city) {
                return $http.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=de7f188337ad65ee03042dfcbe351521&type=accurate&mode=json&units=metric')
                    .then(WeatherSuccess)
                    .catch(WeatherError)
            }

            function WeatherSuccess(response) {
                return response.data;
            }

            function WeatherError(err) {
                return $q.reject('Error retrieving devices. HTTP status : ' + err.status);
            }
        }
}());