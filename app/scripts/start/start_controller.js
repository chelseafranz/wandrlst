(function  () {
	angular.module('WanderMod')
	.controller( 'StartController', ['$scope', 'uiGmapGoogleMapApi', '$location', '$http', 'PARSE_HEADERS', 'MainFactory',function($scope, uiGmapGoogleMapApi, $location, $http, PARSE_HEADERS, MainFactory ){
		
		MainFactory.getCities().success( function (data) {
          $scope.cities = data.results;
        });

        $scope.addCity = function (city) {
          MainFactory.addCity(city);
        };

        $scope.getOneCity= function(cid){
        	$location.path('/city/' + cid);
        };

		$scope.map = { 
			center: { latitude: 55, longitude: -70 },
			zoom: 3,
		};

		uiGmapGoogleMapApi.then(function(maps){});

		var url= 'https://api.parse.com/1/classes/Cities';

		$scope.deleteCity=function(cID, index){
		MainFactory.deleteCity(cID).success( function () {
            $scope.cities.splice(index, 1);		
        });
    	};
    

	}]); //end controller
}());