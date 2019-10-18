$(document).ready(function () {

    modal();

    ishomePage();

    isSingleNews();

    var menu_toggler = $('.toggler')[0],
        menu_body = $('.collapsible-menu')[0];

    $(menu_toggler).on('click', function (event) {

        event.preventDefault();
        event.stopPropagation();

        if ($(menu_body).hasClass("active")) {
            $(this).removeClass("active");
            $(menu_body).removeClass("active");
        } else {
            $(this).addClass("active");
            $(menu_body).addClass("active");
        }
    });


    var is_rtl = $('body').hasClass('rtl');
    if ($.fn.slick) {
        $('.team-slider').slick({
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            rtl: is_rtl,
            responsive: [
                {
                    breakpoint: 920,
                    settings: {
                        centerMode: true,
                        centerPadding: '21%'
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        centerMode: true,
                        centerPadding: '60px'
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        centerMode: true,
                        centerPadding: '25px'
                    }
                },
                {
                    breakpoint: 400,
                    settings: {
                        centerMode: true,
                        centerPadding: '10px'
                    }
                }
            ]
        });
    }

    var map;
    var styles = [
        {
            "featureType": "all",
            "elementType": "geometry",
            "stylers": [
                {
                    "lightness": "-5"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "lightness": "-10"
                },
                {
                    "saturation": "-100"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                },
                {
                    "lightness": "0"
                },
                {
                    "gamma": "1"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "lightness": "0"
                },
                {
                    "gamma": "1"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "hue": "#d700ff"
                },
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "hue": "#ff0000"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#444444"
                },
                {
                    "saturation": "0"
                },
                {
                    "lightness": "0"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "administrative.country",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "lightness": "50"
                }
            ]
        },
        {
            "featureType": "administrative.country",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "lightness": "25"
                }
            ]
        },
        {
            "featureType": "administrative.province",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "weight": "1"
                },
                {
                    "lightness": "0"
                }
            ]
        },
        {
            "featureType": "administrative.province",
            "elementType": "labels.text",
            "stylers": [
                {
                    "lightness": "25"
                }
            ]
        },
        {
            "featureType": "administrative.locality",
            "elementType": "labels.text",
            "stylers": [
                {
                    "lightness": "30"
                },
                {
                    "gamma": "1.00"
                }
            ]
        },
        {
            "featureType": "administrative.neighborhood",
            "elementType": "labels.text",
            "stylers": [
                {
                    "lightness": "53"
                },
                {
                    "gamma": "1.00"
                }
            ]
        },
        {
            "featureType": "administrative.neighborhood",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "lightness": "-20"
                },
                {
                    "gamma": "1.00"
                }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "lightness": "30"
                },
                {
                    "gamma": "1"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#f2f2f2"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "lightness": "-10"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "lightness": "-40"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "lightness": "18"
                },
                {
                    "saturation": "-100"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "lightness": "0"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                },
                {
                    "lightness": "50"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                },
                {
                    "lightness": "0"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "weight": "6"
                },
                {
                    "saturation": "0"
                },
                {
                    "lightness": "0"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "all",
            "stylers": [
                {
                    "lightness": "0"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "lightness": "80"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "all",
            "stylers": [
                {
                    "lightness": "0"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "lightness": "80"
                },
                {
                    "gamma": "1"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "saturation": "0"
                },
                {
                    "lightness": "-15"
                },
                {
                    "weight": ".25"
                },
                {
                    "gamma": "1"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text",
            "stylers": [
                {
                    "lightness": "0"
                },
                {
                    "gamma": "1.00"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#ffc1d9"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "saturation": "-100"
                },
                {
                    "lightness": "-5"
                },
                {
                    "gamma": "0.5"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "weight": ".75"
                },
                {
                    "visibility": "off"
                }
            ]
        }
    ];

    var isMobile = false; //initiate as false

    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;


    function initMap() {

        var styledMap = new google.maps.StyledMapType(styles,
            {name: "Styled Map"});

        var mapOptions = {
            zoom: 16,
            center: new google.maps.LatLng(contacts_lat, contacts_lng),
            scrollwheel: false,
            draggable: false,
            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
            },

            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: false

        };

        var map = new google.maps.Map(document.getElementById('map'),
            mapOptions);

        google.maps.event.addDomListener(window, "resize", function() {
            var center = map.getCenter();
            google.maps.event.trigger(map, "resize");
            map.setCenter(center);
        });

        map.addListener('mouseover', function () {
            map.set('scrollwheel', false);
            map.set('draggable', false);
        });


        if(isMobile == true) {
            map.set('draggable', false);
        } else {
            map.addListener('click', function () {
                map.set('scrollwheel', true);
                map.set('draggable', true);
            });
        }

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(contacts_lat, contacts_lng),
            map: map,
            icon: window.wp_data.theme_url + '/images/locations.png'

        });


        map.mapTypes.set('map_style', styledMap);
        map.setMapTypeId('map_style');
        marker.setMap(map);


    }

    if($('body').hasClass('home')) {
        initMap();
    }

    $(".logo").on('click', function(){
        $('html,body').animate({ scrollTop: 0 }, 750);
    });

    if(isMobile == true) {
        for(var i = 0; i < $('.section-bg').length; i++) {
            $($('.section-bg')[i]).css({
                'display': 'none'
            });
        }
        $('body').addClass('touch');
    } else {
        wow = new WOW(
            {
                animateClass: 'animated',
                offset:       30
            }
        );
        wow.init();
    }


    $(document).on("scroll",function(){
        if($('body').hasClass('home')) {
            //footer_visible($('.customer'));
        }

        modalPos($('.modal-contacts .modal-content'));

        setTimeout(function () {
            if ($(menu_body).hasClass("active")) {
                $(menu_toggler).removeClass("active");
                $(menu_body).removeClass("active");
            }
        }, 1000);

        var winHeight = $(window).height(),
            winScroll = $(window).scrollTop();

        if( winScroll >= (winHeight + 50) ) {
            $('body').addClass('scrolled');
        } else {
            $('body').removeClass('scrolled');
        }


        if(isMobile == true) {
            $('.home-screen').show(0);

            return
        }



    });

    header_slich();

    $(document).bind('gform_confirmation_loaded', function(event, formId){
        $(".jobs .widget-title").addClass('hide');
    });

    $(document).bind('gform_confirmation_loaded', function(event, formId){
        if (dataLayer) {
            let discussFormWrapper = $('#discuss-form .gform_confirmation_wrapper ');
            let jobsFormWrapper = $('#jobs .gform_confirmation_wrapper ');

            if (
              discussFormWrapper.length &&
              formId === parseInt(discussFormWrapper.attr('id').replace(/gform_confirmation_wrapper_/, ''))
            ) {
                dataLayer.push({
                    'event': 'AboutUsForm'
                });
            }

            if (
              jobsFormWrapper.length &&
              formId === parseInt(jobsFormWrapper.attr('id').replace(/gform_confirmation_wrapper_/, ''))
            ) {
                dataLayer.push({
                    'event': 'JobForm'
                });
            }
        }
    });

    // var firstRender = false;
    $(document).bind('gform_post_render', function(event, formId){

        var delete_img_src = '/wp-content/themes/unitedperfectum/images/cancel_icon.svg',
            loader         = '/wp-content/themes/unitedperfectum/images/loader.gif';

        $(".gform_wrapper .attach input").on('change',function(){

            var field = $(this),
                parent_div = $(this).parent(),
                file_path = field.val(),
                file_name = file_path.replace(/^.+[\/\\]/,'');

            if(file_name){

                field.addClass('gform_hidden');
                parent_div.find('#extensions_message').addClass('gform_hidden');
                parent_div.append('<div id="gform_preview_1_3"><div class="ginput_preview"><img alt="Delete file" title="Delete file" class="gform_delete" src="' + delete_img_src + '" onclick="gformDeleteUploadedFile(1, 3, this);" onkeypress="gformDeleteUploadedFile(1, 3, this);"> <strong>' + file_name + '</strong></div></div>');
            }
        });

        if($(".attach img.gform_delete").length !== 0){
            $(".attach img.gform_delete").attr('src', delete_img_src)
        }


        $('.gform_wrapper form').on('submit',function(){
            var form = $(this);
            if (0 == form.find('.gform_footer .gform_ajax_spinner_custom').length){
                form.find('.gform_footer').append('<img id="gform_ajax_spinner_custom"  class="gform_ajax_spinner_custom" src="' + loader + '" alt="" />');
            }

        });


        // $('.gform_wrapper .gfield .ginput_container').append('<span class="old"></span>');


        // if( !firstRender <  ) {

            $('#gform_' + formId + ' .gfield .ginput_container').append('<span></span>');

            console.log( $('#gform_' + formId + ' .gform_wrapper .gfield .ginput_container') );
            // firstRender = true;
        // }


        if( formId == 1) {

            $(function(){

                var jobs_email_b43 = $('.jobs-form .form-email').text(),
                    jobs_email = window.atob(jobs_email_b43),
                    jobs_email_safe = jobs_email.replace('@','<span>@</span>').replace('.','<span>.</span>');

                $('.jobs-form .gfield.addition').append('<a href="mailto:' + jobs_email + '">' + jobs_email_safe + '</a>');
                var attach_text = $('.jobs-form .attach label').text().replace('*','');
                $('.jobs-form .ginput_container_fileupload').attr('data-content', attach_text);
            });
        }


    });

    if($('body.single-news').length){
        fixed_share();
    }
});

