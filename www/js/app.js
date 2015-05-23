// angular.module is a global place for creating, registering and retrieving Angular modules
var htci = angular.module('app', ['ionic', 'app.controllers', 'ngSanitize'])

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
	});
})

htci.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider

		.state('app', {
			url: "/app",
			abstract: true,
			templateUrl: "templates/app-menu.html",
			controller: 'AppCtrl'
		})

		.state('kumbhabhishekam', {
			url: "/kumbhabhishekam",
			abstract: true,
			templateUrl: "templates/kumbhabhishekam-menu.html"
		})

		.state('kumbhabhishekam.index', {
			url: "/index",
			views: {
				'menuContent': {
					templateUrl: "templates/donation.html"
				}
			}
		})

		.state('kumbhabhishekam.events', {
            url: "/events",
            views: {
				'menuContent': {
					templateUrl: "templates/events.html",
					controller: 'EventsCtrl'
				}
            }
        })

        .state('kumbhabhishekam.single', {
			url: "/events/:eventId",
			views: {
				'menuContent': {
					templateUrl: "templates/event.html",
					controller: 'EventCtrl'
				}
			}
        })

        .state('kumbhabhishekam.parking', {
			url: "/parking",
			views: {
				'menuContent': {
					templateUrl: "templates/parking.html"
				}
			}
        })

		.state('app.index', {
			url: "/index",
			views: {
				'menuContent': {
					templateUrl: "templates/index.html",
					controller: "IndexCtrl"
				}
			}
		})

		.state('app.info', {
			url: "/info",
			views: {
				'menuContent': {
					templateUrl: "templates/info.html"
				}
			}
		})

		.state('app.calendar', {
			url: "/calendar",
			views: {
				'menuContent': {
					templateUrl: "templates/calendar.html",
					controller: "CalendarCtrl"
				}
			}
		})

		.state('app.social-media', {
			url: "/social-media",
			views: {
				'menuContent': {
					templateUrl: "templates/social-media.html",
					controller: "FacebookCtrl"
				}
			}
		})

		.state('app.sponsorship', {
			url: "/sponsorship",
			views: {
				'menuContent': {
					templateUrl: "templates/sponsorship.html",
					controller: "SponsorshipCtrl"
				}
			}
		})

		.state('app.donation', {
			url: "/donation",
			views: {
				'menuContent': {
					templateUrl: "templates/donation.html"
				}
			}
		})

		.state('app.volunteer', {
			url: "/volunteer",
			views: {
				'menuContent': {
					templateUrl: "templates/volunteer.html",
					controller: "VolunteerCtrl"
				}
			}
		})

		.state('app.qr', {
			url: "/qr",
			views: {
				'menuContent': {
					templateUrl: "templates/qr.html",
					controller: "QRCtrl"
				}
			}
		})

		.state('app.contact', {
			url: "/contact",
			views: {
				'menuContent': {
					templateUrl: "templates/contact.html",
					controller: "ContactCtrl"
				}
			}
		})

		.state('app.balagokulam', {
			url: "/balagokulam",
			views: {
				'menuContent': {
					templateUrl: "templates/balagokulam.html"
				}
			}
		})

		.state('app.browse', {
			url: "/browse",
			views: {
				'menuContent': {
					templateUrl: "http://htci.org"
				}
			}
		})


		.state('app.other', {
			url: "/other",
			views: {
				'other-tab': {
					templateUrl: "templates/donation.html"
				}
			}
		})

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/app/index');
});
