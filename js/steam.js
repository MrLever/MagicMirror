function keys(){
	console.log('fetch begin')
	jQuery.get('/keys/steam.key',function(key){
		init()
	})
}

function init(){
	var content = fetchFeed("http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=B9771134FA12F381A86A68CE306EDD35&steamids=76561197960435530","json",steam);
}