function fixed_share(){
    var $share;
    var is_fixed = false;

    if(!$share){
        $share = $('.sidebar-left .share');
    }

    $(window).on('scroll', function(){
        check_fixed();
    });

    $(window).on('resize',function(){
        check_fixed();
    });

    function check_fixed(){
        var top = $(this).scrollTop();
        var window_width = $(window).width();

        if(top < 255 || window_width < 1280){
            if(!is_fixed){
                return;
            }
            set_not_fixed();
        } else {
            if(is_fixed){
                return;
            }
            set_fixed();
        }
    }

    function set_fixed(){
        is_fixed = true;
        var left = $('.section-content .type-news').offset() - 110;

        $share.css({
            position: 'fixed',
            top: '120px',
            left: left
        });
    }

    function set_not_fixed(){
        is_fixed = false;
        $share.attr('style','');
    }
}



function footer_visible(elem) {
    var $document = $(document),
        elem_pos = elem.offset().top,
        elem_height = elem.height(),
        viewport_top = $document.scrollTop(),
        window_height = $(window).height(),
        footer_elem = $('footer');

        if( ( viewport_top > elem_pos + elem_height + window_height / 2 ) ){
            footer_elem.removeClass('hide-bg');
        } else {
            footer_elem.addClass('hide-bg');
        }
}

