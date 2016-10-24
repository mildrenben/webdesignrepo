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
