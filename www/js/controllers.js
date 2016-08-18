angular.module('app.controllers', [])

	.controller('AppCtrl', function($scope, $cordovaNetwork) {

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
			//	<button id="buyNowBtn"> Buy Now !</button>
			//	<button id="buyInFutureBtn"> Pay in Future !</button>
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

    .controller('CalendarCtrl', function($scope, googleClient, $ionicLoading, $cordovaNetwork, $ionicNavBarDelegate){
		var oldDate = 0;
		var curDate;
		var eventList = [];

		$scope.month = getActualMonth(new Date().getMonth());
		$scope.$on("$ionicView.afterEnter", function() {
			var offline;
			curDate = (new Date()).valueOf();

			if(navigator.connection) {
				offline = $cordovaNetwork.isOffline();
			}
			else {
				offline = false;
			}
			if(!offline && (curDate - oldDate > 90000)) {
				oldDate = curDate;
				loadData();
			}
		});

		function loadData() {
			$ionicLoading.show();
			googleClient.afterApiLoaded().then(function(){
				gapi.client.setApiKey('AIzaSyCg14xL8h6KPVDA2q1AAaRAUj6UYbtZNS4');
				gapi.client.calendar.events.list({'calendarId': 'htci.org_98m1srpu6julj5fe4pufoh233c@group.calendar.google.com',
												  'timeMin': (new Date()).toISOString(),
												  'showDeleted': false,
												  'singleEvents': true,
												  //'maxResults': 10,
												  'orderBy': 'startTime'}).execute(function(resp) {
													  var events = resp.items;
													  //console.log(events);
													  for(var i = 0; i < events.length; i++) {
														  var startTime = events[i].start;
														  var endTime = events[i].end;

														  var startDate;
														  var endDate;

														  var allDay = false;
														  var description = "";
														  var location = "";
														  //console.log(events[i]);

														  if(startTime.hasOwnProperty('dateTime')) {
															  var date = new Date(startTime.dateTime);
															  startDate = date;
														  }
														  else if(startTime.hasOwnProperty('date')) {
															  allDay = true;
															  var date = new Date(startTime.date);
															  startDate = date;
														  }

														  if(endTime.hasOwnProperty('dateTime')) {
															  var date = new Date(endTime.dateTime);
															  endDate = date;
														  }
														  else if(endTime.hasOwnProperty('date')) {
															  var date = new Date(endTime.date);
															  endDate = date;
														  }

														  if(events[i].hasOwnProperty("description")) {
															  description = events[i].description;
														  }

														  if(events[i].hasOwnProperty("location")) {
															  location = events[i].location;
														  }
														  eventList.push({title: events[i].summary, startTime: startDate, endTime: endDate, allDay: allDay, description: description, location: location});
													  }
													  $scope.loadEvents();
													  $scope.$apply();
												  });
				
			});
		}
		
		$scope.calendar = {};
		$scope.changeMode = function (mode) {
			$scope.calendar.mode = mode;
		};

		$scope.loadEvents = function () {
			//$scope.calendar.eventSource = [{title: 'Test', startTime: new Date(Date.UTC(2016, 7, 10)), endTime: new Date(Date.UTC(2016, 7, 11)), allDay: true}];
			$scope.calendar.eventSource = eventList;
			$ionicLoading.hide();
		};

		$scope.onEventSelected = function (event) {
			var notification = "";
			var flag = false;
			if(event.location !== "") {
				flag = true;
				notification = "Location: " + event.location;
			}
			if(event.description !== "") {
				flag = true;
				if(event.location !== "") {
					notification += "\n\n";
				}
				notification += event.description;
			}
			if(flag) {
				navigator.notification.alert(notification, function(){}, event.title);
			}
		};

		$scope.onViewTitleChanged = function (title) {
			$scope.viewTitle = title;
		};

		$scope.today = function () {
		    $scope.calendar.currentDate = new Date();
		};

		$scope.isToday = function () {
			var today = new Date(),
				currentCalendarDate = new Date($scope.calendar.currentDate);

			today.setHours(0, 0, 0, 0);
			currentCalendarDate.setHours(0, 0, 0, 0);
			$scope.month = getActualMonth(currentCalendarDate.getMonth());
			return today.getTime() === currentCalendarDate.getTime();
		};
	})


	.controller('PanchangCtrl', function($scope, googleClient, $ionicLoading, $cordovaNetwork){
		var oldDate = 0;
		var curDate;
		var eventList = [];

		$scope.month = getActualMonth(new Date().getMonth());
		$scope.$on("$ionicView.afterEnter", function() {
			var offline;
			curDate = (new Date()).valueOf();

			if(navigator.connection) {
				offline = $cordovaNetwork.isOffline();
			}
			else {
				offline = false;
			}
			if(!offline && (curDate - oldDate > 90000)) {
				oldDate = curDate;
				loadData();
			}
		});

		function loadData() {
			$ionicLoading.show();
			googleClient.afterApiLoaded().then(function(){
				gapi.client.setApiKey('AIzaSyCg14xL8h6KPVDA2q1AAaRAUj6UYbtZNS4');
				gapi.client.calendar.events.list({'calendarId': 'htci.org_beaja34s0lhr9kbafgskj7b430@group.calendar.google.com',
												  'timeMin': (new Date()).toISOString(),
												  'showDeleted': false,
												  'singleEvents': true,
												  //'maxResults': 10,
												  'orderBy': 'startTime'}).execute(function(resp) {
													  var events = resp.items;
													  //console.log(events);
													  for(var i = 0; i < events.length; i++) {
														  var startTime = events[i].start;
														  var endTime = events[i].end;

														  var startDate;
														  var endDate;

														  var allDay = false;
														  var description = "";
														  var location = "";
														  //console.log(events[i]);

														  if(startTime.hasOwnProperty('dateTime')) {
															  var date = new Date(startTime.dateTime);
															  startDate = date;
														  }
														  else if(startTime.hasOwnProperty('date')) {
															  allDay = true;
															  var date = new Date(startTime.date);
															  startDate = date;
														  }

														  if(endTime.hasOwnProperty('dateTime')) {
															  var date = new Date(endTime.dateTime);
															  endDate = date;
														  }
														  else if(endTime.hasOwnProperty('date')) {
															  var date = new Date(endTime.date);
															  endDate = date;
														  }

														  if(events[i].hasOwnProperty("description")) {
															  description = events[i].description;
														  }

														  if(events[i].hasOwnProperty("location")) {
															  location = events[i].location;
														  }
														  eventList.push({title: events[i].summary, startTime: startDate, endTime: endDate, allDay: allDay, description: description, location: location});
													  }
													  $scope.loadEvents();
													  $scope.$apply();
												  });

			});
		}
		$scope.calendar = {};
		$scope.changeMode = function (mode) {
			$scope.calendar.mode = mode;
		};

		$scope.loadEvents = function () {
			//$scope.calendar.eventSource = [{title: 'Test', startTime: new Date(Date.UTC(2016, 7, 10)), endTime: new Date(Date.UTC(2016, 7, 11)), allDay: true}];
			$scope.calendar.eventSource = eventList;
			$ionicLoading.hide();
		};

		$scope.onEventSelected = function (event) {
			var notification = "";
			var flag = false;

			if(event.description !== "") {
				flag = true;
				notification += event.description;
			}
			if(flag) {
				navigator.notification.alert(notification, function(){}, event.title);
			}
		};

		$scope.onViewTitleChanged = function (title) {
			$scope.viewTitle = title;
		};

		$scope.today = function () {
			$scope.calendar.currentDate = new Date();
		};

		$scope.isToday = function () {
			var today = new Date(),
				currentCalendarDate = new Date($scope.calendar.currentDate);

			today.setHours(0, 0, 0, 0);
			currentCalendarDate.setHours(0, 0, 0, 0);
			$scope.month = getActualMonth(currentCalendarDate.getMonth());
			return today.getTime() === currentCalendarDate.getTime();
		};
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

	.controller('FacebookCtrl', function($scope, $ionicLoading, $stateParams, MyFb, $cordovaNetwork){
		var oldDate = 0;
		var curDate;

		$scope.$on("$ionicView.afterEnter", function() {
			var offline;
			curDate = (new Date()).valueOf();

			if(navigator.connection) {
				offline = $cordovaNetwork.isOffline();
			}
			else {
				offline = false;
			}
			if(!offline && (curDate - oldDate > 90000)) {
				oldDate = curDate;

				$ionicLoading.show();
				var posts = [];
				MyFb.getAccessToken().then(function(result){
					var url = 'https://graph.facebook.com/244766008966857/posts?'+result.data;
					MyFb.getPage('https://graph.facebook.com/244766008966857/picture?redirect=0').then(function(r){
						//console.log(r.data.data);
						$scope.picture = r.data.data.url;
					});
					MyFb.getFeed(url).then(function(r){
						//console.log(r.data.data.length);
						for(var i = 0; i<r.data.data.length; i++)
						{
							//console.log(r.data.data[i]);
							var monthsArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];

							var date = r.data.data[i].created_time;
							var dateArray = date.split(/[- T : +]/);
							var month = dateArray[1] - 1;
							var day = dateArray[2];
							var year = dateArray[0];

							var d = new Date(year, month, day);
							var post = {
								"time": monthsArray[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear(),
								"message": r.data.data[i].message,
								"picture": r.data.data[i].picture
							}
							console.log(post);
							posts.push(post);
						}
						$scope.feeds = posts;
						$ionicLoading.hide();
						//console.log($scope.feeds);
					});
				});
			}
		});
	})

	.controller('ContactCtrl', function($scope, $ionicActionSheet){
		$scope.show = function(name, phone, email) {

			var buttons = [];
			if(phone !== "")
				buttons.push({text: 'Call'});
			if(email !== "")
				buttons.push({text: 'Email'});

			var hideSheet = $ionicActionSheet.show({
				buttons: buttons,
				titleText: name,
				cancelText: 'Cancel',
				cancel: function() {
				},
				buttonClicked: function(index) {
					console.log(index);
					if(index === 0) {
						$scope.callTel(phone);
					}
					else if(index === 1) {
						$scope.email(email);
					}
					return true;
				}
			});
		}

		$scope.boardContacts = [
			{name: "Sri. Ravi Pattar", title: "Chairman", phone: "13178627871", email:"ravi.pattar@htci.org"},
			{name: "Sri. Anil Bajpai", title: "Vice-Chairman", phone: "13172501431", email:"anil.bajpai@htci.org"},
			{name: "Sri. Ramarao Yeleti", title: "Secretary & Joint Treasurer", phone: "13178155811", email: "ramu.yeleti@htci.org"},
			{name: "Sri. Mani Subramaniam", title: "Treasurer", phone: "13172703825", email:"mani.subramaniam@htci.org"},
			{name: "Sri. Subash Khanna", title: "Community & Public Relations", phone: "13175809877", email:"subhash.khanna@htci.org"},
			{name: "Sri. Om Narla", title: "Fund Raising", phone: "13129535804", email:"om.narla@htci.org"},
			{name: "Sri. Prabhakar Kasarabada", title: "Long Range Planning", phone: "13172414818", email:"prabhakar.kasarabada@htci.org"},
			{name: "Sri. Sathya Thulasiraman", title: "Facilities", phone: "13177539521", email:"sathya.thulasiraman@htci.org"},
			{name: "Sri. Kannan Natarajan", title: "Education", phone: "13175669399", email:"kannan.natarajan@htci.org"},
			{name: "Sri. Rama Belagaje", title: "Communications (NewsLetter)", phone: "13178155524", email:"rama.belagaje@htci.org"},
			{name: "Smt. Kshitija Dube", title: "Functions Coordinator", phone: "13175088957", email:"kshitija.dube@htci.org"},
			{name: "Sri. M.R. Ivaturi", title: "Social & Charitable Activities", phone: "13176962346", email:"rao.ivaturi@htci.org"},
			{name: "Sri. Dilip Vadlumudi", title: "Human Resources", phone: "13175644484", email:"dilip.vadlamudi@htci.org"}
		];

		$scope.executiveContacts = [
			{name: "Sri. Jagannath Pandey", title: "President", phone: "13173400918", email: "jay.pandey@htci.org"},
			{name: "Sri. Krishnakumar Padmanabhan", title: "President Elect/Vice President", phone: "13172585356", email: "Krishna.padmanabhan@htci.org"},
			{name: "Sri. Sandeep Gupta", title: "Secretary", phone: "13175327284", email: "sandeep.gupta@htci.org"},
			{name: "Sri. Ravi Dinakaran", title: "Treasurer", phone: "13172136920", email: "treasurer@htci.org"},
			{name: "Smt. Kusum Patel", title: "Joint Treasurer/Secretary", email: "kusum.patel@htci.org"},
			{name: "Smt. Nalini Belagaje", title: "Function Coordination Committee", phone: "13178155524", email: "cultural@htci.org"},
			{name: "Sri. Ananth Duvvuri", title: "Pooja Coordination Committee", phone: "15124667399", email: "seva@htci.org"},
			{name: "Sri. Raveendran Dudhlur", title: "Maintenance Committee", phone: "13179971851", email: "maintenance@htci.org"},
			{name: "Smt. Shanti Pathak", title: "Library Committee", phone: "13175070462", email: "library@htci.org"},
			{name: "Sri. Priyesh Kheradia", title: "Youth Activity Coordinator", phone: "13179669033", email: "Priyesh.kheradia@htci.org"},
			{name: "Smt. Usha Yemme", title: "Kitchen Committee", phone: "13175904875", email: "kitchen@htci.org"},
			{name: "Sri. Raghava Ayyagari", title: "Communication Committee", phone: "13179795097", email: "communications@htci.org"},
			{name: "Smt. Suneela Ramaswamy", title: "Geeta Session Coordinator", email: "suneelaramaswamy@gmail.com"},
			{name: "Sri. Prakash Mahesh", title: "Membership Committee", email: "membership@htci.org"},
			{name: "Nikhil Jain", title: "Youth Committee", email: "chetanahtci@htci.org"},
			{name: "Kum. Bhavi Sarda", title: "Youth Committee", email: "chetanahtci@htci.org"}
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

	.controller('UpdatesCtrl', function($scope, $ionicHistory, $state, $cordovaNetwork) {
		var oldDate = 0;
		var curDate;

		$scope.$on("$ionicView.afterEnter", function() {
			var offline;
			curDate = (new Date()).valueOf();

			if(navigator.connection) {
				offline = $cordovaNetwork.isOffline();
			}
			else {
				offline = false;
			}
			if(!offline && (curDate - oldDate > 90000)) {
				oldDate = curDate;
				$scope.getData();
			}
		});
		
		$scope.getData = function() {

			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4 && xhr.status == 200) {
					console.log(JSON.parse(xhr.responseText).notifications);
					notifications = JSON.parse(xhr.responseText).notifications;
					for(var i = 0; i < notifications.length; i++) {
						//notifications[i].queued_at = notifications[i].queued_at * 1000;
						var date = new Date(notifications[i].queued_at * 1000); //convert to milliseconds
						notifications[i].queued_at = (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
					}
					$scope.data = notifications;
					$scope.$digest();
				}
			};
			xhr.open("GET", "https://onesignal.com/api/v1/notifications?app_id=16522ff3-d3af-41df-a465-e0963d92a469&limit=3", true);
			xhr.setRequestHeader("Authorization", "Basic ZDk5MGU5NWUtMzk2Ny00NmQ5LTlkZDAtOGNmZmQ4ZGY3MWVj");
			xhr.send();
		}

		$scope.doRefresh = function() {
			$scope.getData();
			// Stop the ion-refresher from spinning
			$scope.$broadcast('scroll.refreshComplete');
		}
	})

	.controller('PriestsCtrl', function($scope) {
		$scope.priests = [{
			avatar: 'img/home/logo.png',
			title: 'Sri Badrinath Shastri',
			text1: 'Sri Shastriji hails from a family of revered priests from Kathmandu, Nepal. He is the third generation priest in his family. Shastriji received his MA (Acharya) degree in Hindu Philosophy from Banaras Hindu University and is well versed in Ashtadasa (18) puranas, and also possesses competent awareness of all four Vedas. Sri Shastriji joined HTCI in 2013 after serving as a priest for 28 years at various Temples in India and Nepal that include Kurmanarayan Temple in Ayodhya (10 years), Radhakrishna Temple in Brindavan (3 years), and Sri Venkateshwara Temple in Kathmandu (13 years).',
			text2: 'Sri Shastriji is highly proficient in Nepali, Sanskrit, Hindi, and English and is an expert in all shodasa (16) samskaras, all types of Abhishekams for all deities, all types of poojas (including Satyanarayana Pooja, Grihapravesam, and Navagraha Pooja), diverse types of Homams (including Sudarsana, Navagraga, Ganapathi, and Chandi Homams), as well as Kumbhabhishekam, Annapraasana, Namakaranam, and Shashtipoorthi ceremonies. He has extensive as well as deep knowledge of all types of Karma kandas and rituals. Sri Shastriji is also an acclaimed expert in the chanting of all stothrams, suktams and in giving discourses on Puranas, Bhagavatham, Mahabharat and Ramayan.'
		},{
			avatar: 'img/home/logo.png',
			title: 'Sri Kirthivasan',
			text1: 'Sri Keethi Vasanji was initiated into Vedic Studies at the Deekshitar Gurukulam Virudhasram Trust, Kumbakonam in Tamil Nadu, India. He continued his studies in Veda and Prayoga Shastra at Sri Bharati Theertha Prayoga Pathashala (certified by Sringeri Mutt) in Salem under the expert tutelage of Brahmasri Venkataraju Sastrigal. He worked as a priest at the Raja Rajeswari Temple in Salem for four years and then at the Shiva Temple in Rajasthan and at the Om Shakti Temple in Bengaluru. He is familiar with all forms of Archana, Abhishekam and Homams (such as Chandi Homam, Durga Lakshmi and Saraswathy Homam, Dhanwanthri Homam) as well as the performance of Gruha Pooja such as Namakaranam, Upanayanam, Vivaham and many others. He is also familiar with Aparakriyas of all types (Death related) and Pithru Karya. He speaks fluent Tamil and Telugu and has good communication skills in Hindi and English. He previously served as the priest at the Parasakthi Temple in Michigan. Sri Vasanji is the newest priest to join HTCI after commencing his services on June 2, 2015.'
		},{
			avatar: 'img/home/logo.png',
			title: 'Sri Ramaswami Bhattar',
			text1: 'Sri Bhattarji comes from a long lineage of accomplished priests and is the 7th generation priest from Sugganahalli in Karnataka state, India. He is a graduate from Mysore Maharaja Sanskrit College, Mysore, and a recipient of Paancharathraagama Praveena in 1983. Sri Bhattarji has more than forty years working experience as a priest and has the distinction of working at diverse and popular temples in India and USA – in the state of Karnataka he worked for 26 years at Sri Lakshminarasimhaswamy Temple (Sugganahalli), Fort Prasanna Venteshwara Temple (Bangalore), Sri Lakshmi Venkateshwara Temple (Koramangala, Bangalore), and Nimishambha Temple (Bangalore). He has been working in USA since 1998 at various Temples in Kentucky, Florida, Ohio, and Alabama. He joined HTCI on November 1, 2013.',
			text2: 'Sri Bhattarji is an expert in shodasa karmas, all types of Poojas (Satyanarayana vratam, Grihapravesam etc.), Homams (Ganapathi, Lakshmi, Lakshminarayana etc.), abhishekams (including Sahasrakalasabhishekam and Kumbhabhishekam), and utsavams (Rathotsavam, Deepotsavam, Pavitrotsavam etc.). He is an expert and degree holder in Paancharathraagama Paadmasamhita (one of the 108 samhitas associated with temple Poojas). Sri Bhattaji has demonstrated working knowledge of the Vedas and puranas. He is a polyglot and is conversant in Sanskrit, English, Kannada, Tamil, Telugu and Hindi. His knowledge of Sanskrit language and literature comes across in his pure diction and rendition of the various shlokas and rituals. Bhattarji has a wonderful voice that makes his Vedic chants and Shloka renditions a treat to listen to.'
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
					"html": "Full Name: "+ fullname +"<br>Address: "+ address +"<br>City: "+ city +"<br>State: "+ state +"<br>Zip: "+ zip +"<br>Phone: "+ phone +"<br>Name of Pooja: "+ pooja +"<br>Date of Pooja: "+ date +"<br>Time of Pooja: "+ slot.time +"<br>Location of Pooja: "+ location.location +"<br>Priest Transportation: "+ transportation.method +"<br>Member of HTCI: "+ member.option +"<br>Notes: "+ note,
			 		"text": "Example text content",
			 		"subject": "Request for Service",
			 		"from_email": emailaddress,
			 		"from_name": fullname,
			 		"to": [
			 			{
							"email": "tqm397@gmail.com",
							"name": "HTCI Seva",
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
					$state.go('app.confirmation')
					console.log('successful email send.');
					console.log('status: ' + status);
				}).error(function(data, status, headers, config) {
					//alert("Please check form");
					console.log(data, headers, config);
					console.log('status: ' + status);
				});
		};
	})

	.controller('PhotosCtrl', function($scope, $ionicLoading, $state, Flickr, $cordovaNetwork){
		var oldDate = 0;
		var curDate;

		$scope.$on("$ionicView.afterEnter", function() {
			var offline;
			curDate = (new Date()).valueOf();

			if(navigator.connection) {
				offline = $cordovaNetwork.isOffline();
			}
			else {
				offline = false;
			}
			if(!offline && (curDate - oldDate > 90000)) {
				oldDate = curDate;

				$ionicLoading.show();
				//testing firebase
				//$scope.key = Key;
				//console.log($scope.key.$id);

				// Getting Photosets Detail from Flickr Service
				Flickr.getPhotoSets().then(function(result){
					console.log(result.data.photosets);
					$scope.photoList = result.data.photosets.photoset;
					$scope.photoList.reverse();
					$ionicLoading.hide();
				});
			}
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

function getActualMonth(month) {
    switch(month) {
    case 0:
	return "January";
    case 1:
	return "February";
    case 2:
	return "March";
    case 3:
	return "April";
    case 4:
	return "May";
    case 5:
	return "June";
    case 6:
	return "July";
    case 7:
	return "August";
    case 8:
	return "September";
    case 9:
	return "October";
    case 10:
	return "November";
    case 11:
	return "December";
    }
}
