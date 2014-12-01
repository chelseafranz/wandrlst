(function() {
	angular.module('WanderMod').controller('UserController', ['$scope', '$firebaseAuth', 'FIREBASE_URL', '$location', function  ($scope, $firebaseAuth, FIREBASE_URL, $location) {


		var usersRef= new Firebase(FIREBASE_URL);

		$scope.authObj= $firebaseAuth(usersRef);
	

		$scope.register = function(newUser){
			$scope.authObj.$createUser(newUser.email,newUser.password)
			.then( function(){
				$scope.login(newUser)
			}).catch( function(error){
				console.log('error', error);
			});
		};

		$scope.login= function(user){
			$scope.authObj.$authWithPassword({
				email: user.email,
				password: user.password
			}).then( function(){
				$scope.checkUser();

				$location.path('/start');

			}).catch( function(error){
				alert(error.message);
			})
		};


		$scope.checkUser = function(){
			var authData= $scope.authObj.$getAuth();
			if(authData){
				alert( 'User logged in as ' + authData.password.email)
			}else{
				console.log('no one is logged in');
			}
		};

	}])
}());