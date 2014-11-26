(function  () {
	angular.module('WanderMod')
	.controller( 'StartController',['$scope', 'FIREBASE_URL', 'uiGmapGoogleMapApi',function($scope, FIREBASE_URL, uiGmapGoogleMapApi ){

	// $scope.list= function
		$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

		uiGmapGoogleMapApi.then(function(maps){});
	

	}]);

}());