function SmoothScrollAnchor() {
  // Smooth Scrolling Anchor Links
  $('a[href^="#"]').click(function(e) {
      e.preventDefault();
      // calculate destination place
      var scrollDest = $(this.hash)[0].offsetTop - 70;

      if($(window).width() < 760) {
          toggleSideNav();
      }

      // go to destination
      $('.Links').animate({
          scrollTop: scrollDest
      }, 500, 'swing');
      var currentPath = window.location.href;
      if (currentPath.includes('#')) {
        currentPath = currentPath.substr(0, currentPath.indexOf('#'));
      }
      history.pushState({}, '', currentPath + $(this).attr("href"));
  });
};
