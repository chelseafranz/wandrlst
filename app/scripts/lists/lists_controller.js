(function  () {

	angular.module('WanderMod').controller('ListController', ['$scope','PARSE_HEADERS','PARSE_URI', '$location','MainFactory','$routeParams', function($scope, PARSE_HEADERS, PARSE_URI, $location, MainFactory, $routeParams){
		var list;

		$scope.tipsShow= false;
		$scope.listShow= false;
		// $scope.dateShow= false;
		// $scope.brunchShow= false;

		MainFactory.getLists().success(function(data){
			$scope.lists= data.results;
		});

		MainFactory.getTips().success(function(data){
			$scope.tips= data.results;
		});
		MainFactory.getDates().success(function(data){
			$scope.dates= data.results;
		});
		MainFactory.getBrunchs().success(function(data){
			$scope.brunchs= data.results;
		});
		$scope.addList= function(newList, c){
			console.log(c);
			newList.city= c;
			MainFactory.addList(newList);
			 //$('#bars')[0].reset();
			};

			MainFactory.getOneCity($routeParams.id).
			success(function(data){
	        $scope.city=data;

	        	});

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
		

	}]); //end controller
}());

