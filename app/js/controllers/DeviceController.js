(function() {
  'use strict';
  
  angular.module('mainApp')
    .controller('DeviceController', ['dataService', DeviceController ]);

	function DeviceController(dataService) {
    'use strict';
    var vm = this;
		var i = 1;
		vm.devices = dataService.getDevices;
		console.log(vm.devices);
	}
})();