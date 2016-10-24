function MultiLinks () {
  var multiLinks = document.getElementsByClassName('Links_Link--dummy');
  for (var i = 0; i < multiLinks.length; i++) {
    multiLinks[i].addEventListener('click', function(event){
      this.nextSibling.classList.toggle('Links_SubLinks--visible');
    });
  }
};
