(function  () {

	var app =angular.module('WanderMod', ['ngRoute', 'firebase', 'uiGmapgoogle-maps' ]);
		app.constant('FIREBASE_URL', 'https://wandrlst.firebaseio.com/');
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
		 $routeProvider.when('/single/:cid', {
      		templateUrl: 'scripts/lists/lists-main.html',
      		controller: 'StartController'
    	});
		 
		 $routeProvider.when('/search',{
		 	templateUrl:'scripts/lists/search.html', 
		 	controller: 'SearchController'
		 })


	}); //end route provider
	
	geocoder= new google.maps.Geocoder();
	function getCoordinates(address, callback){
		var coordinants;
		geocoder.geocode({ address: address},function(results, status){
			coordinants= results[0].geometry.location;
			callback(coordinants);
			})	
		}
	
}());
	 