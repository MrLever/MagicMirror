function keys(){
	console.log('fetch begin')
	jQuery.get('/keys/steam.key',function(key){
		init(key)
	})
}

function init(key){
	key = key.replace(/[\n\r]/g,"")//acts weird without
	var ids

	for(var i = 0; i < SETTINGS.steam.ids.length;i++){
		console.log(SETTINGS.steam.ids[i])
		ids += SETTINGS.steam.ids[i] + ","
	}

	var content = fetchFeed("http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="+key+"&steamids="+ids+"&format=xml","json",steam);

}

function steam(data){

}
