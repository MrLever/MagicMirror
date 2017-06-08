weather()
function weather(){
	jQuery.get('/keys/weather.key', function(data){
		config=$.getJSON("/js/configs/weather.json");
		//alert(config.city);
		console.log('RIGHT BEFORE');
		fetchFeed("http://api.openweathermap.org/data/2.5/weather?q=Dunedin,us&units=imperial&mode=xml&appid="+data,"json",weatherprocess);
	});
}
function weatherprocess(data){
	console.log(data)
}
