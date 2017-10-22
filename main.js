(function() {
	'use strict';

	angular.module('MainApp', []);

	angular.module('MainApp')
		.controller('WeatherController', WeatherController);

	WeatherController.$inject = ['WeatherService'];

	function WeatherController(WeatherService) {
		var vm = this;

		vm.getLocalWeather = _getLocalWeather;
		vm.local = {
			zip: null
		};

		function _getLocalWeather(location) {
			WeatherService.getLocalWeather(location)
				.then(_getLocalWeatherComplete, _getLocalWeatherFail);

			function _getLocalWeatherComplete(response) {
				console.log('_getLocalWeatherComplete', response.data);
				vm.local = response.data.current_observation;
			}

			function _getLocalWeatherFail(error) {
				conosle.error('_getLocalWeatherFail', error);
			}
		}
	}
})();