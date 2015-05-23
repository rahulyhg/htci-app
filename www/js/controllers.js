angular.module('app.controllers', ['app.services','ionic'])

	.controller('AppCtrl', function($scope) {

		$scope.toggle = function() {
			$('#help-list').toggle();
		}

	})

	.controller('SponsorshipCtrl', function($scope, $ionicModal) {
		// Create the login modal that we will use later
		$ionicModal.fromTemplateUrl('templates/paypal.html', {
			scope: $scope
		}).then(function(modal) {
			$scope.modal = modal;
		});

		// Triggered in the login modal to close it
		$scope.closePaypal = function() {
			$scope.modal.hide();
		};

		// Open the login modal
		$scope.paypal = function() {
			$scope.modal.show();
		};

		$scope.initPaymentUI = function() {
			var clientIDs = {
				"PayPalEnvironmentProduction": "YOUR_PRODUCTION_CLIENT_ID",
				"PayPalEnvironmentSandbox": "YOUR_SANDBOX_CLIENT_ID"
			};
			PayPalMobile.init(clientIDs, $scope.onPayPalMobileInit);

		};

		$scope.onSuccesfulPayment = function(payment) {
			console.log("payment success: " + JSON.stringify(payment, null, 4));
		};
		$scope.onAuthorizationCallback = function(authorization) {
			console.log("authorization: " + JSON.stringify(authorization, null, 4));
		};
		$scope.createPayment = function() {
			// for simplicity use predefined amount
			var paymentDetails = new PayPalPaymentDetails("1.75", "0.00", "0.00");
			var payment = new PayPalPayment("1.75", "USD", "Awesome Sauce", "Sale",
											paymentDetails);
			return payment;
		};
		$scope.configuration = function() {
			// for more options see `paypal-mobile-js-helper.js`
			var config = new PayPalConfiguration({
				merchantName: "My test shop",
				merchantPrivacyPolicyURL: "https://mytestshop.com/policy",
				merchantUserAgreementURL: "https://mytestshop.com/agreement"
			});
			return config;
		};
		$scope.onPrepareRender = function() {
			// buttons defined in index.html
			//  <button id="buyNowBtn"> Buy Now !</button>
			//  <button id="buyInFutureBtn"> Pay in Future !</button>
			var buyNowBtn = document.getElementById("buyNowBtn");
			var buyInFutureBtn = document.getElementById("buyInFutureBtn");

			buyNowBtn.onclick = function(e) {
				// single payment
				PayPalMobile.renderSinglePaymentUI($scope.createPayment(), $scope.onSuccesfulPayment,
												   $scope.onUserCanceled);
			};

			buyInFutureBtn.onclick = function(e) {
				// future payment
				PayPalMobile.renderFuturePaymentUI($scope.onAuthorizationCallback, $scope.onUserCanceled);
			};
		};
		$scope.onPayPalMobileInit = function() {
			// must be called
			// use PayPalEnvironmentNoNetwork mode to get look and feel of the flow
			PayPalMobile.prepareToRender("PayPalEnvironmentNoNetwork", $scope.configuration(),
										 $scope.onPrepareRender);
		};
		$scope.onUserCanceled = function(result) {
			console.log(result);
		};

		$scope.initPaymentUI();
	})

	.controller('CalendarCtrl', function($scope){
		ionic.Platform.ready(function(){
			$('#calendar').fullCalendar({
				googleCalendarApiKey: 'AIzaSyDWxFLiU_MMAq2RwAAVlp3o-xSsg6Iq1KE',
				events: {
					googleCalendarId: 'ndevt2o5ag5rkc9aobvtp9rmdc@group.calendar.google.com'
				},
				header: {
					left: 'prev,next',
					center: '',
					right: 'title'
				},
				allDayText: 'All Day',
				height: "auto",
				views: {
					list: {
						type: 'ListView',
						height: 'auto',
						duration: { days: 30 },
						buttonText: 'List',
						titleFormat: 'D MMMM YYYY'
					}
				},
				defaultView: "list",
				eventAfterAllRender: function() {					
					$('#calendar').fullCalendar('getView').setHeight('auto');
				}
			});
		});
	})

	.controller('IndexCtrl', function($scope, $ionicSlideBoxDelegate){
		var d = new Date();
		var day = d.getDay();
		var month = d.getMonth();
		var date = d.getDate();
		var year = d.getFullYear();
		var daysArray = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
		var monthsArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];
		document.getElementById("date").innerHTML = daysArray[day] + ", " + monthsArray[month] + " " + date + ", " + year;

		$scope.$on('$ionicView.enter', function(){
			$ionicSlideBoxDelegate.update();

			setSliderHeight();
		})

		$(window).on("resize",function(){
			setSliderHeight();
		})
	})

	.controller('FacebookCtrl', function($scope){
		(function(d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) return;
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3&appId=342374259303120";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
		/*$('a').on('click', function(e) {
			e.preventDefault();
			window.open($(this).attr('href'), '_system');
			return false;
		});*/
	})

	.controller('ContactCtrl', function($scope){
		$scope.listCanSwipe = true;

		$scope.boardContacts = [
			{name: "Mr. Vijayapal Reddy", title: "Chairman", phone: "13178438482", email: "vijayapalr@gmail.com"},
			{name: "Mr. Arun Jain", title: "Vice-Chairman", phone: "17653763976", email: "ajmd02@gmail.com"},
			{name: "Mr. Ramarao Yeleti", title: "Secretary", phone: "13178155811", email: "ryeleti@aol.com"},
			{name: "Mr. Venkat Rao", title: "Treasurer", phone:"13178468086", email:"sai55@aol.com"}
		];

		$scope.executiveContacts = [
			{name: "Mr. Ambat Babu", title: "President", phone: "13174900392", email: "htcibabu@yahoo.com"},
			{name: "Mr. Jagannath Pandey", title: "President-Elect/Vice-President", phone: "13173400918", email: "jaypandey50@hotmail.com"}
		];

		$scope.callTel = function(number){
			window.location.href = "tel:+" + number;
		}

		$scope.email = function(address){
			window.location.href = "mailto:" + address;
		}
	})

	.controller('VolunteerCtrl', function($scope){
		$scope.list = [
			{area: "Kitchen", description: "To prepare and serve food (Weekends)."},
			{area: "Front Desk", description: "To assist devotees at the front desk and answer the phone (Every day during Temple hours)."},
			{area: "Computer Work", description: "To assist in data entry, installation/maintenance of electronic equipment."},
			{area: "Cleaning", description: "To help clean the kitchen and the worship hall (Weekends)."},
			{area: "Special Event Preparation", description: "To decorate the worship hall, to decorate the temple exterior, event coordination."}
		]
	})

	.controller('QRCtrl', function($scope){
		
	})


	.controller('EventsCtrl', function($scope, eventService) {
		$scope.events = eventService.all();

	})

	.controller('EventCtrl', function($scope, $stateParams, eventService) {
		$scope.event = eventService.get($stateParams.eventId);
    });
