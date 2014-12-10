(function() {
	angular.module('WanderMod').controller('UserController', ['$scope', '$location', 'PARSE_HEADERS','UserFactory','MainFactory', '$http','$cookieStore','$routeParams',function  ($scope, $location, PARSE_HEADERS, UserFactory, $http, $cookieStore, MainFactory, $routeParams ) {
		
      //$scope.user = UserFactory.currentUser();
     // console.log($scope.user.objectId);

     var greet = ['hola', 'bonjôur ','cia ', 'Γειά ', 'hola ','aloha ', 'konichiwa ', '你好 ','mirëdita ', 'guten tag ', 'नमस्ते ', 'shalom', 'hej', 'namaste','ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ', 'živjo' ];
     var hello=  function(){

  var item = greet[Math.floor(Math.random()*greet.length)];
    $(this).html( "<h1 id='title'>"+ item + "</h1>");
  };
  $('#title').on('click', hello);


  		$scope.addUser= function(user){
  			UserFactory.register(user);
        UserFactory.login(user);
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
        };

 




	}])
}());