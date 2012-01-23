module.exports = function (app, Model, conf) {

    var io = require('socket.io').listen(app, { log: false });

    //var baloon = require('./lib/baloon')(io);

//    io.of('/hoge').('connection', function (socket) {
//        socket.on('click game left button', function (data) {
//            console.log(data);
//            socket.emit('notify click game left button', { data: data }); 
//        });
//    });
//
//    io.sockets.on('connection', function (socket) {
//        socket.on('click game left button', function (data) {
//            socket.emit('notify click game left button', { data: data }); 
//        });
//    });
//
    // FIXME Baloon.Controller(connectTo); とかでくっつけます、、
    var connectTo = '/controller';
    //var hoge = io.of(connectTo)
    var hoge = io
                 .on('connection', function(socket){
                   socket.on('/controller?event=click', function(data){
                     console.log(data);
                   });
               });

    app.get('/controller/start/:op_user_name', function (req, res) {

       if (! req.session.user) {
            res.redirect('/');
            return;
       }

       Model('games').find_or_create(
            { 
              //FIXME genearate uuid
              owner: req.session.user.name, //FIXME この人がowner のゲームがいっぱいできちまうんだけどいい？
              members: [ req.params.op_user_name, req.session.user.name ],
            },
            function (err, game) {
                if (err) { throw err; }
                res.redirect('/controller/' + game._id);//FIXME id -> uuid
            }
        );
    });

    app.get('/controller/:game_uuid', function (req, res) {

       if (! req.session.user) {
            res.redirect('/');
            return;
       }

       Model('games').single(
            //{ _id: req.params.game_uuid },//FIXME id -> uuid
            { owner: req.session.user.name },//FIXME uuidを意味なし子にしてる
            function (err, game) {
                if (err) { throw err; } //FIXME game がなかったら、作り直せ
                res.render('baloon/controller', {
                    jss: [
                        '/js/baloon.controller.js',
                        '/js/baloons/sample.controller.js',
                    ],
                    user: req.session.user,
                });
            }
        );
    });

    //app.get('/screen/:game_uuid', function (req, res) {//FIXME name->uuid
    app.get('/screen/:owner_name', function (req, res) {

       Model('games').single(
            //{ _id: req.params.game_uuid },//FIXME id -> uuid
            { owner: req.session.user.name },//FIXME uuidを意味なし子にしてる
            function (err, game) {
                if (err) { throw err; } //FIXME game がなかったら、作り直せ
                res.render('baloon/screeen', {
                    jss: [
                        '/js/baloon.js',
                        '/js/baloon.screeen.js',
                    ],
                    user: req.session.user,
                });
            }
        );


    });

};
