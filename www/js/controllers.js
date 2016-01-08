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
			{name: "Sri. Ramarao Yeleti", email: "ryeleti@aol.com"},
			{name: "Sri. Ravi Pattar", email:"pattarcpa@yahoo.com"},
			{name: "Sri. Rama Belagaje", email:"rama_belagaje@yahoo.com"},
			{name: "Sri. Prabhakar Kasarabada", email:"prabhakark94@hotmail.com"},
			{name: "Sri. Kannan Natarajan", email:"knatarajan@indy.rr.com"},
			{name: "Sri. Subash Khanna", email:"subashkhanna@sbcglobal.net"},
			{name: "Sri. M.R. Ivaturi", email:"ivaturi1@gmail.com"},
			{name: "Sri. Anil Bajpai", email:"bajpaia@yahoo.com"},
			{name: "Sri. Mani Subramaniam", email:"mani_subramaniam@yahoo.com"},
			{name: "Sri. Sathya Thulasiraman", email:"stindpls@yahoo.com"},
			{name: "Sgt. Javed Khan", email:"tkdindia@hotmail.com"},
			{name: "Smt. Kshitija Dube", email:"sdube62@hotmail.com"},
			{name: "Sri. Dilip Vadlumudi", email:"dvadlamudi@yahoo.com"},
			{name: "Sri. Om Narla", email:"om@golars.com"}
		];

		$scope.executiveContacts = [
			{name: "Sri. Jagannath Pandey", title: "President", phone: "13173400918", email: "jay.pandey@htci.org"},
			{name: "Sri. Krishnakumar Padmanabhan", title: "President Elect/Vice President", email: "Krishna.padmanabhan@htci.org"},
			{name: "Sri. Sandeep Gupta", title: "Secretary", email: "sandeep.gupta@htci.org"},
			{name: "Sri. Ravi Dinakaran", title: "Treasurer", email: "treasurer@htci.org"},
			{name: "Smt. Kusum Patel", title: "Joint Treasurer/Secretary", email: "kusum.patel@htci.org"},
			{name: "Smt. Nalini Belagaje", title: "Function Coordination Committee", email: "cultural@htci.org"},
			{name: "Sri. Ananth Duvvuri", title: "Pooja Coordination Committee", email: "seva@htci.org"},
			{name: "Sri. Nabin Pudasaini", title: "Membership Committee", email: "membership@htci.org"},
			{name: "Sri. Raveendran Dudhlur", title: "Maintenance Committee", email: "maintenance@htci.org"},
			{name: "Smt. Shanti Pathak", title: "Library Committee", email: "library@htci.org"},
			{name: "Sri. Priyesh Kheradia", title: "Youth Activity Coordinator", email: "Priyesh.kheradia@htci.org"},
			{name: "Sri. Raghava Ayyagari", title: "Communication Committee", email: "communications@htci.org"},
			{name: "Sri. Aryaman Gupta", title: "Youth Committee", email: "Aryaman.gupta@htci.org"},
			{name: "Smt. Kamna Gupta", title: "Youth Committee", email: "Kamna.gupta@htci.org"},
			{name: "Smt. Suneela Ramaswamy", title: "Geeta Session Coordinator", email: "suneelaramaswamy@gmail.com"}
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
			{area: "Special Event Preparation", description: "To decorate the worship hall, to decorate the temple exterior, event coordination."},
			{area: "Maintenance", description: "To assist in Temple upkeep and maintenance."}
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
		$scope.allTimes = Poojas.allSlot();
		$scope.allLocations = Poojas.allLocations();
		$scope.allMemberOptions = Poojas.allMemberOptions();
		$scope.allTransportationOptions = Poojas.allTransportationOptions();
		$scope.SubmitRequestForm = function(fullname, address, city, state, zip, phone, emailaddress, pooja, date, slot, location, transportation, member, note){

			var mailJSON ={
       			"key": "ZvCHjI8MtG8KW0Wz5b7PUA",
       			"message": {
       				"html": "Name: "+ fullname +"<br>Address: "+ address +"<br>City: "+ city +"<br>State: "+ state +"<br>Zip: "+ zip +"<br>Phone: "+ phone +"<br>Pooja: "+ pooja +"<br>Date: "+ date +"<br>Timeslot: "+ slot.time +"<br>Location: "+ location.location +"<br>Transportation Method: "+ transportation.method +"<br>Member of HTCI: "+ member.option +"<br>Notes: "+ note,
       				"text": "Example text content",
       				"subject": "Request for Service",
       				"from_email": emailaddress,
       				"from_name": fullname,
       				"to": [
       					{
       						"email": "tqm397@gmail.com",
       						"name": "Vincent Mai",
       						"type": "to"
       					},
						{
							"email": emailaddress,
							"name": fullname,
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

        	$http.post(apiURL, mailJSON)
				.success(function(data, status, headers, config) {
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

	.controller('PhotosCtrl', function($scope, Key, $ionicLoading,$state,Flickr){
		$ionicLoading.show();
		//testing firebase
		$scope.key = Key;
		console.log($scope.key.$id);

		// Getting Photosets Detail from Flickr Service
		Flickr.getPhotoSets().then(function(result){
			//console.log(result.data);
			$scope.photoList = result.data.photosets.photoset;
			$scope.photoList.reverse();
			$ionicLoading.hide();
		});

		// Opening Album
		$scope.openAlbum = function(album_id) {
			$state.go('app.album',{id: album_id });
		};
	})

	.controller('AlbumCtrl', function($scope,$ionicLoading,$stateParams,Flickr) {
		$ionicLoading.show();
		$scope.id = $stateParams.id;
		$scope.photoList = [];

		// Getting List of Photos from a Photoset
		Flickr.getPhotos($scope.id).then(function(result){
			$ionicLoading.hide();
			console.log(result);
			$scope.photos = result.data.photoset.photo;
			console.log($scope.photos);
			$scope.title = result.data.photoset.title;

			angular.forEach($scope.photos, function(photo,key) {
				var id = photo.id;
				var secret = photo.secret;
				Flickr.getInfo(id,secret).then(function(result) {
					$scope.photoList.push({sizes: result[0].data, info: result[1].data});
					console.log($scope.photoList);

				});
			});
		});
	})

	.controller('QRCtrl', function($scope, $cordovaBarcodeScanner, $timeout){
		$scope.scanBarcode = function() {
			$cordovaBarcodeScanner.scan().then(function(imageData) {
				//A timeout is needed because the scanner window does not allow for the alert to display
				if(imageData.cancelled === 0 || imageData.cancelled === false){
					//$timeout(function(){
					//	navigator.notification.alert(imageData.text, function(){}, "QR Scanner");
					//}, 1000);
					//alert(imageData.text);
					document.getElementById("text").innerHTML = imageData.text;
					//alert(JSON.stringify(imageData));
				}
				console.log("Barcode Format -> " + imageData.format);
				console.log("Cancelled -> " + imageData.cancelled);
			}, function(error) {
				console.log("An error happened -> " + error);
			});
		};
	});
