module.exports = function (app, Model, conf) {

    var assert = require('assert'),
        oauth  = require('oauth'),
        url    = require('url');

    app.get('/signout', function (req, res) {
        req.session.destroy();
        res.redirect('/');
    });

    app.get('/signin/twitter', function (req, res) {
        console.log('hello');

        var twitter = new oauth.OAuth(
            'https://api.twitter.com/oauth/request_token',
            'https://api.twitter.com/oauth/access_token',
            conf.oauth.twitter.consumer,
            conf.oauth.twitter.consumer_secret,
            '1.0',
            conf.oauth.twitter.base_uri + url.parse(req.url).pathname,
            'HMAC-SHA1'
        );

        if (req.session.oauth && req.session.oauth.twitter &&
            req.query.oauth_token && req.query.oauth_verifier) {

            delete req.session.oauth.twitter;
            twitter.getOAuthAccessToken(
                req.query.oauth_token,
                req.query.oauth_verifier,
                function (error, access_token, access_token_secret, results) {
                    if (error) {
                        res.send(error.data, error.statusCode);
                        return;
                    }
                    onSuccess({
                        key: 'twitter:' + results.user_id,
                        name: results.screen_name,
                        info: results
                    }, function (err, result) {
                        console.log(result);
                        req.session.user = {
                            id: result.user._id,
                            name: result.user.name
                        };
                        res.redirect(conf.oauth.twitter.redirect_uri);
                    });
                }
            );
        }
        else {
            twitter.getOAuthRequestToken(function (error, token, token_secret, results) {
                if (error) {
                    res.send(error.data, error.statusCode);
                    return;
                }
                req.session.oauth = {
                    twitter: {
                        oauth_token: token,
                        oauth_token_secret: token_secret,
                        request_token_results: results
                    }
                };
                res.redirect(twitter.signUrl(
                    'https://api.twitter.com/oauth/authorize',
                    token,
                    token_secret
                ));
            });
        }
    });


    var oauth2_flow = function (data, callback) {
        var async = require('async');
        async.waterfall([
            function (cb) {
                data.oauth2.getOAuthAccessToken(
                    data.code,
                    { redirect_uri: data.redirect_uri },
                    cb
                );
            },
            function (access_token, refresh_token, cb) {
                data.oauth2.get(
                    data.get_url,
                    access_token,
                    cb
                );
            },
            function (result, response, cb) {
                var obj = JSON.parse(result);
                onSuccess(data.keyname(obj), callback);
            }
        ], function (err) {
            callback(err);
        });
    }

    var onSuccess = function (data, callback) {

        (new Model('auths')).single( { key: data.key }, function(err, auth){
            if (err) {throw err;}

            if(auth){

                (new Model('users')).single(
                { _id: auth.user },
                function (err, user) {
                    if (err) { throw err; }
                    assert.ok(user, 'find one user');

                    callback(null, {
                        auth: auth,
                        user: user
                    });
                });
            }
            // まだ認証してないわ
            else {
                (new Model('users')).create( { name: data.name }, function(err, users){
                    if (err) { throw err; }
                    users.forEach(function(user){
                        (new Model('auths')).create( { 
                            key: data.key,
                            user: user._id,
                            info: data.info
                        }, function(err, auth){
                            callback(err, {
                                auth: auth,
                                user: user
                            });
                        });
                    });
                });
            };
        });
    }
};
