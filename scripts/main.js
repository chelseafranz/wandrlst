(function  () {

	var app =angular.module('WanderMod', ['ngRoute', 'ngCookies', 'uiGmapgoogle-maps' ]);
		app.constant('PARSE_HEADERS', {
			headers: {
        'X-Parse-Application-Id': 'iVBIZ8aBC1T1zcCOWvAc7AXDisgspY3S41YdI67u',
        'X-Parse-REST-API-Key': '0fc6LBtsQvnM1PuNQR5Tz8YKoP1Vt9kSbEHCKSvM',
        'Content-Type': 'application/json'
      		}
		});
		app.constant('PARSE_URI', 'https://api.parse.com/1/')

		app.config(function($routeProvider, uiGmapGoogleMapApiProvider){
			
			uiGmapGoogleMapApiProvider.configure({
			key: 'AIzaSyCOmbJ5PgUoEptdUXcOZy-d0ESKU5McAIs',
			v: '3.17',
			libraries: 'weather, geometry, visualization'
		});

		$routeProvider.when('/', {
			templateUrl: 'scripts/users/users.html',
			 controller: 'UserController'
		});

		$routeProvider.when('/start', {
			templateUrl: 'scripts/start/start.html',
			controller: 'StartController'
		});
		 $routeProvider.when('/city/:id', {
      		templateUrl: 'scripts/lists/lists-main.html',
      		controller: 'ListController'
    	});
		 
		 $routeProvider.when('/search',{
		 	templateUrl:'scripts/lists/search.html', 
		 	controller: 'SearchController'
		 });



	}); //end route provider

		// $( "#date" ).datepicker();


    $( "#draggable" ).draggable();
 

	
}());
	 
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

      
        return{
        	getCities: getCities,
        	addCity : addCity,
        	deleteCity : deleteCity,
        	getOneCity : getOneCity,
        	
        };
}]);

}());
(function  () {
	angular.module('WanderMod').factory( 'UserFactory', ['$http', 'PARSE_HEADERS', 'PARSE_URI','$location','$cookieStore', function ($http, PARSE_HEADERS, PARSE_URI, $location, $cookieStore){

		  var register = function (user) {
          $http.post(PARSE_URI+ 'users',user, PARSE_HEADERS).success( function (data){
            console.log('Welcome ' + user.username);
          });
        };	

        var login = function(user){
        var params = 'username='+user.username+'&password='+user.password;
        $http.get(PARSE_URI + 'login/?'+params, PARSE_HEADERS)
            .success( function (data) {
            $cookieStore.put('currentUser', data);
            console.log( 'welcome back '+ user.username);
              return checkUser();
              
          });
        };

        var checkUser = function (user) {
         var user = $cookieStore.get('currentUser');
          if(user) {
			$('#user').html('Welcome back ' + user.username);
            $location.path('/start/');
          } else {
            $('#user').html('Please Log In');
            $location.path('/');
          }
        };

        var logout = function(user){
           $cookieStore.remove('currentUser');
          return checkUser();
        }

        return{
        	register : register,
        	login : login,
        	checkUser : checkUser,
          logout : logout

        }


}]);
}());
(function() {
	angular.module('WanderMod').controller('UserController', ['$scope', '$location', 'PARSE_HEADERS','UserFactory','$http',function  ($scope, $location, PARSE_HEADERS, UserFactory, $http) {
		
  		$scope.addUser= function(user){
  			UserFactory.register(user);
  			$location.path('/start');
  		};

  		$scope.login = function(user){
  			UserFactory.login(user);
  			$location.path('/start')
  		};

  		$scope.logout = function(user){
  			UserFactory.logout(user);
  			$location.path('/');
  		}



	}])
}());
(function  () {
	angular.module('WanderMod')
	.controller( 'StartController', ['$scope', 'uiGmapGoogleMapApi', '$location', '$http', 'PARSE_HEADERS', 'MainFactory',function($scope, uiGmapGoogleMapApi, $location, $http, PARSE_HEADERS, MainFactory ){
		
		MainFactory.getCities().success( function (data) {
          $scope.cities = data.results;
        });

        $scope.addCity = function (city) {
          MainFactory.addCity(city);
        };

        $scope.getOneCity= function(cid){
        	$location.path('/city/' + cid);
        	console.log(cid);
        };

		$scope.map = { 
			center: { latitude: 45, longitude: -80 },
			zoom: 3,
		};

		uiGmapGoogleMapApi.then(function(maps){});

		var url= 'https://api.parse.com/1/classes/Cities';

		$scope.deleteCity=function(cID, index){
		MainFactory.deleteCity(cID).success( function () {
            $scope.cities.splice(index, 1);		
        });
    	};

	}]); //end controller

}());
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


(function  (argument) {
	angular.module('WanderMod').controller( 'SearchController',['$scope', 'FIREBASE_URL', 'uiGmapGoogleMapApi', '$firebase', '$location',function($scope, FIREBASE_URL, uiGmapGoogleMapApi, $firebase, $location ){

		var map;
		var service;
		var infowindow;
		var location= $('#search').val();

		$scope.searchMap= function(){
			var request = {
	    	location: location,
	    	radius: '500',
	    	query: 'restaurant'
	  		};	

			map = new google.maps.Map(document.getElementById('map'), {
      		center: location,
      		zoom: 10
    		});

	  		service = new google.maps.places.PlacesService(map);
	  		service.textSearch(request, callback);
			}

			function callback(results, status) {
	  		if (status == google.maps.places.PlacesServiceStatus.OK) {
	    		for (var i = 0; i < results.length; i++) {
	      			var place = results[i];
	      			createMarker(results[i]);
	    			}
	  			}
			};


}]);

}());
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

