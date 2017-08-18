steamkeys()
var ids
var key
var div = document.createElement("div")
function steamkeys(){
	console.log('fetch begin')
	jQuery.get('/keys/steam.key',function(key){
		steaminit(key)
	})
}

function steaminit(key){
	key = key.replace(/[\n\r]/g,"")//acts weird without

	for(var i = 0; i < SETTINGS.steam.ids.length;i++){
		console.log(SETTINGS.steam.ids[i])
		ids += SETTINGS.steam.ids[i] + ","
	}
	setInterval(steamfetch(key),1.2e6);
}
function steamfetch(key){
	console.log("testtttttttttttttt")
	var content = fetchFeed("http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="+key+"&steamids="+ids+"&format=xml","json",steam);
}

function steam(data){
	var people = data.query.results.response.players.player
	console.log("testttttttttttttttttttttttttttttttttttt")
	div.innerHTML=""
	for( var i = 0; i < people.length; i++){
		online = "offline"
		if(people[i].personastate>0){
			online = "online"
		}
		div.innerHTML+="<div class='person'>"+"<img class='profile' src="+people[i].avatarmedium+">" + "<span class='"+online+"'>" + people[i].personaname+"</span></div><br>"
		document.getElementById(SETTINGS.steam.loc).appendChild(div)
	}
	console.log("FUCKKKKKK?")
}
