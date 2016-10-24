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
