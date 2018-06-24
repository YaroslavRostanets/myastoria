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

    $(window).getDevice(768,1024);




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
        $(this).text( $(this).attr('data-toggle') );
        $(this).attr('data-toggle', toggle)
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
            console.log(Math.ceil(childrenHeight / height));
        });
    }, function () {
        $(this).find('.menu-dropdown-in').fadeOut(100);
    });

    $('.js-open-search').on('click', function () {
        $(this).closest('.search').find('.search-form').fadeToggle(100);
    });

    (function($){
        $(window).on("load",function(){
            $('.search-result').mCustomScrollbar();
        });
    })(jQuery);

    $(document).mouseup(function (e) {
        var container = $(".search-result");
        if (container.has(e.target).length === 0){
            container.hide();
        }
    });

});