(function  () {
	angular.module('WanderMod').factory( 'MainFactory', ['$http', 'PARSE_HEADERS', 'PARSE_URI','$routeParams',function ($http, PARSE_HEADERS, PARSE_URI, $routeParams){
		
		var url= 'https://api.parse.com/1/classes/Cities/';
		var userUrl = ' https://api.parse.com/1/users/';
		var listUrl= 'https://api.parse.com/1/classes/Lists/';

	

        var getCities = function () {
          return $http.get(url, PARSE_HEADERS);
        };

        var addCity = function(city){
        $http.post(url, city, PARSE_HEADERS).success(function(){
        	console.log('city has been added');

        });
        $('#addForm')[0].reset();
        };

        var deleteCity = function(cID){
        return $http.delete(url + cID, PARSE_HEADERS);
        };

        var getOneCity= function(cID){
        return $http.get(url+ cID, PARSE_HEADERS);

        };

        

        var addList = function(list){
		$http.post(listUrl, list, PARSE_HEADERS).success(function(){
			console.log('successfully added');
			$('#lID').val(list.objectId).trigger('input');
			$('#listOne')[0].reset();
		});
		};

		
		var getLists= function(){
			return $http.get(listUrl, PARSE_HEADERS);
		};


      
        return{
        	getCities: getCities,
        	addCity : addCity,
        	deleteCity : deleteCity,
        	getOneCity : getOneCity,
        	addList : addList,
        	getLists : getLists
        	
        };
}]);

}());