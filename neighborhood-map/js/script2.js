// var app = app || {};
// (function () {
//   app.model = function(){
//   }
// })();

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
    name: "Home",
    logo: "logo.jpg",
    type: "type",
    lat: 38.917635,
    long: -77.222228,
    address: "someaddress",
    category: "somecategory",
    website: "somewebsite",
    phone: "somephone",
    timings: "timings"
}];

var map;

var Place = function(data) {
    var self = this;
    var iconBase = "http://maps.google.com/mapfiles/kml/paddle/pink-blank.png";
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

    this.marker = new google.maps.Marker({
        map:map,
        position: new google.maps.Marker(this.lat(),this.long()),
        title : this.name(),
        animation: google.maps.Animation.DROP
    });

    this.infowindow = new google.maps.InfoWindow({
        content: ""
    });

    this.marker.addListener("click",function(){
        self.marker.setAnimation(google.maps.Animation.BOUNCE);
        self.marker.icon = "http://maps.google.com/mapfiles/kml/paddle/blu-blank.png";
        setTimeout(function(){
            self.marker.setAnimation(null);
            self.marker.icon = iconBase;
        },1000);

        self.contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
            '<div id="bodyContent">' +
            '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
            'sandstone rock formation in the southern part of the ' +
            'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
            'south west of the nearest large town, Alice Springs; 450&#160;km ' +
            '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
            'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
            'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
            'Aboriginal people of the area. It has many springs, waterholes, ' +
            'rock caves and ancient paintings. Uluru is listed as a World ' +
            'Heritage Site.</p>' +
            '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
            'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
            '(last visited June 22, 2009).</p>' +
            '</div>' +
            '</div>';

       self.infowindow.setContent(self.contentString);
       self.infowindow.open(map,this);     
    });


};


var ViewModel = function() {

    var self = this;
    this.placeList = ko.observableArray([]);
    this.currentPlace = ko.observable(this.placeList[0]);
    this.searchPlace = ko.observable('');

    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 38.903363,
            lng: -77.210486
        },
        zoom: 12,
    });

    placeStore.forEach(function(placeItem) {
        self.placeList.push(new Place(placeItem));
    });

    this.filteredPlaces = ko.computed(function(){
      var searchTerm = self.searchPlace().toLowerCase();
      console.log(searchTerm);
      if(!searchTerm){
        self.placeList().forEach(function(place){
          place.visible(true);
          park.marker.setMap(map);
        });
        return self.placeList();
      }else{
        return ko.utils.arrayFilter(self.parkList(),function(place){
          var checkedItem = place.name().toLowerCase().search(searchTerm) != -1;
          place.visible(checkedItem);
          if(checkedItem == false){
            place.marker.setMap(null);
          }
          return checkedItem;
        });
      }
    },self);
};

function loadApp() {
    ko.applyBindings(new ViewModel());

}
