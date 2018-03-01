(function () {
    'use strict';

    class WeatherWidgetComponent {
        constructor() {

        }
    }

    angular.module('mainApp')
        .component('genderChart', {
            templateUrl: '/js/directives/genderChart/genderChart.html',
            controller: function ($scope, homeService) {


                    $scope.maleCount = 0;
                    $scope.femaleCount = 0;
                    $scope.otherCount = 0;


                    homeService.getAllUsers()
                        .then(userSuccess, null)
                        .catch(userError);

                    function userSuccess(users) {

                        users.forEach(function (item) {
                            if (item.gender === 'male') {
                                $scope.maleCount++
                            } else if (item.gender === 'female') {
                                $scope.femaleCount++
                            } else {
                                $scope.otherCount++
                            }
                        });


                    }

                    function userError(error) {
                        console.log(error)
                    }


                    google.charts.load('current', {packages: ['corechart']});
                    google.charts.setOnLoadCallback(drawChart);

                    function drawChart() {

                        // Define the chart to be drawn.
                        var data = new google.visualization.DataTable();
                        data.addColumn('string', 'User genders');
                        data.addColumn('number', 'Users of gender');
                        data.addRows([
                            ['Male', $ctrl.maleCount],
                            ['Female', $scope.femaleCount],
                            ['Other', $scope.otherCount]
                        ]);

                        var options = {
                            legend: 'right',
                            title: 'User gender statistics',
                            is3D: true,
                            backgroundColor: 'transparent',
                            legendTextStyle: {color: '#fff', fontSize: 16},
                            titleTextStyle: {color: '#fff', fontSize: 16},
                            hAxis: {
                                color: '#fff'
                            }
                        };

                        // Instantiate and draw the chart.
                        var chart = new google.visualization.PieChart(document.getElementById('myPieChart'));
                        chart.draw(data, options);
                    }


            }
        })

}());

