(function  () {
	angular.module('WanderMod').factory( 'MainFactory', ['$http', 'PARSE_HEADERS',function ($http, PARSE_HEADERS ){
		
		var url= 'https://api.parse.com/1/classes/Cities';

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

        var getOneCity= function(id){
        	console.log('click');
        return $http.get(url+ id, PARSE_HEADERS);
        };


        return{
        	getCities: getCities,
        	addCity : addCity,
        	deleteCity : deleteCity,
        	getOneCity : getOneCity
        };
}]);

}());