function MobileMenu () {
  var Hamburger = document.getElementsByClassName('TopBar_Hamburger')[0];
  var SideNav = document.getElementsByClassName('SideNav')[0];
  var SideNavBackdrop = document.getElementsByClassName('SideNav_Backdrop')[0];
  function toggleSideNav() {
    SideNav.classList.toggle('SideNav--visible');
    SideNavBackdrop.classList.toggle('SideNav_Backdrop--visible');
  }
  Hamburger.addEventListener('click', function(){
    toggleSideNav();
  });

  SideNavBackdrop.addEventListener('click', function(){
    toggleSideNav();
  });
}
