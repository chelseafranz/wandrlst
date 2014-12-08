(function  () {

	var app =angular.module('WanderMod', ['ngRoute', 'ngCookies', 'uiGmapgoogle-maps',  'ui.utils' ]);
		app.constant('PARSE_HEADERS', {
			headers: {
        'X-Parse-Application-Id': 'iVBIZ8aBC1T1zcCOWvAc7AXDisgspY3S41YdI67u',
        'X-Parse-REST-API-Key': '0fc6LBtsQvnM1PuNQR5Tz8YKoP1Vt9kSbEHCKSvM',
        'Content-Type': 'application/json'
      		}
		});
		app.constant('PARSE_URI', 'https://api.parse.com/1/');

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

		 $routeProvider.when('/users/:uid', {
		 	templateUrl: 'scripts/users/user-profile.html',
		 	controller: 'StartController'
		 });




	}); //end route provider

		// $( "#date" ).datepicker();



	
 

	
}());
	 
(function  () {
	angular.module('WanderMod').factory( 'MainFactory', ['$http', 'PARSE_HEADERS', 'PARSE_URI','$routeParams','$cookieStore',function ($http, PARSE_HEADERS, PARSE_URI, $routeParams, $cookieStore){
		
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
        //$('#bars')[0].reset();
		};

		
		var getLists= function(){
			return $http.get(listUrl, PARSE_HEADERS);
		};

        var addTip = function(tip){
        $http.post(tipsUrl, tip, PARSE_HEADERS).success(function(){
            console.log('successfully added a tip'); 
        });
         //$('#tips')[0].reset();
        };

        
        var addDate = function(date){
        $http.post(dateUrl, date, PARSE_HEADERS).success(function(){
            console.log('successfully added a date');
        });
        //$('#date')[0].reset();
        };

        var addBrunch = function(brunch){
        $http.post(brunchUrl, brunch, PARSE_HEADERS).success(function(){
            console.log('successfully added a brunch');
          });
        //$('#brunch')[0].reset();
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
            brunchsByCity : brunchsByCity

        	
        };
}]);

}());
(function  () {
	angular.module('WanderMod').factory( 'UserFactory', ['$http', 'PARSE_HEADERS', 'PARSE_URI','$location','$cookieStore','$routeParams', function ($http, PARSE_HEADERS, PARSE_URI, $location, $cookieStore,$routeParams){

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
          console.log('logged out');
        };
         var currentUser = function () {
          return $cookieStore.get('currentUser');
          $scope.current= 'currentUser';
          console.log($scope.current);
        };

        var userProfile = function(uid){
          return $http.get(url+uid, PARSE_HEADERS);
          
        };



        return{
        	register : register,
        	login : login,
        	checkUser : checkUser,
          logout : logout,
          currentUser : currentUser,
          userProfile : userProfile
          

        }


}]);
}());
(function() {
	angular.module('WanderMod').controller('UserController', ['$scope', '$location', 'PARSE_HEADERS','UserFactory','MainFactory', '$http','$cookieStore','$routeParams',function  ($scope, $location, PARSE_HEADERS, UserFactory, $http, $cookieStore, MainFactory, $routeParams ) {
		
      //$scope.user = UserFactory.currentUser();
     // console.log($scope.user.objectId);


  		$scope.addUser= function(user){
  			UserFactory.register(user);
        UserFactory.login(user);
  			$location.path('/start');
  		};

  		$scope.login = function(user){
  			UserFactory.login(user)	
  		};



  	
  	
      var checkUser = function (user) {
          var user = $cookieStore.get('currentUser');
          if(user) {
            $('#user').html('Welcome back ' + user.username);
            $location.path('/start');
          } else {
            console.log('not logged in')
            $('#user').html('Please Log In');
            $location.path('/');
          }
        };

        var currentUser = function(){
          MainFactory.currentUser();
          console.log('user');
        };
       




	}])
}());
(function  () {
	angular.module('WanderMod')
	.controller( 'StartController', ['$scope', 'uiGmapGoogleMapApi', '$location', '$http', 'PARSE_HEADERS', 'MainFactory','$routeParams','$cookieStore', 'UserFactory','SaveFactory', function($scope, uiGmapGoogleMapApi, $location, $http, PARSE_HEADERS, MainFactory, $routeParams, $cookieStore, UserFactory, SaveFactory ){


		MainFactory.getCities().success( function (data) {
          $scope.cities = data.results;
        });

		// $scope.$watch('city.name', function (newVal) {
  //         if (newVal) {
  //           MainFactory.getCities(newVal.objectId).success( function (data) {
  //             $scope.cities = data.results;
  //           });

  //         }
  //       });


        MainFactory.getLists().success(function(data){
			$scope.lists= data.results;
		});
		
		$scope.user = UserFactory.currentUser();
		userID= $scope.user.objectId;
	
        $scope.userProfile= function  (user) {
        	UserFactory.getUserProfile
         return $cookieStore.get('currentUser');
         
        };

        $scope.addSave= function(save){
        SaveFactory.addSave(save);
        $scope.save= save;
        };
        

        $scope.addCity = function (city) {
          MainFactory.addCity(city);
          $scope.city= city.name;
           console.log(city);
        };

        $scope.getOneCity= function(cid){
        	$location.path('/city/' + cid);
        	console.log(cid);
        };

        
        
		$scope.deleteCity=function(cID, index){
		MainFactory.deleteCity(cID).success( function () {
            $scope.cities.splice(index, 1);		
        });
    	};

    	$scope.logout=function(user){
    		UserFactory.logout(user);
    		console.log("logged out");
    	};

    	$scope.userProfile= function(userID){
    		console.log($scope.user.objectId);
    		userID= $scope.user.objectId;
    		$location.path('/users/'+ userID);
    	};

    	$('#map_canvas').gmap();

			// uiGmapGoogleMapApi.then(function(maps){
			// 	$('#map_canvas').gmap({ 'center': new google.maps.LatLng(42.345573,-71.098326), 'callback': function() {
   //     		 $('#map_canvas').gmap('addMarker', { 'position': new google.maps.LatLng(42.345573,-71.098326) } );
			// 	}});

			// });

			

	}]); //end controller

}());
(function  () {

	angular.module('WanderMod').controller('ListController', ['$scope','PARSE_HEADERS','PARSE_URI', '$location','MainFactory','$routeParams', 'UserFactory',function($scope, PARSE_HEADERS, PARSE_URI, $location, MainFactory, $routeParams, UserFactory){
		var list;

		var addSave= function  (save, u) {
			console.log(u);
			SaveFactory.addSave(save);
		};
	
	$scope.user = UserFactory.currentUser();
	userID= $scope.user.objectId;
	console.log(userID);

		$scope.tipsShow= false;
		$scope.listShow= false;
		$scope.dateShow= false;
		$scope.brunchShow= false;

	
	$( ".lists" ).draggable({ addClasses: true});
	$( ".tips" ).draggable({ addClasses: true });
	$( ".date" ).draggable({ addClasses: true});
	$( ".brunch" ).draggable({ addClasses: true });
	$('li').droppable({ addClasses: true});

	$( "ul.droptrue" ).sortable({
      connectWith: "ul"
    });

		MainFactory.getOneCity($routeParams.id).
		success(function(data){
	        $scope.city=data;
	        
	        MainFactory.tipsByCity(data.name).success(function(data){
	        	$scope.tips=data.results;
	        });
	        MainFactory.listsByCity(data.name).success(function(data){
	        	$scope.lists=data.results;
	        });
	        MainFactory.datesByCity(data.name).success(function(data){
	        	$scope.dates=data.results;
	        });
	        MainFactory.brunchsByCity(data.name).success(function(data){
	        	$scope.brunchs=data.results;
	        });

	        });
	

		$scope.addList= function(newList, c){
			console.log(c);
			newList.city= c;
			MainFactory.addList(newList);
			  $('#bars')[0].reset();
			};


		$scope.addTip= function(newTip, c){
			console.log(c);
			newTip.city= c;
			MainFactory.addTip(newTip);
			 
		};

		$scope.addDate=function(newDate, c){
			newDate.city=c;
			MainFactory.addDate(newDate);
		};

		$scope.addBrunch=function(newBrunch, c){
			newBrunch.city=c;
			MainFactory.addBrunch(newBrunch)	
		};
		

		$scope.chooseList= function(){
			var choose= $('select').val();
			console.log(choose);
			switch (choose){
				case 'tips':
				$scope.tipsShow= true;
				break;
				case 'bars':
				$scope.listShow= true;
				break;
				case 'date':
				$scope.dateShow= true;
				break;
				case 'brunch':
				$scope.brunchShow= true;
				break;
				
			}
		};

		$scope.listByCity = function(){
			MainFactory.listByCity();
		};

		$(document).ready(function() {

    var selectedClass = 'ui-state-highlight',
        clickDelay = 600,
        // click time (milliseconds)
        lastClick, diffClick; // timestamps

    $("#draggable li")
    .draggable({
        revertDuration: 10,
        // grouped items animate separately, so leave this number low
        containment: '.demo',

        start: function(e, ui) {
            ui.helper.addClass(selectedClass);
        },
        // stop: function(e, ui) {
        //     // reset group positions
        //     $('.' + selectedClass).css({
        //         top: 0,
        //         left: 0
        //     });
        // },
        drag: function(e, ui) {
            // set selected group position to main dragged object
            // this works because the position is relative to the starting position
            $('.' + selectedClass).css({
                top: ui.position.top,
                left: ui.position.left
            });
        }
    });


    $("#droppable, #draggable").sortable().droppable({
        drop: function(e, ui) {
            $('.' + selectedClass).appendTo($(this)).add(ui.draggable) // ui.draggable is appended by the script, so add it after
            .removeClass(selectedClass).css({
                top: 0,
                left: 0
            });
        }
    });

});

	
		

	}]); //end controller
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
	angular.module('WanderMod').factory( 'ListsFactory', ['$http', 'PARSE_HEADERS', 'PARSE_URI','$location',function ($http, PARSE_HEADERS, PARSE_URI, $location){

		

		var addList = function(list){
		$http.post(listUrl, list, PARSE_HEADERS).success(function(){
			console.log('successfully added');
			console.log($scope.newCity);
			
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