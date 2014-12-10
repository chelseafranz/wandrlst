(function  () {
	angular.module('WanderMod')
	.controller( 'StartController', ['$scope', 'uiGmapGoogleMapApi', '$location', '$http', 'PARSE_HEADERS', 'MainFactory','$routeParams','$cookieStore', 'UserFactory','SaveFactory', function($scope, uiGmapGoogleMapApi, $location, $http, PARSE_HEADERS, MainFactory, $routeParams, $cookieStore, UserFactory, SaveFactory ){

		var userUrl = ' https://api.parse.com/1/users/';
    var savedUrl = ' https://api.parse.com/1/classes/saved';


		MainFactory.getCities().success( function (data) {
          $scope.cities = data.results;
        });

  // MainFactory.getSaveList().success( function(data){
  //     $scope.saved= data.results;
  //     });
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

      
     //  $scope.getUserProfile= function(user){
     //     return $http.get(userUrl+ userID, user, PARSE_HEADERS)
     //  };

     // $scope.getUserProfile().success(function(){
     // 	  console.log('got user info')
     //      $scope.users= results.data
       

     // });




////////////////////////////////////////////// mapbox
    var token= L.mapbox.accessToken = 'pk.eyJ1IjoiY2hlbHNlYWZyYW56MyIsImEiOiItY01TaEpJIn0.JaYH9lRg1C_GmkfW0jtAXQ';
	var map= L.mapbox.map('map', 'chelseafranz3.kb224fb8'	, {
			// legendControl: {
			// 	position: 'bottomleft'
			// 	}
			});		
	var stamenLayer = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
  				attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
		}).addTo(map);

	var geocoder = L.mapbox.geocoder('mapbox.places-v1');
			
			$('#searchForm').on('submit', function(){
				var search=$('#search').val();
			console.log(search);
			geocoder.query(search, showMap);
			});

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


var geolocate = document.getElementById('geolocate');
var myLayer = L.mapbox.featureLayer().addTo(map);

if (!navigator.geolocation) {
    geolocate.innerHTML = 'Geolocation is not available';
} else {
    geolocate.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        map.locate();
    };
}

// Once we've got a position, zoom and center the map
// on it, and add a single marker.
map.on('locationfound', function(e) {
    map.fitBounds(e.bounds);

    myLayer.setGeoJSON({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [e.latlng.lng, e.latlng.lat]
        },
        properties: {
            'title': 'Here I am!',
            'marker-color': '#ff8888',
            'marker-symbol': ''
        }
    });

    // And hide the geolocation button
    geolocate.parentNode.removeChild(geolocate);
});


	// $('#addMarker').on('submit', function(){
	// 	var add=$('#text').val();
	// 	console.log(add);
	// 	addMarker.addTo(map);

	$('#addMarker').on('submit', function(c) {
		alert(c.latlng);
			});
	//});


	var addMarker= L.mapbox.featureLayer({
    type: 'Feature',
    geometry: {
        type: 'Point',
        // coordinates here are in longitude, latitude order because
        coordinates: [
           115.129080, -8.324289
        ]
    },
    properties: {
        title: '{{city.name}}, {{city.country}}',
        description: '1718 14th St NW, Washington, DC',
        'marker-size': 'small',
        'marker-color': '#35333D',
        'marker-symbol': ''
    }
});



	}]); //end controller

}());