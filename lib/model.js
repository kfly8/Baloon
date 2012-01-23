module.exports = function(db){

    var Model = function(name){
       if (! (this instanceof Model)) {
            return new Model(name);
       }

       this._name = name;
       return this;
    };

    Model.prototype.single = function (query, callback){
        db.collection(this._name, function (err, c) {
            if (err) { throw err; }
            c.findOne(query, callback);
        });
    };

    Model.prototype.search = function (query, opts, callback){
        db.collection(this._name, function (err, c) {
            if (err) { throw err; }
            var field = (opts.field) ? opts.field : {};
            var l = (opts.limit) ? opts.limit : 1;
            c.find(query, field).limit(l).toArray(callback);
        });
    };

    Model.prototype.count = function (query, callback){
        db.collection(this._name, function (err, c) {
            if (err) { throw err; }
            c.find(query).count();
        });
    };

    Model.prototype.create = function (data, callback) {
        db.collection(this._name, function (err, c) {
            if (err) { throw err; }
            data.created_date = new Date();
            c.insert(data, callback);
        });
    };

    Model.prototype.delete = function (query, callback) {
        db.collection(this._name, function (err, c) {
            if (err) { throw err; }
            c.remove(query, callback);
        });
    };

    Model.prototype.update = function (query, data, callback) {
        db.collection(this._name, function (err, c) {
            if (err) { throw err; }
            c.update(query, data, callback);
        });
    };

    Model.prototype.find_or_create = function (query, callback) {
        var that = this;
        that.single(query, function(err, data){
            if (err) { throw err; }
            if(data){
                callback(err, data);
            }
            else {
                console.log('gasdgjldasjfl;ajsdfl;adjsfl;j');
                that.create(query, callback);
            }
        });
    };

    return Model;
};

