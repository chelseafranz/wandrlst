(function  (argument) {
	angular.module('WanderMod').controller( 'SearchController',['$scope', 'FIREBASE_URL', 'uiGmapGoogleMapApi', '$firebase', '$location',function($scope, FIREBASE_URL, uiGmapGoogleMapApi, $firebase, $location ){

		var map;
		var service;
		var infowindow;
		var location= $('#search').val();

		$scope.searchMap= function(){
			var request = {
	    	location: location,
	    	radius: '500',
	    	query: 'restaurant'
	  		};	

			map = new google.maps.Map(document.getElementById('map'), {
      		center: location,
      		zoom: 10
    		});

	  		service = new google.maps.places.PlacesService(map);
	  		service.textSearch(request, callback);
			}

			function callback(results, status) {
	  		if (status == google.maps.places.PlacesServiceStatus.OK) {
	    		for (var i = 0; i < results.length; i++) {
	      			var place = results[i];
	      			createMarker(results[i]);
	    			}
	  			}
			};


}]);

}());