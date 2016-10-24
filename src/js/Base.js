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