function header_slich() {
    var lastScrollTop = 0,
        header_elem = $( 'header' ),
        header_h = 0;

    $(window).scroll(function(event){
        var st = $(this).scrollTop();
        if (st > lastScrollTop){
            header_hide(header_elem);
        } else {
            header_show(header_elem, header_h);
        }
        lastScrollTop = st;
    });
}

function header_hide(elem) {
    if( $( 'body' ).hasClass( 'scrolled' ) ) {

        elem_h = elem.outerHeight();

        elem.css('top', -elem_h);
    }
}
function header_show(elem, elem_h) {

    if($("#wpadminbar").length){
        elem_h = elem_h + 32;
    }
    elem.css('top', elem_h);

}

/**
 * Bind on resize window
 */
(function($) {
    $.fn.CustomResize = function(settings) {

        settings = jQuery.extend({
            resize: function(){},
            timeout: false
        }, settings);

        function is_mobile() {
            return $.browser.device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
        }

        function resize(){
            if( settings.timeout ){
                setTimeout(function() {
                    settings.resize();
                }, settings.timeout);
            } else {
                settings.resize();
            }
        }

        if( is_mobile() ){
            $(window).on("orientationchange", function () {
                resize();
            });
        } else {
            $(window).on("resize", function () {
                resize();
            });
        }
    };
})(jQuery);


/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 *
 * jQuery.browser.mobile will be true if the browser is a mobile device
 *
 **/
(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);

