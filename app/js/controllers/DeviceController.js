(function () {
  'use strict';

  angular.module('mainApp')
    .controller('DeviceController', ['homeService', '$log', '$scope', DeviceController]);

  function DeviceController(homeService, $log, $scope) {
    
    var vm = this;

    vm.getDevice = function() {
      console.log("dfsdf")
    };

    homeService.getCurrentAuthorizedUserDevices()
        .then(getDevicesSuccess, null)
        .catch(errorCallback);


      function getDevicesSuccess(devices) {
        console.log(devices)
        console.log(devices.data.data);
        vm.devices = devices.data.data;
      }

      function errorCallback(errorMsg) {
          console.log('Error message ' + errorMsg);
      }

      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        homeService.getAllDevices()
          .then(getAllDevicesSuccess, null)
          .catch(errorCallback)

        function getAllDevicesSuccess(devices) {
          $log.debug(devices.data);
          var arrayOfArrays = [];
          devices.data.forEach(function(element) {
            arrayOfArrays.push(element.data)
          })
          $log.debug(arrayOfArrays)

        }  

        var data = google.visualization.arrayToDataTable([
          ['Type', 'Devices of the type'],
          ['Weather',     11],
          ['Wind speed',      2],
          ['Commute',  2],
          ['Watch TV', 2],
          ['Sleep',    7]
        ]);

        var options = {
          title: 'My Daily Activities',
          is3D: true
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
      }
  }
})();