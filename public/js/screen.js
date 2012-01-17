(function($){
    var socket = io.connect('', { port: conf.http.port });
    var screen = $("#screen");

    screen.html('hogehgoe');

    socket.on('notify click game left button', function (data) {
        console.log('nanika sitarashi');
        console.log(data);
    });

})(jQuery);


