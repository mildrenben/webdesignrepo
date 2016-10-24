function SideNavTabs () {
  var SideNavTabs = document.getElementsByClassName('SideNav_Tabs')[0];
  var Tab1 = document.getElementById('tab-1');
  var Tab2 = document.getElementById('tab-2');
  var Panel1 = document.getElementById('panel-1');
  var Panel2 = document.getElementById('panel-2');
  Tab1.addEventListener('click',function(){
    if (SideNavTabs.classList.contains('SideNav_Tabs--tab2')) {
      SideNavTabs.classList.remove('SideNav_Tabs--tab2');
      SideNavTabs.classList.add('SideNav_Tabs--tab1');
      Panel1.classList.add('SideNav_Panel--visible');
      Panel2.classList.remove('SideNav_Panel--visible');
      Panel1.setAttribute('aria-hidden', false);
      Panel2.setAttribute('aria-hidden', true);
    }
  });
  Tab2.addEventListener('click',function(){
    if (SideNavTabs.classList.contains('SideNav_Tabs--tab1')) {
      SideNavTabs.classList.remove('SideNav_Tabs--tab1');
      SideNavTabs.classList.add('SideNav_Tabs--tab2');
      Panel1.classList.remove('SideNav_Panel--visible');
      Panel2.classList.add('SideNav_Panel--visible');
      Panel1.setAttribute('aria-hidden', true);
      Panel2.setAttribute('aria-hidden', false);
      var ls = JSON.parse(localStorage.getItem(recentType));
      for (var y = 0; y < ls.length; y++) {
        ls[y].seen = true;
      }
      localStorage.setItem(recentType, JSON.stringify(ls));
      SideNav_RecentNumber.textContent = '';
      SideNav_RecentNumber.classList.remove('SideNav_RecentNumber--visible');
      if (unseen.length > 0) {
        var SideNav_RecentItems = document.getElementsByClassName('SideNav_RecentItem');
        for (var a = 0; a < SideNav_RecentItems.length; a++) {
          var isUnseen = false;
          unseen.map(function(item) {
            if (SideNav_RecentItems[a].firstChild.textContent === item.name) {
              isUnseen = true;
            }
          });
          if (isUnseen) {
            SideNav_RecentItems[a].classList.add('SideNav_RecentItem--unseen');
          }
        }
      }
    }
  });
};
