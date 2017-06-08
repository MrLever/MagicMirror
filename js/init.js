var CONFIG;
function initialload(){
	var request = new XMLHttpRequest();
	request.open("GET", "/config.json", false);
	request.send(null)
	window.CONFIG = JSON.parse(request.responseText);
	for(i = 0;i < CONFIG.scripts.length;i++){
		var imported = document.createElement('script');
		imported.src = '/js/'.concat(window.CONFIG.scripts[i]).concat('.js');
		imported.onload = function () {
			console.log("loaded script");
		};
		console.log('/js/'.concat(window.CONFIG.scripts[i]).concat('.js'));
		document.head.appendChild(imported);
	}
}
