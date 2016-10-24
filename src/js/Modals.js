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
