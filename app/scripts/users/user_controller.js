(function() {
	angular.module('WanderMod').controller('UserController', ['$scope', '$location', 'PARSE_HEADERS','UserFactory','MainFactory', '$http','$cookieStore','$routeParams',function  ($scope, $location, PARSE_HEADERS, UserFactory, $http, $cookieStore, MainFactory, $routeParams ) {
		
      //$scope.user = UserFactory.currentUser();
     // console.log($scope.user.objectId);


  		$scope.addUser= function(user){
  			UserFactory.register(user);
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
        }
       




	}])
}());