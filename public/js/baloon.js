var Baloon = Baloon || {};

Baloon.Board = (function(elem, board_size){

    //依存モジュール
    var $ = jQuery;

    //private member 
    var Constr;
    var total_cell_count = Math.pow(board_size, 2);
    var cell_classes = [ 'red', 'blue' ];

    var Constr = function(elem, board_size){

    }
    Constr.prototype = {
        constructor: Baloon.Board,
        version: "0.1",
        hoge: function(){

        }
    }
    return Constr;

}());

    var init = function (){

        var table = document.createElement('table');
        for(var i=0;i<board_size;i++){
            var tr = document.createElement('tr');
            for(var j=0;i<board_size;j++){

                var td = document.createElement('td');
                tr.append(td);
            }
            table.append(tr);
        }


    };
    //セルの数分だけ、セルのクラス名が書かれた抽選用紙を用意する
    var lots = (function(){
        var data = [];
        for(var i = 0, l = cell_classes.length; i < l; i++){
            for(var j = 0; j < total_cell_count/l; j++){
                data.push(cell_classes[i]);
            }
        }

        var draw = function(){
            var idx = ~~( Math.random() * data.lenth);
            return data[idx];
            //引いたくじを捨てる処理
        };

    }());

};

Baloon.Board.prototype.draw = 


