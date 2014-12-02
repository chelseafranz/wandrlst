(function() {
	angular.module('WanderMod').controller('UserController', ['$scope', '$location', 'PARSE_HEADERS','MainFactory','$http',function  ($scope, $location, PARSE_HEADERS, MainFactory, $http) {
		
  		$scope.addUser= function(user){
  			MainFactory.register(user);
  			$location.path('/start');
  		}



	}])
}());