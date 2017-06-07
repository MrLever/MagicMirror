function main(){
	var content = fetchFeed("http://www.theonion.com/feeds/rss");
	console.log(content); 
}