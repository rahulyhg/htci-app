angular.module('app.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('CalendarCtrl', function($scope){
	ionic.Platform.ready(function(){
		$('#calendar').fullCalendar({
			googleCalendarApiKey: 'AIzaSyDWxFLiU_MMAq2RwAAVlp3o-xSsg6Iq1KE',
			events: {
				googleCalendarId: '6h3644bidpfp4m3da16mkjdtbk@group.calendar.google.com'
			},
			header: {
				left: 'prev,next',
				center: '',
				right: 'title'
			},
			allDayText: 'All Day',
			height: "auto"
			//aspectRatio: 1
		});
	});
})

.controller('IndexCtrl', function($scope){
	ionic.Platform.ready(function(){
		document.getElementById("date").innerHTML = Date();
	})
})
