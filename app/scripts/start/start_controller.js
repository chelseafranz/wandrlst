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
	

        var city;

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
    	}





		// $scope.addList= function(newList, t){
		// 	console.log(t);

		// 	// ListsFactory.addList(newList);
		// //$('#lID').val(newList.objectId).trigger('input');
		
		// 	};

			$scope.map = { 
			center: { latitude: 45, longitude: -80 },
			zoom: 3,
			};

			uiGmapGoogleMapApi.then(function(maps){});


	}]); //end controller

}());