(function  () {

	var app =angular.module('WanderMod', ['ngRoute', 'firebase']);
		app.constant('FIREBASE_URL', 'https://wandrlst.firebaseio.com/');
		app.config( function($routeProvider){

		$routeProvider.when('/', {
			templateUrl: 'scripts/users.html',
			controller: 'UserController'
		});

	}); //end route provider
}());
	 