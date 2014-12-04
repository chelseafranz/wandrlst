(function  () {
	angular.module('WanderMod')
	.controller( 'StartController', ['$scope', 'uiGmapGoogleMapApi', '$location', '$http', 'PARSE_HEADERS', 'MainFactory','$routeParams',function($scope, uiGmapGoogleMapApi, $location, $http, PARSE_HEADERS, MainFactory, $routeParams ){
		
		MainFactory.getCities().success( function (data) {
          $scope.cities = data.results;
        });
        MainFactory.getLists().success(function(data){
			$scope.lists= data.results;
		});
		


        var city;

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



			$scope.map = { 
			center: { latitude: 45, longitude: -80 },
			zoom: 3,
			};

			uiGmapGoogleMapApi.then(function(maps){});


	}]); //end controller

}());