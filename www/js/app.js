// angular.module is a global place for creating, registering and retrieving Angular modules
var htci = angular.module('app', ['ionic','ionic.service.core', 'app.controllers', 'ngCordova','ngSanitize','flickrApp.services','firebase'])

htci.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleLightContent();
			//StatusBar.styleDefault();
		}
	    // Enable to debug issues.
	    // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
	    
	    var notificationOpenedCallback = function(jsonData) {
		//console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
		navigator.notification.alert("didReceiveRemoteNotificationCallBack: " + JSON.stringify(jsonData), function(){}, "Alert");
	    };
	    
	    window.plugins.OneSignal.init("c6708fa0-97d0-4ca3-91b3-70cf7c4a0b16",
					  {googleProjectNumber: "868132298708"},
					  notificationOpenedCallback);
	    
	    // Show an alert box if a notification comes in when the user is in your app.
	    window.plugins.OneSignal.enableInAppAlertNotification(true);
		/*Ionic.io();
		var push = new Ionic.Push({
			"debug": true,
			"onNotification": function(notification) {
				var payload = notification.payload;
				console.log(notification, payload);
				//alert(JSON.stringify(notification));
				navigator.notification.alert(notification.text, function(){}, "Alert");
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
		//console.log(navigator.notification);
		*/
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

		.state('app.index', {
			url: "/",
			views: {
				'menuContent': {
					templateUrl: "templates/main/index.html",
					controller: "IndexCtrl"
				}
			}
		})

		.state('app.updates', {
			url: "/updates",
			views: {
				'menuContent': {
					templateUrl: "templates/main/updates.html",
					controller: 'UpdatesCtrl'
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

		.state('app.facebook', {
			url: "/facebook",
			views: {
				'menuContent': {
					templateUrl: "templates/main/facebook.html",
					controller: "FacebookCtrl"
				}
			}
		})

		.state('app.photos', {
			url: "/photos",
			views: {
				'menuContent': {
					templateUrl: "templates/main/photos.html",
					controller: "PhotosCtrl"
				}
			}
		})

		.state('app.album', {
            url: "/album/:id",
            views: {
                'menuContent': {
					templateUrl: "templates/main/album.html",
					controller: 'AlbumCtrl'
                }
            }
		})

		.state('app.eventbooking', {
			url: "/eventbooking",
			views: {
				'menuContent': {
					templateUrl: "templates/main/eventbooking.html",
					controller: "EventBookingCtrl"
				}
			}
		})

		.state('app.confirmation', {
			url: "/confirmation",
			views: {
				'menuContent': {
					templateUrl: "templates/main/confirmation.html"
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

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/app/');
});
