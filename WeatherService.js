(function() {
	'use strict';

	angular.module('MainApp')
		.service('WeatherService', WeatherService);

	WeatherService.$inject = ['$http'];

	function WeatherService($http) {
		var svc = this;

		svc.getWeatherByZip = _getWeatherByZip;
		svc.getWeatherByLocation = _getWeatherByLocation;

		// API endpoint settings
		svc.url = 'http://api.wunderground.com/api/'
		svc.key = '2ff8268a590b43f8/';
		svc.feature = {
			conditions: 'conditions/q/',
			forecast: 'forecast/q/',
			forecast10day: 'forecast10day/q/',
			geolookup: 'geolookup/q/',
			hourly: 'hourly/q/',

		};
		svc.query = 'CA/Los_Angeles';
		svc.format = '.json';

		function _getWeatherByZip(location) {
			var settings = {
				url: svc.url + svc.key + svc.feature.conditions + location + svc.format,
				method: 'GET'
			};

			return $http(settings);
		}

		function _getWeatherByLocation(location) {
			var settings = {
				url: svc.url + svc.key + svc.feature.conditions + location.coords.latitude + "," + location.coords.longitude + svc.format,
				method: 'GET'
			};

			return $http(settings);
		}
	}
})();