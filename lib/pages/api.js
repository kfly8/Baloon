module.exports = function (app, Model, conf) {

    app.get('/users.json', function (req, res) {

       if (! req.session.user) {
           return;
       }

       Model('users').search({ }, {
           field: { name: 1, _id: 0 },
           limit: 20,
       }, function(err, users){
           if (err) { throw err }

           res.json(users);
       });
    });

};
