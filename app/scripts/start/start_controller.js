(function  () {
	angular.module('WanderMod')
	.controller( 'StartController', ['$scope', 'uiGmapGoogleMapApi', '$location', '$http', 'PARSE_HEADERS', 'MainFactory','$routeParams','$cookieStore', 'UserFactory','SaveFactory', function($scope, uiGmapGoogleMapApi, $location, $http, PARSE_HEADERS, MainFactory, $routeParams, $cookieStore, UserFactory, SaveFactory ){


		MainFactory.getCities().success( function (data) {
          $scope.cities = data.results;
        });

		// $scope.$watch('city.name', function (newVal) {
  //         if (newVal) {
  //           MainFactory.getCities(newVal.objectId).success( function (data) {
  //             $scope.cities = data.results;
  //           });

  //         }
  //       });


        MainFactory.getLists().success(function(data){
			$scope.lists= data.results;
		});
		
		$scope.user = UserFactory.currentUser();
		userID= $scope.user.objectId;
	
        $scope.userProfile= function  (user) {
        	UserFactory.getUserProfile
         return $cookieStore.get('currentUser');
         
        };

        $scope.addSave= function(save){
        SaveFactory.addSave(save);
        $scope.save= save;
        };
        

        $scope.addCity = function (city) {
          MainFactory.addCity(city);
          $scope.city= city.name;
           console.log(city);
        };

        $scope.getOneCity= function(cid){
        	$location.path('/city/' + cid);
        	console.log(cid);
        };

        
        
		$scope.deleteCity=function(cID, index){
		MainFactory.deleteCity(cID).success( function () {
            $scope.cities.splice(index, 1);		
        });
    	};

    	$scope.logout=function(user){
    		UserFactory.logout(user);
    		console.log("logged out");
    	};

    	$scope.userProfile= function(userID){
    		console.log($scope.user.objectId);
    		userID= $scope.user.objectId;
    		$location.path('/users/'+ userID);
    	};

    	$('#map_canvas').gmap();

			// uiGmapGoogleMapApi.then(function(maps){
			// 	$('#map_canvas').gmap({ 'center': new google.maps.LatLng(42.345573,-71.098326), 'callback': function() {
   //     		 $('#map_canvas').gmap('addMarker', { 'position': new google.maps.LatLng(42.345573,-71.098326) } );
			// 	}});

			// });

			

	}]); //end controller

}());