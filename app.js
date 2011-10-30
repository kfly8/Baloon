
/**
 * Module dependencies.
 */

var express = require('express')
  , app = module.exports = express.createServer()
  , io = require('socket.io').listen(app);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});


// 参加してるメンバーの保持
var nicknames = {};

// socket
// audience
//var io.sockets.on('connection', function(socket){
//
//        socket.on('audience join', function(nick){
//            if (!nicknames[nick]) {
//                nicknames[nick] = socket.nickname = nick;
//
//                socket.broadcast.emit('announcement', nick + ' joined');
//                io.sockets.emit('nicknames', nicknames);
//            }
//        });
//});

var tv = io.of('/tv');
    tv.on('connection', function (socket) {

        //風船に空気が入った
        socket.on('pomp', function(pomp){
           tv.emit('poo', pomp);
        });
    });

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Baloon'
  });
});

app.get('/tv', function(req, res){
  res.render('tv', {
    title: 'Baloon'
  });
});

app.get('/controller', function(req, res){
  res.render('controller', {
    title: 'Baloon'
  });
});


app.listen(3001);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
