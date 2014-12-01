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
	 
(function() {
	angular.module('WanderMod').controller('UserController', ['$scope', '$firebaseAuth', 'FIREBASE_URL', '$location', function  ($scope, $firebaseAuth, FIREBASE_URL, $location) {


		var usersRef= new Firebase(FIREBASE_URL);

		$scope.authObj= $firebaseAuth(usersRef);
	

		$scope.register = function(newUser){
			$scope.authObj.$createUser(newUser.email,newUser.password)
			.then( function(){
				$scope.login(newUser)
			}).catch( function(error){
				console.log('this is an error', error);
			});
		};

		$scope.login= function(user){
			$scope.authObj.$authWithPassword({
				email: user.email,
				password: user.password
			}).then( function(){
				$scope.checkUser();

				$location.path('/start');

			}).catch( function(error){
				alert(error.message);
			})
		};


		$scope.checkUser = function(){
			var authData= $scope.authObj.$getAuth();
			if(authData){
				alert( 'User logged in as ' + authData.password.email)
			}else{
				console.log('no one is logged in');
			}
		};

	}])
}());
(function  () {
	angular.module('WanderMod')
	.controller( 'StartController',['$scope', 'FIREBASE_URL', 'uiGmapGoogleMapApi',function($scope, FIREBASE_URL, uiGmapGoogleMapApi ){

	// $scope.list= function
		$scope.map = { 
			// center: { latitude: 45, longitude: -73 }, zoom: 8 
			zoom: 12,
			center= new google.maps.LatLng(coords[0], coords[1]),
			mapTypeId: google.maps.MapTypeID.ROADMAP
		};

		uiGmapGoogleMapApi.then(function(maps){});
	

	}]);

}());