(function() {
	angular.module('WanderMod').controller('UserController', ['$scope', '$location', 'PARSE_HEADERS','UserFactory','MainFactory', '$http','$cookieStore','$routeParams',function  ($scope, $location, PARSE_HEADERS, UserFactory, $http, $cookieStore, MainFactory, $routeParams ) {
		
  		$scope.addUser= function(user){
  			UserFactory.register(user);
  			$location.path('/start');
  		};

  		$scope.login = function(user){
  			UserFactory.login(user)
  			
  		};

  		// $scope.logout = function(){
    //       $cookieStore.remove('currentUser');
    //       return checkUser();
    //     };
  		

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

        var getUserProfile= function  (user) {
         var user = $cookieStore.get('currentUser');
         user= 'currentUser';
         console.log(user);
        };

       

        var currentUser = function(){
          MainFactory.currentUser();
          console.log('user');
        }
       




	}])
}());