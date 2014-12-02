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