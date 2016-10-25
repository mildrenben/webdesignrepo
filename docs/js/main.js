var unseen;
var recentType;
var path = window.location.pathname;
if (path === '/') {
  recentType = 'wdr_recent_webdesign';
} else if (path === '/frontend.html') {
  recentType = 'wdr_recent_frontend';
} else if (path === '/startups.html') {
  recentType = 'wdr_recent_startups';
}

function EmailSignupPrompt () {
  if (localStorage.getItem('wdr_visits') === null) {
    localStorage.setItem('wdr_visits', 0);
  }

  if (!localStorage.getItem('wdr_subbed')) {
    var lsVisits = localStorage.getItem('wdr_visits');
    localStorage.setItem('wdr_visits', parseInt(lsVisits) + 1);
    if (parseInt(lsVisits) % 5 === 0) {
      var timeout = parseInt(lsVisits) === 0 ? 30000 : 8000;
      setTimeout(function(){
        triggerModal(NewsletterMsg);
      }, timeout);
    }
    var EmailSubCatch = document.getElementsByClassName('EmailSubCatch')[0];
    EmailSubCatch.addEventListener('click', function(){
      localStorage.setItem('wdr_subbed', true);
    });
  }
}

function FuckAdBlockCheck (){
	// Adblock Check
	// Function called if AdBlock is not detected
	function adBlockNotDetected() {

	}
	// Function called if AdBlock is detected
	function adBlockDetected() {
		//var adResponse = document.getElementsByClassName('Links_AdResponse')[0];
	  //adResponse.classList.add('Links_AdResponse--visible');
	}

	// Recommended audit because AdBlock lock the file 'fuckadblock.js'
	// If the file is not called, the variable does not exist 'fuckAdBlock'
	// This means that AdBlock is present
	if(typeof fuckAdBlock === 'undefined') {
		adBlockDetected();
	} else {
		fuckAdBlock.onDetected(adBlockDetected);
		fuckAdBlock.onNotDetected(adBlockNotDetected);
		// and|or
		fuckAdBlock.on(true, adBlockDetected);
		fuckAdBlock.on(false, adBlockNotDetected);
		// and|or
		fuckAdBlock.on(true, adBlockDetected).onNotDetected(adBlockNotDetected);
	}

	// Change the options
	myFuckAdBlock = new FuckAdBlock({
		checkOnLoad: true,
		resetOnEnd: true
	});
}

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

function Modals () {
  var SubmitBtn = document.getElementsByClassName('SideNav_SubmitBtn')[0];
  var SubmitMsg = document.getElementsByClassName('Modal_Message--submit')[0];
  var NewsletterBtn = document.getElementsByClassName('TopBar_SocialLink--newsletter')[0];
  var NewsletterBtnMob = document.getElementsByClassName('TopBar_SocialLink--newsletter')[1];
  var NewsletterMsg = document.getElementsByClassName('Modal_Message--newsletter')[0];
  var SponsorBtn = document.getElementsByClassName('SideNav_SponsorBtn')[0];
  var SponsorMsg = document.getElementsByClassName('Modal_Message--sponsor')[0];
  var AllMsg = document.getElementsByClassName('Modal_Message');
  var Modal = document.getElementsByClassName('Modal')[0];
  var ModalBackdrop = document.getElementsByClassName('Modal_Backdrop')[0];

  function triggerModal(msg) {
    Modal.classList.add('Modal--visible');
    Modal.setAttribute('aria-hidden', false);
    msg.classList.add('Modal_Message--visible');
  }
  SubmitBtn.addEventListener('click', function(){
    triggerModal(SubmitMsg);
  });
  NewsletterBtn.addEventListener('click', function(){
    triggerModal(NewsletterMsg);
  });
  NewsletterBtnMob.addEventListener('click', function(){
    triggerModal(NewsletterMsg);
  });
  SponsorBtn.addEventListener('click', function(){
    triggerModal(SponsorMsg);
  });
  Modal.addEventListener('click', function(e){
    if (e.target.classList.contains('Modal_Backdrop')
    || e.target.classList.contains('fa-times')) {
      Modal.classList.remove('Modal--visible');
      Modal.setAttribute('aria-hidden', true);
      setTimeout(function(){
        for (var i = 0; i < AllMsg.length; i++) {
          if (AllMsg[i].classList.contains('Modal_Message--visible')) {
            AllMsg[i].classList.remove('Modal_Message--visible');
          }
        }
      }, 200);
    }
  });
}

