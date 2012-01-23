"use strict";

// Module dependencies.
var express = require('express'),
    app     = module.exports = express.createServer(),
    conf    = require('./conf/conf'),
    mongodb = require('mongodb'),
    mongoStore = require('connect-mongodb');

var db = new mongodb.Db(
    conf.db.name,
    new mongodb.Server(
        conf.db.host,
        conf.db.port,
        conf.db.server_opts
        ),
    conf.db.opts
);

var Model = (require('./lib/model'))(db);


// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.set('view options', {
      layout: conf.views.layout,
  });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());

  app.use(express.session({
      store: new mongoStore({db: db}),
      secret: conf.db.cookie_secret,
      cookie: { httpOnly: false }
  }));

  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});


//pages
require('./lib/pages/root')(app, Model, conf);
require('./lib/pages/api')(app, Model, conf);
require('./lib/pages/signin')(app, Model, conf);
require('./lib/pages/baloon')(app, Model, conf);


// いつcloseしよう、、
db.open(function(err){
    if (err) {
        console.error(err.message);
        process.exit(1);
    }
});

//
app.listen(conf.http.port, conf.http.host);
console.log("Server running at %s in %s mode", conf.http.host + ':' + conf.http.port, app.settings.env);

