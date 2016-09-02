var placeStore = [{
    name: "Tysons Corner Center",
    logo: "logo.jpg",
    type: "type",
    lat: 38.917635,
    long: -77.222228,
    address: "someaddress",
    category: "somecategory",
    website: "somewebsite",
    phone: "somephone",
    timings: "timings"
}, {
    name: "Esri",
    logo: "logo.jpg",
    type: "type",
    lat: 38.928147,
    long: -77.247522,
    address: "someaddress",
    category: "somecategory",
    website: "somewebsite",
    phone: "somephone",
    timings: "timings"
}];

var Place = function(data) {
    var self = this;
    this.name = ko.observable(data.name);
    this.logo = ko.observable(data.logo);
    this.type = ko.observable(data.type);
    this.lat = ko.observable(data.lat);
    this.long = ko.observable(data.long);
    this.address = ko.observable(data.address);
    this.category = ko.observable(data.category);
    this.website = ko.observable(data.website);
    this.phone = ko.observable(data.phone);
    this.timings = ko.observable(data.timings);
    this.visible = ko.observable(true);

};

//flickr key - f144ec1cd6793bc2ae9b3db88bac0de3
//secret - 075f9ebd9994765f


var ViewModel = function() {

        var self = this;
        this.placeList = ko.observableArray([]);
        this.currentPlace = ko.observable(this.placeList[0]);
        this.searchPlace = ko.observable('');

        placeStore.forEach(function(placeItem) {
            self.placeList.push(new Place(placeItem));
        });


        // this.filteredPlaces = ko.computed(function(){
        //   var searchTerm = self.searchPlace().toLowerCase();
        //   console.log(searchTerm);
        //   if(!searchTerm){
        //     self.placeList().forEach(function(place){
        //       place.visible(true);
        //       place.marker.setMap(map);
        //     });
        //     return self.placeList();
        //   }
        // })

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: new google.maps.LatLng(38.903363, -77.210486),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        var infowindow = new google.maps.InfoWindow();

        var marker, i;

        _.each(placeStore, function(place) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(place.lat, place.long),
                map: map
            });
            google.maps.event.addListener(marker, 'click', (function(marker, place) {
                return function() {
                    infowindow.setContent(place.name);
                    infowindow.open(map, marker);
                }
            })(marker, place));
        });


        this.drawMap = function(clickedPlace) {
            var contentString = "";
            var latLng = {
                lat: clickedPlace.lat(),
                lng: clickedPlace.long()
            };

            var title = clickedPlace.name();
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: latLng
            });

            marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: title,
                draggable: true,
                animation: google.maps.Animation.DROP,
            });

            marker.addListener('click', function() {

                var wikiOptions = {
                    action: "query",
                    titles: marker.title,
                    prop: "extracts",
                    format: "json",
                    origin: "*",
                    exintro: "",
                    explainText: ""
                };
                var url = "https://en.wikipedia.org/w/api.php";
                var first = true;
                for (item in wikiOptions) {
                    if (wikiOptions.hasOwnProperty(item)) {
                        url += (first ? "?" : "&") + item + "=" + wikiOptions[item];
                        first = false;
                    }
                }

                function getWikiArticle() {
                    console.log("here");
                }


                $.ajax({
                    url: url,
                    async: false
                }).done(function(response) {
                    _.each(response.query.pages, function(obj) {
                        contentString = obj.extract;
                        contentString += '<a data-id="' + obj.title + ' "id= "getWiki" class="waves-effect waves-light btn">Get full article from wikipedia</a>';
                    });
                });


                var infowindow = new google.maps.InfoWindow({
                    content: contentString
                });

                google.maps.event.addListener(infowindow, 'domready', function() {
                    $('#getWiki').click(function(e) {
                        console.log("clicked");
                        console.log(e);
                    });
                });

                infowindow.open(map, marker);



            });

            function toggleBounce() {
                if (marker.getAnimation() !== null) {
                    marker.setAnimation(null);
                } else {
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                }
            }
        };
    } //this.drawMap()


function loadApp() {
    ko.applyBindings(new ViewModel());
}


var options = {
    "api_key": "f144ec1cd6793bc2ae9b3db88bac0de3",
    "method": "flickr.photos.search", // You can replace this with whatever method,
    // flickr.photos.search fits your use case best, though.
    "format": "json",
    "nojsoncallback": "1",
    "text": "new york" // This is where you'll put your "file name"
}

var makeFlickrRequest = function(options, cb) {
    var url, xhr, item, first;

    url = "https://api.flickr.com/services/rest/";
    first = true;

    for (item in options) {
        if (options.hasOwnProperty(item)) {
            url += (first ? "?" : "&") + item + "=" + options[item];
            first = false;
        }
    }

    xhr = new XMLHttpRequest();
    xhr.onload = function() { cb(this.response); };
    xhr.open('get', url, true);
    xhr.send();

};

// makeFlickrRequest(options, function(data) { console.log(data); }); 


$('.button-collapse').sideNav({
    menuWidth: 300, // Default is 240
    edge: 'right', // Choose the horizontal origin
    closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
});
