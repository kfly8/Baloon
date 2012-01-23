var Baloon = Baloon || {};

Baloon.Controller = (function(jQuery, socketIO){

    //依存モジュール
    var io = socketIO;
    var $  = jQuery;

    // private member 
    var socket;
    var port = 3001;//FIXME 外に出す!! optionsでもらうかな

    // constructor 
    var Constr = function(connectTo){
       if (! (this instanceof Baloon.Controller)) {
            return new Baloon.Controller(connectTo);
       }

       socket = io.connect(connectTo, { port: port });

       return this;
    };

    Constr.prototype.makeEventKey = function(event){

        return '/controller' + '?event=' + event;//FIXME 死にたい、、、
        //return this.connectTo + '?event=' + event;
    };

    //FIXME newしなきゃいけないのがなんだかな
    Constr.prototype.makeButton = function(id){
        var that = this;
        var Btn = function(id){
        };

        Btn.prototype.emit = function(event, data){
            console.log(that.makeEventKey(event));
            socket.emit(that.makeEventKey(event), data);
        };
        return new Btn(id);
    };

    return Constr;

}(jQuery, io));




 

