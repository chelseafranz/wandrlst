(function  () {

	angular.module('WanderMod').controller('ListController', ['$scope','PARSE_HEADERS','PARSE_URI', '$location','MainFactory','$routeParams', 'UserFactory','$cookieStore',function($scope, PARSE_HEADERS, PARSE_URI, $location, MainFactory, $routeParams, UserFactory, $cookieStore){
		var list;

		var addSave= function  (save, u) {
			console.log(u);
			SaveFactory.addSave(save);
		};
	
	$scope.user = UserFactory.currentUser();
	userID= $scope.user.objectId;
	console.log(userID);

		$scope.tipsShow= false;
		$scope.listShow= false;
		$scope.dateShow= false;
		$scope.brunchShow= false;

	
	$( ".lists" ).draggable({ addClasses: true});
	$( ".tips" ).draggable({ addClasses: true });
	$( ".date" ).draggable({ addClasses: true});
	$( ".brunch" ).draggable({ addClasses: true, context: 'ul'  });

	var saved=[];

	$('li').droppable({ addClasses: true, tolerance: 'fit', context: 'ul',  greedy: true});

	$( ".mywandrlst" ).on( "drop", function( drop, li ) {
		saved.push(li.draggable[0].id);
		console.log(li);
		console.log(saved);
		console.log(saved.length);

	});





	   	$scope.editUserProfile= function(user){
        	userID= $scope.user.objectId;
        $http.put(userUrl+ userID, user, {headers:{
                'X-Parse-Application-Id': 'iVBIZ8aBC1T1zcCOWvAc7AXDisgspY3S41YdI67u', 
                  'X-Parse-REST-API-Key': '0fc6LBtsQvnM1PuNQR5Tz8YKoP1Vt9kSbEHCKSvM', 
                'X-Parse-Session-Token': currentUser.sessionToken, }})
        .success(function(){
          console.log('updated info');
        });
      };




	$( "ul.droptrue" ).sortable({
      connectWith: "ul"
    });

		MainFactory.getOneCity($routeParams.id).
		success(function(data){
	        $scope.city=data;
	        
	        MainFactory.tipsByCity(data.name).success(function(data){
	        	$scope.tips=data.results;
	        });
	        MainFactory.listsByCity(data.name).success(function(data){
	        	$scope.lists=data.results;
	        });
	        MainFactory.datesByCity(data.name).success(function(data){
	        	$scope.dates=data.results;
	        });
	        MainFactory.brunchsByCity(data.name).success(function(data){
	        	$scope.brunchs=data.results;
	        });

	        });
	

		$scope.addList= function(newList, c){
			console.log(c);
			newList.city= c;
			MainFactory.addList(newList);
			  $('#bars')[0].reset();
			};


		$scope.addTip= function(newTip, c){
			console.log(c);
			newTip.city= c;
			MainFactory.addTip(newTip);
			 
		};

		$scope.addDate=function(newDate, c){
			newDate.city=c;
			MainFactory.addDate(newDate);
		};

		$scope.addBrunch=function(newBrunch, c){
			newBrunch.city=c;
			MainFactory.addBrunch(newBrunch)	
		};
		

		$scope.chooseList= function(){
			var choose= $('select').val();
			console.log(choose);
			switch (choose){
				case 'tips':
				$scope.tipsShow= true;
				break;
				case 'bars':
				$scope.listShow= true;
				break;
				case 'date':
				$scope.dateShow= true;
				break;
				case 'brunch':
				$scope.brunchShow= true;
				break;
				
			}
		};

		$scope.listByCity = function(){
			MainFactory.listByCity();
		};

		$(document).ready(function() {

    var selectedClass = 'ui-state-highlight',
        clickDelay = 600,
        // click time (milliseconds)
        lastClick, diffClick; // timestamps

    $("#draggable li")
    .draggable({
        revertDuration: 10,
        // grouped items animate separately, so leave this number low
        containment: '.demo',

        start: function(e, ui) {
            ui.helper.addClass(selectedClass);
        },
        // stop: function(e, ui) {
        //     // reset group positions
        //     $('.' + selectedClass).css({
        //         top: 0,
        //         left: 0
        //     });
        // },
        drag: function(e, ui) {
            // set selected group position to main dragged object
            // this works because the position is relative to the starting position
            $('.' + selectedClass).css({
                top: ui.position.top,
                left: ui.position.left
            });
        }
    });


    $("#droppable, #draggable").sortable().droppable({
        drop: function(e, ui) {
            $('.' + selectedClass).appendTo($(this)).add(ui.draggable) // ui.draggable is appended by the script, so add it after
            .removeClass(selectedClass).css({
                top: 0,
                left: 0
            });
        }
    });

});

      $( ".mywandrlst" ).on( "drop", function( drop, ui ) {} );

	
		

	}]); //end controller
}());

