
// Step - 2 - Cat Clicker 2

// var elem = document.getElementsByTagName('img');
// // var span = document.getElementById('click-counter');
// var cat1 = {
//     counter: 0
// }
// var cat2 = {
//     counter: 0
// }
//
// for (var i = 0; i < elem.length; i++) {
//     elem[i].addEventListener('click', function(e) {
//
//         if (e.target.id === 'cat1') {
//             e.target.parentNode.firstChild.nextSibling.innerHTML = "Mr cat1" + " . Num of clicks: " + ++cat1.counter;
//         } else {
//             e.target.parentNode.firstChild.nextSibling.innerHTML = "Mr cat2" + " . Num of clicks: " + ++cat2.counter;
//         }
//     });
// }


// Step -3 - Cat Clicker Premium



var cats = ['Bob','Tom','Tim','Pip','Leo'];
var ul = document.createElement("ul");
var detailDiv = document.getElementById('detail-area');


for(cat in cats){
	var li = document.createElement("li");
	li.setAttribute('id',cats[cat]);
	li.addEventListener('click',(function(index){
		return function(){ // if arg is used here - you get event target
			detailDiv.innerHTML = "";
			var counter = 0;
			var img = document.createElement('img');
			img.setAttribute('src', "cats/cat"+ index+  ".jpg");
			var p = document.createElement('p');
			img.addEventListener('click',function(){
				p.textContent = "No of clicks -- " + counter;
				counter++;
				detailDiv.appendChild(p);
			});
			detailDiv.appendChild(img);

			var span = document.createElement('span');
			span.textContent = cats[index];
			detailDiv.appendChild(span);
		};
	})(cat));

	li.textContent = cats[cat];
	ul.appendChild(li);
}

var list = document.getElementById("list-area");
list.appendChild(ul);
