(function  () {
	angular.module('WanderMod')
	.controller( 'StartController', ['$scope', 'uiGmapGoogleMapApi', '$location', '$http', 'PARSE_HEADERS', 'MainFactory','$routeParams','$cookieStore', 'UserFactory','SaveFactory', function($scope, uiGmapGoogleMapApi, $location, $http, PARSE_HEADERS, MainFactory, $routeParams, $cookieStore, UserFactory, SaveFactory ){

		var userUrl = ' https://api.parse.com/1/users/';
    var savedUrl = ' https://api.parse.com/1/classes/saved';

    $('.btn').on('click', function(){
      $('.btn').addClass('animated rubberBand');
    });

		MainFactory.getCities().success( function (data) {
          $scope.cities = data.results;
        });


   var getSaveList= function(data){
var query = '?'+'where={"userName":"'+currentUser+'"}';
        $http.get(savedUrl, PARSE_HEADERS).success(function(data){
          $scope.saved=data.results;
        })
      };

      getSaveList();


   MainFactory.getLists().success(function(data){
			$scope.lists= data.results;
		});
		
		$scope.user = UserFactory.currentUser();
		var currentUser= UserFactory.currentUser();
		userID= $scope.user.objectId;
	
   
       
        
        var city;
        $scope.addCity = function (city) {
          MainFactory.addCity(city);
          $scope.city= city.name;
          city= city.name

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

    	$scope.editUserProfile= function(user){
        	userID= $scope.user.objectId;
        $http.put(userUrl+ userID, user, {headers:{
                'X-Parse-Application-Id': 'iVBIZ8aBC1T1zcCOWvAc7AXDisgspY3S41YdI67u', 
                  'X-Parse-REST-API-Key': '0fc6LBtsQvnM1PuNQR5Tz8YKoP1Vt9kSbEHCKSvM', 
                'X-Parse-Session-Token': currentUser.sessionToken, }})
        .success(function(){
          console.log('updated info')
        });
      };


////////////////////////////////////////////// mapbox
    var token= L.mapbox.accessToken = 'pk.eyJ1IjoiY2hlbHNlYWZyYW56MyIsImEiOiItY01TaEpJIn0.JaYH9lRg1C_GmkfW0jtAXQ';
	var map= L.mapbox.map('map', 'chelseafranz3.kb224fb8'	, {
			// legendControl: {
			// 	position: 'bottomleft'
			// 	}
			});		
  map.scrollWheelZoom.disable();

	var stamenLayer = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
  				// attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
		}).addTo(map);

	var geocoder = L.mapbox.geocoder('mapbox.places-v1');
			
		

			function showMap(err, data) {
			    if (data.lbounds) {
			        map.fitBounds(data.lbounds);
			    } else if (data.latlng) {
			        map.setView([data.latlng[0], data.latlng[1]], 13);
			    }
			};

	map.addControl(L.mapbox.geocoderControl('mapbox.places-v1'), {
		autocomplete: true,
		 keepOpen: true
	});

	map.on('click', function(e) {
	alert(e.latlng);
		});


// var geolocate = document.getElementById('geolocate');
var myLayer = L.mapbox.featureLayer().addTo(map);

// if (!navigator.geolocation) {
//     geolocate.innerHTML = 'Geolocation is not available';
// } else {
//     geolocate.onclick = function (e) {
//         e.preventDefault();
//         e.stopPropagation();
//         map.locate();
//     };
// };

// Once we've got a position, zoom and center the map
// on it, and add a single marker.
// map.on('locationfound', function(e) {
//     map.fitBounds(e.bounds);

//     myLayer.setGeoJSON({
//         type: 'Feature',
//         geometry: {
//             type: 'Point',
//             coordinates: [e.latlng.lng, e.latlng.lat]
//         },
//         properties: {
//             'title': 'Here I am!',
//             'marker-color': '#ff8888',
//             'marker-symbol': ''
//         }
//     });

//     // And hide the geolocation button
//     geolocate.parentNode.removeChild(geolocate);
// });






	}]); //end controller

}());