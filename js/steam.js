steamkeys()

function steamkeys(){
	if(SETTINGS.DEBUG == 1)
		console.log('--- BEGIN STEAM MODULE ---');
	
	jQuery.get('/keys/steam.key',function(key){
		steaminit(key)
	})
}

function steaminit(key){
	key = key.replace(/[\n\r]/g,"")//acts weird without
	var ids;
	
	/* Load css for right align if neccessary */
	var pos = SETTINGS.steam.loc.charAt(1);
	if(pos == "R"){
		var link = document.createElement('link');
				link.setAttribute('rel', 'stylesheet');
				link.type = 'text/css';
				link.href = '/css/steamAlt.css';
				document.head.appendChild(link);
	}
	for(var i = 0; i < SETTINGS.steam.ids.length;i++){
		console.log(SETTINGS.steam.ids[i])
		ids += SETTINGS.steam.ids[i] + ","
	}
	setInterval(steamfetch(key, ids),1.2e6);
}
function steamfetch(key, ids){
	var content = fetchFeed("http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="+key+"&steamids="+ids+"&format=xml","json",steam);
}

function steam(data){
	var people = data.query.results.response.players.player;
	var div = document.createElement("div");
	div.className = "steamWrapper";
	div.innerHTML=""
	for( var i = 0; i < people.length; i++){
		online = "offline"
		if(people[i].personastate>0){
			online = "online"
		}
		div.innerHTML+="<div class='person'>"+"<img class='profile' src="+people[i].avatarmedium+">" + "<span class='"+online+"'>" + people[i].personaname+"</span></div><br>"
		document.getElementById(SETTINGS.steam.loc).appendChild(div)
	}
	if(SETTINGS.DEBUG == 1)
		console.log('--- END STEAM MODULE ---');
}
