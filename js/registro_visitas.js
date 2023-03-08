if ((typeof swRegVisitas == 'undefined')||(swRegVisitas == 0)){

	swRegVisitas = 1;
	var strSRChead = document.getElementsByTagName('HEAD')[0];  
	var scriptRV = document.createElement('script');
	scriptRV.setAttribute('type', 'text/javascript');
	scriptRV.setAttribute('src', '//assets.adobedtm.com/launch-EN2b1e36bbb6d548dfa15c1b55cb71b120.min.js');
	strSRChead.appendChild(scriptRV);

}