(function  () {
	angular.module('WanderMod').factory( 'UserFactory', ['$http', 'PARSE_HEADERS', 'PARSE_URI','$location','$cookieStore', function ($http, PARSE_HEADERS, PARSE_URI, $location, $cookieStore){

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
            console.log( 'welcome back '+ user.username);
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
        }

        return{
        	register : register,
        	login : login,
        	checkUser : checkUser,
          logout : logout

        }


}]);
}());