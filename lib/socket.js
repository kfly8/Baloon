module.exports = function (app, Model, conf) {
    var io = require('socket.io').listen(app, { log: false });

    io.sockets.on('connection', function (socket) {
        socket.on('click game left button', function (data) {
            console.log(data);
            socket.emit('notify click game left button', { data: data }); 
        });
    });


    //ユーザAの操作をユーザBに知らせる
    //userA ->  app  -> userB
    //appを意識しないで書きたい
    //userA -> (app) -> userB
    //
    // 
    //  A, B をつなぐ
    //  A send to B -(1)
    //  app get (1)
    //  app send (1) to B -(2)
    //  B get (2)
    // 
    //
    //

    // client A
//    var socket = io.socket('/userA/userB', { port : 3001 } );
//    socket.emit('left click', data);
//
//    // server
//    var socketAB = io.of('/userA/userB');
//    var socketBA = io.of('/userB/userA');
//
//    socketAB.on('left click', function(data){
//        socketBA.emit('left click', data);
//    });
//
//    //client B
//    var socket = io.socket('/userB/userA', { port : 3001 } );
//    socket.on('left click', function(data){
//        game.action(data);
//    });
//
//
//    /*
//     * socket_key ?
//     */
//
//    // Aが対戦申し込み 
//    // B confirm
//    //  if B yes then send A yes
//    //   then A confirm
//    //    if A yes then start battle and send B that battle is start
//    //    GENERATE SOCKET KEY
//    //  else then send A that battle is canceled
//    //
//    // A 中断
//    // B win because A nigeta!
//    // A parameter nigeta countted up
//    //
//    // server
//    // request http://localhost/userA/userB,userC,userD
//    // 申し込んだ人。
//    var socket_key = make_socket_key({ from: userA, to:[userB, userC,,,]});
//
//    // client A
//    var socket = io.socket('/' + socket_key, { port: 3001});
//    socket.emit('left click', data);
//
//    // server
//    var socket = io.of('/' + socket_key);
//    socket.on('left click', function(data){
//        socket.broadcast.emit('notify left click', function(data){
//
//        });
//    });
//
//    // client B
//    var socket = io.socket('/' + socket_key, { port: 3001 });
//    socket.on('notify left click', function(data){
//        game.action(data);
//    });
//
//

    return io;
};
