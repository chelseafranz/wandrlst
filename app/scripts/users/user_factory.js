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