$( window ).load(function() {

    var customer = $('.customer-content'),
        enterpriseCells = $('.enterprise-cells'),
        consultCells = $('.consult-cells'),
        webDevelopmentCells = $('.web-development-cells'),
        home_window_width = 992,
        window_width = 750;

    alignmentHeight(customer, home_window_width);
    alignmentHeight(enterpriseCells, window_width);
    alignmentHeight(consultCells, window_width);
    alignmentHeight(webDevelopmentCells, window_width);


    setTimeout(function () {
        $( 'body' ).CustomResize({
            resize: function () {
                alignmentHeight(customer, window_width);
            }
        });
    }, 50);

    $(window).on('resize', function () {
        alignmentHeight(customer, home_window_width);
        alignmentHeight(enterpriseCells, window_width);
        alignmentHeight(consultCells, window_width);
        alignmentHeight(webDevelopmentCells, window_width);
    });

    var x = document.getElementsByClassName("href-decode");

    var i;
    for (i = 0; i < x.length; i++) {
        x[i].href = window.atob(x[i].getAttribute("href"));
    }

});

function alignmentHeight(elem_parent, window_width) {
    var customer_content = elem_parent,
        customer_column = $(customer_content).find(' > *'),
        container_width = customer_content.innerWidth(),
        elem_width = customer_column.outerWidth(),
        elems = [];


    $(customer_column).find('> *').height('auto');

    $(customer_column).each(function (i, e) {

        var elem_height = $(e).outerHeight();
        elems.push(elem_height);
    });

    var max = getMaxValue(elems);
    var min = getMinValue(elems);

    function getMaxValue(elems) {
        var max = elems[0],
            index_max = 0;

        for (var i = 0; i < elems.length; i++) {
            if (max < elems[i]) {
                max = elems[i];
                index_max = i;
            }
        }
        return {'max': max, 'index_max': index_max};
    }

    function getMinValue(elems) {
        var min = elems[0],
            index_min = 0;

        for (var i = 0; i < elems.length; i++) {
            if (min > elems[i]) {
                min = elems[i];
                index_min = i;
            }
        }
        return {'min': min, 'index_min': index_min};
    }


    if ( window_width < $(document).width()) {
        $(customer_column.find(' > *')).each(function (i, e) {
            $(e).outerHeight( max.max );
        })
    };
}

function particles() {
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 70,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1.4,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "repulse"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
}

function modal(){
    var modal = $('.modal'),
        modalId,
        modal_timeout = 300;



    $('[data-toggle="modal"]').stop().on('click', function(event){
        modalId = $(this).data('target');

        if($(modalId).hasClass('modal-contacts')){
            modalPos($('.modal-contacts .modal-content'));
        }

        if($(modalId).hasClass('modal-service')){
            var modalClass = $(this).attr('class');
            modalGetContent(modalClass, modalId);
        }



        event.preventDefault();
    });


    $('.modal-content', modal).on('click', function(event){
        event.stopPropagation();
    });

    $('[data-dismiss="modal"]').on('click', function(){
        var parentId = $(this).parents('.modal');
        if($(parentId).hasClass('in')){
            $(parentId).removeClass('in');
            setTimeout(function () {
                $(modalId).hide(0);

                clearModalStile();

                if($(modalId).hasClass('modal-contacts')) {
                    $(this).find('.modal-content').removeAttr('style');
                }
            }, modal_timeout);
            if($(modalId).hasClass('modal-service')) {
                modalDestroy();
            }
        }
    });
    $('[data-dismiss="modal-out"]').on('click', function(){
        var parentId = $(this).parents('.modal');
        if($(parentId).hasClass('in')){
            $(parentId).fadeTo(0, 0);
            setTimeout(function(){
                $(parentId).removeClass('in');
                $(parentId).hide(0);
                clearModalStile();

                $(parentId).fadeTo(2000, 1);
                if($(parentId).hasClass('modal-service')) {
                    modalDestroy();
                }
                if($(parentId).hasClass('modal-contacts')) {
                    $(this).find('.modal-content').removeAttr('style');
                }
            }, 500);
        }
    });

    modal.on('click', function(){
        modal.removeClass('in');
        setTimeout(function () {
            modal.hide(0);
            clearModalStile();

            if(modal.hasClass('modal-contacts')) {
                $(this).find('.modal-content').removeAttr('style');
            }
        }, modal_timeout);
        if(modal.hasClass('modal-service')) {
            modalDestroy();
        }
    });

    function clearModalStile() {
        $('body').removeClass('modal-is-open');
        $('body').removeAttr('style');
        $('body > *').removeAttr('style');
        $('header, footer').removeAttr('style');
    }
}

