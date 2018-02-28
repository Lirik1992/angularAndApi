(function() {
  'use strict';

  angular.module('mainApp')
    .directive('genderChart', function() {
      return {
        restrict: 'A',
        templateUrl: '/js/directives/genderChart/genderChart.html',
        link: function($scope, $elem, $attr) {
          var data = google.visualization.arrayToDataTable([
            ['Gender', "User's gender statistics"],
            ['Male', 10],
            ['Female', 5]
          ]);

          var options = {
            legend: 'right',
            title: 'User gender statistics',
            is3D: true,
            backgroundColor: 'transparent',
            legendTextStyle: { color: '#fff', fontSize: 16 },
            titleTextStyle: { color: '#fff', fontSize: 16 },
            hAxis: {
              color: '#fff'
            }
          };
          var chart = new google.visualization.PieChart($elem[0])
          chart.draw(data, options)
        }
      }
    })
    google.load('visualization', '1', {'packages':['corechart']});
}())



//TODO: figure out how to draw chart of devices popularity

// google.charts.load('current', {'packages':['corechart']});
// google.charts.setOnLoadCallback(drawChart);

// function drawChart() {

//   // homeService.getAllDevices()
//   //   .then(getAllDevicesSuccess, null)
//   //   .catch(errorCallback)
  
//   // function getAllDevicesSuccess(devices) {
//   //   $log.debug(devices.data);
//   //   var arrayOfArrays = [];
//   //   devices.data.forEach(function(element) {
//   //     arrayOfArrays.push(element.data)
//   //   })
//   //   $log.debug(arrayOfArrays)
//   // }

//   var data = google.visualization.arrayToDataTable([
//     ['Gender', "User's gender statistics"],
//     ['Male', 10],
//     ['Female', 5]
//   ]);

// var options = {
//   legend: 'right',
//   title: 'User gender statistics',
//   is3D: true,
//   backgroundColor: 'transparent',
//   legendTextStyle: { color: '#fff', fontSize: 16 },
//   titleTextStyle: { color: '#fff', fontSize: 16 },
//   hAxis: {
//     color: '#fff'
//   }
// };



//   chart.draw(data, options);
// }