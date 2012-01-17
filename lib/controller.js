module.exports = function (app, Model, conf) {

    app.get('/', function (req, res) {

        if( req.session.user ){
            res.render('index', {
                jss: [ 
                '/js/lib/jquery.lazyload.min.js',
                '/js/index.js',
                ],
                user: req.session.user,
            });

        }
        else {
            res.render('tutorial', {
                jss: [ 
                ],
                user: false,
            });
        }

    });

    app.get('/users.json', function (req, res) {

       if (! req.session.user) {
           return;
       }

       (new Model('users')).search({ }, {
           field: { name: 1, _id: 0 },
           limit: 20,
       }, function(err, users){
           if (err) { throw err }

           res.json(users);
       });
    });

    app.get('/battle/:op_user_name', function (req, res) {

       if (! req.session.user) {
            res.redirect('/');
            return;
       }

       (new Model('users')).single(
            { name: req.params.op_user_name },
            function (err, op_user) {
                if (err) { throw err; }
                res.render('battle', {
                    jss: [
                        '/js/battle.js'
                    ],
                    op_user: op_user,
                    user: req.session.user,
                });
            }
        );
    });

    app.get('/screen', function (req, res) {

          res.render('screen', {
              jss: [
                  '/js/screen.js'
              ],
          });
    });

    require('./controller/signin')(app, Model, conf);

};
