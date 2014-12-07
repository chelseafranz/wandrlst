(function  () {
	angular.module('WanderMod').factory('SaveFactory', ['$http', 'PARSE_HEADERS', 'PARSE_URI','$routeParams','$cookieStore',function ($http, PARSE_HEADERS, PARSE_URI, $routeParams, $cookieStore){

		var saveUrl = 'https://api.parse.com/1/classes/save/';

		var addSave= function(save){
			$http.post(listUrl, save, PARSE_HEADERS).success(
				function(){
        	console.log('city has been saved');
		});
		};


		return{
			addSave : addSave
		}
}]);

}());