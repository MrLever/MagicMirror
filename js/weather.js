initWeather()
//api.openweathermap.org/data/2.5/weather?id=2172797
function initWeather(){
	if(SETTINGS.DEBUG == 1)
		console.log("--- BEGIN WEATHER MODULE ---");
	jQuery.get('/keys/weather.key', function(key){
		$.getJSON("/config.json", function(config) {
			if(SETTINGS.DEBUG == 1){
				console.log('Calling Weather API...');
				console.log("City ID: " + SETTINGS.weather.cityID);
				console.log("Units: " + SETTINGS.weather.units);
				console.log("Final call: " + "http://api.openweathermap.org/data/2.5/weather?id=" +
					SETTINGS.weather.cityID + "&units=" + SETTINGS.weather.units + "&mode=json&appid=" + key)
			}
			/* Leave mode as XML even when request in json? */
			fetchFeed("http://api.openweathermap.org/data/2.5/weather?id=" + SETTINGS.weather.cityID + "&units=" + SETTINGS.weather.units +
				"&mode=xml&appid=" + key, "json", weather);
			if(SETTINGS.DEBUG == 1)
				console.log("- End Weather Init -");
			/* fetchFeed("http://api.openweathermap.org/data/2.5/weather?q=Dunedin,us&units=imperial&mode=xml&appid="+key,"json",weatherprocess); */
		});
	});
}
function weather(data){
	var loc = "TR";
	if(SETTINGS.DEBUG == 1)
		console.log(JSON.stringify(data));
	/* Make a switch for various weather layouts selected by config mode setting. */

	switch(SETTINGS.weather.mode){
		case 0:
		default:
		/* Minimal MODE: 0*/
		document.getElementById(loc).innerHTML =
		"<div class='weatherWrappper'>" +
			"<span class='city'>" +

				data.query.results.current.city.name +
				"</span>" +
				"<span class='temp'>" +
				data.query.results.current.temperature.value + "&deg;" +

			"</span>" +
			"<span class='weatherIco'><img src='" + fetchImage(data.query.results.current.weather.icon) + "'/>";

	}
}
function fetchImage(imgCode, weatherID){
	var url;
	switch(imgCode){
		case "01d":
			url = "images/weather/01d.png";
			break;
		case "01n":
			url = "images/weather/01n.png";
			break;
		case "02d":
			url = "images/weather/02d.png";
			break;
		case "02n":
			url = "images/weather/02n.png";
			break;
		case "03d":
			url = "images/weather/03d.png";
			break;
		case "03n":
			url = "images/weather/03n.png";
			break;
		case "04d":
			url = "images/weather/04d.png";
			break;
		case "04n":
			url = "images/weather/04n.png";
			break;
		case "09d":
			url = "images/weather/09d.png";
			break;
		case "09n":
			url = "images/weather/09n.png";
			break;
		case "10d":
			url = "images/weather/10d.png";
			break;
		case "10n":
			url = "images/weather/10n.png";
			break;
		case "11d":
			url = "images/weather/11d.png";
			break;
		case "11n":
			url = "images/weather/11n.png";
			break;
		case "13d":
			url = "images/weather/13d.png";
			break;
		case "13n":
			url = "images/weather/13n.png";
			break;
		case "50d":
			url = "images/weather/50d.png";
			break;
		case "50n":
			url = "images/weather/50n.png";
			break;
		default:
			url = "images/weather/01d.png";
			console.log("--- ERR: WEATHER ICO NOT FOUND. ---");
			break;
	}
	/* Override for severe weather */
	switch(weatherID){
		case (900):
			url = "images/weather/900.png";
			break;
		case (901):
			url = "images/weather/901.png";
			break;
		case (902):
			url = "images/weather/902.png";
			break;
		case (906):
			url = "images/weather/902.png";
			break;
		default:
			break;
	}
	return url;
}
