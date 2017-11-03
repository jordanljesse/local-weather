(function() {
	'use strict';

	angular.module('MainApp', []);

	angular.module('MainApp')
		.controller('WeatherController', WeatherController);

	WeatherController.$inject = ['WeatherService'];

	function WeatherController(WeatherService) {
		var vm = this;

		vm.getWeatherByZip = _getWeatherByZip;
		vm.getWeatherByLocation = _getWeatherByLocation;
		vm.local = {
			zip: null
		};

		function _getWeatherByZip(location) {
			WeatherService.getCurrentConditions(location)
				.then(
					response => vm.local = response.data.current_observation,
				 	error => console.error(error)
				);
		}

		function _getWeatherByLocation() {
			navigator.geolocation.getCurrentPosition(function(location) {
				WeatherService.getCurrentConditions(location)
					.then(
						response => vm.local = response.data.current_observation,
						error => console.error(error)
					);
			});
		}
	}
})();