(function  () {
	angular.module('WanderMod')
	.controller( 'StartController', ['$scope', 'uiGmapGoogleMapApi', '$location', '$http', 'PARSE_HEADERS', 'MainFactory','$routeParams',function($scope, uiGmapGoogleMapApi, $location, $http, PARSE_HEADERS, MainFactory, $routeParams ){
		
		MainFactory.getCities().success( function (data) {
          $scope.cities = data.results;
        });

        var city;
       console.log($routeParams);

        $scope.addCity = function (city) {
          MainFactory.addCity(city);
          $scope.city= city.name;
           console.log(city);

        };

        $scope.getOneCity= function(cid){
        	$location.path('/city/' + cid);
        
        	console.log(cid);
        };

        // MainFactory.getOneCity($routeParams.id).success(function(data){
        // 		console.log(data);
        // 		$scope.city=data;
        // 	});
        
		$scope.deleteCity=function(cID, index){
		MainFactory.deleteCity(cID).success( function () {
            $scope.cities.splice(index, 1);		
        });
    	};

    	MainFactory.getLists().success(function(data){
			$scope.lists= data.results;
		});

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