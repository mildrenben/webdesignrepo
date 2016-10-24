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
