var CONFIG;
function initialload(){
	var request = new XMLHttpRequest();
	request.open("GET", "/config.json", false);
	request.send(null)
	window.CONFIG = JSON.parse(request.responseText);
	for(i = 0;i < CONFIG.modules.length;i++){
		var imported = document.createElement('script');
		imported.src = '/js/'.concat(window.CONFIG.modules[i]).concat('.js');
		imported.onload = function () {
			console.log("--- MODULE ADDED ---" );
		};
		console.log('/js/'.concat(window.CONFIG.modules[i]).concat('.js'));
		document.head.appendChild(imported);
	}
}
