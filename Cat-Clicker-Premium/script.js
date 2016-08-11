(function() {


	var model = {

			currentCat: null,
			catArr: [],
			catNames: ['Bob', 'Tom', 'Tim', 'Pip', 'Leo'],

		} //model



	var view = {

		init: function() {
			var listArea = $('#list-area');
			var detailArea = $('#detail-area');

		}
	}



	var controller = {

		catStarter: function(name, clickCount, img) {

			var catInfo = {
				name: name,
				clickCount: clickCount,
				img: img
			};

			model.catArr.push(catInfo);
		}, //catStarter()

		init: function() {
			var catArr = model.catNames;
			for (catName in catArr) {
				this.catStarter(catArr[catName], 0, "cats/cat" + catName + ".jpg");
			}
			console.log(model.catArr);

			model.currentCat = model.catArr[0];

		}, //init()
		getCurrentCat: function() {
			return model.currentCat;
		},

		getCats: function() {
			return model.catArr;
		},

		setCurrentCat: function(cat) {

		}

	}
	controller.init();
})();
