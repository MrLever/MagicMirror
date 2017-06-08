var feednew = function(yqlURL,Format,callback)
{
	$.ajax({
		url: yqlURL,
		type: "GET",
		dataType: "jsonp",
		async: false,
		caceh: false,
		success: callback,
		error: function(){
			console.log("WHHHHHHHHHHYYYYYYYYYYY DO YOU HALF ASS EVERY THING NIC");
		}
	});
};
function fetchFeed(source,format,callback){
	console.log("huh");
	var Source = source;
	var Format = format;
	var yqlURL = [
		"http://query.yahooapis.com/v1/public/yql",
		"?q=" + encodeURIComponent("select * from xml where url='" + Source + "'"),
		"&format="+format+"&callback=?"
	].join("");
	feednew(yqlURL,Format,callback);
}
