(function  () {

	angular.module('WanderMod').controller('ListController', ['$scope','PARSE_HEADERS','PARSE_URI', '$location','ListsFactory', function($scope, PARSE_HEADERS, PARSE_URI, $location, ListsFactory){
		var list;
	

		ListsFactory.getLists().success(function(data){
			$scope.lists= data.results;
			console.log($scope.lists);
			list= $scope.lists;
			console.log(list);
		});

		$scope.addList= function(newList, t){
			console.log(t);
			// ListsFactory.addList(newList);
		//$('#lID').val(newList.objectId).trigger('input');
		
			};



	



	}]);
}());

