(function  () {
	angular.module('WanderMod')
	.controller( 'StartController',['$scope', 'FIREBASE_URL', 'uiGmapGoogleMapApi', '$firebase', '$location',function($scope, FIREBASE_URL, uiGmapGoogleMapApi, $firebase, $location ){

		$scope.map = { 
			center: { latitude: 55, longitude: -70 },
			zoom: 3,
		};

		uiGmapGoogleMapApi.then(function(maps){});

	

		 var itemsRef= new Firebase(FIREBASE_URL + 'items');
		 $scope.cities= $firebase(itemsRef).$asArray();
		 $scope.title='Cities';

		$scope.addItem= function(city){
			$scope.cities.$add(city); //rather than using push, must use firebase's method
			$('#addForm')[0].reset();
			console.log(city.name, city.country)
		};

		$scope.deleteItem=function(city){
			$scope.cities.$remove(city);
		};

		$scope.viewList= function(city){
			$location.path('/single/'+ city.$id);
		};



// 		var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
// var mapOptions = {
//   zoom: 4,
//   center: myLatlng
// }
// var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

// // To add the marker to the map, use the 'map' property
// var marker = new google.maps.Marker({
//     position: myLatlng,
//     map: map,
//     title:"Hello World!"
// });
		
		




	
	}]);

}());