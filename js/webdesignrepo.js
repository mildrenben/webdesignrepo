/*!
 * webdesignrepo.com
 */
$(document).ready(function() {
    $('nav').meanmenu();

    // Click event for any anchor tag that's href starts with #
    $('a[href^="#"]').click(function(e) {
        e.preventDefault();
        // calculate destination place
        var scrollDest = $(this.hash)[0].offsetTop;

        if($(window).width() < 960) {
            console.log("window is less than 960px");
            scrollDest -= 60;
        }

        // go to destination
        $('.main-content').animate({
            scrollTop: scrollDest
        }, 650, 'swing');
    });

    $('#inline-popups, #info-modal').magnificPopup({
        delegate: 'a',
        removalDelay: 500, //delay removal by X to allow out-animation
        callbacks: {
            beforeOpen: function() {
                this.st.mainClass = this.st.el.attr('data-effect');
            }
        },
        midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
    });

    $('.open_all_links').on('click', function() {
        var $links = $('ul[category=' + $(this).attr('category') + '] li a');

        $links.on('click', function() {
            window.open($(this).attr('href'));
        });

        $.each($links, function() {
            $(this).trigger('click');
        });

        return false;
    });
});
