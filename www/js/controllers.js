angular.module('app.controllers', [])

	.controller('AppCtrl', function($scope) {

		$scope.toggle = function() {
			$('#help-list').toggle();
		}

	})

	.controller('SponsorshipCtrl', function($scope, $ionicModal) {
		
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

		//$scope.initPaymentUI();
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
						titleFormat: 'MMMM D, YYYY',
						columnFormat: 'MMMM D, YYYY',
						timeFormat: 'h:mm'
					}
				},
				defaultView: "list",
				eventAfterAllRender: function() {					
					$('#calendar').fullCalendar('getView').setHeight('auto');
				}
			});
		});
	})

	.controller('IndexCtrl', function($scope, $ionicModal){
		$ionicModal.fromTemplateUrl('templates/main/map.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.modal = modal;
		});
		$scope.map = function() {
			$scope.modal.show();
		};
		$scope.closeMap = function() {
			$scope.modal.hide();
		};
	})

	.controller('FacebookCtrl', function($scope, $stateParams, MyFb){
		var posts = [];
		MyFb.getAccessToken().then(function(result){
            var url = 'https://graph.facebook.com/244766008966857/posts?'+result.data;
			MyFb.getPage('https://graph.facebook.com/244766008966857/picture?redirect=0').then(function(r){
				//console.log(r.data.data);
				$scope.picture = r.data.data.url;
			});
            MyFb.getFeed(url).then(function(r){
				//console.log(r.data.data.length);
				for(var i = 0; i<r.data.data.length ; i++)
                {
					//console.log(r.data.data[i]);
					var post = {
						"time": r.data.data[i].created_time,
						"message": r.data.data[i].message,
						"picture": r.data.data[i].picture
					}
					console.log(post);
					posts.push(post);
                }
                $scope.feeds = posts;
				//console.log($scope.feeds);
            });
		});

		$scope.doRefresh = function() {
		};
	})

	.controller('ContactCtrl', function($scope){
		$scope.listCanSwipe = true;

		$scope.boardContacts = [
			{name: "Mr. Vijayapal Reddy", title: "Chairman", phone: "13178438482", email: "vijayapalr@gmail.com"},
			{name: "Mr. Arun Jain", title: "Vice-Chairman", phone: "17653763976", email: "ajmd02@gmail.com"},
			{name: "Mr. Ramarao Yeleti", title: "Secretary", phone: "13178155811", email: "ryeleti@aol.com"},
			{name: "Mr. Venkat Rao", title: "Treasurer", phone:"13178468086", email:"sai55@aol.com"},
			{name: "Mr. Ravi Pattar", title: "Joint Treasurer", phone:"13178627871", email:"pattarcpa@yahoo.com"},
			{name: "Mr. Rama Belagaje", title: "Kumbhabhshekam Committee", phone:"13178155524", email:"rama_belagaje@yahoo.com"},
			{name: "Mr. Prabhakar Kasarabada", title: "Facilities", phone:"13172414818", email:"prabhakark94@hotmail.com"},
			{name: "Mr. Kannan Natarajan", title: "Long Range Planning", phone:"13175669399", email:"knatarajan@indy.rr.com"},
			{name: "Mr. Ram Bhargava", title: "Education & Communication", phone:"13178622228", email:"rammadhu@aol.com"},
			{name: "Mr. Subash Khanna", title: "Community & Public Relations", phone:"13175809877", email:"subashkhanna@sbcglobal.net"},
			{name: "Mr. M.R. Ivaturi", title: "Social & Charitable Activities", phone:"13176962346", email:"ivaturi1@gmail.com"},
			{name: "Mr. Anil Bajpaj", title: "Fund Raising", phone:"13172501431", email:"bajpaja@yahoo.com"},
			{name: "Mr. Mani Subramaniam", title: "Human Resources", phone:"13172703825", email:"mani_subramaniam@yahoo.com"},
			{name: "Mr. Sathya Thulasiraman", title: "Project Manager, Construction", phone:"13177539521", email:"stindpls@yahoo.com"}
		];

		$scope.executiveContacts = [
			{name: "Mr. Ambat Babu", title: "President", phone: "13174900392", email: "htcibabu@yahoo.com"},
			{name: "Mr. Jagannath Pandey", title: "President-Elect/Vice-President", phone: "13173400918", email: "jaypandey50@hotmail.com"},
			{name: "Mr. Sathyaraj Chawan", title: "Secretary", phone: "13174400133", email: "chawan@sbcglobal.net"},
			{name: "Mr. Ravi Dinakaran", title: "Treasurer", phone: "13172136920", email: "ravi_chand@yahoo.com"},
			{name: "Mrs. Kusum Patel", title: "Joint Treasurer/Secretary", phone: "13178755263", email: "vkpuniversal@comcast.net"},
			{name: "Mr. Rajendra Kedlaya", title: "Function Coordination Committee", phone: "13172704850", email: "rked14@yahoo.com"},
			{name: "Mr. Krishnakumar Padmanabhan", title: "Pooja Coordination Committee", phone: "13172585356", email: "mailkpk@yahoo.com"},
			{name: "Mrs. Tripti Vyas", title: "Membership Committee", phone: "13174595530", email: "triptidv@yahoo.com"},
			{name: "Mr. Raveendran Dudhlur", title: "Maintenance Committee", phone: "13176446121", email: "raveendrand@gmail.com"},
			{name: "Mr. Nabin Pudasaini", title: "Library Committee", phone: "13177091537", email: "nabin.pudasaini@yahoo.com"},
			{name: "Mr. Priyash Kheradia", title: "Youth Activity Coordinator", phone: "13179669033", email: "pkheradia@yahoo.com"},
			{name: "Mrs. Shanti Pathak,", title: "Kitchen Committee", phone: "13178440466", email: "pathakgee@sbcglobal.net"},
			{name: "Mr. Vijay Narayanan", title: "Communication Committee", phone: "13174901628", email: "vnarayanan99@gmail.com"},
			{name: "Mr. Aryaman Gupta", title: "Youth Committee", phone: "13174426877", email: "arygupta123@gmail.com"},
			{name: "Miss Kamna Gupta", title: "Youth Committee", phone: "13173137916", email: "kamnagupta3@gmail.com"},
			{name: "Mrs. Suneela Ramaswamy", title: "Geeta Mandal Contact", phone: "13178049927", email: "suneelaramaswamy@gmail.com"}
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

	.controller('EventsCtrl', function($scope, eventService) {
		$scope.events = eventService.all();

	})

	.controller('EventCtrl', function($scope, $stateParams, eventService) {
		$scope.event = eventService.get($stateParams.eventId);
    })

	.controller('UpdatesCtrl', function($scope, $ionicHistory, $state, $http) {
		var previous;

		$scope.$on("$ionicView.beforeEnter", function() {
			previous = $ionicHistory.backView();
			console.log(previous);
			console.log(previous["title"]);
		})

		$scope.goBack = function() {
			console.log("going back!");
			$state.go(previous["stateId"]);
		}

		$scope.getData = function() {
			$http.get('http://htci.org/HTCI_APP/updates.json').then(function(resp) {
				$scope.data = resp.data.data;
				//alert($scope.data);
				
			}, function(err) {
				console.error('ERR', err);
				// err.status will contain the status code
			})
		}

		$scope.doRefresh = function() {
			//$state.reload();
			$scope.getData();
			// Stop the ion-refresher from spinning
			$scope.$broadcast('scroll.refreshComplete');
		};

		$scope.getData();
	})

	.controller('PriestsCtrl', function($scope) {
		$scope.priests = [{
			avatar: 'img/home/logo.png',
			title: 'Sri Badrinath Shastri',
			text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
		},{
			avatar: 'img/home/logo.png',
			title: 'Sri Kirthivasan',
			text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
		},{
			avatar: 'img/home/logo.png',
			title: 'Sri Ramaswami Bhattar',
			text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
		}];
		$scope.toggleItem = function(item) {
			if ($scope.isItemShown(item)) {
				$scope.shownItem = null;
			} else {
				$scope.shownItem = item;
			}
		};
		$scope.isItemShown = function(item) {
			return $scope.shownItem === item;
		};
	})

	.controller('EventBookingCtrl', function($scope, Poojas, $http, $state){
		$scope.allPoojas = Poojas.all();
		$scope.allPriests = Poojas.allPriests();
		$scope.allTimes = Poojas.allSlot();
		$scope.SubmitRequestForm = function(fullname, emailaddress, pooja, priest, date, slot, note){

			var mailJSON ={
       			"key": "ZvCHjI8MtG8KW0Wz5b7PUA",
       			"message": {
       				"html": "<p>Pooja chair, I, "+fullname+", Interested to perform "+pooja +" POOJA on "+ date +"  Please schedule and update me.</p><p>Thanks, <br/>"+fullname+"</p>",
       				"text": "Example text content",
       				"subject": "Request for Service-via APP",
       				"from_email": emailaddress,
       				"from_name": fullname,
       				"to": [
       					{
       						"email": "tqm397@gmail.com",
       						"name": "Vincent Mai",
       						"type": "to"
       					}


       				],
       				"important": true,
       				"track_opens": null,
       				"track_clicks": null,
       				"auto_text": null,
       				"auto_html": null,
       				"inline_css": null,
       				"url_strip_qs": null,
       				"preserve_recipients": null,
       				"view_content_link": null,
       				"tracking_domain": null,
       				"signing_domain": null,
       				"return_path_domain": null
       			},
       			"async": false,
       			"ip_pool": "Main Pool"
       		};
			//reference to the Mandrill REST api
			var apiURL = "https://mandrillapp.com/api/1.0/messages/send.json";

        	$http.post(apiURL, mailJSON).
        		success(function(data, status, headers, config) {
        			$state.go('app.mailack',{"id": 1234})
        			console.log('successful email send.');
        			console.log('status: ' + status);
        		}).error(function(data, status, headers, config) {
        			alert("Please check form");
        			console.log('error sending email.');
        			console.log('status: ' + status);
        		});
        };

	})

	.controller('QRCtrl', function($scope, $cordovaBarcodeScanner, $timeout){
		$scope.scanBarcode = function() {
			$cordovaBarcodeScanner.scan().then(function(imageData) {
				//A timeout is needed because the scanner window does not allow for the alert to display
				if(imageData.cancelled === 0){
					$timeout(function(){
						navigator.notification.alert(imageData.text, function(){}, "QR Scanner");
					}, 500);
				}
				console.log("Barcode Format -> " + imageData.format);
				console.log("Cancelled -> " + imageData.cancelled);
			}, function(error) {
				console.log("An error happened -> " + error);
			});
		};
	});
