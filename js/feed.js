function main(){
	// find some demo xml - DuckDuckGo is great for this
    var xmlSource = "http://www.theonion.com/feeds/rss"

	// build the yql query. Could be just a string - I think join makes easier reading
    var yqlURL = [
        "http://query.yahooapis.com/v1/public/yql",
        "?q=" + encodeURIComponent("select * from xml where url='" + xmlSource + "'"),
        "&format=xml&callback=?"
    ].join("");

	// Now do the AJAX heavy lifting        
    $.getJSON(yqlURL, function(data){
        xmlContent = $(data.results[0]);
        var Abstract = $(xmlContent).find("item").text();
        console.log(Abstract);
    });
};