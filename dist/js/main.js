$(document).ready(function(){
    /*--Определение двайса--*/
    var state = {
        _device: "",
        _mobInit: function(){
            runMobile();
        },
        _tabletInit: function() {
            runTablet();
        },
        _descInit: function() {
            runDesctop();
        },
        _preWindowWidth: $(window).width(),
        _windowIncreases: function() {
            if(state._preWindowWidth > $(window).width()){
                state._preWindowWidth = $(window).width();
                return false;
            } else if (state._preWindowWidth < $(window).width()){
                state._preWindowWidth = $(window).width();
                return true;
            }
        }
    };

    (function( $ ) {
        $.fn.getDevice = function(braikPointMob,braikPointTablet) {
            Object.defineProperty(state, "device", {

                get: function() {
                    return this._device;
                },

                set: function(value) {
                    this._device = value;
                    if(value == "desctop"){
                        state._descInit();

                    } else if (value == "tablet"){
                        state._tabletInit();
                    } else if (value == "mobile"){
                        state._mobInit();
                    }
                }
            });

            $(this).on("resize load", function(){
                if($(this).width() < braikPointMob && state.device != "mobile"){
                    state.device = "mobile";
                } else if($(this).width() > braikPointMob && $(this).width() < braikPointTablet && state.device != "tablet") {
                    state.device = "tablet";
                }
                else if ($(this).width() > braikPointTablet && state.device != "desctop") {
                    state.device = "desctop";
                }
            });
        };
    })(jQuery);

    function runMobile(){

    }

    function runTablet(){

    }

    function runDesctop(){

    }

    $(window).getDevice(768,1200);




    /*--styler--*/
    $('[data-styler]').styler();
    /*--конец styler--*/

    $('.js-read-more').on('click', function () {
        var parent = $(this).closest('.seo-text').find('.text-in');
        var toggle = $(this).attr('data-toggle');
        if(parent.hasClass('open')){
            parent.removeClass('open');
        } else {
            parent.addClass('open');
        }

        $(this).attr('data-toggle', $(this).text());
        $(this).text( toggle );

    });

    $('.js-rank-set .fa').hover(function(){
        var rankValue = $(this).attr('data-value');
        var rankCol = $(this).parent().children();
        rankCol.each(function (i,item) {
            if( $(item).attr('data-value') <= rankValue ){
                $(item).addClass('selected');
                $(item).parent().attr('data-hoverRank',rankValue);
            } else {
                $(item).removeClass('selected');
            }
        });
    });

    $('.js-rank-set').on('click', function(){
        $(this).attr('data-rank', $(this).attr('data-hoverRank'));
    });

    $('.js-rank-set').mouseleave(function(){
        var rankCol = $(this).children();
        var rank = $(this).attr('data-rank');

        rankCol.each(function(i, item){
            if( $(item).attr('data-value') <= rank ){
                $(item).addClass('selected');
            } else {
                $(item).removeClass('selected');
            }
        });
    });


    $('.js-more-review').on('click', function(){
        var wrap = $('.reviews-view');
        //wrap.toggleClass('hided');
        wrap.find('.one-review').show();
    });

    $('.js-site-menu > li').hover(function () {
        $(this).addClass('open');
        $(this).find('.menu-dropdown').fadeIn(100);
    }, function(){
        $(this).removeClass('open');
        $(this).find('.menu-dropdown').fadeOut(100);
    });

    $('.menu-dropdown > li').hover(function(){
        $(this).find('.menu-dropdown-in').css("display", "flex")
            .hide()
            .fadeIn(100);
        $('.menu-dropdown-in').each(function(i, item){
            var height = $(item).height();
            var childrenHeight = 0;
            var itemWidth = $(item).children('li').outerWidth();
            $(item).children('li').each(function(i, li){
                childrenHeight += +$(li).height();
            });
            $(this).css({
                'width': itemWidth * Math.ceil(childrenHeight / height) + 40 + 'px'
            });
        });
    }, function () {
        $(this).find('.menu-dropdown-in').fadeOut(100);
    });

    $('.js-open-search').on('click', function () {
        $(this).closest('.search').find('.search-form').fadeToggle(100);
    });

    (function($){
        $(window).on("load",function(){
            $('.search-result, .js-checkout-list, .products-list').mCustomScrollbar();

        });
    })(jQuery);

    $(document).mouseup(function (e) {
        var container = $(".search-result");
        if (container.has(e.target).length === 0){
            container.hide();
        }
    });

    $('.js-menu-btn').on('click', function(){
        var template = '<div class="menu-bg"></div>';
        function menuClose() {
            $('.js-menu-btn').removeClass('opened');
            $('.mobile-menu').fadeOut(100);
            $('.menu-bg').remove();
            $('body').removeClass('lock');
        }
        if( $(this).hasClass('opened') ){
            menuClose();
        } else {
            $(this).addClass('opened');
            $('body').addClass('lock');
            $('.mobile-menu').fadeIn(100);
            $('main').append(template);
            $('.menu-bg').click(function(){
                menuClose();
            });
        }
    });

    $('.menu-first-level .menu-mobile-in a').on('click', function(){
        var item = $(this).closest('li');

        if( item.find('.second-level-contain').length ) {
            var html = item.find('.second-items').clone(true);

            $('.mobile-second-level-in').html('').append(html);
            setTimeout(function(){
                $('.menu-first-level').animate({
                    opacity: 0,
                    marginLeft: '-50px'
                }, 'slow', 'linear', function() {
                    $('.mobile-second-level').attr('style','');
                    $(this).hide();
                });
            },300);
        }
    });

    $('.mobile-second-level .back-btn').on('click', function(){
        $('.mobile-second-level').animate({
            opacity: 0,
            marginLeft: '50px'
        }, 'slow', 'linear', function() {
            $('.menu-first-level').attr('style','');
        });
    });

    $('.second-level-contain .second-items>li>a').on('click', function () {
        var item = $(this).closest('li');

        if( item.find('.third-level-contain').length ){
            var html = item.find('.item-list').clone(true);
            $('.mobile-third-level-in').html('').append(html);
            setTimeout(function(){
                $('.mobile-second-level').animate({
                    opacity: 0,
                    marginLeft: '-50px'
                }, 'slow', 'linear', function() {
                    $('.mobile-third-level').attr('style','');
                    $(this).hide();
                });
            },300);
        }
    });

    $('.mobile-third-level .back-btn').on('click', function(){
        $('.mobile-third-level').animate({
            opacity: 0,
            marginLeft: '50px'
        }, 'slow', 'linear', function() {
            $('.mobile-second-level').attr('style','');
        });
    });

    $('.mobile-add-review').on('click', function(){
       $(this).hide();
       $('.add-review').fadeIn(100);
    });

    $('.js-delivery').change(function () {
        if( $(this).val() == 'COURIER' ){
            $('.delivery-type').hide();
            $('.courier-cont').show();
        } else if ( $(this).val() == 'PICKUP' ) {
            $('.delivery-type').hide();
            $('.pickup-cont').show();
        } else if ( $(this).val() == 'IN_UKRAINE' ) {
            $('.delivery-type').hide();
            $('.in-ukraine-cont').show();
        }
    });
    $('.js-delivery').change();

    $('.js-add-comment').on('click', function(){
        var variant = $(this).attr('data-variant');

        if ( $(this).hasClass('opened') ) {
            $(this).removeClass('opened');
            $(this).attr('data-variant', $(this).text() );
            $(this).text( variant );
            $(this).closest('.comment-wrap').find('.comment-text').fadeOut();
        } else {
            $(this).addClass('opened');
            $(this).attr('data-variant', $(this).text() );
            $(this).text( variant );
            $(this).closest('.comment-wrap').find('.comment-text').fadeIn();
        }
    });

    $('.js-add-promo').on('click', function(){
        $(this).closest('.promo-wrap').find('.add-promo-wrap').fadeIn();
    });

    var $date = $('.docs-date');

    $('.js-mask').val('+38-0');
    $('.js-mask').mask('+38-099-999-99-99');

    $('.home-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<a href="javascript:void(0)" class="arrow prev-arrow"></a>',
        nextArrow: '<a href="javascript:void(0)" class="arrow next-arrow"></a>',
        dots: true,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: false
    });

});