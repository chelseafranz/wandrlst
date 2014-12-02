(function  () {

	var app =angular.module('WanderMod', ['ngRoute', 'ngCookies', 'uiGmapgoogle-maps' ]);
		app.constant('PARSE_HEADERS', {
			headers: {
        'X-Parse-Application-Id': 'iVBIZ8aBC1T1zcCOWvAc7AXDisgspY3S41YdI67u',
        'X-Parse-REST-API-Key': '0fc6LBtsQvnM1PuNQR5Tz8YKoP1Vt9kSbEHCKSvM',
        'Content-Type': 'application/json'
      		}
		});
		app.constant('PARSE_URI', 'https://api.parse.com/1/')

		app.config(function($routeProvider, uiGmapGoogleMapApiProvider){
			
			uiGmapGoogleMapApiProvider.configure({
			key: 'AIzaSyCOmbJ5PgUoEptdUXcOZy-d0ESKU5McAIs',
			v: '3.17',
			libraries: 'weather, geometry, visualization'
		});

		$routeProvider.when('/', {
			templateUrl: 'scripts/users/users.html',
			 controller: 'UserController'
		});

		$routeProvider.when('/start', {
			templateUrl: 'scripts/start/start.html',
			controller: 'StartController'
		});
		 $routeProvider.when('/city/:id', {
      		templateUrl: 'scripts/lists/lists-main.html',
      		controller: 'ListController'
    	});
		 
		 $routeProvider.when('/search',{
		 	templateUrl:'scripts/lists/search.html', 
		 	controller: 'SearchController'
		 });



	}); //end route provider
	
}());
	 