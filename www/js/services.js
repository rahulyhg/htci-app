angular.module('flickrApp.services', [])
.value('Flickr_data',{
  key: '5354a2ab2c8fc9202dcf5a30276cfbad',
  endpoint: 'https://api.flickr.com/services/rest/',
  user_id : '71032065@N03'
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

.factory('memService',function(){


var members =[
                {
                   "id":1,
                   "memberType": "Executive",
                   "name":"Mr. Ambat Babu",
                   "post":"President",
                   "email":"htcibabu@yahoo.com"

                },
                {
                   "id":2,
                   "memberType": "Executive",
                   "name":"Mr. Jagannath Pandey",
                   "post":"Pesident-Elect/Vice President",
                   "email":"jaypandey50@hotmail.com"
                },
                {
                   "id":3,
                   "memberType": "Executive",
                   "name":"Mr. Sathyaraj Chawan",
                   "post":"Secretary",
                   "email":"chawan@sbcglobal.net"
                },
                {
                   "id":4,
                   "memberType": "Executive",
                   "name":"Mr. Ravi Dinakaran",
                   "post":"Treasurer",
                   "email":"ravi_chand@yahoo.com"
                },
                {
                   "id":5,
                   "memberType": "Executive",
                   "name":"Mrs. Kusum Patel",
                   "post":"Joint Treasurer/Secretary",
                   "email":"vimalandkusum@yahoo.com"
                },
                {
                   "id":6,
                   "memberType": "Executive",
                   "name":"Mr. Rajendra Kedlaya",
                   "post":"Function Coordination Committee",
                   "email":"rked14@yahoo.com"
                },
                {
                   "id":7,
                   "memberType": "Executive",
                   "name":"Mr. Krishnakumar Padmanabhan",
                   "post":"Pooja Coordination Committee",
                   "email":"mailkpk@yahoo.com"
                },
                {
                   "id":8,
                   "memberType": "Executive",
                   "name":"Mrs. Tripti Vyas",
                   "post":"Membership Committee",
                   "email":"triptidv@yahoo.com"
                },
                {
                   "id":9,
                   "memberType": "Executive",
                   "name":"Mr. Raveendran Dudhlur",
                   "post":"Maintenance Committee",
                   "email":"raveendrand@gmail.com"
                },
                {
                   "id":10,
                   "memberType": "Executive",
                   "name":"Mr. Nabin Pudasaini",
                   "post":"Library Committee",
                   "email":"nabin.pudasaini@yahoo.com"
                },
                {
                   "id":11,
                   "memberType": "Executive",
                   "name":"Mr. Priyesh Kheradia",
                   "post":"Youth Activity Coordinator",
                   "email":"pkheradia@yahoo.com"
                },
                {
                   "id":12,
                   "memberType": "Executive",
                   "name":"Mrs. Shanti Pathak",
                   "post":"Kitchen Committee",
                   "email":"pathakgee@sbcglobal.net"
                },
                {
                   "id":13,
                   "memberType": "Executive",
                   "name":"Mr. Vijay Narayanan",
                   "post":"Communication Committee",
                   "email":"vnarayanan99@gmail.com"
                },
                {
                   "id":14,
                   "memberType": "Executive",
                   "name":"Mr. Aryaman Gupta",
                   "post":"Youth Committee",
                   "email":"arygupta123@gmail.com or"
                },
                {
                   "id":15,
                   "memberType": "Executive",
                   "name":"Miss. Kamna Gupta",
                   "post":"Youth Committee",
                   "email":"kamnagupta3@gmail.com"
                },
                {
                   "id":16,
                   "memberType": "Executive",
                   "name":"Mrs. Suneela Ramaswamy",
                   "post":"Geeta Mandal Contact",
                   "email":"suneelaramaswamy@gmail.com"
                },
                {
                   "id":17,
                   "memberType": "Board",
                   "name":"Mr. Vijayapal Reddy",
                   "post":"Chairman",
                   "email":"vijayapalr@gmail.com "
                },
                {
                   "id":18,
                   "memberType": "Board",
                   "name":"Mr. Arun Jain",
                   "post":"Vice-Chairman",
                   "email":"ajmd02@gmail.com"
                },
                {
                   "id":19,
                   "memberType": "Board",
                   "name":"Mr. Ramarao Yeleti",
                   "post":"Secretary",
                   "email":"ryeleti@aol.com"
                },
                {
                   "id":20,
                   "memberType": "Board",
                   "name":"Mr. Venkat Rao",
                   "post":"Treasurer",
                   "email":"sai55@aol.com"
                },
                {
                   "id":21,
                   "memberType": "Board",
                   "name":"Mr. Ravi Pattar",
                   "post":"Joint Treasurer",
                   "email":"pattarcpa@aol.com"
                },
                {
                   "id":22,
                   "memberType": "Board",
                   "name":"Mr. Rama Belagaje",
                   "post":"Kumbhabhshekam Committee",
                   "email":"rama_belagaje@yahoo.com "
                },
                {
                   "id":23,
                   "memberType": "Board",
                   "name":"Mr. Prabhakar Kasarabada",
                   "post":"Facilities",
                   "email":"prabhakark94@hotmail.com"
                },
                {
                   "id":24,
                   "memberType": "Board",
                   "name":"Mr. Kannan Natarajan",
                   "post":"Long Range Planning",
                   "email":"knatarajan@indy.rr.com"
                },
                {
                   "id":25,
                   "memberType": "Board",
                   "name":"Mr. Ram Bhargava",
                   "post":"Education & Communication",
                   "email":"rammadhu@aol.com"
                },
                {
                   "id":26,
                   "memberType": "Board",
                   "name":"Mr. Subash Khanna",
                   "post":"Community & Public Relations",
                   "email":"subashkhanna@sbcglobal.net"
                },
                {
                   "id":27,
                   "memberType": "Board",
                   "name":"Mr. M.R. Ivaturi",
                   "post":"Social & Charitable Activities",
                   "email":"ivaturi1@gmail.com"
                },
                {
                   "id":28,
                   "memberType": "Board",
                   "name":"Mr. Anil Bajpai",
                   "post":"Fund Raising",
                   "email":"bajpaia@yahoo.com"
                },
                {
                   "id":29,
                   "memberType": "Board",
                   "name":"Mr. Mani Subramaniam",
                   "post":"Human Resources",
                   "email":"mani_subramaniam@yahoo.com"
                },
                {
                   "id":30,
                   "memberType": "Board",
                   "name":"Mr. Sathya Thulasiraman",
                   "post":"Project Manager, Construction",
                   "email":"stindpls@yahoo.com"
                },
                {
                   "id":31,
                   "memberType": "Board",
                   "name":"Sgt. Javed Khan",
                   "post":"Safety & Security Coordinator",
                   "email":"tkdindia@hotmail.com"
                }


];

return {
    all: function() {
      return members;
    },

    get: function(id) {
        return members[id]
      }
  }
})

.factory('MyFb', function($http,$q){
    var result = {};

    var profile_id = '244766008966857';
    var client_id = '298765316912627';
    var client_secret = 'fcced3361a518f106eab22312a55b995';


    return {
        getAccessToken: function() {
          var url = 'https://graph.facebook.com/oauth/access_token?grant_type=client_credentials&client_id='+ client_id +'&client_secret='+ client_secret;
          return $http.get(url);
        },

        getFeed: function(url) {
            // console.log(access_token);
            // var url = 'https://graph.facebook.com/Boo/posts?access_token='+access_token;
                           console.log(url);
                            return $http.get(url);
          }
      }





})

.factory('Poojas', function(){
var poojaType = [
                    {
                       id: 0,
                       name: "Choose Pooja",
                       fee: 0
                     },
                    {
                        id: 1,
                        name: "Ayappa Pooja",
                        fee: 51

                    },
                    {
                         id: 2,
                         name: "Durga Archna",
                         fee: 101

                    }
                ];
     var priests = [
                    {
                     id: 0,
                     name:"Any one"
                    },
                    {
                     id: 1,
                     name:"Sri Badrinath Shastri"
                    },
                    {
                     id: 2,
                     name:"Sri Rama Bhattar",
                    },
                    {
                     id: 3,
                     name:"Sri Kirthivasan",
                    }
                  ];

     var times =[
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
                        time: "Noon"
                     },
                     {
                        id: 3,
                        time: "Evening"
                     }
                   ];


     return {
             all: function() {
                   return poojaType;
             },
             get: function(id) {
                  return poojaType[id];
             },
             allPriests: function(){
                return priests;
             },
             getPriest: function(id){
             return priests[id];
             },
             allSlot: function(){
                return times;
             },
             getSlot: function(id){
             return times[id];
             },
     }
});