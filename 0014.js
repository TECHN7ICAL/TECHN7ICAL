jQuery(document).ready(function(){
    var is_news_load = false;

    set_news_pagination_event();

    function set_news_pagination_event(){
        jQuery('.our-latest-news .pagination a').on('click', function(event){

            event.preventDefault();

            if(!is_news_load) {
                load_new_news(this);
            }

        });
    }

    function load_new_news(obj){
        var $clicked_link = jQuery(obj);

        if(!$clicked_link.attr('href')) {
            return;
        }

        is_news_load = true;

        var need_page = $clicked_link.attr('href').replace(/[^\d]/g, '');

        if($clicked_link.nextAll('.current').length){
            var is_right = false;
        } else {
            var is_right = true;
        }

        jQuery.get(
            window.wp_data.ajax_url,
            {
                action: 'load-news',
                page: need_page,
	            lang: typeof wp_data.lang == 'undefined' ? '' : wp_data.lang
            },
            function(response){
                if(response) {
                    scroll2news_top();
                    insert_news(response, is_right);
                    update_pagination(need_page);
                    is_news_load = false;
                }
            }
        )
    }

    function insert_news(text, is_right){
        if(is_right){
            insert_news_right(text);
        } else {
            insert_news_left(text);
        }
    }

    function insert_news_right(text){

        var $news = jQuery('.our-latest-news .news');

        var new_news = '<div class="news new-news" style="left:100%;">' + text + '</div>';

        $news.after(new_news);

        var $new_news = jQuery('.our-latest-news .news.new-news');

        $news.animate({left: '-100%'},400,function(){
            $news.remove();
        });

        $new_news.animate({left: '0'},400,function(){
            $new_news.removeClass('new-news');
        });

    }

    function insert_news_left(text){

        var $news = jQuery('.our-latest-news .news');

        var new_news = '<div class="news new-news" style="left:-100%;">' + text + '</div>';

        $news.before(new_news);

        var $new_news = jQuery('.our-latest-news .news.new-news');

        $news.animate({left: '100%'},400,function(){
            $news.remove();
        });

        $new_news.animate({left: '0'},400,function(){
            $new_news.removeClass('new-news');
        });
    }

    function update_pagination(page){
        var $pagination = jQuery('.our-latest-news .pagination');

        jQuery.get(
            window.wp_data.ajax_url,
            {
                action: 'load-news-pagination',
                page: page,
	            lang: typeof wp_data.lang == 'undefined' ? '' : wp_data.lang
            },
            function(response){
                if(response) {
                    $pagination.replaceWith(response);
                    set_news_pagination_event();
                }
            }
        )
    }

    function scroll2news_top(){
        if($(window).width() >= 1280){
            return;
        }

        $('html, body').animate({
            scrollTop: $(".our-latest-news").offset().top
        }, 1000);
    }

});
