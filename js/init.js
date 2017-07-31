/* SETTINGS IS A GLOBAL VARIABLE ALL SCRIPTS REFERENCE. DON'T FUCK WITH IT LUKE */
var SETTINGS;

function initialload(){
jQuery.get("/config.json",function(json){
	window.SETTINGS=JSON.parse(json);
	loadFiles();
});
}
function loadFiles(){
	for(i = 0;i < SETTINGS.modules.length;i++){
		/* Add CSS */
		var link = document.createElement('link');
		link.setAttribute('rel', 'stylesheet');
		link.type = 'text/css';
		link.href = '/css/' + window.SETTINGS.modules[i] + '.css';
		document.head.appendChild(link);

		/* Add JS */
		var imported = document.createElement('script');
		imported.src = '/js/'.concat(window.SETTINGS.modules[i]).concat('.js');
		imported.onload = function () {

		};
		if(SETTINGS.DEBUG == 1)
			console.log('/js/'.concat(window.SETTINGS.modules[i]).concat('.js'));
		document.head.appendChild(imported);
	}
}
