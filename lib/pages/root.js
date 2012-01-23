module.exports = function (app, Model, conf) {

    app.get('/', function (req, res) {

        if( req.session.user ){
            res.render('root/index', {
                jss: [ 
                '/js/lib/jquery.lazyload.min.js',
                '/js/index.js',
                ],
                user: req.session.user,
            });

        }
        else {
            res.render('root/tutorial', {
                jss: [ 
                ],
                user: false,
            });
        }

    });

};
