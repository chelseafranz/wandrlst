(function  () {

	angular.module('WanderMod').controller('ListController', ['$scope','PARSE_HEADERS','PARSE_URI', '$location','MainFactory','$routeParams', function($scope, PARSE_HEADERS, PARSE_URI, $location, MainFactory, $routeParams){
		var list;
	

		MainFactory.getLists().success(function(data){
			$scope.lists= data.results;
		});

		$scope.addList= function(newList, c){
			console.log(c);
			MainFactory.addList(newList);
		$('#lID').val(newList.objectId).trigger('input');
		
			};

		MainFactory.getOneCity($routeParams.id).success(function(data){
        		$scope.city=data;
        	});



	



	}]);
}());

