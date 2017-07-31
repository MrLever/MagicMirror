/* Credit to Alessio Atzeni for weather icons: 
	http://www.alessioatzeni.com/meteocons/
*/
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
	var system = (SETTINGS.weather.units == "imperial")?" &degF":" &degC"
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
			 
			"<div class='tempLine'><span class='temp'>" +
				"<span class='weatherIco'>" + fetchImage(data.query.results.current.weather.icon) + " </span>" +
				Math.round(data.query.results.current.temperature.value) + "<span class='weatherSys'>" + system + "</span>" +
			"</div>" +	
			"<span class='weatherVal'>" + data.query.results.current.weather.value + "</span>" +
		"</div>";
	}
	setTimeout(initWeather, 3.6e6);
}
function fetchImage(imgCode, weatherID){
	var url;
	switch(imgCode){
		case "01d":
			url = "B";
			break;
		case "01n":
			url = "2";
			break;
		case "02d":
			url = "H";
			break;
		case "02n":
			url = "4";
			break;
		case "03d":
			url = "N";
			break;
		case "03n":
			url = "5";
			break;
		case "04d":
			url = "Y";
			break;
		case "04n":
			url = "%";
			break;
		case "09d":
			url = "R";
			break;
		case "09n":
			url = "8";
			break;
		case "10d":
			url = "Q";
			break;
		case "10n":
			url = "7";
			break;
		case "11d":
			url = "Z";
			break;
		case "11n":
			url = "6";
			break;
		case "13d":
			url = "W";
			break;
		case "13n":
			url = "#";
			break;
		case "50d":
			url = "L";
			break;
		case "50n":
			url = "L";
			break;
		default:
			url = ")";
			console.log("--- ERR: WEATHER ICO NOT FOUND. ---");
			break;
	}
	/* Override for severe weather
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
	} */
	return url;
}
