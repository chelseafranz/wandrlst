(function  () {
	angular.module('WanderMod').factory( 'ListsFactory', ['$http', 'PARSE_HEADERS', 'PARSE_URI','$location', function ($http, PARSE_HEADERS, PARSE_URI, $location){

		var listUrl= 'https://api.parse.com/1/classes/Lists';

		var addList = function(list){
		$http.post(listUrl, list, PARSE_HEADERS).success(function(){
			console.log('successfully added');
			$('#listOne')[0].reset();
		});
		};

		var getLists= function(){
			return $http.get(listUrl, PARSE_HEADERS)
		};

		return{
			addList : addList,
			getLists : getLists
		}
		


}]);
}());

