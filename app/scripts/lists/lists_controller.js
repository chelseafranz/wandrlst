(function  (argument) {

	angular.module('WanderMod').controller('ListController', ['$scope', 'firebase', 'FIREBASE_URL', '$location','$routeParams',function($scope, firebase, FIREBASE_URL, $location, $routeParams){
		
      firebase.get(appUrl + $routeParams.cid).success( function (data) {
        $scope.city = data;
        console.log(city.name);
      });
	

	}]);
}());