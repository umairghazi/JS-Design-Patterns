var catStore = [{
    clickCount: 0,
    name: 'Tabby',
    imgSrc: 'img/22252709_010df3379e_z.jpg',
    nicknames: ['Tabtab', 'T-bone', 'Mr.T', 'Tabby Cat']
}, {
    clickCount: 0,
    name: 'Tiger',
    imgSrc: 'img/434164568_fea0ad4013_z.jpg',
    nicknames: ['Tigger']
}, {
    clickCount: 0,
    name: 'Scaredy',
    imgSrc: 'img/1413379559_412a540d29_z.jpg',
    nicknames: ['Casper']
}, {
    clickCount: 0,
    name: 'Shadow',
    imgSrc: 'img/4154543904_6e2428c421_z.jpg',
    nicknames: ['Shooby']
}, {
    clickCount: 0,
    name: 'Sleepy',
    imgSrc: 'img/9648464288_2516b35537_z.jpg',
    nicknames: ['Zzzzzz']
}, ];



var Cat = function(data) {
    this.clickCount = ko.observable(data.clickCount);
    this.name = ko.observable(data.name);
    this.imgSrc = ko.observable(data.imgSrc);
    this.nicknames = ko.observableArray(data.nicknames);

    this.level = ko.computed(function() {
        var x = this.clickCount();
        var title;
        if (x <= 5) {
            title = "newborn";
        } else if (x <= 10) {
            title = "infant";
        } else if (x <= 15) {
            title = "child";
        } else if (x <= 20) {
            title = "teen";
        } else if (x <= 15) {
            title = "adult";
        } else {
            title = "ninja";
        }
        return title;
    }, this);
}

var ViewModel = function() {

    var self = this;
    var randNum = Math.floor(Math.random() * catStore.length)
    this.catList = ko.observableArray([]);

    catStore.forEach(function(catItem) {
        self.catList.push(new Cat(catItem));
    });

    this.currentCat = ko.observable(this.catList()[randNum]);

    this.incrementCounter = function() {
        this.clickCount(this.clickCount() + 1);
    };
    this.setCat = function(clickedCat) {
        self.currentCat(clickedCat);
    };
    this.adminButton = function() {
        this.showAdminBox(true);
    };
    this.cancel = function() {
        this.showAdminBox(false);
    };

    this.showAdminBox = ko.observable(false);
}

ko.applyBindings(new ViewModel());
