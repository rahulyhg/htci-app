// angular.module is a global place for creating, registering and retrieving Angular modules
var htci = angular.module('app', ['ionic','ionic.service.core', 'app.controllers', 'ngCordova','ngSanitize'])

htci.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}

		Ionic.io();
		var push = new Ionic.Push({
			"debug": true,
			"onNotification": function(notification) {
				var payload = notification.payload;
				console.log(notification, payload);
				//alert(JSON.stringify(notification));
				alert(notification.text);
			},
			"onRegister": function(data) {
				console.log(data.token);
			},
			"pluginConfig": {
				"android": {
					"iconColor": "#FFFFFF"
				}
			}
		});
		var user = Ionic.User.current();

		if (!user.id) {
			user.id = Ionic.User.anonymousId();
		}

		user.save();
		//console.log("ldaosd");

		var callback = function(data) {
			//console.log("dloae");
			console.log(data.token);
			//push.addTokenToUser(user);
			user.addPushToken(data);
			//console.log("dloae");
			user.save();
		};
		push.register(callback);
		//console.log("dasdaw");
	});
})

htci.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider

		.state('app', {
			url: "/app",
			abstract: true,
			templateUrl: "templates/main/menu.html",
			controller: 'AppCtrl'
		})

		.state('updates', {
			url: "/updates",
			//cache: false,
			abstract: true,
			templateUrl: "templates/updates/menu.html",
			controller: 'UpdatesCtrl'
		})

		.state('app.index', {
			url: "/",
			views: {
				'menuContent': {
					templateUrl: "templates/main/index.html",
					controller: "IndexCtrl"
				}
			}
		})

		.state('app.hours', {
			url: "/hours",
			views: {
				'menuContent': {
					templateUrl: "templates/main/hours.html"
				}
			}
		})

		.state('app.about', {
			url: "/about",
			views: {
				'menuContent': {
					templateUrl: "templates/main/about.html"
				}
			}
		})

		.state('app.calendar', {
			url: "/calendar",
			views: {
				'menuContent': {
					templateUrl: "templates/main/calendar.html",
					controller: "CalendarCtrl"
				}
			}
		})

		.state('app.social-media', {
			url: "/social-media",
			views: {
				'menuContent': {
					templateUrl: "templates/main/social-media.html",
					controller: "FacebookCtrl"
				}
			}
		})

		.state('app.sponsorship', {
			url: "/sponsorship",
			views: {
				'menuContent': {
					templateUrl: "templates/main/sponsorship.html",
					controller: "SponsorshipCtrl"
				}
			}
		})

		.state('app.volunteer', {
			url: "/volunteer",
			views: {
				'menuContent': {
					templateUrl: "templates/main/volunteer.html",
					controller: "VolunteerCtrl"
				}
			}
		})

		.state('app.qr', {
			url: "/qr",
			views: {
				'menuContent': {
					templateUrl: "templates/main/qr.html",
					controller: "QRCtrl"
				}
			}
		})

		.state('app.contact', {
			url: "/contact",
			views: {
				'menuContent': {
					templateUrl: "templates/main/contact.html",
					controller: "ContactCtrl"
				}
			}
		})

		.state('app.balagokulam', {
			url: "/balagokulam",
			views: {
				'menuContent': {
					templateUrl: "templates/main/balagokulam.html"
				}
			}
		})

		.state('app.priests', {
			url: "/priests",
			views: {
				'menuContent': {
					templateUrl: "templates/main/priests.html",
					controller: "PriestsCtrl"
				}
			}
		})

		.state('updates.index', {
			url: "/",
			views: {
				'menuContent': {
					templateUrl: "templates/updates/index.html"
				}
			}
		})

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/app/');
});
