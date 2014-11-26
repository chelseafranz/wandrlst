(function  () {

	var app =angular.module('WanderMod', ['ngRoute', 'firebase']);
		app.constant('FIREBASE_URL', 'https://wandrlst.firebaseio.com/');
		app.config( function($routeProvider ){

		$routeProvider.when('/', {
			templateUrl: 'scripts/users/users.html',
			controller: 'UserController'
		});

		$routeProvider.when('/start', {
			templateUrl: 'scripts/start/start.html',
			controller: 'StartController'
		});


	}); //end route provider


}());
	 