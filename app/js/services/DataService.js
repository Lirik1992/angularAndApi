(function() {
	'use strict';

	angular.module('mainApp').provider('DeviceService', function() {
		this.$get = function() {
			var name = 'Some';
	
			return {
        name: name
			};
		};
	});
})();
