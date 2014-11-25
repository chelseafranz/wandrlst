(function () {
angular.module('WanderMod').factory('WanderFactory', ['$rootscope', '$http', function($rootscope, $http){

	var url= 'https://wandrlst.firebaseio.com/';
	var usersRef= new Firebase(FIREBASE_URL);
	$scope.authObj= $firebaseAuth(usersRef);
	
	function register(newUser){
		$rootscope.authObj.$createUser(newUser.email, newUser.password).then( function(){
			$rootscope.login(newUser)
		}).catch(function(error){
			console.log('error', error);
		});
	};



	return {
		register: register
	};



}]);
}());