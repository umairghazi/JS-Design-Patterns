// (function() {
//
//     var model = {
//
//         init: function() {
//
//         },
//     };
//
//     model.init();
//     var controller = {
//         init: function() {
//
//         },
//     };
//
//
//     var view = {
//         init: function() {
//           this.allMissed = $('tbody .missed-col');
//           this.allCheckboxes = $('tbody input');
//           this.countMissing(this.allMissed,this.allCheckboxes);
//         },
//
//         countMissing : function(allMissed,allCheckboxes){
//           allMissed.each(function(){
//             var daysChecked = $(this).parent('tr').children('td').children('td');
//             var numMissed = 0;
//           });
//         }
//
//         render : function(){
//
//         }
//     };
//
// })();

/**
 * Created by umai8769 on 8/15/2016.
 */


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

        stuObj : {},

        init: function() {
          console.log(this.stuObj);
        }
    };


    model.init();



    var view = {

        init: function() {

            var nameCol = $("tbody .name-col");
            var studentNameArray = [];
            $(nameCol).each(function(i, v) {
                studentNameArray.push(v.innerHTML);
            });

            $(studentNameArray).each(function(i, v) {
                model.stuObj[v] = makeArr(v);;
            });

            function makeArr(studentName) {
                var xx = $("tbody .name-col:contains('" + studentName + "')").parent("tr").children(".attend-col").children();
                var checkBoxesArray = [];
                $(xx).each(function(i, v) {
                    checkBoxesArray.push(v);
                });
                return checkBoxesArray;
            } //makeArr
        },


    };

    view.init();

    var controller = {
      init:function(){
        var self = this;
        self.countChecked();
        $.each(model.stuObj, function(objKey,objVal){
          $.each(objVal,function(arrKey,arrVal){
            $(arrVal).on('click',function(){
              var studentName = ($(this).parent().parent().children('.name-col')[0].innerText);
              self.countUnChecked();
            });
          });
        });
      },//init

      countUnChecked: function(studentName){
        $.each(model.stuObj, function(objKey,objVal){
          $.each(objVal,function(arrKey,arrVal){
            // console.log($(arrVal).parent().parent().children('.missed-col')[0].innerText);
          });
        });
      }, //countChecked
    };
    controller.init();

})();
