/* Credit to Alessio Atzeni for weather icons:
	http://www.alessioatzeni.com/meteocons/
*/
var weatherKey;
initWeather();

function initWeather(){
	document.getElementById(SETTINGS.weather.loc).innerHTML = ""; //Clear old data
	if(SETTINGS.DEBUG == 1)
		console.log("--- BEGIN WEATHER MODULE ---");
	
	var pos = SETTINGS.weather.loc.charAt(1);
	if(pos == "L"){
		var link = document.createElement('link');
				link.setAttribute('rel', 'stylesheet');
				link.type = 'text/css';
				link.href = '/css/weatherAlt.css';
				document.head.appendChild(link);
	}
	
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
	
	if(SETTINGS.DEBUG == 1)
		console.log(JSON.stringify(data));
	
	switch(SETTINGS.weather.mode){
		case 1: //Current and forecast
			weatherComboCurrent(data);
			break;
		case 2: //forecast only
			fetchForecast(2);
			break;
		case 0: //Only current
		default:
			currentWeather(data);
		//document.getElementById(loc).append(
		
	}
	setTimeout(initWeather, 3.6e6);
}
function fetchForecast(num){
	if(SETTINGS.DEBUG == 1)
		console.log("http://api.openweathermap.org/data/2.5/forecast/daily?id=" + SETTINGS.weather.cityID + "&units=" + SETTINGS.weather.units +
				"&mode=xml&appid=" + weatherKey);
	switch(num){
		case 1:
			fetchFeed("http://api.openweathermap.org/data/2.5/forecast/daily?id=" + SETTINGS.weather.cityID + "&units=" + SETTINGS.weather.units +
				"&mode=xml&appid=" + weatherKey, "json", weatherComboForecast);
			break;
		case 2:
		default:
			fetchFeed("http://api.openweathermap.org/data/2.5/forecast/daily?id=" + SETTINGS.weather.cityID + "&units=" + SETTINGS.weather.units +
				"&mode=xml&appid=" + weatherKey, "json", forecastWeather);
		
	}
	
}
function weatherComboCurrent(data){
	if(SETTINGS.DEBUG == 1){
		console.log(data);
	}
	var system = (SETTINGS.weather.units == "imperial")?" &degF":" &degC";
	$('#' + SETTINGS.weather.loc).append("<div class='weatherTitleLine'>"
		+ "<span class='subTitle city'>" + data.query.results.current.city.name + "</span>"
		+ "<span class='weatherIco'>" + fetchImage(data.query.results.current.weather.icon) + "</span>"
		+ "<span class='subTitle temp'>   " + Math.round(data.query.results.current.temperature.value) + "<span class='weatherSys'>" + system + "</span>"
	+"</div>");
	fetchForecast(1);
}
function weatherComboForecast(data){
	if(SETTINGS.DEBUG == 1){
		console.log(data);
	}
	var system = (SETTINGS.weather.units == "imperial")?" &degF":" &degC";
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
function currentWeather(data){
	var system = (SETTINGS.weather.units == "imperial")?" &degF":" &degC";
	$('#' + SETTINGS.weather.loc).append("<div class='weatherTitleLine'>"
		+ "<span class='subTitle city'>" + data.query.results.current.city.name + "</span>"
		+ "<span class='weatherIco'>" + fetchImage(data.query.results.current.weather.icon) + "</span>"
		+ "<span class='subTitle temp'>   " + Math.round(data.query.results.current.temperature.value) + "<span class='weatherSys'>" + system + "</span>"
	+"</div>" 
	+"<span class='subtitle weatherVal'>" + data.query.results.current.weather.value + "</span>");
	/* 	$('#' + SETTINGS.weather.loc).append("<div class='weatherTitle'>" +
			"<span class='subTitle city'>" +
				data.query.results.current.city.name +
			"</span>");
	
	$(".weatherTitle").append("<div class='subTitle tempLine'>" +
			"<span class='temp'> <span class='weatherIco'>" + fetchImage(data.query.results.current.weather.icon) + "</span>" +
				Math.round(data.query.results.current.temperature.value) + "<span class='weatherSys'>" + system + "</span></span>" +
			"</div></div>");
	var content = "<span class='subtitle weatherVal'>" + data.query.results.current.weather.value + "</span>" +
		"</div>";
	$('#' + SETTINGS.weather.loc).append(content); */
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
function forecastWeather(data){
	if(SETTINGS.DEBUG == 1){
		console.log(data);
	}
	var system = (SETTINGS.weather.units == "imperial")?" &degF":" &degC";
	$('#' + SETTINGS.weather.loc).append("<div class='weatherTitleLine'>"
		+ "<span class='subTitle city'>" + data.query.results.weatherdata.location.name + "</span>"
	+"</div>"); 
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
	var code;
	switch(imgCode){
		case "01d":
			code = "B";
			break;
		case "01n":
			code = "2";
			break;
		case "02d":
			code = "H";
			break;
		case "02n":
			code = "4";
			break;
		case "03d":
			code = "N";
			break;
		case "03n":
			code = "5";
			break;
		case "04d":
			code = "Y";
			break;
		case "04n":
			code = "%";
			break;
		case "09d":
			code = "R";
			break;
		case "09n":
			code = "8";
			break;
		case "10d":
			code = "Q";
			break;
		case "10n":
			code = "7";
			break;
		case "11d":
			code = "Z";
			break;
		case "11n":
			code = "6";
			break;
		case "13d":
			code = "W";
			break;
		case "13n":
			code = "#";
			break;
		case "50d":
			code = "L";
			break;
		case "50n":
			code = "L";
			break;
		default:
			code = ")";
			console.log("--- ERR: WEATHER ICO NOT FOUND. ---");
			break;
	}
	/* Override for severe weather
	switch(weatherID){
		case (900):
			code = "images/weather/900.png";
			break;
		case (901):
			code = "images/weather/901.png";
			break;
		case (902):
			code = "images/weather/902.png";
			break;
		case (906):
			code = "images/weather/902.png";
			break;
		default:
			break;
	} */
	return code;
}