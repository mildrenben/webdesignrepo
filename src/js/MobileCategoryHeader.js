function MobileCategoryHeader() {
  if(window.innerWidth < 600) {
    // Mobile Category Nav
    var MobCats = document.getElementsByClassName('TopBar_Categories')[0];
    var LinksCats = document.getElementsByClassName('Links_Cat');
    var Links = document.getElementsByClassName('Links')[0];
    var LinksCatsTop = [];
    for (var i = 0; i < LinksCats.length; i++) {
      LinksCatsTop.push(LinksCats[i].getBoundingClientRect().top - 120);
    }

    function currentCat() {
      var LinksTop = Links.scrollTop;
      var ans = 0;
      for (var i = LinksCatsTop.length - 1; i >= 0; i--) {
        if (LinksCatsTop[i] < LinksTop) {
          ans = i;
          break;
        }
      }
      return ans;
    }

    $('.Links').on('scroll', function() {
      var CurrentCat = currentCat();
      MobCats.style.transform = 'translateY(-' + CurrentCat * 48 + 'px)';
    });
  }
};
