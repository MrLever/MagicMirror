weather();
function weather(){
	jQuery.get('/keys/weather.key', function(data){
		console.log('tick');
		CONTENT = fetchFeed("http://api.openweathermap.org/data/2.5/weather?zip=34698,us&mode=xml&appid="+data);
		console.log(CONTENT);
		check = $(CONTENT).length;
		console.log(check)
		if(check == 0){
			setTimeout(weather,1000);
		}
		console.log("pass");
		console.log($(check).find("temperature").text());
	});
}
