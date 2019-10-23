$(function () {

    /**
     * svg4everybody
     */

    svg4everybody();


    /**
     * Magnific popups
     **/

    $('.js-open-popup-link').magnificPopup({
        type: 'inline',
        fixedContentPos: false,
        fixedBgPos: true,
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-slide-bottom',
        closeMarkup: '<button title="%title%" type="button" class="mfp-close cmn-popup__close-btn">×</button>'
    });


    /**
     * Slick slider
     */

    $('.js-test-slider').slick({
        slidesToShow: 3,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        dots: false,
        appendArrows: $('.js-otdelka-slider-nav'),
        nextArrow: '<button type="button" class="slick-next"><svg class="icon-svg icon-13"><use xlink:href="images/sprite.svg#13"></use></svg></button>',
        prevArrow: '<button type="button" class="slick-prev"><svg class="icon-svg icon-14"><use xlink:href="images/sprite.svg#14"></use></svg></button>',
        responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });


    /**
     * To-top Button
     */

    $('.js-totop-btn').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, '500');
    });


    /**
     * Hamburger menu
     */

    $('.js-hamburger').click(function () {
        $('.mobileMenu').toggleClass('active');
    });


    /**
     * E-mail Ajax Send
     */

    $('.form__popup').submit(function () {
        var th = $(this);
        afterTxt = $(th).find('.success');
        $.ajax({
            type: 'POST',
            url: 'mail.php',
            data: th.serialize()
        }).done(function () {
            $(afterTxt).addClass('form__success_visible');
            setTimeout(function () {
                th.trigger('reset');
                $(afterTxt).removeClass('form__success_visible');
                $.magnificPopup.close();
            }, 3000);
        });
        return false;
    });

});