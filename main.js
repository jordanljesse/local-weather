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
				.then(_getWeatherByZipComplete, _getWeatherByZipFail);

			function _getWeatherByZipComplete(response) {
				console.log('_getWeatherByZipComplete', response.data);
				vm.local = response.data.current_observation;
			}

			function _getWeatherByZipFail(error) {
				conosle.error('_getWeatherByZipFail', error);
			}
		}

		function _getWeatherByLocation() {
			navigator.geolocation.getCurrentPosition(function(location) {
				WeatherService.getWeatherByLocation(location)
					.then(_getWeatherByLocationComplete, _getWeatherByLocationFail);

				function _getWeatherByLocationComplete(response) {
					console.log('_getWeatherByLocationComplete', response.data);
					vm.local = response.data.current_observation;
				}

				function _getWeatherByLocationFail(error) {
					console.error('_getWeatherByLocationFail', error.data);
				}
			});
		}
	}
})();