(function  () {
	angular.module('WanderMod').factory( 'MainFactory', ['$http', 'PARSE_HEADERS', 'PARSE_URI','$routeParams',function ($http, PARSE_HEADERS, PARSE_URI, $routeParams){
		
		var url= 'https://api.parse.com/1/classes/Cities/';
		var userUrl = ' https://api.parse.com/1/users/';
		var listUrl= 'https://api.parse.com/1/classes/Lists/';
        var tipsUrl= 'https://api.parse.com/1/classes/tips/';
        var dateUrl= 'https://api.parse.com/1/classes/date/';
	   var brunchUrl= 'https://api.parse.com/1/classes/brunch/';

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

         var tipsByCity = function (city) {
            var query = '?'+'where={"tips":"'+city+'"}';
            return $http.get(tipsUrl + query, PARSE_HEADERS);
          };

        

        var addList = function(list){
		$http.post(listUrl, list, PARSE_HEADERS).success(function(){
			console.log('successfully added');
			//$('#bars')[0].reset();
		});
		};

		
		var getLists= function(){
			return $http.get(listUrl, PARSE_HEADERS);
		};

        // var getTips= function(){
        //     return $http.get(tipsUrl, PARSE_HEADERS);
        // };

        var addTip = function(tip){
        $http.post(tipsUrl, tip, PARSE_HEADERS).success(function(){
            console.log('successfully added a tip');
            // $('#tips')[0].reset();
            
        });
        };

        var getDates= function(){
            return $http.get(dateUrl, PARSE_HEADERS);
        };

        var addDate = function(date){
        $http.post(dateUrl, date, PARSE_HEADERS).success(function(){
            console.log('successfully added a date');
            // $('#tips')[0].reset();
            
        });
        };

        var getBrunchs= function(){
            return $http.get(brunchUrl, PARSE_HEADERS);
        };
        
        var addBrunch = function(brunch){
        $http.post(brunchUrl, brunch, PARSE_HEADERS).success(function(){
            console.log('successfully added a brunch');
            // $('#tips')[0].reset();
            
        });
        };



      
        return{
        	getCities: getCities,
        	addCity : addCity,
        	deleteCity : deleteCity,
        	getOneCity : getOneCity,
        	addList : addList,
        	getLists : getLists,
            addTip : addTip,
            // getTips : getTips,
            addDate : addDate,
            getDates : getDates,
            addBrunch : addBrunch,
            getBrunchs : getBrunchs,
            tipsByCity : tipsByCity

        	
        };
}]);

}());