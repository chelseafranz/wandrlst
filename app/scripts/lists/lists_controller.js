(function  () {

	angular.module('WanderMod').controller('ListController', ['$scope','PARSE_HEADERS','PARSE_URI', '$location','ListsFactory', function($scope, PARSE_HEADERS, PARSE_URI, $location, ListsFactory){

		ListsFactory.getLists().success(function(data){
			$scope.lists= data.results;
		});

		$scope.addList= function(list){
		$('#lID').val(list.objectId).trigger('input');
			ListsFactory.addList(list);
		};



	}]);
}());

