//Returns XML content from requested url.
function fetchFeed(source){
	console.log("Loading XML");
	var xmlSource = source;
	var xmlContent;
	
	// build the yql query. Could be just a string - I think join makes easier reading. YQL is a yahoo api
	var yqlURL = [
		"http://query.yahooapis.com/v1/public/yql",
		"?q=" + encodeURIComponent("select * from xml where url='" + xmlSource + "'"),
		"&format=xml&callback=?"
	].join("");

	// Now do the AJAX heavy lifting        
	$.getJSON(yqlURL, function(data){
		window.xmlContent = $(data.results[0]);
		/* var Abstract = $(xmlContent).find("item").text();
		console.log(Abstract); */ 
	});
	return window.xmlContent;
}