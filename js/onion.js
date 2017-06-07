onion();
/* For trucation of abstracts. */
String.prototype.trunc =
     function( n, useWordBoundary ){
         if (this.length <= n) { return this; }
         var subString = this.substr(0, n-1);
         return (useWordBoundary
            ? subString.substr(0, subString.lastIndexOf(' '))
            : subString) + " ...";
      };

function onion(){
	var loc = "TL";
	var content = fetchFeed("http://www.theonion.com/feeds/rss");
	console.log(content);

	//Pull Feed titles
	var feedTitles = $(content).find("title");

	//Pull feed abstracts
	var feedAbstracts = $(content).find("description");

	//Pull Dates
	var feedDates = $(content).find("pubDate");
	//Check if loaded properly.
	if(feedTitles.length == 0){
		//Put loading icon.
		setTimeout(onion, 500);
	}

	//Process feed. If the abstract is just a picture, skip it.
	document.getElementById(loc).innerHTML = "<div class='rssWrapper'> <div class='rssFeed'>";
	var feed = ("<div class='innerWrap'>" +
					"<div class='list'>" +
						"<span class='rssTitle'>The Onion</span>" +
						"<span class='rssAbstract'>America's Finest News Source</span>" +
					"</div>");

	for(i = 1; i < feedTitles.length; i++){
		if($(feedAbstracts[i]).text().trim() == "]]>"){
			continue;
		}

		feed = feed + ("<div class='list'>" +
							"<span class='rssTitle'>" + $(feedTitles[i]).text() + "</span>" +
							"<span class='rssAbstract'>" + $(feedAbstracts[i]).text().trunc(512, true).replace(']]>', '') + "</span>"+
						"</div>");


		//console.log($(feedTitles[i]).text() + "\n");
		//console.log($(feedAbstracts[i]).text() + "\n");
	}
	feed = feed + "</div></div>"
	$(".rssFeed").append(feed);

	$('.rssFeed').easyTicker({
	direction: 'up',
	easing: 'swing',
	speed: 'slow',
	interval: 15000,
	height: "auto",
	visible: 1,
	mousePause: 1,
	controls: {
		up: '',
		down: '',
		toggle: '',
		playText: 'Play',
		stopText: 'Stop'
	}
});


	setTimeout(onion, 100000000);
}