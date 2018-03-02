'use strict';

// Custom filter   DURATION FILTER
angular.module('mainApp')
   .filter('durations', function() {
    return function(duration) {
        switch(duration) {
            case 1:
                return 'half hour';
            case 2:
                return '1 hour';
            case 3:
                return 'half day';
            case 4:
                return 'full day';
        }
    }
});

// DEVICES FILTER
