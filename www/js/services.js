angular.module('flickrApp.services', [])
	.value('Flickr_data',{
		key: '5354a2ab2c8fc9202dcf5a30276cfbad',
		endpoint: 'https://api.flickr.com/services/rest/',
		user_id : '71032065@N03'
	})

	.factory('Key', function($firebaseObject){
		var key = new Firebase('https://htci-app.firebaseio.com/key');
		return $firebaseObject(key);
	})

	.factory('Flickr', function($http,$q,Flickr_data){
		var result = {};

		// Getting List of Photoset in a user account.
		result.getPhotoSets = function() {
			var url = Flickr_data.endpoint +
				'?method=flickr.photosets.getList&api_key=' + Flickr_data.key +
				'&user_id=' + Flickr_data.user_id +
				'&format=json&nojsoncallback=1';

			console.log(url);
			return $http.get(url);
		};


		// Getting Photos of a photo set
		result.getPhotos = function(photoset_id) {
			var defer = $q.defer();

			var url = Flickr_data.endpoint +
				'?method=flickr.photosets.getPhotos&api_key=' + Flickr_data.key +
				'&user_id=' + Flickr_data.user_id +
				'&photoset_id=' + photoset_id +
				'&format=json&nojsoncallback=1';
			console.log(url);

			// Getting the Photos from a photoset
			return $http.get(url)
		};

		result.getInfo = function(id, secret) {
			sizes =  Flickr_data.endpoint +
				'?method=flickr.photos.getSizes&api_key=' + Flickr_data.key +
				'&photo_id=' + id + '&format=json&nojsoncallback=1';

			info = Flickr_data.endpoint +
				'?method=flickr.photos.getInfo&api_key=' + Flickr_data.key +
				'&photo_id=' + id + '&secret=' + secret +
				'&format=json&nojsoncallback=1';
			return $q.all([
				$http.get(sizes),
				$http.get(info)
			]);
		};

		return result;
	})

	.factory('MyFb', function($http,$q){
		var result = {};

		var profile_id = '244766008966857';
		var client_id = '298765316912627';
		var client_secret = 'fcced3361a518f106eab22312a55b995';


		return {
			getAccessToken: function() {
				var url = 'https://graph.facebook.com/oauth/access_token?grant_type=client_credentials&client_id='+ client_id +'&client_secret='+ client_secret;
				//console.log($http.get(url));
				return $http.get(url);
			},
			getPage: function(url) {
				//console.log(access_token);
				// var url = 'https://graph.facebook.com/Boo/posts?access_token='+access_token;
				console.log(url);
				return $http.get(url);
			},
			getFeed: function(url) {
				//console.log(access_token);
				// var url = 'https://graph.facebook.com/Boo/posts?access_token='+access_token;
				console.log(url);
				return $http.get(url);
			}
		}
	})

	.factory('Poojas', function(){
		var times = [
            {
                id: 0,
                time: "Based On Availability"
            },
            {
                id: 1,
                time: "Morning"
            },
            {
                id: 2,
                time: "Afternoon"
            },
            {
                id: 3,
                time: "Evening"
            }
        ];

		var locations = [
			{
				id: 0,
				location: "Temple"
			},
			{
				id: 1,
				location: "Home"
			},
			{
				id: 2,
				location: "Other (Put in Notes)"
			}
		];

		var transportationOptions = [
			{
				id: 0,
				method: "We Will Transport Priest"
			},
			{
				id: 1,
				method: "Priest Needs to Drive"
			}
		];

		var memberOptions = [
			{
				id: 0,
				option: "No"
			},
			{
				id: 1,
				option: "Yes"
			}
		];

		return {
            allSlot: function(){
                return times;
            },
            getSlot: function(id){
				return times[id];
            },
            allLocations: function(){
                return locations;
            },
            allTransportationOptions: function(){
                return transportationOptions;
            },
            allMemberOptions: function(){
                return memberOptions;
            }
		}
	});
