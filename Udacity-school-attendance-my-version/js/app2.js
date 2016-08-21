(function() {
    var model = {
        setupLocalStorage: function() {
            if (!localStorage.attendance) {
                console.log('Creating attendance records...');

                function getRandom() {
                    return (Math.random() >= 0.5);
                }

                var nameColumns = $('tbody .name-col'),
                    attendance = {};

                nameColumns.each(function() {
                    var name = this.innerText;
                    attendance[name] = [];

                    for (var i = 0; i <= 11; i++) {
                        attendance[name].push(getRandom());
                    }
                });
                localStorage.attendance = JSON.stringify(attendance);
            }
        },

        stuObj: {},

        init: function() {
        },

    };

    var view = {

        init: function() {

            var nameCol = $("tbody .name-col");
            var studentNameArray = [];
            $(nameCol).each(function(i, v) {
                studentNameArray.push(v.innerHTML);
            });

            $(studentNameArray).each(function(i, v) {
                model.stuObj[v] = makeArr(v);
                model.stuObj[v]["count"] = getCount(v);
            });

            function makeArr(studentName) {
                var xx = $("tbody .name-col:contains('" + studentName + "')").parent("tr").children(".attend-col").children();
                var checkBoxesArray = [];
                var count = 0;
                $(xx).each(function(i, v) {
                    // console.log($(v).is(":checked"));
                    if ($(v).is(':checked') !== true) {
                        count++;
                    }
                    checkBoxesArray.push(v);
                });
                //checkBoxesArray.push(count)
                return checkBoxesArray;
            } //makeArr

            function getCount(studentName){
              var xx = $("tbody .name-col:contains('" + studentName + "')").parent("tr").children(".attend-col").children();
              var count = 0;
              $(xx).each(function(i, v) {
                  if ($(v).is(':checked') !== true) {
                      count++;
                  }
              });
              return count;
            }//getCount
        },

        render: function() {
            $.each(model.stuObj,function(i,v){
              // $("tbody .name-col:contains('" + i + "')").parent().children('.missed-col').html(v.slice(- 1)[0]);
              $("tbody .name-col:contains('" + i + "')").parent().children('.missed-col').html(v.count);
            });

        }, //render

    };

    view.init();
    view.render();

    var controller = {
        init: function() {
            var self = this;
            // self.countUnChecked();
            $.each(model.stuObj, function(objKey, objVal) {
                $.each(objVal, function(arrKey, arrVal) {
                    $(arrVal).on('click', function() {
                        var studentName = ($(this).parent().parent().children('.name-col')[0].innerText);
                        self.countUnChecked(studentName);
                    });
                });
            });
        }, //init

        countUnChecked: function(studentName) {
            console.log(studentName);
            var chkBxsForStuClicked = model.stuObj[studentName];
            var count = model.stuObj[studentName].count;
            $.each(chkBxsForStuClicked, function(index, value) {
                if ($(value).is(':checked') == true) {
                    count--;
                }
            });
            // model.stuObj[studentName].pop();
            model.stuObj[studentName].count = count;
            view.render()
        }, //countUnChecked

        saveToLocalStorage: function(){
          // var obj = model.stuObj;
          // var tfArr = [];
          // $.each(obj,function(i,v){
          //   console.log(v);
          //   $.each(v,function(arrInd,arrVal){
          //     if($(arrVal).is(':checked') == true){
          //       tfArr[arrInd] = 1;
          //     }else{
          //       tfArr[arrInd] = 0;
          //     }
          //   });
          // });
          // console.log(obj);
          console.log(model.stuObj);
          localStorage.attendance = JSON.stringify(model.stuObj);
        }, //saveToLocalStorage

        getFromLocalStorage: function(){
          var newObj = JSON.parse(localStorage.attendance);
          console.log(newObj);
        } //getFromLocalStorage
    };
    controller.init();

    controller.saveToLocalStorage();
    controller.getFromLocalStorage();


})();