function showModal(modalId) {

    var w1, w2, deltaW;

    w1 = $(window).width();
    $('body').addClass('lock-scroll');
    w2 = $(window).width();
    $('body').removeClass('lock-scroll');
    deltaW = w2 - w1;

    if(!$(modalId).hasClass('in')){
        if($(modalId).hasClass('modal-service')){


            $('body').addClass('modal-is-open');

            if ( navigator.platform.match(/(MacIntel)/) ) {
                $('body').addClass('mac-os');
            }

            if ( false == $('body').hasClass('touch') ) {
                $('header, footer').css({
                    'right': deltaW
                });
                $("<style type='text/css'>" +
                    ".modal-is-open{margin-right:" + deltaW + "px;}" +
                    ".modal-is-open .page-wrapper:after{width:" + deltaW + "px;}" +
                    ".modal-is-open .customer:before{width: calc(100% - " + deltaW + "px);}" +
                    "</style>").appendTo("head");
            }

            // if( 768 <= $( document ).width() ){
            //     $('body > *').css({'padding-right': '17px'});
            // }
        }
        $(modalId).show(30);
        $(modalId).addClass('in');
    }
}

function modalGetContent(modalClass, modalId) {

    var url = window.wp_data.ajax_url + "?action=load-services";

    if(typeof wp_data.lang !== "undefined"){
        url += '&lang=' + wp_data.lang;
    }

    $.getJSON( url, function(data){
        $.each(data, function(i){
            if ( modalClass == data[i].classname ){
                if(data[i].link === '#'){
                    $('.modal .modal-service-icon a').addClass('no-link');

                    var noLink = $('.no-link');
                    noLink.each(function(i, iterationElement) {
                        $(iterationElement).on('click', function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            return false;
                        });
                    });
                }
                $('.modal .modal-service-icon a').attr( 'href', data[i].link );
                //$('.modal .sprite').addClass( data[i].image );
                $('.modal .h3').html( data[i].title );
                $('.modal p.service-body').html( data[i].massege );
                $('.modal .modal-service-background').html(data[i].background);

                var technologies_li = '';
                data[i].technologies.forEach(function(elem){
                    technologies_li += '<li>' + elem + '</li>';
                });
                $('.modal .modal-service-technologies').html(technologies_li);
            }
        });

        showModal(modalId);

    });
}

function modalDestroy() {
    setTimeout(function () {
        $('.modal .modal-service-icon a').removeClass('no-link');
        $('.modal .modal-service-icon a').attr( 'href', '#' );
        //$('.modal .sprite')[0].className = $('.modal .sprite')[0].className.replace(/\s*\bsprite--\w*\b/gi, '');
        $('.modal .h3').empty();
        $('.modal .h3').empty();
        $('.modal .modal-service-technologies').empty();
        $('.modal .modal-service-background').empty();
    }, 300);
}

function modalPos(modal) {
    if( 768 <= $( document ).width() ){
        var header_h = $('header').outerHeight(),
            trigget = $('.contacts'),
            trigget_pos = trigget.offset().left,
            trigget_w = trigget.outerWidth(),
            modal_w = modal.outerWidth();
        modal.css({
            'top': header_h + 10,
            'left': trigget_pos + trigget_w - modal_w,
            'position': 'absolute'
        });
    } else {
        modal.removeAttr('style');
    }
}

function homePageNav() {
    $('header nav').singlePageNav({
        offset: $('.top').outerHeight(),
        speed: 750,
        easing: 'linear',
        updateHash: true
    });
}

function ishomePage(){
    if($('body').hasClass('home')){
        particles();

        homePageNav();
    }
}

function isSingleNews(){
    if($('body').hasClass('single-news')) {
        particles();
    }
}
