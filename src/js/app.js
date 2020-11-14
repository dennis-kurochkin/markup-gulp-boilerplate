window.addEventListener('DOMContentLoaded', () => {

    /**
     * SVG4everybody set up
     */

    const spriteURL = $('body').data('sprite');
    
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