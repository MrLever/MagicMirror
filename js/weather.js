var SETTINGS;
initWeather()
//api.openweathermap.org/data/2.5/weather?id=2172797
function initWeather(){
	console.log("---BEGIN WEATHER MODULE---");
	jQuery.get('/keys/weather.key', function(key){
		$.getJSON("/config.json", function(config) {
			SETTINGS = config.weather;
			console.log('Calling Weather API...');
			console.log("City ID: " + SETTINGS.cityID);
			console.log("Units: " + SETTINGS.units);
			//console.log("Final call: " + "http://api.openweathermap.org/data/2.5/weather?id=" + SETTINGS.cityID + "&units=" + SETTINGS.units + "&mode=json&appid=" + key, "json", weather)
			fetchFeed("http://api.openweathermap.org/data/2.5/weather?id=" + SETTINGS.cityID + "&units=" + SETTINGS.units + "&mode=json&appid=" + key, "json", weather);
			console.log("- End Weather Init -");
			/* fetchFeed("http://api.openweathermap.org/data/2.5/weather?q=Dunedin,us&units=imperial&mode=xml&appid="+key,"json",weatherprocess); */
		});
	});
}
function weather(data){
	var loc = "TR";
	console.log(JSON.stringify(data));
	//document.getElementById(loc).innerHTML = "<div class='weatherWrappper'> <span class='temp'>" + data.main.temp + "</span>";
	console.log("--- END WEATHER MODULE ---");
}
function fetchImage(imgCode){
	var url;
	/* Process accordingly */
	return url;
}