/* Credit to Alessio Atzeni for weather icons:
	http://www.alessioatzeni.com/meteocons/
*/
/* To truncate weekday names */
var weatherKey;
initWeather()
//api.openweathermap.org/data/2.5/weather?id=2172797
function initWeather(){
	document.getElementById(SETTINGS.weather.loc).innerHTML = ""; //Clear old data
	if(SETTINGS.DEBUG == 1)
		console.log("--- BEGIN WEATHER MODULE ---");

	jQuery.get('/keys/weather.key', function(key){
			weatherKey = key;
			
			if(SETTINGS.DEBUG == 1){
				console.log('Calling Weather API...');
				console.log("City ID: " + SETTINGS.weather.cityID);
				console.log("Units: " + SETTINGS.weather.units);
				console.log("Final call: " + "http://api.openweathermap.org/data/2.5/weather?id=" +
					SETTINGS.weather.cityID + "&units=" + SETTINGS.weather.units + "&mode=json&appid=" + weatherKey)
			}

			fetchFeed("http://api.openweathermap.org/data/2.5/weather?id=" + SETTINGS.weather.cityID + "&units=" + SETTINGS.weather.units +
				"&mode=xml&appid=" + weatherKey, "json", weather);
			if(SETTINGS.DEBUG == 1)
				console.log("- End Weather Init -");
			/* fetchFeed("http://api.openweathermap.org/data/2.5/weather?q=Dunedin,us&units=imperial&mode=xml&appid="+key,"json",weatherprocess); */
	});
}
function weather(data){
	if(data == null){
		console.log("****ERR: NO WEATHER DATA RECIEVIED ****");
		return;
	}
	/* Appends city name regardless of choice */
	if(SETTINGS.DEBUG == 1)
		console.log(JSON.stringify(data));
	
	$('#' + SETTINGS.weather.loc).append("<div class='currentWeatherWrappper'>" +
			"<span class='title city'>" +
				data.query.results.current.city.name +
			"</span>");

	switch(SETTINGS.weather.mode){
		case 1: //Current and forecast
			//$('#' + loc).append(currentWeather(data, system));
			fetchForecast(data);
			currentWeather(data);
			var link = document.createElement('link');
				link.setAttribute('rel', 'stylesheet');
				link.type = 'text/css';
				link.href = '/css/weatherMode2.css';
			document.head.appendChild(link);
			break;
		case 2: //forecast only
			fetchForecast(data);
			break;
		case 0: //Only current
		default:
			currentWeather(data);
		//document.getElementById(loc).append(
		
	}
	setTimeout(initWeather, 3.6e6);
}
function currentWeather(data){
	var system = (SETTINGS.weather.units == "imperial")?" &degF":" &degC";
	
	var content = "<div class='subTitle tempLine'>" +
			"<span class='temp'> <span class='weatherIco'>" + fetchImage(data.query.results.current.weather.icon) + "</span>" +
				Math.round(data.query.results.current.temperature.value) + "<span class='weatherSys'>" + system + "</span></span>" +
			"</div>" +
			"<span class='subtitle weatherVal'>" + data.query.results.current.weather.value + "</span>" +
		"</div>";
	$('#' + SETTINGS.weather.loc).append(content);
}
function fetchForecast(){
	if(SETTINGS.DEBUG == 1)
		console.log("http://api.openweathermap.org/data/2.5/forecast/daily?id=" + SETTINGS.weather.cityID + "&units=" + SETTINGS.weather.units +
				"&mode=xml&appid=" + weatherKey);
	fetchFeed("http://api.openweathermap.org/data/2.5/forecast/daily?id=" + SETTINGS.weather.cityID + "&units=" + SETTINGS.weather.units +
				"&mode=xml&appid=" + weatherKey, "json", forecast);
}
function resolveWeatherDay(i){
	switch(i){
		case(0):
			return "Sun";
		case(1):
			return "Mon";
		case(2):
			return "Tue";
		case(3):
			return "Wed";
		case(4):
			return "Thu";
		case(5):
			return "Fri";
		case(6):
			return "Sat";
	}
	return "ERR";
}
function forecast(data){
	if(SETTINGS.DEBUG == 1)
		console.log(JSON.stringify(data)); 
	var day;
	var system = (SETTINGS.weather.units == "imperial")?" &degF":" &degC";
	var content = "<div class='weatherForecastWrappper'>";
			for(var i = 0; i < SETTINGS.weather.days; i++){
				day = new Date(data.query.results.weatherdata.forecast.time[i].day);
				content += "<div class='foreDay'>" +
								"<span class='weekDay subTitle'>" + resolveWeatherDay(day.getDay()) + "</span>" +  
								"<span class='forecastIco'>" + fetchImage(data.query.results.weatherdata.forecast.time[i].symbol.var) + "</span>" +
								"<span class='forecastTemp subTitle'><span class='forecastHigh'>" + Math.round(data.query.results.weatherdata.forecast.time[i].temperature.max) + " </span>" +
								"<span class='forecastLow'>" + Math.round(data.query.results.weatherdata.forecast.time[i].temperature.min) + "</span></span>" +
							"</div>";
			}
		content += "</div>";
	$('#' + SETTINGS.weather.loc).append(content);
}
function fetchImage(imgCode){
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
