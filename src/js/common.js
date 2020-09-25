$(function () {

    alert('dfdf');

    /**
     * SVG4everybody set up
     */

    var spriteURL = $('body').data('sprite');
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
        removalDelay: 500,
        mainClass: 'my-mfp-slide-bottom',
        closeMarkup: '<button title="Закрыть (ESC)" type="button" class="mfp-close popup__close-btn">×</button>',
        callbacks: {
            beforeOpen: function () {
                this.st.mainClass = 'mfp-zoom-out';
            }
        }
    });


    /**
     * Slick slider
     */

    $('.js-slider').slick({
        slidesToShow: 3,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        dots: false,
        prevArrow: '<button type="button" class="btn-slick slick-prev"><svg class="icon-svg icon-14"><use xlink:href="' + spriteURL + '#14"></use></svg></button>',
        nextArrow: '<button type="button" class="btn-slick slick-next"><svg class="icon-svg icon-13"><use xlink:href="' + spriteURL + '#13"></use></svg></button>',
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

    $('.js-to-top-btn').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, '500');
    });


    /**
     * Smooth Scroll to Anchor
     */

    $(document).on('click', 'a.js-anchor-link', function (e) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 700);
    });

});