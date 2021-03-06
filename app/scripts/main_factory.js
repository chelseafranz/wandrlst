(function  () {
	angular.module('WanderMod').factory( 'MainFactory', ['$http', 'PARSE_HEADERS', 'PARSE_URI','$routeParams','$cookieStore', function ($http, PARSE_HEADERS, PARSE_URI, $routeParams, $cookieStore){
		
		var url= 'https://api.parse.com/1/classes/Cities/';
		var userUrl = ' https://api.parse.com/1/users/';
		var listUrl= 'https://api.parse.com/1/classes/Lists/';
        var tipsUrl= 'https://api.parse.com/1/classes/tips/';
        var dateUrl= 'https://api.parse.com/1/classes/date/';
	   var brunchUrl= 'https://api.parse.com/1/classes/brunch/';
     var savedUrl = ' https://api.parse.com/1/classes/saved';
  
     var greet = ['hola', 'bonjôur ','cia ', 'Γειά ', 'hola ','aloha ', 'konichiwa ', '你好 ','mirëdita ', 'guten tag ', 'नमस्ते ', 'shalom', 'hej', 'namaste','ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ', 'živjo', 'வணக்கம்' ];
     var hello=  function(){

    var item = greet[Math.floor(Math.random()*greet.length)];
      $(this).html( "<h1 id='title'>"+ item + "</h1>");
    };
    $('#title').on('click', hello);
  

   
        var getCities = function () {
          return $http.get(url, PARSE_HEADERS);
        };

        var addCity = function(city){
        $http.post(url, city, PARSE_HEADERS).success(function(){
            console.log('city added');
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
            var query = '?'+'where={"city":"'+city+'"}';
           return $http.get(tipsUrl + query, PARSE_HEADERS);
          };

          var listsByCity = function(city){
            var query = '?'+'where={"city":"'+city+'"}';
           return $http.get(listUrl + query, PARSE_HEADERS);
          };

        var datesByCity = function(city){
            var query = '?'+'where={"city":"'+city+'"}';
           return $http.get(dateUrl + query, PARSE_HEADERS);
          };
         var brunchsByCity = function(city){
            var query = '?'+'where={"city":"'+city+'"}';
           return $http.get(brunchUrl + query, PARSE_HEADERS);
          };

        var addList = function(list){
		$http.post(listUrl, list, PARSE_HEADERS).success(function(){
			console.log('successfully added');
			});
     $('#listF')[0].reset();
		};

		
		var getLists= function(){
			return $http.get(listUrl, PARSE_HEADERS);
		};

        var addTip = function(tip){
        $http.post(tipsUrl, tip, PARSE_HEADERS).success(function(){
            console.log('successfully added a tip'); 
        });
         $('#tipsF')[0].reset();
        };

        
        var addDate = function(date){
        $http.post(dateUrl, date, PARSE_HEADERS).success(function(){
            console.log('successfully added a date');
        });
       $('#dateF')[0].reset();
        };

        var addBrunch = function(brunch){
        $http.post(brunchUrl, brunch, PARSE_HEADERS).success(function(){
            console.log('successfully added a brunch');
          });
        $('#brunchF')[0].reset();
        };

    
         var saveList= function(save){ 
          var newSave = {"id": save[0], "userName": save.user, "title": save.title, "city": save.city};
        $http.post(savedUrl, newSave, PARSE_HEADERS)
        .success(function(){          
          console.log('saved info');
        });
      };

      var getSaveList= function(){
//var query = '?'+'where={"userName":"'+username+'"}';
        $http.get(savedUrl, PARSE_HEADERS);
      };

     
        

      
        return{
        	getCities: getCities,
        	addCity : addCity,
        	deleteCity : deleteCity,
        	getOneCity : getOneCity,
        	addList : addList,
        	getLists : getLists,
            addTip : addTip,
            addDate : addDate,
            addBrunch : addBrunch,       
            tipsByCity : tipsByCity,
            listsByCity : listsByCity,
            datesByCity : datesByCity,
            brunchsByCity : brunchsByCity,
            saveList : saveList,
            getSaveList : getSaveList
        };
}]);

}());