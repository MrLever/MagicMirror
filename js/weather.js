weather();
function weather(){
	jQuery.get('/keys/weather.key', function(data){
		console.log('tick');
		CONTENT = fetchFeed("http://api.openweathermap.org/data/2.5/weather?q=Dunedin,us&units=imperial&mode=xml&appid="+data,"json");
		console.log(CONTENT);
		check = $(CONTENT).length;
		if(check == 0){//request fails first time
			setTimeout(weather,1000);
		}
		
	});
}
