(function  () {
	angular.module('WanderMod').factory( 'MainFactory', ['$http', 'PARSE_HEADERS', 'PARSE_URI',function ($http, PARSE_HEADERS, PARSE_URI){
		
		var url= 'https://api.parse.com/1/classes/Cities';
		var userUrl = ' https://api.parse.com/1/users';

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
        return $http.get(url+ id, PARSE_HEADERS);
        };

        var register = function (user) {
          $http.post(PARSE_URI+ 'users',user, PARSE_HEADERS).success( function (data){
            console.log('Welcome ' + user.username);
          });
        };	


        return{
        	getCities: getCities,
        	addCity : addCity,
        	deleteCity : deleteCity,
        	getOneCity : getOneCity,
        	register : register
        };
}]);

}());