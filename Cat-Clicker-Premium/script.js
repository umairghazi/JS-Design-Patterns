(function() {

	var model = {

			currentCat: null,
			catArr: [],
			catNames: ['Bob', 'Tom', 'Tim', 'Pip', 'Leo'],

			adminPanel: "none",

		} //model



	var catDetailView = {

		init: function() {
			this.catElem = $('#cat');
			this.catNameElem = document.getElementById('cat-name');
			this.catImageElem = document.getElementById('cat-img');
			this.countElem = document.getElementById('cat-count');
			this.catImageElem.addEventListener('click', function(event) {
				controller.incrementCounter();
			});
			this.render();

		},

		render: function() {
			var currentCat = controller.getCurrentCat();
			this.countElem.textContent = currentCat.clickCount;
			this.catNameElem.textContent = currentCat.name;
			this.catImageElem.src = currentCat.img;

		}
	}; //catDetailView

	var catListView = {
		init: function() {

			this.catListElem = document.getElementById('cat-list');
			this.render();
		},

		render: function() {
			var cats = controller.getCats();
			this.catListElem.innerHTML = "";

			for (var i = 0; i < cats.length; i++) {

				var cat = cats[i];
				var list = document.createElement('li');
				list.textContent = cat.name;
				list.addEventListener('click', (function(cat) {
					return function() {
						controller.setCurrentCat(cat);
						catDetailView.render();
						adminView.render();
					};
				})(cat));

				this.catListElem.appendChild(list);

			}
		}
	};

	var adminView = {

		init: function() {

			this.adminBtn = document.getElementById('adminButton');
			this.adminForm = document.getElementById('adminForm');
			this.adminDiv = document.getElementById('admin');
			this.cancelBtn = document.getElementById('cancel');
			this.saveBtn = document.getElementById('save');

			this.adminDiv.style.display = model.adminPanel;
			this.adminBtn.addEventListener('click', function(event) {
				controller.toggleAdminDisplay();
			});

			this.cancelBtn.addEventListener('click', function(event) {
				controller.toggleAdminDisplay();
			});

			this.saveBtn.addEventListener('click',function(event){

				var newName = document.getElementById('name').value;
				var newImg = document.getElementById('img').value;
				var newClickCount = document.getElementById('clickCount').value;

				controller.updateModel(newName,newImg,newClickCount);
			});
		},

		render: function() {
			this.adminDiv.style.display = model.adminPanel;

			var currentCat = controller.getCurrentCat();
			document.getElementById('name').value = currentCat.name;
			document.getElementById('img').value = currentCat.img;
			document.getElementById('clickCount').value = currentCat.clickCount;

		}

	};



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


			model.currentCat = model.catArr[0];
			catListView.init();
			catDetailView.init();
			adminView.init();

		}, //init()
		getCurrentCat: function() {
			return model.currentCat;
		},

		getCats: function() {
			return model.catArr;
		},

		setCurrentCat: function(cat) {
			model.currentCat = cat;
		},

		incrementCounter: function() {
			model.currentCat.clickCount++;
			catDetailView.render();
		},

		toggleAdminDisplay: function() {
			if (model.adminPanel === "none") {
				model.adminPanel = "block";
				adminView.render();

			} else {
				model.adminPanel = "none";
				adminView.render();
			}
		},

		updateModel: function(newName,newImg,newClickCount){
			var currCat = this.getCurrentCat();
			currCat.name = newName;
			currCat.img = newImg;
			currCat.clickCount = newClickCount;
			catListView.render();
			catDetailView.render();
			adminView.renderw();

		}
	};


	controller.init();

})();
