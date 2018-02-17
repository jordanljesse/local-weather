(function() {
	'use strict';

	angular.module('MainApp')
		.service('WeatherService', WeatherService);

	WeatherService.$inject = ['$http'];

	function WeatherService($http) {
		var svc = this;


		// API endpoint settings
		// API documentation: https://www.wunderground.com/weather/api/d/docs?d=data/index&MR=1
		svc.feature = {
			conditions: 'conditions/q/',
			forecast: 'forecast/q/',
			forecast10day: 'forecast10day/q/',
			geolookup: 'geolookup/q/',
			hourly: 'hourly/q/'
		};
		svc.format = '.json';
		svc.getCurrentConditions = _getCurrentConditions;
		svc.key = '2ff8268a590b43f8/'; // please be kind
		svc.query = 'CA/Los_Angeles';
		svc.url = 'http://api.wunderground.com/api/';


		function _getCurrentConditions(location) {
			if(location.coords)
				location = location.coords.latitude + ',' + location.coords.longitude

			return $http({
				url: svc.url +
					 svc.key +
					 svc.feature.conditions +
					 location +
					 svc.format,
				method: 'GET'
			});
		}
	}
})();