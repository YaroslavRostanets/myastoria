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
        $('.js-filter-modal.left-side').hide();
        $('h3.js-filter-toggle').on('click', filterCategoryMobileOpen);
        $('.js-close-filter-contain').on('click', filterCategoryMobileClose);
        $('.refinements-wrapper .refinement>div').mCustomScrollbar('destroy');

        $('.checkout-mini-cart').mCustomScrollbar(); //Скролл в оформлении заказа
    }

    function runTablet(){
        // console.log(state.device);
        $('h3.js-filter-toggle').unbind('click', filterCategoryMobileOpen);
        $('.js-close-filter-contain').unbind('click', filterCategoryMobileClose);
        $('.refinements-wrapper .refinement>div').mCustomScrollbar();
        // $('.js-filter-modal.left-side').show();
        // $('.js-filter-toggle').unbind('click', filterOpen);
        // $(document).unbind('mouseup', filterClose);
        //$('.js-filter-toggle').closest('.refinement').addClass('opened');

        $('.checkout-mini-cart').mCustomScrollbar(); //Скролл в оформлении заказа
        $('.js-mini-cart-products, .search-window').mCustomScrollbar(); //Поиск, корзина скролл
    }

    function runDesctop(){
        $('h3.js-filter-toggle').unbind('click', filterCategoryMobileOpen);
        $('.js-close-filter-contain').unbind('click', filterCategoryMobileClose);
        $('.refinements-wrapper .refinement>div').mCustomScrollbar('destroy');
        $('.js-filter-toggle').on('click', filterOpen);
        $(document).on('mouseup', filterClose);

        $('.checkout-mini-cart').mCustomScrollbar(); //Скролл в оформлении заказа
        $('.js-mini-cart-products, .search-window').mCustomScrollbar(); //Поиск, корзина скролл
    }

    $(window).getDevice(768,1024);

    /*--Слайдер в табах Главная --*/
    var tabSliderOptions = {
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        prevArrow: "<a class='arrow prev'><i class='icon-menu-arrow-left'></i></a>",
        nextArrow: "<a class='arrow next'><i class='icon-menu-arrow-right'></i></a>",
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
    };

    $('.tab-slider').slick(tabSliderOptions);

    $('.tabs-slider .one-but').on('click', function(){
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        var activeTab = $(this).attr('data-tab');
        $(activeTab).siblings().hide();
        $(activeTab).show();
        $(activeTab).slick('unslick');
        $(activeTab).slick(tabSliderOptions);
    });

    $('.tabs-slider .one-but.active').click();

    /*--конец Слайдер в табах Главная --*/

    /*--Выбор языка--*/
    (function(){
        $('.js-current-country').on('click', function(){
            $(this).addClass('open');
        });
        $(document).mouseup(function (e) {
            var container = $(".js-current-country");
            if (container.has(e.target).length === 0){
                container.removeClass('open');
            }
        });
    })();
    /*--конец Выбор языка--*/

    /*--форма поиска--*/
    (function(){
        var form = $('.js-search-form-wrap');
        var input = form.find('.js-search-input');
        $('.js-search-icon').on('click', function(e){
            e.preventDefault();
            if(!$(this).closest('.search-form-wrap').hasClass('opened')
                && input.val() == ''){
                form.addClass('opened');
                form.find('.js-search-input').fadeIn(200);
            } else {
                
            }
        });
        $(document).mouseup(function (e) {
            if (form.has(e.target).length === 0){
                form.removeClass('opened');
            }
        });
    })();

    /*--конец Форма поиска--*/

    /*--малая корзинаа--*/
    $('.js-mini-cart-total').hover(function(){
        $('.mini-cart-content').fadeIn(100);
    }, function(){
        $('.mini-cart-content').fadeOut(100);
    });

    /*--конец малая корзина--*/

    /*------------------------*/
    $('.banners-below-nav-wrapper .icon-arrow').on('click', function(){
        $(this).closest('.banners-below-nav-wrapper').toggleClass('open');
    });
    /*------------------------*/

    /*--Моб-меню--*/
    $('.mobile-menu-toggle').on('click', function(){
        $('.js-mobile-menu').addClass('open');
        $('body').addClass('lock');
    });
    $('.js-menu-toggle').on('click', function(){
        $('.js-mobile-menu').removeClass('open');
        $('body').removeClass('lock');
    });
    $('.menu-category .has-submenu > a').on('click', function(e){
        if(state.device = 'mobile'){
            e.preventDefault();
            $(this).closest('.has-submenu').toggleClass('opened');
        }
    });

    $('.menu-vertical h3').on('click', function(e){
        $(this).closest('.menu-vertical').toggleClass('open');

    });
    /*--конец Моб-меню--*/

    /*--Аккордеоны в футере--*/
    $('footer .accordion-item h5').on('click', function(){
        var parent = $(this).closest('.accordion-item');
        if(parent.hasClass('opened')){
            parent.removeClass('opened');
            parent.find('.vertical-menu').slideUp(200);
        } else {
            parent.addClass('opened');
            parent.find('.vertical-menu').slideDown(200);
        }
    });
    /*--конец Аккордеоны в футере--*/

    /*--окно поиска--*/
    $('.search-window').mCustomScrollbar();
    $('.js-search-input').on('input', function(){
        if($(this).val().length > 3){
            $(".search-window").show();
        } else {
            $(".search-window").hide();
        }
    });
    $(document).mouseup(function (e) {
        var container = $(".search-window");
        if (container.has(e.target).length === 0){
            container.hide();
        }
    });
    /*--конец Окно поиска--*/

    /*--styler--*/
    $('[data-styler]').styler();
    /*--конец styler--*/

    /*--каталог Фильтры--*/
    function filterOpen(){
        var parent = $(this).closest('.refinement');
        parent.toggleClass('opened');
        parent.find('.js-filter-contain').toggle();
    }

    function filterClose(e){
        var container = $(".js-filter-contain");
        if (container.has(e.target).length === 0){
            container.hide();
            container.closest('.refinement').removeClass('opened')
        }
    }

    function filterCategoryMobileClose (){
        $(this).closest('.js-filter-contain').hide();
    }

    function filterCategoryMobileOpen (){
        $('.js-filter-contain').hide();
        $(this).siblings('.js-filter-contain').show();
    }

    $('.js-close-modal').on('click', function(){
        $('.js-filter-modal.left-side').hide();
    });
    $('.mobile-refine-by').on('click', function(){
        $('.js-filter-modal.left-side').css({'display':'flex'});
    });

    /*--конец каталог Фильтр--*/

    /*--аккордеон карточка товара--*/
    $('.js-global-accordion-header').on('click', function(){
        var item = $(this).closest('.js-global-accordion-item');
        var tabContent = item.find('.tab-content');
        if(item.hasClass('opened')){
            item.removeClass('opened');
            tabContent.slideUp('.tab-content');
        } else {
            item.siblings().removeClass('opened');
            item.addClass('opened');
            tabContent.slideDown('.tab-content');
            item.siblings().find('.tab-content').slideUp();
        }

    });
    $('.js-global-accordion-header').eq(0).click();

    $(".product-main .product-primary-image img").elevateZoom({
        zoomWindowWidth: 500,
        zoomWindowHeight: 500
    });

    var modalSliderOption = {
        vertical: ( $(window).width() > 1024 ) ? true : false,
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.js-product-primary-image',
        infinite: false,
        arrows: true,
        focusOnSelect: true,
        prevArrow: "<a class='arrow prev'><i class='fa fa-angle-up'></i></a>",
        nextArrow: "<a class='arrow next'><i class='fa fa-angle-down'></i></a>",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            }
        ]
    };
    var modalThumbOption = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: false,
        infinite: false,
        asNavFor: '.product-thumbnails-container',
    };

    $('a.js-open-modal').click(function(event) {
        $(this).modal({
            fadeDuration: 250,
        });
        return false;
    });

    $('.js-size-chart-link').click(function(event) {
        $(this).modal({
            fadeDuration: 250,
        });
        return false;
    });

    $('#modal-buy').on($.modal.OPEN, function(event, modal) {
        $('.js-product-primary-image').slick(modalThumbOption);
        $('.product-thumbnails-container').slick(modalSliderOption);
        $('.js-product-primary-image .slick-current [data-zoom-image]').elevateZoom();
        $('.js-product-primary-image').on('afterChange', function(event, slick, currentSlide, nextSlide){
            $.removeData($('img'), 'elevateZoom');
            $('.zoomContainer').remove();
            $(this).find('.slick-current img').elevateZoom();
        });
    });

    $('#modal-buy').on($.modal.CLOSE, function(event, modal) {
        $('.js-product-primary-image').slick('unslick');
        $('.product-thumbnails-container').slick('unslick');
        $.removeData($('img'), 'elevateZoom');
        $('.zoomContainer').remove();
    });


    var pageSliderOption = {
        vertical: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.product-primary-image-cont',
        infinite: false,
        arrows: true,
        focusOnSelect: true,
        prevArrow: "<a class='arrow prev'><i class='fa fa-angle-up'></i></a>",
        nextArrow: "<a class='arrow next'><i class='fa fa-angle-down'></i></a>",
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    vertical: false
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    vertical: false,
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 860,
                settings: {
                    vertical: false,
                    slidesToShow: 2
                }
            }
        ]
    };
    var pageThumbOption = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: false,
        infinite: false,
        asNavFor: '.prod-thumbnails-container'
    };

    $('.product-primary-image-cont').slick(pageThumbOption);
    $('.prod-thumbnails-container').slick(pageSliderOption);

    var zoomConfig = {
        zoomWindowWidth: 600,
        zoomWindowHeight: 600
    };
    $('.product-primary-image-cont .slick-current img').elevateZoom(zoomConfig);

    $('.product-primary-image-cont').on('afterChange', function (event, slick, currentSlide, nextSlide) {
        $('.zoomContainer').remove();
        $(this).removeData('elevateZoom');
        $(this).removeData('zoomImage');
        $(this).find('.slick-current img').elevateZoom(zoomConfig);
    });
    /*--конец карточка товара--*/

    /*--Вы смотрели/может заинтересовать слайдер --*/

    var stdOptions = {
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        prevArrow: "<a class='arrow prev'><i class='icon-menu-arrow-left'></i></a>",
        nextArrow: "<a class='arrow next'><i class='icon-menu-arrow-right'></i></a>",
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 5
                }
            },
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 885,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 380,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    };

    $('.std-slider').slick(stdOptions);

    $('.tab-label').on('click', function(e){
        e.preventDefault();
        var activeTab = $(this).attr('href');
        $(activeTab).show();
        $(this).addClass('active');
        $(activeTab).siblings().hide();
        $(this).siblings().removeClass('active');
        $('.std-slider').slick('refresh');
    });

    $('.tab-label.active').click();
    /*--конец смотрели/может заинтересовать слайдер--*/

    /*--Личный кабинет табы--*/
    $('.account-nav-content a').on('click', function(e){
        e.preventDefault();
        activeTab = $(this).attr('data-tab-show');
        $(activeTab).siblings().hide();
        $(activeTab).show();
        $(this).parent().siblings().removeClass('active');
        $(this).parent().addClass('active');
    });

    $('.account-nav-content .active a').click();

    $('.js-share-wishlist').on('click', function(){
       $(this).addClass('active');
       $('.social-sharing-panel').show();
    });
    /*--конец Личный кабинет--*/

    /*--оформление заказа--*/
    $('.js-add-comment').on('click', function(){
        $('.js-checkout-comment').show();
    });

    /*--конец Оформление заказа--*/

    /*--подняться на верх--*/
    (function( $ ) {
        $.fn.goToTop = function() {
            var _this = $(this);
            _this.hide();
            $(document).scroll(function(){
                var windowHeigh = $(window).height();
                var contTop = window.pageYOffset ? window.pageYOffset : document.body.scrollTop;
                if (windowHeigh > contTop){
                    _this.fadeOut();
                } else {
                    _this.fadeIn();
                }
            });
            $(this).click(function(){
                var scroll_pos=(0);
                $('html, body').animate({scrollTop:(scroll_pos)}, '2000');
            });
        };
    })(jQuery);

    $('#js-go-to-top').goToTop();
    /*--конец подняться на верх--*/

    /*--Страница поиска слайдер--*/
    $('.js-best-sellers').slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        prevArrow: "<a class='arrow prev'><i class='icon-menu-arrow-left'></i></a>",
        nextArrow: "<a class='arrow next'><i class='icon-menu-arrow-right'></i></a>",
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 885,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 380,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
    /*--конец Страница поиска слайдер--*/

    /*--Фиксированный хедер--*/
    if($('.js-fixed-header').length){
        $(window).on('scroll', function () {
            var headerHeight = $('.js-fixed-header').outerHeight();
            console.log('headerHeight', headerHeight);
            console.log('scroll', $(window).scrollTop());
            if($(window).scrollTop() > headerHeight){
                $('body').addClass('fixed-header');
                $('.js-main').css({
                    'padding-top': headerHeight + 'px'
                })
            } else {
                $('body').removeClass('fixed-header');
                $('.js-main').css({
                    'padding-top': 0 + 'px'
                })
            }
        });
    }

    $(window).resize(function () {
       $(window).scroll();
    });

    $(window).scroll();w
    /*--конец Фиксированый хедер--*/
});