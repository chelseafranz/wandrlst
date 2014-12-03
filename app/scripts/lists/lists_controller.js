(function  () {

	angular.module('WanderMod').controller('ListController', ['$scope','PARSE_HEADERS','PARSE_URI', '$location','MainFactory','$routeParams', function($scope, PARSE_HEADERS, PARSE_URI, $location, MainFactory, $routeParams){
		var list;
		

		MainFactory.getLists().success(function(data){
			$scope.lists= data.results;
		});

		$scope.addList= function(newList, c){
			console.log(c);
			newList.city= c;

			MainFactory.addList(newList);
			 $('#listOne')[0].reset();
		
			};

		MainFactory.getOneCity($routeParams.id).success(function(data){
        		$scope.city=data;

        	});



	



	}]);
}());