function MultiLinks () {
  var multiLinks = document.getElementsByClassName('Links_Link--dummy');
  for (var i = 0; i < multiLinks.length; i++) {
    multiLinks[i].addEventListener('click', function(event){
      this.nextSibling.classList.toggle('Links_SubLinks--visible');
    });
  }
};

function Notification () {
  var Notification_Close = document.getElementsByClassName('Notification_Close')[0];
  var Notification = document.getElementsByClassName('Notification')[0];
  if (localStorage.getItem('wdr_notification_first_hidden')) {
    Notification.classList.add('Notification--hidden');
  }
  Notification_Close.addEventListener('click', function(){
    Notification.classList.add('Notification--hidden');
    localStorage.setItem('wdr_notification_first_hidden', true);
  });
}

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

window.onload = function () {
  RecentItems();
  SideNavTabs();
  Modals();
  SmoothScrollAnchor();
  MultiLinks();
  Notification();
  MobileMenu();
  MobileCategoryHeader();
  FuckAdBlock();
  FuckAdBlockCheck();
}

function FuckAdBlock () {
	var FuckAdBlock = function(options) {
		this._options = {
			checkOnLoad:		false,
			resetOnEnd:			false,
			loopCheckTime:		50,
			loopMaxNumber:		5,
			baitClass:			'pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links',
			baitStyle:			'width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;',
			debug:				false
		};
		this._var = {
			version:			'3.2.1',
			bait:				null,
			checking:			false,
			loop:				null,
			loopNumber:			0,
			event:				{ detected: [], notDetected: [] }
		};
		if(options !== undefined) {
			this.setOption(options);
		}
		var self = this;
		var eventCallback = function() {
			setTimeout(function() {
				if(self._options.checkOnLoad === true) {
					if(self._options.debug === true) {
						self._log('onload->eventCallback', 'A check loading is launched');
					}
					if(self._var.bait === null) {
						self._creatBait();
					}
					setTimeout(function() {
						self.check();
					}, 1);
				}
			}, 1);
		};
		if(window.addEventListener !== undefined) {
			window.addEventListener('load', eventCallback, false);
		} else {
			window.attachEvent('onload', eventCallback);
		}
	};
	FuckAdBlock.prototype._options = null;
	FuckAdBlock.prototype._var = null;
	FuckAdBlock.prototype._bait = null;

	FuckAdBlock.prototype._log = function(method, message) {
		console.log('[FuckAdBlock]['+method+'] '+message);
	};

	FuckAdBlock.prototype.setOption = function(options, value) {
		if(value !== undefined) {
			var key = options;
			options = {};
			options[key] = value;
		}
		for(var option in options) {
			this._options[option] = options[option];
			if(this._options.debug === true) {
				this._log('setOption', 'The option "'+option+'" he was assigned to "'+options[option]+'"');
			}
		}
		return this;
	};

	FuckAdBlock.prototype._creatBait = function() {
		var bait = document.createElement('div');
			bait.setAttribute('class', this._options.baitClass);
			bait.setAttribute('style', this._options.baitStyle);
		this._var.bait = window.document.body.appendChild(bait);

		this._var.bait.offsetParent;
		this._var.bait.offsetHeight;
		this._var.bait.offsetLeft;
		this._var.bait.offsetTop;
		this._var.bait.offsetWidth;
		this._var.bait.clientHeight;
		this._var.bait.clientWidth;

		if(this._options.debug === true) {
			this._log('_creatBait', 'Bait has been created');
		}
	};
	FuckAdBlock.prototype._destroyBait = function() {
		window.document.body.removeChild(this._var.bait);
		this._var.bait = null;

		if(this._options.debug === true) {
			this._log('_destroyBait', 'Bait has been removed');
		}
	};

	FuckAdBlock.prototype.check = function(loop) {
		if(loop === undefined) {
			loop = true;
		}

		if(this._options.debug === true) {
			this._log('check', 'An audit was requested '+(loop===true?'with a':'without')+' loop');
		}

		if(this._var.checking === true) {
			if(this._options.debug === true) {
				this._log('check', 'A check was canceled because there is already an ongoing');
			}
			return false;
		}
		this._var.checking = true;

		if(this._var.bait === null) {
			this._creatBait();
		}

		var self = this;
		this._var.loopNumber = 0;
		if(loop === true) {
			this._var.loop = setInterval(function() {
				self._checkBait(loop);
			}, this._options.loopCheckTime);
		}
		setTimeout(function() {
			self._checkBait(loop);
		}, 1);
		if(this._options.debug === true) {
			this._log('check', 'A check is in progress ...');
		}

		return true;
	};
	FuckAdBlock.prototype._checkBait = function(loop) {
		var detected = false;

		if(this._var.bait === null) {
			this._creatBait();
		}

		if(window.document.body.getAttribute('abp') !== null
		|| this._var.bait.offsetParent === null
		|| this._var.bait.offsetHeight == 0
		|| this._var.bait.offsetLeft == 0
		|| this._var.bait.offsetTop == 0
		|| this._var.bait.offsetWidth == 0
		|| this._var.bait.clientHeight == 0
		|| this._var.bait.clientWidth == 0) {
			detected = true;
		}
		if(window.getComputedStyle !== undefined) {
			var baitTemp = window.getComputedStyle(this._var.bait, null);
			if(baitTemp && (baitTemp.getPropertyValue('display') == 'none' || baitTemp.getPropertyValue('visibility') == 'hidden')) {
				detected = true;
			}
		}

		if(this._options.debug === true) {
			this._log('_checkBait', 'A check ('+(this._var.loopNumber+1)+'/'+this._options.loopMaxNumber+' ~'+(1+this._var.loopNumber*this._options.loopCheckTime)+'ms) was conducted and detection is '+(detected===true?'positive':'negative'));
		}

		if(loop === true) {
			this._var.loopNumber++;
			if(this._var.loopNumber >= this._options.loopMaxNumber) {
				this._stopLoop();
			}
		}

		if(detected === true) {
			this._stopLoop();
			this._destroyBait();
			this.emitEvent(true);
			if(loop === true) {
				this._var.checking = false;
			}
		} else if(this._var.loop === null || loop === false) {
			this._destroyBait();
			this.emitEvent(false);
			if(loop === true) {
				this._var.checking = false;
			}
		}
	};
	FuckAdBlock.prototype._stopLoop = function(detected) {
		clearInterval(this._var.loop);
		this._var.loop = null;
		this._var.loopNumber = 0;

		if(this._options.debug === true) {
			this._log('_stopLoop', 'A loop has been stopped');
		}
	};

	FuckAdBlock.prototype.emitEvent = function(detected) {
		if(this._options.debug === true) {
			this._log('emitEvent', 'An event with a '+(detected===true?'positive':'negative')+' detection was called');
		}

		var fns = this._var.event[(detected===true?'detected':'notDetected')];
		for(var i in fns) {
			if(this._options.debug === true) {
				this._log('emitEvent', 'Call function '+(parseInt(i)+1)+'/'+fns.length);
			}
			if(fns.hasOwnProperty(i)) {
				fns[i]();
			}
		}
		if(this._options.resetOnEnd === true) {
			this.clearEvent();
		}
		return this;
	};
	FuckAdBlock.prototype.clearEvent = function() {
		this._var.event.detected = [];
		this._var.event.notDetected = [];

		if(this._options.debug === true) {
			this._log('clearEvent', 'The event list has been cleared');
		}
	};

	FuckAdBlock.prototype.on = function(detected, fn) {
		this._var.event[(detected===true?'detected':'notDetected')].push(fn);
		if(this._options.debug === true) {
			this._log('on', 'A type of event "'+(detected===true?'detected':'notDetected')+'" was added');
		}

		return this;
	};
	FuckAdBlock.prototype.onDetected = function(fn) {
		return this.on(true, fn);
	};
	FuckAdBlock.prototype.onNotDetected = function(fn) {
		return this.on(false, fn);
	};

	window.FuckAdBlock = FuckAdBlock;

	if(window.fuckAdBlock === undefined) {
		window.fuckAdBlock = new FuckAdBlock({
			checkOnLoad: true,
			resetOnEnd: true
		});
	}
};
