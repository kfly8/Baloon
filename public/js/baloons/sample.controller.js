(function(global, $, Baloon){

    //var connectTo = global.location.pathname;
    var connectTo = '/controller';//FIXME

    var baloonController = Baloon.Controller(connectTo);

    var pomp = $('#pomp');
    var baloonPomp = baloonController.makeButton('pomp');

    pomp.click(function(){

       baloonPomp.emit('click', { hoge: 'is clicked data' } );
        console.log('これで、send "A Button is clicked" to server'); 

    });

}(window, jQuery, Baloon));

