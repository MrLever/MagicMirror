jQuery.ajaxSetup({async:false});//precaution

console.log("CALENDAR")
var loc=SETTINGS.calendar.loc;//location on screen
var clientId;//from google console
var apiKey;//from google console
var userEmail = SETTINGS.calendar.email; //Calendar id
var userTimeZone = SETTINGS.calendar.timeZone;//Time Zone for query
var maxRows = 10;//Number of results
var calName = SETTINGS.calendar.name;//Optional name to be displayed
var military = SETTINGS.calendar.military;//0 for 12h 1 for 24
var scopes = 'https://www.googleapis.com/auth/calendar.readonly';//minimal permissions are best permissions

//Hopefully temporary way to load gapi
var imported = document.createElement('script');
imported.src = 'https://apis.google.com/js/client.js?onload=keys';
document.head.appendChild(imported);

function keys(){
	console.log("test1");
	jQuery.get('/keys/calendar.key',function(key){
		apiKey=key;
		console.log(key);

	});
	jQuery.get('keys/calendar.id',function(id){
		id = id.replace(/[\n\r]/g, '');
		clientId=id
	});
	init();
}

//calculate period of day
function calcPeriod(num) {
	if (num <= 12) { return "AM"; }
	return "PM";
}

//convert from miltary if need be
function TwelveHour(num){
	if(num>12){
		return num-12;
	}
	return num;
}
//Month number to name
function monthString(num) {
	switch(num){
		case "01":
			return "January";
		case "02":
			return "Febuary";
		case "03":
			return "March";
		case "04":
			return "April";
		case "05":
			return "May";
		case "06":
			return "June";
		case "07":
			return "July";
		case "08":
			return "August";
		case "09":
			return "September";
		case "10":
			return "October";
		case "11":
			return "November";
		case "12":
			return "December";
		default:
			console.log("Invalid month:"+num);
	}
}

//day number to name
function dayString(num){
	switch(num){
		case 0:
			return "Sunday";
		case 1:
			return "Monday";
		case 2:
			return "Tuesday";
		case 3:
			return "Wendsday";
		case 4:
			return "Thursday";
		case 5:
			return "Friday";
		case 6:
			return "Saturday";
		default:
			console.log("Invalid Day of the week:"+num);
	}
}

function init() {
	gapi.client.setApiKey(apiKey);
	gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, authCheck);
}

function authCheck(Result) {
	if (Result) {
		addTitle();
	}
	else{
		console.log("Auth Failed");
	}
}

function addTitle(){
	var title = document.createElement("div");
	title.id="calTitle";
	title.innerHTML = calName;
	document.getElementById(loc).appendChild(title);
	makeApiCall();
}

//make request for info
function makeApiCall() {
	var today = new Date(); //today date
	gapi.client.load('calendar', 'v3', function () {
		var request = gapi.client.calendar.events.list({
			'calendarId' : userEmail,
			'timeZone' : userTimeZone,
			'singleEvents': true,
			'timeMin': today.toISOString(),//only upcoming events
			'maxResults': maxRows,
			'output': 'embed',
			'orderBy': 'startTime'});
		request.execute(function (resp) {
			for (var i = 0; i < resp.items.length; i++) {
				var events = document.createElement("div");
				events.id="calEvent"
				var item = resp.items[i];
				var classes = [];
				var allDay = item.start.date? true : false;
				var startDT = allDay ? item.start.date : item.start.dateTime;
				var dateTime = startDT.split("T"); //split date from time
				var date = dateTime[0].split("-"); //split yyyy mm dd
				var startYear = date[0];
				var startMonth = monthString(date[1]);
				var startDay = date[2];
				var startDateISO = new Date(startMonth + " " + startDay + ", " + startYear + " 00:00:00");
				var startDayWeek = dayString(startDateISO.getDay());
				if( allDay == true){ //All day events
					var str = [
						calName, "<br>",
						startDayWeek, ' ',
						startMonth, ' ',
						startDay, ' ',
						//startYear,
						' ',
						item.summary
					];
				}
				else{
					var time = dateTime[1].split(":"); //split hh ss etc...
					var period = calcPeriod(startHour);//AM/PM

					var	startHour = TwelveHour(time[0]);
					var startMin = time[1];

					var str = [ //Set Time Events
						item.summary, ' ',
						startDayWeek, ' ',
						startMonth, ' ',
						startDay, ' ',
						//startYear,
						' - ',
						startHour, ':', startMin, ' ',
						period
					];
				}
				events.innerHTML = str.join('');//combine array to string
				events.setAttribute('class', classes.join(' '));
				document.getElementById(loc).appendChild(events);
			}
		});
	});
}
