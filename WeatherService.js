(function() {
	'use strict';

	angular.module('MainApp')
		.service('WeatherService', WeatherService);

	WeatherService.$inject = ['$http'];

	function WeatherService($http) {
		var svc = this;

		svc.getLocalWeather = _getLocalWeather;

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

		function _getLocalWeather(location) {
			var settings = {
				url: svc.url + svc.key + svc.feature.conditions + location + svc.format,
				method: 'GET'
			};

			return $http(settings);
		}
	}
})();