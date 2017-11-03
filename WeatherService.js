(function() {
	'use strict';

	angular.module('MainApp')
		.service('WeatherService', WeatherService);

	WeatherService.$inject = ['$http'];

	function WeatherService($http) {
		var svc = this;

		svc.getWeatherByZip = _getWeatherByZip;
		svc.getWeatherByLocation = _getWeatherByLocation;
		svc.getThreeDayForecast = _getThreeDayForecast;

		// API endpoint settings
		// API documentation: https://www.wunderground.com/weather/api/d/docs?d=data/index&MR=1
		svc.url = 'http://api.wunderground.com/api/';
		svc.key = '2ff8268a590b43f8/';
		svc.feature = {
			conditions: 'conditions/q/',
			forecast: 'forecast/q/',
			forecast10day: 'forecast10day/q/',
			geolookup: 'geolookup/q/',
			hourly: 'hourly/q/'
		};
		svc.query = 'CA/Los_Angeles';
		svc.format = '.json';

		function _getWeatherByZip(location) {
			return $http({
				url: svc.url +
					 svc.key +
					 svc.feature.conditions +
					 encodeURIComponent(location) +
					 svc.format,
				method: 'GET'
			});
		}

		function _getWeatherByLocation(location) {
			return $http({
				url: svc.url +
					 svc.key +
					 svc.feature.conditions +
					 location.coords.latitude + ',' + location.coords.longitude +
					 svc.format,
				method: 'GET'
			});
		}

		function _getThreeDayForecast(location) {
			if(location.coords)
				location = location.coords.latitude + ',' + location.coords.longitude;

			return $http({
				url: svc.url +
					 svc.key +
					 svc.feature.forecast +
					 location +
					 svc.format,
				method: 'GET'
			});
		}
	}
})();