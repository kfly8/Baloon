(function($){
    var socket = io.connect('', { port: conf.http.port });

 //   var cursors = {};
 //    <table id="board" border="1">
//    <% size = 10; %>
//    <% for (var i = 0; i < size; i++) { %>
//        <tr>
//            <% for (var j = 0; j < size; j++) { %>
//            <td>(<%= i %>,<%= j %>)</td>
//            <% } %>
//        </tr>
//    <% } %>
//    </table>
//    
    var board_size = 6;
    var total_cell_count = Math.pow(board_size, 2);
    var cell_classes = [ 'red', 'blue' ];


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

    var table = $(document.createElement('table'));
    for(var i=0;i<board_size;i++){
        var tr = $(document.createElement('tr'));
        for(var j=0;i<board_size;j++){
            //lots.draw

            //var draw = ~~( Math.random() * lots.length);
            var td = $(document.createElement('td'));
            tr.append(td);
        }
        table.append(tr);
    }

    $('#battle_container').append(table);


//    tds.first().addClass('active');
//    tds.last().addClass('op_active');
//
//    tds.each(function(i, td){
//        var td = $(td);
//        var idx = ~~( Math.random() * arr.length);
//        td.addClass(arr[idx]);
//        arr.splice(idx, 1);
//
//        td.click(function(){
//            console.log(i);
//            var x = i % boardSize;
//            var y = ~~(i / boardSize);
//            socket.emit('click game left button', { name: user.name, x: x, y: y, direction: 4 });
//       })
//    });
//
    socket.on('notify click game left button', function(data){
        console.log('chant click sihi');
//        console.log(op_user);
        console.log(data);
    });


})(jQuery);


