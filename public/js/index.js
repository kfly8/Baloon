(function($){
    $.getJSON('/users.json', function(users){
        var users_container = $('#users_container');

        users.forEach(function(user){

            var img_base = 'http://api.twitter.com/1/users/profile_image/';
            var img_src = img_base + user.name + '.jpg?size=bigger';

            var img = $(document.createElement('img'))
                    .css({ width: '73px', height: '73px' })
                    .attr('src', img_src)
                    .attr('class', 'thumbnail')
                    .attr('alt', user.name)
                    .attr('title', user.name)
                    .wrap("<li><a href='#'></a></li>");

            var a = $(document.createElement('a'))
                  .attr('href', '/battle/' + user.name)
                  .append(img);

            var li = $(document.createElement('li')).append(a);

            users_container.append(li);

            img.fadeIn(1000);
        });
    });
}(jQuery));
