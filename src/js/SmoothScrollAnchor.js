function SmoothScrollAnchor() {
  var Hamburger = document.getElementsByClassName('TopBar_Hamburger')[0];
  var SideNav = document.getElementsByClassName('SideNav')[0];
  var SideNavBackdrop = document.getElementsByClassName('SideNav_Backdrop')[0];
  function toggleSideNav() {
    SideNav.classList.toggle('SideNav--visible');
    SideNavBackdrop.classList.toggle('SideNav_Backdrop--visible');
  }
  // Smooth Scrolling Anchor Links
  $('a[href^="#"]').click(function(e) {
      e.preventDefault();
      // calculate destination place
      var scrollDest = $(this.hash)[0].offsetTop - 70;

      if($(window).width() < 600) {
          toggleSideNav();
      }

      // go to destination
      $('.Links').animate({
          scrollTop: scrollDest
      }, 500, 'swing');
  });
};
