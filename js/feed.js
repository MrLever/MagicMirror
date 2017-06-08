//Returns content from requested url in requested format.
function fetchFeed(source,format){
	console.log("Loading XML");
	var Source = source;
	var Format = format;
	var Content;

	// build the yql query. Could be just a string - I think join makes easier reading. YQL is a yahoo api
	var yqlURL = [
		"http://query.yahooapis.com/v1/public/yql",
		"?q=" + encodeURIComponent("select * from xml where url='" + Source + "'"),
		"&format="+format+"&callback=?"
	].join("");

	// Now do the AJAX heavy lifting
	$.getJSON(yqlURL, function(data){
		if(Format == "json"){
			window.Content = data;
		}
		else{
			if(Format == "xml"){
				window.Content = $(data.results[0]);
			}
		}
	});
	return window.Content;
}
