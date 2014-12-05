(function  () {

	angular.module('WanderMod').controller('ListController', ['$scope','PARSE_HEADERS','PARSE_URI', '$location','MainFactory','$routeParams', function($scope, PARSE_HEADERS, PARSE_URI, $location, MainFactory, $routeParams){
		var list;

// $( "#selectList li" ).draggable({
//       appendTo: "body",
//       helper: "clone"
//     });
//     $( "#cart ul" ).droppable({
//       activeClass: "ui-state-default",
//       hoverClass: "ui-state-hover",
//       accept: ":not(.ui-sortable-helper)",
//       drop: function( event, ui ) {
//         $( this ).find( ".placeholder" ).remove();
//         $( "<li></li>" )q.text( ui.draggable.text() ).appendTo( this );
//       }
//     }).sortable({
//       items: "li:not(.placeholder)",
//       sort: function() {
//         // gets added unintentionally by droppable interacting with sortable
//         // using connectWithSortable fixes this, but doesn't allow you to customize active/hoverClass options
//         $( this ).removeClass( "ui-state-default" );
//       }
//     });


		$scope.tipsShow= false;
		$scope.listShow= false;
		$scope.dateShow= false;
		$scope.brunchShow= false;

	
	$( ".lists" ).draggable({ addClasses: true,});
	$( ".tips" ).draggable({ addClasses: true, });
	$( ".date" ).draggable({ addClasses: true, });
	$( ".brunch" ).draggable({ addClasses: true, });
	$('li').droppable({ addClasses: true})

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
			 // $('input')[0].reset();
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
			MainFactory.addBrunch(newBrunch);
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
		

	}]); //end controller
}());

