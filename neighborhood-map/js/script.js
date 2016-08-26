// var app = app || {};
// (function () {
//   app.model = function(){
//   }
// })();


var map;

var placeStore = [{
    name: "Tysons Corner Center",
    logo: "logo.jpg",
    type: "type",
    lat: "38.917635",
    long: "-77.222228",
    address: "someaddress",
    category: "somecategory",
    website: "somewebsite",
    phone: "somephone",
    timings: "timings"
}, {
    name: "Tysons Corner Center",
    logo: "logo.jpg",
    type: "type",
    lat: "38.917635",
    long: "-77.222228",
    address: "someaddress",
    category: "somecategory",
    website: "somewebsite",
    phone: "somephone",
    timings: "timings"
}];


var ViewModel = function() {

    var self = this;
    this.placeList = ko.observableArray();
    this.currentPlace = ko.observable(this.placeList[0]);

    placeStore.forEach(function(placeItem) {
        self.placeList.push(placeItem);
    });

    this.drawMap = function(clickedPlace) {
        console.log(clickedPlace);
    }

    map = new google.maps.Map(document.getElementById('map'),{
      center: {
        lat: 38.903363,
        lng: -77.210486
      },
      zoom : 12,
    });
}

function loadApp() {
    ko.applyBindings(new ViewModel());
}
