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
			WeatherService.getWeatherByZip(location)
				.then(_success, error => console.error(error));

			function _success(response) {
				console.log('_getWeatherByZipComplete', response.data);
				vm.local = response.data.current_observation;
				WeatherService.getThreeDayForecast(location)
					.then(response => console.log(response), error => console.error(error));
			}
		}

		function _getWeatherByLocation() {
			navigator.geolocation.getCurrentPosition(function(location) {
				WeatherService.getWeatherByLocation(location)
					.then(
						response => vm.local = response.data.current_observation,
						error => console.error(error)
					);
			});
		}
	}
})();