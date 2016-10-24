function RecentItems () {
  String.prototype.replaceAll = function(search, replacement) {
      var target = this;
      return target.split(search).join(replacement);
  };
  var SideNav_Recent = document.getElementsByClassName('SideNav_Recent')[0];
  SideNav_RecentNumber = document.getElementsByClassName('SideNav_RecentNumber')[0];
  function createRecentItem(o) {
    var newItem = document.createElement('li');
    newItem.className = "SideNav_RecentItem";
    newItem.setAttribute('role','menuitem');
    newItem.style.order = o.order;
    if (o.dummy) {
      var c = o.dummy.childNodes;
      var subLinks = [];
      for (var i = 0; i < c.length; i++) {
        var newSubLink = document.createElement('a');
        newSubLink.textContent = c[i].textContent;
        newSubLink.setAttribute('href', c[i].href);
        subLinks.push(newSubLink);
      }
      var subLinkDiv = document.createElement('div');
      subLinkDiv.className = 'Links_SubLinks';
      for (var j = 0; j < subLinks.length; j++) {
        subLinkDiv.appendChild(subLinks[j]);
      }
      newItem.innerHTML = '<p class="SideNav_RecentLink Links_Link--dummy">' +
      o.name + '</p>';
      newItem.appendChild(subLinkDiv);
      var newDate = document.createElement('span');
      newDate.className = 'SideNav_RecentDate';
      newDate.textContent = o.date;
      newItem.appendChild(newDate);
    } else {
      newItem.innerHTML = '<a class="SideNav_RecentLink" href="' +
      o.url + '">' + o.name + '</a> <span class="SideNav_RecentDate">' +
      o.date + '</span>';
    }
    SideNav_Recent.appendChild(newItem);
  }

  var linkElems = document.getElementsByClassName('Links_Link');
  var links = [];
  var now = moment();
  // Figure out the time ago
  for (var i = 0; i < linkElems.length; i++) {
    var linkDate = linkElems[i].getAttribute('data-date');
    var d = linkDate.split('-');
    // Need to minus a 1 from the month as Moment.js
    // treats 0 as Jan and 11 as Dec
    d[1] = d[1] - 1;
    var ago = moment(d).fromNow();
    if (ago.includes('day') && parseInt(ago.substr(0, ago.indexOf(' '))) < 14
    || ago.includes('in') || ago.includes('hour') || ago.includes('a day')) {
      var styleOrder = moment(d).unix() * -1;
      var dummyLinks = linkElems[i].classList.value.includes('Links_Link--dummy') ?
      linkElems[i].nextSibling
      : false;
      links.push({
        name: linkElems[i].textContent,
        url: linkElems[i].href,
        date: ago[0] === 'a' ? 'Yesterday' : ago,
        order: styleOrder,
        dummy: dummyLinks
      });
    }
  }
  // Create the items in recent
  for (var j = 0; j < links.length; j++) {
    createRecentItem(links[j]);
  }
  if (links.length === 0) {
    SideNav_Recent.innerHTML = '<span class="SideNav_RecentNoItems"> \
    Nothing has been added in the last 14 days.</span> \
    <span class="SideNav_RecentNoItems">Don\'t worry! We\'re still updating \
    this repo. We\'re focusing on quality which means links won\'t be added all the time, \
    only when they are required.';
  }
  // Local storage and working out the notification
  if (!localStorage.getItem(recentType)) {
    function linkReducer(acc, val) {
      acc.push({name: val.name, seen: false});
      return acc;
    }
    var reducedLinks = links.reduce(linkReducer, []);
    localStorage.setItem(recentType, JSON.stringify(reducedLinks));
  }
  var ls = JSON.parse(localStorage.getItem(recentType));
  function reducer(acc, val) {
    var matched = false;
    for (var i = 0; i < ls.length; i++) {
    	if (ls[i].name === val.name) {
      	matched = true;
      }
    }
    if (!matched) {
    	acc.push(val);
    }
    return acc;
  }
  var newLinks = links.reduce(reducer, []);
  var oldUnseenLinks = ls.filter(function(item){
  	return item.seen === false;
  });
  unseen = newLinks.concat(oldUnseenLinks);
  localStorage.setItem(recentType, JSON.stringify(ls.concat(newLinks)));
  if (unseen.length > 0) {
    SideNav_RecentNumber.textContent = unseen.length;
    SideNav_RecentNumber.classList.add('SideNav_RecentNumber--visible');
  }
}
