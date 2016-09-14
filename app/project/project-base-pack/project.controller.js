/*@ngInject*/
export default function projectCtrl($scope, todoService, authService, $rootScope, $location, $state, $stateParams){



	var pCtrl = this;

	pCtrl.greeting = "Projects";
	pCtrl.user = authService.currentUser();
	pCtrl.uid = pCtrl.user._id;
	pCtrl.token =  authService.getToken();



	$("#menu-toggle").click(function(e) {
		e.preventDefault();
		$("#wrapper").toggleClass("toggled");
	});


	$.fn.extend({
		animateCss: function (animationName) {
			var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
			$(this).addClass('animated ' + animationName).one(animationEnd, function() {
				$(this).removeClass('animated ' + animationName);
			});
		}
	});


	pCtrl.logout = function(){
		authService.logout();
		pCtrl.user = null;
		$rootScope.isLoggedin = false;
		$location.path('/');
	}





	 // console.log($rootScope.projectId + "from todo controller");

	 
	// tCtrl.projectId = $rootScope.projectId;
	

	////////////////CRUD////////////////

	pCtrl.projects = [];

	pCtrl.loadData = function () {
		console.log("data loaded");
		todoService.getProjectStubs(pCtrl.uid, pCtrl.token)
		.then(function (response) {
			pCtrl.projects = response.data;
			console.log(response.data);
		});
	};


	pCtrl.loadData();


	function clearNewForm(){

		pCtrl.newProjTitle = "";
		pCtrl.newProjClient = "";
		pCtrl.newProjDueDate = "";
		pCtrl.newProjRate = "";
	};


	pCtrl.createNewProj = function(title, client, dueDate, rate){


		var project = {

			uid: pCtrl.uid,

			title: title,
			client: client,
			dueDate: dueDate,
			rate: rate
		};
		todoService.createNewProject(project, pCtrl.token)
		.then(function success(response){
			clearNewForm();
			pCtrl.loadData();
			console.log(response.data.title);
			// $rootScope.projectId =
			$state.go('base.projects.dashboard', {proj: response.data._id} );
		});

	};





};

projectCtrl.$inject = ['$scope', 'todoService','authService', '$rootScope', '$location', '$state', '$stateParams']