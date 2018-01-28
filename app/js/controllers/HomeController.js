'use strict';

eventsApp.directive('navbar', function() {
  return {
    templateUrl: '/NavigationBarDirective/Navigation.html'
  }
}).directive('devicesPanel', function() {
  return {
    templateUrl: 'DevicesPanel.html'
  }
}).directive('profilePanel', function() {
  return {
    templateUrl: 'ProfilePanel.html'
  }
}).directive('deviceCreatorWidget', function() {
  return {
    templateUrl: 'DeviceWidget.html'
  }
})